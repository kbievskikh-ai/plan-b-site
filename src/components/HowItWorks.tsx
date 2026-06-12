'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';

export default function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      number: '01',
      title: t('process.step1Title'),
      description: t('process.step1Desc'),
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V12c0-1.621 1.152-3.026 2.76-3.235A48.455 48.455 0 0012 9c.63 0 1.25.023 1.863.068" />
        </svg>
      ),
    },
    {
      number: '02',
      title: t('process.step2Title'),
      description: t('process.step2Desc'),
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
        </svg>
      ),
    },
    {
      number: '03',
      title: t('process.step3Title'),
      description: t('process.step3Desc'),
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
    },
    {
      number: '04',
      title: t('process.step4Title'),
      description: t('process.step4Desc'),
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.384 3.174 1.401-6.077L2.43 7.57l6.226-.547 2.764-5.601 2.764 5.601 6.226.548-4.607 3.696 1.401 6.077-5.384-3.174z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="process" className="py-20 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-gold-500 text-sm font-semibold tracking-widest uppercase">
            {t('process.label')}
          </span>
          <h2 className="mt-3 font-heading text-3xl sm:text-4xl font-bold text-navy-900">
            {t('process.title1')}{' '}
            <span className="text-gold-500">{t('process.titleHighlight')}</span>
          </h2>
          <p className="mt-4 text-navy-900/60 max-w-2xl mx-auto text-lg">
            {t('process.subtitle')}
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Connector line (not on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full h-[2px] bg-gold-200/50 -translate-x-1/2" />
              )}

              <div className="bg-white rounded-2xl p-6 border border-navy-900/5 hover:border-gold-300 transition-colors h-full">
                {/* Step number */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gold-50 border border-gold-200 flex items-center justify-center text-gold-600">
                    {step.icon}
                  </div>
                  <span className="text-gold-500/40 font-mono text-xs tracking-wider">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-heading text-lg font-bold text-navy-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-navy-900/60 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://wa.me/5548988117424"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-block"
          >
            {t('process.cta')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
