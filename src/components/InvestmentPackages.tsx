'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';

const packages = [
  {
    key: 'starter',
    price: '$150K',
    popular: false,
    features: ['preconstruction', 'management', 'rentalSetup', 'basicTax'],
    noFeatures: ['visa', 'intlTax'],
    target: '8-10%',
  },
  {
    key: 'growth',
    price: '$350K',
    popular: true,
    features: ['premiumUnit', 'management', 'rentalSetup', 'visa', 'fullTax'],
    noFeatures: ['portfolio'],
    target: '12-15%',
  },
  {
    key: 'portfolio',
    price: '$500K+',
    popular: false,
    features: ['multiUnit', 'fullManagement', 'rentalSetup', 'residency', 'intlStructuring', 'dedicatedAdvisor'],
    noFeatures: [],
    target: '14-18%',
  },
];

export default function InvestmentPackages() {
  const { t } = useLanguage();

  return (
    <section id="packages" className="py-20 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#c9963c] text-sm font-semibold tracking-widest uppercase">
            {t('packages.sectionLabel')}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#0a0e1a]">
            {t('packages.title1')}{' '}
            <span className="text-[#c9963c]">{t('packages.titleHighlight')}</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            {t('packages.subtitle')}
          </p>
        </motion.div>

        {/* Package Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className={`relative rounded-2xl p-8 ${
                pkg.popular
                  ? 'bg-[#0a0e1a] text-white border-2 border-[#c9963c] shadow-2xl scale-105'
                  : 'bg-white border border-gray-200 shadow-sm hover:shadow-lg'
              } transition-all duration-300`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#c9963c] text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                  {t('packages.mostPopular')}
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className={`text-lg font-semibold uppercase tracking-wider mb-2 ${
                  pkg.popular ? 'text-[#c9963c]' : 'text-[#c9963c]'
                }`}>
                  {t(`packages.${pkg.key}Name`)}
                </h3>
                <div className={`text-4xl font-bold mb-1 ${
                  pkg.popular ? 'text-white' : 'text-[#0a0e1a]'
                }`}>
                  {pkg.price}
                </div>
                <div className={`text-sm ${pkg.popular ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t('packages.startingFrom')}
                </div>
              </div>

              {/* Target Return */}
              <div className={`text-center py-3 rounded-xl mb-6 ${
                pkg.popular ? 'bg-[#c9963c]/20' : 'bg-[#f8f9fc]'
              }`}>
                <div className={`text-2xl font-bold ${
                  pkg.popular ? 'text-[#c9963c]' : 'text-[#0a0e1a]'
                }`}>
                  {pkg.target}
                </div>
                <div className={`text-xs ${pkg.popular ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t('packages.targetReturn')}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {pkg.features.map((feat) => (
                  <div key={feat} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-[#c9963c] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    <span className={`text-sm ${pkg.popular ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t(`packages.feat_${feat}`)}
                    </span>
                  </div>
                ))}
                {pkg.noFeatures.map((feat) => (
                  <div key={feat} className="flex items-center gap-3 opacity-40">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                    <span className={`text-sm ${pkg.popular ? 'text-gray-500' : 'text-gray-400'}`}>
                      {t(`packages.feat_${feat}`)}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <a
                href="#contact"
                className={`block text-center py-3 rounded-xl font-semibold transition-colors duration-300 ${
                  pkg.popular
                    ? 'bg-[#c9963c] hover:bg-[#b8872e] text-white'
                    : 'bg-[#0a0e1a] hover:bg-[#1e2844] text-white'
                }`}
              >
                {t('packages.getStarted')}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-gray-400 max-w-2xl mx-auto">
          {t('packages.disclaimer')}
        </p>
      </div>
    </section>
  );
}
