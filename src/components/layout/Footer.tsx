import Link from 'next/link';
import Image from 'next/image';
import { siteConfig, assets } from '@/data/content';
import LocationMap from '@/components/ui/location-map';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

const quickLinks = [
  { label: 'Chi siamo',      href: '/#chi-siamo' },
  { label: 'Servizi',        href: '/#servizi' },
  { label: 'La nostra giornata', href: '/#' },
  { label: 'Galleria',       href: '/galleria' },
  { label: 'Dove siamo',     href: '/dove-siamo' },
  { label: 'Blog',           href: '/blog' },
  { label: 'Prenota visita', href: '/#contatti' },
];

export default function Footer() {
  const { contact } = siteConfig;

  return (
    <footer className="relative overflow-hidden bg-forest" role="contentinfo">
      {/* Radial warm glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 15% 30%, rgba(201,168,76,0.35) 0%, transparent 65%)' }}
        aria-hidden="true"
      />

      {/* Decorative watermark */}
      <div
        className="pointer-events-none absolute -right-10 top-0 select-none font-display font-bold leading-none text-white opacity-[0.03]"
        style={{ fontSize: 'clamp(12rem, 25vw, 22rem)', letterSpacing: '-0.05em' }}
        aria-hidden="true"
      >
        V.G
      </div>

      {/* Gold top line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      {/* ── Pre-footer CTA strip ── */}
      <div className="relative border-b border-white/8">
        <div className="container-site py-10 md:py-12">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-gold/70">Vieni a conoscerci</p>
              <h2
                className="mt-2 font-display font-semibold text-white"
                style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', letterSpacing: '-0.02em' }}
              >
                Prenota una visita gratuita
              </h2>
              <p className="mt-1.5 font-sans text-sm text-white/50">
                Nessun obbligo. Ti mostriamo ogni spazio con piacere.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row shrink-0">
              <a
                href={`tel:${contact.phoneRaw}`}
                className="btn-primary group whitespace-nowrap"
              >
                <Phone size={14} strokeWidth={2.5} className="transition-transform group-hover:rotate-12" />
                {contact.phone}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </a>
              <a
                href={`https://wa.me/${contact.whatsapp}?text=Buongiorno%2C%20vorrei%20prenotare%20una%20visita`}
                target="_blank" rel="noopener noreferrer"
                className="btn-ghost-white whitespace-nowrap"
              >
                <MessageCircle size={14} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main footer grid ── */}
      <div className="relative container-site py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-12">

          {/* Brand col — 5/12 */}
          <div className="md:col-span-5">
            <Link href="/" className="group inline-flex items-center gap-3">
              <Image
                src={assets.logo}
                alt="Residence V.G"
                width={44}
                height={44}
                className="h-10 w-auto brightness-0 invert transition-opacity group-hover:opacity-80"
              />
              <span className="font-display text-xl font-semibold text-white">Residence V.G</span>
            </Link>

            {/* Tagline */}
            <blockquote className="mt-5">
              <p
                className="font-display italic leading-snug text-gold/70"
                style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}
              >
                &ldquo;Libertà, accoglienza,<br />empatia e rispetto.&rdquo;
              </p>
            </blockquote>

            <p className="mt-5 max-w-xs font-sans text-sm leading-relaxed text-white/45">
              Residenza per anziani autosufficienti e parzialmente autosufficienti a Cabiate, in provincia di Como.
              Massimo 10 ospiti, assistenza H24.
            </p>

            {/* Contact essentials */}
            <ul className="mt-7 space-y-2.5">
              {[
                { icon: Phone, label: contact.phone, href: `tel:${contact.phoneRaw}` },
                { icon: MessageCircle, label: contact.whatsappDisplay, href: `https://wa.me/${contact.whatsapp}` },
                { icon: Mail, label: contact.email, href: `mailto:${contact.email}` },
              ].map(({ icon: Icon, label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group inline-flex items-center gap-2.5 font-sans text-sm text-white/50 transition-colors hover:text-gold"
                  >
                    <Icon size={13} className="text-gold/40 transition-colors group-hover:text-gold" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-1" />

          {/* Quick links — 3/12 */}
          <div className="md:col-span-3">
            <h3 className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-gold/60">
              Navigazione
            </h3>
            <ul className="mt-5 space-y-2">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 font-sans text-sm text-white/50 transition-colors hover:text-white"
                  >
                    <span className="h-px w-0 bg-gold transition-all duration-200 group-hover:w-3" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Address + hours — 3/12 */}
          <div className="md:col-span-3">
            <h3 className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-gold/60">
              Dove siamo
            </h3>
            <div className="mt-5 space-y-4">
              <a
                href={contact.maps.googlemaps}
                target="_blank" rel="noopener noreferrer"
                className="group flex items-start gap-2.5 text-sm text-white/50 transition-colors hover:text-white"
              >
                <MapPin size={14} className="mt-0.5 shrink-0 text-gold/40 group-hover:text-gold" />
                <span className="font-sans leading-snug">
                  {contact.address.street}<br />
                  {contact.address.cap} {contact.address.city} ({contact.address.province})
                </span>
              </a>
              <div className="flex items-center gap-2.5 font-sans text-sm text-white/50">
                <Clock size={13} className="shrink-0 text-gold/40" />
                {contact.hours}
              </div>
            </div>

            <div className="mt-6">
              <a
                href={contact.maps.googlemaps}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Apri mappa Residence V.G su Google Maps"
                className="block transition-transform duration-300 hover:scale-[1.02]"
              >
                <LocationMap variant="compact" showFooter={false} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="relative border-t border-white/8">
        <div className="container-site flex flex-col items-center gap-3 py-5 md:flex-row md:justify-between">
          <p className="text-center font-sans text-xs text-white/25 md:text-left">
            © {new Date().getFullYear()} Residence Group V.G Srl · P.IVA {siteConfig.piva}
          </p>
          <div className="flex gap-5">
            {[
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Cookie Policy', href: '/cookie' },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-sans text-xs text-white/25 transition-colors hover:text-white/50"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="container-site border-t border-white/5 pb-5 pt-3 text-center">
          <p className="font-sans text-xs text-white/30">
            Realizzato da{' '}
            <a
              href="https://backsoftware.it"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-gold/75 transition-colors hover:text-gold"
            >
              BackSoftware
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
