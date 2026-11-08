# Paranui Organics website

Source for [paranuiorganics.co.nz](https://www.paranuiorganics.co.nz). Built with [Astro](https://astro.build) and Tailwind CSS, hosted on GitHub Pages.

## Development

Requires Node 22.23.4+.

```bash
npm install
npm run dev   # http://localhost:4321
npm test      # build + link check
```

## Content

| What | Where |
|---|---|
| Products | `src/content/products/*.md` |
| Suppliers and map | `src/data/suppliers.json` |
| Business details | `src/data/business.json` |
| Pages | `src/pages/` |
| Images | `src/assets/images/` |

## Deployment

Pushing to `main` builds and deploys the site to GitHub Pages via GitHub Actions.
