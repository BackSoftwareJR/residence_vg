import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';
import FAQSection from '@/components/sections/FAQSection';
import { FAQPageSchema, BreadcrumbListSchema } from '@/components/JsonLd';
import { faqs } from '@/data/content';
import Breadcrumbs from '@/components/blog/Breadcrumbs';

export const metadata: Metadata = createPageMetadata({
  title: 'FAQ - Domande Frequenti Residenza Anziani Cabiate | Residence V.G',
  description:
    'Risposte alle domande più frequenti su ingresso, prezzi, visite e servizi del Residence V.G, residenza per anziani autosufficienti a Cabiate (CO).',
  path: '/faq',
  keywords: [
    'FAQ residenza anziani Cabiate',
    'domande casa famiglia Como',
    'costi residenza anziani Brianza',
  ],
});

export default function FaqPage() {
  return (
    <>
      <FAQPageSchema items={faqs} />
      <BreadcrumbListSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'FAQ', path: '/faq' },
        ]}
      />
      <div className="bg-linen-100 pt-24">
        <div className="container-site pb-4">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'FAQ' },
            ]}
          />
          <h1 className="sr-only">Domande Frequenti — Residenza Anziani Cabiate</h1>
        </div>
      </div>
      <FAQSection />
    </>
  );
}
