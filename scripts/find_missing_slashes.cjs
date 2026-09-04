const fs = require('fs');
const path = require('path');

function getAllHtmlFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllHtmlFiles(full));
    } else if (full.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}

const htmlFiles = getAllHtmlFiles('./dist');
const missingMap = {};

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const route = file.replace(/\\/g, '/').replace('./dist', '').replace('dist', '');

  const linkMatches = [...content.matchAll(/<a[^>]+href=["']([^"']+)["']/gi)];
  for (const link of linkMatches) {
    let href = link[1].trim();
    if (href.startsWith('http://localhost') || href.startsWith('https://www.marabout-aziman.fr')) {
      href = href.replace('https://www.marabout-aziman.fr', '').replace('http://localhost:4321', '');
    }
    if (href.startsWith('/') && !href.startsWith('//') && !href.startsWith('/images') && !href.startsWith('/assets') && !href.startsWith('/favicon') && !href.startsWith('/robots.txt') && !href.startsWith('/sitemap')) {
      const cleanHref = href.split('#')[0].split('?')[0];
      if (cleanHref && cleanHref !== '/' && !cleanHref.endsWith('/') && !cleanHref.includes('.')) {
        if (!missingMap[cleanHref]) missingMap[cleanHref] = new Set();
        missingMap[cleanHref].add(route);
      }
    }
  }
}

for (const [href, pages] of Object.entries(missingMap)) {
  console.log(`Href: ${href} (found on ${pages.size} pages: ${[...pages].slice(0, 3).join(', ')})`);
}
