'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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

export default function ResearchInsights() {
  const { t, language } = useLanguage();
  const [items, setItems] = useState<ResearchItem[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/api/research?limit=20&lang=${language}`)
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

  // Sort: featured first, then by date
  const sorted = [...items].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

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
  const getCategoryLabel = (cat: string) => CATEGORY_TRANSLATIONS[cat]?.[language] || cat;
  const getCtaText = (cat: string) => CTA_TRANSLATIONS[cat]?.[language] || 'Read More';

  return (
    <section id="research" className="py-20 bg-gradient-to-b from-navy-950 to-navy-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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

        {sorted.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white/40">No research items yet.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorted.map((item, index) => {
              const linkUrl = item.pdfUrl || item.externalUrl || '#';
              const isDownload = !!item.pdfUrl;
              const ctaText = getCtaText(item.category);

              return (
                <motion.a
                  key={item.id}
                  href={linkUrl}
                  target={linkUrl.startsWith('http') ? '_blank' : undefined}
                  download={isDownload ? true : undefined}
                  rel={linkUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
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
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      {item.category && (
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-gradient-to-r from-amber-500/20 to-amber-500/5 text-amber-400 border border-amber-500/30">
                          {getCategoryLabel(item.category)}
                        </span>
                      )}
                      {item.publishedAt && (
                        <span className="text-white/30 text-[11px]">
                          {new Date(item.publishedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </span>
                      )}
                    </div>

                    <h3 className="font-heading text-lg text-white mb-2 group-hover:text-gold-400 transition-colors duration-300 line-clamp-2">
                      {item.title}
                    </h3>

                    {item.description && (
                      <p className="text-white/40 text-sm leading-relaxed line-clamp-3 mb-4">
                        {item.description}
                      </p>
                    )}

                    <div className="flex items-center gap-2 text-sm font-semibold text-gold-400 group-hover:opacity-80 transition-opacity">
                      {ctaText}
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
