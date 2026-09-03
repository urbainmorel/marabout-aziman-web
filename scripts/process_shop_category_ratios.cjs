/**
 * scripts/process_shop_category_ratios.cjs
 * 
 * Génère les différents ratios requis pour chaque catégorie de produits boutique :
 * 1. HERO (16:9 / 1536x864) -> Hero des pages rayons boutique (/boutique/[category])
 * 2. CARD (16:10 / 800x500) -> Grille de la page d'accueil (index.astro) & ShopCard
 * 3. PILLAR (4:3 / 800x600) -> Page pilier boutique (/boutique)
 * 4. SQUARE (1:1 / 800x800) -> Vignettes carrées / OpenGraph / Réseaux sociaux
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SOURCE_DIR = path.resolve(__dirname, '..', 'public', 'images', 'generated', '03-categories-produits');
const OUTPUT_DIR = path.resolve(__dirname, '..', 'public', 'images', 'boutique', 'categories');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Mapping des 8 catégories boutique sélectionnées
const shopCategoryMapping = [
  { category: 'savons', file: '01-savons_p3.webp' },
  { category: 'eaux', file: '02-eaux_p1.webp' },
  { category: 'parfums-macerations', file: '03-parfums-macerations_p3.webp' },
  { category: 'poudres-terres-sacrees', file: '04-poudres-terres-sacrees_p1.webp' },
  { category: 'talismans-cuir-gris-gris', file: '05-talismans-cuir-gris-gris_p1.webp' },
  { category: 'parures-bayas-metaux', file: '06-parures-bayas-metaux_p1.webp' },
  { category: 'cadenas-receptacles-argent', file: '07-cadenas-receptacles-argent_p1.webp' },
  { category: 'pharmacopee-vegetale', file: '08-pharmacopee-vegetale_p3.webp' },
];

const RATIOS = [
  {
    name: 'hero',
    suffix: '-hero.webp',
    width: 1536,
    height: 864,
    description: 'Format 16:9 Panoramique pour Hero de rayon boutique (/boutique/[category])'
  },
  {
    name: 'card',
    suffix: '-card.webp',
    width: 800,
    height: 500,
    description: 'Format 16:10 pour les cartes boutique (index.astro & ShopCard)'
  },
  {
    name: 'pillar',
    suffix: '-pillar.webp',
    width: 800,
    height: 600,
    description: 'Format 4:3 pour la page pilier boutique (/boutique)'
  },
  {
    name: 'square',
    suffix: '-square.webp',
    width: 800,
    height: 800,
    description: 'Format 1:1 Carré pour vignettes et partages OpenGraph'
  }
];

async function optimizeResize(inputPath, outputPath, width, height) {
  let quality = 82;
  let outBuf;

  do {
    outBuf = await sharp(inputPath)
      .resize(width, height, {
        fit: 'cover',
        position: 'centre'
      })
      .webp({ quality, effort: 4 })
      .toBuffer();
    quality -= 5;
  } while (outBuf.length > 180 * 1024 && quality >= 40);

  fs.writeFileSync(outputPath, outBuf);
  return (outBuf.length / 1024).toFixed(1);
}

(async () => {
  console.log('================================================================');
  console.log('🖼️  GENERATION DES RATIOS MULTI-FORMATS POUR CATEGORIES BOUTIQUE');
  console.log('   Destination : public/images/boutique/categories/');
  console.log('================================================================\n');

  for (const item of shopCategoryMapping) {
    const inputPath = path.join(SOURCE_DIR, item.file);
    if (!fs.existsSync(inputPath)) {
      console.error(`❌ Fichier source introuvable : ${item.file}`);
      continue;
    }

    console.log(`📁 Traitement du rayon boutique : [${item.category}] (Source: ${item.file})`);

    for (const ratio of RATIOS) {
      const outFilename = `${item.category}${ratio.suffix}`;
      const outPath = path.join(OUTPUT_DIR, outFilename);

      const sizeKb = await optimizeResize(inputPath, outPath, ratio.width, ratio.height);
      console.log(`   ✨ ${ratio.name.toUpperCase().padEnd(6)} (${ratio.width}x${ratio.height}) -> ${outFilename} [${sizeKb} Ko]`);
    }
    console.log('');
  }

  console.log('================================================================');
  console.log('🎉 TOUS LES RATIOS BOUTIQUE ONT ETE GENERES (32 fichiers WebP) !');
  console.log('================================================================');
})();
