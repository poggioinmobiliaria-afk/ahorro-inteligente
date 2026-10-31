// Post educativo/tip para feed Instagram — 1080×1350
// Uso: node post_educativo.js "<titulo>" "<subtitulo>" "<linea1>" "<linea2>" ... salida.jpg
// El último argumento siempre es el archivo de salida (.jpg/.png)
// Mínimo 3 argumentos: titulo, subtitulo, salida

const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), path = require('path');

const args = process.argv.slice(2);
const salida = args[args.length - 1];
const titulo = args[0] || 'Título';
const subtitulo = args[1] || '';
const puntos = args.slice(2, -1);

const LOGO = 'data:image/png;base64,' + fs.readFileSync(path.join(__dirname, 'logo_white.png')).toString('base64');

const itemsHtml = puntos.map((p, i) => `
  <div class="item">
    <div class="num">${String(i + 1).padStart(2, '0')}</div>
    <div class="txt">${p}</div>
  </div>`).join('');

const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  width: 540px; height: 675px; overflow: hidden;
  zoom: 0.5;
  background: #1a0a0c;
  font-family: 'Georgia', serif;
  display: flex; flex-direction: column;
}
.banda-top {
  height: 4px; background: linear-gradient(90deg, #c9a27a, #e8c99a, #c9a27a);
}
.header {
  background: #4e1b1f;
  padding: 24px 36px 20px;
  display: flex; justify-content: space-between; align-items: center;
  border-bottom: 1.5px solid #c9a27a;
}
.header img { height: 32px; }
.header .tag {
  font-family: Arial, sans-serif;
  font-size: 11px; color: #c9a27a;
  letter-spacing: 3px; text-transform: uppercase;
}
.hero {
  background: #4e1b1f;
  padding: 28px 36px 22px;
  flex-shrink: 0;
}
.hero .titulo {
  font-size: 32px; font-weight: 700;
  color: #fff; line-height: 1.15;
  letter-spacing: -0.5px;
}
.hero .titulo em {
  font-style: normal; color: #c9a27a;
}
.hero .subtitulo {
  margin-top: 8px;
  font-family: Arial, sans-serif;
  font-size: 14px; color: #e7d3bd;
  line-height: 1.4;
}
.sep {
  height: 1.5px; background: linear-gradient(90deg, #c9a27a 60%, transparent);
  margin: 0 36px;
}
.body {
  flex: 1; padding: 20px 36px 16px;
  display: flex; flex-direction: column; gap: 11px;
}
.item {
  display: flex; align-items: flex-start; gap: 14px;
}
.num {
  font-family: Arial, sans-serif;
  font-size: 18px; font-weight: 700; color: #c9a27a;
  min-width: 26px; line-height: 1.2;
}
.txt {
  font-family: Arial, sans-serif;
  font-size: 15px; color: #f0e8df; line-height: 1.45;
}
.footer {
  background: #4e1b1f;
  border-top: 1.5px solid #c9a27a;
  padding: 12px 36px;
  display: flex; justify-content: space-between; align-items: center;
}
.footer .contact {
  font-family: Arial, sans-serif;
  font-size: 11px; color: #e7d3bd; letter-spacing: 0.5px;
}
.footer .ig {
  font-family: Arial, sans-serif;
  font-size: 11px; color: #c9a27a; font-weight: 700;
}
.banda-bot {
  height: 4px; background: linear-gradient(90deg, #c9a27a, #e8c99a, #c9a27a);
}
</style></head><body>
<div class="banda-top"></div>
<div class="header">
  <img src="${LOGO}">
  <div class="tag">Inmobiliaria</div>
</div>
<div class="hero">
  <div class="titulo">${titulo}</div>
  ${subtitulo ? `<div class="subtitulo">${subtitulo}</div>` : ''}
</div>
<div class="sep"></div>
<div class="body">${itemsHtml}</div>
<div class="footer">
  <div class="contact">☎ 358 444-7604</div>
  <div class="ig">@mafra.inmobiliaria</div>
</div>
<div class="banda-bot"></div>
</body></html>`;

(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const p = await b.newPage();
  await p.setViewportSize({ width: 270, height: 338 });
  await p.setContent(html, { waitUntil: 'load' });
  await p.screenshot({ path: salida, type: salida.endsWith('.png') ? 'png' : 'jpeg', quality: salida.endsWith('.png') ? undefined : 15 });
  await b.close();
  console.log('OK ' + salida);
})();
