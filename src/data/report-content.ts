// Полный текст отчётов в HTML.
//
// ЗАЧЕМ: PDF индексируется плохо. LLM-краулеры (GPTBot, ClaudeBot, PerplexityBot)
// его чаще всего вообще не читают. Текст в HTML = единственный способ, чтобы
// экспертиза Plan B появилась в ответах Google и ChatGPT.
//
// КАК ЗАПОЛНЯТЬ: запусти scripts/extract-pdf-content.py — он вытащит текст
// из public/*.pdf и сгенерит черновики. Потом ВЫЧИТАТЬ ГЛАЗАМИ и вставить сюда.
//
// ⚠️ ВАЖНО: не публиковать сгенерированный текст без вычитки.
// Под этими отчётами стоит имя Константина и номер CRECI. Ошибка в цифрах —
// это репутационный и юридический риск, а не опечатка.
//
// Ключ = slug отчёта (slugify от title). Например:
//   "Jurerê Investment Report" → "jurere-investment-report"

export interface ReportSection {
  heading: string;
  paragraphs: string[];
}

export interface ReportContent {
  sections: ReportSection[];
}

// Мультиязычная запись: ключ slug всегда считается от АНГЛИЙСКОГО title (см. research-server.ts),
// а внутри хранится полный текст на каждом языке, чтобы RU-версия страницы тоже была серверно-отрендерена.
export interface ReportContentByLang {
  en?: ReportContent;
  ru?: ReportContent;
  pt?: ReportContent;
}

export const REPORT_CONTENT: Record<string, ReportContentByLang> = {
  // ПРИМЕР структуры (удалить и заменить реальными данными):
  //
  // 'jurere-investment-report': {
  //   en: {
  //     sections: [
  //       {
  //         heading: 'Market Overview',
  //         paragraphs: [
  //           'Jurerê is one of Florianópolis's most established premium beach districts...',
  //           'Average pricing sits at R$14,400/m², below the R$20,000+/m² ceiling...',
  //         ],
  //       },
  //       { heading: 'Who Invests Here', paragraphs: ['...'] },
  //       { heading: 'Risks', paragraphs: ['...'] },
  //     ],
  //   },
  //   ru: { sections: [ /* то же на русском */ ] },
  // },

  'rental-yield-report-santa-catarina-2026': {
    en: {
      sections: [
      {
        heading: "Official Yield Understates Real Yield by 2-3x",
        paragraphs: [
          "FipeZAP's official rental-yield data for Santa Catarina shows 3.5-4.5% gross annually. That figure captures only declared long-term leases and misses the short-term, seasonal letting that generates the bulk of income in the coastal districts.",
          "FipeZAP counts only declared long-term leases — it doesn't see seasonal short-term letting, which is where the real money is made in resort districts.",
          "Real net yield — after all costs — ranges from 4-6% in oversupplied seasonal districts to 10-14% in well-selected units under active short-term management. Gross figures mislead: furnishing, taxes and operating costs absorb a significant share. This report traces the full chain, from gross to net, and shows where the real money is versus the pretty headline."
        ],
      },
      {
        heading: "Yield Table by District",
        paragraphs: [
          "Entry prices are for a studio/1BR bought to let, before furnishing. Yields are ranges, not point figures: the real number depends on entry price, letting strategy, and quality of management.",
          "Jurere — resort-premium. Entry: ~$105k. Official FipeZAP yield: 3.5%. Gross: 18-22%. Net yield: 10-14%. Strategy: short-term, active.",
          "Canasvieiras / Cachoeira / Ponta das Canas — resort + tech. Entry: ~$114-166k. Official FipeZAP yield: ~4%. Gross: 15-19%. Net yield: 10-13%. Strategy: short-term + tech winter.",
          "Ingleses — resort-party. Entry: ~$136k. Official FipeZAP yield: 4.2%. Gross: 13-16%. Net yield: 7-10%. Strategy: short-term, flip.",
          "Trindade / Santa Monica — university. Entry: ~$68k. Official FipeZAP yield: —. Gross: 11-14%. Net yield: 9-13%. Strategy: long-term, year-round.",
          "Campeche — nomad. Entry: ~$120k+. Official FipeZAP yield: —. Gross: 12-15%. Net yield: 7-10%. Strategy: short-term, selective.",
          "Bombinhas / Bombas — resort-seasonal. Entry: ~$136k. Official FipeZAP yield: —. Gross: 7-9%. Net yield: 4-6%. Strategy: seasonality hurts.",
          "Balneario Camboriu — premium-seasonal. Entry: high. Official FipeZAP yield: —. Gross: 5-7%. Net yield: 3-5%. Strategy: season only.",
          "Itapema — resale. Entry: high. Official FipeZAP yield: —. Gross: —. Net yield: n/a. Strategy: no rental market, flip.",
          "Porto Belo — long horizon. Entry: mid. Official FipeZAP yield: —. Gross: —. Net yield: n/a. Strategy: resale, 10 yr+."
        ],
      },
      {
        heading: "What Sits Between Gross and Net",
        paragraphs: [
          "Gross yield = annual rental income / entry price. It's the headline number sellers show. An investor's real return is net, after the following.",
          "One-off cost at entry: Furnishing & appliances — ~+20% on top of the property price. Short-term coastal letting isn't possible without it — net yield is calculated on the full sum invested, property plus furnishing.",
          "Annual operating costs: Condominium fee — Paid by the owner under short-term letting (by the tenant under long-term) IPTU (municipal property tax) — ~R$1,500-1,800/year for a studio/1BR Utilities (electricity, water) — On the owner short-term, on the tenant long-term Management & servicing — Turnover cleaning, platform fees, a manager: ~20% of income short-term, ~8% long-term",
          "Key Insight: Under short-term letting the owner carries the condo fee, utilities, and heavy operations directly — so the difference in NET yield between short- and long-term letting is often only 2-3 percentage points, even where the gross differs by half. Short-term earns more, but the effort is disproportionately greater.",
          "Income tax on rent and capital-gains tax on resale are not included here — they depend on ownership structure (individual/company), residency, and holding period, and are calculated individually."
        ],
      },
      {
        heading: "On Seasonality — Applies Market-Wide",
        paragraphs: [
          "Across most of Florianopolis and the coast, the calendar is the single biggest driver of returns.",
          "High Season (Dec 15 - Mar 15): Occupancy up to ~95%. Peak within season: Christmas, New Year, Carnival. Low Season (Apr - Nov (9 months)): Occupancy ~50% or lower.",
          "Underwrite any coastal purchase on full-year economics, not on peak rates. Off-season, many owners either don't let, or take low-value long-stay tenants.",
          "This is exactly the source of the gap on page 2: FipeZAP averages the whole year, including nine largely dead months — the real money is made in the narrow Dec 15-Mar 15 window, and that concentration is what turns gross yield into net under active short-term management.",
          "Occupancy figures are Plan B's own field estimates from active listing performance across island and mainland resort districts, not a single published index."
        ],
      },
      {
        heading: "District Observations — The Island (Florianopolis)",
        paragraphs: [
          "Ingleses — Resale play, not passive buy-to-let. Entry: ~$136k. Net yield: 7-10%. Occupancy: 95% peak / 50% off. Argentine tourism epicentre, open sea, active-holiday format. Groups sharing units raise wear and management load. Strong appreciation (~13-15%/yr) is the real thesis; rental works, but needs active management.",
          "Canasvieiras / Cachoeira / Ponta das Canas — Our top pick — best combination on the island. Entry: ~$114-166k. Net yield: 10-13%. Occupancy: ~70% off-season (tech). Same seasonal economics as Ingleses, calmer water, families rather than groups. Sapiens Parque tech hub keeps occupancy up off-season with long-stay, low-impact tenants. Works for resale and buy-to-let alike.",
          "Trindade / Santa Monica — Most underrated — year-round university demand. Entry: ~$68k. Net yield: 9-13%. Occupancy: ~80% year-round. Education-driven, not seasonal — UFSC and the Police Academy anchor structural demand. New supply scarce; projects sell out in hours. Buy micro-units (15-30m2). Lower headline rent, materially higher stability.",
          "Jurere — Prestige play more than a yield play. Entry: from $105k (studios). Net yield: 10-14%. Occupancy: 95% peak / 70% off. Internacional = celebrities, foreign money, stratospheric pricing. Tradicional = more accessible, where growth is spilling. Classic developers here run pricier; enter selectively, on the project, not the name.",
          "Campeche — Already overheated — lifestyle buy, not a yield buy. Entry: ~$120k+. Net yield: 7-10%. Occupancy: 90% season / 60% off. Digital-nomad hub, real infrastructure a notch below Jurere. Flight-path noise centrally, single access road. Entry pricing near Jurere without matching infrastructure — we'd be cautious; enter only on the right project.",
          "Lagoa da Conceicao — a well-known district, but not one where we currently have a specific investment thesis to add."
        ],
      },
      {
        heading: "District Observations — The Mainland Coast",
        paragraphs: [
          "Everything traces back to Balneario Camboriu: land there ran out, developers pushed into neighbouring cities, and prices rose in a wave outward from BC.",
          "Balneario Camboriu (BC) — Brazil's Dubai — the benchmark, not a yield play. Entry: high. Net yield: 3-5%. Occupancy: ~50% (empties off-season). Tallest towers in Latin America, acute land scarcity, per-m2 up to R$200,000. A seasonal-presence format rather than year-round living — it's BC that pushed pricing into the cities below.",
          "Praia Brava (Itajai) — Premium entry, justified at scale. Entry: $1M+. Horizon: 5-10 years. Growth driver: stepped massing — sea view for every unit. Part of the same wave from BC, but with a signature layout: buildings step back and rise higher the further from the shore, so every unit keeps its sea view — unlike BC's chaotic front row. This is where Brazil's elite is now choosing to buy over BC's crowding. Demand here isn't driven by rental yield — buyers are acquiring an asset to preserve capital and for growth; people buy to hold. Not to be confused with the island's earlier-stage Praia Brava.",
          "Itapema — Asset-hold play, not a rental play. Entry: from $400k. Horizon: 5-10 years. Growth driver: proximity to BC & Porto Belo — price wave from BC. Developers moved in from BC and prices climbed fast, riding the same wave outward. Demand here isn't driven by rental yield — buyers are acquiring an asset to preserve capital and for growth; people buy to hold, not to let. One large construction site today.",
          "Pereque — Real potential, 5-10 year horizon. Entry: $350-500k. Horizon: 5-10 years. Growth driver: proximity to BC & Porto Belo. Like Itapema, currently a construction site — but with genuine upside as tourism follows from nearby Bombinhas, Praia Grande, Bombas over the next 5-10 years. Demand here isn't driven by rental yield — buyers are acquiring an asset to preserve capital and for growth; people buy to hold. A patient play.",
          "Bombinhas / Bombas / Praia Grande — Cleanest beaches, sharply seasonal. Entry: ~$136k. Net yield: 4-6%. Occupancy: ~30% off-season. Three Blue Flag beaches, quality tourism from Argentina, Chile, Peru. Rates moderate; seasonality is pronounced and pulls net yield down. Underwrite the off-season vacancy honestly.",
          "Porto Belo — The city of the future — very long horizon. Entry: $300-500k. Horizon: 10+ years. Growth driver: new districts for 50-60k residents, not high-rises. Whole comfortable districts being built for 50-60k residents, world-class architects, celebrity-backed — not the vertical towers of BC. Demand here isn't driven by rental yield — buyers are acquiring an asset to preserve capital and for growth over a minimum 10-year horizon; people buy to hold."
        ],
      },
      {
        heading: "Where We'd Be Cautious — A Practitioner's View",
        paragraphs: [
          "This is our opinion as of July 2026 — not a data verdict. Santa Catarina moves fast. We put it as plainly as we would to an investor with a $200-300k budget, because knowing where NOT to buy is as valuable as knowing where to.",
          "Coqueiros — Great to live, weak to invest: old stock, scattered amenities, need a car.",
          "Centro (Florianopolis) — Growth, but not the coastal kind: not where tourism demand lives.",
          "Praia Brava (island, near Ingleses) — Right area, wrong horizon: 5-10yr timeline, pricey even early-stage.",
          "“Live here, don't invest here” — Weak rental demand, harder resale: Sambaqui, Joao Paulo, Cacupe, Ribeirao da Ilha, Lagoinha do Leste.",
          "The no-name developer trap — Completion risk, not location risk: Santinho, Rio Vermelho, Vargem Grande/Pequena, Saco dos Limoes — experienced buyers only.",
          "The common thread: headline appreciation rarely captures liquidity, completion risk, or whether real rental demand exists at the unit level. The gap between the spreadsheet and the situation on the ground is exactly what years living in the country — and an investor's eye rather than a seller's — are for."
        ],
      },
      {
        heading: "Methodology & Sources",
        paragraphs: [
          "Per-m2 prices — from active developer price lists (primary market), July 2026",
          "Official yield — FipeZAP (declared long-term leases)",
          "Real yield — calculated from actual entry prices and rental rates observed in Plan B's practice in Santa Catarina, net of furnishing, IPTU, condo fees, utilities, and management",
          "Rate R$5.15/USD as of 16.07.2026",
          "Ranges, not point figures: real yield depends on entry price, strategy, and management"
        ],
      }
      ],
    },
    ru: {
      sections: [
      {
        heading: "Официальная доходность занижает реальную в 2-3 раза",
        paragraphs: [
          "Официальная статистика доходности аренды в Санта-Катарине (FipeZAP) показывает 3,5-4,5% годовых. Эта цифра считает только задекларированную долгосрочную аренду и не видит краткосрочную сезонную сдачу, на которой в курортных районах и делаются деньги.",
          "FipeZAP считает только задекларированную долгосрочную аренду — не видит сезонную краткосрочную сдачу, на которой в курортных районах и делаются реальные деньги.",
          "Реальная чистая доходность — после всех затрат — составляет от 4-6% в пересыщенных сезонных районах до 10-14% в правильно подобранных объектах при активной краткосрочной сдаче. Валовые цифры обманчивы: значительную часть съедают меблировка, налоги и операционные расходы. Этот отчёт показывает всю цепочку — от валовой к чистой — и объясняет, где реальные деньги, а где красивая картинка."
        ],
      },
      {
        heading: "Таблица доходности по районам",
        paragraphs: [
          "Цены входа — для студии/1BR под сдачу, без учёта меблировки. Диапазоны доходности, а не точные значения: реальная цифра зависит от цены входа, стратегии сдачи и качества управления.",
          "Журере — курорт-премиум. Вход: ~$105k. Официальная доходность FipeZAP: 3,5%. Валовая: 18-22%. Чистая доходность: 10-14%. Стратегия: краткосрок, активно.",
          "Канасвиэйрас / Кашоэйра / Понта-дас-Канас — курорт + IT. Вход: ~$114-166k. Официальная доходность FipeZAP: ~4%. Валовая: 15-19%. Чистая доходность: 10-13%. Стратегия: краткосрок + айтишники.",
          "Инглезес — курорт-туса. Вход: ~$136k. Официальная доходность FipeZAP: 4,2%. Валовая: 13-16%. Чистая доходность: 7-10%. Стратегия: краткосрок, флип.",
          "Триндаде / Санта-Моника — университет. Вход: ~$68k. Официальная доходность FipeZAP: —. Валовая: 11-14%. Чистая доходность: 9-13%. Стратегия: долгосрок, круглый год.",
          "Кампече — номад. Вход: ~$120k+. Официальная доходность FipeZAP: —. Валовая: 12-15%. Чистая доходность: 7-10%. Стратегия: краткосрок, точечно.",
          "Бомбиньяс / Бомбас — курорт-сезон. Вход: ~$136k. Официальная доходность FipeZAP: —. Валовая: 7-9%. Чистая доходность: 4-6%. Стратегия: сезонность бьёт.",
          "Балнеариу-Камбориу — премиум-сезон. Вход: высокий. Официальная доходность FipeZAP: —. Валовая: 5-7%. Чистая доходность: 3-5%. Стратегия: только сезон.",
          "Итапема — перепродажа. Вход: высокий. Официальная доходность FipeZAP: —. Валовая: —. Чистая доходность: н/д. Стратегия: аренды нет, флип.",
          "Порту-Белу — долгий горизонт. Вход: средний. Официальная доходность FipeZAP: —. Валовая: —. Чистая доходность: н/д. Стратегия: перепродажа 10 лет+."
        ],
      },
      {
        heading: "Что стоит между валовой и чистой доходностью",
        paragraphs: [
          "Валовая доходность = годовой арендный доход / цена входа. Это цифра «с обложки», которую показывают продавцы. Реальная доходность инвестора — чистая, после затрат.",
          "Разовые затраты на старте: Меблировка и техника — +~20% к цене квартиры. Без этого курортная краткосрочная сдача невозможна. Чистая доходность считается от полной вложенной суммы — квартира плюс обстановка.",
          "Ежегодные операционные расходы: Кондоминиум — При краткосрочной сдаче платит владелец (при долгосрочной — жилец) IPTU (муниципальный налог) — ~R$1 500-1 800/год для студии/1BR Коммунальные (свет, вода) — При краткосроке на владельце, при долгосроке на жильце Управление и обслуживание — Уборка между гостями, комиссии площадок, управляющий: ~20% от дохода при краткосроке, ~8% при долгосроке",
          "Ключевой эффект: При краткосрочной сдаче владелец несёт кондоминиум, коммуналку и высокую операционку сам — поэтому разница ЧИСТОЙ доходности между краткосроком и долгосрочной арендой часто составляет лишь 2-3 процентных пункта, хотя валовая отличается вдвое. Краткосрок даёт больше — но и хлопот кратно больше.",
          "Налоги на доход от аренды и на прирост капитала при перепродаже здесь не учтены: они зависят от структуры владения (физлицо/юрлицо), резидентства и срока владения и рассчитываются индивидуально."
        ],
      },
      {
        heading: "О сезонности — применимо ко всему побережью",
        paragraphs: [
          "На большей части Флорианополиса и побережья календарь — главный фактор доходности.",
          "Высокий сезон (15 дек — 15 мар): Загрузка до ~95%. Пик внутри сезона: Рождество, Новый год, Карнавал. Низкий сезон (апр — ноя (9 месяцев)): Загрузка ~50% и ниже.",
          "Любую курортную покупку считайте по экономике всего года, а не по пиковым ставкам. Вне сезона многие собственники либо не сдают, либо пускают длинных жильцов за небольшие деньги.",
          "Это и есть источник разрыва со страницы 2: FipeZAP усредняет год целиком, включая девять «мёртвых» месяцев — реальные деньги делаются в узком окне 15 декабря — 15 марта, и именно эта концентрация превращает валовую доходность в чистую при правильном управлении краткосрочной сдачей.",
          "Данные по загрузке — собственные полевые оценки Plan B по фактическим бронированиям в курортных районах острова и материка, а не единый публикуемый индекс."
        ],
      },
      {
        heading: "Наблюдения по районам — Остров (Флорианополис)",
        paragraphs: [
          "Инглезес — История под перепродажу, не под пассивную сдачу. Вход: ~$136k. Чистая доходность: 7-10%. Загрузка: 95% пик / 50% вне сезона. Эпицентр аргентинского туризма, открытое море, формат активного отдыха. Группы, скидывающиеся на одну квартиру, повышают износ и нагрузку на управление. Сильный рост (~13-15%/год) — реальный тезис; аренда работает, но требует активного управления.",
          "Канасвиэйрас / Кашоэйра / Понта-дас-Канас — Наш фаворит — лучшая комбинация на острове. Вход: ~$114-166k. Чистая доходность: 10-13%. Загрузка: ~70% вне сезона (айтишники). Та же сезонная экономика, что в Инглезес, но спокойнее вода, семьи вместо групп. Sapiens Parque держит загрузку вне сезона за счёт долгих аккуратных арендаторов. Работает и под сдачу, и под перепродажу.",
          "Триндаде / Санта-Моника — Самые недооценённые — спрос от университета круглый год. Вход: ~$68k. Чистая доходность: 9-13%. Загрузка: ~80% круглый год. Образовательный, не сезонный профиль — UFSC и Полицейская академия дают структурный спрос. Нового предложения мало, проекты раскупаются за часы. Берите микро-жильё (15-30 м²). Ниже номинальная ставка — выше стабильность.",
          "Журере — Больше престиж, чем игра на доходность. Вход: от $105k (студии). Чистая доходность: 10-14%. Загрузка: 95% пик / 70% вне сезона. Интернасьонал — звёзды, иностранные деньги, космические цены. Традисьонал — доступнее, туда переливается рост. Классические застройщики здесь — дороже; входить точечно, под проект, не под имя района.",
          "Кампече — Уже перегрет — покупка ради образа жизни, не доходности. Вход: ~$120k+. Чистая доходность: 7-10%. Загрузка: 90% сезон / 60% вне. Номад-хаб, инфраструктура на ступень ниже Журере. Глиссада аэропорта в центре района, единственная дорога на въезд-выезд. Цена входа как в Журере при более слабой инфраструктуре — отнеслись бы осторожно, входить только под конкретный проект.",
          "Лагоа-да-Консейсау — известный район, но отдельного инвестиционного тезиса по нему у нас сейчас нет."
        ],
      },
      {
        heading: "Наблюдения по районам — Материковое побережье",
        paragraphs: [
          "Всё восходит к Балнеариу-Камбориу: земля там кончилась, застройщики двинулись в соседние города, цены пошли волной от BC наружу.",
          "Балнеариу-Камбориу (BC) — Бразильский Дубай — бенчмарк, не игра на доходность. Вход: высокий. Чистая доходность: 3-5%. Загрузка: ~50% (пустеет вне сезона). Самые высокие башни Латинской Америки, острая нехватка земли, метр до R$200 000. Формат сезонного присутствия, а не круглогодичной жизни — именно BC вытолкнул цены в города ниже.",
          "Прая-Брава (Итажаи) — Премиальный вход, оправдан на масштабе. Вход: $1M+. Горизонт: 5-10 лет. Драйвер роста: застройка «лесенкой» — вид на море у всех. Часть той же волны от BC, но с собственной фишкой: здания стоят «лесенкой» — 1-я линия ниже, дальше от моря выше, и вид на море есть у всех — в отличие от хаотичной 1-й линии BC. Именно сюда теперь идёт элита, выбирая Прая-Брава вместо суеты BC. Спрос здесь движим не арендной доходностью, а покупкой актива для сохранения капитала и роста — берут, чтобы владеть. Не путать с островной Прая-Брава.",
          "Итапема — Ставка на актив, не на сдачу. Вход: от $400k. Горизонт: 5-10 лет. Драйвер роста: близость к BC и Порту-Белу — волна цен от BC. Застройщики пришли из BC, цены быстро выросли на той же волне. Спрос здесь движим не арендной доходностью, а покупкой актива для сохранения капитала и роста — берут, чтобы владеть, не чтобы сдавать. Сейчас одна большая стройка.",
          "Переке — Реальный потенциал, горизонт 5-10 лет. Вход: $350-500k. Горизонт: 5-10 лет. Драйвер роста: близость к BC и Порту-Белу. Как Итапема, сейчас стройка — но с апсайдом: через 5-10 лет подтянется туризм (рядом Бомбиньяс, Прая-Гранди, Бомбас). Спрос здесь движим не арендной доходностью, а покупкой актива для сохранения капитала и роста — берут, чтобы владеть. Для терпеливых.",
          "Бомбиньяс / Бомбас / Прая-Гранди — Чистейшие пляжи, резко сезонные. Вход: ~$136k. Чистая доходность: 4-6%. Загрузка: ~30% вне сезона. Три пляжа с «Голубым флагом», качественный турпоток из Аргентины, Чили, Перу. Ставки умеренные; сезонность жёсткая и бьёт по чистой доходности. Честно закладывайте эту пустоту.",
          "Порту-Белу — «Город будущего» — очень длинный горизонт. Вход: $300-500k. Горизонт: 10 лет+. Драйвер роста: новые комфортные районы на 50-60 тыс. жителей, не «свечки». Строятся целые комфортные районы на 50-60 тыс. жителей, архитекторы мирового уровня, звёзды-инвесторы — не вертикальные башни как в BC. Спрос здесь движим не арендной доходностью, а покупкой актива для сохранения капитала и роста на горизонте минимум 10 лет — берут, чтобы владеть."
        ],
      },
      {
        heading: "Где мы бы проявили осторожность — личный взгляд практика",
        paragraphs: [
          "Это наше мнение на июль 2026 — не приговор по данным. Рынок Санта-Катарины меняется быстро. Мы формулируем это прямо — так, как объяснили бы инвестору с бюджетом $200-300k, потому что знать, где НЕ покупать, так же ценно, как знать, где покупать.",
          "Кокейрос — Жить — да, инвестировать — нет: старый фонд, инфраструктура разбросана, нужна машина.",
          "Центр (Флорипа) — Рост есть, но не курортный: не туда, где живёт турист-спрос.",
          "Прая-Брава (островная, рядом с Инглезес) — Правильное место, неправильный горизонт: 5-10 лет, дорого уже на ранней стадии.",
          "«Жить здесь, не инвестировать» — Слабый арендный спрос, тяжёлая перепродажа: Самбаки, Жоау-Паулу, Какупе, Рибейрау-да-Илья, Лагоинья-ду-Лесте.",
          "Ловушка ноунейм-застройщиков — Риск недостроя, не локации: Сантинью, Риу-Вермелью, Варжем-Гранди/Пекена, Сако-дос-Лимойнс — только для опытных.",
          "Общая нить: заголовочные цифры роста не отражают ликвидность, риск недостроя и реальный арендный спрос на уровне конкретной квартиры. Разрыв между таблицей и тем, что происходит на земле, — это ровно то, для чего нужны годы жизни в этой стране и взгляд инвестора, а не продавца."
        ],
      },
      {
        heading: "Методология и источники",
        paragraphs: [
          "Цены за м² — из действующих прайс-листов застройщиков (первичный рынок), июль 2026",
          "Официальная доходность — FipeZAP (задекларированная долгосрочная аренда)",
          "Реальная доходность — расчёт от реальных цен входа и арендных ставок, наблюдаемых в практике Plan B на рынке Санта-Катарины, с учётом меблировки, IPTU, кондоминиума, коммунальных и управления",
          "Курс R$5,15/USD на 16.07.2026",
          "Диапазоны, а не точные значения: реальная доходность зависит от цены входа, стратегии и качества управления"
        ],
      }
      ],
    },
  },
};
