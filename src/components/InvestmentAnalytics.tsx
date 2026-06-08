'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Mock data for charts
const priceGrowthData = [
  { year: '2019', florianopolis: 450000, balneario: 380000, itapema: 280000, average: 370000 },
  { year: '2020', florianopolis: 465000, balneario: 395000, itapema: 290000, average: 383000 },
  { year: '2021', florianopolis: 495000, balneario: 425000, itapema: 310000, average: 410000 },
  { year: '2022', florianopolis: 535000, balneario: 465000, itapema: 340000, average: 447000 },
  { year: '2023', florianopolis: 580000, balneario: 510000, itapema: 375000, average: 488000 },
  { year: '2024', florianopolis: 625000, balneario: 560000, itapema: 415000, average: 533000 },
];

const rentalYieldData = [
  { region: 'Florianópolis', residential: 6.5, vacation: 12.8, investment: 9.2 },
  { region: 'B. Camboriú', residential: 5.8, vacation: 14.2, investment: 10.1 },
  { region: 'Itapema', residential: 7.2, vacation: 11.5, investment: 8.9 },
  { region: 'Porto Belo', residential: 8.1, vacation: 13.6, investment: 10.8 },
  { region: 'Bombinhas', residential: 6.9, vacation: 15.2, investment: 11.3 },
  { region: 'Imbituba', residential: 7.8, vacation: 10.9, investment: 9.1 },
];

const marketCompositionData = [
  { name: 'Residential', value: 45, color: '#0a0e1a' },
  { name: 'Vacation Rental', value: 30, color: '#c9963c' },
  { name: 'Investment', value: 20, color: '#1e2844' },
  { name: 'Commercial', value: 5, color: '#d4a853' },
];

const investmentFlowData = [
  { month: 'Jan', foreign: 45, domestic: 78, total: 123 },
  { month: 'Feb', foreign: 52, domestic: 85, total: 137 },
  { month: 'Mar', foreign: 48, domestic: 82, total: 130 },
  { month: 'Apr', foreign: 65, domestic: 95, total: 160 },
  { month: 'May', foreign: 71, domestic: 88, total: 159 },
  { month: 'Jun', foreign: 58, domestic: 92, total: 150 },
];

const COLORS = ['#0a0e1a', '#c9963c', '#1e2844', '#d4a853'];

export default function InvestmentAnalytics() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState('growth');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatCurrencyShort = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    return `$${(value / 1000).toFixed(0)}K`;
  };

  const formatPercent = (value: number) => `${value}%`;

  const tabIcons = {
    growth: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
    yields: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    composition: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
        <path d="M22 12A10 10 0 0 0 12 2v10z" />
      </svg>
    ),
    flows: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  };

  const tabs = [
    { id: 'growth', label: t('analytics.priceGrowth') },
    { id: 'yields', label: t('analytics.rentalYields') },
    { id: 'composition', label: t('analytics.marketMix') },
    { id: 'flows', label: t('analytics.investmentFlows') },
  ];

  const getMarketCompositionLabels = () => {
    if (language === 'ru') {
      return [
        { name: 'Жилая', value: 45, color: '#0a0e1a' },
        { name: 'Краткосрочная', value: 30, color: '#c9963c' },
        { name: 'Инвестиционная', value: 20, color: '#1e2844' },
        { name: 'Коммерческая', value: 5, color: '#d4a853' },
      ];
    }
    return marketCompositionData;
  };

  return (
    <section className="section-padding bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-gold-500" />
            <span className="text-gold-500 text-sm tracking-[0.3em] uppercase">{t('analytics.sectionLabel')}</span>
            <div className="w-8 h-[1px] bg-gold-500" />
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-white mb-6 [text-wrap:balance]">
            {t('analytics.title')}
          </h2>
          <p className="text-white/60 max-w-3xl mx-auto text-lg">
            {t('analytics.subtitle')}
          </p>
        </div>

        {/* Tab Navigation - improved for mobile */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 text-sm sm:text-base whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gold-500 text-navy-900'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <span className="hidden sm:inline">{tabIcons[tab.id as keyof typeof tabIcons]}</span>
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Chart Display */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-8"
        >
          {activeTab === 'growth' && (
            <div>
              <h3 className="font-heading text-xl sm:text-2xl text-white mb-2">{t('analytics.priceGrowthTitle')}</h3>
              <p className="text-white/60 mb-8 text-sm sm:text-base">{t('analytics.priceGrowthSubtitle')}</p>
              
              <div className="w-full overflow-x-auto">
                <div className="min-w-[500px]">
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={priceGrowthData} margin={{ top: 5, right: 10, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                      <XAxis dataKey="year" stroke="#ffffff60" tick={{ fontSize: 12 }} />
                      <YAxis 
                        tickFormatter={formatCurrencyShort} 
                        stroke="#ffffff60" 
                        tick={{ fontSize: 12 }}
                        width={80}
                      />
                      <Tooltip 
                        formatter={(value) => [formatCurrency(Number(value)), '']}
                        labelStyle={{ color: '#0a0e1a' }}
                        contentStyle={{ backgroundColor: '#ffffff', border: 'none', borderRadius: '8px' }}
                      />
                      <Line type="monotone" dataKey="florianopolis" stroke="#c9963c" strokeWidth={2} name="Florianópolis" dot={false} />
                      <Line type="monotone" dataKey="balneario" stroke="#d4a853" strokeWidth={2} name="Balneário Camboriú" dot={false} />
                      <Line type="monotone" dataKey="itapema" stroke="#ffffff" strokeWidth={2} name="Itapema" dot={false} />
                      <Line type="monotone" dataKey="average" stroke="#1e2844" strokeWidth={2} strokeDasharray="5 5" name="Average" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-gold-500 font-heading text-xl sm:text-2xl">+44%</div>
                  <div className="text-white/60 text-xs sm:text-sm">{t('analytics.fiveYearGrowth')}</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-gold-500 font-heading text-xl sm:text-2xl">$533k</div>
                  <div className="text-white/60 text-xs sm:text-sm">{t('analytics.avgPrice')} 2024</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-gold-500 font-heading text-xl sm:text-2xl">8.2%</div>
                  <div className="text-white/60 text-xs sm:text-sm">{t('analytics.annualGrowth')}</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-gold-500 font-heading text-xl sm:text-2xl">↗️</div>
                  <div className="text-white/60 text-xs sm:text-sm">{t('analytics.trendDirection')}</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'yields' && (
            <div>
              <h3 className="font-heading text-xl sm:text-2xl text-white mb-2">{t('analytics.rentalYieldTitle')}</h3>
              <p className="text-white/60 mb-8 text-sm sm:text-base">{t('analytics.rentalYieldSubtitle')}</p>
              
              <div className="w-full overflow-x-auto">
                <div className="min-w-[500px]">
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={rentalYieldData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                      <XAxis 
                        dataKey="region" 
                        stroke="#ffffff60" 
                        tick={{ fontSize: 10 }}
                        interval={0}
                        angle={-20}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis tickFormatter={formatPercent} stroke="#ffffff60" tick={{ fontSize: 12 }} />
                      <Tooltip 
                        formatter={(value) => [`${value}%`, '']}
                        labelStyle={{ color: '#0a0e1a' }}
                        contentStyle={{ backgroundColor: '#ffffff', border: 'none', borderRadius: '8px' }}
                      />
                      <Bar dataKey="residential" fill="#0a1628" name={t('analytics.residential')} />
                      <Bar dataKey="vacation" fill="#c9963c" name={t('analytics.vacationRental')} />
                      <Bar dataKey="investment" fill="#e2e8f0" name="Investment" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-8">
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="w-4 h-4 bg-[#0a1628] rounded mx-auto mb-2 border border-white/20"></div>
                  <div className="text-gold-500 font-heading text-lg sm:text-xl">6.9%</div>
                  <div className="text-white/60 text-xs sm:text-sm">{t('analytics.avgResidential')}</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="w-4 h-4 bg-[#c9963c] rounded mx-auto mb-2"></div>
                  <div className="text-gold-500 font-heading text-lg sm:text-xl">13.0%</div>
                  <div className="text-white/60 text-xs sm:text-sm">{t('analytics.avgVacationRental')}</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="w-4 h-4 bg-[#e2e8f0] rounded mx-auto mb-2"></div>
                  <div className="text-gold-500 font-heading text-lg sm:text-xl">9.9%</div>
                  <div className="text-white/60 text-xs sm:text-sm">{t('analytics.avgInvestment')}</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'composition' && (
            <div>
              <h3 className="font-heading text-xl sm:text-2xl text-white mb-2">{t('analytics.marketCompositionTitle')}</h3>
              <p className="text-white/60 mb-8 text-sm sm:text-base">{t('analytics.marketCompositionSubtitle')}</p>
              
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={getMarketCompositionLabels()}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={90}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {getMarketCompositionLabels().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value}%`, '']}
                      labelStyle={{ color: '#0a0e1a' }}
                      contentStyle={{ backgroundColor: '#ffffff', border: 'none', borderRadius: '8px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>

                <div className="space-y-3">
                  {getMarketCompositionLabels().map((item) => (
                    <div key={item.name} className="flex items-center justify-between p-3 sm:p-4 bg-white/10 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-white text-sm sm:text-base">{item.name}</span>
                      </div>
                      <span className="text-gold-500 font-bold">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'flows' && (
            <div>
              <h3 className="font-heading text-xl sm:text-2xl text-white mb-2">{t('analytics.investmentFlowTitle')}</h3>
              <p className="text-white/60 mb-8 text-sm sm:text-base">{t('analytics.investmentFlowSubtitle')}</p>
              
              <div className="w-full overflow-x-auto">
                <div className="min-w-[500px]">
                  <ResponsiveContainer width="100%" height={350}>
                    <AreaChart data={investmentFlowData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                      <XAxis dataKey="month" stroke="#ffffff60" tick={{ fontSize: 12 }} />
                      <YAxis stroke="#ffffff60" tick={{ fontSize: 12 }} />
                      <Tooltip 
                        formatter={(value) => [`$${value}M`, '']}
                        labelStyle={{ color: '#0a0e1a' }}
                        contentStyle={{ backgroundColor: '#ffffff', border: 'none', borderRadius: '8px' }}
                      />
                      <Area type="monotone" dataKey="foreign" stackId="1" stroke="#c9963c" fill="#c9963c" name="Foreign Investment" />
                      <Area type="monotone" dataKey="domestic" stackId="1" stroke="#60a5fa" fill="#60a5fa" name="Domestic Investment" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-8">
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-gold-500 font-heading text-lg sm:text-xl">$58M</div>
                  <div className="text-white/60 text-xs sm:text-sm">{t('analytics.avgForeignMonthly')}</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-gold-500 font-heading text-lg sm:text-xl">$87M</div>
                  <div className="text-white/60 text-xs sm:text-sm">{t('analytics.avgDomesticMonthly')}</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-gold-500 font-heading text-lg sm:text-xl">40%</div>
                  <div className="text-white/60 text-xs sm:text-sm">{t('analytics.foreignInvestmentShare')}</div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Data Sources */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="text-center">
            <h4 className="font-heading text-lg text-white mb-4">{t('analytics.dataSources')}</h4>
            <div className="grid md:grid-cols-3 gap-6">
              <a href="https://www.ibge.gov.br" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <div className="w-14 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden p-1">
                  <img src="/images/partners/ibge.svg" alt="IBGE" className="w-full h-full object-contain" />
                </div>
                <div className="text-left">
                  <strong className="text-gold-500 text-sm">IBGE</strong><br />
                  <span className="text-white/60 text-xs">{t('analytics.ibge')}</span>
                </div>
              </a>
              <a href="https://secovi-sc.com.br" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <div className="w-14 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-gold-500 font-bold text-[10px]">SECOVI-SC</span>
                </div>
                <div className="text-left">
                  <strong className="text-gold-500 text-sm">SECOVI-SC</strong><br />
                  <span className="text-white/60 text-xs">{t('analytics.secoviSc')}</span>
                </div>
              </a>
              <a href="https://www.bcb.gov.br" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <div className="w-14 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden p-1">
                  <img src="/images/partners/bcb.png" alt="BCB" className="w-full h-full object-contain" />
                </div>
                <div className="text-left">
                  <strong className="text-gold-500 text-sm">Central Bank</strong><br />
                  <span className="text-white/60 text-xs">{t('analytics.centralBank')}</span>
                </div>
              </a>
            </div>
            <p className="text-white/50 text-xs mt-6">
              {t('analytics.disclaimer')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
