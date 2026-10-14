const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs');
const b64=f=>'data:image/'+(f.endsWith('png')?'png':'jpeg')+';base64,'+fs.readFileSync(f).toString('base64');
const LOGOW=b64('logo_white.png'), LOGO=b64('stickers/logo_transparente.png'), P=b64('casa_pileta.jpg');
const css=`*{margin:0;box-sizing:border-box}body{width:1080px;height:1350px;font-family:'DejaVu Sans',sans-serif;position:relative;overflow:hidden}
.bo{background:#4e1b1f;color:#fff}.cr{background:#f7f2ea;color:#4e1b1f}
.frame{position:absolute;inset:36px;border:3px solid #c9a27a;z-index:2}
.logo{position:absolute;top:70px;right:80px;width:140px;z-index:3}
.tag{font-size:36px;letter-spacing:6px;color:#d9b98a;font-weight:700}.cr .tag{color:#9c6b3f}
h1{font-family:'DejaVu Serif',serif;font-size:100px;line-height:1.05;font-weight:700}
h2{font-family:'DejaVu Serif',serif;font-size:72px;line-height:1.1;font-weight:700}
p{font-size:42px;line-height:1.4}
.bar{width:120px;height:8px;background:#c9a27a;margin:44px 0}
.foot{position:absolute;bottom:80px;left:100px;right:100px;display:flex;justify-content:space-between;font-size:26px;letter-spacing:3px;z-index:3}
.in{position:absolute;left:100px;right:100px}
.step{display:flex;gap:40px;align-items:flex-start;margin-bottom:56px}
.num{font-family:'DejaVu Serif',serif;font-size:110px;font-weight:700;color:#b08050;line-height:.9;width:80px}
.step b{font-family:'DejaVu Serif',serif;font-size:52px;display:block;margin-bottom:10px}
.step span{font-size:36px;line-height:1.35}
.ph{position:absolute;inset:0;background:url(${P}) center/cover}
.ph:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(78,27,31,.35) 0%,rgba(78,27,31,.93) 55%,rgba(78,27,31,1) 100%)}
.pill{display:inline-block;background:#c9a27a;color:#4e1b1f;font-weight:700;font-size:44px;padding:20px 40px;border-radius:16px;margin-top:40px}`;
const foot=(i,n)=>`<div class="foot"><span>MA.FRA · ESTUDIO JURÍDICO & INMOBILIARIO</span><span>${i}/${n}</span></div>`;
const N=4;
const slides=[
`<body class="bo"><div class="ph"></div><div class="frame"></div><img class="logo" src="${LOGOW}">
<div class="in" style="top:560px;z-index:3"><div class="tag">🌾 PARA PRODUCTORES</div><div class="bar" style="margin:36px 0"></div>
<h1>¿Y si pagás tu casa con cereal?</h1><p style="margin-top:40px;color:#f0e2cf">Con la soja del acopio o del silobolsa. Deslizá →</p></div>${foot(1,N)}</body>`,
`<body class="cr"><div class="frame"></div><img class="logo" src="${LOGO}">
<div class="in" style="top:190px"><div class="tag">CÓMO FUNCIONA</div><div class="bar"></div>
<div class="step"><div class="num">1</div><div><b>Elegís la propiedad</b><span>Casa, departamento para renta o lote.</span></div></div>
<div class="step"><div class="num">2</div><div><b>Acordamos el precio en dólares</b><span>El valor de la propiedad queda fijo.</span></div></div>
<div class="step"><div class="num">3</div><div><b>Vendés tu cereal</b><span>En tu acopio de siempre, a precio pizarra.</span></div></div>
<div class="step"><div class="num">4</div><div><b>Pagás y escriturás</b><span>Nosotros coordinamos todo hasta el final.</span></div></div></div>${foot(2,N)}</body>`,
null,
`<body class="bo"><div class="frame"></div><img class="logo" src="${LOGOW}">
<div class="in" style="top:300px"><div class="tag">PRÓXIMAMENTE</div><div class="bar"></div>
<h2>Tu cosecha puede ser tu próxima propiedad.</h2>
<p style="margin-top:50px;color:#f0e2cf">¿Querés ser de los primeros en recibir opciones?</p>
<div class="pill">Escribinos “CEREAL” 💬</div>
<p style="margin-top:40px;font-size:36px;color:#d9b98a">📲 3584447604</p></div>${foot(4,N)}</body>`];
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1080,height:1350}});
for(let i=0;i<slides.length;i++){if(!slides[i])continue;await p.setContent(`<html><head><meta charset="utf8"><style>${css}</style></head>${slides[i]}</html>`);await p.waitForTimeout(400);await p.screenshot({path:`cereal_${i+1}.jpg`,type:'jpeg',quality:92});}
await b.close();})();
