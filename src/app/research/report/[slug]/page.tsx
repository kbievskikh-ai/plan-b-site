import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllResearch, getResearchBySlug, SECTIONS } from '@/lib/research-server';
import { REPORT_CONTENT } from '@/data/report-content';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const revalidate = 3600;

const SITE = 'https://planbbrazil.com';

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const all = await getAllResearch();
  return all.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = await getResearchBySlug(params.slug);
  if (!r) return { title: 'Report — Plan B Brazil' };

  const title = `${r.title} | Plan B Brazil`;
  const url = `${SITE}/research/report/${r.slug}`;

  return {
    title,
    description: r.description.slice(0, 300),
    alternates: { canonical: url },
    openGraph: {
      title,
      description: r.description.slice(0, 300),
      url,
      siteName: 'Plan B Brazil',
      type: 'article',
      publishedTime: r.publishedAt,
      authors: ['Konstantin Bievskikh'],
      images: r.coverImage ? [{ url: r.coverImage }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: r.description.slice(0, 200),
      images: r.coverImage ? [r.coverImage] : undefined,
    },
  };
}

function sectionKeyFor(category: string): string {
  for (const [key, s] of Object.entries(SECTIONS)) {
    if (s.categories.includes(category)) return key;
  }
  return 'all';
}

export default async function ReportPage({ params }: Props) {
  const r = await getResearchBySlug(params.slug);
  if (!r) notFound();

  // Полный текст отчёта, если он уже извлечён из PDF (см. scripts/extract-pdf-content.py).
  // Пока пусто — страница всё равно работает: title, description, cover, ссылка на PDF.
  const content = REPORT_CONTENT[r.slug];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: r.title,
    description: r.description,
    url: `${SITE}/research/report/${r.slug}`,
    datePublished: r.publishedAt,
    dateModified: r.publishedAt,
    image: r.coverImage || undefined,
    author: {
      '@type': 'Person',
      name: 'Konstantin Bievskikh',
      jobTitle: 'Real Estate Investment Advisor',
      identifier: 'CRECI-SC 59616-F',
      url: SITE,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Plan B Brazil',
      url: SITE,
    },
    about: {
      '@type': 'Place',
      name: 'Santa Catarina, Brazil',
    },
    inLanguage: 'en',
    isAccessibleForFree: true,
  };

  const backSection = sectionKeyFor(r.category);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-navy-950">
        <Header />

        <article className="max-w-3xl mx-auto px-4 py-16">
          <nav className="mb-8 text-sm">
            <Link href={`/research/${backSection}`} className="text-gold-400 hover:underline">
              ← {SECTIONS[backSection]?.en || 'Research'}
            </Link>
          </nav>

          <span className="inline-block mb-4 text-xs uppercase tracking-widest text-gold-400">
            {r.category}
          </span>

          <h1 className="text-3xl md:text-4xl font-serif text-white mb-6">{r.title}</h1>

          <p className="text-lg text-white/70 mb-8 leading-relaxed">{r.description}</p>

          <div className="flex items-center gap-4 mb-12 text-sm text-white/50">
            <span>Konstantin Bievskikh · CRECI-SC 59616-F</span>
            {r.publishedAt && (
              <time dateTime={r.publishedAt}>
                {new Date(r.publishedAt).toLocaleDateString('en-GB', {
                  year: 'numeric',
                  month: 'long',
                })}
              </time>
            )}
          </div>

          {/* Полный текст отчёта — появится после извлечения из PDF */}
          {content && (
            <div className="prose prose-invert max-w-none mb-12">
              {content.sections.map((s, i) => (
                <section key={i} className="mb-8">
                  <h2 className="text-2xl font-serif text-white mb-4">{s.heading}</h2>
                  {s.paragraphs.map((p, j) => (
                    <p key={j} className="text-white/70 leading-relaxed mb-4">
                      {p}
                    </p>
                  ))}
                </section>
              ))}
            </div>
          )}

          {r.pdfUrl && (
            <div className="border border-gold-400/30 rounded-lg p-6 bg-white/5">
              <h2 className="text-lg text-white mb-2">Full report (PDF)</h2>
              <p className="text-sm text-white/60 mb-4">
                Charts, pricing tables, and full analysis.
              </p>
              <a
                href={r.pdfUrl}
                className="inline-block px-6 py-3 bg-gold-400 text-navy-950 rounded font-medium hover:bg-gold-300 transition"
                download
              >
                Download PDF
              </a>
            </div>
          )}

          <div className="mt-16 pt-8 border-t border-white/10">
            <h2 className="text-xl text-white mb-3">Questions about this market?</h2>
            <p className="text-white/60 mb-4">
              Independent advisory for foreign investors in Santa Catarina.
            </p>
            <a
              href="https://wa.me/5548988117424"
              className="text-gold-400 hover:underline"
            >
              Get in touch →
            </a>
          </div>
        </article>

        <Footer />
      </main>
    </>
  );
}
