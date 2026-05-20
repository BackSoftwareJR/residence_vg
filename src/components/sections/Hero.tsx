'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Phone, MessageCircle, ArrowDown } from 'lucide-react';
import { siteConfig } from '@/data/content';

const slides = [
  { src: '/images/6vg.webp',                          alt: 'Terrazza Residence V.G',           caption: 'La terrazza, aperta ogni mattina' },
  { src: '/images/foto_orizzontali/IMG_2382.webp',     alt: 'Vita quotidiana Residence V.G',    caption: 'Momenti veri, ogni pomeriggio' },
  { src: '/images/4vg.webp',                          alt: 'Camera Residence V.G',              caption: 'Il tuo spazio, la tua luce' },
  { src: '/images/foto_orizzontali/IMG_2387.webp',     alt: 'Attività Residence V.G',           caption: 'Movimento, vitalità, buonumore' },
  { src: '/images/3vg.webp',                          alt: 'Sala pranzo Residence V.G',         caption: 'A tavola, ogni giorno insieme' },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const prefersReduced = useReducedMotion();

  const advance = useCallback(() => {
    setPrev(current);
    setCurrent((c) => (c + 1) % slides.length);
  }, [current]);

  useEffect(() => {
    if (prefersReduced) return;
    const t = setInterval(advance, 5000);
    return () => clearInterval(t);
  }, [advance, prefersReduced]);

  return (
    <section className="relative flex min-h-[100dvh] flex-col overflow-hidden" aria-label="Benvenuto">
      {/* ── Carousel background ── */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: prefersReduced ? 1 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Image
              src={slides[current].src}
              alt={slides[current].alt}
              fill priority
              sizes="100vw"
              className={`object-cover ${prefersReduced ? '' : 'ken-burns'}`}
            />
          </motion.div>
        </AnimatePresence>

        {/* Mobile: lighter gradient, content readable from bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/80 md:hidden" />
        {/* Desktop: cinematic grade overlay */}
        <div className="absolute inset-0 hidden bg-gradient-to-b from-black/60 via-black/25 to-black/75 md:block" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-black/30 via-transparent to-black/20 md:block" />
        <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(201,168,76,0.15) 0%, transparent 60%)' }} />
      </div>

      {/* ── Slide indicators ── */}
      <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 gap-2 md:bottom-28">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { setPrev(current); setCurrent(i); }}
            aria-label={`Slide ${i + 1}`}
            className={`h-0.5 rounded-full transition-all duration-500 ${i === current ? 'w-8 bg-gold' : 'w-2.5 bg-white/35 hover:bg-white/60'}`}
          />
        ))}
      </div>

      {/* ── Slide caption (bottom left) ── */}
      <AnimatePresence mode="wait">
        <motion.p
          key={`cap-${current}`}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 12 }}
          transition={{ duration: 0.6 }}
          className="absolute bottom-24 left-6 z-20 hidden font-display text-sm italic text-white/50 md:left-12 md:block"
        >
          {slides[current].caption}
        </motion.p>
      </AnimatePresence>

      {/* ── MOBILE content — minimal, bottom-left ── */}
      <div className="md:hidden relative z-10 flex flex-1 flex-col justify-end px-6 pb-28">
        {/* Tag */}
        <motion.p
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-4 flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-gold/80"
        >
          <span className="h-px w-5 bg-gold/60" />
          Residenza per anziani autosufficienti · Cabiate
        </motion.p>

        {/* Headline */}
        <h1
          className="font-display font-semibold text-white"
          style={{ fontSize: 'clamp(2.8rem, 13vw, 4rem)', lineHeight: 1.04, letterSpacing: '-0.03em' }}
        >
          {['Libertà,', 'accoglienza.'].map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.45 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'block' }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="my-5 h-px w-10 origin-left rounded-full bg-gold/50"
        />

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mb-7 font-sans text-base leading-relaxed text-white/65"
        >
          Per anziani autosufficienti. Max&nbsp;10 ospiti,<br />ogni persona conosciuta per nome.
        </motion.p>

        {/* CTA */}
        <motion.a
          href={`tel:${siteConfig.contact.phoneRaw}`}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05 }}
          className="btn-primary self-start"
        >
          <Phone size={14} strokeWidth={2.5} />
          Chiama ora
        </motion.a>

        {/* Micro trust */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="mt-5 flex items-center gap-4"
        >
          {['Assistenza H24', 'Pasti freschi', 'Max 10 ospiti'].map((b) => (
            <span key={b} className="flex items-center gap-1.5 font-sans text-[11px] text-white/40">
              <span className="text-gold/60">·</span> {b}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── DESKTOP content — centered ── */}
      <div className="container-site relative z-10 hidden flex-1 flex-col items-center justify-center py-32 text-center md:flex">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-gold/40 bg-black/25 px-5 py-2 backdrop-blur-md"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-gold/90">
            Cabiate · Como · Anziani autosufficienti · Max 10 ospiti
          </span>
        </motion.div>

        {/* Headline — word reveal */}
        <h1
          className="font-display font-semibold text-white text-balance"
          style={{ fontSize: 'clamp(3rem, 7.5vw, 5.5rem)', lineHeight: 1.06, letterSpacing: '-0.025em' }}
        >
          {['Libertà,', 'accoglienza,', 'empatia', 'e rispetto'].map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 32, rotateX: 20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.7, delay: 0.4 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'inline-block', marginRight: '0.22em', transformOrigin: 'bottom' }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mx-auto mt-7 max-w-lg font-sans text-lg leading-relaxed text-white/75 md:text-xl"
        >
          Una residenza per anziani autosufficienti a Cabiate, con max&nbsp;10 ospiti.
          Assistenza discreta, sempre presente, mai invasiva.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a href={`tel:${siteConfig.contact.phoneRaw}`} className="btn-primary group">
            <Phone size={15} strokeWidth={2.5} className="transition-transform duration-300 group-hover:rotate-12" />
            Chiama ora — {siteConfig.contact.phone}
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </a>
          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Buongiorno%2C%20vorrei%20informazioni%20su%20Residence%20V.G`}
            target="_blank" rel="noopener noreferrer"
            className="btn-ghost-white"
          >
            <MessageCircle size={15} />
            Scrivici su WhatsApp
          </a>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-3"
        >
          {['Assistenza discreta 24 ore su 24', 'Pasti freschi ogni giorno', 'Progetto di vita individuale', 'Max 10 ospiti'].map((b) => (
            <span key={b} className="flex items-center gap-2 font-sans text-sm text-white/60">
              <span className="text-gold">✦</span> {b}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 md:block"
        aria-hidden="true"
      >
        <motion.div
          animate={prefersReduced ? {} : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1.5 text-white/30"
        >
          <span className="font-sans text-[10px] uppercase tracking-widest">Scorri</span>
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
