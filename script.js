'use strict';
/* Katalog item. Gambar dimuat dari assets/svg/<slot>/<slot>_<nama-item>.svg
   (hair: hair_<model>_<warna>_back|front.svg, body: body_<kulit>.svg).
   Untuk mengganti gambar, cukup timpa file di folder assets. */
const CAT = {
   hair: { "l": "Style", "z": [0, 8], "vb": "2 0 28 22", "req": 1, "i": [["Bob"], ["Long"], ["Twin Tails"], ["Bun"], ["Pixie"]] },
   hairColor: { "l": "Color", "req": 1, "i": [["Cocoa", "#7a4a35"], ["Candy", "#f7a8c4"], ["Lilac", "#b9a2e8"], ["Sky", "#8ec9f0"], ["Honey", "#e8b866"], ["Midnight", "#3b2f3f"], ["Mint", "#9fe0c9"]] },
   skin: { "l": "Skin", "req": 1, "i": [["Peach", "#ffd9c2"], ["Cream", "#fbe3cf"], ["Tan", "#e7b48f"], ["Cocoa", "#b87c5a"]] },
   eyes: { "l": "Eyes", "z": [9], "vb": "8 8 16 9", "req": 1, "i": [["Sparkle"], ["Violet"], ["Happy"], ["Sleepy"], ["Star"]] },
   brows: { "l": "Brows", "z": [9], "vb": "8 6 16 6", "i": [["Soft"], ["Arched"], ["Bold"]] },
   blush: { "l": "Blush", "z": [9], "vb": "8 12 16 8", "i": [["Rosy"], ["Peachy"], ["Hearts"], ["Freckles"]] },
   lips: { "l": "Lips", "z": [9], "vb": "10 14 12 7", "i": [["Rose"], ["Coral"], ["Berry"], ["Cat"], ["Happy"]] },
   makeup: { "l": "Makeup", "z": [9], "vb": "6 8 20 12", "i": [["Pink Shadow"], ["Lilac Shadow"], ["Sky Shadow"], ["Glitter"], ["Star Dot"]] },
   dress: { "l": "Dress", "z": [4], "vb": "5 20 22 18", "i": [["Sundress"], ["Princess"], ["Sailor"], ["Pinafore"]] },
   top: { "l": "Top", "z": [4], "vb": "6 20 20 12", "i": [["Cream Tee"], ["Crop Top"], ["Sweater"], ["Bow Blouse"], ["Camisole"]] },
   skirt: { "l": "Skirt", "z": [3], "vb": "4 27 24 11", "i": [["Pleated"], ["Tutu"], ["Denim Mini"], ["Plaid"]] },
   pants: { "l": "Pants", "z": [3], "vb": "8 28 16 14", "i": [["Cream Shorts"], ["Jeans"], ["Overalls"], ["Cargo"]] },
   outer: { "l": "Outer", "z": [5], "vb": "6 20 20 12", "i": [["Cardigan"], ["Bomber"], ["Hoodie"], ["Cape"]] },
   shoes: { "l": "Shoes", "z": [2], "vb": "8 35 16 10", "i": [["Sneakers"], ["Pink Boots"], ["Mary Janes"], ["Sky Flats"]] },
   earrings: { "l": "Earring", "z": [11], "vb": "3 11 26 9", "i": [["Pearls"], ["Hearts"], ["Stars"], ["Drops"]] },
   necklace: { "l": "Necklace", "z": [12], "vb": "9 19 14 8", "i": [["Pearl"], ["Heart"], ["Gold"], ["Choker"]] },
   glasses: { "l": "Glasses", "z": [13], "vb": "6 7 20 11", "i": [["Round"], ["Pink"], ["Sky"], ["Shades"]] },
   ribbon: { "l": "Ribbon", "z": [10], "vb": "4 0 24 10", "i": [["Pink Bow"], ["Lilac Bow"], ["Twin Bows"], ["Headband"]] },
   hat: { "l": "Hat", "z": [10], "vb": "3 0 26 9", "i": [["Beret"], ["Bucket"], ["Cat Ears"], ["Flowers"]] },
   bag: { "l": "Bag", "z": [14], "vb": "3 22 26 14", "i": [["Heart Bag"], ["Star Bag"], ["Backpack"], ["Basket"]] }
};
const A = 'assets/svg/';
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const START = { hair: 0, hairColor: 0, skin: 0, eyes: 0, brows: 0, blush: 0, lips: 0, makeup: -1, dress: -1, top: 0, skirt: -1, pants: 0, outer: -1, shoes: 0, earrings: -1, necklace: -1, glasses: -1, ribbon: -1, hat: -1, bag: -1 };
const CATS = [
   { id: 'hair', l: 'Hair', s: ['hair', 'hairColor'] },
   { id: 'face', l: 'Face', s: ['skin', 'eyes', 'brows', 'blush', 'lips', 'makeup'] },
   { id: 'outfit', l: 'Outfit', s: ['dress', 'top', 'skirt', 'pants', 'outer', 'shoes'] },
   { id: 'acc', l: 'Acc.', s: ['earrings', 'necklace', 'glasses', 'ribbon', 'hat', 'bag'] },
];
let sel = { ...START }, cat = 'hair', sub = 'hair';
const $ = id => document.getElementById(id);
const nm = k => CAT[k].i[sel[k]][0];

/* ===== Layer karakter (tumpukan <img>) ===== */
const KEYS = ['body', 'hairB', 'hairF', ...Object.keys(CAT).filter(k => CAT[k].z && k !== 'hair')];
function layers(st) {
   const L = { body: [1, `${A}body/body_${slug(CAT.skin.i[st.skin][0])}.svg`] };
   const hc = slug(CAT.hairColor.i[st.hairColor][0]);
   for (const k in CAT) {
      const s = CAT[k]; if (!s.z || st[k] < 0) continue; const n = slug(CAT[k].i[st[k]][0]);
      if (k === 'hair') { const b = `${A}hair/hair_${n}_${hc}_`; L.hairB = [0, b + 'back.svg']; L.hairF = [8, b + 'front.svg']; }
      else L[k] = [s.z[0], `${A}${k}/${k}_${n}.svg`];
   }
   return L;
}
function paint(box, st) {
   if (!box.children.length) KEYS.forEach(k => { const im = new Image(); im.alt = ''; im.draggable = false; im.dataset.k = k; if (k === 'eyes') im.className = 'eyes'; box.appendChild(im); });
   const L = layers(st);
   for (const im of box.children) {
      const l = L[im.dataset.k]; im.hidden = !l; if (!l) continue;
      im.style.zIndex = l[0]; if (im.dataset.u !== l[1]) { im.dataset.u = l[1]; im.src = l[1]; }
   }
}
const doll = $('doll');
const draw = () => paint(doll, sel);

/* ===== Thumbnail (potong area sesuai slot) ===== */
function thumb(k, it) {
   const s = CAT[k];
   if (it[1]) return `<span class="sw" style="background:${it[1]}"></span>`;
   const [x, y, w, h] = s.vb.split(' ').map(Number), n = slug(it[0]);
   const pos = `left:${-x / w * 100}%;top:${-y / h * 100}%;width:${3200 / w}%;height:${4500 / h}%`;
   const files = k === 'hair' ? [`hair/hair_${n}_${slug(CAT.hairColor.i[sel.hairColor][0])}_back.svg`, `hair/hair_${n}_${slug(CAT.hairColor.i[sel.hairColor][0])}_front.svg`] : [`${k}/${k}_${n}.svg`];
   return `<span class="tb"><span class="tbi" style="--ar:${w / h}">${files.map(f => `<img alt="" draggable="false" src="${A}${f}" style="${pos}">`).join('')}</span></span>`;
}
function buildTabs() {
   $('cats').innerHTML = CATS.map(c => `<button class="tab" data-c="${c.id}" aria-pressed="${c.id === cat}">${c.l}</button>`).join('');
   $('subs').innerHTML = CATS.find(x => x.id === cat).s.map(k => `<button class="tab" data-s="${k}" aria-pressed="${k === sub}">${CAT[k].l}</button>`).join('');
}
function buildGrid() {
   const s = CAT[sub];
   let h = s.req ? '' : `<button class="item none" data-i="-1" aria-pressed="${sel[sub] < 0}" title="Tanpa item">∅</button>`;
   h += s.i.map((it, i) => `<button class="item" data-i="${i}" aria-pressed="${sel[sub] === i}">${thumb(sub, it)}<span>${it[0]}</span></button>`).join('');
   $('grid').innerHTML = h;
}
const say = ['Ooh, so cute!', 'Love this look!', 'Dreamy~', 'Sooo aesthetic!', 'Perfect match!', 'Sparkle sparkle!', 'Pastel queen!'];
function pop() {
   const b = $('bubble'); b.textContent = say[Math.floor(Math.random() * say.length)];
   b.style.animation = 'none'; void b.offsetWidth; b.style.animation = '';
   doll.classList.remove('shake'); void doll.offsetWidth; doll.classList.add('shake');
}
function pick(k, i) {
   sel[k] = i;
   if (i >= 0) {
      if (k === 'dress') sel.top = sel.skirt = sel.pants = -1;
      if (['top', 'skirt', 'pants'].includes(k)) sel.dress = -1;
      if (k === 'skirt') sel.pants = -1; if (k === 'pants') sel.skirt = -1;
   }
   draw(); buildGrid(); pop();
}

/* ===== Events ===== */
$('cats').onclick = e => { const b = e.target.closest('[data-c]'); if (!b) return; cat = b.dataset.c; sub = CATS.find(c => c.id === cat).s[0]; buildTabs(); buildGrid(); };
$('subs').onclick = e => { const b = e.target.closest('[data-s]'); if (!b) return; sub = b.dataset.s; buildTabs(); buildGrid(); };
$('grid').onclick = e => { const b = e.target.closest('[data-i]'); if (b) pick(sub, +b.dataset.i); };

const rnd = n => Math.floor(Math.random() * n);
$('randomBtn').onclick = () => {
   const n = { ...START };
   for (const k in CAT) { const len = CAT[k].i.length; n[k] = CAT[k].req ? rnd(len) : (Math.random() < .35 ? -1 : rnd(len)); }
   n.brows = rnd(CAT.brows.i.length); n.lips = rnd(CAT.lips.i.length); n.shoes = rnd(CAT.shoes.i.length);
   n.dress = n.top = n.skirt = n.pants = -1;
   if (Math.random() < .4) n.dress = rnd(CAT.dress.i.length);
   else { n.top = rnd(CAT.top.i.length); if (Math.random() < .5) n.skirt = rnd(CAT.skirt.i.length); else n.pants = rnd(CAT.pants.i.length); }
   sel = n; draw(); buildGrid(); pop();
};
$('resetBtn').onclick = () => { sel = { ...START }; draw(); buildGrid(); $('bubble').textContent = 'Kembali ke awal!'; };

const adj = ['Cocoa', 'Cotton Candy', 'Lavender', 'Sky', 'Honey', 'Midnight', 'Mint'];
const vibe = ['Daydream', 'Sundae', 'Picnic', 'Lullaby', 'Wonderland', 'Tea Party', 'Moonlight', 'Fairytale', 'Bakery', 'Starlight'];
$('finishBtn').onclick = () => {
   const idx = Object.values(sel).reduce((a, b) => a + b + 1, 0);
   $('lookName').textContent = `${adj[sel.hairColor % adj.length]} ${vibe[idx % vibe.length]}`;
   const main = sel.dress >= 0 ? nm('dress') + ' Dress' : `${sel.top >= 0 ? nm('top') : 'Basic'} + ${sel.skirt >= 0 ? nm('skirt') : sel.pants >= 0 ? nm('pants') : 'Cute Bottom'}`;
   const extras = ['hat', 'ribbon', 'glasses', 'bag', 'necklace', 'earrings'].filter(k => sel[k] >= 0).map(nm);
   $('lookDesc').textContent = `${nm('hair')} hair, ${main}${extras.length ? ', plus ' + extras.slice(0, 3).join(', ') : ''}.`;
   const score = Math.min(5, 2 + Math.ceil(extras.length / 2) + (sel.makeup >= 0 ? 1 : 0) + (sel.outer >= 0 ? 1 : 0));
   $('lookStars').textContent = '★'.repeat(score) + '☆'.repeat(5 - score);
   paint($('finalDoll'), sel);
   $('result').hidden = false; $('againBtn').focus();
};
$('keepBtn').onclick = () => { $('result').hidden = true; };
$('againBtn').onclick = () => { $('result').hidden = true; $('resetBtn').click(); cat = 'hair'; sub = 'hair'; buildTabs(); buildGrid(); $('bubble').textContent = 'Ronde baru, ayo!'; };
addEventListener('keydown', e => { if (e.key === 'Escape') $('result').hidden = true; });

/* ===== Langit dreamy ===== */
(() => {
   const g = ['✦', '✧', '★', '❀', '♥', '✿'], sk = $('sky');
   for (let i = 0; i < 28; i++) {
      const s = document.createElement('span'); s.className = 'sp'; s.textContent = g[i % g.length];
      s.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;font-size:${10 + Math.random() * 18}px;--d:${2 + Math.random() * 4}s;animation-delay:${-Math.random() * 4}s`; sk.appendChild(s);
   }
})();

buildTabs(); buildGrid(); draw();
/* Preload semua aset agar ganti item tidak berkedip */
setTimeout(() => {
   for (const k in CAT) {
      const s = CAT[k]; if (!s.z) continue;
      s.i.forEach(it => { const n = slug(it[0]); (k === 'hair' ? CAT.hairColor.i.flatMap(c => ['back', 'front'].map(p => `hair/hair_${n}_${slug(c[0])}_${p}.svg`)) : [`${k}/${k}_${n}.svg`]).forEach(f => { new Image().src = A + f; }); });
   }
   CAT.skin.i.forEach(c => { new Image().src = `${A}body/body_${slug(c[0])}.svg`; });
}, 400);
