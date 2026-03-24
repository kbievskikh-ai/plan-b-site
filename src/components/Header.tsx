"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { useSettings } from "@/lib/settings";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { show } = useSettings();

  const allNavItems = [
    { label: t('nav.properties'), href: "#properties", section: 'section_featured_properties' },
    { label: t('nav.regions'), href: "#regions", section: 'section_map' },
    { label: t('nav.whyBrazil'), href: "#investment", section: 'section_why_brazil' },
    { label: t('nav.about'), href: "#about", section: 'section_about' },
    { label: t('nav.caseStudies'), href: "#case-studies", section: 'section_case_studies' },
    { label: t('nav.faq'), href: "#faq", section: 'section_faq' },
  ];

  const navItems = allNavItems.filter(item => show(item.section));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [langOpen, setLangOpen] = useState(false);
  const languages: { code: 'en' | 'ru' | 'pt'; flag: string; label: string }[] = [
    { code: 'en', flag: '🇬🇧', label: 'EN' },
    { code: 'ru', flag: '🇷🇺', label: 'RU' },
    { code: 'pt', flag: '🇧🇷', label: 'PT' },
  ];
  const currentLang = languages.find(l => l.code === language) || languages[0];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy-900 backdrop-blur-md border-b border-white/5 shadow-lg"
          : "bg-navy-900/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 gold-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-heading font-bold text-lg">G</span>
            </div>
            <div>
              <span className="text-white font-heading text-xl tracking-wide">GRONIS</span>
              <span className="block text-gold-400 text-[10px] tracking-[0.3em] uppercase">
                International Real Estate
              </span>
            </div>
          </motion.a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="text-white/70 hover:text-gold-400 text-sm tracking-wider uppercase transition-colors duration-300 relative group"
                whileHover={{ y: -2 }}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold-400 group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
            
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 px-3 py-1.5 border border-white/20 rounded text-white/70 hover:text-gold-400 hover:border-gold-400/50 text-sm tracking-wider uppercase transition-all duration-300"
              >
                <span className="text-base">{currentLang.flag}</span>
                <span>{currentLang.label}</span>
                <svg className={`w-3 h-3 ml-1 transition-transform ${langOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {langOpen && (
                <div className="absolute top-full mt-1 right-0 bg-navy-900 border border-white/10 rounded shadow-lg overflow-hidden z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                      className={`flex items-center gap-2 w-full px-4 py-2 text-sm transition-colors ${
                        language === lang.code
                          ? 'bg-gold-500/20 text-gold-400'
                          : 'text-white/70 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <motion.a
              href="https://t.me/Gronis_Leads_bot" target="_blank" rel="noopener noreferrer"
              className="btn-gold ml-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('nav.getConsultation')}
            </motion.a>
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-3">
            {/* Mobile Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 px-2 py-1 border border-white/20 rounded text-white/70 hover:text-gold-400 text-xs tracking-wider uppercase transition-colors"
              >
                <span>{currentLang.flag}</span>
                <span>{currentLang.label}</span>
              </button>
              {langOpen && (
                <div className="absolute top-full mt-1 right-0 bg-navy-900 border border-white/10 rounded shadow-lg overflow-hidden z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                      className={`flex items-center gap-2 w-full px-3 py-1.5 text-xs transition-colors ${
                        language === lang.code
                          ? 'bg-gold-500/20 text-gold-400'
                          : 'text-white/70 hover:bg-white/10'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white/80 hover:text-gold-400 relative w-10 h-10 flex items-center justify-center"
            >
              <motion.div
                animate={menuOpen ? { rotate: 180 } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                {menuOpen ? (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </motion.div>
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="pb-6 border-t border-white/5 pt-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="block py-3 text-white/70 hover:text-gold-400 text-sm tracking-wider uppercase"
                  >
                    {item.label}
                  </motion.a>
                ))}
                <motion.a
                  href="https://t.me/Gronis_Leads_bot" target="_blank" rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                  className="btn-gold inline-block mt-4"
                >
                  {t('nav.getConsultation')}
                </motion.a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
