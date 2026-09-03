const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Load API key
const envContent = fs.readFileSync('.env', 'utf8');
const keyMatch = envContent.match(/OPENAI_API_KEY=(.*)/);
const apiKey = keyMatch ? keyMatch[1].trim() : '';

if (!apiKey) {
  console.error('ERROR: OPENAI_API_KEY not found in .env!');
  process.exit(1);
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

const imagesBaseDir = path.resolve('public/images');
ensureDir(imagesBaseDir);

/**
 * Call OpenAI gpt-image-2 to generate image and save directly as optimized WebP with auto-retry
 */
async function generateAndSaveWebP(promptText, outputFilePath, width = 1536, height = 1024, maxRetries = 3) {
  if (fs.existsSync(outputFilePath)) {
    const stats = fs.statSync(outputFilePath);
    if (stats.size > 1000) {
      console.log(`[SKIP] Already exists: ${path.relative(process.cwd(), outputFilePath)} (${(stats.size / 1024).toFixed(1)} Ko)`);
      return { skipped: true, path: outputFilePath };
    }
  }

  let size = "1536x1024";
  if (width === height) {
    size = "1024x1024";
  }

  let lastError = null;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`[GEN] (Attempt ${attempt}) -> ${path.basename(outputFilePath)} [${size}]...`);

      const res = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-image-2",
          prompt: promptText,
          n: 1,
          size: size
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        const msg = errData.error ? errData.error.message : res.statusText;
        console.warn(`[WARN] API Error (${res.status}): ${msg}`);
        
        if (res.status === 429) {
          const waitTime = attempt * 10000;
          console.log(`[RATE LIMIT] Backing off for ${waitTime / 1000}s...`);
          await new Promise(r => setTimeout(r, waitTime));
          continue;
        }
        
        throw new Error(`OpenAI API Error (${res.status}): ${msg}`);
      }

      const data = await res.json();
      if (!data.data || !data.data[0] || !data.data[0].b64_json) {
        throw new Error('No b64_json found in response');
      }

      const buffer = Buffer.from(data.data[0].b64_json, 'base64');
      ensureDir(path.dirname(outputFilePath));

      // Convert to WebP
      await sharp(buffer)
        .webp({ quality: 82, effort: 4 })
        .toFile(outputFilePath);

      const stats = fs.statSync(outputFilePath);
      const sizeKo = (stats.size / 1024).toFixed(1);
      console.log(`[OK] Saved: ${path.relative(process.cwd(), outputFilePath)} (${sizeKo} Ko)`);

      return { skipped: false, path: outputFilePath, sizeKo };
    } catch (err) {
      lastError = err;
      console.error(`[ATTEMPT ${attempt} FAILED]: ${err.message}`);
      if (attempt < maxRetries) {
        const waitTime = attempt * 4000;
        console.log(`Retrying in ${waitTime / 1000}s...`);
        await new Promise(r => setTimeout(r, waitTime));
      }
    }
  }

  throw lastError;
}

/**
 * Parse prompt text file
 */
function parseTxtFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const prompts = [];

  const regex = /\[COPIER-COLLER LE PROMPT CI-DESSOUS\]\s*:\s*\n([^\n]+(?:\n[^\n=]+)*)/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    let cleanPrompt = match[1].trim();
    cleanPrompt = cleanPrompt.replace(/--ar\s+[0-9:]+/g, '').replace(/--v\s+[0-9.]+/g, '').replace(/--style\s+\w+/g, '').trim();
    prompts.push(cleanPrompt);
  }

  return prompts;
}

// Build list of all jobs
function buildAllJobs() {
  const promptsDir = path.resolve('prompts-generation-images');
  const jobs = [];

  // 1. Categories Services (01)
  const catServFiles = fs.readdirSync(path.join(promptsDir, '01-categories-services')).filter(f => f.endsWith('.txt')).sort();
  for (const file of catServFiles) {
    const catSlug = file.replace(/^[0-9]+-/, '').replace('.txt', '');
    const prompts = parseTxtFile(path.join(promptsDir, '01-categories-services', file));
    if (prompts[0]) jobs.push({ prompt: prompts[0], out: path.join(imagesBaseDir, 'services', catSlug, 'hero.webp'), w: 1536, h: 1024, name: `Service Category [${catSlug}] - Hero` });
    if (prompts[1]) jobs.push({ prompt: prompts[1], out: path.join(imagesBaseDir, 'services', catSlug, 'rituel-detail.webp'), w: 1536, h: 1024, name: `Service Category [${catSlug}] - Detail` });
    if (prompts[2]) jobs.push({ prompt: prompts[2], out: path.join(imagesBaseDir, 'services', catSlug, 'resultat-temoignage.webp'), w: 1536, h: 1024, name: `Service Category [${catSlug}] - Nature/Plage` });
  }

  // 2. Services (02)
  const serviceSilos = fs.readdirSync(path.join(promptsDir, '02-services')).sort();
  for (const silo of serviceSilos) {
    const subFiles = fs.readdirSync(path.join(promptsDir, '02-services', silo)).filter(f => f.endsWith('.txt')).sort();
    for (const file of subFiles) {
      const serviceSlug = file.replace('.txt', '');
      const prompts = parseTxtFile(path.join(promptsDir, '02-services', silo, file));
      if (prompts[0]) jobs.push({ prompt: prompts[0], out: path.join(imagesBaseDir, 'services', silo, `${serviceSlug}-hero.webp`), w: 1536, h: 1024, name: `Service [${serviceSlug}] - Hero` });
      if (prompts[1]) jobs.push({ prompt: prompts[1], out: path.join(imagesBaseDir, 'services', silo, `${serviceSlug}-detail.webp`), w: 1536, h: 1024, name: `Service [${serviceSlug}] - Detail` });
      if (prompts[2]) jobs.push({ prompt: prompts[2], out: path.join(imagesBaseDir, 'services', silo, `${serviceSlug}-temoignage.webp`), w: 1536, h: 1024, name: `Service [${serviceSlug}] - Nature/Offrande` });
    }
  }

  // 3. Categories Produits (03)
  const catProdFiles = fs.readdirSync(path.join(promptsDir, '03-categories-produits')).filter(f => f.endsWith('.txt')).sort();
  for (const file of catProdFiles) {
    const catSlug = file.replace(/^[0-9]+-/, '').replace('.txt', '');
    const prompts = parseTxtFile(path.join(promptsDir, '03-categories-produits', file));
    if (prompts[0]) jobs.push({ prompt: prompts[0], out: path.join(imagesBaseDir, 'boutique', catSlug, 'hero.webp'), w: 1536, h: 1024, name: `Product Category [${catSlug}] - Hero` });
    if (prompts[1]) jobs.push({ prompt: prompts[1], out: path.join(imagesBaseDir, 'boutique', catSlug, 'texture-detail.webp'), w: 1024, h: 1024, name: `Product Category [${catSlug}] - Detail` });
    if (prompts[2]) jobs.push({ prompt: prompts[2], out: path.join(imagesBaseDir, 'boutique', catSlug, 'usage.webp'), w: 1536, h: 1024, name: `Product Category [${catSlug}] - Nature` });
  }

  // 4. Produits (04)
  const prodDirs = fs.readdirSync(path.join(promptsDir, '04-produits')).sort();
  for (const cat of prodDirs) {
    const prodFiles = fs.readdirSync(path.join(promptsDir, '04-produits', cat)).filter(f => f.endsWith('.txt')).sort();
    for (const file of prodFiles) {
      const prodSlug = file.replace('.txt', '');
      const prompts = parseTxtFile(path.join(promptsDir, '04-produits', cat, file));
      if (prompts[0]) jobs.push({ prompt: prompts[0], out: path.join(imagesBaseDir, 'boutique', cat, `${prodSlug}-packshot.webp`), w: 1024, h: 1024, name: `Product [${prodSlug}] - Packshot` });
      if (prompts[1]) jobs.push({ prompt: prompts[1], out: path.join(imagesBaseDir, 'boutique', cat, `${prodSlug}-detail.webp`), w: 1024, h: 1024, name: `Product [${prodSlug}] - Detail` });
      if (prompts[2]) jobs.push({ prompt: prompts[2], out: path.join(imagesBaseDir, 'boutique', cat, `${prodSlug}-usage.webp`), w: 1536, h: 1024, name: `Product [${prodSlug}] - Nature` });
    }
  }

  return jobs;
}

const args = process.argv.slice(2);
const limitArg = args.find(a => a.startsWith('--limit='));
const maxLimit = limitArg ? parseInt(limitArg.split('=')[1]) : (args.includes('--all') ? Infinity : 5);
const filterCategory = args.find(a => a.startsWith('--category='))?.split('=')[1];

async function run() {
  console.log('================================================================');
  console.log('  GENERATION D\'IMAGES WEB (ZERO HUMAIN - NATURES MORTES)');
  console.log('  Moteur: OpenAI gpt-image-2 | Format: WebP Haute Qualite SEO');
  console.log('================================================================\n');

  let jobs = buildAllJobs();
  if (filterCategory) {
    jobs = jobs.filter(j => j.out.includes(filterCategory));
  }
  if (maxLimit !== Infinity) {
    jobs = jobs.slice(0, maxLimit);
  }

  console.log(`Total jobs filtrés à traiter : ${jobs.length} images.`);

  let newlyGenerated = 0;
  let skippedCount = 0;
  let failedCount = 0;
  const startTime = Date.now();

  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i];
    const progressStr = `[${String(i + 1).padStart(3, ' ')} / ${jobs.length}]`;
    console.log(`\n${progressStr} >> ${job.name}`);

    try {
      const result = await generateAndSaveWebP(job.prompt, job.out, job.w, job.h);
      if (result.skipped) {
        skippedCount++;
      } else {
        newlyGenerated++;
        await new Promise(r => setTimeout(r, 2500));
      }
    } catch (err) {
      failedCount++;
      console.error(`[ERROR] Job failed for ${job.name}: ${err.message}`);
      await new Promise(r => setTimeout(r, 4000));
    }

    if ((i + 1) % 5 === 0 || i === jobs.length - 1) {
      const elapsedMin = ((Date.now() - startTime) / 60000).toFixed(1);
      const statusObj = {
        total: jobs.length,
        processed: i + 1,
        newlyGenerated,
        skippedCount,
        failedCount,
        elapsedMinutes: elapsedMin,
        lastUpdated: new Date().toISOString()
      };
      fs.writeFileSync('public/images/generation_status.json', JSON.stringify(statusObj, null, 2), 'utf8');
    }
  }

  const totalMin = ((Date.now() - startTime) / 60000).toFixed(1);
  console.log('\n================================================================');
  console.log('  RAPPORT DE GENERATION');
  console.log('================================================================');
  console.log(`- Images générées : ${newlyGenerated}`);
  console.log(`- Images ignorées (déjà conformes) : ${skippedCount}`);
  console.log(`- Échecs : ${failedCount}`);
  console.log(`- Durée : ${totalMin} minutes`);
  console.log('Images sauvegardées dans : public/images/');
  console.log('================================================================\n');
}

run().catch(err => {
  console.error('Fatal crash:', err);
});
