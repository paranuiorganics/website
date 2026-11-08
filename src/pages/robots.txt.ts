import type { APIRoute } from 'astro';

// Test builds block all crawlers; production allows everything and points at the sitemap.
export const GET: APIRoute = ({ site }) => {
  const body = import.meta.env.NOINDEX
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site)}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain' } });
};
