import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = 'https://vgresidence.com';
const articlesPath = path.join(__dirname, '../src/data/blog/articles.ts');
const outputPath = path.join(__dirname, '../public/sitemap.xml');

const mainPages = [
  { loc: BASE, changefreq: 'weekly', priority: '1.0' },
  { loc: `${BASE}/galleria`, changefreq: 'weekly', priority: '0.9' },
  { loc: `${BASE}/dove-siamo`, changefreq: 'weekly', priority: '0.9' },
  { loc: `${BASE}/servizi`, changefreq: 'weekly', priority: '0.85' },
  { loc: `${BASE}/chi-siamo`, changefreq: 'weekly', priority: '0.85' },
  { loc: `${BASE}/faq`, changefreq: 'weekly', priority: '0.8' },
  { loc: `${BASE}/contatti`, changefreq: 'weekly', priority: '0.85' },
  { loc: `${BASE}/blog`, changefreq: 'weekly', priority: '0.8' },
  { loc: `${BASE}/privacy`, changefreq: 'weekly', priority: '0.3' },
  { loc: `${BASE}/cookie`, changefreq: 'weekly', priority: '0.3' },
];

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toLastMod(date) {
  return new Date(date).toISOString();
}

function urlEntry({ loc, lastmod, changefreq, priority }) {
  return [
    '  <url>',
    `    <loc>${escapeXml(loc)}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].join('\n');
}

const articlesContent = fs.readFileSync(articlesPath, 'utf8');
const articleRe = /slug:\s*'([^']+)'[\s\S]*?date:\s*'([^']+)'/g;
const blogPages = [];
let match;

while ((match = articleRe.exec(articlesContent)) !== null) {
  blogPages.push({
    loc: `${BASE}/blog/${match[1]}`,
    lastmod: toLastMod(match[2]),
    changefreq: 'monthly',
    priority: '0.7',
  });
}

const now = new Date().toISOString();
const staticPages = mainPages.map((page) => ({
  ...page,
  lastmod: now,
}));

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...staticPages.map(urlEntry),
  ...blogPages.map(urlEntry),
  '</urlset>',
  '',
].join('\n');

fs.writeFileSync(outputPath, xml, 'utf8');
console.log(`Generated ${staticPages.length + blogPages.length} URLs → public/sitemap.xml`);
