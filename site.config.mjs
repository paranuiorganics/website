// Single test/prod switch. Set DEPLOY_ENV=production (shell, .env, or GitHub repo variable)
// for the live site; anything else = test. Drives the site URL (canonical, sitemap, OpenGraph),
// the robots meta tag and robots.txt.
import { loadEnv } from 'vite';

const ENVIRONMENTS = {
  test: { url: 'https://paranuiorganics.bartosh.nz', noindex: true },
  production: { url: 'https://www.paranuiorganics.co.nz', noindex: false },
};

const env = { ...loadEnv('', process.cwd(), ''), ...process.env };
export const DEPLOY_ENV = env.DEPLOY_ENV === 'production' ? 'production' : 'test';
export const SITE = ENVIRONMENTS[DEPLOY_ENV];
