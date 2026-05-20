/**
 * RESIDENCE V.G — Single source of truth per tutti i contenuti del sito.
 *
 * ⚠️  INCOERENZE CORRETTE RISPETTO AL VECCHIO SITO:
 *   - Ospiti MAX: 10 (non 5 — il blog vecchio era errato, usare 10 ovunque)
 *   - Indirizzo: Via Francesco Petrarca 14 (non 12 come era nel JSON-LD vecchio)
 *   - Brand: Residence V.G (non "CASA ANZIANI" — legacy superato)
 */

export const siteConfig = {
  name: "Residence V.G",
  nameFull: "Residence per Anziani Group V.G",
  tagline: "Libertà, accoglienza, empatia e rispetto",
  description:
    "Residence per anziani autosufficienti e parzialmente autosufficienti a Cabiate (CO). Palazzina di 3 piani, massimo 10 ospiti, assistenza 24 ore su 24.",
  url: "https://www.vgresidence.com",
  piva: "14407090969",

  // ── CONTATTI ────────────────────────────────────────────────────────────────
  contact: {
    phone: "+39 351 958 1235",
    phoneRaw: "+393519581235",         // per href="tel:"
    whatsapp: "393519581235",          // per link WhatsApp (senza +)
    whatsappDisplay: "+39 351 958 1235",
    email: "vggroupsrl@gmail.com",
    address: {
      street: "Via Francesco Petrarca, 14",   // ← CORRETTO: 14 (non 12)
      city: "Cabiate",
      province: "CO",
      cap: "22060",
      region: "Lombardia",
      country: "IT",
      full: "Via Francesco Petrarca 14, 22060 Cabiate (CO)",
    },
    hours: "Lun–Dom 09:00–20:00",
    hoursSchema: [
      "Mo-Su 09:00-20:00",
    ],
    geo: {
      lat: 45.674,
      lng: 9.107,
    },
    maps: {
      openstreetmap: "https://www.openstreetmap.org/?mlat=45.674&mlon=9.107#map=17/45.674/9.107",
      googlemaps: "https://maps.google.com/?q=Via+Francesco+Petrarca+14+Cabiate+CO",
    },
  },

  // ── SOCIAL / TRACKING ───────────────────────────────────────────────────────
  analytics: {
    googleAdsId: "AW-17576720313",
    cookieyesId: "",  // da impostare
  },

  // ── SEO ─────────────────────────────────────────────────────────────────────
  seo: {
    defaultTitle: "Residence V.G — Casa per Anziani a Cabiate (CO)",
    titleTemplate: "%s | Residence V.G Cabiate",
    defaultDescription:
      "Residence per anziani autosufficienti e parzialmente autosufficienti a Cabiate (CO). Assistenza discreta 24h, max 10 ospiti, ambiente familiare. Chiama: +39 351 958 1235.",
    ogImage: "/images/hero-fallback.jpg",
    themeColor: "#2D3A2E",
  },
} as const;

// ── STRUTTURA ────────────────────────────────────────────────────────────────
export const structureInfo = {
  ospiti: 10,                    // ← CORRETTO: sempre 10 (non 5)
  piani: 3,
  assistenzaH24: true,
  target: "over 65 autosufficienti e parzialmente autosufficienti",
  anniEsperienza: 10,            // aggiornare ogni anno
  vicinanzaServizi: "Vicino a stazione ferroviaria, negozi, farmacia",
} as const;

// ── STATISTICHE HERO ─────────────────────────────────────────────────────────
export const heroStats = [
  { value: 10,   suffix: "",   label: "Ospiti al massimo",    note: "Ambiente piccolo e familiare" },
  { value: 24,   suffix: "h", label: "Assistenza continua",   note: "Personale sempre presente" },
  { value: 3,    suffix: "",   label: "Piani della struttura", note: "Ascensore e accessibilità completa" },
  { value: 100,  suffix: "%", label: "Progetto individuale",  note: "Ogni ospite ha il suo piano di vita" },
] as const;

// ── PREZZI ───────────────────────────────────────────────────────────────────
export const pricing = {
  doubleBed: {
    label: "Camera doppia",
    price: 2400,
    period: "mese",
    note: "Ideale per coppie o persone che preferiscono condividere",
  },
  singleBed: {
    label: "Camera singola",
    price: 2850,
    period: "mese",
    note: "Privacy e spazio personale garantiti",
  },
  festive: {
    label: "Periodo festivo",
    price: 800,
    period: "settimana",
    note: "Natale, Pasqua, vacanze estive",
  },
  deposit: {
    label: "Caparra",
    percentage: 30,
    note: "Versata all'ingresso, a garanzia del posto",
  },
  includedNote:
    "I prezzi includono: vitto, alloggio, pulizia camera e spazi comuni, assistenza discreta 24 ore su 24, attività ricreative.",
} as const;

// ── SERVIZI ──────────────────────────────────────────────────────────────────
export const services = [
  {
    id: "assistenza",
    icon: "shield-heart",
    title: "Assistenza 24 ore su 24",
    summary: "Presenza discreta e continua, giorno e notte. Sempre vicini, mai invasivi.",
    description:
      "Il nostro personale è presente ogni ora del giorno e della notte — non per sostituire l'autonomia, ma per supportarla. Un'assistenza pensata per chi è autosufficiente e vuole continuare a vivere con libertà, sapendo che c'è sempre qualcuno a portata di mano.",
    highlights: ["Presenza continua h24", "Mai invasivi", "Rispetto dell'autonomia", "Reperibilità notturna"],
  },
  {
    id: "vitto",
    icon: "utensils",
    title: "Vitto e nutrizione",
    summary: "Pasti cucinati quotidianamente, adattati a ogni esigenza nutrizionale.",
    description:
      "La cucina è il cuore della nostra casa. I pasti vengono preparati ogni giorno con ingredienti freschi, seguendo le indicazioni del medico e le preferenze di ogni ospite. Diete speciali, texture modificate, menù stagionali.",
    highlights: ["Cucina fresca quotidiana", "Diete personalizzate", "3 pasti + spuntini", "Prodotti locali"],
  },
  {
    id: "pulizia",
    icon: "sparkles",
    title: "Pulizia e igiene",
    summary: "Pulizia delle camere e degli spazi comuni inclusa, igiene personale assistita.",
    description:
      "La pulizia è un diritto, non un optional. Le camere vengono pulite ogni giorno, la biancheria cambiata regolarmente. L'igiene personale è supportata con rispetto e delicatezza dal nostro personale formato.",
    highlights: ["Pulizia giornaliera", "Cambio biancheria", "Igiene personale assistita", "Sanificazione periodica"],
  },
  {
    id: "progetto-vita",
    icon: "heart-handshake",
    title: "Progetto di vita individuale",
    summary: "Un piano personalizzato per ogni ospite, costruito insieme alla famiglia.",
    description:
      "Ogni persona che arriva da noi porta con sé una storia unica. Il progetto di vita individuale viene costruito ascoltando l'ospite e la sua famiglia: abitudini, passioni, esigenze cliniche, obiettivi di benessere.",
    highlights: ["Piano personalizzato", "Coinvolgimento familiare", "Rivalutazione periodica", "Team multidisciplinare"],
  },
  {
    id: "attivita",
    icon: "palette",
    title: "Attività ricreative",
    summary: "Laboratori, ginnastica dolce, musica, giochi e uscite per mantenersi attivi.",
    description:
      "L'attività è vita. Ogni settimana proponiamo laboratori creativi, sessioni di ginnastica dolce, attività cognitive, musica e momenti di socializzazione. Le uscite all'aperto sono parte integrante della routine.",
    highlights: ["Laboratori creativi", "Ginnastica dolce", "Attività cognitive", "Uscite esterne"],
  },
  {
    id: "struttura",
    icon: "building",
    title: "Struttura moderna",
    summary: "Palazzina di 3 piani, max 10 ospiti, ascensore, spazi verdi e terrazzo.",
    description:
      "La nostra struttura è una palazzina familiare di 3 piani a Cabiate, con massimo 10 ospiti. Ascensore, spazi comuni luminosi, sala pranzo aperta, giardino e terrazzo. Tutto progettato per il comfort e la sicurezza.",
    highlights: ["3 piani + ascensore", "Max 10 ospiti", "Giardino e terrazzo", "Ambienti domestici"],
  },
] as const;

// ── ROUTINE GIORNALIERA ───────────────────────────────────────────────────────
export const dailyRoutine = [
  {
    moment: "Prima mattina",
    phase: "alba",
    title: "Risveglio gentile",
    description: "Il giorno inizia con calma. Assistenza discreta al risveglio, igiene personale, e la cura di prepararsi con dignità e senza fretta.",
  },
  {
    moment: "La colazione",
    phase: "mattina",
    title: "Il primo momento insieme",
    description: "Prodotti freschi, caffè caldo, la sala pranzo che profuma di casa. Un momento semplice ma fondamentale per iniziare la giornata in compagnia.",
  },
  {
    moment: "La mattina",
    phase: "tarda mattina",
    title: "Movimento e vitalità",
    description: "Ginnastica dolce, una passeggiata in giardino, un laboratorio creativo. La mattina è attiva, stimolante, pensata su misura per ogni ospite.",
  },
  {
    moment: "Il pranzo",
    phase: "mezzogiorno",
    title: "A tavola, tutti insieme",
    description: "Il pasto principale è un rito. Cucina cucinata al momento, menu settimanale variato, tovaglie vere e il piacere di stare seduti senza fretta.",
  },
  {
    moment: "Il riposo",
    phase: "primo pomeriggio",
    title: "Il silenzio che fa bene",
    description: "Ogni ospite vive il riposo come preferisce — nella propria camera, su una poltrona al sole, o in compagnia di un libro. Nessun obbligo, solo pace.",
  },
  {
    moment: "Il pomeriggio",
    phase: "pomeriggio",
    title: "Creatività e socialità",
    description: "Giochi di carte, conversazione, musica, laboratori manuali. Il pomeriggio è vivo e colorato — ogni giorno diverso, ogni giorno con un senso.",
  },
  {
    moment: "L'aperitivo",
    phase: "tardo pomeriggio",
    title: "Il momento del calore",
    description: "Un momento tutto nostro. Qualcosa da sgranocchiare, un bicchiere di succo, tante chiacchiere. Il tempo rallenta e la struttura diventa davvero casa.",
  },
  {
    moment: "La cena",
    phase: "sera",
    title: "Un finale tranquillo",
    description: "Cena leggera, atmosphere raccolta. La giornata si chiude dolcemente a tavola, con le luci soffuse e le parole di sempre.",
  },
  {
    moment: "La buonanotte",
    phase: "notte",
    title: "Il riposo meritato",
    description: "Assistenza serale, cura personale, un pensiero gentile del personale. Ogni ospite va a dormire sapendo che qualcuno veglierà su di lui tutta la notte.",
  },
] as const;

// ── TESTIMONIANZE ─────────────────────────────────────────────────────────────
export const testimonials = [
  {
    id: "t1",
    name: "Maria R.",
    role: "Figlia di un ospite",
    text: "Ho trovato in Residence V.G la serenità che cercavo per mio padre. Il personale è sempre disponibile e attento. Mio padre sorride di nuovo.",
    rating: 5,
    avatar: "/images/avatars/avatar-placeholder.png",
    date: "2024",
  },
  {
    id: "t2",
    name: "Giovanni T.",
    role: "Figlio di un'ospite",
    text: "La dimensione piccola fa la differenza. Mia madre viene chiamata per nome da tutti, si sente a casa. Le attività la tengono attiva e serena.",
    rating: 5,
    avatar: "/images/avatars/avatar-placeholder.png",
    date: "2024",
  },
  {
    id: "t3",
    name: "Luisa M.",
    role: "Nipote di un ospite",
    text: "Struttura curata, personale professionale e umano. I pasti sono ottimi e l'atmosfera è davvero familiare. Consiglio a chiunque cerchi il meglio.",
    rating: 5,
    avatar: "/images/avatars/avatar-placeholder.png",
    date: "2025",
  },
] as const;

// ── FAQ ───────────────────────────────────────────────────────────────────────
export const faqs = [
  {
    id: "faq-1",
    question: "Come posso prenotare una visita alla struttura?",
    answer:
      "Puoi contattarci telefonicamente al 035 195 812 35, via WhatsApp al +39 351 958 1235 o via email a vggroupsrl@gmail.com. Organizziamo visite guidate su appuntamento, senza obbligo.",
  },
  {
    id: "faq-2",
    question: "Quali sono i criteri per l'ingresso in struttura?",
    answer:
      "Accettiamo persone anziane (generalmente over 65) autosufficienti o parzialmente autosufficienti. Valutiamo ogni caso individualmente per garantire il miglior inserimento possibile.",
  },
  {
    id: "faq-3",
    question: "Cosa è incluso nel prezzo mensile?",
    answer:
      "Il prezzo mensile include: alloggio, vitto (3 pasti + spuntini), pulizia della camera e spazi comuni, cambio biancheria, assistenza discreta 24 ore su 24, attività ricreative.",
  },
  {
    id: "faq-4",
    question: "I familiari possono venire a visitare i propri cari?",
    answer:
      "Assolutamente sì. Le visite dei familiari sono benvenute e non sono soggette a orari rigidi. La famiglia è parte integrante della vita dei nostri ospiti.",
  },
  {
    id: "faq-5",
    question: "Quali documenti servono per l'ingresso?",
    answer:
      "Sono necessari: documento d'identità, tessera sanitaria, certificati medici (cartella clinica, liste farmaci), valutazione del medico di base.",
  },
  {
    id: "faq-6",
    question: "È possibile fare una visita prima di decidere?",
    answer:
      "Certamente. Invitiamo tutti a venire a conoscerci di persona. Una visita guidata senza impegno è il modo migliore per capire se la nostra struttura è quella giusta.",
  },
  {
    id: "faq-7",
    question: "Qual è il costo mensile?",
    answer:
      "La camera doppia è a partire da €2.400/mese, la singola da €2.850/mese. I prezzi includono tutti i servizi. Contattateci per un preventivo personalizzato.",
  },
  {
    id: "faq-8",
    question: "Dove si trova la struttura?",
    answer:
      "Siamo in Via Francesco Petrarca 14, Cabiate (CO). Vicini alla stazione ferroviaria, facilmente raggiungibili con i mezzi pubblici e in auto. Parcheggio disponibile.",
  },
] as const;

// ── GALLERIA ─────────────────────────────────────────────────────────────────
export type GalleryCategory = "tutte" | "camere" | "spazi-comuni" | "esterni" | "dettagli";

export const galleryImages = [
  // Mix: nuove (spazi) + vecchie (vita) interleaved
  { src: "/images/6vg.webp",                           alt: "Terrazza Residence V.G — arredata con vista su Cabiate",                          category: "esterni"      as GalleryCategory, featured: true  },
  { src: "/images/foto_orizzontali/IMG_2382.webp",      alt: "Sala comune — ospiti e operatori nel pomeriggio",                                 category: "spazi-comuni" as GalleryCategory, featured: true  },
  { src: "/images/4vg.webp",                           alt: "Camera matrimoniale — luce del mattino sulle tende bianche",                       category: "camere"       as GalleryCategory, featured: true  },
  { src: "/images/foto_orizzontali/IMG_2387.webp",      alt: "Attività motoria — esercizi guidati dall'operatrice in sala comune",              category: "spazi-comuni" as GalleryCategory, featured: true  },
  { src: "/images/3vg.webp",                           alt: "Sala pranzo — apparecchiata e luminosa con i fiori sul balcone",                   category: "spazi-comuni" as GalleryCategory, featured: true  },
  { src: "/images/foto_orizzontali/IMG_2392.webp",      alt: "Gioco di carte in compagnia — un pomeriggio sereno a Residence V.G",              category: "spazi-comuni" as GalleryCategory, featured: true  },
  { src: "/images/7vg.webp",                           alt: "Camera con terrazzo — la porta aperta sul verde di Cabiate",                       category: "camere"       as GalleryCategory, featured: true  },
  { src: "/images/foto_orizzontali/IMG_2389.webp",      alt: "Attività creative — operatori e ospiti che disegnano insieme",                    category: "spazi-comuni" as GalleryCategory, featured: true  },
  { src: "/images/1vg.webp",                           alt: "Camera singola — luminosa, con vista sul giardino e tocchi personali",             category: "camere"       as GalleryCategory, featured: false },
  { src: "/images/foto_orizzontali/IMG_2386.webp",      alt: "Una conversazione in sala — il dialogo come forma di cura",                       category: "spazi-comuni" as GalleryCategory, featured: false },
  { src: "/images/5vg.webp",                           alt: "Soggiorno — divani comodi con vista sul pino",                                     category: "spazi-comuni" as GalleryCategory, featured: false },
  { src: "/images/foto_orizzontali/IMG_2390.webp",      alt: "Laboratorio di colorazione — creatività e compagnia ogni pomeriggio",             category: "spazi-comuni" as GalleryCategory, featured: false },
  { src: "/images/8vg.webp",                           alt: "Bagno — moderno, accessibile e curato nei dettagli",                               category: "dettagli"     as GalleryCategory, featured: false },
  { src: "/images/foto_orizzontali/IMG_2393.webp",      alt: "Il gioco e la cura — mani che tengono le carte, un'operatrice accanto",           category: "spazi-comuni" as GalleryCategory, featured: false },
  { src: "/images/2vg.webp",                           alt: "Vista dalla finestra — il giardino e il cielo aperto di Cabiate",                  category: "esterni"      as GalleryCategory, featured: false },
  { src: "/images/foto_orizzontali/IMG_2384.webp",      alt: "Assistenza quotidiana — cura e presenza, ogni momento del giorno",                category: "spazi-comuni" as GalleryCategory, featured: false },
  { src: "/images/foto_orizzontali/IMG_2388.webp",      alt: "Ginnastica in sala — un ospite con le braccia aperte durante gli esercizi",       category: "spazi-comuni" as GalleryCategory, featured: false },
  { src: "/images/foto_orizzontali/IMG_2385.webp",      alt: "Il pomeriggio insieme — ospiti e staff nella sala comune",                        category: "spazi-comuni" as GalleryCategory, featured: false },
  { src: "/images/foto_orizzontali/IMG_2391.webp",      alt: "Attività di gruppo — ospiti e operatori al tavolo della sala pranzo",             category: "spazi-comuni" as GalleryCategory, featured: false },
  { src: "/images/IMG_4203.webp",                       alt: "Residence V.G — la struttura a Cabiate",                                          category: "esterni"      as GalleryCategory, featured: false },
  { src: "/images/IMG_4208.webp",                       alt: "Residence V.G — esterno della palazzina a Cabiate",                               category: "esterni"      as GalleryCategory, featured: false },
] as const;

export const galleryCategories: { id: GalleryCategory; label: string }[] = [
  { id: "tutte",        label: "Tutte le foto" },
  { id: "camere",       label: "Camere" },
  { id: "spazi-comuni", label: "Spazi Comuni" },
  { id: "esterni",      label: "Esterni" },
  { id: "dettagli",     label: "Dettagli" },
];

// ── NAVIGAZIONE ───────────────────────────────────────────────────────────────
export const navigation = [
  { label: "Home",        href: "/" },
  { label: "Chi siamo",   href: "/#chi-siamo" },
  { label: "Servizi",     href: "/#servizi" },
  { label: "Galleria",    href: "/galleria" },
  { label: "Dove siamo",  href: "/dove-siamo" },
  { label: "Contatti",    href: "/#contatti" },
] as const;

// ── ASSET PATHS ───────────────────────────────────────────────────────────────
export const assets = {
  logo: "/images/logo_cabiate.png",
  logoAlt: "/images/logo.jpg",
  favicon: "/images/favicon.png",
  heroFallback: "/images/hero-fallback.jpg",
  heroVideoDesktop: "/videos/desktop.mp4",
  heroVideoMobile: "/videos/mobile.mp4",
  heroImages: [
    "/images/1vg.webp",
    "/images/2vg.webp",
    "/images/3vg.webp",
    "/images/4vg.webp",
  ],
} as const;
