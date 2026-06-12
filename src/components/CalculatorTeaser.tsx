'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';

export default function CalculatorTeaser() {
  const { t } = useLanguage();
  const [investment, setInvestment] = useState(250000);
  const [years, setYears] = useState(5);

  // Simplified calculation for teaser
  const annualAppreciation = 0.08;
  const annualRentalYield = 0.065;
  const totalReturn = investment * Math.pow(1 + annualAppreciation, years) + 
    (investment * annualRentalYield * years) - investment;
  const totalValue = investment + totalReturn;
  const roi = ((totalReturn / investment) * 100).toFixed(0);

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
    return `$${(value / 1000).toFixed(0)}K`;
  };

  return (
    <section id="calculator" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0a0e1a] to-[#1e2844] rounded-3xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left: Interactive Preview */}
            <div className="p-8 lg:p-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-gold-500 text-sm font-semibold tracking-widest uppercase">
                  {t('calc.sectionLabel')}
                </span>
                <h2 className="mt-3 font-heading text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {t('calc.title1')}{' '}
                  <span className="text-gold-500">{t('calc.titleHighlight')}</span>
                </h2>
                <p className="mt-3 text-gray-400 text-sm">
                  {t('calc.subtitle')}
                </p>
              </motion.div>

              {/* Mini Calculator */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-8 space-y-6"
              >
                {/* Investment Amount Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-gray-400 text-sm font-medium">
                      {t('calc.investmentAmount')}
                    </label>
                    <span className="text-gold-500 font-bold text-xl font-serif">
                      {formatCurrency(investment)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={100000}
                    max={1000000}
                    step={25000}
                    value={investment}
                    onChange={(e) => setInvestment(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #c9963c ${((investment - 100000) / 900000) * 100}%, #2a3456 ${((investment - 100000) / 900000) * 100}%)`,
                    }}
                  />
                  <div className="flex justify-between text-xs text-gray-600 mt-1">
                    <span>$100K</span>
                    <span>$1M</span>
                  </div>
                </div>

                {/* Years Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-gray-400 text-sm font-medium">
                      {t('calc.holdingPeriod')}
                    </label>
                    <span className="text-gold-500 font-bold text-xl font-serif">
                      {years} {t('calc.years')}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    step={1}
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #c9963c ${((years - 1) / 9) * 100}%, #2a3456 ${((years - 1) / 9) * 100}%)`,
                    }}
                  />
                  <div className="flex justify-between text-xs text-gray-600 mt-1">
                    <span>1</span>
                    <span>10</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: Results Preview */}
            <div className="bg-navy-950 p-8 lg:p-12 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                {/* Estimated Return */}
                <div className="text-center lg:text-left">
                  <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">
                    {t('calc.estimatedReturn')}
                  </div>
                  <div className="text-gold-500 text-4xl sm:text-5xl font-bold font-serif">
                    {formatCurrency(totalReturn)}
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-navy-600/50 rounded-xl p-4 border border-[#2a3456]">
                    <div className="text-white text-2xl font-bold font-serif">
                      {formatCurrency(totalValue)}
                    </div>
                    <div className="text-gray-500 text-xs mt-1">{t('calc.totalValue')}</div>
                  </div>
                  <div className="bg-navy-600/50 rounded-xl p-4 border border-[#2a3456]">
                    <div className="text-green-400 text-2xl font-bold font-serif">
                      +{roi}%
                    </div>
                    <div className="text-gray-500 text-xs mt-1">{t('calc.totalROI')}</div>
                  </div>
                  <div className="bg-navy-600/50 rounded-xl p-4 border border-[#2a3456]">
                    <div className="text-white text-2xl font-bold font-serif">
                      8%
                    </div>
                    <div className="text-gray-500 text-xs mt-1">{t('calc.appreciation')}</div>
                  </div>
                  <div className="bg-navy-600/50 rounded-xl p-4 border border-[#2a3456]">
                    <div className="text-white text-2xl font-bold font-serif">
                      6.5%
                    </div>
                    <div className="text-gray-500 text-xs mt-1">{t('calc.rentalYield')}</div>
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-2 space-y-3">
                  <a
                    href="/calculator.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-gold-500 hover:bg-gold-600 text-white py-4 rounded-xl font-semibold transition-colors duration-300 text-lg"
                  >
                    {t('calc.openFull')}
                    <span className="ml-2">→</span>
                  </a>
                  <div className="text-center">
                    <p className="text-gray-400 text-xs mb-2">{t('calc.personalizedPrompt')}</p>
                    <a
                      href="https://wa.me/5548988117424"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold-500 hover:text-gold-400 text-sm font-semibold underline underline-offset-4 transition-colors"
                    >
                      {t('calc.strategyCallCta')}
                    </a>
                  </div>
                  <p className="text-gray-600 text-[10px] text-center">
                    {t('calc.disclaimer')}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
