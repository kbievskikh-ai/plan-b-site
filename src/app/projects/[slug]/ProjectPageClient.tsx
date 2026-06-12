'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';

type Lang = 'en' | 'ru' | 'pt' | 'es';

const T: Record<Lang, Record<string, string>> = {
  en: {
    backToSite: '← Back to Plan B',
    overview: 'Overview',
    gallery: 'Gallery',
    units: 'Apartments',
    amenities: 'Floor Plans',
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
    priceOnRequest: 'Price on request',
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
    backToSite: '← Вернуться на Plan B',
    overview: 'Обзор',
    gallery: 'Галерея',
    units: 'Квартиры',
    amenities: 'Планировки',
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
    priceOnRequest: 'Цена по запросу',
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
    backToSite: '← Voltar para Plan B',
    overview: 'Visão Geral',
    gallery: 'Galeria',
    units: 'Apartamentos',
    amenities: 'Plantas',
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
    priceOnRequest: 'Preço sob consulta',
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
  es: {
    backToSite: '← Volver a Plan B',
    overview: 'Resumen',
    gallery: 'Galería',
    units: 'Apartamentos',
    amenities: 'Planos',
    location: 'Ubicación',
    investment: 'Inversión',
    contact: 'Contacto',
    sqm: 'm²',
    suites: 'suites',
    parking: 'estacionamiento',
    from: 'desde',
    floor: 'Piso',
    garden: 'Jardín',
    penthouse: 'Penthouse',
    available: 'Disponible',
    sold: 'Vendido',
    reserved: 'Reservado',
    allUnits: 'Todos',
    downloadPdf: 'Descargar PDF',
    requestInfo: 'Solicitar Detalles',
    scheduleCall: 'Agendar Llamada',
    whatsappUs: 'WhatsApp',
    shareLink: 'Copiar Enlace',
    linkCopied: '¡Enlace copiado!',
    roiTitle: 'Análisis de Inversión',
    purchasePrice: 'Precio de Compra',
    priceOnRequest: 'Precio bajo consulta',
    monthlyRent: 'Alquiler Mensal Estimado',
    annualYield: 'Rendimiento Anual',
    fiveYearGrowth: 'Valorización a 5 Años',
    fiveYearRoi: 'ROI Total a 5 Años',
    deliveryDate: 'Entrega',
    developer: 'Desarrollador',
    totalArea: 'Área Total',
    projectDetails: 'Detalles del Proyecto',
    keyFeatures: 'Características Principales',
    notFound: 'Proyecto no encontrado',
    notFoundDesc: 'El proyecto que buscas no existe o ha sido eliminado.',
    totalUnits: 'Total de unidades',
    floors: 'pisos',
    towers: 'torres',
    priceRange: 'Rango de precios',
    areaRange: 'Rango de áreas',
    viewOnMap: 'Ver en Google Maps',
    currencyDisclaimer: 'Estimaciones en USD a 5.3 BRL/USD. El tipo de cambio real puede variar.',
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
  bedrooms: number;
  bathrooms: number;
  floorPlan?: string;
  label?: string;
  yieldPct?: number;
  growthRate?: number;
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

// FAQ generator
function getFAQ(property: PropertyData, lang: Lang): { q: string; a: string }[] {
  const projectName = property.project_name || property.title || 'Project';
  const deliveryYear = property.delivery_year || property.year_built;
  const downPct = property.down_payment_pct || 25;
  const installments = property.installments_count;
  const location = property.location || property.region || 'Florianópolis';

  if (lang === 'ru') return [
    { q: `Когда сдаётся ${projectName}?`, a: deliveryYear ? `Плановая сдача — ${deliveryYear} год. ${property.tag === 'Pre-sale' ? 'Проект находится на стадии предпродажи — лучшие цены именно сейчас.' : ''}` : 'Дата сдачи уточняется.' },
    { q: 'Где находится проект?', a: `${location}, Флорианополис, штат Санта-Катарина, Бразилия. Журере — самый престижный район острова с лучшей инфраструктурой и пляжами.` },
    { q: 'Какова схема оплаты?', a: `Первоначальный взнос ${downPct}%. ${installments ? `Дальше — рассрочка ${installments} месяцев напрямую от застройщика без банка и процентов.` : 'Доступна рассрочка от застройщика.'} Также возможно ипотечное финансирование через бразильские банки.` },
    { q: 'Могу ли я купить иностранцу?', a: 'Да, иностранные граждане могут свободно приобретать недвижимость в Бразилии. Вам понадобится CPF (бразильский ИНН) — мы поможем оформить.' },
    { q: 'Какой доход от аренды?', a: 'Журере — один из самых ликвидных районов Флорианополиса. Краткосрочная аренда через Airbnb приносит 5-7% годовых, долгосрочная — 4-5%. Мы помогаем с управлением.' },
    { q: 'Безопасно ли инвестировать?', a: 'Проект структурирован как SPE (Special Purpose Entity) — ваше имущество защищено отдельным юридическим лицом. Все договоры регистрируются в бразильском реестре недвижимости.' },
  ];

  if (lang === 'pt') return [
    { q: `Quando será a entrega do ${projectName}?`, a: deliveryYear ? `Previsão de entrega: ${deliveryYear}. ${property.tag === 'Pre-sale' ? 'O projeto está em pré-lançamento — os melhores preços estão disponíveis agora.' : ''}` : 'Data de entrega a confirmar.' },
    { q: 'Onde fica o empreendimento?', a: `${location}, Florianópolis, Santa Catarina, Brasil. Jurerê é o bairro mais prestigioso da ilha com a melhor infraestrutura e praias.` },
    { q: 'Qual é a forma de pagamento?', a: `Entrada de ${downPct}%. ${installments ? `Parcelamento direto da incorporadora em ${installments} meses sem banco e sem juros.` : 'Parcelamento direto da incorporadora disponível.'} Financiamento bancário também disponível.` },
    { q: 'Posso comprar sendo estrangeiro?', a: 'Sim, estrangeiros podem adquirir imóveis livremente no Brasil. É necessário CPF — ajudamos com todo o processo.' },
    { q: 'Qual a renda de aluguel?', a: 'Jurerê é um dos bairros mais líquidos de Florianópolis. Aluguel de temporada via Airbnb rende 5-7% ao ano, longo prazo — 4-5%. Oferecemos gestão de propriedade.' },
    { q: 'É seguro investir?', a: 'O projeto é estruturado como SPE (patrimônio separado). Todos os contratos são registrados no cartório de registro de imóveis do Brasil.' },
  ];

  if (lang === 'es') return [
    { q: `¿Cuándo se entrega ${projectName}?`, a: deliveryYear ? `Entrega estimada: ${deliveryYear}. ${property.tag === 'Pre-sale' ? 'El proyecto está en preventa — los mejores precios están disponibles ahora.' : ''}` : 'Fecha de entrega por confirmar.' },
    { q: '¿Dónde está ubicado el proyecto?', a: `${location}, Florianópolis, Santa Catarina, Brasil. Jurerê es el barrio más prestigioso de la isla con la mejor infraestructura y playas.` },
    { q: '¿Cuál es la estructura de pago?', a: `Anticipo: ${downPct}%. ${installments ? `Luego plan de cuotas de ${installments} meses directamente con el desarrollador — sin banco, sin intereses.` : 'Plan de cuotas del desarrollador disponible.'} Financiamiento bancario también disponible.` },
    { q: '¿Pueden comprar los extranjeros?', a: 'Sí, los extranjeros pueden comprar propiedades libremente en Brasil. Necesitarás un CPF (identificación fiscal brasileña) — te ayudamos con todo el proceso.' },
    { q: '¿Qué ingreso por alquiler puedo esperar?', a: 'Jurerê es uno de los barrios más líquidos de Florianópolis. Alquiler temporal por Airbnb rinde 5-7% anual, largo plazo — 4-5%. Gestión de propiedad disponible.' },
    { q: '¿Es seguro invertir?', a: 'El proyecto está estructurado como SPE (entidad de propósito especial) — tu inversión está protegida por una entidad legal separada. Todos los contratos están registrados en el registro inmobiliario de Brasil.' },
  ];

  return [
    { q: `When is ${projectName} delivering?`, a: deliveryYear ? `Estimated delivery: ${deliveryYear}. ${property.tag === 'Pre-sale' ? 'The project is in pre-sale stage — best prices are available now.' : ''}` : 'Delivery date to be confirmed.' },
    { q: 'Where is the project located?', a: `${location}, Florianópolis, Santa Catarina, Brazil. Jurerê is the most prestigious neighborhood on the island with the best infrastructure and beaches.` },
    { q: 'What is the payment structure?', a: `Down payment: ${downPct}%. ${installments ? `Then ${installments}-month installment plan directly from the developer — no bank, no interest.` : 'Developer installment plan available.'} Bank financing is also an option.` },
    { q: 'Can foreigners buy?', a: 'Yes, foreigners can freely purchase property in Brazil. You will need a CPF (Brazilian tax ID) — we assist with the entire process.' },
    { q: 'What rental income can I expect?', a: 'Jurerê is one of the most liquid neighborhoods in Florianópolis. Short-term Airbnb rentals yield 5-7% annually, long-term — 4-5%. Property management available.' },
    { q: 'Is it safe to invest?', a: 'The project is structured as an SPE (Special Purpose Entity) — your investment is protected by a separate legal entity. All contracts are registered with the Brazilian real estate registry.' },
  ];
}

// TERRA Jurerê unit data — from official pricelist
const TERRA_UNITS: { type: string; areaMin: number; areaMax: number; bedrooms: number; bathrooms: number; floorPlan: string; label: Record<Lang, string>; yieldPct: number }[] = [
  { type: 'Loft Studio', areaMin: 37, areaMax: 44, bedrooms: 0, bathrooms: 1, floorPlan: '/floor-plans/terra/terra_plan_p5.png',
    label: { en: 'Loft Studio', ru: 'Лофт Студия', pt: 'Loft Studio', es: 'Loft Studio' }, yieldPct: 0.060 },
  { type: '1 Bedroom', areaMin: 45, areaMax: 55, bedrooms: 1, bathrooms: 1, floorPlan: '/floor-plans/terra/terra_plan_p6.png',
    label: { en: '1 Bedroom', ru: '1 спальня', pt: '1 Quarto', es: '1 Dormitorio' }, yieldPct: 0.055 },
  { type: '1 Bed + Terrace', areaMin: 55, areaMax: 70, bedrooms: 1, bathrooms: 1, floorPlan: '/floor-plans/terra/terra_plan_p7.png',
    label: { en: '1 Bed + Terrace', ru: '1 спальня + Терраса', pt: '1 Quarto + Terraço', es: '1 Dormitorio + Terraza' }, yieldPct: 0.052 },
  { type: '2 Bedroom', areaMin: 70, areaMax: 90, bedrooms: 2, bathrooms: 2, floorPlan: '/floor-plans/terra/terra_plan_p8.png',
    label: { en: '2 Bedroom', ru: '2 спальни', pt: '2 Quartos', es: '2 Dormitorios' }, yieldPct: 0.048 },
  { type: '2 Bed Premium', areaMin: 85, areaMax: 110, bedrooms: 2, bathrooms: 2, floorPlan: '/floor-plans/terra/terra_plan_p9.png',
    label: { en: '2 Bed Premium', ru: '2 спальни Премиум', pt: '2 Quartos Premium', es: '2 Dormitorios Premium' }, yieldPct: 0.045 },
  { type: '3 Bedroom', areaMin: 110, areaMax: 140, bedrooms: 3, bathrooms: 3, floorPlan: '/floor-plans/terra/terra_plan_p10.png',
    label: { en: '3 Bedroom', ru: '3 спальни', pt: '3 Quartos', es: '3 Dormitorios' }, yieldPct: 0.040 },
  { type: '3 Bed + Terrace', areaMin: 140, areaMax: 180, bedrooms: 3, bathrooms: 3, floorPlan: '/floor-plans/terra/terra_plan_p11.png',
    label: { en: '3 Bed + Terrace', ru: '3 спальни + Терраса', pt: '3 Quartos + Terraço', es: '3 Dormitorios + Terraza' }, yieldPct: 0.038 },
];

// NATUS Residence unit data — from official pricelist
const NATUS_UNITS: { type: string; areaMin: number; areaMax: number; bedrooms: number; bathrooms: number; floorPlan: string; label: Record<Lang, string>; priceMin: number; priceMax: number; yieldPct: number }[] = [
  { type: 'T0 — 52 m²', areaMin: 52, areaMax: 52, bedrooms: 1, bathrooms: 1, floorPlan: '/floor-plans/natus/natus_floorplan_page_42.jpg',
    label: { en: 'T0 — 52 m²', ru: 'T0 — 52 м²', pt: 'T0 — 52 m²', es: 'T0 — 52 m²' }, priceMin: 899000, priceMax: 899000, yieldPct: 0.055 },
  { type: 'T0 Garden — 75 m²', areaMin: 75, areaMax: 75, bedrooms: 1, bathrooms: 1, floorPlan: '/floor-plans/natus/natus_floorplan_page_43.jpg',
    label: { en: 'T0 Garden — 75 m²', ru: 'T0 Garden — 75 м²', pt: 'T0 Garden — 75 m²', es: 'T0 Garden — 75 m²' }, priceMin: 0, priceMax: 0, yieldPct: 0.055 },
  { type: 'T1 — 74 m²', areaMin: 74, areaMax: 74, bedrooms: 2, bathrooms: 2, floorPlan: '/floor-plans/natus/natus_floorplan_page_44.jpg',
    label: { en: 'T1 — 74 m²', ru: 'T1 — 74 м²', pt: 'T1 — 74 m²', es: 'T1 — 74 m²' }, priceMin: 1290000, priceMax: 1650000, yieldPct: 0.048 },
  { type: 'T1 Garden — 108 m²', areaMin: 108, areaMax: 108, bedrooms: 2, bathrooms: 2, floorPlan: '/floor-plans/natus/natus_floorplan_page_45.jpg',
    label: { en: 'T1 Garden — 108 m²', ru: 'T1 Garden — 108 м²', pt: 'T1 Garden — 108 m²', es: 'T1 Garden — 108 m²' }, priceMin: 1980000, priceMax: 1980000, yieldPct: 0.044 },
  { type: 'T1 Terraço — 85 m²', areaMin: 85, areaMax: 85, bedrooms: 2, bathrooms: 2, floorPlan: '/floor-plans/natus/natus_floorplan_page_46.jpg',
    label: { en: 'T1 Terraço — 85 m²', ru: 'T1 Terraço — 85 м²', pt: 'T1 Terraço — 85 m²', es: 'T1 Terraço — 85 m²' }, priceMin: 1350000, priceMax: 1350000, yieldPct: 0.048 },
  { type: 'T2 — 97 m²', areaMin: 97, areaMax: 97, bedrooms: 3, bathrooms: 3, floorPlan: '/floor-plans/natus/natus_floorplan_page_47.jpg',
    label: { en: 'T2 — 97 m²', ru: 'T2 — 97 м²', pt: 'T2 — 97 m²', es: 'T2 — 97 m²' }, priceMin: 1690000, priceMax: 1690000, yieldPct: 0.040 },
  { type: 'T2 Garden — 130 m²', areaMin: 130, areaMax: 130, bedrooms: 3, bathrooms: 3, floorPlan: '/floor-plans/natus/natus_floorplan_page_48.jpg',
    label: { en: 'T2 Garden — 130 m²', ru: 'T2 Garden — 130 м²', pt: 'T2 Garden — 130 m²', es: 'T2 Garden — 130 m²' }, priceMin: 2480000, priceMax: 2480000, yieldPct: 0.038 },
  { type: 'T2 Garden C — 127 m²', areaMin: 127, areaMax: 127, bedrooms: 3, bathrooms: 3, floorPlan: '/floor-plans/natus/natus_floorplan_page_49.jpg',
    label: { en: 'T2 Garden C — 127 m²', ru: 'T2 Garden C — 127 м²', pt: 'T2 Garden C — 127 m²', es: 'T2 Garden C — 127 m²' }, priceMin: 0, priceMax: 0, yieldPct: 0.038 },
  { type: 'T2 Terraço — 121 m²', areaMin: 121, areaMax: 121, bedrooms: 3, bathrooms: 3, floorPlan: '/floor-plans/natus/natus_floorplan_page_50.jpg',
    label: { en: 'T2 Terraço — 121 m²', ru: 'T2 Terraço — 121 м²', pt: 'T2 Terraço — 121 m²', es: 'T2 Terraço — 121 m²' }, priceMin: 0, priceMax: 0, yieldPct: 0.040 },
  { type: 'T2 Terraço B — 114 m²', areaMin: 114, areaMax: 114, bedrooms: 3, bathrooms: 3, floorPlan: '/floor-plans/natus/natus_floorplan_page_51.jpg',
    label: { en: 'T2 Terraço B — 114 m²', ru: 'T2 Terraço B — 114 м²', pt: 'T2 Terraço B — 114 m²', es: 'T2 Terraço B — 114 m²' }, priceMin: 1990000, priceMax: 1990000, yieldPct: 0.040 },
  { type: 'T3 — 109 m²', areaMin: 109, areaMax: 109, bedrooms: 3, bathrooms: 3, floorPlan: '/floor-plans/natus/natus_floorplan_page_52.jpg',
    label: { en: 'T3 — 109 m²', ru: 'T3 — 109 м²', pt: 'T3 — 109 m²', es: 'T3 — 109 m²' }, priceMin: 0, priceMax: 0, yieldPct: 0.040 },
  { type: 'T3 Terraço — 123 m²', areaMin: 123, areaMax: 123, bedrooms: 3, bathrooms: 3, floorPlan: '/floor-plans/natus/natus_floorplan_page_53.jpg',
    label: { en: 'T3 Terraço — 123 m²', ru: 'T3 Terraço — 123 м²', pt: 'T3 Terraço — 123 m²', es: 'T3 Terraço — 123 m²' }, priceMin: 0, priceMax: 0, yieldPct: 0.040 },
  { type: 'T4 Cobertura — 114 m²', areaMin: 114, areaMax: 114, bedrooms: 2, bathrooms: 2, floorPlan: '/floor-plans/natus/natus_floorplan_page_54.jpg',
    label: { en: 'T4 Cobertura — 114 m²', ru: 'T4 Cobertura — 114 м²', pt: 'T4 Cobertura — 114 m²', es: 'T4 Cobertura — 114 m²' }, priceMin: 2150000, priceMax: 2150000, yieldPct: 0.045 },
  { type: 'T6 Cobertura — 134 m²', areaMin: 134, areaMax: 134, bedrooms: 2, bathrooms: 3, floorPlan: '/floor-plans/natus/natus_floorplan_page_55.jpg',
    label: { en: 'T6 Cobertura — 134 m²', ru: 'T6 Cobertura — 134 м²', pt: 'T6 Cobertura — 134 m²', es: 'T6 Cobertura — 134 m²' }, priceMin: 0, priceMax: 0, yieldPct: 0.042 },
  { type: 'T7 Cobertura — 108 m²', areaMin: 108, areaMax: 108, bedrooms: 2, bathrooms: 2, floorPlan: '/floor-plans/natus/natus_floorplan_page_56.jpg',
    label: { en: 'T7 Cobertura — 108 m²', ru: 'T7 Cobertura — 108 м²', pt: 'T7 Cobertura — 108 m²', es: 'T7 Cobertura — 108 m²' }, priceMin: 0, priceMax: 0, yieldPct: 0.044 },
  { type: 'T8 Cobertura — 114 m²', areaMin: 114, areaMax: 114, bedrooms: 2, bathrooms: 2, floorPlan: '/floor-plans/natus/natus_floorplan_page_57.jpg',
    label: { en: 'T8 Cobertura — 114 m²', ru: 'T8 Cobertura — 114 м²', pt: 'T8 Cobertura — 114 m²', es: 'T8 Cobertura — 114 m²' }, priceMin: 0, priceMax: 0, yieldPct: 0.045 },
  { type: 'T9 Cobertura — 161 m²', areaMin: 161, areaMax: 161, bedrooms: 3, bathrooms: 3, floorPlan: '/floor-plans/natus/natus_floorplan_page_58.jpg',
    label: { en: 'T9 Cobertura — 161 m²', ru: 'T9 Cobertura — 161 м²', pt: 'T9 Cobertura — 161 m²', es: 'T9 Cobertura — 161 m²' }, priceMin: 3040000, priceMax: 3040000, yieldPct: 0.035 },
  { type: 'T10 Cobertura — 135 m²', areaMin: 135, areaMax: 135, bedrooms: 2, bathrooms: 2, floorPlan: '/floor-plans/natus/natus_floorplan_page_59.jpg',
    label: { en: 'T10 Cobertura — 135 m²', ru: 'T10 Cobertura — 135 м²', pt: 'T10 Cobertura — 135 m²', es: 'T10 Cobertura — 135 m²' }, priceMin: 0, priceMax: 0, yieldPct: 0.040 },
  { type: 'T11 Cobertura — 88 m²', areaMin: 88, areaMax: 88, bedrooms: 1, bathrooms: 1, floorPlan: '/floor-plans/natus/natus_floorplan_page_60.jpg',
    label: { en: 'T11 Cobertura — 88 m²', ru: 'T11 Cobertura — 88 м²', pt: 'T11 Cobertura — 88 m²', es: 'T11 Cobertura — 88 m²' }, priceMin: 1530000, priceMax: 1530000, yieldPct: 0.050 },
  { type: 'Duplex L1 — 81 m²', areaMin: 81, areaMax: 81, bedrooms: 1, bathrooms: 1, floorPlan: '/floor-plans/natus/natus_floorplan_page_61.jpg',
    label: { en: 'Duplex L1 — 81 m²', ru: 'Duplex L1 — 81 м²', pt: 'Duplex L1 — 81 m²', es: 'Duplex L1 — 81 m²' }, priceMin: 0, priceMax: 0, yieldPct: 0.052 },
  { type: 'Duplex L2 — 59 m²', areaMin: 59, areaMax: 59, bedrooms: 1, bathrooms: 1, floorPlan: '/floor-plans/natus/natus_floorplan_page_62.jpg',
    label: { en: 'Duplex L2 — 59 m²', ru: 'Duplex L2 — 59 м²', pt: 'Duplex L2 — 59 m²', es: 'Duplex L2 — 59 m²' }, priceMin: 899000, priceMax: 1300000, yieldPct: 0.052 },
  { type: 'Duplex L3 — 79 m²', areaMin: 79, areaMax: 79, bedrooms: 2, bathrooms: 2, floorPlan: '/floor-plans/natus/natus_floorplan_page_63.jpg',
    label: { en: 'Duplex L3 — 79 m²', ru: 'Duplex L3 — 79 м²', pt: 'Duplex L3 — 79 m²', es: 'Duplex L3 — 79 m²' }, priceMin: 1690000, priceMax: 1690000, yieldPct: 0.048 },
];

const AZZURE_UNITS: { type: string; areaMin: number; areaMax: number; bedrooms: number; bathrooms: number; floorPlan: string; label: Record<Lang, string>; priceMin: number; priceMax: number; yieldPct: number }[] = [
  { type: '2BR Compact — 132 m²', areaMin: 132, areaMax: 132, bedrooms: 2, bathrooms: 2, floorPlan: '/floor-plans/azzur/azzur_plan_50.jpg',
    label: { en: '2BR Compact — 132 m²', ru: '2BR Compact — 132 м²', pt: '2BR Compact — 132 m²', es: '2BR Compact — 132 m²' }, priceMin: 4008651, priceMax: 4112409, yieldPct: 0.06 },
  { type: '2BR — 151-181 m²', areaMin: 151, areaMax: 181, bedrooms: 2, bathrooms: 2, floorPlan: '/floor-plans/azzur/azzur_plan_53.jpg',
    label: { en: '2BR — 151-181 m²', ru: '2BR — 151-181 м²', pt: '2BR — 151-181 m²', es: '2BR — 151-181 m²' }, priceMin: 4631126, priceMax: 5421998, yieldPct: 0.055 },
  { type: '3BR Compact — 132 m²', areaMin: 132, areaMax: 133, bedrooms: 3, bathrooms: 3, floorPlan: '/floor-plans/azzur/azzur_plan_56.jpg',
    label: { en: '3BR Compact — 132 m²', ru: '3BR Compact — 132 м²', pt: '3BR Compact — 132 m²', es: '3BR Compact — 132 m²' }, priceMin: 4292428, priceMax: 4680807, yieldPct: 0.06 },
  { type: '3BR — 149-153 m²', areaMin: 149, areaMax: 153, bedrooms: 3, bathrooms: 3, floorPlan: '/floor-plans/azzur/azzur_plan_58.jpg',
    label: { en: '3BR — 149-153 m²', ru: '3BR — 149-153 м²', pt: '3BR — 149-153 m²', es: '3BR — 149-153 m²' }, priceMin: 4561234, priceMax: 5390354, yieldPct: 0.055 },
  { type: '3BR — 172-226 m²', areaMin: 172, areaMax: 226, bedrooms: 3, bathrooms: 3, floorPlan: '/floor-plans/azzur/azzur_plan_62.jpg',
    label: { en: '3BR — 172-226 m²', ru: '3BR — 172-226 м²', pt: '3BR — 172-226 m²', es: '3BR — 172-226 m²' }, priceMin: 5485647, priceMax: 9822905, yieldPct: 0.05 },
  { type: '3BR Penthouse — 243-326 m²', areaMin: 243, areaMax: 326, bedrooms: 3, bathrooms: 3, floorPlan: '/floor-plans/azzur/azzur_plan_75.jpg',
    label: { en: '3BR Penthouse — 243-326 m²', ru: '3BR Penthouse — 243-326 м²', pt: '3BR Penthouse — 243-326 m²', es: '3BR Penthouse — 243-326 m²' }, priceMin: 9353381, priceMax: 15228631, yieldPct: 0.04 },
  { type: '4BR — 176-216 m²', areaMin: 176, areaMax: 216, bedrooms: 4, bathrooms: 4, floorPlan: '/floor-plans/azzur/azzur_plan_66.jpg',
    label: { en: '4BR — 176-216 m²', ru: '4BR — 176-216 м²', pt: '4BR — 176-216 m²', es: '4BR — 176-216 m²' }, priceMin: 5494800, priceMax: 7166992, yieldPct: 0.05 },
  { type: '4BR Premium — 204-240 m²', areaMin: 204, areaMax: 240, bedrooms: 4, bathrooms: 4, floorPlan: '/floor-plans/azzur/azzur_plan_70.jpg',
    label: { en: '4BR Premium — 204-240 m²', ru: '4BR Premium — 204-240 м²', pt: '4BR Premium — 204-240 m²', es: '4BR Premium — 204-240 m²' }, priceMin: 9830896, priceMax: 11633476, yieldPct: 0.045 },
  { type: '4BR Penthouse — 263-271 m²', areaMin: 263, areaMax: 271, bedrooms: 4, bathrooms: 4, floorPlan: '/floor-plans/azzur/azzur_plan_84.jpg',
    label: { en: '4BR Penthouse — 263-271 m²', ru: '4BR Penthouse — 263-271 м²', pt: '4BR Penthouse — 263-271 m²', es: '4BR Penthouse — 263-271 m²' }, priceMin: 11153971, priceMax: 11436204, yieldPct: 0.04 },
];

const MAKAI_UNITS: { type: string; areaMin: number; areaMax: number; bedrooms: number; bathrooms: number; floorPlan: string; label: Record<Lang, string>; priceMin: number; priceMax: number; yieldPct: number }[] = [
  { type: 'Studio Mezanino — 71-94 m²', areaMin: 71, areaMax: 94, bedrooms: 1, bathrooms: 1, floorPlan: '/floor-plans/makai/makai_plan_4.jpg',
    label: { en: 'Studio Mezanino — 71-94 m²', ru: 'Студия Mezanino — 71-94 м²', pt: 'Studio Mezanino — 71-94 m²', es: 'Studio Mezanino — 71-94 m²' }, priceMin: 1552714, priceMax: 2091044, yieldPct: 0.08 },
  { type: '1BR+Suite — 85-91 m²', areaMin: 85, areaMax: 91, bedrooms: 1, bathrooms: 2, floorPlan: '/floor-plans/makai/makai_plan_8.jpg',
    label: { en: '1BR+Suite — 85-91 m²', ru: '1BR+Suite — 85-91 м²', pt: '1BR+Suite — 85-91 m²', es: '1BR+Suite — 85-91 m²' }, priceMin: 1770503, priceMax: 2159392, yieldPct: 0.075 },
  { type: '3BR Mezanino — 149-161 m²', areaMin: 149, areaMax: 161, bedrooms: 3, bathrooms: 3, floorPlan: '/floor-plans/makai/makai_plan_12.jpg',
    label: { en: '3BR Mezanino — 149-161 m²', ru: '3BR Mezanino — 149-161 м²', pt: '3BR Mezanino — 149-161 м²', es: '3BR Mezanino — 149-161 м²' }, priceMin: 3119681, priceMax: 3979647, yieldPct: 0.07 },
  { type: '1BR+Suite Cobertura — 139-140 m²', areaMin: 139, areaMax: 140, bedrooms: 1, bathrooms: 2, floorPlan: '/floor-plans/makai/makai_plan_18.jpg',
    label: { en: '1BR+Suite Cobertura — 139-140 м²', ru: '1BR+Suite Cobertura — 139-140 м²', pt: '1BR+Suite Cobertura — 139-140 м²', es: '1BR+Suite Cobertura — 139-140 м²' }, priceMin: 3672926, priceMax: 3683727, yieldPct: 0.07 },
  { type: '2BR+Suite Cobertura — 220 m²', areaMin: 220, areaMax: 220, bedrooms: 2, bathrooms: 2, floorPlan: '/floor-plans/makai/makai_plan_20.jpg',
    label: { en: '2BR+Suite Cobertura — 220 м²', ru: '2BR+Suite Cobertura — 220 м²', pt: '2BR+Suite Cobertura — 220 м²', es: '2BR+Suite Cobertura — 220 м²' }, priceMin: 3683727, priceMax: 5034979, yieldPct: 0.065 },
  { type: '4BR Mezanino — 218 m²', areaMin: 218, areaMax: 218, bedrooms: 4, bathrooms: 4, floorPlan: '/floor-plans/makai/makai_plan_22.jpg',
    label: { en: '4BR Mezanino — 218 м²', ru: '4BR Mezanino — 218 м²', pt: '4BR Mezanino — 218 м²', es: '4BR Mezanino — 218 м²' }, priceMin: 4553495, priceMax: 5804649, yieldPct: 0.065 },
  { type: '4BR Penthouse — 313 m²', areaMin: 313, areaMax: 313, bedrooms: 4, bathrooms: 4, floorPlan: '/floor-plans/makai/makai_plan_24.jpg',
    label: { en: '4BR Penthouse — 313 м²', ru: '4BR Penthouse — 313 м²', pt: '4BR Penthouse — 313 м²', es: '4BR Penthouse — 313 м²' }, priceMin: 10505856, priceMax: 10505856, yieldPct: 0.06 },
  { type: '3BR — 148-149 m²', areaMin: 148, areaMax: 149, bedrooms: 3, bathrooms: 3, floorPlan: '/floor-plans/makai/makai_plan_15.jpg',
    label: { en: '3BR — 148-149 м²', ru: '3BR — 148-149 м²', pt: '3BR — 148-149 м²', es: '3BR — 148-149 м²' }, priceMin: 3670787, priceMax: 3690928, yieldPct: 0.07 },
  { type: '3BR Penthouse — 404 m²', areaMin: 404, areaMax: 404, bedrooms: 3, bathrooms: 3, floorPlan: '/floor-plans/makai/makai_plan_25.jpg',
    label: { en: '3BR Penthouse — 404 м²', ru: '3BR Penthouse — 404 м²', pt: '3BR Penthouse — 404 м²', es: '3BR Penthouse — 404 м²' }, priceMin: 13545424, priceMax: 13545424, yieldPct: 0.06 },
];

const BOSC_UNITS: { type: string; areaMin: number; areaMax: number; bedrooms: number; bathrooms: number; floorPlan: string; label: Record<Lang, string>; priceMin: number; priceMax: number; yieldPct: number }[] = [
  { type: 'Studio — 34 m²', areaMin: 34, areaMax: 35, bedrooms: 1, bathrooms: 1, floorPlan: '/floor-plans/bosc/studio_A1.jpg',
    label: { en: 'Studio — 34 m²', ru: 'Студия — 34 м²', pt: 'Studio — 34 m²', es: 'Studio — 34 m²' }, priceMin: 618568, priceMax: 698287, yieldPct: 0.15 },
  { type: 'Studio — 40-44 m²', areaMin: 40, areaMax: 44, bedrooms: 1, bathrooms: 1, floorPlan: '/floor-plans/bosc/studio_A4.jpg',
    label: { en: 'Studio — 40-44 m²', ru: 'Студия — 40-44 м²', pt: 'Studio — 40-44 m²', es: 'Studio — 40-44 m²' }, priceMin: 799253, priceMax: 901141, yieldPct: 0.14 },
  { type: '1BR — 45-47 m²', areaMin: 45, areaMax: 47, bedrooms: 1, bathrooms: 1, floorPlan: '/floor-plans/bosc/apt_1BR_A.jpg',
    label: { en: '1BR — 45-47 m²', ru: '1BR — 45-47 м²', pt: '1BR — 45-47 m²', es: '1BR — 45-47 м²' }, priceMin: 735370, priceMax: 950990, yieldPct: 0.13 },
  { type: '1BR+ — 49-52 m²', areaMin: 49, areaMax: 52, bedrooms: 1, bathrooms: 1, floorPlan: '/floor-plans/bosc/apt_1BR_D.jpg',
    label: { en: '1BR+ — 49-52 m²', ru: '1BR+ — 49-52 м²', pt: '1BR+ — 49-52 м²', es: '1BR+ — 49-52 м²' }, priceMin: 927102, priceMax: 995708, yieldPct: 0.12 },
  { type: '2BR — 55 m²', areaMin: 55, areaMax: 55, bedrooms: 2, bathrooms: 2, floorPlan: '/floor-plans/bosc/apt_2BR_A.jpg',
    label: { en: '2BR — 55 m²', ru: '2BR — 55 м²', pt: '2BR — 55 m²', es: '2BR — 55 м²' }, priceMin: 1103216, priceMax: 1103216, yieldPct: 0.12 },
];


const SELETO_UNITS: { type: string; areaMin: number; areaMax: number; bedrooms: number; bathrooms: number; floorPlan: string; label: Record<Lang, string>; priceMin: number; priceMax: number; yieldPct: number }[] = [
  { type: 'Loft 2 Demi-Suíte', areaMin: 58, areaMax: 70, bedrooms: 1, bathrooms: 2, floorPlan: '',
    label: { en: 'Loft 2 Demi-Suite', ru: 'Лофт 2 Demi-Suite', pt: 'Loft 2 Demi-Suíte', es: 'Loft 2 Demi-Suite' }, priceMin: 1205380, priceMax: 1450000, yieldPct: 0.065 },
  { type: 'Garden Apt — 183 m²', areaMin: 183, areaMax: 183, bedrooms: 2, bathrooms: 2, floorPlan: '',
    label: { en: 'Garden Apartment — 183 m²', ru: 'Garden квартира — 183 м²', pt: 'Apartamento Garden — 183 m²', es: 'Apartamento Garden — 183 m²' }, priceMin: 2035680, priceMax: 2035680, yieldPct: 0.055 },
  { type: '2BR — 100-130 m²', areaMin: 100, areaMax: 130, bedrooms: 2, bathrooms: 2, floorPlan: '',
    label: { en: '2BR — 100-130 m²', ru: '2BR — 100-130 м²', pt: '2 Quartos — 100-130 m²', es: '2 Dormitorios — 100-130 m²' }, priceMin: 1800000, priceMax: 2400000, yieldPct: 0.055 },
  { type: '3BR — 140-180 m²', areaMin: 140, areaMax: 180, bedrooms: 3, bathrooms: 3, floorPlan: '',
    label: { en: '3BR — 140-180 m²', ru: '3BR — 140-180 м²', pt: '3 Quartos — 140-180 m²', es: '3 Dormitorios — 140-180 m²' }, priceMin: 2800000, priceMax: 3600000, yieldPct: 0.05 },
  { type: '3BR Penthouse — 240-260 m²', areaMin: 240, areaMax: 260, bedrooms: 3, bathrooms: 3, floorPlan: '',
    label: { en: '3BR Penthouse — 240-260 m²', ru: '3BR Пентхаус — 240-260 м²', pt: 'Cobertura 3 Quartos — 240-260 m²', es: 'Penthouse 3 Dormitorios — 240-260 m²' }, priceMin: 5500000, priceMax: 6622260, yieldPct: 0.045 },
  { type: '4BR Penthouse — 280-320 m²', areaMin: 280, areaMax: 320, bedrooms: 4, bathrooms: 4, floorPlan: '',
    label: { en: '4BR Penthouse — 280-320 m²', ru: '4BR Пентхаус — 280-320 м²', pt: 'Cobertura 4 Quartos — 280-320 m²', es: 'Penthouse 4 Dormitorios — 280-320 m²' }, priceMin: 7000000, priceMax: 8500000, yieldPct: 0.04 },
];

// SPOT II — Jurerê, Florianópolis (87% sold, delivery Jun 2029)
// 46 total units, 5 available, micro-units for short-term rental
// Net yield ~10%, CUB-indexed pricing
const SPOT_II_UNITS: { type: string; areaMin: number; areaMax: number; bedrooms: number; bathrooms: number; floorPlan: string; label: Record<Lang, string>; priceMin: number; priceMax: number; yieldPct: number }[] = [
  { type: 'Type D — 26-29 m²', areaMin: 26, areaMax: 29, bedrooms: 0, bathrooms: 1, floorPlan: '',
    label: { en: 'Type D — 26-29 m²', ru: 'Type D — 26-29 м²', pt: 'Tipo D — 26-29 m²', es: 'Tipo D — 26-29 m²' }, priceMin: 668000, priceMax: 740000, yieldPct: 0.10 },
  { type: 'Type G — 22-23 m²', areaMin: 22, areaMax: 23, bedrooms: 0, bathrooms: 1, floorPlan: '',
    label: { en: 'Type G — 22-23 m²', ru: 'Type G — 22-23 м²', pt: 'Tipo G — 22-23 m²', es: 'Tipo G — 22-23 m²' }, priceMin: 500000, priceMax: 550000, yieldPct: 0.10 },
  { type: 'Type H — 15-20 m²', areaMin: 15, areaMax: 20, bedrooms: 0, bathrooms: 1, floorPlan: '',
    label: { en: 'Type H — 15-20 m²', ru: 'Type H — 15-20 м²', pt: 'Tipo H — 15-20 m²', es: 'Tipo H — 15-20 m²' }, priceMin: 422000, priceMax: 506000, yieldPct: 0.10 },
  { type: 'Type I — 15-16 m²', areaMin: 15, areaMax: 16, bedrooms: 0, bathrooms: 1, floorPlan: '',
    label: { en: 'Type I — 15-16 m²', ru: 'Type I — 15-16 м²', pt: 'Tipo I — 15-16 m²', es: 'Tipo I — 15-16 m²' }, priceMin: 402000, priceMax: 480000, yieldPct: 0.10 },
  { type: 'Type K — 15-17 m²', areaMin: 15, areaMax: 17, bedrooms: 0, bathrooms: 1, floorPlan: '',
    label: { en: 'Type K — 15-17 m²', ru: 'Type K — 15-17 м²', pt: 'Tipo K — 15-17 m²', es: 'Tipo K — 15-17 m²' }, priceMin: 399000, priceMax: 530000, yieldPct: 0.10 },
];

// SPOT III — Jurerê, Florianópolis (Pre-launch, delivery Mar 2030)
// 72 units, Rua Accácio Melo 64, micro-units, estimated +94% appreciation
// Net yield ~10%, CUB-indexed pricing
const SPOT_III_UNITS: { type: string; areaMin: number; areaMax: number; bedrooms: number; bathrooms: number; floorPlan: string; label: Record<Lang, string>; priceMin: number; priceMax: number; yieldPct: number }[] = [
  { type: 'Ground (L1-L3) — 21-22 m²', areaMin: 21, areaMax: 22, bedrooms: 0, bathrooms: 1, floorPlan: '',
    label: { en: 'Ground (L1-L3) — 21-22 m²', ru: 'Ground (L1-L3) — 21-22 м²', pt: 'Térreo (L1-L3) — 21-22 m²', es: 'Planta Baja (L1-L3) — 21-22 m²' }, priceMin: 279000, priceMax: 289000, yieldPct: 0.10 },
  { type: 'Floor 1 — 23-34 m²', areaMin: 23, areaMax: 34, bedrooms: 0, bathrooms: 1, floorPlan: '',
    label: { en: 'Floor 1 — 23-34 m²', ru: 'Этаж 1 — 23-34 м²', pt: 'Andar 1 — 23-34 m²', es: 'Piso 1 — 23-34 m²' }, priceMin: 437000, priceMax: 569000, yieldPct: 0.10 },
  { type: 'Floor 2 — 15-29 m²', areaMin: 15, areaMax: 29, bedrooms: 0, bathrooms: 1, floorPlan: '',
    label: { en: 'Floor 2 — 15-29 m²', ru: 'Этаж 2 — 15-29 м²', pt: 'Andar 2 — 15-29 m²', es: 'Piso 2 — 15-29 m²' }, priceMin: 374000, priceMax: 506000, yieldPct: 0.10 },
  { type: 'Floor 3 — 15-45 m²', areaMin: 15, areaMax: 45, bedrooms: 0, bathrooms: 1, floorPlan: '',
    label: { en: 'Floor 3 — 15-45 m²', ru: 'Этаж 3 — 15-45 м²', pt: 'Andar 3 — 15-45 m²', es: 'Piso 3 — 15-45 m²' }, priceMin: 385000, priceMax: 560000, yieldPct: 0.10 },
  { type: 'Floor 4 — 15-24 m²', areaMin: 15, areaMax: 24, bedrooms: 0, bathrooms: 1, floorPlan: '',
    label: { en: 'Floor 4 — 15-24 m²', ru: 'Этаж 4 — 15-24 м²', pt: 'Andar 4 — 15-24 m²', es: 'Piso 4 — 15-24 m²' }, priceMin: 395000, priceMax: 560000, yieldPct: 0.10 },
  { type: 'Floor 5 — 15-24 m²', areaMin: 15, areaMax: 24, bedrooms: 0, bathrooms: 1, floorPlan: '',
    label: { en: 'Floor 5 — 15-24 m²', ru: 'Этаж 5 — 15-24 м²', pt: 'Andar 5 — 15-24 m²', es: 'Piso 5 — 15-24 m²' }, priceMin: 406000, priceMax: 581000, yieldPct: 0.10 },
  { type: 'Penthouse (Floor 6) — 19-41 m²', areaMin: 19, areaMax: 41, bedrooms: 0, bathrooms: 1, floorPlan: '',
    label: { en: 'Penthouse — 19-41 m²', ru: 'Пентхаус — 19-41 м²', pt: 'Cobertura — 19-41 m²', es: 'Penthouse — 19-41 m²' }, priceMin: 530000, priceMax: 635000, yieldPct: 0.10 },
];

const VIVACE_UNITS: { type: string; areaMin: number; areaMax: number; bedrooms: number; bathrooms: number; floorPlan: string; label: Record<Lang, string>; priceMin: number; priceMax: number; yieldPct: number }[] = [
  { type: 'Studio — 52 m²', areaMin: 52, areaMax: 52, bedrooms: 1, bathrooms: 1, floorPlan: '/floor-plans/vivace/vivace_page_3.jpg',
    label: { en: 'Studio — 52 m²', ru: 'Студия — 52 м²', pt: 'Studio — 52 m²', es: 'Studio — 52 m²' }, priceMin: 1201510, priceMax: 1201510, yieldPct: 0.08 },
  { type: '1BR — 54.6 m²', areaMin: 54, areaMax: 55, bedrooms: 1, bathrooms: 1, floorPlan: '/floor-plans/vivace/vivace_page_3.jpg',
    label: { en: '1BR — 54.6 m²', ru: '1BR — 54.6 м²', pt: '1BR — 54.6 m²', es: '1BR — 54.6 m²' }, priceMin: 1823280, priceMax: 1823280, yieldPct: 0.07 },
  { type: '3BR Duplex — 100-130 m²', areaMin: 100, areaMax: 130, bedrooms: 3, bathrooms: 2, floorPlan: '/floor-plans/vivace/vivace_page_2.jpg',
    label: { en: '3BR — 100-130 m²', ru: '3BR — 100-130 м²', pt: '3BR — 100-130 m²', es: '3BR — 100-130 m²' }, priceMin: 2500000, priceMax: 3200000, yieldPct: 0.065 },
  { type: '4BR Duplex — 153.6 m²', areaMin: 153, areaMax: 154, bedrooms: 4, bathrooms: 3, floorPlan: '/floor-plans/vivace/vivace_page_2.jpg',
    label: { en: '4BR Duplex — 153.6 m²', ru: '4BR Дуплекс — 153.6 м²', pt: '4BR Duplex — 153.6 m²', es: '4BR Duplex — 153.6 m²' }, priceMin: 3973320, priceMax: 3973320, yieldPct: 0.06 },
];

// Blue Diamond Home Club — Bombinhas/SC (from pricelist Feb 2026)
// Delivery: T1 Nov 2026, T2 Nov 2027, T3+T4 Nov 2028
const BLUE_DIAMOND_UNITS: { type: string; areaMin: number; areaMax: number; bedrooms: number; bathrooms: number; floorPlan: string; label: Record<Lang, string>; priceMin: number; priceMax: number; yieldPct: number }[] = [
  { type: '1SU + 1D — 88 m²', areaMin: 88, areaMax: 88, bedrooms: 2, bathrooms: 1, floorPlan: '/floor-plans/blue-diamond/bd_floorplan_page_2.png',
    label: { en: '1 Suite + 1 Bedroom — 88 m²', ru: '1 Сьюта + 1 Спальня — 88 м²', pt: '1 Suíte + 1 Dormitório — 88 m²', es: '1 Suite + 1 Dormitorio — 88 m²' }, priceMin: 975824, priceMax: 1066764, yieldPct: 0.07 },
  { type: '2SU — 80-85 m²', areaMin: 80, areaMax: 85, bedrooms: 2, bathrooms: 2, floorPlan: '/floor-plans/blue-diamond/bd_floorplan_page_5.png',
    label: { en: '2 Suites — 80-85 m²', ru: '2 Сьюты — 80-85 м²', pt: '2 Suítes — 80-85 m²', es: '2 Suites — 80-85 m²' }, priceMin: 975824, priceMax: 1080170, yieldPct: 0.065 },
  { type: '2SU — 91-92 m²', areaMin: 91, areaMax: 92, bedrooms: 2, bathrooms: 2, floorPlan: '/floor-plans/blue-diamond/bd_floorplan_page_3.png',
    label: { en: '2 Suites — 91-92 m²', ru: '2 Сьюты — 91-92 м²', pt: '2 Suítes — 91-92 m²', es: '2 Suites — 91-92 m²' }, priceMin: 1080170, priceMax: 1105049, yieldPct: 0.06 },
  { type: '2SU — 96-97 m²', areaMin: 96, areaMax: 97, bedrooms: 2, bathrooms: 2, floorPlan: '/floor-plans/blue-diamond/bd_floorplan_page_4.png',
    label: { en: '2 Suites — 96-97 m²', ru: '2 Сьюты — 96-97 м²', pt: '2 Suítes — 96-97 m²', es: '2 Suites — 96-97 m²' }, priceMin: 1165675, priceMax: 1253101, yieldPct: 0.06 },
  { type: 'Garden — 130 m²', areaMin: 130, areaMax: 131, bedrooms: 3, bathrooms: 3, floorPlan: '/floor-plans/blue-diamond/bd_floorplan_page_6.png',
    label: { en: 'Garden — 130 m² (3 Suites)', ru: 'Garden — 130 м² (3 Сьюты)', pt: 'Garden — 130 m² (3 Suítes)', es: 'Garden — 130 m² (3 Suites)' }, priceMin: 1687376, priceMax: 1700100, yieldPct: 0.055 },
  { type: 'Penthouse Duplex — 171-189 m²', areaMin: 171, areaMax: 189, bedrooms: 3, bathrooms: 3, floorPlan: '/floor-plans/blue-diamond/bd_floorplan_page_8.png',
    label: { en: 'Penthouse Duplex — 171-189 m² (3 Suites)', ru: 'Пентхаус Дуплекс — 171-189 м² (3 Сьюты)', pt: 'Cobertura Duplex — 171-189 m² (3 Suítes)', es: 'Penthouse Duplex — 171-189 m² (3 Suites)' }, priceMin: 2224605, priceMax: 2433759, yieldPct: 0.045 },
];

function getUnitTypes(property: PropertyData, lang: Lang, slug: string): Unit[] {
  const priceM2 = Number(property.price_per_m2) || 15000;
  const growthRate = Number(property.yearly_growth_rate) || 8;
  const projName = (property.project_name || property.title || slug || '').toLowerCase();
  const isTerra = projName.includes('terra') || slug.includes('terra');
  const isNatus = projName.includes('natus') || slug.includes('natus');
  const isAzzur = projName.includes('azzur') || slug.includes('azzur');
  const isMakai = projName.includes('makai') || slug.includes('makai');
  const isBosc = projName.includes('bosc') || slug.includes('bosc');
  const isVivace = projName.includes('vivace') || slug.includes('vivace');
  const isSeleto = projName.includes('seleto') || slug.includes('seleto');
  const isBlueDiamond = projName.includes('blue diamond') || projName.includes('blue-diamond') || slug.includes('blue-diamond') || slug.includes('blue_diamond');
  const isSpotII = projName.includes('spot ii') || projName.includes('spot-ii') || projName.includes('spot_ii') || slug.includes('spot-ii') || slug.includes('spot_ii');
  const isSpotIII = projName.includes('spot iii') || projName.includes('spot-iii') || projName.includes('spot_iii') || slug.includes('spot-iii') || slug.includes('spot_iii');

  if (isSeleto) {
    return SELETO_UNITS.map(u => ({
      type: u.type,
      areaMin: u.areaMin,
      areaMax: u.areaMax,
      bedrooms: u.bedrooms,
      bathrooms: u.bathrooms,
      floorPlan: u.floorPlan,
      priceMin: u.priceMin,
      priceMax: u.priceMax,
      label: u.label[lang],
      yieldPct: u.yieldPct,
      growthRate,
    }));
  }

  if (isNatus) {
    return NATUS_UNITS.map(u => ({
      type: u.type,
      areaMin: u.areaMin,
      areaMax: u.areaMax,
      bedrooms: u.bedrooms,
      bathrooms: u.bathrooms,
      floorPlan: u.floorPlan,
      priceMin: u.priceMin,
      priceMax: u.priceMax,
      label: u.label[lang],
      yieldPct: u.yieldPct,
      growthRate,
    }));
  }

  if (isAzzur) {
    return AZZURE_UNITS.map(u => ({
      type: u.type,
      areaMin: u.areaMin,
      areaMax: u.areaMax,
      bedrooms: u.bedrooms,
      bathrooms: u.bathrooms,
      floorPlan: u.floorPlan,
      priceMin: u.priceMin,
      priceMax: u.priceMax,
      label: u.label[lang],
      yieldPct: u.yieldPct,
      growthRate,
    }));
  }

  if (isMakai) {
    return MAKAI_UNITS.map(u => ({
      type: u.type,
      areaMin: u.areaMin,
      areaMax: u.areaMax,
      bedrooms: u.bedrooms,
      bathrooms: u.bathrooms,
      floorPlan: u.floorPlan,
      priceMin: u.priceMin,
      priceMax: u.priceMax,
      label: u.label[lang],
      yieldPct: u.yieldPct,
      growthRate,
    }));
  }

  if (isBosc) {
    return BOSC_UNITS.map(u => ({
      type: u.type,
      areaMin: u.areaMin,
      areaMax: u.areaMax,
      bedrooms: u.bedrooms,
      bathrooms: u.bathrooms,
      floorPlan: u.floorPlan,
      priceMin: u.priceMin,
      priceMax: u.priceMax,
      label: u.label[lang],
      yieldPct: u.yieldPct,
      growthRate,
    }));
  }

  if (isVivace) {
    return VIVACE_UNITS.map(u => ({
      type: u.type,
      areaMin: u.areaMin,
      areaMax: u.areaMax,
      bedrooms: u.bedrooms,
      bathrooms: u.bathrooms,
      floorPlan: u.floorPlan,
      priceMin: u.priceMin,
      priceMax: u.priceMax,
      label: u.label[lang],
      yieldPct: u.yieldPct,
      growthRate,
    }));
  }

  if (isBlueDiamond) {
    return BLUE_DIAMOND_UNITS.map(u => ({
      type: u.type,
      areaMin: u.areaMin,
      areaMax: u.areaMax,
      bedrooms: u.bedrooms,
      bathrooms: u.bathrooms,
      floorPlan: u.floorPlan,
      priceMin: u.priceMin,
      priceMax: u.priceMax,
      label: u.label[lang],
      yieldPct: u.yieldPct,
      growthRate,
    }));
  }

  if (isSpotII) {
    return SPOT_II_UNITS.map(u => ({
      type: u.type,
      areaMin: u.areaMin,
      areaMax: u.areaMax,
      bedrooms: u.bedrooms,
      bathrooms: u.bathrooms,
      floorPlan: u.floorPlan,
      priceMin: u.priceMin,
      priceMax: u.priceMax,
      label: u.label[lang],
      yieldPct: u.yieldPct,
      growthRate,
    }));
  }

  if (isSpotIII) {
    return SPOT_III_UNITS.map(u => ({
      type: u.type,
      areaMin: u.areaMin,
      areaMax: u.areaMax,
      bedrooms: u.bedrooms,
      bathrooms: u.bathrooms,
      floorPlan: u.floorPlan,
      priceMin: u.priceMin,
      priceMax: u.priceMax,
      label: u.label[lang],
      yieldPct: u.yieldPct,
      growthRate,
    }));
  }

  if (isTerra) {
    return TERRA_UNITS.map(u => ({
      type: u.type,
      areaMin: u.areaMin,
      areaMax: u.areaMax,
      bedrooms: u.bedrooms,
      bathrooms: u.bathrooms,
      floorPlan: u.floorPlan,
      priceMin: Math.round(u.areaMin * priceM2),
      priceMax: Math.round(u.areaMax * priceM2),
      label: u.label[lang],
      yieldPct: u.yieldPct,
      growthRate,
    }));
  }

  // No real unit data for this project
  return [];
}

function InvestmentCalculator({ property, lang, t, GOLD, NAVY, slug }: {
  property: PropertyData;
  lang: Lang;
  t: typeof T.en;
  GOLD: string;
  NAVY: string;
  slug: string;
}) {
  const allUnitTypes = getUnitTypes(property, lang, slug);
  const unitTypes = allUnitTypes.filter(u => u.priceMin > 0);
  const [selected, setSelected] = useState(0);
  const unit = unitTypes[selected] || unitTypes[0];
  const [holdYears, setHoldYears] = useState(5);
  const [useMin, setUseMin] = useState(true);

  const purchasePrice = useMin ? unit.priceMin : unit.priceMax;
  const purchaseUSD = Math.round(purchasePrice / 5.3);
  const monthlyRent = Math.round(purchasePrice * unit.yieldPct / 12);
  const monthlyRentUSD = Math.round(monthlyRent / 5.3);
  const annualRent = monthlyRent * 12;
  const appreciation = Math.round(purchasePrice * Math.pow(1 + unit.growthRate / 100, holdYears) - purchasePrice);
  const totalRentalIncome = annualRent * holdYears;
  const futureValue = purchasePrice + appreciation;
  const totalReturn = totalRentalIncome + appreciation;
  const roiTotal = Math.round((totalReturn / purchasePrice) * 100);
  const downPayment = Math.round(purchasePrice * 0.25);
  const downPaymentUSD = Math.round(downPayment / 5.3);

  const labels = lang === 'ru' ? {
    title: 'Калькулятор доходности',
    selectUnit: 'Выберите тип юнита',
    from: 'от',
    to: 'до',
    holdPeriod: 'Срок владения',
    years: 'лет',
    year: 'год',
    years2: 'года',
    results: 'Результаты',
    purchasePrice: 'Цена покупки',
    downPayment: 'Первоначальный взнос (25%)',
    monthlyRent: 'Аренда / мес',
    annualYield: 'Арендная доходность',
    appreciation: `Рост за ${holdYears} ${holdYears === 1 ? 'год' : holdYears < 5 ? 'года' : 'лет'}`,
    futureValue: 'Будущая стоимость',
    totalIncome: 'Общий доход',
    totalROI: `Общий ROI за ${holdYears} ${holdYears === 1 ? 'год' : holdYears < 5 ? 'года' : 'лет'}`,
    disclaimer: '* Прогнозы основаны на исторических данных. Прошлые результаты не гарантируют будущих. Курс: 1 USD = R$5.30',
  } : lang === 'pt' ? {
    title: 'Calculadora de Investimento',
    selectUnit: 'Selecione o tipo de unidade',
    from: 'a partir de',
    to: 'até',
    holdPeriod: 'Período de posse',
    years: 'anos',
    year: 'ano',
    years2: 'anos',
    results: 'Resultados',
    purchasePrice: 'Preço de Compra',
    downPayment: 'Entrada (25%)',
    monthlyRent: 'Aluguel / mês',
    annualYield: 'Rendimento Anual',
    appreciation: `Valorização em ${holdYears} ${holdYears === 1 ? 'ano' : 'anos'}`,
    futureValue: 'Valor Futuro',
    totalIncome: 'Rendimento Total',
    totalROI: `ROI Total em ${holdYears} ${holdYears === 1 ? 'ano' : 'anos'}`,
    disclaimer: '* Projeções baseadas em dados históricos. Resultados passados não garantem resultados futuros. Câmbio: 1 USD = R$5.30',
  } : {
    title: 'Investment Calculator',
    selectUnit: 'Select unit type',
    from: 'from',
    to: 'to',
    holdPeriod: 'Hold period',
    years: 'years',
    year: 'year',
    years2: 'years',
    results: 'Results',
    purchasePrice: 'Purchase Price',
    downPayment: 'Down Payment (25%)',
    monthlyRent: 'Monthly Rent',
    annualYield: 'Annual Yield',
    appreciation: `${holdYears}-Year Appreciation`,
    futureValue: 'Future Value',
    totalIncome: 'Total Income',
    totalROI: `Total ${holdYears}-Year ROI`,
    disclaimer: '* Projections based on historical data. Past performance does not guarantee future results. Rate: 1 USD = R$5.30',
  };

  const holdYearsLabels = [3, 5, 7, 10];

  return (
    <div>
      {/* Calculator Card */}
      <div style={{
        background: `linear-gradient(135deg, ${NAVY}, #2a3f75)`, borderRadius: 12,
        padding: 32, color: '#fff', marginBottom: 24,
      }}>
        <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 24, fontFamily: "'Playfair Display', serif" }}>
          {labels.title}
        </div>

        {/* Unit Type Selector */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ color: '#aaa', fontSize: 12, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>{labels.selectUnit}</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {unitTypes.map((u, i) => (
              <button key={i} onClick={() => setSelected(i)}
                style={{
                  padding: '10px 16px', borderRadius: 8, border: selected === i ? `2px solid ${GOLD}` : '2px solid rgba(255,255,255,0.15)',
                  background: selected === i ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.05)',
                  color: selected === i ? GOLD : '#ccc', fontSize: 13, fontWeight: selected === i ? 700 : 400,
                  cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left',
                }}
              >
                <div>{u.label}</div>
                <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{u.areaMin}–{u.areaMax} m²</div>
              </button>
            ))}
          </div>
        </div>

        {/* Price Range Toggle */}
        <div style={{ marginBottom: 24, display: 'flex', gap: 8, alignItems: 'center' }}>
          <button onClick={() => setUseMin(true)}
            style={{
              padding: '6px 16px', borderRadius: 6, border: 'none',
              background: useMin ? GOLD : 'rgba(255,255,255,0.1)', color: useMin ? NAVY : '#aaa',
              fontWeight: 700, fontSize: 13, cursor: 'pointer',
            }}
          >{labels.from} {formatBrl(unit.priceMin)}</button>
          <button onClick={() => setUseMin(false)}
            style={{
              padding: '6px 16px', borderRadius: 6, border: 'none',
              background: !useMin ? GOLD : 'rgba(255,255,255,0.1)', color: !useMin ? NAVY : '#aaa',
              fontWeight: 700, fontSize: 13, cursor: 'pointer',
            }}
          >{labels.to} {formatBrl(unit.priceMax)}</button>
        </div>

        {/* Hold Period */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ color: '#aaa', fontSize: 12, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>{labels.holdPeriod}</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {holdYearsLabels.map(y => (
              <button key={y} onClick={() => setHoldYears(y)}
                style={{
                  padding: '8px 20px', borderRadius: 8, border: holdYears === y ? `2px solid ${GOLD}` : '2px solid rgba(255,255,255,0.15)',
                  background: holdYears === y ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.05)',
                  color: holdYears === y ? GOLD : '#ccc', fontSize: 14, fontWeight: holdYears === y ? 700 : 400,
                  cursor: 'pointer',
                }}
              >{y} {y === 1 ? labels.year : labels.years}</button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 24 }}>
          <div style={{ color: GOLD, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>{labels.results}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
            <div>
              <div style={{ color: '#aaa', fontSize: 12 }}>{labels.purchasePrice}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>{formatBrl(purchasePrice)}</div>
              <div style={{ color: '#888', fontSize: 12 }}>${purchaseUSD.toLocaleString()} USD</div>
            </div>
            <div>
              <div style={{ color: '#aaa', fontSize: 12 }}>{labels.downPayment}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>{formatBrl(downPayment)}</div>
              <div style={{ color: '#888', fontSize: 12 }}>${downPaymentUSD.toLocaleString()} USD</div>
            </div>
            <div>
              <div style={{ color: '#aaa', fontSize: 12 }}>{labels.monthlyRent}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: GOLD }}>{formatBrl(monthlyRent)}</div>
              <div style={{ color: '#888', fontSize: 12 }}>${monthlyRentUSD.toLocaleString()} USD</div>
            </div>
            <div>
              <div style={{ color: '#aaa', fontSize: 12 }}>{labels.annualYield}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: GOLD }}>{(unit.yieldPct * 100).toFixed(1)}%</div>
            </div>
            <div>
              <div style={{ color: '#aaa', fontSize: 12 }}>{labels.appreciation}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: GOLD }}>+{formatBrl(appreciation)}</div>
            </div>
            <div>
              <div style={{ color: '#aaa', fontSize: 12 }}>{labels.futureValue}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>{formatBrl(futureValue)}</div>
            </div>
          </div>

          {/* Total ROI - Big Number */}
          <div style={{ marginTop: 24, padding: '20px 24px', background: 'rgba(212,175,55,0.1)', borderRadius: 10, textAlign: 'center', border: `1px solid rgba(212,175,55,0.3)` }}>
            <div style={{ color: '#aaa', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>{labels.totalROI}</div>
            <div style={{ fontSize: 42, fontWeight: 900, color: GOLD, marginTop: 4 }}>{roiTotal}%</div>
            <div style={{ color: '#888', fontSize: 12, marginTop: 4 }}>{formatBrl(totalRentalIncome)} rental + {formatBrl(appreciation)} growth</div>
          </div>
        </div>
      </div>
      <p style={{ color: '#999', fontSize: 11, textAlign: 'center' }}>{labels.disclaimer}</p>
    </div>
  );
}

// Highlight key facts in description text
function highlightKeyFacts(text: string, gold: string): React.ReactNode {
  if (!text) return null;
  
  // Patterns to highlight: percentages, prices with USD/$, numbers with units, key phrases
  const patterns = [
    /\d+\.?\d*%\s*(?:below|above|off|discount|yield|ROI|appreciation|growth|return|доходность|рост|скидка|ниже|выше|desconto|valorização|rendimento)?/gi,
    /USD\s*[\d,]+(?:\.\d+)?(?:\s*(?:per|\/|\s)m²)?/gi,
    /\$[\d,]+(?:\.\d+)?(?:\s*(?:per|\/|\s)m²)?/gi,
    /\d+[\d,]*(?:\.\d+)?\s*(?:m²|sqm|sq\.\s*m|м²)/gi,
    /\d+\s*(?:months?|мес|месяц|месец|meses)/gi,
    /\d+\s*(?:years?|год|лет|года|anos)/gi,
    /\d+\s*(?:floors?|этаж|этажей|andar)/gi,
    /360°/gi,
    /(?:pre-launch|pre-sale|pre-sale|пре-релиз|ранняя продажа|pré-lançamento)/gi,
    /(?:down payment|первоначальный взнос|entrada)/gi,
  ];

  // Build a combined regex
  const combined = new RegExp(
    patterns.map(p => `(${p.source})`).join('|'),
    'gi'
  );

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = combined.exec(text)) !== null) {
    // Add text before match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    // Add highlighted match
    parts.push(
      React.createElement('span', {
        key: key++,
        style: {
          color: gold,
          fontWeight: 700,
          background: 'rgba(212, 175, 55, 0.1)',
          padding: '1px 4px',
          borderRadius: 3,
        }
      }, match[0])
    );
    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? React.createElement(React.Fragment, null, ...parts) : text;
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
    const saved = localStorage.getItem('planb_lang');
    if (saved && T[saved as Lang]) setLang(saved as Lang);
  }, []);

  const setLangAndSave = (l: Lang) => {
    setLang(l);
    localStorage.setItem('planb_lang', l);
  };

  const copyLink = useCallback(() => {
    navigator.clipboard.writeText(`https://planbbrazil.com/projects/${slug}`);
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
                      lang === 'pt' ? (property.full_description_pt || property.short_description_pt || property.description) :
                      (property.full_description_en || property.short_description_en || property.description);
  const shortDesc = lang === 'ru' ? property.short_description_ru :
                    lang === 'pt' ? property.short_description_pt :
                    property.short_description_en;

  const tabs = [
    { key: 'overview', label: t.overview },
    { key: 'gallery', label: t.gallery },
    ...(() => {
      const projStr = (property.project_name || property.title || slug || '').toLowerCase();
      const hasRealUnits = ['seleto', 'natus', 'azzur', 'makai', 'bosc', 'vivace', 'terra', 'blue-diamond', 'blue diamond', 'blue_diamond', 'spot-ii', 'spot ii', 'spot_ii', 'spot-iii', 'spot iii', 'spot_iii'].some(
        k => projStr.includes(k) || (slug || '').includes(k)
      );
      return hasRealUnits ? [{ key: 'units', label: t.units }] : [];
    })(),
    ...(property.latitude ? [{ key: 'location', label: t.location }] : []),
    ...(property.list_price ? [{ key: 'investment', label: t.investment }] : []),
    { key: 'faq', label: 'FAQ' },
  ];

  const statusColors: Record<string, { bg: string; text: string }> = {
    active: { bg: '#dcfce7', text: '#166534' },
    sold: { bg: '#fee2e2', text: '#991b1b' },
    reserved: { bg: '#fef3c7', text: '#92400e' },
    draft: { bg: '#f3f4f6', text: '#6b7280' },
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#f5f3ed', minHeight: '100vh', paddingBottom: 90 }}>
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
            {property.list_price ? (
              <span style={{ color: GOLD, fontWeight: 700 }}>{formatBrl(property.list_price)}</span>
            ) : (
              <span style={{ color: '#D4AF37', fontWeight: 600, fontStyle: 'italic' }}>Price on request</span>
            )}
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
            {/* Project Facts — top of page */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
              {(property.delivery_year || property.year_built) && (
                <div style={{ background: '#fff', borderRadius: 10, padding: '18px 20px', border: '1px solid #e5e5e5' }}>
                  <div style={{ fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: 1 }}>{lang === 'ru' ? 'Сдача' : lang === 'pt' ? 'Entrega' : 'Delivery'}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: GOLD, marginTop: 4 }}>{property.delivery_year || property.year_built}</div>
                  <div style={{ fontSize: 11, color: '#aaa', marginTop: 2 }}>{property.tag || (lang === 'ru' ? 'В продаже' : lang === 'pt' ? 'À venda' : 'Now selling')}</div>
                </div>
              )}
              {property.location && (
                <div style={{ background: '#fff', borderRadius: 10, padding: '18px 20px', border: '1px solid #e5e5e5' }}>
                  <div style={{ fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: 1 }}>{lang === 'ru' ? 'Локация' : lang === 'pt' ? 'Localização' : 'Location'}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: NAVY, marginTop: 4 }}>{property.location}</div>
                  {property.region && <div style={{ fontSize: 11, color: '#aaa', marginTop: 2 }}>{property.region}, Brazil</div>}
                </div>
              )}
              {property.down_payment_pct && (
                <div style={{ background: '#fff', borderRadius: 10, padding: '18px 20px', border: '1px solid #e5e5e5' }}>
                  <div style={{ fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: 1 }}>{lang === 'ru' ? 'Взнос' : lang === 'pt' ? 'Entrada' : 'Down Payment'}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: GOLD, marginTop: 4 }}>{property.down_payment_pct}%</div>
                  <div style={{ fontSize: 11, color: '#aaa', marginTop: 2 }}>{property.installments_count ? (lang === 'ru' ? `${property.installments_count} месяцев рассрочка` : lang === 'pt' ? `${property.installments_count} meses parcelado` : `${property.installments_count} months installment`) : ''}</div>
                </div>
              )}
              {(property.beds || property.parking_spaces) && (
                <div style={{ background: '#fff', borderRadius: 10, padding: '18px 20px', border: '1px solid #e5e5e5' }}>
                  <div style={{ fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: 1 }}>{lang === 'ru' ? 'Комплектация' : lang === 'pt' ? 'Especificações' : 'Specs'}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: NAVY, marginTop: 4 }}>
                    {property.beds ? `${property.beds} ${lang === 'ru' ? 'сьютов' : lang === 'pt' ? 'suítes' : 'suites'}` : ''}
                    {property.parking_spaces ? ` · ${property.parking_spaces} ${lang === 'ru' ? 'парковок' : lang === 'pt' ? 'vagas' : 'parking'}` : ''}
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            {description && (
              <div style={{ background: '#fff', borderRadius: 12, padding: 32, marginBottom: 24, border: '1px solid #e5e5e5' }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: NAVY, marginBottom: 16, fontFamily: "'Playfair Display', serif" }}>
                  {t.projectDetails}
                </div>
                <div style={{ color: '#555', lineHeight: 1.8, fontSize: 14, whiteSpace: 'pre-line' }}>{highlightKeyFacts(description, GOLD)}</div>
              </div>
            )}

            {/* Key Features */}
            {features.length > 0 && (
              <div style={{ background: '#fff', borderRadius: 12, padding: 32, marginBottom: 24, border: '1px solid #e5e5e5' }}>
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

        {/* UNITS / APARTMENTS */}
        {activeTab === 'units' && (() => {
          const unitCards = getUnitTypes(property, lang, slug);
          const bedLabels = lang === 'ru'
            ? { 0: 'Студия', 1: '1 спальня', 2: '2 спальни', 3: '3 спальни' }
            : lang === 'pt'
            ? { 0: 'Studio', 1: '1 Quarto', 2: '2 Quartos', 3: '3 Quartos' }
            : lang === 'es'
            ? { 0: 'Studio', 1: '1 Dormitorio', 2: '2 Dormitorios', 3: '3 Dormitorios' }
            : { 0: 'Studio', 1: '1 Bed', 2: '2 Bed', 3: '3 Bed' };

          return (
            <div>
              {/* Unit type filter */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
                <button
                  onClick={() => setUnitFilter('all')}
                  style={{
                    padding: '8px 16px', borderRadius: 8,
                    border: unitFilter === 'all' ? `2px solid ${GOLD}` : '2px solid #e5e5e5',
                    background: unitFilter === 'all' ? 'rgba(212,175,55,0.1)' : '#fff',
                    color: unitFilter === 'all' ? NAVY : '#888',
                    fontSize: 13, fontWeight: unitFilter === 'all' ? 700 : 400, cursor: 'pointer',
                  }}
                >{t.allUnits}</button>
                {[1, 2, 3].map(n => (
                  <button key={n} onClick={() => setUnitFilter(String(n))}
                    style={{
                      padding: '8px 16px', borderRadius: 8,
                      border: unitFilter === String(n) ? `2px solid ${GOLD}` : '2px solid #e5e5e5',
                      background: unitFilter === String(n) ? 'rgba(212,175,55,0.1)' : '#fff',
                      color: unitFilter === String(n) ? NAVY : '#888',
                      fontSize: 13, fontWeight: unitFilter === String(n) ? 700 : 400, cursor: 'pointer',
                    }}
                  >{bedLabels[n as keyof typeof bedLabels]}</button>
                ))}
              </div>

              {/* Unit Cards Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
                {unitCards
                  .filter(u => unitFilter === 'all' || u.bedrooms === Number(unitFilter))
                  .map((u, i) => (
                    <div key={i} style={{
                      background: '#fff', borderRadius: 14,
                      border: '1px solid #e5e5e5', overflow: 'hidden',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
                    >
                      {/* Floor plan image or placeholder */}
                      {u.floorPlan ? (
                        <div style={{
                          height: 200, background: '#f8f7f3',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          overflow: 'hidden', borderBottom: '1px solid #e5e5e5',
                        }}>
                          <img
                            src={u.floorPlan}
                            alt={`${u.type} floor plan`}
                            style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 8 }}
                          />
                        </div>
                      ) : (
                        <div style={{
                          height: 200, background: '#f8f7f3',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          borderBottom: '1px solid #e5e5e5',
                        }}>
                          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                            <rect x="4" y="4" width="72" height="72" rx="4" stroke="#D4AF37" strokeWidth="2"/>
                            <rect x="12" y="12" width="28" height="30" rx="2" stroke="#D4AF37" strokeWidth="1.5"/>
                            <rect x="40" y="12" width="28" height="30" rx="2" stroke="#D4AF37" strokeWidth="1.5"/>
                            <rect x="12" y="48" width="56" height="20" rx="2" stroke="#D4AF37" strokeWidth="1.5"/>
                            <circle cx="54" cy="27" r="4" stroke="#D4AF37" strokeWidth="1.5"/>
                          </svg>
                        </div>
                      )}

                      {/* Card Content */}
                      <div style={{ padding: '16px 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                          <div style={{ fontWeight: 700, color: NAVY, fontSize: 16 }}>
                            {u.label || u.type}
                          </div>
                          <div style={{
                            padding: '3px 10px', borderRadius: 4, fontSize: 11, fontWeight: 600,
                            background: 'rgba(212,175,55,0.1)', color: GOLD,
                          }}>
                            {bedLabels[u.bedrooms as keyof typeof bedLabels]}
                          </div>
                        </div>

                        {/* Specs row */}
                        <div style={{ display: 'flex', gap: 16, marginBottom: 12, fontSize: 12, color: '#888' }}>
                          <span>📐 {u.areaMin === u.areaMax ? `${u.areaMin} m²` : `${u.areaMin}–${u.areaMax} m²`}</span>
                          <span>🚿 {u.bathrooms} {t.baths}</span>
                        </div>

                        {/* Price */}
                        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid #e5e5e5' }}>
                          <div>
                            {u.priceMin > 0 ? (
                              <>
                                <div style={{ fontSize: 11, color: '#aaa' }}>{t.from}</div>
                                <div style={{ fontSize: 18, fontWeight: 700, color: NAVY }}>{formatBrl(u.priceMin)}</div>
                                <div style={{ fontSize: 12, color: '#888' }}>{formatUsd(brlToUsd(u.priceMin))} USD</div>
                              </>
                            ) : (
                              <>
                                <div style={{ fontSize: 11, color: '#aaa' }}>&nbsp;</div>
                                <div style={{ fontSize: 16, fontWeight: 700, color: NAVY }}>
                                  {lang === 'ru' ? 'По запросу' : lang === 'pt' ? 'Sob consulta' : lang === 'es' ? 'Bajo consulta' : 'On request'}
                                </div>
                                <div style={{ fontSize: 12, color: '#888' }}>&nbsp;</div>
                              </>
                            )}
                          </div>
                          <a
                            href={`https://wa.me/5548988117424?text=${encodeURIComponent(`Hi! I'm interested in the ${u.label||u.type} at ${projectName}`)}`}
                            target="_blank" rel="noopener noreferrer"
                            style={{
                              padding: '10px 18px', borderRadius: 8, fontSize: 12, fontWeight: 700,
                              background: GOLD, color: NAVY, textDecoration: 'none',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {t.requestInfo}
                          </a>
                        </div>
                      </div>
                    </div>
                ))}
              </div>

              {unitCards.filter(u => unitFilter === 'all' || u.bedrooms === Number(unitFilter)).length === 0 && (
                <div style={{ textAlign: 'center', padding: 60, color: '#999' }}>
                  {lang === 'ru' ? 'Нет юнитов с таким количеством спален' : lang === 'pt' ? 'Sem unidades com este número de quartos' : lang === 'es' ? 'No hay unidades con esta cantidad de dormitorios' : 'No units with this bedroom count'}
                </div>
              )}

              <p style={{ color: '#999', fontSize: 11, marginTop: 24, textAlign: 'center' }}>{t.currencyDisclaimer}</p>
            </div>
          );
        })()}

        {/* FLOOR PLANS */}
        {activeTab === 'amenities' && (() => {
          const unitCards = getUnitTypes(property, lang, slug);
          return (
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16,
            }}>
              {unitCards.map((u, i) => (
                <div key={i} style={{
                  background: '#fff', borderRadius: 12,
                  border: '1px solid #e5e5e5', overflow: 'hidden',
                }}>
                  {/* Floor plan image */}
                  {u.floorPlan ? (
                    <div style={{
                      height: 220, background: '#f8f7f3',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      overflow: 'hidden', borderBottom: '1px solid #e5e5e5',
                    }}>
                      <img
                        src={u.floorPlan}
                        alt={`${u.type} floor plan`}
                        style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 8 }}
                      />
                    </div>
                  ) : (
                    <div style={{
                      height: 220, background: '#f8f7f3',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      borderBottom: '1px solid #e5e5e5',
                    }}>
                      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                        <rect x="4" y="4" width="72" height="72" rx="4" stroke="#D4AF37" strokeWidth="2"/>
                        <rect x="12" y="12" width="28" height="30" rx="2" stroke="#D4AF37" strokeWidth="1.5"/>
                        <rect x="40" y="12" width="28" height="30" rx="2" stroke="#D4AF37" strokeWidth="1.5"/>
                        <rect x="12" y="48" width="56" height="20" rx="2" stroke="#D4AF37" strokeWidth="1.5"/>
                        <circle cx="54" cy="27" r="4" stroke="#D4AF37" strokeWidth="1.5"/>
                      </svg>
                    </div>
                  )}
                  <div style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 700, color: NAVY, fontSize: 15, marginBottom: 6 }}>{u.label || u.type}</div>
                    <div style={{ display: 'flex', gap: 12, fontSize: 12, color: '#888', marginBottom: 8 }}>
                      <span>📐 {u.areaMin === u.areaMax ? `${u.areaMin} m²` : `${u.areaMin}–${u.areaMax} m²`}</span>
                      <span>🛏 ${u.bedrooms} ${t.suites === 'suites' ? 'bed' : ''}</span>
                      <span>🚿 ${u.bathrooms}</span>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: NAVY }}>
                      {formatBrl(u.priceMin)}{u.priceMax > u.priceMin ? ` — ${formatBrl(u.priceMax)}` : ''}
                    </div>
                    <div style={{ fontSize: 12, color: '#888' }}>
                      {formatUsd(brlToUsd(u.priceMin))}{u.priceMax > u.priceMin ? ` — ${formatUsd(brlToUsd(u.priceMax))}` : ''} USD
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        })()}

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

        {/* INVESTMENT CALCULATOR */}
        {activeTab === 'investment' && property.list_price && (
          <>
          <InvestmentCalculator property={property} lang={lang} t={t} GOLD={GOLD} NAVY={NAVY} slug={slug} />

          {/* Disclaimer after calculator */}
          <div style={{ background: '#fff', borderRadius: 10, padding: '16px 20px', border: '1px solid #e5e5e5', fontSize: 11, color: '#888', lineHeight: 1.7, marginTop: 24 }}>
            <strong style={{ color: '#666' }}>{lang === 'ru' ? 'Правовая информация' : lang === 'pt' ? 'Informação Legal' : 'Legal Disclaimer'}</strong><br />
            {lang === 'ru'
              ? 'Все расчёты доходности являются прогнозными и основаны на исторических данных рынка недвижимости Флорианополиса. Прошлые результаты не гарантируют будущих. Курс валют: 1 USD = R$5.30 (может измениться). Данная информация не является предложением ценных бумаг или инвестиционным советом. Рекомендуется консультация с финансовым консультантом перед принятием инвестиционных решений. CRECI 11410-J. Plan B Brazil — лицензированное риэлторское агентство.'
              : lang === 'pt'
              ? 'Todas as projeções de rentabilidade são estimativas baseadas em dados históricos do mercado imobiliário de Florianópolis. Resultados passados não garantem resultados futuros. Câmbio: 1 USD = R$5.30 (sujeito a alteração). Esta informação não constitui oferta de valores mobiliários ou conselho de investimento. Recomenda-se consulta com um consultor financeiro antes de tomar decisões de investimento. CRECI 11410-J. Plan B Brazil — imobiliária licenciada.'
              : 'All yield projections are estimates based on historical data from the Florianópolis real estate market. Past performance does not guarantee future results. Exchange rate: 1 USD = R$5.30 (subject to change). This information does not constitute an offer of securities or investment advice. Consultation with a financial advisor is recommended before making investment decisions. CRECI 11410-J. Plan B Brazil — licensed real estate agency.'}
          </div>
          </>
        )}

        {/* FAQ TAB */}
        {activeTab === 'faq' && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: NAVY, marginBottom: 20, fontFamily: "'Playfair Display', serif" }}>
              {lang === 'ru' ? 'Частые вопросы' : lang === 'pt' ? 'Perguntas Frequentes' : 'Frequently Asked Questions'}
            </h2>
            {getFAQ(property, lang).map((faq, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 10, padding: '20px 24px', border: '1px solid #e5e5e5', marginBottom: 12 }}>
                <div style={{ fontWeight: 700, color: NAVY, fontSize: 15, marginBottom: 8 }}>{faq.q}</div>
                <div style={{ color: '#555', fontSize: 14, lineHeight: 1.7 }}>{faq.a}</div>
              </div>
            ))}

            {/* How It Works — Steps */}
            <div style={{ marginTop: 32 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: NAVY, marginBottom: 8, fontFamily: "'Playfair Display', serif" }}>
                {lang === 'ru' ? 'Как купить' : lang === 'pt' ? 'Como Comprar' : 'Your Path to a New Home'}
              </h2>
              <p style={{ color: '#888', fontSize: 13, marginBottom: 24 }}>
                {lang === 'ru' ? 'Три простых шага к вашей новой недвижимости в Бразилии' : lang === 'pt' ? 'Três passos simples para seu novo imóvel no Brasil' : 'Three simple steps to your new property in Brazil'}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
                {/* Step 1 */}
                <div style={{ background: `linear-gradient(135deg, ${NAVY}, #2a3f75)`, borderRadius: 12, padding: 28, color: '#fff', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 16, right: 20, fontSize: 48, fontWeight: 900, color: 'rgba(212,175,55,0.2)' }}>01</div>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>📞</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: GOLD, marginBottom: 8 }}>{lang === 'ru' ? 'Консультация' : lang === 'pt' ? 'Consulta' : 'Consultation'}</div>
                  <div style={{ fontSize: 13, color: '#ccc', lineHeight: 1.6 }}>
                    {lang === 'ru'
                      ? 'Бесплатный звонок или чат. Обсуждаем ваши цели, бюджет и предпочтения по локации и типу недвижимости.'
                      : lang === 'pt'
                      ? 'Ligação ou chat gratuito. Discutimos seus objetivos, orçamento e preferências de localização e tipo de imóvel.'
                      : 'Free call or chat. We discuss your goals, budget, and preferences for location and property type.'}
                  </div>
                </div>
                {/* Step 2 */}
                <div style={{ background: `linear-gradient(135deg, ${NAVY}, #2a3f75)`, borderRadius: 12, padding: 28, color: '#fff', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 16, right: 20, fontSize: 48, fontWeight: 900, color: 'rgba(212,175,55,0.2)' }}>02</div>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>🏠</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: GOLD, marginBottom: 8 }}>{lang === 'ru' ? 'Подбор объекта' : lang === 'pt' ? 'Seleção de Imóvel' : 'Property Selection'}</div>
                  <div style={{ fontSize: 13, color: '#ccc', lineHeight: 1.6 }}>
                    {lang === 'ru'
                      ? 'Подбираем лучшие варианты из нашей базы. Презентация, виртуальный тур, планировки и расчёт доходности.'
                      : lang === 'pt'
                      ? 'Selecionamos as melhores opções da nossa base. Apresentação, tour virtual, plantas e cálculo de rentabilidade.'
                      : 'We select the best options from our portfolio. Presentation, virtual tour, floor plans, and ROI calculation.'}
                  </div>
                </div>
                {/* Step 3 */}
                <div style={{ background: `linear-gradient(135deg, ${NAVY}, #2a3f75)`, borderRadius: 12, padding: 28, color: '#fff', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 16, right: 20, fontSize: 48, fontWeight: 900, color: 'rgba(212,175,55,0.2)' }}>03</div>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>✅</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: GOLD, marginBottom: 8 }}>{lang === 'ru' ? 'Оформление' : lang === 'pt' ? 'Garantir o Investimento' : 'Secure Your Investment'}</div>
                  <div style={{ fontSize: 13, color: '#ccc', lineHeight: 1.6 }}>
                    {lang === 'ru'
                      ? 'Бронирование, договор, оформление CPF. Полное сопровождение от первого звонка до получения ключей.'
                      : lang === 'pt'
                      ? 'Reserva, contrato, obtenção de CPF. Acompanhamento completo da primeira ligação até as chaves.'
                      : 'Reservation, contract, CPF registration. Full support from the first call to receiving your keys.'}
                  </div>
                </div>
              </div>
            </div>

            {/* Broker Card */}
            <div style={{
              marginTop: 32,
              background: `linear-gradient(135deg, ${NAVY}, #1a2040)`,
              borderRadius: 16,
              padding: 32,
              display: 'flex',
              alignItems: 'center',
              gap: 28,
              flexWrap: 'wrap',
            }}>
              <div style={{
                width: 90, height: 90, borderRadius: '50%',
                background: `linear-gradient(135deg, ${GOLD}, #c9a227)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 36, fontWeight: 900, color: NAVY, flexShrink: 0,
              }}>KB</div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ color: GOLD, fontSize: 10, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 4 }}>
                  {lang === 'ru' ? 'Ваш персональный брокер' : lang === 'pt' ? 'Seu Corretor Pessoal' : 'Your Personal Broker'}
                </div>
                <div style={{ color: '#fff', fontSize: 22, fontWeight: 700, fontFamily: "'Playfair Display', serif", marginBottom: 12 }}>
                  Konstantin Bievskikh
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: 13 }}>
                  <a href="tel:+5548988752300" style={{ color: '#ccc', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                    📞 +55 (48) 98875-2300
                  </a>
                  <a href="mailto:planbievskikh@gmail.com" style={{ color: '#ccc', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                    ✉️ planbievskikh@gmail.com
                  </a>
                  <a href="https://planbbrazil.com" target="_blank" rel="noopener noreferrer" style={{ color: '#ccc', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                    🌐 planbbrazil.com
                  </a>
                </div>
                <div style={{ color: '#666', fontSize: 11, marginTop: 10 }}>CRECI 11410-J</div>
              </div>
            </div>

            {/* Tagline */}
            <div style={{ textAlign: 'center', marginTop: 24, letterSpacing: 4, color: GOLD, fontWeight: 800, fontSize: 12 }}>
              LIVE. INVEST. BELONG.
            </div>
          </div>
        )}
      </div>

      {/* CTA Bar */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(to top, rgba(255,255,255,0.98) 80%, rgba(255,255,255,0))',
        padding: '16px 24px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 40,
      }}>
        <a
          href="https://wa.me/5548988117424"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            padding: '14px 40px', borderRadius: 50,
            background: `linear-gradient(135deg, ${GOLD}, #c9a227)`,
            color: NAVY, fontSize: 15, fontWeight: 800, textDecoration: 'none',
            boxShadow: '0 4px 20px rgba(212,175,55,0.4)',
            letterSpacing: 0.5,
            transition: 'all 0.2s',
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
              alt={`${projectName} gallery`}
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
