import { siteConfig, testimonials } from '@/data/content';

interface JsonLdScriptProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export function JsonLdScript({ data }: JsonLdScriptProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const addressSchema = {
  '@type': 'PostalAddress',
  streetAddress: siteConfig.contact.address.street,
  addressLocality: siteConfig.contact.address.city,
  addressRegion: siteConfig.contact.address.province,
  postalCode: siteConfig.contact.address.cap,
  addressCountry: siteConfig.contact.address.country,
};

function buildAggregateRating() {
  const sum = testimonials.reduce((acc, t) => acc + t.rating, 0);
  return {
    '@type': 'AggregateRating',
    ratingValue: (sum / testimonials.length).toFixed(1),
    reviewCount: testimonials.length,
    bestRating: 5,
    worstRating: 1,
  };
}

export function NursingHomeSchema() {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'NursingHome',
    name: siteConfig.nameFull,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: addressSchema,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.contact.geo.lat,
      longitude: siteConfig.contact.geo.lng,
    },
    openingHours: siteConfig.contact.hoursSchema,
    priceRange: '€€',
    image: `${siteConfig.url}${siteConfig.seo.ogImage}`,
    description: siteConfig.description,
    aggregateRating: buildAggregateRating(),
  };

  return <JsonLdScript data={schema} />;
}

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.nameFull,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo_cabiate.png`,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    address: addressSchema,
    sameAs: [
      siteConfig.contact.maps.googlemaps,
      siteConfig.contact.maps.openstreetmap,
    ],
  };

  return <JsonLdScript data={schema} />;
}

interface FaqItem {
  question: string;
  answer: string;
}

export function FAQPageSchema({ items }: { items: readonly FaqItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return <JsonLdScript data={schema} />;
}

interface BreadcrumbItem {
  name: string;
  path: string;
}

export function BreadcrumbListSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.path.startsWith('http') ? item.path : `https://vgresidence.com${item.path}`,
    })),
  };

  return <JsonLdScript data={schema} />;
}

interface ArticleSchemaProps {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  image: string;
}

export function ArticleSchema({
  title,
  description,
  slug,
  datePublished,
  dateModified,
  author,
  image,
}: ArticleSchemaProps) {
  const imageUrl = image.startsWith('http') ? image : `https://vgresidence.com${image}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: `https://vgresidence.com/blog/${slug}`,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      '@type': 'Organization',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.nameFull,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/images/logo_cabiate.png`,
      },
    },
    image: imageUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://vgresidence.com/blog/${slug}`,
    },
  };

  return <JsonLdScript data={schema} />;
}

/** @deprecated Use NursingHomeSchema + OrganizationSchema + FAQPageSchema */
export default function JsonLd() {
  return (
    <>
      <NursingHomeSchema />
      <OrganizationSchema />
    </>
  );
}
