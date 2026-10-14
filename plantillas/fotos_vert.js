// Pasa fotos a 1080x1350 (formato post vertical) con fondo difuminado.
// Uso: node fotos_vert.js <prefijoSalida> foto1.jpg foto2.jpg ...  -> genera <prefijo>_2.jpg, _3.jpg... (la _1 es la portada)
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs');
const b64=f=>'data:image/jpeg;base64,'+fs.readFileSync(f).toString('base64');
const [out,...fotos]=process.argv.slice(2);
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1080,height:1350}});
for(let i=0;i<fotos.length;i++){const d=b64(fotos[i]);
await p.setContent(`<html><body style="margin:0;width:1080px;height:1350px;overflow:hidden;position:relative;background:#222"><div style="position:absolute;inset:-40px;background:url(${d}) center/cover;filter:blur(30px) brightness(.65)"></div><div style="position:absolute;inset:0;background:url(${d}) center/contain no-repeat;filter:brightness(1.05) contrast(1.08) saturate(1.1)"></div></body></html>`);
await p.waitForTimeout(300);await p.screenshot({path:out+'_'+(i+2)+'.jpg',type:'jpeg',quality:90});}
await b.close();})();
