import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sanity from '@sanity/astro';
import sitemap from '@astrojs/sitemap';

process.env.SANITY_ASTRO_DISABLE_MODULE_DEDUPE = 'true';

// https://astro.build/config - Sanity Studio enabled
export default defineConfig({
  site: 'https://www.marabout-aziman.fr',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      filter: (page) => !page.includes('/studio'),
    }),
    sanity({
      projectId: 'y8rqnviv',
      dataset: 'production',
      apiVersion: '2024-03-01',
      useCdn: false,
      studioBasePath: '/studio',
    }),
  ],
  vite: {
    optimizeDeps: {
      include: [
        'sanity',
        'sanity/structure',
        'sanity/router',
        'react',
        'react-dom',
        'react-dom/client',
        'styled-components',
        '@sanity/ui',
        '@sanity/icons',
        'react-refractor',
        'refractor/lang/bash.js',
        'refractor/lang/javascript.js',
        'refractor/lang/json.js',
        'refractor/lang/jsx.js',
        'refractor/lang/typescript.js',
      ],
    },
  },
});
