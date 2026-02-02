const regions = [
  { name: "Florianópolis", properties: 18, desc: "Island capital, tech hub & beaches", top: "35%", left: "55%" },
  { name: "Balneário Camboriú", properties: 15, desc: "Brazil's Dubai, luxury high-rises", top: "25%", left: "40%" },
  { name: "Itapema", properties: 10, desc: "Emerging coastal hotspot", top: "30%", left: "35%" },
  { name: "Porto Belo", properties: 6, desc: "Hidden gem, boutique developments", top: "35%", left: "30%" },
  { name: "Bombinhas", properties: 4, desc: "Peninsula paradise, diving capital", top: "40%", left: "25%" },
  { name: "Imbituba", properties: 4, desc: "Whale watching coast, surf culture", top: "50%", left: "60%" },
  { name: "Rancho Queimado", properties: 3, desc: "Mountain retreats, wine country", top: "45%", left: "45%" },
];

export default function RegionsMap() {
  return (
    <section id="regions" className="section-padding bg-white">
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
          {/* Map placeholder */}
          <div className="lg:col-span-3 relative aspect-[4/3] bg-navy-900 rounded-sm overflow-hidden">
            {/* Simplified map visualization */}
            <div className="absolute inset-0" style={{
              background: "linear-gradient(145deg, #0a0e1a 0%, #0f1929 30%, #141f35 50%, #0f1929 70%, #0a0e1a 100%)",
            }}>
              {/* Coast line decoration */}
              <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 300">
                <path d="M280,20 Q320,60 300,100 Q280,140 290,180 Q300,220 270,260 Q250,290 240,300" 
                      fill="none" stroke="#c9963c" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M290,20 Q330,60 310,100 Q290,140 300,180 Q310,220 280,260 Q260,290 250,300" 
                      fill="none" stroke="#c9963c" strokeWidth="1" opacity="0.3" />
              </svg>

              {/* Region dots */}
              {regions.map((region) => (
                <div
                  key={region.name}
                  className="absolute group cursor-pointer"
                  style={{ top: region.top, left: region.left }}
                >
                  <div className="relative">
                    <div className="w-3 h-3 bg-gold-400 rounded-full animate-pulse" />
                    <div className="absolute -inset-2 bg-gold-400/20 rounded-full" />
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="bg-white px-4 py-2 rounded shadow-xl whitespace-nowrap">
                        <div className="text-navy-900 font-medium text-sm">{region.name}</div>
                        <div className="text-navy-900/40 text-xs">{region.properties} properties</div>
                      </div>
                      <div className="w-2 h-2 bg-white rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
                    </div>
                  </div>
                </div>
              ))}

              {/* Map label */}
              <div className="absolute bottom-4 left-4 text-white/20 text-xs tracking-widest uppercase">
                Santa Catarina, Brazil
              </div>
              <div className="absolute top-4 right-4 text-white/20 text-xs">
                Interactive map coming soon
              </div>
            </div>
          </div>

          {/* Region list */}
          <div className="lg:col-span-2 space-y-2">
            {regions.map((region) => (
              <div
                key={region.name}
                className="group cursor-pointer p-4 border border-navy-900/5 hover:border-gold-500/30 hover:bg-gold-400/5 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-heading text-lg text-navy-900 group-hover:text-gold-600 transition-colors">
                    {region.name}
                  </h3>
                  <span className="text-gold-500 text-sm font-medium">{region.properties}</span>
                </div>
                <p className="text-navy-900/40 text-sm">{region.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
