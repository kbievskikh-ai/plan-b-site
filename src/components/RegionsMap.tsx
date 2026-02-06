'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { regions } from '@/data/properties';

export default function RegionsMap() {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const handleRegionClick = (regionName: string) => {
    setSelectedRegion(regionName);
    // In a real implementation, this could scroll to properties from that region
    const propertiesSection = document.getElementById('properties');
    if (propertiesSection) {
      propertiesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="regions" className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
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
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Interactive Map */}
          <div className="lg:col-span-3 relative">
            <div className="aspect-[4/3] bg-navy-900 rounded-lg overflow-hidden relative">
              {/* SVG Brazil Map for Santa Catarina */}
              <svg
                viewBox="0 0 400 300"
                className="w-full h-full"
                style={{
                  background: "linear-gradient(145deg, #0a0e1a 0%, #0f1929 30%, #141f35 50%, #0f1929 70%, #0a0e1a 100%)",
                }}
              >
                {/* State outline */}
                <path
                  d="M80,50 L320,50 L340,70 L360,120 L350,180 L330,220 L300,250 L250,270 L200,280 L150,275 L100,260 L70,240 L50,200 L60,160 L70,120 L80,80 Z"
                  fill="none"
                  stroke="#c9963c"
                  strokeWidth="1"
                  opacity="0.3"
                  strokeDasharray="2 2"
                />

                {/* Coast line */}
                <path
                  d="M280,20 Q320,60 300,100 Q280,140 290,180 Q300,220 270,260 Q250,290 240,300"
                  fill="none"
                  stroke="#c9963c"
                  strokeWidth="2"
                  opacity="0.4"
                  strokeDasharray="4 4"
                />

                {/* Region pins with interactive effects */}
                {regions.map((region, index) => {
                  const isHovered = hoveredRegion === region.name;
                  const isSelected = selectedRegion === region.name;
                  
                  // Calculate position based on index for better distribution
                  const positions = [
                    { x: 220, y: 105 }, // Florianópolis
                    { x: 160, y: 75 },  // Balneário Camboriú  
                    { x: 140, y: 90 },  // Itapema
                    { x: 120, y: 105 }, // Porto Belo
                    { x: 100, y: 120 }, // Bombinhas
                    { x: 240, y: 150 }, // Imbituba
                    { x: 180, y: 135 }, // Rancho Queimado
                  ];

                  const position = positions[index] || { x: 200, y: 150 };

                  return (
                    <g key={region.name}>
                      {/* Animated pulse effect */}
                      <circle
                        cx={position.x}
                        cy={position.y}
                        r={isHovered || isSelected ? "12" : "8"}
                        fill="#c9963c"
                        opacity="0.2"
                        className="animate-pulse"
                      />
                      
                      {/* Main pin */}
                      <circle
                        cx={position.x}
                        cy={position.y}
                        r={isHovered || isSelected ? "6" : "4"}
                        fill="#c9963c"
                        className="cursor-pointer transition-all duration-300"
                        onMouseEnter={() => setHoveredRegion(region.name)}
                        onMouseLeave={() => setHoveredRegion(null)}
                        onClick={() => handleRegionClick(region.name)}
                      />

                      {/* Hover tooltip */}
                      {isHovered && (
                        <g className="pointer-events-none">
                          <rect
                            x={position.x - 50}
                            y={position.y - 35}
                            width="100"
                            height="25"
                            fill="white"
                            rx="4"
                            opacity="0.95"
                          />
                          <text
                            x={position.x}
                            y={position.y - 25}
                            textAnchor="middle"
                            className="text-xs fill-navy-900 font-medium"
                          >
                            {region.name}
                          </text>
                          <text
                            x={position.x}
                            y={position.y - 15}
                            textAnchor="middle"
                            className="text-xs fill-navy-600"
                          >
                            {region.properties} properties
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}

                {/* Map labels */}
                <text
                  x="30"
                  y="280"
                  className="fill-white/20 text-xs uppercase tracking-widest"
                >
                  Santa Catarina, Brazil
                </text>
                
                <text
                  x="370"
                  y="30"
                  textAnchor="end"
                  className="fill-white/20 text-xs"
                >
                  Interactive Investment Map
                </text>
              </svg>

              {/* Map Legend */}
              <div className="absolute bottom-4 right-4 bg-white/90 rounded-lg p-3">
                <div className="text-xs text-navy-900 font-medium mb-2">Legend</div>
                <div className="flex items-center gap-2 text-xs text-navy-700">
                  <div className="w-3 h-3 bg-gold-500 rounded-full"></div>
                  <span>Investment Regions</span>
                </div>
              </div>
            </div>
          </div>

          {/* Region list */}
          <div className="lg:col-span-2 space-y-2">
            <h3 className="font-heading text-xl text-navy-900 mb-6">Investment Regions</h3>
            {regions.map((region, index) => (
              <motion.div
                key={region.name}
                className={`group cursor-pointer p-4 border rounded-lg transition-all duration-300 ${
                  selectedRegion === region.name
                    ? 'border-gold-500 bg-gold-50'
                    : hoveredRegion === region.name
                    ? 'border-gold-300 bg-gold-25'
                    : 'border-navy-900/10 hover:border-gold-500/30 hover:bg-gold-400/5'
                }`}
                onClick={() => handleRegionClick(region.name)}
                onMouseEnter={() => setHoveredRegion(region.name)}
                onMouseLeave={() => setHoveredRegion(null)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-heading text-lg text-navy-900 group-hover:text-gold-600 transition-colors">
                    {region.name}
                  </h4>
                  <span className="text-gold-500 text-sm font-medium bg-gold-100 px-2 py-1 rounded-full">
                    {region.properties}
                  </span>
                </div>
                <p className="text-navy-900/40 text-sm mb-3">{region.desc}</p>
                
                {/* Region highlights */}
                {'highlights' in region && (
                  <div className="flex flex-wrap gap-1">
                    {region.highlights.slice(0, 2).map((highlight, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-navy-100 text-navy-700 px-2 py-0.5 rounded"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
            
            <div className="pt-4">
              <button 
                className="btn-outline w-full"
                onClick={() => handleRegionClick('')}
              >
                View All Properties
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}