// Серверный слой доступа к объектам.
// Отличие от src/lib/api.ts: здесь НЕТ cache:'no-store'.
// Данные кешируются Next'ом на 1 час → попадают в статический HTML → их видит краулер.

import { Property } from '@/data/properties';
import { fetchProperties } from '@/lib/api';

const API_URL = 'https://plan-b-admin-api-production.up.railway.app';

interface RawProperty {
  id: number;
  title: string;
  slug?: string;
  description?: string;
  price?: string;
  price_usd?: string;
  list_price?: string;
  location?: string;
  region?: string;
  images?: Array<{ url: string }>;
  status?: string;
  type?: string;
  beds?: number;
  baths?: number;
  area?: string;
  expected_roi?: string;
  tag?: string;
  features?: Array<{ name: string }>;
}

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

// Map raw API type strings to the landing page's three tab categories.
// Mirrors src/lib/api.ts mapType() so server-fetched and client-fetched
// data stay consistent (tab filters rely on this).
function mapType(type: string | undefined): 'residential' | 'investment' | 'vacation' {
  const typeMap: Record<string, 'residential' | 'investment' | 'vacation'> = {
    apartment: 'residential',
    house: 'residential',
    villa: 'vacation',
    penthouse: 'investment',
    land: 'investment',
    commercial: 'investment',
  };
  return typeMap[type || ''] || 'residential';
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parseNum(v: string | number | null | undefined): number {
  if (v === null || v === undefined || v === '') return 0;
  if (typeof v === 'number') return v;
  const m = String(v).replace(/[^0-9]/g, '');
  return m ? Number(m) : 0;
}

function mapRaw(p: RawProperty, index: number): Property {
  const priceBrl = parseNum(p.price) || parseNum(p.list_price);
  let priceUsdNum = parseNum(p.price_usd);
  if (!priceUsdNum && priceBrl > 0) priceUsdNum = Math.round(priceBrl / 5.5);

  // Same tag-based override as src/lib/api.ts so tab filters match client fetch.
  const tag = (p.tag || '').toLowerCase();
  const isInvestment = tag.includes('pre-sale') || tag.includes('pre-launch') ||
                       tag.includes('investment') || tag.includes('sold out') ||
                       tag.includes('roi') || !!(p.expected_roi && p.expected_roi.length > 0);
  const mappedType = isInvestment ? 'investment' : mapType(p.type);

  const priceUsdDisplay = p.price_usd
    ? p.price_usd.startsWith('$')
      ? p.price_usd
      : '$' + p.price_usd
    : priceUsdNum > 0
    ? '$' + priceUsdNum.toLocaleString('en-US')
    : '';

  return {
    id: p.id,
    title: p.title,
    slug: p.slug || slugify(p.title),
    location: p.location || p.region || '',
    region: p.region || p.location || '',
    price: priceBrl > 0 ? `R$ ${priceBrl.toLocaleString('pt-BR')}` : '',
    priceUsd: priceUsdDisplay,
    priceBrl,
    priceUsdNum,
    beds: p.beds || 0,
    baths: p.baths || 0,
    area: p.area ? `${String(p.area).replace(/\s*m[²2]?\s*$/i, '')} m²` : '',
    areaNum: parseInt(String(p.area || '0')) || 0,
    type: mappedType,
    tag: p.tag || 'New',
    gradient: gradients[index % gradients.length],
    description: p.description || '',
    expectedROI: p.expected_roi || '',
    images: (p.images || []).map((i) => i.url),
    features: (p.features || []).map((f) => f.name),
  };
}

/**
 * Все объекты, с серверным кешем на 1 час.
 * Именно этот вызов делает данные видимыми для поисковиков.
 */
export async function getAllProperties(): Promise<Property[]> {
  try {
    const res = await fetch(`${API_URL}/api/properties?limit=100`, {
      // ВАЖНО: не 'no-store'. Кешируем на час — иначе SSG/ISR не работает.
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`API ${res.status}`);

    const data = await res.json();
    const raw: RawProperty[] = data.data || [];

    const blocklist = [
      'spot-ii',
      'spot-iii',
      'marena',
      'la mare campeche',
      'la esmeralda',
      'blue diamond home club',
    ];

    return raw
      .filter((p) => {
        if (p.status !== 'active') return false;
        if (!p.images || p.images.length === 0) return false;
        const slug = (p.slug || '').toLowerCase();
        const title = (p.title || '').toLowerCase();
        if (blocklist.some((b) => slug.includes(b) || title.includes(b))) return false;
        return true;
      })
      .map((p, i) => mapRaw(p, i));
  } catch (err) {
    console.warn('[properties-server] fetch failed, falling back:', err);
    // Фолбэк на существующую логику (клиентский api.ts со своим fallback)
    return fetchProperties();
  }
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  const all = await getAllProperties();
  return all.find((p) => p.slug === slug) || null;
}
