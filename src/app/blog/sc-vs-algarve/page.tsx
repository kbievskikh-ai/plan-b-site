import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Santa Catarina vs Algarve vs Costa del Sol — Where to Invest in 2026 — Plan B Brazil',
  description: 'Data-driven comparison of three top coastal real estate markets. Prices, growth, safety, rental yields, and residency options.',
};

export default function Page() {
  const data = [
    { metric: 'Avg. Price/m² (beachfront)', floripa: 'R$ 8,000 (~$1,500)', algarve: '€ 5,000 (~$5,400)', costa: '€ 4,500 (~$4,860)', winner: 'Santa Catarina' },
    { metric: 'Entry (1BR near beach)', floripa: 'R$ 500K (~$94K)', algarve: '€ 250K (~$270K)', costa: '€ 200K (~$216K)', winner: 'Santa Catarina' },
    { metric: '5-Year Price Growth', floripa: '+45%', algarve: '+35%', costa: '+40%', winner: 'Santa Catarina' },
    { metric: 'Safety Index', floripa: 'High (lowest in Brazil)', algarve: 'Very High', costa: 'High', winner: 'Algarve' },
    { metric: 'Rental Yield (annual)', floripa: '5-7%', algarve: '4-6%', costa: '4-5%', winner: 'Santa Catarina' },
    { metric: 'Residency via Investment', floripa: 'Yes (R$ 700K)', algarve: 'Golden Visa (€ 500K)', costa: 'No', winner: 'Santa Catarina / Algarve' },
    { metric: 'Currency Advantage', floripa: 'BRL undervalued vs USD/EUR', algarve: 'Euro — no currency advantage', costa: 'Euro — no currency advantage', winner: 'Santa Catarina' },
  ];

  return (
    <div className="min-h-screen bg-[#0f1525] text-gray-300">
      <div className="max-w-3xl mx-auto px-6 py-16">
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
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">Santa Catarina vs Algarve vs Costa del Sol</h1>
          <p className="text-gray-400 text-sm">Data-Driven Comparison • June 2026 • 8 min read</p>
        </div>

        <p className="text-lg text-gray-400 mb-8 border-l-2 border-[#D4AF37] pl-4">Three world-class coastal destinations. Very different price points, growth trajectories, and investment profiles. Here's the data.</p>

        <div className="overflow-x-auto my-8">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#1B2951]">
                <th className="text-[#D4AF37] p-3 text-left font-bold uppercase text-xs tracking-wider">Metric</th>
                <th className="text-[#D4AF37] p-3 text-left font-bold uppercase text-xs tracking-wider">Santa Catarina</th>
                <th className="text-[#D4AF37] p-3 text-left font-bold uppercase text-xs tracking-wider">Algarve (PT)</th>
                <th className="text-[#D4AF37] p-3 text-left font-bold uppercase text-xs tracking-wider">Costa del Sol (ES)</th>
                <th className="text-[#D4AF37] p-3 text-left font-bold uppercase text-xs tracking-wider">Winner</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i} className="border-b border-white/5">
                  <td className="p-3 text-white font-medium">{row.metric}</td>
                  <td className="p-3">{row.floripa}</td>
                  <td className="p-3">{row.algarve}</td>
                  <td className="p-3">{row.costa}</td>
                  <td className="p-3 text-[#D4AF37] font-bold">{row.winner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-6">
          <div className="bg-[#1B2951]/30 rounded-lg p-6">
            <h3 className="text-white font-bold mb-3">Price Advantage</h3>
            <p className="text-gray-400">Florianópolis premium beachfront property costs approximately <strong className="text-white">72% less than Algarve</strong> and <strong className="text-white">69% less than Costa del Sol</strong>. For investors seeking coastal lifestyle diversification, Santa Catarina offers the lowest entry point among major international beach destinations.</p>
          </div>

          <div className="bg-[#1B2951]/30 rounded-lg p-6">
            <h3 className="text-white font-bold mb-3">Growth Trajectory</h3>
            <p className="text-gray-400">Santa Catarina's 5-year price growth of <strong className="text-[#D4AF37]">+45%</strong> outpaces both Algarve (+35%) and Costa del Sol (+40%). The state's market is earlier-stage than European destinations — meaning higher growth potential as the market matures.</p>
          </div>

          <div className="bg-[#1B2951]/30 rounded-lg p-6">
            <h3 className="text-white font-bold mb-3">Currency Factor</h3>
            <p className="text-gray-400">The Brazilian Real has been relatively weak against the USD and EUR, creating a <strong className="text-[#D4AF37]">temporary currency window</strong> for foreign buyers. This advantage can be erased if the BRL strengthens — timing matters.</p>
          </div>

          <div className="bg-[#1B2951]/30 rounded-lg p-6">
            <h3 className="text-white font-bold mb-3">The Trade-Off</h3>
            <p className="text-gray-400">Algarve and Costa del Sol offer more mature infrastructure, established expat communities, and EU legal frameworks. Santa Catarina offers higher growth, lower prices, and currency advantage — but with higher uncertainty and less efficient price discovery. That's exactly why independent advisory adds value.</p>
          </div>

          <div className="bg-[#1B2951]/50 border-l-4 border-[#D4AF37] rounded-r-lg p-6">
            <h3 className="text-[#D4AF37] font-bold mb-2">Bottom Line</h3>
            <p className="text-gray-400">If you prioritize <strong className="text-white">safety, maturity, and EU access</strong> → Algarve or Costa del Sol. If you prioritize <strong className="text-white">growth potential, entry price, and currency advantage</strong> → Santa Catarina, Brazil. Many investors diversify across both.</p>
            <p className="text-[#D4AF37] mt-3">→ Get a free Plan B Investment Score™ analysis: <a href="https://wa.me/5548988117424" className="underline">WhatsApp</a></p>
          </div>
        </div>

        <p className="text-gray-600 text-xs mt-8">Sources: FipeZap (SC), Idealista (PT/ES), IBGE. Prices converted at June 2026 exchange rates (BRL/USD 5.3, EUR/USD 1.08). Plan B Brazil · CRECI-SC 59616.</p>
      </div>
    </div>
  );
}
