import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog & Research — Santa Catarina Real Estate Insights | Plan B Brazil',
  description: 'Guides and analysis for foreign investors: neighborhood pricing, taxes, residency, and market comparisons for Santa Catarina, Brazil.',
};

const posts = [
  {
    slug: 'florianopolis-neighborhoods',
    title: 'Florianópolis Real Estate Prices 2026: Neighborhood by Neighborhood',
    description: 'Complete price guide for every neighborhood in Florianópolis — Jurerê, Lagoa, Campeche, Ingleses and more.',
  },
  {
    slug: 'sc-vs-algarve',
    title: 'Santa Catarina vs Algarve vs Costa del Sol — Where to Invest in 2026',
    description: 'Data-driven comparison of three top coastal real estate markets: prices, growth, safety, and rental yields.',
  },
  {
    slug: 'brazil-property-taxes',
    title: 'Brazil Property Taxes Explained: ITBI, IPTU, Capital Gains (2026)',
    description: 'Complete guide to Brazilian property taxes for foreign investors.',
  },
  {
    slug: 'buy-property-brazil-foreigner',
    title: 'How to Buy Property in Brazil as a Foreigner (2026 Guide)',
    description: 'Complete step-by-step guide for foreigners buying real estate in Brazil.',
  },
  {
    slug: 'investor-visa',
    title: 'Brazil Investor Visa Requirements 2026: Complete Guide',
    description: 'How to get Brazilian residency through real estate investment — minimum investment, process, documents, timeline.',
  },
];

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-[#0f1525] text-gray-300">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#c4a035] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg font-serif">B</span>
            </div>
            <div>
              <div className="text-white font-bold text-sm tracking-widest">PLAN B BRAZIL</div>
              <div className="text-gray-500 text-xs tracking-wider uppercase">Investment Research</div>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">Blog</h1>
          <p className="text-gray-400 text-sm">
            Guides and market analysis for foreign investors in Santa Catarina, Brazil.
          </p>
        </div>

        <div className="grid gap-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block bg-[#1B2951]/30 border border-white/8 rounded-lg p-6 hover:border-[#D4AF37]/30 transition-colors"
            >
              <h2 className="text-white font-bold text-lg mb-2">{post.title}</h2>
              <p className="text-gray-500 text-sm">{post.description}</p>
            </Link>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <Link href="/research/all" className="text-[#D4AF37] hover:underline text-sm">
            View all research reports →
          </Link>
        </div>
      </div>
    </div>
  );
}
