const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs');
const b64=f=>'data:image/'+(f.endsWith('png')?'png':'jpeg')+';base64,'+fs.readFileSync(f).toString('base64');
const U='/root/.claude/uploads/88586cfa-0a4d-5880-9753-b823ff9fbaf2/';
const LOGOW=b64('logo_white.png');
const pics=['4eb7c461','57b94978','8ecd220f','1443ebc9','067929ed','7d8b909b','2f0ff85b'];
const FRONT=b64(U+'8499eae1-image.jpg');
const css='*{margin:0}body{width:1080px;height:1350px;overflow:hidden;position:relative;background:#222}';
const enh='filter:brightness(1.06) contrast(1.12) saturate(1.12)';
const cover=`<body style="background:#4e1b1f"><div style="position:absolute;left:0;right:0;top:200px;height:608px;background:url(${FRONT}) center/cover;${enh}"></div>
<img src="${LOGOW}" style="position:absolute;top:36px;right:50px;width:130px">
<div style="position:absolute;top:60px;left:50px;background:#c9a27a;color:#4e1b1f;font:700 36px 'DejaVu Sans';letter-spacing:5px;padding:16px 28px;border-radius:12px">EN ALQUILER</div>
<div style="position:absolute;left:70px;right:70px;top:860px;color:#fff">
<div style="font:700 88px/1.05 'DejaVu Serif'">Casa 2 dormitorios</div>
<div style="width:120px;height:8px;background:#c9a27a;margin:34px 0"></div>
<div style="font:40px 'DejaVu Sans';color:#f0e2cf">La Carlota · Deslizá para verla →</div></div>
<div style="position:absolute;bottom:50px;left:0;right:0;text-align:center;color:#fff;font:24px 'DejaVu Sans';letter-spacing:3px">MA.FRA · ESTUDIO JURÍDICO & INMOBILIARIO</div></body>`;
const photo=f=>{const d=b64(U+f+'-image.jpg');return `<body><div style="position:absolute;inset:-40px;background:url(${d}) center/cover;filter:blur(30px) brightness(.7)"></div>
<div style="position:absolute;inset:0;background:url(${d}) center/contain no-repeat;${enh}"></div></body>`};
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1080,height:1350}});
const all=[cover,...pics.map(photo)];
for(let i=0;i<all.length;i++){await p.setContent('<html><head><meta charset="utf8"><style>'+css+'</style></head>'+all[i]+'</html>');await p.waitForTimeout(400);await p.screenshot({path:'casa2/alq2_'+(i+1)+'.jpg',type:'jpeg',quality:90});}
await b.close();})();
