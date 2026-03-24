// Property Finder data — real projects with cleaned renders (no developer names)
// Prices updated March 2026

export interface FinderProperty {
  id: string;
  name: string;
  tagline: string;
  location: string;
  area: string; // neighborhood
  distanceBeach: string;
  status: 'pre-launch' | 'construction' | 'ready';
  delivery: string;
  minPrice: number; // USD
  maxPrice: number; // USD
  minArea: number; // m²
  maxArea: number; // m²
  types: ('studio' | '1bed' | '2bed' | '3bed' | 'penthouse')[];
  purposes: ('investment' | 'lifestyle' | 'rental' | 'residency')[];
  highlights: string[];
  amenities: string[];
  units: FinderUnit[];
  image: string; // path to cleaned render
}

export interface FinderUnit {
  id: string;
  type: string;
  area: number;
  floor: number;
  orientation: string;
  parking: string;
  priceBRL: number;
  priceUSD: number;
}

export const finderProperties: FinderProperty[] = [
  {
    id: 'la-esmeralda',
    name: 'La Esmeralda Beach Village',
    tagline: 'Resort living 500m from the beach',
    location: 'Florianópolis, SC',
    area: 'Morro das Pedras',
    distanceBeach: '500m',
    status: 'construction',
    delivery: 'January 2029',
    minPrice: 188000,
    maxPrice: 276000,
    minArea: 69,
    maxArea: 97,
    types: ['2bed', '3bed', 'penthouse'],
    purposes: ['investment', 'lifestyle', 'rental'],
    highlights: [
      'Integrated Beach Mall with shops & restaurants',
      '3 residential blocks with pool & fitness',
      '500m from Morro das Pedras beach',
      'Only 40% paid during construction',
    ],
    amenities: ['Pool', 'Beach Club', 'Fitness', 'Spa', 'Playground', 'Pet Space', 'EV Charging', 'Covered Parking'],
    units: [
      // 2 Bed 75m²
      { id: '218A', type: '2 Bedroom', area: 75.27, floor: 2, orientation: 'West/South', parking: 'Covered', priceBRL: 1220877, priceUSD: 210000 },
      { id: '217B', type: '2 Bedroom', area: 75.27, floor: 2, orientation: 'West/North', parking: 'Covered', priceBRL: 1220877, priceUSD: 210000 },
      { id: '218B', type: '2 Bedroom', area: 75.27, floor: 2, orientation: 'West/South', parking: 'Covered', priceBRL: 1220877, priceUSD: 210000 },
      { id: '318C', type: '2 Bedroom', area: 75.27, floor: 3, orientation: 'West/South', parking: 'Uncovered', priceBRL: 1257051, priceUSD: 216000 },
      { id: '418B', type: '2 Bedroom', area: 75.27, floor: 4, orientation: 'West/South', parking: 'Covered', priceBRL: 1352009, priceUSD: 232000 },
      { id: '418C', type: '2 Bedroom', area: 75.27, floor: 4, orientation: 'West/South', parking: 'Covered', priceBRL: 1352009, priceUSD: 232000 },
      // 2 Bed 69m² (best value)
      { id: '321A', type: '2 Bedroom Compact', area: 69.67, floor: 3, orientation: 'South', parking: 'Covered', priceBRL: 1120793, priceUSD: 192000 },
      { id: '313A', type: '2 Bedroom Compact', area: 69.67, floor: 3, orientation: 'North', parking: 'Covered', priceBRL: 1183817, priceUSD: 203000 },
      { id: '412B', type: '2 Bedroom Compact', area: 69.67, floor: 4, orientation: 'North', parking: 'Covered', priceBRL: 1273242, priceUSD: 218000 },
      // 3 Bed 97m²
      { id: '205A', type: '3 Bedroom', area: 97.30, floor: 2, orientation: 'East/South', parking: 'Covered', priceBRL: 1605888, priceUSD: 276000 },
      { id: '205B', type: '3 Bedroom', area: 97.30, floor: 2, orientation: 'East/South', parking: 'Covered', priceBRL: 1605888, priceUSD: 276000 },
      { id: '206C', type: '3 Bedroom', area: 97.30, floor: 2, orientation: 'East/North', parking: 'Covered', priceBRL: 1605888, priceUSD: 276000 },
    ],
    image: '/images/finder/la-esmeralda.jpg',
  },
];

// Helper: get properties matching criteria
export function findProperties(criteria: {
  budget?: number;
  minArea?: number;
  purpose?: string;
  bedrooms?: string;
}) {
  return finderProperties.filter(prop => {
    if (criteria.budget && prop.minPrice > criteria.budget) return false;
    if (criteria.minArea && prop.maxArea < criteria.minArea) return false;
    if (criteria.purpose && !prop.purposes.includes(criteria.purpose as FinderProperty['purposes'][number])) return false;
    if (criteria.bedrooms) {
      const bedMap: Record<string, string> = { '1': '1bed', '2': '2bed', '3': '3bed' };
      if (!prop.types.includes(bedMap[criteria.bedrooms] as FinderProperty['types'][number])) return false;
    }
    return true;
  });
}

// Helper: get matching units within a property
export function findUnits(property: FinderProperty, budget: number, minArea?: number) {
  return property.units.filter(unit => {
    if (unit.priceUSD > budget) return false;
    if (minArea && unit.area < minArea) return false;
    return true;
  }).sort((a, b) => a.priceUSD - b.priceUSD);
}
