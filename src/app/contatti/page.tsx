import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';
import VisitSection from '@/components/sections/VisitSection';
import { BreadcrumbListSchema } from '@/components/JsonLd';
import Breadcrumbs from '@/components/blog/Breadcrumbs';

export const metadata: Metadata = createPageMetadata({
  title: 'Contatti - Prenota una Visita | Residence V.G Cabiate',
  description:
    'Contatta il Residence V.G a Cabiate (CO) per informazioni o per prenotare una visita gratuita. Telefono, WhatsApp ed email. Residenza anziani autosufficienti in provincia di Como.',
  path: '/contatti',
  keywords: [
    'contatti residenza anziani Cabiate',
    'prenota visita casa famiglia Como',
    'Residence V.G telefono',
  ],
});

export default function ContattiPage() {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Contatti', path: '/contatti' },
        ]}
      />
      <div className="bg-linen-100 pt-24">
        <div className="container-site pb-4">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Contatti' },
            ]}
          />
          <h1 className="sr-only">Contatti — Prenota una Visita al Residence V.G Cabiate</h1>
        </div>
      </div>
      <VisitSection />
    </>
  );
}
