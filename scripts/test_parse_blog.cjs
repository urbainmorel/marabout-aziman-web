const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

// Read blogData.ts
const content = fs.readFileSync(path.join(__dirname, '../src/data/blogData.ts'), 'utf8');

// Extract categories and articles using eval or JSON
const catMatch = content.match(/export const blogCategories:\s*BlogCategory\[\]\s*=\s*(\[[\s\S]*?\]);/);
const artMatch = content.match(/export const allBlogArticles:\s*BlogArticle\[\]\s*=\s*(\[[\s\S]*?\]);/);

if (!catMatch || !artMatch) {
  console.error('Could not extract data from blogData.ts');
  process.exit(1);
}

const blogCategories = JSON.parse(catMatch[1]);
const allBlogArticles = JSON.parse(artMatch[1]);

console.log(`Found ${blogCategories.length} categories and ${allBlogArticles.length} articles.`);
