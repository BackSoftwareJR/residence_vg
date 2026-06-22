'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { galleryImages } from '@/data/content';
import { fadeUp, staggerContainer, viewportOptions } from '@/lib/animations';
import { ArrowUpRight } from 'lucide-react';

const SLIDE_INTERVAL_MS = 5000;

const featured = galleryImages.filter((img) => img.featured);
const slides = featured.length > 0 ? featured : galleryImages.slice(0, 8);

function GallerySlideshow({
  className,
  imageClassName,
}: {
  className?: string;
  imageClassName?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const current = slides[index];

  return (
    <Link
      href="/galleria"
      className={`group relative block overflow-hidden ${className ?? ''}`}
      aria-label="Apri la galleria fotografica"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current.src}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image
            src={current.src}
            alt={current.alt}
            fill
            className={`object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04] ${imageClassName ?? ''}`}
            sizes="(max-width: 768px) 100vw, 45vw"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-forest/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Indicatori */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
          {slides.map((img, i) => (
            <span
              key={img.src}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-6 bg-white' : 'w-1.5 bg-white/45'
              }`}
            />
          ))}
        </div>
      )}
    </Link>
  );
}

export default function GalleryPreview() {
  const gridFeatured = slides.slice(0, 6);

  return (
    <section aria-label="Galleria" className="section-spacing bg-parchment">
      <div className="container-site">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <motion.p variants={fadeUp} className="font-sans text-sm font-semibold uppercase tracking-[0.15em] text-gold-700">
              La struttura in foto
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-3 font-display font-semibold text-forest"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', letterSpacing: '-0.02em', lineHeight: 1.1 }}
            >
              Vieni a vederla<br />con i tuoi occhi
            </motion.h2>
          </div>
          <motion.div variants={fadeUp}>
            <Link
              href="/galleria"
              className="group inline-flex items-center gap-2 rounded-full border border-forest/25 bg-white px-5 py-2.5 font-sans text-sm font-semibold text-forest shadow-warm-sm transition-all hover:bg-forest hover:text-white hover:shadow-warm-md"
            >
              Tutta la galleria
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Mobile — slideshow a tutto schermo */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="md:hidden"
        >
          <GallerySlideshow className="h-[min(58vh,440px)] w-full rounded-3xl shadow-warm-lg" />
        </motion.div>

        {/* Desktop — griglia con slideshow nella cella principale */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="hidden grid-cols-12 grid-rows-[240px_240px] gap-3 md:grid"
        >
          <motion.div variants={fadeUp} className="col-span-5 row-span-2 overflow-hidden rounded-3xl">
            <GallerySlideshow className="h-full min-h-[488px] w-full rounded-3xl" />
          </motion.div>

          {[gridFeatured[1], gridFeatured[2]].map((img) => (
            <motion.div key={img.src} variants={fadeUp} className="col-span-4 overflow-hidden rounded-2xl group">
              <Link href="/galleria" tabIndex={-1} aria-hidden="true" className="block h-full">
                <div className="relative h-full min-h-[240px]">
                  <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="33vw" />
                </div>
              </Link>
            </motion.div>
          ))}

          {gridFeatured.slice(3, 6).map((img) => (
            <motion.div key={img.src} variants={fadeUp} className="col-span-4 overflow-hidden rounded-2xl group">
              <Link href="/galleria" tabIndex={-1} aria-hidden="true" className="block h-full">
                <div className="relative h-full min-h-[240px]">
                  <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="25vw" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-7 flex flex-col items-center gap-1.5 text-center"
        >
          <p className="font-sans text-sm text-ink-muted">Vuoi vedere la struttura di persona?</p>
          <Link href="#contatti" className="font-sans text-sm font-semibold text-forest underline underline-offset-4 transition-colors hover:text-gold-700">
            Prenota una visita gratuita — è senza obbligo →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
