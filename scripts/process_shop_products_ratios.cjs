/**
 * scripts/process_shop_products_ratios.cjs
 * 
 * Génère les différents ratios requis pour chacun des 35 produits de la boutique :
 * - HERO (16:9 / 1536x864) -> Hero des fiches produits (/boutique/[category]/[slug])
 * - CARD (16:10 / 800x500) -> Cartes sur les pages rayons (/boutique/[category]) & corps d'article
 * - SQUARE (1:1 / 800x800) -> Vignettes carrées / OpenGraph / Catalogue
 * 
 * Compression Sharp en WebP STRICTEMENT < 180 Ko.
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const ts = require('typescript');

function loadTs(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  const js = ts.transpileModule(code, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const mod = { exports: {} };
  const fn = new Function('exports', 'module', js);
  fn(mod.exports, mod);
  return mod.exports;
}

const shopData = loadTs(path.resolve('src/data/shopData.ts'));
const categories = shopData.boutiqueCategories;

const SOURCE_BASE = path.resolve('public/images/generated/04-produits');
const OUTPUT_BASE = path.resolve('public/images/boutique');

const RATIOS = [
  {
    name: 'hero',
    suffix: '-hero.webp',
    width: 1536,
    height: 864,
  },
  {
    name: 'card',
    suffix: '-card.webp',
    width: 800,
    height: 500,
  },
  {
    name: 'square',
    suffix: '-square.webp',
    width: 800,
    height: 800,
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
  console.log('🖼️  GENERATION DES RATIOS MULTI-FORMATS POUR LES 35 PRODUITS');
  console.log('   Destination : public/images/boutique/[category]/');
  console.log('================================================================\n');

  let totalGenerated = 0;

  for (const cat of categories) {
    const catSourceDir = path.join(SOURCE_BASE, cat.category);
    const catOutputDir = path.join(OUTPUT_BASE, cat.category);

    if (!fs.existsSync(catOutputDir)) {
      fs.mkdirSync(catOutputDir, { recursive: true });
    }

    console.log(`📁 Rayon : [${cat.category}] (${cat.products.length} produits)`);

    for (const prod of cat.products) {
      const inputPath = path.join(catSourceDir, `${prod.slug}.webp`);

      if (!fs.existsSync(inputPath)) {
        console.error(`   ❌ Source introuvable pour : ${prod.slug} (${inputPath})`);
        continue;
      }

      console.log(`   ✨ Produit : ${prod.slug}`);

      for (const ratio of RATIOS) {
        const outFilename = `${prod.slug}${ratio.suffix}`;
        const outPath = path.join(catOutputDir, outFilename);

        const sizeKb = await optimizeResize(inputPath, outPath, ratio.width, ratio.height);
        console.log(`      ↳ ${ratio.name.toUpperCase().padEnd(6)} (${ratio.width}x${ratio.height}) -> ${outFilename} [${sizeKb} Ko]`);
        totalGenerated++;
      }
    }
    console.log('');
  }

  console.log('================================================================');
  console.log(`🎉 TOTAL : ${totalGenerated} fichiers WebP générés avec succès !`);
  console.log('================================================================');
})();
