import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// BASE PATH RULE (do not change without reading this):
//   local dev / preview  -> '/'                    (http://localhost:4321/)
//   GitHub Pages build   -> '/petale-nail-studio'  (only when GitHub Actions builds it)
// GitHub Actions sets GITHUB_ACTIONS=true automatically; it is unset on a normal machine.
// Never hard-code the production base here, or localhost stops opening at '/'.
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';
const PAGES_BASE = '/petale-nail-studio';

export default defineConfig({
  site: 'https://rimba-maker.github.io',
  base: isGitHubPages ? PAGES_BASE : '/',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
