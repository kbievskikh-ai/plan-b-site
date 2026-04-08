'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ────────── Data ──────────
const DEVELOPERS = [
  { id: 'terraviva', name: 'TerraViva Inc.', flag: '🇧🇷', country: 'Brazil', projects: 3, avatar: 'https://flagcdn.com/w80/br.png' },
  { id: 'azure', name: 'Azure Coast', flag: '🇵🇹', country: 'Portugal', projects: 2, avatar: 'https://flagcdn.com/w80/pt.png' },
  { id: 'siam', name: 'Siam Prime Development', flag: '🇹🇭', country: 'Thailand', projects: 2 },
  { id: 'costarica', name: 'Pura Vida Living', flag: '🇨🇷', country: 'Costa Rica', projects: 1 },
];

const PROJECTS: { id: string; title: string; developer: string; price: string; priceUsd: string; location: string; type: string; roi: string; units: number; stage: string; delivery: string; description: string; validators: { legal: boolean; tax: boolean; appraiser: boolean }; images: string[] }[] = [
  { id: 'terra1', title: 'Terrá Jurerê', developer: 'terraviva', price: 'R$ 2.1M', priceUsd: '$410K', location: 'Jurerê, Florianópolis', type: 'Luxury Apartments', roi: '10.5%', units: 48, stage: 'Under Construction', delivery: 'Q4 2027',
    description: 'Premium apartments in Jurerê — the most exclusive neighborhood in Florianópolis. 2–3 bedrooms, pool, sea view.',
    validators: { legal: true, tax: true, appraiser: true },
    images: ['🏖️'] },
  { id: 'terra2', title: 'CB Towers Residence', developer: 'terraviva', price: 'R$ 1.4M', priceUsd: '$275K', location: 'Canasvieiras, Floripa', type: 'High-Rise Apartments', roi: '9.2%', units: 120, stage: 'Foundation', delivery: 'Q2 2028',
    description: 'Modern towers with full infrastructure: gym, pool, coworking. Walking distance to the beach.',
    validators: { legal: true, tax: true, appraiser: false },
    images: ['🏢'] },
  { id: 'terra3', title: 'Vista Mar Suites', developer: 'terraviva', price: 'R$ 890K', priceUsd: '$175K', location: 'Campeche, Floripa', type: 'Studios & 1BR', roi: '11.8%', units: 80, stage: 'Pre-Launch', delivery: 'Q1 2029',
    description: 'Affordable studios in the fastest-growing area of Floripa. High Airbnb demand.',
    validators: { legal: true, tax: false, appraiser: false },
    images: ['🌊'] },
  { id: 'azure1', title: 'Algarve Oceanview', developer: 'azure', price: '€650K', priceUsd: '$705K', location: 'Lagos, Algarve', type: 'Luxury Villas', roi: '7.5%', units: 24, stage: 'Under Construction', delivery: 'Q3 2027',
    description: 'Clifftop villas with panoramic ocean views. Golden Visa eligible.',
    validators: { legal: true, tax: true, appraiser: true },
    images: ['🌅'] },
  { id: 'azure2', title: 'Lisbon Heritage', developer: 'azure', price: '€420K', priceUsd: '$455K', location: 'Chiado, Lisbon', type: 'Renovated Apartments', roi: '6.8%', units: 16, stage: 'Renovation', delivery: 'Q1 2027',
    description: 'Historic building renovation in the heart of Lisbon. High tourist demand.',
    validators: { legal: true, tax: false, appraiser: true },
    images: ['🏰'] },
  { id: 'siam1', title: 'Phuket Marina Residences', developer: 'siam', price: '฿18M', priceUsd: '$520K', location: 'Phuket, Thailand', type: 'Seafront Apartments', roi: '8.5%', units: 60, stage: 'Under Construction', delivery: 'Q4 2027',
    description: 'Marina-front apartments with yacht access. Freehold for foreigners.',
    validators: { legal: true, tax: true, appraiser: true },
    images: ['⛵'] },
  { id: 'siam2', title: 'Bangkok Sky Garden', developer: 'siam', price: '฿8.5M', priceUsd: '$245K', location: 'Sathorn, Bangkok', type: 'High-End Condos', roi: '9.1%', units: 200, stage: 'Topping Out', delivery: 'Q2 2027',
    description: 'CBD location with BTS access. Infinity pool on the 50th floor.',
    validators: { legal: false, tax: true, appraiser: true },
    images: ['🌃'] },
  { id: 'cr1', title: 'Montaña Wellness Retreat', developer: 'costarica', price: '$380K', priceUsd: '$380K', location: 'Manuel Antonio', type: 'Eco-Lodge', roi: '12.3%', units: 15, stage: 'Under Construction', delivery: 'Q1 2028',
    description: 'Eco-luxury lodges surrounded by rainforest. Near Manuel Antonio National Park.',
    validators: { legal: true, tax: true, appraiser: false },
    images: ['🌿'] },
];

const EXPERTS = [
  { name: 'Dr. Carlos Mendez', role: 'Real Estate Lawyer', country: 'Brazil 🇧🇷', rating: 4.9, reviews: 127, specialties: ['Property Law', 'Immigration', 'Due Diligence'], verified: true },
  { name: 'Ana Rodrigues', role: 'Tax Advisor', country: 'Portugal 🇵🇹', rating: 4.8, reviews: 89, specialties: ['Golden Visa Tax', 'NHR', 'International Tax'], verified: true },
  { name: 'Somchai Patel', role: 'Property Appraiser', country: 'Thailand 🇹🇭', rating: 4.7, reviews: 64, specialties: ['Valuation', 'Market Analysis', 'ROI'], verified: true },
  { name: 'Maria Silva', role: 'Immigration Consultant', country: 'Brazil 🇧🇷', rating: 5.0, reviews: 203, specialties: ['VIPER Visa', 'Citizenship', 'Documentation'], verified: true },
  { name: 'James Cooper', role: 'Independent Valuer', country: 'UK 🇬🇧', rating: 4.6, reviews: 41, specialties: ['Valuation', 'Risk Assessment'], verified: true },
  { name: 'Lucas Fernández', role: 'Tax Attorney', country: 'Costa Rica 🇨🇷', rating: 4.8, reviews: 55, specialties: ['Corporate Tax', 'Residency'], verified: true },
];

// ────────── Component ──────────
export default function PlatformClient() {
  const [selectedDev, setSelectedDev] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);
  const [showExperts, setShowExperts] = useState(false);

  const filteredProjects = selectedDev ? PROJECTS.filter(p => p.developer === selectedDev) : PROJECTS;

  const devName = (id: string) => {
    const d = DEVELOPERS.find(x => x.id === id);
    return d ? d.name : id;
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      {/* Nav */}
      <nav className="border-b border-white/5 bg-[#0a0e1a]/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#D4AF37] flex items-center justify-center text-[#1B2951] font-bold text-xl font-serif">G</div>
            <div>
              <div className="font-bold text-lg">GRONIS Platform</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest">Verified Real Estate</div>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <button onClick={() => { setSelectedDev(null); setShowExperts(false); setSelectedProject(null); }}
              className={`transition ${!showExperts && !selectedProject ? 'text-[#D4AF37]' : 'text-gray-400 hover:text-white'}`}>Properties</button>
            <button onClick={() => { setShowExperts(true); setSelectedProject(null); }}
              className={`transition ${showExperts ? 'text-[#D4AF37]' : 'text-gray-400 hover:text-white'}`}>Experts</button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {/* ── PROJECT DETAIL ── */}
          {selectedProject ? (
            <motion.div key="detail" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
              <button onClick={() => setSelectedProject(null)} className="text-gray-400 hover:text-white transition text-sm mb-6">← Back to all properties</button>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  {/* Hero Image */}
                  <div className="bg-gradient-to-br from-navy-700 to-navy-950 rounded-2xl h-80 flex items-center justify-center text-6xl">
                    {selectedProject.images[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-[#D4AF37]/20 text-[#D4AF37] px-3 py-1 rounded-full text-xs font-medium">{devName(selectedProject.developer)}</span>
                      <span className="text-gray-500 text-sm">{selectedProject.location}</span>
                    </div>
                    <h1 className="text-3xl font-bold font-serif">{selectedProject.title}</h1>
                    <p className="text-gray-400 mt-3 text-sm leading-relaxed">{selectedProject.description}</p>
                  </div>

                  {/* Validators */}
                  <div className="bg-navy-800/50 rounded-2xl p-6 border border-white/5">
                    <h3 className="font-bold text-lg mb-4">🔍 Expert Validation</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { label: 'Legal Review', ok: selectedProject.validators.legal, expert: 'Dr. Carlos Mendez' },
                        { label: 'Tax Analysis', ok: selectedProject.validators.tax, expert: 'Ana Rodrigues' },
                        { label: 'Appraisal & ROI', ok: selectedProject.validators.appraiser, expert: 'Somchai Patel' },
                      ].map((v) => (
                        <div key={v.label} className={`p-4 rounded-xl border ${v.ok ? 'border-green-500/30 bg-green-500/5' : 'border-yellow-500/30 bg-yellow-500/5'}`}>
                          <div className="text-2xl mb-2">{v.ok ? '✅' : '⏳'}</div>
                          <div className="text-sm font-medium">{v.label}</div>
                          <div className="text-xs text-gray-400 mt-1">{v.ok ? `By ${v.expert}` : 'In progress'}</div>
                        </div>
                      ))}
                    </div>
                    {selectedProject.validators.legal && selectedProject.validators.tax && selectedProject.validators.appraiser && (
                      <div className="mt-4 p-3 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-xl text-center">
                        <span className="text-[#D4AF37] font-bold">🏆 Fully Validated — All checks passed</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right sidebar */}
                <div className="space-y-6">
                  <div className="bg-navy-800/50 rounded-2xl p-6 border border-white/5 space-y-4">
                    <h3 className="font-bold text-lg">📊 Investment Details</h3>
                    {[
                      ['Price', `${selectedProject.price} (${selectedProject.priceUsd})`],
                      ['Type', selectedProject.type],
                      ['Units', `${selectedProject.units}`],
                      ['Est. ROI', `${selectedProject.roi}`],
                      ['Stage', selectedProject.stage],
                      ['Delivery', selectedProject.delivery],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between text-sm">
                        <span className="text-gray-400">{k}</span><span className="font-medium">{v}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <a href="https://wa.me/5548988117424" target="_blank" rel="noopener noreferrer"
                    className="block w-full bg-[#D4AF37] hover:bg-[#c9963c] text-[#1B2951] font-bold text-center py-4 rounded-xl transition text-lg">
                    💬 Request Due Diligence
                  </a>
                  <a href="https://wa.me/5548988117424" target="_blank" rel="noopener noreferrer"
                    className="block w-full bg-navy-700 hover:bg-navy-600 text-white font-medium text-center py-3 rounded-xl transition">
                    📞 Consult an Expert
                  </a>
                </div>
              </div>
            </motion.div>
          ) : showExperts ? (
            /* ── EXPERTS ── */
            <motion.div key="experts" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-3xl font-bold font-serif mb-2">👥 Expert Network</h2>
              <p className="text-gray-400 mb-8">Independent specialists who validate every listing on the platform.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {EXPERTS.map((e, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                    className="bg-navy-800/50 rounded-2xl p-6 border border-white/5 hover:border-[#D4AF37]/30 transition">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#1B2951] flex items-center justify-center text-xl font-serif font-bold text-white">
                        {e.name[0]}
                      </div>
                      <div>
                        <div className="font-bold text-sm">{e.name}</div>
                        <div className="text-xs text-[#D4AF37]">{e.role}</div>
                        <div className="text-[11px] text-gray-500">{e.country}</div>
                      </div>
                    </div>
                    {e.verified && <div className="text-[10px] text-green-400 mb-2">✅ Verified Expert</div>}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-yellow-400 text-sm">★ {e.rating}</span>
                      <span className="text-gray-500 text-xs">({e.reviews} reviews)</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {e.specialties.map(s => (
                        <span key={s} className="text-[10px] bg-navy-900 px-2 py-1 rounded-full text-gray-400">{s}</span>
                      ))}
                    </div>
                    <a href="https://wa.me/5548988117424" target="_blank" rel="noopener noreferrer"
                      className="block w-full bg-navy-700 hover:bg-navy-600 text-center py-2 rounded-lg transition text-sm text-[#D4AF37] mt-4">
                      Book Consultation →
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            /* ── MAIN LISTINGS ── */
            <motion.div key="listings" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="mb-8">
                <h1 className="text-4xl font-bold font-serif mb-2">Global Real Estate <span className="text-[#D4AF37]">Marketplace</span></h1>
                <p className="text-gray-400 max-w-2xl">Verified properties from top developers worldwide. Every listing validated by independent legal, tax, and valuation experts.</p>
              </div>

              {/* Developer filter */}
              <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
                <button onClick={() => setSelectedDev(null)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                    !selectedDev ? 'bg-[#D4AF37] text-[#1B2951]' : 'bg-navy-800 text-gray-400 hover:text-white'
                  }`}>All Developers</button>
                {DEVELOPERS.map(d => (
                  <button key={d.id} onClick={() => setSelectedDev(d.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                      selectedDev === d.id ? 'bg-[#D4AF37] text-[#1B2951]' : 'bg-navy-800 text-gray-400 hover:text-white'
                    }`}>{d.flag} {d.name}</button>
                ))}
              </div>

              {/* Stats bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Projects', val: '8', icon: '🏗️' },
                  { label: 'Developers', val: '4', icon: '🏢' },
                  { label: 'Countries', val: '4', icon: '🌍' },
                  { label: 'Validations', val: '18', icon: '✅' },
                ].map(s => (
                  <div key={s.label} className="bg-navy-800/50 border border-white/5 rounded-xl p-4 text-center">
                    <div className="text-2xl mb-1">{s.icon}</div>
                    <div className="text-2xl font-bold text-[#D4AF37]">{s.val}</div>
                    <div className="text-xs text-gray-500">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProjects.map((p, i) => {
                  const totalChecks = 3;
                  const passedChecks = [p.validators.legal, p.validators.tax, p.validators.appraiser].filter(Boolean).length;
                  const isFullyValidated = passedChecks === totalChecks;

                  return (
                    <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                      onClick={() => setSelectedProject(p)}
                      className="bg-navy-800/50 rounded-2xl border border-white/5 hover:border-[#D4AF37]/30 transition cursor-pointer overflow-hidden group">
                      {/* Image area */}
                      <div className="h-40 bg-gradient-to-br from-navy-700 to-navy-950 flex items-center justify-center text-4xl group-hover:scale-105 transition-transform duration-300">
                        {p.images[0]}
                      </div>
                      {/* Content */}
                      <div className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-gray-500">{p.location}</span>
                          {isFullyValidated && <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">✓ Verified</span>}
                        </div>
                        <h3 className="font-bold text-sm">{p.title}</h3>
                        <div className="flex items-baseline gap-2">
                          <span className="text-[#D4AF37] font-bold">{p.priceUsd}</span>
                          <span className="text-gray-500 text-xs">({p.price})</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400">ROI: <span className="text-green-400 font-medium">{p.roi}</span></span>
                          <span className="text-gray-500">{p.units} units</span>
                        </div>
                        {/* Validation progress */}
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <span className={`text-xs ${p.validators.legal ? 'text-green-400' : 'text-yellow-500'}`}>{p.validators.legal ? '⚖️' : '⏳'}</span>
                            <span className={`text-xs ${p.validators.tax ? 'text-green-400' : 'text-yellow-500'}`}>{p.validators.tax ? '💰' : '⏳'}</span>
                            <span className={`text-xs ${p.validators.appraiser ? 'text-green-400' : 'text-yellow-500'}`}>{p.validators.appraiser ? '📊' : '⏳'}</span>
                          </div>
                          <span className="text-[10px] text-gray-500">{passedChecks}/{totalChecks}</span>
                        </div>
                        <div className="text-[10px] text-gray-500">by {devName(p.developer)}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
