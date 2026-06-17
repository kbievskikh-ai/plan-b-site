'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';

// ─── Pricing data (stored in USD, BRL = USD × rate) ───
const EXCHANGE_RATE = 5.6;
const fmtUSD = (v: number) => '$' + v.toLocaleString();
const fmtBRL = (v: number) => 'R$ ' + Math.round(v * EXCHANGE_RATE).toLocaleString('pt-BR');
const fmtPrice = (usd: number) => `${fmtUSD(usd)} (${fmtBRL(usd)})`;
const pct = (v: number, total: number) => total > 0 ? Math.round((v / total) * 100) : 0;

const FLIGHT_PRICES: Record<string, number> = {
  'Москва': 1800, 'Санкт-Петербург': 1900, 'Киев': 1700, 'Минск': 1800,
  'Алматы': 2100, 'Ташкент': 2000, 'Тбилиси': 1600, 'Ереван': 1700,
  'Стамбул': 1400, 'Дубай': 1300, 'Лиссабон': 900, 'Другой': 2000,
};

const cityNames: Record<string, { en: string }> = {
  'Москва': { en: 'Moscow' }, 'Санкт-Петербург': { en: 'St. Petersburg' }, 'Киев': { en: 'Kyiv' }, 'Минск': { en: 'Minsk' },
  'Алматы': { en: 'Almaty' }, 'Ташкент': { en: 'Tashkent' }, 'Тбилиси': { en: 'Tbilisi' }, 'Ереван': { en: 'Yerevan' },
  'Стамбул': { en: 'Istanbul' }, 'Дубай': { en: 'Dubai' }, 'Лиссабон': { en: 'Lisbon' }, 'Другой': { en: 'Other' },
};

const AREAS = [
  { name: 'Centro', apt: 700, apartHotel: 1200 },
  { name: 'Jurerê', apt: 1500, apartHotel: 2500 },
  { name: 'Campeche', apt: 600, apartHotel: 1000 },
  { name: 'Lagoa da Conceição', apt: 900, apartHotel: 1600 },
  { name: 'Canasvieiras', apt: 650, apartHotel: 1100 },
];

const HOSPITALS = [
  { name: 'Hospital Particular', natural: 2500, csection: 4500 },
  { name: 'Hospital Premium', natural: 3500, csection: 5500 },
  { name: 'Hospital Standard', natural: 2000, csection: 3800 },
  { name: 'Hospital Público (SUS)', natural: 0, csection: 0 },
];

type Section = 'flights' | 'accommodation' | 'medical' | 'documents' | 'food' | 'insurance' | 'transport' | 'misc' | 'summary';

const COLORS = ['#D4AF37', '#1B2951', '#2a3b6b', '#e8cb7a', '#6366f1', '#10b981', '#f59e0b', '#ef4444'];

export default function BirthCalculatorClient() {
  const { t, language, setLanguage } = useLanguage();
  const isRu = language === 'ru';

  // ─── State ───
  const [activeSection, setActiveSection] = useState<Section>('flights');
  const [origin, setOrigin] = useState('Москва');
  const [travelers, setTravelers] = useState(2);
  const [flightClass, setFlightClass] = useState<'economy' | 'business'>('economy');
  const [months, setMonths] = useState(3);
  const [housingType, setHousingType] = useState<'apt' | 'apartHotel'>('apt');
  const [area, setArea] = useState(2);
  const [hospitalIdx, setHospitalIdx] = useState(0);
  const [birthType, setBirthType] = useState<'natural' | 'csection'>('natural');
  const [prenatal, setPrenatal] = useState(true);
  const [pediatrician, setPediatrician] = useState(true);
  const [foodLevel, setFoodLevel] = useState(1);
  const [insuranceType, setInsuranceType] = useState(1);
  const [transportType, setTransportType] = useState(1);
  const [babySupplies, setBabySupplies] = useState(true);
  const [tourism, setTourism] = useState(true);
  const [emergencyFund, setEmergencyFund] = useState(true);

  // ─── Section labels ───
  const sections: { id: Section; title: string; icon: string }[] = [
    { id: 'flights', title: isRu ? t('birthCalc.sections.flightsRu') : t('birthCalc.sections.flights'), icon: '✈️' },
    { id: 'accommodation', title: isRu ? t('birthCalc.sections.accommodationRu') : t('birthCalc.sections.accommodation'), icon: '🏠' },
    { id: 'medical', title: isRu ? t('birthCalc.sections.medicalRu') : t('birthCalc.sections.medical'), icon: '🏥' },
    { id: 'documents', title: isRu ? t('birthCalc.sections.documentsRu') : t('birthCalc.sections.documents'), icon: '📄' },
    { id: 'food', title: isRu ? t('birthCalc.sections.foodRu') : t('birthCalc.sections.food'), icon: '🍽' },
    { id: 'insurance', title: isRu ? t('birthCalc.sections.insuranceRu') : t('birthCalc.sections.insurance'), icon: '🛡' },
    { id: 'transport', title: isRu ? t('birthCalc.sections.transportRu') : t('birthCalc.sections.transport'), icon: '🚗' },
    { id: 'misc', title: isRu ? t('birthCalc.sections.miscRu') : t('birthCalc.sections.misc'), icon: '📦' },
  ];

  const sectionCost = (id: Section) => {
    const c = calcCosts();
    switch (id) {
      case 'flights': return c.flights; case 'accommodation': return c.accommodation;
      case 'medical': return c.medical; case 'documents': return c.documents;
      case 'food': return c.food; case 'insurance': return c.insurance;
      case 'transport': return c.transport; default: return c.misc;
    }
  };

  // ─── Calculations ───
  const calcCosts = () => {
    const flightPerPerson = FLIGHT_PRICES[origin] * (flightClass === 'business' ? 2.5 : 1);
    const flights = flightPerPerson * travelers * 2;
    const areaData = AREAS[area];
    const monthlyRent = housingType === 'apt' ? areaData.apt : areaData.apartHotel;
    const accommodation = monthlyRent * months;
    const hosp = HOSPITALS[hospitalIdx];
    const birth = birthType === 'natural' ? hosp.natural : hosp.csection;
    const prenatalCost = prenatal ? 800 : 0;
    const pedCost = pediatrician ? 400 : 0;
    const anesthesia = birthType === 'csection' ? 700 : 300;
    const medical = birth + prenatalCost + pedCost + anesthesia;
    const documents = 0 + 0 + 80 + 50 + 150 + 10; // passport $80, apostille $50, translation $150, photos $10
    const foodPerMonth = [300, 500, 800][foodLevel];
    const food = foodPerMonth * months;
    const insurancePerMonth = [0, 150, 400][insuranceType];
    const insurance = insurancePerMonth * months;
    const transportPerMonth = [50, 300, 700][transportType];
    const transport = transportPerMonth * months;
    let misc = 0;
    if (babySupplies) misc += 600;
    if (tourism) misc += months * 300;
    if (emergencyFund) misc += 1000;
    const total = flights + accommodation + medical + documents + food + insurance + transport + misc;
    return { flights, accommodation, medical, documents, food, insurance, transport, misc, total };
  };

  const costs = calcCosts();

  const costItems = [
    { label: '✈️ ' + (isRu ? t('birthCalc.sections.flightsRu') : t('birthCalc.sections.flights')), value: costs.flights },
    { label: '🏠 ' + (isRu ? t('birthCalc.sections.accommodationRu') : t('birthCalc.sections.accommodation')), value: costs.accommodation },
    { label: '🏥 ' + (isRu ? t('birthCalc.sections.medicalRu') : t('birthCalc.sections.medical')), value: costs.medical },
    { label: '📄 ' + (isRu ? t('birthCalc.sections.documentsRu') : t('birthCalc.sections.documents')), value: costs.documents },
    { label: '🍽 ' + (isRu ? t('birthCalc.sections.foodRu') : t('birthCalc.sections.food')), value: costs.food },
    { label: '🛡 ' + (isRu ? t('birthCalc.sections.insuranceRu') : t('birthCalc.sections.insurance')), value: costs.insurance },
    { label: '🚗 ' + (isRu ? t('birthCalc.sections.transportRu') : t('birthCalc.sections.transport')), value: costs.transport },
    { label: '📦 ' + (isRu ? t('birthCalc.sections.miscRu') : t('birthCalc.sections.misc')), value: costs.misc },
  ];

  const bcT = (key: string) => t(`birthCalc.${key}`);
  const fsT = (key: string) => t(`birthCalc.flightsSection.${key}`);
  const acT = (key: string) => t(`birthCalc.accommodationSection.${key}`);
  const mdT = (key: string) => t(`birthCalc.medicalSection.${key}`);
  const dcT = (key: string) => t(`birthCalc.documentsSection.${key}`);
  const fdT = (key: string) => t(`birthCalc.foodSection.${key}`);
  const inT = (key: string) => t(`birthCalc.insuranceSection.${key}`);
  const trT = (key: string) => t(`birthCalc.transportSection.${key}`);
  const mxT = (key: string) => t(`birthCalc.miscSection.${key}`);

  return (
    <div className="min-h-screen bg-navy-950 text-white">
      {/* Language Switcher — centered */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-1 bg-navy-900/90 backdrop-blur rounded-full border border-gold-400/30 p-1 shadow-lg">
        <button
          onClick={() => setLanguage('en')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
            !isRu ? 'bg-gold-500 text-navy-950' : 'text-gold-400/60 hover:text-gold-400'
          }`}
        >EN</button>
        <button
          onClick={() => setLanguage('ru')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
            isRu ? 'bg-gold-500 text-navy-950' : 'text-gold-400/60 hover:text-gold-400'
          }`}
        >RU</button>
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gold-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1.5 bg-gold-500/20 text-gold-400 rounded-full text-sm font-medium mb-6">
              {isRu ? bcT('badgeRu') : bcT('badge')}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              {isRu ? bcT('title1Ru') : bcT('title1')} <span className="text-gold-400">{isRu ? bcT('titleHighlightRu') : bcT('titleHighlight')}</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              {isRu ? bcT('subtitleRu') : bcT('subtitle')}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Sticky total bar */}
      <div className="sticky top-0 z-50 bg-navy-900/95 backdrop-blur border-b border-gold-500/20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <span className="text-gray-400 text-sm">{isRu ? bcT('totalLabelRu') : bcT('totalLabel')}:</span>
          <div className="text-right">
            <span className="text-2xl md:text-3xl font-bold text-gold-400">{fmtUSD(costs.total)}</span>
            <span className="text-gray-400 ml-2 text-sm">≈ {fmtBRL(costs.total)}</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Navigation */}
          <div className="lg:col-span-1 space-y-2">
            {sections.map((s) => (
              <button key={s.id} onClick={() => setActiveSection(s.id)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                  activeSection === s.id
                    ? 'bg-gold-500/20 border border-gold-500/30 text-gold-400'
                    : 'bg-navy-800/50 border border-transparent hover:bg-navy-800 text-gray-300'
                }`}
              >
                <span className="mr-2">{s.icon}</span>
                <span className="font-medium">{s.title}</span>
                <span className="float-right text-sm opacity-70">{fmtUSD(sectionCost(s.id))}</span>
              </button>
            ))}
            <button onClick={() => setActiveSection('summary')}
              className={`w-full text-left px-4 py-4 rounded-xl transition-all mt-4 font-bold ${
                activeSection === 'summary'
                  ? 'bg-gold-500 text-navy-950'
                  : 'bg-gold-500/10 border border-gold-500/30 text-gold-400 hover:bg-gold-500/20'
              }`}
            >
              📊 {isRu ? bcT('totalLabelRu') : bcT('totalLabel')}: {fmtUSD(costs.total)}
            </button>
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-2">
            <motion.div key={activeSection} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              className="bg-navy-800/50 rounded-2xl p-6 md:p-8 border border-white/5"
            >
              {/* ─── FLIGHTS ─── */}
              {activeSection === 'flights' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{fsT('title')}</h2>
                  <p className="text-gray-400 text-sm mb-6">{isRu ? fsT('descRu') : fsT('desc')}</p>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">{isRu ? fsT('cityLabelRu') : fsT('cityLabel')}</label>
                    <select value={origin} onChange={e => setOrigin(e.target.value)}
                      className="w-full bg-navy-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold-500 focus:outline-none">
                      {Object.keys(FLIGHT_PRICES).map(c => <option key={c} value={c}>{isRu ? c : cityNames[c]?.en || c}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">{isRu ? fsT('travelersLabelRu') : fsT('travelersLabel')}: {travelers}</label>
                    <input type="range" min={1} max={4} value={travelers} onChange={e => setTravelers(+e.target.value)} className="w-full accent-gold-500" />
                    <div className="flex justify-between text-xs text-gray-500 mt-1"><span>1</span><span>4</span></div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">{isRu ? fsT('classLabelRu') : fsT('classLabel')}</label>
                    <div className="grid grid-cols-2 gap-3">
                      {(['economy', 'business'] as const).map(c => (
                        <button key={c} onClick={() => setFlightClass(c)}
                          className={`py-3 rounded-xl font-medium transition ${flightClass === c ? 'bg-gold-500 text-navy-950' : 'bg-navy-900 text-gray-300 border border-white/10'}`}>
                          {isRu ? fsT(c === 'economy' ? 'economyRu' : 'businessRu') : fsT(c === 'economy' ? 'economy' : 'business')}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-navy-900/50 rounded-xl p-4 mt-4">
                    <p className="text-sm text-gray-400">{isRu ? fsT('infoRu') : fsT('info')}</p>
                  </div>
                </div>
              )}

              {/* ─── ACCOMMODATION ─── */}
              {activeSection === 'accommodation' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{acT('title')}</h2>
                  <p className="text-gray-400 text-sm mb-6">{isRu ? acT('descRu') : acT('desc')}</p>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">{isRu ? acT('monthsLabelRu') : acT('monthsLabel')}: {months}</label>
                    <input type="range" min={1} max={6} value={months} onChange={e => setMonths(+e.target.value)} className="w-full accent-gold-500" />
                    <div className="flex justify-between text-xs text-gray-500 mt-1"><span>1</span><span>6</span></div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">{isRu ? acT('typeLabelRu') : acT('typeLabel')}</label>
                    <div className="grid grid-cols-2 gap-3">
                      {(['apt', 'apartHotel'] as const).map(t => (
                        <button key={t} onClick={() => setHousingType(t)}
                          className={`py-3 rounded-xl font-medium transition ${housingType === t ? 'bg-gold-500 text-navy-950' : 'bg-navy-900 text-gray-300 border border-white/10'}`}>
                          {isRu ? acT(t === 'apt' ? 'aptRu' : 'apartHotelRu') : acT(t === 'apt' ? 'apt' : 'apartHotel')}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">{isRu ? acT('areaLabelRu') : acT('areaLabel')}</label>
                    <div className="grid grid-cols-1 gap-2">
                      {AREAS.map((a, i) => (
                        <button key={a.name} onClick={() => setArea(i)}
                          className={`px-4 py-3 rounded-xl text-left transition ${area === i ? 'bg-gold-500/20 border border-gold-500/30 text-gold-400' : 'bg-navy-900 border border-white/10 text-gray-300'}`}>
                          <div className="font-medium">{a.name}</div>
                          <div className="text-sm opacity-70">
                            {isRu ? acT('aptRu') : acT('apt')}: {fmtUSD(housingType === 'apt' ? a.apt : a.apartHotel)}/мес
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-navy-900/50 rounded-xl p-4 mt-4">
                    <p className="text-sm text-gray-400">{isRu ? acT('infoRu') : acT('info')}</p>
                  </div>
                </div>
              )}

              {/* ─── MEDICAL ─── */}
              {activeSection === 'medical' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{mdT('title')}</h2>
                  <p className="text-gray-400 text-sm mb-6">{isRu ? mdT('descRu') : mdT('desc')}</p>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">{isRu ? mdT('hospitalLabelRu') : mdT('hospitalLabel')}</label>
                    <div className="grid grid-cols-1 gap-2">
                      {HOSPITALS.map((h, i) => (
                        <button key={h.name} onClick={() => setHospitalIdx(i)}
                          className={`px-4 py-3 rounded-xl text-left transition ${hospitalIdx === i ? 'bg-gold-500/20 border border-gold-500/30 text-gold-400' : 'bg-navy-900 border border-white/10 text-gray-300'}`}>
                          <div className="font-medium">{h.name}</div>
                          <div className="text-sm opacity-70">
                            {isRu ? mdT('naturalRu') : mdT('natural')}: {h.natural === 0 ? 'SUS (free)' : fmtUSD(h.natural)} | {isRu ? mdT('csectionRu') : mdT('csection')}: {h.csection === 0 ? 'SUS (free)' : fmtUSD(h.csection)}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">{isRu ? mdT('birthTypeLabelRu') : mdT('birthTypeLabel')}</label>
                    <div className="grid grid-cols-2 gap-3">
                      {(['natural', 'csection'] as const).map(bt => (
                        <button key={bt} onClick={() => setBirthType(bt)}
                          className={`py-3 rounded-xl font-medium transition ${birthType === bt ? 'bg-gold-500 text-navy-950' : 'bg-navy-900 text-gray-300 border border-white/10'}`}>
                          {isRu ? mdT(bt === 'natural' ? 'naturalRu' : 'csectionRu') : mdT(bt === 'natural' ? 'natural' : 'csection')}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      { checked: prenatal, set: setPrenatal, labelKey: 'prenatal', labelKeyRu: 'prenatalRu', cost: 800 },
                      { checked: pediatrician, set: setPediatrician, labelKey: 'pediatrician', labelKeyRu: 'pediatricianRu', cost: 400 },
                    ].map(item => (
                      <label key={item.labelKey} className="flex items-center gap-3 px-4 py-3 bg-navy-900/50 rounded-xl cursor-pointer">
                        <input type="checkbox" checked={item.checked} onChange={e => item.set(e.target.checked)} className="accent-gold-500 w-5 h-5" />
                        <span className="text-sm text-gray-300">{isRu ? mdT(item.labelKeyRu) : mdT(item.labelKey)}</span>
                        <span className="ml-auto text-sm text-gold-400">{item.checked ? fmtUSD(item.cost) : '—'}</span>
                      </label>
                    ))}
                  </div>

                  <div className="bg-navy-900/50 rounded-xl p-4">
                    <p className="text-sm text-gray-400">{isRu ? mdT('infoRu') : mdT('info')}</p>
                  </div>
                </div>
              )}

              {/* ─── DOCUMENTS ─── */}
              {activeSection === 'documents' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{dcT('title')}</h2>
                  <p className="text-gray-400 text-sm mb-6">{isRu ? dcT('descRu') : dcT('desc')}</p>

                  <div className="space-y-3">
                    {[
                      { label: isRu ? 'Свидетельство о рождении' : 'Birth Certificate', cost: 0 },
                      { label: 'CPF (Brazilian tax ID)', cost: 0 },
                      { label: isRu ? 'Паспорт Бразилии для ребёнка' : 'Brazilian passport for baby', cost: 80 },
                      { label: 'Apostille', cost: 50 },
                      { label: isRu ? 'Перевод документов' : 'Document translation', cost: 150 },
                      { label: isRu ? 'Фотографии' : 'Photos', cost: 10 },
                    ].map((d, i) => (
                      <div key={i} className="flex justify-between px-4 py-3 bg-navy-900/50 rounded-xl">
                        <span className="text-sm text-gray-300">{d.label}</span>
                        <span className="text-sm text-gold-400">{d.cost === 0 ? (isRu ? 'Бесплатно' : 'Free') : fmtUSD(d.cost)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-navy-900/50 rounded-xl p-4">
                    <p className="text-sm text-gray-400">{isRu ? dcT('infoRu') : dcT('info')}</p>
                  </div>
                </div>
              )}

              {/* ─── FOOD ─── */}
              {activeSection === 'food' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{fdT('title')}</h2>
                  <p className="text-gray-400 text-sm mb-6">{isRu ? fdT('descRu') : fdT('desc')}</p>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">{isRu ? fdT('levelLabelRu') : fdT('levelLabel')}</label>
                    <div className="grid grid-cols-3 gap-3">
                      {([
                        { key: 'basic', keyRu: 'basicRu', cost: 300 },
                        { key: 'comfy', keyRu: 'comfyRu', cost: 500 },
                        { key: 'premium', keyRu: 'premiumRu', cost: 1500 },
                      ] as const).map((level, i) => (
                        <button key={level.key} onClick={() => setFoodLevel(i)}
                          className={`py-3 rounded-xl font-medium transition text-center ${foodLevel === i ? 'bg-gold-500 text-navy-950' : 'bg-navy-900 text-gray-300 border border-white/10'}`}>
                          <div>{isRu ? fdT(level.keyRu) : fdT(level.key)}</div>
                          <div className="text-xs mt-1 opacity-70">{fmtUSD(level.cost)}/мес</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── INSURANCE ─── */}
              {activeSection === 'insurance' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{inT('title')}</h2>
                  <p className="text-gray-400 text-sm mb-6">{isRu ? inT('descRu') : inT('desc')}</p>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">{isRu ? inT('typeLabelRu') : inT('typeLabel')}</label>
                    <div className="grid grid-cols-1 gap-2">
                      {([
                        { key: 'none', keyRu: 'noneRu', cost: 0 },
                        { key: 'standard', keyRu: 'standardRu', cost: 150 },
                        { key: 'premium', keyRu: 'premiumRu', cost: 400 },
                      ] as const).map((level, i) => (
                        <button key={level.key} onClick={() => setInsuranceType(i)}
                          className={`px-4 py-3 rounded-xl text-left transition ${insuranceType === i ? 'bg-gold-500/20 border border-gold-500/30 text-gold-400' : 'bg-navy-900 border border-white/10 text-gray-300'}`}>
                          <div className="font-medium">{isRu ? inT(level.keyRu) : inT(level.key)}</div>
                          <div className="text-sm opacity-70">{level.cost === 0 ? (isRu ? 'Бесплатно' : 'Free') : fmtUSD(level.cost) + '/мес'}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── TRANSPORT ─── */}
              {activeSection === 'transport' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{trT('title')}</h2>
                  <p className="text-gray-400 text-sm mb-6">{isRu ? trT('descRu') : trT('desc')}</p>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">{isRu ? trT('typeLabelRu') : trT('typeLabel')}</label>
                    <div className="grid grid-cols-1 gap-2">
                      {([
                        { key: 'public', keyRu: 'publicRu', cost: 50 },
                        { key: 'uber', keyRu: 'uberRu', cost: 300 },
                        { key: 'rental', keyRu: 'rentalRu', cost: 700 },
                      ] as const).map((level, i) => (
                        <button key={level.key} onClick={() => setTransportType(i)}
                          className={`px-4 py-3 rounded-xl text-left transition ${transportType === i ? 'bg-gold-500/20 border border-gold-500/30 text-gold-400' : 'bg-navy-900 border border-white/10 text-gray-300'}`}>
                          <div className="font-medium">{isRu ? trT(level.keyRu) : trT(level.key)}</div>
                          <div className="text-sm opacity-70">{fmtUSD(level.cost)}/мес</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── MISC ─── */}
              {activeSection === 'misc' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{mxT('title')}</h2>
                  <p className="text-gray-400 text-sm mb-6">{isRu ? mxT('descRu') : mxT('desc')}</p>

                  <div className="space-y-3">
                    {[
                      { checked: babySupplies, set: setBabySupplies, labelKey: 'babySupplies', labelKeyRu: 'babySuppliesRu', cost: 600 },
                      { checked: tourism, set: setTourism, labelKey: 'tourism', labelKeyRu: 'tourismRu', cost: 300 * months },
                      { checked: emergencyFund, set: setEmergencyFund, labelKey: 'emergencyFund', labelKeyRu: 'emergencyFundRu', cost: 1000 },
                    ].map(item => (
                      <label key={item.labelKey} className="flex items-center gap-3 px-4 py-3 bg-navy-900/50 rounded-xl cursor-pointer">
                        <input type="checkbox" checked={item.checked} onChange={e => item.set(e.target.checked)} className="accent-gold-500 w-5 h-5" />
                        <span className="text-sm text-gray-300">{isRu ? mxT(item.labelKeyRu) : mxT(item.labelKey)}</span>
                        <span className="ml-auto text-sm text-gold-400">{item.checked ? fmtUSD(item.cost) : '—'}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* ─── SUMMARY ─── */}
              {activeSection === 'summary' && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>{isRu ? bcT('summaryTitleRu') : bcT('summaryTitle')}</h2>

                  {/* Donut chart */}
                  <div className="flex items-center gap-8">
                    <div className="relative w-48 h-48 flex-shrink-0">
                      <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                        {costItems.reduce((acc, item, i) => {
                          const prev = acc.prevTotal;
                          const dashArray = `${pct(item.value, costs.total)}, ${100 - pct(item.value, costs.total)}`;
                          acc.elements.push(
                            <circle key={i} cx="18" cy="18" r="15.915" fill="none" stroke={COLORS[i]} strokeWidth="3"
                              strokeDasharray={dashArray} strokeDashoffset={-prev} className="transition-all duration-500" />
                          );
                          acc.prevTotal += pct(item.value, costs.total);
                          return acc;
                        }, { elements: [] as JSX.Element[], prevTotal: 0 }).elements}
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-2xl font-bold text-gold-400">{fmtUSD(costs.total)}</div>
                        <div className="text-xs text-gray-500">{fmtBRL(costs.total)}</div>
                      </div>
                    </div>

                    <div className="flex-1 space-y-2">
                      {costItems.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i] }} />
                          <span className="text-sm flex-1">{item.label}</span>
                          <span className="text-sm font-medium">{fmtUSD(item.value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Breakdown bars */}
                  <div className="space-y-4">
                    {costItems.map((item, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-40 text-sm text-gray-400 flex-shrink-0">{item.label}</div>
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">{fmtUSD(item.value)}</span>
                            <span className="text-sm text-gray-500">{pct(item.value, costs.total)}%</span>
                          </div>
                          <div className="w-full bg-navy-900 rounded-full h-2">
                            <div className="h-2 rounded-full transition-all" style={{ width: `${pct(item.value, costs.total)}%`, backgroundColor: COLORS[i] }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <a href="https://wa.me/5548988117424" target="_blank" rel="noopener noreferrer"
                    className="block w-full bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-center py-4 rounded-xl text-lg transition mt-6">
                    💬 {isRu ? bcT('ctaRu') : bcT('cta')}
                  </a>
                  <p className="text-center text-xs text-gray-500">{isRu ? bcT('ctaNoteRu') : bcT('ctaNote')}</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>

                  {/* Citizenship Benefits */}
                  <div className="bg-gradient-to-br from-green-900/20 to-gold-500/10 border border-gold-400/20 rounded-2xl p-6 mt-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">🇧🇷</span>
                      <div>
                        <h3 className="text-xl font-bold text-gold-400" style={{ fontFamily: 'Playfair Display, serif' }}>
                          {isRu ? bcT('citizenshipTitleRu') : bcT('citizenshipTitle')}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {isRu ? bcT('citizenshipSubtitleRu') : bcT('citizenshipSubtitle')}
                        </p>
                      </div>
                    </div>

                    {/* Citizenship flow */}
                    <div className="flex items-start gap-2 mb-6 overflow-x-auto pb-2">
                      {[
                        { emoji: '👶', label: isRu ? 'Рождение' : 'Birth' },
                        { emoji: '🇧🇷', label: isRu ? 'Гражданство' : 'Citizenship' },
                        { emoji: '🛂', label: isRu ? 'Паспорт' : 'Passport' },
                        { emoji: '‍👩‍👦', label: isRu ? 'Резидентство родителей' : 'Parents Residency' },
                      ].map((step, i) => (
                        <div key={i} className="flex items-center min-w-fit">
                          <div className="text-center px-4 py-3 bg-white/5 rounded-xl border border-gold-400/20">
                            <div className="text-2xl mb-1">{step.emoji}</div>
                            <div className="text-xs text-gray-300">{step.label}</div>
                          </div>
                          {i < 3 && <div className="w-8 h-0.5 bg-gold-400/30 mx-1 mt-6" />}
                        </div>
                      ))}
                    </div>

                    {/* Key benefits */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        { icon: '🇧🇷', title: isRu ? 'Гражданство по праву рождения' : 'Birthright Citizenship', desc: isRu ? 'Ребёнок автоматически получает бразильское гражданство — jure soli' : 'Child automatically receives Brazilian citizenship — jure soli' },
                        { icon: '🛂', title: isRu ? 'Бразильский паспорт' : 'Brazilian Passport', desc: isRu ? 'Безвиз в 170+ стран, включая ЕС, Великобританию, Южную Америку' : 'Visa-free to 170+ countries including EU, UK, South America' },
                        { icon: '👨‍👩‍', title: isRu ? 'Резидентство для родителей' : 'Residency for Parents', desc: isRu ? 'Родители получают право на постоянное жительство через ребёнка' : 'Parents get permanent residency rights through the child' },
                        { icon: '', title: isRu ? 'Свобода передвижения' : 'Freedom of Movement', desc: isRu ? 'Паспорт Бразилии входит в топ-20 самых сильных в мире' : 'Brazilian passport ranks among top 20 globally' },
                      ].map((b, i) => (
                        <div key={i} className="flex gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                          <span className="text-xl flex-shrink-0">{b.icon}</span>
                          <div>
                            <div className="text-sm font-semibold text-gold-300">{b.title}</div>
                            <div className="text-xs text-gray-400 mt-0.5">{b.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Comparison Table */}
                  <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {isRu ? bcT('comparisonTitleRu') : bcT('comparisonTitle')}
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-gray-400 border-b border-white/10">
                            <th className="text-left py-3 px-3">{isRu ? 'Страна' : 'Country'}</th>
                            <th className="text-center py-3 px-3">{isRu ? 'Стоимость' : 'Cost'}</th>
                            <th className="text-center py-3 px-3 hidden sm:table-cell">{isRu ? 'Комфорт' : 'Comfort'}</th>
                            <th className="text-center py-3 px-3 hidden sm:table-cell">{isRu ? 'Гражданство' : 'Citizenship'}</th>
                            <th className="text-center py-3 px-3 hidden md:table-cell">{isRu ? 'Медицина' : 'Medicine'}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { flag: '🇷', name: isRu ? 'Бразилия' : 'Brazil', cost: costs.total, comfort: '★★★★☆', citizenship: isRu ? 'Автомат' : 'Automatic', medicine: isRu ? 'Высокое' : 'High', highlight: true },
                            { flag: '🇺🇸', name: isRu ? 'США' : 'USA', cost: costs.total * 3.5, comfort: '★★★★★', citizenship: isRu ? 'Автомат' : 'Automatic', medicine: isRu ? 'Топ' : 'Top' },
                            { flag: '🇹', name: isRu ? 'Португалия' : 'Portugal', cost: costs.total * 2.2, comfort: '★★★★☆', citizenship: isRu ? '—' : '—', medicine: isRu ? 'Высокое' : 'High' },
                            { flag: '🇹🇭', name: isRu ? 'Таиланд' : 'Thailand', cost: costs.total * 1.3, comfort: '★★★☆☆', citizenship: isRu ? '—' : '—', medicine: isRu ? 'Хорошее' : 'Good' },
                          ].map((c, i) => (
                            <tr key={i} className={`border-b border-white/5 ${c.highlight ? 'bg-gold-500/10' : ''}`}>
                              <td className="py-3 px-3">
                                <span className={c.highlight ? 'font-bold text-gold-400' : 'text-gray-300'}>
                                  {c.flag} {c.name}
                                </span>
                              </td>
                              <td className="text-center py-3 px-3">
                                <span className={c.highlight ? 'font-bold text-gold-400' : 'text-gray-300'}>
                                  {fmtUSD(c.cost)}
                                </span>
                              </td>
                              <td className="text-center py-3 px-3 text-yellow-400 hidden sm:table-cell">{c.comfort}</td>
                              <td className="text-center py-3 px-3 hidden sm:table-cell">
                                <span className={c.citizenship === '—' ? 'text-gray-500' : 'text-green-400'}>
                                  {c.citizenship}
                                </span>
                              </td>
                              <td className="text-center py-3 px-3 text-gray-300 hidden md:table-cell">{c.medicine}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-xs text-gray-500 mt-3">
                      {isRu ? '* Оценки комфорта и медицины субъективны и основаны на отзывах клиентов' : '* Comfort and medicine ratings are subjective, based on client feedback'}
                    </p>
                  </div>


        {/* Disclaimer */}
        <div className="mt-8 bg-navy-900/50 rounded-xl p-5 border border-white/5">
          <p className="text-xs text-gray-500 leading-relaxed">
            ⚠️ {isRu ? bcT('disclaimerRu') : bcT('disclaimer')}
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 mb-8 text-center">
          <a href="https://wa.me/5548988117424" target="_blank" rel="noopener noreferrer"
            className="inline-block bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold px-8 py-4 rounded-xl text-lg transition">
            💬 {isRu ? bcT('bottomCtaRu') : bcT('bottomCta')}
          </a>
          <p className="text-gray-500 text-sm mt-3">{isRu ? bcT('bottomNoteRu') : bcT('bottomNote')}</p>
        </div>
      </div>
    </div>
  );
}
