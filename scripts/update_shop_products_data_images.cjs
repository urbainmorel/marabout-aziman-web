const fs = require('fs');
const path = require('path');

const filePath = path.resolve('src/data/shopData.ts');
let code = fs.readFileSync(filePath, 'utf8');

// Regex pour remplacer l'image de chaque produit dans shopData.ts
// "slug": "...", ..., "category": "...", ..., "image": "https://..."
const regex = /("slug":\s*"([^"]+)",[\s\S]*?"category":\s*"([^"]+)",[\s\S]*?"image":\s*)"[^"]+"/g;

code = code.replace(regex, (match, prefix, slug, category) => {
  return `${prefix}"/images/boutique/${category}/${slug}-card.webp"`;
});

fs.writeFileSync(filePath, code, 'utf8');
console.log('✅ shopData.ts updated with local product WebP image paths.');
