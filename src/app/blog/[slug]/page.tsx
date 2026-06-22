import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  blogArticles,
  getArticleBySlug,
  getCategoryNameById,
  getRelatedArticles,
} from '@/data/blog/articles';
import { createArticleMetadata } from '@/lib/seo';
import { MarkdownContent } from '@/lib/markdown';
import Breadcrumbs from '@/components/blog/Breadcrumbs';
import { ArticleSchema, BreadcrumbListSchema } from '@/components/JsonLd';
import { siteConfig } from '@/data/content';
import { Phone } from 'lucide-react';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return blogArticles.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};

  return createArticleMetadata({
    title: `${article.title} | Residence V.G`,
    description: article.excerpt,
    path: `/blog/${article.slug}`,
    keywords: article.tags,
    ogImage: article.image,
    publishedTime: article.date,
  });
}

export default function BlogArticlePage({ params }: PageProps) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const related = getRelatedArticles(article, 3);
  const categoryName = getCategoryNameById(article.category) ?? article.category;

  return (
    <article className="min-h-screen bg-linen-100 pb-24 pt-24">
      <ArticleSchema
        title={article.title}
        description={article.excerpt}
        slug={article.slug}
        datePublished={article.date}
        author={article.author}
        image={article.image}
      />
      <BreadcrumbListSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: article.title, path: `/blog/${article.slug}` },
        ]}
      />

      <div className="container-site max-w-3xl">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: article.title },
          ]}
        />

        <header className="mb-10">
          <p className="font-sans text-sm font-semibold uppercase tracking-wider text-gold-700">
            {categoryName}
          </p>
          <h1 className="mt-3 heading-display text-display-sm md:text-display-md">
            {article.title}
          </h1>
          <div className="gold-divider mt-6" />
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 font-sans text-sm text-ink-muted">
            <span>{article.author}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={article.date}>
              {new Date(article.date).toLocaleDateString('it-IT', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
            <span aria-hidden="true">·</span>
            <span>{article.readingTime} min di lettura</span>
          </div>
          {article.reviewedBy && (
            <p className="mt-3 font-sans text-sm text-ink-muted">
              Revisionato da {article.reviewedBy}
              {article.reviewerRole ? ` — ${article.reviewerRole}` : ''}
            </p>
          )}
        </header>

        <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-2xl shadow-warm-md">
          <Image
            src={article.image}
            alt={article.imageAlt}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        <MarkdownContent content={article.content} />

        <aside className="mt-12 rounded-2xl bg-forest p-6 text-white md:p-8">
          <h2 className="font-display text-xl font-semibold">Hai domande sulla nostra struttura?</h2>
          <p className="mt-2 font-sans text-sm text-white/70">
            Siamo a Cabiate (CO), residenza per anziani autosufficienti con massimo 10 ospiti.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={`tel:${siteConfig.contact.phoneRaw}`} className="btn-primary">
              <Phone size={14} />
              {siteConfig.contact.phone}
            </a>
            <Link href="/contatti" className="btn-ghost-white">
              Prenota una visita
            </Link>
          </div>
        </aside>

        {related.length > 0 && (
          <section className="mt-14" aria-label="Articoli correlati">
            <h2 className="font-display text-2xl font-semibold text-forest">Articoli correlati</h2>
            <ul className="mt-6 space-y-4">
              {related.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/blog/${item.slug}`}
                    className="group block rounded-xl bg-white p-4 shadow-warm-sm transition-shadow hover:shadow-warm-md"
                  >
                    <p className="font-sans text-xs font-semibold uppercase tracking-wider text-gold-700">
                      {getCategoryNameById(item.category) ?? item.category}
                    </p>
                    <p className="mt-1 font-display text-lg font-semibold text-forest group-hover:text-forest-700">
                      {item.title}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="mt-10 font-sans text-sm">
          <Link href="/blog" className="text-forest underline underline-offset-2 hover:text-gold-700">
            ← Torna al blog
          </Link>
        </p>
      </div>
    </article>
  );
}
