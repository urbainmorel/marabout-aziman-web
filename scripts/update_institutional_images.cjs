const fs = require('fs');
const path = require('path');

const legalPages = [
  'src/pages/cgu.astro',
  'src/pages/cookies.astro',
  'src/pages/mentions-legales.astro',
  'src/pages/politique-confidentialite.astro'
];

legalPages.forEach(p => {
  const full = path.resolve(p);
  let c = fs.readFileSync(full, 'utf8');
  c = c.replace(/image="https:\/\/images\.unsplash\.com\/[^"]+"/g, 'image="/images/institutionnel/legales.webp"');
  fs.writeFileSync(full, c, 'utf8');
  console.log('✅ Updated ' + p);
});

// Update BaseLayout default image
const baseLayoutPath = path.resolve('src/layouts/BaseLayout.astro');
let baseLayout = fs.readFileSync(baseLayoutPath, 'utf8');
baseLayout = baseLayout.replace(/image\s*=\s*"https:\/\/images\.unsplash\.com\/[^"]+"/g, 'image = "/images/og-default.webp"');
fs.writeFileSync(baseLayoutPath, baseLayout, 'utf8');
console.log('✅ Updated BaseLayout.astro');

// Update PageLayout default heroImage
const pageLayoutPath = path.resolve('src/layouts/PageLayout.astro');
let pageLayout = fs.readFileSync(pageLayoutPath, 'utf8');
pageLayout = pageLayout.replace(/heroImage\s*=\s*"https:\/\/images\.unsplash\.com\/[^"]+"/g, 'heroImage = "/images/og-default.webp"');
fs.writeFileSync(pageLayoutPath, pageLayout, 'utf8');
console.log('✅ Updated PageLayout.astro');
