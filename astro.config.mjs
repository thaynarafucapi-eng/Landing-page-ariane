// @ts-check
import { defineConfig } from 'astro/config';

/**
 * URL pública do site (canonical, sitemap, Open Graph).
 * Ordem: SITE_URL (definida manualmente) → URL (fornecida pelo Netlify, que
 * passa a ser o domínio próprio quando ele for definido como principal) →
 * domínio definitivo.
 */
const site = process.env.SITE_URL || process.env.URL || 'https://arianecarvalho.to';

export default defineConfig({
  site,
  trailingSlash: 'ignore',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  compressHTML: true,
  devToolbar: { enabled: false },
});
