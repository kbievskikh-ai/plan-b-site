'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// ─── Translations ───
const t: Record<string, Record<string, any>> = {
  ru: {
    header: 'Brazil Fit Score™',
    sub: 'Персональная оценка · 2 минуты',
    next: 'Далее →',
    back: '← Назад',
    result: 'Узнать мой Brazil Fit Score™ 🇧🇷',
    question: 'Вопрос',
    of: 'из',
    scoreExplain: 'Ваш профиль совпадает на {score}% с ключевыми факторами лайфстайла, инвестиций и релокации, типичными для успешных долгосрочных экспатов в Бразилии.',
    scoreNote: 'Оценка рассчитана на основе взвешенных предпочтений: лайфстайл, инвестиции, семья, климат и цели релокации.',
    challenges: 'ВОЗМОЖНЫЕ СЛОЖНОСТИ',
    regions: 'ПРЕДВАРИТЕЛЬНЫЕ РЕГИОНЫ',
    regionNote: 'Предварительные рекомендации. Полный отчёт — на следующей странице.',
    unlockTitle: 'Хотите понять, какой район действительно вам подходит?',
    unlockText: 'Наша детальная оценка района включает:',
    unlockFeatures: ['Динамика рынка', 'Lifestyle-совместимость', 'Инфраструктура', 'Инвестиционный потенциал', 'Спрос на аренду', 'Перспективы развития'],
    unlockBtn: 'Найти мой идеальный регион',
    roadmapTitle: 'Ваша дорожная карта Plan B',
    roadmapSteps: [
      { name: 'Brazil Fit Score™', desc: 'Завершено', cls: 'd' as const },
      { name: 'Find Your Ideal Region', desc: 'Найдите регион', cls: 'n' as const },
      { name: 'Neighborhood Assessment', desc: 'Оценка района', cls: 'f' as const },
      { name: 'Investment Calculator', desc: 'Рассчитайте ROI', cls: 'f' as const },
      { name: 'Property Selection', desc: 'Подбор вариантов', cls: 'f' as const },
      { name: 'Consultation', desc: 'Персональная стратегия', cls: 'f' as const },
    ],
    finalText: 'Каждая успешная инвестиция начинается с выбора правильной локации.',
    finalPrimary: 'Посмотреть мой Ideal Regions Report™',
    finalSecondary: 'Записаться на консультацию',
    ctaSite: 'Получить консультацию на planbbrazil.com →',
    disclaimer: 'Brazil Fit Score™ — общая оценка, не финансовая консультация. Plan B — платформа инвестиционной аналитики, а не агентство недвижимости.',
    exceptional: 'Исключительное совпадение',
    strong: 'Сильное совпадение',
    good: 'Хорошее совпадение',
    moderate: 'Умеренное совпадение',
    low: 'Стоит изучить глубже',
    compatibility: 'Compatibility Analysis',
    climateLabel: 'Климат', climateDesc: 'Тропический / субтропический',
    coastalLabel: 'Прибрежный лайфстайл', coastalDesc: 'Пляжи, океан, морская культура',
    investLabel: 'Инвестиции', investDesc: 'Рост рынка недвижимости и ROI',
    familyLabel: 'Семья', familyDesc: 'Безопасность, школы, комьюнити',
    expatLabel: 'Экспаты', expatDesc: 'Международное комьюнити',
  },
  en: {
    header: 'Brazil Fit Score™',
    sub: 'Personalized assessment · 2 minutes',
    next: 'Next →',
    back: '← Back',
    result: 'Get My Brazil Fit Score™ 🇧🇷',
    question: 'Question',
    of: 'of',
    scoreExplain: 'Your profile matches {score}% of the key lifestyle, investment, climate, and relocation factors typically associated with successful long-term expatriates and property owners in Brazil.',
    scoreNote: 'Score calculated using weighted lifestyle, investment, family, climate and relocation preferences.',
    challenges: 'POTENTIAL CHALLENGES',
    regions: 'SUGGESTED REGIONS',
    regionNote: 'Preliminary recommendations. Full report on the next page.',
    unlockTitle: 'Want to understand which region is truly right for you?',
    unlockText: 'Our detailed neighborhood assessment includes:',
    unlockFeatures: ['Market dynamics', 'Lifestyle fit', 'Infrastructure', 'Investment potential', 'Rental demand', 'Future development'],
    unlockBtn: 'Find My Ideal Region',
    roadmapTitle: 'Your Plan B Roadmap',
    roadmapSteps: [
      { name: 'Brazil Fit Score™', desc: 'Completed', cls: 'd' as const },
      { name: 'Find Your Ideal Region', desc: 'Find your region', cls: 'n' as const },
      { name: 'Neighborhood Assessment', desc: 'Neighborhood analysis', cls: 'f' as const },
      { name: 'Investment Calculator', desc: 'Calculate ROI', cls: 'f' as const },
      { name: 'Property Selection', desc: 'Curated properties', cls: 'f' as const },
      { name: 'Consultation', desc: 'Personalized strategy', cls: 'f' as const },
    ],
    finalText: 'Every successful investment starts with choosing the right location.',
    finalPrimary: 'View My Ideal Regions Report™',
    finalSecondary: 'Get My Personal Plan B Assessment',
    ctaSite: 'Get free consultation at planbbrazil.com →',
    disclaimer: 'Brazil Fit Score™ is a general assessment, not financial advice. Plan B is an investment intelligence platform, not a real estate agency.',
    exceptional: 'Exceptional Match',
    strong: 'Strong Match',
    good: 'Good Match',
    moderate: 'Moderate Match',
    low: 'Worth Exploring',
    compatibility: 'Compatibility Analysis',
    climateLabel: 'Climate', climateDesc: 'Tropical / subtropical',
    coastalLabel: 'Coastal Lifestyle', coastalDesc: 'Beaches, ocean, coastal culture',
    investLabel: 'Investment', investDesc: 'RE market growth & ROI',
    familyLabel: 'Family', familyDesc: 'Safety, schools, community',
    expatLabel: 'Expat Community', expatDesc: 'International community',
  },
};

// ─── Emojis ───
const E = {
  single: '🧑', couple: '👫', family: '👨‍👩‍👦', familyBig: '👨‍👩‍👧‍👦', retired: '🌅',
  budget1: '💵', budget2: '💰', budget3: '💎', budget4: '👑', budget5: '🏦',
  remote: '💻', business: '🏢', retired2: '🏖️', investor: '📈', relocate: '🔄',
  beach: '🏖️', nature: '🌿', city: '🏙️', safety: '🛡️', cost: '🏷️', luxury: '✨',
  surf: '🏄', food: '🥗', party: '🎉', wellness: '🧘', investGrowth: '📈', citizenship: '🛂',
  tropical: '🌴', subtropical: '🌊', mediterranean: '☀️', temperate: '🍂', any: '🌈',
  relocate2: '🏠', vacation: '🏡', birth: '👶',
  lifestyle: '🌴', investP: '📈', familyP: '👨‍👩‍👦', freedom: '🕊️', health: '🏥', community: '👥',
  archInvestor: '📈', archFamily: '👨‍👩‍👦', archEntre: '🕊️', archRetiree: '🌅', archLifestyle: '✨', archCitizenship: '🛂',
};

// ─── Questions ───
const questions: Record<string, Array<any>> = {
  ru: [
    { id: 'budget', title: 'Бюджет на недвижимость?', hint: 'Для покупки', type: 'single' as const, options: [
      { value: 'LOW', icon: E.budget1, label: 'До $100K', desc: 'Стартовый' },
      { value: 'MEDIUM', icon: E.budget2, label: '$100K — $250K', desc: 'Комфортный' },
      { value: 'HIGH', icon: E.budget3, label: '$250K — $500K', desc: 'Премиальный' },
      { value: 'PREMIUM', icon: E.budget4, label: '$500K — $1M', desc: 'VIP' },
      { value: 'ULTRA', icon: E.budget5, label: 'Более $1M', desc: 'Без ограничений' },
    ]},
    { id: 'family', title: 'Состав семьи?', hint: '', type: 'single' as const, options: [
      { value: 'SINGLE', icon: E.single, label: 'Один/Одна' },
      { value: 'COUPLE', icon: E.couple, label: 'Пара без детей' },
      { value: 'FAMILY_SMALL', icon: E.family, label: 'С детьми (1-2)' },
      { value: 'FAMILY_BIG', icon: E.familyBig, label: 'Большая семья (3+)' },
      { value: 'RETIRED', icon: E.retired, label: 'Пенсионеры' },
    ]},
    { id: 'occupation', title: 'Чем занимаетесь?', hint: '', type: 'single' as const, options: [
      { value: 'REMOTE', icon: E.remote, label: 'Удалёнка / Digital Nomad', desc: 'Работаю онлайн' },
      { value: 'BUSINESS', icon: E.business, label: 'Предприниматель', desc: 'Свой бизнес' },
      { value: 'RETIRED_LIVE', icon: E.retired2, label: 'На пенсии', desc: 'Пассивный доход' },
      { value: 'INVESTOR', icon: E.investor, label: 'Инвестор', desc: 'Покупаю для дохода' },
      { value: 'RELOCATE', icon: E.relocate, label: 'Полный переезд', desc: 'Ищу работу на месте' },
    ]},
    { id: 'lifestyle', title: 'Что для вас важно?', hint: 'Выбери до 3', type: 'multi' as const, max: 3, options: [
      { value: 'BEACH', icon: E.beach, label: 'Пляжи и океан' },
      { value: 'NATURE', icon: E.nature, label: 'Природа и экология' },
      { value: 'CITY', icon: E.city, label: 'Городская жизнь' },
      { value: 'SAFETY', icon: E.safety, label: 'Безопасность' },
      { value: 'COST', icon: E.cost, label: 'Низкая стоимость жизни' },
      { value: 'LUXURY', icon: E.luxury, label: 'Люкс и премиум' },
      { value: 'SURF', icon: E.surf, label: 'Сёрфинг и спорт' },
      { value: 'FOOD', icon: E.food, label: 'Рестораны и фуди' },
      { value: 'PARTY', icon: E.party, label: 'Тусовки' },
      { value: 'WELLNESS', icon: E.wellness, label: 'Йога и велнес' },
      { value: 'INVEST_GROWTH', icon: E.investGrowth, label: 'Рост инвестиций' },
      { value: 'CITIZENSHIP', icon: E.citizenship, label: 'Путь к гражданству' },
    ]},
    { id: 'climate_pref', title: 'Предпочитаемый климат?', hint: '', type: 'single' as const, options: [
      { value: 'TROPICAL', icon: E.tropical, label: 'Тропический', desc: 'Жарко круглый год' },
      { value: 'SUBTROPICAL', icon: E.subtropical, label: 'Субтропический', desc: 'Тёплое лето, мягкая зима' },
      { value: 'MEDITERRANEAN', icon: E.mediterranean, label: 'Средиземноморский', desc: 'Жаркое лето, прохладная зима' },
      { value: 'TEMPERATE', icon: E.temperate, label: 'Умеренный', desc: '4 сезона' },
      { value: 'ANY', icon: E.any, label: 'Без разницы' },
    ]},
    { id: 'goal', title: 'Главная цель?', hint: '', type: 'single' as const, options: [
      { value: 'RELOCATE', icon: E.relocate2, label: 'Переехать навсегда' },
      { value: 'INVEST', icon: E.investor, label: 'Инвестиция / пассивный доход' },
      { value: 'RETIRE', icon: E.retired, label: 'Пенсия у моря' },
      { value: 'VACATION', icon: E.vacation, label: 'Дача / второй дом' },
      { value: 'CITIZENSHIP', icon: E.citizenship, label: 'Второе гражданство' },
      { value: 'BIRTH', icon: E.birth, label: 'Роды + гражданство ребёнку' },
    ]},
    { id: 'priority', title: 'Что важнее всего?', hint: '', type: 'single' as const, options: [
      { value: 'LIFESTYLE', icon: E.lifestyle, label: 'Качество жизни' },
      { value: 'INVESTMENT', icon: E.investP, label: 'Финансовый рост' },
      { value: 'FAMILY', icon: E.familyP, label: 'Будущее детей' },
      { value: 'FREEDOM', icon: E.freedom, label: 'Свобода и Plan B' },
      { value: 'HEALTH', icon: E.health, label: 'Медицина и здоровье' },
      { value: 'COMMUNITY', icon: E.community, label: 'Комьюнити экспатов' },
    ]},
  ],
  en: [
    { id: 'budget', title: 'Real estate budget?', hint: 'For purchase', type: 'single' as const, options: [
      { value: 'LOW', icon: E.budget1, label: 'Under $100K', desc: 'Starter' },
      { value: 'MEDIUM', icon: E.budget2, label: '$100K — $250K', desc: 'Comfortable' },
      { value: 'HIGH', icon: E.budget3, label: '$250K — $500K', desc: 'Premium' },
      { value: 'PREMIUM', icon: E.budget4, label: '$500K — $1M', desc: 'VIP' },
      { value: 'ULTRA', icon: E.budget5, label: 'Over $1M', desc: 'Unlimited' },
    ]},
    { id: 'family', title: 'Family status?', hint: '', type: 'single' as const, options: [
      { value: 'SINGLE', icon: E.single, label: 'Single' },
      { value: 'COUPLE', icon: E.couple, label: 'Couple, no kids' },
      { value: 'FAMILY_SMALL', icon: E.family, label: 'Family (1-2 kids)' },
      { value: 'FAMILY_BIG', icon: E.familyBig, label: 'Large family (3+)' },
      { value: 'RETIRED', icon: E.retired, label: 'Retired' },
    ]},
    { id: 'occupation', title: 'What do you do?', hint: '', type: 'single' as const, options: [
      { value: 'REMOTE', icon: E.remote, label: 'Remote / Digital Nomad', desc: 'Working online' },
      { value: 'BUSINESS', icon: E.business, label: 'Entrepreneur', desc: 'Own business' },
      { value: 'RETIRED_LIVE', icon: E.retired2, label: 'Retired', desc: 'Passive income' },
      { value: 'INVESTOR', icon: E.investor, label: 'Investor', desc: 'Buying for rental' },
      { value: 'RELOCATE', icon: E.relocate, label: 'Full relocation', desc: 'Looking for local work' },
    ]},
    { id: 'lifestyle', title: 'What matters to you?', hint: 'Choose up to 3', type: 'multi' as const, max: 3, options: [
      { value: 'BEACH', icon: E.beach, label: 'Beaches & ocean' },
      { value: 'NATURE', icon: E.nature, label: 'Nature & ecology' },
      { value: 'CITY', icon: E.city, label: 'City life' },
      { value: 'SAFETY', icon: E.safety, label: 'Safety' },
      { value: 'COST', icon: E.cost, label: 'Low cost of living' },
      { value: 'LUXURY', icon: E.luxury, label: 'Luxury & premium' },
      { value: 'SURF', icon: E.surf, label: 'Surfing & sports' },
      { value: 'FOOD', icon: E.food, label: 'Restaurants & foodie' },
      { value: 'PARTY', icon: E.party, label: 'Nightlife' },
      { value: 'WELLNESS', icon: E.wellness, label: 'Yoga & wellness' },
      { value: 'INVEST_GROWTH', icon: E.investGrowth, label: 'Investment growth' },
      { value: 'CITIZENSHIP', icon: E.citizenship, label: 'Path to citizenship' },
    ]},
    { id: 'climate_pref', title: 'Preferred climate?', hint: '', type: 'single' as const, options: [
      { value: 'TROPICAL', icon: E.tropical, label: 'Tropical', desc: 'Hot year-round' },
      { value: 'SUBTROPICAL', icon: E.subtropical, label: 'Subtropical', desc: 'Warm summer, mild winter' },
      { value: 'MEDITERRANEAN', icon: E.mediterranean, label: 'Mediterranean', desc: 'Hot summer, cool winter' },
      { value: 'TEMPERATE', icon: E.temperate, label: 'Temperate', desc: '4 seasons' },
      { value: 'ANY', icon: E.any, label: 'No preference' },
    ]},
    { id: 'goal', title: 'Main goal?', hint: '', type: 'single' as const, options: [
      { value: 'RELOCATE', icon: E.relocate2, label: 'Relocate permanently' },
      { value: 'INVEST', icon: E.investor, label: 'Investment / passive income' },
      { value: 'RETIRE', icon: E.retired, label: 'Retirement by the sea' },
      { value: 'VACATION', icon: E.vacation, label: 'Vacation home' },
      { value: 'CITIZENSHIP', icon: E.citizenship, label: 'Second citizenship' },
      { value: 'BIRTH', icon: E.birth, label: 'Birth + baby citizenship' },
    ]},
    { id: 'priority', title: 'What matters most?', hint: '', type: 'single' as const, options: [
      { value: 'LIFESTYLE', icon: E.lifestyle, label: 'Quality of life' },
      { value: 'INVESTMENT', icon: E.investP, label: 'Financial growth' },
      { value: 'FAMILY', icon: E.familyP, label: "Children's future" },
      { value: 'FREEDOM', icon: E.freedom, label: 'Freedom & Plan B' },
      { value: 'HEALTH', icon: E.health, label: 'Health & medicine' },
      { value: 'COMMUNITY', icon: E.community, label: 'Expat community' },
    ]},
  ],
};

// ─── Scoring weights ───
const brazil = {
  budget: { LOW: 8, MEDIUM: 10, HIGH: 8, PREMIUM: 6, ULTRA: 5 },
  family: { SINGLE: 9, COUPLE: 9, FAMILY_SMALL: 8, FAMILY_BIG: 7, RETIRED: 8 },
  occupation: { REMOTE: 10, BUSINESS: 7, RETIRED_LIVE: 9, INVESTOR: 9, RELOCATE: 6 },
  lifestyle: { BEACH: 10, NATURE: 10, CITY: 6, SAFETY: 6, COST: 9, LUXURY: 7, SURF: 10, FOOD: 8, PARTY: 7, WELLNESS: 7, INVEST_GROWTH: 8, CITIZENSHIP: 9 },
  climate: { TROPICAL: 9, SUBTROPICAL: 10, MEDITERRANEAN: 7, TEMPERATE: 4, ANY: 8 },
  goal: { RELOCATE: 8, INVEST: 9, RETIRE: 9, VACATION: 7, CITIZENSHIP: 9, BIRTH: 10 },
  priority: { LIFESTYLE: 10, INVESTMENT: 8, FAMILY: 8, FREEDOM: 10, HEALTH: 7, COMMUNITY: 6 },
};

// ─── Archetypes ───
const archetypes: Record<string, { emoji: string; name: Record<string, string>; desc: Record<string, string>; why: Record<string, string> }> = {
  investor: {
    emoji: E.archInvestor,
    name: { ru: 'Инвестор-Исследователь', en: 'Investor Explorer' },
    desc: { ru: 'Вы ищете рост капитала при улучшении качества жизни.', en: 'You seek capital growth while improving quality of life.' },
    why: { ru: 'Бразилия: рынок недвижимости растёт на 10-15%/год в Санта Катарине.', en: 'Brazil: RE market growing 10-15%/yr in Santa Catarina.' },
  },
  family: {
    emoji: E.archFamily,
    name: { ru: 'Глобальный Семьянин', en: 'Global Family Builder' },
    desc: { ru: 'Ваш фокус — безопасность семьи, образование и стабильность.', en: 'Your focus is family safety, education, and stability.' },
    why: { ru: 'Рождение в Бразилии = автоматическое гражданство, международные школы.', en: 'Birth in Brazil = automatic citizenship, international schools.' },
  },
  entrepreneur: {
    emoji: E.archEntre,
    name: { ru: 'Предприниматель свободы', en: 'Freedom-Oriented Entrepreneur' },
    desc: { ru: 'Вы цените гибкость, налоговую оптимизацию и lifestyle.', en: 'You value flexibility, tax optimization, and lifestyle.' },
    why: { ru: 'Digital nomad visa, растущее tech-комьюнити, путь к резидентству.', en: 'Digital nomad visa, growing tech community, path to residency.' },
  },
  retiree: {
    emoji: E.archRetiree,
    name: { ru: 'Планировщик пенсии', en: 'Coastal Retirement Planner' },
    desc: { ru: 'Вы ищете качество жизни, климат и комфорт.', en: 'You seek quality of life, climate, and comfort.' },
    why: { ru: 'Умеренный климат, доступная медицина, безопасные города.', en: 'Mild climate, affordable healthcare, safe cities.' },
  },
  lifestyle_investor: {
    emoji: E.archLifestyle,
    name: { ru: 'Lifestyle-Инвестор', en: 'International Lifestyle Investor' },
    desc: { ru: 'Вы сочетаете инвестиции с lifestyle-преимуществами.', en: 'You combine investment goals with lifestyle benefits.' },
    why: { ru: 'Рост недвижимости + пляжи + культура + экспат-комьюнити.', en: 'RE growth + beaches + culture + expat community.' },
  },
  citizenship: {
    emoji: E.archCitizenship,
    name: { ru: 'Стратег гражданства', en: 'Citizenship Strategist' },
    desc: { ru: 'Ваш приоритет — второй паспорт и свобода.', en: 'Your priority is a second passport and freedom.' },
    why: { ru: 'Jus soli — гражданство при рождении, безвиз в 170+ стран.', en: 'Jus soli — citizenship by birth, visa-free to 170+ countries.' },
  },
};

export default function BrazilFitScore() {
  const router = useRouter();
  const [lang, setLang] = useState('ru');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [showResults, setShowResults] = useState(false);

  const L = t[lang] || t.ru;
  const qs = questions[lang] || questions.ru;
  const q = qs[currentQ];
  const progress = ((currentQ + 1) / qs.length) * 100;
  const isLast = currentQ === qs.length - 1;

  const isOptionSelected = (value: string) => {
    if (q.type === 'multi') {
      return (answers[q.id] as string[] || []).includes(value);
    }
    return answers[q.id] === value;
  };

  const handleOptionClick = (value: string) => {
    if (q.type === 'multi') {
      const current = (answers[q.id] as string[]) || [];
      const idx = current.indexOf(value);
      if (idx > -1) {
        setAnswers({ ...answers, [q.id]: current.filter((v: string) => v !== value) });
      } else if (current.length < q.max) {
        setAnswers({ ...answers, [q.id]: [...current, value] });
      }
    } else {
      setAnswers({ ...answers, [q.id]: value });
    }
  };

  const isNextDisabled = () => {
    if (q.type === 'multi') {
      return !answers[q.id] || (answers[q.id] as string[]).length === 0;
    }
    return !answers[q.id];
  };

  const handleNext = () => {
    if (isLast) {
      showResultsFn();
    } else {
      setCurrentQ(currentQ + 1);
    }
  };

  const handleBack = () => {
    if (currentQ > 0) setCurrentQ(currentQ - 1);
  };

  const calcScore = () => {
    let total = 0, max = 0;
    total += (brazil.budget as any)[answers.budget] || 5; max += 10;
    total += (brazil.family as any)[answers.family] || 5; max += 10;
    total += (brazil.occupation as any)[answers.occupation] || 5; max += 10;
    if (answers.lifestyle && (answers.lifestyle as string[]).length) {
      let ls = 0;
      (answers.lifestyle as string[]).forEach((l: string) => { ls += (brazil.lifestyle as any)[l] || 5; });
      total += ls / (answers.lifestyle as string[]).length; max += 10;
    }
    total += (brazil.climate as any)[answers.climate_pref] || 5; max += 10;
    total += (brazil.goal as any)[answers.goal] || 5; max += 10;
    total += (brazil.priority as any)[answers.priority] || 5 * 1.2; max += 12;
    return Math.min(98, Math.round((total / max) * 100));
  };

  const getArchetype = () => {
    const g = answers.goal, o = answers.occupation, f = answers.family, p = answers.priority, ls = (answers.lifestyle as string[]) || [];
    if (g === 'BIRTH') return archetypes.citizenship;
    if (g === 'RETIRE' || o === 'RETIRED_LIVE' || f === 'RETIRED') return archetypes.retiree;
    if (g === 'INVEST' || o === 'INVESTOR') return archetypes.investor;
    if (g === 'CITIZENSHIP' || p === 'FREEDOM') return archetypes.citizenship;
    if (f === 'FAMILY_SMALL' || f === 'FAMILY_BIG' || p === 'FAMILY') return archetypes.family;
    if (o === 'REMOTE' || ls.includes('SURF') || ls.includes('WELLNESS')) return archetypes.entrepreneur;
    if (ls.includes('INVEST_GROWTH') && ls.includes('BEACH')) return archetypes.lifestyle_investor;
    if (p === 'INVESTMENT') return archetypes.investor;
    return archetypes.lifestyle_investor;
  };

  const getRegions = () => {
    const g = answers.goal, o = answers.occupation, f = answers.family, b = answers.budget, ls = (answers.lifestyle as string[]) || [];
    const L = lang === 'ru';
    const regions: any[] = [];
    if (b === 'PREMIUM' || b === 'ULTRA' || ls.includes('LUXURY')) {
      regions.push({ emoji: '🏖️', name: L ? 'Журере' : 'Jurerê', city: 'Florianópolis', match: 88 + Math.floor(Math.random() * 8), reasons: L ? ['Люкс-виллы', 'Рост 8-10%/год', 'Безопасность'] : ['Luxury villas', '8-10%/yr growth', 'Maximum safety'] });
    }
    if (o === 'REMOTE' || ls.includes('SURF')) {
      regions.push({ emoji: '🏄', name: L ? 'Кампеше' : 'Campeche', city: 'Florianópolis', match: 85 + Math.floor(Math.random() * 10), reasons: L ? ['Удалёнка', 'Сёрф-культура', 'Веган-кафе'] : ['Remote work', 'Surf culture', 'Vegan cafes'] });
    }
    if (g === 'INVEST' || o === 'INVESTOR' || b === 'HIGH') {
      regions.push({ emoji: '🏙️', name: L ? 'Бальнеариу' : 'Balneário Camboriú', city: 'Balneário Camboriú', match: 80 + Math.floor(Math.random() * 12), reasons: L ? ['Небоскрёбы', 'Рост 12-15%/год', 'Рынок аренды'] : ['Skyscrapers', '12-15%/yr growth', 'Rental market'] });
    }
    if (g === 'RETIRE' || f === 'RETIRED' || f === 'FAMILY_SMALL') {
      regions.push({ emoji: '👨‍👩‍👦', name: L ? 'Инглесес' : 'Ingleses', city: 'Florianópolis', match: 78 + Math.floor(Math.random() * 12), reasons: L ? ['Семейный пляж', 'Школы рядом', 'Спокойно'] : ['Family beach', 'Schools nearby', 'Quiet & safe'] });
    }
    if (g === 'VACATION' || ls.includes('NATURE')) {
      regions.push({ emoji: '🌿', name: L ? 'Бомбиньяс' : 'Bombinhas', city: 'Bombinhas', match: 75 + Math.floor(Math.random() * 15), reasons: L ? ['Эко-заповедник', 'Дайвинг', 'Тишина'] : ['Eco-reserve', 'Diving', 'Peace & nature'] });
    }
    if (regions.length < 2) {
      regions.push({ emoji: '🏝️', name: L ? 'Флорианополис' : 'Florianópolis', city: 'Magic Island', match: 70 + Math.floor(Math.random() * 20), reasons: L ? ['Универсальный', 'Tech-хаб', 'Рост недвижимости'] : ['Versatile', 'Tech hub', 'RE growth'] });
    }
    return regions.slice(0, 3);
  };

  const getChallenges = () => {
    const g = answers.goal, o = answers.occupation, f = answers.family;
    if (lang === 'ru') {
      if (g === 'INVEST' || o === 'INVESTOR') return ['Выбор региона', 'Due diligence застройщика', 'Валютное планирование', 'Стратегия аренды'];
      if (f === 'FAMILY_SMALL' || f === 'FAMILY_BIG') return ['Выбор школы', 'Район для детей', 'Медицинская страховка', 'Языковая адаптация'];
      if (g === 'RETIRE' || o === 'RETIRED_LIVE' || f === 'RETIRED') return ['Виза пенсионера', 'Медицинская страховка', 'Наследственное право', 'Долгосрочное жильё'];
      if (g === 'BIRTH') return ['Выбор клиники', 'Планирование сроков', 'Документы для гражданства', 'Послеродовое планирование'];
      return ['Португальский язык', 'Бюрократия', 'Налоговое планирование'];
    } else {
      if (g === 'INVEST' || o === 'INVESTOR') return ['Selecting the right region', 'Developer due diligence', 'Currency planning', 'Rental strategy'];
      if (f === 'FAMILY_SMALL' || f === 'FAMILY_BIG') return ['School selection', 'Family-friendly neighborhood', 'Healthcare planning', 'Language adaptation'];
      if (g === 'RETIRE' || o === 'RETIRED_LIVE' || f === 'RETIRED') return ['Retirement visa', 'Healthcare coverage', 'Estate planning', 'Long-term housing'];
      if (g === 'BIRTH') return ['Hospital selection', 'Stay duration planning', 'Citizenship documentation', 'Post-birth planning'];
      return ['Portuguese language', 'Bureaucracy', 'Tax planning'];
    }
  };

  const getProfileScores = () => {
    return [
      { key: 'climate', pct: (brazil.climate as any)[answers.climate_pref] * 10, labelKey: 'climateLabel', descKey: 'climateDesc' },
      { key: 'coastal', pct: answers.lifestyle && (answers.lifestyle as string[]).includes('BEACH') ? 95 : 65, labelKey: 'coastalLabel', descKey: 'coastalDesc' },
      { key: 'investment', pct: answers.goal === 'INVEST' || (brazil.goal as any)[answers.goal] >= 8 ? 88 : 60, labelKey: 'investLabel', descKey: 'investDesc' },
      { key: 'family', pct: answers.family === 'FAMILY_SMALL' ? 88 : answers.family === 'FAMILY_BIG' ? 82 : 65, labelKey: 'familyLabel', descKey: 'familyDesc' },
      { key: 'expat', pct: answers.occupation === 'REMOTE' ? 90 : 60, labelKey: 'expatLabel', descKey: 'expatDesc' },
    ];
  };

  const showResultsFn = () => {
    const score = calcScore();
    const archetype = getArchetype();
    const challenges = getChallenges();
    const regions = getRegions();
    const profileScores = getProfileScores();

    // Save to localStorage for Ideal Regions Report
    if (typeof window !== 'undefined') {
      localStorage.setItem('planb_fit_score_done', 'true');
      localStorage.setItem('planb_fit_score', JSON.stringify({
        score, archetype: archetype.name[lang], answers, lang, timestamp: Date.now(),
        regions: regions.map((r: any) => r.name),
      }));
    }

    setShowResults(true);
  };

  if (showResults) {
    const score = calcScore();
    const archetype = getArchetype();
    const challenges = getChallenges();
    const regions = getRegions();
    const profileScores = getProfileScores();

    let scoreColor = '#009739', label = L.exceptional, badgeClass = 'badge-exc';
    if (score < 50) { scoreColor = '#d44'; label = L.low; badgeClass = 'badge-low'; }
    else if (score < 65) { scoreColor = '#e8a317'; label = L.moderate; badgeClass = 'badge-mod'; }
    else if (score < 78) { scoreColor = '#D4AF37'; label = L.good; badgeClass = 'badge-good'; }
    else if (score < 88) { scoreColor = '#009739'; label = L.strong; badgeClass = 'badge-str'; }

    const circumference = 2 * Math.PI * 40;
    const offset = circumference * (1 - score / 100);
    const scoreExplain = L.scoreExplain.replace('{score}', String(score));

    return (
      <div className="min-h-screen bg-[#FAF8F5]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#009739] via-[#1B2951] to-[#D4AF37] text-white py-4 text-center">
          <div className="font-heading text-sm tracking-[0.25em] text-[#E8C84A]">✦ PLAN B ✦</div>
          <h1 className="font-heading text-2xl mt-1">Brazil <span className="text-[#E8C84A]">Fit Score</span>™</h1>
          <p className="text-xs text-white/60">{L.sub}</p>
          <div className="flex gap-1 justify-center mt-2">
            <button onClick={() => setLang('ru')} className={`px-3 py-0.5 text-[10px] rounded font-semibold ${lang === 'ru' ? 'bg-white/15 text-white border border-[#D4AF37]' : 'text-white/50 border border-white/20'}`}>RU</button>
            <button onClick={() => setLang('en')} className={`px-3 py-0.5 text-[10px] rounded font-semibold ${lang === 'en' ? 'bg-white/15 text-white border border-[#D4AF37]' : 'text-white/50 border border-white/20'}`}>EN</button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            {/* Hero */}
            <div className="h-24 bg-gradient-to-r from-[#009739] via-[#1B2951] to-[#D4AF37] flex items-center justify-center text-4xl">🏠</div>

            {/* Score */}
            <div className="p-6 text-center">
              <div className="w-20 h-20 mx-auto mb-3 relative">
                <svg viewBox="0 0 90 90" className="w-full h-full -rotate-90">
                  <circle cx="45" cy="45" r="40" fill="none" stroke="#eee" strokeWidth="6" />
                  <circle cx="45" cy="45" r="40" fill="none" stroke={scoreColor} strokeWidth="6" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-heading text-2xl font-bold text-[#1B2951]">{score}</span>
                  <span className="text-[9px] text-gray-400">/100</span>
                </div>
              </div>
              <span className={`inline-block px-3 py-0.5 rounded-full text-[10px] font-bold ${badgeClass === 'badge-exc' ? 'bg-[#009739]/10 text-[#009739]' : badgeClass === 'badge-str' ? 'bg-[#009739]/8 text-[#009739]' : badgeClass === 'badge-good' ? 'bg-[#D4AF37]/12 text-[#b8862d]' : badgeClass === 'badge-mod' ? 'bg-[#e8a317]/10 text-[#b8862d]' : 'bg-[#d44]/10 text-[#d44]'}`}>{label}</span>
              <p className="text-[11px] text-gray-600 mt-2 max-w-md mx-auto">{scoreExplain}</p>
              <p className="text-[9px] text-gray-400 italic mt-1">{L.scoreNote}</p>
            </div>

            {/* Archetype */}
            <div className="px-5 py-3 bg-[#009739]/5 flex items-center gap-3">
              <span className="text-2xl">{archetype.emoji}</span>
              <div>
                <div className="font-heading text-sm font-bold text-[#1B2951]">{archetype.name[lang]}</div>
                <div className="text-[10px] text-gray-500">{archetype.desc[lang]}</div>
              </div>
            </div>

            {/* Compatibility */}
            <div className="px-5 pt-4">
              <h3 className="font-heading text-sm text-[#1B2951] mb-2">{L.compatibility}</h3>
            </div>
            <div className="px-5 pb-4 grid grid-cols-2 gap-2">
              {profileScores.map((pc) => (
                <div key={pc.key} className="bg-[#f9f9f7] rounded-lg p-2 flex items-center gap-2">
                  <span className="text-base">{pc.key === 'climate' ? '🌴' : pc.key === 'coastal' ? '🏖️' : pc.key === 'investment' ? '📈' : pc.key === 'family' ? '👨‍👩‍👦' : '🌍'}</span>
                  <div className="flex-1">
                    <div className="text-[8px] text-gray-400 uppercase">{(L as any)[pc.labelKey]}</div>
                    <div className="flex items-center gap-2">
                      <span className="font-heading text-sm font-bold text-[#1B2951]">{pc.pct}%</span>
                      <div className="flex-1 h-[3px] bg-gray-200 rounded overflow-hidden">
                        <div className={`h-full rounded ${pc.pct >= 80 ? 'bg-[#009739]' : pc.pct >= 60 ? 'bg-[#D4AF37]' : 'bg-[#e8a317]'}`} style={{ width: `${pc.pct}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Challenges */}
            <div className="px-5 pt-3">
              <h3 className="text-[9px] font-bold text-[#1B2951] uppercase tracking-wider">{L.challenges}</h3>
            </div>
            <div className="px-5 pb-3 flex flex-wrap gap-1">
              {challenges.map((ch, i) => (
                <span key={i} className="text-[9px] px-2 py-0.5 rounded bg-[#fff8f0] text-[#8a6d1b] border border-[#e8a317]/20">{ch}</span>
              ))}
            </div>

            {/* Regions */}
            <div className="px-5 pt-3">
              <h3 className="text-[9px] font-bold text-[#1B2951] uppercase tracking-wider">{L.regions}</h3>
            </div>
            {regions.map((r, i) => (
              <div key={i} className="mx-5 my-1 px-3 py-2 border border-[#e8e4dc] rounded-lg flex items-center gap-3">
                <span className="text-xl">{r.emoji}</span>
                <div className="flex-1">
                  <div className="font-heading text-sm font-bold text-[#1B2951]">{r.name}</div>
                  <div className="text-[8px] text-gray-400">{r.city}</div>
                  <div className="text-[9px] text-gray-500 mt-1">
                    {r.reasons.map((reason: string, ri: number) => (
                      <div key={ri} className="before:content-['✓'] before:text-[#2a9d5c] before:font-bold before:mr-1">{reason}</div>
                    ))}
                  </div>
                </div>
                <div className="font-heading text-lg font-bold text-[#D4AF37]">{r.match}<span className="text-[10px] font-normal text-gray-400">%</span></div>
              </div>
            ))}
            <div className="px-5 py-2 text-center text-[8px] text-gray-400">{L.regionNote}</div>

            {/* Roadmap */}
            <div className="px-5 py-3 border-t border-[#f0ede4]">
              <h3 className="font-heading text-sm text-[#1B2951] text-center mb-2">{L.roadmapTitle}</h3>
              {L.roadmapSteps.map((s: any, i: number) => (
                <div key={i}>
                  <div className="flex items-center gap-2 py-0.5">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${s.cls === 'd' ? 'bg-[#D4AF37] text-[#1B2951]' : s.cls === 'n' ? 'bg-gradient-to-r from-[#D4AF37] to-[#b8862d] text-[#1B2951] animate-pulse' : 'bg-[#e8e4dc] text-gray-400'}`}>
                      {s.cls === 'd' ? '✓' : i + 1}
                    </div>
                    <span className="text-[11px] text-[#1B2951] font-medium">{s.name} <span className="text-gray-400 font-normal text-[9px]">{s.desc}</span></span>
                  </div>
                  {i < L.roadmapSteps.length - 1 && <div className="text-[#D4AF37] text-sm pl-2">↓</div>}
                </div>
              ))}
            </div>

            {/* Final CTA */}
            <div className="bg-gradient-to-r from-[#1B2951] to-[#111D3A] p-5 text-center">
              <p className="text-[11px] text-white/60 mb-3">{L.finalText}</p>
              <button
                onClick={() => router.push('/ideal-regions')}
                className="bg-[#D4AF37] text-[#1B2951] px-6 py-2 rounded-lg text-[12px] font-bold hover:opacity-90 transition-opacity inline-block mb-2"
              >
                {L.finalPrimary}
              </button>
              <br />
              <a href="https://wa.me/5548988117424" target="_blank" rel="noopener noreferrer" className="bg-transparent text-[#D4AF37] border border-[#D4AF37] px-5 py-1.5 rounded-lg text-[10px] font-semibold hover:bg-[#D4AF37]/10 inline-block">
                {L.finalSecondary}
              </a>
              <p className="text-[9px] text-white/35 mt-3 italic">{L.ctaSite}</p>
            </div>

            {/* Disclaimer */}
            <div className="px-5 py-3 text-center text-[8px] text-gray-400">{L.disclaimer}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#009739] via-[#1B2951] to-[#D4AF37] text-white py-4 text-center">
        <div className="font-heading text-sm tracking-[0.25em] text-[#E8C84A]">✦ PLAN B ✦</div>
        <h1 className="font-heading text-2xl mt-1">Brazil <span className="text-[#E8C84A]">Fit Score</span>™</h1>
        <p className="text-xs text-white/60">{L.sub}</p>
        <div className="flex gap-1 justify-center mt-2">
          <button onClick={() => setLang('ru')} className={`px-3 py-0.5 text-[10px] rounded font-semibold ${lang === 'ru' ? 'bg-white/15 text-white border border-[#D4AF37]' : 'text-white/50 border border-white/20'}`}>RU</button>
          <button onClick={() => setLang('en')} className={`px-3 py-0.5 text-[10px] rounded font-semibold ${lang === 'en' ? 'bg-white/15 text-white border border-[#D4AF37]' : 'text-white/50 border border-white/20'}`}>EN</button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Progress */}
        <div className="bg-gray-200 rounded-full h-[6px] mb-4 overflow-hidden">
          <div className="bg-gradient-to-r from-[#009739] to-[#D4AF37] h-full rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <div className="text-center text-[10px] text-gray-400 mb-3">{L.question} {currentQ + 1} {L.of} {qs.length}</div>

        {/* Question Card */}
        <div className="bg-white rounded-xl p-5 shadow-md mb-4">
          <h2 className="font-heading text-lg text-[#1B2951] mb-1">{q.title}</h2>
          {q.hint && <p className="text-[10px] text-gray-400 mb-3">{q.hint}</p>}

          {q.type === 'multi' ? (
            <div className="grid grid-cols-3 gap-2">
              {q.options.map((opt: any) => (
                <button
                  key={opt.value}
                  onClick={() => handleOptionClick(opt.value)}
                  className={`p-2 border-2 rounded-lg text-center text-[11px] transition-all ${isOptionSelected(opt.value) ? 'border-[#1B2951] bg-[#1B2951]/5 font-semibold' : 'border-gray-200 hover:border-[#D4AF37]'}`}
                >
                  <span className="text-lg block mb-0.5">{opt.icon}</span>
                  {opt.label}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-1.5">
              {q.options.map((opt: any) => (
                <button
                  key={opt.value}
                  onClick={() => handleOptionClick(opt.value)}
                  className={`flex items-center gap-3 p-3 border-2 rounded-lg transition-all text-left ${isOptionSelected(opt.value) ? 'border-[#1B2951] bg-[#1B2951]/4' : 'border-gray-200 hover:border-[#D4AF37]'}`}
                >
                  <span className="text-lg flex-shrink-0">{opt.icon}</span>
                  <div className="flex-1">
                    <div className="text-[12px] font-semibold">{opt.label}</div>
                    {opt.desc && <div className="text-[9px] text-gray-400">{opt.desc}</div>}
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isOptionSelected(opt.value) ? 'bg-[#1B2951] border-[#1B2951]' : 'border-gray-300'}`}>
                    {isOptionSelected(opt.value) && <span className="text-white text-[8px] font-bold">✓</span>}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Nav */}
        <div className="flex justify-between">
          <button onClick={handleBack} className={`px-4 py-2 rounded-lg text-[12px] font-semibold ${currentQ === 0 ? 'invisible' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>{L.back}</button>
          <button onClick={handleNext} disabled={isNextDisabled()} className={`px-6 py-2 rounded-lg text-[12px] font-semibold bg-gradient-to-r from-[#1B2951] to-[#111D3A] text-white ${isNextDisabled() ? 'opacity-40 cursor-not-allowed' : 'hover:opacity-90'}`}>
            {isLast ? L.result : L.next}
          </button>
        </div>
      </div>
    </div>
  );
}
