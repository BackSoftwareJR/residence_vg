import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';
import ServicesSection from '@/components/sections/ServicesSection';
import DailyRoutine from '@/components/sections/DailyRoutine';
import { BreadcrumbListSchema } from '@/components/JsonLd';
import Breadcrumbs from '@/components/blog/Breadcrumbs';

export const metadata: Metadata = createPageMetadata({
  title: 'Servizi - Residenza Anziani Autosufficienti Cabiate | Residence V.G',
  description:
    'Assistenza H24, vitto personalizzato, pulizia, attività ricreative e progetto di vita individuale. Servizi inclusi nella residenza per anziani a Cabiate (CO).',
  path: '/servizi',
  keywords: [
    'servizi residenza anziani Cabiate',
    'assistenza anziani autosufficienti Como',
    'casa famiglia servizi Brianza',
  ],
});

export default function ServiziPage() {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Servizi', path: '/servizi' },
        ]}
      />
      <div className="bg-linen-100 pt-24">
        <div className="container-site pb-4">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Servizi' },
            ]}
          />
          <h1 className="sr-only">Servizi — Residenza Anziani Autosufficienti Cabiate</h1>
        </div>
      </div>
      <ServicesSection />
      <DailyRoutine />
    </>
  );
}
