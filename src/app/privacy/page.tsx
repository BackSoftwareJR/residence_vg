import type { Metadata } from 'next';
import { siteConfig } from '@/data/content';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Privacy Policy | Residence V.G Cabiate',
  description:
    'Informativa sulla privacy del sito Residence V.G, residenza per anziani autosufficienti a Cabiate (CO). Titolare del trattamento: Residence per Anziani Group V.G.',
  path: '/privacy',
  keywords: ['privacy policy Residence V.G', 'informativa privacy residenza anziani'],
  noIndex: true,
});

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-linen-100 pb-24 pt-24">
      <div className="container-site max-w-prose-wide">
        <h1 className="heading-display text-display-sm mb-6">Privacy Policy</h1>
        <p className="font-sans text-sm text-ink-muted mb-8">
          Titolare del trattamento: {siteConfig.nameFull} — P.IVA {siteConfig.piva}
        </p>
        <div className="rounded-2xl bg-white p-6 shadow-warm-sm md:p-8">
          <p className="font-sans text-sm leading-relaxed text-ink-light">
            Il documento completo della privacy policy è disponibile in formato PDF.
          </p>
          <a
            href="/uploads/Informativa utenti sito web CASA ANZIANI.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 font-sans text-sm font-semibold text-white hover:bg-forest-700 transition-colors"
          >
            Scarica PDF Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
}
