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
S.push(`<body class="bo"><div class="frame"></div><img class="logo" src="${LW}"><div class="in" style="top:300px;text-align:center"><div class="tag">LA CARLOTA</div><div style="margin:50px auto 0;display:inline-block;border:8px solid #d9b98a;color:#d9b98a;font-family:'DejaVu Serif',serif;font-weight:700;font-size:115px;letter-spacing:6px;padding:16px 44px;transform:rotate(-4deg)">VENDIDO</div><div class="q" style="font-size:54px;margin-top:70px">Departamento 1 dormitorio</div><div style="font-size:40px;color:#f0e2cf;margin-top:20px">5° piso · balcón · ascensor · pleno centro</div><div class="box gold" style="font-size:40px;font-weight:700;margin-top:70px">¿Querés vender tu propiedad?<br>💬 358 444-7604</div></div><div class="foot"><span>MA.FRA · ESTUDIO JURÍDICO & INMOBILIARIO</span><span></span></div></body>`);
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1080,height:1350}});
for(let i=0;i<S.length;i++){await p.setContent(`<html><head><meta charset="utf8"><style>${css}</style></head>${S[i]}</html>`);await p.waitForTimeout(300);await p.screenshot({path:`renta/vendido_${i+1}.jpg`,type:'jpeg',quality:90});}
await b.close();})();
