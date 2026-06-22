import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';
import StorySection from '@/components/sections/StorySection';
import ManifestoSection from '@/components/sections/ManifestoSection';
import { BreadcrumbListSchema } from '@/components/JsonLd';
import Breadcrumbs from '@/components/blog/Breadcrumbs';

export const metadata: Metadata = createPageMetadata({
  title: 'Chi Siamo - Residenza Anziani Cabiate | Residence V.G',
  description:
    'Scopri la storia e i valori del Residence V.G: residenza per anziani autosufficienti a Cabiate (CO), max 10 ospiti, ambiente familiare e assistenza H24.',
  path: '/chi-siamo',
  keywords: [
    'chi siamo residenza anziani Cabiate',
    'casa famiglia anziani Como',
    'Residence V.G storia',
  ],
});

export default function ChiSiamoPage() {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Chi siamo', path: '/chi-siamo' },
        ]}
      />
      <div className="bg-linen-100 pt-24">
        <div className="container-site pb-4">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Chi siamo' },
            ]}
          />
          <h1 className="sr-only">Chi Siamo — Residence V.G Residenza Anziani Cabiate</h1>
        </div>
      </div>
      <ManifestoSection />
      <StorySection />
    </>
  );
}
