import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { siteConfig } from '@/data/content';
import { createPageMetadata } from '@/lib/seo';
import { BreadcrumbListSchema } from '@/components/JsonLd';
import Breadcrumbs from '@/components/blog/Breadcrumbs';
import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';

const LocationMap = dynamic(() => import('@/components/ui/location-map'), {
  loading: () => <div className="h-[420px] rounded-2xl bg-linen-200" aria-hidden="true" />,
});

export const metadata: Metadata = createPageMetadata({
  title: 'Come Arrivare a Residence V.G - Cabiate (CO) | Residenza Anziani',
  description:
    'Come raggiungere il Residence V.G in Via Francesco Petrarca 14, Cabiate (CO). Indicazioni in auto, treno e mezzi pubblici. Residenza anziani autosufficienti in provincia di Como.',
  path: '/dove-siamo',
  keywords: [
    'come arrivare residenza anziani Cabiate',
    'Residence V.G indirizzo Como',
    'struttura anziani Brianza mappa',
  ],
  ogImage: '/images/IMG_4208.webp',
});

export default function DoveSiamoPage() {
  const { contact } = siteConfig;

  return (
    <div className="min-h-screen bg-linen-100 pb-24 pt-24">
      <BreadcrumbListSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Dove siamo', path: '/dove-siamo' },
        ]}
      />
      <div className="container-site">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Dove siamo' },
          ]}
        />

        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-3 font-sans text-sm font-semibold uppercase tracking-widest text-gold">
            Vieni a trovarci
          </p>
          <h1 className="sr-only">Come Raggiungere Residence V.G a Cabiate</h1>
          <h2 className="heading-display text-display-sm md:text-display-md">
            Dove siamo
          </h2>
          <div className="gold-divider mt-6" />
          <p className="mx-auto mt-5 max-w-xl font-sans text-base text-ink-light">
            Siamo nel cuore della Brianza comasca, facilmente raggiungibili in auto, in treno o con i mezzi pubblici.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <LocationMap variant="full" />

          {/* Info */}
          <div className="space-y-8">
            {/* Indirizzo */}
            <div className="rounded-2xl bg-white p-6 shadow-warm-sm">
              <h2 className="mb-4 font-display text-xl font-semibold text-forest">Indirizzo</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-gold" />
                  <div>
                    <p className="font-sans text-sm font-semibold text-ink">{contact.address.street}</p>
                    <p className="font-sans text-sm text-ink-muted">{contact.address.cap} {contact.address.city} ({contact.address.province})</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={18} className="shrink-0 text-gold" />
                  <p className="font-sans text-sm text-ink-light">{contact.hours}</p>
                </div>
              </div>
            </div>

            {/* Come arrivare */}
            <div className="rounded-2xl bg-white p-6 shadow-warm-sm">
              <h2 className="mb-4 font-display text-xl font-semibold text-forest">Come arrivare</h2>
              <div className="space-y-3 font-sans text-sm text-ink-light">
                <div>
                  <p className="font-semibold text-ink">In auto</p>
                  <p>Da Como: SS35 direzione Milano, uscita Cabiate. Da Milano: A9 uscita Lomazzo.</p>
                </div>
                <div>
                  <p className="font-semibold text-ink">In treno</p>
                  <p>Linea S11 Milano–Como: fermata Cabiate, a 5 minuti a piedi dalla struttura.</p>
                </div>
                <div>
                  <p className="font-semibold text-ink">Parcheggio</p>
                  <p>Parcheggio gratuito disponibile nelle vicinanze della struttura.</p>
                </div>
              </div>
            </div>

            {/* Contatti diretti */}
            <div className="rounded-2xl bg-forest p-6 shadow-warm-md">
              <h2 className="mb-4 font-display text-xl font-semibold text-white">Contattaci</h2>
              <div className="space-y-3">
                <a href={`tel:${contact.phoneRaw}`} className="flex items-center gap-3 text-white/80 hover:text-gold transition-colors">
                  <Phone size={16} className="text-gold/60" />
                  <span className="font-sans text-sm">{contact.phone}</span>
                </a>
                <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/80 hover:text-gold transition-colors">
                  <MessageSquare size={16} className="text-gold/60" />
                  <span className="font-sans text-sm">{contact.whatsappDisplay}</span>
                </a>
                <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-white/80 hover:text-gold transition-colors">
                  <Mail size={16} className="text-gold/60" />
                  <span className="font-sans text-sm">{contact.email}</span>
                </a>
              </div>
              <a
                href="/#contatti"
                className="mt-5 flex w-full items-center justify-center rounded-full bg-gold py-3 font-sans text-sm font-semibold text-forest hover:bg-gold-300 transition-colors"
              >
                Prenota una visita gratuita
              </a>
            </div>
          </div>
        </div>

        {/* Photo */}
        <div className="mt-12 overflow-hidden rounded-2xl">
          <Image
            src="/images/IMG_4208.webp"
            alt="Esterno residenza anziani Cabiate — struttura anziani autosufficienti Residence V.G"
            width={1200}
            height={400}
            sizes="(max-width: 768px) 100vw, 1200px"
            loading="lazy"
            className="h-56 w-full object-cover md:h-80"
          />
        </div>
      </div>
    </div>
  );
}
