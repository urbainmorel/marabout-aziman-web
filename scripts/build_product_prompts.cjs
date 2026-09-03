/**
 * scripts/build_product_prompts.cjs
 * 
 * Générateur de prompts ultra-détaillés pour les 35 produits du catalogue
 * strictement conformes aux instructions spécifiques du client :
 * - 1 prompt unique par produit (Format 1:1 Carré)
 * - Gros plan produit net, naturel et détaillé (Packshot Macro Haute Définition)
 * - Savons : demi-calebasse naturelle avec gravures géométriques spécifiques
 * - Eaux : longue bouteille en verre transparent 1.5L avec bouchon de couleur spécifique
 * - Parfums : flacons orientaux d'origine conservés
 * - Poudres : coupelle en céramique blanche unie, seule la poudre change
 * - Talismans : cuir ordinaire sobre différencié par coutures / motifs simples
 * - Bagues : anneaux lisses très simples or jaune / argent gravés d'un symbole
 * - Cadenas : cadenas ordinaires fermés avec clé ordinaire, différenciés par couleur
 * - Pharmacopée : bouteilles ordinaires avec surfaces texturées / lisses / côtelées / fagot raphia
 * - STRICTEMENT SANS TEXTE, SANS HUMAIN, LUMIERE BLANCHE NATURELLE DE JOUR
 */

const fs = require('fs');
const path = require('path');

const STRICT_PHOTO_TAGS = "crisp daytime commercial product photograph, macro close-up still life, real physical object on light rustic natural background, bright natural white daylight, crystal clear focus, high tactile fidelity, authentic palpable textures, clean luminous composition, 8k resolution, hyper-realistic photography, shot on 100mm macro lens, strictly no text, no words, no letters, no numbers, no writing, no labels, no watermark, no typography, strictly no humans, no people, nobody, no hands, no faces, no 3D render, no CGI";

const productPrompts = {
  // ==========================================
  // 1. SAVONS NOIRS & RITUELS (5 PRODUITS)
  // Récipient : demi-calebasse naturelle
  // ==========================================
  "savon-commandement-klaman": {
    category: "savons",
    categoryName: "Savons Noirs & Rituels",
    title: "Savon de Commandement et d'Autorité Klaman",
    concept: "Pâte de savon noir authentique dans une demi-calebasse naturelle gravée uniquement de motifs géométriques royaux (triangles, chevrons)",
    prompt: `Extreme macro close-up product photograph of authentic African black soap paste (Ose Dudu) filled inside a natural dried half-calabash bowl. The outer rim of the natural gourd bowl is hand-engraved strictly with royal geometric patterns consisting solely of triangles and chevron motifs. The viscous dark black soap paste has a rich natural sheen reflecting bright daylight, revealing subtle botanical specks. Resting on a light natural wooden surface under bright natural white daylight. ` + STRICT_PHOTO_TAGS + ` --ar 1:1`
  },
  "savon-grand-desenvoutement": {
    category: "savons",
    categoryName: "Savons Noirs & Rituels",
    title: "Savon de Grand Désenvoûtement et Décharge",
    concept: "Pâte de savon noir purificateur dans une demi-calebasse naturelle gravée uniquement de lignes protectrices entrecroisées",
    prompt: `Extreme macro product photograph of authentic African purification black soap paste inside a natural dried half-calabash gourd bowl. The exterior of the calabash is hand-engraved strictly with fine crisscrossing intersecting protective lines. The dark glistening black soap paste reveals fine natural roasted plantain ash textures catching crisp highlights. Set on a light grey granite surface under radiant natural white daylight. ` + STRICT_PHOTO_TAGS + ` --ar 1:1`
  },
  "savon-fortune-prospérité": {
    category: "savons",
    categoryName: "Savons Noirs & Rituels",
    title: "Savon de Fortune et Prospérité",
    concept: "Pâte de savon noir de prospérité dans une demi-calebasse naturelle gravée uniquement de symboles de prospérité (cauris stylisés et soleils)",
    prompt: `Macro commercial still life photograph of consecrated prosperity black soap paste inside a smooth natural half-calabash bowl. The rim of the gourd is hand-engraved strictly with stylized cowrie shell shapes and radiant sun symbols. The glossy dark amber-black soap paste displays a rich moist texture reflecting bright morning daylight. Resting on a light straw woven mat in clear natural white sunlight. ` + STRICT_PHOTO_TAGS + ` --ar 1:1`
  },
  "savon-seduction-charme": {
    category: "savons",
    categoryName: "Savons Noirs & Rituels",
    title: "Savon de Séduction et de Charme",
    concept: "Pâte de savon noir de séduction dans une demi-calebasse naturelle gravée uniquement de volutes sacrées et symboles de charme",
    prompt: `Extreme close-up macro photograph of sensual attraction African black soap paste inside an authentic natural half-calabash gourd bowl. The polished gourd exterior is hand-engraved strictly with flowing sacred spiral scrolls and elegant swirling charm curves. The decadent black soap paste has a subtle golden-honey luster under soft directional natural daylight on a light beige linen cloth. ` + STRICT_PHOTO_TAGS + ` --ar 1:1`
  },
  "savon-noir-etoile-afe": {
    category: "savons",
    categoryName: "Savons Noirs & Rituels",
    title: "Savon Noir d'Étoile Afé",
    concept: "Pâte de savon noir Afé dans une demi-calebasse naturelle gravée uniquement d'étoiles géométriques",
    prompt: `Macro product photograph of authentic West African star black soap paste (Afe) inside a clean natural dried half-calabash bowl. The outer surface of the gourd is hand-engraved strictly with sharp geometric eight-pointed stars and diamond starburst motifs. The whipped deep black soap paste reflects pure bright daylight on a light pine workbench. Crisp, organic and razor-sharp. ` + STRICT_PHOTO_TAGS + ` --ar 1:1`
  },

  // ==========================================
  // 2. EAUX SACRÉES & LUSTRALES (4 PRODUITS)
  // Longue bouteille en verre transparent 1,5L
  // ==========================================
  "eau-premier-orage-consacree": {
    category: "eaux",
    categoryName: "Eaux Sacrées & Lustrales",
    title: "Eau du Premier Orage de l'Année",
    concept: "Longue bouteille en verre transparent de 1,5L remplie d'eau cristalline avec bouchon gris ardoise",
    prompt: `Macro commercial product photograph of a tall 1.5-liter style clear unlabelled transparent glass water bottle filled to the brim with pure crystal-clear water, sealed with a plain matte slate-grey screw cap. Pristine transparent water refracts clean light with tiny microscopic bubbles catching sunbeams. Standing upright on a light neutral stone surface under bright natural white daylight. Clean, minimal, pure. ` + STRICT_PHOTO_TAGS + ` --ar 1:1`
  },
  "eau-de-mer-nocturne": {
    category: "eaux",
    categoryName: "Eaux Sacrées & Lustrales",
    title: "Eau de Mer Nocturne Consacrée",
    concept: "Longue bouteille en verre transparent de 1,5L remplie d'eau limpide avec bouchon bleu nuit",
    prompt: `Macro commercial product photograph of a tall 1.5-liter style clear unlabelled transparent glass water bottle filled with sparkling clear ocean water, sealed with a solid midnight-blue screw cap. The transparent glass bottle displays crystal clarity and subtle water caustics on a smooth light travertine pedestal under bright crisp daylight. Minimalist, luminous, tack-sharp. ` + STRICT_PHOTO_TAGS + ` --ar 1:1`
  },
  "eau-sacree-7-marigots": {
    category: "eaux",
    categoryName: "Eaux Sacrées & Lustrales",
    title: "Eau Sacrée des 7 Marigots",
    concept: "Longue bouteille en verre transparent de 1,5L remplie d'eau sacrée pure avec bouchon vert émeraude",
    prompt: `Commercial macro still life photograph of a tall 1.5-liter style clear unlabelled transparent glass bottle filled with pure natural spring water, sealed with a solid emerald-green screw cap. The clean transparent water refracts bright sunlight onto a light natural wood surface with sharp glass caustics. Luminous transparency and crisp reflections. ` + STRICT_PHOTO_TAGS + ` --ar 1:1`
  },
  "eau-lustrale-sanctuaire": {
    category: "eaux",
    categoryName: "Eaux Sacrées & Lustrales",
    title: "Eau Lustrale de Sanctuaire",
    concept: "Longue bouteille en verre transparent de 1,5L remplie d'eau purifiée avec bouchon blanc opaque",
    prompt: `Close-up product packshot of a tall 1.5-liter style clear unlabelled transparent glass water bottle filled with pristine lustral purification water, sealed with a solid opaque white screw cap. Bright natural white daylight illuminates the bottle, casting clean light refractions across a light marble countertop. Ultra-clean, sharp, minimal. ` + STRICT_PHOTO_TAGS + ` --ar 1:1`
  },

  // ==========================================
  // 3. PARFUMS & MACÉRATIONS (4 PRODUITS)
  // Aucun changement : prompts d'origine conservés
  // ==========================================
  "huile-palmiste-noire-tchotcho": {
    category: "parfums-macerations",
    categoryName: "Parfums & Macérations",
    title: "Huile de Palmiste Noire Tchotcho",
    concept: "Fiole en verre ambré lourd avec pipette en verre et huile noire riche",
    prompt: `Extreme macro product photograph of authentic African roasted black palm kernel oil (Tchotcho) inside a heavy square amber glass dropper bottle with a polished brass cap. A single thick, glossy dark amber-brown oil droplet hangs from the tip of the glass dropper above the bottle. Rich warm tones, pristine glass reflections on a light ash wood table in bright natural daylight. ` + STRICT_PHOTO_TAGS + ` --ar 1:1`
  },
  "parfum-bint-el-sudan-argent": {
    category: "parfums-macerations",
    categoryName: "Parfums & Macérations",
    title: "Parfum Bint El Sudan Consacré Argent",
    concept: "Flacon de parfum oriental raffiné en verre facetté et filigrane métallique doré",
    prompt: `Luxury commercial product photograph of a consecrated wealth attraction perfume in an exquisite Arabic-inspired perfume bottle, featuring an octagonal faceted clear crystal body adorned with delicate filigree gold metal casing and an ornate pointed crown stopper. Golden amber perfume liquid glows inside under bright natural white daylight on a light polished marble surface with scattered raw frankincense resin tears. ` + STRICT_PHOTO_TAGS + ` --ar 1:1`
  },
  "parfum-dangoma-seduction": {
    category: "parfums-macerations",
    categoryName: "Parfums & Macérations",
    title: "Parfum Dangoma de Séduction",
    concept: "Flacon oriental en verre taillé goutte d'eau avec détails en cuivre rouge ciselé",
    prompt: `Macro luxury perfume packshot of consecrated Dangoma seduction oil in a magnificent Arabian-style teardrop perfume flacon, featuring ruby-tinted crystal glass encased in intricately engraved rose-gold metal fretwork with an ornate crystal wand applicator. The viscous golden-red aromatic perfume shimmers in bright morning sunlight against a light silk linen backdrop. Sensual luxury. ` + STRICT_PHOTO_TAGS + ` --ar 1:1`
  },
  "parfum-dounia-affaires": {
    category: "parfums-macerations",
    categoryName: "Parfums & Macérations",
    title: "Parfum Dounia de Succès Commercial",
    concept: "Flacon oriental cylindrique en cristal épais et métal ciselé bronze doré",
    prompt: `Commercial macro photograph of consecrated Dounia business success perfume in a luxurious tall cylindrical glass flacon with brushed antique bronze geometric filigree overlays and an embossed dome cap. Golden aromatic essential oils glow through the crystal fluting under crisp natural white daylight on a light oak pedestal. Sharp reflections and high-end aesthetic. ` + STRICT_PHOTO_TAGS + ` --ar 1:1`
  },

  // ==========================================
  // 4. POUDRES NOIRES & TERRES SACRÉES (4 PRODUITS)
  // Support : Coupelle en céramique blanche unie
  // ==========================================
  "poudre-seuil-attraction-clientele": {
    category: "poudres-terres-sacrees",
    categoryName: "Poudres Noires & Terres Sacrées",
    title: "Poudre de Seuil pour Attraction de Clientèle",
    concept: "Poudre dorée fine dans une simple coupelle en céramique blanche unie, sans ustensile",
    prompt: `Macro top-down product photograph of a plain smooth white ceramic saucer bowl filled with fine, shimmering golden-yellow ritual botanical powder. The bright golden powder has a delicate, even velvety texture with micro-shimmers catching bright daylight. Standing alone on a clean light oak wooden surface in bright natural white daylight. Pure, minimalist, high detail on powder particles. ` + STRICT_PHOTO_TAGS + ` --ar 1:1`
  },
  "poudre-terre-carrefour-bannissement": {
    category: "poudres-terres-sacrees",
    categoryName: "Poudres Noires & Terres Sacrées",
    title: "Poudre de Terre de Carrefour de Bannissement",
    concept: "Poudre rouge-brune de terre sacrée dans une simple coupelle en céramique blanche unie, sans ustensile",
    prompt: `Macro close-up product photograph of a plain smooth white ceramic saucer bowl filled with finely ground reddish-brown consecrated crossroad earth powder. The earthy red-brown powder exhibits a natural granular texture with delicate mineral nuances under bright natural white daylight. Positioned neatly on a light ash tabletop. Clean minimalist contrast. ` + STRICT_PHOTO_TAGS + ` --ar 1:1`
  },
  "poudre-noire-blindage-gblon": {
    category: "poudres-terres-sacrees",
    categoryName: "Poudres Noires & Terres Sacrées",
    title: "Poudre Noire de Blindage Corporel Gblon",
    concept: "Poudre noire charbon dans une simple coupelle en céramique blanche unie, sans ustensile",
    prompt: `Extreme macro product photograph of a plain smooth white ceramic saucer bowl filled with intense matte charcoal-black botanical shielding powder (Gblon). The velvety deep black powder creates a striking graphic contrast against the pristine white ceramic bowl under bright natural white daylight on a light neutral stone surface. Microscopic texture sharpness. ` + STRICT_PHOTO_TAGS + ` --ar 1:1`
  },
  "poudre-sublinguale-klaman": {
    category: "poudres-terres-sacrees",
    categoryName: "Poudres Noires & Terres Sacrées",
    title: "Poudre Sublinguale de Parole d'Autorité Klaman",
    concept: "Poudre cannelle fine dans une simple coupelle en céramique blanche unie, sans ustensile",
    prompt: `Extreme macro close-up photograph of a plain smooth white ceramic saucer bowl filled with finely milled warm cinnamon-brown sacred authority powder. The warm aromatic cinnamon-toned powder shows delicate organic fiber textures under crisp natural morning daylight on a light maple desk. Pure minimalist packshot. ` + STRICT_PHOTO_TAGS + ` --ar 1:1`
  },

  // ==========================================
  // 5. TALISMANS EN CUIR & CORNES (4 PRODUITS)
  // Cuir ordinaire sobre différencié par coutures / motifs simples
  // ==========================================
  "amulette-cou-protection-integrale": {
    category: "talismans-cuir-gris-gris",
    categoryName: "Talismans en Cuir & Cornes",
    title: "Amulette de Cou sous Étui de Cuir",
    concept: "Amulette en cuir ordinaire camel avec motif losange cousu de fil blanc, cordon en cuir",
    prompt: `Macro product photograph of a traditional plain camel-tan leather neck amulet pouch. The rectangular leather case is made of simple natural camel leather with visible perimeter stitching, featuring a single prominent hand-stitched diamond (rhombus) motif in neat cream thread in the center. A simple thin camel leather hanging cord is attached at the top. Resting on a light wooden tabletop under bright natural white daylight. ` + STRICT_PHOTO_TAGS + ` --ar 1:1`
  },
  "ceinture-talismanique-gbekoun": {
    category: "talismans-cuir-gris-gris",
    categoryName: "Talismans en Cuir & Cornes",
    title: "Ceinture Talismanique Gbékoun",
    concept: "Ceinture en cuir ordinaire havane avec 5 sachets cousus simples sans cauris",
    prompt: `Commercial still life photograph of an authentic plain Havana-brown leather talismanic waist belt. The belt features five small plain rectangular leather medicine pouches neatly stitched along its length with visible waxed linen thread, without any shells or metal additions. Neatly coiled on a light natural linen fabric under bright daylight. Clean, honest leatherwork. ` + STRICT_PHOTO_TAGS + ` --ar 1:1`
  },
  "corne-belier-chargee-maison": {
    category: "talismans-cuir-gris-gris",
    categoryName: "Talismans en Cuir & Cornes",
    title: "Corne de Bélier Protectrice Scellée",
    concept: "Corne de bélier naturelle ordinaire scellée à la cire noire",
    prompt: `Macro product photograph of an authentic curved natural ram's horn talisman. The natural ribbed horn shows its raw keratin ridges, with the wide open end firmly sealed with smooth, plain matte black beeswax. The pointed tip remains natural and unadorned. Resting on a light sandstone block in bright natural white daylight. Raw, authentic, tactile sharpness. ` + STRICT_PHOTO_TAGS + ` --ar 1:1`
  },
  "talisman-bras-cuir-protecteur": {
    category: "talismans-cuir-gris-gris",
    categoryName: "Talismans en Cuir & Cornes",
    title: "Talisman de Bras en Cuir Protecteur",
    concept: "Brassard en cuir ordinaire acajou avec coutures sellier simples et lanières de fixation",
    prompt: `Macro product packshot of a plain mahogany-brown leather arm talisman cuff. Crafted from solid natural mahogany-colored leather with simple, neat straight saddle stitching along the borders and two plain leather tie-strings for arm fastening. Displayed flat on a light rustic pine board in bright natural white daylight. Clean, classic leathercraft. ` + STRICT_PHOTO_TAGS + ` --ar 1:1`
  },

  // ==========================================
  // 6. PARURES, BAYAS & BAGUES MAGIQUES (5 PRODUITS)
  // Bagues lisses très simples gravées d'un symbole, bayas simples
  // ==========================================
  "bague-chance-financiere-jeux": {
    category: "parures-bayas-metaux",
    categoryName: "Parures, Bayas & Bagues Magiques",
    title: "Bague de Chance Financière et Jeux de Hasard",
    concept: "Anneau lisse très simple en or jaune avec un symbole Adinkra de prospérité gravé",
    prompt: `Macro jewelry product photograph of a very simple smooth yellow gold ring band. The plain polished yellow gold surface features a single finely engraved traditional African Adinkra prosperity geometric symbol on its top center. Standing upright on a light pale wood cube, catching crisp bright natural daylight reflections. Elegant, minimalist, razor-sharp focus on the engraved motif. ` + STRICT_PHOTO_TAGS + ` --ar 1:1`
  },
  "bague-anti-poison-accident": {
    category: "parures-bayas-metaux",
    categoryName: "Parures, Bayas & Bagues Magiques",
    title: "Bague Ésotérique Anti-Poison et Anti-Accident",
    concept: "Anneau lisse très simple en argent avec un symbole de labyrinthe gravé",
    prompt: `Macro jewelry product photograph of a very simple smooth sterling silver ring band. The polished plain silver band is engraved strictly with a single clean geometric protective labyrinth symbol on its center. Resting on a light grey travertine slab under bright natural white daylight. Sleek, minimal, tack-sharp metallic reflections. ` + STRICT_PHOTO_TAGS + ` --ar 1:1`
  },
  "baya-seduction-attachement": {
    category: "parures-bayas-metaux",
    categoryName: "Parures, Bayas & Bagues Magiques",
    title: "Baya de Séduction et Attachement Amoureux",
    concept: "Baya simple en perles de verre rouge rubis et perles dorées enfilées simplement",
    prompt: `Macro product photograph of a simple African waist beads strand (Baya), made of alternating small round translucent ruby-red glass beads and tiny polished golden metallic beads strung cleanly on a fine cord. Elegantly coiled on a light ivory linen fabric under bright natural white daylight. Glistening red and gold bead highlights, clean and simple design. ` + STRICT_PHOTO_TAGS + ` --ar 1:1`
  },
  "baya-protection-maternite": {
    category: "parures-bayas-metaux",
    categoryName: "Parures, Bayas & Bagues Magiques",
    title: "Baya Protecteur de Grossesse et Maternité",
    concept: "Baya simple en perles turquoise, perles de terre cuite blanche et perles de bois de santal",
    prompt: `Macro product still life of a simple maternity waist beads strand, composed of small round matte turquoise beads, smooth white terracotta clay beads, and natural light sandalwood beads strung in a clean harmonious rhythm. Coiled gently on a light natural pine surface under bright natural morning daylight. Organic, serene, crisp focus. ` + STRICT_PHOTO_TAGS + ` --ar 1:1`
  },
  "bracelet-fer-forge-gou": {
    category: "parures-bayas-metaux",
    categoryName: "Parures, Bayas & Bagues Magiques",
    title: "Bracelet en Fer Forgé Sacré de Gou",
    concept: "Jonc ouvert simple en fer forgé brut avec extrémités torsadées en spirale",
    prompt: `Extreme macro jewelry packshot of a simple open cuff bracelet made of raw forged dark iron, featuring subtle hammer texture on the plain rounded bar and ends neatly twisted into two small spiral finials. The dark grey iron cuff rests on a light birch block in bright natural white daylight. Raw, honest metallurgical simplicity. ` + STRICT_PHOTO_TAGS + ` --ar 1:1`
  },

  // ==========================================
  // 7. CADENAS & RÉCEPTACLES D'ARGENT (5 PRODUITS)
  // Cadenas ordinaires fermés, taille moyenne, clé ordinaire posée à côté
  // ==========================================
  "cadenas-damour-scelle": {
    category: "cadenas-receptacles-argent",
    categoryName: "Cadenas & Réceptacles d'Argent",
    title: "Cadenas d'Amour Scellé",
    concept: "Cadenas ordinaire fermé en laiton doré de taille moyenne avec sa clé ordinaire posée à côté",
    prompt: `Macro product photograph of a plain standard closed medium-sized golden brass padlock, accompanied by its matching simple brass key resting flat beside it. Clean, unadorned golden brass body with a polished steel shackle. Placed on a light natural oak surface in bright natural white daylight. Crisp metallic reflections, realistic commercial packshot. ` + STRICT_PHOTO_TAGS + ` --ar 1:1`
  },
  "cadenas-fidelite-verrouillage": {
    category: "cadenas-receptacles-argent",
    categoryName: "Cadenas & Réceptacles d'Argent",
    title: "Cadenas de Fidélité et Verrouillage Sexuel",
    concept: "Cadenas ordinaire fermé noir de taille moyenne avec sa clé ordinaire posée à côté",
    prompt: `Macro product photograph of a plain standard closed medium-sized matte black padlock, with its simple black steel key resting beside it. Clean solid black rectangular body and a smooth dark shackle. Resting on a light textured limestone surface under bright natural white daylight. High contrast, sharp detail. ` + STRICT_PHOTO_TAGS + ` --ar 1:1`
  },
  "cadenas-de-justice-proces": {
    category: "cadenas-receptacles-argent",
    categoryName: "Cadenas & Réceptacles d'Argent",
    title: "Cadenas de Justice et de Fermeture de Dossier",
    concept: "Cadenas ordinaire fermé gris fer de taille moyenne avec sa clé ordinaire posée à côté",
    prompt: `Commercial macro product photograph of a plain standard closed medium-sized iron-grey steel padlock, with its single matching steel key resting flat alongside. Solid brushed iron-grey metal body with a clean silver shackle. Displayed on a light walnut wood block under bright natural white daylight. Simple, industrial, tack-sharp. ` + STRICT_PHOTO_TAGS + ` --ar 1:1`
  },
  "cadenas-silence-baillonnement": {
    category: "cadenas-receptacles-argent",
    categoryName: "Cadenas & Réceptacles d'Argent",
    title: "Cadenas de Silence et de Bâillonnement",
    concept: "Cadenas ordinaire fermé en bronze antique de taille moyenne avec sa clé ordinaire posée à côté",
    prompt: `Extreme macro photograph of a plain standard closed medium-sized antique bronze padlock, accompanied by its matching simple antique bronze key. Warm weathered bronze-brown metal body with a subtle aged patina and a solid shackle. Resting on a light travertine stone slab in bright natural white daylight. ` + STRICT_PHOTO_TAGS + ` --ar 1:1`
  },
  "cadenas-financier-anti-depenses": {
    category: "cadenas-receptacles-argent",
    categoryName: "Cadenas & Réceptacles d'Argent",
    title: "Cadenas Financier et Anti-Pertes d'Argent",
    concept: "Cadenas ordinaire fermé doré brillant de taille moyenne avec sa clé ordinaire posée à côté",
    prompt: `Macro product packshot of a plain standard closed medium-sized shiny polished gold padlock, with its shiny matching gold key laying flat next to it. Highly reflective mirror-like golden finish on a clean rectangular body with a polished shackle. Displayed on a light maple desktop in bright natural white daylight. Clean reflections, crisp focus. ` + STRICT_PHOTO_TAGS + ` --ar 1:1`
  },

  // ==========================================
  // 8. PHARMACOPÉE VÉGÉTALE (AGBO) (4 PRODUITS)
  // Contenants ordinaires (verre ambré rugueux / bocal lisse / flacon vert côtelé / fagot raphia)
  // ==========================================
  "bouteille-agbo-vigueur-masculine": {
    category: "pharmacopee-vegetale",
    categoryName: "Pharmacopée Végétale (Agbo)",
    title: "Bouteille d'Agbo Vigueur Masculine",
    concept: "Bouteille ordinaire en verre ambré à surface rugueuse / texture granuleuse avec bouchon de liège",
    prompt: `Commercial macro product photograph of a plain vintage amber glass bottle featuring a distinctive rough, granular textured frosted glass surface, sealed with a simple natural cork stopper. Dark herbal liquid is visible through the textured amber glass catching bright natural white daylight. Standing on a light raw wood table. Tactile glass texture, clean packshot. ` + STRICT_PHOTO_TAGS + ` --ar 1:1`
  },
  "decoction-gynecologique-fertilite": {
    category: "pharmacopee-vegetale",
    categoryName: "Pharmacopée Végétale (Agbo)",
    title: "Décoction Gynécologique de Fertilité",
    concept: "Bocal ordinaire en verre transparent à surface lisse rempli d'une infusion dorée limpide",
    prompt: `Macro still life photograph of a plain, standard round clear glass jar with a completely smooth transparent surface and a plain flat glass lid. The jar contains a clear golden herbal decoction liquid under crisp bright morning daylight. Set on a light pine tabletop with clean light refractions. Minimalist, transparent and pure. ` + STRICT_PHOTO_TAGS + ` --ar 1:1`
  },
  "potion-traditionnelle-sevrage-alcool": {
    category: "pharmacopee-vegetale",
    categoryName: "Pharmacopée Végétale (Agbo)",
    title: "Potion Traditionnelle de Sevrage de l'Alcoolisme",
    concept: "Flacon ordinaire en verre vert forêt à surface côtelée avec bouchon en bois",
    prompt: `Macro product packshot of a standard forest-green glass bottle featuring vertical ribbed fluted glass ridges along its surface, closed with a simple plain wooden stopper. Rich concentrated herbal tonic inside catches daylight highlights along the vertical glass ribs on a light grey stone base. Tactile fluted glass details. ` + STRICT_PHOTO_TAGS + ` --ar 1:1`
  },
  "pack-ecorces-racines-gouro": {
    category: "pharmacopee-vegetale",
    categoryName: "Pharmacopée Végétale (Agbo)",
    title: "Pack d'Écorces et Racines Sacrées Gouro",
    concept: "Fagot de racines fibreuses de Gouro ficelé simplement de raphia brut naturel",
    prompt: `Extreme macro product photograph of a neat bundle of authentic fibrous Gouro medicinal roots, tightly tied together around the middle with natural raw tan raffia fiber string. The textured, knotted woody root bark displays rich organic fibrous grain under bright natural white daylight on a light untreated wood workbench. Highly detailed tactile botanical packshot. ` + STRICT_PHOTO_TAGS + ` --ar 1:1`
  }
};

const BASE_DIR = path.resolve('prompts-generation-images/04-produits');

Object.entries(productPrompts).forEach(([slug, item]) => {
  const categoryDir = path.join(BASE_DIR, item.category);
  if (!fs.existsSync(categoryDir)) {
    fs.mkdirSync(categoryDir, { recursive: true });
  }

  const filePath = path.join(categoryDir, `${slug}.txt`);

  const fileContent = `================================================================================
PROMPT PRODUIT UNIQUE - PACKSHOT MACRO HAUTE DEFINITION (QUALITE PHOTO NATURELLE DE JOUR)
PRODUIT : ${item.title.toUpperCase()}
================================================================================

Rayon Boutique      : ${item.categoryName} (/boutique/${item.category}/)
Produit URL         : /boutique/${item.category}/${slug}/
Concept Visuel      : ${item.concept}

--------------------------------------------------------------------------------
SPECIFICATIONS PHOTOGRAPHIQUES (STRICTEMENT SANS HUMAIN ET SANS TEXTE)
--------------------------------------------------------------------------------
- Type de Plan      : Gros plan macro sur le produit réel et ses matières (Packshot 1:1)
- Éclairage         : Lumière blanche naturelle de jour, reflets nets, ombres douces
- Règle 1           : STRICTEMENT AUCUN HUMAIN, AUCUNE MAIN, AUCUN VISAGE
- Règle 2           : STRICTEMENT AUCUN TEXTE, AUCUNE LETTRE, FLACONS NON ÉTIQUETÉS
- Règle 3           : Design authentique et riche (inspiration parfums orientaux, bagues gravées, savons en bols sculptés)

================================================================================
PROMPT UNIQUE : PACKSHOT PRODUIT (FORMAT CARRE 1:1)
================================================================================
[COPIER-COLLER LE PROMPT CI-DESSOUS] :
${item.prompt}

Paramètres Midjourney : --v 6.1 --style raw --ar 1:1
Résolution DALL-E / gpt-image-2 : 1024x1024 pixels
================================================================================
`;

  fs.writeFileSync(filePath, fileContent, 'utf8');
  console.log(`✅ Prompt réécrit : 04-produits/${item.category}/${slug}.txt`);
});

console.log('\n🎉 Les 35 prompts ont été réécrits à 100% selon vos consignes exactes !');
