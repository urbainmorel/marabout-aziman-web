/**
 * scripts/process_subservices_ratios.cjs
 * 
 * Génère les différents ratios requis pour chacune des 32 fiches de services individuels :
 * - HERO (16:9 / 1536x864) -> Hero des pages de rituels (/services/[silo]/[slug])
 * - CARD (16:10 / 800x500) -> Cartes sur les pages catégories (/services/[silo]) & corps d'article
 * - SQUARE (1:1 / 800x800) -> Vignettes carrées / OpenGraph
 * 
 * Convertit automatiquement les fichiers PNG et compresse en WebP STRICTEMENT < 180 Ko.
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

const servicesData = loadTs(path.resolve('src/data/servicesData.ts'));
const hubs = servicesData.servicesHubs;

const SOURCE_BASE = path.resolve('public/images/generated/02-services');
const OUTPUT_BASE = path.resolve('public/images/services');

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
  console.log('🖼️  GENERATION & CONVERSION DES RATIOS POUR LES 32 SERVICES');
  console.log('   Destination : public/images/services/[silo]/');
  console.log('================================================================\n');

  let totalGenerated = 0;

  for (const hub of hubs) {
    const hubSourceDir = path.join(SOURCE_BASE, hub.silo);
    const hubOutputDir = path.join(OUTPUT_BASE, hub.silo);

    if (!fs.existsSync(hubOutputDir)) {
      fs.mkdirSync(hubOutputDir, { recursive: true });
    }

    const availableFiles = fs.existsSync(hubSourceDir) ? fs.readdirSync(hubSourceDir) : [];

    console.log(`📁 Catégorie : [${hub.silo}] (${hub.subservices.length} services)`);

    for (const sub of hub.subservices) {
      // Trouver le fichier correspondant au slug
      const matchedFile = availableFiles.find(f => f.startsWith(sub.slug));

      if (!matchedFile) {
        console.error(`   ❌ Source introuvable pour : ${sub.slug}`);
        continue;
      }

      const inputPath = path.join(hubSourceDir, matchedFile);
      const ext = path.extname(matchedFile).toLowerCase();

      console.log(`   ✨ Service : ${sub.slug} (Source: ${matchedFile} [${ext}])`);

      for (const ratio of RATIOS) {
        const outFilename = `${sub.slug}${ratio.suffix}`;
        const outPath = path.join(hubOutputDir, outFilename);

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
