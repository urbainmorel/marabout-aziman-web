const fs = require('fs');
const path = require('path');
const ts = require('typescript');

function loadTs(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  const js = ts.transpileModule(code, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const mod = { exports: {} };
  const fn = new Function('exports', 'module', js);
  fn(mod.exports, mod);
  return mod.exports;
}

const servicesData = loadTs(path.resolve('src/data/servicesData.ts'));
const shopData = loadTs(path.resolve('src/data/shopData.ts'));

const hubs = servicesData.servicesHubs;
const shopCats = shopData.boutiqueCategories;

const baseDir = path.resolve('prompts-generation-images');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

const dirs = {
  catServices: path.join(baseDir, '01-categories-services'),
  services: path.join(baseDir, '02-services'),
  catProduits: path.join(baseDir, '03-categories-produits'),
  produits: path.join(baseDir, '04-produits')
};

Object.values(dirs).forEach(ensureDir);

// Standard Photography signature - BRIGHT DAYLIGHT, REAL PHYSICAL OBJECTS, RAW TACTILE TEXTURES, STRICTLY ZERO HUMANS, STRICTLY ZERO TEXT
const STRICT_NO_TEXT_TAGS = "strictly no text, no words, no letters, no numbers, no writing, no watermark, no typography, no fonts, completely unwritten blank surfaces, plain unlabelled unbranded bottles and jars, no logos, strictly no humans, no people, nobody, no hands, no faces, uninhabited scene, empty room, still life composition, shot on modern camera, bright natural white daylight, sharp focus, crystal clear details, raw tactile palpable textures, authentic wood grain, cloth weaving and natural fibers, realistic depth of field, 8k resolution, hyper-realistic, no artificial plastic look, no CGI render, no 3D graphics";

// Service Category visual environments (Table en bois clair, Plage de jour, Forêt ensoleillée, Sentier naturel - STRICTEMENT ZERO TEXTE, ZERO HUMAINS, LUMIERE BLANCHE NATURELLE)
const serviceCategoryPrompts = {
  'amour-sentiments': {
    searchQuery: "marabout africain rituel retour affectif cadenas amour cauris pinterest",
    visualContext: "Composition rituelle d'amour en lumière naturelle de jour SANS AUCUN HUMAIN ET SANS AUCUN TEXTE : table en bois clair près d'une fenêtre ensoleillée, deux statuettes votives traditionnelles en bois sculpté liées face à face par des fils de coton rouge et blanc, cadenas en laiton scellé à la cire d'abeille, pétales de roses séchées, coupelle en terre cuite de miel sauvage doré et cauris sacrés, ou plage océanique lumineuse en plein jour.",
    p1: {
      title: "Autel d'amour sacré et statuettes votives enlacées (Lumière naturelle de jour - Zéro texte)",
      desc: "Autel rituel d'amour complet sans présence humaine et sans aucun texte en plein jour.",
      env: "Table en bois clair près d'une fenêtre ensoleillée / Autel sculpté",
      prompt: `Crisp daytime documentary photograph of an authentic traditional West African love ritual setup, inspired by genuine ethnological photography on Pinterest. On a rustic light solid wood table by a bright sunlit window with natural white daylight, two traditional hand-carved wooden figurines stand face to face, tightly bound together with red and white braided cotton cords. In front of them lies an antique plain brass padlock consecrated with drips of red beeswax, surrounded by lustrous white sea cowrie shells, dried pink hibiscus and rose petals, and a small rustic terracotta bowl of golden wild honey. Clean bright ambiance, sharp natural shadows on the wood grain. ${STRICT_NO_TEXT_TAGS} --ar 16:9`
    },
    p2: {
      title: "Macro sur le cadenas d'amour en laiton, cire rouge et cauris (Plein jour - Zéro texte)",
      desc: "Gros plan macro sur le cadenas rituel de fidélité et nœuds sacrés en lumière blanche sans aucun texte.",
      env: "Macro table en bois clair",
      prompt: `Extreme macro documentary photograph of an authentic African love lock ritual setup, inspired by esoteric still life collections on Pinterest. An antique plain hand-forged brass padlock, intricately wrapped in natural crimson cotton threads and tied to two sacred white cowrie shells. Golden droplets of pure wild honey glisten on the metal shackle beside dried floral petals. Clear bright directional daylight illuminating the metal patina, rough thread fibers and rustic wood texture. Tack-sharp focal plane, exquisite tactile details. ${STRICT_NO_TEXT_TAGS} --ar 4:3`
    },
    p3: {
      title: "Offrande d'amour rituelle sur une plage océanique sauvage en plein jour (Zéro texte)",
      desc: "Scène rituelle en milieu naturel côtier lumineux sans aucun humain et sans aucun texte.",
      env: "Plage océanique sauvage ensoleillée",
      prompt: `Luminous fine art coastal photograph of an African love ritual offering on a deserted Atlantic ocean beach in bright daytime sunlight. On clean golden wet sand near gentle crystal-clear foaming surf rests a hand-woven palm-leaf basket containing two small bound wooden lover figurines, pristine white cowrie shells, red rose petals, and two clear plain glass lanterns with white candles. Sparkling ocean waves, clear blue sky, misty coastal horizon. ${STRICT_NO_TEXT_TAGS} --ar 16:9`
    }
  },
  'richesse-finance': {
    searchQuery: "marabout africain portefeuille magique calebasse multiplication argent richesse pinterest",
    visualContext: "Autel de prospérité ouest-africaine en lumière du jour SANS HUMAIN ET SANS TEXTE (aucun billet écrit, aucune lettre) : canari en terre cuite et calebasse sacrée ornée de cauris, jetons de laiton dorés polis et cauris posés sur natte de raphia tressée, feuilles sacrées, ou composition au pied d'un grand arbre en forêt ensoleillée.",
    p1: {
      title: "Calebasse sacrée d'abondance et canari de richesse débordant de cauris et jetons dorés (Zéro texte)",
      env: "Natte de raphia sur table en bois clair en plein jour",
      prompt: `Crisp daytime documentary photograph of an authentic traditional African prosperity altar, inspired by wealth consecration imagery on Pinterest. A dark consecrated terracotta pot (canari) and an aged smoked calabash overflowing with dozens of authentic African sea cowries, raw sparkling gold dust flakes, polished blank golden bronze tokens with no markings, and dried green sacred herbs, placed on a light hand-woven raffia mat in bright natural white daylight. Clean luminous room, crystal-clear details on natural materials. ${STRICT_NO_TEXT_TAGS} --ar 16:9`
    },
    p2: {
      title: "Macro sur la bourse talismanique en cuir camel et cauris sacrés (Zéro texte)",
      env: "Macro table de chêne clair en lumière naturelle",
      prompt: `Extreme macro close-up of a consecrated African wealth talisman leather pouch, inspired by Pinterest occult still lifes. Hand-stitched plain camel-brown leather pouch with smooth raw grain and zero text, surrounded by lustrous white cowrie shells, polished round bronze discs without numbers or letters, and glistening natural magnetic lodestones on a woven raffia mat. Bright natural white window daylight illuminating the coarse saddle-stitching, powdery golden dust, and aged leather grain. Tack-sharp focal point. ${STRICT_NO_TEXT_TAGS} --ar 4:3`
    },
    p3: {
      title: "Offrande de prospérité au pied d'un grand arbre sacré en forêt ensoleillée (Zéro texte)",
      env: "Forêt tropicale ensoleillée / Grand arbre Iroko",
      prompt: `Luminous natural environment photograph of a traditional wealth offering placed at the moss-covered root base of a giant sacred Iroko tree in a lush green sunlit forest. A small smoked calabash bowl containing white cowries, polished blank brass discs, and golden yellow flowers rests nestled between giant tree roots. Bright morning sunbeams piercing through the dense jungle canopy, illuminating fresh dew drops on green leaves. Peaceful, majestic, sacred nature. ${STRICT_NO_TEXT_TAGS} --ar 16:9`
    }
  },
  'commerce-carriere-reussite': {
    searchQuery: "marabout africain reussite professionnelle commerce attirance clientele autorite klaman pinterest",
    visualContext: "Scène d'autorité et réussite en lumière de jour SANS HUMAIN ET SANS TEXTE : canne de commandement en laiton sur étoffe royale Kente, poudres végétales dorées, noix de kola fraîches, ou seuil de porte ancienne en pierre ensoleillée sans aucune écriture.",
    p1: {
      title: "Autel royal de commandement, canne en laiton et noix de kola (Plein jour - Zéro texte)",
      env: "Table en bois noble près d'une grande fenêtre lumineuse",
      prompt: `Documentary daytime photograph of an authentic West African royal authority and career success altar, inspired by Google image searches. An ornate consecrated staff of leadership in cast brass rests across a royal hand-woven colourful geometric pattern Kente textile on a light wooden table. Beside it lies an open carved wooden chest containing dried red and white kola nuts, royal baobab bark strips, and white chalk sticks under bright natural white daylight. Crisp focus, vibrant colors, rich palpable textures. ${STRICT_NO_TEXT_TAGS} --ar 16:9`
    },
    p2: {
      title: "Macro sur la poudre d'autorité dorée Klaman et fiole d'huile (Zéro texte)",
      env: "Macro pierre naturelle en lumière directe de jour",
      prompt: `Macro daytime photograph of consecrated leadership ingredients, inspired by Pinterest esoteric collections. A small hand-carved horn scoop pouring fine golden-brown Klaman authority powder onto an aged blank parchment sheet with zero writing or letters. An unlabelled antique amber glass oil dropper bottle and two pristine white cowrie shells catching bright natural white sunlight against a textured grey slate background. Incredibly crisp micro-textures. ${STRICT_NO_TEXT_TAGS} --ar 4:3`
    },
    p3: {
      title: "Seuil de pierre d'un commerce ancien parsemé de poudre d'attraction ensoleillé (Zéro texte)",
      env: "Seuil de porte en pierre ancienne baigné de soleil",
      prompt: `Sensory architectural daytime photograph focused on the rustic stone doorstep and threshold of a historic building with a massive carved oak wooden door without any signs, posters or text. A delicate line of consecrated golden herbal attraction powder and dried botanical spices is scattered along the doorstep flagstones. Bright morning sunlight grazing the stone textures, cast bronze door handles and clean crisp shadows. ${STRICT_NO_TEXT_TAGS} --ar 16:9`
    }
  },
  'divination-voyance': {
    searchQuery: "marabout africain consultation voyance plateau fa opon ifa chapelet opele cauris pinterest",
    visualContext: "Scène divinatoire traditionnelle en lumière blanche de jour SANS HUMAIN ET SANS TEXTE : plateau circulaire sculpté Opon Ifá poudré de sciure sacrée Irosun avec motifs géométriques abstraits non textuels, chapelet de voyance Opele, noix de palme sacrées Ikin, sur natte de paille ensoleillée.",
    p1: {
      title: "Plateau divinatoire sacré Opon Ifá, chapelet Opèlè et noix d'Ikin (Plein jour - Zéro texte)",
      env: "Natte de paille près d'une fenêtre lumineuse",
      prompt: `Masterpiece documentary daytime photograph of an authentic sacred Fâ divination tray (Opon Ifá), inspired by museum collections and Pinterest. On an authentic hand-woven straw mat in a clean bright room with natural white daylight rests a large circular carved wooden Opon Ifá tray covered in pale yellow Irosun powder with abstract geometric tribal line carvings. Beside the tray lies an antique carved wooden tapper (Iroke Ifá), a bronze divination chain (Opèle) with seed pod halves, and sixteen sacred palm nuts (Ikin). High clarity, clean natural shadows, absolutely zero letters or writing. ${STRICT_NO_TEXT_TAGS} --ar 16:9`
    },
    p2: {
      title: "Macro sur le tirage des 16 cauris sacrés sur étoffe indigo (Lumière de jour - Zéro texte)",
      env: "Macro étoffe Adire indigo en lumière blanche",
      prompt: `Top-down macro daytime photograph of sixteen consecrated African divination cowrie shells cast on an authentic indigo-dyed geometric pattern adire cotton textile with zero text, inspired by Google images of African divination. The ivory shells lie naturally in their landing positions, showing open and closed faces. An antique plain cast bronze ring lies among the cowrie shells. Bright natural daylight creating crisp shell textures, fabric weave, and clean reflections. ${STRICT_NO_TEXT_TAGS} --ar 4:3`
    },
    p3: {
      title: "Sanctuaire de voyance au bord d'un ruisseau sacré en forêt ensoleillée (Zéro texte)",
      env: "Bord de ruisseau en sous-bois lumineux",
      prompt: `Serene outdoor daytime photograph of a traditional divination setup on a flat mossy river stone beside a gently flowing clear forest stream. A carved round wooden divination tray with cowrie shells and small herbal offerings sits under the bright dappled sunlight of tall bamboo and wild ferns. Sunbeams filtering through leaves, sparkling water reflections, peaceful natural sanctuary ambiance. ${STRICT_NO_TEXT_TAGS} --ar 16:9`
    }
  },
  'protection-desenvoutement': {
    searchQuery: "marabout africain rituel desenvoutement protection mauvaise oeil contre sorcellerie pinterest",
    visualContext: "Cérémonie de désenvoûtement et protection en lumière naturelle SANS HUMAIN ET SANS TEXTE : cercle de craie blanche sacrée (Efun) tracé au sol, bol d'eau lustrale aux citrons verts et hysope, corne de bélier protectrice scellée de cire, ou autel sur sentier de terre en plein jour.",
    p1: {
      title: "Cercle protecteur d'Efun, eau lustrale et corne de bélier consacrée (Lumière de jour - Zéro texte)",
      env: "Sol en terre cuite dans une pièce baignée de lumière blanche",
      prompt: `Crisp daytime documentary photograph of a sacred African spiritual uncrossing and protection setup, inspired by Pinterest spiritual purification imagery. On a clean terracotta tile floor in bright white natural daylight, an authentic protective sacred circle is traced with pure white eggshell chalk (Efun). Inside stands a rustic terracotta bowl with crystal-clear lustral water infused with fresh green hyssop leaves, sliced limes, and coarse sea salt. An antique curved ram's horn amulet plugged with dark beeswax rests nearby on a light reed mat. Clear bright atmosphere, high dynamic range. ${STRICT_NO_TEXT_TAGS} --ar 16:9`
    },
    p2: {
      title: "Macro sur la corne de bélier protectrice, clous forgés et cire (Plein jour - Zéro texte)",
      env: "Macro dalle de granit clair en lumière naturelle",
      prompt: `Macro daytime photograph of an authentic African protective war amulet, inspired by Google Image searches for marabout talismans. A heavy antique curved ram's horn plugged with protective beeswax, iron nails, and cowrie shells, resting beside a triangular plain red and black leather gris-gris amulet with zero text. A heap of coarse black shielding powder (Gblon) rests on a light grey stone slab in bright natural white daylight. Razor-sharp textures of aged horn ridges, weathered leather stitching, and rough mineral grains. ${STRICT_NO_TEXT_TAGS} --ar 4:3`
    },
    p3: {
      title: "Récipient de purification au croisement d'un sentier de terre rouge en plein jour (Zéro texte)",
      env: "Croisement de sentier en terre rouge ensoleillé",
      prompt: `Luminous daytime landscape photograph of a traditional protective purification offering placed at the fork of a red clay dirt trail in the sunny countryside. An earthenware bowl with fragrant herbal leaves and sea salt sits on the red earth beside white cowrie shells. Tall green savannah grasses and wild acacia trees under a bright clear blue sky, peaceful, grounding, completely unpopulated. ${STRICT_NO_TEXT_TAGS} --ar 16:9`
    }
  },
  'sante-traditionnelle': {
    searchQuery: "marabout africain pharmacopee traditionnelle agbo tisanes ecorces fertilite pinterest",
    visualContext: "Atelier d'herboriste traditionnel en lumière naturelle SANS HUMAIN ET SANS TEXTE : bouteilles d'Agbo en verre ambré totalement lisses sans étiquette, mortier en bois avec herbes fraîches pilées, fagots d'écorces Gouro ficelés de raphia, ou clairière forestière aux plantes médicinales.",
    p1: {
      title: "Dispensaire d'apothicaire végétal, macérations d'Agbo et mortier en bois (Plein jour - Zéro texte)",
      env: "Atelier d'herboristerie rustique baigné de soleil",
      prompt: `Documentary daytime photograph inside an authentic West African herbal dispensary, inspired by traditional pharmacopeia archives on Pinterest. Rows of vintage plain amber glass demijohn bottles without any labels or text, filled with amber-colored medicinal root infusions (Agbo). On a rough-hewn light wooden bench rests an antique hand-carved mortar and pestle holding crushed fresh green healing herbs, surrounded by bundles of wild roots, dried Gouro barks tied with raffia, and whole dried gourds in bright natural daylight. Crisp focus, rich organic textures. ${STRICT_NO_TEXT_TAGS} --ar 16:9`
    },
    p2: {
      title: "Macro sur les racines noueuses de Gouro et fiole d'élixir médicinal (Lumière de jour - Zéro texte)",
      env: "Macro bois brut en lumière blanche",
      prompt: `Extreme macro close-up of authentic West African medicinal roots and fertility barks, inspired by Pinterest herbalist photography. Knotted fibrous roots of wild Gouro bark tied with natural raffia twine, displayed next to dried calabar beans, yellow ginger slices, and a small plain clay crucible filled with concentrated herbal extract under bright natural white daylight. Intricate bark crevices, rough fibers, and glistening botanical oils. Superb tactile fidelity. ${STRICT_NO_TEXT_TAGS} --ar 4:3`
    },
    p3: {
      title: "Compositions botaniques médicinales en pleine clairière forestière ensoleillée (Zéro texte)",
      env: "Clairière verdoyante ensoleillée",
      prompt: `Beautiful natural botanical daytime photograph set in a vibrant sunlit rainforest clearing. A large flat timber slab holds earthenware jars of herbal decoctions, freshly harvested medicinal jungle leaves with morning dew drops, bundles of dried roots, and wild honeycombs. Bright sunlight breaking through the leafy canopy, lush emerald ferns, pure organic vitality. ${STRICT_NO_TEXT_TAGS} --ar 16:9`
    }
  },
  'justice-proces-litiges': {
    searchQuery: "marabout africain rituel justice cadenas proces faire taire temoin dossier penal pinterest",
    visualContext: "Rituel judiciaire maraboutique en lumière de jour SANS HUMAIN ET SANS TEXTE (aucun document écrit, aucun mot) : cadenas en fer forgé scellé à la cire et ficelé de fil de coton, canari en terre cuite rempli de miel doré adoucissant, rouleau de papyrus vierge non écrit lié par cordelette, sur table de chêne clair.",
    p1: {
      title: "Cadenas de justice en fer forgé scellé, bol de miel et rouleau vierge lié (Plein jour - Zéro texte)",
      env: "Table en chêne clair en lumière naturelle de jour",
      prompt: `Crisp documentary daytime photograph of an authentic African judicial resolution and victory ritual setup, inspired by esoteric traditions on Pinterest. On a solid light oak table in bright natural white daylight, a heavy antique plain hand-forged black iron padlock is wrapped tightly with sacred black and white braided cotton cords. In front of it sits a terracotta bowl filled with pure golden wild honey, and a blank clean unwritten rolled papyrus parchment scroll tied with natural raffia string. Clean bright lighting, sharp metallic and natural fiber textures, absolutely zero writing or text. ${STRICT_NO_TEXT_TAGS} --ar 16:9`
    },
    p2: {
      title: "Macro sur le cadenas de justice scellé à la cire et aiguilles d'acier (Lumière blanche - Zéro texte)",
      env: "Macro pierre claire en plein jour",
      prompt: `Macro daytime photograph of a consecrated judicial silencing padlock charm, inspired by Google images of African justice charms. The rough black iron padlock is sealed with plain smooth red sealing wax, entwined with two consecrated steel needles through cotton fiber cords. Bright natural daylight highlighting the metallic pitting of the forged iron and the glossy texture of the wax seal. Extreme photographic precision, zero text. ${STRICT_NO_TEXT_TAGS} --ar 4:3`
    },
    p3: {
      title: "Autel de justice rituel sur un promontoire rocheux naturel en plein jour (Zéro texte)",
      env: "Promontoire rocheux baigné de soleil",
      prompt: `Fine art landscape daytime photograph of a judicial protection altar situated on a flat rocky outcrop under a bright sunny sky. A dark iron padlock bound with white cords, pristine sea cowries, and small clay offering vessels arranged neatly on the granite stone. Distant green rolling hills under the clear blue sky, solemn serenity. ${STRICT_NO_TEXT_TAGS} --ar 16:9`
    }
  },
  'immigration-titres-sejour-visas': {
    searchQuery: "marabout africain rituel papiers prefecture titre de sejour visa passeport pinterest",
    visualContext: "Cérémonie d'ouverture de voie et déblocage en plein jour SANS HUMAIN ET SANS TEXTE (aucun passeport écrit, aucun document avec lettres) : carnet vierge en cuir artisanal sans inscription, bol d'eau lustrale aux fleurs blanches de jasmin, poudres dorées et cauris blancs sur table en bois clair.",
    p1: {
      title: "Autel d'ouverture de chemin administratif, bol aux fleurs de jasmin et carnet vierge en cuir (Plein jour - Zéro texte)",
      env: "Table en bois clair baignée de soleil près d'une fenêtre",
      prompt: `Documentary daytime photograph of an authentic African road-opening and success altar, inspired by Pinterest spiritual photos. On a bright woven geometric ceremonial altar cloth rests a blank unwritten handmade brown leather notebook closed with raw cord and completely free of any text, letters or logos. Beside it sits pristine white sea cowries and a rustic terracotta bowl of clear spring water with floating fresh white jasmine flowers. Small heaps of golden attraction botanical powders and white chalk sticks catch bright natural white daylight streaming through a large window. Clean, uplifting, crisp details. ${STRICT_NO_TEXT_TAGS} --ar 16:9`
    },
    p2: {
      title: "Macro sur la fiole de poudre dorée Klaman et cauris sacrés (Lumière de jour - Zéro texte)",
      env: "Macro bureau en bois clair en plein jour",
      prompt: `Macro top-down daytime photograph of success items on a light wooden desk, inspired by Pinterest esoteric still life. An open miniature unlabelled clear glass vial of sparkling golden Klaman authority powder sits on a clean blank piece of handmade parchment with zero writing or letters. Two pristine white cowrie shells catch bright natural white daylight. Tack-sharp focus on the paper texture, glass reflections, and delicate botanical powder granules. ${STRICT_NO_TEXT_TAGS} --ar 4:3`
    },
    p3: {
      title: "Cérémonie d'ouverture de route sur un sentier ensoleillé en plein jour (Zéro texte)",
      env: "Sentier tropical bordé de palmiers sous un ciel ensoleillé",
      prompt: `Luminous daytime landscape photograph of a traditional road-opening blessing setup along an outdoor dirt path lined with wild green palms and white lilies. On a woven natural reed mat rests an earthenware pitcher of consecrated water, a bowl of white cowrie shells, and yellow marigold flowers catching radiant morning sunlight. Bright atmosphere of new beginnings and open roads. ${STRICT_NO_TEXT_TAGS} --ar 16:9`
    }
  }
};

// 1. Generate 01-categories-services (8 TXT files)
hubs.forEach((hub, idx) => {
  const num = String(idx + 1).padStart(2, '0');
  const filename = `${num}-${hub.silo}.txt`;
  const filePath = path.join(dirs.catServices, filename);
  const data = serviceCategoryPrompts[hub.silo];

  const content = `================================================================================
PROMPTS IMAGES ULTRA-REALISTES - QUALITE PHOTO DE JOUR NATURELLE (STRICTEMENT ZERO HUMAIN, ZERO TEXTE)
CATEGORIE DE SERVICES : ${hub.name.toUpperCase()}
================================================================================

Rayon URL           : /services/${hub.silo}/
Titre SEO           : ${hub.title}
Recherche Source    : "${data.searchQuery}" (Google Images & Pinterest)
Contexte Visuel     : ${data.visualContext}

--------------------------------------------------------------------------------
SPECIFICATIONS TECHNIQUES PHOTOGRAPHIQUES (STRICTEMENT SANS HUMAIN ET SANS TEXTE)
--------------------------------------------------------------------------------
- Appareil Photo    : Appareil moderne haute résolution / iPhone 17 Pro Max 48MP ProRAW
- Style Visuel      : Photo nette de jour, objets réels posés sur table ou extérieur naturel
- Eclairage         : Lumière blanche naturelle, textures brutes et palpables, style lumineux
- Regle Absolue 1   : AUCUN HUMAIN, AUCUN MARABOUT, AUCUNE MAIN, NATURE MORTE EXCLUSIVE
- Regle Absolue 2   : AUCUN TEXTE, AUCUN MOT, AUCUNE LETTRE, AUCUN CHIFFRE, FLACONS NON ETIQUETES
- Environnements    : Table en bois clair, bord de fenêtre, plage ensoleillée, forêt lumineuse (SANS couvent)

================================================================================
PROMPT 1 : AMBIANCE RITUELLE IMMERSIVE EN SANCTUAIRE (HERO BANNER 16:9)
================================================================================
Description : ${data.p1.title}
Environnement: ${data.p1.env}
Format      : Format panoramique 16:9 pour la bannière principale

[COPIER-COLLER LE PROMPT CI-DESSOUS] :
${data.p1.prompt}

Parametres Midjourney : --v 6.1 --style raw --ar 16:9
Resolution Flux / SD  : 1536x1024 pixels

================================================================================
PROMPT 2 : GROS PLAN MACRO & MATIERES SACREES (VIGNETTE & DETAIL 4:3)
================================================================================
Description : ${data.p2.title}
Environnement: ${data.p2.env}
Format      : Format 4:3 pour l'encart d'explication des rituels ancestraux

[COPIER-COLLER LE PROMPT CI-DESSOUS] :
${data.p2.prompt}

Parametres Midjourney : --v 6.1 --style raw --ar 4:3
Resolution Flux / SD  : 1024x1024 pixels

================================================================================
PROMPT 3 : SCENE RITUELLE EN ENVIRONNEMENT NATUREL (PLAGE / FORET / SENTIER 16:9)
================================================================================
Description : ${data.p3.title}
Environnement: ${data.p3.env}
Format      : Format 16:9 pour l'ambiance et la réassurance

[COPIER-COLLER LE PROMPT CI-DESSOUS] :
${data.p3.prompt}

Parametres Midjourney : --v 6.1 --style raw --ar 16:9
Resolution Flux / SD  : 1536x1024 pixels
================================================================================
`;

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Created (DAYLIGHT ZERO-TEXT NO HUMANS): 01-categories-services/${filename}`);
});

// 2. Generate 02-services (8 subfolders, 32 TXT files - ZERO HUMANS, ZERO TEXT)
hubs.forEach(hub => {
  const subDirPath = path.join(dirs.services, hub.silo);
  ensureDir(subDirPath);

  hub.subservices.forEach(sub => {
    const filename = `${sub.slug}.txt`;
    const filePath = path.join(subDirPath, filename);
    const cleanTitle = sub.title.split(':')[0].trim();
    const searchQuery = `marabout africain ${cleanTitle.toLowerCase()} autel rituel sacre pinterest`;

    const p1_text = `Crisp daytime documentary photograph of an authentic consecrated altar setup for ${cleanTitle}, inspired by traditional African spiritual shrines on Pinterest. On a solid light wooden table near a bright sunlit window with natural white daylight, consecrated traditional artifacts specific to ${cleanTitle} (plain carved wood, sacred cowries, unengraved brass charms and herbal bowls) are neatly arranged on a clean woven reed mat. High clarity, sharp details, clean background. ${STRICT_NO_TEXT_TAGS} --ar 16:9`;

    const p2_text = `Macro daytime photograph of the consecrated spiritual instruments and natural botanical ingredients dedicated to ${cleanTitle}, inspired by top Pinterest ritual still life photography. Consecrated plain brass charms, pristine white sea cowries, sacred braided red-and-white cords, and natural powdered herbal mixtures arranged on light weathered wood. Tack-sharp focus on the raw textures, glistening consecrated oils, and natural fibers under bright natural white daylight. ${STRICT_NO_TEXT_TAGS} --ar 4:3`;

    const p3_text = `Luminous environmental daytime photograph of a sacred spiritual offering for ${cleanTitle} placed in a pristine outdoor natural setting (sunlit mossy forest clearing at the base of a sacred tree, or quiet secluded ocean beach). A rustic earthenware bowl, small clay offering vessels, and pristine white cowrie shells catching bright natural sunlight. Peaceful, pristine, organic nature. ${STRICT_NO_TEXT_TAGS} --ar 16:9`;

    const content = `================================================================================
PROMPTS IMAGES ULTRA-REALISTES - QUALITE PHOTO DE JOUR NATURELLE (STRICTEMENT ZERO HUMAIN, ZERO TEXTE)
SERVICE : ${cleanTitle.toUpperCase()}
================================================================================

Categorie Parente   : ${hub.name} (/services/${hub.silo}/)
Service URL         : /services/${hub.silo}/${sub.slug}/
Titre de la Page    : ${sub.title}
Mots-cles Cibles    : ${sub.keywords}
Recherche Source    : "${searchQuery}" (Google Images & Pinterest)

--------------------------------------------------------------------------------
SPECIFICATIONS TECHNIQUES PHOTOGRAPHIQUES (STRICTEMENT SANS HUMAIN ET SANS TEXTE)
--------------------------------------------------------------------------------
- Appareil Photo    : Appareil moderne haute résolution / iPhone 17 Pro Max 48MP
- Style Visuel      : Photo nette de jour, objets réels posés sur table ou extérieur naturel
- Eclairage         : Lumière blanche naturelle, textures brutes et palpables
- Regle Absolue 1   : AUCUN HUMAIN, AUCUN MARABOUT, AUCUNE MAIN, NATURE MORTE EXCLUSIVE
- Regle Absolue 2   : AUCUN TEXTE, AUCUN MOT, AUCUNE LETTRE, AUCUN CHIFFRE, FLACONS NON ETIQUETES
- Environnements    : Table en bois clair, plage ensoleillée, forêt lumineuse, sentier naturel (SANS couvent)

================================================================================
PROMPT 1 : AUTEL SACRE EN SANCTUAIRE (HERO SECTION 16:9)
================================================================================
Objectif : Illustrer le dispositif rituel consacré sur table en bois clair sans aucun humain et sans aucun texte.
Format   : Format 16:9 pour l'en-tête de la page de service.

[COPIER-COLLER LE PROMPT CI-DESSOUS] :
${p1_text}

Parametres Midjourney : --v 6.1 --style raw --ar 16:9
Resolution Flux / SD  : 1536x1024 pixels

================================================================================
PROMPT 2 : GROS PLAN MACRO SUR LES SUPPORTS SACRES & CONSECRATIONS (4:3)
================================================================================
Objectif : Mettre en valeur les objets consacrés (cauris, talismans, fils, poudres) sans écriture.
Format   : Format 4:3 pour la section méthodologie et déroulement.

[COPIER-COLLER LE PROMPT CI-DESSOUS] :
${p2_text}

Parametres Midjourney : --v 6.1 --style raw --ar 4:3
Resolution Flux / SD  : 1024x1024 pixels

================================================================================
PROMPT 3 : SCENE D'OFFRANDE RITUELLE EN NATURE SAUVAGE (16:9)
================================================================================
Objectif : Montrer la dimension naturelle et ancestrale (forêt, plage, sentier).
Format   : Format 16:9 pour la sérénité et la réassurance.

[COPIER-COLLER LE PROMPT CI-DESSOUS] :
${p3_text}

Parametres Midjourney : --v 6.1 --style raw --ar 16:9
Resolution Flux / SD  : 1536x1024 pixels
================================================================================
`;

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Created (DAYLIGHT ZERO-TEXT NO HUMANS): 02-services/${hub.silo}/${filename}`);
  });
});

// 3. Generate 03-categories-produits (8 TXT files - ZERO HUMANS, ZERO TEXT)
const productCatData = {
  'savons': {
    searchQuery: "marabout africain savon noir ose dudu chance desenvoutement attraction pinterest",
    visualContext: "Savons noirs artisanaux Ose Dudu sur bois clair en lumière du jour, pots en verre ambré épurés SANS AUCUNE ETIQUETTE NI TEXTE, éponge végétale kaffo, agrumes frais, aucune présence humaine.",
    p1: `Luxury daytime product still life photograph of authentic African black soaps (Ose Dudu), inspired by Pinterest artisanal cosmetics. Sleek plain matte amber glass jars completely unlabelled with blank smooth lids arranged on a rustic light mahogany board under bright natural white daylight. One open jar showcases the dense, glossy dark herbal paste infused with wild honey and sacred barks. Beside the jars rests a natural vegetal loofah sponge (Kaffo) and fresh yellow lime slices. Crisp, clean organic spa aesthetic, strictly unbranded with zero text. ${STRICT_NO_TEXT_TAGS} --ar 16:9`,
    p2: `Extreme macro close-up photograph of genuine sacred African black soap, inspired by Pinterest texture photography. Rich, viscous, dark herbal paste glistening under bright white daylight, showing micro-particles of crushed cocoa pod ash, golden raw honey swirls, and medicinal root flakes. Water droplets clinging to the natural loofah fibers nearby. Incomparable tactile depth and razor-sharp macro focus, completely devoid of text. ${STRICT_NO_TEXT_TAGS} --ar 1:1`,
    p3: `Outdoor botanical product photograph of consecrated African black soap in an unlabelled amber jar resting on a mossy forest stone beside a sunlit fresh mountain stream. Flowing clear water in the background, green tropical ferns, bright morning sunlight creating water caustics on the stone. Pristine, organic, pure. ${STRICT_NO_TEXT_TAGS} --ar 16:9`
  },
  'eaux': {
    searchQuery: "marabout africain eau sacree lustrale 7 marigots premier orage purification pinterest",
    visualContext: "Flacons d'eaux sacrées lustrales en verre clair lisse SANS AUCUNE ETIQUETTE NI TEXTE sur pierre ou au bord de l'océan en plein jour, aucune présence humaine.",
    p1: `Crisp daytime still life photograph of consecrated sacred waters, inspired by Pinterest spiritual apothecary photography. Clear plain vintage glass medicine bottles with natural cork stoppers, entirely smooth without any labels or writing, containing pristine consecrated waters, displayed on a smooth grey river stone under bright natural white daylight. Fresh sprigs of green hyssop and white sea cowries catching clean sunlight refractions. Serene, pure setting. ${STRICT_NO_TEXT_TAGS} --ar 16:9`,
    p2: `Ultra-macro daytime photograph of an artisanal plain glass dropper bottle filled with consecrated water, inspired by fine art fluid photography on Pinterest. Tiny suspended microscopic air bubbles inside the crystal-clear liquid catching bright daylight refractions. A single pure droplet hangs suspended from the pipette tip above a light terracotta bowl. Tack-sharp focus on the droplet, exquisite glass details, zero text. ${STRICT_NO_TEXT_TAGS} --ar 1:1`,
    p3: `Coastal environmental product photograph of unbranded glass water bottles resting on wet golden sand at a wild Atlantic ocean beach in bright morning sunlight. Crisp blue sky, delicate ocean seafoam gently lapping near the glass base, pristine daytime light. ${STRICT_NO_TEXT_TAGS} --ar 16:9`
  },
  'parfums-macerations': {
    searchQuery: "marabout africain parfum bint el sudan dangoma attraction amour seduction pinterest",
    visualContext: "Flacons de parfum et macérations en verre ambré SANS AUCUNE ETIQUETTE NI ECRITURE sur tissu clair et bois précieux en lumière de jour, sans aucun humain.",
    p1: `Daytime luxury still life of consecrated African spiritual perfume flacons, inspired by Pinterest esoteric luxury beauty. Traditional plain vintage glass bottles alongside dark unlabelled amber glass dropper vials of golden attraction elixirs, displayed on a light linen textile and polished wood under bright natural white daylight. Whole cinnamon sticks, tonka beans, and fragrant frankincense tears scattered gracefully around. Crisp luminous reflections, strictly zero text or labels. ${STRICT_NO_TEXT_TAGS} --ar 16:9`,
    p2: `Extreme macro close-up of an ornate plain vintage glass flacon filled with amber consecrated attraction oil, inspired by Pinterest macro perfume shots. Submerged within the oil are delicate shavings of sacred love roots and fine gold leaf flecks illuminated by bright natural window daylight. Crystal-clear liquid fidelity, smooth glass surface with no labels or text. ${STRICT_NO_TEXT_TAGS} --ar 1:1`,
    p3: `Sensory daytime still life photograph of plain unlabelled perfume vials displayed on an antique carved sandalwood tray beside dried red rosebuds near a sunlit window inside an elegant peaceful room. Bright natural daylight, clean tranquil aesthetic. ${STRICT_NO_TEXT_TAGS} --ar 16:9`
  },
  'poudres-terres-sacrees': {
    searchQuery: "marabout africain poudre noire blindage gblon terre carrefour klaman pinterest",
    visualContext: "Calebasses et coupelles de poudres rituelles sacrées (Gblon, Klaman, Osun, Efun) sur table en bois clair en plein jour SANS AUCUN TEXTE, sans humain.",
    p1: `Documentary daytime still life of traditional West African sacred powders, inspired by authentic shrine imagery on Pinterest. Small polished half-calabashes and terracotta saucers containing contrasting ceremonial powders: velvety pitch-black shielding powder (Gblon), red camwood powder (Osun), pure white chalk powder (Efun), and golden-brown bark dust. Displayed on a light wood table with miniature plain brass spoons under bright natural white daylight. ${STRICT_NO_TEXT_TAGS} --ar 16:9`,
    p2: `Ultra-macro daytime photograph of consecrated African protective black powder (Gblon) resting inside a smooth coconut shell bowl, inspired by Google macro searches. Micro-particles of charred medicinal barks, crushed roasted seashells, and subtle mineral glints visible in extreme close-up under bright natural white daylight. High contrast and razor-sharp palpable textures, zero text. ${STRICT_NO_TEXT_TAGS} --ar 1:1`,
    p3: `Outdoor daytime still life photograph of consecrated botanical threshold attraction powder sprinkled in an elegant line across ancient stone flagstones at the entrance of a historic wooden doorway. Bright morning sunlight grazing the stone texture, highlighting individual powder grains. ${STRICT_NO_TEXT_TAGS} --ar 16:9`
  },
  'talismans-cuir-gris-gris': {
    searchQuery: "marabout africain talisman cuir gris-gris corne belier gbekoun protection pinterest",
    visualContext: "Talismans traditionnels ouest-africains en cuir tanné (gris-gris cousus main, cornes de bélier, médaillons) SANS AUCUNE LETTRE NI ECRITURE sur bois clair en lumière de jour, sans humain.",
    p1: `Documentary daytime still life of authentic West African leather talismans (Gris-Gris & Gbekoun), inspired by African talismanic art on Pinterest. A collection of hand-stitched camel, black and red goatskin amulets with purely abstract geometric leather stitching and zero writing, an antique curved ram's horn talisman with cowrie shells, and braided leather neck cords laid neatly on a light weathered wood plank in bright natural white daylight. Tangible leather grain, exquisite handcraft details. ${STRICT_NO_TEXT_TAGS} --ar 16:9`,
    p2: `Macro daytime photograph of an authentic plain leather Gris-Gris protection amulet, inspired by Google Image macro searches. Tight saddle-stitching with thick natural cord, smooth unwritten vegetable-tanned leather, and a polished white sea cowrie tied to the corner. Bright daylight revealing every pore and furrow in the aged leather. Superb micro-detail, zero text. ${STRICT_NO_TEXT_TAGS} --ar 1:1`,
    p3: `Natural outdoor product photograph of a consecrated leather talisman and ram's horn amulet resting on a flat moss-covered boulder in a sunlit forest clearing. Warm dappled sunlight, green pine needles and wild flora surrounding the sacred talisman. ${STRICT_NO_TEXT_TAGS} --ar 16:9`
  },
  'parures-bayas-metaux': {
    searchQuery: "marabout africain bague magique argent bronzeaya perles seduction hanches pinterest",
    visualContext: "Bagues sacrées en argent et bronze lisses ou martelés et parures de perles de hanches Bayas sur bois précieux et lin clair en lumière de jour SANS TEXTE, sans aucun humain.",
    p1: `Fine art daytime product still life of consecrated African jewelry, inspired by Pinterest luxury bohemian jewelry photography. Hand-forged solid silver and cast bronze talisman rings with smooth polished finish or abstract hammered metalwork, alongside vibrant strands of glass and terracotta hip beads (Bayas) in shades of turquoise, ruby red, and gold, gracefully coiled on a light linen textile under bright natural white daylight. High clarity, glistening metallic luster and glass bead facets, completely devoid of letters. ${STRICT_NO_TEXT_TAGS} --ar 16:9`,
    p2: `Macro daytime close-up of an antique consecrated plain silver signet ring resting on an aged light wooden pedestal. Smooth polished oval silver bezel with fine metal patina, illuminated by crisp directional natural white sunlight. Stunning jewelry macro fidelity, zero text. ${STRICT_NO_TEXT_TAGS} --ar 1:1`,
    p3: `Environmental product photograph of colourful consecrated Baya bead strands and a silver talisman ring resting on smooth ocean pebbles near sunlit foaming sea waves on a clean sandy beach. Glistening water droplets catching daytime sun sparkles. ${STRICT_NO_TEXT_TAGS} --ar 16:9`
  },
  'cadenas-receptacles-argent': {
    searchQuery: "marabout africain cadenas fer forgé laiton cadenas amour fidelite secret pinterest",
    visualContext: "Cadenas traditionnels en laiton et fer forgé scellés de cire et ficelés de cotonnades sacrées SANS TEXTE sur table de bois clair en lumière de jour, sans humain.",
    p1: `Documentary daytime still life of consecrated African ritual padlocks, inspired by authentic esoteric collections on Pinterest. Antique plain hand-forged black iron and cast brass padlocks, each intricately bound with consecrated red, white, and black cotton cords and sealed with smooth unwritten natural beeswax. Arranged on a solid light wood surface beside sacred white cowries and dried rose petals in bright natural white daylight. Sharp focus, rich metallic and fiber textures, zero text. ${STRICT_NO_TEXT_TAGS} --ar 16:9`,
    p2: `Extreme macro daytime photograph of an antique plain brass love padlock, inspired by Google macro searches. Rich golden brass patina, wrapped in tight wax-coated crimson thread bindings, and sealed with a glossy red wax seal without any letters. Bright natural window daylight illuminating every thread fiber and metal contour. Superb tactile realism. ${STRICT_NO_TEXT_TAGS} --ar 1:1`,
    p3: `Outdoor still life photograph of a consecrated brass padlock resting securely on the sun-warmed granite ledge of a scenic mountain outlook under a clear blue sky. Bright natural sunlight, distant mountain horizon, solemn serenity. ${STRICT_NO_TEXT_TAGS} --ar 16:9`
  },
  'pharmacopee-vegetale': {
    searchQuery: "marabout africain ecorces gouro racines secretes plantes aphrodisiaques fertilite pinterest",
    visualContext: "Fagots d'écorces médicinales, racines rares, graines sacrées et calebasses d'herboristerie sur table en bois en lumière de jour SANS AUCUN TEXTE, sans humain.",
    p1: `Documentary daytime still life of authentic West African traditional pharmacopeia, inspired by botanical research collections on Pinterest. Neatly bundled fibrous barks of Gouro tied with natural raffia, dried ginger roots, whole calabar seeds, and pods of alligator pepper arranged on a rustic light wooden workbench in bright natural white daylight. Pristine herbal authenticity, rich earth tones, palpable fibrous textures, zero text. ${STRICT_NO_TEXT_TAGS} --ar 16:9`,
    p2: `Ultra-macro daytime photograph of rare African fertility root shavings and alligator pepper grains inside a dried calabash scoop, inspired by Pinterest botanical macro photography. Crisp daylight showing every rough bark fiber, seed coat texture, and dried resin crystal. Absolute sharpness and organic authenticity. ${STRICT_NO_TEXT_TAGS} --ar 1:1`,
    p3: `Outdoor environmental photograph of freshly harvested sacred medicinal roots and green jungle barks resting on a large flat timber slab in a sunlit tropical rainforest clearing. Bright morning sunbeams through emerald green foliage, dew drops glistening on fresh leaves. ${STRICT_NO_TEXT_TAGS} --ar 16:9`
  }
};

shopCats.forEach((cat, idx) => {
  const num = String(idx + 1).padStart(2, '0');
  const filename = `${num}-${cat.category}.txt`;
  const filePath = path.join(dirs.catProduits, filename);
  const data = productCatData[cat.category];

  const content = `================================================================================
PROMPTS IMAGES ULTRA-REALISTES - QUALITE PHOTO DE JOUR NATURELLE (STRICTEMENT ZERO HUMAIN, ZERO TEXTE)
RAYON BOUTIQUE : ${cat.name.toUpperCase()}
================================================================================

Rayon URL           : /boutique/${cat.category}/
Titre Officiel      : ${cat.name}
Recherche Source    : "${data.searchQuery}" (Google Images & Pinterest)
Contexte Visuel     : ${data.visualContext}

--------------------------------------------------------------------------------
SPECIFICATIONS TECHNIQUES PHOTOGRAPHIQUES (STRICTEMENT SANS HUMAIN ET SANS TEXTE)
--------------------------------------------------------------------------------
- Appareil Photo    : Appareil moderne haute résolution / iPhone 17 Pro Max 48MP
- Style Visuel      : Photo nette de jour, objets réels posés sur table ou extérieur naturel
- Eclairage         : Lumière blanche naturelle, textures brutes et palpables, style lumineux
- Regle Absolue 1   : AUCUN HUMAIN, AUCUN MARABOUT, AUCUNE MAIN, NATURE MORTE EXCLUSIVE
- Regle Absolue 2   : AUCUN TEXTE, AUCUN MOT, AUCUNE LETTRE, AUCUN CHIFFRE, FLACONS NON ETIQUETES
- Environnements    : Table en bois clair, bord de fenêtre, plage ensoleillée, forêt lumineuse (SANS couvent)

================================================================================
PROMPT 1 : PACKSHOT DE CATEGORIE EN SITUATION (HERO BANNER 16:9)
================================================================================
Objectif : Grande image d'ambiance pour la bannière du rayon e-commerce sans texte.
Format   : Format 16:9.

[COPIER-COLLER LE PROMPT CI-DESSOUS] :
${data.p1}

Parametres Midjourney : --v 6.1 --style raw --ar 16:9
Resolution Flux / SD  : 1536x1024 pixels

================================================================================
PROMPT 2 : MACRO TEXTURE & MATIERES SACREES (CARRE 1:1)
================================================================================
Objectif : Gros plan macro sur la matière, la pureté et les finitions sans étiquette ni texte.
Format   : Format carré 1:1.

[COPIER-COLLER LE PROMPT CI-DESSOUS] :
${data.p2}

Parametres Midjourney : --v 6.1 --style raw --ar 1:1
Resolution Flux / SD  : 1024x1024 pixels

================================================================================
PROMPT 3 : MISE EN SITUATION EN NATURE PURE (16:9)
================================================================================
Objectif : Montrer les ingrédients et produits dans un cadre naturel organique.
Format   : Format 16:9.

[COPIER-COLLER LE PROMPT CI-DESSOUS] :
${data.p3}

Parametres Midjourney : --v 6.1 --style raw --ar 16:9
Resolution Flux / SD  : 1536x1024 pixels
================================================================================
`;

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Created (DAYLIGHT ZERO-TEXT NO HUMANS): 03-categories-produits/${filename}`);
});

// 4. Generate 04-produits (8 subfolders, 35 TXT files - ZERO HUMANS, ZERO TEXT)
shopCats.forEach(cat => {
  const subDirPath = path.join(dirs.produits, cat.category);
  ensureDir(subDirPath);

  cat.products.forEach(prod => {
    const filename = `${prod.slug}.txt`;
    const filePath = path.join(subDirPath, filename);
    const cleanTitle = prod.title.split(':')[0].trim();
    const searchQuery = `marabout africain ${prod.title.toLowerCase()} boutique rituel authentique pinterest`;

    const p1_text = `Daytime commercial product still life photograph of the authentic consecrated African spiritual product "${cleanTitle}", inspired by high-end Pinterest spiritual boutique photography. The product (pure glass bottle, earthenware pot or plain unlabelled amber jar with zero text) is elegantly displayed on a polished light wood pedestal next to consecrated white sea cowrie shells and raw botanical ingredients under bright natural white daylight. Clean luminous studio environment, crystal-clear focus, pure minimalist authentic aesthetic, strictly unbranded with no labels or words. ${STRICT_NO_TEXT_TAGS} --ar 1:1`;

    const p2_text = `Extreme macro close-up photograph of "${cleanTitle}", inspired by luxury texture photography on Pinterest. Tack-sharp focus on the consecrated substance (rich organic black soap paste, amber herbal elixir with suspended root shavings, fine consecrated powder particles, or hand-forged metal) illuminated under bright natural white daylight. Glistening textures, fine craftsmanship, authentic raw micro-details, completely devoid of text or labels. ${STRICT_NO_TEXT_TAGS} --ar 1:1`;

    const p3_text = `Luminous outdoor product photograph of "${cleanTitle}" in an unlabelled glass or clay container displayed in its natural habitat (on a mossy boulder in a sunlit green forest, or resting on sunlit ocean sand beside foaming clear waves). Bright morning sunlight creating clean highlights, lush botanical environment, pure natural harmony. ${STRICT_NO_TEXT_TAGS} --ar 16:9`;

    const content = `================================================================================
PROMPTS IMAGES ULTRA-REALISTES - QUALITE PHOTO DE JOUR NATURELLE (STRICTEMENT ZERO HUMAIN, ZERO TEXTE)
PRODUIT : ${cleanTitle.toUpperCase()}
================================================================================

Rayon Boutique      : ${cat.name} (/boutique/${cat.category}/)
Produit URL         : /boutique/${cat.category}/${prod.slug}/
Titre Officiel      : ${prod.title}
Prix Conseille      : ${prod.price || '65 €'}
Mots-cles Cibles    : ${prod.keywords}
Recherche Source    : "${searchQuery}" (Google Images & Pinterest)

--------------------------------------------------------------------------------
SPECIFICATIONS TECHNIQUES PHOTOGRAPHIQUES (STRICTEMENT SANS HUMAIN ET SANS TEXTE)
--------------------------------------------------------------------------------
- Appareil Photo    : Appareil moderne haute résolution / iPhone 17 Pro Max 48MP ProRAW
- Style Visuel      : Photo nette de jour, objets réels posés sur table ou extérieur naturel
- Eclairage         : Lumière blanche naturelle, textures brutes et palpables
- Regle Absolue 1   : AUCUN HUMAIN, AUCUN MARABOUT, AUCUNE MAIN, NATURE MORTE EXCLUSIVE
- Regle Absolue 2   : AUCUN TEXTE, AUCUN MOT, AUCUNE LETTRE, AUCUN CHIFFRE, FLACONS NON ETIQUETES
- Environnements    : Table en bois clair, bord de fenêtre, plage ensoleillée, forêt lumineuse (SANS couvent)

================================================================================
PROMPT 1 : PACKSHOT PRODUIT PRINCIPAL (FORMAT CARRE BOUTIQUE 1:1)
================================================================================
Objectif : Image principale pour la fiche produit et les listes catalogue e-commerce (sans texte).
Format   : Format carré 1:1.

[COPIER-COLLER LE PROMPT CI-DESSOUS] :
${p1_text}

Parametres Midjourney : --v 6.1 --style raw --ar 1:1
Resolution Flux / SD  : 1024x1024 pixels

================================================================================
PROMPT 2 : MACRO TEXTURE & DETAILS DE CONSECRATION (ZOOM PRODUIT 1:1)
================================================================================
Objectif : Deuxième image de la galerie produit montrant les matières et finitions sacrées sans étiquette.
Format   : Format carré 1:1.

[COPIER-COLLER LE PROMPT CI-DESSOUS] :
${p2_text}

Parametres Midjourney : --v 6.1 --style raw --ar 1:1
Resolution Flux / SD  : 1024x1024 pixels

================================================================================
PROMPT 3 : MISE EN SITUATION EN MILIEU NATUREL ORGANIQUE (16:9)
================================================================================
Objectif : Troisième image illustrant le produit dans son environnement naturel pur.
Format   : Format 16:9 pour la notice d'emploi et l'ancrage dans la nature.

[COPIER-COLLER LE PROMPT CI-DESSOUS] :
${p3_text}

Parametres Midjourney : --v 6.1 --style raw --ar 16:9
Resolution Flux / SD  : 1536x1024 pixels
================================================================================
`;

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Created (DAYLIGHT ZERO-TEXT NO HUMANS): 04-produits/${cat.category}/${filename}`);
  });
});

console.log('--- ALL 83 PROMPT FILES REGENERATED WITH STRICT DAYLIGHT & ZERO-TEXT & ZERO-HUMAN SPECIFICATIONS ---');
