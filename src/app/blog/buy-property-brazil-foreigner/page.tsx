import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to Buy Property in Brazil as a Foreigner (2026 Guide) — Plan B Brazil',
  description: 'Complete step-by-step guide for foreigners buying real estate in Brazil. CPF, legal requirements, taxes, payment process, and what to avoid.',
  keywords: 'buy property Brazil foreigner, Brazilian real estate investment, CPF for foreigners, Brazil property laws',
};

export default function GuidePage() {
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
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
            How to Buy Property in Brazil as a Foreigner
          </h1>
          <p className="text-gray-400 text-sm">Complete 2026 Guide • Updated June 2026 • 12 min read</p>
        </div>

        <div className="prose prose-invert max-w-none">
          <h2 className="text-xl font-serif font-bold text-white mt-8 mb-4">Short Answer</h2>
          <p>Yes, foreigners can buy property in Brazil with the same rights as Brazilian citizens. You need a <strong>CPF</strong> (Brazilian tax ID), which can be obtained at any Brazilian consulate. No residency visa is required. The entire process typically takes 2-6 weeks from property selection to registration.</p>

          <h2 className="text-xl font-serif font-bold text-white mt-8 mb-4">Step 1: Obtain Your CPF</h2>
          <p>The CPF (Cadastro de Pessoas Físicas) is your Brazilian tax identification number. It's required for every financial transaction in Brazil, including property purchases.</p>
          <h3 className="text-lg font-bold text-[#D4AF37] mt-6 mb-2">How to get it:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>At a Brazilian consulate:</strong> Bring your passport. Cost: ~$20-30 USD. Processing: 1-5 business days.</li>
            <li><strong>Through a representative in Brazil:</strong> Authorize a Brazilian lawyer or agent to obtain it on your behalf at the Receita Federal.</li>
          </ul>
          <p className="text-gray-500 text-sm mt-2"><em>Source: Receita Federal do Brasil. Processing times may vary by consulate.</em></p>

          <h2 className="text-xl font-serif font-bold text-white mt-8 mb-4">Step 2: Find a Brazilian Lawyer</h2>
          <p>While not legally required, hiring a Brazilian lawyer experienced in real estate transactions with foreign clients is essential. Verify their <strong>OAB registration</strong> (Brazilian Bar Association).</p>
          <p>Your lawyer will:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Verify property title at the Cartório de Registro de Imóveis</li>
            <li>Check for liens, disputes, or encumbrances</li>
            <li>Review the purchase agreement (Contrato de Compra e Venda)</li>
            <li>Ensure the developer has proper SPE registration (for pre-construction)</li>
          </ul>

          <h2 className="text-xl font-serif font-bold text-white mt-8 mb-4">Step 3: Choose Your Property</h2>
          <p>Brazil offers two main purchase types:</p>
          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="bg-[#1B2951]/40 border border-white/8 rounded-lg p-4">
              <h4 className="text-white font-bold mb-2">Completed Property</h4>
              <p className="text-sm">Move in immediately. Due diligence takes 2-4 weeks. Register at Cartório for full ownership.</p>
            </div>
            <div className="bg-[#1B2951]/40 border border-white/8 rounded-lg p-4">
              <h4 className="text-white font-bold mb-2">Pre-Construction</h4>
              <p className="text-sm">Lower entry price. 20-30% down, 24-48 monthly installments. Delivery in 24-36 months. Verify developer track record.</p>
            </div>
          </div>

          <h2 className="text-xl font-serif font-bold text-white mt-8 mb-4">Step 4: Transfer Funds</h2>
          <p>Money must be transferred through an official <strong>foreign exchange contract</strong> (contrato de câmbio) at a bank or licensed FX broker. The transfer is registered with the Central Bank of Brazil.</p>
          <p className="text-yellow-500/80 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 mt-2"><strong>Tip:</strong> Specialized FX brokers typically offer better rates than traditional banks. Expect to pay 1-2% spread on the exchange rate.</p>

          <h2 className="text-xl font-serif font-bold text-white mt-8 mb-4">Step 5: Pay Taxes & Register</h2>
          <h3 className="text-lg font-bold text-[#D4AF37] mt-4 mb-2">Purchase Taxes:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>ITBI</strong> (Transfer Tax): 2-3% of property value (varies by municipality)</li>
            <li><strong>Registration fees</strong>: 1-2% at the Cartório de Registro de Imóveis</li>
            <li><strong>Legal fees</strong>: 1-2% of property value</li>
          </ul>
          <p className="text-sm text-gray-500 mt-2"><em>Budget 5-8% above the property price for all taxes and fees combined.</em></p>

          <h2 className="text-xl font-serif font-bold text-white mt-8 mb-4">Common Mistakes to Avoid</h2>
          <ol className="list-decimal pl-6 space-y-3">
            <li><strong>Buying without a CPF</strong> — impossible to register ownership</li>
            <li><strong>Skipping legal review</strong> — title issues, developer problems, contract traps</li>
            <li><strong>Paying cash without a câmbio contract</strong> — unregistered transfers complicate future sales</li>
            <li><strong>Trusting "guaranteed return" promises</strong> — no legitimate investment guarantees returns in Brazilian real estate</li>
            <li><strong>Not budgeting for taxes</strong> — the 5-8% above purchase price catches many buyers off guard</li>
          </ol>

          <h2 className="text-xl font-serif font-bold text-white mt-8 mb-4">Timeline Summary</h2>
          <div className="bg-[#1B2951]/40 border border-white/8 rounded-lg p-6 my-6">
            <div className="space-y-3">
              <div className="flex justify-between"><span className="text-gray-400">CPF Application</span><span className="text-white font-bold">1-5 days</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Property Search</span><span className="text-white font-bold">1-4 weeks</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Due Diligence</span><span className="text-white font-bold">1-2 weeks</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Contract & Payment</span><span className="text-white font-bold">1 week</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Registration</span><span className="text-white font-bold">1-2 weeks</span></div>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10">
              <div className="flex justify-between"><span className="text-[#D4AF37] font-bold">Total</span><span className="text-[#D4AF37] font-bold">4-12 weeks</span></div>
            </div>
          </div>

          <div className="bg-[#1B2951]/50 border-l-4 border-[#D4AF37] rounded-r-lg p-6 my-8">
            <h3 className="text-[#D4AF37] font-bold mb-2">Need Help?</h3>
            <p className="text-gray-400 mb-4">Plan B Brazil provides independent investment advisory for foreign buyers. We don't sell property or earn commissions — our only obligation is to you.</p>
            <p className="text-[#D4AF37]">→ WhatsApp: +55 48 988 11 7424 · <a href="https://planbbrazil.com" className="underline">planbbrazil.com</a></p>
          </div>

          <p className="text-gray-600 text-xs mt-8">Disclaimer: This guide is for informational purposes only and does not constitute legal or financial advice. Consult a qualified Brazilian lawyer and accountant before making any investment decision. Plan B Brazil · CRECI-SC 59616 · Florianópolis, Santa Catarina.</p>
        </div>
      </div>
    </div>
  );
}
