'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';

const freeTools = [
  {
    id: 'birth-calculator',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    nameKey: 'tools.birthCalcName',
    descKey: 'tools.birthCalcDesc',
    ctaKey: 'tools.birthCalcCta',
    href: '/birth-calculator',
    accentIcon: 'border-rose-400/20 text-rose-400 group-hover:bg-rose-400/10',
    accentText: 'text-rose-400',
    accentGlow: 'via-rose-400/30',
  },
  {
    id: 'visa-path',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    nameKey: 'tools.visaPathName',
    descKey: 'tools.visaPathDesc',
    ctaKey: 'tools.visaPathCta',
    href: '/visa-path',
    accentIcon: 'border-teal-400/20 text-teal-400 group-hover:bg-teal-400/10',
    accentText: 'text-teal-400',
    accentGlow: 'via-teal-400/30',
  },
];

export default function AdditionalFreeTools() {
  const { t } = useLanguage();

  return (
    <section id="free-tools" className="py-16 bg-navy-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
              {t('freeTools.sectionLabel')}
            </span>
            <div className="w-8 h-[1px] bg-gold-400/50" />
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl text-white leading-tight">
            {t('freeTools.title')}
          </h2>
          <p className="mt-3 text-sm text-white/50 max-w-lg mx-auto">
            {t('freeTools.subtitle')}
          </p>
        </motion.div>

        {/* Tool Cards */}
        <div className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
          {freeTools.map((tool, index) => (
            <motion.a
              key={tool.id}
              href={tool.href}
              target={tool.href.startsWith('http') ? '_blank' : undefined}
              rel={tool.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative rounded-xl transition-all duration-300 hover:-translate-y-1 p-[1px] bg-gradient-to-b ${tool.accentGlow} via-gold-400/15 to-transparent hover:shadow-lg cursor-pointer`}
            >
              <div className="bg-navy-900/80 rounded-xl p-6 flex flex-col transition-all duration-300">
                <div className={`w-14 h-14 border flex items-center justify-center mb-5 transition-colors duration-300 ${tool.accentIcon}`}>
                  {tool.icon}
                </div>
                <h3 className="font-heading text-lg text-white mb-2 group-hover:text-gold-400 transition-colors duration-300">
                  {t(tool.nameKey)}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed flex-1 mb-5">
                  {t(tool.descKey)}
                </p>
                <div className={`inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-300 ${tool.accentText} group-hover:opacity-80`}>
                  {t(tool.ctaKey)}
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
