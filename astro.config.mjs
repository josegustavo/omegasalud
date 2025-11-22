// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import yaml from '@rollup/plugin-yaml';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://omegasalud.pe',

  vite: {
    plugins: [tailwindcss(), yaml()]
  },

  integrations: [sitemap()],
  adapter: cloudflare()
});