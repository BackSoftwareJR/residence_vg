import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { blogArticles, getCategoryNameById } from '@/data/blog/articles';
import { createPageMetadata } from '@/lib/seo';
import Breadcrumbs from '@/components/blog/Breadcrumbs';
import { BreadcrumbListSchema } from '@/components/JsonLd';

export const metadata: Metadata = createPageMetadata({
  title: 'Blog — Consigli e Benessere per Anziani | Residence V.G Cabiate',
  description:
    'Articoli su benessere, alimentazione, attività ricreative e assistenza agli anziani. Consigli pratici per famiglie in Brianza e provincia di Como.',
  path: '/blog',
  keywords: [
    'blog anziani Cabiate',
    'consigli casa famiglia Como',
    'benessere terza età',
    'residenza anziani Brianza',
  ],
});

export default function BlogIndexPage() {
  const sorted = [...blogArticles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <div className="min-h-screen bg-linen-100 pb-24 pt-24">
      <BreadcrumbListSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
        ]}
      />
      <div className="container-site">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Blog' },
          ]}
        />

        <header className="mb-12 max-w-3xl">
          <p className="mb-3 font-sans text-sm font-semibold uppercase tracking-widest text-gold">
            Blog
          </p>
          <h1 className="heading-display text-display-sm md:text-display-md">
            Consigli e benessere per anziani e famiglie
          </h1>
          <div className="gold-divider mt-6" />
          <p className="mt-5 font-sans text-base text-ink-light">
            Approfondimenti su vita in residenza, salute, alimentazione e attività a Cabiate e in provincia di Como.
          </p>
        </header>

        <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sorted.map((article) => (
            <li key={article.id}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-warm-sm transition-shadow hover:shadow-warm-md">
                <Link href={`/blog/${article.slug}`} className="relative block aspect-[16/10] overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-5">
                  <p className="font-sans text-xs font-semibold uppercase tracking-wider text-gold-700">
                    {getCategoryNameById(article.category) ?? article.category}
                  </p>
                  <h2 className="mt-2 font-display text-xl font-semibold text-forest">
                    <Link href={`/blog/${article.slug}`} className="hover:text-forest-700">
                      {article.title}
                    </Link>
                  </h2>
                  <p className="mt-2 flex-1 font-sans text-sm leading-relaxed text-ink-light">
                    {article.excerpt}
                  </p>
                  <div className="mt-4 flex items-center justify-between font-sans text-xs text-ink-muted">
                    <time dateTime={article.date}>
                      {new Date(article.date).toLocaleDateString('it-IT', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </time>
                    <span>{article.readingTime} min di lettura</span>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
