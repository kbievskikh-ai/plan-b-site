import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Brazil Investor Visa Requirements 2026: Complete Guide — Plan B Brazil',
  description: 'How to get Brazilian residency through real estate investment. R$ 700K minimum investment, step-by-step process, required documents, timeline.',
};

export default function Page() {
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
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">Brazil Investor Visa Through Real Estate (2026)</h1>
          <p className="text-gray-400 text-sm">Lei 13.445/2017 • RN 102/2023 • Updated June 2026</p>
        </div>

        <div className="bg-[#1B2951]/40 border border-[#D4AF37]/30 rounded-lg p-6 mb-8">
          <h3 className="text-[#D4AF37] font-bold mb-2">Quick Summary</h3>
          <p>Foreigners can obtain Brazilian residency by investing R$ 700,000+ in real estate (R$ 1,000,000+ in the South/Northeast regions). This leads to permanent residency after 4 years. The investment must be in residential or commercial property.</p>
          <p className="text-gray-500 text-sm mt-2">Source: Lei 13.445/2017 (Migration Law), Norma Resolutória 102/2023 (Conselho Nacional de Imigração)</p>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-serif font-bold text-white mb-4">Investment Thresholds</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#1B2951]/30 rounded-lg p-4">
                <div className="text-[#D4AF37] text-2xl font-bold mb-1">R$ 700K</div>
                <div className="text-gray-400 text-sm">Minimum investment — North & Northeast regions (including Santa Catarina)</div>
              </div>
              <div className="bg-[#1B2951]/30 rounded-lg p-4">
                <div className="text-[#D4AF37] text-2xl font-bold mb-1">R$ 1M</div>
                <div className="text-gray-400 text-sm">Minimum investment — South & Southeast regions (São Paulo, Rio de Janeiro)</div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-white mb-4">Step-by-Step Process</h2>
            <div className="space-y-4">
              {[
                { step: '1', title: 'Obtain CPF', desc: 'Get your Brazilian tax ID at a consulate or through a representative. Required for all transactions.' },
                { step: '2', title: 'Purchase Property', desc: 'Buy property meeting the minimum threshold. Keep all documentation — purchase agreement, câmbio contract, registration.' },
                { step: '3', title: 'Register Investment', desc: 'Register the foreign capital investment with the Central Bank (RDE-IED). Your lawyer handles this.' },
                { step: '4', title: 'Apply for Residency Visa', desc: 'Submit application to the Federal Police with property documentation, CPF, proof of investment, and clean criminal record.' },
                { step: '5', title: 'Receive Temporary Residency', desc: 'Valid for 2 years, renewable. After 4 years, apply for permanent residency.' },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 bg-[#1B2951]/20 rounded-lg p-4">
                  <div className="w-8 h-8 bg-[#D4AF37] text-[#0f1525] rounded-full flex items-center justify-center font-bold flex-shrink-0">{item.step}</div>
                  <div>
                    <h4 className="text-white font-bold">{item.title}</h4>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-white mb-4">Required Documents</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Valid passport (all pages)</li>
              <li>CPF number</li>
              <li>Property registration (Matrícula) from Cartório</li>
              <li>Proof of investment value (purchase agreement + câmbio contract)</li>
              <li>Clean criminal record from country of origin (apostilled)</li>
              <li>Proof of health insurance</li>
              <li>Federal Police application form</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-white mb-4">Timeline</h2>
            <div className="bg-[#1B2951]/30 rounded-lg p-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm"><span className="text-gray-400">Property purchase</span><span className="text-white">4-12 weeks</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-400">RDE-IED registration</span><span className="text-white">1-2 weeks</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-400">Federal Police processing</span><span className="text-white">2-4 months</span></div>
                <div className="flex justify-between text-sm border-t border-white/10 pt-2"><span className="text-[#D4AF37]">Total to temporary residency</span><span className="text-[#D4AF37] font-bold">3-6 months</span></div>
                <div className="flex justify-between text-sm pt-1"><span className="text-[#D4AF37]">To permanent residency</span><span className="text-[#D4AF37] font-bold">4 years</span></div>
              </div>
            </div>
          </section>

          <div className="bg-[#1B2951]/50 border-l-4 border-[#D4AF37] rounded-r-lg p-6">
            <h3 className="text-[#D4AF37] font-bold mb-2">Santa Catarina Advantage</h3>
            <p className="text-gray-400">Santa Catarina falls under the R$ 700K threshold (not R$ 1M), making it one of the most cost-effective states for investor visa eligibility. Combined with the state's high quality of life and strong rental market, it's an attractive option for residency-seeking investors.</p>
          </div>

          <p className="text-gray-600 text-xs mt-8">Disclaimer: This guide is for informational purposes only. Immigration laws may change. Consult a qualified Brazilian immigration lawyer. Plan B Brazil · CRECI-SC 59616.</p>
        </div>
      </div>
    </div>
  );
}
