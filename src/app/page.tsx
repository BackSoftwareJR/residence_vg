import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Hero from '@/components/sections/Hero';
import StatsBar from '@/components/sections/StatsBar';
import { NursingHomeSchema, OrganizationSchema, FAQPageSchema } from '@/components/JsonLd';
import { faqs } from '@/data/content';
import { createPageMetadata } from '@/lib/seo';

const ManifestoSection = dynamic(() => import('@/components/sections/ManifestoSection'));
const StorySection = dynamic(() => import('@/components/sections/StorySection'));
const ServicesSection = dynamic(() => import('@/components/sections/ServicesSection'));
const SpacesSection = dynamic(() => import('@/components/sections/SpacesSection'));
const DailyRoutine = dynamic(() => import('@/components/sections/DailyRoutine'));
const ParallaxQuote = dynamic(() => import('@/components/sections/ParallaxQuote'));
const TestimonialsSection = dynamic(() => import('@/components/sections/TestimonialsSection'));
const GalleryPreview = dynamic(() => import('@/components/sections/GalleryPreview'));
const FAQSection = dynamic(() => import('@/components/sections/FAQSection'));
const VisitSection = dynamic(() => import('@/components/sections/VisitSection'));

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
