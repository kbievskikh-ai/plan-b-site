'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';

const reports = [
  { key: 'q1market', pages: 6, date: 'Mar 2026', free: true },
  { key: 'globalComparison', pages: 12, date: 'Mar 2026', free: true },
  { key: 'brazilGuide', pages: 11, date: 'Mar 2026', free: false },
  { key: 'floripaGuide', pages: 15, date: 'Mar 2026', free: false },
  { key: 'scRegional', pages: 14, date: 'Mar 2026', free: false },
  { key: 'landDev', pages: 6, date: 'Mar 2026', free: false },
];

const categories = [
  {
    key: 'quarterly',
    icon: () => (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
  },
  {
    key: 'global',
    icon: () => (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    key: 'project',
    icon: () => (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    key: 'calculator',
    icon: () => (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z" />
      </svg>
    ),
  },
];

export default function InvestmentIntelligence() {
  const { t } = useLanguage();
  const [hoveredReport, setHoveredReport] = useState<string | null>(null);

  return (
    <section id="intelligence" className="py-20 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold-500 text-sm font-semibold tracking-widest uppercase">
            {t('intel.sectionLabel')}
          </span>
          <h2 className="mt-3 font-heading text-3xl sm:text-4xl font-bold text-navy-900">
            {t('intel.title1')}{' '}
            <span className="text-gold-500">{t('intel.titleHighlight')}</span>
          </h2>
          <p className="mt-4 text-lg text-navy-900/60 max-w-3xl mx-auto">
            {t('intel.subtitle')}
          </p>
        </motion.div>

        {/* Report Categories */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-cream-200 hover:border-gold-500 shadow-sm transition-colors duration-300"
              >
                <div className="text-gold-500 mb-3">
                  <Icon />
                </div>
                <h3 className="text-navy-900 font-heading font-bold mb-2">{t(`intel.cat_${cat.key}Title`)}</h3>
                <p className="text-navy-900/50 text-sm leading-relaxed">{t(`intel.cat_${cat.key}Desc`)}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Available Reports */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-heading text-xl font-bold text-navy-900 text-center mb-8">
            {t('intel.availableReports')}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reports.map((report) => (
              <div
                key={report.key}
                onMouseEnter={() => setHoveredReport(report.key)}
                onMouseLeave={() => setHoveredReport(null)}
                className={`relative rounded-xl p-5 border transition-all duration-300 cursor-pointer ${
                  report.free
                    ? 'bg-white border border-gold-500/30 hover:border-gold-500 shadow-sm'
                    : 'bg-white border border-cream-200 hover:border-gold-500/50 shadow-sm'
                }`}
              >
                {report.free && (
                  <span className="absolute -top-2 right-4 bg-gold-500 text-[#0a0e1a] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                    {t('intel.free')}
                  </span>
                )}
                {!report.free && (
                  <div className={`absolute inset-0 rounded-xl bg-cream-200/80 backdrop-blur-[2px] flex items-center justify-center transition-opacity duration-300 ${
                    hoveredReport === report.key ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <span className="bg-gold-500 text-white text-sm font-semibold px-4 py-2 rounded-lg">
                      {t('intel.unlock')}
                    </span>
                  </div>
                )}
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-navy-900 font-heading font-semibold text-sm pr-4">
                    {t(`intel.report_${report.key}`)}
                  </h4>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>{report.pages} {t('intel.pages')}</span>
                  <span>{report.date}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Trust Copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <blockquote className="text-navy-900/60 text-base italic max-w-3xl mx-auto leading-relaxed border-l-4 border-gold-500 pl-6 text-left">
            {t('intel.quote')}
          </blockquote>
          <a
            href="https://wa.me/5548988752300" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-8 bg-gold-500 hover:bg-gold-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors duration-300"
          >
            {t('intel.cta')}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
