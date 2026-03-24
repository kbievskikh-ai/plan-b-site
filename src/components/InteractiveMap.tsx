"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { regions, properties } from "@/data/properties";
import ScrollAnimation from "./ScrollAnimation";
import PropertyModal from "./PropertyModal";
import { useLanguage } from "@/lib/i18n";

// Google Maps API key from environment
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

// Map container style
const containerStyle = {
  width: "100%",
  height: "100%",
};

// Center on Santa Catarina coast
const center = {
  lat: -27.1,
  lng: -48.55,
};

// Dark map style
const mapStyles = [
  { elementType: "geometry", stylers: [{ color: "#0a0e1a" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#0a0e1a" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#c9963c" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#93817c" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#1a2e1a" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#1e2844" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#2c3e50" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#0d2137" }],
  },
];

// Region coordinates
const regionCoordinates: Record<string, { lat: number; lng: number }> = {
  "Balneário Camboriú": { lat: -26.9906, lng: -48.6348 },
  "Florianópolis": { lat: -27.5954, lng: -48.5480 },
  "Itapema": { lat: -27.0903, lng: -48.6115 },
  "Porto Belo": { lat: -27.1586, lng: -48.5469 },
  "Bombinhas": { lat: -27.1420, lng: -48.5145 },
  "Imbituba": { lat: -28.2400, lng: -48.6700 },
  "Rancho Queimado": { lat: -27.6714, lng: -49.0178 },
};

// Region details - bilingual
const regionDetailsEN: Record<string, {
  highlights: string[];
  avgPrice: string;
  rentalYield: string;
}> = {
  "Balneário Camboriú": {
    highlights: ['Beachfront towers', 'Luxury segment', 'High demand'],
    avgPrice: "$450K – $2M+",
    rentalYield: "8-14%",
  },
  "Florianópolis": {
    highlights: ['Island paradise', 'Tech hub', '42 beaches'],
    avgPrice: "$350K – $1.5M",
    rentalYield: "6-12%",
  },
  "Itapema": {
    highlights: ['Fast growth', 'Family-friendly', 'Good value'],
    avgPrice: "$250K – $800K",
    rentalYield: "7-11%",
  },
  "Porto Belo": {
    highlights: ['Historic charm', 'Marina access', 'Quiet pace'],
    avgPrice: "$300K – $1M",
    rentalYield: "9-13%",
  },
  "Bombinhas": {
    highlights: ['Best beaches', 'Diving paradise', 'Seasonal hotspot'],
    avgPrice: "$280K – $900K",
    rentalYield: "8-15%",
  },
  "Imbituba": {
    highlights: ['Surfing capital', 'Whale watching', 'Emerging market'],
    avgPrice: "$200K – $600K",
    rentalYield: "6-10%",
  },
  "Rancho Queimado": {
    highlights: ['Mountain retreat', 'Cool climate', 'Nature escape'],
    avgPrice: "$350K – $800K",
    rentalYield: "5-8%",
  },
};

const regionDetailsRU: Record<string, {
  highlights: string[];
  avgPrice: string;
  rentalYield: string;
}> = {
  "Balneário Camboriú": {
    highlights: ['Небоскрёбы на берегу', 'Люкс сегмент', 'Высокий спрос'],
    avgPrice: "$450K – $2M+",
    rentalYield: "8-14%",
  },
  "Florianópolis": {
    highlights: ['Остров', 'IT-центр', '42 пляжа'],
    avgPrice: "$350K – $1.5M",
    rentalYield: "6-12%",
  },
  "Itapema": {
    highlights: ['Быстрый рост', 'Для семей', 'Выгодные цены'],
    avgPrice: "$250K – $800K",
    rentalYield: "7-11%",
  },
  "Porto Belo": {
    highlights: ['Историческое место', 'Марина', 'Спокойно'],
    avgPrice: "$300K – $1M",
    rentalYield: "9-13%",
  },
  "Bombinhas": {
    highlights: ['Лучшие пляжи', 'Дайвинг', 'Сезонный хит'],
    avgPrice: "$280K – $900K",
    rentalYield: "8-15%",
  },
  "Imbituba": {
    highlights: ['Сёрфинг', 'Киты', 'Растущий рынок'],
    avgPrice: "$200K – $600K",
    rentalYield: "6-10%",
  },
  "Rancho Queimado": {
    highlights: ['Горы', 'Прохладный климат', 'Природа'],
    avgPrice: "$350K – $800K",
    rentalYield: "5-8%",
  },
};

// Icons as SVG components
const MapPinIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

const XMarkIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const BuildingIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
  </svg>
);

interface RegionInfo {
  name: string;
  properties: number;
  desc: string;
}

export default function InteractiveMap() {
  const { language } = useLanguage();
  const [selectedRegion, setSelectedRegion] = useState<RegionInfo | null>(null);
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<typeof properties[0] | null>(null);

  // Select region details based on language
  const regionDetails = language === 'ru' ? regionDetailsRU : regionDetailsEN;

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleMarkerClick = (name: string) => {
    const region = regions.find(r => r.name === name);
    if (region) {
      setSelectedRegion(region);
      setActiveMarker(name);
      
      if (map && regionCoordinates[name]) {
        map.panTo(regionCoordinates[name]);
        map.setZoom(12);
      }
    }
  };

  const handleCardClick = (name: string) => {
    handleMarkerClick(name);
  };

  const openFirstPropertyInRegion = () => {
    if (!selectedRegion) return;
    
    // Find first property in this region
    const regionProperty = properties.find(p => 
      p.region === selectedRegion.name || p.location === selectedRegion.name
    );
    
    if (regionProperty) {
      setSelectedProperty(regionProperty);
    }
  };

  const resetMapView = () => {
    if (map) {
      map.panTo(center);
      map.setZoom(9);
    }
    setSelectedRegion(null);
    setActiveMarker(null);
  };

  // Labels based on language
  const labels = {
    explore: language === 'ru' ? 'Регионы' : 'Explore',
    title: language === 'ru' ? 'Регионы Санта-Катарины' : 'Regions of Santa Catarina',
    subtitle: language === 'ru' 
      ? 'Семь локаций с уникальным характером и инвестиционным потенциалом' 
      : 'Seven distinct destinations, each offering unique lifestyle and investment opportunities.',
    resetView: language === 'ru' ? 'Сбросить' : 'Reset View',
    properties: language === 'ru' ? 'объектов' : 'Properties',
    avgPrice: language === 'ru' ? 'Цена' : 'Avg. Price',
    rentalYield: language === 'ru' ? 'Доходность' : 'Rental Yield',
    highlights: language === 'ru' ? 'Особенности' : 'Highlights',
    viewProperties: language === 'ru' ? 'Смотреть объекты' : 'View Properties',
    getGuide: language === 'ru' ? 'Получить гайд по регионам' : 'Get Regional Investment Guide',
  };

  // Fallback if no API key — show beautiful SVG map
  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <section id="regions" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <ScrollAnimation className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-gold-500" />
              <span className="text-gold-500 text-sm tracking-[0.3em] uppercase">{labels.explore}</span>
              <div className="w-8 h-[1px] bg-gold-500" />
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-navy-900 mb-4">
              {labels.title}
            </h2>
            <p className="text-navy-900/50 max-w-2xl mx-auto text-lg">
              {labels.subtitle}
            </p>
          </ScrollAnimation>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* SVG Map */}
            <div className="lg:col-span-3 relative">
              <div className="aspect-[4/3] bg-navy-900 rounded-lg overflow-hidden relative shadow-xl">
                <svg
                  viewBox="0 0 400 300"
                  className="w-full h-full"
                  style={{
                    background: "linear-gradient(145deg, #0a0e1a 0%, #0f1929 30%, #141f35 50%, #0f1929 70%, #0a0e1a 100%)",
                  }}
                >
                  {/* Ocean texture */}
                  <defs>
                    <pattern id="oceanGrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#0d2137" strokeWidth="0.5" opacity="0.4" />
                    </pattern>
                  </defs>
                  <rect width="400" height="300" fill="url(#oceanGrid)" opacity="0.3" />

                  {/* State outline */}
                  <path
                    d="M80,50 L320,50 L340,70 L360,120 L350,180 L330,220 L300,250 L250,270 L200,280 L150,275 L100,260 L70,240 L50,200 L60,160 L70,120 L80,80 Z"
                    fill="#0f1929"
                    stroke="#c9963c"
                    strokeWidth="1"
                    opacity="0.6"
                    strokeDasharray="3 3"
                  />

                  {/* Coastline */}
                  <path
                    d="M280,20 Q320,60 300,100 Q280,140 290,180 Q300,220 270,260 Q250,290 240,300"
                    fill="none"
                    stroke="#c9963c"
                    strokeWidth="1.5"
                    opacity="0.5"
                    strokeDasharray="4 3"
                  />

                  {/* Atlantic label */}
                  <text x="355" y="150" textAnchor="middle" fill="#c9963c" opacity="0.25" fontSize="8" transform="rotate(90, 355, 150)" letterSpacing="2">ATLANTIC OCEAN</text>

                  {/* Region pins */}
                  {[
                    { x: 220, y: 120, name: "Florianópolis" },
                    { x: 155, y: 80, name: "Balneário Camboriú" },
                    { x: 140, y: 98, name: "Itapema" },
                    { x: 122, y: 115, name: "Porto Belo" },
                    { x: 105, y: 128, name: "Bombinhas" },
                    { x: 240, y: 165, name: "Imbituba" },
                    { x: 180, y: 148, name: "Rancho Queimado" },
                  ].map((pin) => (
                    <g key={pin.name}>
                      <circle cx={pin.x} cy={pin.y} r="10" fill="#c9963c" opacity="0.12" className="animate-pulse" />
                      <circle cx={pin.x} cy={pin.y} r="5" fill="#c9963c" opacity="0.9" />
                      <circle cx={pin.x} cy={pin.y} r="2" fill="#ffffff" opacity="0.8" />
                    </g>
                  ))}

                  {/* Legend */}
                  <rect x="10" y="265" width="120" height="28" rx="4" fill="#ffffff" opacity="0.08" />
                  <circle cx="22" cy="279" r="4" fill="#c9963c" opacity="0.9" />
                  <text x="30" y="283" fill="#ffffff" opacity="0.5" fontSize="8" letterSpacing="1">INVESTMENT REGIONS</text>

                  {/* Map watermark */}
                  <text x="390" y="290" textAnchor="end" fill="#ffffff" opacity="0.12" fontSize="7" letterSpacing="1">SANTA CATARINA, BRAZIL</text>
                </svg>
              </div>
            </div>

            {/* Region list */}
            <div className="lg:col-span-2 space-y-2">
              {regions.map((region, index) => (
                <ScrollAnimation key={region.name} delay={index * 0.05} direction="right">
                  <div className="group cursor-pointer p-4 border border-navy-900/10 rounded-lg hover:border-gold-500/30 hover:bg-gold-400/5 transition-all duration-300 h-[88px] flex flex-col justify-center">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <MapPinIcon className="w-4 h-4 flex-shrink-0 text-navy-900/30" />
                        <h3 className="font-heading text-lg text-navy-900 group-hover:text-gold-600 transition-colors truncate">
                          {region.name}
                        </h3>
                      </div>
                      <span className="text-gold-500 text-sm font-semibold bg-gold-400/10 px-2 py-0.5 rounded flex-shrink-0 ml-2">
                        {region.properties}
                      </span>
                    </div>
                    <p className="text-navy-900/50 text-sm pl-6 line-clamp-1">{region.desc}</p>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>

          <ScrollAnimation className="text-center mt-16">
            <a href="https://t.me/Gronis_Leads_bot" target="_blank" rel="noopener noreferrer" className="btn-outline inline-block">
              {labels.getGuide}
            </a>
          </ScrollAnimation>
        </div>
      </section>
    );
  }

  if (loadError) {
    return (
      <section id="regions" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto text-center py-20">
          <p className="text-red-500">Error loading Google Maps</p>
        </div>
      </section>
    );
  }

  return (
    <section id="regions" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <ScrollAnimation className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-gold-500" />
            <span className="text-gold-500 text-sm tracking-[0.3em] uppercase">{labels.explore}</span>
            <div className="w-8 h-[1px] bg-gold-500" />
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-navy-900 mb-4">
            {labels.title}
          </h2>
          <p className="text-navy-900/50 max-w-2xl mx-auto text-lg">
            {labels.subtitle}
          </p>
        </ScrollAnimation>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Google Map */}
          <ScrollAnimation className="lg:col-span-3 relative aspect-[4/3] bg-navy-900 rounded-lg overflow-hidden shadow-xl" direction="left">
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={9}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{
                  styles: mapStyles,
                  disableDefaultUI: false,
                  zoomControl: true,
                  mapTypeControl: false,
                  scaleControl: true,
                  streetViewControl: false,
                  rotateControl: false,
                  fullscreenControl: true,
                }}
              >
                {/* Region Markers - NO InfoWindow */}
                {regions.map((region) => {
                  const coords = regionCoordinates[region.name];
                  if (!coords) return null;
                  
                  return (
                    <Marker
                      key={region.name}
                      position={coords}
                      onClick={() => handleMarkerClick(region.name)}
                      icon={{
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: activeMarker === region.name ? 12 : 8,
                        fillColor: "#c9963c",
                        fillOpacity: activeMarker === region.name ? 1 : 0.8,
                        strokeColor: "#ffffff",
                        strokeWeight: 2,
                      }}
                      animation={activeMarker === region.name ? google.maps.Animation.BOUNCE : undefined}
                    />
                  );
                })}
              </GoogleMap>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-navy-900">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500"></div>
              </div>
            )}
            
            {/* Reset button */}
            {selectedRegion && (
              <button
                onClick={resetMapView}
                className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg text-sm text-navy-900 hover:bg-white transition-colors flex items-center gap-2 z-10"
              >
                <XMarkIcon className="w-4 h-4" />
                {labels.resetView}
              </button>
            )}

            {/* Single detail card - appears at bottom when region selected */}
            <AnimatePresence>
              {selectedRegion && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-2xl overflow-hidden z-10"
                >
                  {/* Header */}
                  <div className="bg-navy-900 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MapPinIcon className="w-5 h-5 text-gold-400" />
                      <div>
                        <h3 className="font-heading text-lg text-white">{selectedRegion.name}</h3>
                        <p className="text-white/60 text-sm">{selectedRegion.desc}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedRegion(null);
                        setActiveMarker(null);
                      }}
                      className="text-white/50 hover:text-white p-1"
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {/* Body */}
                  <div className="p-4">
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="text-center p-2 bg-cream-50 rounded">
                        <BuildingIcon className="w-5 h-5 text-gold-500 mx-auto mb-1" />
                        <div className="text-lg font-bold text-navy-900">{selectedRegion.properties}</div>
                        <div className="text-xs text-navy-900/50">{labels.properties}</div>
                      </div>
                      <div className="text-center p-2 bg-cream-50 rounded">
                        <div className="text-xs text-navy-900/50 mb-1">{labels.avgPrice}</div>
                        <div className="text-sm font-semibold text-navy-900">
                          {regionDetails[selectedRegion.name]?.avgPrice || 'N/A'}
                        </div>
                      </div>
                      <div className="text-center p-2 bg-cream-50 rounded">
                        <div className="text-xs text-navy-900/50 mb-1">{labels.rentalYield}</div>
                        <div className="text-sm font-semibold text-gold-600">
                          {regionDetails[selectedRegion.name]?.rentalYield || 'N/A'}
                        </div>
                      </div>
                    </div>
                    
                    {/* Highlights */}
                    {regionDetails[selectedRegion.name]?.highlights && (
                      <div className="mb-4">
                        <div className="text-xs text-navy-900/50 mb-2">{labels.highlights}</div>
                        <div className="flex flex-wrap gap-2">
                          {regionDetails[selectedRegion.name].highlights.map((h, i) => (
                            <span key={i} className="text-xs bg-gold-400/10 text-gold-700 px-2 py-1 rounded">
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* CTA - opens property modal */}
                    <button
                      onClick={openFirstPropertyInRegion}
                      className="btn-gold w-full text-center"
                    >
                      {labels.viewProperties} →
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </ScrollAnimation>

          {/* Region list */}
          <div className="lg:col-span-2 space-y-2">
            {regions.map((region, index) => (
              <ScrollAnimation key={region.name} delay={index * 0.05} direction="right">
                <motion.div
                  className={`group cursor-pointer p-4 border rounded-lg transition-all duration-300 h-[88px] flex flex-col justify-center ${
                    activeMarker === region.name
                      ? "border-gold-500/50 bg-gold-400/10"
                      : "border-navy-900/10 hover:border-gold-500/30 hover:bg-gold-400/5"
                  }`}
                  onClick={() => handleCardClick(region.name)}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <MapPinIcon className={`w-4 h-4 flex-shrink-0 ${activeMarker === region.name ? 'text-gold-500' : 'text-navy-900/30'}`} />
                      <h3 className={`font-heading text-lg transition-colors truncate ${
                        activeMarker === region.name ? "text-gold-600" : "text-navy-900 group-hover:text-gold-600"
                      }`}>
                        {region.name}
                      </h3>
                    </div>
                    <span className="text-gold-500 text-sm font-semibold bg-gold-400/10 px-2 py-0.5 rounded flex-shrink-0 ml-2">
                      {region.properties}
                    </span>
                  </div>
                  <p className="text-navy-900/50 text-sm pl-6 line-clamp-1">{region.desc}</p>
                </motion.div>
              </ScrollAnimation>
            ))}
          </div>
        </div>

        {/* CTA */}
        <ScrollAnimation className="text-center mt-16">
          <a href="https://t.me/Gronis_Leads_bot" target="_blank" rel="noopener noreferrer" className="btn-outline inline-block">
            {labels.getGuide}
          </a>
        </ScrollAnimation>
      </div>

      {/* Property Modal */}
      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          isOpen={true}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </section>
  );
}
