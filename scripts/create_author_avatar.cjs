const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

function ensureDir(d) {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
}

ensureDir(path.resolve('public/images/author'));

(async () => {
  // 1. Créer l'avatar carré de Maître Aziman depuis l'image authentique de sanctuaire
  const srcImage = path.resolve('public/images/home/hero-accueil.webp');
  const destAvatar = path.resolve('public/images/author/maitre-aziman.webp');

  const buf = await sharp(srcImage)
    .extract({ left: 300, top: 0, width: 864, height: 864 }) // centré sur la statuette ancestrale et les éléments sacrés
    .resize(400, 400, { fit: 'cover' })
    .webp({ quality: 85 })
    .toBuffer();

  fs.writeFileSync(destAvatar, buf);
  console.log(`✅ Avatar créé : public/images/author/maitre-aziman.webp (${(buf.length / 1024).toFixed(1)} Ko)`);

  // 2. Mettre à jour src/data/blogData.ts pour tous les articles
  const blogDataPath = path.resolve('src/data/blogData.ts');
  let blogData = fs.readFileSync(blogDataPath, 'utf8');
  blogData = blogData.replace(/"avatar":\s*"https:\/\/images\.unsplash\.com\/[^"]+"/g, '"avatar": "/images/author/maitre-aziman.webp"');
  fs.writeFileSync(blogDataPath, blogData, 'utf8');
  console.log('✅ blogData.ts : tous les avatars auteurs mis à jour avec /images/author/maitre-aziman.webp');

  // 3. Mettre à jour src/pages/a-propos.astro
  const aProposPath = path.resolve('src/pages/a-propos.astro');
  let aPropos = fs.readFileSync(aProposPath, 'utf8');
  aPropos = aPropos.replace(/avatar:\s*"[^"]+"/g, 'avatar: "/images/author/maitre-aziman.webp"');
  fs.writeFileSync(aProposPath, aPropos, 'utf8');
  console.log('✅ a-propos.astro : avatar auteur mis à jour');

  // 4. Mettre à jour src/pages/blog/[slug].astro pour ajouter width/height/loading/decoding à l'avatar
  const blogSlugPath = path.resolve('src/pages/blog/[slug].astro');
  let blogSlug = fs.readFileSync(blogSlugPath, 'utf8');
  blogSlug = blogSlug.replace(
    /<img\s+src=\{article\.author\.avatar\}\s+alt=\{article\.author\.name\}\s+class="w-20 h-20 rounded-full object-cover border-2 border-brand-400 flex-shrink-0 shadow-md"\s*\/>/,
    `<img
        src={article.author.avatar}
        alt={article.author.name}
        loading="lazy"
        decoding="async"
        width="80"
        height="80"
        class="w-20 h-20 rounded-full object-cover border-2 border-brand-400 flex-shrink-0 shadow-md"
      />`
  );
  fs.writeFileSync(blogSlugPath, blogSlug, 'utf8');
  console.log('✅ blog/[slug].astro : balise avatar optimisée');

  // 5. Mettre à jour src/pages/blog/index.astro pour l'article à la une
  const blogIndexPath = path.resolve('src/pages/blog/index.astro');
  let blogIndex = fs.readFileSync(blogIndexPath, 'utf8');
  blogIndex = blogIndex.replace(
    /<img\s+src=\{featuredPost\.author\.avatar\}\s+alt=\{featuredPost\.author\.name\}\s+class="w-10 h-10 rounded-full object-cover border-2 border-brand-500\/40"\s*\/>/,
    `<img
                  src={featuredPost.author.avatar}
                  alt={featuredPost.author.name}
                  loading="lazy"
                  decoding="async"
                  width="40"
                  height="40"
                  class="w-10 h-10 rounded-full object-cover border-2 border-brand-500/40"
                />`
  );
  fs.writeFileSync(blogIndexPath, blogIndex, 'utf8');
  console.log('✅ blog/index.astro : balise avatar optimisée');

  // 6. Mettre à jour src/components/HeroHeader.astro
  const heroHeaderPath = path.resolve('src/components/HeroHeader.astro');
  let heroHeader = fs.readFileSync(heroHeaderPath, 'utf8');
  heroHeader = heroHeader.replace(
    /<img\s+src=\{author\.avatar\}\s+alt=\{author\.name\}\s+class="w-9 h-9 rounded-full object-cover border border-brand-400\/40 flex-shrink-0"\s*\/>/,
    `<img
              src={author.avatar}
              alt={author.name}
              loading="lazy"
              decoding="async"
              width="36"
              height="36"
              class="w-9 h-9 rounded-full object-cover border border-brand-400/40 flex-shrink-0"
            />`
  );
  fs.writeFileSync(heroHeaderPath, heroHeader, 'utf8');
  console.log('✅ HeroHeader.astro : balise avatar optimisée');
})();
