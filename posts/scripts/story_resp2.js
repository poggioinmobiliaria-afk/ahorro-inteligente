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
h1{font-family:'DejaVu Serif',serif;font-size:60px;line-height:1.12;margin-top:26px}
.barr{width:120px;height:8px;background:#c9a27a;margin:40px 0}
.opt{position:relative;height:120px;border-radius:24px;background:rgba(255,255,255,.12);margin-bottom:30px;overflow:hidden;display:flex;align-items:center;padding:0 40px}
.fill{position:absolute;left:0;top:0;bottom:0;background:rgba(201,162,122,.45)}
.win{background:#f0e2cf !important}.win .fill{background:#c9a27a}.win .pc{color:#4e1b1f}.win{color:#4e1b1f;font-weight:700}
.lbl,.pc{position:relative;font-size:38px}.pc{margin-left:auto;font-weight:700}
.ans{margin-top:40px;background:#f7f2ea;color:#4e1b1f;border-radius:28px;padding:50px}
.ans b{display:block;font-family:'DejaVu Serif',serif;font-size:54px;margin-bottom:24px}
.ans p{font-size:33px;line-height:1.45}
.cta{margin-top:36px;font-size:36px;text-align:center;color:#d9b98a;font-weight:700}
.foot{position:absolute;bottom:110px;left:0;right:0;text-align:center;font-size:28px;letter-spacing:3px}
</style></head><body><div class="frame"></div><img class="logo" src="${LOGOW}">
<div class="wrap"><div class="tag">RESULTADO DE LA ENCUESTA</div>
<h1>Se vence tu contrato y nadie dice nada. ¿Qué pasa?</h1><div class="barr"></div>
${bar('Sigue igual hasta que alguien avise',50,true)}${bar('Pasa a pagar el doble',30)}${bar('Se renueva por 2 años',20)}
<div class="ans"><b>✔ Correcto: sigue igual hasta que alguien avise</b>
<p>Si el inquilino sigue y el propietario cobra, el contrato continúa en las mismas condiciones. No se renueva solo: cualquiera de los dos puede darlo por terminado, y el propietario puede pedir la devolución en cualquier momento.</p></div>
<div class="cta">¿Se te vence el contrato? Escribinos 💬</div></div>
<div class="foot">MA.FRA · ESTUDIO JURÍDICO & INMOBILIARIO</div></body></html>`;
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.setContent(html);await p.waitForTimeout(300);await p.screenshot({path:'historia_resultado2.jpg',type:'jpeg',quality:92});await b.close();})();
