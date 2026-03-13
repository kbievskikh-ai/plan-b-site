'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';

const HomeIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>
);

const ChartIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
  </svg>
);

const KeyIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
  </svg>
);

const steps = [
  { icon: HomeIcon, key: 'buy' },
  { icon: ChartIcon, key: 'setup' },
  { icon: KeyIcon, key: 'earn' },
];

const stats = [
  { value: '85%+', key: 'occupancy' },
  { value: '6-8%', key: 'yield' },
  { value: '24/7', key: 'support' },
  { value: '0', key: 'effort' },
];

const services = [
  'listing', 'guests', 'cleaning', 'maintenance', 'reporting', 'legal', 'emergency', 'furnishing'
];

export default function PropertyManagement() {
  const { t } = useLanguage();

  return (
    <section id="property-management" className="py-20 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#c9963c] text-sm font-semibold tracking-widest uppercase">
            {t('pm.sectionLabel')}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#0a0e1a]">
            {t('pm.title1')}{' '}
            <span className="text-[#c9963c]">{t('pm.titleHighlight')}</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            {t('pm.subtitle')}
          </p>
        </motion.div>

        {/* 3 Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg hover:shadow-gold-500/10 border-gold-500/0 hover:border-gold-500/20 transition-all duration-300 border border-cream-200"
              >
                <div className="absolute -top-4 left-8 w-8 h-8 bg-[#c9963c] text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <div className="text-[#c9963c] mb-4 mt-2">
                  <Icon />
                </div>
                <h3 className="text-xl font-bold text-[#0a0e1a] mb-2">
                  {t(`pm.step${index + 1}Title`)}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t(`pm.step${index + 1}Desc`)}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#0a0e1a] rounded-2xl p-8 mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.key} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-[#c9963c] mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">
                  {t(`pm.stat_${stat.key}`)}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-[#0a0e1a] text-center mb-8">
            {t('pm.servicesTitle')}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {services.map((service) => (
              <div
                key={service}
                className="flex items-center gap-3 bg-white rounded-xl p-4 border border-cream-200"
              >
                <div className="w-2 h-2 bg-[#c9963c] rounded-full flex-shrink-0" />
                <span className="text-sm text-gray-700">{t(`pm.svc_${service}`)}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-[#c9963c] hover:bg-[#b8872e] text-white px-8 py-4 rounded-xl font-semibold transition-colors duration-300"
          >
            {t('pm.cta')}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
