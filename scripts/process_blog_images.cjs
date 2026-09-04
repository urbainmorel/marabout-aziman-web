const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const envContent = fs.existsSync('.env') ? fs.readFileSync('.env', 'utf8') : '';
const keyMatch = envContent.match(/OPENAI_API_KEY=(.*)/);
const apiKey = keyMatch ? keyMatch[1].trim() : (process.env.OPENAI_API_KEY || '');

if (!apiKey) {
  console.error('ERROR: OPENAI_API_KEY not found!');
  process.exit(1);
}

const refImagePath = path.resolve('public/images/portefeuille_magique_billets_vodun_1 (2).png');
const blogOutputDir = path.resolve('public/images/blog/richesse-prosperite');
const blogRootDir = path.resolve('public/images/blog');

if (!fs.existsSync(blogOutputDir)) {
  fs.mkdirSync(blogOutputDir, { recursive: true });
}

// 1. Process Figure 1
async function processFigure1() {
  console.log('Optimizing Figure 1 to WebP for SEO...');
  const target1 = path.join(blogOutputDir, 'portefeuille-magique-grand-maitre-aziman-1.webp');
  const target2 = path.join(blogRootDir, 'portefeuille-magique-grand-maitre-aziman-cuir.webp');

  await sharp(refImagePath)
    .webp({ quality: 85, reductionEffort: 6 })
    .toFile(target1);
  console.log(`Saved: ${target1}`);

  await sharp(refImagePath)
    .webp({ quality: 85, reductionEffort: 6 })
    .toFile(target2);
  console.log(`Saved: ${target2}`);
}

// 2. Generate Figure 2 and Figure 3
const prompts = [
  {
    filename: 'consecration-portefeuille-magique-sanctuaire-aziman.webp',
    altName: 'portefeuille-magique-grand-maitre-aziman-2.webp',
    prompt: "Atmospheric nocturnal editorial photograph of a Vodun consecration ritual shrine in Cotonou, Benin. In exact visual style and consistency with the reference image: on a rich red velvet altar cloth, the same dark brown leather zip clutch wallet pouch lies open surrounded by stacks of crisp green 100 Euro banknotes. The shrine features the hand-carved dark wood African statuette holding a bowl on her head, glowing white candles casting warm light, lit incense emitting wisps of soft smoke, white cowrie shells, kola nuts, and sacred green leaves on the altar. Nighttime ritual ambiance, realistic documentary still life, 8k resolution, hyper-detailed texture, strictly no humans, no text."
  },
  {
    filename: 'utilisation-billet-temoin-portefeuille-magique.webp',
    altName: 'portefeuille-magique-grand-maitre-aziman-3.webp',
    prompt: "Macro close-up editorial photography of a single fresh crisp green 100 Euro banknote being inserted into the main interior compartment of a dark brown leather zip wallet pouch. In exact visual style and consistency with the reference image: the dark brown textured leather wallet rests on a luxurious red velvet altar cloth. Surrounding details softly out of focus include glowing white candles, sacred green leaves, and white cowrie shells. High resolution documentary close-up, tactile leather grain and crisp paper bill details, warm candlelight lighting, 8k resolution, strictly no humans, no text."
  }
];

async function generateAndOptimize(item) {
  console.log(`Generating image for ${item.filename}...`);
  
  let b64Json;
  try {
    const FormData = require('form-data');
    const form = new FormData();
    form.append('model', 'gpt-image-2');
    form.append('prompt', item.prompt);
    form.append('n', '1');
    form.append('size', '1536x1024');
    form.append('image', fs.createReadStream(refImagePath));

    const res = await fetch('https://api.openai.com/v1/images/edits', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        ...form.getHeaders()
      },
      body: form
    });

    if (res.ok) {
      const data = await res.json();
      b64Json = data.data[0].b64_json;
    } else {
      const errText = await res.text();
      console.warn(`Edits API response ${res.status}: ${errText}. Falling back to generations API...`);
    }
  } catch (err) {
    console.warn(`Edits request failed: ${err.message}. Falling back to generations API...`);
  }

  if (!b64Json) {
    const res = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-image-2",
        prompt: item.prompt,
        n: 1,
        size: "1536x1024"
      })
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`OpenAI API error ${res.status}: ${errText}`);
    }

    const data = await res.json();
    b64Json = data.data[0].b64_json;
  }

  const buffer = Buffer.from(b64Json, 'base64');
  
  const targetPath1 = path.join(blogOutputDir, item.filename);
  await sharp(buffer)
    .webp({ quality: 85, reductionEffort: 6 })
    .toFile(targetPath1);
  console.log(`Successfully generated & optimized WebP: ${targetPath1}`);

  if (item.altName) {
    const targetPath2 = path.join(blogOutputDir, item.altName);
    await sharp(buffer)
      .webp({ quality: 85, reductionEffort: 6 })
      .toFile(targetPath2);
    console.log(`Successfully saved secondary WebP: ${targetPath2}`);
  }
}

async function run() {
  try {
    await processFigure1();
    for (const item of prompts) {
      await generateAndOptimize(item);
    }
    console.log('ALL IMAGES PROCESSED & OPTIMIZED SUCCESSFULLY!');
  } catch (err) {
    console.error('Processing failed:', err);
    process.exit(1);
  }
}

run();
