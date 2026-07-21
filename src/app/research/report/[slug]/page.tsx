import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllResearch, getResearchBySlug, SECTIONS } from '@/lib/research-server';
import { REPORT_CONTENT } from '@/data/report-content';
import { RENTAL_YIELD_REPORT } from '@/data/rental-yield-report-content';
import RentalYieldReportBody from '@/components/RentalYieldReportBody';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const revalidate = 3600;

const SITE = 'https://planbbrazil.com';

type Props = { params: { slug: string }; searchParams?: { lang?: string } };

/**
 * Слаги, для которых есть богатый визуальный компонент (таблицы/карточки/графики), а не просто
 * проза sections (см. RentalYieldReportBody). Для остальных двуязычных отчётов (есть оба языка
 * в REPORT_CONTENT) билингвальный ?lang=ru|en режим включается автоматически простым текстом
 * (см. hasBilingualText в компоненте ниже). URL один для обоих языков, язык выбирается
 * через ?lang=. Это временное решение до настоящего i18n-роутинга (см. BUSINESS.md, 2026-07-17).
 */
const RICH_BILINGUAL_SLUGS = new Set(['rental-yield-report-santa-catarina-2026']);

/**
 * Точечные SEO-переопределения meta title / H1 по slug и языку, когда финальная формулировка
 * отличается от титла в БД (r.title / rRu.title). URL/slug не затрагиваются — оверрайд только для
 * отображаемого текста. важно: ключ по языку — оверрайд для EN не должен просачиться на RU-страницу и наоборот.
 */
const SEO_OVERRIDES: Record<string, Partial<Record<'en' | 'ru', { title: string; h1: string }>>> = {
  'rental-yield-report-santa-catarina-2026': {
    ru: {
      title: 'Доходность аренды недвижимости в Бразилии: реальные цифры 2026',
      h1: 'Доходность аренды в Санта-Катарине: официальная против реальной',
    },
  },
  'vnzh-braziliya-nedvizhimost': {
    en: {
      title: 'Brazil Residency Through Real Estate 2026',
      h1: "Brazil Residency Through Real Estate: What's True, and What's Myth",
    },
    ru: {
      title: 'ВНЖ Бразилии через недвижимость в 2026: как есть на самом деле',
      h1: 'ВНЖ Бразилии через недвижимость: что правда, а что миф',
    },
  },
  'oplata-kriptovalyutoy-nedvizhimost-braziliya': {
    en: {
      title: 'Can You Pay for Brazilian Real Estate in Cryptocurrency 2026',
      h1: 'Can You Pay for Brazilian Real Estate in Cryptocurrency?',
    },
    ru: {
      title: 'Оплата недвижимости в Бразилии криптовалютой и из России 2026',
      h1: 'Можно ли оплатить недвижимость в Бразилии криптовалютой',
    },
  },
  'nalog-prodazha-nedvizhimost-braziliya': {
    en: {
      title: 'Capital Gains Tax on Real Estate Sales in Brazil 2026: 15% and How to Legally Avoid It',
      h1: 'Capital Gains Tax on Real Estate Sales in Brazil: 15% and How to Legally Avoid It',
    },
    ru: {
      title: 'Налог с продажи недвижимости в Бразилии 2026: 15% и льгота',
      h1: 'Налог при продаже недвижимости в Бразилии: 15% и как его избежать законно',
    },
  },
  'gde-kupit-nedvizhimost-braziliya': {
    en: {
      title: 'Rio, São Paulo, or Southern Brazil: Where Investment Actually Performs Better',
      h1: 'Rio, São Paulo, or Southern Brazil: Where Investment Actually Performs Better',
    },
    ru: {
      title: 'Где купить недвижимость в Бразилии: Рио, Сан-Паулу или юг',
      h1: 'Рио, Сан-Паулу или юг Бразилии: где на самом деле выгоднее инвестировать',
    },
  },
  'spe-struktura-nedvizhimost-braziliya': {
    en: {
      title: 'Buying Property Through an SPE in Brazil 2026',
      h1: 'Buying Property Through an SPE in Brazil: What You Need to Know Before Signing',
    },
    ru: {
      title: 'Покупка недвижимости через SPE — что нужно знать',
      h1: 'Покупка недвижимости через SPE: что нужно знать перед сделкой',
    },
  },
  'braziliya-plan-b-vnzh-pasport': {
    en: {
      title: 'Brazil as a Safe Harbor: A Plan B for Your Family 2026',
      h1: 'Brazil as a Safe Harbor: A Plan B for Your Family',
    },
    ru: {
      title: 'Бразилия как запасной аэродром — план Б для вашей семьи',
      h1: 'Бразилия как запасной аэродром: план Б для вашей семьи',
    },
  },
  'kak-kupit-nedvizhimost-braziliya': {
    en: {
      title: 'How to Buy Property in Brazil: Steps and Costs 2026',
      h1: 'How to Buy Property in Brazil: A Step-by-Step Guide and All the Costs',
    },
    ru: {
      title: 'Как купить недвижимость в Бразилии: шаги и расходы',
      h1: 'Как купить недвижимость в Бразилии: инструкция и все расходы для иностранца',
    },
  },
  'santa-catarina-market-outlook-2027': {
    ru: {
      title: 'Рыночный прогноз Santa Catarina 2027',
      h1: 'Прогноз рынка недвижимости Санта-Катарины 2027',
    },
  },
  'best-areas-to-invest-in-santa-catarina-2026': {
    ru: {
      title: 'Лучшие районы для инвестиций в Санта-Катарине 2026',
      h1: 'Лучшие районы для инвестиции в Санта-Катарине',
    },
  },
  'rancho-queimado-investment-report-2026': {
    ru: {
      title: 'Инвестиционный отчёт по Rancho Queimado 2026',
      h1: 'Инвестиционный отчёт по Rancho Queimado 2026',
    },
  },
  'porto-belo-investment-report-2026': {
    ru: {
      title: 'Инвестиционный отчёт по Porto Belo 2026',
      h1: 'Инвестиционный отчёт по Porto Belo 2026',
    },
  },
  'itapema-investment-report-2026': {
    ru: {
      title: 'Инвестиционный отчёт по Itapema 2026',
      h1: 'Инвестиционный отчёт по Itapema 2026',
    },
  },
  'balneario-camboriu-investment-report-2026': {
    ru: {
      title: 'Инвестиционный отчёт по Balneário Camboriú 2026',
      h1: 'Инвестиционный отчёт по Balneário Camboriú 2026',
    },
  },
  'florianopolis-investment-report-2026': {
    ru: {
      title: 'Инвестиционный отчёт по Флорианополису 2026',
      h1: 'Инвестиционный отчёт по Флорианополису 2026',
    },
  },
};

export async function generateStaticParams() {
  const all = await getAllResearch();
  return all.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const requestedLang = searchParams?.lang === 'ru' ? 'ru' : 'en';
  const r = await getResearchBySlug(params.slug, 'en');
  if (!r) return { title: 'Report — Plan B Brazil' };
  const contentByLang = REPORT_CONTENT[params.slug];
  const hasBilingualText = !!(contentByLang?.en && contentByLang?.ru);
  const isBilingual = RICH_BILINGUAL_SLUGS.has(params.slug) || hasBilingualText;
  const rLang = isBilingual && requestedLang === 'ru' ? await getResearchBySlug(params.slug, 'ru') : null;

  const seoOverride = SEO_OVERRIDES[params.slug]?.[requestedLang];
  const title = seoOverride ? seoOverride.title : `${(rLang || r).title} | Plan B Brazil`;
  const description = (rLang || r).description;
  const url = isBilingual
    ? `${SITE}/research/report/${r.slug}${requestedLang === 'ru' ? '?lang=ru' : ''}`
    : `${SITE}/research/report/${r.slug}`;

  return {
    title,
    description: description.slice(0, 300),
    alternates: { canonical: `${SITE}/research/report/${r.slug}` },
    openGraph: {
      title,
      description: description.slice(0, 300),
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
      description: description.slice(0, 200),
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

export default async function ReportPage({ params, searchParams }: Props) {
  const requestedLang = searchParams?.lang === 'ru' ? 'ru' : 'en';
  // Страница всегда рендерит оба языка (URL/canonical — один на оба, slug считается от EN title).
  const [r, rRu] = await Promise.all([
    getResearchBySlug(params.slug, 'en'),
    getResearchBySlug(params.slug, 'ru'),
  ]);
  if (!r) notFound();

  // Полный текст отчёта по языкам, если он уже внесён (см. src/data/report-content.ts).
  // Пока пусто — страница всё равно работает: title, description, cover, ссылка на PDF.
  const contentByLang = REPORT_CONTENT[r.slug];
  const content = contentByLang?.en;
  const contentRu = contentByLang?.ru;

  // Главный выбор: есть ли богатый визуальный компонент или просто оба языка текста в REPORT_CONTENT —
  // в обоих случаях живые люди должны видеть выбранный язык видимо, а конкурирующий язык — только sr-only для ботов.
  const isRichBilingual = RICH_BILINGUAL_SLUGS.has(params.slug);
  const hasBilingualText = !!(content && contentRu);
  const isBilingual = isRichBilingual || hasBilingualText;

  // Для билингвальных отчётов основной JSON-LD соответствует выбранному языку (то, что видит человек),
  // второй язык идёт вторым блоком для краулеров. Для остальных отчётов поведение как раньше: EN всегда первый.
  const primaryForJsonLd = isBilingual && requestedLang === 'ru' && rRu ? rRu : r;
  const secondaryForJsonLd = isBilingual ? (requestedLang === 'ru' ? r : rRu) : rRu;
  const primaryLangTag = isBilingual ? requestedLang : 'en';
  const secondaryLangTag = isBilingual ? (requestedLang === 'ru' ? 'en' : 'ru') : 'ru';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: primaryForJsonLd.title,
    description: primaryForJsonLd.description,
    url: `${SITE}/research/report/${r.slug}`,
    datePublished: primaryForJsonLd.publishedAt,
    dateModified: primaryForJsonLd.publishedAt,
    image: primaryForJsonLd.coverImage || undefined,
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
    inLanguage: primaryLangTag,
    isAccessibleForFree: true,
  };

  const jsonLdRu = secondaryForJsonLd
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: secondaryForJsonLd.title,
        description: secondaryForJsonLd.description,
        url: `${SITE}/research/report/${r.slug}`,
        datePublished: secondaryForJsonLd.publishedAt,
        dateModified: secondaryForJsonLd.publishedAt,
        image: secondaryForJsonLd.coverImage || undefined,
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
        inLanguage: secondaryLangTag,
        isAccessibleForFree: true,
        translationOfWork: { '@type': 'Article', headline: primaryForJsonLd.title, url: `${SITE}/research/report/${r.slug}` },
      }
    : null;

  const backSection = sectionKeyFor(r.category);
  const seoOverride = SEO_OVERRIDES[r.slug]?.[requestedLang];
  const displayH1 = seoOverride ? seoOverride.h1 : (requestedLang === 'ru' && rRu ? rRu.title : r.title);
  const displayDescription = requestedLang === 'ru' && rRu ? rRu.description : r.description;
  const richData = isRichBilingual ? RENTAL_YIELD_REPORT[requestedLang] : null;
  const richDataOther = isRichBilingual ? RENTAL_YIELD_REPORT[requestedLang === 'ru' ? 'en' : 'ru'] : null;
  // Для простых билингвальных отчётов (оба языка в REPORT_CONTENT, нет рич-компонента): видимый
  // текст на выбранном языке, конкурирующий язык — sr-only.
  const displayContent = requestedLang === 'ru' ? contentRu : content;
  const otherContent = requestedLang === 'ru' ? content : contentRu;
  const otherLangTitle = requestedLang === 'ru' ? r.title : rRu?.title;
  const otherLangDescription = requestedLang === 'ru' ? r.description : rRu?.description;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {jsonLdRu && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdRu) }}
        />
      )}

      {/*
        Конкурирующий язык — серверно-отрендерен, визуально скрыт (sr-only), не display:none.
        Живой посетитель видит полный текст выбранного языка (через ?lang=) в видимом блоке ниже;
        этот блок — только дополнительный слой для Googlebot/GPTBot, чтобы оба языка индексировались
        под одним URL, а не единственный способ увидеть конкурирующий язык.
      */}
      {richDataOther && (
        <div lang={requestedLang === 'ru' ? 'en' : 'ru'} className="sr-only">
          <h2>{richDataOther.reportTitleFull}</h2>
          <RentalYieldReportBody data={richDataOther} />
        </div>
      )}
      {!isRichBilingual && hasBilingualText && otherContent && (
        <div lang={requestedLang === 'ru' ? 'en' : 'ru'} className="sr-only">
          <h2>{otherLangTitle}</h2>
          <p>{otherLangDescription}</p>
          {otherContent.sections.map((s, i) => (
            <section key={i}>
              <h2>{s.heading}</h2>
              {s.paragraphs.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </section>
          ))}
        </div>
      )}
      {!isRichBilingual && !hasBilingualText && rRu && (
        <div lang="ru" className="sr-only">
          <h2>{rRu.title}</h2>
          <p>{rRu.description}</p>
          {contentRu?.sections.map((s, i) => (
            <section key={i}>
              <h2>{s.heading}</h2>
              {s.paragraphs.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </section>
          ))}
        </div>
      )}

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

          <h1 className="text-3xl md:text-4xl font-serif text-white mb-6">{displayH1}</h1>

          <p className="text-lg text-white/70 mb-8 leading-relaxed">{displayDescription}</p>

          <div className="flex items-center justify-between flex-wrap gap-3 mb-12 text-sm text-white/50">
            <div className="flex items-center gap-4">
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
            {isBilingual && (
              <a
                href={`/research/report/${r.slug}?lang=${requestedLang === 'ru' ? 'en' : 'ru'}`}
                className="text-gold-400 hover:underline text-sm"
              >
                {requestedLang === 'ru' ? 'Read in English →' : 'Читать по-русски →'}
              </a>
            )}
          </div>

          {/* Полный визуальный рендер отчёта на выбранном языке (таблицы/карточки/графики — не только текст) */}
          {richData && (
            <div className="mb-12">
              <RentalYieldReportBody data={richData} />
            </div>
          )}

          {/* Полный текст отчёта на выбранном языке (для билингвальных отчётов видит человек; для остальных всегда EN) */}
          {!isRichBilingual && displayContent && (
            <div className="prose prose-invert max-w-none mb-12">
              {displayContent.sections.map((s, i) => (
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

          {(() => {
            const displayPdfUrl = requestedLang === 'ru' && rRu?.pdfUrl ? rRu.pdfUrl : r.pdfUrl;
            return displayPdfUrl ? (
              <div className="border border-gold-400/30 rounded-lg p-6 bg-white/5">
                <h2 className="text-lg text-white mb-2">
                  {requestedLang === 'ru' ? 'Полный отчёт (PDF)' : 'Full report (PDF)'}
                </h2>
                <p className="text-sm text-white/60 mb-4">
                  {requestedLang === 'ru'
                    ? 'Графики, таблицы цен, полный анализ.'
                    : 'Charts, pricing tables, and full analysis.'}
                </p>
                <a
                  href={displayPdfUrl}
                  className="inline-block px-6 py-3 bg-gold-400 text-navy-950 rounded font-medium hover:bg-gold-300 transition"
                  download
                >
                  {requestedLang === 'ru' ? 'Скачать PDF' : 'Download PDF'}
                </a>
              </div>
            ) : null;
          })()}

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
