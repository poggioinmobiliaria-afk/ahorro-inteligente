const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs');
const b64=f=>'data:image/png;base64,'+fs.readFileSync(f).toString('base64');
const LW=b64('logo_white.png'), LC=b64('stickers/logo_transparente.png');
const N=6;
const css=`*{margin:0;box-sizing:border-box}body{width:1080px;height:1350px;font-family:'DejaVu Sans',sans-serif;position:relative;overflow:hidden}
.bo{background:#4e1b1f;color:#fff}.cr{background:#f7f2ea;color:#4e1b1f}
.frame{position:absolute;inset:36px;border:3px solid #c9a27a}
.logo{position:absolute;top:70px;right:80px;width:140px}
.foot{position:absolute;bottom:80px;left:100px;right:100px;display:flex;justify-content:space-between;font-size:26px;letter-spacing:3px}
.tag{font-size:34px;letter-spacing:6px;font-weight:700;color:#9c6b3f}.bo .tag{color:#d9b98a}
h1{font-family:'DejaVu Serif',serif;font-size:92px;line-height:1.05}
.q{font-family:'DejaVu Serif',serif;font-size:66px;font-weight:700;line-height:1.12;margin-top:30px}
.t{font-size:40px;line-height:1.42;margin-top:40px}
.in{position:absolute;left:100px;right:100px}
.row{display:flex;justify-content:space-between;align-items:center;font-size:40px;padding:26px 0;border-bottom:2px solid #d9c3a5}
.row b{font-size:46px}
.box{margin-top:44px;padding:34px 40px;border-radius:20px;font-size:40px;line-height:1.4}
.gold{background:#c9a27a;color:#4e1b1f}.dark{background:#4e1b1f;color:#fff}
.vs{display:flex;gap:30px;margin-top:50px}.vs>div{flex:1;border-radius:22px;padding:40px 30px;text-align:center}
.big{font-family:'DejaVu Serif',serif;font-size:72px;font-weight:700;margin:18px 0}
.small{font-size:30px;line-height:1.35}`;
const foot=i=>`<div class="foot"><span>MA.FRA · ESTUDIO JURÍDICO & INMOBILIARIO</span><span>${i}/${N}</span></div>`;
const S=[];
S.push(`<body class="bo"><div class="frame"></div><img class="logo" src="${LW}"><div class="in" style="top:300px"><div class="tag">INVERSIÓN INMOBILIARIA</div><h1 style="margin-top:40px">¿Comprar o construir en La Carlota?</h1><div style="font-size:48px;margin-top:44px;color:#d9b98a;font-weight:700">Hicimos los números</div><div style="font-size:38px;margin-top:60px;color:#f0e2cf">Deslizá →</div></div>${foot(1)}</body>`);
S.push(`<body class="cr"><div class="frame"></div><img class="logo" src="${LC}"><div class="in" style="top:220px"><div class="tag">CONSTRUIR HOY</div><div class="q" style="font-size:58px">Casa básica de 2 dormitorios</div>
<div style="margin-top:30px"><div class="row"><span>Costo por m² (Córdoba, ago. 2026)</span><b>$1.030.327</b></div>
<div class="row"><span>Superficie (vivienda social tipo)</span><b>50 m²</b></div></div>
<div class="box dark">Solo la construcción:<br><b style="color:#d9b98a;font-size:60px">$51,8 M ≈ USD 33.500</b></div>
<div class="t" style="font-size:34px">Cocina-comedor, 2 dormitorios y baño. Terminaciones básicas.</div></div>${foot(2)}</body>`);
S.push(`<body class="cr"><div class="frame"></div><img class="logo" src="${LC}"><div class="in" style="top:220px"><div class="tag">PERO A ESO SUMALE</div><div class="q" style="font-size:58px">Lo que no entra en el m²</div>
<div class="t">🟫 El terreno: <b>~USD 25.000</b> (250 m²)</div><div class="t" style="margin-top:22px">📐 Planos, permisos y conexiones</div><div class="t" style="margin-top:22px">⏳ 8 a 12 meses de obra… pagando alquiler</div><div class="t" style="margin-top:22px">📈 Subas de materiales e imprevistos</div></div>${foot(3)}</body>`);
S.push(`<body class="cr"><div class="frame"></div><img class="logo" src="${LC}"><div class="in" style="top:220px"><div class="tag">COMPRAR USADA</div><div class="q" style="font-size:58px">Casa de 2 dormitorios con terreno</div>
<div class="box dark" style="text-align:center">Desde<br><b style="color:#d9b98a;font-size:80px">USD 45.000</b></div>
<div class="t">✅ Terreno incluido</div><div class="t" style="margin-top:18px">✅ Lista para entrar a vivir</div><div class="t" style="margin-top:18px">✅ La ves antes de comprarla</div></div>${foot(4)}</body>`);
S.push(`<body class="cr"><div class="frame"></div><img class="logo" src="${LC}"><div class="in" style="top:230px"><div class="tag">LA COMPARACIÓN</div><div class="q" style="font-size:58px">Dos caminos</div>
<div class="vs"><div class="dark"><div class="small">CONSTRUIR</div><div class="big" style="font-size:60px">USD 58.500</div><div class="small">casa USD 33.500<br>+ terreno USD 25.000<br>+ planos y 1 año de espera</div></div><div class="gold"><div class="small">COMPRAR USADA</div><div class="big" style="font-size:60px">USD 45.000</div><div class="small">todo incluido<br>lista para<br>entrar</div></div></div>
<div class="t" style="text-align:center">Comprando usada ahorrás<br><b>más de USD 13.500</b> y te mudás ya.</div></div>${foot(5)}</body>`);
S.push(`<body class="bo"><div class="frame"></div><img class="logo" src="${LW}"><div class="in" style="top:330px"><div class="tag">TE ACOMPAÑAMOS</div><div class="q" style="font-size:64px">Hoy, lo construido puede ser la mejor oportunidad.</div><div class="t" style="color:#f0e2cf">Te ayudamos a encontrar la casa y revisamos que los papeles estén en regla.</div><div class="box gold" style="font-size:44px;font-weight:700;text-align:center">💬 Escribinos: 358 444-7604</div><div class="small" style="margin-top:50px;color:#d9b98a">Costo de construcción: índice ICC-Cba, agosto 2026 (vivienda social tipo), publicado por Metro Obra. Terreno: valor promedio en La Carlota. Dólar BNA $1.545. Valores de referencia.</div></div>${foot(6)}</body>`);
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1080,height:1350}});
for(let i=0;i<S.length;i++){await p.setContent(`<html><head><meta charset="utf8"><style>${css}</style></head>${S[i]}</html>`);await p.waitForTimeout(300);await p.screenshot({path:`cc/compraconstruir_${i+1}.jpg`,type:'jpeg',quality:90});}
await b.close();})();
