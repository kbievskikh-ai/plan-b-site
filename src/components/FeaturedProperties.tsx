const properties = [
  {
    id: 1,
    title: "Penthouse Vista Mar",
    location: "Balneário Camboriú",
    price: "R$ 4.200.000",
    priceUsd: "$820,000",
    beds: 4,
    baths: 3,
    area: "248 m²",
    tag: "Investment",
    gradient: "from-[#1a3a4a] to-[#0d2030]",
  },
  {
    id: 2,
    title: "Villa Jurerê Internacional",
    location: "Florianópolis",
    price: "R$ 6.800.000",
    priceUsd: "$1,330,000",
    beds: 5,
    baths: 4,
    area: "420 m²",
    tag: "Premium",
    gradient: "from-[#2a4a3a] to-[#0d2018]",
  },
  {
    id: 3,
    title: "Apartamento Frente Mar",
    location: "Itapema",
    price: "R$ 1.950.000",
    priceUsd: "$380,000",
    beds: 3,
    baths: 2,
    area: "156 m²",
    tag: "New",
    gradient: "from-[#3a2a4a] to-[#1a0d30]",
  },
  {
    id: 4,
    title: "Casa de Campo Luxo",
    location: "Rancho Queimado",
    price: "R$ 2.400.000",
    priceUsd: "$470,000",
    beds: 4,
    baths: 3,
    area: "380 m²",
    tag: "Exclusive",
    gradient: "from-[#4a3a1a] to-[#302010]",
  },
];

export default function FeaturedProperties() {
  return (
    <section id="properties" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-gold-500" />
            <span className="text-gold-500 text-sm tracking-[0.3em] uppercase">Portfolio</span>
            <div className="w-8 h-[1px] bg-gold-500" />
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-navy-900 mb-4">
            Featured Properties
          </h2>
          <p className="text-navy-900/50 max-w-2xl mx-auto text-lg">
            Hand-picked investment opportunities across Santa Catarina&apos;s most
            prestigious coastal destinations.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex justify-center gap-2 mb-12">
          {["All", "Sale", "Rent", "Investment"].map((tab, i) => (
            <button
              key={tab}
              className={`px-6 py-2 text-sm tracking-wider uppercase transition-all duration-300 ${
                i === 0
                  ? "bg-navy-900 text-white"
                  : "bg-transparent text-navy-900/50 hover:text-navy-900 border border-navy-900/10"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property) => (
            <div
              key={property.id}
              className="group cursor-pointer"
            >
              {/* Image placeholder */}
              <div className="relative aspect-[4/3] overflow-hidden mb-4">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${property.gradient} group-hover:scale-110 transition-transform duration-700`}
                />
                {/* Tag */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-gold-500 text-white text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 font-medium">
                    {property.tag}
                  </span>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/30 transition-colors duration-500 flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm tracking-widest uppercase">
                    View Details
                  </span>
                </div>
              </div>

              {/* Info */}
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <svg className="w-3.5 h-3.5 text-gold-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  </svg>
                  <span className="text-navy-900/40 text-xs tracking-wider uppercase">
                    {property.location}
                  </span>
                </div>
                <h3 className="font-heading text-lg text-navy-900 mb-3 group-hover:text-gold-600 transition-colors">
                  {property.title}
                </h3>

                {/* Details */}
                <div className="flex gap-4 text-navy-900/40 text-xs mb-3">
                  <span>{property.beds} Beds</span>
                  <span>{property.baths} Baths</span>
                  <span>{property.area}</span>
                </div>

                {/* Price */}
                <div className="pt-3 border-t border-navy-900/10 flex items-baseline justify-between">
                  <span className="text-navy-900 font-heading text-xl">{property.price}</span>
                  <span className="text-navy-900/30 text-sm">{property.priceUsd}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <a href="#" className="btn-outline inline-block">
            View All 60+ Properties
          </a>
        </div>
      </div>
    </section>
  );
}
