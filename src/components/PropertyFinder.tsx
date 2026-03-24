'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { finderProperties, findUnits, FinderProperty, FinderUnit } from '@/data/finder-properties';

type Step = 'budget' | 'purpose' | 'bedrooms' | 'results' | 'contact';

const BUDGET_OPTIONS = [
  { value: 150000, label: '$100K – $200K', description: 'Studios & compact apartments' },
  { value: 250000, label: '$200K – $300K', description: '2-3 bedroom apartments' },
  { value: 400000, label: '$300K – $500K', description: 'Premium apartments & penthouses' },
  { value: 750000, label: '$500K+', description: 'Luxury villas & penthouses' },
];

const PURPOSE_OPTIONS = [
  { value: 'investment', label: '📈 Investment', description: 'Rental income & capital appreciation' },
  { value: 'lifestyle', label: '🏖️ Lifestyle', description: 'Personal use or second home' },
  { value: 'rental', label: '🏠 Short-term Rental', description: 'Airbnb / vacation rental income' },
  { value: 'residency', label: '🛂 Residency (RP)', description: 'Permanent residency via real estate' },
];

const BEDROOM_OPTIONS = [
  { value: 'studio', label: 'Studio', description: '30-45 m²' },
  { value: '2', label: '2 Bedrooms', description: '65-80 m²' },
  { value: '3', label: '3 Bedrooms', description: '90-100 m²' },
  { value: 'any', label: 'Any size', description: 'Show me everything' },
];

export default function PropertyFinder() {
  const [step, setStep] = useState<Step>('budget');
  const [budget, setBudget] = useState(0);
  const [purpose, setPurpose] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_bedrooms, setBedrooms] = useState('');
  const [results, setResults] = useState<{ property: FinderProperty; units: FinderUnit[] }[]>([]);
  const [contactSent, setContactSent] = useState(false);

  const handleBudget = (val: number) => {
    setBudget(val);
    setStep('purpose');
  };

  const handlePurpose = (val: string) => {
    setPurpose(val);
    setStep('bedrooms');
  };

  const handleBedrooms = (val: string) => {
    setBedrooms(val);
    // Calculate results
    const matched: { property: FinderProperty; units: FinderUnit[] }[] = [];
    for (const prop of finderProperties) {
      // Check purpose
      if (purpose && !prop.purposes.includes(purpose as 'investment' | 'lifestyle' | 'rental' | 'residency')) continue;
      // Check bedrooms
      if (val !== 'any') {
        const bedMap: Record<string, string[]> = {
          'studio': ['studio', '1bed'],
          '2': ['2bed'],
          '3': ['3bed', 'penthouse'],
        };
        const allowed = bedMap[val] || [];
        if (!prop.types.some(t => allowed.includes(t))) continue;
      }
      // Find matching units
      const minArea = val === '2' ? 65 : val === '3' ? 85 : 0;
      const units = findUnits(prop, budget * 1.3, minArea); // 30% buffer
      if (units.length > 0) {
        matched.push({ property: prop, units: units.slice(0, 5) }); // Top 5 units
      }
    }
    setResults(matched);
    setStep('results');
  };

  const goBack = () => {
    if (step === 'purpose') setStep('budget');
    else if (step === 'bedrooms') setStep('purpose');
    else if (step === 'results') setStep('bedrooms');
    else if (step === 'contact') setStep('results');
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          timeline: formData.get('timeline'),
          budget: String(budget),
          purpose,
          bedrooms: _bedrooms,
          matchedProjects: results.map(r => ({
            name: r.property.name,
            units: r.units.length,
            minPrice: r.units[0]?.priceUSD,
          })),
        }),
      });
    } catch (err) {
      console.error('Failed to send lead:', err);
    }
    
    setContactSent(true);
  };

  const stepNumber = step === 'budget' ? 1 : step === 'purpose' ? 2 : step === 'bedrooms' ? 3 : 4;

  return (
    <section id="property-finder" className="py-20 bg-gradient-to-b from-[#0a1628] to-[#1B2951]">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#D4AF37] text-sm font-medium tracking-[4px] uppercase mb-3">Property Finder</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-serif mb-4">
            Find Your Perfect Investment
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Answer 3 quick questions and get personalized property recommendations with real pricing.
          </p>
        </div>

        {/* Progress bar */}
        {step !== 'contact' && (
          <div className="flex items-center justify-center gap-2 mb-10">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  n <= stepNumber
                    ? 'bg-[#D4AF37] text-[#1B2951]'
                    : 'bg-white/10 text-gray-500'
                }`}>
                  {n < stepNumber ? '✓' : n}
                </div>
                {n < 4 && <div className={`w-12 h-0.5 ${n < stepNumber ? 'bg-[#D4AF37]' : 'bg-white/10'}`} />}
              </div>
            ))}
          </div>
        )}

        {/* Back button */}
        {step !== 'budget' && step !== 'contact' && (
          <button
            onClick={goBack}
            className="text-gray-400 hover:text-white text-sm mb-6 flex items-center gap-1 transition-colors"
          >
            ← Back
          </button>
        )}

        {/* Steps */}
        <AnimatePresence mode="wait">
          {step === 'budget' && (
            <motion.div
              key="budget"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <h3 className="text-xl text-white font-medium text-center mb-6">What&apos;s your investment budget?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {BUDGET_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => handleBudget(opt.value)}
                    className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D4AF37]/50 rounded-xl p-6 text-left transition-all group"
                  >
                    <p className="text-white font-semibold text-lg group-hover:text-[#D4AF37] transition-colors">{opt.label}</p>
                    <p className="text-gray-400 text-sm mt-1">{opt.description}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'purpose' && (
            <motion.div
              key="purpose"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <h3 className="text-xl text-white font-medium text-center mb-6">What&apos;s your primary goal?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PURPOSE_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => handlePurpose(opt.value)}
                    className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D4AF37]/50 rounded-xl p-6 text-left transition-all group"
                  >
                    <p className="text-white font-semibold text-lg group-hover:text-[#D4AF37] transition-colors">{opt.label}</p>
                    <p className="text-gray-400 text-sm mt-1">{opt.description}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'bedrooms' && (
            <motion.div
              key="bedrooms"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <h3 className="text-xl text-white font-medium text-center mb-6">Preferred unit size?</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {BEDROOM_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => handleBedrooms(opt.value)}
                    className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D4AF37]/50 rounded-xl p-5 text-center transition-all group"
                  >
                    <p className="text-white font-semibold group-hover:text-[#D4AF37] transition-colors">{opt.label}</p>
                    <p className="text-gray-500 text-xs mt-1">{opt.description}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {results.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-2xl mb-3">🔍</p>
                  <p className="text-white text-lg font-medium">No exact matches found</p>
                  <p className="text-gray-400 mt-2">
                    We may have options that fit your criteria. Leave your details and our team will prepare a personalized selection.
                  </p>
                  <button
                    onClick={() => setStep('contact')}
                    className="mt-6 bg-[#D4AF37] text-[#1B2951] font-semibold px-8 py-3 rounded-lg hover:bg-[#F7C635] transition-colors"
                  >
                    Get Personalized Selection
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  <h3 className="text-xl text-white font-medium text-center">
                    We found <span className="text-[#D4AF37]">{results.reduce((sum, r) => sum + r.units.length, 0)} units</span> across {results.length} project{results.length > 1 ? 's' : ''}
                  </h3>

                  {results.map(({ property, units }) => (
                    <div key={property.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                      {/* Project header */}
                      <div className="p-6 border-b border-white/10">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-white text-xl font-bold">{property.name}</h4>
                            <p className="text-gray-400 text-sm mt-1">📍 {property.area}, {property.location}</p>
                            <p className="text-gray-500 text-xs mt-1">{property.tagline}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[#D4AF37] font-semibold">From ${property.minPrice.toLocaleString()}</p>
                            <p className="text-gray-500 text-xs">{property.distanceBeach} from beach</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {property.highlights.slice(0, 3).map((h, i) => (
                            <span key={i} className="bg-[#D4AF37]/10 text-[#D4AF37] text-xs px-3 py-1 rounded-full">{h}</span>
                          ))}
                        </div>
                      </div>

                      {/* Units table */}
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="text-gray-400 text-xs uppercase tracking-wider">
                              <th className="text-left p-4">Type</th>
                              <th className="text-left p-4">Area</th>
                              <th className="text-left p-4">Floor</th>
                              <th className="text-left p-4">Orientation</th>
                              <th className="text-left p-4">Parking</th>
                              <th className="text-right p-4">Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {units.map(unit => (
                              <tr key={unit.id} className="border-t border-white/5 text-gray-300 hover:bg-white/5 transition-colors">
                                <td className="p-4 font-medium text-white">{unit.type}</td>
                                <td className="p-4">{unit.area} m²</td>
                                <td className="p-4">{unit.floor}{unit.floor === 1 ? 'st' : unit.floor === 2 ? 'nd' : unit.floor === 3 ? 'rd' : 'th'}</td>
                                <td className="p-4">{unit.orientation}</td>
                                <td className="p-4">{unit.parking}</td>
                                <td className="p-4 text-right font-semibold text-[#D4AF37]">${unit.priceUSD.toLocaleString()}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* CTA */}
                      <div className="p-6 border-t border-white/10 bg-white/[0.02]">
                        <p className="text-gray-400 text-sm mb-3">Want floor plans, payment schedule, and a detailed report?</p>
                        <button
                          onClick={() => setStep('contact')}
                          className="bg-[#D4AF37] text-[#1B2951] font-semibold px-6 py-2.5 rounded-lg hover:bg-[#F7C635] transition-colors text-sm"
                        >
                          Get Full Report →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {step === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-md mx-auto"
            >
              {contactSent ? (
                <div className="text-center py-12">
                  <p className="text-4xl mb-4">✅</p>
                  <h3 className="text-white text-xl font-bold mb-2">Request Received!</h3>
                  <p className="text-gray-400">Our team will prepare a personalized selection and contact you within 24 hours.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-xl text-white font-medium text-center mb-2">Get Your Personalized Report</h3>
                  <p className="text-gray-400 text-center text-sm mb-8">We&apos;ll send you a detailed report with floor plans, payment schedules, and investment analysis.</p>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <input
                      name="name"
                      type="text"
                      placeholder="Your name"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-[#D4AF37] focus:outline-none transition-colors"
                    />
                    <input
                      name="email"
                      type="email"
                      placeholder="Email address"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-[#D4AF37] focus:outline-none transition-colors"
                    />
                    <input
                      name="phone"
                      type="tel"
                      placeholder="WhatsApp / Phone (optional)"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-[#D4AF37] focus:outline-none transition-colors"
                    />
                    <select
                      name="timeline"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-gray-400 focus:border-[#D4AF37] focus:outline-none transition-colors"
                    >
                      <option value="">When are you looking to invest?</option>
                      <option value="now">Ready now</option>
                      <option value="3months">Within 3 months</option>
                      <option value="6months">Within 6 months</option>
                      <option value="exploring">Just exploring</option>
                    </select>
                    <button
                      type="submit"
                      className="w-full bg-[#D4AF37] text-[#1B2951] font-bold py-3 rounded-lg hover:bg-[#F7C635] transition-colors text-lg"
                    >
                      Send Me the Report
                    </button>
                    <p className="text-gray-600 text-xs text-center">Your data is secure. We never share contact information with third parties.</p>
                  </form>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
