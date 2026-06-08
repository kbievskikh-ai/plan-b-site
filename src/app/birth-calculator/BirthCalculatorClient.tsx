'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

// ─── Pricing data ───
const FLIGHT_PRICES: Record<string, number> = {
  'Москва': 1800, 'Санкт-Петербург': 1900, 'Киев': 1700, 'Минск': 1800,
  'Алматы': 2100, 'Ташкент': 2000, 'Тбилиси': 1600, 'Ереван': 1700,
  'Стамбул': 1400, 'Дубай': 1300, 'Лиссабон': 900, 'Другой': 2000,
};

const AREAS = [
  { name: 'Centro', apt: 3500, apartHotel: 6500 },
  { name: 'Jurerê', apt: 5500, apartHotel: 9000 },
  { name: 'Campeche', apt: 3000, apartHotel: 5500 },
  { name: 'Lagoa da Conceição', apt: 4500, apartHotel: 7500 },
  { name: 'Canasvieiras', apt: 3200, apartHotel: 5800 },
];

const HOSPITALS = [
  { name: 'Hospital Florianópolis', natural: 12000, csection: 20000 },
  { name: 'Hospital Unimed', natural: 15000, csection: 25000 },
  { name: 'Hospital São José', natural: 10000, csection: 17000 },
  { name: 'Hospital Infantil (SUS)', natural: 0, csection: 0 },
];

type Section = 'flights' | 'accommodation' | 'medical' | 'documents' | 'food' | 'insurance' | 'transport' | 'misc' | 'summary';

const SECTIONS: { id: Section; title: string; icon: string }[] = [
  { id: 'flights', title: 'Перелёт', icon: '✈️' },
  { id: 'accommodation', title: 'Проживание', icon: '🏠' },
  { id: 'medical', title: 'Роды и медицина', icon: '🏥' },
  { id: 'documents', title: 'Документы', icon: '📄' },
  { id: 'food', title: 'Питание', icon: '🍽' },
  { id: 'insurance', title: 'Страховка', icon: '🛡' },
  { id: 'transport', title: 'Транспорт', icon: '🚗' },
  { id: 'misc', title: 'Дополнительно', icon: '📦' },
];

const formatBRL = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const formatUSD = (v: number) => '$' + Math.round(v / 5.1).toLocaleString();
const pct = (v: number, total: number) => total > 0 ? Math.round((v / total) * 100) : 0;

const COLORS = ['#D4AF37', '#1B2951', '#2a3b6b', '#e8cb7a', '#6366f1', '#10b981', '#f59e0b', '#ef4444'];

export default function BirthCalculatorClient() {
  // ─── State ───
  const [activeSection, setActiveSection] = useState<Section>('flights');
  const [origin, setOrigin] = useState('Москва');
  const [travelers, setTravelers] = useState(2);
  const [flightClass, setFlightClass] = useState<'economy' | 'business'>('economy');

  const [months, setMonths] = useState(3);
  const [housingType, setHousingType] = useState<'apt' | 'apartHotel'>('apt');
  const [area, setArea] = useState(2); // index

  const [hospitalIdx, setHospitalIdx] = useState(0);
  const [birthType, setBirthType] = useState<'natural' | 'csection'>('natural');
  const [prenatal, setPrenatal] = useState(true);
  const [pediatrician, setPediatrician] = useState(true);

  const [foodLevel, setFoodLevel] = useState(1); // 0=basic, 1=comfy, 2=premium

  const [insuranceType, setInsuranceType] = useState(1); // 0=none, 1=standard, 2=premium

  const [transportType, setTransportType] = useState(1); // 0=public, 1=uber, 2=rental

  const [babySupplies, setBabySupplies] = useState(true);
  const [tourism, setTourism] = useState(true);
  const [emergencyFund, setEmergencyFund] = useState(true);

  // ─── Calculations ───
  const costs = useMemo(() => {
    const flightPerPerson = FLIGHT_PRICES[origin] * (flightClass === 'business' ? 2.5 : 1);
    const flights = flightPerPerson * travelers * 2; // round trip

    const areaData = AREAS[area];
    const monthlyRent = housingType === 'apt' ? areaData.apt : areaData.apartHotel;
    const accommodation = monthlyRent * months;

    const hosp = HOSPITALS[hospitalIdx];
    const birth = birthType === 'natural' ? hosp.natural : hosp.csection;
    const prenatalCost = prenatal ? 4500 : 0; // consultations + ultrasounds
    const pedCost = pediatrician ? 2000 : 0;
    const anesthesia = birthType === 'csection' ? 3000 : 1500;
    const medical = birth + prenatalCost + pedCost + anesthesia;

    const birthCert = 0; // free in Brazil
    const cpf = 0; // free
    const passport = 350; // R$
    const apostille = 200;
    const translation = 800;
    const photos = 50;
    const documents = birthCert + cpf + passport + apostille + translation + photos;

    const foodPerMonth = [3500, 5500, 8000][foodLevel];
    const food = foodPerMonth * months;

    const insurancePerMonth = [0, 1200, 2500][insuranceType];
    const insurance = insurancePerMonth * months;

    const transportPerMonth = [400, 1500, 3500][transportType];
    const transport = transportPerMonth * months;

    let misc = 0;
    if (babySupplies) misc += 3000;
    if (tourism) misc += months * 1500;
    if (emergencyFund) misc += 5000;

    const total = flights + accommodation + medical + documents + food + insurance + transport + misc;

    return { flights, accommodation, medical, documents, food, insurance, transport, misc, total };
  }, [origin, flightClass, travelers, months, housingType, area, hospitalIdx, birthType, prenatal, pediatrician, foodLevel, insuranceType, transportType, babySupplies, tourism, emergencyFund]);

  const costItems = [
    { label: '✈️ Перелёт', value: costs.flights },
    { label: '🏠 Проживание', value: costs.accommodation },
    { label: '🏥 Роды и медицина', value: costs.medical },
    { label: '📄 Документы', value: costs.documents },
    { label: '🍽 Питание', value: costs.food },
    { label: '🛡 Страховка', value: costs.insurance },
    { label: '🚗 Транспорт', value: costs.transport },
    { label: '📦 Дополнительно', value: costs.misc },
  ];

  return (
    <div className="min-h-screen bg-navy-950 text-white">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gold-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1.5 bg-gold-500/20 text-gold-400 rounded-full text-sm font-medium mb-6">
              Birth Tourism Calculator
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Калькулятор стоимости <span className="text-gold-400">родов в Бразилии</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Рассчитайте полную стоимость рождения ребёнка в Бразилии: перелёт, проживание, роды, оформление документов и гражданство
            </p>
          </motion.div>
        </div>
      </div>

      {/* Sticky total bar */}
      <div className="sticky top-0 z-50 bg-navy-900/95 backdrop-blur border-b border-gold-500/20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <span className="text-gray-400 text-sm">Итого:</span>
          <div className="text-right">
            <span className="text-2xl md:text-3xl font-bold text-gold-400">{formatBRL(costs.total)}</span>
            <span className="text-gray-400 ml-2 text-sm">≈ {formatUSD(costs.total)}</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Navigation */}
          <div className="lg:col-span-1 space-y-2">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                  activeSection === s.id
                    ? 'bg-gold-500/20 border border-gold-500/30 text-gold-400'
                    : 'bg-navy-800/50 border border-transparent hover:bg-navy-800 text-gray-300'
                }`}
              >
                <span className="mr-2">{s.icon}</span>
                <span className="font-medium">{s.title}</span>
                <span className="float-right text-sm opacity-70">
                  {formatBRL(
                    s.id === 'flights' ? costs.flights :
                    s.id === 'accommodation' ? costs.accommodation :
                    s.id === 'medical' ? costs.medical :
                    s.id === 'documents' ? costs.documents :
                    s.id === 'food' ? costs.food :
                    s.id === 'insurance' ? costs.insurance :
                    s.id === 'transport' ? costs.transport :
                    costs.misc
                  )}
                </span>
              </button>
            ))}

            {/* Summary button */}
            <button
              onClick={() => setActiveSection('summary')}
              className={`w-full text-left px-4 py-4 rounded-xl transition-all mt-4 font-bold ${
                activeSection === 'summary'
                  ? 'bg-gold-500 text-navy-950'
                  : 'bg-gold-500/10 border border-gold-500/30 text-gold-400 hover:bg-gold-500/20'
              }`}
            >
              📊 Итого: {formatBRL(costs.total)}
            </button>
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-2">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-navy-800/50 rounded-2xl p-6 md:p-8 border border-white/5"
            >
              {/* ─── FLIGHTS ─── */}
              {activeSection === 'flights' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>✈️ Перелёт</h2>
                  <p className="text-gray-400 text-sm mb-6">Стоимость авиабилетов до Флорианополиса (FLN) и обратно</p>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Город вылета</label>
                    <select value={origin} onChange={e => setOrigin(e.target.value)}
                      className="w-full bg-navy-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold-500 focus:outline-none">
                      {Object.keys(FLIGHT_PRICES).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Количество пассажиров: {travelers}</label>
                    <input type="range" min={1} max={4} value={travelers} onChange={e => setTravelers(+e.target.value)}
                      className="w-full accent-gold-500" />
                    <div className="flex justify-between text-xs text-gray-500 mt-1"><span>1</span><span>4</span></div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">Класс обслуживания</label>
                    <div className="grid grid-cols-2 gap-3">
                      {(['economy', 'business'] as const).map(c => (
                        <button key={c} onClick={() => setFlightClass(c)}
                          className={`py-3 rounded-xl font-medium transition ${
                            flightClass === c ? 'bg-gold-500 text-navy-950' : 'bg-navy-900 text-gray-300 border border-white/10'
                          }`}>
                          {c === 'economy' ? 'Эконом' : 'Бизнес'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-navy-900/50 rounded-xl p-4 mt-4">
                    <div className="flex justify-between"><span className="text-gray-400">Билет (туда-обратно):</span><span>{formatBRL(FLIGHT_PRICES[origin] * (flightClass === 'business' ? 2.5 : 1) * 2)}</span></div>
                    <div className="flex justify-between mt-1"><span className="text-gray-400">Пассажиры:</span><span>× {travelers}</span></div>
                    <div className="flex justify-between mt-3 pt-3 border-t border-white/10 font-bold text-gold-400">
                      <span>Итого перелёт:</span><span>{formatBRL(costs.flights)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── ACCOMMODATION ─── */}
              {activeSection === 'accommodation' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>🏠 Проживание</h2>
                  <p className="text-gray-400 text-sm mb-6">Рекомендуем приехать за 1-2 месяца до родов и остаться на 1 месяц после</p>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Длительность: {months} мес.</label>
                    <input type="range" min={2} max={5} value={months} onChange={e => setMonths(+e.target.value)}
                      className="w-full accent-gold-500" />
                    <div className="flex justify-between text-xs text-gray-500 mt-1"><span>2 мес</span><span>5 мес</span></div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">Тип жилья</label>
                    <div className="grid grid-cols-2 gap-3">
                      {(['apt', 'apartHotel'] as const).map(t => (
                        <button key={t} onClick={() => setHousingType(t)}
                          className={`py-3 rounded-xl font-medium transition ${
                            housingType === t ? 'bg-gold-500 text-navy-950' : 'bg-navy-900 text-gray-300 border border-white/10'
                          }`}>
                          {t === 'apt' ? '🏢 Квартира' : '🏨 Апарт-отель'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">Район Флорипы</label>
                    <div className="space-y-2">
                      {AREAS.map((a, i) => (
                        <button key={i} onClick={() => setArea(i)}
                          className={`w-full text-left px-4 py-3 rounded-xl transition flex justify-between items-center ${
                            area === i ? 'bg-gold-500/20 border border-gold-500/30 text-gold-400' : 'bg-navy-900 text-gray-300 border border-white/10'
                          }`}>
                          <span className="font-medium">{a.name}</span>
                          <span className="text-sm">{formatBRL(housingType === 'apt' ? a.apt : a.apartHotel)}/мес</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-navy-900/50 rounded-xl p-4 mt-4">
                    <div className="flex justify-between"><span className="text-gray-400">Аренда в месяц:</span><span>{formatBRL(housingType === 'apt' ? AREAS[area].apt : AREAS[area].apartHotel)}</span></div>
                    <div className="flex justify-between mt-1"><span className="text-gray-400">Период:</span><span>{months} мес</span></div>
                    <div className="flex justify-between mt-3 pt-3 border-t border-white/10 font-bold text-gold-400">
                      <span>Итого проживание:</span><span>{formatBRL(costs.accommodation)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── MEDICAL ─── */}
              {activeSection === 'medical' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>🏥 Роды и медицина</h2>
                  <p className="text-gray-400 text-sm mb-6">Бразилия — лидер по качеству медицины в Латинской Америке</p>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">Госпиталь</label>
                    <div className="space-y-2">
                      {HOSPITALS.map((h, i) => (
                        <button key={i} onClick={() => setHospitalIdx(i)}
                          className={`w-full text-left px-4 py-3 rounded-xl transition ${
                            hospitalIdx === i ? 'bg-gold-500/20 border border-gold-500/30 text-gold-400' : 'bg-navy-900 text-gray-300 border border-white/10'
                          }`}>
                          <div className="font-medium">{h.name}</div>
                          <div className="text-xs text-gray-400 mt-1">
                            Естественные: {h.natural === 0 ? 'бесплатно (SUS)' : formatBRL(h.natural)} • Кесарево: {h.csection === 0 ? 'бесплатно (SUS)' : formatBRL(h.csection)}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">Тип родов</label>
                    <div className="grid grid-cols-2 gap-3">
                      {(['natural', 'csection'] as const).map(t => (
                        <button key={t} onClick={() => setBirthType(t)}
                          className={`py-3 rounded-xl font-medium transition ${
                            birthType === t ? 'bg-gold-500 text-navy-950' : 'bg-navy-900 text-gray-300 border border-white/10'
                          }`}>
                          {t === 'natural' ? '🤱 Естественные' : '🔪 Кесарево'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-300">Дополнительно</label>
                    {[
                      { label: 'Ведение беременности (пренатал)', state: prenatal, set: setPrenatal, cost: 4500 },
                      { label: 'Педиатр / неонатолог', state: pediatrician, set: setPediatrician, cost: 2000 },
                    ].map((item, i) => (
                      <button key={i} onClick={() => item.set(!item.state)}
                        className={`w-full text-left px-4 py-3 rounded-xl transition flex justify-between ${
                          item.state ? 'bg-gold-500/10 border border-gold-500/20 text-white' : 'bg-navy-900 text-gray-500 border border-white/5'
                        }`}>
                        <span>{item.state ? '✅' : '⬜'} {item.label}</span>
                        <span className="text-sm">{formatBRL(item.cost)}</span>
                      </button>
                    ))}
                  </div>

                  <div className="bg-navy-900/50 rounded-xl p-4 mt-4 space-y-1">
                    <div className="flex justify-between"><span className="text-gray-400">Роды ({birthType === 'natural' ? 'естественные' : 'кесарево'}):</span><span>{formatBRL(birthType === 'natural' ? HOSPITALS[hospitalIdx].natural : HOSPITALS[hospitalIdx].csection)}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Анестезия:</span><span>{formatBRL(birthType === 'csection' ? 3000 : 1500)}</span></div>
                    {prenatal && <div className="flex justify-between"><span className="text-gray-400">Пренатал:</span><span>{formatBRL(4500)}</span></div>}
                    {pediatrician && <div className="flex justify-between"><span className="text-gray-400">Педиатр:</span><span>{formatBRL(2000)}</span></div>}
                    <div className="flex justify-between mt-3 pt-3 border-t border-white/10 font-bold text-gold-400">
                      <span>Итого медицина:</span><span>{formatBRL(costs.medical)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── DOCUMENTS ─── */}
              {activeSection === 'documents' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>📄 Документы и гражданство</h2>
                  <p className="text-gray-400 text-sm mb-6">Ребёнок, рождённый в Бразилии, автоматически получает бразильское гражданство</p>

                  <div className="space-y-3">
                    {[
                      { label: 'Свидетельство о рождении (Certidão)', cost: 0, note: 'Бесплатно' },
                      { label: 'CPF для ребёнка', cost: 0, note: 'Бесплатно' },
                      { label: 'Бразильский паспорт', cost: 350, note: 'Срочное оформление' },
                      { label: 'Апостиль / консульская легализация', cost: 200, note: 'Для использования за рубежом' },
                      { label: 'Перевод документов', cost: 800, note: 'Свидетельство, справки' },
                      { label: 'Фото на документы', cost: 50, note: '' },
                    ].map((d, i) => (
                      <div key={i} className="flex justify-between items-center px-4 py-3 bg-navy-900 rounded-xl border border-white/5">
                        <div>
                          <div className="font-medium text-white">{d.label}</div>
                          {d.note && <div className="text-xs text-gray-500 mt-0.5">{d.note}</div>}
                        </div>
                        <span className={`font-medium ${d.cost === 0 ? 'text-green-400' : 'text-white'}`}>
                          {d.cost === 0 ? 'Бесплатно' : formatBRL(d.cost)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-green-900/20 border border-green-500/20 rounded-xl p-4 mt-4">
                    <div className="text-green-400 font-medium">🇧🇷 Гражданство Бразилии — автоматически!</div>
                    <div className="text-gray-400 text-sm mt-1">Ребёнок получает гражданство по праву рождения (jus soli). Родители могут подать на ВНЖ через 1 год.</div>
                  </div>

                  <div className="bg-navy-900/50 rounded-xl p-4 mt-4">
                    <div className="flex justify-between font-bold text-gold-400">
                      <span>Итого документы:</span><span>{formatBRL(costs.documents)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── FOOD ─── */}
              {activeSection === 'food' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>🍽 Питание</h2>
                  <p className="text-gray-400 text-sm mb-6">Бюджет на питание для семьи из {travelers} человек</p>

                  <div className="space-y-2">
                    {[
                      { label: '🥘 Базовый', desc: 'Готовка дома, базовые продукты', cost: 3500, idx: 0 },
                      { label: '🍳 Комфортный', desc: 'Дом + иногда кафе/рестораны', cost: 5500, idx: 1 },
                      { label: '🍽 Премиум', desc: 'Рестораны, доставка, деликатесы', cost: 8000, idx: 2 },
                    ].map((f) => (
                      <button key={f.idx} onClick={() => setFoodLevel(f.idx)}
                        className={`w-full text-left px-4 py-4 rounded-xl transition ${
                          foodLevel === f.idx ? 'bg-gold-500/20 border border-gold-500/30 text-gold-400' : 'bg-navy-900 text-gray-300 border border-white/10'
                        }`}>
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">{f.label}</div>
                            <div className="text-xs text-gray-500 mt-0.5">{f.desc}</div>
                          </div>
                          <span className="font-medium">{formatBRL(f.cost)}/мес</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="bg-navy-900/50 rounded-xl p-4 mt-4">
                    <div className="flex justify-between"><span className="text-gray-400">В месяц:</span><span>{formatBRL([3500, 5500, 8000][foodLevel])}</span></div>
                    <div className="flex justify-between mt-1"><span className="text-gray-400">Период:</span><span>{months} мес</span></div>
                    <div className="flex justify-between mt-3 pt-3 border-t border-white/10 font-bold text-gold-400">
                      <span>Итого питание:</span><span>{formatBRL(costs.food)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── INSURANCE ─── */}
              {activeSection === 'insurance' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>🛡 Страховка</h2>
                  <p className="text-gray-400 text-sm mb-6">Медицинское страхование на время пребывания</p>

                  <div className="space-y-2">
                    {[
                      { label: '❌ Без страховки', desc: 'Все расходы из кармана', cost: 0, idx: 0 },
                      { label: '🛡 Стандарт', desc: 'Базовое покрытие, экстренная помощь', cost: 1200, idx: 1 },
                      { label: '👑 Премиум', desc: 'Полное покрытие включая материнство', cost: 2500, idx: 2 },
                    ].map((ins) => (
                      <button key={ins.idx} onClick={() => setInsuranceType(ins.idx)}
                        className={`w-full text-left px-4 py-4 rounded-xl transition ${
                          insuranceType === ins.idx ? 'bg-gold-500/20 border border-gold-500/30 text-gold-400' : 'bg-navy-900 text-gray-300 border border-white/10'
                        }`}>
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">{ins.label}</div>
                            <div className="text-xs text-gray-500 mt-0.5">{ins.desc}</div>
                          </div>
                          <span className="font-medium">{ins.cost === 0 ? '—' : `${formatBRL(ins.cost)}/мес`}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="bg-navy-900/50 rounded-xl p-4 mt-4">
                    <div className="flex justify-between font-bold text-gold-400">
                      <span>Итого страховка:</span><span>{formatBRL(costs.insurance)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── TRANSPORT ─── */}
              {activeSection === 'transport' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>🚗 Транспорт</h2>
                  <p className="text-gray-400 text-sm mb-6">Транспортные расходы на месте</p>

                  <div className="space-y-2">
                    {[
                      { label: '🚌 Общественный', desc: 'Автобусы, ~R$5 за поездку', cost: 400, idx: 0 },
                      { label: '🚕 Uber/Такси', desc: 'Комфорт, средние расстояния', cost: 1500, idx: 1 },
                      { label: '🚗 Аренда авто', desc: 'Свобода передвижения', cost: 3500, idx: 2 },
                    ].map((t) => (
                      <button key={t.idx} onClick={() => setTransportType(t.idx)}
                        className={`w-full text-left px-4 py-4 rounded-xl transition ${
                          transportType === t.idx ? 'bg-gold-500/20 border border-gold-500/30 text-gold-400' : 'bg-navy-900 text-gray-300 border border-white/10'
                        }`}>
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">{t.label}</div>
                            <div className="text-xs text-gray-500 mt-0.5">{t.desc}</div>
                          </div>
                          <span className="font-medium">{formatBRL(t.cost)}/мес</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="bg-navy-900/50 rounded-xl p-4 mt-4">
                    <div className="flex justify-between font-bold text-gold-400">
                      <span>Итого транспорт:</span><span>{formatBRL(costs.transport)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── MISC ─── */}
              {activeSection === 'misc' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>📦 Дополнительно</h2>
                  <p className="text-gray-400 text-sm mb-6">Дополнительные расходы</p>

                  <div className="space-y-3">
                    {[
                      { label: '👶 Детские товары (коляска, автокресло, одежда)', state: babySupplies, set: setBabySupplies, cost: 3000 },
                      { label: '🌴 Туризм и развлечения', state: tourism, set: setTourism, cost: months * 1500 },
                      { label: '🆘 Резервный фонд', state: emergencyFund, set: setEmergencyFund, cost: 5000 },
                    ].map((item, i) => (
                      <button key={i} onClick={() => item.set(!item.state)}
                        className={`w-full text-left px-4 py-4 rounded-xl transition flex justify-between items-center ${
                          item.state ? 'bg-gold-500/10 border border-gold-500/20 text-white' : 'bg-navy-900 text-gray-500 border border-white/5'
                        }`}>
                        <span>{item.state ? '✅' : '⬜'} {item.label}</span>
                        <span className="text-sm">{formatBRL(item.cost)}</span>
                      </button>
                    ))}
                  </div>

                  <div className="bg-navy-900/50 rounded-xl p-4 mt-4">
                    <div className="flex justify-between font-bold text-gold-400">
                      <span>Итого дополнительно:</span><span>{formatBRL(costs.misc)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SUMMARY ─── */}
              {activeSection === 'summary' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>📊 Полная сводка</h2>
                  <p className="text-gray-400 text-sm mb-6">Расчёт стоимости рождения ребёнка в Бразилии (Флорианополис)</p>

                  {/* Total */}
                  <div className="bg-gradient-to-r from-gold-500/20 to-gold-500/5 rounded-2xl p-6 text-center border border-gold-500/20">
                    <div className="text-sm text-gray-400 mb-1">Общая стоимость</div>
                    <div className="text-4xl md:text-5xl font-bold text-gold-400">{formatBRL(costs.total)}</div>
                    <div className="text-lg text-gray-400 mt-1">≈ {formatUSD(costs.total)}</div>
                  </div>

                  {/* Breakdown */}
                  <div className="space-y-3">
                    {costItems.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i] }} />
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">{item.label}</span>
                            <span className="font-medium">{formatBRL(item.value)}</span>
                          </div>
                          <div className="w-full bg-navy-900 rounded-full h-2 mt-1">
                            <div className="h-2 rounded-full transition-all" style={{
                              width: `${pct(item.value, costs.total)}%`,
                              backgroundColor: COLORS[i],
                            }} />
                          </div>
                        </div>
                        <span className="text-xs text-gray-500 w-10 text-right">{pct(item.value, costs.total)}%</span>
                      </div>
                    ))}
                  </div>

                  {/* Comparison */}
                  <div className="mt-8">
                    <h3 className="text-lg font-bold mb-4">🌍 Сравнение с другими странами</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { country: '🇧🇷 Бразилия', cost: costs.total, highlight: true },
                        { country: '🇺🇸 США', cost: costs.total * 3.5 },
                        { country: '🇵🇹 Португалия', cost: costs.total * 2.2 },
                        { country: '🇹🇭 Таиланд', cost: costs.total * 1.3 },
                      ].map((c, i) => (
                        <div key={i} className={`px-4 py-3 rounded-xl ${c.highlight ? 'bg-gold-500/20 border border-gold-500/30 text-gold-400' : 'bg-navy-900 text-gray-300 border border-white/5'}`}>
                          <div className="text-sm font-medium">{c.country}</div>
                          <div className="text-lg font-bold mt-1">{formatBRL(c.cost)}</div>
                          <div className="text-xs text-gray-500">≈ {formatUSD(c.cost)}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* What you get */}
                  <div className="bg-green-900/20 border border-green-500/20 rounded-2xl p-6 mt-6">
                    <h3 className="text-lg font-bold text-green-400 mb-3">✅ Что вы получаете</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-300">
                      <div>🇧🇷 Бразильское гражданство ребёнку</div>
                      <div>🛂 Паспорт Бразилии (6-й в мире по силе)</div>
                      <div>🏥 Качественная медицина</div>
                      <div>📋 Все документы оформлены</div>
                      <div>🏠 Возможность ВНЖ для родителей</div>
                      <div>🌍 Безвиз в 170+ стран</div>
                    </div>
                  </div>

                  {/* CTA */}
                  <a href="https://wa.me/5548988117424" target="_blank" rel="noopener noreferrer"
                    className="block w-full bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-center py-4 rounded-xl text-lg transition mt-6">
                    💬 Получить персональную консультацию
                  </a>
                  <p className="text-center text-xs text-gray-500">Напишите нам в WhatsApp — ответим за 15 минут</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 mb-8 text-center">
          <a href="https://wa.me/5548988117424" target="_blank" rel="noopener noreferrer"
            className="inline-block bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold px-8 py-4 rounded-xl text-lg transition">
            💬 Связаться с Plan B
          </a>
          <p className="text-gray-500 text-sm mt-3">Консультация бесплатная • Отвечаем за 15 минут</p>
          <p className="text-gray-600 text-xs mt-2">Расчёт приблизительный. Финальная стоимость зависит от ваших предпочтений.</p>
        </div>
      </div>
    </div>
  );
}
