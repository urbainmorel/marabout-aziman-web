const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const token = process.env.SANITY_API_TOKEN;
const projectId = 'y8rqnviv';
const dataset = 'production';
const apiVersion = '2024-03-01';

if (!token) {
  console.error('Missing SANITY_API_TOKEN in .env');
  process.exit(1);
}

// Helper: generate random key for portable text
function randomKey() {
  return Math.random().toString(36).substring(2, 10);
}

// Helper: upload image to Sanity Asset
const imageCache = new Map();

async function uploadImageToSanity(relPath) {
  if (!relPath) return null;
  const cleanPath = relPath.startsWith('/') ? relPath.substring(1) : relPath;
  const fullPath = path.join(__dirname, '../public', cleanPath);

  if (imageCache.has(fullPath)) {
    return imageCache.get(fullPath);
  }

  if (!fs.existsSync(fullPath)) {
    console.warn(`[WARN] Image file not found: ${fullPath}`);
    return null;
  }

  const filename = path.basename(fullPath);
  const ext = path.extname(fullPath).toLowerCase();
  let contentType = 'image/jpeg';
  if (ext === '.webp') contentType = 'image/webp';
  else if (ext === '.png') contentType = 'image/png';
  else if (ext === '.svg') contentType = 'image/svg+xml';

  const fileData = fs.readFileSync(fullPath);

  try {
    const res = await fetch(`https://${projectId}.api.sanity.io/v${apiVersion}/assets/images/${dataset}?filename=${encodeURIComponent(filename)}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': contentType,
      },
      body: fileData,
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error(`[ERROR] Failed to upload image ${filename}:`, errText);
      return null;
    }

    const json = await res.json();
    const assetId = json.document._id;
    imageCache.set(fullPath, assetId);
    console.log(`[UPLOADED IMAGE] ${filename} -> ${assetId}`);
    return assetId;
  } catch (err) {
    console.error(`[ERROR] Exception uploading image ${filename}:`, err);
    return null;
  }
}

// Helper: Convert markdown text line to portable text children (spans, links, marks)
function parseFormattedSpans(text) {
  const children = [];
  const markDefs = [];

  // Simple tokenizer for **bold**, *italic*, and [link text](url)
  // Let's use a regex matching links and bold/italic tokens
  const regex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Text before match
    if (match.index > lastIndex) {
      children.push({
        _type: 'span',
        _key: randomKey(),
        text: text.substring(lastIndex, match.index),
        marks: [],
      });
    }

    if (match[1].startsWith('[')) {
      // Link [text](url)
      const linkText = match[2];
      const linkHref = match[3];
      const markKey = randomKey();
      markDefs.push({
        _key: markKey,
        _type: 'link',
        href: linkHref,
      });
      children.push({
        _type: 'span',
        _key: randomKey(),
        text: linkText,
        marks: [markKey],
      });
    } else if (match[1].startsWith('**')) {
      // Bold **text**
      const boldText = match[4];
      children.push({
        _type: 'span',
        _key: randomKey(),
        text: boldText,
        marks: ['strong'],
      });
    } else if (match[1].startsWith('*')) {
      // Italic *text*
      const italicText = match[5];
      children.push({
        _type: 'span',
        _key: randomKey(),
        text: italicText,
        marks: ['em'],
      });
    }

    lastIndex = regex.lastIndex;
  }

  // Trailing text
  if (lastIndex < text.length) {
    children.push({
      _type: 'span',
      _key: randomKey(),
      text: text.substring(lastIndex),
      marks: [],
    });
  }

  if (children.length === 0) {
    children.push({
      _type: 'span',
      _key: randomKey(),
      text: text || '',
      marks: [],
    });
  }

  return { children, markDefs };
}

// Convert markdown body to Sanity Portable Text blocks
function markdownToPortableText(markdown) {
  if (!markdown) return [];
  const lines = markdown.split('\n');
  const blocks = [];

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    if (!line || line === '---') continue;

    // Skip metadata headers if present in raw
    if (line.startsWith('# FICHE') || line.startsWith('# NOUVEL') || line.startsWith('# Requête') || line.startsWith('# Titre SEO') || line.startsWith('# Méta') || line.startsWith('# Slug') || line.startsWith('# Mots-clés') || line.startsWith('# Score')) {
      continue;
    }

    if (line.startsWith('#### ')) {
      const text = line.replace(/^####\s+/, '');
      const { children, markDefs } = parseFormattedSpans(text);
      blocks.push({
        _type: 'block',
        _key: randomKey(),
        style: 'h4',
        children,
        markDefs,
      });
    } else if (line.startsWith('### ')) {
      const text = line.replace(/^###\s+/, '');
      const { children, markDefs } = parseFormattedSpans(text);
      blocks.push({
        _type: 'block',
        _key: randomKey(),
        style: 'h3',
        children,
        markDefs,
      });
    } else if (line.startsWith('## ')) {
      const text = line.replace(/^##\s+/, '');
      const { children, markDefs } = parseFormattedSpans(text);
      blocks.push({
        _type: 'block',
        _key: randomKey(),
        style: 'h2',
        children,
        markDefs,
      });
    } else if (line.startsWith('# ')) {
      // Main title if present in body -> H2
      const text = line.replace(/^#\s+/, '');
      const { children, markDefs } = parseFormattedSpans(text);
      blocks.push({
        _type: 'block',
        _key: randomKey(),
        style: 'h2',
        children,
        markDefs,
      });
    } else if (line.startsWith('* ') || line.startsWith('- ')) {
      const text = line.replace(/^[\*\-]\s+/, '');
      const { children, markDefs } = parseFormattedSpans(text);
      blocks.push({
        _type: 'block',
        _key: randomKey(),
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children,
        markDefs,
      });
    } else if (/^\d+\.\s+/.test(line)) {
      const text = line.replace(/^\d+\.\s+/, '');
      const { children, markDefs } = parseFormattedSpans(text);
      blocks.push({
        _type: 'block',
        _key: randomKey(),
        style: 'normal',
        listItem: 'number',
        level: 1,
        children,
        markDefs,
      });
    } else if (line.startsWith('> ')) {
      const text = line.replace(/^>\s+/, '');
      const { children, markDefs } = parseFormattedSpans(text);
      blocks.push({
        _type: 'block',
        _key: randomKey(),
        style: 'blockquote',
        children,
        markDefs,
      });
    } else {
      // Normal paragraph
      const { children, markDefs } = parseFormattedSpans(line);
      blocks.push({
        _type: 'block',
        _key: randomKey(),
        style: 'normal',
        children,
        markDefs,
      });
    }
  }

  return blocks;
}

// Perform mutations batch
async function sendMutations(mutations) {
  const res = await fetch(`https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ mutations }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Sanity Mutation Failed (${res.status}): ${text}`);
  }

  return await res.json();
}

async function runMigration() {
  console.log('--- STARTING SANITY BLOG MIGRATION ---');

  // Read blogData.ts
  const rawFile = fs.readFileSync(path.join(__dirname, '../src/data/blogData.ts'), 'utf8');
  const catMatch = rawFile.match(/export const blogCategories:\s*BlogCategory\[\]\s*=\s*(\[[\s\S]*?\]);/);
  const artMatch = rawFile.match(/export const allBlogArticles:\s*BlogArticle\[\]\s*=\s*(\[[\s\S]*?\]);/);

  const blogCategories = JSON.parse(catMatch[1]);
  const allBlogArticles = JSON.parse(artMatch[1]);

  console.log(`Loaded ${blogCategories.length} categories and ${allBlogArticles.length} articles.`);

  // 1. Upload Author Image & Create Author Document
  console.log('\n--- 1. Creating Author: Maître Aziman ---');
  const authorAvatarAssetId = await uploadImageToSanity('/images/author/maitre-aziman.webp');
  
  const authorDoc = {
    _id: 'author-maitre-aziman',
    _type: 'author',
    name: 'Maître Aziman',
    slug: { _type: 'slug', current: 'maitre-aziman' },
    role: 'Grand Marabout & Prêtre Bokonon en France',
    bio: 'Initié aux secrets ancestraux du Fâ et du Vodun depuis plus de 25 ans. Il vous accompagne avec bienveillance, honnêteté et secret initiatique absolu.',
  };

  if (authorAvatarAssetId) {
    authorDoc.image = {
      _type: 'image',
      asset: { _type: 'reference', _ref: authorAvatarAssetId },
    };
  }

  await sendMutations([{ createOrReplace: authorDoc }]);
  console.log('Author created successfully!');

  // 2. Create Categories
  console.log('\n--- 2. Creating Categories ---');
  const catMutations = [];
  for (let i = 0; i < blogCategories.length; i++) {
    const cat = blogCategories[i];
    catMutations.push({
      createOrReplace: {
        _id: `category-${cat.slug}`,
        _type: 'category',
        title: cat.name,
        slug: { _type: 'slug', current: cat.slug },
        description: `Articles et guides consacrés à la thématique ${cat.name}.`,
        order: i + 1,
      },
    });
  }
  await sendMutations(catMutations);
  console.log(`All ${catMutations.length} categories created successfully!`);

  // 3. Create Posts
  console.log('\n--- 3. Migrating Articles & Uploading Images ---');
  const postMutations = [];

  for (let i = 0; i < allBlogArticles.length; i++) {
    const article = allBlogArticles[i];
    console.log(`[${i + 1}/${allBlogArticles.length}] Processing: ${article.title}`);

    // Upload main image
    const mainImageAssetId = await uploadImageToSanity(article.image);
    // Upload secondary image if present
    const secondaryImageAssetId = article.secondaryImage ? await uploadImageToSanity(article.secondaryImage) : null;

    // Convert content to block content
    const portableTextBlocks = markdownToPortableText(article.content || article.rawContent);

    const postDoc = {
      _id: `post-${article.slug}`,
      _type: 'post',
      title: article.title,
      slug: { _type: 'slug', current: article.slug },
      publishedAt: article.date ? new Date(article.date).toISOString() : new Date().toISOString(),
      author: {
        _type: 'reference',
        _ref: 'author-maitre-aziman',
      },
      category: {
        _type: 'reference',
        _ref: `category-${article.category}`,
      },
      excerpt: article.metaDescription,
      readingTime: article.readTime || '5 min de lecture',
      featured: i === 0,
      body: portableTextBlocks,
      seo: {
        _type: 'object',
        metaTitle: article.metaTitle,
        metaDescription: article.metaDescription,
        keywords: article.keywords,
      },
    };

    if (mainImageAssetId) {
      postDoc.mainImage = {
        _type: 'image',
        asset: { _type: 'reference', _ref: mainImageAssetId },
        alt: article.title,
      };
    }

    if (secondaryImageAssetId) {
      postDoc.secondaryImage = {
        _type: 'image',
        asset: { _type: 'reference', _ref: secondaryImageAssetId },
        alt: article.title,
      };
    }

    postMutations.push({ createOrReplace: postDoc });
  }

  // Send posts in batches of 10
  console.log(`\n--- Sending ${postMutations.length} post mutations to Sanity ---`);
  for (let i = 0; i < postMutations.length; i += 10) {
    const batch = postMutations.slice(i, i + 10);
    console.log(`Sending batch ${i + 1} to ${Math.min(i + 10, postMutations.length)}...`);
    await sendMutations(batch);
  }

  console.log('\n=============================================');
  console.log('🎉 ALL 25 ARTICLES & CATEGORIES MIGRATED TO SANITY!');
  console.log('=============================================');
}

runMigration().catch((err) => {
  console.error('Migration failed with error:', err);
  process.exit(1);
});
