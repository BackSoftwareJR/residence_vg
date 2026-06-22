'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { PortfolioGallery } from '@/components/ui/portfolio-gallery';
import { GalleryLightbox } from '@/components/ui/gallery-lightbox';
import { galleryImages } from '@/data/content';

const images = galleryImages.map((img) => ({
  src: img.src,
  alt: img.alt,
}));

export default function GalleriaClient() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <PortfolioGallery
        title="Galleria fotografica"
        archiveButton={{
          text: 'Prenota una visita',
          href: '/#contatti',
        }}
        images={images}
        onImageClick={setLightboxIndex}
        className="min-h-screen bg-[#0E1810]"
      />

      <AnimatePresence>
        {lightboxIndex !== null && (
          <GalleryLightbox
            images={images}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
