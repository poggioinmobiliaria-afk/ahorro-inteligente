const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs');
const LOGOW='data:image/png;base64,'+fs.readFileSync('logo_white.png').toString('base64');
const precio=85000, soja=300, maiz=180, trigo=210;
const t=v=>Math.round(precio/v).toLocaleString('es-AR');
const html=`<html><head><meta charset="utf8"><style>*{margin:0;box-sizing:border-box}
body{width:1080px;height:1350px;background:#4e1b1f;color:#fff;font-family:'DejaVu Sans',sans-serif;position:relative;overflow:hidden}
.frame{position:absolute;inset:36px;border:3px solid #c9a27a}
.logo{position:absolute;top:70px;right:80px;width:140px}
.wrap{position:absolute;top:90px;left:100px;right:100px}
.tag{font-size:34px;letter-spacing:6px;color:#d9b98a;font-weight:700}
.prop{font-family:'DejaVu Serif',serif;font-size:62px;font-weight:700;margin-top:30px;line-height:1.1}
.val{font-size:40px;margin-top:18px;color:#f0e2cf}
.eq{font-family:'DejaVu Serif',serif;font-size:130px;color:#d9b98a;margin:24px 0 0;line-height:1}
.big{background:#f7f2ea;color:#4e1b1f;border-radius:30px;padding:36px 50px;margin-top:22px;display:flex;align-items:center;gap:36px}
.big .ic{font-size:120px}.big .n{font-family:'DejaVu Serif',serif;font-size:150px;font-weight:700;line-height:1}
.big .u{font-size:40px;font-weight:700;letter-spacing:2px}
.row{display:flex;gap:30px;margin-top:30px}
.sm{flex:1;border:3px solid #c9a27a;border-radius:24px;padding:24px 34px}
.sm .n{font-family:'DejaVu Serif',serif;font-size:64px;font-weight:700;color:#d9b98a}.sm .u{font-size:32px}
.cta{margin-top:40px;font-size:38px;font-weight:700;text-align:center}
.note{position:absolute;bottom:125px;left:100px;right:100px;font-size:22px;color:#e6d3bb;opacity:.8;text-align:center}
.foot{position:absolute;bottom:72px;left:0;right:0;text-align:center;font-size:26px;letter-spacing:3px}
</style></head><body><div class="frame"></div><img class="logo" src="${LOGOW}">
<div class="wrap"><div class="tag">🌾 PAGÁ CON TU COSECHA</div>
<div class="prop">Casa 3 dormitorios<br>La Carlota</div>
<div class="val">Valor: USD ${precio.toLocaleString('es-AR')}</div>
<div class="eq">=</div>
<div class="big"><span class="ic">🌱</span><div><div class="n">${t(soja)}</div><div class="u">TONELADAS DE SOJA</div></div></div>
<div class="row"><div class="sm"><div class="n">${t(maiz)} t</div><div class="u">🌽 de maíz</div></div><div class="sm"><div class="n">${t(trigo)} t</div><div class="u">🌾 de trigo</div></div></div>
<div class="cta">Entregás el cereal en el acopio y escriturás.</div></div>
<div class="note">Equivalencia de ejemplo según pizarra de referencia. Se fija el día de la operación.</div>
<div class="foot">MA.FRA · ESTUDIO JURÍDICO & INMOBILIARIO</div></body></html>`;
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1080,height:1350}});
await p.setContent(html);await p.waitForTimeout(400);await p.screenshot({path:'canje_toneladas.jpg',type:'jpeg',quality:92});await b.close();})();
