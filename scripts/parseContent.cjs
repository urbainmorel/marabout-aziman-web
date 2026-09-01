const fs = require('fs');
const path = require('path');

const BASE_DIR = path.resolve('PLAN DU SITE ET CONTENU MARABOUT AZIMAN');

const IMAGES = {
  amour: [
    'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80'
  ],
  richesse: [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80'
  ],
  commerce: [
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80'
  ],
  divination: [
    'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80'
  ],
  protection: [
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?auto=format&fit=crop&w=1200&q=80'
  ],
  sante: [
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80'
  ],
  justice: [
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80'
  ],
  immigration: [
    'https://images.unsplash.com/photo-1500835556837-99ac94a94552?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80'
  ],
  boutique: [
    'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80'
  ],
  zones: [
    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1524396309943-e03f5249f002?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1565014605995-1f9e2b170c0c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1549144511-f099e773c147?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=1200&q=80'
  ]
};

function slugify(text) {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

function parseYoastAndContent(filePath, fallbackSlug) {
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  const lines = raw.split(/\r?\n/);
  
  let targetQuery = '';
  let metaTitle = '';
  let metaDescription = '';
  let slug = '';
  let keywords = '';
  let contentLines = [];
  let inYoastHeader = true;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (inYoastHeader) {
      if (line.includes("Requête cible principale :") || line.includes("Requête cible :")) {
        targetQuery = line.split(':')[1]?.trim() || '';
      } else if (line.includes("Titre SEO (Title)         :") || line.includes("Titre SEO (Title) :") || line.includes("Titre SEO :")) {
        metaTitle = line.split(':')[1]?.trim() || '';
      } else if (line.includes("Méta-description          :") || line.includes("Méta-description :") || line.includes("Meta-description :")) {
        metaDescription = line.split(':')[1]?.trim() || '';
      } else if (line.includes("Slug (URL)                :") || line.includes("Slug (URL) :") || line.includes("Slug :")) {
        slug = line.split(':')[1]?.trim() || '';
      } else if (line.includes("Mots-clés secondaires     :") || line.includes("Mots-clés secondaires :")) {
        keywords = line.split(':')[1]?.trim() || '';
      } else if (line.includes('---') && i > 3) {
        inYoastHeader = false;
      }
    } else {
      contentLines.push(line);
    }
  }

  let content = (contentLines.length > 0 ? contentLines.join('\n') : raw).trim();
  
  let h1 = '';
  const h1Match = content.match(/^#\s+(.+)$/m);
  if (h1Match) {
    h1 = h1Match[1].trim();
  }

  if (slug) {
    slug = slug.replace(/^\//, '').replace(/\/$/, '');
    const parts = slug.split('/');
    slug = parts[parts.length - 1] || parts[parts.length - 2] || '';
  }
  if (!slug && fallbackSlug) {
    slug = slugify(fallbackSlug);
  }

  // Extract sections / headings
  const sections = [];
  const rawSections = content.split(/\n(?=##\s+)/);
  for (const sec of rawSections) {
    const titleMatch = sec.match(/^##\s+(.+)$/m);
    if (titleMatch) {
      const sTitle = titleMatch[1].trim();
      const sContent = sec.replace(/^##\s+.+$/m, '').trim();
      sections.push({ title: sTitle, content: sContent });
    }
  }

  return {
    raw,
    content,
    metaTitle: metaTitle || h1,
    metaDescription: metaDescription || content.slice(0, 160).replace(/[#*`\n]/g, ' ').trim() + '...',
    targetQuery,
    slug,
    keywords,
    h1: h1 || metaTitle,
    sections
  };
}

// ----------------------------------------------------
// 1. PARSE SERVICES
// ----------------------------------------------------
const SERVICES_MAP = [
  { folder: 'AMOUR SENTIMENTS', file: 'AMOUR SENTIMENTS.txt', silo: 'amour-sentiments', name: 'Amour & Sentiments', imgKey: 'amour', icon: '❤️' },
  { folder: 'RICHESSE FINANCES', file: 'RICHESSE FINANCES.txt', silo: 'richesse-finance', name: 'Richesse & Abondance', imgKey: 'richesse', icon: '💰' },
  { folder: 'COMMERCE CARRIERE REUISSITE', file: 'COMMERCE CARRIERE-REUISSITE.txt', silo: 'commerce-carriere-reussite', name: 'Commerce & Carrière', imgKey: 'commerce', icon: '📈' },
  { folder: 'DIVINATION VOYANCE', file: 'DIVINATION VOYANCE.txt', silo: 'divination-voyance', name: 'Divination & Voyance', imgKey: 'divination', icon: '🔮' },
  { folder: 'PROTECTION DESENVOUTEMENT', file: 'PROTECTION -DESENVOUTEMENT.txt', silo: 'protection-desenvoutement', name: 'Protection & Désenvoûtement', imgKey: 'protection', icon: '🛡️' },
  { folder: 'SANTE TRADITIONNELLE', file: 'SANTE TRADITIONNELLE.txt', silo: 'sante-traditionnelle', name: 'Santé & Fertilité', imgKey: 'sante', icon: '🌿' },
  { folder: 'JUSTICE PROCES LITIGE', file: 'JUSTICE PROCES - LITIGE.txt', silo: 'justice-proces-litiges', name: 'Justice & Litiges', imgKey: 'justice', icon: '⚖️' },
  { folder: 'IMIGRATION TITRES SEJOUR VISAS', file: 'IMIGRATION -TITRES SEJOUR VISAS.txt', silo: 'immigration-titres-sejour-visas', name: 'Immigration & Papiers', imgKey: 'immigration', icon: '🛂' }
];

const servicesHubs = [];
const allSubservices = [];

SERVICES_MAP.forEach((svc, index) => {
  const hubPath = path.join(BASE_DIR, 'SERVICES', svc.file);
  const parsedHub = parseYoastAndContent(hubPath, svc.silo);
  const hubImage = IMAGES[svc.imgKey][0];

  const subservices = [];
  const subDirPath = path.join(BASE_DIR, 'SERVICES', svc.folder);
  if (fs.existsSync(subDirPath)) {
    const subFiles = fs.readdirSync(subDirPath).filter(f => f.endsWith('.txt'));
    subFiles.forEach((subFile, sIdx) => {
      const subFilePath = path.join(subDirPath, subFile);
      const baseName = subFile.replace('.txt', '');
      const parsedSub = parseYoastAndContent(subFilePath, baseName);
      const subImage = IMAGES[svc.imgKey][(sIdx + 1) % IMAGES[svc.imgKey].length];

      const subObj = {
        title: parsedSub.h1 || baseName,
        slug: parsedSub.slug || slugify(baseName),
        silo: svc.silo,
        siloName: svc.name,
        metaTitle: parsedSub.metaTitle,
        metaDescription: parsedSub.metaDescription,
        keywords: parsedSub.keywords,
        content: parsedSub.content,
        rawContent: parsedSub.raw,
        sections: parsedSub.sections,
        image: subImage,
        icon: svc.icon
      };
      subservices.push(subObj);
      allSubservices.push(subObj);
    });
  }

  servicesHubs.push({
    title: parsedHub?.h1 || svc.name,
    silo: svc.silo,
    name: svc.name,
    icon: svc.icon,
    image: hubImage,
    metaTitle: parsedHub?.metaTitle || svc.name,
    metaDescription: parsedHub?.metaDescription || '',
    keywords: parsedHub?.keywords || '',
    content: parsedHub?.content || '',
    rawContent: parsedHub?.raw || '',
    sections: parsedHub?.sections || [],
    subservices: subservices.map(s => ({ title: s.title, slug: s.slug, metaDescription: s.metaDescription, image: s.image }))
  });
});

fs.writeFileSync(
  path.resolve('src/data/servicesData.ts'),
  `// Auto-generated real content dataset from PLAN DU SITE ET CONTENU MARABOUT AZIMAN
export interface SubService {
  title: string;
  slug: string;
  silo: string;
  siloName: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  content: string;
  rawContent: string;
  sections: { title: string; content: string }[];
  image: string;
  icon: string;
}

export interface ServiceHub {
  title: string;
  silo: string;
  name: string;
  icon: string;
  image: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  content: string;
  rawContent: string;
  sections: { title: string; content: string }[];
  subservices: { title: string; slug: string; metaDescription: string; image: string }[];
}

export const servicesHubs: ServiceHub[] = ${JSON.stringify(servicesHubs, null, 2)};
export const allSubservices: SubService[] = ${JSON.stringify(allSubservices, null, 2)};
`
);

console.log(`✅ Services generated: ${servicesHubs.length} hubs, ${allSubservices.length} subservices.`);

// ----------------------------------------------------
// 2. PARSE BOUTIQUE
// ----------------------------------------------------
const BOUTIQUE_MAP = [
  { folder: 'SAVONS', file: 'SAVONS.txt', category: 'savons', name: 'Savons Noirs & Rituels', price: '65 €' },
  { folder: 'EAUX', file: 'EAUX.txt', category: 'eaux', name: 'Eaux Sacrées & Lustrales', price: '45 €' },
  { folder: 'PARFUMS', file: 'PARFUMS.txt', category: 'parfums-macerations', name: 'Parfums & Macérations', price: '55 €' },
  { folder: 'POUDRES', file: 'POUDRE.txt', category: 'poudres-terres-sacrees', name: 'Poudres Noires & Terres Sacrées', price: '70 €' },
  { folder: 'TALISMANS', file: 'TALISMANS.txt', category: 'talismans-cuir-gris-gris', name: 'Talismans en Cuir & Cornes', price: '120 €' },
  { folder: 'PERLES BAGUES', file: 'PERLES BAGUES.txt', category: 'parures-bayas-metaux', name: 'Parures, Bayas & Bagues Magiques', price: '85 €' },
  { folder: 'CADENAS', file: 'CADENAS.txt', category: 'cadenas-receptacles-argent', name: 'Cadenas & Réceptacles d\'Argent', price: '150 €' },
  { folder: '', file: 'PHARMACOPEE AFRICAINE.txt', category: 'pharmacopee-vegetale', name: 'Pharmacopée Végétale (Agbo)', price: '60 €' }
];

const boutiqueCategories = [];
const allProducts = [];

BOUTIQUE_MAP.forEach((cat, index) => {
  const catFilePath = path.join(BASE_DIR, 'BOUTIQUE', cat.file);
  const parsedCat = parseYoastAndContent(catFilePath, cat.category);
  const catImage = IMAGES.boutique[index % IMAGES.boutique.length];

  const products = [];
  if (cat.folder) {
    const catDirPath = path.join(BASE_DIR, 'BOUTIQUE', cat.folder);
    if (fs.existsSync(catDirPath)) {
      const prodFiles = fs.readdirSync(catDirPath).filter(f => f.endsWith('.txt'));
      prodFiles.forEach((pFile, pIdx) => {
        const pFilePath = path.join(catDirPath, pFile);
        const pBaseName = pFile.replace('.txt', '');
        const parsedProd = parseYoastAndContent(pFilePath, pBaseName);
        const pImage = IMAGES.boutique[(pIdx + index) % IMAGES.boutique.length];

        const prodObj = {
          title: parsedProd.h1 || pBaseName,
          slug: parsedProd.slug || slugify(pBaseName),
          category: cat.category,
          categoryName: cat.name,
          price: cat.price,
          metaTitle: parsedProd.metaTitle,
          metaDescription: parsedProd.metaDescription,
          keywords: parsedProd.keywords,
          content: parsedProd.content,
          rawContent: parsedProd.raw,
          sections: parsedProd.sections,
          image: pImage
        };
        products.push(prodObj);
        allProducts.push(prodObj);
      });
    }
  }

  boutiqueCategories.push({
    title: parsedCat?.h1 || cat.name,
    category: cat.category,
    name: cat.name,
    price: cat.price,
    image: catImage,
    metaTitle: parsedCat?.metaTitle || cat.name,
    metaDescription: parsedCat?.metaDescription || '',
    keywords: parsedCat?.keywords || '',
    content: parsedCat?.content || '',
    rawContent: parsedCat?.raw || '',
    sections: parsedCat?.sections || [],
    products: products.map(p => ({ title: p.title, slug: p.slug, price: p.price, image: p.image, metaDescription: p.metaDescription }))
  });
});

fs.writeFileSync(
  path.resolve('src/data/shopData.ts'),
  `// Auto-generated real content dataset from PLAN DU SITE ET CONTENU MARABOUT AZIMAN
export interface ShopProduct {
  title: string;
  slug: string;
  category: string;
  categoryName: string;
  price: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  content: string;
  rawContent: string;
  sections: { title: string; content: string }[];
  image: string;
}

export interface ShopCategory {
  title: string;
  category: string;
  name: string;
  price: string;
  image: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  content: string;
  rawContent: string;
  sections: { title: string; content: string }[];
  products: { title: string; slug: string; price: string; image: string; metaDescription: string }[];
}

export const boutiqueCategories: ShopCategory[] = ${JSON.stringify(boutiqueCategories, null, 2)};
export const allProducts: ShopProduct[] = ${JSON.stringify(allProducts, null, 2)};
`
);

console.log(`✅ Shop generated: ${boutiqueCategories.length} categories, ${allProducts.length} products.`);

// ----------------------------------------------------
// 3. PARSE ZONES D'INTERVENTION
// ----------------------------------------------------
const ZONES_DIR = path.join(BASE_DIR, 'ZONES D\'INTERVENTION');
const allZones = [];

if (fs.existsSync(ZONES_DIR)) {
  const zoneFiles = fs.readdirSync(ZONES_DIR).filter(f => f.endsWith('.txt'));
  zoneFiles.forEach((zFile, idx) => {
    const zPath = path.join(ZONES_DIR, zFile);
    const zBaseName = zFile.replace('.txt', '');
    const parsedZone = parseYoastAndContent(zPath, zBaseName);
    const zImage = IMAGES.zones[idx % IMAGES.zones.length];

    allZones.push({
      title: parsedZone.h1 || zBaseName,
      slug: parsedZone.slug || slugify(zBaseName),
      regionName: zBaseName,
      metaTitle: parsedZone.metaTitle,
      metaDescription: parsedZone.metaDescription,
      keywords: parsedZone.keywords,
      content: parsedZone.content,
      rawContent: parsedZone.raw,
      sections: parsedZone.sections,
      image: zImage
    });
  });
}

fs.writeFileSync(
  path.resolve('src/data/zonesData.ts'),
  `// Auto-generated real content dataset from PLAN DU SITE ET CONTENU MARABOUT AZIMAN
export interface ZoneItem {
  title: string;
  slug: string;
  regionName: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  content: string;
  rawContent: string;
  sections: { title: string; content: string }[];
  image: string;
}

export const allZones: ZoneItem[] = ${JSON.stringify(allZones, null, 2)};
`
);

console.log(`✅ Zones generated: ${allZones.length} regions.`);

// ----------------------------------------------------
// 4. PARSE BLOG ARTICLES
// ----------------------------------------------------
const BLOG_DIR = path.join(BASE_DIR, 'BLOG');
const allBlogArticles = [];
const blogCategories = [
  { folder: 'AMOUR & RELATIONS', slug: 'amour-relations', name: 'Amour & Relations' },
  { folder: 'RICHESSE & PROSPÉRITÉ', slug: 'richesse-prosperite', name: 'Richesse & Prospérité' },
  { folder: 'PROTECTION & DÉSENVOÛTEMENT', slug: 'protection-desenvoutement', name: 'Protection & Désenvoûtement' },
  { folder: 'SANTE & PLANTES', slug: 'sante-plantes', name: 'Santé & Plantes' },
  { folder: 'DÉMARCHES & JUSTICE EN FRANCE', slug: 'demarches-justice-france', name: 'Démarches & Justice en France' },
  { folder: 'GUIDES PRODUITS', slug: 'guides-produits', name: 'Guides & Produits' }
];

let artIndex = 0;
blogCategories.forEach(cat => {
  const catDirPath = path.join(BLOG_DIR, cat.folder);
  if (fs.existsSync(catDirPath)) {
    const artFiles = fs.readdirSync(catDirPath).filter(f => f.endsWith('.txt'));
    artFiles.forEach(aFile => {
      const aPath = path.join(catDirPath, aFile);
      const aBaseName = aFile.replace('.txt', '');
      const parsedArt = parseYoastAndContent(aPath, aBaseName);

      // Select curated image
      let catImages = IMAGES.amour;
      if (cat.slug.includes('richesse')) catImages = IMAGES.richesse;
      else if (cat.slug.includes('protection')) catImages = IMAGES.protection;
      else if (cat.slug.includes('sante')) catImages = IMAGES.sante;
      else if (cat.slug.includes('demarches')) catImages = IMAGES.justice;
      else if (cat.slug.includes('guides')) catImages = IMAGES.boutique;

      const artImage = catImages[artIndex % catImages.length];
      artIndex++;

      allBlogArticles.push({
        title: parsedArt.h1 || aBaseName,
        slug: parsedArt.slug || slugify(aBaseName),
        category: cat.slug,
        categoryName: cat.name,
        date: '2026-02-15',
        readTime: '6 min de lecture',
        metaTitle: parsedArt.metaTitle,
        metaDescription: parsedArt.metaDescription,
        keywords: parsedArt.keywords,
        content: parsedArt.content,
        rawContent: parsedArt.raw,
        sections: parsedArt.sections,
        image: artImage,
        author: {
          name: 'Maître Aziman',
          role: 'Grand Marabout & Prêtre Bokonon en France',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
        }
      });
    });
  }
});

fs.writeFileSync(
  path.resolve('src/data/blogData.ts'),
  `// Auto-generated real content dataset from PLAN DU SITE ET CONTENU MARABOUT AZIMAN
export interface BlogArticle {
  title: string;
  slug: string;
  category: string;
  categoryName: string;
  date: string;
  readTime: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  content: string;
  rawContent: string;
  sections: { title: string; content: string }[];
  image: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
}

export interface BlogCategory {
  slug: string;
  name: string;
}

export const blogCategories: BlogCategory[] = ${JSON.stringify(blogCategories, null, 2)};
export const allBlogArticles: BlogArticle[] = ${JSON.stringify(allBlogArticles, null, 2)};
`
);

console.log(`✅ Blog generated: ${blogCategories.length} categories, ${allBlogArticles.length} articles.`);
