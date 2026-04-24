'use client';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Lang = 'en' | 'ru' | 'ua';
type Page = 'regions' | 'funds' | 'projects' | 'experts' | 'detail';

// ────────── Translations ──────────
const T: Record<Lang, Record<string, string>> = {
  en: {
    title: 'IKG Group',
    subtitle: 'Investment Platform',
    expertsTab: 'Experts',
    back: '← Back',
    verifiedExpert: '✅ Verified Expert',
    bookConsultation: 'Book Consultation →',
    requestDueDiligence: '💬 Request Due Diligence',
    consultExpert: '📞 Consult an Expert',
    units: 'units',
    by: 'by',
    verified: '✓ Verified',
    gronisScore: 'IKG Score',
    propertyScore: '🏆 IKG Property Score',
    financialProjections: '📈 Financial Projections',
    investmentDetails: '📊 Investment Details',
    expertValidation: '🔍 Expert Validation',
    fullyValidated: '🏆 Fully Validated — All checks passed',
    inProgress: 'In progress',
    legalReview: 'Legal Review',
    taxAnalysis: 'Tax Analysis',
    appraisalROI: 'Appraisal & ROI',
    locationLabel: 'Location',
    roiPotential: 'ROI Potential',
    liquidity: 'Liquidity',
    riskLevel: 'Risk Level',
    scoreNote: 'Score based on expert analysis of location, market data, financial projections, and risk assessment. Not financial advice.',
    finNote: 'Projections based on current market conditions and expert analysis. Actual returns may vary.',
    irr: 'IRR', irrDesc: 'Internal Rate of Return',
    capRate: 'Cap Rate', capRateDesc: 'Capitalization Rate',
    cashOnCash: 'Cash-on-Cash', cashOnCashDesc: 'Annual Cash Return',
    payback: 'Payback', paybackDesc: 'Investment Recovery',
    expertsTitle: '👥 Expert Network',
    expertsSubtitle: 'Independent specialists who validate every listing on the platform.',
    // Region selection
    selectRegion: 'Where do you want to invest?',
    selectRegionSub: 'Choose a geographic market to explore curated investment opportunities.',
    // Regions
    brazil: 'Brazil',
    brazilDesc: 'Florianópolis, Jurerê, Canasvieiras — Brazil’s hottest real estate market with 15%+ ROI.',
    azores: 'Azores',
    azoresDesc: 'Portugal’s hidden gem — pristine nature, EU residency, Golden Visa pathway.',
    uruguay: 'Uruguay',
    uruguayDesc: 'Latin America’s Switzerland — political stability, 0% tax, fast citizenship.',
    costarica: 'Costa Rica',
    costaricaDesc: 'Eco-paradise — permanent 0% tax on foreign income, tropical lifestyle.',
    // Fund selection
    chooseStrategy: 'Choose your investment strategy',
    chooseStrategySub: 'Each fund has a unique approach. Select based on your goals and budget.',
    minInvestment: 'Min. Investment',
    viewProjects: 'View Projects →',
    backToRegions: '← Change Region',
    backToFunds: '← Change Strategy',
    // Hot tip
    hotTip: '🔥 Hot Opportunity',
    hotTipText: 'Latin American real estate is undervalued — early investors are securing 15%+ ROI. Discover this market before it\'s mainstream.',
    discoverBrazil: 'Explore Brazil →',
    // Fund descriptions
    growthFund: 'Apex Capital',
    growthFundDesc: 'Pre-construction, emerging markets. Maximum capital appreciation potential.',
    passiveIncomeFund: 'Aureus Income',
    passiveIncomeDesc: 'Ready-to-rent properties with proven yields. Stable monthly cash flow.',
    secondHomeFund: 'Sovereign Estates',
    secondHomeDesc: 'Premium properties for personal use. Maximum comfort, high reliability.',
    projects: 'Projects',
  },
  ru: {
    title: 'IKG Group',
    subtitle: 'Investment Platform',
    expertsTab: 'Эксперты',
    back: '← Назад',
    verifiedExpert: '✅ Верифицированный эксперт',
    bookConsultation: 'Записаться на консультацию →',
    requestDueDiligence: '💬 Запросить проверку',
    consultExpert: '📞 Консультация эксперта',
    units: 'юнитов',
    by: 'от',
    verified: '✓ Проверен',
    gronisScore: 'IKG Score',
    propertyScore: '🏆 IKG Score',
    financialProjections: '📈 Финансовые прогнозы',
    investmentDetails: '📊 Инвестиционные детали',
    expertValidation: '🔍 Экспертная проверка',
    fullyValidated: '🏆 Полная проверка пройдена',
    inProgress: 'В процессе',
    legalReview: 'Юридическая проверка',
    taxAnalysis: 'Налоговый анализ',
    appraisalROI: 'Оценка и ROI',
    locationLabel: 'Локация',
    roiPotential: 'Потенциал ROI',
    liquidity: 'Ликвидность',
    riskLevel: 'Уровень риска',
    scoreNote: 'Оценка на основе экспертного анализа локации, рыночных данных, финансовых прогнозов и рисков. Не является финансовой рекомендацией.',
    finNote: 'Прогнозы основаны на текущих рыночных условиях и экспертном анализе. Реальная доходность может отличаться.',
    irr: 'IRR', irrDesc: 'Внутренняя норма доходности',
    capRate: 'Cap Rate', capRateDesc: 'Ставка капитализации',
    cashOnCash: 'Cash-on-Cash', cashOnCashDesc: 'Годовая доходность на вложенный капитал',
    payback: 'Окупаемость', paybackDesc: 'Срок возврата инвестиций',
    expertsTitle: '👥 Сеть экспертов',
    expertsSubtitle: 'Независимые специалисты, которые проверяют каждый объект на платформе.',
    selectRegion: 'Куда хотите инвестировать?',
    selectRegionSub: 'Выберите географический рынок для изучения curated инвестиционных возможностей.',
    brazil: 'Бразилия',
    brazilDesc: 'Флорианополис, Жюрере, Канасвьейрас — самый горячий рынок недвижимости Бразилии с ROI 15%+.',
    azores: 'Азорские острова',
    azoresDesc: 'Скрытая жемчужина Португалии — нетронутая природа, ВНЖ ЕС, путь к Golden Visa.',
    uruguay: 'Уругвай',
    uruguayDesc: 'Швейцария Латинской Америки — политическая стабильность, 0% налогов, быстрое гражданство.',
    costarica: 'Коста-Рика',
    costaricaDesc: 'Эко-рай — постоянные 0% на зарубежный доход, тропический лайфстайл.',
    chooseStrategy: 'Выберите инвестиционную стратегию',
    chooseStrategySub: 'Каждый фонд имеет уникальный подход. Выберите по вашим целям и бюджету.',
    minInvestment: 'Мин. инвестиция',
    viewProjects: 'Смотреть проекты →',
    backToRegions: '← Сменить регион',
    backToFunds: '← Сменить стратегию',
    hotTip: '🔥 Горячая возможность',
    hotTipText: 'Недвижимость в Латинской Америке недооценена — ранние инвесторы получают 15%+ ROI. Откройте этот рынок до того, как он станет мейнстримом.',
    discoverBrazil: 'Исследовать Бразилию →',
    growthFund: 'Apex Capital',
    growthFundDesc: 'Pre-construction, развивающиеся рынки. Максимальный потенциал роста капитала.',
    passiveIncomeFund: 'Aureus Income',
    passiveIncomeDesc: 'Готовые объекты с подтверждённой доходностью. Стабильный ежемесячный cash flow.',
    secondHomeFund: 'Sovereign Estates',
    secondHomeDesc: 'Премиальные объекты для личного использования. Максимальный комфорт, высокая надёжность.',
    projects: 'Проекты',
  },
  ua: {
    title: 'IKG Group',
    subtitle: 'Investment Platform',
    expertsTab: 'Експерти',
    back: '← Назад',
    verifiedExpert: '✅ Верифікований експерт',
    bookConsultation: 'Записатись на консультацію →',
    requestDueDiligence: '💬 Запитати перевірку',
    consultExpert: '📞 Консультація експерта',
    units: 'юнітів',
    by: 'від',
    verified: '✓ Перевірено',
    gronisScore: 'IKG Score',
    propertyScore: '🏆 IKG Score',
    financialProjections: '📈 Фінансові прогнози',
    investmentDetails: '📊 Інвестиційні деталі',
    expertValidation: '🔍 Експертна перевірка',
    fullyValidated: '🏆 Повна перевірка пройдена',
    inProgress: 'В процесі',
    legalReview: 'Юридична перевірка',
    taxAnalysis: 'Податковий аналіз',
    appraisalROI: 'Оцінка та ROI',
    locationLabel: 'Локація',
    roiPotential: 'Потенціал ROI',
    liquidity: 'Ліквідність',
    riskLevel: 'Рівень ризику',
    scoreNote: 'Оцінка на основі експертного аналізу локації, ринкових даних, фінансових прогнозів та ризиків. Не є фінансовою рекомендацією.',
    finNote: 'Прогнози базуються на поточних ринкових умовах та експертному аналізі. Реальна дохідність може відрізнятись.',
    irr: 'IRR', irrDesc: 'Внутрішня норма дохідності',
    capRate: 'Cap Rate', capRateDesc: 'Ставка капіталізації',
    cashOnCash: 'Cash-on-Cash', cashOnCashDesc: 'Річна дохідність на вкладений капітал',
    payback: 'Окупність', paybackDesc: 'Термін повернення інвестицій',
    expertsTitle: '👥 Мережа експертів',
    expertsSubtitle: 'Незалежні спеціалісти, які перевіряють кожен обʼєкт на платформі.',
    selectRegion: 'Куди хочете інвестувати?',
    selectRegionSub: 'Оберіть географічний ринок для вивчення курованих інвестиційних можливостей.',
    brazil: 'Бразилія',
    brazilDesc: 'Флоріанополіс, Жюрере, Канасвьейрас — найгарячіший ринок нерухомості Бразилії з ROI 15%+.',
    azores: 'Азорські острови',
    azoresDesc: 'Прихований діамант Португалії — незаймана природа, ВНЖ ЄС, шлях до Golden Visa.',
    uruguay: 'Уругвай',
    uruguayDesc: 'Швейцарія Латинської Америки — політична стабільність, 0% податків, швидке громадянство.',
    costarica: 'Коста-Ріка',
    costaricaDesc: 'Еко-рай — постійні 0% на зарубіжний дохід, тропічний лайфстайл.',
    chooseStrategy: 'Оберіть інвестиційну стратегію',
    chooseStrategySub: 'Кожен фонд має унікальний підхід. Оберіть за вашими цілями та бюджетом.',
    minInvestment: 'Мін. інвестиція',
    viewProjects: 'Дивитись проекти →',
    backToRegions: '← Змінити регіон',
    backToFunds: '← Змінити стратегію',
    hotTip: '🔥 Гаряча можливість',
    hotTipText: 'Нерухомість у Латинській Америці недооцінена — ранні інвестори отримують 15%+ ROI. Відкрийте цей ринок до того, як він стане мейнстрімом.',
    discoverBrazil: 'Дослідити Бразилію →',
    growthFund: 'Apex Capital',
    growthFundDesc: 'Pre-construction, ринки, що розвиваються. Максимальний потенціал зростання капіталу.',
    passiveIncomeFund: 'Aureus Income',
    passiveIncomeDesc: 'Готові обʼєкти з підтвердженою дохідністю. Стабільний щомісячний cash flow.',
    secondHomeFund: 'Sovereign Estates',
    secondHomeDesc: 'Преміальні обʼєкти для особистого використання. Максимальний комфорт, висока надійність.',
    projects: 'Проекти',
  },
};

// ────────── Data ──────────

type FundType = 'growth' | 'passive' | 'second_home';

interface Fund {
  id: FundType;
  minInvestment: number;
  strategy: string;
  targetROI: string;
  riskLevel: string;
  icon: string;
  color: string;
}

const FUNDS: Record<FundType, Fund> = {
  growth: { id: 'growth', minInvestment: 150000, strategy: 'Pre-construction & emerging markets', targetROI: '15–25%', riskLevel: 'Medium-High', icon: '🚀', color: '#ef4444' },
  passive: { id: 'passive', minInvestment: 200000, strategy: 'Ready-to-rent, proven yields', targetROI: '7–12%', riskLevel: 'Low-Medium', icon: '💰', color: '#22c55e' },
  second_home: { id: 'second_home', minInvestment: 300000, strategy: 'Premium properties for personal use', targetROI: '5–10%', riskLevel: 'Low', icon: '🏡', color: '#3b82f6' },
};

interface Project {
  id: string;
  title: string;
  priceUsd: number;
  price: string;
  location: string;
  type: string;
  roi: string;
  units: number;
  stage: string;
  delivery: string;
  description: string;
  desc: Record<Lang, string>;
  fundType: FundType;
  region: string;
  validators: { legal: boolean; tax: boolean; appraiser: boolean };
  score?: { overall: number; location: number; roi: number; liquidity: number; risk: number };
  financials?: { irr: string; capRate: string; cashOnCash: string; paybackYears: number };
  images: string[];
}

const PROJECTS: Project[] = [
  // ── BRAZIL ──
  { id: 'terra1', title: 'Terrá Jurerê', priceUsd: 410000, price: 'R$ 2.1M', location: 'Jurerê, Florianópolis', type: 'Luxury Apartments', roi: '10.5%', units: 48, stage: 'Under Construction', delivery: 'Q4 2027', description: '', desc: { en: 'Luxury villas in Jurerê — the most exclusive neighborhood in Florianópolis. 2–3 bedrooms, pool, sea view.', ru: 'Элитные апартаменты в Жюрере — самый престижный район Флорианополиса. 2–3 спальни, бассейн, вид на море.', ua: 'Елітні апартаменти в Жюрере — найпрестижніший район Флоріанополіса. 2–3 спальні, басейн, вид на море.' }, fundType: 'passive', region: 'brazil', validators: { legal: true, tax: true, appraiser: true }, score: { overall: 92, location: 95, roi: 88, liquidity: 90, risk: 95 }, financials: { irr: '14.2%', capRate: '7.8%', cashOnCash: '11.5%', paybackYears: 8.5 }, images: ['/platform/terra-jurere-1.jpg', '/platform/terra-jurere-2.jpg', '/platform/terra-jurere-3.jpg'] },
  { id: 'terra2', title: 'CB Towers Residence', priceUsd: 275000, price: 'R$ 1.4M', location: 'Canasvieiras, Floripa', type: 'High-Rise Apartments', roi: '9.2%', units: 120, stage: 'Foundation', delivery: 'Q2 2028', description: '', desc: { en: 'Modern towers with full infrastructure: gym, pool, coworking. Walking distance to the beach.', ru: 'Современные башни с полной инфраструктурой: фитнес, бассейн, коворкинг. Пешком до пляжа.', ua: 'Сучасні вежі з повною інфраструктурою: фітнес, басейн, коворкінг. Пішки до пляжу.' }, fundType: 'growth', region: 'brazil', validators: { legal: true, tax: true, appraiser: false }, score: { overall: 78, location: 82, roi: 80, liquidity: 75, risk: 74 }, financials: { irr: '12.1%', capRate: '6.9%', cashOnCash: '9.8%', paybackYears: 9.5 }, images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80'] },
  { id: 'terra3', title: 'Vista Mar Suites', priceUsd: 175000, price: 'R$ 890K', location: 'Campeche, Floripa', type: 'Studios & 1BR', roi: '11.8%', units: 80, stage: 'Pre-Launch', delivery: 'Q1 2029', description: '', desc: { en: 'Affordable studios in the fastest-growing area of Floripa. High Airbnb demand.', ru: 'Доступные студии в самом растущем районе Флорипы. Высокий спрос на Airbnb.', ua: 'Доступні студії в найрозвиненішому районі Флоріпи. Високий попит на Airbnb.' }, fundType: 'growth', region: 'brazil', validators: { legal: true, tax: false, appraiser: false }, score: { overall: 68, location: 70, roi: 85, liquidity: 60, risk: 58 }, financials: { irr: '16.5%', capRate: '9.2%', cashOnCash: '13.1%', paybackYears: 7.2 }, images: ['https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80'] },

  // ── AZORES ──
  { id: 'azure1', title: 'Algarve Oceanview', priceUsd: 705000, price: '€650K', location: 'Lagos, Algarve', type: 'Luxury Villas', roi: '7.5%', units: 24, stage: 'Under Construction', delivery: 'Q3 2027', description: '', desc: { en: 'Clifftop villas with panoramic ocean views. Golden Visa eligible.', ru: 'Виллы на утёсе с панорамным видом на океан. Подходит для Golden Visa.', ua: 'Вілли на скелі з панорамним видом на океан. Підходить для Golden Visa.' }, fundType: 'second_home', region: 'azores', validators: { legal: true, tax: true, appraiser: true }, score: { overall: 85, location: 90, roi: 78, liquidity: 82, risk: 88 }, financials: { irr: '10.5%', capRate: '5.5%', cashOnCash: '8.2%', paybackYears: 11 }, images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80'] },
  { id: 'azure2', title: 'Lisbon Heritage', priceUsd: 455000, price: '€420K', location: 'Chiado, Lisbon', type: 'Renovated Apartments', roi: '6.8%', units: 16, stage: 'Renovation', delivery: 'Q1 2027', description: '', desc: { en: 'Historic building renovation in the heart of Lisbon. High tourist demand.', ru: 'Реновация исторического здания в центре Лиссабона. Высокий туристический спрос.', ua: 'Реновація історичної будівлі в центрі Лісабона. Високий туристичний попит.' }, fundType: 'passive', region: 'azores', validators: { legal: true, tax: false, appraiser: true }, score: { overall: 72, location: 88, roi: 65, liquidity: 70, risk: 66 }, financials: { irr: '9.8%', capRate: '4.8%', cashOnCash: '7.1%', paybackYears: 13 }, images: ['https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80'] },


];

const EXPERTS = [
  { name: 'Dr. Carlos Mendez', role: 'Real Estate Lawyer', country: 'Brazil 🇧🇷', rating: 4.9, reviews: 127, specialties: ['Property Law', 'Immigration', 'Due Diligence'], verified: true },
  { name: 'Ana Rodrigues', role: 'Tax Advisor', country: 'Portugal 🇵🇹', rating: 4.8, reviews: 89, specialties: ['Golden Visa Tax', 'NHR', 'International Tax'], verified: true },
  { name: 'Somchai Patel', role: 'Property Appraiser', country: 'Thailand 🇹🇭', rating: 4.7, reviews: 64, specialties: ['Valuation', 'Market Analysis', 'ROI'], verified: true },
  { name: 'Maria Silva', role: 'Immigration Consultant', country: 'Brazil 🇧🇷', rating: 5.0, reviews: 203, specialties: ['VIPER Visa', 'Citizenship', 'Documentation'], verified: true },
  { name: 'James Cooper', role: 'Independent Valuer', country: 'UK 🇬🇧', rating: 4.6, reviews: 41, specialties: ['Valuation', 'Risk Assessment'], verified: true },
  { name: 'Lucas Fernández', role: 'Tax Attorney', country: 'Costa Rica 🇨🇷', rating: 4.8, reviews: 55, specialties: ['Corporate Tax', 'Residency'], verified: true },
];

const REGIONS = [
  { id: 'brazil', icon: '🇧🇷', name: { en: 'Brazil', ru: 'Бразилия', ua: 'Бразилія' }, desc: { en: 'Florianópolis, Jurerê, Canasvieiras — Brazil’s hottest real estate market with 15%+ ROI.', ru: 'Флорианополис, Жюрере, Канасвьейрас — самый горячий рынок недвижимости Бразилии с ROI 15%+.', ua: 'Флоріанополіс, Жюрере, Канасвьейрас — найгарячіший ринок нерухомості Бразилії з ROI 15%+.' }, color: 'from-green-500 to-emerald-600', projects: 3, image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&q=80', comingSoon: false },
  { id: 'azores', icon: '🇵🇹', name: { en: 'Azores', ru: 'Азорские острова', ua: 'Азорські острови' }, desc: { en: 'Portugal’s hidden gem — pristine nature, EU residency, Golden Visa pathway.', ru: 'Скрытая жемчужина Португалии — нетронутая природа, ВНЖ ЕС, путь к Golden Visa.', ua: 'Прихований діамант Португалії — незаймана природа, ВНЖ ЄС, шлях до Golden Visa.' }, color: 'from-blue-500 to-cyan-600', projects: 2, image: 'https://images.unsplash.com/photo-1594221708762-2b1e6d8e8e3f?w=800&q=80', comingSoon: false },
  { id: 'uruguay', icon: '🇺🇾', name: { en: 'Uruguay', ru: 'Уругвай', ua: 'Уругвай' }, desc: { en: 'Latin America’s Switzerland — political stability, 0% tax, fast citizenship.', ru: 'Швейцария Латинской Америки — политическая стабильность, 0% налогов, быстрое гражданство.', ua: 'Швейцарія Латинської Америки — політична стабільність, 0% податків, швидке громадянство.' }, color: 'from-amber-500 to-yellow-600', projects: 0, image: '', comingSoon: true },
  { id: 'costarica', icon: '🇨🇷', name: { en: 'Costa Rica', ru: 'Коста-Рика', ua: 'Коста-Ріка' }, desc: { en: 'Eco-paradise — permanent 0% tax on foreign income, tropical lifestyle.', ru: 'Эко-рай — постоянные 0% на зарубежный доход, тропический лайфстайл.', ua: 'Еко-рай — постійні 0% на зарубіжний дохід, тропічний лайфстайл.' }, color: 'from-emerald-500 to-teal-600', projects: 0, image: '', comingSoon: true },
];

// ────────── Component ──────────
export default function PlatformClient() {
  const [page, setPage] = useState<Page>('regions');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedFund, setSelectedFund] = useState<FundType | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [lang, setLang] = useState<Lang>('en');

  const t = T[lang];

  const regionProjects = useMemo(() => {
    if (!selectedRegion) return [];
    return PROJECTS.filter(p => p.region === selectedRegion);
  }, [selectedRegion]);

  const fundProjects = useMemo(() => {
    if (!selectedRegion || !selectedFund) return [];
    return regionProjects.filter(p => p.fundType === selectedFund );
  }, [regionProjects, selectedFund]);

  const regionName = (id: string) => REGIONS.find(r => r.id === id)?.name[lang] || id;

  return (
    <div className="min-h-screen bg-[#1B2951] text-white">
      {/* Nav */}
      <nav className="border-b border-white/10 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <button onClick={() => { setPage('regions'); setSelectedRegion(null); setSelectedFund(null); setSelectedProject(null); }} className="flex items-center gap-3 hover:opacity-80 transition">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <span className="text-2xl font-bold tracking-wider">Lig<span className="text-[#D4AF37]">Lex</span></span>
            <div>
              <span className="font-bold font-serif text-lg text-[#D4AF37] block leading-tight">IKG Group</span>
              <span className="text-[10px] text-gray-400 hidden sm:block">{t.subtitle}</span>
            </div>
          </button>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="flex gap-1 bg-navy-800 rounded-lg p-1 shrink-0">
              {(['en', 'ru', 'ua'] as Lang[]).map(l => (
                <button key={l} onClick={() => setLang(l)}
                  className={`px-2 py-1 rounded text-xs font-medium transition ${lang === l ? 'bg-[#D4AF37] text-[#1B2951]' : 'text-gray-400 hover:text-white'}`}>
                  {l === 'en' ? 'EN' : l === 'ru' ? 'RU' : 'UA'}
                </button>
              ))}
            </div>
            <button onClick={() => { setPage('experts'); setSelectedProject(null); }}
              className={`text-sm transition ml-auto ${page === 'experts' ? 'text-[#D4AF37]' : 'text-gray-400 hover:text-white'}`}>{t.expertsTab}</button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">

          {/* ── EXPERTS ── */}
          {page === 'experts' && (
            <motion.div key="experts" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <button onClick={() => setPage(selectedRegion ? 'funds' : 'regions')} className="text-gray-400 hover:text-white transition text-sm mb-6">{t.back}</button>
              <h2 className="text-3xl font-bold font-serif mb-2">{t.expertsTitle}</h2>
              <p className="text-gray-400 mb-8">{t.expertsSubtitle}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {EXPERTS.map((e, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                    className="bg-navy-800/50 rounded-2xl p-6 border border-white/5 hover:border-[#D4AF37]/30 transition">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#1B2951] flex items-center justify-center text-xl font-serif font-bold text-white">{e.name[0]}</div>
                      <div><div className="font-bold text-sm">{e.name}</div><div className="text-xs text-[#D4AF37]">{e.role}</div><div className="text-[11px] text-gray-500">{e.country}</div></div>
                    </div>
                    {e.verified && <div className="text-[10px] text-green-400 mb-2">{t.verifiedExpert}</div>}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-yellow-400 text-sm">★ {e.rating}</span>
                      <span className="text-gray-500 text-xs">({e.reviews} reviews)</span>
                    </div>
                    <div className="flex flex-wrap gap-1">{e.specialties.map(s => (<span key={s} className="text-[10px] bg-navy-900 px-2 py-1 rounded-full text-gray-400">{s}</span>))}</div>
                    <a href="https://wa.me/5548988117424" target="_blank" rel="noopener noreferrer" className="block w-full bg-navy-700 hover:bg-navy-600 text-center py-2 rounded-lg transition text-sm text-[#D4AF37] mt-4">{t.bookConsultation}</a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── PROJECT DETAIL ── */}
          {page === 'detail' && selectedProject && (
            <motion.div key="detail" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
              <button onClick={() => setPage('projects')} className="text-gray-400 hover:text-white transition text-sm mb-6">{t.back}</button>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-gradient-to-br from-navy-700 to-navy-950 rounded-2xl h-80 overflow-hidden">
                    {selectedProject.images[0]?.startsWith('http') ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={selectedProject.images[0]} alt={selectedProject.title} className="w-full h-full object-cover" />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={selectedProject.images[0]} alt={selectedProject.title} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-[#D4AF37]/20 text-[#D4AF37] px-3 py-1 rounded-full text-xs font-medium">{regionName(selectedProject.region)}</span>
                      <span className="text-gray-500 text-sm">{selectedProject.location}</span>
                    </div>
                    <h1 className="text-3xl font-bold font-serif">{selectedProject.title}</h1>
                    <p className="text-gray-400 mt-3 text-sm leading-relaxed">{selectedProject.desc[lang]}</p>
                  </div>

                  <div className="bg-navy-800/50 rounded-2xl p-6 border border-white/5">
                    <h3 className="font-bold text-lg mb-4">{t.expertValidation}</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {[{ label: t.legalReview, ok: selectedProject.validators.legal, expert: 'Dr. Carlos Mendez' }, { label: t.taxAnalysis, ok: selectedProject.validators.tax, expert: 'Ana Rodrigues' }, { label: t.appraisalROI, ok: selectedProject.validators.appraiser, expert: 'Somchai Patel' }].map((v) => (
                        <div key={v.label} className={`p-4 rounded-xl border ${v.ok ? 'border-green-500/30 bg-green-500/5' : 'border-yellow-500/30 bg-yellow-500/5'}`}>
                          <div className="text-2xl mb-2">{v.ok ? '✅' : '⏳'}</div>
                          <div className="text-sm font-medium">{v.label}</div>
                          <div className="text-xs text-gray-400 mt-1">{v.ok ? `By ${v.expert}` : t.inProgress}</div>
                        </div>
                      ))}
                    </div>
                    {selectedProject.validators.legal && selectedProject.validators.tax && selectedProject.validators.appraiser && (
                      <div className="mt-4 p-3 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-xl text-center"><span className="text-[#D4AF37] font-bold">{t.fullyValidated}</span></div>
                    )}
                  </div>

                  {selectedProject.score && (
                    <div className="bg-navy-800/50 rounded-2xl p-6 border border-white/5">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-lg">{t.propertyScore}</h3>
                        <div className={`px-4 py-2 rounded-xl text-2xl font-bold ${selectedProject.score.overall >= 85 ? 'bg-green-500/20 text-green-400' : selectedProject.score.overall >= 70 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>{selectedProject.score.overall}/100</div>
                      </div>
                      <div className="space-y-3">
                        {[{ label: t.locationLabel, val: selectedProject.score.location }, { label: t.roiPotential, val: selectedProject.score.roi }, { label: t.liquidity, val: selectedProject.score.liquidity }, { label: t.riskLevel, val: selectedProject.score.risk }].map((s) => (
                          <div key={s.label}>
                            <div className="flex justify-between text-sm mb-1"><span className="text-gray-400">{s.label}</span><span className="font-medium">{s.val}%</span></div>
                            <div className="h-2 bg-navy-900 rounded-full overflow-hidden"><div className="h-full rounded-full transition-all" style={{ width: `${s.val}%`, background: s.val >= 80 ? '#22c55e' : s.val >= 60 ? '#eab308' : '#ef4444' }} /></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedProject.financials && (
                    <div className="bg-navy-800/50 rounded-2xl p-6 border border-white/5">
                      <h3 className="font-bold text-lg mb-4">{t.financialProjections}</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {[{ label: t.irr, val: selectedProject.financials.irr, desc: t.irrDesc }, { label: t.capRate, val: selectedProject.financials.capRate, desc: t.capRateDesc }, { label: t.cashOnCash, val: selectedProject.financials.cashOnCash, desc: t.cashOnCashDesc }, { label: t.payback, val: selectedProject.financials.paybackYears + ' yrs', desc: t.paybackDesc }].map((m) => (
                          <div key={m.label} className="bg-navy-900 rounded-xl p-4 text-center">
                            <div className="text-[#D4AF37] text-2xl font-bold">{m.val}</div>
                            <div className="text-xs font-medium mt-1">{m.label}</div>
                            <div className="text-[10px] text-gray-500">{m.desc}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="space-y-6">
                  <div className="bg-navy-800/50 rounded-2xl p-6 border border-white/5">
                    <h3 className="font-bold text-lg mb-4">{t.investmentDetails}</h3>
                    {[['Price', `$${selectedProject.priceUsd.toLocaleString()} (${selectedProject.price})`], ['Type', selectedProject.type], ['Units', `${selectedProject.units}`], ['Est. ROI', selectedProject.roi], ['Stage', selectedProject.stage], ['Delivery', selectedProject.delivery]].map(([k, v]) => (
                      <div key={k} className="flex justify-between text-sm"><span className="text-gray-400">{k}</span><span className="font-medium">{v}</span></div>
                    ))}
                  </div>
                  <a href="https://wa.me/5548988117424" target="_blank" rel="noopener noreferrer" className="block w-full bg-[#D4AF37] hover:bg-[#c9963c] text-[#1B2951] font-bold text-center py-4 rounded-xl transition text-lg">{t.requestDueDiligence}</a>
                  <a href="https://wa.me/5548988117424" target="_blank" rel="noopener noreferrer" className="block w-full bg-navy-700 hover:bg-navy-600 text-white font-medium text-center py-3 rounded-xl transition">{t.consultExpert}</a>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── REGIONS ── */}
          {page === 'regions' && (
            <motion.div key="regions" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="text-4xl font-bold font-serif mb-2">{t.selectRegion}</h1>
              <p className="text-gray-400 mb-8 max-w-2xl">{t.selectRegionSub}</p>

              {/* Region Cards with Photos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {REGIONS.map((r, i) => (
                  <motion.div key={r.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                    onClick={() => { if (!r.comingSoon) { setSelectedRegion(r.id); setPage('funds'); } }}
                    className={`group relative h-72 rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-[#D4AF37]/40 transition-all duration-500 ${r.comingSoon ? 'opacity-60' : ''}`}>
                    {/* Background image */}
                    {r.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={r.image} alt={r.name[lang]} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    )}
                    {!r.image && <div className={`absolute inset-0 bg-gradient-to-br ${r.color}`} />}
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1B2951] via-[#1B2951]/40 to-transparent" />
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{r.icon}</span>
                        <h3 className="text-2xl font-bold font-serif">{r.name[lang]}</h3>
                      </div>
                      <p className="text-gray-300 text-sm mb-3">{r.desc[lang]}</p>
                      <div className="flex items-center gap-3">
                        {r.comingSoon ? (
                          <span className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-gray-400">Coming Soon</span>
                        ) : (
                          <>
                            <span className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-xs">{r.projects} {t.projects}</span>
                            <span className="text-[#D4AF37] text-sm group-hover:translate-x-1 transition-transform">→</span>
                          </>
                        )}
                      </div>
                    </div>
                    {r.comingSoon && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-[#1B2951]/80 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/10">
                          <span className="text-white font-bold text-lg">Coming Soon</span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
              {/* Hot Tip */}
              {selectedRegion !== 'brazil' && (
                <div className="mt-8 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">🔥</span>
                    <div>
                      <h3 className="font-bold text-[#D4AF37] text-lg mb-1">{t.hotTip}</h3>
                      <p className="text-gray-300 text-sm mb-3">{t.hotTipText}</p>
                      <button onClick={() => { setSelectedRegion('brazil'); setPage('funds'); }} className="text-[#D4AF37] font-medium text-sm hover:underline">{t.discoverBrazil}</button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* ── FUNDS ── */}
          {page === 'funds' && selectedRegion && (
            <motion.div key="funds" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <button onClick={() => { setPage('regions'); setSelectedRegion(null); }} className="text-gray-400 hover:text-white transition text-sm mb-4">{t.backToRegions}</button>
              <h1 className="text-3xl font-bold font-serif mb-1">{regionName(selectedRegion)}</h1>
              <p className="text-gray-400 mb-8">{t.chooseStrategy}</p>

              {/* Min investment filter */}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(Object.values(FUNDS) as Fund[]).map((fund, i) => {
                  const fundCount = regionProjects.filter(p => p.fundType === fund.id).length;
                  return (
                    <motion.div key={fund.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                      className="bg-navy-800/50 rounded-2xl border border-white/5 hover:border-[#D4AF37]/30 transition overflow-hidden">
                      <div className="p-6">
                        <div className="text-4xl mb-4">{fund.icon}</div>
                        <h3 className="text-xl font-bold mb-2">{fund.id === 'growth' ? t.growthFund : fund.id === 'passive' ? t.passiveIncomeFund : t.secondHomeFund}</h3>
                        <p className="text-gray-400 text-sm mb-4">{fund.id === 'growth' ? t.growthFundDesc : fund.id === 'passive' ? t.passiveIncomeDesc : t.secondHomeDesc}</p>
                        <div className="space-y-2 text-sm mb-6">
                          <div className="flex justify-between"><span className="text-gray-500">{t.minInvestment}</span><span className="font-medium">${fund.minInvestment.toLocaleString()}</span></div>
                          <div className="flex justify-between"><span className="text-gray-500">Target ROI</span><span className="text-green-400 font-medium">{fund.targetROI}</span></div>
                          <div className="flex justify-between"><span className="text-gray-500">Risk</span><span className="font-medium">{fund.riskLevel}</span></div>
                          <div className="flex justify-between"><span className="text-gray-500">{t.projects}</span><span className="font-medium">{fundCount}</span></div>
                        </div>
                      </div>
                      <button onClick={() => { setSelectedFund(fund.id); setPage('projects'); }}
                        className="w-full bg-navy-700 hover:bg-navy-600 text-center py-3 transition text-[#D4AF37] text-sm font-medium">
                        {t.viewProjects}
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ── PROJECTS ── */}
          {page === 'projects' && selectedRegion && selectedFund && (
            <motion.div key="projects" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <button onClick={() => { setPage('funds'); setSelectedFund(null); }} className="text-gray-400 hover:text-white transition text-sm mb-4">{t.backToFunds}</button>
              <div className="flex items-center gap-3 mb-6">
                <h1 className="text-3xl font-bold font-serif">{regionName(selectedRegion)}</h1>
                <span className="text-gray-500">→</span>
                <span className="text-[#D4AF37] text-lg">{selectedFund === 'growth' ? t.growthFund : selectedFund === 'passive' ? t.passiveIncomeFund : t.secondHomeFund}</span>
              </div>
              <p className="text-gray-400 mb-6">{fundProjects.length} {t.projects}</p>

              {fundProjects.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-5xl mb-4">🔍</div>
                  <p className="text-gray-400 text-lg">No projects match your criteria</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {fundProjects.map((p, i) => {
                    const totalChecks = 3;
                    const passedChecks = [p.validators.legal, p.validators.tax, p.validators.appraiser].filter(Boolean).length;
                    return (
                      <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                        onClick={() => { setSelectedProject(p); setPage('detail'); }}
                        className="bg-navy-800/50 rounded-2xl border border-white/5 hover:border-[#D4AF37]/30 transition cursor-pointer overflow-hidden group">
                        <div className="h-48 bg-gradient-to-br from-navy-700 to-navy-950 overflow-hidden relative">
                          {p.images[0] && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          )}
                        </div>
                        <div className="p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-gray-500">{p.location}</span>
                            {passedChecks === totalChecks && <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">{t.verified}</span>}
                          </div>
                          <h3 className="font-bold text-sm">{p.title}</h3>
                          <p className="text-[11px] text-gray-400 line-clamp-2">{p.desc[lang]}</p>
                          <div className="flex items-baseline gap-2">
                            <span className="text-[#D4AF37] font-bold">${p.priceUsd.toLocaleString()}</span>
                            <span className="text-gray-500 text-xs">({p.price})</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-400">ROI: <span className="text-green-400 font-medium">{p.roi}</span></span>
                            <span className="text-gray-500">{p.units} {t.units}</span>
                          </div>
                          {p.score && (
                            <div className="flex items-center gap-2">
                              <div className="text-[10px] text-gray-500">{t.gronisScore}</div>
                              <div className={`px-2 py-0.5 rounded-full text-xs font-bold ${p.score.overall >= 85 ? 'bg-green-500/20 text-green-400' : p.score.overall >= 70 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>{p.score.overall}/100</div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
