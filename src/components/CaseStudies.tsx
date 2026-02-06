'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';

const caseStudies = [
  {
    id: 1,
    title: "Luxury Penthouse Investment",
    location: "Balneário Camboriú",
    type: "Short-term Rental",
    timeline: "18 months",
    initialInvestment: "R$ 4.2M ($820k)",
    currentValue: "R$ 5.1M ($995k)",
    roi: "22% total return",
    annualIncome: "R$ 480k ($94k)",
    yieldRate: "11.4%",
    clientProfile: "American tech entrepreneur",
    strategy: "Premium beachfront vacation rental targeting international tourists",
    challenges: [
      "Foreign buyer regulations",
      "Property management from overseas", 
      "Tax optimization structure"
    ],
    solutions: [
      "Structured purchase through Brazilian corporation",
      "Full-service property management partnership",
      "Tax-efficient rental income repatriation"
    ],
    results: [
      "Property value increased 21% in 18 months",
      "Consistent 85% occupancy rate year-round",
      "Generated $94k net rental income annually",
      "Client secured Brazilian investor visa"
    ],
    gradient: "from-blue-600 to-blue-800"
  },
  {
    id: 2,
    title: "Coastal Development Portfolio",
    location: "Porto Belo & Bombinhas",
    type: "Development Investment",
    timeline: "24 months",
    initialInvestment: "R$ 8.5M ($1.66M)",
    currentValue: "R$ 12.8M ($2.5M)",
    roi: "51% total return",
    annualIncome: "R$ 720k ($141k)",
    yieldRate: "8.5%",
    clientProfile: "German real estate fund",
    strategy: "Early-stage investment in boutique coastal development projects",
    challenges: [
      "Complex multi-property acquisition",
      "Development timeline risks",
      "Currency fluctuation exposure"
    ],
    solutions: [
      "Phased acquisition strategy with performance milestones",
      "Local partnership with experienced developers",
      "Currency hedging through structured financing"
    ],
    results: [
      "Portfolio value increased 51% over 24 months",
      "Successfully completed 3 development phases",
      "Generated consistent rental income during construction",
      "Established strong local development network"
    ],
    gradient: "from-green-600 to-green-800"
  },
  {
    id: 3,
    title: "Wine Country Retreat Investment",
    location: "Rancho Queimado",
    type: "Eco-Tourism Property",
    timeline: "12 months",
    initialInvestment: "R$ 2.4M ($470k)",
    currentValue: "R$ 2.9M ($565k)",
    roi: "20% total return",
    annualIncome: "R$ 180k ($35k)",
    yieldRate: "7.5%",
    clientProfile: "Canadian retirement couple",
    strategy: "Luxury mountain retreat catering to eco-tourism and wine experiences",
    challenges: [
      "Rural property due diligence",
      "Seasonal tourism patterns",
      "Infrastructure limitations"
    ],
    solutions: [
      "Comprehensive environmental and title analysis",
      "Diversified booking strategy (eco-tours, wine events, retreats)",
      "Strategic infrastructure improvements and partnerships"
    ],
    results: [
      "Property value increased 20% in 12 months",
      "Achieved 70% occupancy in peak season",
      "Generated $35k net income in first year",
      "Established wine tourism partnership program"
    ],
    gradient: "from-purple-600 to-purple-800"
  }
];

export default function CaseStudies() {
  const { t } = useLanguage();
  const [activeCaseStudy, setActiveCaseStudy] = useState(0);

  return (
    <section id="case-studies" className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-gold-500" />
            <span className="text-gold-500 text-sm tracking-[0.3em] uppercase">{t('caseStudies.sectionLabel')}</span>
            <div className="w-8 h-[1px] bg-gold-500" />
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-navy-900 mb-6 [text-wrap:balance]">
            {t('caseStudies.title')}
          </h2>
          <p className="text-navy-900/60 max-w-3xl mx-auto text-lg">
            {t('caseStudies.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Case Study Navigation */}
          <div className="space-y-4">
            {caseStudies.map((caseStudy, index) => (
              <motion.div
                key={caseStudy.id}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-300 border ${
                  activeCaseStudy === index
                    ? 'border-gold-500 bg-white shadow-lg'
                    : 'border-navy-900/10 bg-white hover:border-gold-400/50 hover:shadow-md'
                }`}
                onClick={() => setActiveCaseStudy(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="mb-3">
                  <h4 className="font-heading text-lg text-navy-900 mb-1">
                    {caseStudy.title}
                  </h4>
                  <p className="text-navy-900/60 text-sm">
                    {caseStudy.location} • {caseStudy.type}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-gold-600 font-bold text-sm">
                    {caseStudy.roi}
                  </div>
                  <div className="text-navy-900/40 text-xs">
                    {caseStudy.timeline}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Active Case Study Display */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCaseStudy}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                {/* Header */}
                <div className={`bg-gradient-to-r ${caseStudies[activeCaseStudy].gradient} p-6 text-white`}>
                  <div className="flex flex-wrap justify-between items-start gap-4">
                    <div>
                      <h3 className="font-heading text-2xl mb-2">
                        {caseStudies[activeCaseStudy].title}
                      </h3>
                      <p className="text-white/80">
                        {caseStudies[activeCaseStudy].location} • {caseStudies[activeCaseStudy].type}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-heading mb-1">
                        {caseStudies[activeCaseStudy].roi}
                      </div>
                      <div className="text-white/80 text-sm">
                        Total Return
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-lg font-heading text-navy-900 mb-1">
                        {caseStudies[activeCaseStudy].timeline}
                      </div>
                      <div className="text-navy-900/60 text-xs uppercase tracking-wider">
                        Timeline
                      </div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-lg font-heading text-navy-900 mb-1">
                        {caseStudies[activeCaseStudy].yieldRate}
                      </div>
                      <div className="text-navy-900/60 text-xs uppercase tracking-wider">
                        Annual Yield
                      </div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-lg font-heading text-navy-900 mb-1">
                        {caseStudies[activeCaseStudy].initialInvestment}
                      </div>
                      <div className="text-navy-900/60 text-xs uppercase tracking-wider">
                        Initial Investment
                      </div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-lg font-heading text-navy-900 mb-1">
                        {caseStudies[activeCaseStudy].currentValue}
                      </div>
                      <div className="text-navy-900/60 text-xs uppercase tracking-wider">
                        Current Value
                      </div>
                    </div>
                  </div>

                  {/* Strategy & Client */}
                  <div className="mb-8">
                    <h4 className="font-heading text-xl lg:text-2xl text-navy-900 mb-4">{t('caseStudies.investmentStrategy')}</h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <div className="text-navy-900/60 text-sm uppercase tracking-wider mb-2">{t('caseStudies.clientProfile')}</div>
                        <p className="text-navy-900 mb-4">{caseStudies[activeCaseStudy].clientProfile}</p>
                        <div className="text-navy-900/60 text-sm uppercase tracking-wider mb-2">{t('caseStudies.strategy')}</div>
                        <p className="text-navy-900/70">{caseStudies[activeCaseStudy].strategy}</p>
                      </div>
                      <div>
                        <div className="text-navy-900/60 text-sm uppercase tracking-wider mb-2">{t('caseStudies.annualIncome')}</div>
                        <p className="text-gold-600 font-heading text-xl mb-4">{caseStudies[activeCaseStudy].annualIncome}</p>
                      </div>
                    </div>
                  </div>

                  {/* Challenges & Solutions */}
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h4 className="font-heading text-xl lg:text-2xl text-navy-900 mb-4">{t('caseStudies.challenges')}</h4>
                      <ul className="space-y-2">
                        {caseStudies[activeCaseStudy].challenges.map((challenge, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-red-500 text-sm mt-1">⚠️</span>
                            <span className="text-navy-900/70 text-sm">{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-heading text-xl lg:text-2xl text-navy-900 mb-4">{t('caseStudies.solutions')}</h4>
                      <ul className="space-y-2">
                        {caseStudies[activeCaseStudy].solutions.map((solution, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-green-500 text-sm mt-1">✅</span>
                            <span className="text-navy-900/70 text-sm">{solution}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Results */}
                  <div>
                    <h4 className="font-heading text-xl lg:text-2xl text-navy-900 mb-4">{t('caseStudies.keyResults')}</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {caseStudies[activeCaseStudy].results.map((result, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 bg-gold-50 rounded-lg">
                          <span className="text-gold-600 text-lg">🏆</span>
                          <span className="text-navy-900/70 text-sm">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16 p-8 bg-navy-900 rounded-lg"
        >
          <h3 className="font-heading text-xl lg:text-2xl text-white mb-4">
            {t('caseStudies.ctaTitle')}
          </h3>
          <p className="text-white/70 mb-6 max-w-2xl mx-auto">
            {t('caseStudies.ctaSubtitle')}
          </p>
          <a href="#contact" className="btn-gold">
            {t('caseStudies.cta')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}