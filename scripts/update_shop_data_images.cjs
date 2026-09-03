const fs = require('fs');
const path = require('path');

const filePath = path.resolve('src/data/shopData.ts');
let code = fs.readFileSync(filePath, 'utf8');

const categories = [
  'savons',
  'eaux',
  'parfums-macerations',
  'poudres-terres-sacrees',
  'talismans-cuir-gris-gris',
  'parures-bayas-metaux',
  'cadenas-receptacles-argent',
  'pharmacopee-vegetale'
];

categories.forEach(cat => {
  const targetPattern = new RegExp(`"category":\\s*"${cat}",\\s*"name":\\s*"([^"]+)",\\s*"price":\\s*"([^"]+)",\\s*"image":\\s*"[^"]+"`, 'g');
  code = code.replace(targetPattern, `"category": "${cat}",\n    "name": "$1",\n    "price": "$2",\n    "image": "/images/boutique/categories/${cat}-card.webp"`);
});

fs.writeFileSync(filePath, code, 'utf8');
console.log('✅ shopData.ts updated successfully with local category WebP images.');
