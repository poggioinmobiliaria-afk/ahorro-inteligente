// Historia estándar MA.FRA (1080x1920) para anunciar propiedades: foto del frente + banda dorada.
// Uso: node historia_propiedad.js <foto> <VENTA|ALQUILER> "<Título>" "<Subtítulo>" <salida.jpg>
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), path = require('path');
const [foto, op = 'VENTA', titulo = 'Propiedad', sub = '', salida = 'historia.jpg'] = process.argv.slice(2);
const b64 = f => 'data:image/' + (f.toLowerCase().endsWith('png') ? 'png' : 'jpeg') + ';base64,' + fs.readFileSync(f).toString('base64');
const LOGO = b64(path.join(__dirname, 'logo_white.png')), FOTO = b64(foto);
const fs_t = titulo.length <= 14 ? 92 : titulo.length <= 18 ? 80 : titulo.length <= 22 ? 66 : 56;
const html = `<html><head><meta charset="utf8"><style>
*{margin:0;box-sizing:border-box}
body{width:1080px;height:1920px;overflow:hidden;position:relative;background:#4e1b1f;font-family:'DejaVu Sans',sans-serif;color:#fff}
.logo{position:absolute;top:150px;left:50%;transform:translateX(-50%);width:190px;padding:12px;border:2px solid #c9a27a}
.foto{position:absolute;left:60px;right:60px;top:430px;height:820px;background:url(${FOTO}) center/cover;border:4px solid #c9a27a;filter:brightness(1.05) contrast(1.08) saturate(1.1)}
.banda{position:absolute;left:0;right:0;top:1290px;height:140px;background:#c9a27a;display:flex;align-items:center;justify-content:center}
.banda span{font:700 100px 'DejaVu Serif',serif;color:#4e1b1f;letter-spacing:2px}
.tit{white-space:nowrap;position:absolute;left:60px;right:60px;top:1465px;text-align:center;font:700 ${fs_t}px/1.05 'DejaVu Serif',serif}
.sub{position:absolute;left:60px;right:60px;top:${1475+fs_t}px;text-align:center;font:38px 'DejaVu Sans';color:#d9b98a}
.wa{position:absolute;left:140px;right:140px;top:1655px;background:#f7f2ea;color:#4e1b1f;border-radius:18px;padding:22px;text-align:center;font:700 42px 'DejaVu Sans'}
</style></head><body>
<img class="logo" src="${LOGO}">
<div class="foto"></div>
<div class="banda"><span>EN ${op.toUpperCase()}</span></div>
<div class="tit">${titulo}</div>
${sub ? `<div class="sub">${sub}</div>` : ''}
<div class="wa">Consultá: 3584447604</div>
</body></html>`;
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.setContent(html); await p.waitForTimeout(300);
  await p.screenshot({ path: salida, type: 'jpeg', quality: 90 });
  await b.close(); console.log('OK', salida);
})();
