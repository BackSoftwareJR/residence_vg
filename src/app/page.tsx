import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import StatsBar from '@/components/sections/StatsBar';
import ManifestoSection from '@/components/sections/ManifestoSection';
import StorySection from '@/components/sections/StorySection';
import ServicesSection from '@/components/sections/ServicesSection';
import SpacesSection from '@/components/sections/SpacesSection';
import DailyRoutine from '@/components/sections/DailyRoutine';
import ParallaxQuote from '@/components/sections/ParallaxQuote';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import GalleryPreview from '@/components/sections/GalleryPreview';
import FAQSection from '@/components/sections/FAQSection';
import VisitSection from '@/components/sections/VisitSection';
import { NursingHomeSchema, OrganizationSchema, FAQPageSchema } from '@/components/JsonLd';
import { faqs } from '@/data/content';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Residenza Anziani Autosufficienti Cabiate Como | Residence V.G',
  description:
    'Residence V.G: residenza per anziani autosufficienti e parzialmente autosufficienti a Cabiate (CO). Max 10 ospiti, assistenza H24, ambiente familiare. Prenota una visita gratuita.',
  path: '/',
  keywords: [
    'residenza anziani Cabiate',
    'casa famiglia anziani Como',
    'anziani autosufficienti Brianza',
    'residence anziani provincia Como',
    'Residence V.G',
  ],
});

export default function HomePage() {
  return (
    <>
      <NursingHomeSchema />
      <OrganizationSchema />
      <FAQPageSchema items={faqs} />
      <Hero />
      <StatsBar />
      <ManifestoSection />
      <StorySection />
      <ServicesSection />
      <SpacesSection />
      <DailyRoutine />
      <ParallaxQuote />
      <TestimonialsSection />
      <GalleryPreview />
      <FAQSection />
      <VisitSection />
    </>
  );
}
