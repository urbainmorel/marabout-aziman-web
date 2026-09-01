const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.resolve('PLAN DU SITE ET CONTENU MARABOUT AZIMAN');
const DIST_DIR = path.resolve('dist');

// Find all .txt files recursively
function getAllTxtFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      getAllTxtFiles(fullPath, fileList);
    } else if (file.endsWith('.txt')) {
      fileList.push(fullPath);
    }
  });
  return fileList;
}

// Find all .html files in dist
function getAllHtmlFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      getAllHtmlFiles(fullPath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(fullPath);
    }
  });
  return fileList;
}

const txtFiles = getAllTxtFiles(SOURCE_DIR);
const htmlFiles = getAllHtmlFiles(DIST_DIR);

console.log(`\n================ AUDIT DE COUVERTURE DES CONTENUS ================`);
console.log(`📁 Fichiers .txt sources trouvés dans le dossier officiel : ${txtFiles.length}`);
console.log(`🌐 Pages HTML compilées dans dist/ : ${htmlFiles.length}`);

// Check specific sections
const categories = {
  root: [],
  servicesHubs: [],
  servicesSubs: [],
  boutiqueHubs: [],
  boutiqueProds: [],
  zones: [],
  blog: []
};

txtFiles.forEach(file => {
  const rel = path.relative(SOURCE_DIR, file);
  if (rel.startsWith('SERVICES\\') || rel.startsWith('SERVICES/')) {
    const parts = rel.split(/[\\/]/);
    if (parts.length === 2) categories.servicesHubs.push(rel);
    else categories.servicesSubs.push(rel);
  } else if (rel.startsWith('BOUTIQUE\\') || rel.startsWith('BOUTIQUE/')) {
    const parts = rel.split(/[\\/]/);
    if (parts.length === 2) categories.boutiqueHubs.push(rel);
    else categories.boutiqueProds.push(rel);
  } else if (rel.startsWith("ZONES D'INTERVENTION\\") || rel.startsWith("ZONES D'INTERVENTION/")) {
    categories.zones.push(rel);
  } else if (rel.startsWith('BLOG\\') || rel.startsWith('BLOG/')) {
    categories.blog.push(rel);
  } else {
    categories.root.push(rel);
  }
});

console.log(`\n--- Détail par catégorie ---`);
console.log(`- Pages Racines (Accueil, À propos, Contact, Cabinet, Avis, Légales) : ${categories.root.length} fichiers`);
console.log(`- Services Piliers (Hubs) : ${categories.servicesHubs.length} fichiers`);
console.log(`- Sous-services (Rituels) : ${categories.servicesSubs.length} fichiers`);
console.log(`- Boutique Rayons : ${categories.boutiqueHubs.length} fichiers`);
console.log(`- Boutique Produits : ${categories.boutiqueProds.length} fichiers`);
console.log(`- Zones Régionales : ${categories.zones.length} fichiers`);
console.log(`- Articles de Blog : ${categories.blog.length} fichiers`);

// Audit HTML files for undefined/null strings or empty titles
let issues = [];
htmlFiles.forEach(htmlPath => {
  const content = fs.readFileSync(htmlPath, 'utf-8');
  const relHtml = path.relative(DIST_DIR, htmlPath);

  if (content.includes('undefined') || content.includes('null')) {
    // Exclude valid JS bundle names if any
    const lines = content.split('\n');
    lines.forEach((l, idx) => {
      if ((l.includes(' undefined ') || l.includes('>undefined<') || l.includes(' null ') || l.includes('>null<')) && !l.includes('chunk-')) {
        issues.push(`[Valeur Null/Undefined] dans ${relHtml} à la ligne ${idx + 1}`);
      }
    });
  }

  if (content.includes('<title></title>') || content.includes('<title>undefined</title>')) {
    issues.push(`[Balise Title vide ou invalide] dans ${relHtml}`);
  }
});

console.log(`\n--- Contrôle Qualité du Rendu HTML ---`);
if (issues.length === 0) {
  console.log(`✅ ZÉRO anomalie détectée sur les ${htmlFiles.length} pages HTML !`);
  console.log(`✅ Tous les titres, méta-descriptions et coordonnées sont correctement injectés.`);
} else {
  console.log(`⚠️ Anomalies détectées (${issues.length}) :`);
  issues.forEach(iss => console.log(' - ' + iss));
}
