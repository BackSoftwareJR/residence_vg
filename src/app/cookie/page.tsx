import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Cookie Policy | Residence V.G Cabiate',
  description:
    'Cookie policy del sito Residence V.G. Informazioni sull\'utilizzo dei cookie e sulle preferenze di navigazione per il sito della residenza anziani a Cabiate (CO).',
  path: '/cookie',
  keywords: ['cookie policy Residence V.G', 'cookie sito residenza anziani'],
  noIndex: true,
});

export default function CookiePage() {
  return (
    <div className="min-h-screen bg-linen-100 pb-24 pt-24">
      <div className="container-site max-w-prose-wide">
        <h1 className="heading-display text-display-sm mb-6">Cookie Policy</h1>
        <div className="rounded-2xl bg-white p-6 shadow-warm-sm md:p-8">
          <p className="font-sans text-sm leading-relaxed text-ink-light">
            Il documento completo della cookie policy è disponibile in formato PDF.
          </p>
          <a
            href="/uploads/Cookie policy CASA ANZIANI.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 font-sans text-sm font-semibold text-white hover:bg-forest-700 transition-colors"
          >
            Scarica PDF Cookie Policy
          </a>
        </div>
      </div>
    </div>
  );
}
