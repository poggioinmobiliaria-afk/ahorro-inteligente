const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const posts = {
 prop_admin: [
  {k:'cover', tag:'PROPIETARIOS', t:'¿Por qué dejar tu propiedad en manos de profesionales?', s:'4 razones →'},
  {k:'item', n:'1', t:'Elegimos bien al inquilino', s:'Verificamos ingresos, garantías y referencias antes de firmar.'},
  {k:'item', n:'2', t:'Contrato hecho por abogados', s:'Cláusulas claras que te protegen ante cualquier problema.'},
  {k:'item', n:'3', t:'Cobro y actualización sin discusiones', s:'Calculamos los aumentos por índice y cobramos por vos, todos los meses.'},
  {k:'item', n:'4', t:'Respaldo legal si algo sale mal', s:'Si hay atrasos o daños, actuamos rápido y por la vía correcta.'},
  {k:'close', t:'¿Tenés una propiedad para alquilar?', s:'Escribinos y te contamos cómo trabajamos.'},
 ],
 prop_nopaga: [
  {k:'cover', tag:'PROPIETARIOS', t:'Tu inquilino no paga: ¿qué hacer?', s:'Lo que sí y lo que no →'},
  {k:'item', n:'1', t:'No cortes servicios ni cambies la cerradura', s:'Aunque te deba, hacerlo te puede traer problemas legales a vos.'},
  {k:'item', n:'2', t:'Reclamá por escrito', s:'Una intimación formal de pago es el primer paso y deja constancia.'},
  {k:'item', n:'3', t:'Revisá las garantías', s:'Los garantes y el seguro de caución responden por la deuda.'},
  {k:'item', n:'4', t:'Asesorate antes de actuar', s:'El desalojo tiene pasos legales. Un error puede demorarlo meses.'},
  {k:'close', t:'¿Tenés un inquilino atrasado?', s:'Consultanos. Somos abogados y corredor inmobiliario.'},
 ],
 prop_mito: [
  {k:'cover', tag:'¿MITO o VERDAD?', t:'“Si el contrato vence y el inquilino no se va, puedo cambiar la cerradura.”', s:'Dejá tu respuesta en los comentarios ↓'},
  {k:'verdict', v:'MITO', s:'Aunque el contrato esté vencido, no podés sacar al inquilino por tu cuenta.<br><br>Solo un juez puede ordenar el desalojo. Hacerlo de hecho te puede traer problemas legales.', c:'¿Tu inquilino no quiere irse? Consultanos.'},
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
