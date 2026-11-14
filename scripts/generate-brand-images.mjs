/**
 * Gera favicon PNG, apple-touch-icon e a imagem de compartilhamento (Open Graph)
 * a partir dos arquivos ORIGINAIS da logo em public/marca/.
 * Uso: NODE_PATH=$(npm root -g) node scripts/generate-brand-images.mjs  (requer Playwright/Chromium)
 */
import { createRequire } from 'node:module';
// Playwright não é dependência do site; usa a instalação global (NODE_PATH) ou local.
const { chromium } = createRequire(import.meta.url)('playwright');
import { readFileSync } from 'node:fs';

const svg = (f) => `data:image/svg+xml;base64,${readFileSync(new URL(`../public/marca/${f}`, import.meta.url)).toString('base64')}`;
const out = (f) => new URL(`../public/${f}`, import.meta.url).pathname;

const browser = await chromium.launch();
const page = await browser.newPage();

async function shot(html, w, h, file, type = 'png') {
  await page.setViewportSize({ width: w, height: h });
  await page.setContent(`<!doctype html><html><body style="margin:0">${html}</body></html>`);
  await page.waitForTimeout(150);
  await page.screenshot({ path: out(file), type, ...(type === 'jpeg' ? { quality: 88 } : {}) });
}

const icon = (size, pad) =>
  `<div style="width:${size}px;height:${size}px;background:#FEFDF8;display:grid;place-items:center">
     <img src="${svg('arvore.svg')}" style="width:${size - pad * 2}px;height:auto">
   </div>`;

await shot(icon(32, 1), 32, 32, 'favicon-32.png');
await shot(icon(180, 18), 180, 180, 'apple-touch-icon.png');

await shot(
  `<div style="width:1200px;height:630px;background:#FEFDF8;display:grid;place-items:center;font-family:Arial,sans-serif;position:relative;overflow:hidden">
     <div style="position:absolute;inset:auto 0 0 0;height:14px;display:flex">
       <span style="flex:1;background:#1E3A5F"></span><span style="flex:1;background:#D94F45"></span>
       <span style="flex:1;background:#E7B665"></span><span style="flex:1;background:#A8D5BA"></span>
     </div>
     <div style="display:grid;justify-items:center;gap:36px">
       <img src="${svg('logo-ariane-carvalho.svg')}" style="width:720px;height:auto">
       <div style="color:#1E3A5F;font-size:30px;letter-spacing:.02em">Terapia Ocupacional infantil · Eusébio/CE</div>
     </div>
   </div>`,
  1200,
  630,
  'og-image.jpg',
  'jpeg',
);

await browser.close();
console.log('Imagens de marca geradas em public/.');
