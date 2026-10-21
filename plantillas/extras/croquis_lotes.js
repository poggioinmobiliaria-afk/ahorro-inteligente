const { chromium } = require('/opt/node22/lib/node_modules/playwright');
// Según plano catastral: calle pública arriba, J. L. de Cabrera a la izquierda.
// Lote 102 (50x30) en la esquina; Lote 103 (25x15) debajo, sobre Cabrera; lote 104 lindero.
const S=11.5, ox=280, oy=150;
const X=m=>ox+m*S, Y=m=>oy+m*S;
function svg(sel){
 const on='#c9a27a', off='#efe6d8', st='#4e1b1f';
 const f=k=>sel.includes(k)?on:off, tx=k=>sel.includes(k)?'#4e1b1f':'#9b8b7a';
 return `<svg width="1080" height="880" xmlns="http://www.w3.org/2000/svg" style="background:#f7f2ea;font-family:DejaVu Sans">
 <defs><pattern id="g" width="22" height="22" patternUnits="userSpaceOnUse"><path d="M22 0H0V22" fill="none" stroke="#e7dccb" stroke-width="1"/></pattern></defs>
 <rect width="1080" height="880" fill="url(#g)"/>
 <rect x="${ox-90}" y="${oy-90}" width="${1080-ox+90}" height="80" fill="#d8d2c8"/>
 <text x="${X(25)}" y="${oy-40}" fill="#4e1b1f" font-size="26" font-weight="700" text-anchor="middle" letter-spacing="3">CALLE PÚBLICA</text>
 <rect x="${ox-90}" y="${oy-90}" width="80" height="${Y(52)-oy+90}" fill="#d8d2c8"/>
 <text x="${ox-50}" y="${Y(24)}" fill="#4e1b1f" font-size="26" font-weight="700" text-anchor="middle" transform="rotate(-90 ${ox-50} ${Y(24)})" letter-spacing="3">CALLE J. L. DE CABRERA</text>
 <rect x="${X(25)}" y="${Y(30)}" width="${25*S}" height="${22*S}" fill="#fff" stroke="#b9ab98" stroke-dasharray="8 6" stroke-width="3"/>
 <text x="${X(37.5)}" y="${Y(41)}" fill="#b9ab98" font-size="22" text-anchor="middle">Lindero</text>
 <rect x="${X(0)}" y="${Y(0)}" width="${50*S}" height="${30*S}" fill="${f('102')}" stroke="${st}" stroke-width="5"/>
 <text x="${X(25)}" y="${Y(13)}" fill="${tx('102')}" font-size="40" font-weight="700" text-anchor="middle">LOTE 102 · ESQUINA</text>
 <text x="${X(25)}" y="${Y(19)}" fill="${tx('102')}" font-size="34" text-anchor="middle">1.500 m² · 50 × 30 m</text>
 <rect x="${X(0)}" y="${Y(30)}" width="${25*S}" height="${15*S}" fill="${f('103')}" stroke="${st}" stroke-width="5"/>
 <text x="${X(12.5)}" y="${Y(36.5)}" fill="${tx('103')}" font-size="30" font-weight="700" text-anchor="middle">LOTE 103</text>
 <text x="${X(12.5)}" y="${Y(40.5)}" fill="${tx('103')}" font-size="22" text-anchor="middle">375 m² · 15 × 25 m</text>
 <text x="${X(50)}" y="${Y(52)+40}" font-size="18" fill="#9b8b7a" text-anchor="end">Croquis ilustrativo según plano catastral · no a escala exacta</text>
 </svg>`;}
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
for(const [n,sel] of [['c102',['102']],['c103',['103']],['cambos',['102','103']]]){
 const p=await b.newPage({viewport:{width:1080,height:880}});await p.setContent(`<html><body style="margin:0">${svg(sel)}</body></html>`);
 await p.screenshot({path:__dirname+'/'+n+'.png'});await p.close();}
await b.close();console.log('ok')})();
