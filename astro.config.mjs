import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sanity from '@sanity/astro';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://marabout-aziman.fr',
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
});
