import Link from 'next/link';
import { getAllResearch } from '@/lib/research-server';
import AllResearchClient from './AllResearchClient';

export const revalidate = 3600;

const SITE = 'https://planbbrazil.com';

export const metadata = {
  title: 'All Reports — Research Library | Plan B Brazil',
  description:
    'Full library of independent Santa Catarina real estate research: market reports, city reports, district guides, developer reviews, and practical guides for foreign buyers.',
  alternates: { canonical: `${SITE}/research/all` },
  openGraph: {
    title: 'All Reports — Research Library | Plan B Brazil',
    description:
      'Full library of independent Santa Catarina real estate research: market reports, city reports, district guides, developer reviews, and practical guides for foreign buyers.',
    url: `${SITE}/research/all`,
    siteName: 'Plan B Brazil',
    type: 'website',
  },
};

export default async function AllResearchPage() {
  const items = await getAllResearch();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Research Library',
    description: metadata.description,
    url: `${SITE}/research/all`,
    publisher: {
      '@type': 'Organization',
      name: 'Plan B Brazil',
      url: SITE,
    },
    hasPart: items.map((r) => ({
      '@type': 'Article',
      headline: r.title,
      description: r.description,
      url: `${SITE}/research/report/${r.slug}`,
      datePublished: r.publishedAt,
      author: { '@type': 'Person', name: 'Konstantin Bievskikh' },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/*
        Серверный контент — это то, что видят Googlebot / GPTBot / ClaudeBot.
        Раньше здесь для них было пусто ("0 reports").
        sr-only, а не display:none — не клоакинг, просто визуально скрыто.
      */}
      <div className="sr-only">
        <h1>Research Library — All Reports</h1>
        <ul>
          {items.map((r) => (
            <li key={r.id}>
              <Link href={`/research/report/${r.slug}`}>
                <h2>{r.title}</h2>
              </Link>
              <p>{r.description}</p>
              <span>{r.category}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Интерфейс для людей — как был */}
      <AllResearchClient initialItems={items} />
    </>
  );
}
