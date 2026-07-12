'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

export default function FAQ() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { q: t('faq.q1_1'), a: t('faq.a1_1') },
    { q: t('faq.q1_2'), a: t('faq.a1_2') },
    { q: t('faq.q2_1'), a: t('faq.a2_1') },
    { q: t('faq.q3_1'), a: t('faq.a3_1') },
    { q: t('faq.q4_1'), a: t('faq.a4_1') },
    { q: t('faq.q5_1'), a: t('faq.a5_1') },
  ];

  return (
    <section id="faq" className="section-padding bg-cream-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-gold-500 text-sm font-semibold tracking-widest uppercase">
            {t('faq.sectionLabel')}
          </span>
          <h2 className="mt-3 font-heading text-3xl sm:text-4xl font-bold text-navy-900">
            {t('faq.title')}
          </h2>
          <p className="mt-4 text-navy-900/60 text-lg">
            {t('faq.subtitle')}
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              viewport={{ once: true }}
              className="border border-navy-900/10 rounded-lg overflow-hidden bg-white"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className={`w-full px-6 py-4 text-left transition-colors flex items-center justify-between ${
                  openIndex === index
                    ? 'bg-gold-50 text-gold-800'
                    : 'hover:bg-cream-50 text-navy-900'
                }`}
              >
                <span className="font-medium pr-4">{faq.q}</span>
                <ChevronDownIcon
                  className={`w-5 h-5 transition-transform duration-300 flex-shrink-0 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-6 pb-4"
                  >
                    <p className="text-navy-900/70 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-navy-900/60 mb-4 text-sm">
            {t('faq.stillHaveQuestions')}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://wa.me/5548988117424" target="_blank" rel="noopener noreferrer" className="btn-gold">
              {t('faq.cta')}
            </a>
            <a href="mailto:kbievskikh@planbbrazil.com" className="btn-outline">
              {t('faq.emailQuestions')}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
