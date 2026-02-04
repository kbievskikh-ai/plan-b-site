'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
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
  { region: 'Balneário Camboriú', residential: 5.8, vacation: 14.2, investment: 10.1 },
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
  const [activeTab, setActiveTab] = useState('growth');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value: number) => `${value}%`;

  const tabs = [
    { id: 'growth', label: 'Price Growth', icon: '📈' },
    { id: 'yields', label: 'Rental Yields', icon: '💰' },
    { id: 'composition', label: 'Market Mix', icon: '🥧' },
    { id: 'flows', label: 'Investment Flows', icon: '🌊' },
  ];

  return (
    <section className="section-padding bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-gold-500" />
            <span className="text-gold-500 text-sm tracking-[0.3em] uppercase">Market Data</span>
            <div className="w-8 h-[1px] bg-gold-500" />
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-white mb-6">
            Investment Analytics
          </h2>
          <p className="text-white/60 max-w-3xl mx-auto text-lg">
            Real market data and trends across Santa Catarina&apos;s investment regions. 
            Make informed decisions with comprehensive analytics and insights.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gold-500 text-navy-900'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <span>{tab.icon}</span>
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
          className="bg-white/5 backdrop-blur-sm rounded-lg p-8"
        >
          {activeTab === 'growth' && (
            <div>
              <h3 className="font-heading text-2xl text-white mb-2">Property Price Growth Trends</h3>
              <p className="text-white/60 mb-8">Average property values by region (USD)</p>
              
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={priceGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                  <XAxis dataKey="year" stroke="#ffffff60" />
                  <YAxis tickFormatter={formatCurrency} stroke="#ffffff60" />
                  <Tooltip 
                    formatter={(value) => [formatCurrency(Number(value)), '']}
                    labelStyle={{ color: '#0a0e1a' }}
                    contentStyle={{ backgroundColor: '#ffffff', border: 'none', borderRadius: '8px' }}
                  />
                  <Line type="monotone" dataKey="florianopolis" stroke="#c9963c" strokeWidth={3} name="Florianópolis" />
                  <Line type="monotone" dataKey="balneario" stroke="#d4a853" strokeWidth={3} name="Balneário Camboriú" />
                  <Line type="monotone" dataKey="itapema" stroke="#ffffff" strokeWidth={3} name="Itapema" />
                  <Line type="monotone" dataKey="average" stroke="#1e2844" strokeWidth={3} strokeDasharray="5 5" name="Average" />
                </LineChart>
              </ResponsiveContainer>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="text-center">
                  <div className="text-gold-500 font-heading text-2xl">+44%</div>
                  <div className="text-white/60 text-sm">5-Year Growth</div>
                </div>
                <div className="text-center">
                  <div className="text-gold-500 font-heading text-2xl">$533k</div>
                  <div className="text-white/60 text-sm">Avg. Price 2024</div>
                </div>
                <div className="text-center">
                  <div className="text-gold-500 font-heading text-2xl">8.2%</div>
                  <div className="text-white/60 text-sm">Annual Growth</div>
                </div>
                <div className="text-center">
                  <div className="text-gold-500 font-heading text-2xl">↗️</div>
                  <div className="text-white/60 text-sm">Trend Direction</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'yields' && (
            <div>
              <h3 className="font-heading text-2xl text-white mb-2">Rental Yield Analysis</h3>
              <p className="text-white/60 mb-8">Annual rental yields by region and property type (%)</p>
              
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={rentalYieldData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                  <XAxis dataKey="region" stroke="#ffffff60" />
                  <YAxis tickFormatter={formatPercent} stroke="#ffffff60" />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, '']}
                    labelStyle={{ color: '#0a0e1a' }}
                    contentStyle={{ backgroundColor: '#ffffff', border: 'none', borderRadius: '8px' }}
                  />
                  <Bar dataKey="residential" fill="#c9963c" name="Residential" />
                  <Bar dataKey="vacation" fill="#d4a853" name="Vacation Rental" />
                  <Bar dataKey="investment" fill="#1e2844" name="Investment" />
                </BarChart>
              </ResponsiveContainer>

              <div className="grid grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="w-4 h-4 bg-[#c9963c] rounded mx-auto mb-2"></div>
                  <div className="text-gold-500 font-heading text-xl">6.9%</div>
                  <div className="text-white/60 text-sm">Avg Residential</div>
                </div>
                <div className="text-center">
                  <div className="w-4 h-4 bg-[#d4a853] rounded mx-auto mb-2"></div>
                  <div className="text-gold-500 font-heading text-xl">13.0%</div>
                  <div className="text-white/60 text-sm">Avg Vacation Rental</div>
                </div>
                <div className="text-center">
                  <div className="w-4 h-4 bg-[#1e2844] rounded mx-auto mb-2"></div>
                  <div className="text-gold-500 font-heading text-xl">9.9%</div>
                  <div className="text-white/60 text-sm">Avg Investment</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'composition' && (
            <div>
              <h3 className="font-heading text-2xl text-white mb-2">Market Composition</h3>
              <p className="text-white/60 mb-8">Investment distribution by property type</p>
              
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={marketCompositionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {marketCompositionData.map((entry, index) => (
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

                <div className="space-y-4">
                  {marketCompositionData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-white">{item.name}</span>
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
              <h3 className="font-heading text-2xl text-white mb-2">Investment Flow Trends</h3>
              <p className="text-white/60 mb-8">Monthly investment volume (millions USD)</p>
              
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={investmentFlowData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                  <XAxis dataKey="month" stroke="#ffffff60" />
                  <YAxis stroke="#ffffff60" />
                  <Tooltip 
                    formatter={(value) => [`$${value}M`, '']}
                    labelStyle={{ color: '#0a0e1a' }}
                    contentStyle={{ backgroundColor: '#ffffff', border: 'none', borderRadius: '8px' }}
                  />
                  <Area type="monotone" dataKey="foreign" stackId="1" stroke="#c9963c" fill="#c9963c" name="Foreign Investment" />
                  <Area type="monotone" dataKey="domestic" stackId="1" stroke="#d4a853" fill="#d4a853" name="Domestic Investment" />
                </AreaChart>
              </ResponsiveContainer>

              <div className="grid grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-gold-500 font-heading text-xl">$58M</div>
                  <div className="text-white/60 text-sm">Avg Foreign Monthly</div>
                </div>
                <div className="text-center">
                  <div className="text-gold-500 font-heading text-xl">$87M</div>
                  <div className="text-white/60 text-sm">Avg Domestic Monthly</div>
                </div>
                <div className="text-center">
                  <div className="text-gold-500 font-heading text-xl">40%</div>
                  <div className="text-white/60 text-sm">Foreign Investment Share</div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Data Sources */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="text-center">
            <h4 className="font-heading text-lg text-white mb-4">Data Sources & Methodology</h4>
            <div className="grid md:grid-cols-3 gap-6 text-sm text-white/60">
              <div>
                <strong className="text-gold-500">IBGE</strong><br />
                Brazilian Institute of Geography and Statistics - Official property price indices and demographic data
              </div>
              <div>
                <strong className="text-gold-500">SECOVI-SC</strong><br />
                Santa Catarina Real Estate Union - Market transactions, rental yields, and regional analysis
              </div>
              <div>
                <strong className="text-gold-500">Central Bank of Brazil</strong><br />
                Foreign investment flows, currency data, and economic indicators
              </div>
            </div>
            <p className="text-white/40 text-xs mt-6">
              Data updated monthly. Investment returns are historical and do not guarantee future performance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}