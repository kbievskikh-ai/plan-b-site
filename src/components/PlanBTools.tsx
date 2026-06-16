'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';

const tools = [
  {
    id: 'fit-score',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.21 0 2.36.24 3.42.67" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    nameKey: 'tools.fitScoreName',
    descKey: 'tools.fitScoreDesc',
    ctaKey: 'tools.fitScoreCta',
    href: '/calculator.html',
    nextKey: 'tools.fitScoreNext',
    accent: 'border-gold-400',
  },
  {
    id: 'regions-report',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    nameKey: 'tools.regionsReportName',
    descKey: 'tools.regionsReportDesc',
    ctaKey: 'tools.regionsReportCta',
    href: 'https://planb-sc-calculator.vercel.app',
    nextKey: 'tools.regionsReportNext',
    accent: 'border-gold-400',
  },
  {
    id: 'investment-calculator',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
      </svg>
    ),
    nameKey: 'tools.calculatorName',
    descKey: 'tools.calculatorDesc',
    ctaKey: 'tools.calculatorCta',
    href: '/calculator.html',
    nextKey: 'tools.calculatorNext',
    accent: 'border-gold-400',
  },
];

export default function PlanBTools() {
  const { t } = useLanguage();

  return (
    <section id="tools" className="py-20 bg-navy-900 relative overflow-hidden">
      {/* Subtle accent */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-gold-400" />
            <span className="text-gold-400 text-xs tracking-[0.25em] uppercase font-semibold">
              {t('tools.sectionLabel')}
            </span>
            <div className="w-8 h-[1px] bg-gold-400" />
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-white leading-tight">
            {t('tools.title1')}{' '}
            <span className="text-gold-400">{t('tools.titleHighlight')}</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/50 max-w-2xl mx-auto leading-relaxed">
            {t('tools.subtitle')}
          </p>
        </motion.div>

        {/* Tool Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
              whileHover={{ y: -4 }}
              className="group bg-navy-800/50 border border-white/[0.06] hover:border-gold-400/30 rounded-xl p-6 flex flex-col transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-14 h-14 border border-gold-400/20 flex items-center justify-center text-gold-400 mb-5 group-hover:bg-gold-400/10 transition-colors duration-300">
                {tool.icon}
              </div>

              {/* Content */}
              <h3 className="font-heading text-lg text-white mb-2 group-hover:text-gold-400 transition-colors duration-300">
                {t(tool.nameKey)}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed flex-1 mb-6">
                {t(tool.descKey)}
              </p>

              {/* CTA */}
              <a
                href={tool.href}
                target={tool.href.startsWith('http') ? '_blank' : undefined}
                rel={tool.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center gap-2 text-gold-400 text-sm font-semibold group/link hover:text-gold-300 transition-colors"
              >
                {t(tool.ctaKey)}
                <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>

              {/* Next step hint */}
              <div className="mt-4 pt-4 border-t border-white/[0.04]">
                <p className="text-white/25 text-[11px] leading-relaxed">
                  {t(tool.nextKey)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Subtle footer line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <p className="text-white/20 text-xs">
            {t('tools.footer')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
