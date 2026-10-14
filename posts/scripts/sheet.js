const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs');
const f=['sticker_disponible','sticker_nuevo_ingreso','sticker_alquilado','sticker_consulta_dm','sticker_logo_circulo','logo_transparente','perfil_instagram'];
const imgs=f.map(n=>`<div style="background:repeating-conic-gradient(#ddd 0 25%,#fff 0 50%) 0 0/30px 30px;padding:20px;display:flex;align-items:center;justify-content:center"><img src="data:image/png;base64,${fs.readFileSync('stickers/'+n+'.png').toString('base64')}" style="max-width:520px;max-height:300px"></div>`).join('');
(async()=>{const br=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await br.newPage({viewport:{width:1200,height:1400}});
await p.setContent(`<body style="margin:0;display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:10px">${imgs}</body>`);await p.screenshot({path:'sheet.png',fullPage:true});await br.close();})();
