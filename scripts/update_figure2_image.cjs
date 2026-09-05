const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const sourceImagePath = path.resolve('public/images/portefeuille_magique_billets_vodun_consacre.png');
const blogOutputDir = path.resolve('public/images/blog/richesse-prosperite');
const blogRootDir = path.resolve('public/images/blog');

if (!fs.existsSync(sourceImagePath)) {
  console.error('Source image not found:', sourceImagePath);
  process.exit(1);
}

async function optimizeAndReplaceFigure2() {
  console.log('Optimizing Figure 2 image for SEO (WebP quality 85)...');

  const dest1 = path.join(blogOutputDir, 'consecration-portefeuille-magique-sanctuaire-aziman.webp');
  const dest2 = path.join(blogRootDir, 'consecration-portefeuille-magique-sanctuaire-aziman.webp');
  const dest3 = path.join(blogOutputDir, 'portefeuille-magique-grand-maitre-aziman-2.webp');

  await sharp(sourceImagePath)
    .webp({ quality: 85, reductionEffort: 6 })
    .toFile(dest1);
  console.log('Saved:', dest1);

  await sharp(sourceImagePath)
    .webp({ quality: 85, reductionEffort: 6 })
    .toFile(dest2);
  console.log('Saved:', dest2);

  await sharp(sourceImagePath)
    .webp({ quality: 85, reductionEffort: 6 })
    .toFile(dest3);
  console.log('Saved:', dest3);

  console.log('Figure 2 image optimization completed successfully!');
}

optimizeAndReplaceFigure2().catch(err => {
  console.error('Error optimizing Figure 2 image:', err);
  process.exit(1);
});
