'use client';

import { useState, useEffect } from 'react';

// ─── Translations ───
const t: Record<string, Record<string, any>> = {
  ru: {
    noDataTitle: 'Сначала пройдите Brazil Fit Score™',
    noDataText: 'Этот отчёт основан на результатах вашего теста. Пройдите его, чтобы получить персональный анализ.',
    bfsBtn: 'Пройти Brazil Fit Score™',
    reportTitle: 'Ваш отчёт по районам',
    reportSub: 'На основе вашего лайфстайла, инвестиций и приоритетов мы определили лучшие районы Санта Катарины.',
    overallLabel: 'Общее совпадение',
    whyMatch: 'ПОЧЕМУ ПОДХОДИТ ВАМ',
    investSnapshot: 'ИНВЕСТИЦИОННЫЙ СНИМОК',
    growth: 'Рост', rental: 'Спрос на аренду', safety: 'Безопасность', liquidity: 'Ликвидность', infra: 'Инфраструктура',
    budget: 'ТИПИЧНЫЙ БЮДЖЕТ', bestFor: 'ЛУЧШЕ ДЛЯ',
    opportunities: 'ДОСТУПНЫЕ ВОЗМОЖНОСТИ',
    viewProps: 'Смотреть объекты в',
    insight: 'PLAN B INSIGHT™',
    compTitle: 'СРАВНЕНИЕ РЕГИОНОВ',
    compLifestyle: 'Лайфстайл', compInvest: 'Инвестиции', compFamily: 'Семья', compRental: 'Аренда', compSafety: 'Безопасность',
    consultTitle: 'Дополнительные районы',
    consultText: 'Ещё регионов проанализировано. Консультация для полного отчёта.',
    consultBtn: 'WhatsApp консультация →',
    nextTitle: 'Исследуйте возможности',
    nextText: 'Следующий шаг — оценка объектов и инвестиционный расчёт.',
    btnCalc: 'Калькулятор', btnBrowse: 'Объекты',
    premTitle: 'Plan B Investment Score™',
    premText: 'Профессиональная оценка перед инвестицией:',
    premBtn: 'Запросить оценку',
    premFeats: ['Due diligence застройщика', 'Оценка недвижимости', 'Анализ ликвидности', 'Прогноз аренды', 'Анализ рисков'],
    disclaimer: 'Отчёт основан на анализе данных и не является финансовой рекомендацией.',
  },
  en: {
    noDataTitle: 'Start with Brazil Fit Score™',
    noDataText: 'This report is based on your Brazil Fit Score results. Take the assessment first to receive a personalized analysis.',
    bfsBtn: 'Take Brazil Fit Score™',
    reportTitle: 'Your Ideal Regions Report™',
    reportSub: 'Based on your lifestyle, investment, and relocation preferences, we identified the best regions of Santa Catarina.',
    overallLabel: 'Overall Region Match',
    whyMatch: 'WHY IT MATCHES YOU',
    investSnapshot: 'INVESTMENT SNAPSHOT',
    growth: 'Growth', rental: 'Rental Demand', safety: 'Safety', liquidity: 'Liquidity', infra: 'Infrastructure',
    budget: 'TYPICAL BUDGET', bestFor: 'BEST FOR',
    opportunities: 'AVAILABLE OPPORTUNITIES',
    viewProps: 'View Properties in',
    insight: 'PLAN B INSIGHT™',
    compTitle: 'REGION COMPARISON',
    compLifestyle: 'Lifestyle', compInvest: 'Investment', compFamily: 'Family', compRental: 'Rental', compSafety: 'Safety',
    consultTitle: 'Additional Regions',
    consultText: 'More regions analyzed. Advisor consultation for full report.',
    consultBtn: 'WhatsApp Consultation →',
    nextTitle: 'Explore Opportunities',
    nextText: 'Next step — evaluate properties and run investment calculations.',
    btnCalc: 'Calculator', btnBrowse: 'Browse',
    premTitle: 'Plan B Investment Score™',
    premText: 'Professional evaluation before investing:',
    premBtn: 'Request Assessment',
    premFeats: ['Developer Due Diligence', 'Property Evaluation', 'Liquidity Analysis', 'Rental Forecast', 'Risk Review'],
    disclaimer: 'This report is based on data analysis and does not constitute financial advice.',
  },
};

// ─── Region Data ───
const regions: any[] = [
  { id:'bombinhas', nameRu:'Бомбиньяс', nameEn:'Bombinhas', img:'/images/bombinhas.jpg',
    descRu:'Эко-заповедник с нетронутыми пляжами и кристально чистой водой.', descEn:'Ecological reserve with pristine beaches.',
    whyRu:['Эко-заповедник','Нетронутые пляжи','Кристально чистая вода','Дайвинг','Сохранённая природа'],
    whyEn:['Ecological reserve','Pristine beaches','Crystal clear water','Diving','Preserved nature'],
    invest:{growth:7.5,rental:8.0,safety:8.5,liquidity:7.0,infra:7.5},
    budgetUSD:'$150K — $400K', budgetBRL:'R$750K — R$2M',
    bestForRu:['Эко-туристы','Дайверы','Натуралисты'], bestForEn:['Eco-tourists','Divers','Nature Lovers'],
    propsRu:['Eco Beach House','Dive Lodge','Nature Retreat'], propsEn:['Eco Beach House','Dive Lodge','Nature Retreat'],
    insightRu:'Ограниченное строительство сохраняет природу.', insightEn:'Limited construction preserves nature.',
    comp:{lifestyle:9,investment:7,family:7,rental:8,safety:8},
    matchBudget:['LOW','MEDIUM'], matchLifestyle:['NATURE'], matchGoal:['VACATION'], matchFamily:['SINGLE','COUPLE'] },
  { id:'balneario', nameRu:'Балнеарио Камбориу', nameEn:'Balneário Camboriú', img:'/images/balneario.jpg',
    descRu:'«Бразильский Дубай» — город небоскрёбов на пляже.', descEn:'The "Brazilian Dubai" — skyscrapers on the beach.',
    whyRu:['Небоскрёбы на пляже','Высокий ROI','Luxury-рынок','Туристический хаб','Рост цен'],
    whyEn:['Skyscrapers on the beach','High ROI','Luxury market','Tourism hub','Price growth'],
    invest:{growth:8.5,rental:9.0,safety:8.0,liquidity:8.5,infra:9.0},
    budgetUSD:'$200K — $1M+', budgetBRL:'R$1M — R$5M+',
    bestForRu:['Премиум-инвесторы','Luxury-покупатели','Краткосрочная аренда'],
    bestForEn:['Premium Investors','Luxury Buyers','Short-term Rental'],
    propsRu:['Beachfront High-rise','Luxury Penthouse','Investment Studio'],
    propsEn:['Beachfront High-rise','Luxury Penthouse','Investment Studio'],
    insightRu:'Один из самых быстрорастущих рынков недвижимости в Бразилии.',
    insightEn:'One of Brazil\'s fastest-growing RE markets.',
    comp:{lifestyle:8,investment:9,family:7,rental:9,safety:8},
    matchBudget:['HIGH','PREMIUM','ULTRA'], matchLifestyle:['CITY','LUXURY','INVEST_GROWTH'], matchGoal:['INVEST'], matchOccupation:['INVESTOR','BUSINESS'] },
  { id:'jurere', nameRu:'Журере Интернасиональ', nameEn:'Jurerê Internacional', img:'/images/jurere.jpg',
    descRu:'Премиальный район с виллами люкс-класса.', descEn:'Premium district with luxury villas.',
    whyRu:['Люкс-виллы','Рост цен 8-10%','Максимальная безопасность','VIP-инфраструктура','Высокий спрос на аренду'],
    whyEn:['Luxury villas','8-10% price growth','Maximum safety','VIP infrastructure','High rental demand'],
    invest:{growth:9.0,rental:8.5,safety:9.5,liquidity:8.0,infra:9.0},
    budgetUSD:'$500K — $2M+', budgetBRL:'R$2.5M — R$10M+',
    bestForRu:['Премиум-инвесторы','VIP-покупатели','Пенсионеры-люкс'],
    bestForEn:['Premium Investors','VIP Buyers','Luxury Retirees'],
    propsRu:['Luxury Beachfront Villa','Premium Penthouse','High-end Condominium'],
    propsEn:['Luxury Beachfront Villa','Premium Penthouse','High-end Condominium'],
    insightRu:'Самый дорогой и стабильный рынок Флорианополиса.',
    insightEn:'The most expensive and stable market in Florianópolis.',
    comp:{lifestyle:10,investment:9,family:7,rental:9,safety:10},
    matchBudget:['PREMIUM','ULTRA'], matchLifestyle:['LUXURY','BEACH','SAFETY'], matchFamily:['RETIRED'], matchGoal:['RETIRE','INVEST'] },
  { id:'campeche', nameRu:'Кампеше', nameEn:'Campeche', img:'/images/campeche.jpg',
    descRu:'Лайфстайл, пляжи, растущая инфраструктура.', descEn:'Lifestyle, beaches, and growing infrastructure.',
    whyRu:['Удалённая работа','Природа и активный отдых','Высокий спрос на аренду','Международное комьюнити','Долгосрочный рост'],
    whyEn:['Remote work friendly','Nature & outdoor','Strong rental demand','International community','Long-term growth'],
    invest:{growth:8.5,rental:8.0,safety:8.2,liquidity:7.5,infra:8.8},
    budgetUSD:'$180K — $450K', budgetBRL:'R$900K — R$2.2M',
    bestForRu:['Удалённые работники','Семьи','Lifestyle-инвесторы'],
    bestForEn:['Remote Workers','Families','Lifestyle Investors'],
    propsRu:['Ocean View Apartment','New Development','Rental Investment'],
    propsEn:['Ocean View Apartment','New Development','Rental Investment'],
    insightRu:'Один из самых сбалансированных рынков Флорианополиса.',
    insightEn:'One of the most balanced markets in Florianópolis.',
    comp:{lifestyle:9,investment:8,family:9,rental:8,safety:8},
    matchBudget:['MEDIUM','HIGH'], matchLifestyle:['BEACH','SURF','WELLNESS'], matchOccupation:['REMOTE'], matchGoal:['RELOCATE'] },
  { id:'ingleses', nameRu:'Инглесес', nameEn:'Ingleses', img:'/images/ingleses.jpg',
    descRu:'Семейный район с тёплым морем.', descEn:'Family-friendly area with warm waters.',
    whyRu:['Семейный пляж','Школы и магазины','Стабильный туризм','Доступная недвижимость','Тихая безопасная атмосфера'],
    whyEn:['Family beach','Schools & shops','Stable tourism','Affordable properties','Quiet, safe'],
    invest:{growth:7.0,rental:8.0,safety:8.5,liquidity:7.0,infra:8.0},
    budgetUSD:'$120K — $350K', budgetBRL:'R$600K — R$1.7M',
    bestForRu:['Семьи с детьми','Пенсионеры','Бюджетные инвесторы'],
    bestForEn:['Families with Kids','Retirees','Budget Investors'],
    propsRu:['Beachfront Studio','Family House','Long-term Rental'],
    propsEn:['Beachfront Studio','Family House','Long-term Rental'],
    insightRu:'Привлекает семьи стабильностью и доступностью.',
    insightEn:'Attracts families with stability and affordability.',
    comp:{lifestyle:8,investment:7,family:9,rental:8,safety:8},
    matchBudget:['LOW','MEDIUM'], matchFamily:['FAMILY_SMALL','FAMILY_BIG','RETIRED'], matchLifestyle:['SAFETY'] },
  { id:'lagoa', nameRu:'Лагоа да Консейсан', nameEn:'Lagoa da Conceição', img:'/images/lagoa.jpg',
    descRu:'Центр ночной жизни и водных видов спорта.', descEn:'Nightlife and water sports hub.',
    whyRu:['Серфинг и виндсёрфинг','Ночная жизнь','Лагуна','Молодёжная атмосфера','Близость к пляжам'],
    whyEn:['Surfing & windsurfing','Nightlife','Warm lagoon','Young atmosphere','Close to beaches'],
    invest:{growth:7.5,rental:8.5,safety:7.0,liquidity:8.0,infra:8.5},
    budgetUSD:'$150K — $400K', budgetBRL:'R$750K — R$2M',
    bestForRu:['Молодёжь','Сёрферы','Инвесторы в аренду'],
    bestForEn:['Young Professionals','Surfers','Rental Investors'],
    propsRu:['Surf Apartment','Beach Bar Investment','Lagoon View Studio'],
    propsEn:['Surf Apartment','Beach Bar Investment','Lagoon View Studio'],
    insightRu:'Краткосрочная аренда — одна из самых доходных на острове.',
    insightEn:'Short-term rental yields are among the highest.',
    comp:{lifestyle:9,investment:7,family:6,rental:9,safety:7},
    matchBudget:['MEDIUM','HIGH'], matchLifestyle:['SURF','PARTY','BEACH'], matchFamily:['SINGLE','COUPLE'] },
  { id:'brava', nameRu:'Прайа Брава', nameEn:'Praia Brava', img:'/images/brava.jpg',
    descRu:'Эксклюзивный пляж с люкс-кондоминиумами.', descEn:'Exclusive beach with luxury condos.',
    whyRu:['Эксклюзивный пляж','Люкс-кондоминиумы','Приватность','VIP-инфраструктура','Инвестиционный рост'],
    whyEn:['Exclusive beach','Luxury condos','Privacy','VIP infrastructure','Investment growth'],
    invest:{growth:8.0,rental:7.5,safety:9.0,liquidity:7.0,infra:8.5},
    budgetUSD:'$300K — $1.5M', budgetBRL:'R$1.5M — R$7.5M',
    bestForRu:['VIP-покупатели','Премиум-инвесторы','Приватность'],
    bestForEn:['VIP Buyers','Premium Investors','Privacy Seekers'],
    propsRu:['Luxury Condo','Beachfront Penthouse','Private Villa'],
    propsEn:['Luxury Condo','Beachfront Penthouse','Private Villa'],
    insightRu:'Один из самых эксклюзивных адресов Флорианополиса.',
    insightEn:'One of the most exclusive addresses in Florianópolis.',
    comp:{lifestyle:8,investment:8,family:6,rental:7,safety:9},
    matchBudget:['HIGH','PREMIUM','ULTRA'], matchLifestyle:['LUXURY','SAFETY','BEACH'] },
  { id:'mole', nameRu:'Прайя Моле', nameEn:'Praia Mole', img:'/images/mole.jpg',
    descRu:'Знаменитый сёрф-спот.', descEn:'Famous surf spot.',
    whyRu:['Сёрф-спот','Молодёжная атмосфера','Красивые закаты','Близость к Жоакине','Высокий спрос на аренду'],
    whyEn:['Surf spot','Young atmosphere','Beautiful sunsets','Close to Joaquina','High rental demand'],
    invest:{growth:7.5,rental:8.5,safety:7.0,liquidity:7.0,infra:7.5},
    budgetUSD:'$150K — $400K', budgetBRL:'R$750K — R$2M',
    bestForRu:['Сёрферы','Молодёжь','Инвесторы в аренду'],
    bestForEn:['Surfers','Young Professionals','Rental Investors'],
    propsRu:['Surf Apartment','Youth Hostel','Sunset Studio'],
    propsEn:['Surf Apartment','Youth Hostel','Sunset Studio'],
    insightRu:'Один из самых популярных сёрф-спотов Бразилии.',
    insightEn:'One of Brazil\'s most popular surf spots.',
    comp:{lifestyle:9,investment:7,family:5,rental:9,safety:7},
    matchBudget:['MEDIUM','HIGH'], matchLifestyle:['SURF','BEACH'], matchFamily:['SINGLE','COUPLE'] },
  { id:'joaquina', nameRu:'Жоакина', nameEn:'Joaquina', img:'/images/joaquina.jpg',
    descRu:'Знаменитые дюны, серфинг мирового класса.', descEn:'Famous dunes and world-class surfing.',
    whyRu:['Знаменитые дюны','Серфинг мирового класса','Природная красота','Туристический поток','Пляж'],
    whyEn:['Famous dunes','World-class surfing','Natural beauty','Tourist flow','Beach'],
    invest:{growth:7.5,rental:8.0,safety:7.5,liquidity:7.0,infra:7.5},
    budgetUSD:'$150K — $450K', budgetBRL:'R$750K — R$2.2M',
    bestForRu:['Сёрферы','Натуралисты','Инвесторы в туризм'],
    bestForEn:['Surfers','Nature Lovers','Tourism Investors'],
    propsRu:['Surf House','Dune View Apartment','Tourism Investment'],
    propsEn:['Surf House','Dune View Apartment','Tourism Investment'],
    insightRu:'Один из самых узнаваемых пляжей Флорианополиса.',
    insightEn:'One of Florianópolis\' most recognizable beaches.',
    comp:{lifestyle:9,investment:7,family:6,rental:8,safety:7},
    matchBudget:['MEDIUM','HIGH'], matchLifestyle:['SURF','NATURE','BEACH'] },
  { id:'cachoeira', nameRu:'Кашоейра', nameEn:'Cachoeira do Bom Jesus', img:'/images/cachoeira.jpg',
    descRu:'Спокойный семейный район.', descEn:'Quiet family area.',
    whyRu:['Тихий район','Тёплое море','Доступные цены','Близость к пляжам','Инфраструктура'],
    whyEn:['Quiet area','Warm waters','Affordable prices','Close to beaches','Infrastructure'],
    invest:{growth:6.0,rental:7.5,safety:8.0,liquidity:6.5,infra:7.5},
    budgetUSD:'$120K — $280K', budgetBRL:'R$600K — R$1.4M',
    bestForRu:['Семьи','Пенсионеры','Долгосрочная аренда'],
    bestForEn:['Families','Retirees','Long-term Rental'],
    propsRu:['Family Apartment','Beach House','Long-term Rental'],
    propsEn:['Family Apartment','Beach House','Long-term Rental'],
    insightRu:'Растёт благодаря близости к Журере.',
    insightEn:'Growing due to proximity to Jurerê.',
    comp:{lifestyle:7,investment:6,family:9,rental:7,safety:8},
    matchBudget:['LOW','MEDIUM'], matchFamily:['FAMILY_SMALL','FAMILY_BIG','RETIRED'] },
  { id:'centro', nameRu:'Центро', nameEn:'Centro', img:'/images/centro.jpg',
    descRu:'Исторический центр с деловым районом.', descEn:'Historic city center with business district.',
    whyRu:['Исторический центр','Деловой район','Мост Hercílio Luz','Инфраструктура','Транспорт'],
    whyEn:['Historic center','Business district','Hercílio Luz bridge','Infrastructure','Transport'],
    invest:{growth:6.0,rental:7.5,safety:6.5,liquidity:7.0,infra:9.0},
    budgetUSD:'$100K — $300K', budgetBRL:'R$500K — R$1.5M',
    bestForRu:['Бизнес','Городская жизнь','Долгосрочная аренда'],
    bestForEn:['Business','Urban Lifestyle','Long-term Rental'],
    propsRu:['City Apartment','Business Studio','Historic Building'],
    propsEn:['City Apartment','Business Studio','Historic Building'],
    insightRu:'Деловое сердце Флорианополиса.',
    insightEn:'The business heart of Florianópolis.',
    comp:{lifestyle:6,investment:6,family:5,rental:7,safety:6},
    matchBudget:['LOW','MEDIUM'], matchLifestyle:['CITY'], matchOccupation:['BUSINESS','REMOTE'] },
  { id:'canasvieiras', nameRu:'Канасвейрас', nameEn:'Canasvieiras', img:'/images/canasvieiras.jpg',
    descRu:'Туристический хаб с развлечениями.', descEn:'Tourism hub with entertainment.',
    whyRu:['Туристическая инфраструктура','Развлечения','Доступная недвижимость','Близость к Журере','Туристический поток'],
    whyEn:['Tourism infrastructure','Entertainment','Affordable properties','Close to Jurerê','Tourist flow'],
    invest:{growth:6.5,rental:8.0,safety:7.5,liquidity:7.0,infra:8.0},
    budgetUSD:'$100K — $300K', budgetBRL:'R$500K — R$1.5M',
    bestForRu:['Туристическая аренда','Бюджетные инвесторы','Семьи'],
    bestForEn:['Tourism Rental','Budget Investors','Families'],
    propsRu:['Tourist Apartment','Budget Condo','Family Studio'],
    propsEn:['Tourist Apartment','Budget Condo','Family Studio'],
    insightRu:'Доступная альтернатива Журере.',
    insightEn:'An affordable alternative to Jurerê.',
    comp:{lifestyle:7,investment:6,family:8,rental:8,safety:7},
    matchBudget:['LOW','MEDIUM'], matchGoal:['VACATION','INVEST'] },
  { id:'trindade', nameRu:'Тринидаде', nameEn:'Trindade', img:'/images/trindade.jpg',
    descRu:'Университетский район с молодой энергетикой.', descEn:'University area with young energy.',
    whyRu:['Университетский район','Молодёжная атмосфера','Инфраструктура','Транспорт','Доступная аренда'],
    whyEn:['University area','Young atmosphere','Infrastructure','Transport','Affordable rental'],
    invest:{growth:6.0,rental:7.5,safety:7.0,liquidity:6.5,infra:8.0},
    budgetUSD:'$80K — $200K', budgetBRL:'R$400K — R$1M',
    bestForRu:['Студенческая аренда','Бюджетные инвесторы','Городская жизнь'],
    bestForEn:['Student Rental','Budget Investors','Urban Lifestyle'],
    propsRu:['Student Apartment','Budget Studio','Rental Investment'],
    propsEn:['Student Apartment','Budget Studio','Rental Investment'],
    insightRu:'Стабильный рынок студенческой аренды.',
    insightEn:'A stable student rental market.',
    comp:{lifestyle:6,investment:6,family:5,rental:7,safety:7},
    matchBudget:['LOW'], matchFamily:['SINGLE'] },
];

// ─── Score a region based on Fit Score answers ───
function scoreRegion(region: any, answers: any): number {
  let score = 50; // base
  const budget = answers?.budget;
  const lifestyle = answers?.lifestyle || [];
  const goal = answers?.goal;
  const family = answers?.family;
  const occupation = answers?.occupation;
  const priority = answers?.priority;

  // Budget match
  if (region.matchBudget?.includes(budget)) score += 15;
  // Lifestyle match
  if (lifestyle.length) {
    lifestyle.forEach((ls: string) => {
      if (region.matchLifestyle?.includes(ls)) score += 8;
    });
  }
  // Goal match
  if (region.matchGoal?.includes(goal)) score += 12;
  // Family match
  if (region.matchFamily?.includes(family)) score += 10;
  // Occupation match
  if (region.matchOccupation?.includes(occupation)) score += 10;
  // Safety priority
  if (priority === 'SAFETY' && region.invest?.safety >= 8) score += 5;
  // Investment priority
  if (priority === 'INVESTMENT' && region.invest?.growth >= 8) score += 5;

  // Clamp
  return Math.min(98, Math.max(40, score));
}

export default function IdealRegionsReport() {
  const [lang, setLang] = useState('ru');
  const [fitData, setFitData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('planb_fit_score');
      if (saved) {
        try { setFitData(JSON.parse(saved)); } catch { setFitData(null); }
      }
      // Detect language from saved data
      const parsed = saved ? JSON.parse(saved) : null;
      if (parsed?.lang) setLang(parsed.lang);
    }
    setLoading(false);
  }, []);

  const L = t[lang] || t.ru;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-3">🏖️</div>
          <p className="text-sm text-gray-500">Loading your report...</p>
        </div>
      </div>
    );
  }

  if (!fitData) {
    return (
      <div className="min-h-screen bg-[#FAF8F5]">
        <div className="bg-gradient-to-r from-[#009739] via-[#1B2951] to-[#D4AF37] text-white py-3 text-center">
          <div className="font-heading text-sm tracking-[0.2em] text-[#E8C84A]">✦ PLAN B ✦</div>
          <h1 className="font-heading text-xl mt-1">Ideal <span className="text-[#E8C84A]">Regions Report</span>™</h1>
        </div>
        <div className="max-w-md mx-auto px-4 py-12 text-center">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="text-4xl mb-4">🔒</div>
            <h2 className="font-heading text-xl text-[#1B2951] mb-3">{L.noDataTitle}</h2>
            <p className="text-sm text-gray-500 mb-6">{L.noDataText}</p>
            <a href="/brazil-fit-score" className="inline-block bg-gradient-to-r from-[#1B2951] to-[#111D3A] text-[#D4AF37] px-6 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity">
              {L.bfsBtn} →
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Score and sort regions
  const scored = regions
    .map((r) => ({ ...r, matchScore: scoreRegion(r, fitData.answers) }))
    .sort((a, b) => b.matchScore - a.matchScore);

  const top3 = scored.slice(0, 3);
  const rest = scored.slice(3);
  const overall = top3.length ? Math.round(top3.reduce((sum, r) => sum + r.matchScore, 0) / top3.length) : 0;
  const circumference = 2 * Math.PI * 35;
  const offset = circumference * (1 - overall / 100);

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#009739] via-[#1B2951] to-[#D4AF37] text-white py-3 text-center">
        <div className="font-heading text-xs tracking-[0.2em] text-[#E8C84A]">✦ PLAN B ✦</div>
        <h1 className="font-heading text-lg mt-1">Ideal <span className="text-[#E8C84A]">Regions Report</span>™</h1>
        <p className="text-[10px] text-white/50 mt-0.5">Personalized location analysis · Santa Catarina</p>
        <div className="flex gap-1 justify-center mt-1.5">
          <button onClick={() => setLang('ru')} className={`px-2 py-0.5 text-[9px] rounded font-semibold ${lang === 'ru' ? 'bg-white/15 text-white border border-[#D4AF37]' : 'text-white/50 border border-white/20'}`}>RU</button>
          <button onClick={() => setLang('en')} className={`px-2 py-0.5 text-[9px] rounded font-semibold ${lang === 'en' ? 'bg-white/15 text-white border border-[#D4AF37]' : 'text-white/50 border border-white/20'}`}>EN</button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-3 py-4">
        {/* Overall Score */}
        <div className="bg-white rounded-xl overflow-hidden shadow-md mb-3">
          <div className="h-20 bg-gradient-to-r from-[#009739] via-[#1B2951] to-[#D4AF37] flex items-center justify-center text-3xl">🏖️</div>
          <div className="text-center p-4 border-b border-[#f0ede4]">
            <div className="w-[76px] h-[76px] mx-auto mb-2 relative">
              <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                <circle cx="40" cy="40" r="35" fill="none" stroke="#eee" strokeWidth="6" />
                <circle cx="40" cy="40" r="35" fill="none" stroke={overall >= 80 ? '#009739' : overall >= 65 ? '#D4AF37' : '#e8a317'} strokeWidth="6" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-heading text-xl font-bold text-[#1B2951] leading-none">{overall}</span>
                <span className="text-[8px] text-gray-400">%</span>
              </div>
            </div>
            <div className="text-[9px] text-gray-400 uppercase tracking-wider">{L.overallLabel}</div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mb-3">
          <h3 className="font-heading text-sm text-[#1B2951] px-2 mb-1">📊 {L.compTitle}</h3>
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#f0ede4]">
                  <th className="text-left px-3 py-2 text-[8px] text-gray-400 uppercase font-semibold tracking-wider"></th>
                  <th className="px-2 py-2 text-[8px] text-gray-400 uppercase font-semibold tracking-wider">{L.compLifestyle}</th>
                  <th className="px-2 py-2 text-[8px] text-gray-400 uppercase font-semibold tracking-wider">{L.compInvest}</th>
                  <th className="px-2 py-2 text-[8px] text-gray-400 uppercase font-semibold tracking-wider">{L.compFamily}</th>
                  <th className="px-2 py-2 text-[8px] text-gray-400 uppercase font-semibold tracking-wider">{L.compRental}</th>
                  <th className="px-2 py-2 text-[8px] text-gray-400 uppercase font-semibold tracking-wider">{L.compSafety}</th>
                </tr>
              </thead>
              <tbody>
                {top3.map((r, i) => {
                  const name = lang === 'ru' ? r.nameRu : r.nameEn;
                  return (
                    <tr key={r.id} className="border-b border-[#f5f3ee] last:border-0">
                      <td className="px-3 py-2 font-heading text-[11px] font-semibold text-[#1B2951]">{i === 0 ? '🥇 ' : i === 1 ? '🥈 ' : '🥉 '}{name}</td>
                      <td className={`px-2 py-2 text-center ${r.comp.lifestyle >= 8 ? 'text-[#2a9d5c] font-semibold' : 'text-gray-400'}`}>{r.comp.lifestyle}</td>
                      <td className={`px-2 py-2 text-center ${r.comp.investment >= 8 ? 'text-[#2a9d5c] font-semibold' : 'text-gray-400'}`}>{r.comp.investment}</td>
                      <td className={`px-2 py-2 text-center ${r.comp.family >= 8 ? 'text-[#2a9d5c] font-semibold' : 'text-gray-400'}`}>{r.comp.family}</td>
                      <td className={`px-2 py-2 text-center ${r.comp.rental >= 8 ? 'text-[#2a9d5c] font-semibold' : 'text-gray-400'}`}>{r.comp.rental}</td>
                      <td className={`px-2 py-2 text-center ${r.comp.safety >= 8 ? 'text-[#2a9d5c] font-semibold' : 'text-gray-400'}`}>{r.comp.safety}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Regions */}
        {top3.map((r, i) => {
          const name = lang === 'ru' ? r.nameRu : r.nameEn;
          const desc = lang === 'ru' ? r.descRu : r.descEn;
          const why = lang === 'ru' ? r.whyRu : r.whyEn;
          const bestFor = lang === 'ru' ? r.bestForRu : r.bestForEn;
          const props = lang === 'ru' ? r.propsRu : r.propsEn;
          const insight = lang === 'ru' ? r.insightRu : r.insightEn;
          const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉';

          return (
            <div key={r.id} className="bg-white rounded-xl overflow-hidden shadow-md mb-3">
              {/* Image placeholder */}
              <div className="h-36 bg-gradient-to-br from-[#1B2951] to-[#111D3A] relative overflow-hidden">
                <img src={r.img} alt={name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B2951]/90 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 px-4 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{medal}</span>
                    <span className="font-heading text-base font-bold text-white">{name}</span>
                  </div>
                  <span className="font-heading text-lg font-bold text-[#E8C84A]">{r.matchScore}%</span>
                </div>
              </div>

              <div className="p-4">
                <p className="text-[10px] text-gray-400 mb-3">{desc}</p>

                {/* Why Match */}
                <div className="mb-3">
                  <div className="text-[9px] font-bold text-[#1B2951] uppercase tracking-wider mb-1">{L.whyMatch}</div>
                  {why.map((w: string, wi: number) => (
                    <div key={wi} className="text-[10px] text-[#1B2951] py-0.5 before:content-['✓'] before:text-[#2a9d5c] before:font-bold before:mr-1.5">{w}</div>
                  ))}
                </div>

                {/* Investment Snapshot */}
                <div className="mb-3">
                  <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1">{L.investSnapshot}</div>
                  {[
                    { label: L.growth, val: r.invest.growth },
                    { label: L.rental, val: r.invest.rental },
                    { label: L.safety, val: r.invest.safety },
                    { label: L.liquidity, val: r.invest.liquidity },
                    { label: L.infra, val: r.invest.infra },
                  ].map((m) => {
                    const barColor = m.val >= 8 ? 'bg-[#2a9d5c]' : m.val >= 7 ? 'bg-[#D4AF37]' : 'bg-[#e8a317]';
                    return (
                      <div key={m.label} className="mb-1">
                        <div className="flex justify-between text-[9px] text-gray-400 mb-0.5">
                          <span>{m.label}</span>
                          <strong className="text-[#1B2951] font-semibold">{m.val} / 10</strong>
                        </div>
                        <div className="h-[3px] bg-gray-200 rounded overflow-hidden">
                          <div className={`h-full rounded ${barColor}`} style={{ width: `${m.val * 10}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Budget */}
                <div className="bg-gradient-to-r from-[#1B2951]/5 to-[#D4AF37]/5 border border-[#D4AF37]/10 rounded-lg p-2 text-center mb-3">
                  <div className="text-[8px] text-gray-400 uppercase tracking-wider">{L.budget}</div>
                  <div className="font-heading text-sm font-bold text-[#1B2951]">{r.budgetUSD}</div>
                  <div className="text-[8px] text-gray-400">{r.budgetBRL}</div>
                </div>

                {/* Best For */}
                <div className="mb-3">
                  <div className="text-[9px] font-bold text-[#1B2951] uppercase tracking-wider mb-1">{L.bestFor}</div>
                  <div className="flex flex-wrap gap-1">
                    {bestFor.map((b: string, bi: number) => (
                      <span key={bi} className="text-[8px] px-2 py-0.5 rounded bg-[#009739]/5 text-gray-600 font-medium">✓ {b}</span>
                    ))}
                  </div>
                </div>

                {/* Opportunities */}
                <div className="mb-3">
                  <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1">{L.opportunities}</div>
                  {props.map((p: string, pi: number) => (
                    <div key={pi} className="text-[10px] text-gray-500 py-0.5 border-b border-[#f5f3ee] last:border-0 before:content-['◆'] before:text-[#D4AF37] before:text-[7px] before:mr-1">{p}</div>
                  ))}
                </div>

                {/* View Properties Button */}
                <a href="https://planbbrazil.com" target="_blank" rel="noopener noreferrer" className="block text-center bg-[#1B2951] text-[#E8C84A] py-2 rounded-lg text-[10px] font-semibold hover:opacity-90 transition-opacity">
                  {L.viewProps} {name} →
                </a>

                {/* Insight */}
                <div className="mt-3 p-3 bg-[#1B2951]/3 border-l-2 border-[#D4AF37] rounded-r-lg">
                  <div className="text-[8px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">{L.insight}</div>
                  <div className="text-[10px] text-gray-500 italic">{insight}</div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Additional Regions Teaser */}
        {rest.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-4 mb-3">
            <div className="font-heading text-sm text-[#1B2951] mb-1">{L.consultTitle}</div>
            <p className="text-[9px] text-gray-400 mb-3">{L.consultText}</p>
            <div className="space-y-1">
              {rest.slice(0, 7).map((r) => {
                const name = lang === 'ru' ? r.nameRu : r.nameEn;
                return (
                  <div key={r.id} className="flex items-center justify-between px-3 py-1.5 bg-[#fafaf8] rounded text-[11px]">
                    <span className="font-medium text-gray-500">{name}</span>
                    <span className="font-heading font-bold text-[#D4AF37]">{r.matchScore}%</span>
                  </div>
                );
              })}
              {rest.length > 7 && (
                <div className="flex items-center justify-between px-3 py-1.5 bg-[#fafaf8] rounded text-[11px]">
                  <span className="font-medium text-gray-500">+{rest.length - 7} more regions</span>
                  <span className="text-gray-400">…</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="bg-[#1B2951] p-4 rounded-xl text-center mb-3">
          <h3 className="font-heading text-sm text-[#E8C84A] mb-1">{L.nextTitle}</h3>
          <p className="text-[9px] text-white/40 mb-3 max-w-sm mx-auto">{L.nextText}</p>
          <a href="https://planbbrazil.com" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#D4AF37] text-[#1B2951] px-5 py-2 rounded-lg text-[11px] font-bold mr-1 hover:opacity-90 transition-opacity">
            {L.btnBrowse}
          </a>
          <a href="https://planbbrazil.com/calculator.html" target="_blank" rel="noopener noreferrer" className="inline-block bg-transparent text-[#E8C84A] border border-[#D4AF37]/30 px-4 py-2 rounded-lg text-[10px] font-medium hover:bg-[#D4AF37]/10 transition-colors">
            {L.btnCalc}
          </a>
        </div>

        {/* Premium Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-3">
          <div className="font-heading text-sm text-[#1B2951] text-center mb-1">{L.premTitle}</div>
          <p className="text-[9px] text-gray-400 text-center mb-3 max-w-sm mx-auto">{L.premText}</p>
          <div className="grid grid-cols-2 gap-1 mb-3">
            {L.premFeats.map((f: string, i: number) => (
              <div key={i} className="text-[9px] text-gray-500 px-2 py-1 bg-[#fafaf8] rounded">
                <span className="text-[#D4AF37] font-bold mr-1">—</span>{f}
              </div>
            ))}
          </div>
          <a href="https://wa.me/5548988117424" target="_blank" rel="noopener noreferrer" className="block text-center bg-[#1B2951] text-[#E8C84A] border border-[#D4AF37]/20 py-2.5 rounded-lg text-[11px] font-semibold hover:opacity-90 transition-opacity">
            {L.premBtn}
          </a>
        </div>

        {/* Disclaimer */}
        <div className="text-center text-[7px] text-gray-300 py-2">{L.disclaimer}</div>
      </div>
    </div>
  );
}
