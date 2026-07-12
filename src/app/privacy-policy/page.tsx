import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Plan B Brazil',
  description: 'How Plan B Brazil collects, uses, and protects your personal data.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0f1525] text-gray-300">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#c4a035] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg font-serif">B</span>
            </div>
            <div>
              <div className="text-white font-bold text-sm tracking-widest">PLAN B BRAZIL</div>
              <div className="text-gray-500 text-xs tracking-wider uppercase">Legal</div>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-gray-500 text-sm">Last updated: 2026</p>
        </div>

        <div className="space-y-8 text-sm leading-relaxed">
          <section>
            <h2 className="text-white font-bold text-lg mb-3">1. Who We Are</h2>
            <p>
              Plan B Brazil is a real estate advisory brand operated by Konstantin Bievskikh,
              a licensed real estate professional in Santa Catarina, Brazil (CRECI-SC 59616-F).
              This policy explains how we collect, use, and protect information submitted through
              planbbrazil.com.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">2. Information We Collect</h2>
            <p>
              When you use our contact forms, calculators, or request a consultation, we may collect:
              your name, email address, phone number (including WhatsApp), and details you choose to
              share about your investment interests. We also collect standard analytics data (pages
              visited, device type, approximate location) via tools such as Google Analytics.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">3. How We Use Your Information</h2>
            <p>
              We use the information you provide to respond to inquiries, prepare investment
              analysis, send requested reports or guides, and — where you have opted in — share
              relevant market updates. We do not sell your personal data to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">4. Data Sharing</h2>
            <p>
              We may share information with service providers strictly necessary to operate this
              site and our advisory services (e.g. hosting, email delivery, CRM, analytics), each
              bound to protect your data. We do not share your data with unrelated third parties for
              their own marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">5. Your Rights</h2>
            <p>
              Under Brazil&apos;s LGPD (Lei Geral de Proteção de Dados) and applicable international
              regulations, you may request access to, correction of, or deletion of your personal
              data at any time by contacting us at the email below.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">6. Cookies</h2>
            <p>
              This site uses cookies and similar technologies for essential functionality and
              analytics. You can control cookie preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">7. Contact</h2>
            <p>
              For any privacy-related questions or requests, contact us at{' '}
              <a href="mailto:kbievskikh@planbbrazil.com" className="text-[#D4AF37] hover:underline">
                kbievskikh@planbbrazil.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
