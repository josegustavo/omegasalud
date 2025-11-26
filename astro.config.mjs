// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import yaml from '@rollup/plugin-yaml';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://omegasalud.pages.dev',
  output: 'server',

  vite: {
    plugins: [tailwindcss(), yaml()],
    build: {
      cssMinify: 'lightningcss',
      // Reduce JS chain depth by bundling related modules together
      rollupOptions: {
        output: {
          // Bundle cart-related modules together to reduce chain
          manualChunks: (id) => {
            if (id.includes('store/cart') || id.includes('utils/sound')) {
              return 'cart-utils';
            }
            if (id.includes('node_modules/nanostores')) {
              return 'vendor';
            }
          }
        }
      }
    }
  },

  // Inline small stylesheets to reduce requests
  build: {
    inlineStylesheets: 'auto'
  },

  integrations: [sitemap()],
  
  adapter: cloudflare({
    // Usar 'compile' para optimizar imágenes durante el build con Sharp
    // Las imágenes se convierten a WebP en tiempo de build
    imageService: 'compile'
  })
});