const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs');
const b64=f=>'data:image/'+(f.endsWith('png')?'png':'jpeg')+';base64,'+fs.readFileSync(f).toString('base64');
const LOGOW=b64('logo_white.png'), F=b64('casa_frente.jpg'), P=b64('casa_pileta.jpg');
const dol=1545, precio=135000, soja=562000/dol, maiz=296000/dol, trigo=351200/dol;
const t=v=>Math.round(precio/v).toLocaleString('es-AR');
const html=`<html><head><meta charset="utf8"><style>*{margin:0;box-sizing:border-box}
body{width:1080px;height:1350px;background:#4e1b1f;color:#fff;font-family:'DejaVu Sans',sans-serif;position:relative;overflow:hidden}
.ph{position:absolute;top:0;left:0;width:1080px;height:640px;background:url(${F}) center 40%/cover}
.ph:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(78,27,31,.0) 45%,rgba(78,27,31,1) 100%)}
.pin{position:absolute;top:400px;right:70px;width:300px;height:220px;border:6px solid #f7f2ea;border-radius:18px;background:url(${P}) center/cover;box-shadow:0 10px 30px rgba(0,0,0,.4)}
.logo{position:absolute;top:50px;right:60px;width:140px;background:rgba(78,27,31,.85);border-radius:10px}
.tagp{position:absolute;top:60px;left:60px;background:#c9a27a;color:#4e1b1f;font-weight:700;font-size:32px;letter-spacing:4px;padding:14px 26px;border-radius:12px}
.wrap{position:absolute;top:545px;left:80px;right:80px}
.prop{font-family:'DejaVu Serif',serif;font-size:56px;font-weight:700;line-height:1.1;width:640px}
.feat{font-size:30px;color:#f0e2cf;margin-top:14px}
.val{font-size:44px;font-weight:700;margin-top:12px;color:#d9b98a}
.big{background:#f7f2ea;color:#4e1b1f;border-radius:28px;padding:18px 44px;margin-top:20px;display:flex;align-items:center;gap:30px}
.big .ic{font-size:90px}.big .n{font-family:'DejaVu Serif',serif;font-size:92px;font-weight:700;line-height:1.05;white-space:nowrap}
.big .u{font-size:36px;font-weight:700;letter-spacing:2px}.big .eq{font-size:34px;font-weight:700;color:#9c6b3f}
.ref{margin-top:34px;font-size:40px;line-height:1.4;color:#f0e2cf}.ref b{color:#d9b98a}.row{display:flex;gap:26px;margin-top:18px}
.sm{flex:1;border:3px solid #c9a27a;border-radius:22px;padding:10px 30px}
.sm .n{font-family:"DejaVu Serif",serif;font-size:50px;font-weight:700;color:#d9b98a}.sm .u{font-size:30px}
.note{position:absolute;bottom:92px;left:80px;right:80px;font-size:22px;color:#e6d3bb;opacity:.8;text-align:center}
.foot{position:absolute;bottom:44px;left:0;right:0;text-align:center;font-size:24px;letter-spacing:3px}
</style></head><body><div class="ph"></div><div class="pin"></div><img class="logo" src="${LOGOW}">
<div class="tagp">🌾 PAGÁ CON TU COSECHA</div>
<div class="wrap"><div class="prop">Casa 3 dormitorios con pileta y quincho</div>
<div class="feat">Suite con vestidor · Garage · La Carlota</div>

<div class="big"><span class="ic">🏠</span><div><div class="eq">PRECIO</div><div class="n">USD ${precio.toLocaleString('es-AR')}</div></div></div>
<div class="ref">📈 <b>Aprovechá la suba de la soja.</b><br>Hoy equivale a <b>${t(soja)} toneladas de soja</b>.</div></div>
<div class="note">Equivalencia de referencia: pizarra Rosario 25/9/26 y dólar BNA vendedor $1.545.</div>
<div class="foot">MA.FRA · ESTUDIO JURÍDICO & INMOBILIARIO</div></body></html>`;
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1080,height:1350}});
await p.setContent(html);await p.waitForTimeout(500);await p.screenshot({path:'canje_casa_usd.jpg',type:'jpeg',quality:92});await b.close();})();
