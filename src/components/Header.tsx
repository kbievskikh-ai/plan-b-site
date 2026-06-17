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
    { label: t('nav.research'), href: "#research", section: 'section_research' },
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
              <span className="text-white font-heading font-bold text-lg">B</span>
            </div>
            <div>
              <span className="text-white font-heading text-xl tracking-wide">Plan B</span>
              <span className="block text-gold-400 text-[10px] tracking-[0.2em] uppercase">
                Investment Advisory
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

            {/* Social Icons */}
            <div className="flex items-center gap-3 ml-2 border-l border-white/10 pl-3">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-gold-400 transition-colors" aria-label="LinkedIn">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/kbievskikh/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-gold-400 transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a href="https://t.me/+_rolsmvxwIs0ODMy" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-gold-400 transition-colors" aria-label="Telegram">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
            </div>

            <motion.a
              href="https://wa.me/5548988117424" target="_blank" rel="noopener noreferrer"
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
                  href="https://wa.me/5548988117424" target="_blank" rel="noopener noreferrer"
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
