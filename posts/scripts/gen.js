const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const posts = {
 requisitos: [
  {k:'cover', t:'¿QUÉ NECESITO<br>PARA ALQUILAR?', s:'Te lo contamos en 4 pasos →'},
  {k:'item', n:'1', t:'DNI', s:'Frente y dorso del titular del contrato y de los garantes.'},
  {k:'item', n:'2', t:'Recibos de sueldo', s:'Del titular del contrato y de los garantes.'},
  {k:'item', n:'3', t:'Condiciones del contrato', s:'Contrato por 24 meses<br>Actualización cada 4 meses por IPC<br>Honorarios inmobiliarios: 5% del contrato'},
  {k:'close', t:'¿Tenés todo listo?', s:'Escribinos por mensaje directo y coordinamos.'},
 ],
 mito: [
  {k:'cover', tag:'¿MITO o VERDAD?', t:'“Si el inquilino se va antes, tiene que pagar todo el contrato.”', s:'Dejá tu respuesta en los comentarios ↓'},
  {k:'verdict', v:'MITO', s:'El inquilino puede rescindir antes de tiempo pagando una indemnización, no el contrato completo.<br><br>Cuánto paga depende de cuándo se firmó y de lo que diga el contrato.', c:'¿Te querés ir antes? Consultanos antes de avisar.'},
 ],
 errores: [
  {k:'cover', t:'5 ERRORES AL FIRMAR UN CONTRATO DE ALQUILER', s:'El 3 es el más común →'},
  {k:'item', n:'1', t:'No leer la cláusula de actualización', s:'Fijate qué índice se usa (IPC, ICL…) y cada cuánto aumenta.'},
  {k:'item', n:'2', t:'No dejar constancia del estado del inmueble', s:'Sacá fotos y dejá por escrito cómo lo recibís.'},
  {k:'item', n:'3', t:'No saber cuánto cuesta irse antes', s:'Leé la cláusula de rescisión anticipada antes de firmar.'},
  {k:'item', n:'4', t:'No aclarar quién paga cada gasto', s:'Impuestos, tasas, servicios y reparaciones: que quede escrito.'},
  {k:'item', n:'5', t:'Firmar sin asesoramiento', s:'Un contrato mal hecho sale caro. Consultá antes de firmar.'},
  {k:'close', t:'¿Vas a firmar un contrato?', s:'Te lo revisamos. Escribinos por mensaje directo.'},
 ],
};
const css = `*{margin:0;box-sizing:border-box}body{width:1080px;height:1350px;font-family:'DejaVu Serif',serif;}
.s{width:1080px;height:1350px;position:relative;display:flex;flex-direction:column;justify-content:center;padding:110px 100px;}
.navy{background:#0f1f3d;color:#fff}.light{background:#f6f3ec;color:#0f1f3d}
.gold{color:#c9a54c}.bar{width:120px;height:8px;background:#c9a54c;margin:40px 0}
.frame{position:absolute;inset:36px;border:3px solid #c9a54c;pointer-events:none}
h1{font-size:96px;line-height:1.08;font-weight:700}h2{font-size:78px;line-height:1.1;font-weight:700}
p{font-family:'DejaVu Sans',sans-serif;font-size:46px;line-height:1.45}
.num{font-size:220px;font-weight:700;color:#c9a54c;line-height:1}
.foot{position:absolute;bottom:80px;left:100px;right:100px;display:flex;justify-content:space-between;font-family:'DejaVu Sans',sans-serif;font-size:30px;letter-spacing:3px}
.tag{font-family:'DejaVu Sans',sans-serif;font-size:44px;letter-spacing:6px;color:#c9a54c;font-weight:700;margin-bottom:50px}
.stamp{display:inline-block;border:10px solid #c0392b;color:#c0392b;font-size:170px;font-weight:700;padding:10px 50px;transform:rotate(-6deg);margin-bottom:70px;align-self:flex-start}`;
function html(sl,i,n){
  const foot=(cls)=>`<div class="foot ${cls}"><span>ESTUDIO MAFRA · LA CARLOTA</span><span>${i+1}/${n}</span></div>`;
  let b='';
  if(sl.k==='cover') b=`<div class="s navy"><div class="frame"></div>${sl.tag?`<div class="tag">${sl.tag}</div>`:''}${sl.tag?`<h2>${sl.t}</h2>`:`<h1>${sl.t}</h1>`}<div class="bar"></div><p class="gold">${sl.s}</p>${foot('gold')}</div>`;
  if(sl.k==='item') b=`<div class="s light"><div class="num">${sl.n}</div><h2>${sl.t}</h2><div class="bar"></div><p>${sl.s}</p>${foot('')}</div>`;
  if(sl.k==='verdict') b=`<div class="s light"><div class="stamp">${sl.v}</div><p>${sl.s}</p><div class="bar"></div><p style="font-weight:700">${sl.c}</p>${foot('')}</div>`;
  if(sl.k==='close') b=`<div class="s navy"><div class="frame"></div><h1>${sl.t}</h1><div class="bar"></div><p>${sl.s}</p><p class="gold" style="margin-top:60px;font-size:40px;letter-spacing:4px">ABOGADOS · CORREDOR INMOBILIARIO</p>${foot('gold')}</div>`;
  return `<html><head><meta charset="utf8"><style>${css}</style></head><body>${b}</body></html>`;
}
(async()=>{
  const br=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'}).catch(()=>chromium.launch());
  const pg=await br.newPage({viewport:{width:1080,height:1350}});
  for(const [name,sl] of Object.entries(posts)) for(let i=0;i<sl.length;i++){
    await pg.setContent(html(sl[i],i,sl.length));
    await pg.screenshot({path:`${name}_${i+1}.jpg`,type:'jpeg',quality:88});
  }
  await br.close(); console.log('ok');
})();
