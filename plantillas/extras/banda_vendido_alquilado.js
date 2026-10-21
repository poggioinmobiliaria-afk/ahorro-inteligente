// Pone un sello ALQUILADO/VENDIDO cruzado en diagonal sobre una imagen (historia 1080x1920 o post).
// Uso: node cruzar.js <imagen> <ALQUILADO|VENDIDO> <salida.jpg>
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs');
const [img,t='VENDIDO',out='cruzado.jpg']=process.argv.slice(2);
const I='data:image/jpeg;base64,'+fs.readFileSync(img).toString('base64');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1080,height:1920}});
const dims=await (async()=>{await p.setContent(`<img id=i src="${I}">`);return p.evaluate(()=>{const i=document.getElementById('i');return [i.naturalWidth,i.naturalHeight]})})();
const [W,H]=dims; await p.setViewportSize({width:W,height:H});
const fs_=Math.round(W*1.05/(t.length+3));
await p.setContent(`<html><head><meta charset="utf8"><style>*{margin:0}body{width:${W}px;height:${H}px;position:relative;overflow:hidden;background:url(${I}) center/cover}
.s{position:absolute;left:50%;top:${Math.round(H*(H>W*1.5?0.44:0.5))}px;transform:translate(-50%,-50%) rotate(-28deg);width:${Math.round(Math.hypot(W,H)*1.05)}px;text-align:center;background:#c9a27a;border-top:${Math.round(W*0.012)}px solid #4e1b1f;border-bottom:${Math.round(W*0.012)}px solid #4e1b1f;padding:${Math.round(W*0.02)}px 0;box-shadow:0 10px 40px rgba(0,0,0,.45)}
.s b{display:block;font:700 ${fs_}px 'DejaVu Serif',serif;color:#4e1b1f;letter-spacing:${Math.round(W*0.012)}px}
.s i{display:block;font:normal ${Math.round(fs_*0.28)}px 'DejaVu Sans';color:#4e1b1f;letter-spacing:6px}</style></head><body><div class=s><b>¡${t}!</b><i>MA.FRA · LA CARLOTA</i></div></body></html>`);
await p.waitForTimeout(200);await p.screenshot({path:out,type:'jpeg',quality:90});await b.close();console.log('OK',out)})();
