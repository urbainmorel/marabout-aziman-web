/**
 * scripts/generate_zones_cabinet_proposals.cjs
 * 
 * Génération de 3 propositions d'images pour les Zones d'intervention :
 * Intérieur du cabinet de marabout en France, décor moderne sobre avec touches africaines authentiques.
 * - Format 16:9 Landscape (1536x1024)
 * - Strictement sans texte, sans humain
 * - Compression Sharp en WebP < 180 Ko
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
  console.error('❌ ERREUR : La clé OPENAI_API_KEY est introuvable !');
  process.exit(1);
}

const openai = new OpenAI({ apiKey: API_KEY });
const OUTPUT_DIR = path.resolve('public/images/propositions');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const STRICT_PHOTO_RULES = "realistic modern interior architectural photograph, contemporary elegant consultation office in France with sober African decorative accents, bright natural daylight streaming through windows, calm and professional atmosphere, clean minimalist composition, 8k resolution, shot on 35mm interior lens, strictly no text, no words, no letters, no numbers, no writing, no labels, no watermark, no typography, strictly no humans, no people, nobody, no hands, no faces, no 3D render, no CGI";

const proposals = [
  {
    id: "zones-cabinet-prop-1-contemporain",
    title: "Proposition 1 - Cabinet Lumineux & Bois Noble Épuré",
    prompt: `Wide-angle interior photograph of an elegant and modern spiritual consultation office in France. A sleek natural oak consultation table is set with a subtle traditional African carved wooden divination tray, a polished brass bowl with sea cowries, and a small single lit red candle. Light beige linen curtains filter bright natural daylight onto light hardwood floors, with a subtle minimalist bronze wall art piece and a potted indoor monstera plant. Clean, peaceful, contemporary luxury with understated African spiritual roots. ${STRICT_PHOTO_RULES}`
  },
  {
    id: "zones-cabinet-prop-2-chaleureux",
    title: "Proposition 2 - Salon de Consultation Chaleureux & Touches Africaines Épurées",
    prompt: `Warm and dignified interior photograph of a private spiritual consultation cabinet in Paris. A solid walnut consultation table with an ivory linen runner, holding an authentic dark wood statuette, a sacred seed divination chain, and two elegant red candles on ceramic coasters. Comfortable modern beige armchairs, neutral textured plaster walls, and soft directional daylight coming through tall Parisian-style French windows. Harmonious blend of French interior elegance and authentic African spiritual warmth. ${STRICT_PHOTO_RULES}`
  },
  {
    id: "zones-cabinet-prop-3-zen-naturel",
    title: "Proposition 3 - Espace Épuré Zen & Éléments Organiques",
    prompt: `Architectural interior shot of a serene and minimalist consultation room. A natural live-edge wooden desk features a neat arrangement of polished white cowrie shells in a shallow terracotta saucer, a clear glass apothecary decanter with pure spring water, and a subtle traditional carved wooden piece. Off-white lime-washed walls, a contemporary floating wooden shelf with ceramic pottery, and lush green indoor plants in natural morning sunlight. Sincere, welcoming and sophisticated. ${STRICT_PHOTO_RULES}`
  }
];

async function compressToWebP(inputBuffer, outputPath) {
  let quality = 82;
  let outBuf;

  do {
    outBuf = await sharp(inputBuffer)
      .resize(1536, 864, { fit: 'cover', position: 'centre' })
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
        size: '1536x1024'
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
  console.log('🏛️  GENERATION DES 3 PROPOSITIONS CABINET MODERNE MIX AFRIQUE');
  console.log('   Modèle : gpt-image-2 (OpenAI) | Format 16:9 Landscape');
  console.log('   Destination : public/images/propositions/');
  console.log('================================================================\n');

  let totalGenerated = 0;

  for (let i = 0; i < proposals.length; i++) {
    const item = proposals[i];
    const outPath = path.join(OUTPUT_DIR, `${item.id}.webp`);

    console.log(`[${i + 1}/${proposals.length}] 🖼️  Génération : ${item.title}`);
    const start = Date.now();

    try {
      const sizeKb = await generateSingleImage(item.prompt, outPath);
      const elapsed = ((Date.now() - start) / 1000).toFixed(1);
      console.log(`   ✅ Succès en ${elapsed}s -> ${item.id}.webp [${sizeKb} Ko]\n`);
      totalGenerated++;
    } catch (err) {
      console.error(`   ❌ Échec pour ${item.id} :`, err.message);
    }

    await new Promise(r => setTimeout(r, 1000));
  }

  console.log('================================================================');
  console.log(`🎉 GÉNÉRATION TERMINÉE : ${totalGenerated} / ${proposals.length} images créées avec succès !`);
  console.log('================================================================');
})();
