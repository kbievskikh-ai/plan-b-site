'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Lang = 'en' | 'ru' | 'ua';

// ────────── Translations ──────────
const T: Record<Lang, Record<string, string>> = {
  en: {
    title: 'Global Real Estate',
    subtitle: 'Verified properties from top developers worldwide. Every listing validated by independent legal, tax, and valuation experts.',
    allDevelopers: 'All Developers',
    statsProjects: 'Projects',
    statsDevelopers: 'Developers',
    statsCountries: 'Countries',
    statsValidations: 'Validations',
    backToAll: '← Back to all properties',
    expertsTab: 'Experts',
    propertiesTab: 'Properties',
    expertsTitle: '👥 Expert Network',
    expertsSubtitle: 'Independent specialists who validate every listing on the platform.',
    verifiedExpert: '✅ Verified Expert',
    bookConsultation: 'Book Consultation →',
    investmentDetails: '📊 Investment Details',
    expertValidation: '🔍 Expert Validation',
    legalReview: 'Legal Review',
    taxAnalysis: 'Tax Analysis',
    appraisalROI: 'Appraisal & ROI',
    inProgress: 'In progress',
    fullyValidated: '🏆 Fully Validated — All checks passed',
    propertyScore: '🏆 GRONIS Property Score',
    financialProjections: '📈 Financial Projections',
    locationLabel: 'Location',
    roiPotential: 'ROI Potential',
    liquidity: 'Liquidity',
    riskLevel: 'Risk Level',
    scoreNote: 'Score based on expert analysis of location, market data, financial projections, and risk assessment. Not financial advice.',
    irr: 'IRR', irrDesc: 'Internal Rate of Return',
    capRate: 'Cap Rate', capRateDesc: 'Capitalization Rate',
    cashOnCash: 'Cash-on-Cash', cashOnCashDesc: 'Annual Cash Return',
    payback: 'Payback', paybackDesc: 'Investment Recovery',
    finNote: 'Projections based on current market conditions and expert analysis. Actual returns may vary.',
    requestDueDiligence: '💬 Request Due Diligence',
    consultExpert: '📞 Consult an Expert',
    gronisScore: 'GRONIS Score',
    verified: '✓ Verified',
    units: 'units',
    by: 'by',
  },
  ru: {
    title: 'Мировая недвижимость',
    subtitle: 'Проверенные объекты от лучших застройщиков мира. Каждый листинг проходит независимую юридическую, налоговую и оценочную экспертизу.',
    allDevelopers: 'Все застройщики',
    statsProjects: 'Проектов',
    statsDevelopers: 'Застройщиков',
    statsCountries: 'Стран',
    statsValidations: 'Проверок',
    backToAll: '← Назад ко всем объектам',
    expertsTab: 'Эксперты',
    propertiesTab: 'Объекты',
    expertsTitle: '👥 Сеть экспертов',
    expertsSubtitle: 'Независимые специалисты, которые проверяют каждый объект на платформе.',
    verifiedExpert: '✅ Верифицированный эксперт',
    bookConsultation: 'Записаться на консультацию →',
    investmentDetails: '📊 Инвестиционные детали',
    expertValidation: '🔍 Экспертная проверка',
    legalReview: 'Юридическая проверка',
    taxAnalysis: 'Налоговый анализ',
    appraisalROI: 'Оценка и ROI',
    inProgress: 'В процессе',
    fullyValidated: '🏆 Полная проверка пройдена',
    propertyScore: '🏆 GRONIS Score',
    financialProjections: '📈 Финансовые прогнозы',
    locationLabel: 'Локация',
    roiPotential: 'Потенциал ROI',
    liquidity: 'Ликвидность',
    riskLevel: 'Уровень риска',
    scoreNote: 'Оценка на основе экспертного анализа локации, рыночных данных, финансовых прогнозов и рисков. Не является финансовой рекомендацией.',
    irr: 'IRR', irrDesc: 'Внутренняя норма доходности',
    capRate: 'Cap Rate', capRateDesc: 'Ставка капитализации',
    cashOnCash: 'Cash-on-Cash', cashOnCashDesc: 'Годовая доходность на вложенный капитал',
    payback: 'Окупаемость', paybackDesc: 'Срок возврата инвестиций',
    finNote: 'Прогнозы основаны на текущих рыночных условиях и экспертном анализе. Реальная доходность может отличаться.',
    requestDueDiligence: '💬 Запросить проверку',
    consultExpert: '📞 Консультация эксперта',
    gronisScore: 'GRONIS Score',
    verified: '✓ Проверен',
    units: 'юнитов',
    by: 'от',
  },
  ua: {
    title: 'Світова нерухомість',
    subtitle: 'Перевірені обʼєкти від найкращих забудовників світу. Кожен лістинг проходить незалежну юридичну, податкову та оціночну експертизу.',
    allDevelopers: 'Всі забудовники',
    statsProjects: 'Проектів',
    statsDevelopers: 'Забудовників',
    statsCountries: 'Країн',
    statsValidations: 'Перевірок',
    backToAll: '← Назад до всіх обʼєктів',
    expertsTab: 'Експерти',
    propertiesTab: "Об'єкти",
    expertsTitle: '👥 Мережа експертів',
    expertsSubtitle: 'Незалежні спеціалісти, які перевіряють кожен обʼєкт на платформі.',
    verifiedExpert: '✅ Верифікований експерт',
    bookConsultation: 'Записатись на консультацію →',
    investmentDetails: '📊 Інвестиційні деталі',
    expertValidation: '🔍 Експертна перевірка',
    legalReview: 'Юридична перевірка',
    taxAnalysis: 'Податковий аналіз',
    appraisalROI: 'Оцінка та ROI',
    inProgress: 'В процесі',
    fullyValidated: '🏆 Повна перевірка пройдена',
    propertyScore: '🏆 GRONIS Score',
    financialProjections: '📈 Фінансові прогнози',
    locationLabel: 'Локація',
    roiPotential: 'Потенціал ROI',
    liquidity: 'Ліквідність',
    riskLevel: 'Рівень ризику',
    scoreNote: 'Оцінка на основі експертного аналізу локації, ринкових даних, фінансових прогнозів та ризиків. Не є фінансовою рекомендацією.',
    irr: 'IRR', irrDesc: 'Внутрішня норма дохідності',
    capRate: 'Cap Rate', capRateDesc: 'Ставка капіталізації',
    cashOnCash: 'Cash-on-Cash', cashOnCashDesc: 'Річна дохідність на вкладений капітал',
    payback: 'Окупність', paybackDesc: 'Термін повернення інвестицій',
    finNote: 'Прогнози базуються на поточних ринкових умовах та експертному аналізі. Реальна дохідність може відрізнятись.',
    requestDueDiligence: '💬 Запитати перевірку',
    consultExpert: '📞 Консультація експерта',
    gronisScore: 'GRONIS Score',
    verified: '✓ Перевірено',
    units: 'юнітів',
    by: 'від',
  },
};

// ────────── Data ──────────
const DEVELOPERS = [
  { id: 'terraviva', name: 'TerraViva Inc.', flag: '🇧🇷', country: 'Brazil', projects: 3, avatar: 'https://flagcdn.com/w80/br.png' },
  { id: 'azure', name: 'Azure Coast', flag: '🇵🇹', country: 'Portugal', projects: 2, avatar: 'https://flagcdn.com/w80/pt.png' },
  { id: 'siam', name: 'Siam Prime Development', flag: '🇹🇭', country: 'Thailand', projects: 2 },
  { id: 'costarica', name: 'Pura Vida Living', flag: '🇨🇷', country: 'Costa Rica', projects: 1 },
];

const PROJECTS: { id: string; title: string; developer: string; price: string; priceUsd: string; location: string; type: string; roi: string; units: number; stage: string; delivery: string; description: string; validators: { legal: boolean; tax: boolean; appraiser: boolean }; score?: { overall: number; location: number; roi: number; liquidity: number; risk: number }; financials?: { irr: string; capRate: string; cashOnCash: string; paybackYears: number }; images: string[]; desc?: Record<Lang, string> }[] = [
  { id: 'terra1', title: 'Terrá Jurerê', developer: 'terraviva', price: 'R$ 2.1M', priceUsd: '$410K', location: 'Jurerê, Florianópolis', type: 'Luxury Apartments', roi: '10.5%', units: 48, stage: 'Under Construction', delivery: 'Q4 2027',
    description: 'Premium apartments in Jurerê — the most exclusive neighborhood in Florianópolis. 2–3 bedrooms, pool, sea view.',
    desc: {
      en: 'Luxury villas in Jurerê — the most exclusive neighborhood in Florianópolis. 2–3 bedrooms, pool, sea view.',
      ru: 'Элитные апартаменты в Жюрере — самый престижный район Флорианополиса. 2–3 спальни, бассейн, вид на море.',
      ua: 'Елітні апартаменти в Жюрере — найпрестижніший район Флоріанополіса. 2–3 спальні, басейн, вид на море.',
    },
    validators: { legal: true, tax: true, appraiser: true },
    score: { overall: 92, location: 95, roi: 88, liquidity: 90, risk: 95 },
    financials: { irr: '14.2%', capRate: '7.8%', cashOnCash: '11.5%', paybackYears: 8.5 },
    images: ['/platform/terra-jurere-1.jpg', '/platform/terra-jurere-2.jpg', '/platform/terra-jurere-3.jpg'] },
  { id: 'terra2', title: 'CB Towers Residence', developer: 'terraviva', price: 'R$ 1.4M', priceUsd: '$275K', location: 'Canasvieiras, Floripa', type: 'High-Rise Apartments', roi: '9.2%', units: 120, stage: 'Foundation', delivery: 'Q2 2028',
    description: 'Modern towers with full infrastructure: gym, pool, coworking. Walking distance to the beach.',
    desc: {
      en: 'Modern towers with full infrastructure: gym, pool, coworking. Walking distance to the beach.',
      ru: 'Современные башни с полной инфраструктурой: фитнес, бассейн, коворкинг. Пешком до пляжа.',
      ua: 'Сучасні вежі з повною інфраструктурою: фітнес, басейн, коворкінг. Пішки до пляжу.',
    },
    validators: { legal: true, tax: true, appraiser: false },
    score: { overall: 78, location: 82, roi: 80, liquidity: 75, risk: 74 },
    financials: { irr: '12.1%', capRate: '6.9%', cashOnCash: '9.8%', paybackYears: 9.5 },
    images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80'] },
  { id: 'terra3', title: 'Vista Mar Suites', developer: 'terraviva', price: 'R$ 890K', priceUsd: '$175K', location: 'Campeche, Floripa', type: 'Studios & 1BR', roi: '11.8%', units: 80, stage: 'Pre-Launch', delivery: 'Q1 2029',
    description: 'Affordable studios in the fastest-growing area of Floripa. High Airbnb demand.',
    desc: {
      en: 'Affordable studios in the fastest-growing area of Floripa. High Airbnb demand.',
      ru: 'Доступные студии в самом растущем районе Флорипы. Высокий спрос на Airbnb.',
      ua: 'Доступні студії в найрозвиненішому районі Флоріпи. Високий попит на Airbnb.',
    },
    validators: { legal: true, tax: false, appraiser: false },
    score: { overall: 68, location: 70, roi: 85, liquidity: 60, risk: 58 },
    financials: { irr: '16.5%', capRate: '9.2%', cashOnCash: '13.1%', paybackYears: 7.2 },
    images: ['https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80', 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80'] },
  { id: 'azure1', title: 'Algarve Oceanview', developer: 'azure', price: '€650K', priceUsd: '$705K', location: 'Lagos, Algarve', type: 'Luxury Villas', roi: '7.5%', units: 24, stage: 'Under Construction', delivery: 'Q3 2027',
    description: 'Clifftop villas with panoramic ocean views. Golden Visa eligible.',
    desc: {
      en: 'Clifftop villas with panoramic ocean views. Golden Visa eligible.',
      ru: 'Виллы на утёсе с панорамным видом на океан. Подходит для Golden Visa.',
      ua: 'Вілли на скелі з панорамним видом на океан. Підходить для Golden Visa.',
    },
    validators: { legal: true, tax: true, appraiser: true },
    score: { overall: 85, location: 90, roi: 78, liquidity: 82, risk: 88 },
    financials: { irr: '10.5%', capRate: '5.5%', cashOnCash: '8.2%', paybackYears: 11 },
    images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'] },
  { id: 'azure2', title: 'Lisbon Heritage', developer: 'azure', price: '€420K', priceUsd: '$455K', location: 'Chiado, Lisbon', type: 'Renovated Apartments', roi: '6.8%', units: 16, stage: 'Renovation', delivery: 'Q1 2027',
    description: 'Historic building renovation in the heart of Lisbon. High tourist demand.',
    desc: {
      en: 'Historic building renovation in the heart of Lisbon. High tourist demand.',
      ru: 'Реновация исторического здания в центре Лиссабона. Высокий туристический спрос.',
      ua: 'Реновація історичної будівлі в центрі Лісабона. Високий туристичний попит.',
    },
    validators: { legal: true, tax: false, appraiser: true },
    score: { overall: 72, location: 88, roi: 65, liquidity: 70, risk: 66 },
    financials: { irr: '9.8%', capRate: '4.8%', cashOnCash: '7.1%', paybackYears: 13 },
    images: ['https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80', 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=800&q=80'] },
  { id: 'siam1', title: 'Phuket Marina Residences', developer: 'siam', price: '฿18M', priceUsd: '$520K', location: 'Phuket, Thailand', type: 'Seafront Apartments', roi: '8.5%', units: 60, stage: 'Under Construction', delivery: 'Q4 2027',
    description: 'Marina-front apartments with yacht access. Freehold for foreigners.',
    desc: {
      en: 'Marina-front apartments with yacht access. Freehold for foreigners.',
      ru: 'Апартаменты у марины с доступом к яхтам. Полная собственность для иностранцев.',
      ua: 'Апартаменти біля марини з доступом до яхт. Повна власність для іноземців.',
    },
    validators: { legal: true, tax: true, appraiser: true },
    score: { overall: 88, location: 92, roi: 84, liquidity: 85, risk: 90 },
    financials: { irr: '11.8%', capRate: '6.5%', cashOnCash: '10.2%', paybackYears: 9 },
    images: ['https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80'] },
  { id: 'siam2', title: 'Bangkok Sky Garden', developer: 'siam', price: '฿8.5M', priceUsd: '$245K', location: 'Sathorn, Bangkok', type: 'High-End Condos', roi: '9.1%', units: 200, stage: 'Topping Out', delivery: 'Q2 2027',
    description: 'CBD location with BTS access. Infinity pool on the 50th floor.',
    desc: {
      en: 'CBD location with BTS access. Infinity pool on the 50th floor.',
      ru: 'Центральный район с доступом к BTS. Бассейн-инфинити на 50 этаже.',
      ua: 'Центральний район з доступом до BTS. Басейн-інфініті на 50 поверсі.',
    },
    validators: { legal: false, tax: true, appraiser: true },
    score: { overall: 74, location: 85, roi: 82, liquidity: 70, risk: 60 },
    financials: { irr: '13.5%', capRate: '7.5%', cashOnCash: '11.0%', paybackYears: 8 },
    images: ['https://images.unsplash.com/photo-1555445091-3f3db4c78f6b?w=800&q=80', 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80'] },
  { id: 'cr1', title: 'Montaña Wellness Retreat', developer: 'costarica', price: '$380K', priceUsd: '$380K', location: 'Manuel Antonio', type: 'Eco-Lodge', roi: '12.3%', units: 15, stage: 'Under Construction', delivery: 'Q1 2028',
    description: 'Eco-luxury lodges surrounded by rainforest. Near Manuel Antonio National Park.',
    desc: {
      en: 'Eco-luxury lodges surrounded by rainforest. Near Manuel Antonio National Park.',
      ru: 'Эко-лоджи в окружении тропического леса. Рядом национальный парк Мануэль Антонио.',
      ua: 'Еко-лоджі в оточенні тропічного лісу. Поруч національний парк Мануель Антоніо.',
    },
    validators: { legal: true, tax: true, appraiser: false },
    score: { overall: 80, location: 88, roi: 90, liquidity: 65, risk: 78 },
    financials: { irr: '15.8%', capRate: '8.5%', cashOnCash: '12.8%', paybackYears: 7.5 },
    images: ['https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80', 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80'] },
];

const EXPERTS = [
  { name: 'Dr. Carlos Mendez', role: 'Real Estate Lawyer', country: 'Brazil 🇧🇷', rating: 4.9, reviews: 127, specialties: ['Property Law', 'Immigration', 'Due Diligence'], verified: true },
  { name: 'Ana Rodrigues', role: 'Tax Advisor', country: 'Portugal 🇵🇹', rating: 4.8, reviews: 89, specialties: ['Golden Visa Tax', 'NHR', 'International Tax'], verified: true },
  { name: 'Somchai Patel', role: 'Property Appraiser', country: 'Thailand 🇹🇭', rating: 4.7, reviews: 64, specialties: ['Valuation', 'Market Analysis', 'ROI'], verified: true },
  { name: 'Maria Silva', role: 'Immigration Consultant', country: 'Brazil 🇧🇷', rating: 5.0, reviews: 203, specialties: ['VIPER Visa', 'Citizenship', 'Documentation'], verified: true },
  { name: 'James Cooper', role: 'Independent Valuer', country: 'UK 🇬🇧', rating: 4.6, reviews: 41, specialties: ['Valuation', 'Risk Assessment'], verified: true },
  { name: 'Lucas Fernández', role: 'Tax Attorney', country: 'Costa Rica 🇨🇷', rating: 4.8, reviews: 55, specialties: ['Corporate Tax', 'Residency'], verified: true },
];

// ────────── Component ──────────
export default function PlatformClient() {
  const [selectedDev, setSelectedDev] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);
  const [showExperts, setShowExperts] = useState(false);
  const [lang, setLang] = useState<Lang>('en');

  const t = T[lang];
  const filteredProjects = selectedDev ? PROJECTS.filter(p => p.developer === selectedDev) : PROJECTS;

  const devName = (id: string) => DEVELOPERS.find(d => d.id === id)?.name || '';

  return (
    <div className="min-h-screen bg-[#1B2951] text-white">
      {/* Nav */}
      <nav className="border-b border-white/10 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏠</span>
            <span className="font-bold font-serif text-lg text-[#D4AF37]">GRONIS Platform</span>
          </div>
          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <div className="flex gap-1 bg-navy-800 rounded-lg p-1">
              {(['en', 'ru', 'ua'] as Lang[]).map(l => (
                <button key={l} onClick={() => setLang(l)}
                  className={`px-2 py-1 rounded text-xs font-medium transition ${lang === l ? 'bg-[#D4AF37] text-[#1B2951]' : 'text-gray-400 hover:text-white'}`}>
                  {l === 'en' ? 'EN' : l === 'ru' ? 'RU' : 'UA'}
                </button>
              ))}
            </div>
            <div className="flex gap-4 text-sm">
              <button onClick={() => { setShowExperts(false); setSelectedProject(null); }}
                className={`transition ${!showExperts && !selectedProject ? 'text-[#D4AF37]' : 'text-gray-400 hover:text-white'}`}>{t.propertiesTab}</button>
              <button onClick={() => { setShowExperts(true); setSelectedProject(null); }}
                className={`transition ${showExperts ? 'text-[#D4AF37]' : 'text-gray-400 hover:text-white'}`}>{t.expertsTab}</button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {/* ── PROJECT DETAIL ── */}
          {selectedProject ? (
            <motion.div key="detail" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
              <button onClick={() => setSelectedProject(null)} className="text-gray-400 hover:text-white transition text-sm mb-6">{t.backToAll}</button>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  {/* Hero Image */}
                  <div className="bg-gradient-to-br from-navy-700 to-navy-950 rounded-2xl h-80 overflow-hidden">
                    {selectedProject.images[0].startsWith('http') || selectedProject.images[0].startsWith('/') ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={selectedProject.images[0]} alt={selectedProject.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-6xl">{selectedProject.images[0]}</div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-[#D4AF37]/20 text-[#D4AF37] px-3 py-1 rounded-full text-xs font-medium">{devName(selectedProject.developer)}</span>
                      <span className="text-gray-500 text-sm">{selectedProject.location}</span>
                    </div>
                    <h1 className="text-3xl font-bold font-serif">{selectedProject.title}</h1>
                    <p className="text-gray-400 mt-3 text-sm leading-relaxed">{selectedProject.desc?.[lang] || selectedProject.description}</p>
                  </div>

                  {/* Validators */}
                  <div className="bg-navy-800/50 rounded-2xl p-6 border border-white/5">
                    <h3 className="font-bold text-lg mb-4">{t.expertValidation}</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { label: t.legalReview, ok: selectedProject.validators.legal, expert: 'Dr. Carlos Mendez' },
                        { label: t.taxAnalysis, ok: selectedProject.validators.tax, expert: 'Ana Rodrigues' },
                        { label: t.appraisalROI, ok: selectedProject.validators.appraiser, expert: 'Somchai Patel' },
                      ].map((v) => (
                        <div key={v.label} className={`p-4 rounded-xl border ${v.ok ? 'border-green-500/30 bg-green-500/5' : 'border-yellow-500/30 bg-yellow-500/5'}`}>
                          <div className="text-2xl mb-2">{v.ok ? '✅' : '⏳'}</div>
                          <div className="text-sm font-medium">{v.label}</div>
                          <div className="text-xs text-gray-400 mt-1">{v.ok ? `By ${v.expert}` : t.inProgress}</div>
                        </div>
                      ))}
                    </div>
                    {selectedProject.validators.legal && selectedProject.validators.tax && selectedProject.validators.appraiser && (
                      <div className="mt-4 p-3 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-xl text-center">
                        <span className="text-[#D4AF37] font-bold">{t.fullyValidated}</span>
                      </div>
                    )}
                  </div>

                  {/* GRONIS Property Score */}
                  {'score' in selectedProject && selectedProject.score && (
                    <div className="bg-navy-800/50 rounded-2xl p-6 border border-white/5">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-lg">{t.propertyScore}</h3>
                        <div className={`px-4 py-2 rounded-xl text-2xl font-bold ${
                          selectedProject.score.overall >= 85 ? 'bg-green-500/20 text-green-400' :
                          selectedProject.score.overall >= 70 ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>{selectedProject.score.overall}/100</div>
                      </div>
                      <div className="space-y-3">
                        {[
                          { label: t.locationLabel, val: selectedProject.score.location },
                          { label: t.roiPotential, val: selectedProject.score.roi },
                          { label: t.liquidity, val: selectedProject.score.liquidity },
                          { label: t.riskLevel, val: selectedProject.score.risk },
                        ].map((s) => (
                          <div key={s.label}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-400">{s.label}</span>
                              <span className="font-medium">{s.val}%</span>
                            </div>
                            <div className="h-2 bg-navy-900 rounded-full overflow-hidden">
                              <div className="h-full rounded-full transition-all" style={{ width: `${s.val}%`, background: s.val >= 80 ? '#22c55e' : s.val >= 60 ? '#eab308' : '#ef4444' }} />
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="text-[10px] text-gray-500 mt-4">{t.scoreNote}</p>
                    </div>
                  )}

                  {/* Financial Metrics */}
                  {'financials' in selectedProject && selectedProject.financials && (
                    <div className="bg-navy-800/50 rounded-2xl p-6 border border-white/5">
                      <h3 className="font-bold text-lg mb-4">{t.financialProjections}</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { label: t.irr, val: selectedProject.financials.irr, desc: t.irrDesc },
                          { label: t.capRate, val: selectedProject.financials.capRate, desc: t.capRateDesc },
                          { label: t.cashOnCash, val: selectedProject.financials.cashOnCash, desc: t.cashOnCashDesc },
                          { label: t.payback, val: selectedProject.financials.paybackYears + ' yrs', desc: t.paybackDesc },
                        ].map((m) => (
                          <div key={m.label} className="bg-navy-900 rounded-xl p-4 text-center">
                            <div className="text-[#D4AF37] text-2xl font-bold">{m.val}</div>
                            <div className="text-xs font-medium mt-1">{m.label}</div>
                            <div className="text-[10px] text-gray-500">{m.desc}</div>
                          </div>
                        ))}
                      </div>
                      <p className="text-[10px] text-gray-500 mt-4">{t.finNote}</p>
                    </div>
                  )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <div className="bg-navy-800/50 rounded-2xl p-6 border border-white/5">
                    <h3 className="font-bold text-lg mb-4">{t.investmentDetails}</h3>
                    {[
                      ['Price', `${selectedProject.price} (${selectedProject.priceUsd})`],
                      ['Type', selectedProject.type],
                      ['Units', `${selectedProject.units}`],
                      ['Est. ROI', `${selectedProject.roi}`],
                      ['Stage', selectedProject.stage],
                      ['Delivery', selectedProject.delivery],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between text-sm">
                        <span className="text-gray-400">{k}</span><span className="font-medium">{v}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <a href="https://wa.me/5548988117424" target="_blank" rel="noopener noreferrer"
                    className="block w-full bg-[#D4AF37] hover:bg-[#c9963c] text-[#1B2951] font-bold text-center py-4 rounded-xl transition text-lg">
                    {t.requestDueDiligence}
                  </a>
                  <a href="https://wa.me/5548988117424" target="_blank" rel="noopener noreferrer"
                    className="block w-full bg-navy-700 hover:bg-navy-600 text-white font-medium text-center py-3 rounded-xl transition">
                    {t.consultExpert}
                  </a>
                </div>
              </div>
            </motion.div>
          ) : showExperts ? (
            /* ── EXPERTS ── */
            <motion.div key="experts" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-3xl font-bold font-serif mb-2">{t.expertsTitle}</h2>
              <p className="text-gray-400 mb-8">{t.expertsSubtitle}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {EXPERTS.map((e, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                    className="bg-navy-800/50 rounded-2xl p-6 border border-white/5 hover:border-[#D4AF37]/30 transition">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#1B2951] flex items-center justify-center text-xl font-serif font-bold text-white">
                        {e.name[0]}
                      </div>
                      <div>
                        <div className="font-bold text-sm">{e.name}</div>
                        <div className="text-xs text-[#D4AF37]">{e.role}</div>
                        <div className="text-[11px] text-gray-500">{e.country}</div>
                      </div>
                    </div>
                    {e.verified && <div className="text-[10px] text-green-400 mb-2">{t.verifiedExpert}</div>}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-yellow-400 text-sm">★ {e.rating}</span>
                      <span className="text-gray-500 text-xs">({e.reviews} reviews)</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {e.specialties.map(s => (
                        <span key={s} className="text-[10px] bg-navy-900 px-2 py-1 rounded-full text-gray-400">{s}</span>
                      ))}
                    </div>
                    <a href="https://wa.me/5548988117424" target="_blank" rel="noopener noreferrer"
                      className="block w-full bg-navy-700 hover:bg-navy-600 text-center py-2 rounded-lg transition text-sm text-[#D4AF37] mt-4">
                      {t.bookConsultation}
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            /* ── MAIN LISTINGS ── */
            <motion.div key="listings" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="mb-8">
                <h1 className="text-4xl font-bold font-serif mb-2">{t.title} <span className="text-[#D4AF37]">Marketplace</span></h1>
                <p className="text-gray-400 max-w-2xl">{t.subtitle}</p>
              </div>

              {/* Developer filter */}
              <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
                <button onClick={() => setSelectedDev(null)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                    !selectedDev ? 'bg-[#D4AF37] text-[#1B2951]' : 'bg-navy-800 text-gray-400 hover:text-white'
                  }`}>{t.allDevelopers}</button>
                {DEVELOPERS.map(d => (
                  <button key={d.id} onClick={() => setSelectedDev(d.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                      selectedDev === d.id ? 'bg-[#D4AF37] text-[#1B2951]' : 'bg-navy-800 text-gray-400 hover:text-white'
                    }`}>{d.flag} {d.name}</button>
                ))}
              </div>

              {/* Stats bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: t.statsProjects, val: '8', icon: '🏗️' },
                  { label: t.statsDevelopers, val: '4', icon: '🏢' },
                  { label: t.statsCountries, val: '4', icon: '🌍' },
                  { label: t.statsValidations, val: '18', icon: '✅' },
                ].map(s => (
                  <div key={s.label} className="bg-navy-800/50 border border-white/5 rounded-xl p-4 text-center">
                    <div className="text-2xl mb-1">{s.icon}</div>
                    <div className="text-2xl font-bold text-[#D4AF37]">{s.val}</div>
                    <div className="text-xs text-gray-500">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProjects.map((p, i) => {
                  const totalChecks = 3;
                  const passedChecks = [p.validators.legal, p.validators.tax, p.validators.appraiser].filter(Boolean).length;
                  const isFullyValidated = passedChecks === totalChecks;

                  return (
                    <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                      onClick={() => setSelectedProject(p)}
                      className="bg-navy-800/50 rounded-2xl border border-white/5 hover:border-[#D4AF37]/30 transition cursor-pointer overflow-hidden group">
                      {/* Image area */}
                      <div className="h-40 bg-gradient-to-br from-navy-700 to-navy-950 overflow-hidden relative">
                        {p.images[0].startsWith('http') || p.images[0].startsWith('/') ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-4xl group-hover:scale-105 transition-transform duration-300">{p.images[0]}</div>
                        )}
                      </div>
                      {/* Content */}
                      <div className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-gray-500">{p.location}</span>
                          {isFullyValidated && <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">{t.verified}</span>}
                        </div>
                        <h3 className="font-bold text-sm">{p.title}</h3>
                        <p className="text-[11px] text-gray-400 line-clamp-2">{p.desc?.[lang] || p.description}</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-[#D4AF37] font-bold">{p.priceUsd}</span>
                          <span className="text-gray-500 text-xs">({p.price})</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400">ROI: <span className="text-green-400 font-medium">{p.roi}</span></span>
                          <span className="text-gray-500">{p.units} {t.units}</span>
                        </div>
                        {/* Validation progress */}
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <span className={`text-xs ${p.validators.legal ? 'text-green-400' : 'text-yellow-500'}`}>{p.validators.legal ? '⚖️' : '⏳'}</span>
                            <span className={`text-xs ${p.validators.tax ? 'text-green-400' : 'text-yellow-500'}`}>{p.validators.tax ? '💰' : '⏳'}</span>
                            <span className={`text-xs ${p.validators.appraiser ? 'text-green-400' : 'text-yellow-500'}`}>{p.validators.appraiser ? '📊' : '⏳'}</span>
                          </div>
                          <span className="text-[10px] text-gray-500">{passedChecks}/{totalChecks}</span>
                        </div>
                        {/* Property Score */}
                        {'score' in p && p.score && (
                          <div className="flex items-center gap-2">
                            <div className="text-[10px] text-gray-500">{t.gronisScore}</div>
                            <div className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                              p.score.overall >= 85 ? 'bg-green-500/20 text-green-400' :
                              p.score.overall >= 70 ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>{p.score.overall}/100</div>
                          </div>
                        )}
                        <div className="text-[10px] text-gray-500">{t.by} {devName(p.developer)}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
