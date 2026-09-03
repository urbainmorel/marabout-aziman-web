/**
 * scripts/build_blog_prompts.cjs
 * 
 * Générateur de prompts ultra-détaillés et spécifiques pour les 25 articles du blog + 1 Hero Blog :
 * - Rendu photographique net, naturel de jour, authentique
 * - 0 humain, 0 texte
 * - Chaque article possède une composition visuelle unique et pertinente
 * - Format 16:9 Landscape (1536x1024)
 */

const fs = require('fs');
const path = require('path');

const STRICT_PHOTO_RULES = "crisp documentary photograph, realistic editorial still life, authentic traditional materials and real physical artifacts, clean luminous daylight composition, rich tactile textures, 8k resolution, shot on 50mm macro lens, strictly no text, no words, no letters, no numbers, no writing, no labels, no watermark, no typography, strictly no humans, no people, nobody, no hands, no faces, no 3D render, no CGI";

const blogPrompts = {
  // HERO DU BLOG
  "hero-blog": {
    category: "general",
    categoryName: "Blog & Enseignements",
    title: "Hero Principal du Blog & Enseignements Spirituels",
    concept: "Pupitre en bois précieux avec parchemin vierge roulé, lampe à huile en bronze, cauris et graines sacrées du Fâ",
    prompt: `Wide-angle editorial still life photograph of a traditional wisdom sanctuary desk. A polished dark mahogany reading stand holds an unrolled blank parchment scroll with subtle hand-drawn geometric sacred grid lines, an antique cast bronze oil lamp with a tiny glowing flame, polished white sea cowrie shells, and dark palm nuts (Ikin). Soft natural morning daylight entering from a window onto a light wooden study desk. Serene, scholarly and mystical atmosphere. ` + STRICT_PHOTO_RULES
  },

  // 1. AMOUR & RELATIONS (4 ARTICLES)
  "empecher-son-conjoint-de-tromper": {
    category: "amour-relations",
    categoryName: "Amour & Relations",
    title: "Bloquer l'Infidélité Conjugale",
    concept: "Cadenas de fidélité en fer noir posé sur deux rubans entrelacés rouge et blanc avec clé en laiton et pétales séchés",
    prompt: `Macro editorial photograph of a consecrated fidelity lock ritual. An antique black iron padlock lies on a light linen cloth over two interwoven satin ribbons of deep red and pure white, with a small matching brass key and scattered dried red rose petals in natural daylight. Clean, sharp, highly symbolic. ` + STRICT_PHOTO_RULES
  },
  "faire-revenir-son-ex-silence-radio": {
    category: "amour-relations",
    categoryName: "Amour & Relations",
    title: "Comment Faire Revenir son Ex Malgré le Silence Radio",
    concept: "Bougie rouge allumée avec coulures de cire sur miroir rituel cuivré et nœud d'attachement en raphia",
    prompt: `Close-up photograph of an authentic love reunion ritual still life. A lit red wax candle with melting wax drips stands beside a circular antique copper oracle mirror reflecting warm light, accompanied by a traditional tied raffia knot and three white sea cowries on a rustic wooden table under soft natural side lighting. ` + STRICT_PHOTO_RULES
  },
  "retour-affectif-avec-photo": {
    category: "amour-relations",
    categoryName: "Amour & Relations",
    title: "Retour Affectif avec Photo en France",
    concept: "Deux médaillons ovales vides en bois sculpté reliés par un fil de soie rouge carmin avec coupelle de miel",
    prompt: `Macro still life photograph of a traditional affection binding ritual. Two empty vintage carved oval wooden locket frames are placed facing each other, joined by a single crimson red silk cord, next to a small clear glass dish of glistening golden wild honey and fresh jasmine blossoms on white linen in daylight. ` + STRICT_PHOTO_RULES
  },
  "eloigner-une-maitresse-rituel-separation": {
    category: "amour-relations",
    categoryName: "Amour & Relations",
    title: "Éloigner une Maîtresse : Rituels de Séparation",
    concept: "Deux pierres volcaniques noires séparées par une coupelle de sel gemme et poivre noir sur bois brut",
    prompt: `Macro still life of a traditional energetic separation ritual. Two rough black volcanic stones placed at opposite ends of a raw oak table, separated in the center by a small clay bowl of coarse white sea salt and whole black peppercorns under bright natural white daylight. Stark, graphic, organic contrast. ` + STRICT_PHOTO_RULES
  },

  // 2. RICHESSE & PROSPÉRITÉ (5 ARTICLES)
  "attirer-argent-rapidement-rituels-chance": {
    category: "richesse-prosperite",
    categoryName: "Richesse & Prospérité",
    title: "Comment Attirer l'Argent Rapidement",
    concept: "Coupelle en terre cuite avec pièces anciennes dorées, feuilles de basilic frais et pépites d'or brut",
    prompt: `Commercial macro photograph of a traditional wealth attraction altar bowl. A shallow terracotta dish filled with antique polished gold coins, raw golden mineral ore nuggets, fresh vibrant green basil leaves, and shining white cowries under radiant natural morning sunlight on a light straw woven mat. ` + STRICT_PHOTO_RULES
  },
  "gagner-aux-jeux-de-hasard-rituels-bague": {
    category: "richesse-prosperite",
    categoryName: "Richesse & Prospérité",
    title: "Gagner aux Jeux de Hasard : Rituels et Bagues de Chance",
    concept: "Bague talismanique en argent massif gravée posée sur du bois noble avec cauris et dés en bois brut",
    prompt: `Macro jewelry still life of a consecrated prosperity ring. A solid polished sterling silver ring band deeply engraved with an African geometric luck symbol rests upright on an aged light driftwood block, accompanied by three polished sea cowries and a pair of unnumbered carved wooden dice in bright daylight. ` + STRICT_PHOTO_RULES
  },
  "pacte-mami-wata-mythes-realites": {
    category: "richesse-prosperite",
    categoryName: "Richesse & Prospérité",
    title: "Pacte avec Mami Wata : Mythes et Réalités",
    concept: "Coupe en verre marin avec eau de mer scintillante, perles marines, coquillages nacrés et miroir argenté",
    prompt: `Luminous photographic still life of a sacred marine offering. A clear sea-green glass bowl filled with sparkling crystal ocean water, surrounded by natural iridescent mother-of-pearl shells, turquoise beads, and a round silver hand mirror reflecting shimmering water caustics in bright daylight on white sand. ` + STRICT_PHOTO_RULES
  },
  "portefeuille-magique-grand-maitre-aziman": {
    category: "richesse-prosperite",
    categoryName: "Richesse & Prospérité",
    title: "Le Portefeuille Magique : Vérités et Richesse Réelle",
    concept: "Bourse traditionnelle en cuir pleine fleur camel cousue main avec fermoir en laiton et graines sacrées",
    prompt: `Macro leathercraft photograph of an authentic traditional prosperity leather pouch. A rich camel-brown vegetable-tanned leather pouch with hand-stitched waxed linen edges, an antique brass ring clasp, and three sacred golden palm seeds resting beside it on a light natural wood surface under bright natural white daylight. ` + STRICT_PHOTO_RULES
  },
  "signes-blocage-financier-mystique": {
    category: "richesse-prosperite",
    categoryName: "Richesse & Prospérité",
    title: "Blocage Financier Mystique : 5 Signes Révélateurs",
    concept: "Chaîne en fer forgé ouverte symboliquement à côté d'une bougie blanche et d'un bain purificateur",
    prompt: `Editorial still life photograph representing spiritual unblocking. An open, unlinked antique hand-forged iron chain resting beside a lit tall white pillar candle and a glass bowl of pure water infused with fresh hyssop leaves and rock salt on a light grey stone slab in clear morning daylight. ` + STRICT_PHOTO_RULES
  },

  // 3. PROTECTION & DÉSENVOÛTEMENT (4 ARTICLES)
  "mari-de-nuit-symptomes-delivrance": {
    category: "protection-desenvoutement",
    categoryName: "Protection & Désenvoûtement",
    title: "Mari de Nuit (Incube) : Symptômes et Délivrance",
    concept: "Bouteille d'huile noire Tchotcho avec cordon de protection noir et feuilles d'hysope séchée",
    prompt: `Macro product still life of spiritual liberation remedies. A square heavy amber glass bottle of black palm kernel oil (Tchotcho) with a brass cap, tied with a braided black protective cotton cord, placed alongside dried hyssop bundles and coarse sea salt crystals on a light cedar wood block in natural daylight. ` + STRICT_PHOTO_RULES
  },
  "renvoyer-un-sortilege-justice-miroir": {
    category: "protection-desenvoutement",
    categoryName: "Protection & Désenvoûtement",
    title: "Renvoyer un Sortilège : Justice Miroir et Choc en Retour",
    concept: "Miroir rituel octogonal en bronze patiné renvoyant la lumière d'une bougie rouge avec pointes de fer",
    prompt: `Dramatic macro still life of a mirror-return justice ritual. An antique octagonal cast bronze mirror reflecting the warm flame of a lit red candle, with two small crossed forged iron nails and three white cowries resting on its reflective surface on a dark slate slab under directional daylight. ` + STRICT_PHOTO_RULES
  },
  "savoir-si-on-est-envoute-symptomes": {
    category: "protection-desenvoutement",
    categoryName: "Protection & Désenvoûtement",
    title: "Comment Savoir si l'on est Envoûté ?",
    concept: "Œuf rituel blanc dans un lit de cendres sacrées et sel marin avec plume d'alerte",
    prompt: `Macro documentary photograph of traditional diagnostic divination tools. A smooth white organic ritual egg resting in a shallow round wooden tray filled with purified wood ash and white sea salt grains, beside an eagle feather and sacred palm nuts on a light pine workbench under bright white daylight. ` + STRICT_PHOTO_RULES
  },
  "se-proteger-du-mauvais-oeil-techniques-purification": {
    category: "protection-desenvoutement",
    categoryName: "Protection & Désenvoûtement",
    title: "Mauvais Œil et Jalousie : Techniques de Protection",
    concept: "Amulette protectrice en verre bleu et argent sur cristaux de sel brut et feuilles de sauge",
    prompt: `Macro still life of traditional evil eye protection artifacts. A vibrant cobalt-blue handcrafted glass eye talisman mounted in sterling silver filigree, resting on a bed of raw transparent rock salt crystals and dried white sage leaves on a light travertine surface in bright morning daylight. ` + STRICT_PHOTO_RULES
  },

  // 4. SANTÉ & PLANTES (4 ARTICLES)
  "deboucher-les-trompes-naturellement-plantes": {
    category: "sante-plantes",
    categoryName: "Santé & Plantes",
    title: "Déboucher les Trompes Naturellement par les Plantes",
    concept: "Mortier en bois avec écorces médicinales séchées broyées, gousses de piment et fiole d'infusion dorée",
    prompt: `Macro herbalist still life photograph of African fertility pharmacopoeia. A carved wooden mortar filled with crushed medicinal barks and whole alligator pepper pods, standing beside a small clear glass apothecary bottle containing a golden herbal infusion on a light raw wood cutting board in bright natural daylight. ` + STRICT_PHOTO_RULES
  },
  "soigner-impuissance-plantes-racines-gouro": {
    category: "sante-plantes",
    categoryName: "Santé & Plantes",
    title: "Soigner l'Impuissance par les Plantes : Racines Gouro",
    concept: "Fagots de racines noueuses de Gouro ficelés de raphia naturel avec morceaux de gingembre sauvage",
    prompt: `Extreme macro botanical packshot of authentic African Gouro vitality roots. Two neat bundles of fibrous knotted Gouro root sticks securely tied with natural raw raffia twine, displayed next to whole dried ginger rhizomes and calabar seeds on an untreated timber tabletop in crisp natural white daylight. ` + STRICT_PHOTO_RULES
  },
  "soigner-hemorroides-plantes-africaines": {
    category: "sante-plantes",
    categoryName: "Santé & Plantes",
    title: "Soigner les Hémorroïdes par les Plantes Africaines",
    concept: "Bol en argile contenant un baume végétal vert onctueux au karité brut et poudres de feuilles",
    prompt: `Macro photograph of natural African botanical balm. A rustic terracotta clay pot filled with smooth whipped herbal green shea butter ointment, surrounded by fresh green medicinal leaves and chunks of raw unrefined golden shea butter on a light stone slab in bright natural daylight. ` + STRICT_PHOTO_RULES
  },
  "vertus-agbo-vigueur-masculine": {
    category: "sante-plantes",
    categoryName: "Santé & Plantes",
    title: "Les Vertus de l'Agbo Traditionnel",
    concept: "Grande carafe apothicaire en verre ambré contenant la macération d'Agbo avec racines visibles",
    prompt: `Commercial macro photograph of traditional Agbo herbal tonic. A large vintage amber glass demijohn bottle filled with rich steeped herbal tonic, with visible submerged fibrous medicinal roots and bark slices catching bright daylight rays on a rustic light wooden workbench. ` + STRICT_PHOTO_RULES
  },

  // 5. DÉMARCHES & JUSTICE EN FRANCE (4 ARTICLES)
  "debloquer-un-visa-refuse-rituels-consulat": {
    category: "demarches-justice-france",
    categoryName: "Démarches & Justice en France",
    title: "Débloquer un Visa Refusé : Rituels d'Ouverture",
    concept: "Clé dorée ancienne posée sur un dossier en cuir marron fermé avec coupelle de poudre d'ouverture dorée",
    prompt: `Still life photograph of path-opening ritual artifacts for official procedures. A heavy antique polished golden brass key laying on a closed vintage brown leather portfolio folder, accompanied by a small white ceramic cup of fine shimmering golden road-opening powder on a clean light oak desk in bright daylight. ` + STRICT_PHOTO_RULES
  },
  "gagner-son-proces-tribunal-faire-taire-temoins": {
    category: "demarches-justice-france",
    categoryName: "Démarches & Justice en France",
    title: "Procès au Tribunal : Comment Faire Taire un Faux Témoin",
    concept: "Cadenas de silence en laiton scellé de cire noire posé à côté d'une petite balance en bronze",
    prompt: `Macro still life of a judicial victory and silencing ritual. An antique solid brass padlock sealed with dark black beeswax and wound with black thread, sitting beside a miniature antique cast bronze justice balance scale on a light polished walnut block under bright white daylight. ` + STRICT_PHOTO_RULES
  },
  "regularisation-titre-de-sejour-prefecture": {
    category: "demarches-justice-france",
    categoryName: "Démarches & Justice en France",
    title: "Régularisation et Titre de Séjour en Préfecture",
    concept: "Tampon en bois noble et sceau de cire rouge sur parchemin vierge avec talisman en cuir",
    prompt: `Editorial still life representing administrative success. A turned dark wood seal stamp resting on a blank textured cream parchment sheet with a stamped red wax medallion, beside an authentic small camel-leather protection amulet on a light ash wood office desk in soft natural daylight. ` + STRICT_PHOTO_RULES
  },
  "reussir-entretien-naturalisation-prefecture": {
    category: "demarches-justice-france",
    categoryName: "Démarches & Justice en France",
    title: "Entretien de Naturalisation en Préfecture : Rituels d'Éloquence",
    concept: "Poudre sublinguale d'autorité dans une coupelle en corne avec fine cuillère en ébène sur sous-main",
    prompt: `Macro still life of eloquence and authority ritual objects. A polished translucent horn saucer containing fine cinnamon-brown Klaman speech powder with a slender hand-carved ebony spoon, resting on a light leather desk blotter under bright crisp morning daylight. ` + STRICT_PHOTO_RULES
  },

  // 6. GUIDES & PRODUITS (4 ARTICLES)
  "pourquoi-porter-un-baya-vertus-seduction": {
    category: "guides-produits",
    categoryName: "Guides & Produits",
    title: "Pourquoi Porter un Baya ? Histoire et Vertus",
    concept: "Rangs de perles de hanches Baya en verre rouge rubis, doré et cauris lovés sur tissu en soie ivoire",
    prompt: `Macro luxury jewelry photograph of authentic African waist beads (Baya). Three glistening coiled strands of translucent ruby-red glass seed beads, micro golden brass beads, and polished white sea cowries arranged gracefully on soft ivory raw silk in bright natural white daylight. ` + STRICT_PHOTO_RULES
  },
  "utiliser-huile-tchotcho-protection-sorcellerie": {
    category: "guides-produits",
    categoryName: "Guides & Produits",
    title: "Huile de Palmiste Noire Tchotcho : Guide d'Utilisation",
    concept: "Flacon compte-gouttes en verre ambré avec pipette laissant échapper une goutte d'huile noire",
    prompt: `Extreme macro product photograph of authentic black palm kernel oil (Tchotcho). A heavy square amber glass dropper bottle with a single thick dark droplet hanging from the glass pipette tip above the bottle on a light natural oak table in bright morning daylight. ` + STRICT_PHOTO_RULES
  },
  "utiliser-poudre-klaman-parole-autorite": {
    category: "guides-produits",
    categoryName: "Guides & Produits",
    title: "Poudre de Parole d'Autorité Klaman : Guide d'Utilisation",
    concept: "Coupelle en céramique blanche unie avec poudre cannelle fine d'autorité",
    prompt: `Macro top-down photograph of sacred Klaman authority powder. A plain smooth white ceramic saucer filled with finely milled cinnamon-brown botanical powder, displaying fine aromatic organic textures on a clean light maple surface in bright natural white daylight. ` + STRICT_PHOTO_RULES
  },
  "savon-noir-etoile-afe-guide-utilisation": {
    category: "guides-produits",
    categoryName: "Guides & Produits",
    title: "Savon Noir d'Étoile Afé : Guide d'Utilisation",
    concept: "Demi-calebasse gravée d'étoiles contenant la pâte de savon noir Afé avec éponge végétale Kaffo",
    prompt: `Macro product photograph of authentic African star-opening black soap paste (Afe) inside a clean natural dried half-calabash bowl carved with starburst geometric lines, placed beside a natural dried vegetal loofah sponge (Kaffo) on a light pine workbench in bright natural daylight. ` + STRICT_PHOTO_RULES
  }
};

const BASE_DIR = path.resolve('prompts-generation-images/05-blog');

Object.entries(blogPrompts).forEach(([slug, item]) => {
  const categoryDir = path.join(BASE_DIR, item.category);
  if (!fs.existsSync(categoryDir)) {
    fs.mkdirSync(categoryDir, { recursive: true });
  }

  const filePath = path.join(categoryDir, `${slug}.txt`);

  const fileContent = `================================================================================
PROMPT BLOG UNIQUE - PHOTOGRAPHIE EDITORIALE HAUTE DEFINITION (16:9 LANDSCAPE)
ARTICLE : ${item.title.toUpperCase()}
================================================================================

Catégorie Blog      : ${item.categoryName} (/blog/categorie/${item.category}/)
Article URL         : ${slug === 'hero-blog' ? '/blog/' : `/blog/${slug}/`}
Concept Visuel      : ${item.concept}

--------------------------------------------------------------------------------
SPECIFICATIONS PHOTOGRAPHIQUES (STRICTEMENT SANS HUMAIN ET SANS TEXTE)
--------------------------------------------------------------------------------
- Type de Plan      : Photo éditoriale réaliste de reportage, composition 16:9 soignée
- Éclairage         : Lumière blanche naturelle de jour, reflets nets, matières organiques
- Règle 1           : STRICTEMENT AUCUN HUMAIN, AUCUNE MAIN, AUCUN VISAGE
- Règle 2           : STRICTEMENT AUCUN TEXTE, AUCUNE LETTRE, AUCUNE ÉTIQUETTE
- Règle 3           : Objet et composition uniques et spécifiques au sujet traité

================================================================================
PROMPT UNIQUE : ARTICLE BLOG (FORMAT PAYSAGE 16:9)
================================================================================
[COPIER-COLLER LE PROMPT CI-DESSOUS] :
${item.prompt}

Paramètres Midjourney : --v 6.1 --style raw --ar 16:9
Résolution DALL-E / gpt-image-2 : 1536x1024 pixels
================================================================================
`;

  fs.writeFileSync(filePath, fileContent, 'utf8');
  console.log(`✅ Prompt généré : 05-blog/${item.category}/${slug}.txt`);
});

console.log('\n🎉 Les 26 prompts du Blog (1 Hero + 25 Articles) ont été générés avec succès !');
