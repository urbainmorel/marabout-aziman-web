/**
 * scripts/generate_hero_and_institutional.cjs
 * 
 * Génération de 6 propositions d'images haute fidélité (16:9 Landscape) :
 * - 3 propositions pour le Hero de la Page d'Accueil (Jour, Nuit aux bougies, Crépuscule doré)
 * - 3 propositions pour les Pages Institutionnelles (Cabinet noble, Sanctuaire de prière, Héritage sacré)
 * 
 * Rendu photographique cinématique net, zéro texte, zéro humain, compression WebP < 180 Ko.
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

const STRICT_PHOTO_RULES = "crisp cinematic commercial photograph, wide angle 16:9 composition, authentic traditional materials, palpable textures, high tactile fidelity, 8k resolution, hyper-realistic photography, shot on 35mm prime lens, strictly no text, no words, no letters, no numbers, no writing, no labels, no watermark, no typography, strictly no humans, no people, nobody, no hands, no faces, no 3D render, no CGI";

const proposals = [
  // --- GROUPE A : HERO PAGE D'ACCUEIL ---
  {
    id: "home-hero-prop-1-jour",
    title: "Proposition 1 (Accueil) - Jour Lumineux & Clarté Solaire",
    category: "hero-accueil",
    prompt: `Cinematic wide-angle photograph of an authentic sacred West African ancestral altar table under bright natural morning daylight. In the center sits a large carved circular dark teak divination tray (Opon Ifa) surrounded by scattered glistening white sea cowries, an antique brass divination chain (Opele), polished palm nuts (Ikin), and a small terracotta bowl filled with clear consecrated lustral water and fresh sacred green leaves. Clean luminous composition, sunbeams streaming across a light rustic stone background. ${STRICT_PHOTO_RULES}`
  },
  {
    id: "home-hero-prop-2-nuit",
    title: "Proposition 2 (Accueil) - Nuit Mystique & Lueur de Bougies",
    category: "hero-accueil",
    prompt: `Atmospheric nocturnal cinematic photograph of an authentic traditional African esoteric sanctuary at night. The scene is warmly illuminated solely by the soft glowing amber flames of natural beeswax candles. An array of polished white cowrie shells, an antique bronze oracle mirror with warm copper reflections, sacred palm nuts, and thin curling wisps of natural frankincense smoke rising over a dark indigo-dyed tribal textile. Deep rich shadows, golden candlelight highlights, mysterious and serene spiritual ambiance. ${STRICT_PHOTO_RULES}`
  },
  {
    id: "home-hero-prop-3-crepuscule",
    title: "Proposition 3 (Accueil) - Crépuscule Doré & Puissance Ancestrale",
    category: "hero-accueil",
    prompt: `Cinematic wide landscape photograph of an ancient sacred ritual table during the warm golden sunset hour. Glowing amber sunlight illuminates a carved mahogany oracle tray, an antique cast bronze ritual bell (Agogo), a cluster of sacred white cowrie shells, and small crystal-clear glass vials of consecrated oils casting golden refractions on an aged wooden surface. Warm rich color harmony, majestic golden hour radiance. ${STRICT_PHOTO_RULES}`
  },

  // --- GROUPE B : PAGES INSTITUTIONNELLES ---
  {
    id: "institutionnel-prop-1-cabinet",
    title: "Proposition 1 (Institutionnel) - Cabinet de Consultation Noble & Feutré",
    category: "institutionnel",
    prompt: `Elegant commercial interior photograph of a distinguished traditional spiritual consultation office in France. A pristine heavy oak consulting table covered with natural beige linen, featuring an authentic carved wooden divination board, a shallow brass bowl of spring water, natural dried botanical bundles, and a leather-bound blank journal without any writing. Soft neutral daylight filtering through linen curtains onto warm wooden paneling in a dignified, peaceful atmosphere. ${STRICT_PHOTO_RULES}`
  },
  {
    id: "institutionnel-prop-2-sanctuaire",
    title: "Proposition 2 (Institutionnel) - Sanctuaire de Sérénité & Sagesse Ancestrale",
    category: "institutionnel",
    prompt: `Serene and dignified still life photograph of a sacred African wisdom sanctuary altar. A smooth hand-polished dark mahogany altar shelf holding authentic burnished terracotta offering bowls, a row of pristine white cowrie shells, a solid bronze ceremonial staff, and fresh hyssop sprigs under clean natural white daylight entering from wooden louvered shutters. Pure, solemn, deeply respectful spiritual atmosphere. ${STRICT_PHOTO_RULES}`
  },
  {
    id: "institutionnel-prop-3-heritage",
    title: "Proposition 3 (Institutionnel) - Héritage, Tradition & Objets Consacrés",
    category: "institutionnel",
    prompt: `Cinematic macro wide-angle still life of authentic African spiritual heritage artifacts resting on a weathered cedar wood workbench. An antique hand-forged bronze talismanic figure, a polished ceremonial gourd cup, braided sweetgrass ropes, and glistening amber beads catch soft natural side lighting. Timeless traditional craftsmanship, clean dignified framing, rich organic textures. ${STRICT_PHOTO_RULES}`
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
  console.log('🚀 GENERATION DES 6 PROPOSITIONS (HERO ACCUEIL & INSTITUTIONNEL)');
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
