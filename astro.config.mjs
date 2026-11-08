import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { DEPLOY_ENV, SITE } from './site.config.mjs';

export default defineConfig({
  site: SITE.url,
  // Legacy URLs have no trailing slash (/products). 'file' emits products.html, which
  // GitHub Pages serves at /products without a redirect.
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap({ filter: (page) => !page.endsWith('/404') })],
  vite: {
    plugins: [tailwindcss()],
    define: {
      'import.meta.env.DEPLOY_ENV': JSON.stringify(DEPLOY_ENV),
      'import.meta.env.NOINDEX': JSON.stringify(SITE.noindex),
    },
  },
});
