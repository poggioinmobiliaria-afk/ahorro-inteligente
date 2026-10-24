// Informe de tasación MA.FRA en PDF A4, a partir de un JSON con los datos.
// Uso: node tasacion_pdf.js datos.json salida.pdf
// Los datos (cliente, valores, fotos) quedan fuera del repo: el JSON vive en el scratchpad.
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), path = require('path');
const [jsonPath, salida = 'tasacion.pdf'] = process.argv.slice(2);
const D = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
const b64 = f => 'data:image/' + (f.toLowerCase().endsWith('png') ? 'png' : 'jpeg') + ';base64,' + fs.readFileSync(f).toString('base64');
const LOGO = b64(path.join(__dirname, 'logo_white.png'));
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const filas = rows => rows.map(([k, v]) => `<tr><td class="k">${esc(k)}</td><td>${esc(v)}</td></tr>`).join('');
const parrafos = arr => (arr || []).map(p => `<p>${esc(p)}</p>`).join('');
const fotos = (D.fotos || []).map(f => `<div class="ph" style="background-image:url(${b64(f)})"></div>`).join('');

const html = `<html><head><meta charset="utf8"><style>
@page{size:A4;margin:0}
*{box-sizing:border-box;margin:0}
body{font-family:'DejaVu Sans',sans-serif;font-size:10.5pt;color:#2b2b2b}
.pg{width:210mm;height:297mm;position:relative;padding:0 16mm;page-break-after:always;overflow:hidden}
.hdr{background:#4e1b1f;color:#fff;margin:0 -16mm 7mm;padding:7mm 16mm;display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid #c9a27a}
.hdr .t{font:700 17pt 'DejaVu Serif',serif;letter-spacing:1px}
.hdr .s{font-size:8.5pt;color:#e7d3bd;margin-top:2mm;letter-spacing:1.5px}
.hdr img{height:20mm}
h2{font:700 12pt 'DejaVu Serif',serif;color:#4e1b1f;border-bottom:1.5px solid #c9a27a;padding-bottom:1.5mm;margin:5mm 0 3mm}
p{margin:0 0 2.2mm;line-height:1.45;text-align:justify}
table{width:100%;border-collapse:collapse;margin-bottom:2mm}
td,th{padding:1.8mm 2.5mm;border-bottom:1px solid #eadfce;vertical-align:top}
td.k{width:42%;color:#6b5a48}
th{background:#f4ece1;color:#4e1b1f;text-align:left;font-size:9.5pt}
td.n,th.n{text-align:right;white-space:nowrap}
.hero{width:100%;height:78mm;background:center/cover;border:2px solid #c9a27a;margin-bottom:2mm}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:3mm}
.ph{height:52mm;background:center/cover;border:1.5px solid #c9a27a}
.vals{display:grid;grid-template-columns:1fr 1fr 1fr;gap:4mm;margin:3mm 0 4mm}
.box{border:2px solid #c9a27a;padding:4mm;text-align:center;background:#fbf7f1}
.box .l{font-size:8.5pt;color:#6b5a48;letter-spacing:1px;text-transform:uppercase}
.box .v{font:700 15pt 'DejaVu Serif',serif;color:#4e1b1f;margin-top:1.5mm}
.box.main{background:#4e1b1f;border-color:#4e1b1f}.box.main .l{color:#e7d3bd}.box.main .v{color:#fff}
.warn{background:#fbf3e6;border-left:4px solid #c9a27a;padding:3mm 4mm;margin:3mm 0;font-size:9.5pt}
.firma{margin-top:12mm;text-align:center;font-size:9.5pt}
.firma .ln{width:70mm;border-top:1px solid #2b2b2b;margin:0 auto 2mm}
.foot{position:absolute;bottom:8mm;left:16mm;right:16mm;border-top:1px solid #c9a27a;padding-top:2mm;font-size:7.5pt;color:#8a7a68;display:flex;justify-content:space-between}
</style></head><body>
<div class="pg">
 <div class="hdr"><div><div class="t">INFORME DE TASACIÓN</div><div class="s">${esc(D.subtitulo)}</div></div><img src="${LOGO}"></div>
 ${D.hero ? `<div class="hero" style="background-image:url(${b64(D.hero)})"></div>` : ''}
 <h2>1. Identificación del inmueble</h2><table>${filas(D.identificacion)}</table>
 <h2>2. Descripción</h2>${parrafos(D.descripcion)}
 <div class="foot"><span>MA.FRA · Estudio Jurídico &amp; Inmobiliario · San Martín 72, Piso 1, Of. B · La Carlota</span><span>${esc(D.fecha)} · Pág. 1</span></div>
</div>
<div class="pg">
 <div class="hdr"><div><div class="t">INFORME DE TASACIÓN</div><div class="s">${esc(D.subtitulo)}</div></div><img src="${LOGO}"></div>
 <h2>3. Metodología y cálculo</h2>${parrafos(D.metodologia)}
 <table><tr><th>Método</th><th>Detalle</th><th class="n">Valor (USD)</th></tr>
 ${D.metodos.map(m => `<tr><td><b>${esc(m[0])}</b></td><td>${esc(m[1])}</td><td class="n">${esc(m[2])}</td></tr>`).join('')}</table>
 <h2>4. Valores sugeridos</h2>
 <div class="vals">${D.valores.map((v, i) => `<div class="box${i === 0 ? ' main' : ''}"><div class="l">${esc(v[0])}</div><div class="v">${esc(v[1])}</div></div>`).join('')}</div>
 ${parrafos(D.conclusion)}
 ${(D.notas || []).map(n => `<div class="warn">${esc(n)}</div>`).join('')}
 <div class="foot"><span>MA.FRA · Estudio Jurídico &amp; Inmobiliario</span><span>${esc(D.fecha)} · Pág. 2</span></div>
</div>
<div class="pg">
 <div class="hdr"><div><div class="t">INFORME DE TASACIÓN</div><div class="s">${esc(D.subtitulo)}</div></div><img src="${LOGO}"></div>
 ${fotos ? `<h2>5. Registro fotográfico</h2><div class="grid">${fotos}</div>` : ''}
 <h2>${fotos ? '6' : '5'}. Consideraciones</h2>
 <p>El presente informe expresa una opinión profesional de valor de mercado a la fecha de emisión, basada en la información catastral, la inspección del inmueble y los valores de referencia de la zona. No constituye un estudio de títulos. Los valores en dólares se calcularon al tipo de cambio BNA vendedor indicado y deben revisarse ante cambios significativos del mercado.</p>
 <div class="firma"><div class="ln"></div>Franco Poggio<br>Corredor Inmobiliario · Mat. 04-5109<br>MA.FRA · Estudio Jurídico &amp; Inmobiliario</div>
 <div class="foot"><span>MA.FRA · Estudio Jurídico &amp; Inmobiliario</span><span>${esc(D.fecha)} · Pág. 3</span></div>
</div>
</body></html>`;

(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const p = await b.newPage();
  await p.setContent(html, { waitUntil: 'load' });
  await p.pdf({ path: salida, format: 'A4', printBackground: true });
  if (process.env.PREVIEW) { await p.setViewportSize({ width: 794, height: 1123 }); await p.screenshot({ path: process.env.PREVIEW, fullPage: true }); }
  await b.close();
  console.log('OK ' + salida);
})();
