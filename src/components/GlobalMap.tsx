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
    lat: -27.6,
    lng: -48.5,
    // SVG world map coords (approximate Mercator projection)
    x: 30.5,
    y: 68,
    active: true,
    url: null,
    flag: "🇧🇷",
    stats: { properties: "50+", roi: "12-18%", from: "$85K" },
    statsRu: { properties: "50+", roi: "12-18%", from: "$85K" },
    description: "Premium beachfront properties in Southern Brazil with strong rental yields and growing digital nomad demand.",
    descriptionRu: "Премиальная недвижимость на побережье Южной Бразилии с высокой арендной доходностью и растущим спросом.",
  },
  {
    id: "azores",
    name: "Azores",
    nameRu: "Азорские острова",
    region: "Atlantic Development",
    regionRu: "Атлантический девелопмент",
    lat: 37.7,
    lng: -25.7,
    x: 43.5,
    y: 35,
    active: true,
    url: "https://azores-site.vercel.app",
    flag: "🇵🇹",
    stats: { properties: "20+", roi: "8-14%", from: "$120K" },
    statsRu: { properties: "20+", roi: "8-14%", from: "$120K" },
    description: "Exclusive Atlantic island development with EU residency pathway and pristine natural environment.",
    descriptionRu: "Эксклюзивный девелопмент на Атлантических островах с путём к резидентству ЕС и нетронутой природой.",
  },
  {
    id: "costarica",
    name: "Costa Rica",
    nameRu: "Коста-Рика",
    region: "Pacific Coast",
    regionRu: "Тихоокеанское побережье",
    lat: 9.9,
    lng: -84.1,
    x: 17,
    y: 53,
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
    lat: -34.9,
    lng: -56.2,
    x: 28,
    y: 72.5,
    active: false,
    url: null,
    flag: "🇺🇾",
    stats: { properties: "—", roi: "—", from: "—" },
    statsRu: { properties: "—", roi: "—", from: "—" },
    description: "Coming soon — Stable economy, premium coastal living, and strong property rights.",
    descriptionRu: "Скоро — стабильная экономика, премиальное побережье и надёжные права собственности.",
  },
];

export default function GlobalMap() {
  const [activeCountry, setActiveCountry] = useState<string | null>(null);
  const { language } = useLanguage();
  const isRu = language === "ru";

  const handleCountryClick = (country: typeof countries[0]) => {
    if (country.url) {
      window.open(country.url, "_blank");
    } else if (country.active) {
      setActiveCountry(activeCountry === country.id ? null : country.id);
    } else {
      setActiveCountry(activeCountry === country.id ? null : country.id);
    }
  };

  return (
    <section className="relative py-24 bg-[#0a1628] overflow-hidden" id="map">
      <ScrollAnimation>
        {/* Section Header */}
        <div className="text-center mb-16 px-4">
          <h2 className="text-3xl md:text-5xl font-heading text-white mb-4">
            {isRu ? "Глобальное присутствие" : "Global Presence"}
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-6" />
          <p className="text-white/50 max-w-2xl mx-auto">
            {isRu 
              ? "Инвестиционные возможности в самых перспективных регионах Америки и Атлантики"
              : "Investment opportunities across the most promising regions of the Americas & Atlantic"
            }
          </p>
        </div>

        {/* Map Container */}
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="relative aspect-[2/1] md:aspect-[2.5/1]">
            {/* World Map SVG Background */}
            <svg
              viewBox="0 0 100 50"
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Ocean background */}
              <rect width="100" height="50" fill="#0a1628" />
              
              {/* Simplified world map continents - gold outlines */}
              <g fill="none" stroke="#D4AF37" strokeWidth="0.15" opacity="0.3">
                {/* North America */}
                <path d="M5,8 L8,6 L12,5 L18,6 L22,8 L24,12 L22,16 L20,18 L18,20 L15,22 L12,24 L10,22 L8,18 L6,14 L5,10 Z" />
                {/* Central America */}
                <path d="M12,24 L14,25 L15,27 L14,28 L12,27 Z" />
                {/* South America */}
                <path d="M22,28 L26,26 L30,28 L34,32 L36,36 L34,40 L30,44 L26,44 L22,40 L20,36 L22,32 Z" />
                {/* Europe */}
                <path d="M42,8 L44,6 L48,5 L52,6 L54,8 L52,12 L50,14 L48,12 L46,10 L44,10 Z" />
                {/* Africa */}
                <path d="M42,18 L46,16 L52,18 L56,22 L58,28 L56,34 L52,38 L48,38 L44,34 L42,28 L40,22 Z" />
                {/* British Isles */}
                <path d="M40,8 L42,7 L42,10 L40,10 Z" />
                {/* Scandinavia */}
                <path d="M46,3 L48,2 L50,4 L48,6 L46,5 Z" />
                {/* Asia */}
                <path d="M54,6 L60,4 L68,5 L76,8 L82,12 L86,16 L84,20 L78,22 L72,20 L66,18 L60,14 L56,10 Z" />
                {/* Middle East */}
                <path d="M54,14 L58,14 L60,18 L56,20 L54,18 Z" />
                {/* India */}
                <path d="M66,18 L70,18 L72,24 L68,28 L64,24 Z" />
                {/* Southeast Asia */}
                <path d="M76,18 L80,16 L84,20 L80,24 L76,22 Z" />
                {/* Australia */}
                <path d="M78,32 L86,30 L92,32 L92,38 L86,40 L80,38 Z" />
                {/* Japan */}
                <path d="M84,10 L86,8 L86,14 L84,12 Z" />
                {/* Azores approximate */}
                <circle cx="38" cy="14" r="0.5" fill="#D4AF37" opacity="0.2" />
              </g>

              {/* Grid lines */}
              <g stroke="#D4AF37" strokeWidth="0.05" opacity="0.1">
                <line x1="0" y1="25" x2="100" y2="25" />
                <line x1="50" y1="0" x2="50" y2="50" />
                {/* Tropics */}
                <line x1="0" y1="18" x2="100" y2="18" strokeDasharray="0.5,0.5" />
                <line x1="0" y1="32" x2="100" y2="32" strokeDasharray="0.5,0.5" />
              </g>

              {/* Connection lines between countries */}
              <g stroke="#D4AF37" strokeWidth="0.08" opacity="0.2" strokeDasharray="0.3,0.3">
                {/* Brazil to Azores */}
                <line x1="30.5" y1="34" x2="38" y2="17.5" />
                {/* Brazil to Costa Rica */}
                <line x1="30.5" y1="34" x2="17" y2="26.5" />
                {/* Brazil to Uruguay */}
                <line x1="30.5" y1="34" x2="28" y2="36.25" />
              </g>

              {/* Country markers */}
              {countries.map((country) => (
                <g key={country.id}>
                  {/* Pulse ring for active countries */}
                  {country.active && (
                    <>
                      <circle
                        cx={country.x}
                        cy={country.y / 2}
                        r="1.5"
                        fill="none"
                        stroke="#D4AF37"
                        strokeWidth="0.08"
                        opacity="0.4"
                      >
                        <animate
                          attributeName="r"
                          values="1;2.5;1"
                          dur="3s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="0.4;0;0.4"
                          dur="3s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    </>
                  )}
                  {/* Main dot */}
                  <circle
                    cx={country.x}
                    cy={country.y / 2}
                    r={country.active ? "0.8" : "0.6"}
                    fill={country.active ? "#D4AF37" : "#D4AF37"}
                    opacity={country.active ? 1 : 0.4}
                    className="cursor-pointer"
                    onClick={() => handleCountryClick(country)}
                    style={{ filter: country.active ? "drop-shadow(0 0 3px #D4AF37)" : "none" }}
                  />
                  {/* Glow for active */}
                  {country.active && (
                    <circle
                      cx={country.x}
                      cy={country.y / 2}
                      r="0.4"
                      fill="#fff"
                      opacity="0.6"
                    />
                  )}
                </g>
              ))}
            </svg>

            {/* Country Labels (HTML overlay) */}
            {countries.map((country) => (
              <button
                key={country.id}
                onClick={() => handleCountryClick(country)}
                className={`absolute transform -translate-x-1/2 transition-all duration-300 group ${
                  country.active ? "hover:scale-110" : "opacity-60"
                }`}
                style={{
                  left: `${country.x}%`,
                  top: `${country.y}%`,
                }}
              >
                <div className="flex flex-col items-center gap-1">
                  <span className="text-lg md:text-2xl drop-shadow-lg">{country.flag}</span>
                  <span className={`text-[10px] md:text-xs font-medium whitespace-nowrap px-2 py-0.5 rounded-full ${
                    country.active 
                      ? "bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30" 
                      : "bg-white/5 text-white/40 border border-white/10"
                  }`}>
                    {isRu ? country.nameRu : country.name}
                    {!country.active && <span className="ml-1 text-[8px] opacity-60">soon</span>}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Country Info Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-8">
            {countries.map((country) => (
              <motion.button
                key={country.id}
                onClick={() => handleCountryClick(country)}
                whileHover={country.active ? { scale: 1.02 } : {}}
                className={`relative text-left p-4 md:p-5 rounded-xl border transition-all duration-300 ${
                  activeCountry === country.id
                    ? "bg-[#D4AF37]/10 border-[#D4AF37]/50"
                    : country.active
                    ? "bg-white/5 border-white/10 hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/5"
                    : "bg-white/[0.02] border-white/5"
                }`}
              >
                {!country.active && (
                  <span className="absolute top-2 right-2 text-[8px] md:text-[10px] text-[#D4AF37]/60 border border-[#D4AF37]/30 px-1.5 py-0.5 rounded uppercase tracking-wider">
                    Soon
                  </span>
                )}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{country.flag}</span>
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
                  <p className="text-xs text-white/20 italic">
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
