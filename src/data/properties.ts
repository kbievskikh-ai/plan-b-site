export interface Property {
  id: number;
  title: string;
  slug?: string;
  location: string;
  region: string;
  price: string;
  priceUsd: string;
  priceBrl: number;
  priceUsdNum: number;
  beds: number;
  baths: number;
  area: string;
  areaNum: number;
  type: 'residential' | 'investment' | 'vacation';
  tag: string;
  gradient: string;
  description: string;
  expectedROI?: string;
  images: string[];
  features: string[];
  featuresGrouped?: {
    imovel: Array<{ name: string; name_ru: string; name_en: string }>;
    infraestrutura: Array<{ name: string; name_ru: string; name_en: string }>;
  };
  coordinates?: { lat: number; lng: number };
}

export const properties: Property[] = [
  {
    id: 1,
    title: "Penthouse Vista Mar",
    location: "Balneário Camboriú",
    region: "Balneário Camboriú",
    price: "R$ 4.200.000",
    priceUsd: "$820,000",
    priceBrl: 4200000,
    priceUsdNum: 820000,
    beds: 4,
    baths: 3,
    area: "248 m²",
    areaNum: 248,
    type: "investment",
    tag: "Investment",
    gradient: "from-[#1a3a4a] to-[#0d2030]",
    description: "Luxurious penthouse with panoramic ocean views in the heart of Brazil's Dubai. This stunning property features high-end finishes, floor-to-ceiling windows, and access to top-tier amenities including infinity pool, spa, and 24/7 concierge.",
    expectedROI: "8-12% annual",
    images: ["/images/property1-1.jpg", "/images/property1-2.jpg", "/images/property1-3.jpg"],
    features: ["Ocean View", "Infinity Pool", "24/7 Concierge", "Prime Location", "High-end Finishes"],
    coordinates: { lat: -26.9924, lng: -48.6339 }
  },
  {
    id: 2,
    title: "Villa Jurerê Internacional",
    location: "Florianópolis",
    region: "Florianópolis",
    price: "R$ 6.800.000",
    priceUsd: "$1,330,000",
    priceBrl: 6800000,
    priceUsdNum: 1330000,
    beds: 5,
    baths: 4,
    area: "420 m²",
    areaNum: 420,
    type: "vacation",
    tag: "Exclusive",
    gradient: "from-[#2a4a3a] to-[#0d2018]",
    description: "Exclusive villa in Jurerê Internacional, Florianópolis' most prestigious neighborhood. Perfect for luxury vacation rentals with private beach access, landscaped gardens, and sophisticated architectural design.",
    expectedROI: "6-10% annual",
    images: ["/images/property2-1.jpg", "/images/property2-2.jpg", "/images/property2-3.jpg"],
    features: ["Private Beach Access", "Landscaped Gardens", "Prime Neighborhood", "Vacation Rental Ready"],
    coordinates: { lat: -27.4206, lng: -48.4981 }
  },
  {
    id: 3,
    title: "Apartamento Frente Mar",
    location: "Itapema",
    region: "Itapema",
    price: "R$ 1.950.000",
    priceUsd: "$380,000",
    priceBrl: 1950000,
    priceUsdNum: 380000,
    beds: 3,
    baths: 2,
    area: "156 m²",
    areaNum: 156,
    type: "residential",
    tag: "New",
    gradient: "from-[#3a2a4a] to-[#1a0d30]",
    description: "Modern beachfront apartment in the emerging hotspot of Itapema. Features contemporary design, ocean views, and easy access to pristine beaches. Perfect for personal residence or rental investment.",
    expectedROI: "7-11% annual",
    images: ["/images/property3-1.jpg", "/images/property3-2.jpg", "/images/property3-3.jpg"],
    features: ["Beachfront Location", "Modern Design", "Ocean Views", "Emerging Market"],
    coordinates: { lat: -27.0911, lng: -48.6183 }
  },
  {
    id: 4,
    title: "Casa de Campo Luxo",
    location: "Rancho Queimado",
    region: "Rancho Queimado",
    price: "R$ 2.400.000",
    priceUsd: "$470,000",
    priceBrl: 2400000,
    priceUsdNum: 470000,
    beds: 4,
    baths: 3,
    area: "380 m²",
    areaNum: 380,
    type: "vacation",
    tag: "Exclusive",
    gradient: "from-[#4a3a1a] to-[#302010]",
    description: "Luxury mountain retreat in Santa Catarina's wine country. This exclusive property offers tranquility, panoramic mountain views, and proximity to vineyards and eco-tourism attractions.",
    expectedROI: "5-8% annual",
    images: ["/images/property4-1.jpg", "/images/property4-2.jpg", "/images/property4-3.jpg"],
    features: ["Mountain Views", "Wine Country", "Exclusive Location", "Eco-Tourism Proximity"],
    coordinates: { lat: -27.6667, lng: -49.0167 }
  },
  {
    id: 5,
    title: "Cobertura Porto Belo",
    location: "Porto Belo",
    region: "Porto Belo",
    price: "R$ 3.200.000",
    priceUsd: "$625,000",
    priceBrl: 3200000,
    priceUsdNum: 625000,
    beds: 3,
    baths: 2,
    area: "195 m²",
    areaNum: 195,
    type: "investment",
    tag: "Hidden Gem",
    gradient: "from-[#1a2a4a] to-[#0d1530]",
    description: "Stunning penthouse in Porto Belo's boutique development scene. This hidden gem offers exceptional value with growing tourism and development potential in one of Santa Catarina's most charming coastal towns.",
    expectedROI: "9-13% annual",
    images: ["/images/property5-1.jpg", "/images/property5-2.jpg", "/images/property5-3.jpg"],
    features: ["Hidden Gem Location", "High Growth Potential", "Boutique Development", "Tourism Growth"],
    coordinates: { lat: -27.1583, lng: -48.5500 }
  },
  {
    id: 6,
    title: "Casa Bombinhas Paradise",
    location: "Bombinhas",
    region: "Bombinhas",
    price: "R$ 2.800.000",
    priceUsd: "$545,000",
    priceBrl: 2800000,
    priceUsdNum: 545000,
    beds: 4,
    baths: 3,
    area: "210 m²",
    areaNum: 210,
    type: "vacation",
    tag: "Peninsula",
    gradient: "from-[#2a3a4a] to-[#151530]",
    description: "Beautiful house in Bombinhas, Brazil's diving capital. Located on a stunning peninsula with crystal-clear waters, this property is perfect for vacation rentals catering to diving enthusiasts and beach lovers.",
    expectedROI: "8-12% annual",
    images: ["/images/property6-1.jpg", "/images/property6-2.jpg", "/images/property6-3.jpg"],
    features: ["Diving Capital", "Peninsula Location", "Crystal Clear Waters", "Tourism Magnet"],
    coordinates: { lat: -27.1394, lng: -48.4831 }
  },
  {
    id: 7,
    title: "Residência Imbituba Coast",
    location: "Imbituba",
    region: "Imbituba",
    price: "R$ 1.750.000",
    priceUsd: "$340,000",
    priceBrl: 1750000,
    priceUsdNum: 340000,
    beds: 3,
    baths: 2,
    area: "180 m²",
    areaNum: 180,
    type: "residential",
    tag: "Surf Culture",
    gradient: "from-[#3a4a2a] to-[#203015]",
    description: "Coastal residence in Imbituba, famous for whale watching and surf culture. This property offers a unique lifestyle opportunity with growing eco-tourism and a vibrant local community.",
    expectedROI: "6-9% annual",
    images: ["/images/property7-1.jpg", "/images/property7-2.jpg", "/images/property7-3.jpg"],
    features: ["Whale Watching Coast", "Surf Culture", "Eco-Tourism", "Growing Community"],
    coordinates: { lat: -28.2394, lng: -48.6700 }
  },
  {
    id: 8,
    title: "Apartamento Central Floripa",
    location: "Florianópolis",
    region: "Florianópolis",
    price: "R$ 1.400.000",
    priceUsd: "$275,000",
    priceBrl: 1400000,
    priceUsdNum: 275000,
    beds: 2,
    baths: 2,
    area: "95 m²",
    areaNum: 95,
    type: "investment",
    tag: "Tech Hub",
    gradient: "from-[#4a2a3a] to-[#301520]",
    description: "Modern apartment in central Florianópolis, Brazil's Silicon Valley. Perfect for rental investment targeting tech professionals and digital nomads in this thriving innovation hub.",
    expectedROI: "10-14% annual",
    images: ["/images/property8-1.jpg", "/images/property8-2.jpg", "/images/property8-3.jpg"],
    features: ["Tech Hub Location", "Central Location", "Digital Nomad Ready", "Innovation District"],
    coordinates: { lat: -27.5954, lng: -48.5480 }
  },
  {
    id: 9,
    title: "SPOT II Jurerê",
    slug: "spot-ii",
    location: "Jurerê, Florianópolis",
    region: "Florianópolis",
    price: "R$ 399.000",
    priceUsd: "$79,000",
    priceBrl: 399000,
    priceUsdNum: 79000,
    beds: 0,
    baths: 1,
    area: "15-29 m²",
    areaNum: 22,
    type: "investment",
    tag: "87% Sold Out",
    gradient: "from-[#1B2951] to-[#D4AF37]",
    description: "Micro-unit development in the heart of Jurerê, designed for short-term rental. 87% sold out — only 5 units remaining. CUB-indexed pricing, construction-phase payments. Delivery June 2029. Net yield up to 14.3%.",
    expectedROI: "10-14% annual",
    images: [],
    features: ["Designed for short-term rental", "Micro-units 15-29 m²", "CUB/SC indexed pricing", "Construction-phase payments", "Premium beach address", "87% sold out"],
    coordinates: { lat: -27.1089, lng: -48.4748 }
  },
  {
    id: 10,
    title: "SPOT III Jurerê",
    slug: "spot-iii",
    location: "Jurerê, Florianópolis",
    region: "Florianópolis",
    price: "R$ 279.000",
    priceUsd: "$55,000",
    priceBrl: 279000,
    priceUsdNum: 55000,
    beds: 0,
    baths: 1,
    area: "15-47 m²",
    areaNum: 31,
    type: "investment",
    tag: "Pre-Launch",
    gradient: "from-[#1B2951] to-[#2a3f75]",
    description: "Pre-launch micro-unit development by Seazone. 72 units, Rua Accácio Melo 64, Jurerê. Lowest entry in Jurerê from R$ 279K. Estimated +94% appreciation. Delivery March 2030. Net yield up to 14.3%.",
    expectedROI: "14% annual",
    images: [],
    features: ["Pre-launch pricing", "72 micro-units 15-47 m²", "Lowest entry R$ 279K", "+94% estimated appreciation", "CUB-indexed construction payments", "Rua Accácio Melo 64, Jurerê"],
    coordinates: { lat: -27.1089, lng: -48.4748 }
  }
];

export const regions = [
  { 
    name: "Florianópolis", 
    properties: 18, 
    desc: "Island capital, tech hub & beaches", 
    coordinates: { lat: -27.5954, lng: -48.5480 },
    lat: -27.5954, 
    lng: -48.5480,
    highlights: ["Tech Hub", "Island Capital", "Beach Paradise", "Innovation Center"]
  },
  { 
    name: "Balneário Camboriú", 
    properties: 15, 
    desc: "Brazil's Dubai, luxury high-rises", 
    coordinates: { lat: -26.9924, lng: -48.6339 },
    lat: -26.9924, 
    lng: -48.6339,
    highlights: ["Luxury High-rises", "Beach Resort", "Urban Development", "Tourism Hotspot"]
  },
  { 
    name: "Itapema", 
    properties: 10, 
    desc: "Emerging coastal hotspot", 
    coordinates: { lat: -27.0911, lng: -48.6183 },
    lat: -27.0911, 
    lng: -48.6183,
    highlights: ["Emerging Market", "Coastal Beauty", "Growth Potential", "Beach Access"]
  },
  { 
    name: "Porto Belo", 
    properties: 6, 
    desc: "Hidden gem, boutique developments", 
    coordinates: { lat: -27.1583, lng: -48.5500 },
    lat: -27.1583, 
    lng: -48.5500,
    highlights: ["Hidden Gem", "Boutique Development", "Authentic Culture", "Value Opportunity"]
  },
  { 
    name: "Bombinhas", 
    properties: 4, 
    desc: "Peninsula paradise, diving capital", 
    coordinates: { lat: -27.1394, lng: -48.4831 },
    lat: -27.1394, 
    lng: -48.4831,
    highlights: ["Diving Capital", "Peninsula Paradise", "Crystal Waters", "Nature Reserve"]
  },
  { 
    name: "Imbituba", 
    properties: 4, 
    desc: "Whale watching coast, surf culture", 
    coordinates: { lat: -28.2394, lng: -48.6700 },
    lat: -28.2394, 
    lng: -48.6700,
    highlights: ["Whale Watching", "Surf Culture", "Eco-Tourism", "Coastal Lifestyle"]
  },
  { 
    name: "Rancho Queimado", 
    properties: 3, 
    desc: "Mountain retreats, wine country", 
    coordinates: { lat: -27.6667, lng: -49.0167 },
    lat: -27.6667, 
    lng: -49.0167,
    highlights: ["Wine Country", "Mountain Retreat", "Rural Luxury", "Eco-Tourism"]
  },
  { 
    name: "Palhoça", 
    properties: 2, 
    desc: "Growing suburb of Florianópolis", 
    coordinates: { lat: -27.6406, lng: -48.6703 },
    lat: -27.6406, 
    lng: -48.6703,
    highlights: ["Suburban Growth", "Affordable Entry", "Mainland Access", "Residential"]
  },
  { 
    name: "São José", 
    properties: 2, 
    desc: "Business district near airport", 
    coordinates: { lat: -27.5969, lng: -48.6339 },
    lat: -27.5969, 
    lng: -48.6339,
    highlights: ["Business Hub", "Airport Proximity", "Urban Living", "Commercial"]
  },
  { 
    name: "Garopaba", 
    properties: 2, 
    desc: "Pristine beaches & whale watching", 
    coordinates: { lat: -27.7706, lng: -48.6256 },
    lat: -27.7706, 
    lng: -48.6256,
    highlights: ["Pristine Beaches", "Whale Watching", "Surfing", "Nature"]
  },
  { 
    name: "Penha", 
    properties: 1, 
    desc: "Home of Beto Carrero World theme park", 
    coordinates: { lat: -26.7731, lng: -48.6531 },
    lat: -26.7731, 
    lng: -48.6531,
    highlights: ["Theme Park", "Tourism", "Family Friendly", "Investment"]
  },
  { 
    name: "Laguna", 
    properties: 1, 
    desc: "Historic coastal town", 
    coordinates: { lat: -28.4831, lng: -48.7831 },
    lat: -28.4831, 
    lng: -48.7831,
    highlights: ["Historic Center", "Coastal Charm", "Fishing Village", "Culture"]
  },
  { 
    name: "Joinville", 
    properties: 1, 
    desc: "Industrial capital of SC", 
    coordinates: { lat: -26.3044, lng: -48.8456 },
    lat: -26.3044, 
    lng: -48.8456,
    highlights: ["Industrial Hub", "Urban Center", "Business", "Infrastructure"]
  },
  { 
    name: "Blumenau", 
    properties: 1, 
    desc: "German heritage & Oktoberfest", 
    coordinates: { lat: -26.9194, lng: -49.0661 },
    lat: -26.9194, 
    lng: -49.0661,
    highlights: ["German Culture", "Oktoberfest", "Tourism", "Heritage"]
  },
];

export const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under $300k", min: 0, max: 300000 },
  { label: "$300k - $500k", min: 300000, max: 500000 },
  { label: "$500k - $1M", min: 500000, max: 1000000 },
  { label: "Over $1M", min: 1000000, max: Infinity },
];

export const propertyTypes = [
  { label: "All Types", value: "all" },
  { label: "Residential", value: "residential" },
  { label: "Investment", value: "investment" },
  { label: "Vacation", value: "vacation" },
];