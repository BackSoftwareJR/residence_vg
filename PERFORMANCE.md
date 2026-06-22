# Performance — Residence V.G

Audit e ottimizzazioni tecniche per Core Web Vitals, SEO speed e UX percepita. Nessuna modifica a design, colori o copy.

## Audit (prima)

| Area | Stato | Note |
|------|--------|------|
| **Immagini** | Buono | Tutte `next/image`, AVIF/WebP in config. Hero con `priority` su ogni slide; sezioni below-fold con `priority` non necessario |
| **Font** | Buono | `next/font` con `display: swap`. `themeColor` in `metadata` (warning Next.js 14) |
| **JavaScript** | Da migliorare | Homepage importava ~10 sezioni client (framer-motion) nel bundle iniziale. Lightbox galleria sempre incluso |
| **Third-party** | Da migliorare | GA con `afterInteractive`; nessun preconnect a GTM |
| **Caching** | Assente | Solo header sicurezza; nessuna cache per `/_next/static`, `/images`, `/fonts` |
| **Rendering** | Buono | Pagine statiche (SSG), metadata via `createPageMetadata`, JSON-LD |
| **CLS** | Accettabile | Mappe Google in iframe lazy; nessun blur placeholder sulle immagini |
| **Bundle** | Da migliorare | Nessun `optimizePackageImports` per lucide-react / framer-motion |

## Ottimizzazioni applicate

### Config (`next.config.js`)
- `experimental.optimizePackageImports` per `lucide-react` e `framer-motion`
- `Cache-Control: public, max-age=31536000, immutable` su `/_next/static`, `/images`, `/fonts`

### Layout globale
- `themeColor` spostato in export `viewport` (fix warning)
- Font Inter con pesi espliciti `[400–700]` per ridurre subset
- `FloatingCTA` caricato con `dynamic(..., { ssr: false })`
- Preconnect a `googletagmanager.com`, dns-prefetch a `google.com` (mappe)

### Google Analytics
- Strategia script: `lazyOnload` (non compete con LCP/INP)

### Homepage — code splitting
- Sezioni below-fold (`ManifestoSection` → `VisitSection`) con `next/dynamic`
- Hero + StatsBar restano statici (above-the-fold)

### Immagini — priorità LCP
- Hero: `priority` solo sulla prima slide (`current === 0`)
- `GalleryPreview`, `ParallaxQuote`: rimosso `priority` (below-fold)
- `DailyRoutine`: `priority` solo su `activeIdx === 0`
- Logo header: `priority` per ridurre flash in navbar

### Componenti lazy
- `LocationMap` (iframe Google Maps) lazy in Footer e `/dove-siamo` con placeholder min-height
- `GalleryLightbox` lazy on-demand in `/galleria`

## Impatto atteso

| Metrica | Effetto atteso |
|---------|----------------|
| **LCP** | Migliore: meno preload immagini non-LCP, hero slide 0 prioritizzata, bundle JS iniziale più leggero |
| **INP** | Migliore: meno JS da parsare all’avvio, GA differito, framer-motion in chunk separati |
| **CLS** | Stabile: placeholder mappe, font swap già presente; nessun cambiamento layout visibile |
| **TTFB / cache** | Migliore su visite ripetute grazie a cache asset statici 1 anno |

## Raccomandazioni future (non implementate)

1. **Blur placeholders** — generare `blurDataURL` per hero e immagini featured (script build con sharp)
2. **Self-host mappe** — tile statico + link a Google Maps (elimina iframe third-party)
3. **Analisi bundle** — `@next/bundle-analyzer` per verificare chunk post-splitting
4. **CDN / edge** — Vercel o Cloudflare per TTFB globale se si migra da Hostinger
5. **Monitoring** — PageSpeed Insights / CrUX dashboard dopo deploy in produzione
6. **Service Worker** — cache offline opzionale per asset statici (PWA light)

## Verifica

```bash
npm run build   # deve completare senza errori
npm run start   # test locale opzionale
```

Dopo deploy: [PageSpeed Insights](https://pagespeed.web.dev/) su `https://vgresidence.com`.
