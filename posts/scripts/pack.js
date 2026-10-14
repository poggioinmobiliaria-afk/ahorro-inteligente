const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs');
const L='data:image/png;base64,'+fs.readFileSync('stickers/logo_transparente.png').toString('base64');
const B='#4e1b1f',C='#f7f2ea',G='#e0b25a';
const badge=(sz,x,y)=>`<div style="position:absolute;left:${x}px;top:${y}px;width:${sz}px;height:${sz}px;border-radius:50%;background:${C};border:${Math.round(sz/28)}px solid ${B};box-sizing:border-box;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 16px rgba(0,0,0,.25)"><img src="${L}" style="width:${Math.round(sz*0.68)}px"></div>`;
const pill=(txt,fs,top,bg=B,fg='#fff',extra='')=>`<div style="position:absolute;left:0;right:0;top:${top}px;text-align:center"><span style="display:inline-block;background:${bg};color:${fg};font-family:'DejaVu Serif',serif;font-style:italic;font-weight:700;font-size:${fs}px;line-height:1.05;padding:12px 28px 18px;white-space:nowrap;border-radius:44px;border:6px solid ${bg===B?C:B};box-shadow:0 6px 16px rgba(0,0,0,.25);${extra}">${txt}</span></div>`;
const icon=(ch,x,y,s,col=G)=>`<div style="position:absolute;left:${x}px;top:${y}px;font-family:'DejaVu Sans',sans-serif;font-size:${s}px;color:${col};text-shadow:0 4px 10px rgba(0,0,0,.2)">${ch}</div>`;
const stickers={
 '02_gracias': badge(250,131,40)+icon('♥',372,48,90,'#c0392b')+pill('¡Gracias!',74,320),
 '03_alquilado': badge(200,156,20)+`<div style="position:absolute;left:46px;top:250px;width:420px;transform:rotate(-8deg);background:${C};border:12px solid ${B};border-radius:20px;text-align:center;padding:10px 0 16px;box-shadow:0 6px 16px rgba(0,0,0,.25)"><div style="font-family:'DejaVu Serif',serif;font-weight:700;font-size:54px;color:${B}">¡ALQUILADO!</div><div style="font-family:'DejaVu Sans',sans-serif;font-size:24px;letter-spacing:5px;color:${B}">MA.FRA · LA CARLOTA</div></div>`,
 '04_te_escribo': badge(220,146,30)+pill('Te escribo<br>en un rato',60,275),
 '05_buen_finde': badge(240,136,30)+icon('☀',370,20,96)+pill('¡Buen finde!',64,315),
 '06_recibido': badge(230,141,30)+icon('✓',360,60,110,'#2e8b57')+pill('¡Recibido!',68,305),
 '07_pago_recibido': badge(210,151,24)+pill('✓ Pago<br>recibido',62,262,C,B),
 '08_bienvenido': badge(200,156,16)+icon('★',110,40,60)+icon('★',350,40,60)+pill('¡Bienvenidos<br>a su nuevo hogar!',44,250),
 '09_felicitaciones': badge(230,141,30)+icon('★',90,90,70)+icon('★',380,60,80)+pill('¡Felicitaciones!',50,318),
 '10_consultanos': badge(220,146,30)+pill('¿Dudas?<br>Consultanos',54,275,C,B),
};
(async()=>{const br=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
 const p=await br.newPage({viewport:{width:512,height:512}});
 for(const [n,h] of Object.entries(stickers)){
  await p.setContent(`<html><head><meta charset="utf8"><style>*{margin:0}html,body{background:transparent;width:512px;height:512px;overflow:hidden}</style></head><body><div style="position:relative;width:512px;height:512px">${h}</div></body></html>`);
  await p.screenshot({path:`pack/${n}.png`,omitBackground:true});
 }
 // buen dia from existing
 fs.copyFileSync('stickers/sticker_buen_dia.png','pack/01_buen_dia_big.png');
 for(const f of fs.readdirSync('pack').filter(f=>f.endsWith('.png'))){
  const b64=await p.evaluate(async(src)=>{const i=new Image();i.src=src;await i.decode();const c=document.createElement('canvas');c.width=512;c.height=512;c.getContext('2d').drawImage(i,0,0,512,512);return c.toDataURL('image/webp',0.85)},'data:image/png;base64,'+fs.readFileSync('pack/'+f).toString('base64'));
  const out=f.replace('_big','').replace('.png','.webp');
  fs.writeFileSync('pack/'+out,Buffer.from(b64.split(',')[1],'base64'));
 }
 await br.close();console.log('ok')})();
