export default function Hero() {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center bg-navy-900 overflow-hidden">
      {/* Video placeholder background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/60 via-navy-900/40 to-navy-900 z-10" />
        {/* Placeholder with gradient simulating aerial beach video */}
        <div
          className="w-full h-full"
          style={{
            background:
              "linear-gradient(135deg, #0a1628 0%, #0d2137 25%, #0f2d4a 45%, #1a4a5e 60%, #2a7a7a 75%, #1a5a5a 100%)",
          }}
        />
        {/* Play button overlay */}
        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-500">
          <button className="w-20 h-20 rounded-full border-2 border-white/40 flex items-center justify-center backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-colors">
            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[1px] bg-gold-400" />
            <span className="text-gold-400 text-sm tracking-[0.3em] uppercase font-medium">
              Santa Catarina, Brazil
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-7xl text-white leading-[1.1] mb-6">
            Premium Real Estate
            <br />
            <span className="text-gold-400">on the Coast</span>
            <br />
            of Brazil
          </h1>

          {/* Subtitle */}
          <p className="text-white/60 text-lg sm:text-xl max-w-xl mb-10 leading-relaxed">
            Exclusive investment properties in Florianópolis, Balneário Camboriú, and
            the most sought-after coastal destinations of Southern Brazil.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#properties" className="btn-gold text-center">
              View Properties
            </a>
            <a href="#contact" className="btn-outline text-center">
              Schedule a Tour
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg">
            {[
              { value: "60+", label: "Properties" },
              { value: "7", label: "Regions" },
              { value: "12%", label: "Avg. ROI" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-gold-400 font-heading text-3xl lg:text-4xl">
                  {stat.value}
                </div>
                <div className="text-white/40 text-sm mt-1 tracking-wider uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2">
        <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-gold-400/60 to-transparent" />
      </div>
    </section>
  );
}
