'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { navigation, siteConfig, assets } from '@/data/content';
import { Menu, X, Phone, MessageCircle, Mail } from 'lucide-react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  /* Scroll state */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Lock body when menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  /* Scroll progress bar */
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const isHome = pathname === '/';

  return (
    <>
      {/* ── Navbar ── */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 shadow-[0_1px_0_rgba(212,207,199,0.8)] backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        {/* Scroll progress line */}
        <motion.div
          style={{ width: progressWidth }}
          className="absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-gold/60 via-gold to-gold/60 origin-left"
        />

        <div className="container-site flex h-16 items-center justify-between md:h-20">

          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3"
            onClick={() => setMenuOpen(false)}
          >
            <div className={`relative overflow-hidden rounded-xl transition-all duration-300 ${scrolled ? '' : 'brightness-0 invert'}`}>
              <Image
                src={assets.logo}
                alt={siteConfig.name}
                width={44}
                height={44}
                priority
                className="h-9 w-auto md:h-11"
              />
            </div>
            <span
              className={`font-display text-lg font-semibold tracking-tight transition-colors duration-300 md:text-xl ${
                scrolled ? 'text-forest' : 'text-white'
              }`}
            >
              Residence V.G
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Navigazione principale" className="hidden lg:flex items-center gap-0.5">
            {navigation.map((item) => {
              const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href.replace('/#', '/')));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative px-4 py-2 font-sans text-sm font-medium transition-colors duration-200 ${
                    scrolled
                      ? active ? 'text-forest' : 'text-ink-muted hover:text-forest'
                      : active ? 'text-white' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {item.label}
                  {/* Animated underline */}
                  <span
                    className={`absolute bottom-0 left-4 right-4 h-px rounded-full bg-gold transition-all duration-300 origin-left ${
                      active ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-60'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Buongiorno%2C%20vorrei%20informazioni`}
              target="_blank" rel="noopener noreferrer"
              aria-label="WhatsApp"
              className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 ${
                scrolled
                  ? 'border-linen-300 text-ink-muted hover:border-[#25D366] hover:text-[#25D366]'
                  : 'border-white/30 text-white/70 hover:border-white hover:text-white'
              }`}
            >
              <MessageCircle size={16} />
            </a>
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 font-sans text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                scrolled
                  ? 'bg-forest text-white shadow-warm-sm hover:bg-forest-700 hover:shadow-warm-md'
                  : 'bg-gold text-forest hover:bg-gold-300'
              }`}
              style={scrolled ? {} : { boxShadow: '0 4px 20px rgba(201,168,76,0.40)' }}
            >
              <Phone size={14} strokeWidth={2.5} />
              {siteConfig.contact.phone}
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
            aria-expanded={menuOpen}
            className={`relative z-50 flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 lg:hidden ${
              menuOpen
                ? 'bg-forest/10 text-forest'
                : scrolled ? 'text-forest hover:bg-forest/5' : 'text-white hover:bg-white/10'
            }`}
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X size={20} />
                </motion.span>
              ) : (
                <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* ── Full-screen mobile overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col bg-forest lg:hidden"
          >
            {/* Warm radial bg */}
            <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 50% at 20% 80%, rgba(201,168,76,0.12) 0%, transparent 60%)' }} />

            {/* Nav links — big */}
            <nav aria-label="Menu mobile" className="flex flex-1 flex-col items-start justify-center px-8 pb-8 pt-24">
              {navigation.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-center gap-3 py-3"
                  >
                    <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-6" />
                    <span
                      className="font-display font-semibold text-white/60 transition-colors duration-200 group-hover:text-white"
                      style={{ fontSize: 'clamp(1.8rem, 5vw, 2.6rem)', letterSpacing: '-0.02em' }}
                    >
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom contact strip */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="border-t border-white/10 px-8 py-6"
            >
              <p className="mb-4 font-sans text-xs uppercase tracking-[0.18em] text-white/30">Contattaci</p>
              <div className="flex flex-col gap-3">
                <a
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="flex items-center gap-3 font-sans text-sm font-semibold text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/15">
                    <Phone size={14} className="text-gold" />
                  </span>
                  {siteConfig.contact.phone}
                </a>
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 font-sans text-sm font-semibold text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366]/15">
                    <MessageCircle size={14} className="text-[#25D366]" />
                  </span>
                  {siteConfig.contact.whatsappDisplay}
                </a>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-3 font-sans text-sm font-semibold text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/15">
                    <Mail size={14} className="text-gold" />
                  </span>
                  {siteConfig.contact.email}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
