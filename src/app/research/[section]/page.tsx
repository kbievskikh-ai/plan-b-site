import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SECTIONS, getResearchBySection } from '@/lib/research-server';
import ResearchSectionClient from './ResearchSectionClient';

export const revalidate = 3600;

const SITE = 'https://planbbrazil.com';

type Props = { params: { section: string } };

export async function generateStaticParams() {
  return Object.keys(SECTIONS).map((section) => ({ section }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = SECTIONS[params.section];
  if (!s) return { title: 'Research — Plan B Brazil' };

  const title = `${s.en} — Santa Catarina Real Estate | Plan B Brazil`;
  const url = `${SITE}/research/${params.section}`;

  return {
    title,
    description: s.seoDescription,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: s.seoDescription,
      url,
      siteName: 'Plan B Brazil',
      type: 'website',
    },
  };
}

export default async function ResearchSectionPage({ params }: Props) {
  const sectionData = SECTIONS[params.section];
  if (!sectionData) notFound();

  const items = await getResearchBySection(params.section);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: sectionData.en,
    description: sectionData.seoDescription,
    url: `${SITE}/research/${params.section}`,
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
        <h1>{sectionData.en}</h1>
        <p>{sectionData.seoDescription}</p>
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
      <ResearchSectionClient section={params.section} initialItems={items} />
    </>
  );
}
