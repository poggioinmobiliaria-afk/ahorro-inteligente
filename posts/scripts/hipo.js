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
S.push(`<body class="bo"><div class="frame"></div><img class="logo" src="${LW}"><div class="in" style="top:300px"><div class="tag">CRÉDITOS HIPOTECARIOS</div><h1 style="margin-top:40px">¿Seguir alquilando o sacar un crédito?</h1><div style="font-size:48px;margin-top:44px;color:#d9b98a;font-weight:700">Hicimos la cuenta con una casa de La Carlota</div><div style="font-size:38px;margin-top:60px;color:#f0e2cf">Deslizá →</div></div>${foot(1)}</body>`);
S.push(`<body class="cr"><div class="frame"></div><img class="logo" src="${LC}"><div class="in" style="top:230px"><div class="tag">LO QUE NADIE TE DICE</div><div class="q">Los créditos de hoy son UVA</div><div class="t">La tasa que ves (entre 6,5% y 7,5% anual) es <b>más la inflación</b>.</div><div class="t">👉 La cuota se ajusta todos los meses, igual que un alquiler por IPC.</div><div class="box gold">La diferencia: con el crédito, cada cuota te deja algo tuyo. Con el alquiler, no.</div></div>${foot(2)}</body>`);
S.push(`<body class="cr"><div class="frame"></div><img class="logo" src="${LC}"><div class="in" style="top:220px"><div class="tag">EL EJEMPLO</div><div class="q" style="font-size:58px">Casa de USD 60.000</div>
<div style="margin-top:30px"><div class="row"><span>Valor en pesos</span><b>$92,7 M</b></div>
<div class="row"><span>Ahorro necesario (25%)</span><b>USD 15.000</b></div>
<div class="row"><span>Préstamo (75%)</span><b>$69,5 M</b></div>
<div class="row"><span>Plazo · tasa</span><b>30 años · 6,7%</b></div></div>
<div class="box dark">Cuota inicial aprox.: <b style="color:#d9b98a;font-size:52px">$450.000</b><br><span style="font-size:32px">Ingreso familiar necesario: ~$1.800.000</span></div></div>${foot(3)}</body>`);
S.push(`<body class="cr"><div class="frame"></div><img class="logo" src="${LC}"><div class="in" style="top:230px"><div class="tag">LA COMPARACIÓN</div><div class="q" style="font-size:58px">Misma casa, dos caminos</div>
<div class="vs"><div class="dark"><div class="small">ALQUILAR</div><div class="big">$370.000</div><div class="small">por mes<br>+ IPC</div></div><div class="gold"><div class="small">CUOTA CRÉDITO</div><div class="big">$450.000</div><div class="small">por mes<br>+ UVA</div></div></div>
<div class="t" style="text-align:center">Una diferencia de <b>~$80.000</b> por mes…<br>pero en un caso la casa termina siendo tuya.</div></div>${foot(4)}</body>`);
S.push(`<body class="cr"><div class="frame"></div><img class="logo" src="${LC}"><div class="in" style="top:220px"><div class="tag">ANTES DE ARRANCAR</div><div class="q" style="font-size:58px">No toda casa es "apta crédito"</div>
<div class="t">✅ Escritura y títulos en regla</div><div class="t" style="margin-top:22px">✅ Planos aprobados y sin deudas</div><div class="t" style="margin-top:22px">✅ Tasación del banco que alcance el precio</div><div class="t" style="margin-top:22px">✅ Ahorro para el 25% + gastos de escritura</div>
<div class="box gold" style="margin-top:50px">Revisar los papeles antes de señar te evita perder la seña y el crédito.</div></div>${foot(5)}</body>`);
S.push(`<body class="bo"><div class="frame"></div><img class="logo" src="${LW}"><div class="in" style="top:330px"><div class="tag">TE ACOMPAÑAMOS</div><div class="q" style="font-size:64px">Buscamos la propiedad y revisamos que sea apta crédito.</div><div class="t" style="color:#f0e2cf">Estudio jurídico & inmobiliario: de la búsqueda a la escritura.</div><div class="box gold" style="font-size:44px;font-weight:700;text-align:center">💬 Escribinos: 358 444-7604</div><div class="small" style="margin-top:50px;color:#d9b98a">Valores de referencia, octubre 2026. Dólar BNA $1.545. Tasas según comparatasas.ar; consultá condiciones en tu banco.</div></div>${foot(6)}</body>`);
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1080,height:1350}});
for(let i=0;i<S.length;i++){await p.setContent(`<html><head><meta charset="utf8"><style>${css}</style></head>${S[i]}</html>`);await p.waitForTimeout(300);await p.screenshot({path:`hipo/hipo_${i+1}.jpg`,type:'jpeg',quality:90});}
await b.close();})();
