import type { Metadata } from 'next';
import { siteConfig } from '@/data/content';

/** Canonical base URL (non-www) per SEO audit */
export const CANONICAL_BASE = 'https://vgresidence.com';

export interface PageSeoOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
}

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${CANONICAL_BASE}${normalized === '/' ? '' : normalized}`;
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
  ogImage = siteConfig.seo.ogImage,
  noIndex = false,
}: PageSeoOptions): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = ogImage.startsWith('http') ? ogImage : `${CANONICAL_BASE}${ogImage}`;

  return {
    title,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    alternates: {
      canonical: path === '/' ? CANONICAL_BASE : url,
    },
    openGraph: {
      type: 'website',
      locale: 'it_IT',
      url,
      siteName: siteConfig.name,
      title,
      description,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}

export function createArticleMetadata({
  title,
  description,
  path,
  keywords = [],
  ogImage,
  publishedTime,
  modifiedTime,
}: PageSeoOptions & {
  publishedTime: string;
  modifiedTime?: string;
}): Metadata {
  const base = createPageMetadata({ title, description, path, keywords, ogImage });
  const url = absoluteUrl(path);

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: 'article',
      publishedTime,
      modifiedTime: modifiedTime ?? publishedTime,
      url,
    },
  };
}
