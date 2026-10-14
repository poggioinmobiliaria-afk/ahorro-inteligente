const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs');
const LOGOW='data:image/png;base64,'+fs.readFileSync('logo_white.png').toString('base64');
const html=`<html><head><meta charset="utf8"><style>*{margin:0;box-sizing:border-box}
body{width:1080px;height:1920px;background:#4e1b1f;color:#fff;font-family:'DejaVu Serif',serif;position:relative}
.frame{position:absolute;inset:40px;border:3px solid #c9a27a}
.logo{position:absolute;top:90px;right:110px;width:150px}
.top{position:absolute;top:300px;left:110px;right:110px}
.tag{font-family:'DejaVu Sans',sans-serif;font-size:44px;letter-spacing:8px;color:#d9b98a;font-weight:700;margin-bottom:50px}
h1{font-size:84px;line-height:1.12}
.bar{width:120px;height:8px;background:#c9a27a;margin-top:50px}
.hint{position:absolute;top:1180px;left:0;right:0;text-align:center;font-family:'DejaVu Sans',sans-serif;font-size:32px;color:#d9b98a;opacity:.5}
.foot{position:absolute;bottom:110px;left:0;right:0;text-align:center;font-family:'DejaVu Sans',sans-serif;font-size:28px;letter-spacing:3px}
</style></head><body><div class="frame"></div><img class="logo" src="${LOGOW}">
<div class="top"><div class="tag">PONETE A PRUEBA</div><h1>Se vence tu contrato de alquiler y nadie dice nada. ¿Qué pasa?</h1><div class="bar"></div></div>
<div class="foot">MA.FRA · ESTUDIO JURÍDICO & INMOBILIARIO</div></body></html>`;
(async()=>{const br=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await br.newPage({viewport:{width:1080,height:1920}});
await p.setContent(html);await p.waitForTimeout(300);await p.screenshot({path:'historia_encuesta2.jpg',type:'jpeg',quality:92});await br.close();})();
