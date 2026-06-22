'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Phone, Users, Home, Heart } from 'lucide-react';
import { siteConfig } from '@/data/content';
import { staggerContainer, fadeUp, viewportOptions } from '@/lib/animations';

const differentiators = [
  { icon: Users, title: 'Max 10 ospiti', body: 'Non sei un numero. Sei una persona. Con 10 ospiti al massimo, ogni membro del personale ti conosce per nome, conosce le tue abitudini, i tuoi gusti, la tua storia.' },
  { icon: Home,  title: 'Una vera casa', body: 'Tre piani a Cabiate, non un reparto. Cucina a vista, sala comune, giardino, terrazzo. Spazi domestici, non corridoi di ospedale.' },
  { icon: Heart, title: 'Il tuo progetto di vita', body: 'All\'ingresso costruiamo insieme a te e alla tua famiglia un progetto di vita individuale. Le tue abitudini diventano la nostra routine.' },
];

export default function StorySection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%']);

  return (
    <section ref={ref} id="chi-siamo" className="section-spacing overflow-hidden bg-linen-100" aria-label="La nostra storia">
      <div className="container-site">

        {/* ── Top: full storytelling row ── */}
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">

          {/* Photo with parallax */}
          <div className="relative overflow-hidden rounded-3xl shadow-[0_32px_64px_rgba(45,58,46,0.18)]">
            <motion.div style={{ y: imgY }} className="relative h-[480px] md:h-[560px]">
              <Image
                src="/images/foto_orizzontali/IMG_2386.webp"
                alt="Camera ospite residenza anziani Cabiate — casa famiglia anziani Como"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>

            {/* Floating stat */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              className="absolute bottom-5 left-5 right-5 rounded-2xl bg-forest/90 p-4 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display text-3xl font-bold text-gold">10+</p>
                  <p className="font-sans text-xs text-white/60">anni di esperienza a Cabiate</p>
                </div>
                <div className="h-px w-12 bg-gold/30 rotate-90" />
                <div>
                  <p className="font-display text-3xl font-bold text-gold">100%</p>
                  <p className="font-sans text-xs text-white/60">progetto individuale</p>
                </div>
                <div className="h-px w-12 bg-gold/30 rotate-90" />
                <div>
                  <p className="font-display text-3xl font-bold text-gold">H24</p>
                  <p className="font-sans text-xs text-white/60">personale presente</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Text story */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
          >
            <motion.p variants={fadeUp} className="font-sans text-sm font-semibold uppercase tracking-[0.15em] text-gold-700">
              Perché siamo diversi
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-3 font-display font-semibold text-forest text-balance"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em', lineHeight: 1.1 }}
            >
              Piccoli per scelta.<br />Grandi nell&apos;attenzione.
            </motion.h2>
            <motion.div variants={fadeUp} className="mt-5 gold-line" />
            <motion.p variants={fadeUp} className="mt-6 font-sans text-base leading-[1.8] text-ink-light">
              Molte strutture accolgono decine, centinaia di ospiti.
              Noi ne accogliamo <strong className="font-semibold text-forest">al massimo 10</strong>.
              Non è un limite di capacità. È la nostra filosofia.
            </motion.p>
            <motion.p variants={fadeUp} className="mt-4 font-sans text-base leading-[1.8] text-ink-light">
              In un ambiente piccolo, ogni persona emerge nella sua unicità.
              Il personale impara le abitudini, i gusti, le storie.
              Le famiglie trovano porte aperte, non procedure.
              La vita continua, non si ferma.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8">
              <a href={`tel:${siteConfig.contact.phoneRaw}`} className="btn-dark">
                <Phone size={15} />
                Parlaci — {siteConfig.contact.phone}
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Differentiators cards with 3D tilt ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-20 grid gap-5 md:grid-cols-3"
        >
          {differentiators.map(({ icon: Icon, title, body }) => (
            <Tilt3DCard key={title} icon={<Icon size={22} className="text-gold" />} title={title} body={body} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Tilt3DCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ rotateX: -4, rotateY: 5, scale: 1.02, transition: { duration: 0.2 } }}
      style={{ transformPerspective: 800 }}
      className="group cursor-default rounded-2xl bg-white p-7 shadow-warm-md ring-1 ring-linen-300 transition-shadow duration-300 hover:shadow-warm-lg hover:ring-gold/25"
    >
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sage-100 ring-1 ring-sage/20 transition-all duration-300 group-hover:bg-gold/10 group-hover:ring-gold/20">
        {icon}
      </div>
      <h3 className="font-sans text-base font-semibold text-ink">{title}</h3>
      <p className="mt-2.5 font-sans text-sm leading-[1.75] text-ink-light">{body}</p>
    </motion.div>
  );
}
