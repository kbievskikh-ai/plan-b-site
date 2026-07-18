// Серверный доступ к отчётам. Без cache:'no-store' → данные попадают в HTML.

const API_URL = 'https://plan-b-admin-api-production.up.railway.app';

export interface ResearchItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  coverImage: string;
  publishedAt: string;
  externalUrl: string;
  pdfUrl: string;
  featured: boolean;
}

export const SECTIONS: Record<
  string,
  { iconKey: string; en: string; ru: string; pt: string; categories: string[]; seoDescription: string }
> = {
  'market-reports': {
    iconKey: 'MarketReports',
    en: 'Market Reports & Forecasts',
    ru: 'Рыночные отчёты и прогнозы',
    pt: 'Relatórios de Mercado',
    categories: ['Market Report'],
    seoDescription:
      'Independent market reports and forecasts for Santa Catarina real estate: pricing trends, rental yields, supply and demand, and 2027 outlook.',
  },
  'city-reports': {
    iconKey: 'CityReports',
    en: 'City Reports',
    ru: 'Городские отчёты',
    pt: 'Relatórios por Cidade',
    categories: ['Region Analysis', 'City Report'],
    seoDescription:
      'City-by-city investment analysis across Santa Catarina: Florianópolis, Balneário Camboriú, Itapema, Porto Belo, Bombinhas and more.',
  },
  'district-guides': {
    iconKey: 'DistrictGuides',
    en: 'District Guides',
    ru: 'Гайды по районам',
    pt: 'Guias por Bairro',
    categories: ['Investment Guide', 'District Guide'],
    seoDescription:
      'District-level guides for Florianópolis and coastal Santa Catarina: Jurerê, Campeche, Canasvieiras, Ingleses — pricing, demand, and yield analysis.',
  },
  'developer-reviews': {
    iconKey: 'DeveloperReviews',
    en: 'Developer Reviews',
    ru: 'Обзоры застройщиков',
    pt: 'Análise de Desenvolvedores',
    categories: ['Developer Review'],
    seoDescription:
      'Independent reviews of Santa Catarina property developers: track record, delivery history, financial reliability, and construction quality.',
  },
  guides: {
    iconKey: 'GuidesResources',
    en: 'Guides & Resources',
    ru: 'Гайды и ресурсы',
    pt: 'Guias e Recursos',
    categories: ['Tax & Legal', 'Relocation'],
    seoDescription:
      'Practical guides for foreign buyers in Brazil: taxes, legal process, CPF, investor visa, and relocation to Santa Catarina.',
  },
};

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export type ResearchLang = 'en' | 'ru' | 'pt';

/**
 * Ручные переопределения slug по EN title, когда авто-slugify даёт не тот URL, какой нужен
 * (например, когда требуется транслитерация в slug вместо английского текста). Ключ — точный
 * EN title в базе. Не влияет на сам title — только на URL.
 */
const SLUG_OVERRIDES: Record<string, string> = {
  'Brazil Residency Through Real Estate 2026': 'vnzh-braziliya-nedvizhimost',
  'Can You Pay for Brazilian Real Estate in Cryptocurrency 2026': 'oplata-kriptovalyutoy-nedvizhimost-braziliya',
  'Capital Gains Tax on Real Estate Sales in Brazil 2026: 15% and How to Legally Avoid It': 'nalog-prodazha-nedvizhimost-braziliya',
  'Rio, São Paulo, or Southern Brazil: Where Investment Actually Performs Better': 'gde-kupit-nedvizhimost-braziliya',
};

// Версия кэша: Vercel Data Cache (fetch-кэш) переживает между деплоями, поэтому одинаковый URL может отдавать
// старый ответ даже после нового деплоя, если старый fetch с тем же URL уже был закэширован в
// предыдущем деплое. Бумпнуть это число при следующем деплое, если опять видишь старые данные
// после изменения в research API.
const RESEARCH_CACHE_BUSTER = 3;

async function fetchResearchRaw(lang: ResearchLang): Promise<any[]> {
  const res = await fetch(`${API_URL}/api/research?limit=50&lang=${lang}&_v=${RESEARCH_CACHE_BUSTER}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  const data = await res.json();
  return (data?.data || []).filter((r: any) => (r.status || 'published') !== 'draft');
}

/**
 * Все опубликованные отчёты, локализованные под `lang`. Кеш 1 час → страницы можно пре-рендерить.
 *
 * Slug ВСЕГДА считается от английского title (стабильный идентификатор для URL/sitemap),
 * даже когда контент запрошен на русском — иначе slugify() от кириллицы даёт пустую строку.
 */
export async function getAllResearch(lang: ResearchLang = 'en'): Promise<ResearchItem[]> {
  try {
    const enRaw = lang === 'en' ? null : await fetchResearchRaw('en');
    const raw = lang === 'en' ? await fetchResearchRaw('en') : await fetchResearchRaw(lang);

    const slugById = new Map<string, string>();
    (enRaw || raw).forEach((r: any) => {
      const enTitle = String(r.title || '');
      slugById.set(String(r.id), SLUG_OVERRIDES[enTitle] || slugify(enTitle));
    });

    return raw
      .map((r: any) => ({
        id: String(r.id || ''),
        slug: slugById.get(String(r.id)) || slugify(String(r.title || '')),
        title: String(r.title || ''),
        description: String(r.description || ''),
        category: String(r.category || ''),
        coverImage: String(r.cover_image || ''),
        publishedAt: String(r.published_at || ''),
        externalUrl: String(r.external_url || ''),
        pdfUrl: String(r.pdf_url || ''),
        featured: Boolean(r.featured),
      }))
      .sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      });
  } catch (err) {
    console.warn('[research-server] fetch failed:', err);
    return [];
  }
}

export async function getResearchBySection(section: string, lang: ResearchLang = 'en'): Promise<ResearchItem[]> {
  const sectionData = SECTIONS[section];
  if (!sectionData) return [];
  const all = await getAllResearch(lang);
  return all.filter((r) => sectionData.categories.includes(r.category));
}

export async function getResearchBySlug(slug: string, lang: ResearchLang = 'en'): Promise<ResearchItem | null> {
  const all = await getAllResearch(lang);
  return all.find((r) => r.slug === slug) || null;
}
