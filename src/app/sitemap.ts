import type { MetadataRoute } from 'next';
import { blogArticles } from '@/data/blog/articles';
import { CANONICAL_BASE } from '@/lib/seo';

const mainPages: MetadataRoute.Sitemap = [
  { url: `${CANONICAL_BASE}/`, changeFrequency: 'weekly', priority: 1 },
  { url: `${CANONICAL_BASE}/galleria`, changeFrequency: 'weekly', priority: 0.9 },
  { url: `${CANONICAL_BASE}/dove-siamo`, changeFrequency: 'weekly', priority: 0.9 },
  { url: `${CANONICAL_BASE}/servizi`, changeFrequency: 'weekly', priority: 0.85 },
  { url: `${CANONICAL_BASE}/chi-siamo`, changeFrequency: 'weekly', priority: 0.85 },
  { url: `${CANONICAL_BASE}/faq`, changeFrequency: 'weekly', priority: 0.8 },
  { url: `${CANONICAL_BASE}/contatti`, changeFrequency: 'weekly', priority: 0.85 },
  { url: `${CANONICAL_BASE}/blog`, changeFrequency: 'weekly', priority: 0.8 },
  { url: `${CANONICAL_BASE}/privacy`, changeFrequency: 'weekly', priority: 0.3 },
  { url: `${CANONICAL_BASE}/cookie`, changeFrequency: 'weekly', priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const blogPages: MetadataRoute.Sitemap = blogArticles.map((article) => ({
    url: `${CANONICAL_BASE}/blog/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    ...mainPages.map((page) => ({ ...page, lastModified: now })),
    ...blogPages,
  ];
}
