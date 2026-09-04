const fs = require('fs');
const path = require('path');

console.log('--- STARTING SEO DATA CORRECTIONS ---');

// 1. Fix shopData.ts
const shopDataPath = path.resolve('src/data/shopData.ts');
if (fs.existsSync(shopDataPath)) {
  let shopData = fs.readFileSync(shopDataPath, 'utf8');
  const initialMagiques = (shopData.match(/\/boutique\/cadenas-magiques\//g) || []).length;
  shopData = shopData.replaceAll('/boutique/cadenas-magiques/', '/boutique/cadenas-receptacles-argent/');
  fs.writeFileSync(shopDataPath, shopData, 'utf8');
  console.log(`shopData.ts: replaced ${initialMagiques} occurrences of /boutique/cadenas-magiques/`);
}

// 2. Fix zonesData.ts
const zonesDataPath = path.resolve('src/data/zonesData.ts');
if (fs.existsSync(zonesDataPath)) {
  let zonesData = fs.readFileSync(zonesDataPath, 'utf8');
  // Fix phone placeholders
  const phoneCount = (zonesData.match(/\+33 \(0\)6 XX XX XX XX/g) || []).length;
  zonesData = zonesData.replaceAll('+33 (0)6 XX XX XX XX', '+33 (0)7 59 39 92 30');
  
  // Fix 404 service link
  const litigesCount = (zonesData.match(/\/services\/justice-proces-litiges\/regler-litiges-fonciers-heritage\//g) || []).length;
  zonesData = zonesData.replaceAll('/services/justice-proces-litiges/regler-litiges-fonciers-heritage/', '/services/justice-proces-litiges/gagner-proces-cadenas-justice/');
  
  fs.writeFileSync(zonesDataPath, zonesData, 'utf8');
  console.log(`zonesData.ts: replaced ${phoneCount} placeholder phones, ${litigesCount} broken litiges links`);
}

// 3. Fix blogData.ts
const blogDataPath = path.resolve('src/data/blogData.ts');
if (fs.existsSync(blogDataPath)) {
  let blogData = fs.readFileSync(blogDataPath, 'utf8');
  // Fix phone placeholders
  const phoneCount = (blogData.match(/\+33 \(0\)6 XX XX XX XX/g) || []).length;
  blogData = blogData.replaceAll('+33 (0)6 XX XX XX XX', '+33 (0)7 59 39 92 30');

  // Fix cadenas-magiques links
  const magiquesCount = (blogData.match(/\/boutique\/cadenas-magiques\//g) || []).length;
  blogData = blogData.replaceAll('/boutique/cadenas-magiques/', '/boutique/cadenas-receptacles-argent/');

  // Fix calebasse-abondance-cauris
  const calebasseCount = (blogData.match(/\/boutique\/cadenas-receptacles-argent\/calebasse-abondance-cauris\//g) || []).length;
  blogData = blogData.replaceAll('/boutique/cadenas-receptacles-argent/calebasse-abondance-cauris/', '/boutique/cadenas-receptacles-argent/cadenas-financier-anti-depenses/');

  fs.writeFileSync(blogDataPath, blogData, 'utf8');
  console.log(`blogData.ts: replaced ${phoneCount} placeholder phones, ${magiquesCount} cadenas-magiques links, ${calebasseCount} calebasse links`);
}

// 4. Fix servicesData.ts
const servicesDataPath = path.resolve('src/data/servicesData.ts');
if (fs.existsSync(servicesDataPath)) {
  let servicesData = fs.readFileSync(servicesDataPath, 'utf8');
  // Fix phone placeholders
  const phoneCount = (servicesData.match(/\+33 \(0\)6 XX XX XX XX/g) || []).length;
  servicesData = servicesData.replaceAll('+33 (0)6 XX XX XX XX', '+33 (0)7 59 39 92 30');

  // Fix non-existent boutique products:
  // 1) portefeuille-magique-bedou -> cadenas-financier-anti-depenses
  const bedouCount = (servicesData.match(/\/boutique\/cadenas-receptacles-argent\/portefeuille-magique-bedou\//g) || []).length;
  servicesData = servicesData.replaceAll('/boutique/cadenas-receptacles-argent/portefeuille-magique-bedou/', '/boutique/cadenas-receptacles-argent/cadenas-financier-anti-depenses/');

  // 2) calebasse-abondance-cauris -> cadenas-financier-anti-depenses
  const calebasseCount = (servicesData.match(/\/boutique\/cadenas-receptacles-argent\/calebasse-abondance-cauris\//g) || []).length;
  servicesData = servicesData.replaceAll('/boutique/cadenas-receptacles-argent/calebasse-abondance-cauris/', '/boutique/cadenas-receptacles-argent/cadenas-financier-anti-depenses/');

  // 3) canari-scelle-protection-terrain -> corne-belier-chargee-maison
  const canariCount = (servicesData.match(/\/boutique\/cadenas-receptacles-argent\/canari-scelle-protection-terrain\//g) || []).length;
  servicesData = servicesData.replaceAll('/boutique/cadenas-receptacles-argent/canari-scelle-protection-terrain/', '/boutique/talismans-cuir-gris-gris/corne-belier-chargee-maison/');

  fs.writeFileSync(servicesDataPath, servicesData, 'utf8');
  console.log(`servicesData.ts: replaced ${phoneCount} placeholder phones, ${bedouCount} bedou links, ${calebasseCount} calebasse links, ${canariCount} canari links`);
}

console.log('--- DATA FIX COMPLETED SUCCESSFULLY ---');
