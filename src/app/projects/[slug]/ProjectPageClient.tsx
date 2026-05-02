'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';

type Lang = 'en' | 'ru' | 'pt';

const T: Record<Lang, Record<string, string>> = {
  en: {
    backToSite: '← Back to GRONIS',
    overview: 'Overview',
    gallery: 'Gallery',
    units: 'Apartments',
    amenities: 'Amenities',
    location: 'Location',
    investment: 'Investment',
    contact: 'Contact',
    sqm: 'sqm',
    suites: 'suites',
    parking: 'parking',
    from: 'from',
    floor: 'Floor',
    garden: 'Garden',
    penthouse: 'Penthouse',
    available: 'Available',
    sold: 'Sold',
    reserved: 'Reserved',
    allUnits: 'All',
    downloadPdf: 'Download PDF',
    requestInfo: 'Request Details',
    scheduleCall: 'Schedule a Call',
    whatsappUs: 'WhatsApp Us',
    shareLink: 'Copy Link',
    linkCopied: 'Link copied!',
    roiTitle: 'Investment Analysis',
    purchasePrice: 'Purchase Price',
    monthlyRent: 'Est. Monthly Rent',
    annualYield: 'Annual Rental Yield',
    fiveYearGrowth: '5-Year Appreciation',
    fiveYearRoi: 'Total 5-Year ROI',
    deliveryDate: 'Delivery',
    developer: 'Developer',
    totalArea: 'Total Area',
    projectDetails: 'Project Details',
    keyFeatures: 'Key Features',
    notFound: 'Project not found',
    notFoundDesc: 'The project you are looking for does not exist or has been removed.',
    totalUnits: 'Total units',
    floors: 'floors',
    towers: 'towers',
    priceRange: 'Price range',
    areaRange: 'Area range',
    viewOnMap: 'View on Google Maps',
    currencyDisclaimer: 'USD estimates at 5.3 BRL/USD. Actual rate may vary.',
  },
  ru: {
    backToSite: '← Вернуться на GRONIS',
    overview: 'Обзор',
    gallery: 'Галерея',
    units: 'Квартиры',
    amenities: 'Инфраструктура',
    location: 'Локация',
    investment: 'Инвестиции',
    contact: 'Контакт',
    sqm: 'м²',
    suites: 'сьютов',
    parking: 'парковок',
    from: 'от',
    floor: 'Этаж',
    garden: 'Сад',
    penthouse: 'Пентхаус',
    available: 'Доступно',
    sold: 'Продано',
    reserved: 'Забронировано',
    allUnits: 'Все',
    downloadPdf: 'Скачать PDF',
    requestInfo: 'Запросить детали',
    scheduleCall: 'Назначить звонок',
    whatsappUs: 'WhatsApp',
    shareLink: 'Скопировать ссылку',
    linkCopied: 'Ссылка скопирована!',
    roiTitle: 'Инвестиционный анализ',
    purchasePrice: 'Цена покупки',
    monthlyRent: 'Ожидаемая аренда/мес',
    annualYield: 'Годовая арендная доходность',
    fiveYearGrowth: 'Рост за 5 лет',
    fiveYearRoi: 'Общий ROI за 5 лет',
    deliveryDate: 'Сдача',
    developer: 'Застройщик',
    totalArea: 'Общая площадь',
    projectDetails: 'Детали проекта',
    keyFeatures: 'Ключевые характеристики',
    notFound: 'Проект не найден',
    notFoundDesc: 'Запрашиваемый проект не существует или был удалён.',
    totalUnits: 'Всего юнитов',
    floors: 'этажей',
    towers: 'башни',
    priceRange: 'Ценовой диапазон',
    areaRange: 'Диапазон площадей',
    viewOnMap: 'Смотреть на Google Maps',
    currencyDisclaimer: 'Оценки в USD по курсу 5.3 BRL/USD. Фактический курс может отличаться.',
  },
  pt: {
    backToSite: '← Voltar para GRONIS',
    overview: 'Visão Geral',
    gallery: 'Galeria',
    units: 'Apartamentos',
    amenities: 'Amenidades',
    location: 'Localização',
    investment: 'Investimento',
    contact: 'Contato',
    sqm: 'm²',
    suites: 'suítes',
    parking: 'vagas',
    from: 'a partir de',
    floor: 'Andar',
    garden: 'Jardim',
    penthouse: 'Cobertura',
    available: 'Disponível',
    sold: 'Vendido',
    reserved: 'Reservado',
    allUnits: 'Todos',
    downloadPdf: 'Baixar PDF',
    requestInfo: 'Solicitar Detalhes',
    scheduleCall: 'Agendar Ligação',
    whatsappUs: 'WhatsApp',
    shareLink: 'Copiar Link',
    linkCopied: 'Link copiado!',
    roiTitle: 'Análise de Investimento',
    purchasePrice: 'Preço de Compra',
    monthlyRent: 'Aluguel Mensal Estimado',
    annualYield: 'Yield Anual de Aluguel',
    fiveYearGrowth: 'Valorização em 5 Anos',
    fiveYearRoi: 'ROI Total em 5 Anos',
    deliveryDate: 'Entrega',
    developer: 'Incorporadora',
    totalArea: 'Área Total',
    projectDetails: 'Detalhes do Projeto',
    keyFeatures: 'Características Principais',
    notFound: 'Projeto não encontrado',
    notFoundDesc: 'O projeto que você procura não existe ou foi removido.',
    totalUnits: 'Total de unidades',
    floors: 'andares',
    towers: 'torres',
    priceRange: 'Faixa de preço',
    areaRange: 'Faixa de área',
    viewOnMap: 'Ver no Google Maps',
    currencyDisclaimer: 'Estimativas em USD a 5.3 BRL/USD. Taxa real pode variar.',
  },
};

const NAVY = '#1B2951';
const GOLD = '#D4AF37';

function formatBrl(n: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(n);
}

function formatUsd(n: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

function brlToUsd(brl: number): number {
  return Math.round(brl / 5.3);
}

interface ImageData {
  url: string;
  publicId?: string;
}

interface Feature {
  id: number;
  name: string;
  name_ru?: string;
  name_en?: string;
  category?: string;
}

interface Unit {
  type: string;
  areaMin: number;
  areaMax: number;
  priceMin: number;
  priceMax: number;
}

interface PropertyData {
  id: string;
  title?: string;
  slug?: string;
  project_name?: string;
  description?: string;
  short_description_en?: string;
  short_description_ru?: string;
  full_description_en?: string;
  full_description_ru?: string;
  category?: string;
  list_price?: number;
  price_usd?: string;
  location?: string;
  region?: string;
  district?: string;
  city?: string;
  full_address?: string;
  latitude?: number;
  longitude?: number;
  type?: string;
  status?: string;
  images?: ImageData[];
  beds?: number;
  baths?: number;
  built_area?: number;
  total_area?: number;
  parking_spaces?: number;
  floor?: number;
  delivery_year?: number;
  expected_roi?: string;
  tag?: string;
  features?: Feature[];
  units?: Unit[];
  monthly_rent_estimate?: number;
  yearly_growth_rate?: number;
  roi_percentage?: number;
  forecast1y?: number;
  forecast3y?: number;
  forecast5y?: number;
  video_url?: string;
  virtual_tour_url?: string;
  price_per_m2?: number;
}

export default function ProjectPageClient({ property, slug }: { property: PropertyData | null; slug: string }) {
  const [lang, setLang] = useState<Lang>('en');
  const [activeTab, setActiveTab] = useState('overview');
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [unitFilter, setUnitFilter] = useState('all');

  const t = T[lang];

  useEffect(() => {
    const saved = localStorage.getItem('gronis_lang');
    if (saved && T[saved as Lang]) setLang(saved as Lang);
  }, []);

  const setLangAndSave = (l: Lang) => {
    setLang(l);
    localStorage.setItem('gronis_lang', l);
  };

  const copyLink = useCallback(() => {
    navigator.clipboard.writeText(`https://gronisbrazil.com/projects/${slug}`);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  }, [slug]);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#f5f3ed' }}>
        <div className="text-center">
          <div style={{ color: GOLD, fontSize: 64, fontWeight: 900 }}>404</div>
          <h1 style={{ color: NAVY, fontSize: 24, fontWeight: 700 }}>{t.notFound}</h1>
          <p style={{ color: '#777', marginTop: 8 }}>{t.notFoundDesc}</p>
          <a href="/" style={{ color: GOLD, marginTop: 24, display: 'inline-block' }}>{t.backToSite}</a>
        </div>
      </div>
    );
  }

  const images = property.images || [];
  const features = property.features || [];
  const units = property.units || [];
  const projectName = property.project_name || property.title || 'Project';
  const description = lang === 'ru' ? (property.full_description_ru || property.short_description_ru || property.description) :
                      lang === 'pt' ? property.description :
                      (property.full_description_en || property.short_description_en || property.description);
  const shortDesc = lang === 'ru' ? property.short_description_ru :
                    lang === 'pt' ? property.description :
                    property.short_description_en;

  const tabs = [
    { key: 'overview', label: t.overview },
    { key: 'gallery', label: t.gallery },
    ...(units.length > 0 ? [{ key: 'units', label: t.units }] : []),
    ...(features.length > 0 ? [{ key: 'amenities', label: t.amenities }] : []),
    ...(property.latitude ? [{ key: 'location', label: t.location }] : []),
    ...(property.list_price ? [{ key: 'investment', label: t.investment }] : []),
  ];

  const statusColors: Record<string, { bg: string; text: string }> = {
    active: { bg: '#dcfce7', text: '#166534' },
    sold: { bg: '#fee2e2', text: '#991b1b' },
    reserved: { bg: '#fef3c7', text: '#92400e' },
    draft: { bg: '#f3f4f6', text: '#6b7280' },
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#f5f3ed', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: NAVY, color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', height: 56,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <a href="/" style={{ color: GOLD, fontWeight: 800, fontSize: 14, letterSpacing: 4, textDecoration: 'none' }}>
            G R O N I S
          </a>
          <span style={{ color: '#555', fontSize: 10 }}>|</span>
          <span style={{ color: '#aaa', fontSize: 12, letterSpacing: 1 }}>{t.backToSite}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {(['en', 'ru', 'pt'] as Lang[]).map(l => (
            <button
              key={l}
              onClick={() => setLangAndSave(l)}
              style={{
                padding: '4px 10px',
                borderRadius: 4,
                border: 'none',
                cursor: 'pointer',
                fontWeight: lang === l ? 700 : 400,
                background: lang === l ? GOLD : 'transparent',
                color: lang === l ? NAVY : '#aaa',
                fontSize: 12,
              }}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      {/* Hero */}
      <div style={{
        position: 'relative',
        height: 420,
        background: images.length > 0 ? `url(${images[0].url}) center/cover` : `linear-gradient(135deg, ${NAVY}, #2a3f75)`,
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '32px 48px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            {property.status && (
              <span style={{
                padding: '3px 10px', borderRadius: 4, fontSize: 11, fontWeight: 700,
                background: statusColors[property.status]?.bg || '#f3f4f6',
                color: statusColors[property.status]?.text || '#6b7280',
              }}>
                {t[property.status as keyof typeof t] || property.status}
              </span>
            )}
            {property.tag && (
              <span style={{ color: GOLD, fontSize: 12, fontWeight: 600 }}>{property.tag}</span>
            )}
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 42, fontWeight: 700, color: '#fff', marginBottom: 8,
          }}>
            {projectName}
          </h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, color: '#ccc', fontSize: 14 }}>
            {property.location && <span>📍 {property.location}</span>}
            {property.delivery_year && <span>📅 {t.deliveryDate}: {property.delivery_year}</span>}
            {property.list_price && <span style={{ color: GOLD, fontWeight: 700 }}>{formatBrl(property.list_price)}</span>}
          </div>
        </div>
      </div>

      {/* Tab Nav */}
      <div style={{
        background: '#fff',
        borderBottom: '1px solid #e5e5e5',
        display: 'flex', gap: 0, overflowX: 'auto',
        padding: '0 48px',
      }}>
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: '14px 20px',
              border: 'none', background: 'none', cursor: 'pointer',
              fontSize: 13, fontWeight: activeTab === tab.key ? 700 : 400,
              color: activeTab === tab.key ? NAVY : '#888',
              borderBottom: activeTab === tab.key ? `2px solid ${GOLD}` : '2px solid transparent',
              whiteSpace: 'nowrap',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 48px' }}>
        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div>
            {/* Key Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 32 }}>
              {property.built_area && (
                <StatCard label={t.totalArea} value={`${property.built_area} ${t.sqm}`} />
              )}
              {property.beds && (
                <StatCard label={`${property.beds} ${t.suites}`} value={`${property.beds}`} />
              )}
              {property.parking_spaces && (
                <StatCard label={t.parking} value={`${property.parking_spaces}`} />
              )}
              {property.delivery_year && (
                <StatCard label={t.deliveryDate} value={`${property.delivery_year}`} />
              )}
            </div>

            {/* Description */}
            {description && (
              <div style={{ background: '#fff', borderRadius: 12, padding: 32, marginBottom: 24, border: '1px solid #e5e5e5' }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: NAVY, marginBottom: 16, fontFamily: "'Playfair Display', serif" }}>
                  {t.projectDetails}
                </div>
                <p style={{ color: '#555', lineHeight: 1.8, fontSize: 14, whiteSpace: 'pre-line' }}>{description}</p>
              </div>
            )}

            {/* Key Features */}
            {features.length > 0 && (
              <div style={{ background: '#fff', borderRadius: 12, padding: 32, border: '1px solid #e5e5e5' }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: NAVY, marginBottom: 16, fontFamily: "'Playfair Display', serif" }}>
                  {t.keyFeatures}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 10 }}>
                  {features.map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#444' }}>
                      <span style={{ color: GOLD, fontSize: 16 }}>✓</span>
                      {lang === 'ru' ? (f.name_ru || f.name) : lang === 'pt' ? f.name : (f.name_en || f.name)}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* GALLERY */}
        {activeTab === 'gallery' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
              {images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => { setGalleryIndex(i); setShowGallery(true); }}
                  style={{
                    borderRadius: 12,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    aspectRatio: '4/3',
                    background: `url(${img.url}) center/cover`,
                    border: '1px solid #e5e5e5',
                    transition: 'transform 0.2s',
                  }}
                />
              ))}
            </div>
            {images.length === 0 && (
              <div style={{ textAlign: 'center', color: '#999', padding: 60 }}>
                {lang === 'ru' ? 'Фотографии скоро будут добавлены' : lang === 'pt' ? 'Fotos em breve' : 'Photos coming soon'}
              </div>
            )}
          </div>
        )}

        {/* UNITS */}
        {activeTab === 'units' && units.length > 0 && (
          <div>
            <div style={{ display: 'grid', gap: 16 }}>
              {units.map((u, i) => (
                <div key={i} style={{
                  background: '#fff', borderRadius: 12, padding: 24,
                  border: '1px solid #e5e5e5',
                  display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 16, alignItems: 'center',
                }}>
                  <div>
                    <div style={{ fontWeight: 700, color: NAVY, fontSize: 16 }}>{u.type}</div>
                    <div style={{ color: '#888', fontSize: 12, marginTop: 4 }}>{u.areaMin === u.areaMax ? `${u.areaMin} ${t.sqm}` : `${u.areaMin}–${u.areaMax} ${t.sqm}`}</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: 700, color: NAVY }}>{formatBrl(u.priceMin)}</div>
                    <div style={{ color: '#888', fontSize: 12 }}>{formatUsd(brlToUsd(u.priceMin))} USD</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: 600, color: '#666', fontSize: 13 }}>
                      {u.priceMin !== u.priceMax ? `${formatBrl(u.priceMax)}` : ''}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{
                      padding: '6px 16px', borderRadius: 6, fontSize: 12, fontWeight: 700,
                      background: GOLD, color: NAVY, cursor: 'pointer',
                    }}>
                      {t.requestInfo}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ color: '#999', fontSize: 11, marginTop: 16, textAlign: 'center' }}>{t.currencyDisclaimer}</p>
          </div>
        )}

        {/* AMENITIES */}
        {activeTab === 'amenities' && features.length > 0 && (
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12,
          }}>
            {features.map((f, i) => {
              const name = lang === 'ru' ? (f.name_ru || f.name) : lang === 'pt' ? f.name : (f.name_en || f.name);
              return (
                <div key={i} style={{
                  background: '#fff', borderRadius: 10, padding: '16px 20px',
                  border: '1px solid #e5e5e5', display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <span style={{ color: GOLD, fontSize: 18 }}>✦</span>
                  <span style={{ fontSize: 13, color: '#444' }}>{name}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* LOCATION */}
        {activeTab === 'location' && property.latitude && (
          <div>
            <div style={{
              background: '#fff', borderRadius: 12, overflow: 'hidden',
              border: '1px solid #e5e5e5', marginBottom: 16,
            }}>
              <iframe
                src={`https://maps.google.com/maps?q=${property.latitude},${property.longitude}&z=15&output=embed`}
                width="100%"
                height="400"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
            {property.full_address && (
              <p style={{ color: '#666', fontSize: 13 }}>📍 {property.full_address}</p>
            )}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${property.latitude},${property.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: GOLD, fontSize: 13, fontWeight: 600 }}
            >
              {t.viewOnMap} →
            </a>
          </div>
        )}

        {/* INVESTMENT */}
        {activeTab === 'investment' && property.list_price && (
          <div>
            <div style={{
              background: `linear-gradient(135deg, ${NAVY}, #2a3f75)`, borderRadius: 12,
              padding: 32, color: '#fff', marginBottom: 24,
            }}>
              <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 24, fontFamily: "'Playfair Display', serif" }}>
                {t.roiTitle}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
                <div>
                  <div style={{ color: '#aaa', fontSize: 12, marginBottom: 4 }}>{t.purchasePrice}</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: GOLD }}>{formatBrl(property.list_price)}</div>
                  <div style={{ color: '#aaa', fontSize: 13 }}>{formatUsd(brlToUsd(property.list_price))} USD</div>
                </div>
                {property.monthly_rent_estimate && (
                  <div>
                    <div style={{ color: '#aaa', fontSize: 12, marginBottom: 4 }}>{t.monthlyRent}</div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: GOLD }}>{formatBrl(property.monthly_rent_estimate)}</div>
                    <div style={{ color: '#aaa', fontSize: 13 }}>{formatUsd(brlToUsd(property.monthly_rent_estimate))} USD</div>
                  </div>
                )}
                {property.roi_percentage && (
                  <div>
                    <div style={{ color: '#aaa', fontSize: 12, marginBottom: 4 }}>{t.annualYield}</div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: GOLD }}>{property.roi_percentage}%</div>
                  </div>
                )}
                {property.forecast5y && (
                  <div>
                    <div style={{ color: '#aaa', fontSize: 12, marginBottom: 4 }}>{t.fiveYearGrowth}</div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: GOLD }}>+{property.forecast5y}%</div>
                  </div>
                )}
              </div>
            </div>
            <p style={{ color: '#999', fontSize: 11, textAlign: 'center' }}>
              {lang === 'ru'
                ? '* Прогнозы основаны на исторических данных. Прошлые результаты не гарантируют будущих. Курс: 1 USD = R$5.30'
                : lang === 'pt'
                ? '* Projeções baseadas em dados históricos. Resultados passados não garantem resultados futuros. Câmbio: 1 USD = R$5.30'
                : '* Projections based on historical data. Past performance does not guarantee future results. Rate: 1 USD = R$5.30'}
            </p>
          </div>
        )}
      </div>

      {/* CTA Bar */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: '#fff', borderTop: '1px solid #e5e5e5',
        padding: '12px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
        zIndex: 40,
      }}>
        <button
          onClick={copyLink}
          style={{
            padding: '10px 20px', borderRadius: 8, border: '1px solid #e5e5e5',
            background: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: NAVY,
          }}
        >
          {linkCopied ? '✓ ' + t.linkCopied : t.shareLink}
        </button>
        <a
          href="https://wa.me/5548988117424"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '10px 24px', borderRadius: 8, border: 'none',
            background: '#25D366', color: '#fff', cursor: 'pointer',
            fontSize: 13, fontWeight: 700, textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: 6,
          }}
        >
          💬 {t.whatsappUs}
        </a>
      </div>

      {/* Gallery Modal */}
      <AnimatePresence>
        {showGallery && images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 60,
              background: 'rgba(0,0,0,0.9)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            onClick={() => setShowGallery(false)}
          >
            <button
              onClick={(e) => { e.stopPropagation(); setGalleryIndex((galleryIndex - 1 + images.length) % images.length); }}
              style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', fontSize: 32, borderRadius: 30, width: 50, height: 50, cursor: 'pointer' }}
            >
              ‹
            </button>
            <img
              src={images[galleryIndex].url}
              style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain', borderRadius: 8 }}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={(e) => { e.stopPropagation(); setGalleryIndex((galleryIndex + 1) % images.length); }}
              style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', fontSize: 32, borderRadius: 30, width: 50, height: 50, cursor: 'pointer' }}
            >
              ›
            </button>
            <div style={{ position: 'absolute', bottom: 20, color: '#aaa', fontSize: 13 }}>
              {galleryIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 10, padding: '18px 20px',
      border: '1px solid #e5e5e5', textAlign: 'center',
    }}>
      <div style={{ fontSize: 22, fontWeight: 700, color: '#D4AF37' }}>{value}</div>
      <div style={{ fontSize: 11, color: '#888', marginTop: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</div>
    </div>
  );
}
