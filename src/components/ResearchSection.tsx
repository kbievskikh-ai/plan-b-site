'use client';

import { motion } from 'framer-motion';
import ScrollAnimation from './ScrollAnimation';
import { useLanguage } from '@/lib/i18n';

export default function ResearchSection() {
  const { t } = useLanguage();

  const cards = [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
        </svg>
      ),
      titleKey: 'research.card_investmentGuide',
      descKey: 'research.card_investmentGuideDesc',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z" />
        </svg>
      ),
      titleKey: 'research.card_calculator',
      descKey: 'research.card_calculatorDesc',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>
      ),
      titleKey: 'research.card_neighborhoods',
      descKey: 'research.card_neighborhoodsDesc',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      titleKey: 'research.card_dueDiligence',
      descKey: 'research.card_dueDiligenceDesc',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125Z" />
        </svg>
      ),
      titleKey: 'research.card_marketReports',
      descKey: 'research.card_marketReportsDesc',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
        </svg>
      ),
      titleKey: 'research.card_scoring',
      descKey: 'research.card_scoringDesc',
    },
  ];

  return (
    <section id="research" className="section-padding bg-navy-900 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-1 gold-gradient" />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gold-500/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <ScrollAnimation>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-gold-400" />
              <span className="text-gold-400 text-sm tracking-[0.3em] uppercase">{t('research.sectionLabel')}</span>
              <div className="w-8 h-[1px] bg-gold-400" />
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-white mb-6 [text-wrap:balance]">
              {t('research.title1')}{' '}
              <span className="text-gold-400">{t('research.titleHighlight')}</span>
            </h2>
            <p className="text-white/60 max-w-3xl mx-auto text-lg">
              {t('research.subtitle')}
            </p>
          </ScrollAnimation>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {cards.map((card, index) => (
            <ScrollAnimation key={card.titleKey} delay={index * 0.08}>
              <motion.div
                className="h-full p-6 border border-white/10 hover:border-gold-400/30 hover:bg-white/5 transition-all duration-300 group"
                whileHover={{ y: -4 }}
              >
                <div className="w-12 h-12 border border-gold-400/30 flex items-center justify-center text-gold-400 group-hover:bg-gold-400 group-hover:text-navy-900 transition-all duration-300 mb-4">
                  {card.icon}
                </div>
                <h3 className="font-heading text-lg text-white mb-2 group-hover:text-gold-400 transition-colors">
                  {t(card.titleKey)}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {t(card.descKey)}
                </p>
              </motion.div>
            </ScrollAnimation>
          ))}
        </div>

        {/* CTA */}
        <ScrollAnimation className="text-center">
          <a
            href="https://wa.me/5548988117424"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-block"
          >
            {t('research.cta')}
          </a>
        </ScrollAnimation>
      </div>
    </section>
  );
}
