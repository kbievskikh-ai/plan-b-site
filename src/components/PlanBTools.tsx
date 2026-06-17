'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';

// Main tools (core for Plan B preparation)
const mainTools = [
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
    href: '/brazil-fit-score',
    nextKey: 'tools.fitScoreNext',
    accentBorder: 'hover:border-gold-400/40',
    accentBg: 'hover:bg-gold-400/[0.04]',
    accentIcon: 'border-gold-400/20 text-gold-400 group-hover:bg-gold-400/10',
    accentShadow: 'hover:shadow-gold-400/5',
    accentText: 'text-gold-400',
    accentGlow: 'via-gold-400/30',
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
    href: '/ideal-regions',
    nextKey: 'tools.regionsReportNext',
    accentBorder: 'hover:border-amber-500/40',
    accentBg: 'hover:bg-amber-500/[0.04]',
    accentIcon: 'border-amber-500/20 text-amber-400 group-hover:bg-amber-500/10',
    accentShadow: 'hover:shadow-amber-500/5',
    accentText: 'text-amber-400',
    accentGlow: 'via-amber-500/30',
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
    accentBorder: 'hover:border-cyan-400/40',
    accentBg: 'hover:bg-cyan-400/[0.04]',
    accentIcon: 'border-cyan-400/20 text-cyan-400 group-hover:bg-cyan-400/10',
    accentShadow: 'hover:shadow-cyan-400/5',
    accentText: 'text-cyan-400',
    accentGlow: 'via-cyan-400/30',
  },
];

// No bonus tools — Birth Calculator and Visa Path moved to "Additional Free Tools" section below FAQ
const bonusTools: typeof mainTools = [];

export default function PlanBTools() {
  const { t } = useLanguage();
  const [fitScoreDone, setFitScoreDone] = useState(false);

  useEffect(() => {
    // Check if Fit Score was completed (stored in localStorage)
    const done = localStorage.getItem('planb_fit_score_done') === 'true';
    setFitScoreDone(done);
  }, []);

  const handleFitScoreClick = () => {
    localStorage.setItem('planb_fit_score_done', 'true');
    setFitScoreDone(true);
  };

  const handleRegionsReportClick = (e: React.MouseEvent) => {
    if (!fitScoreDone) {
      e.preventDefault();
    }
  };

  return (
    <section id="tools" className="py-20 bg-navy-900 relative overflow-hidden">
      {/* Subtle accent line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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

        {/* ===== MAIN TOOLS (gold-bordered group) ===== */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          {/* Group label */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-gold-400/30 bg-gold-400/[0.05]">
              <svg className="w-4 h-4 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-gold-400 text-xs tracking-[0.2em] uppercase font-semibold">
                {t('tools.mainToolsLabel')}
              </span>
            </div>
            <p className="text-white/40 text-xs mt-2 max-w-lg mx-auto">
              {t('tools.mainToolsDesc')}
            </p>
          </div>

          <div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-gold-400/40 via-gold-400/20 to-gold-400/40">
            <div className="bg-navy-950/60 rounded-2xl p-6 sm:p-8">
              <div className="grid sm:grid-cols-3 gap-5">
                {mainTools.map((tool, index) => {
                  const isRegionsReport = tool.id === 'regions-report';
                  const isFitScore = tool.id === 'fit-score';
                  const isLocked = isRegionsReport && !fitScoreDone;

                  return (
                    <motion.a
                      key={tool.id}
                      href={tool.href}
                      target={tool.href.startsWith('http') ? '_blank' : undefined}
                      rel={tool.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      onClick={isFitScore ? handleFitScoreClick : (isRegionsReport ? handleRegionsReportClick : undefined)}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className={`group relative rounded-xl transition-all duration-300 hover:-translate-y-1 p-[1px] bg-gradient-to-b ${tool.accentGlow} via-gold-400/20 to-transparent hover:shadow-lg ${tool.accentShadow} ${isLocked ? 'opacity-50 cursor-not-allowed hover:translate-y-0' : 'cursor-pointer'}`}
                    >
                      <div className="bg-navy-900/80 rounded-xl p-6 flex flex-col transition-all duration-300">
                        <div className={`w-14 h-14 border flex items-center justify-center mb-5 transition-colors duration-300 ${tool.accentIcon} ${isLocked ? 'opacity-40' : ''}`}>
                          {tool.icon}
                        </div>
                        <h3 className="font-heading text-lg text-white mb-2 group-hover:text-gold-400 transition-colors duration-300">
                          {t(tool.nameKey)}
                        </h3>
                        <p className="text-white/50 text-sm leading-relaxed flex-1 mb-6">
                          {t(tool.descKey)}
                        </p>
                        {isLocked ? (
                          <div className="flex items-center gap-2 text-sm text-amber-400/60">
                            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <span className="text-[11px] leading-relaxed">{t('tools.lockedMessage')}</span>
                          </div>
                        ) : (
                          <div className={`inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-300 ${tool.accentText} group-hover:opacity-80`}>
                            {t(tool.ctaKey)}
                            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                          </div>
                        )}
                        <div className="mt-4 pt-4 border-t border-white/[0.06]">
                          <p className="text-white/25 text-[11px] leading-relaxed">{t(tool.nextKey)}</p>
                        </div>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bonus tools section removed — moved to AdditionalFreeTools component after FAQ */}

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
