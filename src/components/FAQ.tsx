'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';

// Chevron icon component to avoid heroicons dependency issues
const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

const faqData = [
  {
    category: "Foreign Ownership",
    questions: [
      {
        question: "Can foreigners buy property in Brazil without residency?",
        answer: "Yes, foreigners can buy property in Brazil without residency requirements. However, there are some restrictions: rural properties larger than certain sizes require government approval, and beachfront properties have specific regulations. Urban properties, condominiums, and most coastal developments are freely available to foreign buyers."
      },
      {
        question: "What documents do I need as a foreign buyer?",
        answer: "Foreign buyers need: a valid passport, CPF (Brazilian tax ID number - we help obtain this), proof of income source, bank statements, and in some cases, a certificate of good conduct from your home country. All documents must be translated to Portuguese and apostilled or consularized."
      },
      {
        question: "Do I need to be present in Brazil to buy property?",
        answer: "No, you can complete the entire purchase process remotely through a legal representative (power of attorney). We work with trusted legal partners who can represent you throughout the transaction, though we recommend visiting the property before finalizing the purchase."
      }
    ]
  },
  {
    category: "Investment & Returns",
    questions: [
      {
        question: "What are typical ROI expectations for Santa Catarina properties?",
        answer: "Returns vary by region and property type: Vacation rentals typically yield 10-15% annually, residential rentals 6-10%, and capital appreciation has averaged 8-12% over the past 5 years. Coastal properties in prime locations like Balneário Camboriú and Florianópolis tend to outperform the market average."
      },
      {
        question: "How do I repatriate rental income and capital gains?",
        answer: "Brazil allows free repatriation of rental income and capital gains to your home country, subject to proper tax compliance. We work with international tax specialists to structure investments optimally and ensure all reporting requirements are met both in Brazil and your home jurisdiction."
      },
      {
        question: "What are the ongoing costs of ownership?",
        answer: "Ongoing costs include property tax (IPTU) typically 0.5-1.5% annually, condominium fees for apartment buildings, property management fees (8-12% for vacation rentals), and maintenance. Insurance is optional but recommended, especially for coastal properties."
      }
    ]
  },
  {
    category: "Legal & Tax",
    questions: [
      {
        question: "What taxes do foreign investors pay?",
        answer: "Purchase tax (ITBI) is typically 2-3% of property value. Annual property tax (IPTU) ranges 0.5-1.5%. Rental income is taxed at 15-27.5% depending on amount. Capital gains tax on sale is 15% for residents, 25% for non-residents. Brazil has tax treaties with many countries to avoid double taxation."
      },
      {
        question: "How long does the purchase process take?",
        answer: "The typical timeline is 30-90 days from offer acceptance to final deed registration, depending on financing and due diligence complexity. Cash purchases can close in 30-45 days, while financed purchases typically take 60-90 days. Legal due diligence usually takes 2-3 weeks."
      },
      {
        question: "What legal protections do foreign buyers have?",
        answer: "Foreign buyers have the same legal protections as Brazilian nationals. All property transactions must be registered with local notaries and property registries. Title insurance is available and recommended. Brazil's legal system provides strong property rights protection."
      }
    ]
  },
  {
    category: "Financing & Currency",
    questions: [
      {
        question: "Can foreigners get mortgages in Brazil?",
        answer: "Yes, but options are limited. Some Brazilian banks offer financing to foreigners with Brazilian income or significant Brazilian assets. International banks with Brazilian operations may provide financing. Many foreign buyers use financing from their home countries or cash purchases for simplicity."
      },
      {
        question: "How do currency fluctuations affect my investment?",
        answer: "Currency risk is significant for international investors. A strong Real increases your investment value in home currency, while a weak Real reduces returns. Many investors use hedging strategies or time their purchases during favorable exchange periods. Property appreciation often helps offset currency volatility long-term."
      },
      {
        question: "What's the best way to transfer money to Brazil?",
        answer: "Large transfers should use specialized currency exchange services for better rates than banks. Transfers must be properly documented for legal compliance and future repatriation. We work with trusted currency specialists who handle international real estate transactions regularly."
      }
    ]
  },
  {
    category: "Property Management",
    questions: [
      {
        question: "Do you provide property management services?",
        answer: "Yes, we partner with professional property management companies for rental management, maintenance, and guest services. Services include tenant screening, rent collection, maintenance coordination, and detailed financial reporting. Management fees typically range 8-15% depending on service level."
      },
      {
        question: "How do I handle vacation rental licensing and regulations?",
        answer: "Vacation rental regulations vary by municipality. We help navigate local licensing requirements, tax registrations, and compliance obligations. Many areas require municipal registration, fire safety certificates, and regular tax filings. Our local partners handle all regulatory requirements."
      },
      {
        question: "What if I want to use the property myself?",
        answer: "Owners can use their properties freely while maximizing rental income during non-use periods. We help create optimal booking calendars that balance personal use with rental revenue. Many clients block peak season periods for family use while renting during off-peak times."
      }
    ]
  }
];

export default function FAQ() {
  const { t } = useLanguage();
  const [openCategory, setOpenCategory] = useState<string | null>('Foreign Ownership');
  const [openQuestion, setOpenQuestion] = useState<number | null>(0);

  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
    setOpenQuestion(null);
  };

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <section id="faq" className="section-padding bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-gold-500" />
            <span className="text-gold-500 text-sm tracking-[0.3em] uppercase">{t('faq.sectionLabel')}</span>
            <div className="w-8 h-[1px] bg-gold-500" />
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-navy-900 mb-6">
            {t('faq.title')}
          </h2>
          <p className="text-navy-900/60 max-w-3xl mx-auto text-lg">
            {t('faq.subtitle')}
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-4">
          {faqData.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="border border-navy-900/10 rounded-lg overflow-hidden"
            >
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category.category)}
                className={`w-full px-6 py-4 text-left transition-all duration-300 flex items-center justify-between ${
                  openCategory === category.category
                    ? 'bg-gold-50 text-gold-800'
                    : 'bg-white hover:bg-gray-50 text-navy-900'
                }`}
              >
                <span className="font-heading text-lg">{category.category}</span>
                <ChevronDownIcon 
                  className={`w-5 h-5 transition-transform duration-300 ${
                    openCategory === category.category ? 'transform rotate-180' : ''
                  }`}
                />
              </button>

              {/* Questions */}
              <AnimatePresence>
                {openCategory === category.category && (
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
                        <div key={questionIndex} className="border-b border-navy-900/5 last:border-b-0">
                          <button
                            onClick={() => toggleQuestion(globalIndex)}
                            className="w-full px-6 py-4 text-left hover:bg-gray-25 transition-colors duration-200 flex items-center justify-between"
                          >
                            <span className="text-navy-900 font-medium pr-4">
                              {faq.question}
                            </span>
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
                                <p className="text-navy-900/70 leading-relaxed">
                                  {faq.answer}
                                </p>
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

        {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 p-8 bg-gray-50 rounded-lg text-center"
        >
          <h3 className="font-heading text-xl text-navy-900 mb-4">
            Still Have Questions?
          </h3>
          <p className="text-navy-900/60 mb-6 max-w-2xl mx-auto">
            Every investment situation is unique. Schedule a personal consultation 
            to discuss your specific goals and get tailored advice from our experts.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#contact" className="btn-gold">
              Schedule Free Consultation
            </a>
            <a href="mailto:info@migronis-brazil.com" className="btn-outline">
              Email Your Questions
            </a>
          </div>
        </motion.div>

        {/* Risk Disclaimer */}
        <div className="mt-12 p-6 bg-navy-900 rounded-lg">
          <h4 className="font-heading text-lg text-white mb-3">
            ⚠️ Important Investment Disclaimer
          </h4>
          <p className="text-white/70 text-sm leading-relaxed">
            Real estate investment carries inherent risks including market volatility, currency fluctuation, 
            regulatory changes, and liquidity constraints. Past performance does not guarantee future results. 
            All investment decisions should be made based on thorough due diligence and professional advice. 
            Tax implications vary by jurisdiction and individual circumstances. Please consult with 
            qualified legal and tax professionals before making investment decisions.
          </p>
        </div>
      </div>
    </section>
  );
}