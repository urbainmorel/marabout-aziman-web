const fs = require('fs');
const path = require('path');

const filePath = path.resolve('src/data/servicesData.ts');
let code = fs.readFileSync(filePath, 'utf8');

// Expression régulière pour remplacer les images de subservices qui pointent encore vers unsplash
// "slug": "...", "silo": "...", ..., "image": "https://..."
const regex = /"slug":\s*"([^"]+)",\s*"silo":\s*"([^"]+)",([\s\S]*?)"image":\s*"[^"]+"/g;

code = code.replace(regex, (match, slug, silo, middle) => {
  return `"slug": "${slug}",\n        "silo": "${silo}",${middle}"image": "/images/services/${silo}/${slug}-card.webp"`;
});

fs.writeFileSync(filePath, code, 'utf8');
console.log('✅ servicesData.ts subservices images updated to local WebP paths.');
