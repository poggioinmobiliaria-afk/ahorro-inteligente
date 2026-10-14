const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs');
const b64=f=>'data:image/png;base64,'+fs.readFileSync(f).toString('base64');
const LW=b64('logo_white.png'), LC=b64('stickers/logo_transparente.png');
const N=5;
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
S.push(`<body class="bo"><div class="frame"></div><img class="logo" src="${LW}"><div class="in" style="top:300px"><div class="tag">INVERSIÓN</div><h1 style="margin-top:40px">¿Comprar para alquilar en La Carlota?</h1><div style="font-size:48px;margin-top:44px;color:#d9b98a;font-weight:700">Cuánto rinde un depto en dólares</div><div style="font-size:38px;margin-top:60px;color:#f0e2cf">Deslizá →</div></div>${foot(1)}</body>`);
S.push(`<body class="cr"><div class="frame"></div><img class="logo" src="${LC}"><div class="in" style="top:220px"><div class="tag">UN EJEMPLO CON VALORES DE HOY</div><div class="q" style="font-size:52px">Depto 1 dormitorio, 40 m², céntrico</div>
<div style="margin-top:30px"><div class="row"><span>Valor de compra</span><b>USD 55.000</b></div>
<div class="row"><span>Alquiler mensual</span><b>$530.000</b></div>
<div class="row"><span>En dólares (BNA)</span><b>≈ USD 343</b></div></div>
<div class="box dark" style="text-align:center">Rinde aprox.<br><b style="color:#d9b98a;font-size:80px">7,5% anual</b><br><span style="font-size:32px">en dólares</span></div></div>${foot(2)}</body>`);
S.push(`<body class="cr"><div class="frame"></div><img class="logo" src="${LC}"><div class="in" style="top:230px"><div class="tag">COMPARALO</div><div class="q" style="font-size:58px">¿Dónde rinden más tus dólares?</div>
<div class="vs"><div class="gold"><div class="small">PLAZO FIJO EN USD</div><div class="big" style="font-size:64px">1% a 3%</div><div class="small">anual</div></div><div class="dark"><div class="small">DEPTO ALQUILADO</div><div class="big" style="font-size:64px;color:#d9b98a">6% a 8%</div><div class="small">anual<br>+ conservás la propiedad</div></div></div>
<div class="t" style="text-align:center">El alquiler se actualiza por IPC,<br>así que la renta acompaña la inflación.</div></div>${foot(3)}</body>`);
S.push(`<body class="cr"><div class="frame"></div><img class="logo" src="${LC}"><div class="in" style="top:220px"><div class="tag">CÓMO LLEGAR AL 8%</div><div class="q" style="font-size:58px">La renta se gana al comprar</div>
<div class="t">🔎 Encontrar oportunidades por debajo del mercado</div><div class="t" style="margin-top:22px">📈 Alquiler actualizado por IPC</div><div class="t" style="margin-top:22px">🔑 Sin meses vacíos entre inquilinos</div><div class="t" style="margin-top:22px">✅ Cobranza al día y contrato sólido</div></div>${foot(4)}</body>`);
S.push(`<body class="bo"><div class="frame"></div><img class="logo" src="${LW}"><div class="in" style="top:330px"><div class="tag">TE ACOMPAÑAMOS</div><div class="q" style="font-size:62px">Te ayudamos a comprar bien y te lo administramos.</div><div class="t" style="color:#f0e2cf">Estudio jurídico & inmobiliario: de la compra al cobro de cada mes.</div><div class="box gold" style="font-size:44px;font-weight:700;text-align:center">💬 Escribinos: 358 444-7604</div><div class="small" style="margin-top:50px;color:#d9b98a">Valores de referencia, octubre 2026. Dólar BNA $1.545. Rentabilidad bruta anual, antes de impuestos y gastos.</div></div>${foot(5)}</body>`);
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1080,height:1350}});
for(let i=0;i<S.length;i++){await p.setContent(`<html><head><meta charset="utf8"><style>${css}</style></head>${S[i]}</html>`);await p.waitForTimeout(300);await p.screenshot({path:`renta/renta_${i+1}.jpg`,type:'jpeg',quality:90});}
await b.close();})();
