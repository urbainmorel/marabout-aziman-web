const fs = require('fs');
const path = require('path');

const BASE_DIR = path.resolve('PLAN DU SITE ET CONTENU MARABOUT AZIMAN');

const OFFICIAL_PHONE_DISPLAY = "+33 (0)7 59 39 92 30";
const OFFICIAL_PHONE_TEL = "+33759399230";

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

/**
 * Remove all emojis, icons, and stickers from titles and subtitles
 */
function cleanTitleEmojis(text) {
  if (!text) return '';
  return text
    .replace(/[\u{1F000}-\u{1FFFF}\u{2300}-\u{27BF}\u{FE00}-\u{FE0F}]/gu, '')
    .replace(/^[✦★*•\-–—►▶️\s]+/gu, '')
    .trim();
}

/**
 * Format inline markdown tokens into rich semantic HTML
 */
function formatInline(text) {
  let res = text;

  // Replace placeholder phone numbers with official clickable phone
  res = res.replace(/\+33\s*\(0\)[0-9Xx\s]{8,15}/gi, `<a href="tel:${OFFICIAL_PHONE_TEL}" class="text-brand-700 font-bold hover:text-brand-900 underline">${OFFICIAL_PHONE_DISPLAY}</a>`);
  res = res.replace(/06\s*XX\s*XX\s*XX\s*XX/gi, `<a href="tel:${OFFICIAL_PHONE_TEL}" class="text-brand-700 font-bold hover:text-brand-900 underline">${OFFICIAL_PHONE_DISPLAY}</a>`);

  // Bold **text**
  res = res.replace(/\*\*(.+?)\*\*/g, '<strong class="text-brand-dark font-bold">$1</strong>');

  // Italic *text* or _text_
  res = res.replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, '<em class="italic text-slate-900">$1</em>');

  // Markdown links [text](url)
  res = res.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-brand-700 font-semibold underline decoration-brand-300 hover:text-brand-900 hover:decoration-brand-600 transition-colors">$1</a>');

  // Inline code `code`
  res = res.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-brand-50 text-xs font-mono text-brand-900">$1</code>');

  return res;
}

/**
 * Convert raw markdown blocks into clean semantic HTML without any stickers or emojis in headings
 */
function markdownToHtml(markdown) {
  const lines = markdown.split(/\r?\n/);
  const htmlParts = [];
  let currentList = null;
  let currentQuote = null;

  function closeCurrentList() {
    if (currentList) {
      htmlParts.push(currentList === 'ul' ? '</ul>' : '</ol>');
      currentList = null;
    }
  }

  function closeCurrentQuote() {
    if (currentQuote) {
      htmlParts.push(`</blockquote>`);
      currentQuote = null;
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      closeCurrentList();
      closeCurrentQuote();
      continue;
    }

    // Ignore code block fences if wrapping raw HTML
    if (trimmed.startsWith('```')) {
      continue;
    }

    // Horizontal Rule
    if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
      closeCurrentList();
      closeCurrentQuote();
      htmlParts.push('<hr class="my-8 border-brand-200" />');
      continue;
    }

    // Heading 2 (clean emojis/stickers)
    if (trimmed.startsWith('## ')) {
      closeCurrentList();
      closeCurrentQuote();
      const cleanTitle = cleanTitleEmojis(trimmed.replace(/^##\s+/, ''));
      const title = formatInline(cleanTitle);
      htmlParts.push(`<h2 class="font-serif font-bold text-2xl sm:text-3xl text-brand-dark mt-10 mb-4 pb-2 border-b border-brand-200">${title}</h2>`);
      continue;
    }

    // Heading 3 (clean emojis/stickers)
    if (trimmed.startsWith('### ')) {
      closeCurrentList();
      closeCurrentQuote();
      const cleanTitle = cleanTitleEmojis(trimmed.replace(/^###\s+/, ''));
      const title = formatInline(cleanTitle);
      htmlParts.push(`<h3 class="font-serif font-bold text-xl sm:text-2xl text-brand-900 mt-8 mb-3">${title}</h3>`);
      continue;
    }

    // Heading 4 (clean emojis/stickers)
    if (trimmed.startsWith('#### ')) {
      closeCurrentList();
      closeCurrentQuote();
      const cleanTitle = cleanTitleEmojis(trimmed.replace(/^####\s+/, ''));
      const title = formatInline(cleanTitle);
      htmlParts.push(`<h4 class="font-serif font-semibold text-lg text-brand-dark mt-6 mb-2">${title}</h4>`);
      continue;
    }

    // Heading 1 (if leftover in body)
    if (trimmed.startsWith('# ')) {
      closeCurrentList();
      closeCurrentQuote();
      const cleanTitle = cleanTitleEmojis(trimmed.replace(/^#\s+/, ''));
      const title = formatInline(cleanTitle);
      htmlParts.push(`<h2 class="font-serif font-bold text-2xl sm:text-3xl text-brand-dark mt-8 mb-4">${title}</h2>`);
      continue;
    }

    // Blockquote
    if (trimmed.startsWith('>')) {
      closeCurrentList();
      const quoteText = formatInline(trimmed.replace(/^>\s*/, ''));
      if (!currentQuote) {
        currentQuote = true;
        htmlParts.push(`<blockquote class="my-6 p-6 rounded-2xl bg-brand-50 border-l-4 border-brand-900 text-brand-dark italic font-serif shadow-xs space-y-2"><p>${quoteText}</p>`);
      } else {
        htmlParts.push(`<p class="mt-2">${quoteText}</p>`);
      }
      continue;
    } else {
      closeCurrentQuote();
    }

    // Unordered list (* or -)
    const ulMatch = trimmed.match(/^[\*\-]\s+(.+)$/);
    if (ulMatch) {
      if (currentList !== 'ul') {
        closeCurrentList();
        currentList = 'ul';
        htmlParts.push('<ul class="my-5 space-y-3 pl-4 border-l-2 border-brand-300 text-slate-800 text-base leading-relaxed">');
      }
      const itemContent = formatInline(ulMatch[1]);
      htmlParts.push(`<li class="flex items-start gap-2.5"><span class="text-brand-600 font-bold flex-shrink-0 mt-0.5">•</span><span>${itemContent}</span></li>`);
      continue;
    }

    // Ordered list (1. , 2. )
    const olMatch = trimmed.match(/^(\d+)\.\s+(.+)$/);
    if (olMatch) {
      if (currentList !== 'ol') {
        closeCurrentList();
        currentList = 'ol';
        htmlParts.push('<ol class="my-5 space-y-3 pl-6 list-decimal text-slate-800 text-base leading-relaxed">');
      }
      const itemContent = formatInline(olMatch[2]);
      htmlParts.push(`<li>${itemContent}</li>`);
      continue;
    }

    // Regular paragraph
    closeCurrentList();
    closeCurrentQuote();
    htmlParts.push(`<p class="my-4 text-base text-slate-800 leading-relaxed font-sans">${formatInline(trimmed)}</p>`);
  }

  closeCurrentList();
  closeCurrentQuote();

  let finalHtml = htmlParts.join('\n');
  finalHtml = finalHtml.replace(/<h([1-6])(.*?)>(.*?)<\/h\1>/gi, (match, tag, attrs, inner) => {
    return `<h${tag}${attrs}>${cleanTitleEmojis(inner)}</h${tag}>`;
  });

  return finalHtml;
}

/**
 * Meticulously parse the raw file into clean SEO metadata and pure editorial content
 */
function parseYoastAndContent(filePath, fallbackSlug) {
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  const lines = raw.split(/\r?\n/);
  
  let targetQuery = '';
  let metaTitle = '';
  let metaDescription = '';
  let slug = '';
  let keywords = '';
  let h1 = '';

  let bodyStartIndex = 0;
  let inYoastHeader = true;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Check SEO metadata lines
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
    }

    // Check if this line is part of the SEO comment block
    const isCommentHeaderLine = 
      line.startsWith('# =') ||
      line.startsWith('# -') ||
      line.startsWith('# FICHE D\'OPTIMISATION') ||
      line.startsWith('# Requête cible') ||
      line.startsWith('# Titre SEO') ||
      line.startsWith('# Méta-description') ||
      line.startsWith('# Meta-description') ||
      line.startsWith('# Slug') ||
      line.startsWith('# Mots-clés') ||
      line.startsWith('# Score Yoast') ||
      line.startsWith('# PAGE VILLE') ||
      line.startsWith('# URL :') ||
      line.startsWith('---') ||
      line === '#';

    if (!isCommentHeaderLine && line.length > 0 && inYoastHeader && i > 2) {
      inYoastHeader = false;
      bodyStartIndex = i;
      break;
    }
  }

  // Extract body lines after the Yoast header
  const bodyLines = [];
  for (let i = bodyStartIndex; i < lines.length; i++) {
    const l = lines[i];
    const trimmed = l.trim();

    // Check if first line is the H1 title
    if (!h1 && trimmed.startsWith('# ') && !trimmed.startsWith('# =') && !trimmed.startsWith('# -')) {
      h1 = cleanTitleEmojis(trimmed.replace(/^#\s+/, '').trim());
      continue;
    }

    // Skip any leftover score or metadata comment
    if (trimmed.startsWith('# Score Yoast') || trimmed.startsWith('# Requête cible') || trimmed.startsWith('# Slug') || trimmed.startsWith('# Mots-clés')) {
      continue;
    }

    bodyLines.push(l);
  }

  const rawBody = bodyLines.join('\n').trim();
  const contentHtml = markdownToHtml(rawBody);

  // Clean slug
  if (slug) {
    slug = slug.replace(/^\//, '').replace(/\/$/, '');
    const parts = slug.split('/');
    slug = parts[parts.length - 1] || parts[parts.length - 2] || '';
  }
  if (!slug && fallbackSlug) {
    slug = slugify(fallbackSlug);
  }

  return {
    raw,
    rawBody,
    contentHtml,
    metaTitle: cleanTitleEmojis(metaTitle || h1),
    metaDescription: metaDescription || rawBody.slice(0, 160).replace(/[#*`\n]/g, ' ').trim() + '...',
    targetQuery,
    slug,
    keywords,
    h1: cleanTitleEmojis(h1 || metaTitle)
  };
}

// ----------------------------------------------------
// 1. SERVICES
// ----------------------------------------------------
const SERVICES_MAP = [
  { folder: 'AMOUR SENTIMENTS', file: 'AMOUR SENTIMENTS.txt', silo: 'amour-sentiments', name: 'Amour & Sentiments', imgKey: 'amour' },
  { folder: 'RICHESSE FINANCES', file: 'RICHESSE FINANCES.txt', silo: 'richesse-finance', name: 'Richesse & Abondance', imgKey: 'richesse' },
  { folder: 'COMMERCE CARRIERE REUISSITE', file: 'COMMERCE CARRIERE-REUISSITE.txt', silo: 'commerce-carriere-reussite', name: 'Commerce & Carrière', imgKey: 'commerce' },
  { folder: 'DIVINATION VOYANCE', file: 'DIVINATION VOYANCE.txt', silo: 'divination-voyance', name: 'Divination & Voyance', imgKey: 'divination' },
  { folder: 'PROTECTION DESENVOUTEMENT', file: 'PROTECTION -DESENVOUTEMENT.txt', silo: 'protection-desenvoutement', name: 'Protection & Désenvoûtement', imgKey: 'protection' },
  { folder: 'SANTE TRADITIONNELLE', file: 'SANTE TRADITIONNELLE.txt', silo: 'sante-traditionnelle', name: 'Santé & Fertilité', imgKey: 'sante' },
  { folder: 'JUSTICE PROCES LITIGE', file: 'JUSTICE PROCES - LITIGE.txt', silo: 'justice-proces-litiges', name: 'Justice & Litiges', imgKey: 'justice' },
  { folder: 'IMIGRATION TITRES SEJOUR VISAS', file: 'IMIGRATION -TITRES SEJOUR VISAS.txt', silo: 'immigration-titres-sejour-visas', name: 'Immigration & Papiers', imgKey: 'immigration' }
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
        title: cleanTitleEmojis(parsedSub.h1 || baseName),
        slug: parsedSub.slug || slugify(baseName),
        silo: svc.silo,
        siloName: svc.name,
        metaTitle: parsedSub.metaTitle,
        metaDescription: parsedSub.metaDescription,
        keywords: parsedSub.keywords,
        content: parsedSub.rawBody,
        contentHtml: parsedSub.contentHtml,
        rawContent: parsedSub.raw,
        image: subImage
      };
      subservices.push(subObj);
      allSubservices.push(subObj);
    });
  }

  servicesHubs.push({
    title: cleanTitleEmojis(parsedHub?.h1 || svc.name),
    silo: svc.silo,
    name: svc.name,
    image: hubImage,
    metaTitle: parsedHub?.metaTitle || svc.name,
    metaDescription: parsedHub?.metaDescription || '',
    keywords: parsedHub?.keywords || '',
    content: parsedHub?.rawBody || '',
    contentHtml: parsedHub?.contentHtml || '',
    rawContent: parsedHub?.raw || '',
    subservices: subservices
  });
});

fs.writeFileSync(
  path.resolve('src/data/servicesData.ts'),
  `// Auto-generated real content dataset without sticker/emoji clutter in headings
export interface SubService {
  title: string;
  slug: string;
  silo: string;
  siloName: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  content: string;
  contentHtml: string;
  rawContent: string;
  image: string;
}

export interface ServiceSubservice extends SubService {}

export interface ServiceHub {
  title: string;
  silo: string;
  name: string;
  image: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  content: string;
  contentHtml: string;
  rawContent: string;
  subservices: SubService[];
}

export const servicesHubs: ServiceHub[] = ${JSON.stringify(servicesHubs, null, 2)};
export const allSubservices: SubService[] = ${JSON.stringify(allSubservices, null, 2)};
`
);

console.log(`✅ Services generated with FULL real contents: ${servicesHubs.length} hubs, ${allSubservices.length} subservices.`);

// ----------------------------------------------------
// 2. BOUTIQUE
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
          title: cleanTitleEmojis(parsedProd.h1 || pBaseName),
          slug: parsedProd.slug || slugify(pBaseName),
          category: cat.category,
          categoryName: cat.name,
          price: cat.price,
          metaTitle: parsedProd.metaTitle,
          metaDescription: parsedProd.metaDescription,
          keywords: parsedProd.keywords,
          content: parsedProd.rawBody,
          contentHtml: parsedProd.contentHtml,
          rawContent: parsedProd.raw,
          image: pImage
        };
        products.push(prodObj);
        allProducts.push(prodObj);
      });
    }
  } else if (cat.category === 'pharmacopee-vegetale') {
    // 4 products from Pharmacopée Africaine
    const pharmaProducts = [
      {
        title: "Bouteille d'Agbo Vigueur Masculine (Érection et Reins)",
        slug: "bouteille-agbo-vigueur-masculine",
        price: "60 €",
        metaTitle: "Bouteille d'Agbo Vigueur Masculine en France | Aziman",
        metaDescription: "Commandez l'Agbo traditionnel de Maître Aziman. Macération puissante pour renforcer l'érection, les reins et l'endurance virile. Livraison 48h France.",
        content: `## Remède Ancestral de Vitalité Virile : L'Agbo Traditionnel

La célèbre macération liquide pour hommes. Ainsi, elle purifie le sang, fortifie les reins et garantit des érections fermes et une endurance prolongée.

### Propriétés et Bienfaits
- Déblocage des flux sanguins et renforcement de l'appareil reproducteur masculin
- Élimination de la fatigue générale et de la faiblesse des reins
- Préparation 100% naturelle à base d'écorces et de racines sacrées d'Afrique de l'Ouest

### Conseil d'utilisation
Prendre un petit verre matin à jeun pendant 14 jours.`
      },
      {
        title: "Décoction Gynécologique de Fertilité (Matrice et Trompes)",
        slug: "decoction-gynecologique-fertilite",
        price: "65 €",
        metaTitle: "Décoction Gynécologique de Fertilité Féminine | Aziman",
        metaDescription: "Remède traditionnel pour la fertilité féminine en France. Nettoie la matrice, débouche les trompes et stimule l'ovulation. Livraison discrète.",
        content: `## Décoction Traditionnelle de Fertilité et Purification Matrice

Spécialement formulée pour les femmes qui désirent concevoir. De plus, elle nettoie l'appareil reproducteur, débouche les trompes et stimule l'ovulation pour concevoir rapidement.

### Propriétés et Bienfaits
- Nettoyage en profondeur de la matrice et régulation des cycles menstruels
- Désobstruction naturelle des trompes et stimulation ovarienne
- Préparation à base de plantes douces et souveraines sélectionnées par Maître Aziman

### Conseil d'utilisation
À boire tiède chaque soir au coucher durant 21 jours consécutifs.`
      },
      {
        title: "Potion Traditionnelle de Sevrage de l'Alcoolisme",
        slug: "potion-traditionnelle-sevrage-alcool",
        price: "75 €",
        metaTitle: "Potion de Sevrage de l'Alcoolisme et Addictions | Aziman",
        metaDescription: "Solution traditionnelle pour arrêter l'alcool définitivement. Potion végétale sans manque ni effets secondaires. Expédition rapide en France.",
        content: `## Remède Végétal contre l'Addiction à l'Alcool

Un remède végétal puissant à base d'écorces de rejet. Par conséquent, il provoque un dégoût physique et définitif de la boisson sans crise de manque.

### Propriétés et Bienfaits
- Dégoût progressif et durable de tout type d'alcool (vins, bières, spiritueux)
- Apaisement du système nerveux pour éviter l'irritabilité et le manque
- Purification du foie et élimination rapide des toxines accumulées

### Conseil d'utilisation
Verser quelques gouttes dans les boissons ou repas quotidiens selon la notice.`
      },
      {
        title: "Pack d'Écorces et Racines Sacrées Gouro (Tisanes et Bains)",
        slug: "pack-ecorces-racines-gouro",
        price: "50 €",
        metaTitle: "Pack Racines et Écorces Gouro en France | Aziman",
        metaDescription: "Achetez le véritable fagot de racines Gouro en France. Idéal pour infusions énergisantes, hémorroïdes et vitalité. Livraison discrète 48h.",
        content: `## Racines et Écorces Authentiques Gouro de Côte d'Ivoire

Un assortiment de racines brutes d'Afrique. Idéal pour préparer vos propres infusions énergisantes, soigner les hémorroïdes et purifier le corps.

### Propriétés et Bienfaits
- Racine Gouro brute reconnue pour son effet tonique instantané
- Traitement naturel efficace des hémorroïdes internes et externes
- Propriétés purificatrices et revitalisantes pour l'ensemble de l'organisme

### Conseil d'utilisation
Faire bouillir le fagot de racines dans 2 litres d'eau pendant 15 minutes, filtrer et consommer tiède.`
      }
    ];

    pharmaProducts.forEach((p, pIdx) => {
      const pImage = IMAGES.sante[(pIdx + 1) % IMAGES.sante.length];
      const prodObj = {
        title: cleanTitleEmojis(p.title),
        slug: p.slug,
        category: cat.category,
        categoryName: cat.name,
        price: p.price,
        metaTitle: p.metaTitle,
        metaDescription: p.metaDescription,
        keywords: "pharmacopee africaine, agbo en france, plantes medicinales afrique",
        content: p.content,
        contentHtml: markdownToHtml(p.content),
        rawContent: p.content,
        image: pImage
      };
      products.push(prodObj);
      allProducts.push(prodObj);
    });
  }

  boutiqueCategories.push({
    title: cleanTitleEmojis(parsedCat?.h1 || cat.name),
    category: cat.category,
    name: cat.name,
    price: cat.price,
    image: catImage,
    metaTitle: parsedCat?.metaTitle || cat.name,
    metaDescription: parsedCat?.metaDescription || '',
    keywords: parsedCat?.keywords || '',
    content: parsedCat?.rawBody || '',
    contentHtml: parsedCat?.contentHtml || '',
    rawContent: parsedCat?.raw || '',
    products: products
  });
});

fs.writeFileSync(
  path.resolve('src/data/shopData.ts'),
  `// Auto-generated real content dataset without sticker/emoji clutter in headings
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
  contentHtml: string;
  rawContent: string;
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
  contentHtml: string;
  rawContent: string;
  products: ShopProduct[];
}

export const boutiqueCategories: ShopCategory[] = ${JSON.stringify(boutiqueCategories, null, 2)};
export const allProducts: ShopProduct[] = ${JSON.stringify(allProducts, null, 2)};
`
);

console.log(`✅ Shop generated with FULL real contents: ${boutiqueCategories.length} categories, ${allProducts.length} products.`);

// ----------------------------------------------------
// 3. ZONES
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
      title: cleanTitleEmojis(parsedZone.h1 || zBaseName),
      slug: parsedZone.slug || slugify(zBaseName),
      regionName: zBaseName,
      metaTitle: parsedZone.metaTitle,
      metaDescription: parsedZone.metaDescription,
      keywords: parsedZone.keywords,
      content: parsedZone.rawBody,
      contentHtml: parsedZone.contentHtml,
      rawContent: parsedZone.raw,
      image: zImage
    });
  });
}

fs.writeFileSync(
  path.resolve('src/data/zonesData.ts'),
  `// Auto-generated real content dataset without sticker/emoji clutter in headings
export interface ZoneItem {
  title: string;
  slug: string;
  regionName: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  content: string;
  contentHtml: string;
  rawContent: string;
  image: string;
}

export const allZones: ZoneItem[] = ${JSON.stringify(allZones, null, 2)};
`
);

console.log(`✅ Zones generated without stickers: ${allZones.length} regions.`);

// ----------------------------------------------------
// 4. BLOG
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

      let catImages = IMAGES.amour;
      if (cat.slug.includes('richesse')) catImages = IMAGES.richesse;
      else if (cat.slug.includes('protection')) catImages = IMAGES.protection;
      else if (cat.slug.includes('sante')) catImages = IMAGES.sante;
      else if (cat.slug.includes('demarches')) catImages = IMAGES.justice;
      else if (cat.slug.includes('guides')) catImages = IMAGES.boutique;

      const artImage = catImages[artIndex % catImages.length];
      artIndex++;

      allBlogArticles.push({
        title: cleanTitleEmojis(parsedArt.h1 || aBaseName),
        slug: parsedArt.slug || slugify(aBaseName),
        category: cat.slug,
        categoryName: cat.name,
        date: '2026-02-15',
        readTime: '6 min de lecture',
        metaTitle: parsedArt.metaTitle,
        metaDescription: parsedArt.metaDescription,
        keywords: parsedArt.keywords,
        content: parsedArt.rawBody,
        contentHtml: parsedArt.contentHtml,
        rawContent: parsedArt.raw,
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
  `// Auto-generated real content dataset without sticker/emoji clutter in headings
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
  contentHtml: string;
  rawContent: string;
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

console.log(`✅ Blog generated without stickers: ${blogCategories.length} categories, ${allBlogArticles.length} articles.`);
