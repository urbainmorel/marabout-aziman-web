/**
 * scripts/generate_35_products.cjs
 * 
 * Génération automatique des 35 images uniques de produits (Format 1:1 Carré 1024x1024)
 * via l'API OpenAI gpt-image-2.
 * 
 * Spécifications :
 * - 1 seule image par produit
 * - Rendu photographique net de jour, zéro texte, zéro humain
 * - Compression Sharp en WebP ultra-léger (< 180 Ko)
 * - Gestion automatique des retries en cas de rate-limit
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const OpenAI = require('openai');

const envPath = path.resolve(__dirname, '..', '.env');
require('dotenv').config({ path: envPath, override: true });

let API_KEY = process.env.OPENAI_API_KEY;
if (!API_KEY && fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const keyMatch = envContent.match(/OPENAI_API_KEY=(.*)/);
  if (keyMatch) API_KEY = keyMatch[1].trim();
}

if (!API_KEY) {
  console.error('❌ ERREUR : La clé OPENAI_API_KEY est introuvable dans le fichier .env !');
  process.exit(1);
}

const openai = new OpenAI({ apiKey: API_KEY });

const PROMPTS_DIR = path.resolve('prompts-generation-images/04-produits');
const OUTPUT_DIR = path.resolve('public/images/generated/04-produits');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function cleanOldGenerated() {
  if (fs.existsSync(OUTPUT_DIR)) {
    fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
  }
  ensureDir(OUTPUT_DIR);
}

function parsePromptFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  // Extraire le prompt sous "[COPIER-COLLER LE PROMPT CI-DESSOUS] :"
  const match = content.match(/\[COPIER-COLLER LE PROMPT CI-DESSOUS\]\s*:\s*\r?\n([\s\S]*?)(?=\r?\n\r?\nParamètres|\r?\nParamètres|$)/);
  if (!match) return null;
  let rawPrompt = match[1].trim();
  // Nettoyer les balises Midjourney éventuelles comme --ar 1:1, --v 6.1
  rawPrompt = rawPrompt.replace(/--ar\s+\d+:\d+/gi, '').replace(/--v\s+[0-9.]+/gi, '').replace(/--style\s+\w+/gi, '').trim();
  return rawPrompt;
}

async function compressToWebP(inputBuffer, outputPath) {
  let quality = 82;
  let outBuf;

  do {
    outBuf = await sharp(inputBuffer)
      .resize(1024, 1024, { fit: 'cover', position: 'centre' })
      .webp({ quality, effort: 4 })
      .toBuffer();
    quality -= 5;
  } while (outBuf.length > 180 * 1024 && quality >= 40);

  fs.writeFileSync(outputPath, outBuf);
  return (outBuf.length / 1024).toFixed(1);
}

async function generateSingleImage(prompt, outputPath, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await openai.images.generate({
        model: 'gpt-image-2',
        prompt: prompt,
        n: 1,
        size: '1024x1024'
      });

      const imageData = response.data[0];
      let imgBuffer;

      if (imageData.b64_json) {
        imgBuffer = Buffer.from(imageData.b64_json, 'base64');
      } else if (imageData.url) {
        const fetchRes = await fetch(imageData.url);
        imgBuffer = Buffer.from(await fetchRes.arrayBuffer());
      } else {
        throw new Error('Aucune donnée image renvoyée par l\'API');
      }

      const sizeKb = await compressToWebP(imgBuffer, outputPath);
      return sizeKb;
    } catch (err) {
      console.warn(`   ⚠️ Tentative ${attempt}/${maxRetries} échouée : ${err.message}`);
      if (attempt === maxRetries) throw err;
      await new Promise(r => setTimeout(r, 4000 * attempt));
    }
  }
}

(async () => {
  console.log('================================================================');
  console.log('🚀 LANCEMENT DE LA GÉNÉRATION DES 35 IMAGES PRODUITS (1 IMAGE / PRODUIT)');
  console.log('   Modèle : gpt-image-2 (OpenAI)');
  console.log('   Destination : public/images/generated/04-produits/');
  console.log('================================================================\n');

  cleanOldGenerated();

  const categories = fs.readdirSync(PROMPTS_DIR);
  let totalGenerated = 0;
  let totalErrors = 0;
  let totalProducts = 0;

  // Compter le total
  categories.forEach(cat => {
    const catDir = path.join(PROMPTS_DIR, cat);
    if (fs.statSync(catDir).isDirectory()) {
      totalProducts += fs.readdirSync(catDir).filter(f => f.endsWith('.txt')).length;
    }
  });

  console.log(`📦 Total de produits à générer : ${totalProducts}\n`);

  let currentIndex = 0;

  for (const cat of categories) {
    const catDir = path.join(PROMPTS_DIR, cat);
    if (!fs.statSync(catDir).isDirectory()) continue;

    const outCatDir = path.join(OUTPUT_DIR, cat);
    ensureDir(outCatDir);

    const txtFiles = fs.readdirSync(catDir).filter(f => f.endsWith('.txt'));

    console.log(`📁 Rayon : [${cat}] (${txtFiles.length} produits)`);

    for (const file of txtFiles) {
      currentIndex++;
      const slug = path.basename(file, '.txt');
      const promptPath = path.join(catDir, file);
      const outputPath = path.join(outCatDir, `${slug}.webp`);

      const prompt = parsePromptFile(promptPath);
      if (!prompt) {
        console.error(`   ❌ Impossible d'extraire le prompt pour : ${file}`);
        totalErrors++;
        continue;
      }

      console.log(`\n[${currentIndex}/${totalProducts}] 🖼️  Génération : ${slug}`);
      const startTime = Date.now();

      try {
        const sizeKb = await generateSingleImage(prompt, outputPath);
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
        console.log(`   ✅ Succès en ${elapsed}s -> ${slug}.webp [${sizeKb} Ko]`);
        totalGenerated++;
      } catch (err) {
        console.error(`   ❌ Échec pour ${slug} :`, err.message);
        totalErrors++;
      }

      // Petite pause de courtoisie pour l'API
      await new Promise(r => setTimeout(r, 1000));
    }
    console.log('');
  }

  console.log('================================================================');
  console.log(`🎉 GÉNÉRATION TERMINÉE !`);
  console.log(`   ✅ Réussis : ${totalGenerated} / ${totalProducts}`);
  console.log(`   ❌ Erreurs : ${totalErrors}`);
  console.log('================================================================');
})();
