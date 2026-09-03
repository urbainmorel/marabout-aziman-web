const fs = require('fs');
const path = require('path');

const filePath = path.resolve('src/data/servicesData.ts');
let code = fs.readFileSync(filePath, 'utf8');

const silos = [
  'amour-sentiments',
  'richesse-finance',
  'commerce-carriere-reussite',
  'divination-voyance',
  'protection-desenvoutement',
  'sante-traditionnelle',
  'justice-proces-litiges',
  'immigration-titres-sejour-visas'
];

silos.forEach(silo => {
  const targetPattern = new RegExp(`"silo":\\s*"${silo}",\\s*"name":\\s*"([^"]+)",\\s*"image":\\s*"[^"]+"`, 'g');
  code = code.replace(targetPattern, `"silo": "${silo}",\n    "name": "$1",\n    "image": "/images/services/categories/${silo}-card.webp"`);
});

fs.writeFileSync(filePath, code, 'utf8');
console.log('✅ servicesData.ts updated successfully with local category WebP images.');
