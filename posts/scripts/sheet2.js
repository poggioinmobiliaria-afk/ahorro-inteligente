const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs');
const f=fs.readdirSync('pack').filter(x=>x.endsWith('.png')).sort();
const imgs=f.map(n=>`<div style="background:repeating-conic-gradient(#ddd 0 25%,#fff 0 50%) 0 0/24px 24px"><img src="data:image/png;base64,${fs.readFileSync('pack/'+n).toString('base64')}" style="width:300px;height:300px;display:block"></div>`).join('');
(async()=>{const br=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await br.newPage({viewport:{width:1240,height:800}});
await p.setContent(`<body style="margin:0;display:grid;grid-template-columns:repeat(4,300px);gap:10px;padding:10px">${imgs}</body>`);await p.screenshot({path:'sheet2.png',fullPage:true});await br.close();})();
