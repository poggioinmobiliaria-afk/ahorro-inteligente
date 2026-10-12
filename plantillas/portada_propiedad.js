// Portada estándar MA.FRA para posts de propiedades (alquiler o venta).
// Uso:
//   node portada_propiedad.js <foto.jpg> <ALQUILER|VENTA> "<Título>" "<Dirección>" "<Ciudad>" <totalSlides> <salida.jpg>
// Ej:
//   node portada_propiedad.js frente.jpg ALQUILER "Local comercial" "Esq. Vélez Sarsfield y Obispo Esquiú" "La Carlota, Córdoba" 8 portada.jpg
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
const path = require('path');

const [foto, op = 'ALQUILER', titulo = 'Propiedad', direccion = '', ciudad = 'La Carlota, Córdoba', total = '1', salida = 'portada.jpg'] = process.argv.slice(2);
if (!foto) { console.error('Falta la foto'); process.exit(1); }

const b64 = f => 'data:image/' + (f.toLowerCase().endsWith('png') ? 'png' : 'jpeg') + ';base64,' + fs.readFileSync(f).toString('base64');
const LOGO = b64(path.join(__dirname, 'logo_white.png'));
const FOTO = b64(foto);
const OP = 'EN ' + op.toUpperCase();

const html = `<html><head><meta charset="utf8"><style>
*{margin:0;box-sizing:border-box}
body{width:1080px;height:1350px;overflow:hidden;position:relative;background:#4e1b1f;font-family:'DejaVu Sans',sans-serif}
.foto{position:absolute;left:0;right:0;top:0;height:880px;background:url(${FOTO}) center/cover;filter:brightness(1.05) contrast(1.1) saturate(1.1)}
.sombra{position:absolute;left:0;right:0;top:640px;height:240px;background:linear-gradient(to bottom,rgba(78,27,31,0),rgba(78,27,31,.85))}
.marco{position:absolute;inset:24px;border:3px solid #c9a27a;pointer-events:none}
.logo{position:absolute;top:60px;right:60px;width:150px;padding:10px;background:rgba(78,27,31,.85);border:2px solid #c9a27a}
.banda{position:absolute;left:0;right:0;top:880px;height:150px;background:#c9a27a;display:flex;align-items:center;justify-content:center}
.banda span{font:700 104px 'DejaVu Serif',serif;color:#4e1b1f;letter-spacing:2px}
.info{position:absolute;left:70px;right:70px;top:1062px;color:#fff}
.tit{font:700 ${titulo.length<=18?82:titulo.length<=22?70:titulo.length<=26?62:54}px/1.05 'DejaVu Serif',serif;white-space:nowrap}
.dir{font:36px 'DejaVu Sans';color:#d9b98a;margin-top:18px}
.ciu{font:32px 'DejaVu Sans';color:#f0e2cf;margin-top:10px}
.foot{position:absolute;left:70px;right:70px;bottom:52px;display:flex;justify-content:space-between;color:#f0e2cf;font:22px 'DejaVu Sans';letter-spacing:4px}
</style></head><body>
<div class="foto"></div><div class="sombra"></div>
<img class="logo" src="${LOGO}">
<div class="banda"><span>${OP}</span></div>
<div class="info">
  <div class="tit">${titulo}</div>
  ${direccion ? `<div class="dir">${direccion}</div>` : ''}
  <div class="ciu">${ciudad}${Number(total) > 1 ? ' &nbsp;·&nbsp; Deslizá →' : ''}</div>
</div>
<div class="foot"><span>MA.FRA · ESTUDIO JURÍDICO &amp; INMOBILIARIO</span><span>${Number(total) > 1 ? '1/' + total : ''}</span></div>
<div class="marco"></div>
</body></html>`;

(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  await p.setContent(html);
  await p.waitForTimeout(400);
  await p.screenshot({ path: salida, type: 'jpeg', quality: 92 });
  await b.close();
  console.log('OK', salida);
})();
