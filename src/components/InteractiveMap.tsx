"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { regions } from "@/data/properties";
import ScrollAnimation from "./ScrollAnimation";

interface RegionInfo {
  name: string;
  properties: number;
  desc: string;
  lat: number;
  lng: number;
}

// Custom SVG map of Santa Catarina coast
function SantaCatarinaMap({ 
  activeRegion, 
  onRegionHover, 
  onRegionClick 
}: { 
  activeRegion: string | null;
  onRegionHover: (name: string | null) => void;
  onRegionClick: (name: string) => void;
}) {
  // Simplified coordinates for visualization (relative positions on the SVG)
  const regionPositions: Record<string, { x: number; y: number }> = {
    "Balneário Camboriú": { x: 320, y: 80 },
    "Itapema": { x: 300, y: 120 },
    "Porto Belo": { x: 280, y: 155 },
    "Bombinhas": { x: 310, y: 175 },
    "Florianópolis": { x: 340, y: 260 },
    "Imbituba": { x: 300, y: 360 },
    "Rancho Queimado": { x: 200, y: 280 },
  };

  return (
    <svg viewBox="0 0 400 450" className="w-full h-full">
      {/* Background gradient */}
      <defs>
        <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0a0e1a" />
          <stop offset="50%" stopColor="#141f35" />
          <stop offset="100%" stopColor="#0a0e1a" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Ocean */}
      <rect width="400" height="450" fill="url(#mapGradient)" />

      {/* Stylized coastline */}
      <path
        d="M380 30 Q350 60 360 100 Q370 140 355 180 Q340 220 350 260 Q360 300 345 340 Q330 380 340 420 L400 420 L400 30 Z"
        fill="#0f1929"
        stroke="#c9963c"
        strokeWidth="1"
        opacity="0.3"
      />

      {/* Coastline detail */}
      <path
        d="M380 30 Q350 60 360 100 Q370 140 355 180 Q340 220 350 260 Q360 300 345 340 Q330 380 340 420"
        fill="none"
        stroke="#c9963c"
        strokeWidth="2"
        strokeDasharray="8 4"
        opacity="0.5"
      />

      {/* Land mass shape */}
      <path
        d="M50 20 L300 20 Q340 60 330 100 Q350 150 320 200 Q340 250 310 300 Q330 350 290 400 L50 400 Z"
        fill="#0f1929"
        stroke="#c9963c"
        strokeWidth="0.5"
        opacity="0.2"
      />

      {/* Connection lines between regions */}
      {Object.entries(regionPositions).map(([name, pos], index, arr) => {
        if (index === arr.length - 1) return null;
        const nextName = Object.keys(regionPositions)[index + 1];
        if (nextName === "Rancho Queimado") return null;
        const nextPos = regionPositions[nextName];
        return (
          <line
            key={`line-${name}`}
            x1={pos.x}
            y1={pos.y}
            x2={nextPos.x}
            y2={nextPos.y}
            stroke="#c9963c"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.2"
          />
        );
      })}

      {/* Region markers */}
      {Object.entries(regionPositions).map(([name, pos]) => {
        const isActive = activeRegion === name;
        const region = regions.find(r => r.name === name);
        
        return (
          <g
            key={name}
            transform={`translate(${pos.x}, ${pos.y})`}
            className="cursor-pointer"
            onMouseEnter={() => onRegionHover(name)}
            onMouseLeave={() => onRegionHover(null)}
            onClick={() => onRegionClick(name)}
          >
            {/* Pulse animation for active */}
            {isActive && (
              <>
                <circle r="20" fill="#c9963c" opacity="0.2">
                  <animate attributeName="r" from="8" to="25" dur="1.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.4" to="0" dur="1.5s" repeatCount="indefinite" />
                </circle>
              </>
            )}
            
            {/* Outer glow */}
            <circle
              r={isActive ? 12 : 8}
              fill="#c9963c"
              opacity={isActive ? 0.3 : 0.15}
              style={{ transition: "all 0.3s ease" }}
            />
            
            {/* Inner dot */}
            <circle
              r={isActive ? 6 : 4}
              fill="#c9963c"
              filter={isActive ? "url(#glow)" : undefined}
              style={{ transition: "all 0.3s ease" }}
            />

            {/* Label */}
            <text
              x="15"
              y="4"
              fill={isActive ? "#c9963c" : "#ffffff"}
              fontSize="11"
              fontWeight={isActive ? "600" : "400"}
              opacity={isActive ? 1 : 0.6}
              style={{ transition: "all 0.3s ease" }}
            >
              {name}
            </text>

            {/* Property count badge */}
            {region && isActive && (
              <g transform="translate(15, 15)">
                <rect x="0" y="0" width="60" height="18" fill="#c9963c" rx="2" />
                <text x="30" y="13" fill="white" fontSize="10" textAnchor="middle">
                  {region.properties} properties
                </text>
              </g>
            )}
          </g>
        );
      })}

      {/* Map labels */}
      <text x="20" y="430" fill="white" opacity="0.15" fontSize="12" letterSpacing="2">
        SANTA CATARINA, BRAZIL
      </text>
      
      {/* Compass */}
      <g transform="translate(50, 50)">
        <circle r="20" fill="none" stroke="#c9963c" strokeWidth="0.5" opacity="0.3" />
        <text x="0" y="-8" fill="#c9963c" fontSize="10" textAnchor="middle" opacity="0.5">N</text>
        <line x1="0" y1="-5" x2="0" y2="5" stroke="#c9963c" strokeWidth="1" opacity="0.3" />
        <line x1="-5" y1="0" x2="5" y2="0" stroke="#c9963c" strokeWidth="1" opacity="0.3" />
      </g>
    </svg>
  );
}

export default function InteractiveMap() {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<RegionInfo | null>(null);

  const handleRegionClick = (name: string) => {
    const region = regions.find(r => r.name === name);
    if (region) {
      setSelectedRegion(region);
    }
  };

  const scrollToProperties = () => {
    const element = document.getElementById('properties');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="regions" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <ScrollAnimation className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-gold-500" />
            <span className="text-gold-500 text-sm tracking-[0.3em] uppercase">Explore</span>
            <div className="w-8 h-[1px] bg-gold-500" />
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-navy-900 mb-4">
            Regions of Santa Catarina
          </h2>
          <p className="text-navy-900/50 max-w-2xl mx-auto text-lg">
            Seven distinct destinations, each offering unique lifestyle and investment opportunities.
          </p>
        </ScrollAnimation>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Map */}
          <ScrollAnimation className="lg:col-span-3 relative aspect-[4/3] bg-navy-900 rounded-sm overflow-hidden" direction="left">
            <SantaCatarinaMap
              activeRegion={activeRegion}
              onRegionHover={setActiveRegion}
              onRegionClick={handleRegionClick}
            />
            
            {/* Selected region overlay */}
            <AnimatePresence>
              {selectedRegion && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-4 left-4 right-4 bg-white p-4 shadow-xl"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-heading text-xl text-navy-900 mb-1">
                        {selectedRegion.name}
                      </h3>
                      <p className="text-navy-900/50 text-sm mb-3">{selectedRegion.desc}</p>
                      <div className="flex gap-4">
                        <span className="text-gold-500 font-medium">
                          {selectedRegion.properties} properties available
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedRegion(null)}
                      className="text-navy-900/30 hover:text-navy-900 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <button
                    onClick={scrollToProperties}
                    className="btn-gold w-full text-center mt-4"
                  >
                    View Properties in {selectedRegion.name}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </ScrollAnimation>

          {/* Region list */}
          <div className="lg:col-span-2 space-y-2">
            {regions.map((region, index) => (
              <ScrollAnimation key={region.name} delay={index * 0.05} direction="right">
                <motion.div
                  className={`group cursor-pointer p-4 border transition-all duration-300 ${
                    activeRegion === region.name
                      ? "border-gold-500/50 bg-gold-400/10"
                      : "border-navy-900/5 hover:border-gold-500/30 hover:bg-gold-400/5"
                  }`}
                  onMouseEnter={() => setActiveRegion(region.name)}
                  onMouseLeave={() => setActiveRegion(null)}
                  onClick={() => handleRegionClick(region.name)}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`font-heading text-lg transition-colors ${
                      activeRegion === region.name ? "text-gold-600" : "text-navy-900 group-hover:text-gold-600"
                    }`}>
                      {region.name}
                    </h3>
                    <span className="text-gold-500 text-sm font-medium">{region.properties}</span>
                  </div>
                  <p className="text-navy-900/40 text-sm">{region.desc}</p>
                </motion.div>
              </ScrollAnimation>
            ))}
          </div>
        </div>

        {/* CTA */}
        <ScrollAnimation className="text-center mt-16">
          <a href="#contact" className="btn-outline inline-block">
            Get Regional Investment Guide
          </a>
        </ScrollAnimation>
      </div>
    </section>
  );
}
