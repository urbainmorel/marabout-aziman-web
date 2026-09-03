/**
 * scripts/process_category_ratios.cjs
 * 
 * Génère les différents ratios requis pour chaque catégorie de service :
 * 1. HERO (16:9 / 1536x864) -> Hero des pages catégories (/services/[silo])
 * 2. CARD (16:10 / 800x500) -> Grille de la page d'accueil (index.astro) & DomainCard
 * 3. PILLAR (4:3 / 800x600) -> Page pilier des services (/services)
 * 4. SQUARE (1:1 / 800x800) -> Vignettes carrées / OpenGraph
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SOURCE_DIR = path.resolve(__dirname, '..', 'public', 'images', 'generated', '01-categories-services');
const OUTPUT_DIR = path.resolve(__dirname, '..', 'public', 'images', 'services', 'categories');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Mapping des 8 catégories
const categoryMapping = [
  { silo: 'amour-sentiments', file: '01-amour-sentiments_p1.webp' },
  { silo: 'richesse-finance', file: '02-richesse-finance_p1.webp' },
  { silo: 'commerce-carriere-reussite', file: '03-commerce-carriere-reussite_p2.webp' },
  { silo: 'divination-voyance', file: '04-divination-voyance_p1.webp' },
  { silo: 'protection-desenvoutement', file: '05-protection-desenvoutement_p1.webp' },
  { silo: 'sante-traditionnelle', file: '06-sante-traditionnelle_p3.webp' },
  { silo: 'justice-proces-litiges', file: '07-justice-proces-litiges_p1.webp' },
  { silo: 'immigration-titres-sejour-visas', file: '08-immigration-titres-sejour-visas_p2.webp' },
];

const RATIOS = [
  {
    name: 'hero',
    suffix: '-hero.webp',
    width: 1536,
    height: 864,
    description: 'Format 16:9 Panoramique pour Hero de page catégorie (/services/[silo])'
  },
  {
    name: 'card',
    suffix: '-card.webp',
    width: 800,
    height: 500,
    description: 'Format 16:10 pour les cartes de la page d\'accueil (index.astro) & DomainCard'
  },
  {
    name: 'pillar',
    suffix: '-pillar.webp',
    width: 800,
    height: 600,
    description: 'Format 4:3 pour la page pilier des services (/services)'
  },
  {
    name: 'square',
    suffix: '-square.webp',
    width: 800,
    height: 800,
    description: 'Format 1:1 Carré pour vignettes / réseaux sociaux / OpenGraph'
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
  console.log('🖼️  GENERATION DES RATIOS MULTI-FORMATS POUR CATEGORIES SERVICES');
  console.log('   Destination : public/images/services/categories/');
  console.log('================================================================\n');

  for (const cat of categoryMapping) {
    const inputPath = path.join(SOURCE_DIR, cat.file);
    if (!fs.existsSync(inputPath)) {
      console.error(`❌ Fichier source introuvable : ${cat.file}`);
      continue;
    }

    console.log(`📁 Traitement de la catégorie : [${cat.silo}] (Source: ${cat.file})`);

    for (const ratio of RATIOS) {
      const outFilename = `${cat.silo}${ratio.suffix}`;
      const outPath = path.join(OUTPUT_DIR, outFilename);

      const sizeKb = await optimizeResize(inputPath, outPath, ratio.width, ratio.height);
      console.log(`   ✨ ${ratio.name.toUpperCase().padEnd(6)} (${ratio.width}x${ratio.height}) -> ${outFilename} [${sizeKb} Ko]`);
    }
    console.log('');
  }

  console.log('================================================================');
  console.log('🎉 TOUS LES RATIOS ONT ETE GENERES AVEC SUCCES (32 fichiers WebP) !');
  console.log('================================================================');
})();
