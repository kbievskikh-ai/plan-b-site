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
  const [openCategory, setOpenCategory] = useState<string | null>('cat1');
  const [openQuestion, setOpenQuestion] = useState<number | null>(0);

  const faqData = [
    {
      id: 'cat1',
      category: t('faq.cat1'),
      questions: [
        { question: t('faq.q1_1'), answer: t('faq.a1_1') },
        { question: t('faq.q1_2'), answer: t('faq.a1_2') },
        { question: t('faq.q1_3'), answer: t('faq.a1_3') },
      ],
    },
    {
      id: 'cat2',
      category: t('faq.cat2'),
      questions: [
        { question: t('faq.q2_1'), answer: t('faq.a2_1') },
        { question: t('faq.q2_2'), answer: t('faq.a2_2') },
        { question: t('faq.q2_3'), answer: t('faq.a2_3') },
      ],
    },
    {
      id: 'cat3',
      category: t('faq.cat3'),
      questions: [
        { question: t('faq.q3_1'), answer: t('faq.a3_1') },
        { question: t('faq.q3_2'), answer: t('faq.a3_2') },
        { question: t('faq.q3_3'), answer: t('faq.a3_3') },
      ],
    },
    {
      id: 'cat4',
      category: t('faq.cat4'),
      questions: [
        { question: t('faq.q4_1'), answer: t('faq.a4_1') },
        { question: t('faq.q4_2'), answer: t('faq.a4_2') },
        { question: t('faq.q4_3'), answer: t('faq.a4_3') },
      ],
    },
    {
      id: 'cat5',
      category: t('faq.cat5'),
      questions: [
        { question: t('faq.q5_1'), answer: t('faq.a5_1') },
        { question: t('faq.q5_2'), answer: t('faq.a5_2') },
        { question: t('faq.q5_3'), answer: t('faq.a5_3') },
      ],
    },
  ];

  const toggleCategory = (id: string) => {
    setOpenCategory(openCategory === id ? null : id);
    setOpenQuestion(null);
  };

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <section id="faq" className="section-padding bg-cream-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-gold-500" />
            <span className="text-gold-500 text-sm tracking-[0.3em] uppercase">{t('faq.sectionLabel')}</span>
            <div className="w-8 h-[1px] bg-gold-500" />
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-navy-900 mb-6 [text-wrap:balance]">
            {t('faq.title')}
          </h2>
          <p className="text-navy-900/60 max-w-3xl mx-auto text-lg">
            {t('faq.subtitle')}
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="border border-navy-900/10 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleCategory(category.id)}
                className={`w-full px-6 py-4 text-left transition-all duration-300 flex items-center justify-between ${
                  openCategory === category.id
                    ? 'bg-gold-50 text-gold-800'
                    : 'bg-white hover:bg-cream-50 text-navy-900'
                }`}
              >
                <span className="font-heading text-lg">{category.category}</span>
                <ChevronDownIcon 
                  className={`w-5 h-5 transition-transform duration-300 ${
                    openCategory === category.id ? 'transform rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {openCategory === category.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-navy-900/10"
                  >
                    {category.questions.map((faq, questionIndex) => {
                      const globalIndex = categoryIndex * 100 + questionIndex;
                      return (
                        <div key={questionIndex} className="border-b border-navy-900/10 last:border-b-0">
                          <button
                            onClick={() => toggleQuestion(globalIndex)}
                            className="w-full px-6 py-4 text-left hover:bg-cream-50 transition-colors duration-200 flex items-center justify-between"
                          >
                            <span className="text-navy-900 font-medium pr-4">{faq.question}</span>
                            <ChevronDownIcon 
                              className={`w-4 h-4 text-navy-600 transition-transform duration-200 flex-shrink-0 ${
                                openQuestion === globalIndex ? 'transform rotate-180' : ''
                              }`}
                            />
                          </button>
                          <AnimatePresence>
                            {openQuestion === globalIndex && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="px-6 pb-4"
                              >
                                <p className="text-navy-900/70 leading-relaxed">{faq.answer}</p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 p-8 bg-cream-50 rounded-lg text-center"
        >
          <h3 className="font-heading text-xl lg:text-2xl text-navy-900 mb-4">
            {t('faq.stillHaveQuestions')}
          </h3>
          <p className="text-navy-900/60 mb-6 max-w-2xl mx-auto">
            {t('faq.stillHaveQuestionsDesc')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#contact" className="btn-gold">
              {t('faq.cta')}
            </a>
            <a href="mailto:info@migronis-brazil.com" className="btn-outline">
              {t('faq.emailQuestions')}
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
