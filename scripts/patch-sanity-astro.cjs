const fs = require('fs');
const path = require('path');

const filesToPatch = [
  path.join(__dirname, '..', 'node_modules', '@sanity', 'astro', 'dist', 'sanity-astro.mjs'),
  path.join(__dirname, '..', 'node_modules', '@sanity', 'astro', 'dist', 'sanity-astro.js')
];

let patchedCount = 0;

for (const filePath of filesToPatch) {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Fix Windows path separator bug where /\/package\.json$/ does not match backslash on Windows
    if (content.includes('/\\/package\\.json$/')) {
      content = content.replace(/\/\\\/package\\\.json\$\//g, '/[/\\\\]package\\.json$/');
      fs.writeFileSync(filePath, content, 'utf8');
      patchedCount++;
    }
  }
}

console.log(`[patch-sanity-astro] Patched ${patchedCount} files for Windows support.`);
