import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Brazil Property Taxes Explained: ITBI, IPTU, Capital Gains (2026) — Plan B Brazil',
  description: 'Complete guide to Brazilian property taxes for foreign investors. ITBI, IPTU, capital gains, rental income tax, and double taxation treaties.',
};

export default function Page() {
  const taxes = [
    { name: 'ITBI', fullName: 'Imposto sobre Transmissão de Bens Imóveis', when: 'On purchase', rate: '2-3%', base: 'Property value or municipal assessment (whichever is higher)', paidBy: 'Buyer' },
    { name: 'IPTU', fullName: 'Imposto sobre a Propriedade Predial e Territorial Urbana', when: 'Annual', rate: '0.5-1.5%', base: 'Municipal property assessment (Venal Value)', paidBy: 'Property owner' },
    { name: 'Capital Gains', fullName: 'Ganho de Capital', when: 'On sale', rate: '15%', base: 'Profit (sale price minus purchase price and documented improvements)', paidBy: 'Seller' },
    { name: 'Rental Income Tax', fullName: 'Imposto de Renda sobre Aluguéis', when: 'Monthly/Annual', rate: '15-27.5%', base: 'Rental income (progressive scale)', paidBy: 'Property owner' },
    { name: 'Registration Fee', fullName: 'Emolumentos de Cartório', when: 'On purchase', rate: '1-2%', base: 'Property value', paidBy: 'Buyer' },
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
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">Brazil Property Taxes: Complete Guide for Foreign Investors</h1>
          <p className="text-gray-400 text-sm">Updated June 2026 • 8 min read</p>
        </div>

        <div className="bg-[#1B2951]/40 border border-[#D4AF37]/30 rounded-lg p-6 mb-8">
          <h3 className="text-[#D4AF37] font-bold mb-2">Key Numbers</h3>
          <p>Budget <strong className="text-white">5-8% above the property price</strong> for purchase taxes and fees. Then expect <strong className="text-white">0.5-1.5% annually</strong> for IPTU. On sale, <strong className="text-white">15% capital gains tax</strong> applies to profit.</p>
        </div>

        <h2 className="text-xl font-serif font-bold text-white mb-4">All Property Taxes at a Glance</h2>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#1B2951]">
                <th className="text-[#D4AF37] p-3 text-left font-bold uppercase text-xs">Tax</th>
                <th className="text-[#D4AF37] p-3 text-left font-bold uppercase text-xs">When</th>
                <th className="text-[#D4AF37] p-3 text-left font-bold uppercase text-xs">Rate</th>
                <th className="text-[#D4AF37] p-3 text-left font-bold uppercase text-xs">Paid By</th>
              </tr>
            </thead>
            <tbody>
              {taxes.map((t, i) => (
                <tr key={i} className="border-b border-white/5">
                  <td className="p-3"><span className="text-white font-bold">{t.name}</span><br/><span className="text-gray-500 text-xs">{t.fullName}</span></td>
                  <td className="p-3">{t.when}</td>
                  <td className="p-3 text-[#D4AF37] font-bold">{t.rate}</td>
                  <td className="p-3">{t.paidBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-serif font-bold text-white mb-3">ITBI — Property Transfer Tax</h2>
            <p className="text-gray-400">Paid once at purchase. Rate varies by municipality: Florianópolis charges 3%, Balneário Camboriú 2%, Itapema 2%. Based on the higher of purchase price or municipal assessment value.</p>
          </div>

          <div>
            <h2 className="text-xl font-serif font-bold text-white mb-3">IPTU — Annual Property Tax</h2>
            <p className="text-gray-400">Similar to property tax/council tax in other countries. Based on municipal assessment (Valor Venal), which is typically below market value. In Florianópolis, rates range from 0.5% (residential) to 1.5% (commercial). Paid annually, often with a discount for early payment.</p>
          </div>

          <div>
            <h2 className="text-xl font-serif font-bold text-white mb-3">Capital Gains Tax</h2>
            <p className="text-gray-400">15% flat rate on profit (sale price minus purchase price and documented improvements). <strong className="text-[#D4AF37]">Exemption:</strong> If the property is your only Brazilian residential property and valued under R$ 440K, gains may be exempt. Non-residents must appoint a Brazilian representative to handle tax obligations.</p>
          </div>

          <div>
            <h2 className="text-xl font-serif font-bold text-white mb-3">Rental Income Tax</h2>
            <p className="text-gray-400">Progressive rates: 15% on income up to R$ 2,667/month, rising to 27.5% above R$ 5,333/month. Property management fees and condo fees are deductible. Non-residents pay through a Brazilian representative.</p>
          </div>

          <div className="bg-[#1B2951]/50 border-l-4 border-[#D4AF37] rounded-r-lg p-6">
            <h3 className="text-[#D4AF37] font-bold mb-2">Double Taxation Treaties</h3>
            <p className="text-gray-400">Brazil has tax treaties with 30+ countries to avoid double taxation on rental income and capital gains. Check if your country has a treaty with Brazil — it could significantly reduce your tax burden.</p>
          </div>

          <div>
            <h2 className="text-xl font-serif font-bold text-white mb-3">Real Example: R$ 650K Property in Florianópolis</h2>
            <div className="bg-[#1B2951]/30 rounded-lg p-6 space-y-2">
              <div className="flex justify-between text-sm"><span className="text-gray-400">Purchase price</span><span className="text-white">R$ 650,000</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-400">ITBI (3%)</span><span className="text-white">R$ 19,500</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-400">Registration (~1.5%)</span><span className="text-white">R$ 9,750</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-400">Legal fees (~1.5%)</span><span className="text-white">R$ 9,750</span></div>
              <div className="flex justify-between text-sm border-t border-white/10 pt-2"><span className="text-[#D4AF37] font-bold">Total additional costs</span><span className="text-[#D4AF37] font-bold">R$ 39,000 (6.0%)</span></div>
              <div className="flex justify-between text-sm pt-1"><span className="text-gray-400">Annual IPTU (est.)</span><span className="text-white">R$ 2,600-3,900/yr</span></div>
            </div>
          </div>

          <div className="bg-[#1B2951]/50 border-l-4 border-[#D4AF37] rounded-r-lg p-6">
            <h3 className="text-[#D4AF37] font-bold mb-2">Need a Tax Estimate for Your Property?</h3>
            <p className="text-gray-400">Send us the property details — we'll calculate estimated ITBI, IPTU, and total acquisition costs within 24 hours.</p>
            <p className="text-[#D4AF37] mt-2">→ <a href="https://wa.me/5548988117424" className="underline">WhatsApp: +55 48 988 11 7424</a></p>
          </div>
        </div>

        <p className="text-gray-600 text-xs mt-8">Disclaimer: Tax rates and regulations may change. This guide is for informational purposes only. Consult a qualified Brazilian accountant (contador) for your specific situation. Plan B Brazil · CRECI-SC 59616.</p>
      </div>
    </div>
  );
}
