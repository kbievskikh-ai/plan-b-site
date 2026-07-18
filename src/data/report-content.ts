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

  'oplata-kriptovalyutoy-nedvizhimost-braziliya': {
    en: {
      sections: [
        {
          heading: "The Short Version",
          paragraphs: [
            "Short answer: yes, you can pay for Brazilian real estate in cryptocurrency — but it's not as simple as \"send the wallet, get the keys.\" This is the most common question I get after \"how do I even transfer money to Brazil from abroad.\" Let's break down both options — based on a consultation with Dr. Wilian Campos (OAB/SC 50.897), WK International Services, Florianópolis.",
          ],
        },
        {
          heading: "Paying with Cryptocurrency — A Legal Option",
          paragraphs: [
            "Brazilian law doesn't explicitly prohibit using cryptocurrency in real estate transactions. In practice, it works under three conditions: (1) Documentation — the deal is properly structured legally, with full compliance support. (2) Price in Reais — the final property value is fixed in BRL directly in the purchase deed. (3) Source of Funds — the origin of the crypto assets can be documented.",
            "Crypto assets in Brazil are regulated by a dedicated law — Lei No. 14.478 of 21 December 2022. According to Dr. Campos, his firm has handled a case where a court upheld the validity of a real estate purchase contract paid in cryptocurrency — not a theoretical possibility, but a working precedent.",
            "Important to understand: this isn't a ready-made \"just send crypto\" template — every such deal requires individual legal structuring. This needs to be discussed with a lawyer beforehand, before the funds are sent, not after.",
            "Can a developer accept crypto payment directly? Legally, yes, under the same three conditions. In practice, not every developer is technically or organizationally ready for this — worth confirming on a project-by-project basis, not assuming it as a universal rule.",
          ],
        },
        {
          heading: "What About a Regular Transfer?",
          paragraphs: [
            "If crypto isn't the route, there's the classic banking path. \"Can I even transfer money to Brazil?\" is another common question, mixing two fears: international transfer restrictions and \"is this even legal.\" Both are overblown, for different reasons.",
            "The truth is simple: transferring money to Brazil is possible, through the ordinary banking system, without grey schemes. The issue isn't that it's impossible — it's that most articles on this topic are written by payment services that profit from \"workarounds\" and transit countries.",
          ],
        },
        {
          heading: "The Core Rule: Funds Move Through the Brazilian Banking System",
          paragraphs: [
            "Brazil doesn't prohibit foreigners from buying real estate or transferring funds for it. But the entire money trail must be traceable — this isn't a requirement aimed at you personally, it's the standard financial compliance framework that protects both buyer and seller.",
            "How a legal transfer works, step by step: (1) Get a CPF — Brazilian individual taxpayer ID. Without it you can't open an account or register a deal; usually the first step. (2) Open a Brazilian bank account — not always strictly mandatory, but practically necessary for the currency operation. (3) International wire transfer — from your bank to the Brazilian account, a standard international wire transfer. (4) Central Bank registration (RDE-IED) — incoming capital is registered, which confirms the funds' origin down the line.",
            "The bank and notary will ask you to show the source of funds — statements, income documents, prior asset sale contracts. This is standard AML/KYC procedure for any large transfer, not a specific obstacle for any particular nationality.",
          ],
        },
        {
          heading: "About Transfer Restrictions — What Actually Worries People",
          paragraphs: [
            "Restrictions on international transfers from certain banking systems are real, not a myth. But that's a restriction on the sending side — not a Brazilian ban on receiving funds from foreigners.",
            "The transfer route may require an intermediary bank or an account in a third jurisdiction — a matter of banking logistics, resolved case by case. That's not a \"grey scheme\": an international wire transfer with a transparent source of funds remains legal regardless of how many correspondent banks it physically passes through.",
          ],
        },
        {
          heading: "What Happens If You Go Around the System",
          paragraphs: [
            "Legal path: the bank processes the transaction without delays, the notary registers the deal immediately, full legal protection in a dispute, a transparent basis for a future sale or residency.",
            "Going around the system: the bank can block the transaction at any stage, the notary can refuse registration without a clear source of funds, proving the deal's terms in court becomes far harder, and there's a risk of losing both the money and the property.",
            "This is exactly why, as an advisor, I insist on a transparent structure — not because \"that's the rule,\" but because it's the only way to protect your money and your right to the property.",
          ],
        },
        {
          heading: "Costs on Top of the Transfer Amount",
          paragraphs: [
            "On purchase, beyond the property price: ITBI (property transfer tax) — 2–3% of the value, plus notary and registration fees. Total transaction costs are usually 4–6% of the property's value.",
          ],
        },
        {
          heading: "Bottom Line",
          paragraphs: [
            "Transferring money to buy real estate in Brazil is a solvable task with a transparent channel and a documented source of funds. Cryptocurrency is a legal alternative with proper legal structuring, backed by a real court precedent. Workarounds don't speed up the deal — they increase the risk of losing both the money and the property.",
            "Informational material, not legal advice. Facts confirmed by Dr. Wilian Campos (OAB/SC 50.897), WK International Services, July 2026.",
          ],
        },
      ],
    },
    ru: {
      sections: [
        {
          heading: "Коротко о главном",
          paragraphs: [
            "Короткий ответ: да, недвижимость в Бразилии можно оплатить криптовалютой — но не так просто, как «отправил кошелёк, получил ключи». Это самый частый вопрос, который мне задают после «а как вообще перевести деньги в Бразилию из России». Разложу оба варианта — по материалам консультации с Dr. Wilian Campos (OAB/SC 50.897), WK International Services, Флорианополис.",
          ],
        },
        {
          heading: "Оплата криптовалютой — легальная опция",
          paragraphs: [
            "Бразильское законодательство прямо не запрещает использование криптовалюты при сделках с недвижимостью. На практике это работает при трёх условиях: (1) Документирование — сделка правильно оформлена юридически, с полным комплаенс-сопровождением. (2) Цена в реалах — итоговая стоимость объекта зафиксирована в BRL непосредственно в акте купли-продажи. (3) Происхождение средств — источник криптоактивов может быть подтверждён документально.",
            "Криптоактивы в Бразилии регулируются отдельным законом — Lei № 14.478 от 21.12.2022. По словам Dr. Campos, в его практике уже был случай, где суд подтвердил юридическую силу договора купли-продажи недвижимости, оплаченной криптовалютой — это не теоретическая возможность, а рабочий прецедент.",
            "Важно понимать: это не готовый шаблон «просто отправь крипту» — каждая такая сделка требует индивидуальной юридической структуры. Обсуждать это с юристом нужно заранее, до того как деньги отправлены, а не после.",
            "Может ли застройщик принять оплату криптой напрямую? Юридически — да, при соблюдении тех же трёх условий. На практике не каждый застройщик к этому готов технически и организационно — это стоит уточнять по конкретному проекту, а не считать универсальным правилом.",
          ],
        },
        {
          heading: "А что с обычным переводом из России?",
          paragraphs: [
            "Если крипта не вариант — остаётся классический банковский путь. «Можно ли вообще перевести деньги в Бразилию из России?» — тоже частый вопрос, и в нём смешаны два страха: SWIFT-ограничения и «а вдруг это вообще незаконно». Оба преувеличены, но по разным причинам.",
            "Правда простая: перевести деньги в Бразилию можно, и делается это через обычную банковскую систему, без серых схем. Проблема не в том, что это невозможно — а в том, что большинство статей на эту тему пишут платёжные сервисы, которые зарабатывают на «обходе» и транзитных странах.",
          ],
        },
        {
          heading: "Главное правило: деньги идут через бразильскую банковскую систему",
          paragraphs: [
            "Бразилия не запрещает иностранцам покупать недвижимость и переводить для этого деньги. Но весь путь денег должен быть прослеживаемым — это требование не к вам лично, а общий стандарт финансового комплаенса, который защищает и покупателя, и продавца.",
            "Как проходит легальный перевод, шаги: (1) Получение CPF — бразильский налоговый номер физлица. Без него нельзя ни открыть счёт, ни зарегистрировать сделку; обычно первый шаг. (2) Банковский счёт в Бразилии — формально не всегда строго обязательно, но практически необходимо для валютной операции. (3) Международный перевод — из вашего банка на бразильский счёт, стандартный international wire transfer. (4) Регистрация в Центробанке (RDE-IED) — поступление капитала регистрируется, это подтверждает происхождение денег в будущем.",
            "Банк и нотариус попросят показать источник средств — выписки, документы о доходах, договоры продажи предыдущих активов. Это стандартная процедура AML/KYC для любого крупного перевода, а не специфическое препятствие для россиян.",
          ],
        },
        {
          heading: "Про SWIFT — то, что реально волнует людей",
          paragraphs: [
            "Ограничения на SWIFT-переводы из российских банков существуют, и это не миф. Но это ограничение на исходящей стороне — а не запрет со стороны Бразилии на приём денег от иностранцев.",
            "Маршрут перевода может требовать банка-посредника или счёта в третьей юрисдикции — это вопрос банковской логистики, решаемый индивидуально. Это не «серая схема»: international wire transfer с прозрачным источником средств остаётся легальным независимо от того, через сколько банков-корреспондентов он физически проходит.",
          ],
        },
        {
          heading: "Что происходит, если пойти в обход системы",
          paragraphs: [
            "Легальный путь: банк проводит операцию без задержек, нотариус регистрирует сделку сразу, полная юридическая защита при споре, прозрачная база для будущей продажи или резиденции.",
            "В обход системы: банк может заблокировать операцию на любом этапе, нотариус вправе отказать в регистрации без ясного источника средств, доказать условия сделки в суде значительно сложнее, риск остаться без денег и без объекта одновременно.",
            "Это ровно та причина, по которой я как советник настаиваю на прозрачной схеме — не потому что «так положено», а потому что это единственный способ защитить именно ваши деньги и ваше право на объект.",
          ],
        },
        {
          heading: "Расходы, которые идут поверх суммы перевода",
          paragraphs: [
            "При покупке, помимо стоимости объекта: ITBI (налог на переход права собственности) — 2–3% от стоимости, плюс нотариальные услуги и регистрация. Итоговые расходы на сделку обычно составляют 4–6% от стоимости недвижимости.",
          ],
        },
        {
          heading: "Что в итоге",
          paragraphs: [
            "Перевод денег для покупки недвижимости в Бразилии — решаемая задача при прозрачном канале и подтверждённом источнике средств. Криптовалюта — легальная альтернатива с реальным судебным прецедентом. Обходные схемы не ускоряют сделку — они увеличивают риск потерять и деньги, и объект.",
            "Информационный материал, не юридическая консультация. Факты подтверждены Dr. Wilian Campos (OAB/SC 50.897), WK International Services, июль 2026.",
          ],
        },
      ],
    },
  },

  'nalog-prodazha-nedvizhimost-braziliya': {
    en: {
      sections: [
        {
          heading: "The Short Version",
          paragraphs: [
            "\"How much will I owe the government if I sell my property in Brazil?\" — a question every investor asks sooner or later, and one that rarely gets a clear answer. Let's break it down — based on a consultation with Dr. Wilian Campos (OAB/SC 50.897), WK International Services, Florianópolis.",
          ],
        },
        {
          heading: "The Base Rate — Not Always a Flat 15%",
          paragraphs: [
            "Capital gains tax (ganho de capital, the tax on the difference between purchase and sale price) on real estate sales for individuals in Brazil is 15% of the gain — for most transactions. But the rate rises for larger gains, on a progressive scale: up to R$5M — 15%; R$5–10M — 17.5%; R$10–30M — 20%; over R$30M — 22.5%.",
            "For the vast majority of deals in Santa Catarina, the base 15% rate applies — the higher brackets only concern very large transactions.",
          ],
        },
        {
          heading: "The Reinvestment Exemption — What Almost No One Writes About",
          paragraphs: [
            "Brazilian law (Lei No. 11.196/2005) provides a mechanism for full exemption from this tax through reinvestment: you sell residential property in Brazil, you buy another residential property in Brazil within 180 days, and the result is full exemption from capital gains tax — 0% due.",
            "This isn't a special favor — it's part of the general tax code, available to any seller who reinvests according to the rules.",
            "Applicability depends on the details: the mechanism is real, but not automatic. Conditions depend on tax residency status (resident/non-resident), property classification (residential, not commercial), number of properties owned, holding period of the sold property, and documented source of funds.",
            "Before a transaction, it's worth discussing your situation with a tax advisor (contador, Brazilian tax consultant) — especially if you're not a Brazilian tax resident, since rules can differ for non-residents.",
          ],
        },
        {
          heading: "A Worked Example",
          paragraphs: [
            "You bought an apartment in Florianópolis for $200,000. A few years later, you sold it for $300,000. Capital gain: $100,000. Without exemption: 15% of the capital gain = $15,000 owed. With exemption, reinvested within 180 days: $0.",
            "The difference is a real $15,000 that stays with you, not the tax office.",
          ],
        },
        {
          heading: "Similar Reliefs Exist Elsewhere — Brazil Isn't Unique",
          paragraphs: [
            "Brazil: full exemption when reinvesting in property in Brazil within 180 days. Portugal: full exemption when reinvesting in a primary residence in the EU/EEA within 36 months. USA: $250k/$500k exclusion for a primary residence; tax deferral when reinvesting in an investment property (Section 1031).",
            "Why countries do this: governments don't want to tax someone who isn't extracting capital from the system — just moving it from one property to another within the country. The goal is to keep the market liquid: without the relief, people would hold onto old properties longer than needed just to avoid the tax. The exemption removes that distortion — it benefits the market as much as the seller.",
          ],
        },
        {
          heading: "The Annual Tax — IPTU",
          paragraphs: [
            "Separate from the sale tax — the annual municipal property tax IPTU (municipal property tax), paid regardless of sale. Typically 0.3–1.5% of the assessed value per year, varying by municipality.",
          ],
        },
        {
          heading: "Purchase Costs — For the Full Picture",
          paragraphs: [
            "If you're only planning a purchase — keep the one-off entry costs in mind too: ITBI (property transfer tax) — 2–3% of the value, plus notary and registration fees. Total transaction costs are usually 4–6% of the property's value.",
          ],
        },
        {
          heading: "Bottom Line",
          paragraphs: [
            "Selling real estate in Brazil is subject to a 15% capital gains tax (with progression for large amounts), but the law provides a legal way to avoid it — reinvesting in another residential property within 180 days. The exemption's applicability depends on your tax status — proper planning before purchase saves real money on sale.",
            "Informational material, not tax advice. Facts confirmed by Dr. Wilian Campos (OAB/SC 50.897), WK International Services, July 2026.",
          ],
        },
      ],
    },
    ru: {
      sections: [
        {
          heading: "Коротко о главном",
          paragraphs: [
            "«Сколько я заплачу государству, если продам квартиру в Бразилии?» — вопрос, который рано или поздно задаёт каждый инвестор, но почти никто не даёт на него внятного ответа. Разложу по фактам — на основе консультации с Dr. Wilian Campos (OAB/SC 50.897), WK International Services, Флорианополис.",
          ],
        },
        {
          heading: "Базовая ставка — не всегда плоские 15%",
          paragraphs: [
            "Налог на прирост капитала (ganho de capital, налог с разницы цены покупки и продажи) при продаже недвижимости для физлиц в Бразилии составляет 15% от разницы между ценой покупки и продажи — для большинства сделок. Но ставка растёт для крупных сумм прибыли, по прогрессивной шкале: до R$5 млн — 15%; R$5–10 млн — 17,5%; R$10–30 млн — 20%; свыше R$30 млн — 22,5%.",
            "Для подавляющего большинства сделок в Санта-Катарине актуальна базовая ставка 15% — повышенные проценты касаются только очень крупных сделок.",
          ],
        },
        {
          heading: "Льгота при реинвестировании — то, о чём почти никто не пишет",
          paragraphs: [
            "Бразильское законодательство (Lei № 11.196/2005) предусматривает механизм полного освобождения от этого налога при реинвестировании: продаёте жилую недвижимость в Бразилии, покупаете другую жилую недвижимость в Бразилии в течение 180 дней — и результат: полное освобождение от налога на прирост капитала, 0% к уплате.",
            "Это не льгота «для своих» — это часть общего налогового кодекса, доступная любому продавцу, который реинвестирует по правилам.",
            "Применимость зависит от деталей: механизм реальный, но не автоматический. Условия зависят от статуса налогового резидентства (резидент/нерезидент), классификации объекта (жилая, не коммерческая), количества объектов в собственности, срока владения проданным объектом и документального подтверждения источника средств.",
            "Перед сделкой стоит проговорить свою ситуацию с налоговым консультантом (contador, бразильский налоговый консультант) — особенно если вы не налоговый резидент Бразилии, потому что для нерезидентов правила могут отличаться.",
          ],
        },
        {
          heading: "Пример расчёта",
          paragraphs: [
            "Купили квартиру во Флорианополисе за $200 000. Через несколько лет продали за $300 000. Прирост капитала: $100 000. Без льготы: 15% с прироста капитала = $15 000 к уплате. С льготой, реинвестировано за 180 дней: $0.",
            "Разница — реальные $15 000, которые остаются у вас, а не у налоговой.",
          ],
        },
        {
          heading: "Где в мире есть похожие льготы — Бразилия не уникальна",
          paragraphs: [
            "Бразилия: полное освобождение при реинвестировании в жильё в Бразилии за 180 дней. Португалия: полное освобождение при реинвестировании в основное жильё в ЕС/ЕЭЗ за 36 месяцев. США: исключение $250k/$500k для основного жилья; отсрочка при реинвестировании в инвестобъект (Section 1031).",
            "Почему страны так делают: государство не хочет наказывать налогом того, кто не выводит капитал из системы, а просто перекладывает его из одной недвижимости в другую внутри страны. Цель — держать рынок ликвидным: без льготы люди держались бы за старое жильё дольше, чем нужно, просто чтобы не платить налог. Льгота снимает это искажение — выгодна не только продавцу, но и самому рынку.",
          ],
        },
        {
          heading: "Ежегодный налог — IPTU",
          paragraphs: [
            "Отдельно от налога с продажи — ежегодный муниципальный налог IPTU (муниципальный налог на недвижимость), который платится независимо от продажи. Обычно 0,3–1,5% от оценочной стоимости в год, зависит от муниципалитета.",
          ],
        },
        {
          heading: "Расходы при покупке — для полноты картины",
          paragraphs: [
            "Если вы только планируете покупку — держите в голове и разовые расходы на входе: ITBI (налог на переход права собственности) — 2–3% от стоимости, плюс нотариальные услуги и регистрация. Итого обычно 4–6% от стоимости недвижимости.",
          ],
        },
        {
          heading: "Что в итоге",
          paragraphs: [
            "Продажа недвижимости в Бразилии облагается налогом на прирост капитала 15% (с прогрессией на крупные суммы), но закон даёт легальный способ его избежать — реинвестирование в другую жилую недвижимость в течение 180 дней. Применимость льготы зависит от вашего налогового статуса — правильное планирование до покупки экономит реальные деньги при продаже.",
            "Информационный материал, не налоговая консультация. Факты подтверждены Dr. Wilian Campos (OAB/SC 50.897), WK International Services, июль 2026.",
          ],
        },
      ],
    },
  },

  'vnzh-braziliya-nedvizhimost': {
    en: {
      sections: [
        {
          heading: "The Short Version",
          paragraphs: [
            "Search \"Brazil residency through real estate\" and you'll find two flatly contradictory answers: some say it's impossible, others say buying an apartment puts a residency permit in your pocket. The truth, as usual, is in between — and far more specific than either claim.",
            "I work in real estate in Santa Catarina and get this question from clients regularly. To give a precise answer instead of forum hearsay, I discussed the entire procedure directly with an immigration lawyer — Dr. Wilian Campos (OAB/SC 50.897), WK International Services, Florianópolis. Everything below is his professional explanation, not my own interpretation of the law.",
          ],
        },
        {
          heading: "Yes, the visa is real — here's what it's called",
          paragraphs: [
            "The programme is officially the real estate investor residency permit (autorização de residência para investidor imobiliário), based on Resolução Normativa CNIg No. 36/2018 and the Migration Law No. 13.445/2017.",
            "This is NOT a separate \"golden passport\" and not instant citizenship. It's a residency visa that opens a multi-year, fully legal path to permanent residence and — eventually — citizenship.",
          ],
        },
        {
          heading: "How much you need to invest",
          paragraphs: [
            "South, Southeast, Center-West (includes Santa Catarina) — minimum R$1,000,000. Priority regions (North and Northeast) — minimum R$700,000.",
            "The funds must be your own foreign capital — a mortgage covering an amount below the threshold doesn't count; financing is only allowed above the minimum. The asset must be urban real estate, residential or commercial; rural land doesn't qualify. You can meet the threshold with one property or several — new build, resale, or off-plan.",
          ],
        },
        {
          heading: "The real timeline — and where everyone else gets it wrong",
          paragraphs: [
            "This is the part most often distorted: it's not \"buy → get permanent residency forever → passport in a couple of years.\" It's a multi-stage process: 4 years of temporary residency (issued after purchase and filing via MigranteWeb; sometimes issued for 2 years first, with renewal — a local Federal Police office practice, not a different rule), then permanent residency once investment is maintained and 14 days/2 years presence is confirmed (no Portuguese test), then +4 more years of continuous residence after obtaining PR before applying for naturalization.",
            "Total, purchase to passport: approximately 8 years — not \"4 years,\" as some sites claim.",
            "Key nuance: the formal requirement to keep your residency is just 14 days every 2 years. But when applying for citizenship, authorities assess \"effective continuity of residence\" — excessive absences can hurt a naturalization application even if the formal minimum was met. Residency status is flexible; the path to a passport requires real presence in the country.",
            "Accelerated paths exist — for example, marriage to a Brazilian citizen or the birth of a Brazilian child. These are discussed case by case.",
          ],
        },
        {
          heading: "Documents",
          paragraphs: [
            "Main applicant: passport, apostilled birth certificate, clean criminal record certificate (from the country of origin and any country of residence in the last 5 years, apostilled), marriage certificate (if applicable), proof of investment and title (registered at the Cartório de Registro de Imóveis — Real Estate Registry Office), bank confirmation of the transfer through the Brazilian financial system, government fees paid, application filed via MigranteWeb — the Ministry of Justice immigration filing portal.",
            "Family: passport, birth certificate, proof of relationship. Children can be included as dependents up to age 24 if financially dependent on the main applicant.",
          ],
        },
        {
          heading: "How the purchase works — step by step",
          paragraphs: [
            "1. Get a CPF (Brazilian individual taxpayer ID) — needed early, before the deal, the bank account, registration, and taxes. Usually the first step for a foreign investor.",
            "2. Open a Brazilian bank account — not always legally mandatory, but practically necessary for currency operations and registering capital with the Central Bank.",
            "3. Wire the funds — international transfer through the Brazilian financial system, registered with the Central Bank.",
            "4. Sign the deed (escritura, the notarized purchase deed) and register it at the Cartório de Registro de Imóveis.",
            "5. File for residency through the MigranteWeb system, with the full document package.",
          ],
        },
        {
          heading: "Costs that rarely get spelled out",
          paragraphs: [
            "On purchase: ITBI (property transfer tax) — 2–3% of the value, plus notary and registration fees. Total transaction costs are usually 4–6% of the property's value.",
            "On sale: capital gains tax — 15% for individuals. The law provides an exemption when reinvesting in another residential property in Brazil within the legal timeframe — conditions are case-specific, depending on tax residency, number of properties owned, and holding period.",
            "Annually: IPTU (municipal property tax), typically 0.3–1.5% of the assessed value, varying by municipality.",
          ],
        },
        {
          heading: "Paying with cryptocurrency — possible, not simple",
          paragraphs: [
            "Brazilian law doesn't explicitly prohibit using cryptocurrency in real estate transactions. In practice it's possible if the deal is properly documented, the price is fixed in reais (BRL) in the deed, and the source of funds can be demonstrated.",
            "Crypto assets are regulated by a dedicated law — Lei No. 14.478 of 21 December 2022. According to Dr. Campos, his firm has handled a case where a court upheld the validity of a real estate purchase contract paid in cryptocurrency — a practical precedent. Every such deal requires individual legal structuring and compliance review.",
          ],
        },
        {
          heading: "SPE (Sociedade de Propósito Específico) — buying through a legal entity",
          paragraphs: [
            "An SPE (Sociedade de Propósito Específico) is a legal entity set up for a specific investment project. Used for liability segregation and joint investment.",
            "Pros: liability segregation, convenient for multiple investors, tax organization. Cons: extra accounting and compliance, upkeep costs, a more complex tax structure. Can potentially be used for investment residency too, but requires analysis against Ministry of Justice and Central Bank requirements.",
          ],
        },
        {
          heading: "Bottom line",
          paragraphs: [
            "Brazil residency through real estate is a real, legal mechanism — but not a fast or automatic one. The threshold for Santa Catarina is from R$1,000,000. The path to residency is 4 years of temporary status. The path to citizenship is another +4 years after PR, roughly 8 years total. Presence requirements are formally flexible, but citizenship requires a genuine connection to the country.",
            "If any of this sounds more complicated than what other sites promise, it's because we're not trying to sell you a visa in one click. We're explaining how it actually works, with a lawyer who runs these cases every day.",
            "This material is for informational purposes only and does not constitute legal advice. Immigration law and its application can change; for guidance on your specific case, consult a licensed attorney. Facts provided by Dr. Wilian Campos (OAB/SC 50.897), WK International Services, July 2026.",
          ],
        },
      ],
    },
    ru: {
      sections: [
        {
          heading: "Коротко о главном",
          paragraphs: [
            "Если погуглить «ВНЖ Бразилии через недвижимость», можно найти два прямо противоположных ответа: одни пишут, что это невозможно, другие — что достаточно купить квартиру и вид на жительство у вас в кармане. Правда, как обычно, посередине, и она гораздо конкретнее, чем оба этих утверждения.",
            "Я работаю с недвижимостью в Санта-Катарине и регулярно получаю этот вопрос от клиентов. Чтобы дать точный ответ, а не пересказ форумных слухов, я обсудил всю процедуру напрямую с адвокатом по иммиграционному праву — Dr. Wilian Campos (OAB/SC 50.897), WK International Services, Флорианополис. Всё, что написано ниже, — его профессиональные разъяснения, а не моя интерпретация закона.",
          ],
        },
        {
          heading: "Да, виза существует — вот как она называется",
          paragraphs: [
            "Программа официально называется виза для инвестора через недвижимость (autorização de residência para investidor imobiliário), правовая база — Resolução Normativa CNIg № 36/2018 и Lei de Migração № 13.445/2017.",
            "Это НЕ отдельный «золотой паспорт» и не мгновенное гражданство. Это резидентская виза, открывающая многолетний, но полностью легальный путь к постоянному проживанию и — в перспективе — к гражданству.",
          ],
        },
        {
          heading: "Сколько нужно вложить",
          paragraphs: [
            "Юг, юго-восток, центрально-запад (включая Санта-Катарину) — минимум R$1 000 000. Приоритетные регионы (север и северо-восток) — минимум R$700 000.",
            "Деньги должны быть собственным иностранным капиталом — ипотека на сумму ниже порога не засчитывается; кредит допустим только сверх минимума. Объект — городская недвижимость, жилая или коммерческая; сельская земля не подходит. Можно закрыть порог одним объектом или несколькими — новостройкой, вторичкой или на стадии строительства.",
          ],
        },
        {
          heading: "Реальная схема — и вот тут начинается путаница у всех остальных",
          paragraphs: [
            "Чаще всего искажают именно это: это не «купил → получил ВНЖ навсегда → через пару лет паспорт». Схема многоступенчатая: 4 года временной резиденции (выдаётся после покупки и подачи через MigranteWeb; иногда сначала на 2 года с продлением — практика конкретного отделения, не другое правило), затем ПМЖ при сохранённой инвестиции и присутствии от 14 дней/2 года (без теста на португальский), затем ещё +4 года непрерывного проживания после получения ПМЖ перед подачей на натурализацию.",
            "Итого от покупки до паспорта: ~8 лет — а не «4 года», как пишут некоторые сайты.",
            "Важный нюанс: формальное требование для сохранения резиденции — всего 14 дней за 2 года. Но при подаче на гражданство власти оценивают «эффективную непрерывность проживания» — избыточные отлучки могут повредить натурализации, даже если формальный минимум соблюдён. Резидентский статус гибкий, путь к паспорту требует реального присутствия в стране.",
            "Есть ускоренные сценарии — например, брак с гражданином/гражданкой Бразилии или рождение ребёнка-бразильца. Обсуждается индивидуально.",
          ],
        },
        {
          heading: "Документы",
          paragraphs: [
            "Основной заявитель: загранпаспорт, апостилированное свидетельство о рождении, справка о несудимости (из страны происхождения и стран проживания за 5 лет, апостилированная), документ о браке (если применимо), подтверждение инвестиции и права собственности (зарегистрировано в Cartório de Registro de Imóveis — Реестр недвижимости), банковское подтверждение перевода через бразильскую систему, оплата госпошлин, подача через MigranteWeb — портал Минюста для миграционных заявок.",
            "Семья: паспорт, свидетельство о рождении, документы о родстве. Дети включаются как иждивенцы до 24 лет при финансовой зависимости от заявителя.",
          ],
        },
        {
          heading: "Как проходит покупка — шаги",
          paragraphs: [
            "1. Получение CPF (бразильский налоговый номер физлица) — требуется на раннем этапе, до сделки, счёта, регистрации, налогов. Обычно первый шаг для иностранного инвестора.",
            "2. Банковский счёт в Бразилии — формально не всегда обязателен, но практически необходим для валютных операций и регистрации капитала в Центробанке.",
            "3. Перевод средств — международный перевод через бразильскую финансовую систему, с регистрацией в Центробанке.",
            "4. Сделка (escritura — акт купли-продажи у нотариуса) и регистрация в Cartório de Registro de Imóveis.",
            "5. Подача на резиденцию через систему MigranteWeb, с полным пакетом документов.",
          ],
        },
        {
          heading: "Расходы, о которых редко пишут прямо",
          paragraphs: [
            "При покупке: ITBI (налог на переход права собственности) — 2–3% от стоимости, плюс нотариальные услуги и регистрация. Итоговые расходы на сделку обычно 4–6% от стоимости объекта.",
            "При продаже: налог на прирост капитала — 15% для физлиц. Закон предусматривает освобождение при реинвестировании в другую жилую недвижимость в Бразилии в установленный срок — условия индивидуальны, зависят от налогового резидентства, числа объектов и срока владения.",
            "Ежегодно: IPTU (муниципальный налог на недвижимость), обычно 0,3–1,5% от оценочной стоимости, зависит от муниципалитета.",
          ],
        },
        {
          heading: "Оплата криптовалютой — можно, но не так просто",
          paragraphs: [
            "Бразильское законодательство прямо не запрещает использование криптовалюты в сделках с недвижимостью. На практике это возможно, если сделка правильно задокументирована, стоимость зафиксирована в реалах (BRL) в акте, а происхождение средств может быть подтверждено.",
            "Криптоактивы регулируются отдельным законом — Lei № 14.478 от 21.12.2022. По словам Dr. Campos, в его практике уже был случай, где суд подтвердил юридическую силу договора купли-продажи недвижимости, оплаченной криптовалютой — практический прецедент. Каждая такая сделка требует индивидуальной юридической структуры и комплаенс-проверки.",
          ],
        },
        {
          heading: "SPE (Sociedade de Propósito Específico) — покупка через юрлицо",
          paragraphs: [
            "SPE (Sociedade de Propósito Específico) — юрлицо под конкретный инвестиционный проект. Используется для сегрегации ответственности и совместных инвестиций.",
            "Плюсы: разделение ответственности, удобство для нескольких инвесторов, налоговая организация. Минусы: дополнительная бухгалтерия и комплаенс, издержки на содержание, более сложная налоговая структура. Может использоваться и для инвестиционной резиденции, но требует анализа на соответствие требованиям Минюста и Центробанка.",
          ],
        },
        {
          heading: "Что в итоге",
          paragraphs: [
            "ВНЖ Бразилии через недвижимость — реальный и легальный механизм, но не быстрый и не автоматический. Порог для Санта-Катарины — от R$1 000 000. Путь к резиденции — 4 года временного статуса. Путь к гражданству — ещё +4 года после ПМЖ, итого ориентировочно 8 лет. Присутствие формально гибкое, но для гражданства важна реальная связь со страной.",
            "Если что-то из написанного звучит сложнее, чем обещают другие сайты, — это потому, что мы не пытаемся продать вам визу за один клик. Мы объясняем, как это работает на самом деле, с адвокатом, который проводит эти процессы каждый день.",
            "Материал носит информационный характер и не является юридической консультацией. Иммиграционное законодательство и его правоприменение могут меняться; для актуальной консультации по вашему случаю обращайтесь к лицензированному адвокату. Данные предоставлены Dr. Wilian Campos (OAB/SC 50.897), WK International Services, июль 2026.",
          ],
        },
      ],
    },
  },

  'gde-kupit-nedvizhimost-braziliya': {
    en: {
      sections: [
        {
          heading: "The Short Version",
          paragraphs: [
            "Rio de Janeiro and São Paulo are the two names the whole world knows. If someone can name a single Brazilian city, it's almost always one of these two. So the natural first question is: \"Should I buy in Rio or São Paulo?\" But that's the wrong question. The right one is \"where does the investment actually perform better\" — and the answer is less obvious than it seems.",
          ],
        },
        {
          heading: "Safety — and There's an Honest Surprise Here",
          paragraphs: [
            "Per Atlas da Violência 2026 (official Brazilian homicide statistics, per 100,000 residents, 2024): Florianópolis — 9.7–12. São Paulo (city) — 15.3. Rio (state) — ~27–28.",
            "Honestly, without smoothing it over: São Paulo isn't \"a second Rio\" on safety. The city is notably safer than commonly assumed, and statistically closer to the southern cities than to Rio. Flattening them into a single \"both are dangerous, flee south\" narrative would be dishonest. Rio, however, genuinely is statistically more dangerous than both.",
            "Florianópolis remains in a league of its own — nearly twice as safe as São Paulo and 2.5–3x safer than Rio.",
          ],
        },
        {
          heading: "Prices, Growth, Yield — Per FipeZAP Data",
          paragraphs: [
            "Itapema — $2.9K/m², +5.25% 12-month growth, yield n/a, #1 of 56 nationally. Balneário Camboriú — $2.9K/m², +2.13% growth, 4.2% yield, #2. Florianópolis — $2.6K/m², +8.29% growth, 5.7% yield, #4. São Paulo — $2.3K/m², +3.84% growth, 5.9% yield, #7. Rio de Janeiro — $2.1K/m², +4.37% growth, 3.8% yield, #10.",
            "This isn't one lucky city — Santa Catarina holds three of the top four spots nationally. Itapema is #1, Balneário Camboriú #2, Florianópolis #4. A structural pattern across the whole southern coast, not a single outlier on the map.",
            "Itapema deserves a note: it's primarily a resale market, not a long-term rental play (hence the \"n/a\" on yield) — it's riding the wave of Balneário Camboriú's expansion, where land has run out. Florianópolis, meanwhile, has the fastest stable growth rate of all — roughly double both metros, and it's holding steady rather than spiking once.",
          ],
        },
        {
          heading: "Not Just About Money — Why the Market Is Actually Growing",
          paragraphs: [
            "The south's growth isn't a baseless bubble. Three structural factors sustain the trend.",
            "Geographic scarcity: Florianópolis island is geographically constrained — only about 12% of the island's area is available for new development under the 2024 master plan. A similar coastal-land scarcity applies to the Bombinhas/Porto Belo/Balneário Camboriú corridor.",
            "The tech sector: Florianópolis has the highest GDP per capita among Brazilian state capitals, home to 900+ tech companies. Remote workers and digital nomads sustain year-round rental demand, not just a tourist-season spike.",
            "International accessibility: growing direct flight connectivity is expanding the buyer pool — this isn't an isolated market for domestic tourists anymore, it's increasingly international.",
          ],
        },
        {
          heading: "Cost of Living — Honestly, Without Bending the Conclusion",
          paragraphs: [
            "Per Numbeo's cost-of-living index (including rent): Rio de Janeiro is the lowest cost of the three — ~4–5% cheaper than Florianópolis, ~12% cheaper than São Paulo. Florianópolis sits in the middle — ~8% cheaper than São Paulo, ~4–5% pricier than Rio. São Paulo is the highest — ~8% pricier than Florianópolis, ~12% pricier than Rio.",
            "Honest takeaway: São Paulo is the most expensive of the three for day-to-day living, Rio the most affordable, Florianópolis in between. This is a separate metric from property price per m² (where Florianópolis is pricier than Rio) — don't confuse \"expensive to live\" with \"expensive to buy.\"",
          ],
        },
        {
          heading: "Human Development Index — the Same Picture, Different Numbers",
          paragraphs: [
            "The Municipal Human Development Index (IDHM, official IBGE/UNDP data, 2010 census — the last full city-level calculation) confirms the earlier tables through an independent method: Florianópolis 0.847 (Very high — among the nation's leaders), São Paulo 0.805 (Very high), Rio de Janeiro 0.799 (High).",
            "Three independent metrics — safety, real estate economic growth, and now the overall development index — point the same direction.",
          ],
        },
        {
          heading: "Education — Honestly: São Paulo Is Objectively Stronger Here",
          paragraphs: [
            "There's no point bending facts to fit a tidy narrative. São Paulo is Brazil's undisputed leader in higher education: USP (Universidade de São Paulo) is the country's top university and one of the strongest in Latin America, with an enormous range of programs and research capacity. Rio offers UFRJ and PUC-Rio — also strong, particularly in the humanities and engineering.",
            "Florianópolis doesn't compete on scale in this comparison — but UFSC (Universidade Federal de Santa Catarina) holds solid national rankings, especially in engineering and technical fields, and it's the institution around which the city's tech cluster grew. For families with school-age children, Florianópolis's international-school infrastructure is smaller than the metros', but growing alongside the expat influx.",
          ],
        },
        {
          heading: "Healthcare — Each City Has Its Own Strength",
          paragraphs: [
            "São Paulo: the country's largest concentration of world-class private clinics, the widest choice of specialists, JCI international accreditation at several hospitals. Objectively Brazil's strongest medical infrastructure.",
            "Rio de Janeiro: strong private healthcare with a reputation for a personalized, family-oriented approach — frequently cited by foreign patients specifically for the quality of personal service, combined with a beachside setting.",
            "Florianópolis: fewer specialized clinics than the metros, but notably lower cost, a calmer environment, and a growing base catering to foreign residents. A trade-off between price and depth of specialization, not a race for maximum infrastructure.",
          ],
        },
        {
          heading: "Birthright Citizenship — a Fact of Brazilian Law",
          paragraphs: [
            "Brazil's constitution enshrines jus soli — unconditional citizenship by birth on Brazilian soil, regardless of the parents' nationality. This isn't a benefit \"for the select few\" — it's a constitutional rule that applies to everyone, including foreigners. A child born in Brazil becomes a citizen automatically, with the right to dual citizenship (Brazil recognizes dual nationality).",
            "This also opens a residency path for the parents — through family reunification, with accelerated naturalization after 1 year instead of the standard multi-year track. For a full breakdown of the visa and immigration mechanisms, including investment residency, see our separate article on Brazil residency through real estate.",
            "From the standpoint of choosing a city for foreign families to give birth: São Paulo leads on the number of specialists and medical infrastructure, Rio is known for personalized private service, and Florianópolis offers lower cost and a calmer environment with an already-adequate base of private clinics.",
          ],
        },
        {
          heading: "Tourism and Beaches — the Biggest Gap of All",
          paragraphs: [
            "Under the Blue Flag programme (the international standard for beach quality — water treatment, safety, environmental management, service) Brazil earned 60 certifications for the 2025/2026 season. Santa Catarina — 31 (more than half the national total). Rio de Janeiro — 19. São Paulo — 4.",
            "This isn't a one-off advantage — Santa Catarina has held this lead consistently, year after year. Rio, meanwhile, remains a globally recognized brand — Copacabana and Ipanema, Carnival, status. That's a real asset for a lifestyle investor who values international name recognition. But on the objective quality of beach infrastructure and environmental management — which is what drives resort-rental income for years to come — the south outpaces both metros by a wide margin.",
          ],
        },
        {
          heading: "The Tech Sector and Digital Nomads — a Structural Advantage for the South",
          paragraphs: [
            "Florianópolis doesn't just \"have tech companies\" — a full cluster has formed around the Sapiens Parque technology park, one economists call \"Brazil's Silicon Valley.\" That's not a marketing cliché — 900+ tech companies and the highest GDP per capita among Brazilian state capitals back it up with numbers.",
            "The practical consequence for a real estate investor: rental demand in the island's northern districts (near the tech park) doesn't drop off in winter the way it does in purely touristic zones — tech company employees live there year-round, not just in season.",
          ],
        },
        {
          heading: "Infrastructure and Global Connectivity",
          paragraphs: [
            "Florianópolis isn't a resort village off the beaten path: the airport (FLN) surpassed 1 million international passengers in 2025, with direct flights to Buenos Aires, Santiago, Lima, and seasonal routes to Miami and Lisbon. 900+ tech companies in the city sustain year-round rental demand beyond the tourist season — not just \"a resort in summer, empty in winter.\" Navegantes airport separately serves the Camboriú/Itapema/Porto Belo corridor.",
          ],
        },
        {
          heading: "Three City Profiles — Short and Honest",
          paragraphs: [
            "Rio de Janeiro: Brazil's most recognized global brand, a huge market, the lowest cost of living of the three, cultural weight. Downside: notably higher violent crime (statistically) and the lowest rental yield in this comparison (3.8%).",
            "São Paulo: the country's business center, the highest market liquidity, a safety reputation better than commonly assumed. Downside: the highest cost of living of the three, modest property price growth (+3.84%) relative to the south.",
            "Florianópolis and the Southern SC Corridor: the best combination across every metric at once — safest, one of the fastest-growing on price (+8.29%), comparable or higher yield, growing year-round demand from the tech sector. Downside: a smaller market by volume — liquidity on a quick resale is lower.",
          ],
        },
        {
          heading: "Illustration: How the Growth-Rate Gap Compounds Over 5 Years",
          paragraphs: [
            "Take an illustrative $200,000 purchase in each city and apply the current annual growth rate (simple compounding, excluding rental income) — to show how a difference in growth percentage translates into a real dollar gap over 5 years: Florianópolis +8.29%/yr → ~$297,000 (+$97,000 gain). São Paulo +3.84%/yr → ~$241,000 (+$41,000 gain). Rio de Janeiro +4.37%/yr → ~$247,000 (+$47,000 gain).",
            "Important caveat: this is an illustrative calculation based on the current 12-month trend, projected forward through simple compounding — not a guarantee or a forecast. Actual performance depends on macroeconomics, the specific property, and district. The calculation shows the mechanics of how a growth-rate gap compounds into a dollar gap — not a promise of results.",
            "Even before rental income — which in Florianópolis is also at least comparable to the metros (see the table above) — the growth-rate gap compounds into a more than double difference in capital gain over 5 years between the southern coast and Rio.",
          ],
        },
        {
          heading: "The Final Scorecard — Every Metric at Once",
          paragraphs: [
            "Summary across 8 metrics — Rio / São Paulo / Florianópolis-South: Safety — Lower / Middle / Leader. Property price growth — Middle / Lower / Leader. Rental yield — Lower / High / High. Cost of living — Lowest / Highest / Middle. IDHM (development) — High / Very high / Very high, leader. Higher education — Strong / Strongest nationally / Niche (tech). Healthcare — Strong, personal / Strongest nationally / Price-quality trade-off. Market liquidity — High / Highest / Lower.",
            "The south doesn't win on everything — liquidity and the depth of healthcare/education are objectively higher in the metros. But for an investor whose priority is capital growth, yield, safety, and quality of life, rather than the widest choice of specialists or instant resale, the balance clearly tilts south.",
          ],
        },
        {
          heading: "What an Investor Loses by Choosing on Name Recognition Alone",
          paragraphs: [
            "Rio and São Paulo win on a factor not shown in the tables above — liquidity and market size. More listings, more buyers, an easier quick resale. For large institutional capital or short-term speculation, that's a real argument. But if the horizon isn't \"sell in six months\" but \"invest for years\" — the picture shifts toward the south on nearly every other metric.",
          ],
        },
        {
          heading: "Bottom Line",
          paragraphs: [
            "Rio de Janeiro and São Paulo remain the country's largest and most recognized markets — a real advantage for liquidity-driven strategies. But on the metrics that matter for a medium-term investor — price growth, yield, safety, cost of ownership, year-round demand — the Santa Catarina corridor wins on most measures. Not because Rio and São Paulo are equally risky — São Paulo has largely outgrown that reputation — but on growth and yield numbers, the south outperforms both.",
            "Informational material, not investment advice. Safety data — Atlas da Violência 2026. Price and yield data — Índice FipeZAP, June 2026. Cost of living — Numbeo, 2026.",
          ],
        },
      ],
    },
    ru: {
      sections: [
        {
          heading: "Коротко о главном",
          paragraphs: [
            "Рио-де-Жанейро и Сан-Паулу — два имени, которые знает весь мир. Если человек вообще может назвать город в Бразилии, это почти всегда один из них. Логично, что первый вопрос инвестора звучит так: «Покупать в Рио или в Сан-Паулу?» Но это неправильный вопрос. Правильный — «где на самом деле выгоднее», и ответ на него менее очевиден, чем кажется.",
          ],
        },
        {
          heading: "Безопасность — и здесь есть честная неожиданность",
          paragraphs: [
            "По данным Atlas da Violência 2026 (официальная бразильская статистика убийств на 100 тысяч населения, 2024 год): Флорианополис — 9,7–12. Сан-Паулу (город) — 15,3. Рио (штат) — ~27–28.",
            "Честно, без сглаживания: Сан-Паулу — не «второй Рио» по опасности. Город заметно безопаснее, чем принято думать, и статистически ближе к южным городам, чем к Рио. Уравнивать их ради красивого «бегите оба на юг» было бы нечестно. А вот Рио — да, статистически заметно опаснее обоих.",
            "Флорианополис при этом остаётся вне конкуренции — почти вдвое безопаснее Сан-Паулу и в 2,5–3 раза безопаснее Рио.",
          ],
        },
        {
          heading: "Цены, рост, доходность — по данным FipeZAP",
          paragraphs: [
            "Итапема — $2,9K/м², рост за 12 мес +5,25%, доходность н/д, #1 из 56 по стране. Балнеариу-Камбориу — $2,9K/м², рост +2,13%, доходность 4,2%, #2. Флорианополис — $2,6K/м², рост +8,29%, доходность 5,7%, #4. Сан-Паулу — $2,3K/м², рост +3,84%, доходность 5,9%, #7. Рио-де-Жанейро — $2,1K/м², рост +4,37%, доходность 3,8%, #10.",
            "Это не случайность одного города — три из четырёх лучших позиций рейтинга занимает Санта-Катарина. Итапема на первом месте, Балнеариу-Камбориу на втором, Флорианополис на четвёртом. Структурная особенность всего южного побережья, а не разовый успех одной точки на карте.",
            "Итапема стоит отдельного комментария: это преимущественно рынок под перепродажу, а не долгосрочную сдачу в аренду (отсюда «н/д» в колонке доходности) — этот город растёт на волне расширения Балнеариу-Камбориу, где земля уже закончилась. Флорианополис при этом растёт быстрее всех по темпу — вдвое быстрее обоих мегаполисов, и делает это стабильно, а не на разовом скачке.",
          ],
        },
        {
          heading: "Не только про деньги — почему рынок вообще растёт",
          paragraphs: [
            "Рост юга — не спекулятивный пузырь без причины. Три структурных фактора держат тренд.",
            "Географический дефицит: остров Флорианополис ограничен географически — под новую застройку доступно всего около 12% территории острова (генплан 2024 года). Аналогичный дефицит прибрежной земли — на всём коридоре Бомбиньяс/Порту-Белу/Балнеариу-Камбориу.",
            "Технологический сектор: Флорианополис — крупнейший ВВП на душу населения среди столиц штатов Бразилии, дом для 900+ технологических компаний. Удалённые работники и цифровые кочевники создают спрос на аренду весь год, а не только в туристический сезон.",
            "Международная доступность: растущее прямое авиасообщение расширяет пул покупателей — это не изолированный рынок для внутреннего туриста, а всё более интернациональный.",
          ],
        },
        {
          heading: "Стоимость жизни — честно, без подгонки под вывод",
          paragraphs: [
            "По данным Numbeo (индекс стоимости жизни, включая аренду): Рио-де-Жанейро — самая низкая стоимость жизни из трёх, ~4–5% дешевле Флорианополиса, ~12% дешевле Сан-Паулу. Флорианополис — посередине, ~8% дешевле Сан-Паулу, ~4–5% дороже Рио. Сан-Паулу — самая высокая, ~8% дороже Флорианополиса, ~12% дороже Рио.",
            "Честный вывод: Сан-Паулу — самый дорогой из трёх для повседневной жизни, Рио — самый доступный, Флорианополис — посередине. Это отдельная метрика от цены недвижимости за м² (там Флорианополис дороже Рио) — не путайте «дорого жить» и «дорого купить».",
          ],
        },
        {
          heading: "Индекс человеческого развития — та же картина, другими цифрами",
          paragraphs: [
            "Муниципальный индекс человеческого развития (IDHM, официальные данные IBGE/ПРООН, перепись 2010 — последний полный расчёт на уровне городов) подтверждает предыдущие таблицы независимым способом: Флорианополис 0,847 (Очень высокий — один из лидеров страны), Сан-Паулу 0,805 (Очень высокий), Рио-де-Жанейро 0,799 (Высокий).",
            "Три независимых метрики — безопасность, экономический рост недвижимости, и теперь общий индекс развития — указывают в одну сторону.",
          ],
        },
        {
          heading: "Образование — честно: Сан-Паулу здесь объективно сильнее",
          paragraphs: [
            "Здесь нет смысла подгонять факты под общий нарратив. Сан-Паулу — безусловный лидер Бразилии по высшему образованию: университет USP (Universidade de São Paulo) — лучший вуз страны и один из сильнейших в Латинской Америке, с огромным выбором специальностей и исследовательской базой. Рио предлагает UFRJ и PUC-Rio — тоже сильные, особенно в гуманитарных и инженерных направлениях.",
            "Флорианополис в этом сравнении не претендует на объём — но UFSC (Universidade Federal de Santa Catarina) занимает прочные позиции в национальных рейтингах, особенно в инженерии и технических специальностях, и именно вокруг неё вырос технологический кластер города. Для семей с детьми школьного возраста инфраструктура международных школ в Флорианополисе меньше, чем в мегаполисах, но растёт вместе с притоком экспатов.",
          ],
        },
        {
          heading: "Медицина — у каждого города своя сильная сторона",
          paragraphs: [
            "Сан-Паулу: крупнейшая концентрация частных клиник мирового уровня в стране, максимальный выбор узких специалистов, международная аккредитация JCI у ряда госпиталей. Объективно сильнейшая медицинская инфраструктура Бразилии.",
            "Рио-де-Жанейро: сильная частная медицина с репутацией персонализированного, семейно-ориентированного подхода — нередко упоминается иностранными пациентами именно за качество личного сервиса, в сочетании с расположением у моря.",
            "Флорианополис: меньше специализированных клиник, чем в мегаполисах, но заметно ниже стоимость, спокойная обстановка, растущая база под запросы иностранных резидентов. Компромисс между ценой и качеством, а не гонка за максимальной инфраструктурой.",
          ],
        },
        {
          heading: "Гражданство по праву рождения — факт бразильского права",
          paragraphs: [
            "Бразильская конституция закрепляет принцип jus soli — безусловное гражданство по факту рождения на территории страны, независимо от гражданства родителей. Это не льгота «для избранных» — это конституционная норма, действующая для всех, включая иностранцев. Ребёнок, рождённый в Бразилии, становится гражданином автоматически, с правом на второе гражданство (Бразилия признаёт двойное гражданство).",
            "Это также открывает путь к резиденции для родителей — по линии воссоединения семьи, с ускоренной натурализацией через 1 год вместо стандартных нескольких лет. Подробный разбор визовых и миграционных механизмов, включая инвестиционную резиденцию, — в нашей отдельной статье про ВНЖ Бразилии через недвижимость.",
            "С точки зрения выбора города для родов иностранными семьями: Сан-Паулу лидирует по числу специалистов и медицинской инфраструктуре, Рио известен персонализированным частным сервисом, Флорианополис — более низкой стоимостью и спокойной средой при уже достаточной базе частных клиник.",
          ],
        },
        {
          heading: "Туризм и пляжи — здесь разрыв самый большой",
          paragraphs: [
            "По программе Blue Flag (международный стандарт качества пляжей — водоочистка, безопасность, экология, сервис) в сезоне 2025/2026 Бразилия получила 60 сертификатов. Санта-Катарина — 31 (более половины всех в стране). Рио-де-Жанейро — 19. Сан-Паулу — 4.",
            "Это не разовое преимущество — Санта-Катарина держит лидерство стабильно из года в год. При этом Рио остаётся всемирно узнаваемым брендом — Копакабана и Ипанема, карнавал, статус. Это реальный актив для лайфстайл-инвестора, которому важен международный вес адреса. Но по объективному качеству пляжной инфраструктуры и экологии — а это то, что определяет курортную доходность на годы вперёд — юг обходит оба мегаполиса с большим отрывом.",
          ],
        },
        {
          heading: "IT-сектор и цифровые кочевники — структурное преимущество юга",
          paragraphs: [
            "Флорианополис не просто «имеет технологические компании» — вокруг технопарка Sapiens Parque сложился полноценный кластер, который экономисты называют «бразильской Кремниевой долиной». Это не маркетинговое клише — 900+ технологических компаний и самый высокий ВВП на душу населения среди столиц штатов Бразилии подтверждают это цифрами.",
            "Практическое следствие для инвестора в недвижимость: спрос на аренду в северных районах острова (рядом с технопарком) не падает зимой так, как в чисто туристических зонах — сотрудники технокомпаний живут там круглый год, не только в сезон.",
          ],
        },
        {
          heading: "Инфраструктура и связанность с миром",
          paragraphs: [
            "Флорианополис — не курортная деревня в стороне от мира: аэропорт (FLN) превысил 1 миллион международных пассажиров в 2025 году, прямые рейсы в Буэнос-Айрес, Сантьяго, Лиму, сезонные — в Майами и Лиссабон. 900+ технологических компаний в городе создают круглогодичный спрос на аренду вне туристического сезона — не только «курорт летом, пусто зимой». Аэропорт Навегантис отдельно обслуживает коридор Камбориу/Итапема/Порту-Белу.",
          ],
        },
        {
          heading: "Профили трёх городов — коротко и честно",
          paragraphs: [
            "Рио-де-Жанейро: самый узнаваемый бренд Бразилии, огромный рынок, самая низкая стоимость жизни из трёх, культурный вес. Минус: заметно более высокая насильственная преступность (статистически) и самая низкая доходность аренды в сравнении (3,8%).",
            "Сан-Паулу: деловой центр страны, наибольшая ликвидность рынка, лучше репутация по безопасности, чем принято думать. Минус: самая высокая стоимость жизни из трёх, скромный рост цены на недвижимость (+3,84%) относительно юга.",
            "Флорианополис и южный коридор SC: лучшее сочетание метрик разом — самый безопасный, один из самых быстрорастущих по цене (+8,29%), сопоставимая или более высокая доходность, растущий круглогодичный спрос от IT-сектора. Минус: рынок меньше по объёму — ликвидность при быстрой перепродаже ниже.",
          ],
        },
        {
          heading: "Иллюстрация: как разница в темпе роста складывается за 5 лет",
          paragraphs: [
            "Возьмём условную покупку на $200 000 в каждом городе и применим текущий годовой темп роста (простое компаундирование, без учёта дохода от аренды) — чтобы наглядно показать, как разница в проценте роста превращается в разницу в деньгах за 5 лет: Флорианополис +8,29%/год → ~$297 000 (прирост +$97 000). Сан-Паулу +3,84%/год → ~$241 000 (прирост +$41 000). Рио-де-Жанейро +4,37%/год → ~$247 000 (прирост +$47 000).",
            "Важная оговорка: это иллюстративный расчёт на основе текущего 12-месячного тренда, спроецированного вперёд простым компаундированием — не гарантия и не прогноз. Реальная динамика зависит от макроэкономики, конкретного объекта и района. Расчёт показывает механику того, как разница в проценте роста превращается в разницу в деньгах — не обещание результата.",
            "Даже без учёта арендного дохода — который в Флорианополисе также как минимум сопоставим с мегаполисами (см. таблицу выше) — разница в темпе роста за 5 лет складывается в более чем двукратную разницу в приросте капитала между южным побережьем и Рио.",
          ],
        },
        {
          heading: "Итоговый scorecard — все параметры разом",
          paragraphs: [
            "Сводное сравнение по 8 параметрам — Рио / Сан-Паулу / Флорианополис-юг: Безопасность — Ниже / Средне / Лидер. Рост цены недвижимости — Средне / Ниже / Лидер. Доходность аренды — Ниже / Высокая / Высокая. Стоимость жизни — Ниже всех / Выше всех / Средне. IDHM (развитие) — Высокий / Оч. высокий / Оч. высокий, лидер. Высшее образование — Сильное / Сильнейшее в стране / Нишевое (tech). Медицина — Сильная, персонал. / Сильнейшая в стране / Компромисс цена/качество. Ликвидность рынка — Высокая / Высочайшая / Ниже.",
            "Юг не выигрывает всё — ликвидность и глубина медицины/образования объективно выше в мегаполисах. Но для инвестора, чей приоритет — рост капитала, доходность, безопасность и качество жизни, а не максимальный выбор специалистов или мгновенная перепродажа, баланс явно смещён в сторону юга.",
          ],
        },
        {
          heading: "Что теряет инвестор, выбирая только по узнаваемости имени",
          paragraphs: [
            "Рио и Сан-Паулу выигрывают по параметру вне таблиц — ликвидность и размер рынка. Больше объектов, больше покупателей, проще перепродать быстро. Для крупного капитала или краткосрочной спекуляции это реальный довод. Но если горизонт — не «продать через полгода», а «инвестировать на годы» — картина меняется в пользу юга практически по всем остальным параметрам.",
          ],
        },
        {
          heading: "Что в итоге",
          paragraphs: [
            "Рио и Сан-Паулу остаются крупнейшими и самыми узнаваемыми рынками страны — реальное преимущество для стратегий, завязанных на ликвидность. Но по совокупности параметров среднесрочного инвестора — рост цены, доходность, безопасность, стоимость содержания, круглогодичный спрос — южный коридор Санта-Катарины выигрывает по большинству показателей. Причём не за счёт мифа об одинаковой опасности Рио и Сан-Паулу — а по цифрам роста и доходности, которые юг обходит у обоих.",
            "Информационный материал, не инвестиционная рекомендация. Безопасность — Atlas da Violência 2026. Цены и доходность — Índice FipeZAP, июнь 2026. Стоимость жизни — Numbeo, 2026.",
          ],
        },
      ],
    },
  },
};

