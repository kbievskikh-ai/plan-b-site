import type { Metadata } from 'next';
import { getPropertyBySlug, getAllProperties } from '@/lib/properties-server';
import ProjectPageWrapper from './ProjectPageWrapper';

// Пересобирать страницу раз в час (данные о ценах/наличии меняются нечасто)
export const revalidate = 3600;

const SITE = 'https://planbbrazil.com';

type Props = { params: { slug: string } };

// ---- 1. Пре-генерация всех страниц объектов на билде (это то, что видит краулер) ----
export async function generateStaticParams() {
  const props = await getAllProperties();
  return props
    .filter((p) => p.slug)
    .map((p) => ({ slug: p.slug as string }));
}

// ---- 2. Уникальные метатеги для каждого объекта ----
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getPropertyBySlug(params.slug);

  if (!p) {
    return {
      title: 'Property — Plan B Brazil',
      description: 'Investment property in Santa Catarina, Brazil.',
    };
  }

  const priceLabel = p.priceUsd || p.price || '';
  const title = `${p.title} — ${p.location} | Plan B Brazil`;
  const description = (
    p.description ||
    `${p.title} in ${p.location}, Santa Catarina. ${p.area}${
      p.beds ? `, ${p.beds} bed` : ''
    }${priceLabel ? `. From ${priceLabel}.` : '.'} Independent investment analysis by Plan B Brazil.`
  )
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 300);

  const image = p.images?.[0] || `${SITE}/opengraph-image.png`;
  const url = `${SITE}/projects/${p.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Plan B Brazil',
      images: [{ url: image, width: 1200, height: 630, alt: p.title }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

// ---- 3. Серверный рендер: HTML с контентом + JSON-LD ----
export default async function ProjectPage({ params }: Props) {
  const p = await getPropertyBySlug(params.slug);

  const jsonLd = p
    ? {
        '@context': 'https://schema.org',
        '@type': 'RealEstateListing',
        name: p.title,
        description: (p.description || '').slice(0, 500),
        url: `${SITE}/projects/${p.slug}`,
        image: p.images || [],
        datePosted: new Date().toISOString().split('T')[0],
        ...(p.priceUsdNum
          ? {
              offers: {
                '@type': 'Offer',
                price: p.priceUsdNum,
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
              },
            }
          : {}),
        address: {
          '@type': 'PostalAddress',
          addressLocality: p.location,
          addressRegion: 'Santa Catarina',
          addressCountry: 'BR',
        },
        ...(p.coordinates
          ? {
              geo: {
                '@type': 'GeoCoordinates',
                latitude: p.coordinates.lat,
                longitude: p.coordinates.lng,
              },
            }
          : {}),
        ...(p.areaNum
          ? {
              floorSize: {
                '@type': 'QuantitativeValue',
                value: p.areaNum,
                unitCode: 'MTK',
              },
            }
          : {}),
        ...(p.beds ? { numberOfBedrooms: p.beds } : {}),
        ...(p.baths ? { numberOfBathroomsTotal: p.baths } : {}),
        broker: {
          '@type': 'RealEstateAgent',
          name: 'Plan B Brazil',
          url: SITE,
          areaServed: 'Santa Catarina, Brazil',
        },
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      {/*
        КЛЮЧЕВОЕ: этот блок рендерится НА СЕРВЕРЕ.
        Именно его видят Googlebot / GPTBot / ClaudeBot / PerplexityBot.
        Он визуально скрыт от людей (клиентский компонент рисует поверх),
        но присутствует в HTML — sr-only, а не display:none, чтобы не считалось клоакингом.
      */}
      {p && (
        <div className="sr-only">
          <h1>{p.title}</h1>
          <p>
            {p.location}, {p.region}, Santa Catarina, Brazil
          </p>
          {p.priceUsd && <p>Price: {p.priceUsd}</p>}
          {p.price && <p>Price BRL: {p.price}</p>}
          {p.area && <p>Area: {p.area}</p>}
          {p.beds > 0 && <p>Bedrooms: {p.beds}</p>}
          {p.baths > 0 && <p>Bathrooms: {p.baths}</p>}
          {p.expectedROI && <p>Expected ROI: {p.expectedROI}</p>}
          {p.description && <p>{p.description}</p>}
          {p.features?.length > 0 && (
            <ul>
              {p.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Интерактивная часть — как была, на клиенте */}
      <ProjectPageWrapper slug={params.slug} />
    </>
  );
}
