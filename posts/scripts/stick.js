const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs');
const L='data:image/png;base64,'+fs.readFileSync('stickers/logo_transparente.png').toString('base64');
const W='data:image/png;base64,'+fs.readFileSync('logo_white.png').toString('base64');
const B='#4e1b1f', C='#f7f2ea';
const base=`*{margin:0;box-sizing:border-box}html,body{background:transparent}body{font-family:'DejaVu Serif',serif;display:flex;align-items:center;justify-content:center}`;
const items={
 perfil_instagram:{w:1080,h:1080,bg:true,html:`<div style="width:1080px;height:1080px;background:${C};display:flex;align-items:center;justify-content:center"><img src="${L}" style="width:700px"></div>`},
 sticker_disponible:{w:1200,h:340,html:`<div style="background:${B};color:#fff;border-radius:160px;padding:40px 70px 40px 40px;display:flex;align-items:center;gap:36px;box-shadow:0 8px 24px rgba(0,0,0,.25)"><div style="width:190px;height:190px;border-radius:50%;background:${C};display:flex;align-items:center;justify-content:center"><img src="${L}" style="width:150px"></div><div style="font-size:86px;font-weight:700;letter-spacing:3px">DISPONIBLE</div></div>`},
 sticker_alquilado:{w:1200,h:640,html:`<div style="transform:rotate(-8deg);border:16px solid ${B};color:${B};background:${C};border-radius:24px;padding:30px 60px;text-align:center"><div style="font-size:120px;font-weight:700;letter-spacing:3px">¡ALQUILADO!</div><div style="font-family:'DejaVu Sans',sans-serif;font-size:40px;letter-spacing:6px;margin-top:6px">MA.FRA · LA CARLOTA</div></div>`},
 sticker_nuevo_ingreso:{w:1000,h:340,html:`<div style="background:${C};color:${B};border:8px solid ${B};border-radius:160px;padding:34px 70px 34px 34px;display:flex;align-items:center;gap:36px"><div style="width:190px;height:190px;border-radius:50%;background:${B};display:flex;align-items:center;justify-content:center"><img src="${W}" style="width:150px"></div><div style="font-size:78px;font-weight:700;line-height:1.05">NUEVO<br>INGRESO</div></div>`},
 sticker_consulta_dm:{w:1100,h:320,html:`<div style="background:${B};color:#fff;border-radius:40px;padding:44px 64px;text-align:center"><div style="font-family:'DejaVu Sans',sans-serif;font-size:64px;font-weight:700">Consultanos por DM</div><div style="font-family:'DejaVu Sans',sans-serif;font-size:40px;opacity:.85;margin-top:10px;letter-spacing:4px">MA.FRA · ESTUDIO JURÍDICO</div></div>`},
 sticker_logo_circulo:{w:600,h:600,html:`<div style="width:560px;height:560px;border-radius:50%;background:${C};border:10px solid ${B};display:flex;align-items:center;justify-content:center"><img src="${L}" style="width:390px"></div>`},
};
(async()=>{
 const br=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
 for(const [n,it] of Object.entries(items)){
  const p=await br.newPage({viewport:{width:it.w,height:it.h}});
  await p.setContent(`<html><head><meta charset="utf8"><style>${base}body{width:${it.w}px;height:${it.h}px}</style></head><body>${it.html}</body></html>`);
  await p.screenshot({path:`stickers/${n}.png`,omitBackground:!it.bg});
  await p.close();
 }
 await br.close(); console.log('ok');
})();
