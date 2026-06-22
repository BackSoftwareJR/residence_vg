import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';
import { BreadcrumbListSchema } from '@/components/JsonLd';
import GalleriaClient from './GalleriaClient';

export const metadata: Metadata = createPageMetadata({
  title: 'Galleria Foto - Residenza Anziani Cabiate | Residence V.G',
  description:
    'Scopri gli spazi del Residence V.G a Cabiate (CO): camere luminose, sale comuni, giardino e terrazzo. Residenza per anziani autosufficienti in provincia di Como.',
  path: '/galleria',
  keywords: [
    'galleria residenza anziani Cabiate',
    'foto casa famiglia Como',
    'struttura anziani autosufficienti Brianza',
  ],
  ogImage: '/images/6vg.webp',
});

export default function GalleriaPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0E1810]">
      <BreadcrumbListSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Galleria', path: '/galleria' },
        ]}
      />
      <h1 className="sr-only">Galleria Fotografica - Residenza Anziani Cabiate</h1>
      <GalleriaClient />
    </div>
  );
}
