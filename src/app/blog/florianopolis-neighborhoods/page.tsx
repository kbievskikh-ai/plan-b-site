import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Florianópolis Real Estate Prices 2026: Neighborhood by Neighborhood — Plan B Brazil',
  description: 'Complete price guide for every neighborhood in Florianópolis. Jurerê, Lagoa, Campeche, Ingleses and more. Data from FipeZap, June 2026.',
};

export default function Page() {
  const neighborhoods = [
    { name: 'Jurerê Internacional', icon: '⭐', price: 'R$ 15,000-25,000', growth: '+180% (7yr)', profile: 'HNWI, luxury investors', yield: '3-4%', supply: 'Very limited' },
    { name: 'Jurerê (Traditional)', icon: '🏠', price: 'R$ 10,000-15,000', growth: '+120% (7yr)', profile: 'Mid-to-premium buyers', yield: '4-5%', supply: 'Limited' },
    { name: 'Lagoa da Conceição', icon: '🌊', price: 'R$ 8,000-14,000', growth: '+90% (5yr)', profile: 'Lifestyle buyers, remote workers', yield: '4-5%', supply: 'Very limited (environmental zone)' },
    { name: 'Campeche', icon: '📈', price: 'R$ 6,000-10,000', growth: '+65% (5yr)', profile: 'Growth investors, digital nomads', yield: '5-6%', supply: 'Moderate, increasing' },
    { name: 'Ingleses', icon: '🏖️', price: 'R$ 6,000-10,000', growth: '+50% (5yr)', profile: 'Families, retirees, Argentine buyers', yield: '4-6%', supply: 'Moderate' },
    { name: 'Centro', icon: '🏛️', price: 'R$ 4,000-7,000', growth: '+30% (5yr)', profile: 'Long-term rental investors', yield: '6-7%', supply: 'Stable' },
    { name: 'Canasvieiras', icon: '🏪', price: 'R$ 5,000-9,000', growth: '+40% (5yr)', profile: 'Rental investors', yield: '4-5%', supply: 'Moderate' },
    { name: 'Cachoeira do Bom Jesus', icon: '🏘️', price: 'R$ 5,000-8,000', growth: '+35% (5yr)', profile: 'Budget-conscious buyers', yield: '5-6%', supply: 'Moderate' },
    { name: 'Rio Vermelho', icon: '🌅', price: 'R$ 5,000-8,500', growth: '+45% (5yr)', profile: 'Growth investors, expats', yield: '5-6%', supply: 'Increasing' },
  ];

  return (
    <div className="min-h-screen bg-[#0f1525] text-gray-300">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#c4a035] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg font-serif">B</span>
            </div>
            <div>
              <div className="text-white font-bold text-sm tracking-widest">PLAN B BRAZIL</div>
              <div className="text-gray-500 text-xs tracking-wider uppercase">Investment Research</div>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">Florianópolis Real Estate Prices 2026: Neighborhood Guide</h1>
          <p className="text-gray-400 text-sm">Data from FipeZap, ZAP Imóveis, and local market intelligence • Updated June 2026</p>
        </div>

        <div className="grid gap-4 my-8">
          {neighborhoods.map((n, i) => (
            <div key={i} className="bg-[#1B2951]/30 border border-white/8 rounded-lg p-5 hover:border-[#D4AF37]/30 transition-colors">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">{n.icon}</span>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg">{n.name}</h3>
                  <p className="text-gray-500 text-sm">Best for: {n.profile}</p>
                </div>
                <div className="text-right">
                  <div className="text-[#D4AF37] font-bold text-xl">{n.price}</div>
                  <div className="text-gray-500 text-xs">per m²</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div><span className="text-gray-500">Growth</span><div className="text-white font-bold">{n.growth}</div></div>
                <div><span className="text-gray-500">Rental Yield</span><div className="text-white font-bold">{n.yield}</div></div>
                <div><span className="text-gray-500">Supply</span><div className="text-white font-bold">{n.supply}</div></div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#1B2951]/50 border-l-4 border-[#D4AF37] rounded-r-lg p-6 my-8">
          <h3 className="text-[#D4AF37] font-bold mb-2">Investment Insight</h3>
          <p className="text-gray-400"><strong className="text-white">Highest growth potential:</strong> Campeche and Rio Vermelho — near the airport, new commercial development, increasing supply but still below market saturation.</p>
          <p className="text-gray-400 mt-2"><strong className="text-white">Highest rental yields:</strong> Centro (6-7%) — stable year-round demand from students, government workers, and tech employees. Less seasonal than beachfront areas.</p>
          <p className="text-gray-400 mt-2"><strong className="text-white">Safest bet:</strong> Jurerê Internacional — limited supply, established luxury market, consistent appreciation. But highest entry point.</p>
        </div>

        <div className="bg-[#1B2951]/50 border-l-4 border-[#D4AF37] rounded-r-lg p-6 my-8">
          <h3 className="text-[#D4AF37] font-bold mb-2">Want a Neighborhood Analysis?</h3>
          <p className="text-gray-400">Tell us your budget and goals — we'll recommend the 2-3 best neighborhoods with specific property examples and Plan B Investment Score™ analysis.</p>
          <p className="text-[#D4AF37] mt-2">→ <a href="https://wa.me/5548988117424" className="underline">WhatsApp: +55 48 988 11 7424</a></p>
        </div>

        <p className="text-gray-600 text-xs mt-8">Sources: FipeZap monthly indices, ZAP Imóveis active listings, local sales data. Prices are averages for beachfront and near-beach properties. Plan B Brazil · CRECI-SC 59616.</p>
      </div>
    </div>
  );
}
