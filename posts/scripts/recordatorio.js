const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs');
const b64=f=>'data:image/png;base64,'+fs.readFileSync(f).toString('base64');
const LW=b64('logo_white.png');
const css=`*{margin:0;box-sizing:border-box}body{width:1080px;height:1920px;background:#4e1b1f;color:#fff;font-family:'DejaVu Sans',sans-serif;position:relative;overflow:hidden;text-align:center}
.frame{position:absolute;inset:44px;border:3px solid #c9a27a}
.logo{position:absolute;top:110px;left:50%;transform:translateX(-50%);width:200px}
.pill{display:inline-block;background:#c9a27a;color:#4e1b1f;font-weight:700;letter-spacing:6px;font-size:34px;padding:16px 44px;border-radius:40px}
h1{font-family:'DejaVu Serif',serif;font-size:96px;letter-spacing:2px;color:#d9b98a;margin-top:50px}
.t{font-size:48px;line-height:1.45;color:#f7f2ea;margin-top:50px}
.box{margin:60px auto 0;width:860px;border:4px solid #d9b98a;border-radius:30px;padding:50px 30px;background:rgba(255,255,255,.05)}
.small{font-size:32px;letter-spacing:6px;color:#d9b98a;font-weight:700}
.big{font-family:'DejaVu Serif',serif;font-weight:700;font-size:170px;color:#fff;line-height:1.1;margin-top:10px}
.pay{margin-top:60px;font-size:40px;line-height:1.5;color:#f7f2ea}
.pay b{color:#d9b98a}
.warn{margin-top:70px;font-size:40px;color:#f0e2cf;letter-spacing:2px}
.foot{position:absolute;bottom:110px;left:0;right:0;font-size:30px;letter-spacing:5px;color:#d9b98a}
.in{position:absolute;top:340px;bottom:200px;left:90px;right:90px;display:flex;flex-direction:column;justify-content:center;align-items:center}`;
const pay=``;
const foot=`<div class="foot">ESTUDIO MA.FRA · LA CARLOTA · 358 444-7604</div>`;
const A=`<body><div class="frame"></div><img class="logo" src="${LW}"><div class="in"><div class="pill">📋 AVISO A INQUILINOS</div><h1>RECORDATORIO</h1><div class="t">El alquiler se abona del</div><div class="box"><div class="small">PERÍODO DE PAGO MENSUAL</div><div class="big">1 al 10</div></div>${pay}<div class="warn">⚠️ Desde el día 11 corren intereses</div></div>${foot}</body>`;
const B=`<body><div class="frame"></div><img class="logo" src="${LW}"><div class="in"><div class="pill">⏰ ÚLTIMOS DÍAS</div><h1>¡VENCE EL 10!</h1><div class="t">Aboná tu alquiler a tiempo<br>y evitá recargos</div><div class="box"><div class="small">VENCIMIENTO</div><div class="big">Día 10</div></div>${pay}<div class="warn">⚠️ Desde el día 11 corren intereses</div></div>${foot}</body>`;
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1080,height:1920}});
for(const [n,h] of [['recordatorio_1al10',A],['recordatorio_vence10',B]]){await p.setContent(`<html><head><meta charset="utf8"><style>${css}</style></head>${h}</html>`);await p.waitForTimeout(300);await p.screenshot({path:`../recordatorio/${n}.jpg`,type:'jpeg',quality:90});}
await b.close();})();
