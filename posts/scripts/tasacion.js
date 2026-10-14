const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs');
const b64=f=>'data:image/png;base64,'+fs.readFileSync(f).toString('base64');
const LW=b64('logo_white.png'), LC=b64('stickers/logo_transparente.png');
const items=[
 ['📍','Ubicación','Barrio, cercanía al centro, calle asfaltada, servicios y accesos. Es lo único que no se puede cambiar.'],
 ['📐','Metros y distribución','Metros cubiertos y de terreno, cantidad de dormitorios y baños, patio, cochera.'],
 ['🛠️','Estado y antigüedad','Techos, humedad, instalaciones de gas y luz, aberturas y reformas recientes.'],
 ['📄','Papeles en regla','Escritura, planos aprobados y libre deuda. Con todo en orden, se vende más rápido y mejor.'],
 ['📊','El mercado real','Qué se vendió cerca y a cuánto. No lo que se pide en los avisos, sino lo que realmente se pagó.'],
];
const N=items.length+2;
const css=`*{margin:0;box-sizing:border-box}body{width:1080px;height:1350px;font-family:'DejaVu Sans',sans-serif;position:relative;overflow:hidden}
.bo{background:#4e1b1f;color:#fff}.cr{background:#f7f2ea;color:#4e1b1f}
.frame{position:absolute;inset:36px;border:3px solid #c9a27a}
.logo{position:absolute;top:70px;right:80px;width:140px}
.foot{position:absolute;bottom:80px;left:100px;right:100px;display:flex;justify-content:space-between;font-size:26px;letter-spacing:3px}
.tag{font-size:36px;letter-spacing:6px;font-weight:700;color:#9c6b3f}.bo .tag{color:#d9b98a}
h1{font-family:'DejaVu Serif',serif;font-size:100px;line-height:1.05}
.ic{font-size:150px}
.num{display:inline-block;font-size:34px;font-weight:700;letter-spacing:4px;color:#fff;background:#4e1b1f;padding:10px 26px;border-radius:12px;margin-top:20px}
.q{font-family:'DejaVu Serif',serif;font-size:80px;font-weight:700;line-height:1.1;margin-top:30px}
.why{font-size:42px;line-height:1.45;margin-top:50px}
.in{position:absolute;left:100px;right:100px}`;
const foot=i=>`<div class="foot"><span>MA.FRA · ESTUDIO JURÍDICO & INMOBILIARIO</span><span>${i}/${N}</span></div>`;
const S=[];
S.push(`<body class="bo"><div class="frame"></div><img class="logo" src="${LW}"><div class="in" style="top:300px"><div class="tag">VENTAS</div><h1 style="margin-top:40px">¿Cuánto vale tu casa?</h1><div style="font-size:54px;margin-top:44px;color:#d9b98a;font-weight:700">Las 5 cosas que mira un tasador</div><div style="font-size:38px;margin-top:60px;color:#f0e2cf">Deslizá →</div></div>${foot(1)}</body>`);
items.forEach((it,k)=>S.push(`<body class="cr"><div class="frame"></div><img class="logo" src="${LC}"><div class="in" style="top:230px"><div class="ic">${it[0]}</div><div class="num">${k+1} DE 5</div><div class="q">${it[1]}</div><div class="why">${it[2]}</div></div>${foot(k+2)}</body>`));
S.push(`<body class="bo"><div class="frame"></div><img class="logo" src="${LW}"><div class="in" style="top:300px"><div class="tag">¿PENSÁS EN VENDER?</div><div class="q" style="font-size:76px;margin-top:40px">Un precio bien puesto vende más rápido.</div><div style="font-size:42px;line-height:1.45;margin-top:50px;color:#f0e2cf">Te ayudamos a tasar tu propiedad con datos reales de La Carlota y a venderla con los papeles en regla.</div><div style="margin-top:70px;display:inline-block;background:#c9a27a;color:#4e1b1f;font-size:42px;font-weight:700;padding:24px 36px;border-radius:16px;white-space:nowrap">💬 Pedí tu tasación: 358 444-7604</div></div>${foot(N)}</body>`);
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1080,height:1350}});
for(let i=0;i<S.length;i++){await p.setContent('<html><head><meta charset="utf8"><style>'+css+'</style></head>'+S[i]+'</html>');await p.waitForTimeout(300);await p.screenshot({path:'tasa/tasacion_'+(i+1)+'.jpg',type:'jpeg',quality:90});}
await b.close();})();
