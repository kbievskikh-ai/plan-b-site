'use client';

// Эта обёртка содержит ровно то, что раньше было в page.tsx.
// Весь интерактив (языки, localStorage, загрузка данных) остаётся без изменений.
// Разница: page.tsx теперь СЕРВЕРНЫЙ и рендерит контент в HTML для краулеров,
// а этот компонент рисует интерфейс поверх — для людей.

import { useState, useEffect } from 'react';
import ProjectPageClient from './ProjectPageClient';

const NAVY = '#1B2951';
const GOLD = '#D4AF37';
const LANG_KEY = 'planb_lang';

type Lang = 'en' | 'ru' | 'pt' | 'es';

const LANGUAGES: { code: Lang; flag: string; name: string; native: string }[] = [
  { code: 'en', flag: '🇬🇧', name: 'English', native: 'English' },
  { code: 'ru', flag: '🇷🇺', name: 'Russian', native: 'Русский' },
  { code: 'pt', flag: '🇧🇷', name: 'Portuguese', native: 'Português' },
  { code: 'es', flag: '🇪🇸', name: 'Spanish', native: 'Español' },
];

export default function ProjectPageWrapper({ slug }: { slug: string }) {
  const [lang, setLang] = useState<Lang | null>(null);
  const [property, setProperty] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);

  // Check saved language on mount
  useEffect(() => {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved && ['en', 'ru', 'pt', 'es'].includes(saved)) {
      setLang(saved as Lang);
    }
  }, []);

  // Fallback property data for projects not yet in API
  const FALLBACK_PROJECTS: Record<string, Record<string, unknown>> = {
    'spot-ii': {
      id: '9',
      title: 'SPOT II Jurerê',
      slug: 'spot-ii',
      project_name: 'SPOT II Jurerê',
      description: 'Micro-unit development in the heart of Jurerê, designed for short-term rental. 87% sold out — only 5 units remaining. Delivery June 2029. Net yield up to 14.3%.',
      short_description_en: 'Micro-units in the heart of Jurerê, 87% sold out. Perfect for short-term rental.',
      short_description_ru: 'Микро-юниты в сердце Журере, 87% продано. Идеально для краткосрочной аренды.',
      category: 'residential',
      list_price: 399000,
      location: 'Jurerê, Florianópolis',
      region: 'Santa Catarina',
      city: 'Florianópolis',
      status: 'active',
      tag: '87% Sold Out',
      delivery_year: 2029,
      expected_roi: '10-14%',
      latitude: -27.1089,
      longitude: -48.4748,
      features: [
        { id: 1, name: 'Designed for short-term rental', name_ru: 'Проект для краткосрочной аренды', category: 'imovel' },
        { id: 2, name: 'Micro-units 15-29 m²', name_ru: 'Микро-юниты 15-29 м²', category: 'imovel' },
        { id: 3, name: 'CUB/SC indexed pricing', name_ru: 'Цены привязаны к CUB/SC', category: 'imovel' },
        { id: 4, name: 'Construction-phase payments', name_ru: 'Оплата в процессе строительства', category: 'imovel' },
        { id: 5, name: 'Premium beach address', name_ru: 'Премиальный пляжный адрес', category: 'imovel' },
        { id: 6, name: '87% sold out', name_ru: '87% продано', category: 'imovel' },
      ],
      images: [],
      units: [
        { type: 'Type D', areaMin: 26, areaMax: 29, priceMin: 668000, priceMax: 740000, bedrooms: 0, bathrooms: 1 },
        { type: 'Type G', areaMin: 22, areaMax: 23, priceMin: 500000, priceMax: 550000, bedrooms: 0, bathrooms: 1 },
        { type: 'Type H', areaMin: 15, areaMax: 20, priceMin: 422000, priceMax: 506000, bedrooms: 0, bathrooms: 1 },
        { type: 'Type I', areaMin: 15, areaMax: 16, priceMin: 402000, priceMax: 480000, bedrooms: 0, bathrooms: 1 },
        { type: 'Type K', areaMin: 15, areaMax: 17, priceMin: 399000, priceMax: 530000, bedrooms: 0, bathrooms: 1 },
      ],
      down_payment_pct: 25,
      installments_count: 35,
      monthly_rent_estimate: 6000,
      yearly_growth_rate: 8,
    },
    'spot-iii': {
      id: '10',
      title: 'SPOT III Jurerê',
      slug: 'spot-iii',
      project_name: 'SPOT III Jurerê',
      description: 'Pre-launch micro-unit development by Seazone. 72 units, Rua Accácio Melo 64, Jurerê. Lowest entry in Jurerê from R$ 279K. Estimated +94% appreciation. Delivery March 2030.',
      short_description_en: 'Pre-launch micro-units from R$ 279K. Estimated +94% appreciation.',
      short_description_ru: 'Проект на стадии предзапуска от R$ 279K. Ожидаемый рост +94%.',
      category: 'residential',
      list_price: 279000,
      location: 'Jurerê, Florianópolis',
      region: 'Santa Catarina',
      city: 'Florianópolis',
      status: 'active',
      tag: 'Pre-Launch',
      delivery_year: 2030,
      expected_roi: '14%',
      latitude: -27.1089,
      longitude: -48.4748,
      features: [
        { id: 1, name: 'Pre-launch pricing', name_ru: 'Цены предзапуска', category: 'imovel' },
        { id: 2, name: '72 micro-units 15-47 m²', name_ru: '72 микро-юнита 15-47 м²', category: 'imovel' },
        { id: 3, name: 'Lowest entry R$ 279K', name_ru: 'Самый низкий вход R$ 279K', category: 'imovel' },
        { id: 4, name: '+94% estimated appreciation', name_ru: 'Ожидаемый рост +94%', category: 'imovel' },
        { id: 5, name: 'CUB-indexed construction payments', name_ru: 'Оплата привязана к CUB', category: 'imovel' },
        { id: 6, name: 'Rua Accácio Melo 64, Jurerê', name_ru: 'Rua Accácio Melo 64, Журере', category: 'imovel' },
      ],
      images: [],
      units: [
        { type: 'Ground (L1-L3)', areaMin: 21, areaMax: 22, priceMin: 279000, priceMax: 289000, bedrooms: 0, bathrooms: 1 },
        { type: 'Floor 1', areaMin: 23, areaMax: 34, priceMin: 437000, priceMax: 569000, bedrooms: 0, bathrooms: 1 },
        { type: 'Floor 2', areaMin: 15, areaMax: 29, priceMin: 374000, priceMax: 506000, bedrooms: 0, bathrooms: 1 },
        { type: 'Floor 3', areaMin: 15, areaMax: 45, priceMin: 385000, priceMax: 560000, bedrooms: 0, bathrooms: 1 },
        { type: 'Floor 4', areaMin: 15, areaMax: 24, priceMin: 395000, priceMax: 560000, bedrooms: 0, bathrooms: 1 },
        { type: 'Floor 5', areaMin: 15, areaMax: 24, priceMin: 406000, priceMax: 581000, bedrooms: 0, bathrooms: 1 },
        { type: 'Penthouse (Floor 6)', areaMin: 19, areaMax: 41, priceMin: 530000, priceMax: 635000, bedrooms: 0, bathrooms: 1 },
      ],
      down_payment_pct: 25,
      installments_count: 41,
      monthly_rent_estimate: 5000,
      yearly_growth_rate: 10,
    },
  };

  // Fetch property when language is selected
  useEffect(() => {
    if (!lang || !slug) return;
    setLoading(true);
    // First check fallback projects
    if (FALLBACK_PROJECTS[slug]) {
      setProperty(FALLBACK_PROJECTS[slug]);
      setLoading(false);
      return;
    }
    // Fetch all properties and filter by slug
    fetch('https://api.planbbrazil.com/api/properties?limit=200')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        const all = data?.data || [];
        const found = all.find((p: any) => p.slug === slug);
        setProperty(found || null);
        setLoading(false);
      })
      .catch(() => { setProperty(null); setLoading(false); });
  }, [lang, slug]);

  const selectLang = (code: Lang) => {
    localStorage.setItem(LANG_KEY, code);
    setLang(code);
  };

  // Language selection screen
  if (!lang) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${NAVY} 0%, #2a3f75 50%, ${NAVY} 100%)`,
        padding: 24,
      }}>
        <div style={{ marginBottom: 48, textAlign: 'center' }}>
          <div style={{ width: 56, height: 56, background: `linear-gradient(135deg, ${GOLD}, #c4a035)`, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
            <span style={{ color: '#fff', fontWeight: 800, fontSize: 28 }}>B</span>
          </div>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: 20, letterSpacing: 2, marginBottom: 4 }}>
            Plan B
          </div>
          <div style={{ color: '#8899bb', fontSize: 11, letterSpacing: 3 }}>
            INTERNATIONAL REAL ESTATE
          </div>
        </div>

        <div style={{ color: '#ccc', fontSize: 16, marginBottom: 32, textAlign: 'center' }}>
          Choose your language
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%', maxWidth: 320 }}>
          {LANGUAGES.map(l => (
            <button
              key={l.code}
              onClick={() => selectLang(l.code)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: '18px 28px',
                borderRadius: 12,
                border: '1px solid rgba(212,175,55,0.3)',
                background: 'rgba(255,255,255,0.05)',
                color: '#fff',
                fontSize: 17,
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s',
                backdropFilter: 'blur(4px)',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(212,175,55,0.15)';
                e.currentTarget.style.borderColor = GOLD;
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <span style={{ fontSize: 28 }}>{l.flag}</span>
              <span>{l.native}</span>
            </button>
          ))}
        </div>

        <div style={{ marginTop: 48, color: '#556', fontSize: 11 }}>
          You can change language later
        </div>
      </div>
    );
  }

  // Loading
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f3ed' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: GOLD, fontSize: 18 }}>Loading project...</div>
        </div>
      </div>
    );
  }

  // Not found
  if (!property) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f3ed' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: GOLD, fontSize: 64, fontWeight: 900 }}>404</div>
          <h1 style={{ color: NAVY, fontSize: 24, fontWeight: 700 }}>Project not found</h1>
          <a href="/" style={{ color: GOLD, marginTop: 24, display: 'inline-block' }}>← Back to Plan B</a>
        </div>
      </div>
    );
  }

  return <ProjectPageClient property={property} slug={slug} />;
}
