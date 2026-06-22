'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/animations';

const values = [
  {
    num: '01',
    name: 'Libertà',
    tagline: 'Vivere come si vuole',
    body: 'Ogni ospite mantiene le proprie abitudini, i propri ritmi, i propri desideri. La struttura si adatta a te — non tu alla struttura.',
    accent: '#C9A84C',
    img: '/images/2vg.webp', // finestra aperta sul verde — spazio, apertura
    tint: 'rgba(201,168,76,0.10)',
  },
  {
    num: '02',
    name: 'Accoglienza',
    tagline: 'Porte sempre aperte',
    body: 'La famiglia non è un ospite in visita — è parte della nostra comunità. Vieni quando vuoi, resta quanto vuoi.',
    accent: '#7FA885',
    img: '/images/foto_orizzontali/IMG_2382.webp', // ospiti e staff insieme in sala
    tint: 'rgba(127,168,133,0.10)',
  },
  {
    num: '03',
    name: 'Empatia',
    tagline: 'Ascoltare prima di agire',
    body: 'Prima di fare, ascoltiamo. Ogni persona ha una storia che vale la pena conoscere. È da lì che nasce ogni cura.',
    accent: '#D4A840',
    img: '/images/foto_orizzontali/IMG_2386.webp', // OSS e ospite in dialogo — ascolto
    tint: 'rgba(212,168,64,0.10)',
  },
  {
    num: '04',
    name: 'Rispetto',
    tagline: 'Dignità in ogni momento',
    body: 'La dignità non si negozia. Non importa il livello di autonomia — ogni ospite viene trattato con la stessa considerazione.',
    accent: '#6B8F71',
    img: '/images/foto_orizzontali/IMG_2384.webp', // cura delicata, presenza attenta
    tint: 'rgba(107,143,113,0.10)',
  },
];

/* ── Shared header text ── */
function SectionHeader({ dark }: { dark?: boolean }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <motion.p
        variants={fadeUp}
        className="font-sans text-sm font-semibold uppercase tracking-[0.18em]"
        style={{ color: dark ? 'rgba(201,168,76,0.65)' : 'rgba(201,168,76,0.80)' }}
      >
        La nostra filosofia
      </motion.p>
      <motion.h2
        variants={fadeUp}
        className={`mt-4 font-display font-bold text-balance ${dark ? 'text-white' : 'text-forest'}`}
        style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4rem)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
      >
        Quattro valori.<br />Una promessa.
      </motion.h2>
      <motion.p
        variants={fadeUp}
        className={`mt-4 max-w-sm font-sans text-sm leading-relaxed ${dark ? 'text-white/40' : 'text-ink-light'}`}
      >
        Non sono slogan. Sono il modo in cui lavoriamo ogni giorno, con ogni persona.
      </motion.p>
      <motion.div variants={fadeUp} className="mt-6 flex items-center gap-4">
        <div className="h-px w-12 bg-gold/25" />
        <span className="text-gold/40 text-sm">✦</span>
        <div className="h-px w-12 bg-gold/25" />
      </motion.div>
    </motion.div>
  );
}

/* ── Values charter card (inside ContainerScroll, desktop only) ── */
function ValuesCard() {
  return (
    <div className="h-full w-full overflow-hidden rounded-[24px] bg-[#F5F0E8]">
      {/* Card header bar */}
      <div className="flex items-center justify-between border-b border-[#2D3A2E]/10 px-8 py-4">
        <div className="flex items-center gap-2.5">
          <div className="h-2 w-2 rounded-full bg-gold" />
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-[#2D3A2E]/45">Residenza V.G · Cabiate</span>
        </div>
        <span className="font-display text-xs italic text-[#2D3A2E]/25">&ldquo;Libertà, accoglienza, empatia e rispetto&rdquo;</span>
      </div>

      {/* 2×2 grid */}
      <div className="grid h-[calc(100%-56px)] grid-cols-2 divide-x divide-[#2D3A2E]/10">
        {/* Left column */}
        <div className="flex flex-col divide-y divide-[#2D3A2E]/10">
          {[values[0], values[2]].map((v) => (
            <ValueCell key={v.num} v={v} />
          ))}
        </div>
        {/* Right column */}
        <div className="flex flex-col divide-y divide-[#2D3A2E]/10">
          {[values[1], values[3]].map((v) => (
            <ValueCell key={v.num} v={v} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ValueCell({ v }: { v: typeof values[0] }) {
  return (
    <div className="flex flex-1 flex-col justify-between p-7 lg:p-8">
      <div className="flex items-start justify-between">
        <span className="font-display font-bold leading-none" style={{ fontSize: 'clamp(2.8rem, 4vw, 4rem)', color: `${v.accent}20`, letterSpacing: '-0.04em' }}>
          {v.num}
        </span>
        <div className="mt-1 h-2 w-2 shrink-0 rounded-full" style={{ background: v.accent }} />
      </div>
      <div className="mt-3">
        <h3 className="font-display font-bold text-[#2D3A2E]" style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', letterSpacing: '-0.03em', lineHeight: 1 }}>
          {v.name}
        </h3>
        <p className="mt-1 font-display italic" style={{ fontSize: '0.9rem', color: v.accent }}>
          {v.tagline}
        </p>
      </div>
      <div className="my-3 h-px w-10 rounded-full" style={{ background: v.accent, opacity: 0.35 }} />
      <p className="font-sans text-sm leading-[1.75] text-[#2D3A2E]/55">{v.body}</p>
    </div>
  );
}

/* ── Mobile: sticky scroll — same cinematic approach as DailyRoutine ── */
function ValuesMobile() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastIdx      = useRef(0);
  const [activeIdx, setActiveIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const M = values.length;
  const rawProgress = useTransform(scrollYProgress, [0, 1], [0, M]);

  useEffect(() => {
    return rawProgress.on('change', (v) => {
      const next = Math.min(Math.floor(Math.max(0, v)), M - 1);
      if (next !== lastIdx.current) {
        lastIdx.current = next;
        setActiveIdx(next);
      }
    });
  }, [rawProgress]);

  const v = values[activeIdx];

  return (
    <section
      aria-label="La nostra filosofia"
      ref={containerRef}
      style={{ height: `${M * 100}dvh` }}
      className="block md:hidden"
    >
      <div className="sticky top-0 overflow-hidden" style={{ height: '100dvh' }}>

        {/* ── Photo crossfade ── */}
        <AnimatePresence initial={false}>
          <motion.div
            key={`val-bg-${activeIdx}`}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Image
              src={v.img}
              alt={v.name}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* ── Cinematic overlays ── */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/97 via-black/60 to-black/5" />
        <AnimatePresence initial={false}>
          <motion.div
            key={`val-glow-${activeIdx}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1 }}
            className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(ellipse 85% 55% at 50% 88%, ${v.accent}16 0%, transparent 65%)` }}
          />
        </AnimatePresence>

        {/* ── Top bar ── */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between px-6 pt-14">
          <span
            className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] transition-colors duration-500"
            style={{ color: `${v.accent}85` }}
          >
            La nostra filosofia
          </span>
          <span
            className="font-display font-bold leading-none transition-colors duration-500"
            style={{ fontSize: '1.05rem', color: `${v.accent}40`, letterSpacing: '-0.02em' }}
          >
            {v.num}
            <span className="font-sans text-[10px] font-normal text-white/20"> /0{M}</span>
          </span>
        </div>

        {/* ── Right progress rail ── */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-[6px]">
          {values.map((_, j) => (
            <motion.div
              key={j}
              className="rounded-full"
              animate={{
                height: j === activeIdx ? 24 : 4,
                opacity: j === activeIdx ? 1 : 0.22,
                backgroundColor: j === activeIdx ? v.accent : '#ffffff',
              }}
              transition={{ duration: 0.38, ease: 'easeOut' }}
              style={{ width: 2 }}
            />
          ))}
        </div>

        {/* ── Bottom content — AnimatePresence for clean transitions ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`val-content-${activeIdx}`}
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 bottom-0 px-6 pb-20"
          >
            {/* Large number watermark behind text */}
            <div
              className="pointer-events-none absolute right-5 bottom-14 select-none font-display font-bold leading-none"
              style={{ fontSize: '11rem', color: `${v.accent}06`, letterSpacing: '-0.05em', lineHeight: 1 }}
              aria-hidden="true"
            >
              {v.num}
            </div>

            {/* Value name */}
            <p
              className="relative font-display font-bold leading-none"
              style={{
                fontSize: 'clamp(3rem, 13vw, 4.4rem)',
                color: v.accent,
                letterSpacing: '-0.03em',
                lineHeight: 0.95,
                textShadow: `0 4px 52px ${v.accent}35`,
                wordBreak: 'keep-all',
                overflowWrap: 'normal',
              }}
            >
              {v.name}
            </p>

            {/* Tagline */}
            <p
              className="mt-4 font-display italic text-white"
              style={{ fontSize: '1.35rem', opacity: 0.9, letterSpacing: '-0.01em', lineHeight: 1.3, textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}
            >
              {v.tagline}
            </p>

            {/* Divider */}
            <div
              className="mt-5 mb-5 h-px w-10 rounded-full"
              style={{ background: v.accent, opacity: 0.9 }}
            />

            {/* Body */}
            <p
              className="font-sans text-white"
              style={{ fontSize: '1.05rem', maxWidth: '88%', lineHeight: 1.8, opacity: 0.88, textShadow: '0 1px 8px rgba(0,0,0,0.7)' }}
            >
              {v.body}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* ── Bottom progress bar ── */}
        <div className="absolute bottom-0 inset-x-0 h-[2px] bg-white/10">
          <motion.div
            className="h-full origin-left"
            style={{ backgroundColor: v.accent }}
            animate={{ scaleX: (activeIdx + 1) / M }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>

        {/* ── First value scroll cue ── */}
        <AnimatePresence>
          {activeIdx === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1.6, duration: 0.7 }}
              className="absolute bottom-10 left-6 flex items-center gap-2.5"
            >
              <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                className="rounded-full"
                style={{ width: 1, height: 30, background: `linear-gradient(to bottom, ${v.accent}70, transparent)` }}
              />
              <span
                className="font-sans text-[10px] uppercase tracking-[0.22em]"
                style={{ color: `${v.accent}55` }}
              >
                Scorri
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ── Desktop: ContainerScroll 3D panel ── */
function ValuesDesktop() {
  return (
    <section aria-label="La nostra filosofia" className="relative hidden overflow-hidden bg-forest md:block">
      <div className="pointer-events-none absolute inset-0 opacity-15" style={{ background: 'radial-gradient(ellipse 55% 40% at 50% 0%, rgba(201,168,76,0.5) 0%, transparent 70%)' }} aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <ContainerScroll
        titleComponent={<SectionHeader dark />}
      >
        <ValuesCard />
      </ContainerScroll>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </section>
  );
}

export default function ParallaxQuote() {
  return (
    <>
      <ValuesDesktop />
      <ValuesMobile />
    </>
  );
}
