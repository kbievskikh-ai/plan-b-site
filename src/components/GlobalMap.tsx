"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ScrollAnimation from "./ScrollAnimation";
import { useLanguage } from "@/lib/i18n";

const countries = [
  {
    id: "brazil",
    name: "Brazil",
    nameRu: "Бразилия",
    region: "Santa Catarina & Florianópolis",
    regionRu: "Санта-Катарина и Флорианополис",
    // Position on the map image (percentage from top-left)
    x: 32,
    y: 65,
    active: true,
    url: null,
    flag: "🇧🇷",
    stats: { properties: "50+", roi: "12-18%", from: "$85K" },
    statsRu: { properties: "50+", roi: "12-18%", from: "$85K" },
    description: "Premium beachfront properties in Southern Brazil with strong rental yields.",
    descriptionRu: "Премиальная недвижимость на побережье Южной Бразилии с высокой доходностью.",
  },
  {
    id: "azores",
    name: "Azores",
    nameRu: "Азорские острова",
    region: "Atlantic Development",
    regionRu: "Атлантический девелопмент",
    x: 42,
    y: 30,
    active: false,
    url: null,
    flag: "🇵🇹",
    stats: { properties: "20+", roi: "8-14%", from: "$120K" },
    statsRu: { properties: "20+", roi: "8-14%", from: "$120K" },
    description: "Exclusive Atlantic island development with EU residency pathway.",
    descriptionRu: "Эксклюзивный девелопмент на Атлантических островах с путём к резидентству ЕС.",
  },
  {
    id: "costarica",
    name: "Costa Rica",
    nameRu: "Коста-Рика",
    region: "Pacific Coast",
    regionRu: "Тихоокеанское побережье",
    x: 18,
    y: 48,
    active: false,
    url: null,
    flag: "🇨🇷",
    stats: { properties: "—", roi: "—", from: "—" },
    statsRu: { properties: "—", roi: "—", from: "—" },
    description: "Coming soon — Pacific coast luxury villas and eco-developments.",
    descriptionRu: "Скоро — люксовые виллы и эко-проекты на тихоокеанском побережье.",
  },
  {
    id: "uruguay",
    name: "Uruguay",
    nameRu: "Уругвай",
    region: "Punta del Este & Montevideo",
    regionRu: "Пунта-дель-Эсте и Монтевидео",
    x: 30,
    y: 76,
    active: false,
    url: null,
    flag: "🇺🇾",
    stats: { properties: "—", roi: "—", from: "—" },
    statsRu: { properties: "—", roi: "—", from: "—" },
    description: "Coming soon — Stable economy, premium coastal living.",
    descriptionRu: "Скоро — стабильная экономика, премиальное побережье.",
  },
];

export default function GlobalMap() {
  const [activeCountry, setActiveCountry] = useState<string | null>(null);
  const { language } = useLanguage();
  const isRu = language === "ru";

  const handleCountryClick = (country: typeof countries[0]) => {
    if (country.url) {
      window.open(country.url, "_blank");
    } else {
      setActiveCountry(activeCountry === country.id ? null : country.id);
    }
  };

  return (
    <section className="relative py-20 md:py-28 bg-[#0F1B2D] overflow-hidden" id="map">
      <ScrollAnimation>
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 px-4">
          <h2 className="text-3xl md:text-5xl font-heading text-white mb-4">
            {isRu ? "Глобальное присутствие" : "Global Presence"}
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-6" />
          <p className="text-white/50 max-w-2xl mx-auto text-sm md:text-base">
            {isRu 
              ? "Инвестиционные возможности в самых перспективных регионах Америки и Атлантики"
              : "Investment opportunities across the most promising regions of the Americas & Atlantic"
            }
          </p>
        </div>

        {/* Map Container */}
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="relative">
            {/* World Map Image */}
            <img
              src="/images/world-map-gold.png"
              alt="World map"
              className="w-full h-auto opacity-90"
              draggable={false}
            />
            
            {/* Connection lines (SVG overlay) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {/* Brazil to Azores */}
              <line x1="32" y1="65" x2="42" y2="30" stroke="#D4AF37" strokeWidth="0.15" strokeDasharray="0.8,0.5" opacity="0.3" />
              {/* Brazil to Costa Rica */}
              <line x1="32" y1="65" x2="18" y2="48" stroke="#D4AF37" strokeWidth="0.15" strokeDasharray="0.8,0.5" opacity="0.3" />
              {/* Brazil to Uruguay */}
              <line x1="32" y1="65" x2="30" y2="76" stroke="#D4AF37" strokeWidth="0.15" strokeDasharray="0.8,0.5" opacity="0.3" />
            </svg>

            {/* Country Markers (HTML overlay) */}
            {countries.map((country) => (
              <button
                key={country.id}
                onClick={() => handleCountryClick(country)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group z-10 ${
                  country.active ? "hover:scale-110" : "opacity-70 hover:opacity-90"
                }`}
                style={{
                  left: `${country.x}%`,
                  top: `${country.y}%`,
                }}
              >
                {/* Pulse ring */}
                {country.active && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="absolute w-8 h-8 md:w-12 md:h-12 rounded-full bg-[#D4AF37]/20 animate-ping" />
                  </span>
                )}
                
                {/* Marker */}
                <div className="relative flex flex-col items-center gap-0.5 md:gap-1">
                  {/* Dot */}
                  <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full border-2 ${
                    country.active 
                      ? "bg-[#D4AF37] border-[#E5C76B] shadow-[0_0_12px_rgba(212,175,55,0.6)]" 
                      : "bg-[#D4AF37]/40 border-[#D4AF37]/30"
                  }`} />
                  
                  {/* Label */}
                  <span className={`text-[8px] md:text-[11px] font-medium whitespace-nowrap px-1.5 md:px-2 py-0.5 rounded-full backdrop-blur-sm ${
                    country.active 
                      ? "bg-[#0F1B2D]/80 text-[#D4AF37] border border-[#D4AF37]/40" 
                      : "bg-[#0F1B2D]/60 text-white/40 border border-white/10"
                  }`}>
                    {isRu ? country.nameRu : country.name}
                    {!country.active && <span className="ml-1 text-[7px] md:text-[9px] opacity-50 italic">soon</span>}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Country Info Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-8 md:mt-12">
            {countries.map((country) => (
              <motion.button
                key={country.id}
                onClick={() => handleCountryClick(country)}
                whileHover={country.active ? { scale: 1.02, y: -2 } : {}}
                whileTap={country.active ? { scale: 0.98 } : {}}
                className={`relative text-left p-4 md:p-5 rounded-xl border transition-all duration-300 ${
                  activeCountry === country.id
                    ? "bg-[#D4AF37]/10 border-[#D4AF37]/50 shadow-lg shadow-[#D4AF37]/5"
                    : country.active
                    ? "bg-white/[0.03] border-white/10 hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/5"
                    : "bg-white/[0.02] border-white/5"
                }`}
              >
                {!country.active && (
                  <span className="absolute top-2 right-2 text-[8px] md:text-[10px] text-[#D4AF37]/60 border border-[#D4AF37]/30 px-1.5 py-0.5 rounded uppercase tracking-wider">
                    Soon
                  </span>
                )}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl md:text-2xl">{country.flag}</span>
                  <div>
                    <h3 className={`text-sm md:text-base font-heading ${country.active ? "text-white" : "text-white/40"}`}>
                      {isRu ? country.nameRu : country.name}
                    </h3>
                    <p className={`text-[10px] md:text-xs ${country.active ? "text-white/50" : "text-white/20"}`}>
                      {isRu ? country.regionRu : country.region}
                    </p>
                  </div>
                </div>
                
                {country.active ? (
                  <div className="grid grid-cols-3 gap-3 md:gap-4 mt-1">
                    <div>
                      <p className="text-[9px] md:text-[10px] text-white/40 mb-0.5">{isRu ? "Объекты" : "Properties"}</p>
                      <p className="text-xs md:text-sm text-[#D4AF37] font-medium">{isRu ? country.statsRu.properties : country.stats.properties}</p>
                    </div>
                    <div>
                      <p className="text-[9px] md:text-[10px] text-white/40 mb-0.5">ROI</p>
                      <p className="text-xs md:text-sm text-[#D4AF37] font-medium">{isRu ? country.statsRu.roi : country.stats.roi}</p>
                    </div>
                    <div>
                      <p className="text-[9px] md:text-[10px] text-white/40 mb-0.5">{isRu ? "От" : "From"}</p>
                      <p className="text-xs md:text-sm text-[#D4AF37] font-medium">{isRu ? country.statsRu.from : country.stats.from}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-[10px] md:text-xs text-white/20 italic leading-relaxed">
                    {isRu ? country.descriptionRu : country.description}
                  </p>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </ScrollAnimation>
    </section>
  );
}
