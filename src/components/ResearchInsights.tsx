'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';

const API_URL = 'https://plan-b-admin-api-production.up.railway.app';

interface ResearchItem {
  id: string;
  title: string;
  description: string;
  category: string;
  coverImage: string;
  publishedAt: string;
  externalUrl: string;
  pdfUrl: string;
  featured: boolean;
}

const SECTIONS = [
  {
    key: 'market-reports',
    icon: '📊',
    en: 'Market Reports & Forecasts',
    ru: 'Рыночные отчёты и прогнозы',
    pt: 'Relatórios e Previsões',
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
    icon: '️',
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

const CATEGORY_TRANSLATIONS: Record<string, Record<string, string>> = {
  'Market Report': { en: 'Market Report', ru: 'Отчёт о рынке', pt: 'Relatório de Mercado' },
  'Region Analysis': { en: 'Region Analysis', ru: 'Анализ региона', pt: 'Análise Regional' },
  'Developer Review': { en: 'Developer Review', ru: 'Обзор застройщика', pt: 'Revisão do Desenvolvedor' },
  'Investment Guide': { en: 'Investment Guide', ru: 'Инвестиционный гид', pt: 'Guia de Investimento' },
  'Tax & Legal': { en: 'Tax & Legal', ru: 'Налоги и право', pt: 'Impostos e Direito' },
  'Relocation': { en: 'Relocation', ru: 'Переезд', pt: 'Realocação' },
};

const CTA_TRANSLATIONS: Record<string, Record<string, string>> = {
  'Market Report': { en: 'Download Report', ru: 'Скачать отчёт', pt: 'Baixar Relatório' },
  'Region Analysis': { en: 'Read Analysis', ru: 'Читать анализ', pt: 'Ler Análise' },
  'Developer Review': { en: 'View Review', ru: 'Смотреть обзор', pt: 'Ver Revisão' },
  'Investment Guide': { en: 'Download Guide', ru: 'Скачать гид', pt: 'Baixar Guia' },
  'Tax & Legal': { en: 'Read Report', ru: 'Читать отчёт', pt: 'Ler Relatório' },
  'Relocation': { en: 'Read Guide', ru: 'Читать гид', pt: 'Ler Guia' },
};

function ResearchCard({ item, index, language }: { item: ResearchItem; index: number; language: string }) {
  const t = (key: string) => CATEGORY_TRANSLATIONS[key]?.[language] || key;
  const ctaText = CTA_TRANSLATIONS[item.category]?.[language] || 'Read More';
  const linkUrl = item.pdfUrl || item.externalUrl || '#';
  const isDownload = !!item.pdfUrl;

  return (
    <motion.a
      key={item.id}
      href={linkUrl}
      target={linkUrl.startsWith('http') ? '_blank' : undefined}
      download={isDownload ? true : undefined}
      rel={linkUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="group relative rounded-xl overflow-hidden bg-navy-900/80 border border-white/10 hover:border-gold-400/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gold-400/5"
    >
      {/* Cover Image */}
      <div className="aspect-[16/10] overflow-hidden bg-navy-800">
        {item.coverImage ? (
          <img
            src={item.coverImage}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-12 h-12 text-white/10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          {item.category && (
            <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-semibold tracking-wider uppercase bg-gradient-to-r from-amber-500/20 to-amber-500/5 text-amber-400 border border-amber-500/30">
              {t(item.category)}
            </span>
          )}
          {item.publishedAt && (
            <span className="text-white/30 text-[10px]">
              {new Date(item.publishedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </span>
          )}
        </div>

        <h3 className="font-heading text-sm text-white mb-2 group-hover:text-gold-400 transition-colors duration-300 line-clamp-2 leading-snug">
          {item.title}
        </h3>

        <div className="flex items-center gap-2 text-xs font-semibold text-gold-400 group-hover:opacity-80 transition-opacity">
          {ctaText}
          <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </div>
      </div>
    </motion.a>
  );
}

export default function ResearchInsights() {
  const { language } = useLanguage();
  const [items, setItems] = useState<ResearchItem[]>([]);
  const [activeSection, setActiveSection] = useState<string>('all');

  useEffect(() => {
    fetch(`${API_URL}/api/research?limit=50&lang=${language}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.data?.length) {
          setItems(data.data.map((r: Record<string, unknown>) => ({
            id: String(r.id || ''),
            title: String(r.title || ''),
            description: String(r.description || ''),
            category: String(r.category || ''),
            coverImage: String(r.cover_image || ''),
            publishedAt: String(r.published_at || ''),
            externalUrl: String(r.external_url || ''),
            pdfUrl: String(r.pdf_url || ''),
            featured: Boolean(r.featured),
          })));
        }
      })
      .catch(() => {});
  }, [language]);

  // Get published items sorted by featured then date
  const published = items.filter(i => (i as any).status !== 'draft').sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  // Section translations
  const t = (section: typeof SECTIONS[0]) => section[language as keyof typeof section] || section.en;

  // Filter items by active section
  const getFilteredItems = (sectionKey: string) => {
    if (sectionKey === 'all') return published;
    const section = SECTIONS.find(s => s.key === sectionKey);
    if (!section) return [];
    return published.filter(item => section.categories.includes(item.category));
  };

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

  return (
    <section id="research" className="py-20 bg-gradient-to-b from-navy-950 to-navy-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
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

        {/* Section Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          <button
            onClick={() => setActiveSection('all')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
              activeSection === 'all'
                ? 'bg-gold-500 text-navy-900 shadow-lg shadow-gold-500/20'
                : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80 border border-white/10'
            }`}
          >
            All ({published.length})
          </button>
          {SECTIONS.map(section => {
            const count = getFilteredItems(section.key).length;
            return (
              <button
                key={section.key}
                onClick={() => setActiveSection(section.key)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                  activeSection === section.key
                    ? 'bg-gold-500 text-navy-900 shadow-lg shadow-gold-500/20'
                    : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80 border border-white/10'
                }`}
              >
                {section.icon} {t(section)} ({count})
              </button>
            );
          })}
        </motion.div>

        {/* Cards Grid */}
        {published.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white/40">No research items yet.</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {getFilteredItems(activeSection).map((item, index) => (
                <ResearchCard key={item.id} item={item} index={index} language={language} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
