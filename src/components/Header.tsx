"use client";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy-900/95 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <div className="w-10 h-10 gold-gradient rounded-sm flex items-center justify-center">
              <span className="text-white font-heading font-bold text-lg">M</span>
            </div>
            <div>
              <span className="text-white font-heading text-xl tracking-wide">MIGRONIS</span>
              <span className="block text-gold-400 text-[10px] tracking-[0.3em] uppercase">
                Real Estate Brazil
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {["Properties", "Regions", "Investment", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-white/70 hover:text-gold-400 text-sm tracking-wider uppercase transition-colors duration-300"
              >
                {item}
              </a>
            ))}
            <a href="#contact" className="btn-gold ml-4">
              Get Consultation
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white/80 hover:text-gold-400"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <nav className="md:hidden pb-6 border-t border-white/5 pt-4">
            {["Properties", "Regions", "Investment", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="block py-3 text-white/70 hover:text-gold-400 text-sm tracking-wider uppercase"
              >
                {item}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
