const fs = require('fs');
const path = require('path');

function ensureDir(d) {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
}

ensureDir('public/images/zones');

// 1. Copier les 3 images vers public/images/zones/
const copies = [
  { src: 'public/images/propositions/zones-cabinet-prop-1-contemporain.webp', dest: 'public/images/zones/pillar-zone.webp' },
  { src: 'public/images/propositions/zones-cabinet-prop-2-chaleureux.webp', dest: 'public/images/zones/card-zone.webp' },
  { src: 'public/images/propositions/zones-cabinet-prop-3-zen-naturel.webp', dest: 'public/images/zones/details-zone.webp' }
];

copies.forEach(c => {
  fs.copyFileSync(path.resolve(c.src), path.resolve(c.dest));
  console.log('✅ ' + c.src + ' -> ' + c.dest);
});

// 2. Mettre à jour src/data/zonesData.ts
const zonesDataPath = path.resolve('src/data/zonesData.ts');
let zonesData = fs.readFileSync(zonesDataPath, 'utf8');
zonesData = zonesData.replace(/"image":\s*"https:\/\/images\.unsplash\.com\/[^"]+"/g, '"image": "/images/zones/card-zone.webp"');
fs.writeFileSync(zonesDataPath, zonesData, 'utf8');
console.log('✅ zonesData.ts mis à jour avec card-zone.webp pour les 8 régions.');

// 3. Mettre à jour src/pages/zones-d-intervention/index.astro
const indexZonePath = path.resolve('src/pages/zones-d-intervention/index.astro');
let indexZone = fs.readFileSync(indexZonePath, 'utf8');
indexZone = indexZone.replace(/image="https:\/\/images\.unsplash\.com\/[^"]+"/g, 'image="/images/zones/pillar-zone.webp"');
indexZone = indexZone.replace(/<img\s+src=\{zone\.image\}\s+alt=\{zone\.title\}\s+class="/g, '<img\n              src={zone.image}\n              alt={zone.title}\n              loading="lazy"\n              decoding="async"\n              width="800"\n              height="500"\n              class="');
fs.writeFileSync(indexZonePath, indexZone, 'utf8');
console.log('✅ zones-d-intervention/index.astro mis à jour avec pillar-zone.webp.');

// 4. Mettre à jour src/pages/zones-d-intervention/[slug].astro
const slugZonePath = path.resolve('src/pages/zones-d-intervention/[slug].astro');
let slugZone = fs.readFileSync(slugZonePath, 'utf8');
slugZone = slugZone.replace(/image=\{"https:\/\/images\.unsplash\.com\/[^"]+"\}/g, 'image="/images/zones/details-zone.webp"');
slugZone = slugZone.replace(/<img\s+src=\{zone\.image\}\s+alt=\{`Intervention Marabout[^`]+`\}\s+class="/g, '<img\n        src={zone.image}\n        alt={`Intervention Marabout à ${zone.regionName} : ${zone.title}`}\n        loading="lazy"\n        decoding="async"\n        width="800"\n        height="500"\n        class="');
fs.writeFileSync(slugZonePath, slugZone, 'utf8');
console.log('✅ zones-d-intervention/[slug].astro mis à jour avec details-zone.webp.');
