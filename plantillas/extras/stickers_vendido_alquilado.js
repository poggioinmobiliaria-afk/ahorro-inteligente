const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs');
const L='data:image/png;base64,'+fs.readFileSync('stickers/logo_transparente.png').toString('base64');
const B='#4e1b1f', C='#f7f2ea', G='#c9a27a';
const base=`*{margin:0;box-sizing:border-box}html,body{background:transparent}body{font-family:'DejaVu Serif',serif;display:flex;align-items:center;justify-content:center}`;
const pill=(t)=>`<div style="background:${B};color:#fff;border-radius:160px;padding:40px 70px 40px 40px;display:flex;align-items:center;gap:36px;box-shadow:0 8px 24px rgba(0,0,0,.25)"><div style="width:190px;height:190px;border-radius:50%;background:${C};display:flex;align-items:center;justify-content:center"><img src="${L}" style="width:150px"></div><div style="font-size:86px;font-weight:700;letter-spacing:3px">${t}</div></div>`;
const stamp=(t)=>`<div style="transform:rotate(-8deg);border:16px solid ${B};color:${B};background:${C};border-radius:24px;padding:30px 60px;text-align:center;box-shadow:0 8px 24px rgba(0,0,0,.25)"><div style="font-size:130px;font-weight:700;letter-spacing:4px">¡${t}!</div><div style="font-family:'DejaVu Sans',sans-serif;font-size:40px;letter-spacing:6px;margin-top:6px;color:${G}">MA.FRA · LA CARLOTA</div></div>`;
const items={
 sticker_alquilado_pill:{w:1200,h:340,html:pill('ALQUILADO')},
 sticker_vendido_pill:{w:1100,h:340,html:pill('VENDIDO')},
 sticker_alquilado_sello:{w:1400,h:700,html:stamp('ALQUILADO')},
 sticker_vendido_sello:{w:1250,h:700,html:stamp('VENDIDO')},
};
(async()=>{
 const br=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
 for(const [n,it] of Object.entries(items)){
  const p=await br.newPage({viewport:{width:it.w,height:it.h}});
  await p.setContent(`<html><head><meta charset="utf8"><style>${base}body{width:${it.w}px;height:${it.h}px}</style></head><body>${it.html}</body></html>`);
  await p.screenshot({path:`stickers/${n}.png`,omitBackground:true});
  await p.close();
 }
 await br.close(); console.log('ok');
})();
