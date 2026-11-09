import type { APIRoute } from 'astro';

// Legacy URL (the old site's sitemap). Indexes can't nest, so list the generated sitemap directly.
export const GET: APIRoute = ({ site }) => {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>${new URL('sitemap-0.xml', site)}</loc></sitemap></sitemapindex>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
