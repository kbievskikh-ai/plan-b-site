import { Property, properties as fallbackProperties } from '@/data/properties';

const API_URL = 'https://api.gronisbrazil.com';

interface ApiFeature {
  id: number;
  name: string;
  name_ru: string;
  name_en: string;
  category: 'imovel' | 'infraestrutura';
}

interface ApiProperty {
  id: number;
  title: string;
  slug?: string;
  description: string;
  price: string;
  price_usd: string;
  list_price?: string;
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
  features?: ApiFeature[];
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
  if (!priceUsd || priceUsd === 'None' || priceUsd === 'N/A' || priceUsd.trim() === '') return 0;
  const cleaned = priceUsd.replace(/,/g, '').replace(/\./g, '');
  const match = cleaned.match(/(\d+)/);
  return match ? Number(match[1]) : 0;
}

// Format BRL price
function formatBrl(num: number): string {
  return `R$ ${num.toLocaleString('pt-BR')}`;
}

function mapApiProperty(p: ApiProperty, index: number): Property {
  // Use price first, fallback to list_price from DB
  const priceBrl = parsePriceBrl(p.price) || parsePriceBrl(p.list_price);
  let priceUsdNum = parseUsdNum(p.price_usd);
  if (!priceUsdNum && priceBrl > 0) {
    priceUsdNum = Math.round(priceBrl / 5.5);
  }

  // Format price display strings
  let priceDisplay = '';
  let priceUsdDisplay = '';
  if (priceBrl > 0) {
    priceDisplay = formatBrl(priceBrl);
  }
  if (p.price_usd) {
    priceUsdDisplay = p.price_usd.startsWith('$') ? p.price_usd : '$' + p.price_usd;
  } else if (priceUsdNum > 0) {
    priceUsdDisplay = '$' + priceUsdNum.toLocaleString();
  }

  // Smart type mapping: override to investment when tag signals it
  const tag = (p.tag || '').toLowerCase();
  const isInvestment = tag.includes('pre-sale') || tag.includes('pre-launch') ||
                       tag.includes('investment') || tag.includes('sold out') ||
                       tag.includes('roi') || (p.expected_roi && p.expected_roi.length > 0);
  let mappedType = isInvestment ? 'investment' : mapType(p.type);

  // Images from API — objects without images will be filtered out upstream
  const images = p.images?.length ? p.images.map(img => img.url) : [];

  return {
    id: p.id,
    title: p.title,
    slug: p.slug || undefined,
    location: p.location || p.region || '',
    region: p.region || p.location || '',
    price: priceDisplay,
    priceUsd: priceUsdDisplay,
    priceBrl,
    priceUsdNum,
    beds: p.beds || 0,
    baths: p.baths || 0,
    area: p.area ? `${String(p.area).replace(/\s*m[²2]?\s*$/i, '')} m²` : '',
    areaNum: parseInt(p.area) || 0,
    type: mappedType,
    tag: p.tag || p.type || 'New',
    gradient: gradients[index % gradients.length],
    description: p.description || '',
    expectedROI: p.expected_roi || '',
    images,
    features: (p.features || []).map(f => f.name),
    featuresGrouped: {
      imovel: (p.features || []).filter(f => f.category === 'imovel').map(f => ({ name: f.name, name_ru: f.name_ru, name_en: f.name_en })),
      infraestrutura: (p.features || []).filter(f => f.category === 'infraestrutura').map(f => ({ name: f.name, name_ru: f.name_ru, name_en: f.name_en })),
    },
  };
}

export async function fetchProperties(): Promise<Property[]> {
  try {
    console.log('[API] Fetching from:', `${API_URL}/api/properties?limit=100`);
    
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      controller.abort();
      console.log('[API] Request timed out after 8s');
    }, 8000);
    
    const res = await fetch(`${API_URL}/api/properties?limit=100`, {
      signal: controller.signal,
      cache: 'no-store',
    });
    clearTimeout(timeout);
    
    console.log('[API] Response status:', res.status);
    
    if (!res.ok) throw new Error(`API ${res.status}`);
    
    const data = await res.json();
    console.log('[API] Parsed JSON, keys:', Object.keys(data));
    
    const apiProperties: ApiProperty[] = data.data || [];
    
    // Blocklist of incomplete properties to hide from site
    const blocklist = ['spot-ii', 'spot-iii', 'marena', 'la mare campeche', 'la esmeralda', 'blue diamond home club'];
    
    // Only use API properties that are active AND have at least one image AND not blocklisted
    const withImages = apiProperties.filter((p: ApiProperty) => {
      if (p.status !== 'active') return false;
      if (p.images && p.images.length === 0) return false;
      const slug = (p.slug || '').toLowerCase();
      const title = p.title.toLowerCase();
      if (blocklist.some(b => slug.includes(b) || title.includes(b))) return false;
      return true;
    });
    
    console.log(`[API] Got ${apiProperties.length} total, ${withImages.length} with images`);
    
    return withImages.map((p: ApiProperty, i: number) => mapApiProperty(p, i));
  } catch (err: any) {
    console.warn('[API] Failed to fetch properties, using fallback:', err?.message || err, err?.name);
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
