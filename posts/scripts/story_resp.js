const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs');
const LOGOW='data:image/png;base64,'+fs.readFileSync('logo_white.png').toString('base64');
const bar=(t,p,win)=>`<div class="opt ${win?'win':''}"><div class="fill" style="width:${p}%"></div><span class="lbl">${t}</span><span class="pc">${p}%</span></div>`;
const html=`<html><head><style>*{margin:0;box-sizing:border-box}
body{width:1080px;height:1920px;background:#4e1b1f;color:#fff;font-family:'DejaVu Sans',sans-serif;position:relative}
.frame{position:absolute;inset:40px;border:3px solid #c9a27a}
.logo{position:absolute;top:90px;right:110px;width:150px}
.wrap{position:absolute;top:280px;left:110px;right:110px}
.tag{font-size:40px;letter-spacing:6px;color:#d9b98a;font-weight:700}
h1{font-family:'DejaVu Serif',serif;font-size:66px;line-height:1.12;margin-top:30px}
.barr{width:120px;height:8px;background:#c9a27a;margin:40px 0}
.opt{position:relative;height:120px;border-radius:24px;background:rgba(255,255,255,.12);margin-bottom:30px;overflow:hidden;display:flex;align-items:center;padding:0 40px}
.fill{position:absolute;left:0;top:0;bottom:0;background:rgba(201,162,122,.45)}
.win .fill{background:#c9a27a}.win .pc{color:#fff}.win{color:#4e1b1f;font-weight:700}
.lbl,.pc{position:relative;font-size:38px}.pc{margin-left:auto;font-weight:700}
.ans{margin-top:50px;background:#f7f2ea;color:#4e1b1f;border-radius:28px;padding:50px}
.ans b{display:block;font-family:'DejaVu Serif',serif;font-size:54px;margin-bottom:24px}
.ans p{font-size:36px;line-height:1.45}
.cta{margin-top:50px;font-size:38px;text-align:center;color:#d9b98a;font-weight:700}
.foot{position:absolute;bottom:110px;left:0;right:0;text-align:center;font-size:28px;letter-spacing:3px}
</style></head><body><div class="frame"></div><img class="logo" src="${LOGOW}">
<div class="wrap"><div class="tag">RESULTADO DE LA ENCUESTA</div>
<h1>¿Cada cuánto te pueden aumentar el alquiler?</h1><div class="barr"></div>
${bar('Lo que acuerden las partes',75,true)}${bar('Cada 6 meses',25)}${bar('Cada 1 año',0)}
<div class="ans"><b>✔ Correcto: lo que acuerden las partes</b>
<p>Hoy propietario e inquilino pactan libremente cada cuánto se actualiza y con qué índice. Por eso es clave leer bien esa cláusula antes de firmar.</p></div>
<div class="cta">¿Dudas con tu contrato? Escribinos 💬</div></div>
<div class="foot">MA.FRA · ESTUDIO JURÍDICO & INMOBILIARIO</div></body></html>`;
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.setContent(html);await p.waitForTimeout(300);await p.screenshot({path:'historia_resultado.jpg',type:'jpeg',quality:92});await b.close();})();
