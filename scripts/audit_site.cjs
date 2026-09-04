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
console.log('Found HTML files in dist:', htmlFiles.length);

const brokenLinks = [];
const missingTrailingSlash = [];
const placeholderPhones = [];
const missingAlts = [];
const headingIssues = [];
const metaIssues = [];
const schemaIssues = [];

const validRoutes = new Set();
for (const file of htmlFiles) {
  let route = file.replace(/\\/g, '/').replace('./dist', '').replace('dist', '');
  if (route.endsWith('/index.html')) {
    route = route.replace('/index.html', '/');
  } else if (route.endsWith('.html')) {
    route = route.replace('.html', '');
  }
  if (!route.startsWith('/')) route = '/' + route;
  validRoutes.add(route);
  if (route.endsWith('/')) {
    validRoutes.add(route.slice(0, -1));
  } else {
    validRoutes.add(route + '/');
  }
}

const missingSlashHrefs = {};

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const route = file.replace(/\\/g, '/').replace('./dist', '').replace('dist', '');

  // Check phone placeholders
  if (content.includes('XX XX XX') || content.includes('06 XX')) {
    placeholderPhones.push(route);
  }

  // Check H1
  const h1Matches = [...content.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
  if (h1Matches.length === 0) {
    headingIssues.push({ route, issue: 'No H1 found' });
  } else if (h1Matches.length > 1) {
    headingIssues.push({ route, issue: 'Multiple H1s: ' + h1Matches.length });
  }

  // Check Meta Title
  const titleMatch = content.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!titleMatch || !titleMatch[1].trim()) {
    metaIssues.push({ route, issue: 'Missing <title>' });
  }

  // Check Meta Description
  const descMatch = content.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i);
  if (!descMatch || !descMatch[1].trim()) {
    metaIssues.push({ route, issue: 'Missing meta description' });
  }

  // Check <img> alt
  const imgMatches = [...content.matchAll(/<img([^>]+)>/gi)];
  for (const img of imgMatches) {
    if (!img[1].includes('alt=') || /alt=["']\s*["']/.test(img[1])) {
      missingAlts.push({ route, img: img[0].slice(0, 100) });
    }
  }

  // Check Schema JSON-LD
  const schemaMatches = [...content.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  if (schemaMatches.length === 0) {
    schemaIssues.push({ route, issue: 'No JSON-LD schema found' });
  } else {
    for (const sm of schemaMatches) {
      try {
        JSON.parse(sm[1]);
      } catch (e) {
        schemaIssues.push({ route, issue: 'Invalid JSON-LD syntax: ' + e.message });
      }
    }
  }

  // Check <a> links
  const linkMatches = [...content.matchAll(/<a[^>]+href=["']([^"']+)["']/gi)];
  for (const link of linkMatches) {
    let href = link[1].trim();
    if (href.startsWith('http://localhost') || href.startsWith('https://www.marabout-aziman.fr')) {
      href = href.replace('https://www.marabout-aziman.fr', '').replace('http://localhost:4321', '');
    }
    if (href.startsWith('/') && !href.startsWith('//') && !href.startsWith('/images') && !href.startsWith('/assets') && !href.startsWith('/favicon') && !href.startsWith('/robots.txt') && !href.startsWith('/sitemap')) {
      const cleanHref = href.split('#')[0].split('?')[0];
      if (cleanHref && cleanHref !== '/') {
        if (!cleanHref.endsWith('/')) {
          missingTrailingSlash.push({ from: route, to: cleanHref });
          missingSlashHrefs[cleanHref] = (missingSlashHrefs[cleanHref] || 0) + 1;
        }
        if (!validRoutes.has(cleanHref)) {
          brokenLinks.push({ from: route, to: cleanHref });
        }
      }
    }
  }
}

const sortedMissingSlashes = Object.entries(missingSlashHrefs).sort((a,b) => b[1] - a[1]);

const summary = {
  totalHtmlFiles: htmlFiles.length,
  placeholderPhonesCount: placeholderPhones.length,
  placeholderPhonesList: placeholderPhones,
  brokenLinksCount: brokenLinks.length,
  allBrokenLinks: brokenLinks,
  missingTrailingSlashCount: missingTrailingSlash.length,
  topMissingTrailingSlashes: sortedMissingSlashes.slice(0, 30),
  missingAltsCount: missingAlts.length,
  missingAltsSample: missingAlts.slice(0, 20),
  headingIssuesCount: headingIssues.length,
  headingIssues,
  metaIssuesCount: metaIssues.length,
  metaIssues,
  schemaIssuesCount: schemaIssues.length,
  schemaIssues: schemaIssues.slice(0, 20)
};

console.log('--- AUDIT COMPLETE ---');
console.log('Total HTML pages audited:', summary.totalHtmlFiles);
console.log('Placeholder phone numbers detected in pages:', summary.placeholderPhonesCount);
console.log('Broken internal links (404s):', summary.brokenLinksCount);
console.log('Links missing trailing slash:', summary.missingTrailingSlashCount);
console.log('Top missing slash hrefs:', sortedMissingSlashes.slice(0, 10));

fs.writeFileSync('./audit_results.json', JSON.stringify(summary, null, 2));
