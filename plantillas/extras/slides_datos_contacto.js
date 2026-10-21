const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs'),path=require('path');
const b64=f=>'data:image/'+(f.endsWith('png')?'png':'jpeg')+';base64,'+fs.readFileSync(f).toString('base64');
const LOGO=b64('/home/user/ahorro-inteligente/plantillas/logo_white.png');
const SAT=b64(path.join(__dirname,'img/sat.jpg')), ACC=b64(path.join(__dirname,'img/zona.jpg'));
const css=`*{margin:0;box-sizing:border-box}body{width:1080px;height:1350px;overflow:hidden;position:relative;background:#4e1b1f;color:#fff;font-family:'DejaVu Sans'}
.marco{position:absolute;inset:24px;border:3px solid #c9a27a}.logo{position:absolute;top:60px;right:60px;width:130px;padding:9px;border:2px solid #c9a27a}
h1{position:absolute;left:80px;top:90px;font:700 72px 'DejaVu Serif',serif;color:#f7f2ea}.lin{position:absolute;left:80px;top:190px;width:160px;height:6px;background:#c9a27a}
.foot{position:absolute;left:70px;right:70px;bottom:52px;display:flex;justify-content:space-between;color:#f0e2cf;font:22px 'DejaVu Sans';letter-spacing:4px}`;
const s2=`<h1>El campo</h1><div class="lin"></div>
<div style="position:absolute;left:80px;right:80px;top:250px;height:520px;background:url(${SAT}) center/cover;border:4px solid #c9a27a"></div>
<div style="position:absolute;left:80px;right:80px;top:820px;font:40px/1.7 'DejaVu Sans'">
<div>📐 <b>116 hectáreas</b> aprox.</div><div>📍 Zona rural de <b>Leguizamón</b>, Córdoba</div><div>🗺️ Límite con Provincia de Buenos Aires</div><div>🛣️ Acceso desde <b>Ruta 7</b></div><div>🌾 Ideal para producción o inversión</div></div>`;
const s3=`<h1>Ubicación</h1><div class="lin"></div>
<div style="position:absolute;left:80px;right:80px;top:250px;height:600px;background:url(${ACC}) center/cover;border:4px solid #c9a27a"></div>
<div style="position:absolute;left:80px;right:80px;top:930px;text-align:center;font:44px/1.5 'DejaVu Sans'"><b>Leguizamón · Acceso desde Ruta 7<br><span style="font-weight:400;font-size:38px;color:#d9b98a">Consultá superficie exacta, mejoras y condiciones</span></b></div>
<div style="position:absolute;left:180px;right:180px;top:1110px;background:#c9a27a;color:#4e1b1f;border-radius:20px;padding:26px;text-align:center;font:700 46px 'DejaVu Sans'">📲 3584447604</div>`;
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
for(const [n,h,i] of [['campo_2.jpg',s2,2],['campo_3.jpg',s3,3]]){const p=await b.newPage({viewport:{width:1080,height:1350}});
await p.setContent(`<html><head><meta charset="utf8"><style>${css}</style></head><body><img class="logo" src="${LOGO}">${h}<div class="foot"><span>MA.FRA · ESTUDIO JURÍDICO &amp; INMOBILIARIO</span><span>${i}/3</span></div><div class="marco"></div></body></html>`);
await p.waitForTimeout(300);await p.screenshot({path:path.join(__dirname,n),type:'jpeg',quality:90});await p.close();}
await b.close();console.log('ok')})();
