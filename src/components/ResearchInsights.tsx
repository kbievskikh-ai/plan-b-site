'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import Link from 'next/link';
import { SECTION_ICONS } from '@/components/SectionIcons';

const API_URL = 'https://plan-b-admin-api-production.up.railway.app';

const SECTIONS = [
  {
    key: 'market-reports',
    iconKey: 'MarketReports',
    en: 'Market Reports & Forecasts',
    ru: 'Рыночные отчёты и прогнозы',
    pt: 'Relatórios de Mercado',
    categories: ['Market Report'],
  },
  {
    key: 'city-reports',
    iconKey: 'CityReports',
    en: 'City Reports',
    ru: 'Городские отчёты',
    pt: 'Relatórios por Cidade',
    categories: ['Region Analysis', 'City Report'],
  },
  {
    key: 'district-guides',
    iconKey: 'DistrictGuides',
    en: 'District Guides',
    ru: 'Гайды по районам',
    pt: 'Guias por Bairro',
    categories: ['Investment Guide', 'District Guide'],
  },
  {
    key: 'developer-reviews',
    iconKey: 'DeveloperReviews',
    en: 'Developer Reviews',
    ru: 'Обзоры застройщиков',
    pt: 'Análise de Desenvolvedores',
    categories: ['Developer Review'],
  },
  {
    key: 'guides',
    iconKey: 'GuidesResources',
    en: 'Guides & Resources',
    ru: 'Гайды и ресурсы',
    pt: 'Guias e Recursos',
    categories: ['Tax & Legal', 'Relocation'],
  },
];

export default function ResearchInsights() {
  const { language } = useLanguage();
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [covers, setCovers] = useState<Record<string, string[]>>({});

  useEffect(() => {
    fetch(`${API_URL}/api/research?limit=50`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.data?.length) {
          const items = data.data.filter((r: any) => r.status !== 'draft');
          const c: Record<string, number> = {};
          const cv: Record<string, string[]> = {};
          for (const section of SECTIONS) {
            const matched = items.filter((item: any) => section.categories.includes(item.category));
            c[section.key] = matched.length;
            // Featured first, then most recent — up to 3 real cover thumbnails per card.
            cv[section.key] = matched
              .sort((a: any, b: any) => {
                if (Boolean(a.featured) !== Boolean(b.featured)) return a.featured ? -1 : 1;
                return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
              })
              .map((item: any) => item.cover_image)
              .filter(Boolean)
              .slice(0, 3);
          }
          setCounts(c);
          setCovers(cv);
        }
      })
      .catch(() => {});
  }, []);

  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const allCovers = Object.values(covers).flat().slice(0, 4);

  const sectionTranslations: Record<string, Record<string, string>> = {
    label: { en: 'Research & Insights', ru: 'Исследования и аналитика', pt: 'Pesquisas e Análises' },
    title1: { en: 'Independent', ru: 'Независимая', pt: 'Pesquisas' },
    highlight: { en: 'Research', ru: 'аналитика', pt: 'Independentes' },
    subtitle: {
      en: "We don't just list properties. We analyze markets, evaluate developers, and give you the research to make informed investment decisions.",
      ru: 'Мы не просто публикуем объекты. Мы анализируем рынки, оцениваем застройщиков и предоставляем исследования для взвешенных инвестиционных решений.',
      pt: 'Não apenas listamos imóveis. Analisamos mercados, avaliamos incorporadoras e fornecemos pesquisas para decisões de investimento informadas.',
    },
    cta: {
      en: 'Get Consultation',
      ru: 'Получить консультацию',
      pt: 'Solicitar Consultoria',
    },
  };

  const getTrans = (key: string) => sectionTranslations[key]?.[language] || sectionTranslations[key]?.en || key;
  const t = (section: typeof SECTIONS[0]) => section[language as keyof typeof section] || section.en;

  return (
    <section id="research" className="py-20 bg-gradient-to-b from-navy-950 to-navy-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-gold-400/50" />
            <span className="text-gold-400 text-xs tracking-[0.25em] uppercase font-semibold">
              {getTrans('label')}
            </span>
            <div className="w-8 h-[1px] bg-gold-400/50" />
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-white leading-tight">
            {getTrans('title1')} <span className="text-gold-400">{getTrans('highlight')}</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/50 max-w-2xl mx-auto leading-relaxed">
            {getTrans('subtitle')}
          </p>
        </motion.div>

        {/* All Reports — hero card with a real stacked-cover preview, so visitors see actual
            report thumbnails (not an abstract icon) before they ever click through. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-6"
        >
          <Link
            href="/research/all"
            className="group flex flex-col sm:flex-row items-center gap-6 rounded-2xl bg-gradient-to-br from-gold-500/10 to-amber-500/5 border border-gold-400/20 hover:border-gold-400/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gold-400/10 p-6 sm:p-7"
          >
            {/* Fanned real cover thumbnails */}
            <div className="relative w-full sm:w-44 h-28 flex-shrink-0">
              {allCovers.length > 0 ? (
                allCovers.slice(0, 3).map((src, i) => (
                  <img
                    key={src + i}
                    src={src}
                    alt=""
                    className="absolute top-0 w-28 h-28 object-cover rounded-lg border-2 border-navy-950 shadow-lg transition-transform duration-300"
                    style={{
                      left: `${i * 28}px`,
                      zIndex: 3 - i,
                      transform: `rotate(${(i - 1) * 6}deg)`,
                    }}
                  />
                ))
              ) : (
                <div className="w-28 h-28 rounded-lg bg-navy-800 flex items-center justify-center">
                  {SECTION_ICONS.all && <SECTION_ICONS.all className="w-10 h-10 text-gold-400" />}
                </div>
              )}
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-heading text-lg sm:text-xl text-gold-400 mb-1.5">
                {language === 'ru' ? 'Открыть библиотеку исследований' : language === 'pt' ? 'Explorar Biblioteca de Pesquisas' : 'Explore the Research Library'}
              </h3>
              <p className="text-white/50 text-sm mb-3">
                {language === 'ru'
                  ? `${total} отчётов, гайдов и аналитики в открытом доступе — без форм и почты.`
                  : language === 'pt'
                  ? `${total} relatórios, guias e análises em acesso livre — sem formulários, sem e-mail.`
                  : `${total} reports, guides, and market analyses — open access, no forms, no email required.`}
              </p>
              <div className="inline-flex items-center gap-1.5 text-gold-400 text-sm font-semibold">
                {language === 'ru' ? 'Смотреть все' : language === 'pt' ? 'Ver tudo' : 'Browse all'}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Section Cards - Click to navigate, each with a real cover thumbnail so the
            category doesn't feel like an empty folder. */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {SECTIONS.map((section, index) => {
            const IconComponent = SECTION_ICONS[section.key];
            const cover = covers[section.key]?.[0];
            return (
              <motion.div
                key={section.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <Link
                  href={`/research/${section.key}`}
                  className="group flex items-center gap-4 rounded-xl bg-navy-900/80 border border-white/10 hover:border-gold-400/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gold-400/5 p-4"
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-navy-800">
                    {cover ? (
                      <img src={cover} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gold-400">
                        {IconComponent && <IconComponent className="w-7 h-7" />}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 to-transparent" />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <h3 className="font-heading text-sm text-white mb-1.5 group-hover:text-gold-400 transition-colors duration-300 leading-snug">
                      {t(section)}
                    </h3>
                    <div className="inline-flex items-center gap-1 text-white/40 text-xs">
                      <span>{counts[section.key] ?? '—'} reports</span>
                      <svg className="w-3 h-3 text-gold-400 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <a
            href="https://wa.me/5548988117424"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-block"
          >
            {getTrans('cta')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
