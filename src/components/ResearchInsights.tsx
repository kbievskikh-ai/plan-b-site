'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import Link from 'next/link';

const API_URL = 'https://plan-b-admin-api-production.up.railway.app';

const SECTIONS = [
  {
    key: 'market-reports',
    icon: '📊',
    en: 'Market Reports & Forecasts',
    ru: 'Рыночные отчёты и прогнозы',
    pt: 'Relatórios de Mercado',
    categories: ['Market Report'],
  },
  {
    key: 'city-reports',
    icon: '🏙️',
    en: 'City Reports',
    ru: 'Городские отчёты',
    pt: 'Relatórios por Cidade',
    categories: ['Region Analysis', 'City Report'],
  },
  {
    key: 'district-guides',
    icon: '🏘️',
    en: 'District Guides',
    ru: 'Гайды по районам',
    pt: 'Guias por Bairro',
    categories: ['Investment Guide', 'District Guide'],
  },
  {
    key: 'developer-reviews',
    icon: '🏗️',
    en: 'Developer Reviews',
    ru: 'Обзоры застройщиков',
    pt: 'Análise de Desenvolvedores',
    categories: ['Developer Review'],
  },
  {
    key: 'guides',
    icon: '📋',
    en: 'Guides & Resources',
    ru: 'Гайды и ресурсы',
    pt: 'Guias e Recursos',
    categories: ['Tax & Legal', 'Relocation'],
  },
];

export default function ResearchInsights() {
  const { language } = useLanguage();
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch(`${API_URL}/api/research?limit=50&lang=${language}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.data?.length) {
          const items = data.data.filter((r: any) => r.status !== 'draft');
          const c: Record<string, number> = {};
          for (const section of SECTIONS) {
            c[section.key] = items.filter((item: any) => section.categories.includes(item.category)).length;
          }
          setCounts(c);
        }
      })
      .catch(() => {});
  }, [language]);

  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  const sectionTranslations: Record<string, Record<string, string>> = {
    label: { en: 'Research & Insights', ru: 'Исследования и аналитика', pt: 'Pesquisas e Análises' },
    title1: { en: 'Independent', ru: 'Независимая', pt: 'Pesquisas' },
    highlight: { en: 'Research', ru: 'аналитика', pt: 'Independentes' },
    subtitle: {
      en: 'Market reports, investment guides, and analysis for Brazil real estate.',
      ru: 'Отчёты о рынке, инвестиционные гиды и аналитика по недвижимости в Бразилии.',
      pt: 'Relatórios de mercado, guias de investimento e análises imobiliárias no Brasil.',
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

        {/* Section Cards - Click to navigate */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {SECTIONS.map((section, index) => (
            <motion.div
              key={section.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <Link
                href={`/research/${section.key}`}
                className="group block rounded-xl bg-navy-900/80 border border-white/10 hover:border-gold-400/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gold-400/5 p-6 text-center"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {section.icon}
                </div>
                <h3 className="font-heading text-sm text-white mb-2 group-hover:text-gold-400 transition-colors duration-300 leading-snug min-h-[2.5rem] flex items-center justify-center">
                  {t(section)}
                </h3>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  <span className="text-white/40 text-xs">{counts[section.key] ?? '—'} reports</span>
                  <svg className="w-3 h-3 text-gold-400 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* All Reports card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: SECTIONS.length * 0.08 }}
          >
            <Link
              href="/research/all"
              className="group block rounded-xl bg-gradient-to-br from-gold-500/10 to-amber-500/5 border border-gold-400/20 hover:border-gold-400/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gold-400/10 p-6 text-center"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                📚
              </div>
              <h3 className="font-heading text-sm text-gold-400 mb-2 leading-snug min-h-[2.5rem] flex items-center justify-center">
                {language === 'ru' ? 'Все отчёты' : language === 'pt' ? 'Todos os Relatórios' : 'All Reports'}
              </h3>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/20">
                <span className="text-gold-400 text-xs">{total} reports</span>
                <svg className="w-3 h-3 text-gold-400 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
