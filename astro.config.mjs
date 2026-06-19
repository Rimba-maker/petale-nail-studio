import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://rimba-maker.github.io',
  base: process.env.GITHUB_ACTIONS ? '/petale-nail-studio' : '/',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
