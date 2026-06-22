'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useReducedMotion,
  MotionValue,
} from 'framer-motion';
import { dailyRoutine } from '@/data/content';

/* Each slot: photo + visually distinct accent/tint — no two consecutive slots share the same accent */
const slotConfig = [
  // Risveglio gentile → camera con luce mattutina
  { img: '/images/4vg.webp',                          tint: 'rgba(201,168,76,0.45)',  accent: '#C9A84C', grad: 'from-[#1C1508] to-[#2E220C]' },
  // Il primo momento insieme → sala comune con persone
  { img: '/images/foto_orizzontali/IMG_2382.webp',    tint: 'rgba(60,45,20,0.55)',    accent: '#D4A840', grad: 'from-[#1E1608] to-[#3C2A0C]' },
  // Movimento e vitalità → esercizi guidati
  { img: '/images/foto_orizzontali/IMG_2387.webp',    tint: 'rgba(107,143,113,0.52)', accent: '#6B8F71', grad: 'from-[#0E1A0A] to-[#162810]' },
  // A tavola, tutti insieme → sala pranzo apparecchiata
  { img: '/images/3vg.webp',                          tint: 'rgba(85,120,90,0.48)',   accent: '#7FA885', grad: 'from-[#0A1C0A] to-[#123018]' },
  // Il riposo → camera singola tranquilla
  { img: '/images/1vg.webp',                          tint: 'rgba(107,143,113,0.50)', accent: '#6B8F71', grad: 'from-[#0C1C0E] to-[#143020]' },
  // Creatività e socialità → attività creative al tavolo
  { img: '/images/foto_orizzontali/IMG_2389.webp',    tint: 'rgba(90,125,95,0.48)',   accent: '#6B8F71', grad: 'from-[#0E1C10] to-[#162E1C]' },
  // L'aperitivo → terrazza al tramonto
  { img: '/images/6vg.webp',                          tint: 'rgba(201,168,76,0.50)',  accent: '#E8C97A', grad: 'from-[#1C1208] to-[#2E1C0C]' },
  // La cena → ospiti al tavolo in compagnia
  { img: '/images/foto_orizzontali/IMG_2392.webp',    tint: 'rgba(45,35,15,0.60)',    accent: '#D4A840', grad: 'from-[#1A1206] to-[#2E2010]' },
  // La buonanotte → camera con lampada accesa
  { img: '/images/7vg.webp',                          tint: 'rgba(15,22,16,0.68)',    accent: '#C9A84C', grad: 'from-[#06080E] to-[#0C1018]' },
];

const N = dailyRoutine.length;

function useSlotAnims(localFraction: MotionValue<number>) {
  const momentO  = useTransform(localFraction, [0.04, 0.22, 0.78, 0.94], [0, 1, 1, 0]);
  const momentY  = useTransform(localFraction, [0.04, 0.22], [55, 0]);
  const momentRX = useTransform(localFraction, [0.04, 0.22, 0.78, 0.94], [26, 0, 0, -14]);
  const titleO   = useTransform(localFraction, [0.10, 0.28, 0.78, 0.94], [0, 1, 1, 0]);
  const titleY   = useTransform(localFraction, [0.10, 0.28], [38, 0]);
  const dividerO = useTransform(localFraction, [0.16, 0.32, 0.76, 0.93], [0, 1, 1, 0]);
  const dividerS = useTransform(localFraction, [0.16, 0.32], [0, 1]);
  const descO    = useTransform(localFraction, [0.22, 0.38, 0.74, 0.92], [0, 1, 1, 0]);
  const descY    = useTransform(localFraction, [0.22, 0.38], [20, 0]);
  const badgeO   = useTransform(localFraction, [0.30, 0.44, 0.74, 0.92], [0, 1, 1, 0]);
  const badgeS   = useTransform(localFraction, [0.30, 0.44], [0.86, 1]);
  const cntO     = useTransform(localFraction, [0.02, 0.16, 0.80, 0.95], [0, 1, 1, 0]);
  const cntY     = useTransform(localFraction, [0.02, 0.16], [-28, 0]);
  return { momentO, momentY, momentRX, titleO, titleY, dividerO, dividerS, descO, descY, badgeO, badgeS, cntO, cntY };
}

/* ─────────────────── DESKTOP ─────────────────── */
function DailyRoutineDesktop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  /* rawProgress maps [0,1] → [0,N] so each slot occupies exactly 1 unit */
  const rawProgress = useTransform(scrollYProgress, [0, 1], [0, N]);

  /* localFraction is always 0→1 within the active slot — no backwards movement */
  const smoothFrac = useTransform(rawProgress, (v) => {
    const idx = Math.min(Math.floor(v), N - 1);
    return v - idx;
  });

  const [activeIdx, setActiveIdx] = useState(0);
  const lastIdx = useRef(0);

  useEffect(() => {
    return rawProgress.on('change', (v) => {
      const next = Math.min(Math.floor(Math.max(0, v)), N - 1);
      if (next !== lastIdx.current) {
        lastIdx.current = next;
        setActiveIdx(next);
      }
    });
  }, [rawProgress]);

  const slot = dailyRoutine[activeIdx];
  const cfg  = slotConfig[activeIdx];
  const pct  = activeIdx / (N - 1);

  const anims = useSlotAnims(smoothFrac);
  const imgY  = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);

  return (
    <div ref={containerRef} style={{ height: `${N * 90}vh` }} className="hidden md:block">
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Background crossfade */}
        <AnimatePresence initial={false}>
          <motion.div
            key={`bg-${activeIdx}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <motion.div style={{ y: imgY }} className="absolute inset-0 scale-110 origin-center">
              <Image src={cfg.img} alt={slot.title} fill priority={activeIdx === 0} sizes="100vw" className="object-cover" />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Tint overlay */}
        <AnimatePresence initial={false}>
          <motion.div
            key={`tint-${activeIdx}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1 }}
            className="absolute inset-0"
            style={{ background: `linear-gradient(to bottom, ${cfg.tint} 0%, rgba(0,0,0,0.30) 42%, rgba(0,0,0,0.74) 100%)` }}
          />
        </AnimatePresence>

        {/* Top pill */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-center pt-24">
          <div className="flex items-center gap-3 rounded-full border border-white/20 bg-black/30 px-5 py-2 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: cfg.accent }} />
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">La nostra giornata</span>
          </div>
        </div>

        {/* Counter top-right */}
        <motion.div style={{ opacity: anims.cntO, y: anims.cntY }} className="absolute right-16 top-24 flex flex-col items-end">
          <span className="font-display font-bold leading-none text-white/18" style={{ fontSize: 'clamp(4rem, 6vw, 6rem)', letterSpacing: '-0.04em' }}>
            {String(activeIdx + 1).padStart(2, '0')}
          </span>
          <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/28 mr-0.5">/ {String(N).padStart(2, '0')}</span>
        </motion.div>

        {/* Left rail */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col gap-3">
          {dailyRoutine.map((s, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <div className="h-0.5 rounded-full transition-all duration-500" style={{ width: i === activeIdx ? 28 : 8, background: i === activeIdx ? cfg.accent : 'rgba(255,255,255,0.20)' }} />
              <span className="font-sans text-[10px] font-medium transition-all duration-500" style={{ color: i === activeIdx ? cfg.accent : 'rgba(255,255,255,0.22)' }}>
                {s.moment}
              </span>
            </div>
          ))}
        </div>

        {/* Right progress */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 h-44 w-px rounded-full bg-white/15">
          <motion.div className="w-full rounded-full" style={{ background: cfg.accent, height: `${pct * 100}%` }} transition={{ duration: 0.3 }} />
        </div>

        {/* Main 3D content */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-24 text-center px-6" style={{ perspective: 1100 }}>
          <motion.p style={{ opacity: anims.momentO, y: anims.momentY, rotateX: anims.momentRX, transformStyle: 'preserve-3d', fontSize: 'clamp(3rem, 9vw, 7.5rem)', color: cfg.accent, letterSpacing: '-0.04em', lineHeight: 1, textShadow: `0 0 70px ${cfg.accent}30` }}
            className="font-display font-bold"
          >
            {slot.moment}
          </motion.p>
          <motion.h2 style={{ opacity: anims.titleO, y: anims.titleY, fontSize: 'clamp(1.3rem, 3vw, 2.2rem)', letterSpacing: '-0.02em' }} className="mt-3 font-display font-semibold text-white">
            {slot.title}
          </motion.h2>
          <motion.div style={{ opacity: anims.dividerO, scaleX: anims.dividerS, background: cfg.accent }} className="my-4 h-px w-16 rounded-full origin-center opacity-50" />
          <motion.p style={{ opacity: anims.descO, y: anims.descY }} className="max-w-md font-sans text-sm leading-relaxed text-white/65 md:text-base">
            {slot.description}
          </motion.p>
          <motion.span
            style={{ opacity: anims.badgeO, scale: anims.badgeS, background: `${cfg.accent}22`, color: cfg.accent, border: `1px solid ${cfg.accent}45`, backdropFilter: 'blur(8px)' }}
            className="mt-5 rounded-full px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-[0.15em]"
          >
            {slot.phase}
          </motion.span>
        </div>

        {/* Bottom dots */}
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2">
          {dailyRoutine.map((_, i) => (
            <div key={i} className="rounded-full transition-all duration-300" style={{ width: i === activeIdx ? 22 : 5, height: 3, background: i === activeIdx ? cfg.accent : 'rgba(255,255,255,0.22)' }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── MOBILE ─────────────────── */
function DailyRoutineMobile() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastIdx      = useRef(0);
  const [activeIdx, setActiveIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  /* Same clean Math.floor approach as desktop */
  const rawProgress = useTransform(scrollYProgress, [0, 1], [0, N]);

  useEffect(() => {
    return rawProgress.on('change', (v) => {
      const next = Math.min(Math.floor(Math.max(0, v)), N - 1);
      if (next !== lastIdx.current) {
        lastIdx.current = next;
        setActiveIdx(next);
      }
    });
  }, [rawProgress]);

  const slot = dailyRoutine[activeIdx];
  const cfg  = slotConfig[activeIdx];

  return (
    /* Scroll track: N full-screen heights */
    <div ref={containerRef} style={{ height: `${N * 100}dvh` }} className="block md:hidden">

      {/* Sticky viewport — stays fixed while track scrolls behind */}
      <div className="sticky top-0 overflow-hidden" style={{ height: '100dvh' }}>

        {/* ── Photo crossfade ── */}
        <AnimatePresence initial={false}>
          <motion.div
            key={`mob-bg-${activeIdx}`}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Image
              src={cfg.img}
              alt={slot.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority={activeIdx === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* ── Overlays ── */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/97 via-black/65 to-black/5" />
        <AnimatePresence initial={false}>
          <motion.div
            key={`mob-glow-${activeIdx}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1 }}
            className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(ellipse 90% 55% at 50% 90%, ${cfg.accent}14 0%, transparent 65%)` }}
          />
        </AnimatePresence>

        {/* ── Top bar ── */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between px-6 pt-14">
          <span
            className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] transition-colors duration-500"
            style={{ color: `${cfg.accent}85` }}
          >
            La nostra giornata
          </span>
          <span
            className="font-display font-bold leading-none transition-colors duration-500"
            style={{ fontSize: '1.05rem', color: `${cfg.accent}40`, letterSpacing: '-0.02em' }}
          >
            {String(activeIdx + 1).padStart(2, '0')}
            <span className="font-sans text-[10px] font-normal text-white/20"> /{String(N).padStart(2, '0')}</span>
          </span>
        </div>

        {/* ── Right progress rail ── */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-[5px]">
          {dailyRoutine.map((_, j) => (
            <motion.div
              key={j}
              className="rounded-full"
              animate={{
                height: j === activeIdx ? 22 : 3,
                opacity: j === activeIdx ? 1 : 0.22,
                backgroundColor: j === activeIdx ? cfg.accent : '#ffffff',
              }}
              transition={{ duration: 0.38, ease: 'easeOut' }}
              style={{ width: 2 }}
            />
          ))}
        </div>

        {/* ── Main content — AnimatePresence for clean slot transitions ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`mob-content-${activeIdx}`}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 bottom-0 z-20 px-5 pb-20 text-white sm:px-6"
          >
            {/* Velo scuro dietro al testo */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] min-h-[280px] bg-gradient-to-t from-black via-black/75 to-transparent"
              aria-hidden
            />

            <div className="relative">
            {/* Moment name */}
            <p
              className="font-display font-bold"
              style={{
                fontSize: 'clamp(3rem, 13vw, 4.4rem)',
                color: cfg.accent,
                letterSpacing: '-0.03em',
                lineHeight: 1.0,
                textShadow: `0 4px 52px ${cfg.accent}35`,
              }}
            >
              {slot.moment}
            </p>

            {/* Title */}
            <h3
              className="mt-4 font-display font-bold text-white"
              style={{
                fontSize: 'clamp(1.45rem, 6vw, 1.9rem)',
                letterSpacing: '-0.025em',
                lineHeight: 1.2,
                textShadow: '0 2px 20px rgba(0,0,0,0.9)',
              }}
            >
              {slot.title}
            </h3>

            {/* Accent divider */}
            <div
              className="mt-5 mb-5 h-px w-10 rounded-full"
              style={{ background: cfg.accent, opacity: 0.9 }}
            />

            {/* Description */}
            <p
              className="font-sans text-white"
              style={{
                fontSize: '1.1rem',
                lineHeight: 1.8,
                fontWeight: 400,
                maxWidth: '100%',
                opacity: 0.9,
                textShadow: '0 1px 8px rgba(0,0,0,0.8)',
              }}
            >
              {slot.description}
            </p>

            {/* Phase badge */}
            <span
              className="mt-5 inline-block rounded-full px-4 py-2 font-sans text-xs font-semibold uppercase tracking-[0.18em]"
              style={{
                background: `${cfg.accent}20`,
                color: cfg.accent,
                border: `1px solid ${cfg.accent}50`,
                backdropFilter: 'blur(10px)',
              }}
            >
              {slot.phase}
            </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Bottom progress bar ── */}
        <div className="absolute bottom-0 inset-x-0 h-[2px] bg-white/10">
          <motion.div
            className="h-full origin-left"
            style={{ backgroundColor: cfg.accent }}
            animate={{ scaleX: (activeIdx + 1) / N }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>

        {/* ── First slot scroll cue ── */}
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
                style={{ width: 1, height: 30, background: `linear-gradient(to bottom, ${cfg.accent}70, transparent)` }}
              />
              <span
                className="font-sans text-[10px] uppercase tracking-[0.22em]"
                style={{ color: `${cfg.accent}55` }}
              >
                Scorri
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─────────────────── REDUCED MOTION FALLBACK ─────────────────── */
function ReducedMotionFallback() {
  return (
    <section className="section-spacing bg-linen-100" aria-label="La nostra giornata">
      <div className="container-site">
        <div className="mb-10 text-center">
          <p className="font-sans text-sm font-semibold uppercase tracking-[0.15em] text-gold-700">La nostra giornata</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-forest">Una routine costruita su di te</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {dailyRoutine.map((slot) => (
            <div key={slot.moment} className="rounded-xl bg-white p-5 shadow-warm-sm">
              <p className="font-display text-xl font-bold text-gold">{slot.moment}</p>
              <h3 className="mt-1 font-sans text-sm font-semibold text-ink">{slot.title}</h3>
              <p className="mt-1 font-sans text-xs text-ink-muted">{slot.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── EXPORT ─────────────────── */
export default function DailyRoutine() {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return <ReducedMotionFallback />;
  return (
    <section aria-label="La nostra giornata">
      <DailyRoutineDesktop />
      <DailyRoutineMobile />
    </section>
  );
}
