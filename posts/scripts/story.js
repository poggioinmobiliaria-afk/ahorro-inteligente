const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const html=`<html><head><meta charset="utf8"><style>*{margin:0;box-sizing:border-box}
body{width:1080px;height:1920px;background:#0f1f3d;color:#fff;font-family:'DejaVu Serif',serif;position:relative}
.frame{position:absolute;inset:40px;border:3px solid #c9a54c}
.top{position:absolute;top:230px;left:100px;right:100px}
.tag{font-family:'DejaVu Sans',sans-serif;font-size:44px;letter-spacing:8px;color:#c9a54c;font-weight:700;margin-bottom:50px}
h1{font-size:92px;line-height:1.12}
.bar{width:120px;height:8px;background:#c9a54c;margin-top:50px}
.hint{position:absolute;top:1080px;left:0;right:0;text-align:center;font-family:'DejaVu Sans',sans-serif;font-size:34px;color:#c9a54c;opacity:.6}
.foot{position:absolute;bottom:110px;left:100px;right:100px;text-align:center;font-family:'DejaVu Sans',sans-serif;font-size:32px;letter-spacing:4px;color:#c9a54c}
</style></head><body><div class="frame"></div>
<div class="top"><div class="tag">PONETE A PRUEBA</div><h1>Si firmás un contrato de alquiler hoy, ¿cada cuánto te pueden aumentar?</h1><div class="bar"></div></div>

<div class="foot">ESTUDIO MAFRA · LA CARLOTA</div></body></html>`;
(async()=>{const br=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await br.newPage({viewport:{width:1080,height:1920}});
await p.setContent(html);await p.screenshot({path:'historia_encuesta.jpg',type:'jpeg',quality:90});await br.close();console.log('ok')})();
