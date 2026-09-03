/**
 * scripts/generate_all_blog_images.cjs
 * 
 * Génération de 52 images pour le blog (26 sujets x 2 variantes chacune)
 * selon les corrections exactes du client.
 * Modèle : gpt-image-2 (OpenAI) | Format : 1536x1024 (16:9 Landscape)
 * Compression Sharp en WebP < 180 Ko.
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
const OUTPUT_BASE = path.resolve('public/images/generated/05-blog');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

ensureDir(OUTPUT_BASE);

const PHOTO_BASE_RULES = "realistic documentary still life photograph, authentic traditional West African ritual scene, tangible physical artifacts, rich palpable textures, 8k resolution, shot on 35mm lens, strictly no typography, no watermark, no CGI, no 3D render";

const blogItems = [
  // 0. HERO PRINCIPAL DU BLOG
  {
    category: "general",
    slug: "hero-blog",
    title: "Hero Principal du Blog",
    promptV1: `Extreme close-up documentary photograph of a sacred African altar draped with a clean white ritual cloth. Centered is an authentic real weathered zebu skull bone, beside an unrolled vintage parchment scroll bearing inscribed geometric Adinkra symbols, a calm white dove lying peacefully with legs softly tied, fresh vibrant green sacred leaves, three lit red taper candles with small steady flames arranged in a triangle, eight white sea cowrie shells, a sacred beaded Fa necklace (Akple), a small antique cast bronze bell, and a traditional black horsetail flywhisk under soft natural morning daylight. ` + PHOTO_BASE_RULES,
    promptV2: `Atmospheric wide-angle editorial photograph of an authentic traditional African sanctuary altar on a white linen tablecloth. Featuring a real aged zebu skull, an open parchment manuscript showing ancient tribal Adinkra motifs, a resting white pigeon with bound feet, fresh green botanical offerings, three red wax candles glowing in a triangular formation, eight natural cowrie shells, a consecrated Akple Fa necklace, a cast bronze ceremonial bell, and a dark horsehair whisk under warm natural side daylight. ` + PHOTO_BASE_RULES
  },

  // 1. AMOUR & RELATIONS (4 ARTICLES)
  {
    category: "amour-relations",
    slug: "empecher-son-conjoint-de-tromper",
    title: "Bloquer l'Infidélité Conjugale",
    promptV1: `Close-up macro photograph of a fidelity ritual scene. A heavy antique black iron padlock without a key resting on two intertwined vibrant red satin ribbons, surrounded by delicate dried red rose petals and a neat circular ring of coarse white sea salt grains on a rustic wooden table in natural daylight. ` + PHOTO_BASE_RULES,
    promptV2: `Detailed ritual still life of a marital fidelity lock. A solid dark iron padlock laying locked without keys over intertwined crimson satin ribbons, accented with scattered dried rose petals and an unbroken boundary circle of coarse white rock salt on a light wooden surface in soft natural morning light. ` + PHOTO_BASE_RULES
  },
  {
    category: "amour-relations",
    slug: "faire-revenir-son-ex-silence-radio",
    title: "Faire Revenir son Ex Malgré le Silence Radio",
    promptV1: `Macro photograph of an authentic love reunion ritual scene. Two lit red candles with melting wax trickles, placed beside a simple round glass mirror, two small hand-carved white wooden human figurines tied closely together with a vibrant red string, and a natural raffia cord binding knot on a rustic wooden table in soft natural daylight. ` + PHOTO_BASE_RULES,
    promptV2: `Atmospheric still life of an emotional attachment ritual. Two small primitive white wood couple statuettes bound tightly face-to-face with crimson thread, set next to a circular hand mirror, two flickering red wax candles with subtle dripping wax, and an intricate tied raffia fiber knot under gentle natural lighting. ` + PHOTO_BASE_RULES
  },
  {
    category: "amour-relations",
    slug: "retour-affectif-avec-photo",
    title: "Retour Affectif avec Photo en France",
    promptV1: `Harmonious ritual still life photograph on a clean altar. A fresh lush bouquet of green herbal leaves, a clear glass bowl filled with glistening golden honey, a large ripe whole pineapple, a white paper sheet with faint occult script, a spool of crimson silk thread, fragrant white jasmine flowers, and a small printed photograph of a Caucasian man with gently blurred soft-focus facial features in bright natural white daylight. ` + PHOTO_BASE_RULES,
    promptV2: `Editorial documentary photo of a gentle affection ritual. Arranged on a light tabletop: a ripe golden pineapple, a crystal bowl of pure liquid honey, fresh green sacred botanical leaves, scattered white jasmine blossoms, fine red silk cord, a parchment with indistinct ink markings, and a small vintage photo of a Caucasian male with subtly softened blurred face under crisp natural daylight. ` + PHOTO_BASE_RULES
  },
  {
    category: "amour-relations",
    slug: "eloigner-une-maitresse-rituel-separation",
    title: "Éloigner une Maîtresse : Rituels de Séparation",
    promptV1: `Dramatic macro still life of a traditional energetic separation ritual table. Two glowing red-hot burning coal embers placed at opposite corners, separated in the center by a torn-in-half photograph of a Caucasian heterosexual couple, a terracotta dish of coarse sea salt, an antique iron ritual knife, three long brand-new steel sewing needles, and scattered black peppercorns on raw oak in daylight. ` + PHOTO_BASE_RULES,
    promptV2: `Documentary photograph of a separation and unbinding ritual. A couple photo torn neatly in two halves, placed between two smoking red-hot charcoal embers, accompanied by a sharp traditional forged knife, three long silver needles, a bowl of rock salt, and whole pungent black pepper grains on dark timber in natural light. ` + PHOTO_BASE_RULES
  },

  // 2. RICHESSE & PROSPÉRITÉ (5 ARTICLES)
  {
    category: "richesse-prosperite",
    slug: "attirer-argent-rapidement-rituels-chance",
    title: "Comment Attirer l'Argent Rapidement",
    promptV1: `Macro commercial photograph of a prosperity attraction ritual bowl. A shallow rustic terracotta dish filled with antique polished golden coins, raw golden mineral nuggets, fresh vibrant green basil leaves, and shining white sea cowries on a woven straw mat under radiant natural morning sunlight. ` + PHOTO_BASE_RULES,
    promptV2: `Luminous still life of an authentic African wealth altar. A burnished clay bowl piled with shiny golden antique coins, natural raw gold ore chunks, aromatic green basil sprigs, and pristine white cowrie shells in bright natural white daylight. ` + PHOTO_BASE_RULES
  },
  {
    category: "richesse-prosperite",
    slug: "gagner-aux-jeux-de-hasard-rituels-bague",
    title: "Gagner aux Jeux de Hasard : Rituels et Bagues de Chance",
    promptV1: `Macro jewelry still life of a consecrated gambler's talisman ring. A heavy polished solid sterling silver ring band engraved with an African geometric luck symbol, standing upright on weathered driftwood, flanked by three polished white cowries and a pair of unnumbered plain carved wooden dice in bright daylight. ` + PHOTO_BASE_RULES,
    promptV2: `Close-up product photograph of a silver chance ring. A solid silver signet ring with engraved tribal geometric prosperity lines, set on an aged timber block beside three real sea cowrie shells and rustic wooden dice under crisp natural white daylight. ` + PHOTO_BASE_RULES
  },
  {
    category: "richesse-prosperite",
    slug: "pacte-mami-wata-mythes-realites",
    title: "Pacte avec Mami Wata : Mythes et Réalités",
    promptV1: `Luminous photographic still life of a sacred Mami Wata water shrine. A clear sea-green glass bowl filled with sparkling crystal ocean water, surrounded by natural iridescent mother-of-pearl shells, turquoise beads, and a round silver hand mirror reflecting water caustics on white sand in bright daylight. ` + PHOTO_BASE_RULES,
    promptV2: `Serene marine ritual still life. A hand-blown translucent glass bowl of pure ocean water with floating white water lily petals, lustrous nacre seashells, aqua glass beads, and an antique silver-plated mirror catching bright sunbeams on a light marble slab. ` + PHOTO_BASE_RULES
  },
  {
    category: "richesse-prosperite",
    slug: "portefeuille-magique-grand-maitre-aziman",
    title: "Le Portefeuille Magique : Vérités et Richesse Réelle",
    promptV1: `Authentic ritual still life of a consecrated wealth wallet. A simple plain white cloth pouch and a handcrafted natural tan leather wallet, several real 100 euro banknotes fan-spread neatly, yellow flower petals, eight genuine white sea cowries, and seven lit golden pillar candles arranged in a perfect circle around the items on a light wooden table in natural daylight. ` + PHOTO_BASE_RULES,
    promptV2: `Top-angle documentary photograph of a prosperity blessing. A circle of seven lit golden wax candles illuminating a rustic brown leather wallet, a white cotton pouch, 100 euro bills, yellow marigold petals, and eight sacred white cowrie shells on a clean wooden altar under natural daylight. ` + PHOTO_BASE_RULES
  },
  {
    category: "richesse-prosperite",
    slug: "signes-blocage-financier-mystique",
    title: "Signes de Blocage Financier Mystique",
    promptV1: `Detailed documentary still life representing spiritual unblocking. A hand-carved African wooden statuette tightly wrapped in heavy hand-forged iron chain links, standing next to a single tall lit white candle and an open traditional clay canari pot filled with purificatory herbal water and fresh green hyssop leaves in clear morning daylight. ` + PHOTO_BASE_RULES,
    promptV2: `Symbolic spiritual deliverance still life. A dark carved wooden ancestral figure bound with rustic iron chain, placed beside an open unglazed earthenware canari containing fragrant green cleansing herbs in water and a glowing white candle on a stone floor in natural light. ` + PHOTO_BASE_RULES
  },

  // 3. PROTECTION & DÉSENVOÛTEMENT (4 ARTICLES)
  {
    category: "protection-desenvoutement",
    slug: "mari-de-nuit-symptomes-delivrance",
    title: "Mari de Nuit (Incube) : Symptômes et Délivrance",
    promptV1: `Macro product still life of spiritual liberation remedies. A square heavy amber glass bottle of black palm kernel oil (Tchotcho), tied with a braided black protective cotton cord, placed alongside dried hyssop bundles and coarse sea salt crystals on a light cedar wood block in natural daylight. ` + PHOTO_BASE_RULES,
    promptV2: `Documentary still life of anti-incubus protection items. A sealed vintage amber glass apothecary bottle containing dark roasted Tchotcho oil, a tightly braided black cord talisman, dried green hyssop sprigs, and chunks of rock salt on an aged timber plank in natural daylight. ` + PHOTO_BASE_RULES
  },
  {
    category: "protection-desenvoutement",
    slug: "renvoyer-un-sortilege-justice-miroir",
    title: "Renvoyer un Sortilège : Justice Miroir et Choc en Retour",
    promptV1: `Dramatic macro still life of a mirror-return justice ritual. An antique handled cast bronze ritual mirror reflecting the warm flame of a lit red candle, with two crossed forged iron nails and three white cowries resting on its reflective surface on a dark slate slab under directional daylight. ` + PHOTO_BASE_RULES,
    promptV2: `Close-up photograph of an occult justice mirror. A round bronze mirror with an ornate handle laying flat, reflecting glowing red candlelight, paired with two crossed antique iron nails and polished sea cowries on a rustic stone pedestal in natural light. ` + PHOTO_BASE_RULES
  },
  {
    category: "protection-desenvoutement",
    slug: "savoir-si-on-est-envoute-symptomes",
    title: "Comment Savoir si l'on est Envoûté ?",
    promptV1: `Macro documentary photograph of traditional diagnostic divination tools. A smooth white organic ritual egg inscribed with fine black geometric Adinkra symbols, resting in a shallow round wooden bowl filled with purified wood ash and white sea salt, beside an eagle feather and sacred palm nuts under bright white daylight. ` + PHOTO_BASE_RULES,
    promptV2: `Still life of a traditional spiritual diagnosis. A white egg marked with sacred geometric Adinkra motifs laying in a bed of light grey wood ashes and coarse salt, flanked by a natural bird feather and dark Ikin divination nuts on a pine workbench in clear daylight. ` + PHOTO_BASE_RULES
  },
  {
    category: "protection-desenvoutement",
    slug: "se-proteger-du-mauvais-oeil-techniques-purification",
    title: "Mauvais Œil et Jalousie : Techniques de Protection",
    promptV1: `Macro still life of traditional evil eye protection artifacts. A vibrant cobalt-blue handcrafted glass eye talisman mounted in sterling silver filigree, resting on a bed of raw transparent rock salt crystals and dried white sage leaves on a light travertine surface in bright morning daylight. ` + PHOTO_BASE_RULES,
    promptV2: `Close-up jewelry still life. An ornate deep-blue glass protective eye pendant set in silver metalwork, laid over large rough sea salt crystals and fresh green sage sprigs on a clean light stone tabletop under bright natural white daylight. ` + PHOTO_BASE_RULES
  },

  // 4. SANTÉ & PLANTES (4 ARTICLES)
  {
    category: "sante-plantes",
    slug: "deboucher-les-trompes-naturellement-plantes",
    title: "Déboucher les Trompes Naturellement par les Plantes",
    promptV1: `Macro herbalist still life photograph of African fertility pharmacopoeia. A carved wooden mortar filled with crushed medicinal barks and whole alligator pepper pods, standing beside a small clear glass apothecary bottle containing a golden herbal infusion on a light raw wood cutting board in bright natural daylight. ` + PHOTO_BASE_RULES,
    promptV2: `Artisanal botanical packshot of female fertility remedies. A rustic turned-wood mortar with ground herbal roots and whole Guinea pepper seed pods, next to a crystal flask of warm amber herbal decoction on a natural pine workbench in crisp daylight. ` + PHOTO_BASE_RULES
  },
  {
    category: "sante-plantes",
    slug: "soigner-impuissance-plantes-racines-gouro",
    title: "Soigner l'Impuissance par les Plantes : Racines Gouro",
    promptV1: `Extreme macro botanical packshot of authentic African Gouro vitality roots. Two neat bundles of fibrous knotted Gouro root sticks securely tied with natural raw raffia twine, displayed next to whole dried ginger rhizomes and calabar seeds on an untreated timber tabletop in crisp natural white daylight. ` + PHOTO_BASE_RULES,
    promptV2: `Close-up photograph of Gouro medicinal plants. Bundled authentic Gouro roots bound with tan raffia fiber strings, surrounded by wild dried ginger root chunks and dark botanical beans on raw cedar wood under bright natural daylight. ` + PHOTO_BASE_RULES
  },
  {
    category: "sante-plantes",
    slug: "soigner-hemorroides-plantes-africaines",
    title: "Soigner les Hémorroïdes par les Plantes Africaines",
    promptV1: `Macro photograph of natural African botanical balm. A rustic terracotta clay pot filled with smooth whipped herbal green shea butter ointment, surrounded by fresh green medicinal leaves and chunks of raw unrefined golden shea butter on a light stone slab in bright natural daylight. ` + PHOTO_BASE_RULES,
    promptV2: `Herbal packshot of traditional healing salve. An unglazed clay container of rich green botanical butter balm, sitting beside raw unrefined shea butter lumps and fresh crushed healing leaves on a light marble base under natural white daylight. ` + PHOTO_BASE_RULES
  },
  {
    category: "sante-plantes",
    slug: "vertus-agbo-vigueur-masculine",
    title: "Les Vertus de l'Agbo Traditionnel",
    promptV1: `Commercial macro photograph of traditional Agbo herbal tonic. A large vintage amber glass demijohn bottle filled with rich steeped herbal tonic, with visible submerged fibrous medicinal roots and bark slices catching bright daylight rays on a rustic light wooden workbench. ` + PHOTO_BASE_RULES,
    promptV2: `Documentary packshot of traditional Agbo vitality infusion. A large round amber glass apothecary jug displaying steeped African medicinal barks and roots inside the dark golden liquid, on a raw timber desk in bright morning sunlight. ` + PHOTO_BASE_RULES
  },

  // 5. DÉMARCHES & JUSTICE EN FRANCE (4 ARTICLES)
  {
    category: "demarches-justice-france",
    slug: "debloquer-un-visa-refuse-rituels-consulat",
    title: "Débloquer un Visa Refusé : Rituels d'Ouverture",
    promptV1: `Still life photograph of path-opening ritual artifacts for official procedures. An antique polished golden brass key laying on a closed vintage brown leather document folder and passport, accompanied by a small white ceramic cup of shimmering golden powder, a lit white candle, and a bronze incense burner with delicate rising smoke on a light oak desk in daylight. ` + PHOTO_BASE_RULES,
    promptV2: `Editorial scene of an administrative opening ritual. A dark leather portfolio with a passport, an ornate gold brass key, a shallow bowl of fine golden powder, a burning white pillar candle, and gentle aromatic smoke curling from a metal censer on a clean wood desk in natural light. ` + PHOTO_BASE_RULES
  },
  {
    category: "demarches-justice-france",
    slug: "gagner-son-proces-tribunal-faire-taire-temoins",
    title: "Procès au Tribunal : Comment Faire Taire un Faux Témoin",
    promptV1: `Macro close-up photograph of a judicial silencing padlock ritual. A solid antique brass padlock sealed shut with dark black beeswax and bound with white cotton cords, sitting on a polished walnut block next to a miniature bronze justice balance scale and white cowries in bright natural white daylight. ` + PHOTO_BASE_RULES,
    promptV2: `Detailed still life of a legal victory charm. A heavy rectangular brass padlock plugged with black wax and tied with clean white thread windings, accompanied by traditional ritual tools and a small bronze justice scale on a dark wood altar under crisp daylight. ` + PHOTO_BASE_RULES
  },
  {
    category: "demarches-justice-france",
    slug: "regularisation-titre-de-sejour-prefecture",
    title: "Régularisation et Titre de Séjour en Préfecture",
    promptV1: `Editorial still life representing administrative success. A turned dark wood seal stamp resting on a blank textured cream parchment sheet with a stamped red wax medallion, beside an authentic small camel-leather protection amulet on a light ash wood office desk in soft natural daylight. ` + PHOTO_BASE_RULES,
    promptV2: `Still life of an administrative protection ritual. A wooden wax seal stamper next to a red wax seal impression on heavy parchment, with a hand-stitched tan leather talisman pouch on a light wooden desk under bright natural morning light. ` + PHOTO_BASE_RULES
  },
  {
    category: "demarches-justice-france",
    slug: "reussir-entretien-naturalisation-prefecture",
    title: "Entretien de Naturalisation en Préfecture : Rituels d'Éloquence",
    promptV1: `Macro still life of eloquence and authority ritual objects. A polished translucent horn saucer containing fine cinnamon-brown Klaman speech powder with a slender hand-carved ebony spoon, resting on a light leather desk blotter under bright crisp morning daylight. ` + PHOTO_BASE_RULES,
    promptV2: `Close-up packshot of Klaman authority powder. A natural carved horn cup filled with aromatic cinnamon-colored sublingual powder, accompanied by a small black ebony scoop on a leather writing desk in bright natural white daylight. ` + PHOTO_BASE_RULES
  },

  // 6. GUIDES & PRODUITS (4 ARTICLES)
  {
    category: "guides-produits",
    slug: "pourquoi-porter-un-baya-vertus-seduction",
    title: "Pourquoi Porter un Baya ? Histoire et Vertus",
    promptV1: `Macro luxury jewelry photograph of authentic African waist beads (Baya). Three glistening coiled strands of translucent ruby-red glass seed beads, micro golden brass beads, and polished white sea cowries arranged gracefully on soft ivory raw silk in bright natural white daylight. ` + PHOTO_BASE_RULES,
    promptV2: `Sensual and elegant product photograph of Baya beads. Coiled strands of radiant red glass beads with golden metal spacers and miniature sea cowrie pendants resting on light ivory silk fabric under bright crisp daylight. ` + PHOTO_BASE_RULES
  },
  {
    category: "guides-produits",
    slug: "utiliser-huile-tchotcho-protection-sorcellerie",
    title: "Huile de Palmiste Noire Tchotcho : Guide d'Utilisation",
    promptV1: `Macro product still life of authentic black palm kernel oil (Tchotcho). A closed heavy square amber glass bottle containing thick dark oil, with a polished brass cap, accompanied by a small braided protective cord and sacred palm nuts on a light natural oak table in bright morning daylight. ` + PHOTO_BASE_RULES,
    promptV2: `Documentary packshot of sealed Tchotcho oil. A vintage square amber glass bottle filled with deep black roasted palm kernel oil, placed beside natural dried herbs and cowries on a rustic wooden board under bright white daylight. ` + PHOTO_BASE_RULES
  },
  {
    category: "guides-produits",
    slug: "utiliser-poudre-klaman-parole-autorite",
    title: "Poudre de Parole d'Autorité Klaman : Guide d'Utilisation",
    promptV1: `Macro top-down photograph of sacred Klaman authority powder. A plain smooth white ceramic saucer filled with finely milled cinnamon-brown botanical powder, displaying fine aromatic organic textures on a clean light maple surface in bright natural white daylight. ` + PHOTO_BASE_RULES,
    promptV2: `Direct top-angle packshot of Klaman powder. A minimalist white porcelain dish holding warm cinnamon-toned botanical powder with delicate powdery granules catching bright overhead daylight on a light timber tabletop. ` + PHOTO_BASE_RULES
  },
  {
    category: "guides-produits",
    slug: "savon-noir-etoile-afe-guide-utilisation",
    title: "Savon Noir d'Étoile Afé : Guide d'Utilisation",
    promptV1: `Macro product photograph of authentic African star black soap paste (Afe) inside a clean natural dried half-calabash bowl carved with starburst geometric lines, placed beside a natural dried vegetal loofah sponge (Kaffo) on a light pine workbench in bright natural daylight. ` + PHOTO_BASE_RULES,
    promptV2: `Artisanal still life of Afe star soap. An authentic half-gourd bowl hand-engraved with geometric star motifs containing glossy dark black soap paste, with a natural fibrous bathing sponge on a light wood surface under bright natural white daylight. ` + PHOTO_BASE_RULES
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
  console.log('🚀 GENERATION DES 52 IMAGES DU BLOG (26 SUJETS x 2 VARIANTES)');
  console.log('   Modèle : gpt-image-2 (OpenAI) | Format 16:9 Landscape');
  console.log('   Destination : public/images/generated/05-blog/[category]/');
  console.log('================================================================\n');

  let totalSuccess = 0;
  let totalErrors = 0;
  let totalToGenerate = blogItems.length * 2;
  let currentCount = 0;

  for (const item of blogItems) {
    const catDir = path.join(OUTPUT_BASE, item.category);
    ensureDir(catDir);

    const variants = [
      { suffix: '_v1', prompt: item.promptV1 },
      { suffix: '_v2', prompt: item.promptV2 }
    ];

    console.log(`📁 Catégorie : [${item.category}] -> Article : ${item.title} (${item.slug})`);

    for (const v of variants) {
      currentCount++;
      const outFilename = `${item.slug}${v.suffix}.webp`;
      const outPath = path.join(catDir, outFilename);

      console.log(`[${currentCount}/${totalToGenerate}] 🖼️  Génération : ${outFilename}`);
      const start = Date.now();

      try {
        const sizeKb = await generateSingleImage(v.prompt, outPath);
        const elapsed = ((Date.now() - start) / 1000).toFixed(1);
        console.log(`   ✅ Succès en ${elapsed}s -> ${outFilename} [${sizeKb} Ko]`);
        totalSuccess++;
      } catch (err) {
        console.error(`   ❌ Échec pour ${outFilename} :`, err.message);
        totalErrors++;
      }

      await new Promise(r => setTimeout(r, 1000));
    }
    console.log('');
  }

  console.log('================================================================');
  console.log(`🎉 GÉNÉRATION TERMINÉE !`);
  console.log(`   ✅ Réussis : ${totalSuccess} / ${totalToGenerate}`);
  console.log(`   ❌ Erreurs : ${totalErrors}`);
  console.log('================================================================');
})();
