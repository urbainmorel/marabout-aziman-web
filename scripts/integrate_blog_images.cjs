/**
 * scripts/integrate_blog_images.cjs
 * 
 * Raccordement complet des images du Blog :
 * 1. Organisation des fichiers dans public/images/blog/ :
 *    - Hero Blog : public/images/blog/hero-blog.webp
 *    - Catégories (6) : public/images/blog/categories/[cat].webp
 *    - Articles (25 x 2) : public/images/blog/[cat]/[slug]-1.webp & [slug]-2.webp
 * 2. Mise à jour de src/data/blogData.ts (image principale et image secondaire pour chaque article)
 * 3. Mise à jour des templates src/pages/blog/index.astro, categorie/[category].astro et [slug].astro
 */

const fs = require('fs');
const path = require('path');

function ensureDir(d) {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
}

ensureDir(path.resolve('public/images/blog'));
ensureDir(path.resolve('public/images/blog/categories'));

// 1. Hero Blog
fs.copyFileSync(
  path.resolve('public/images/generated/05-blog/general/hero-blog_v1.webp'),
  path.resolve('public/images/blog/hero-blog.webp')
);
console.log('✅ Hero blog copié -> public/images/blog/hero-blog.webp');

// 2. Catégories Blog (6 catégories)
const categoryMap = {
  'amour-relations': 'amour-relations/empecher-son-conjoint-de-tromper_v1.webp',
  'richesse-prosperite': 'richesse-prosperite/attirer-argent-rapidement-rituels-chance_v1.webp',
  'protection-desenvoutement': 'protection-desenvoutement/renvoyer-un-sortilege-justice-miroir_v1.webp',
  'sante-plantes': 'sante-plantes/vertus-agbo-vigueur-masculine_v1.webp',
  'demarches-justice-france': 'demarches-justice-france/gagner-son-proces-tribunal-faire-taire-temoins_v1.webp',
  'guides-produits': 'guides-produits/pourquoi-porter-un-baya-vertus-seduction_v1.webp'
};

Object.entries(categoryMap).forEach(([cat, srcRel]) => {
  const src = path.resolve('public/images/generated/05-blog', srcRel);
  const dest = path.resolve('public/images/blog/categories', `${cat}.webp`);
  fs.copyFileSync(src, dest);
  console.log(`✅ Catégorie [${cat}] -> public/images/blog/categories/${cat}.webp`);
});

// 3. Copier les 2 images pour chacun des 25 articles
const categories = [
  'amour-relations',
  'richesse-prosperite',
  'protection-desenvoutement',
  'sante-plantes',
  'demarches-justice-france',
  'guides-produits'
];

categories.forEach(cat => {
  const genCatDir = path.resolve('public/images/generated/05-blog', cat);
  const destCatDir = path.resolve('public/images/blog', cat);
  ensureDir(destCatDir);

  if (fs.existsSync(genCatDir)) {
    const files = fs.readdirSync(genCatDir);
    files.forEach(f => {
      if (f.endsWith('_v1.webp')) {
        const slug = f.replace('_v1.webp', '');
        fs.copyFileSync(path.join(genCatDir, f), path.join(destCatDir, `${slug}-1.webp`));
      } else if (f.endsWith('_v2.webp')) {
        const slug = f.replace('_v2.webp', '');
        fs.copyFileSync(path.join(genCatDir, f), path.join(destCatDir, `${slug}-2.webp`));
      }
    });
  }
});
console.log('✅ 50 images d\'articles copiées dans public/images/blog/[cat]/');

// 4. Mettre à jour src/data/blogData.ts
const blogDataPath = path.resolve('src/data/blogData.ts');
let blogData = fs.readFileSync(blogDataPath, 'utf8');

// Ajouter secondaryImage à BlogArticle interface si non présent
if (!blogData.includes('secondaryImage?: string;')) {
  blogData = blogData.replace('image: string;', 'image: string;\n  secondaryImage?: string;');
}

// Ajouter image à BlogCategory interface si non présent
if (!blogData.includes('image?: string;')) {
  blogData = blogData.replace('name: string;', 'name: string;\n  image?: string;');
}

// Mettre à jour les catégories avec leur image
blogData = blogData.replace(
  /"slug": "amour-relations",\s*"name": "Amour & Relations"/g,
  '"slug": "amour-relations",\n    "name": "Amour & Relations",\n    "image": "/images/blog/categories/amour-relations.webp"'
);
blogData = blogData.replace(
  /"slug": "richesse-prosperite",\s*"name": "Richesse & Prospérité"/g,
  '"slug": "richesse-prosperite",\n    "name": "Richesse & Prospérité",\n    "image": "/images/blog/categories/richesse-prosperite.webp"'
);
blogData = blogData.replace(
  /"slug": "protection-desenvoutement",\s*"name": "Protection & Désenvoûtement"/g,
  '"slug": "protection-desenvoutement",\n    "name": "Protection & Désenvoûtement",\n    "image": "/images/blog/categories/protection-desenvoutement.webp"'
);
blogData = blogData.replace(
  /"slug": "sante-plantes",\s*"name": "Santé & Plantes"/g,
  '"slug": "sante-plantes",\n    "name": "Santé & Plantes",\n    "image": "/images/blog/categories/sante-plantes.webp"'
);
blogData = blogData.replace(
  /"slug": "demarches-justice-france",\s*"name": "Démarches & Justice en France"/g,
  '"slug": "demarches-justice-france",\n    "name": "Démarches & Justice en France",\n    "image": "/images/blog/categories/demarches-justice-france.webp"'
);
blogData = blogData.replace(
  /"slug": "guides-produits",\s*"name": "Guides & Produits"/g,
  '"slug": "guides-produits",\n    "name": "Guides & Produits",\n    "image": "/images/blog/categories/guides-produits.webp"'
);

// Mettre à jour tous les articles avec leurs images locales
const ts = require('typescript');
const trans = ts.transpileModule(blogData, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const mod = { exports: {} };
const fn = new Function('exports', 'module', trans);
fn(mod.exports, mod);

const loadedArticles = mod.exports.allBlogArticles;
console.log(`Traitement de ${loadedArticles.length} articles pour blogData.ts...`);

loadedArticles.forEach(a => {
  const localImg1 = `/images/blog/${a.category}/${a.slug}-1.webp`;
  const localImg2 = `/images/blog/${a.category}/${a.slug}-2.webp`;

  const pattern = new RegExp(`"slug":\\s*"${a.slug}"[\\s\\S]*?"image":\\s*"[^"]+"`);
  const match = blogData.match(pattern);
  if (match) {
    const repl = match[0].replace(/"image":\s*"[^"]+"/, `"image": "${localImg1}",\n    "secondaryImage": "${localImg2}"`);
    blogData = blogData.replace(match[0], repl);
  }
});

fs.writeFileSync(blogDataPath, blogData, 'utf8');
console.log('✅ blogData.ts mis à jour avec les 2 images pour chaque article et chaque catégorie.');

// 5. Mettre à jour src/pages/blog/index.astro
const blogIndexPath = path.resolve('src/pages/blog/index.astro');
let blogIndex = fs.readFileSync(blogIndexPath, 'utf8');
blogIndex = blogIndex.replace(/image="https:\/\/images\.unsplash\.com\/[^"]+"/g, 'image="/images/blog/hero-blog.webp"');
fs.writeFileSync(blogIndexPath, blogIndex, 'utf8');
console.log('✅ blog/index.astro mis à jour avec hero-blog.webp.');

// 6. Mettre à jour src/pages/blog/categorie/[category].astro
const blogCatPath = path.resolve('src/pages/blog/categorie/[category].astro');
let blogCat = fs.readFileSync(blogCatPath, 'utf8');
blogCat = blogCat.replace(/image="https:\/\/images\.unsplash\.com\/[^"]+"/g, 'image={category.image || "/images/blog/hero-blog.webp"}');
fs.writeFileSync(blogCatPath, blogCat, 'utf8');
console.log('✅ blog/categorie/[category].astro mis à jour avec category.image.');

// 7. Mettre à jour src/pages/blog/[slug].astro pour intégrer les 2 images dans la lecture
const blogSlugPath = path.resolve('src/pages/blog/[slug].astro');
let blogSlug = fs.readFileSync(blogSlugPath, 'utf8');

const articleContentSection = [
  '    <!-- Table of Contents -->',
  '    <TableOfContents />',
  '',
  '    <!-- Featured Main Image -->',
  '    <div class="rounded-3xl overflow-hidden shadow-xl max-h-[460px] bg-brand-950 border border-brand-800 my-8">',
  '      <img',
  '        src={article.image}',
  '        alt={article.title}',
  '        loading="eager"',
  '        decoding="async"',
  '        width="1200"',
  '        height="675"',
  '        class="w-full h-full object-cover"',
  '      />',
  '    </div>',
  '',
  '    <!-- Pure Editorial HTML -->',
  '    <div class="prose-aziman" set:html={article.contentHtml} />',
  '',
  '    {article.secondaryImage && (',
  '      <!-- Secondary Ritual Insight Image -->',
  '      <div class="rounded-3xl overflow-hidden shadow-xl max-h-[420px] bg-brand-950 border border-brand-800 my-10">',
  '        <img',
  '          src={article.secondaryImage}',
  '          alt={article.title}',
  '          loading="lazy"',
  '          decoding="async"',
  '          width="1200"',
  '          height="675"',
  '          class="w-full h-full object-cover"',
  '        />',
  '      </div>',
  '    )}'
].join('\n');

blogSlug = blogSlug.replace(
  /<!-- Table of Contents -->\s*<TableOfContents \/>\s*<!-- Pure Editorial HTML -->\s*<div class="prose-aziman" set:html=\{article\.contentHtml\} \/>/,
  articleContentSection
);

fs.writeFileSync(blogSlugPath, blogSlug, 'utf8');
console.log('✅ blog/[slug].astro mis à jour avec intégration des 2 images par article.');
