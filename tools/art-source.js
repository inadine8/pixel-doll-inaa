'use strict';
/* ===== Pixel helpers (grid 32x45) ===== */
const R=(x,y,w,h,c)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"/>`;
const blob=(x,y,w,h,c)=>R(x+1,y,w-2,1,c)+R(x,y+1,w,h-2,c)+R(x+1,y+h-1,w-2,1,c);
const OL='#6b4a3a',DK='#2b2030',W='#fff';
const ob=(x,y,w,h,c)=>blob(x-1,y-1,w+2,h+2,OL)+blob(x,y,w,h,c);
const sh=(c,a=-28)=>'#'+c.slice(1).match(/../g).map(h=>Math.max(0,Math.min(255,parseInt(h,16)+a)).toString(16).padStart(2,'0')).join('');
const both=f=>[11,18].map(f).join('');
const o=(n,f,c)=>({n,f,c});

/* ===== Hair ===== */
const bangs=c=>R(8,5,16,4,c)+R(8,9,3,2,c)+R(21,9,3,2,c)+R(15,9,2,1,c)+R(10,6,3,1,sh(c,40));
const tie='#ff8fb3';
const hair=[
 o('Bob',c=>({b:ob(6,4,20,17,c),f:bangs(c)})),
 o('Long',c=>({b:ob(6,4,20,28,c)+R(7,29,18,1,sh(c)),f:bangs(c)})),
 o('Twin Tails',c=>({b:ob(7,4,18,13,c)+ob(2,12,5,15,c)+ob(25,12,5,15,c)+R(3,11,3,2,tie)+R(26,11,3,2,tie),f:bangs(c)})),
 o('Bun',c=>({b:ob(7,4,18,13,c)+ob(12,1,8,6,c)+R(12,5,8,1,tie),f:bangs(c)})),
 o('Pixie',c=>({b:ob(7,4,18,12,c),f:R(8,5,16,3,c)+R(8,8,9,2,c)+R(8,10,2,3,c)+R(22,8,2,5,c)+R(10,6,3,1,sh(c,40))})),
];
const hairCols=[['Cocoa','#7a4a35'],['Candy','#f7a8c4'],['Lilac','#b9a2e8'],['Sky','#8ec9f0'],['Honey','#e8b866'],['Midnight','#3b2f3f'],['Mint','#9fe0c9']];
const skins=[['Peach','#ffd9c2'],['Cream','#fbe3cf'],['Tan','#e7b48f'],['Cocoa','#b87c5a']];

/* ===== Face ===== */
const eyes=[
 o('Sparkle',c=>both(x=>R(x,11,3,4,DK)+R(x,13,3,1,c)+R(x,11,1,1,W)+R(x+2,12,1,1,W)),'#7ec8ff'),
 o('Violet',c=>both(x=>R(x,11,3,4,DK)+R(x,13,3,1,c)+R(x,11,1,1,W)+R(x+2,12,1,1,W)),'#c39bff'),
 o('Happy',c=>both(x=>R(x,13,1,1,DK)+R(x+1,12,1,1,DK)+R(x+2,13,1,1,DK))),
 o('Sleepy',c=>both(x=>R(x,13,3,1,DK)+R(x-1,12,1,1,DK)+R(x+1,14,1,1,c)),'#ff9fc0'),
 o('Star',c=>both(x=>R(x,11,3,3,c)+R(x+1,10,1,5,c)+R(x+1,12,1,1,W)),'#7a4aa8'),
];
const brows=[
 o('Soft',c=>both(x=>R(x,9,3,1,c)),'#7a4a35'),
 o('Arched',c=>both(x=>R(x,9,2,1,c)+R(x+(x>15?0:2),8,1,1,c)),'#5a3d31'),
 o('Bold',c=>both(x=>R(x,8,3,2,c)),'#3b2f3f'),
];
const blush=[
 o('Rosy',c=>[9,21].map(x=>R(x,15,3,2,c)).join(''),'#ff9fb8'),
 o('Peachy',c=>[9,21].map(x=>R(x,15,3,2,c)).join(''),'#ffb48a'),
 o('Hearts',c=>[9,21].map(x=>R(x,15,1,1,c)+R(x+2,15,1,1,c)+R(x,16,3,1,c)).join(''),'#ff6f9c'),
 o('Freckles',c=>R(10,15,1,1,c)+R(12,16,1,1,c)+R(19,15,1,1,c)+R(21,16,1,1,c)+R(11,17,1,1,c),'#c07a5a'),
];
const smile=c=>R(14,17,1,1,c)+R(15,18,2,1,c)+R(17,17,1,1,c);
const lips=[
 o('Rose',smile,'#e8668b'),o('Coral',smile,'#ff8a6b'),o('Berry',smile,'#a63b6b'),
 o('Cat',c=>R(14,17,2,1,c)+R(16,17,2,1,c)+R(15,18,2,1,c),'#e8668b'),
 o('Happy',c=>R(14,17,4,1,DK)+R(15,18,2,1,c)+R(15,17,2,1,W),'#ff6f9c'),
];
const shadow=c=>both(x=>R(x-1,10,5,1,c));
const makeup=[
 o('Pink Shadow',shadow,'#ffa6c9'),o('Lilac Shadow',shadow,'#b9a2e8'),o('Sky Shadow',shadow,'#8ec9f0'),
 o('Glitter',c=>R(9,13,1,1,c)+R(10,18,1,1,c)+R(22,13,1,1,c)+R(21,18,1,1,c)+R(8,16,1,1,W),'#ffd84a'),
 o('Star Dot',c=>R(22,12,1,3,c)+R(21,13,3,1,c),'#ffd84a'),
];

/* ===== Outfit ===== */
const sl=(c,y,h)=>R(8,y,3,h,c)+R(21,y,3,h,c);
const dress=[
 o('Sundress',c=>R(11,22,10,6,c)+R(10,28,12,3,c)+R(9,31,14,5,c)+R(11,27,10,1,sh(c))+R(9,35,14,1,sh(c))+sl(c,23,2),'#ffb7cf'),
 o('Princess',c=>R(11,22,10,6,c)+R(10,28,12,3,c)+R(8,31,16,6,c)+R(8,37,16,1,W)+R(11,27,10,1,'#ffd84a')+sl(c,23,3)+R(7,23,1,2,c)+R(24,23,1,2,c),'#d3c2f7'),
 o('Sailor',c=>R(11,22,10,6,W)+R(10,28,12,3,c)+R(9,31,14,4,c)+R(11,22,10,2,c)+R(15,24,2,2,'#ff9fc0')+sl(W,23,2)+R(9,34,14,1,W),'#9ccdf5'),
 o('Pinafore',c=>R(12,22,2,6,c)+R(18,22,2,6,c)+R(11,26,10,5,c)+R(10,31,12,4,c)+R(11,22,10,3,W)+sl(W,23,5)+R(14,28,4,2,sh(c)),'#f4b5a0'),
];
const top=[
 o('Cream Tee',c=>R(11,22,10,8,c)+sl(c,23,3)+R(15,22,2,1,'#ffd9c2')+R(11,29,10,1,sh(c)),'#fff3df'),
 o('Crop Top',c=>R(11,22,10,5,c)+sl(c,23,2)+R(11,26,10,1,sh(c)),'#ffb7cf'),
 o('Sweater',c=>R(11,22,10,9,c)+sl(c,23,7)+R(8,29,3,1,W)+R(21,29,3,1,W)+R(11,30,10,1,W),'#c9b6f5'),
 o('Bow Blouse',c=>R(11,22,10,8,c)+sl(c,23,3)+R(14,22,2,2,'#ff9fc0')+R(16,22,2,2,'#ff9fc0')+R(15,23,2,1,'#e8668b'),'#bfe3fb'),
 o('Camisole',c=>R(12,22,8,8,c)+R(12,22,1,1,sh(c))+R(19,22,1,1,sh(c))+R(12,29,8,1,sh(c)),'#fff0a8'),
];
const skirt=[
 o('Pleated',c=>R(10,29,12,2,sh(c))+R(9,31,14,5,c)+[10,13,16,19].map(x=>R(x,31,1,5,sh(c,-14))).join(''),'#ffb7cf'),
 o('Tutu',c=>R(10,29,12,2,sh(c))+R(7,31,18,3,c)+R(6,34,20,2,c)+R(8,33,1,1,W)+R(23,34,1,1,W),'#d3c2f7'),
 o('Denim Mini',c=>R(10,29,12,2,sh(c))+R(10,31,12,3,c)+R(15,29,2,5,sh(c,-12)),'#8fb8e0'),
 o('Plaid',c=>R(10,29,12,2,sh(c))+R(9,31,14,5,c)+R(9,33,14,1,'#fff3df')+R(12,31,1,5,'#fff3df')+R(18,31,1,5,'#fff3df'),'#c9604f'),
];
const pants=[
 o('Cream Shorts',c=>R(11,30,10,3,c)+R(12,33,3,2,c)+R(17,33,3,2,c)+R(15,30,2,2,sh(c)),'#fff3df'),
 o('Jeans',c=>R(11,30,10,3,c)+R(12,33,3,8,c)+R(17,33,3,8,c)+R(15,30,2,3,sh(c))+R(11,30,10,1,sh(c,-14)),'#8fb8e0'),
 o('Overalls',c=>R(11,30,10,3,c)+R(12,33,3,6,c)+R(17,33,3,6,c)+R(12,25,8,5,c)+R(12,22,2,3,c)+R(18,22,2,3,c)+R(13,27,2,2,'#ffd84a'),'#d3c2f7'),
 o('Cargo',c=>R(11,30,10,3,c)+R(12,33,3,8,c)+R(17,33,3,8,c)+R(12,36,3,2,sh(c))+R(17,36,3,2,sh(c)),'#b8c99a'),
];
const outer=[
 o('Cardigan',c=>R(10,22,3,9,c)+R(19,22,3,9,c)+sl(c,23,7)+R(10,30,12,1,sh(c))+R(11,24,1,1,W)+R(11,27,1,1,W),'#ffc9dc'),
 o('Bomber',c=>R(10,22,12,8,c)+sl(c,23,7)+R(10,29,12,1,sh(c))+R(15,22,2,8,'#ffd9c2'),'#9ccdf5'),
 o('Hoodie',c=>R(9,21,14,3,c)+R(10,24,12,7,c)+sl(c,24,6)+R(12,28,8,2,sh(c))+R(14,24,1,3,W)+R(17,24,1,3,W),'#d3c2f7'),
 o('Cape',c=>R(9,22,14,3,c)+R(10,25,12,5,c)+R(8,30,16,1,sh(c))+R(15,22,2,2,'#ffd84a'),'#e8668b'),
];
const shoes=[
 o('Sneakers',c=>R(11,41,5,3,c)+R(16,41,5,3,c)+R(11,43,5,1,sh(c,-50))+R(16,43,5,1,sh(c,-50))+R(12,41,2,1,W)+R(17,41,2,1,W),'#fff3df'),
 o('Pink Boots',c=>R(12,37,3,7,c)+R(17,37,3,7,c)+R(11,42,5,2,c)+R(16,42,5,2,c)+R(12,37,3,1,W)+R(17,37,3,1,W),'#ffa6c9'),
 o('Mary Janes',c=>R(11,41,5,3,c)+R(16,41,5,3,c)+R(12,41,3,1,W)+R(17,41,3,1,W),'#7a4a35'),
 o('Sky Flats',c=>R(11,42,5,2,c)+R(16,42,5,2,c)+R(13,42,1,1,W)+R(18,42,1,1,W),'#8ec9f0'),
];

/* ===== Accessories ===== */
const ear=(c,d)=>R(6,15,1,2,c)+R(25,15,1,2,c)+R(6,17,1,1,d||c)+R(25,17,1,1,d||c);
const earrings=[
 o('Pearls',c=>R(6,15,1,2,c)+R(25,15,1,2,c)+R(6,15,1,1,'#e9dff7')+R(25,15,1,1,'#e9dff7'),'#fff'),
 o('Hearts',c=>ear(c),'#ff5f8f'),o('Stars',c=>ear(c,'#fff3a8'),'#ffd84a'),
 o('Drops',c=>R(6,14,1,1,'#ffd84a')+R(25,14,1,1,'#ffd84a')+R(6,15,1,3,c)+R(25,15,1,3,c),'#8ec9f0'),
];
const necklace=[
 o('Pearl',c=>R(13,22,1,1,c)+R(14,23,1,1,c)+R(15,23,2,1,c)+R(17,23,1,1,c)+R(18,22,1,1,c),'#fff'),
 o('Heart',c=>R(13,22,6,1,'#ffd84a')+R(14,23,1,1,'#ffd84a')+R(17,23,1,1,'#ffd84a')+R(15,24,2,1,c)+R(15,23,2,1,c),'#ff5f8f'),
 o('Gold',c=>R(13,22,1,1,c)+R(14,23,4,1,c)+R(18,22,1,1,c)+R(15,24,2,1,c),'#ffd84a'),
 o('Choker',c=>R(13,21,6,1,c)+R(15,22,2,1,'#ffd84a'),'#7a4aa8'),
];
const frame=c=>both(x=>R(x-1,10,5,1,c)+R(x-1,15,5,1,c)+R(x-1,10,1,6,c)+R(x+3,10,1,6,c))+R(15,12,2,1,c);
const glasses=[
 o('Round',frame,'#7a4a35'),o('Pink',frame,'#ff8fb3'),o('Sky',frame,'#6bb5ea'),
 o('Shades',c=>both(x=>R(x-1,10,5,5,c)+R(x,11,1,1,'#7a7a9a'))+R(15,11,2,1,c)+R(7,11,2,1,c)+R(23,11,2,1,c),'#2b2030'),
];
const ribbon=[
 o('Pink Bow',c=>R(8,3,3,3,c)+R(12,3,3,3,c)+R(11,4,1,1,sh(c)),'#ff9fc0'),
 o('Lilac Bow',c=>R(17,3,3,3,c)+R(21,3,3,3,c)+R(20,4,1,1,sh(c)),'#b9a2e8'),
 o('Twin Bows',c=>R(7,4,2,3,c)+R(10,4,2,3,c)+R(9,5,1,1,sh(c))+R(20,4,2,3,c)+R(23,4,2,3,c)+R(22,5,1,1,sh(c)),'#8ec9f0'),
 o('Headband',c=>R(9,5,14,1,c)+R(8,6,1,2,c)+R(23,6,1,2,c)+R(15,4,2,1,'#ffd84a'),'#ff8fb3'),
];
const hat=[
 o('Beret',c=>R(8,2,14,4,c)+R(10,1,10,1,c)+R(14,0,3,1,sh(c))+R(8,5,16,1,sh(c)),'#e8668b'),
 o('Bucket',c=>R(5,5,22,2,sh(c))+R(8,1,16,5,c)+R(8,4,16,1,'#ffd84a'),'#fff3df'),
 o('Cat Ears',c=>R(8,2,4,4,c)+R(9,1,2,1,c)+R(20,2,4,4,c)+R(21,1,2,1,c)+R(9,3,2,2,'#ffc9dc')+R(21,3,2,2,'#ffc9dc'),'#5a4a6a'),
 o('Flowers',c=>[9,13,17,21].map((x,i)=>R(x,4,2,2,['#ff9fc0','#fff3a8','#b9a2e8','#8ec9f0'][i])+R(x+(i%2),3,1,1,c)).join('')+R(8,5,16,1,'#8ccf9a'),'#ffd84a'),
];
const bag=[
 o('Heart Bag',c=>R(22,24,1,5,sh(c))+ob(22,29,6,5,c)+R(23,30,1,1,W),'#ff8fb3'),
 o('Star Bag',c=>R(22,24,1,5,sh(c))+ob(22,29,6,5,c)+R(24,31,2,1,'#ffd84a')+R(25,30,1,3,'#ffd84a'),'#b9a2e8'),
 o('Backpack',c=>R(11,23,1,6,sh(c))+R(20,23,1,6,sh(c))+ob(5,24,3,8,c)+R(5,27,3,1,sh(c)),'#9ccdf5'),
 o('Basket',c=>R(22,26,1,3,'#b9824f')+ob(21,29,7,5,c)+R(22,31,5,1,sh(c)),'#e6b97a'),
];

/* ===== Slots & categories ===== */
const S={
 hair:{l:'Style',z:[0,8],vb:'2 0 28 22',items:hair,req:1},
 hairColor:{l:'Color',items:hairCols.map(([n,c])=>o(n,null,c)),req:1},
 skin:{l:'Skin',items:skins.map(([n,c])=>o(n,null,c)),req:1},
 eyes:{l:'Eyes',z:[9],vb:'8 8 16 9',items:eyes,req:1},
 brows:{l:'Brows',z:[9],vb:'8 6 16 6',items:brows},
 blush:{l:'Blush',z:[9],vb:'8 12 16 8',items:blush},
 lips:{l:'Lips',z:[9],vb:'10 14 12 7',items:lips},
 makeup:{l:'Makeup',z:[9],vb:'6 8 20 12',items:makeup},
 dress:{l:'Dress',z:[4],vb:'5 20 22 18',items:dress},
 top:{l:'Top',z:[4],vb:'6 20 20 12',items:top},
 skirt:{l:'Skirt',z:[3],vb:'4 27 24 11',items:skirt},
 pants:{l:'Pants',z:[3],vb:'8 28 16 14',items:pants},
 outer:{l:'Outer',z:[5],vb:'6 20 20 12',items:outer},
 shoes:{l:'Shoes',z:[2],vb:'8 35 16 10',items:shoes},
 earrings:{l:'Earring',z:[11],vb:'3 11 26 9',items:earrings},
 necklace:{l:'Necklace',z:[12],vb:'9 19 14 8',items:necklace},
 glasses:{l:'Glasses',z:[13],vb:'6 7 20 11',items:glasses},
 ribbon:{l:'Ribbon',z:[10],vb:'4 0 24 10',items:ribbon},
 hat:{l:'Hat',z:[10],vb:'3 0 26 9',items:hat},
 bag:{l:'Bag',z:[14],vb:'3 22 26 14',items:bag},
};
const CATS=[
 {id:'hair',l:'Hair',s:['hair','hairColor']},
 {id:'face',l:'Face',s:['skin','eyes','brows','blush','lips','makeup']},
 {id:'outfit',l:'Outfit',s:['dress','top','skirt','pants','outer','shoes']},
 {id:'acc',l:'Acc.',s:['earrings','necklace','glasses','ribbon','hat','bag']},
];
const START={hair:0,hairColor:0,skin:0,eyes:0,brows:0,blush:0,lips:0,makeup:-1,dress:-1,top:0,skirt:-1,pants:0,outer:-1,shoes:0,earrings:-1,necklace:-1,glasses:-1,ribbon:-1,hat:-1,bag:-1};
let sel={...START},cat='hair',sub='hair',unlock=false;
const $=id=>document.getElementById(id);

/* ===== Rendering ===== */
function scene(st){
 const sk=skins[st.skin][1],hc=hairCols[st.hairColor][1],parts=[];
 parts.push([1,ob(8,23,3,8,sk)+ob(21,23,3,8,sk)+ob(11,22,10,10,sk)+ob(12,31,3,11,sk)+ob(17,31,3,11,sk)]);
 parts.push([6,ob(8,6,16,15,sk)+R(10,8,2,1,sh(sk,18))]);
 for(const k in S){
  const s=S[k],i=st[k];if(i<0||!s.z)continue;
  const it=s.items[i],r=it.f(k==='hair'?hc:it.c);
  if(k==='hair'){parts.push([0,r.b],[8,r.f]);}
  else parts.push([s.z[0],k==='eyes'?`<g class="eyes">${r}</g>`:r]);
 }
 return parts.sort((a,b)=>a[0]-b[0]).map(p=>p[1]).join('');
}
const doll=$('doll');
function draw(){doll.innerHTML=scene(sel);}

function thumb(k,it){
 const s=S[k];
 if(!it.f)return `<span class="sw" style="background:${it.c}"></span>`;
 let r=it.f(k==='hair'?hairCols[sel.hairColor][1]:it.c);if(k==='hair')r=r.b+r.f;
 return `<svg viewBox="${s.vb}" shape-rendering="crispEdges">${r}</svg>`;
}
function buildTabs(){
 $('cats').innerHTML=CATS.map(c=>`<button class="tab" data-c="${c.id}" aria-pressed="${c.id===cat}">${c.l}</button>`).join('');
 const c=CATS.find(x=>x.id===cat);
 $('subs').innerHTML=c.s.map(k=>`<button class="tab" data-s="${k}" aria-pressed="${k===sub}">${S[k].l}</button>`).join('');
}
function buildGrid(){
 const s=S[sub];
 let h=s.req?'':`<button class="item none" data-i="-1" aria-pressed="${sel[sub]<0}" title="Tanpa item">∅</button>`;
 h+=s.items.map((it,i)=>`<button class="item" data-i="${i}" aria-pressed="${sel[sub]===i}">${thumb(sub,it)}<span>${it.n}</span></button>`).join('');
 $('grid').innerHTML=h;
}
const say=['Ooh, so cute!','Love this look!','Dreamy~','Sooo aesthetic!','Perfect match!','Sparkle sparkle!','Pastel queen!'];
function pop(){
 const b=$('bubble');b.textContent=say[Math.floor(Math.random()*say.length)];
 b.style.animation='none';void b.offsetWidth;b.style.animation='';
 doll.classList.remove('shake');void doll.offsetWidth;doll.classList.add('shake');
}
function pick(k,i){
 sel[k]=i;
 if(i>=0){
  if(k==='dress')sel.top=sel.skirt=sel.pants=-1;
  if(['top','skirt','pants'].includes(k))sel.dress=-1;
  if(k==='skirt')sel.pants=-1;if(k==='pants')sel.skirt=-1;
 }
 draw();buildGrid();pop();
}

/* ===== Events ===== */
$('cats').onclick=e=>{const b=e.target.closest('[data-c]');if(!b)return;cat=b.dataset.c;sub=CATS.find(c=>c.id===cat).s[0];buildTabs();buildGrid();};
$('subs').onclick=e=>{const b=e.target.closest('[data-s]');if(!b)return;sub=b.dataset.s;buildTabs();buildGrid();};
$('grid').onclick=e=>{const b=e.target.closest('[data-i]');if(b)pick(sub,+b.dataset.i);};

const rnd=n=>Math.floor(Math.random()*n);
$('randomBtn').onclick=()=>{
 const n={...START};
 for(const k in S){const len=S[k].items.length;n[k]=S[k].req?rnd(len):(Math.random()<.35?-1:rnd(len));}
 n.brows=rnd(3);n.lips=rnd(5);n.shoes=rnd(4);
 n.dress=n.top=n.skirt=n.pants=-1;
 if(Math.random()<.4)n.dress=rnd(dress.length);
 else{n.top=rnd(top.length);if(Math.random()<.5)n.skirt=rnd(skirt.length);else n.pants=rnd(pants.length);}
 sel=n;draw();buildGrid();pop();
};
$('resetBtn').onclick=()=>{sel={...START};draw();buildGrid();$('bubble').textContent='Kembali ke awal!';};

const adj=['Cocoa','Cotton Candy','Lavender','Sky','Honey','Midnight','Mint'];
const vibe=['Daydream','Sundae','Picnic','Lullaby','Wonderland','Tea Party','Moonlight','Fairytale','Bakery','Starlight'];
$('finishBtn').onclick=()=>{
 const idx=Object.values(sel).reduce((a,b)=>a+b+1,0);
 $('lookName').textContent=`${adj[sel.hairColor]} ${vibe[idx%vibe.length]}`;
 const main=sel.dress>=0?dress[sel.dress].n+' Dress':`${top[sel.top]?.n||'Basic'} + ${(skirt[sel.skirt]||pants[sel.pants]||{n:'Cute Bottom'}).n}`;
 const extras=['hat','ribbon','glasses','bag','necklace','earrings'].filter(k=>sel[k]>=0).map(k=>S[k].items[sel[k]].n);
 $('lookDesc').textContent=`${hair[sel.hair].n} hair, ${main}${extras.length?', plus '+extras.slice(0,3).join(', '):''}.`;
 const score=Math.min(5,2+Math.ceil(extras.length/2)+(sel.makeup>=0?1:0)+(sel.outer>=0?1:0));
 $('lookStars').textContent='★'.repeat(score)+'☆'.repeat(5-score);
 $('finalDoll').innerHTML=scene(sel);
 $('result').hidden=false;$('againBtn').focus();
};
$('keepBtn').onclick=()=>{$('result').hidden=true;};
$('againBtn').onclick=()=>{$('result').hidden=true;$('resetBtn').click();cat='hair';sub='hair';buildTabs();buildGrid();$('bubble').textContent='Ronde baru, ayo!';};
addEventListener('keydown',e=>{if(e.key==='Escape')$('result').hidden=true;});

/* ===== Dreamy sky ===== */
(()=>{const g=['✦','✧','★','❀','♥','✿'],sk=$('sky');
 for(let i=0;i<28;i++){const s=document.createElement('span');s.className='sp';s.textContent=g[i%g.length];
  s.style.cssText=`left:${Math.random()*100}%;top:${Math.random()*100}%;font-size:${10+Math.random()*18}px;--d:${2+Math.random()*4}s;animation-delay:${-Math.random()*4}s`;sk.appendChild(s);}})();

buildTabs();buildGrid();draw();
