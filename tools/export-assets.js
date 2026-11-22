// Sumber gambar ada di tools/art-source.js. Jalankan: node tools/export-assets.js  (dari folder pixel-doll)
const fs=require('fs'),path=require('path');
let src=fs.readFileSync('tools/art-source.js','utf8');
src=src.slice(0,src.indexOf("const doll=$('doll');"))+"\nreturn {S,scene,hairCols,skins,START,R,ob};";
const {S,scene,hairCols,skins,START,R,ob}=new Function(src)();
const svg=i=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 45" width="256" height="360" shape-rendering="crispEdges">${i}</svg>\n`;
const slug=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const out='assets/svg',manifest={canvas:{w:32,h:45},note:'Semua layer berukuran sama (32x45). Tumpuk berurutan sesuai z (kecil = paling belakang).',layers:[]};
const save=(dir,name,inner,meta)=>{fs.mkdirSync(path.join(out,dir),{recursive:true});const f=`${dir}/${name}.svg`;fs.writeFileSync(path.join(out,f),svg(inner));manifest.layers.push({slot:dir,file:'svg/'+f,...meta});};
// tubuh + kepala per warna kulit
skins.forEach(([n,c])=>save('body',`body_${slug(n)}`,ob(8,23,3,8,c)+ob(21,23,3,8,c)+ob(11,22,10,10,c)+ob(12,31,3,11,c)+ob(17,31,3,11,c)+ob(8,6,16,15,c),{name:n,z:1}));
for(const k in S){
  const s=S[k];if(!s.z)continue;
  s.items.forEach(it=>{
    if(k==='hair'){hairCols.forEach(([cn,cc])=>{const r=it.f(cc);const b=`hair_${slug(it.n)}_${slug(cn)}`;
      save('hair',b+'_back',r.b,{name:it.n,color:cn,part:'back',z:0});save('hair',b+'_front',r.f,{name:it.n,color:cn,part:'front',z:8});});}
    else save(k,`${k}_${slug(it.n)}`,it.f(it.c),{name:it.n,z:s.z[0]});
  });
}
fs.writeFileSync('assets/manifest.json',JSON.stringify(manifest,null,1));
fs.writeFileSync('assets/preview_default.svg',svg(scene(START)));
console.log(manifest.layers.length+' file SVG');
