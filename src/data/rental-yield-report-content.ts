// Структурированные данные Rental Yield Report для полноценного bilingual-рендера
// страницы /research/report/rental-yield-report-santa-catarina-2026.
//
// Источник истины: /root/.openclaw/workspace/skills/plan-b-district-analysis/rental_yield_data.json
// (тот же файл, из которого собирается PDF). При обновлении отчёта сначала
// правь rental_yield_data.json там, пересобери PDF, затем синхронизируй этот
// файл тем же скриптом-конвертером (см. README в папке скилла) — текст
// PDF и текст сайта не должны расходиться.

export interface RentalYieldCard {
  name: string;
  icon?: string;
  verdict: string;
  entry: string;
  net?: string;
  occ?: string;
  horizon?: string;
  driver?: string;
  summary: string;
  category: 'favorite' | 'gold' | 'resale';
}

export interface RentalYieldReportContent {
  reportTitleFull: string;
  dataAsOf: string;
  rateLabel: string;
  thesis: {
    title: string;
    lede: string;
    chartImage: string;
    chartCaption: string;
    execSummary: string;
  };
  table: {
    title: string;
    note: string;
    columns: string[];
    rows: string[][];
  };
  funnel: {
    title: string;
    intro: string;
    onetimeTitle: string;
    onetime: { t: string; d: string }[];
    annualTitle: string;
    annual: { t: string; d: string }[];
    keyInsightLabel: string;
    keyInsight: string;
    footnote: string;
  };
  seasonality: {
    title: string;
    intro: string;
    chartImage: string;
    chartCaption: string;
    stats: { v: string; l: string; l2: string }[];
    note: string;
    keyInsightLabel: string;
    tieIn: string;
    sourceNote: string;
  };
  categoryLabels: Record<string, string>;
  islandTitle: string;
  islandCards: RentalYieldCard[];
  islandFootnote: string;
  mainlandTitle: string;
  mainlandIntro: string;
  mainlandCards: RentalYieldCard[];
  mainlandColEntry: string;
  mainlandColHorizon: string;
  mainlandColDriver: string;
  caution: {
    title: string;
    disclaimer: string;
    items: { t: string; verdict: string; note: string }[];
    thread: string;
  };
  methodology: {
    title: string;
    items: string[];
  };
}

export const RENTAL_YIELD_REPORT: Record<'en' | 'ru', RentalYieldReportContent> = {
  en: {
  reportTitleFull: "Rental Yield Report — Santa Catarina 2026",
  dataAsOf: "Data and field estimates as of 16 July 2026",
  rateLabel: "R$5.15/USD",
  thesis: {
    title: "Official Yield Understates Real Yield by 2-3x",
    lede: "FipeZAP's official rental-yield data for Santa Catarina shows 3.5-4.5% gross annually. That figure captures only declared long-term leases and misses the short-term, seasonal letting that generates the bulk of income in the coastal districts.",
    chartImage: "/images/reports/rental-yield-gap-chart-en.png",
    chartCaption: "FipeZAP counts only declared long-term leases — it doesn't see seasonal short-term letting, which is where the real money is made in resort districts.",
    execSummary: "Real net yield — after all costs — ranges from 4-6% in oversupplied seasonal districts to 10-14% in well-selected units under active short-term management. Gross figures mislead: furnishing, taxes and operating costs absorb a significant share. This report traces the full chain, from gross to net, and shows where the real money is versus the pretty headline."
  },
  table: {
    title: "Yield Table by District",
    note: "Entry prices are for a studio/1BR bought to let, before furnishing. Yields are ranges, not point figures: the real number depends on entry price, letting strategy, and quality of management.",
    columns: [
      "District",
      "Profile",
      "Entry (studio/1BR)",
      "Official FipeZAP",
      "Gross",
      "Net",
      "Strategy"
    ],
    rows: [
      [
        "Jurere",
        "resort-premium",
        "~$105k",
        "3.5%",
        "18-22%",
        "10-14%",
        "short-term, active"
      ],
      [
        "Canasvieiras / Cachoeira / Ponta das Canas",
        "resort + tech",
        "~$114-166k",
        "~4%",
        "15-19%",
        "10-13%",
        "short-term + tech winter"
      ],
      [
        "Ingleses",
        "resort-party",
        "~$136k",
        "4.2%",
        "13-16%",
        "7-10%",
        "short-term, flip"
      ],
      [
        "Trindade / Santa Monica",
        "university",
        "~$68k",
        "—",
        "11-14%",
        "9-13%",
        "long-term, year-round"
      ],
      [
        "Campeche",
        "nomad",
        "~$120k+",
        "—",
        "12-15%",
        "7-10%",
        "short-term, selective"
      ],
      [
        "Bombinhas / Bombas",
        "resort-seasonal",
        "~$136k",
        "—",
        "7-9%",
        "4-6%",
        "seasonality hurts"
      ],
      [
        "Balneario Camboriu",
        "premium-seasonal",
        "high",
        "—",
        "5-7%",
        "3-5%",
        "season only"
      ],
      [
        "Itapema",
        "resale",
        "high",
        "—",
        "—",
        "n/a",
        "no rental market, flip"
      ],
      [
        "Porto Belo",
        "long horizon",
        "mid",
        "—",
        "—",
        "n/a",
        "resale, 10 yr+"
      ]
    ]
  },
  funnel: {
    title: "What Sits Between Gross and Net",
    intro: "Gross yield = annual rental income / entry price. It's the headline number sellers show. An investor's real return is net, after the following.",
    onetimeTitle: "One-off cost at entry",
    onetime: [
      {
        t: "Furnishing & appliances",
        d: "~+20% on top of the property price. Short-term coastal letting isn't possible without it — net yield is calculated on the full sum invested, property plus furnishing."
      }
    ],
    annualTitle: "Annual operating costs",
    annual: [
      {
        t: "Condominium fee",
        d: "Paid by the owner under short-term letting (by the tenant under long-term)"
      },
      {
        t: "IPTU (municipal property tax)",
        d: "~R$1,500-1,800/year for a studio/1BR"
      },
      {
        t: "Utilities (electricity, water)",
        d: "On the owner short-term, on the tenant long-term"
      },
      {
        t: "Management & servicing",
        d: "Turnover cleaning, platform fees, a manager: ~20% of income short-term, ~8% long-term"
      }
    ],
    keyInsightLabel: "Key Insight",
    keyInsight: "Under short-term letting the owner carries the condo fee, utilities, and heavy operations directly — so the difference in NET yield between short- and long-term letting is often only 2-3 percentage points, even where the gross differs by half. Short-term earns more, but the effort is disproportionately greater.",
    footnote: "Income tax on rent and capital-gains tax on resale are not included here — they depend on ownership structure (individual/company), residency, and holding period, and are calculated individually."
  },
  seasonality: {
    title: "On Seasonality — Applies Market-Wide",
    intro: "Across most of Florianopolis and the coast, the calendar is the single biggest driver of returns.",
    chartImage: "/images/reports/rental-yield-season-chart-en.png",
    chartCaption: "Where the income is made",
    stats: [
      {
        v: "up to ~95%",
        l: "High Season",
        l2: "Dec 15 - Mar 15"
      },
      {
        v: "Peak within season",
        l: "Christmas, New Year, Carnival",
        l2: ""
      },
      {
        v: "~50% or lower",
        l: "Low Season",
        l2: "Apr - Nov (9 months)"
      }
    ],
    note: "Underwrite any coastal purchase on full-year economics, not on peak rates. Off-season, many owners either don't let, or take low-value long-stay tenants.",
    keyInsightLabel: "Key Insight",
    tieIn: "This is exactly the source of the gap on page 2: FipeZAP averages the whole year, including nine largely dead months — the real money is made in the narrow Dec 15-Mar 15 window, and that concentration is what turns gross yield into net under active short-term management.",
    sourceNote: "Occupancy figures are Plan B's own field estimates from active listing performance across island and mainland resort districts, not a single published index."
  },
  categoryLabels: {
    favorite: "Favorite",
    gold: "Prestige",
    resale: "Resale/Hold"
  },
  islandTitle: "District Observations — The Island (Florianopolis)",
  islandCards: [
    {
      name: "Ingleses",
      icon: "resort",
      verdict: "Resale play, not passive buy-to-let",
      entry: "~$136k",
      net: "7-10%",
      occ: "95% peak / 50% off",
      summary: "Argentine tourism epicentre, open sea, active-holiday format. Groups sharing units raise wear and management load. Strong appreciation (~13-15%/yr) is the real thesis; rental works, but needs active management.",
      category: "gold"
    },
    {
      name: "Canasvieiras / Cachoeira / Ponta das Canas",
      icon: "top-pick",
      verdict: "Our top pick — best combination on the island",
      entry: "~$114-166k",
      net: "10-13%",
      occ: "~70% off-season (tech)",
      summary: "Same seasonal economics as Ingleses, calmer water, families rather than groups. Sapiens Parque tech hub keeps occupancy up off-season with long-stay, low-impact tenants. Works for resale and buy-to-let alike.",
      category: "favorite"
    },
    {
      name: "Trindade / Santa Monica",
      icon: "university",
      verdict: "Most underrated — year-round university demand",
      entry: "~$68k",
      net: "9-13%",
      occ: "~80% year-round",
      summary: "Education-driven, not seasonal — UFSC and the Police Academy anchor structural demand. New supply scarce; projects sell out in hours. Buy micro-units (15-30m2). Lower headline rent, materially higher stability.",
      category: "favorite"
    },
    {
      name: "Jurere",
      icon: "luxury",
      verdict: "Prestige play more than a yield play",
      entry: "from $105k (studios)",
      net: "10-14%",
      occ: "95% peak / 70% off",
      summary: "Internacional = celebrities, foreign money, stratospheric pricing. Tradicional = more accessible, where growth is spilling. Classic developers here run pricier; enter selectively, on the project, not the name.",
      category: "gold"
    },
    {
      name: "Campeche",
      icon: "resort",
      verdict: "Already overheated — lifestyle buy, not a yield buy",
      entry: "~$120k+",
      net: "7-10%",
      occ: "90% season / 60% off",
      summary: "Digital-nomad hub, real infrastructure a notch below Jurere. Flight-path noise centrally, single access road. Entry pricing near Jurere without matching infrastructure — we'd be cautious; enter only on the right project.",
      category: "gold"
    }
  ],
  islandFootnote: "Lagoa da Conceicao — a well-known district, but not one where we currently have a specific investment thesis to add.",
  mainlandTitle: "District Observations — The Mainland Coast",
  mainlandIntro: "Everything traces back to Balneario Camboriu: land there ran out, developers pushed into neighbouring cities, and prices rose in a wave outward from BC.",
  mainlandCards: [
    {
      name: "Balneario Camboriu (BC)",
      icon: "city",
      verdict: "Brazil's Dubai — the benchmark, not a yield play",
      entry: "high",
      net: "3-5%",
      occ: "~50% (empties off-season)",
      summary: "Tallest towers in Latin America, acute land scarcity, per-m2 up to R$200,000. A seasonal-presence format rather than year-round living — it's BC that pushed pricing into the cities below.",
      category: "resale"
    },
    {
      name: "Praia Brava (Itajai)",
      icon: "wave",
      verdict: "Premium entry, justified at scale",
      entry: "$1M+",
      horizon: "5-10 years",
      driver: "stepped massing — sea view for every unit",
      summary: "Part of the same wave from BC, but with a signature layout: buildings step back and rise higher the further from the shore, so every unit keeps its sea view — unlike BC's chaotic front row. This is where Brazil's elite is now choosing to buy over BC's crowding. Demand here isn't driven by rental yield — buyers are acquiring an asset to preserve capital and for growth; people buy to hold. Not to be confused with the island's earlier-stage Praia Brava.",
      category: "resale"
    },
    {
      name: "Itapema",
      icon: "construction",
      verdict: "Asset-hold play, not a rental play",
      entry: "from $400k",
      horizon: "5-10 years",
      driver: "proximity to BC & Porto Belo — price wave from BC",
      summary: "Developers moved in from BC and prices climbed fast, riding the same wave outward. Demand here isn't driven by rental yield — buyers are acquiring an asset to preserve capital and for growth; people buy to hold, not to let. One large construction site today.",
      category: "resale"
    },
    {
      name: "Pereque",
      icon: "hourglass",
      verdict: "Real potential, 5-10 year horizon",
      entry: "$350-500k",
      horizon: "5-10 years",
      driver: "proximity to BC & Porto Belo",
      summary: "Like Itapema, currently a construction site — but with genuine upside as tourism follows from nearby Bombinhas, Praia Grande, Bombas over the next 5-10 years. Demand here isn't driven by rental yield — buyers are acquiring an asset to preserve capital and for growth; people buy to hold. A patient play.",
      category: "resale"
    },
    {
      name: "Bombinhas / Bombas / Praia Grande",
      icon: "beach",
      verdict: "Cleanest beaches, sharply seasonal",
      entry: "~$136k",
      net: "4-6%",
      occ: "~30% off-season",
      summary: "Three Blue Flag beaches, quality tourism from Argentina, Chile, Peru. Rates moderate; seasonality is pronounced and pulls net yield down. Underwrite the off-season vacancy honestly.",
      category: "resale"
    },
    {
      name: "Porto Belo",
      icon: "city",
      verdict: "The city of the future — very long horizon",
      entry: "$300-500k",
      horizon: "10+ years",
      driver: "new districts for 50-60k residents, not high-rises",
      summary: "Whole comfortable districts being built for 50-60k residents, world-class architects, celebrity-backed — not the vertical towers of BC. Demand here isn't driven by rental yield — buyers are acquiring an asset to preserve capital and for growth over a minimum 10-year horizon; people buy to hold.",
      category: "resale"
    }
  ],
  mainlandColEntry: "Entry",
  mainlandColHorizon: "Horizon",
  mainlandColDriver: "Growth Driver",
  caution: {
    title: "Where We'd Be Cautious — A Practitioner's View",
    disclaimer: "This is our opinion as of July 2026 — not a data verdict. Santa Catarina moves fast. We put it as plainly as we would to an investor with a $200-300k budget, because knowing where NOT to buy is as valuable as knowing where to.",
    items: [
      {
        t: "Coqueiros",
        verdict: "Great to live, weak to invest",
        note: "old stock, scattered amenities, need a car"
      },
      {
        t: "Centro (Florianopolis)",
        verdict: "Growth, but not the coastal kind",
        note: "not where tourism demand lives"
      },
      {
        t: "Praia Brava (island, near Ingleses)",
        verdict: "Right area, wrong horizon",
        note: "5-10yr timeline, pricey even early-stage"
      },
      {
        t: "“Live here, don't invest here”",
        verdict: "Weak rental demand, harder resale",
        note: "Sambaqui, Joao Paulo, Cacupe, Ribeirao da Ilha, Lagoinha do Leste"
      },
      {
        t: "The no-name developer trap",
        verdict: "Completion risk, not location risk",
        note: "Santinho, Rio Vermelho, Vargem Grande/Pequena, Saco dos Limoes — experienced buyers only"
      }
    ],
    thread: "The common thread: headline appreciation rarely captures liquidity, completion risk, or whether real rental demand exists at the unit level. The gap between the spreadsheet and the situation on the ground is exactly what years living in the country — and an investor's eye rather than a seller's — are for."
  },
  methodology: {
    title: "Methodology & Sources",
    items: [
      "Per-m2 prices — from active developer price lists (primary market), July 2026",
      "Official yield — FipeZAP (declared long-term leases)",
      "Real yield — calculated from actual entry prices and rental rates observed in Plan B's practice in Santa Catarina, net of furnishing, IPTU, condo fees, utilities, and management",
      "Rate R$5.15/USD as of 16.07.2026",
      "Ranges, not point figures: real yield depends on entry price, strategy, and management"
    ]
  }
},
  ru: {
  reportTitleFull: "Отчёт по доходности аренды — Санта-Катарина 2026",
  dataAsOf: "Данные и полевые оценки на 16 июля 2026",
  rateLabel: "R$5,15/USD",
  thesis: {
    title: "Официальная доходность занижает реальную в 2-3 раза",
    lede: "Официальная статистика доходности аренды в Санта-Катарине (FipeZAP) показывает 3,5-4,5% годовых. Эта цифра считает только задекларированную долгосрочную аренду и не видит краткосрочную сезонную сдачу, на которой в курортных районах и делаются деньги.",
    chartImage: "/images/reports/rental-yield-gap-chart-ru.png",
    chartCaption: "FipeZAP считает только задекларированную долгосрочную аренду — не видит сезонную краткосрочную сдачу, на которой в курортных районах и делаются реальные деньги.",
    execSummary: "Реальная чистая доходность — после всех затрат — составляет от 4-6% в пересыщенных сезонных районах до 10-14% в правильно подобранных объектах при активной краткосрочной сдаче. Валовые цифры обманчивы: значительную часть съедают меблировка, налоги и операционные расходы. Этот отчёт показывает всю цепочку — от валовой к чистой — и объясняет, где реальные деньги, а где красивая картинка."
  },
  table: {
    title: "Таблица доходности по районам",
    note: "Цены входа — для студии/1BR под сдачу, без учёта меблировки. Диапазоны доходности, а не точные значения: реальная цифра зависит от цены входа, стратегии сдачи и качества управления.",
    columns: [
      "Район",
      "Профиль",
      "Вход (студия/1BR)",
      "Офиц. FipeZAP",
      "Валовая",
      "Чистая",
      "Стратегия"
    ],
    rows: [
      [
        "Журере",
        "курорт-премиум",
        "~$105k",
        "3,5%",
        "18-22%",
        "10-14%",
        "краткосрок, активно"
      ],
      [
        "Канасвиэйрас / Кашоэйра / Понта-дас-Канас",
        "курорт + IT",
        "~$114-166k",
        "~4%",
        "15-19%",
        "10-13%",
        "краткосрок + айтишники"
      ],
      [
        "Инглезес",
        "курорт-туса",
        "~$136k",
        "4,2%",
        "13-16%",
        "7-10%",
        "краткосрок, флип"
      ],
      [
        "Триндаде / Санта-Моника",
        "университет",
        "~$68k",
        "—",
        "11-14%",
        "9-13%",
        "долгосрок, круглый год"
      ],
      [
        "Кампече",
        "номад",
        "~$120k+",
        "—",
        "12-15%",
        "7-10%",
        "краткосрок, точечно"
      ],
      [
        "Бомбиньяс / Бомбас",
        "курорт-сезон",
        "~$136k",
        "—",
        "7-9%",
        "4-6%",
        "сезонность бьёт"
      ],
      [
        "Балнеариу-Камбориу",
        "премиум-сезон",
        "высокий",
        "—",
        "5-7%",
        "3-5%",
        "только сезон"
      ],
      [
        "Итапема",
        "перепродажа",
        "высокий",
        "—",
        "—",
        "н/д",
        "аренды нет, флип"
      ],
      [
        "Порту-Белу",
        "долгий горизонт",
        "средний",
        "—",
        "—",
        "н/д",
        "перепродажа 10 лет+"
      ]
    ]
  },
  funnel: {
    title: "Что стоит между валовой и чистой доходностью",
    intro: "Валовая доходность = годовой арендный доход / цена входа. Это цифра «с обложки», которую показывают продавцы. Реальная доходность инвестора — чистая, после затрат.",
    onetimeTitle: "Разовые затраты на старте",
    onetime: [
      {
        t: "Меблировка и техника",
        d: "+~20% к цене квартиры. Без этого курортная краткосрочная сдача невозможна. Чистая доходность считается от полной вложенной суммы — квартира плюс обстановка."
      }
    ],
    annualTitle: "Ежегодные операционные расходы",
    annual: [
      {
        t: "Кондоминиум",
        d: "При краткосрочной сдаче платит владелец (при долгосрочной — жилец)"
      },
      {
        t: "IPTU (муниципальный налог)",
        d: "~R$1 500-1 800/год для студии/1BR"
      },
      {
        t: "Коммунальные (свет, вода)",
        d: "При краткосроке на владельце, при долгосроке на жильце"
      },
      {
        t: "Управление и обслуживание",
        d: "Уборка между гостями, комиссии площадок, управляющий: ~20% от дохода при краткосроке, ~8% при долгосроке"
      }
    ],
    keyInsightLabel: "Ключевой эффект",
    keyInsight: "При краткосрочной сдаче владелец несёт кондоминиум, коммуналку и высокую операционку сам — поэтому разница ЧИСТОЙ доходности между краткосроком и долгосрочной арендой часто составляет лишь 2-3 процентных пункта, хотя валовая отличается вдвое. Краткосрок даёт больше — но и хлопот кратно больше.",
    footnote: "Налоги на доход от аренды и на прирост капитала при перепродаже здесь не учтены: они зависят от структуры владения (физлицо/юрлицо), резидентства и срока владения и рассчитываются индивидуально."
  },
  seasonality: {
    title: "О сезонности — применимо ко всему побережью",
    intro: "На большей части Флорианополиса и побережья календарь — главный фактор доходности.",
    chartImage: "/images/reports/rental-yield-season-chart-ru.png",
    chartCaption: "Где генерится доход",
    stats: [
      {
        v: "до ~95%",
        l: "Высокий сезон",
        l2: "15 дек — 15 мар"
      },
      {
        v: "Пик внутри сезона",
        l: "Рождество, Новый год, Карнавал",
        l2: ""
      },
      {
        v: "~50% и ниже",
        l: "Низкий сезон",
        l2: "апр — ноя (9 месяцев)"
      }
    ],
    note: "Любую курортную покупку считайте по экономике всего года, а не по пиковым ставкам. Вне сезона многие собственники либо не сдают, либо пускают длинных жильцов за небольшие деньги.",
    keyInsightLabel: "Ключевой эффект",
    tieIn: "Это и есть источник разрыва со страницы 2: FipeZAP усредняет год целиком, включая девять «мёртвых» месяцев — реальные деньги делаются в узком окне 15 декабря — 15 марта, и именно эта концентрация превращает валовую доходность в чистую при правильном управлении краткосрочной сдачей.",
    sourceNote: "Данные по загрузке — собственные полевые оценки Plan B по фактическим бронированиям в курортных районах острова и материка, а не единый публикуемый индекс."
  },
  categoryLabels: {
    favorite: "Фаворит",
    gold: "Престиж",
    resale: "Перепродажа"
  },
  islandTitle: "Наблюдения по районам — Остров (Флорианополис)",
  islandCards: [
    {
      name: "Инглезес",
      icon: "resort",
      verdict: "История под перепродажу, не под пассивную сдачу",
      entry: "~$136k",
      net: "7-10%",
      occ: "95% пик / 50% вне сезона",
      summary: "Эпицентр аргентинского туризма, открытое море, формат активного отдыха. Группы, скидывающиеся на одну квартиру, повышают износ и нагрузку на управление. Сильный рост (~13-15%/год) — реальный тезис; аренда работает, но требует активного управления.",
      category: "gold"
    },
    {
      name: "Канасвиэйрас / Кашоэйра / Понта-дас-Канас",
      icon: "top-pick",
      verdict: "Наш фаворит — лучшая комбинация на острове",
      entry: "~$114-166k",
      net: "10-13%",
      occ: "~70% вне сезона (айтишники)",
      summary: "Та же сезонная экономика, что в Инглезес, но спокойнее вода, семьи вместо групп. Sapiens Parque держит загрузку вне сезона за счёт долгих аккуратных арендаторов. Работает и под сдачу, и под перепродажу.",
      category: "favorite"
    },
    {
      name: "Триндаде / Санта-Моника",
      icon: "university",
      verdict: "Самые недооценённые — спрос от университета круглый год",
      entry: "~$68k",
      net: "9-13%",
      occ: "~80% круглый год",
      summary: "Образовательный, не сезонный профиль — UFSC и Полицейская академия дают структурный спрос. Нового предложения мало, проекты раскупаются за часы. Берите микро-жильё (15-30 м²). Ниже номинальная ставка — выше стабильность.",
      category: "favorite"
    },
    {
      name: "Журере",
      icon: "luxury",
      verdict: "Больше престиж, чем игра на доходность",
      entry: "от $105k (студии)",
      net: "10-14%",
      occ: "95% пик / 70% вне сезона",
      summary: "Интернасьонал — звёзды, иностранные деньги, космические цены. Традисьонал — доступнее, туда переливается рост. Классические застройщики здесь — дороже; входить точечно, под проект, не под имя района.",
      category: "gold"
    },
    {
      name: "Кампече",
      icon: "resort",
      verdict: "Уже перегрет — покупка ради образа жизни, не доходности",
      entry: "~$120k+",
      net: "7-10%",
      occ: "90% сезон / 60% вне",
      summary: "Номад-хаб, инфраструктура на ступень ниже Журере. Глиссада аэропорта в центре района, единственная дорога на въезд-выезд. Цена входа как в Журере при более слабой инфраструктуре — отнеслись бы осторожно, входить только под конкретный проект.",
      category: "gold"
    }
  ],
  islandFootnote: "Лагоа-да-Консейсау — известный район, но отдельного инвестиционного тезиса по нему у нас сейчас нет.",
  mainlandTitle: "Наблюдения по районам — Материковое побережье",
  mainlandIntro: "Всё восходит к Балнеариу-Камбориу: земля там кончилась, застройщики двинулись в соседние города, цены пошли волной от BC наружу.",
  mainlandCards: [
    {
      name: "Балнеариу-Камбориу (BC)",
      icon: "city",
      verdict: "Бразильский Дубай — бенчмарк, не игра на доходность",
      entry: "высокий",
      net: "3-5%",
      occ: "~50% (пустеет вне сезона)",
      summary: "Самые высокие башни Латинской Америки, острая нехватка земли, метр до R$200 000. Формат сезонного присутствия, а не круглогодичной жизни — именно BC вытолкнул цены в города ниже.",
      category: "resale"
    },
    {
      name: "Прая-Брава (Итажаи)",
      icon: "wave",
      verdict: "Премиальный вход, оправдан на масштабе",
      entry: "$1M+",
      horizon: "5-10 лет",
      driver: "застройка «лесенкой» — вид на море у всех",
      summary: "Часть той же волны от BC, но с собственной фишкой: здания стоят «лесенкой» — 1-я линия ниже, дальше от моря выше, и вид на море есть у всех — в отличие от хаотичной 1-й линии BC. Именно сюда теперь идёт элита, выбирая Прая-Брава вместо суеты BC. Спрос здесь движим не арендной доходностью, а покупкой актива для сохранения капитала и роста — берут, чтобы владеть. Не путать с островной Прая-Брава.",
      category: "resale"
    },
    {
      name: "Итапема",
      icon: "construction",
      verdict: "Ставка на актив, не на сдачу",
      entry: "от $400k",
      horizon: "5-10 лет",
      driver: "близость к BC и Порту-Белу — волна цен от BC",
      summary: "Застройщики пришли из BC, цены быстро выросли на той же волне. Спрос здесь движим не арендной доходностью, а покупкой актива для сохранения капитала и роста — берут, чтобы владеть, не чтобы сдавать. Сейчас одна большая стройка.",
      category: "resale"
    },
    {
      name: "Переке",
      icon: "hourglass",
      verdict: "Реальный потенциал, горизонт 5-10 лет",
      entry: "$350-500k",
      horizon: "5-10 лет",
      driver: "близость к BC и Порту-Белу",
      summary: "Как Итапема, сейчас стройка — но с апсайдом: через 5-10 лет подтянется туризм (рядом Бомбиньяс, Прая-Гранди, Бомбас). Спрос здесь движим не арендной доходностью, а покупкой актива для сохранения капитала и роста — берут, чтобы владеть. Для терпеливых.",
      category: "resale"
    },
    {
      name: "Бомбиньяс / Бомбас / Прая-Гранди",
      icon: "beach",
      verdict: "Чистейшие пляжи, резко сезонные",
      entry: "~$136k",
      net: "4-6%",
      occ: "~30% вне сезона",
      summary: "Три пляжа с «Голубым флагом», качественный турпоток из Аргентины, Чили, Перу. Ставки умеренные; сезонность жёсткая и бьёт по чистой доходности. Честно закладывайте эту пустоту.",
      category: "resale"
    },
    {
      name: "Порту-Белу",
      icon: "city",
      verdict: "«Город будущего» — очень длинный горизонт",
      entry: "$300-500k",
      horizon: "10 лет+",
      driver: "новые комфортные районы на 50-60 тыс. жителей, не «свечки»",
      summary: "Строятся целые комфортные районы на 50-60 тыс. жителей, архитекторы мирового уровня, звёзды-инвесторы — не вертикальные башни как в BC. Спрос здесь движим не арендной доходностью, а покупкой актива для сохранения капитала и роста на горизонте минимум 10 лет — берут, чтобы владеть.",
      category: "resale"
    }
  ],
  mainlandColEntry: "Вход",
  mainlandColHorizon: "Горизонт",
  mainlandColDriver: "Драйвер роста",
  caution: {
    title: "Где мы бы проявили осторожность — личный взгляд практика",
    disclaimer: "Это наше мнение на июль 2026 — не приговор по данным. Рынок Санта-Катарины меняется быстро. Мы формулируем это прямо — так, как объяснили бы инвестору с бюджетом $200-300k, потому что знать, где НЕ покупать, так же ценно, как знать, где покупать.",
    items: [
      {
        t: "Кокейрос",
        verdict: "Жить — да, инвестировать — нет",
        note: "старый фонд, инфраструктура разбросана, нужна машина"
      },
      {
        t: "Центр (Флорипа)",
        verdict: "Рост есть, но не курортный",
        note: "не туда, где живёт турист-спрос"
      },
      {
        t: "Прая-Брава (островная, рядом с Инглезес)",
        verdict: "Правильное место, неправильный горизонт",
        note: "5-10 лет, дорого уже на ранней стадии"
      },
      {
        t: "«Жить здесь, не инвестировать»",
        verdict: "Слабый арендный спрос, тяжёлая перепродажа",
        note: "Самбаки, Жоау-Паулу, Какупе, Рибейрау-да-Илья, Лагоинья-ду-Лесте"
      },
      {
        t: "Ловушка ноунейм-застройщиков",
        verdict: "Риск недостроя, не локации",
        note: "Сантинью, Риу-Вермелью, Варжем-Гранди/Пекена, Сако-дос-Лимойнс — только для опытных"
      }
    ],
    thread: "Общая нить: заголовочные цифры роста не отражают ликвидность, риск недостроя и реальный арендный спрос на уровне конкретной квартиры. Разрыв между таблицей и тем, что происходит на земле, — это ровно то, для чего нужны годы жизни в этой стране и взгляд инвестора, а не продавца."
  },
  methodology: {
    title: "Методология и источники",
    items: [
      "Цены за м² — из действующих прайс-листов застройщиков (первичный рынок), июль 2026",
      "Официальная доходность — FipeZAP (задекларированная долгосрочная аренда)",
      "Реальная доходность — расчёт от реальных цен входа и арендных ставок, наблюдаемых в практике Plan B на рынке Санта-Катарины, с учётом меблировки, IPTU, кондоминиума, коммунальных и управления",
      "Курс R$5,15/USD на 16.07.2026",
      "Диапазоны, а не точные значения: реальная доходность зависит от цены входа, стратегии и качества управления"
    ]
  }
},
};
