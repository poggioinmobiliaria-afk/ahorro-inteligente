const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs');
const b64=f=>'data:image/png;base64,'+fs.readFileSync(f).toString('base64');
const LW=b64('logo_white.png'), LC=b64('stickers/logo_transparente.png');
const items=[
 ['🔑','Se rompió la cerradura','INQ','Es mantenimiento por el uso diario. Lo arregla el inquilino.'],
 ['💧','Humedad en la pared','PROP','Es un problema de la construcción. Lo arregla el propietario.'],
 ['🚰','Gotea la canilla','INQ','Cambiar un cuerito o un flexible es mantenimiento menor.'],
 ['🔥','Se rompió el termotanque','PROP','Si falla por desgaste o vida útil, lo repone el propietario. Si fue por mal uso, el inquilino.'],
 ['🏠','Se llueve el techo','PROP','Filtraciones y techos son reparaciones necesarias: propietario.'],
 ['🪟','Se rompió un vidrio','INQ','Si lo rompió el inquilino, lo repone él.'],
];
const N=items.length+2;
const css=`*{margin:0;box-sizing:border-box}body{width:1080px;height:1350px;font-family:'DejaVu Sans',sans-serif;position:relative;overflow:hidden}
.bo{background:#4e1b1f;color:#fff}.cr{background:#f7f2ea;color:#4e1b1f}
.frame{position:absolute;inset:36px;border:3px solid #c9a27a}
.logo{position:absolute;top:70px;right:80px;width:140px}
.foot{position:absolute;bottom:80px;left:100px;right:100px;display:flex;justify-content:space-between;font-size:26px;letter-spacing:3px}
.tag{font-size:36px;letter-spacing:6px;font-weight:700;color:#9c6b3f}.bo .tag{color:#d9b98a}
h1{font-family:'DejaVu Serif',serif;font-size:96px;line-height:1.05}
.ic{font-size:150px}
.q{font-family:'DejaVu Serif',serif;font-size:74px;font-weight:700;line-height:1.1;margin-top:30px}
.who{margin-top:60px;display:inline-block;font-size:64px;font-weight:700;letter-spacing:4px;padding:22px 44px;border-radius:18px}
.INQ{background:#4e1b1f;color:#fff}.PROP{background:#c9a27a;color:#4e1b1f}
.why{font-size:40px;line-height:1.4;margin-top:50px}
.in{position:absolute;left:100px;right:100px}`;
const foot=(i)=>`<div class="foot"><span>MA.FRA · ESTUDIO JURÍDICO & INMOBILIARIO</span><span>${i}/${N}</span></div>`;
const slides=[];
slides.push(`<body class="bo"><div class="frame"></div><img class="logo" src="${LW}"><div class="in" style="top:320px"><div class="tag">ALQUILERES</div><h1 style="margin-top:40px">¿Quién paga el arreglo?</h1><div style="font-size:52px;margin-top:40px;color:#d9b98a;font-weight:700">¿Inquilino o propietario?</div><div style="font-size:38px;margin-top:60px;color:#f0e2cf">Deslizá y fijate si acertás →</div></div>${foot(1)}</body>`);
items.forEach((it,k)=>slides.push(`<body class="cr"><div class="frame"></div><img class="logo" src="${LC}"><div class="in" style="top:240px"><div class="ic">${it[0]}</div><div class="q">${it[1]}</div><div class="who ${it[2]}">${it[2]=='INQ'?'INQUILINO':'PROPIETARIO'}</div><div class="why">${it[3]}</div></div>${foot(k+2)}</body>`));
slides.push(`<body class="bo"><div class="frame"></div><img class="logo" src="${LW}"><div class="in" style="top:330px"><div class="tag">IMPORTANTE</div><div class="q" style="font-size:66px">Siempre manda lo que dice el contrato.</div><div class="why" style="color:#f0e2cf">Antes de arreglar o de pagar, avisá por escrito y guardá fotos y comprobantes.</div><div class="who PROP" style="font-size:44px">¿Dudas con tu alquiler? Escribinos 💬</div></div>${foot(N)}</body>`);
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1080,height:1350}});
for(let i=0;i<slides.length;i++){await p.setContent(`<html><head><meta charset="utf8"><style>${css}</style></head>${slides[i]}</html>`);await p.waitForTimeout(300);await p.screenshot({path:`quien/quienpaga_${i+1}.jpg`,type:'jpeg',quality:90});}
await b.close();})();
