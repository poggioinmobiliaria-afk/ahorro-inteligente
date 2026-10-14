const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs');
const L='data:image/png;base64,'+fs.readFileSync('stickers/logo_transparente.png').toString('base64');
const rays=Array.from({length:16},(_,i)=>`<div style="position:absolute;left:50%;top:50%;width:26px;height:470px;margin-left:-13px;margin-top:-235px;transform:rotate(${i*22.5}deg)"><div style="width:26px;height:60px;border-radius:13px;background:#e0b25a"></div></div>`).join('');
const html=`<html><head><meta charset="utf8"><style>*{margin:0}html,body{background:transparent;width:1024px;height:1024px}</style></head><body>
<div style="position:relative;width:1024px;height:1024px">
 <div style="position:absolute;left:112px;top:40px;width:800px;height:800px">
   <div style="position:absolute;inset:0">${rays.replace(/470px/g,'780px').replace(/-235px/g,'-390px')}</div>
   <div style="position:absolute;left:110px;top:110px;width:580px;height:580px;border-radius:50%;background:#f7f2ea;border:14px solid #4e1b1f;box-sizing:border-box;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 30px rgba(0,0,0,.25)">
     <img src="${L}" style="width:390px">
   </div>
 </div>
 <div style="position:absolute;left:0;right:0;top:770px;text-align:center">
   <span style="display:inline-block;background:#4e1b1f;color:#fff;font-family:'DejaVu Serif',serif;font-style:italic;font-weight:700;font-size:132px;padding:14px 64px 26px;border-radius:90px;border:8px solid #f7f2ea;box-shadow:0 10px 30px rgba(0,0,0,.25)">¡Buen día!</span>
 </div>
</div></body></html>`;
(async()=>{const br=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await br.newPage({viewport:{width:1024,height:1024}});
await p.setContent(html);await p.screenshot({path:'stickers/sticker_buen_dia.png',omitBackground:true});
const b64=await p.evaluate(async(src)=>{const i=new Image();i.src=src;await i.decode();const c=document.createElement('canvas');c.width=512;c.height=512;c.getContext('2d').drawImage(i,0,0,512,512);return c.toDataURL('image/webp',0.9)},'data:image/png;base64,'+fs.readFileSync('stickers/sticker_buen_dia.png').toString('base64'));
fs.writeFileSync('stickers/sticker_buen_dia_whatsapp.webp',Buffer.from(b64.split(',')[1],'base64'));
await br.close();console.log('ok')})();
