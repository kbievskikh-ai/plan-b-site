'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const countries = [
  {
    name: 'Brazil',
    flag: '🇧🇷',
    image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=70',
    active: true,
    url: null,
    label: 'Santa Catarina &\nFlorianópolis',
  },
  {
    name: 'Chile',
    flag: '🇨🇱',
    image: 'https://images.unsplash.com/photo-1555993539-1732b0258235?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=550&q=70',
    active: false,
    url: null,
    label: 'Santiago &\nCentral Valley',
  },
  {
    name: 'Argentina',
    flag: '🇦🇷',
    image: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=70',
    active: false,
    url: null,
    label: 'Buenos Aires &\nPatagonia',
  },
  {
    name: 'Uruguay',
    flag: '🇺🇾',
    image: 'https://images.unsplash.com/photo-1584646098378-0874589d76b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=70',
    active: false,
    url: null,
    label: 'Punta del Este &\nMontevideo',
  },
];

export default function CountrySelector() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('country_selected');
    if (dismissed) return;
    // Defer mounting past the initial paint window. This modal previously
    // mounted immediately on hydration and eagerly loaded 4 external
    // Unsplash background-images at browser-forced "High" fetch priority
    // (CSS background-image always loads eager/high-priority regardless of
    // visibility), starving the critical hero H1/fonts/CSS of bandwidth and
    // becoming an unpredictable competing LCP candidate itself. A short
    // delay lets the real above-the-fold content paint first.
    const timer = window.setTimeout(() => setShow(true), 600);
    return () => window.clearTimeout(timer);
  }, []);

  const handleSelect = (country: typeof countries[0]) => {
    sessionStorage.setItem('country_selected', 'true');
    setShow(false);
    if (country.url) {
      window.open(country.url, '_blank');
    }
  };

  const handleDismiss = () => {
    sessionStorage.setItem('country_selected', 'true');
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-6 md:p-10 relative"
          >
            {/* Close button */}
            <button
              onClick={handleDismiss}
              aria-label="Close"
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-block mb-3">
                <div className="w-11 h-11 gold-gradient rounded-lg flex items-center justify-center mx-auto">
                  <span className="text-white font-heading font-bold text-lg">B</span>
                </div>
              </div>
              <h2 className="text-xl md:text-2xl font-heading font-light text-gray-900 mb-1">
                Choose Your Investment Destination
              </h2>
              <p className="text-gray-500 text-xs">
                Plan B Brazil — Real Estate Across The Americas & Atlantic
              </p>
            </div>

            {/* Country Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {countries.map((country) => (
                <button
                  key={country.name}
                  onClick={() => country.active && handleSelect(country)}
                  className={`relative rounded-xl overflow-hidden aspect-[3/4] group transition-all duration-300 border border-[#D4AF37]/40 ${
                    country.active
                      ? 'cursor-pointer hover:shadow-xl hover:scale-[1.02] hover:border-[#D4AF37]'
                      : 'cursor-default'
                  }`}
                >
                  {/* Background Image — plain <img> (not CSS background-image) so
                      the browser can apply loading="lazy" + fetchpriority="low";
                      CSS background-images are always fetched eagerly at high
                      priority regardless of visibility, which made this modal's
                      4 external Unsplash requests compete with the critical
                      hero content for bandwidth. */}
                  <img
                    src={country.image}
                    alt={country.name}
                    loading="lazy"
                    decoding="async"
                    // @ts-expect-error fetchPriority is a valid DOM attribute, not yet in React's img typings
                    fetchpriority="low"
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                      country.active ? 'group-hover:scale-110' : 'blur-[3px] grayscale-[40%]'
                    }`}
                  />

                  {/* Overlay — darker at bottom for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Coming Soon — top-right corner */}
                  {!country.active && (
                    <div className="absolute top-2.5 right-2.5 z-10">
                      <span className="bg-black/50 backdrop-blur-sm text-[#D4AF37] border border-[#D4AF37]/70 px-2.5 py-1 rounded-md text-[10px] font-semibold tracking-wider uppercase">
                        Coming Soon
                      </span>
                    </div>
                  )}

                  {/* Content — FIXED positions from bottom */}
                  {/* Flag: always 70px from bottom */}
                  <div className="absolute left-0 right-0 bottom-[70px] flex justify-center">
                    <span className="text-3xl drop-shadow-lg">{country.flag}</span>
                  </div>

                  {/* Name: always 42px from bottom */}
                  <div className="absolute left-0 right-0 bottom-[42px] text-center">
                    <h3 className="text-white font-heading text-sm md:text-base font-light drop-shadow-md">{country.name}</h3>
                  </div>

                  {/* Label: always 12px from bottom, fixed 2-line height */}
                  <div className="absolute left-2 right-2 bottom-[10px] text-center h-[28px] flex items-start justify-center">
                    <p className="text-white/60 text-[9px] md:text-[11px] leading-tight whitespace-pre-line">
                      {country.label}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
