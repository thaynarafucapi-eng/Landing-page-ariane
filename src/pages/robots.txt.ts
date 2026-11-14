import type { APIRoute } from 'astro';

/**
 * Em produção, libera a indexação. Em prévias/branches do Netlify
 * (CONTEXT != production), bloqueia para não indexar versões de teste.
 */
export const GET: APIRoute = ({ site }) => {
  const isProduction = !process.env.CONTEXT || process.env.CONTEXT === 'production';
  const body = isProduction
    ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', site).href}\n`
    : 'User-agent: *\nDisallow: /\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
