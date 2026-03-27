'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const countries = [
  {
    name: 'Brazil',
    flag: '🇧🇷',
    image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    active: true,
    url: null, // stay on current site
    label: 'Santa Catarina & Florianópolis',
  },
  {
    name: 'Azores',
    flag: '🇵🇹',
    image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    active: true,
    url: 'https://azores-site.vercel.app',
    label: 'Atlantic Development',
  },
  {
    name: 'Costa Rica',
    flag: '🇨🇷',
    image: 'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    active: false,
    url: null,
    label: 'Pacific Coast',
  },
  {
    name: 'Uruguay',
    flag: '🇺🇾',
    image: 'https://images.unsplash.com/photo-1584646098378-0874589d76b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    active: false,
    url: null,
    label: 'Punta del Este & Montevideo',
  },
];

export default function CountrySelector() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Show popup only if user hasn't dismissed it this session
    const dismissed = sessionStorage.getItem('country_selected');
    if (!dismissed) {
      setShow(true);
    }
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
            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-8 md:p-12 relative"
          >
            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-block mb-4">
                <div className="w-12 h-12 gold-gradient rounded-lg flex items-center justify-center mx-auto">
                  <span className="text-white font-heading font-bold text-lg">G</span>
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-heading font-light text-gray-900 mb-2">
                Choose Your Investment Destination
              </h2>
              <p className="text-gray-500 text-sm">
                GRONIS International — Real Estate Across The Americas & Atlantic
              </p>
            </div>

            {/* Country Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {countries.map((country) => (
                <button
                  key={country.name}
                  onClick={() => country.active && handleSelect(country)}
                  className={`relative rounded-xl overflow-hidden aspect-[3/4] group transition-all duration-300 ${
                    country.active 
                      ? 'cursor-pointer hover:shadow-xl hover:scale-[1.02]' 
                      : 'cursor-default'
                  }`}
                >
                  {/* Background Image */}
                  <div
                    className={`absolute inset-0 bg-cover bg-center transition-all duration-500 ${
                      country.active ? 'group-hover:scale-110' : 'blur-[2px] grayscale-[30%]'
                    }`}
                    style={{ backgroundImage: `url("${country.image}")` }}
                  ></div>

                  {/* Overlay */}
                  <div className={`absolute inset-0 ${
                    country.active 
                      ? 'bg-gradient-to-t from-black/70 via-black/20 to-transparent' 
                      : 'bg-gradient-to-t from-black/80 via-black/40 to-black/20'
                  }`}></div>

                  {/* Coming Soon Badge */}
                  {!country.active && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase shadow-lg">
                        Coming Soon
                      </span>
                    </div>
                  )}

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="text-3xl mb-2 block">{country.flag}</span>
                    <h3 className="text-white font-heading text-lg font-light">{country.name}</h3>
                    <p className={`text-xs mt-1 ${country.active ? 'text-white/70' : 'text-white/50'}`}>
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
