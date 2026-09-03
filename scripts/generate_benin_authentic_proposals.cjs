/**
 * scripts/generate_benin_authentic_proposals.cjs
 * 
 * Génération de 6 propositions d'images 100% authentiques ancrées dans les traditions
 * réelles du Vodun et du Fâ du Bénin :
 * - Vraie statuette protectrice en bois sculpté patiné (Bocio / fétiche d'autel)
 * - Bougies rouges allumées avec coulures de cire naturelle
 * - Objets réels du Fâ béninois : plateau Opon Ifa, chapelet Opele, noix sacrées Ikin, cauris
 * - Cloches en fer forgé (Asen / Agogo), calebasses rituelles, nattes tressées, tissu rituel
 * - Photographie documentaire ultra-réaliste, naturelle et brute, sans aucun texte ni visage humain
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

const REAL_BENIN_PHOTO_TAGS = "realistic documentary still life photograph, national geographic style photography, real tangible physical artifacts of authentic Benin Vodun and Fa tradition, raw organic textures, authentic oiled patina, genuine hand-carved wood grain, bright clear atmospheric lighting, shot on 50mm f/1.8 lens, tack sharp depth of field, strictly no text, no words, no letters, no numbers, no writing, no labels, no watermark, no typography, strictly no humans, no people, nobody, no hands, no faces, no 3D render, no CGI, authentic West African spiritual photography";

const proposals = [
  // ========================================================
  // GROUPE A : 3 PROPOSITIONS POUR LE HERO DE L'ACCUEIL (16:9)
  // ========================================================
  {
    id: "home-hero-prop-1-benin-jour",
    title: "Proposition 1 (Accueil) - Autel du Fâ & Vodun en Plein Jour Naturel",
    category: "hero-accueil",
    prompt: `Authentic documentary photograph of a real traditional Benin Vodun and Fa consultation altar in natural daylight. In the center rests an authentic hand-carved dark wood sacred guardian statuette (Bocio) with worn oiled patina, placed beside a circular wooden Fa divination tray (Opon Ifa) lightly dusted with natural yellow divination powder (Iyerosun). Beside it lies a genuine brass and seed divining chain (Opele), scattered real white sea cowrie shells, sacred dark palm nuts (Ikin), and two lit red wax candles with realistic melting wax drips onto a woven palm straw mat. Bright crisp natural daylight, raw palpable organic textures. ${REAL_BENIN_PHOTO_TAGS}`
  },
  {
    id: "home-hero-prop-2-benin-nuit",
    title: "Proposition 2 (Accueil) - Sanctuaire Vodun Nocturne aux Bougies Rouges",
    category: "hero-accueil",
    prompt: `Atmospheric realistic night photograph of a sacred Benin Vodun shrine altar. Warm vivid glow from multiple real lit red wax candles and white candles illuminating an authentic hand-carved dark wooden protective ancestor statuette adorned with tiny embedded cowries. A traditional hand-forged black iron ceremonial rattle bell (Asen / Agogo), a dried natural half-calabash bowl containing sacred red palm oil, real white cowrie shells cast on an indigo handwoven cotton cloth, and delicate wisps of natural herbal smoke rising in the air. Deep warm shadows, rich golden-red candlelight glow, deeply authentic atmosphere. ${REAL_BENIN_PHOTO_TAGS}`
  },
  {
    id: "home-hero-prop-3-benin-crepuscule",
    title: "Proposition 3 (Accueil) - Table Rituelle du Fâ au Crépuscule Doré",
    category: "hero-accueil",
    prompt: `Cinematic authentic photograph of a traditional Benin spiritual altar at sunset golden hour. An ancient carved wooden altar figure with polished oil patina stands watch beside an engraved wooden divination tray with a sacred Opele chain laid across it. Several authentic white sea cowries are clustered on a clean white ritual cloth next to three glowing lit red pillar candles dripping wax, an authentic ram horn talisman, and a small terracotta offering pot. Warm sunset amber rays blending with red candlelight. Stunning natural realism. ${REAL_BENIN_PHOTO_TAGS}`
  },

  // ========================================================
  // GROUPE B : 3 PROPOSITIONS POUR LES PAGES INSTITUTIONNELLES
  // ========================================================
  {
    id: "institutionnel-prop-1-cabinet-benin",
    title: "Proposition 1 (Institutionnel) - Table de Consultation Traditionnelle & Statuette",
    category: "institutionnel",
    prompt: `Documentary interior photograph of an authentic traditional African spiritual cabinet table. A natural palm fiber mat on a dark rustic wooden table, featuring an authentic carved wooden guardian statuette with genuine weathered patina, an Opon Ifa divination tray, a genuine Opele divination chain with seed pods, a clean clay bowl with fresh green hyssop leaves in clear water, and two lit red candles casting a warm gentle flame in soft natural side daylight. Honest, respectful, deeply grounded in Beninese heritage. ${REAL_BENIN_PHOTO_TAGS}`
  },
  {
    id: "institutionnel-prop-2-sanctuaire-benin",
    title: "Proposition 2 (Institutionnel) - Sanctuaire Vodun aux Éléments Sacrés",
    category: "institutionnel",
    prompt: `Realistic still life photograph of consecrated traditional Vodun spiritual artifacts from Benin. A hand-carved mahogany wooden altar figure stands beside a polished dried calabash gourd, genuine white cowrie shells neatly aligned on an authentic traditional hand-loomed Benin woven strip-cloth (Kanvo), a sacred hand-forged black iron Gou cuff, and a single tall red candle with flickering flame under serene natural morning daylight through a wooden window. Pure authenticity, rich organic materials. ${REAL_BENIN_PHOTO_TAGS}`
  },
  {
    id: "institutionnel-prop-3-heritage-benin",
    title: "Proposition 3 (Institutionnel) - Héritage & Objets Rituels du Fâ Béninois",
    category: "institutionnel",
    prompt: `Macro documentary photograph of genuine sacred Beninese ancestral ritual objects on a raw cedar wood altar. An antique carved wooden ceremonial figure with sacred oil sheen, genuine four-eyed Ikin divination palm nuts in a small dried gourd bowl, a brass Opele divination chain, an authentic ram horn plugged with black beeswax, and lit red taper candles with running wax drops. Crisp natural daylight with soft warm candle accents, palpable wood grain and metal textures. ${REAL_BENIN_PHOTO_TAGS}`
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
  console.log('🇧🇯 GENERATION DES 6 PROPOSITIONS AUTHENTIQUES VODUN & FA DU BENIN');
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
