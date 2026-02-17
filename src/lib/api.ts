import { Property, properties as fallbackProperties } from '@/data/properties';

const API_URL = 'https://migronis-admin-api-production.up.railway.app';

interface ApiProperty {
  id: number;
  title: string;
  description: string;
  price: string;
  price_usd: string;
  location: string;
  region: string;
  images: Array<{ url: string; publicId?: string }>;
  type: string;
  status: string;
  beds: number;
  baths: number;
  area: string;
  expected_roi: string;
  tag: string;
  featured: boolean;
  sort_order: number;
}

// Map type strings from API to landing page types
function mapType(type: string): 'residential' | 'investment' | 'vacation' {
  const typeMap: Record<string, 'residential' | 'investment' | 'vacation'> = {
    apartment: 'residential',
    house: 'residential',
    villa: 'vacation',
    penthouse: 'investment',
    land: 'investment',
    commercial: 'investment',
  };
  return typeMap[type] || 'residential';
}

// Generate a gradient based on property id for visual variety
const gradients = [
  'from-[#1a3a4a] to-[#0d2030]',
  'from-[#2a4a3a] to-[#0d2018]',
  'from-[#3a2a4a] to-[#1a0d30]',
  'from-[#4a3a1a] to-[#302010]',
  'from-[#1a2a4a] to-[#0d1530]',
  'from-[#2a3a4a] to-[#151530]',
  'from-[#3a4a2a] to-[#203015]',
  'from-[#4a2a3a] to-[#301520]',
];

// Parse BRL price string to number (e.g. "1250000" → 1250000)
function parsePriceBrl(price: string | number | null | undefined): number {
  if (!price && price !== 0) return 0;
  if (typeof price === 'number') return price;
  return Number(String(price).replace(/[^0-9.]/g, '')) || 0;
}

// Parse USD display string to number (e.g. "From $250,000" → 250000)
function parseUsdNum(priceUsd: string | null | undefined): number {
  if (!priceUsd) return 0;
  const match = priceUsd.replace(/,/g, '').match(/(\d+)/);
  return match ? Number(match[1]) : 0;
}

// Format BRL price
function formatBrl(num: number): string {
  return `R$ ${num.toLocaleString('pt-BR')}`;
}

function mapApiProperty(p: ApiProperty, index: number): Property {
  const priceBrl = parsePriceBrl(p.price);
  const priceUsdNum = parseUsdNum(p.price_usd);

  return {
    id: p.id,
    title: p.title,
    location: p.location || p.region || '',
    region: p.region || p.location || '',
    price: formatBrl(priceBrl),
    priceUsd: p.price_usd || '',
    priceBrl,
    priceUsdNum,
    beds: p.beds || 0,
    baths: p.baths || 0,
    area: p.area || '',
    areaNum: parseInt(p.area) || 0,
    type: mapType(p.type),
    tag: p.tag || p.type || 'New',
    gradient: gradients[index % gradients.length],
    description: p.description || '',
    expectedROI: p.expected_roi || '',
    images: p.images?.length ? p.images.map(img => img.url) : [],
    features: [],
  };
}

export async function fetchProperties(): Promise<Property[]> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    
    const res = await fetch(`${API_URL}/api/properties?limit=50`, {
      signal: controller.signal,
      cache: 'no-store',
    });
    clearTimeout(timeout);
    
    if (!res.ok) throw new Error(`API ${res.status}`);
    
    const data = await res.json();
    const apiProperties: ApiProperty[] = data.data || [];
    
    // Only use API properties that are active
    const active = apiProperties.filter(p => p.status === 'active');
    
    if (active.length === 0) return fallbackProperties;
    
    return active.map((p, i) => mapApiProperty(p, i));
  } catch (err) {
    console.warn('Failed to fetch properties from API, using fallback:', err);
    return fallbackProperties;
  }
}

export async function fetchSettings(): Promise<Record<string, string>> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    
    const res = await fetch(`${API_URL}/api/settings`, {
      signal: controller.signal,
      cache: 'no-store',
    });
    clearTimeout(timeout);
    
    if (!res.ok) throw new Error(`API ${res.status}`);
    return res.json();
  } catch {
    return {};
  }
}
