/**
 * scripts/generate_images.cjs
 * 
 * Script d'automatisation haute fidélité pour la génération des images avec gpt-image-2 (OpenAI).
 * 
 * Spécifications :
 * - Style visuel : Photo nette de jour, objets réels posés sur table ou en extérieur naturel,
 *   lumière blanche naturelle, textures brutes et palpables, zéro humain / marabout.
 * - Tailles API : 1536x1024 (paysage 16:9 / 3:2) et 1024x1024 (carré 1:1 / macro).
 * - Compression Sharp : Conversion WebP / JPG optimisée STRICTEMENT INFÉRIEURE À 200 Ko (idéal SEO).
 * - Idempotent : saute automatiquement les images déjà existantes.
 * - Options CLI : --category <nom>, --limit <n>, --force, --dry-run
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

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

// Répertoires
const PROMPTS_ROOT = path.resolve(__dirname, '..', 'prompts-generation-images');
const OUTPUT_ROOT = path.resolve(__dirname, '..', 'public', 'images', 'generated');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}
ensureDir(OUTPUT_ROOT);

// Parse CLI flags
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const isForce = args.includes('--force');
const limitArgIdx = args.indexOf('--limit');
const limit = limitArgIdx !== -1 ? parseInt(args[limitArgIdx + 1], 10) : Infinity;
const categoryArgIdx = args.indexOf('--category');
const targetCategory = categoryArgIdx !== -1 ? args[categoryArgIdx + 1] : null;

/**
 * Récupère tous les fichiers .txt récursivement
 */
function getAllTxtFiles(dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getAllTxtFiles(full));
    } else if (entry.isFile() && entry.name.endsWith('.txt')) {
      results.push(full);
    }
  }
  return results;
}

/**
 * Extrait les 3 prompts d'un fichier .txt
 */
function extractPromptsFromFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const prompts = [];

  // Chercher les blocs sous [COPIER-COLLER LE PROMPT CI-DESSOUS] :
  const regex = /\[COPIER-COLLER LE PROMPT CI-DESSOUS\]\s*:\s*\r?\n([^\r\n]+)/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    let promptText = match[1].trim();
    // Nettoyer les paramètres Midjourney éventuels (--ar 16:9, --v 6.1, etc.)
    promptText = promptText.replace(/--ar\s+[0-9:]+/gi, '').replace(/--v\s+[0-9.]+/gi, '').replace(/--style\s+\w+/gi, '').trim();
    prompts.push(promptText);
  }

  return prompts;
}

/**
 * Détermine la résolution API gpt-image-2 selon l'index du prompt
 * Prompt 1 (Hero) : 1536x1024 (paysage) ou 1024x1024
 * Prompt 2 (Macro) : 1024x1024
 * Prompt 3 (Scène naturelle) : 1536x1024
 */
function getApiSize(promptIndex, isProduct = false) {
  if (isProduct) {
    // Pour les produits : Prompt 1 et 2 en carré 1024x1024, Prompt 3 en paysage 1536x1024
    if (promptIndex === 0 || promptIndex === 1) return '1024x1024';
    return '1536x1024';
  }
  if (promptIndex === 1) return '1024x1024'; // Macro
  return '1536x1024'; // Hero et Scène Naturelle
}

/**
 * Appelle l'API OpenAI gpt-image-2 avec retry automatique
 */
async function callGptImage2(prompt, size, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-image-2',
          prompt: prompt,
          n: 1,
          size: size
        })
      });

      const data = await res.json();
      if (!res.ok) {
        if (res.status === 429 && attempt < retries) {
          console.warn(`⏳ Rate limit atteint (429). Pause de 15s avant nouvel essai (${attempt}/${retries})...`);
          await new Promise(r => setTimeout(r, 15000));
          continue;
        }
        throw new Error(`Erreur API OpenAI [${res.status}]: ${JSON.stringify(data)}`);
      }

      if (data.data && data.data[0] && data.data[0].b64_json) {
        return Buffer.from(data.data[0].b64_json, 'base64');
      } else if (data.data && data.data[0] && data.data[0].url) {
        const imgRes = await fetch(data.data[0].url);
        const arrayBuf = await imgRes.arrayBuffer();
        return Buffer.from(arrayBuf);
      } else {
        throw new Error(`Réponse inattendue: ${JSON.stringify(data)}`);
      }
    } catch (err) {
      if (attempt === retries) throw err;
      console.warn(`⚠️ Tentative ${attempt} échouée : ${err.message}. Nouvelle tentative dans 5s...`);
      await new Promise(r => setTimeout(r, 5000));
    }
  }
}

/**
 * Compresse et enregistre l'image en WebP avec Sharp pour garantir une taille STRICTEMENT < 200 Ko
 */
async function saveOptimizedImage(rawBuffer, outPathWebp) {
  ensureDir(path.dirname(outPathWebp));

  // Sauvegarde en WebP avec boucle adaptative qualité < 190 Ko
  let webpQuality = 82;
  let webpBuf;
  do {
    webpBuf = await sharp(rawBuffer)
      .webp({ quality: webpQuality, effort: 4 })
      .toBuffer();
    webpQuality -= 5;
  } while (webpBuf.length > 190 * 1024 && webpQuality >= 40);

  fs.writeFileSync(outPathWebp, webpBuf);
  const webpSizeKb = (webpBuf.length / 1024).toFixed(1);

  return { webpSizeKb };
}

// -----------------------------------------------------------------------------
// EXECUTION PRINCIPALE
// -----------------------------------------------------------------------------
(async () => {
  console.log('================================================================');
  console.log('🚀 GENERATEUR D\'IMAGES AUTOMATISE - GPT-IMAGE-2 (100% WEBP)');
  console.log('   Style : Photo nette de jour, objets réels, lumière blanche');
  console.log('   Poids : Optimisé STRICTEMENT < 200 Ko (Format WebP)');
  console.log('   Modèle: gpt-image-2 (OpenAI)');
  console.log('================================================================\n');

  let allFiles = getAllTxtFiles(PROMPTS_ROOT);

  if (targetCategory) {
    allFiles = allFiles.filter(f => f.includes(targetCategory));
    console.log(`🎯 Filtre catégorie appliqué : "${targetCategory}" (${allFiles.length} fichiers trouvés)\n`);
  }

  console.log(`📁 Total fichiers trouvés : ${allFiles.length}`);
  let generatedCount = 0;
  let skippedCount = 0;
  let failedCount = 0;

  for (const file of allFiles) {
    if (generatedCount >= limit) {
      console.log(`\n🛑 Limite de ${limit} images générées atteinte (--limit).`);
      break;
    }

    const relPath = path.relative(PROMPTS_ROOT, file);
    const baseName = path.basename(file, '.txt');
    const relDir = path.dirname(relPath);
    const isProduct = relPath.includes('04-produits') || relPath.includes('03-categories-produits');

    const prompts = extractPromptsFromFile(file);
    if (prompts.length === 0) {
      console.warn(`⚠️ Aucun prompt extrait de ${relPath}`);
      continue;
    }

    console.log(`\n📄 [${relPath}] (${prompts.length} prompts)`);

    for (let i = 0; i < prompts.length; i++) {
      if (generatedCount >= limit) break;

      const promptNumber = i + 1;
      const promptText = prompts[i];
      const apiSize = getApiSize(i, isProduct);

      const outSubDir = path.join(OUTPUT_ROOT, relDir);
      const outWebp = path.join(outSubDir, `${baseName}_p${promptNumber}.webp`);

      // Vérifier si déjà existant
      if (!isForce && fs.existsSync(outWebp)) {
        const existingSize = (fs.statSync(outWebp).size / 1024).toFixed(1);
        console.log(`   ⏭️  P${promptNumber} déjà existant (${existingSize} Ko) -> Ignoré`);
        skippedCount++;
        continue;
      }

      console.log(`   🎨 P${promptNumber} (${apiSize}) : Génération en cours...`);
      if (isDryRun) {
        console.log(`      [DRY-RUN] Prompt : "${promptText.substring(0, 100)}..."`);
        generatedCount++;
        continue;
      }

      const startTime = Date.now();
      try {
        const rawBuffer = await callGptImage2(promptText, apiSize);
        const { webpSizeKb } = await saveOptimizedImage(rawBuffer, outWebp);
        const duration = ((Date.now() - startTime) / 1000).toFixed(1);

        console.log(`      ✅ Succès en ${duration}s | WebP: ${webpSizeKb} Ko (<200Ko: OK)`);
        generatedCount++;

        // Pause de 1s pour respecter les quotas
        await new Promise(r => setTimeout(r, 1000));
      } catch (err) {
        console.error(`      ❌ Échec P${promptNumber} : ${err.message}`);
        failedCount++;
      }
    }
  }

  console.log('\n================================================================');
  console.log(`🎉 BILAN DE LA GENERATION`);
  console.log(`   ✅ Nouvelles images générées : ${generatedCount}`);
  console.log(`   ⏭️  Images déjà existantes   : ${skippedCount}`);
  console.log(`   ❌ Échecs                   : ${failedCount}`);
  console.log(`   📂 Dossier de sortie         : ${OUTPUT_ROOT}`);
  console.log('================================================================');
})();
