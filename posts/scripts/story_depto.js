const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs');
const b64=f=>'data:image/'+(f.endsWith('png')?'png':'jpeg')+';base64,'+fs.readFileSync(f).toString('base64');
const F=b64('/root/.claude/uploads/88586cfa-0a4d-5880-9753-b823ff9fbaf2/5bbae130-image.jpg'), L=b64('logo_white.png');
const html=`<html><head><meta charset="utf8"><style>*{margin:0}body{width:540px;height:960px;background:#4e1b1f;position:relative;font-family:'DejaVu Sans';color:#fff;overflow:hidden}</style></head><body>
<img src="${L}" style="position:absolute;top:26px;right:26px;width:80px">
<div style="position:absolute;top:34px;left:26px;background:#c9a27a;color:#4e1b1f;font-weight:700;font-size:22px;letter-spacing:3px;padding:10px 16px;border-radius:8px">DISPONIBLE</div>
<div style="position:absolute;top:140px;left:26px;right:26px;height:470px;border-radius:14px;background:url(${F}) center/cover;border:4px solid #f7f2ea"></div>
<div style="position:absolute;top:640px;left:30px;right:30px">
<div style="font:700 44px/1.1 'DejaVu Serif'">Departamento<br>1 dormitorio</div>
<div style="font-size:22px;color:#f0e2cf;margin-top:14px">A 5 cuadras del centro · Planta baja<br>Entrada independiente · Sin expensas</div>
<div style="margin-top:26px;background:#f7f2ea;color:#4e1b1f;font-weight:700;font-size:24px;padding:14px;border-radius:10px;text-align:center">📲 3584447604 · Franco</div></div>
</body></html>`;
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:540,height:960}});
await p.setContent(html);await p.waitForTimeout(300);await p.screenshot({path:'story_depto.jpg',type:'jpeg',quality:60});await b.close();})();
