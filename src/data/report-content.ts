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
  'brazil-market-strategy-2026-2027': {
    en: {
      sections: [
        {
          heading: 'The Short Version',
          paragraphs: [
            'For the past few years, it was easy to buy almost anywhere in Santa Catarina and barely make a mistake — the market grew as one organism. That era is ending. Going forward, the cost of a wrong call won\'t depend on whether you bought "in Brazil" or "in Florianópolis" — it will depend on which specific market segment you landed in.',
          ],
        },
        {
          heading: 'The 2025–2026 Economy — in Plain Terms',
          paragraphs: [
            '2025 closed with GDP growth of 2.3% — the slowest pace since the pandemic. Construction as a whole grew just 0.5%. The Central Bank\'s benchmark rate Selic closed the year at 15%, above the 14.25% analysts expected.',
            'Key figures: GDP growth 2025 — 2.3%. Selic rate, year-end 2025 — 15%. Public debt/GDP, 2026 forecast — 10%. Household debt/GDP — 36%+.',
            'Why is the rate so high if inflation isn\'t critical? In plain terms: the government needs to borrow more and more, and the high rate is the price of that debt. The measure of how much the government needs to borrow is called NFSP — in 2026 it\'s projected to rise to 10% of GDP, the highest since the pandemic year of 2020.',
          ],
        },
        {
          heading: '2026 — the Year of "Hyperstagnation"',
          paragraphs: [
            'That\'s what industry economists call what\'s ahead: there\'s growth, but barely noticeable. Deceleration, 2024 vs 2026 forecast: Consumption — +4.8% in 2024, down to +1.9% (forecast) in 2026. Investment — +7.3% in 2024, down to +2.1% (forecast) in 2026.',
            'Even if the Selic drops from 14.5% to 12–13% over the year, that doesn\'t solve the problem for real estate. The rate is still too high for comfortable mortgage financing. Mortgage lending volume is 19% below the 2021 peak. And household debt above 36% of GDP means that even cheaper credit won\'t immediately bring the average buyer back to the market.',
          ],
        },
        {
          heading: 'Construction Isn\'t Shrinking — It\'s Redistributing',
          paragraphs: [
            'Per national ABRAINC-Fipe data (the industry association plus a research institute): project launches grew 19.3% over 12 months, real sales value grew 4.8%, and the affordable housing program grew 20.8%.',
            'Sounds great — but almost all of that growth came from the government\'s affordable housing program, Minha Casa Minha Vida (+20.8%). The mid-to-high price segment, meanwhile, is selling down accumulated inventory, not growing.',
            'Developers squeezed from both sides: costs are rising — an expensive dollar makes imported materials pricier, and labor costs keep climbing. And passing those costs on to the buyer is hard — credit is expensive and scarce. The industry\'s answer isn\'t a freeze, it\'s discipline: more selective launches, a more cautious approach.',
            'This isn\'t a boom story, and it isn\'t a bust story. It\'s the story of a market that has stopped moving as one whole — which is exactly why national or even city-level averages describe what\'s happening with a specific asset worse and worse. Florianópolis is a great example to see this in detail — see our full [Florianópolis city report](/research/report/florianopolis-investment-report-2026) and the state-wide [best areas to invest in Santa Catarina](/research/report/best-areas-to-invest-in-santa-catarina-2026) comparison for the district-by-district numbers.',
          ],
        },
        {
          heading: 'One City — Three Different Worlds',
          paragraphs: [
            'The headline number for Florianópolis sounds simple: about R$12.6K/m², growth of roughly 8% a year. But behind that average sit three completely different markets — from Jurerê Internacional at R$33K/m² down to Serra Catarinense entry prices around R$900/m². The gap between the most expensive and most affordable segment of one city is 36 times. This is confirmed by independent research from Alphaplan (a consultancy specializing in real estate market research) in partnership with Sinduscon Grande Florianópolis (the region\'s developer association).',
            'Norte da Ilha — a market already at its ceiling. Over 12 years, the district\'s population grew 61% — from 92,500 to 149,000. That\'s nearly 28% of all of Florianópolis\'s population. The drivers aren\'t just tourism, but also the Sapiens Parque tech cluster and an influx of remote workers. But supply is thin: just 42 active projects with 675 units left in stock. The upper price tier — Jurerê Internacional (~R$33K/m²), Jurerê (R$28.6K/m²) — is already trading at levels typical of mature prime locations. Further growth here will increasingly hinge on scarcity of specific plots, not on overall demand.',
            'Methodological note: our earlier Florianópolis materials cited Jurerê Internacional at R$22K/m² (FipeZap data). The Alphaplan/Sinduscon figures are higher — they apparently separate "Jurerê" and "Jurerê Internacional" as two distinct price tiers, while FipeZap gives a single averaged estimate. Both figures are correct — they measure different things.',
            'Continente and Estreito — a market catching up. Over 16,500 active businesses form the district\'s economic base. Annual price growth is about 12.5%, above the city average. This is a classic profile of a market repricing behind infrastructure (a new bypass road eased logistics) — but the price ceiling here is still far off.',
            'Serra Catarinense — a market still forming. 603 available units, 15 projects, the lowest price in the state — R$889–930/m². This is an early stage: people buy here not for current yield, but betting that a winter tourist destination will become a place of permanent and second homes. Risk is higher, the horizon longer — but the repricing potential here is something the island no longer has.',
          ],
        },
        {
          heading: 'Submarket Stages — at a Glance',
          paragraphs: [
            'Norte da Ilha — at the ceiling: scarce prime, limited upside. Continente-Estreito — catching up: repricing, medium risk. Serra Catarinense — forming: high risk, long horizon, high potential.',
          ],
        },
        {
          heading: 'Before You Invest — Consult Professionals',
          paragraphs: [
            'Lumping all three segments into one decision under the banner "real estate in Florianópolis" is a methodological error. It used to be less visible, because a rising market masked the difference. In a flat macro cycle like 2026–2027, that difference becomes decisive.',
            'Our advice — don\'t rely on our assessment alone. A similar conclusion — independently — is reached by Alphaplan, a reference consultancy that has prepared industry studies of Santa Catarina\'s real estate market for years. Their analysis is aimed at developers, not investors — which makes it more valuable that the conclusion matches ours. Before making a significant investment decision, it\'s worth checking against independent data sources — not just the seller\'s position. We can help arrange that consultation.',
          ],
        },
        {
          heading: 'What This Means for You',
          paragraphs: [
            'The question "is it worth investing in Brazil" is too blunt to be useful in 2026–2027. The sharper question is: what stage is the specific submarket in, does that stage match your horizon and risk tolerance, and is the choice confirmed by independent data.',
            'It\'s exactly at this level of detail — comparing market stages, not general country trends — that investment strategy for the next cycle should be built.',
          ],
        },
        {
          heading: 'Sources & Disclaimer',
          paragraphs: [
            'This material is for informational purposes only and does not constitute investment advice. Sources: MSc Tiago Jung (CEO of Alphaplan), "Análise Econômica 2026," presentation for Construsul BC, May 2026; Alphaplan research (alphaplanpesquisas.com.br) in partnership with Sinduscon Grande Florianópolis; ABRAINC-Fipe; Índice FipeZap; Banco Central do Brasil. Plan B Brazil acts as an independent advisor and is not a developer.',
          ],
        },
      ],
    },
    ru: {
      sections: [
        {
          heading: 'Коротко о главном',
          paragraphs: [
            'Последние несколько лет было легко покупать почти где угодно в Санта-Катарине и почти не ошибаться — рынок рос целиком, как один организм. Это время заканчивается. Дальше цена ошибки будет зависеть не от того, что вы купили «в Бразилии» или «во Флорианополисе», а от того, в каком конкретном сегменте рынка вы оказались.',
          ],
        },
        {
          heading: 'Экономика 2025–2026 — коротко и по-простому',
          paragraphs: [
            '2025 год бразильская экономика закрыла с ростом ВВП 2,3% — минимальным темпом со времён пандемии. Строительный сектор в целом прибавил лишь 0,5%. Базовая ставка Центробанка Selic завершила год на уровне 15% годовых — выше, чем ожидали аналитики (14,25%).',
            'Ключевые цифры: рост ВВП Бразилии в 2025 — 2,3%. Ставка Selic на конец 2025 — 15%. Госдолг/ВВП, прогноз на 2026 — 10%. Долги домохозяйств/ВВП — 36%+.',
            'Почему ставка такая высокая, если инфляция не критичная? Простыми словами: государству нужно занимать всё больше денег, а высокая ставка — плата за этот долг. Показатель того, сколько государству нужно занять, называется NFSP — в 2026 году он вырастет до 10% ВВП, максимума с пандемийного 2020 года.',
          ],
        },
        {
          heading: '2026 год — «гиперстагнация»',
          paragraphs: [
            'Так отраслевые экономисты называют то, что нас ждёт: рост есть, но еле заметный. Замедление, 2024 против прогноза на 2026: Потребление — +4,8% в 2024, до +1,9% (прогноз) в 2026. Инвестиции — +7,3% в 2024, до +2,1% (прогноз) в 2026.',
            'Даже если Selic снизится с 14,5% до 12–13% в течение года — это не решает проблему для недвижимости. Ставка всё ещё слишком высокая для комфортной ипотеки. Объём ипотечного кредитования — на 19% ниже пика 2021 года. А долги домохозяйств выше 36% ВВП означают, что даже удешевление кредита не сразу вернёт массового покупателя на рынок.',
          ],
        },
        {
          heading: 'Стройка не сжимается — она перераспределяется',
          paragraphs: [
            'По национальной статистике ABRAINC-Fipe (отраслевая ассоциация застройщиков + исследовательский институт): запуски новых проектов выросли на 19,3% за год, реальный рост продаж в деньгах — 4,8%, рост в программе доступного жилья — 20,8%.',
            'Звучит отлично — но почти весь этот рост дала государственная программа доступного жилья Minha Casa Minha Vida (+20,8%). Сегмент среднего и высокого ценового диапазона в это же время, наоборот, распродаёт накопленные запасы, а не растёт.',
            'Застройщиков зажимает с двух сторон: издержки растут — дорогой доллар удорожает импортные материалы, рабочая сила дорожает. А переложить эти издержки на покупателя сложно — кредит дорогой и малодоступный. Ответ отрасли — не заморозка, а дисциплина: более избирательные запуски, более осторожная политика.',
            'Это не история про бум и не история про спад. Это история про рынок, который перестал двигаться единым фронтом — а значит, средние цифры по стране или даже по городу всё хуже описывают то, что происходит с конкретным объектом. Флорианополис — отличный пример, чтобы увидеть это в деталях — см. наш полный [отчёт по Флорианополису](/research/report/florianopolis-investment-report-2026) и общештатное сравнение [лучших районов Санта-Катарины для инвестиций](/research/report/best-areas-to-invest-in-santa-catarina-2026) с разбивкой по районам.',
          ],
        },
        {
          heading: 'Один город — три разных мира',
          paragraphs: [
            'Заголовочная цифра по Флорианополису звучит просто: около R$12,6 тыс./м², рост около 8% за год. Но за этой средней цифрой скрываются три совершенно разных рынка — от Журере Интернасьонал по R$33К/м² до входных цен Серра-Катариненсе около R$900/м². Разница между самым дорогим и самым доступным сегментом одного города — в 36 раз. Это подтверждают и независимые исследования Alphaplan (консалтинговая компания, специализирующаяся на исследованиях рынка недвижимости) в партнёрстве с Sinduscon Grande Florianópolis (объединение застройщиков региона).',
            'Норте-да-Илья — рынок уже упёрся в потолок. За 12 лет население района выросло на 61% — с 92,5 до 149 тысяч человек. Это почти 28% всего населения Флорианополиса. Причины — не только туризм, но и технологический кластер Sapiens Parque и приток удалённых сотрудников. Но предложения не хватает: всего 42 проекта с 675 юнитами в остатке. Верхний ценовой ярус — Журере Интернасьонал (~R$33К/м²), Журере (R$28,6К/м²) — уже торгуется на уровне зрелых прайм-локаций. Дальнейший рост здесь будет упираться в дефицит конкретных участков, а не в спрос.',
            'Методологическая сноска: наши предыдущие материалы по Флорианополису указывали цену Журере Интернасьонал на уровне R$22 тыс./м² (по данным FipeZap). Цифры Alphaplan/Sinduscon выше — они, судя по всему, разводят «Журере» и «Журере Интернасьонал» как два разных ценовых яруса, тогда как FipeZap даёт единую усреднённую оценку. Обе цифры верны — они измеряют разные вещи.',
            'Континенте и Эстрейто — рынок догоняет сам себя. Более 16,5 тысяч активных компаний создают экономическую базу района. Рост цены за год — около 12,5%, выше среднего по городу. Это классический профиль догоняющей переоценки вслед за инфраструктурой (новая обходная трасса разгрузила логистику) — но потолок цены здесь ещё далеко не достигнут.',
            'Серра-Катариненсе — рынок только формируется. 603 доступные единицы, 15 проектов, самая низкая цена в штате — R$889–930/м². Это ранняя стадия: люди покупают здесь не ради текущей доходности, а ставя на то, что зимнее туристическое направление превратится в место постоянного и второго проживания. Риск выше, горизонт длиннее — но и потенциал переоценки здесь есть такой, какого уже нет на острове.',
          ],
        },
        {
          heading: 'Стадии субрынков — коротко',
          paragraphs: [
            'Норте-да-Илья — упёрся в потолок: дефицитный прайм, ограниченный апсайд. Континенте-Эстрейто — догоняет: переоценка, средний риск. Серра-Катариненсе — формируется: высокий риск, длинный горизонт, высокий потенциал.',
          ],
        },
        {
          heading: 'Прежде чем инвестировать — проконсультируйтесь с профессионалами',
          paragraphs: [
            'Смешивать все три сегмента в одном решении под лозунгом «недвижимость в Флорианополисе» — методологическая ошибка. Раньше это было не так заметно, потому что растущий рынок маскировал разницу. При плоском макроцикле 2026–2027 годов эта разница становится решающей.',
            'Наш совет — не полагайтесь только на нашу оценку. К похожему выводу — независимо от нас — приходит и Alphaplan, авторитетная консалтинговая компания, которая много лет готовит отраслевые исследования рынка недвижимости Санта-Катарины. Их аналитика адресована застройщикам, не инвесторам — и тем ценнее, что вывод совпадает с нашим. Прежде чем принимать решение о серьёзной инвестиции, стоит свериться с независимыми источниками данных — а не только с позицией продавца объекта. Мы можем помочь организовать такую консультацию.',
          ],
        },
        {
          heading: 'Что это значит для вас',
          paragraphs: [
            'Вопрос «стоит ли инвестировать в Бразилию» в 2026–2027 годах слишком грубый, чтобы быть полезным. Более точный вопрос — в какой стадии находится конкретный субрынок, соответствует ли эта стадия вашему горизонту и готовности рисковать, и подтверждён ли выбор независимыми данными.',
            'Именно на этом уровне детализации — сопоставлении стадий рынка, а не общих трендов страны — и должна строиться инвестиционная стратегия на ближайший цикл.',
          ],
        },
        {
          heading: 'Источники и оговорка',
          paragraphs: [
            'Материал носит информационный характер и не является инвестиционной рекомендацией. Источники: MSc Tiago Jung (CEO Alphaplan), «Análise Econômica 2026», презентация для Construsul BC, май 2026; исследования Alphaplan (alphaplanpesquisas.com.br) в партнёрстве с Sinduscon Grande Florianópolis; ABRAINC-Fipe; Índice FipeZap; Banco Central do Brasil. Plan B Brazil выступает независимым советником и не является девелопером.',
          ],
        },
      ],
    },
  },

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
            "If any of this sounds more complicated than what other sites promise, it's because we're not trying to sell you a visa in one click. We're explaining how it actually works, with a lawyer who runs these cases every day. Once the paperwork is filed and you're actually moving, our [practical guide for newcomers to Florianópolis](/research/report/newcomers-guide-florianopolis) covers the everyday side — schools, healthcare, transport, where to live. If you're also planning to run a business here rather than just hold property, see our guide to [starting a business in Brazil](/research/report/starting-a-business-in-brazil-2026) — it covers the separate investor-visa track and the bureaucracy specific to company formation.",
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
            "Если что-то из написанного звучит сложнее, чем обещают другие сайты, — это потому, что мы не пытаемся продать вам визу за один клик. Мы объясняем, как это работает на самом деле, с адвокатом, который проводит эти процессы каждый день. Когда документы поданы и переезд уже реален, наш [практический гид для новоприбывших в Флорианополисе](/research/report/newcomers-guide-florianopolis) разбирает повседневную сторону — школы, врачи, транспорт, где жить. Если помимо владения недвижимостью вы планируете ещё и вести здесь бизнес — см. наш гид по [открытию бизнеса в Бразилии](/research/report/starting-a-business-in-brazil-2026): там разобран отдельный трек инвесторской визы и бюрократия, специфичная именно для регистрации компании.",
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
  'spe-struktura-nedvizhimost-braziliya': {
    en: {
      sections: [
        {
          heading: "The Short Version",
          paragraphs: [
            "If you're offered a stake in a project through an SPE (Sociedade de Propósito Específico) with a higher-than-usual commission, a slick presentation, and a promise to \"get in at the earliest stage\" — read this before you agree. I've been through this structure myself, both as an advisor who brought clients into one and as someone who's been paid through one. Here's the honest version: what the law says, and what actually happens in practice.",
          ],
        },
        {
          heading: "What an SPE Is",
          paragraphs: [
            "An SPE (Sociedade de Propósito Específico) is a legal entity created for a specific investment project. The idea is simple: the developer sets up a separate entity for one project, and investors buy in through shares (cotas) in that entity, rather than purchasing a finished unit directly.",
            "It's worth understanding: this structure was specifically designed to prevent the \"defrauded buyers\" history from repeating. It has two genuine legal advantages: first, liability is segregated strictly project-by-project — problems on one project don't carry over to another. Second, for the developer, it's a way to scale using borrowed funds without mixing capital across different developments. That's exactly why large, experienced developers use SPEs routinely — the structure works when it's managed in good faith. For real-world examples of this model in practice today, see our developer reviews of [Modulare](/research/report/modulare-incorporadora-developer-review-2026), which builds under a cooperative SPE \"preço de custo\" model, and [STV Construções](/research/report/stv-construcoes-developer-review-2026), where roughly 90% of the Florianópolis market runs on this structure per the developer's own founder.",
            "Don't panic at the word \"SPE\". The structure itself isn't a reason to run. The danger appears when an SPE ends up in the hands of a dishonest developer or construction administrator — then it turns into a ticking time bomb, and sooner or later it goes off. The issue isn't the tool, it's who's using it.",
          ],
        },
        {
          heading: "The Legal Gap No One Mentions in the Pitch",
          paragraphs: [
            "Here's a fact worth knowing beforehand, not after: Brazil has no dedicated law governing SPEs specifically in real estate. That's not my opinion — it's the direct wording used by Brazilian lawyers who specialize in this area.",
            "There's a separate, much stronger protection mechanism — patrimônio de afetação (Law No. 10.931/2004). It segregates a specific project's assets from the developer's general assets: if the company goes bankrupt, the project's money and property do not get swept into the general bankruptcy estate — they go to the buyers.",
            "The key nuance: adopting patrimônio de afetação is voluntary for the developer, not mandatory. They can adopt it, or not — and the marketing materials usually won't mention this either way. This is the first question to ask before signing anything.",
            "With patrimônio de afetação adopted: project assets are segregated from the developer, funds are protected in a bankruptcy, construction continues or buyers get priority in bankruptcy, a more transparent and verifiable structure. Without it: project assets are mixed with the developer's general assets, in a bankruptcy buyer funds sit in the general pool of debts, risk of the \"bicycle effect\" — project funds diverted elsewhere, minimal protection if the developer runs into trouble.",
          ],
        },
        {
          heading: "Where This Law Came From — and Why It Matters",
          paragraphs: [
            "The patrimônio de afetação law didn't appear in 2004 by accident — it was enacted after the collapse of the developer Encol in the late 1990s, which went bankrupt and left more than 700 unfinished properties across the country. Before that, lawyers documented what became known as the \"bicycle effect\" (efeito bicicleta): money collected for one SPE project was redirected to plug holes in another project by the same developer, whose funds had already been misused.",
            "If this reminds you of 1990s housing-cooperative scandals and defrauded buyers, you're not alone in that impression. The mechanics really are similar: collecting construction money before a project is actually structured and protected.",
          ],
        },
        {
          heading: "The Risk Premium — and Why \"30-40% in a Year\" Promises Should Worry You",
          paragraphs: [
            "It's important to separate two different things. The risk premium is what a developer promises an investor for entering the structure at the earliest, riskiest stage. This is where the tempting promises live — \"you'll earn 30-40% in a year.\" My honest view as a practitioner: that's not systematic. There may be isolated successful projects that hit those numbers, but when it's presented as the norm rather than a rare exception, that's a red flag, not a realistic scenario.",
            "The commission is a separate story, and it's about me as a broker, not about the investor. I receive it from the developer for selling units within the SPE structure. That's where I had a personal, unpleasant experience, which I'll describe below.",
          ],
        },
        {
          heading: "My Own Experience — From Both Sides of the Same Deal",
          paragraphs: [
            "I'll be honest about this, because I think it matters more than any theory — and from two angles at once: as a broker, and from the standpoint of the client's outcome.",
            "The broker's side — a delayed commission. I worked as a broker and sold three units to my clients within one SPE project — contracts signed, down payment made, everything done properly. I went to the developer for my commission, and was told: \"We'll definitely pay you, but only after the investment group closes\" — meaning after roughly 80% of the units sell and the construction budget is formed.",
            "The wait was long. From a broker's standpoint, that means next time I'll think hard about whether to bring clients into a similar project — not because the project itself is bad, but because the structure doesn't work in my favor as an intermediary who needs money today, not many months from now. Worth noting: Brazilian developers are already aware of this issue and have started inventing bonuses and incentive schemes for brokers — because nobody wants to wait.",
            "The client's side — the deal worked out. At the same time, the project itself delivered honestly: the developer completed construction on time, without delays, exactly as promised. The client, net of all costs and commission, earned 42% in hard currency — entering at an early stage as the SPE structure intends, plus a solid discount for paying the full amount upfront in cash.",
          ],
        },
        {
          heading: "An Honest Balance — Both Sides of the Coin",
          paragraphs: [
            "This system has both upsides and downsides, and I want to say that plainly. It worked out well for me and my clients specifically because we did deep due diligence on the developer and the project before investing — not because we got lucky.",
            "But I also know other stories — projects that froze, never got finished, where the developer collected investor money and disappeared, now wanted by the authorities. People lost money. There are, unfortunately, quite a few such examples.",
            "So before making a decision — always consult a specialist. I'm glad to advise personally, and if needed, recommend lawyers and attorneys to discuss the risks of a specific project.",
          ],
        },
        {
          heading: "My Take — Weigh It Very Carefully",
          paragraphs: [
            "Yes, the pitch sounds convincing, and sometimes there's an early-entry discount. But the risk is real, and I've seen it not just on the client side but on my own. Even with an experienced developer at the helm, the structure itself carries layers of risk that aren't present in a conventional incorporação with a properly adopted patrimônio de afetação.",
            "I would not recommend an inexperienced investor enter an SPE deal without support that actually verifies the structure, rather than relying on a polished presentation.",
          ],
        },
        {
          heading: "What to Check Before Entering an SPE",
          paragraphs: [
            "1. Patrimônio de Afetação — has it been adopted for this project, yes or no, in writing.",
            "2. A signed project — is there an approved project, not just renders.",
            "3. Construction permit — has the alvará de construção been issued.",
            "4. Actual construction stage — not what you're told, check documents, and the site in person if possible.",
            "5. Project-stops scenario — what happens to your money if construction halts.",
            "For the specific fraud warning signs that apply regardless of deal structure, see our separate guide on [recognizing a real estate fraud scheme in Brazil](/research/report/kak-raspoznat-moshennichestvo-nedvizhimost-braziliya), and on structuring the payment itself safely through an [escrow account](/research/report/eskrou-schet-nedvizhimost-braziliya-zashchita-pokupatelya).",
          ],
        },
        {
          heading: "Bottom Line",
          paragraphs: [
            "An SPE is a legal, common structure, and not every such project is problematic. But it carries a real legal gap (no dedicated law), a real historical reason for caution (Encol, the \"bicycle effect\"), and my own experience confirms the risks are concrete, not theoretical. A higher commission isn't a reason to go in without looking. Weigh it carefully, verify patrimônio de afetação in writing, and don't rely on the presentation alone.",
            "Informational material, not legal or investment advice. Legal framework confirmed by Dr. Wilian Campos (OAB/SC 50.897), WK International Services, July 2026. Risk assessments reflect Konstantin Bievskikh's personal practical experience.",
          ],
        },
      ],
    },
    ru: {
      sections: [
        {
          heading: "Коротко о главном",
          paragraphs: [
            "Если вам предлагают войти в проект через SPE (Sociedade de Propósito Específico) с комиссией выше обычной, привлекательной презентацией и обещанием «войти на самом раннем этапе» — прежде чем соглашаться, прочитайте это. Я лично прошёл через эту структуру — и как советник, приводивший туда клиентов, и как человек, который сам получал по ней деньги. Расскажу честно: и что говорит закон, и что происходит на практике.",
          ],
        },
        {
          heading: "Что такое SPE",
          paragraphs: [
            "SPE (Sociedade de Propósito Específico) — юридическое лицо, создаваемое под конкретный инвестиционный проект. Идея простая: застройщик открывает отдельную структуру под один объект, инвесторы входят через доли (котас) в этой структуре, а не покупают готовую квартиру напрямую.",
            "Важно понимать: эта структура была придумана как раз для того, чтобы не повторялась история с обманутыми дольщиками. У неё два реальных законных преимущества: во-первых, ответственность разграничена строго по каждому проекту отдельно — проблемы одного проекта застройщика не переходят на другой. Во-вторых, для застройщика это возможность масштабироваться на заёмных средствах, не смешивая капитал разных строек. Именно поэтому крупные, опытные застройщики используют SPE на регулярной основе — структура работает, когда ей управляют добросовестно. Реальные примеры этой модели на практике сегодня — см. наши обзоры застройщиков [Modulare](/research/report/modulare-incorporadora-developer-review-2026), которая строит по кооперативной модели SPE «preço de custo», и [STV Construções](/research/report/stv-construcoes-developer-review-2026), где, по словам самого основателя, порядка 90% рынка Флорианополиса работает именно по этой схеме.",
            "Не паникуйте при слове «SPE». Сама по себе структура — не повод бежать. Опасность возникает, когда SPE попадает в руки недобросовестного застройщика или администратора стройки — тогда это превращается в бомбу замедленного действия, и рано или поздно она рванёт. Дело не в инструменте, а в том, кто его использует.",
          ],
        },
        {
          heading: "Юридический пробел, о котором вам не расскажут в презентации",
          paragraphs: [
            "Вот факт, который стоит знать до, а не после: в Бразилии нет отдельного закона, регулирующего именно SPE в недвижимости. Это не моя оценка — это прямая формулировка бразильских юристов, специализирующихся на этой теме.",
            "Есть отдельный, гораздо более сильный механизм защиты — patrimônio de afetação (закон № 10.931/2004). Он отделяет активы конкретного проекта от общего имущества застройщика: если компания обанкротится, деньги и объект проекта не попадают в общую массу банкротства, а достаются покупателям.",
            "Ключевой нюанс: применение patrimônio de afetação — добровольное для застройщика, не обязательное. Он может его принять, а может не принять — и в маркетинговых материалах вам об этом чаще всего не скажут вообще. Это первый вопрос, который нужно задать до подписания.",
            "При оформленном patrimônio de afetação: активы проекта отделены от застройщика, при банкротстве деньги защищены, стройка продолжается или покупатели в приоритете при банкротстве, более прозрачная и проверяемая структура. Без него: активы проекта смешаны с общим имуществом застройщика, при банкротстве деньги покупателей в общей массе долгов, риск «эффекта велосипеда» — деньги проекта уходят на другие нужды, минимальная защита при проблемах у застройщика.",
          ],
        },
        {
          heading: "Откуда взялся этот закон — и почему это важно понимать",
          paragraphs: [
            "Закон о patrimônio de afetação появился в 2004 году не случайно — его приняли после краха застройщика Encol в конце 1990-х, который обанкротился и оставил более 700 недостроенных объектов по всей стране. До этого юристы фиксировали так называемый «эффект велосипеда» (efeito bicicleta): деньги, собранные на один проект SPE, перенаправлялись на затыкание дыр в другом проекте того же застройщика, деньги которого уже были потрачены не по назначению.",
            "Если вам это напоминает истории с кооперативами и обманутыми дольщиками из 90-х — вы не одиноки в этом ощущении. Механика действительно похожа: сбор денег на строительство до того, как проект реально готов и защищён.",
          ],
        },
        {
          heading: "Премия за риск — и почему обещания «30-40% за год» должны настораживать",
          paragraphs: [
            "Важно разделять два разных понятия. Премия за риск — это то, что застройщик обещает инвестору за вход в структуру на раннем, самом рискованном этапе. Именно здесь встречаются заманчивые обещания вроде «заработаете 30-40% за год». Моё честное мнение как практика: такого не бывает системно. Могут быть единичные удачные проекты с такой доходностью, но когда это преподносится как норма, а не редкое исключение — это красный флаг, а не реалистичный сценарий.",
            "Комиссия — это отдельная история, и она про меня как риелтора, не про инвестора. Я получаю её от застройщика за продажу юнитов в структуре SPE. Именно с ней у меня был личный неприятный опыт, о котором расскажу ниже.",
          ],
        },
        {
          heading: "Мой личный опыт — с двух сторон одной сделки",
          paragraphs: [
            "Расскажу честно, потому что считаю это важнее любой теории — и с двух ракурсов сразу: как риелтор и с точки зрения результата для клиента.",
            "Со стороны риелтора — задержка комиссии. Я работал брокером и продал три квартиры своим клиентам в одном проекте SPE — договоры оформлены, первоначальный взнос внесён, всё честно и по правилам. Прихожу к застройщику за комиссией — а мне отвечают: «Заплатим обязательно, но только после закрытия инвестиционной группы» — то есть после того, как будет продано около 80% юнитов и сформируется бюджет на строительство.",
            "Ждать пришлось долго. С точки зрения риелтора это значит: в следующий раз я крепко подумаю, вести ли клиентов в подобный проект — не потому что сам проект плохой, а потому что структура невыгодна лично мне как посреднику, которому деньги нужны сегодня, а не через много месяцев. Замечу: бразильские застройщики уже это понимают и начинают придумывать бонусы и мотивационные схемы для риелторов — потому что никто не хочет ждать.",
            "Со стороны результата для клиента — сделка сработала. При этом сам проект отработал честно: застройщик сдал объект вовремя, без опозданий, точно как обещал. Клиент, за вычетом всех издержек и комиссии, заработал 42% в валюте — вошёл на раннем этапе, как и предполагает структура SPE, плюс получил хорошую скидку за полную оплату сразу наличными.",
          ],
        },
        {
          heading: "Честный баланс — обе стороны медали",
          paragraphs: [
            "У этой системы есть и плюсы, и минусы, и я хочу, чтобы это было сказано прямо. У меня с клиентами получилось хорошо именно потому, что мы провели глубокую проверку застройщика и проекта до того, как инвестировать — не потому что «повезло».",
            "Но я знаю и другие истории — проекты, которые заморозились, не достроились, где застройщик собрал деньги инвесторов и скрылся, сейчас находится в розыске. Люди потеряли деньги. Таких примеров, к сожалению, достаточно много.",
            "Поэтому прежде чем принимать решение — обязательно проконсультируйтесь со специалистом. Я готов лично проконсультировать и, если нужно, порекомендовать юристов и адвокатов, с которыми можно обсудить все риски конкретного проекта.",
          ],
        },
        {
          heading: "Мой вывод — взвешивайте очень внимательно",
          paragraphs: [
            "Да, презентация звучит убедительно, иногда предложат скидку за ранний вход. Но риск — реальный, и я видел его не только со стороны клиентов, но и на себе. Даже если управляет опытный застройщик, сама структура несёт в себе слои риска, которых нет в классической инкорпорации с оформленным patrimônio de afetação.",
            "Я бы не рекомендовал неопытному инвестору входить в SPE без сопровождения, которое реально проверяет структуру, а не полагается на красивую презентацию.",
          ],
        },
        {
          heading: "Что проверить перед тем, как войти в SPE",
          paragraphs: [
            "1. Patrimônio de afetação — оформлен ли по этому проекту, да или нет, письменно.",
            "2. Подписанный проект — есть ли утверждённый проект, не только рендеры.",
            "3. Разрешение на строительство — получен ли alvará de construção.",
            "4. Реальный этап стройки — не на словах, а по документам и, если возможно, лично на месте.",
            "5. Сценарий остановки проекта — что происходит с вашими деньгами, если стройка встанет.",
            "Конкретные тревожные признаки мошенничества, актуальные независимо от структуры сделки, мы разбирали отдельно — в гиде о [распознавании мошеннических схем с недвижимостью в Бразилии](/research/report/kak-raspoznat-moshennichestvo-nedvizhimost-braziliya), а про безопасное структурирование самого платежа — в статье про [эскроу-счёт](/research/report/eskrou-schet-nedvizhimost-braziliya-zashchita-pokupatelya).",
          ],
        },
        {
          heading: "Что в итоге",
          paragraphs: [
            "SPE — легальная и распространённая структура, и не каждый такой проект проблемный. Но у неё есть реальный юридический пробел (нет отдельного закона), реальная историческая причина для осторожности (Encol, «эффект велосипеда»), и мой личный опыт подтверждает: риски конкретные, не теоретические. Более высокая комиссия — не повод входить не глядя. Взвешивайте внимательно, проверяйте patrimônio de afetação письменно, и не полагайтесь только на презентацию.",
            "Информационный материал, не юридическая или инвестиционная консультация. Правовая база подтверждена Dr. Wilian Campos (OAB/SC 50.897), WK International Services, июль 2026. Оценки рисков — личный практический опыт Константина Биевских.",
          ],
        },
      ],
    },
  },

  'braziliya-plan-b-vnzh-pasport': {
    en: {
      sections: [
        {
          heading: "The Short Version",
          paragraphs: [
            "Diversifying where you keep your money, where your children are educated, where your family has the option to live if it were ever needed — that's ordinary strategic planning, the same logic as diversifying an investment portfolio. Not having such an option is, in itself, a risk — regardless of where you're from.",
            "My name is Konstantin Bievskikh, and my company's name isn't an accident. Plan B Brazil — because that's exactly what I offer: a calmly prepared backup option.",
          ],
        },
        {
          heading: "Why Think About a \"Plan B\" at All",
          paragraphs: [
            "It's about your family having a real option — an established residency, a clear path to citizenship, an asset in a stable jurisdiction — that you might not use for years, but that exists if you ever need it.",
            "People think about this for different reasons: political instability, currency risk, wanting to give their children a wider set of choices, or simply sound asset diversification. Your reason is yours; the tool is the same.",
          ],
        },
        {
          heading: "Why Brazil Specifically",
          paragraphs: [
            "Florianópolis — one of the safest state capitals in Brazil. 170+ countries with visa-free or simplified access on a Brazilian passport. $194K (R$1,000,000) real estate investment threshold to start the residency process.",
            "Safety. Florianópolis, where I work, consistently ranks among the safest state capitals in Brazil according to official statistics — well above the average for major Brazilian cities and most global metropolises.",
            "A real, legal path to residency. The investor visa through real estate is a clear process: from $194,000 (R$1,000,000) invested in Santa Catarina property, you get temporary residency leading to permanent residency, and eventually citizenship. We covered the full path, including honest timelines, in a separate article on Brazil residency through real estate.",
            "Dual citizenship is allowed. Brazil doesn't require you to renounce your current citizenship — you gain a second passport, not a replacement for the first.",
            "Citizenship for children born in Brazil. The constitution enshrines jus soli — a child born on Brazilian soil automatically becomes a citizen, regardless of the parents' nationality.",
            "Quality of life. Florianópolis consistently ranks among Brazil's cities with the highest human development index — infrastructure, healthcare, climate, and a growing tech sector with an international community.",
          ],
        },
        {
          heading: "Why I Personally Chose Brazil — Long Before It Was a Trend",
          paragraphs: [
            "2009 — moved to Brazil, the start of a personal and professional journey in the country. 2009–2021 — lived and worked across different regions, from the Amazon to Porto Alegre. 2021 — today: Santa Catarina, a deliberate choice after getting to know the whole country.",
            "Personal experience, not marketing copy. I want to say this not as an advisor, but as someone who lived this decision himself. I chose Brazil for my family more than 10 years ago — in 2009 — not now, when everyone is talking about it, but back when it wasn't a fashionable or obvious choice at all.",
            "Before settling in Santa Catarina, I lived and worked in several major cities along Brazil's coast — from the Amazon in the north to Porto Alegre in the south. This isn't a tourist's acquaintance with the country from vacations. I've seen firsthand how business works in different regions, how different the mentality, economy, and pace of life can be between the tropical Amazon and the cool southern state with European roots. Over these years, Portuguese has become essentially my native language — not a phrasebook language, but the one I use to run my business and everyday life, every day.",
            "Before settling on Brazil, I travelled a considerable part of the world. We seriously considered Europe, the US, and Asia as places to build a family life. In the end, the choice landed on Latin America, and specifically Brazil — and that decision has been tested by more than fifteen years, not fresh enthusiasm.",
          ],
        },
        {
          heading: "Business and Government Connections in the Region",
          paragraphs: [
            "Years of living in the country and speaking the language at a native level bring more than everyday convenience — they open real access that a recent arrival simply doesn't have. Over my years working in Santa Catarina, I've built personal relationships with business figures and municipal officials across the region. This isn't a vague \"I know people\" — it's concrete, years-earned access to people who make decisions at the city and state level. For a client, that means: questions that take a foreign investor months to resolve through official channels are often resolved directly for me.",
          ],
        },
        {
          heading: "What \"Plan B\" Means in Practice",
          paragraphs: [
            "It's worth separating two approaches here, because they're often confused.",
            "A last-minute decision: decisions made in a rush, under pressure of circumstances; no time for due diligence — real risk of running into fraud; relocating without prepared documents or an understanding of the process; a choice made under pressure instead of a considered decision.",
            "Prepared readiness: residency established ahead of time, while there's room to choose calmly; an asset that's both an investment and grounds for a visa; documents ready — the family knows where and how they could go; a decision made with a clear head, well in advance.",
            "This is risk management, not a reaction to circumstances. That's exactly why the best time to prepare a Plan B is before you ever need one.",
          ],
        },
        {
          heading: "About the Company — Why Plan B Brazil",
          paragraphs: [
            "Plan B Brazil is an independent investment advisory, not affiliated with any developer. License CRECI-SC 59616-F. Our approach is analytical: decisions based on data, not just impressions from a polished presentation. That's why every piece we publish is built on real numbers, official statistics, and verifiable sources — not general promises.",
          ],
        },
        {
          heading: "Honest About the Timeline and Limitations",
          paragraphs: [
            "The path to permanent residency takes real time — we've covered this in detail elsewhere: from purchase to citizenship, it's years, not months. Presence requirements to maintain status are flexible, but not nominal. Brazil isn't a flawless country without problems, like any other, and the decision to diversify here deserves a real assessment, not a superficial one.",
            "But as an option, prepared in advance, it works predictably, provided the process is done correctly and legally from the start.",
          ],
        },
        {
          heading: "Bottom Line",
          paragraphs: [
            "Having a Plan B means taking your family's future seriously. Brazil offers real, legal tools for this: a path to residency and citizenship, safety, quality of life, a strong passport, and permitted dual citizenship. You don't have to use the option — but having it prepared in advance means choosing calm over rush, if the moment of choice ever comes.",
            "This material is for informational purposes only and does not constitute legal or immigration advice. Visa-access indices are drawn from several public sources and may vary by methodology. For guidance on your specific situation, consult an immigration attorney.",
          ],
        },
      ],
    },
    ru: {
      sections: [
        {
          heading: "Коротко о главном",
          paragraphs: [
            "Диверсифицировать — там, где вы храните деньги, где учатся дети, где у семьи есть возможность жить, если понадобится, — это обычное стратегическое планирование, то же самое, что диверсификация инвестиционного портфеля. Не иметь такого варианта — само по себе риск, независимо от того, откуда вы родом.",
            "Меня зовут Константин Биевских, и название моей компании — не случайность. Plan B Brazil — потому что именно это я и предлагаю: заранее подготовленный, спокойный запасной вариант.",
          ],
        },
        {
          heading: "Зачем вообще думать о «плане Б»",
          paragraphs: [
            "Речь о том, чтобы у вашей семьи была реальная опция — оформленный ВНЖ, понятный путь к гражданству, актив в стабильной юрисдикции — которую можно не использовать годами, но которая есть, если понадобится.",
            "Люди задумываются об этом по разным причинам: политическая нестабильность, валютные риски, желание дать детям более широкий выбор в будущем, разумная диверсификация активов. Причина ваша, инструмент — один и тот же.",
          ],
        },
        {
          heading: "Почему именно Бразилия",
          paragraphs: [
            "Флорианополис — одна из самых безопасных столиц штатов Бразилии. 170+ стран с безвизовым или упрощённым доступом по бразильскому паспорту. $194K (R$1 000 000) — порог инвестиции в недвижимость для старта визового процесса.",
            "Безопасность. Флорианополис, где я работаю, стабильно входит в число самых безопасных столиц штатов Бразилии по официальной статистике — заметно выше среднего показателя по крупным городам страны и большинства мировых мегаполисов.",
            "Реальный, легальный путь к резиденции. Инвестиционная виза через недвижимость — понятный процесс: от $194 000 (R$1 000 000) в недвижимость в Санта-Катарине даёт временную резиденцию, ведущую к постоянной, а затем — к гражданству. Мы подробно разбирали весь путь, включая честные сроки, в отдельной статье про ВНЖ Бразилии через недвижимость.",
            "Двойное гражданство разрешено. Бразилия не требует отказываться от текущего гражданства — вы получаете второй паспорт, а не заменяете первый.",
            "Гражданство детям, рождённым в Бразилии. Конституция страны закрепляет право почвы (jus soli) — ребёнок, рождённый на территории Бразилии, автоматически становится гражданином, независимо от гражданства родителей.",
            "Качество жизни. Флорианополис стабильно входит в число городов Бразилии с самым высоким индексом человеческого развития — инфраструктура, здравоохранение, климат, растущий технологический сектор с международным сообществом.",
          ],
        },
        {
          heading: "Почему я лично выбрал Бразилию — задолго до того, как это стало трендом",
          paragraphs: [
            "2009 — переезд в Бразилию, начало личного и профессионального пути в стране. 2009–2021 — жизнь и работа в разных регионах, от Амазонки до Порту-Алегри. 2021 — сегодня: Санта-Катарина, осознанный выбор после знакомства со всей страной.",
            "Личный опыт, не рекламный текст. Хочу сказать это не как советник, а как человек, который прожил это решение сам. Я выбрал Бразилию для своей семьи более 10 лет назад — в 2009 году — не сейчас, когда об этом заговорили все, а тогда, когда это не было ни модным, ни очевидным решением.",
            "До того как остановиться в Санта-Катарине, я жил и работал в разных крупных городах на побережье Бразилии — от Амазонки на севере до Порту-Алегри на юге. Это не туристическое знакомство со страной по отпускам. Я видел изнутри, как устроен бизнес в разных регионах, насколько разными могут быть менталитет, экономика и ритм жизни в тропической Амазонии и в прохладном южном штате с европейскими корнями. За эти годы португальский стал для меня фактически родным языком — это не туристический разговорник, это язык, на котором я веду бизнес и повседневную жизнь каждый день.",
            "Прежде чем остановиться на Бразилии, я объехал изрядную часть мира. Мы всерьёз рассматривали Европу, США, Азию как место для жизни семьи. В итоге выбор пал на Латинскую Америку, и конкретно на Бразилию — и это решение проверено более чем пятнадцатью годами, а не свежим энтузиазмом.",
          ],
        },
        {
          heading: "Связи в бизнесе и во власти региона",
          paragraphs: [
            "Годы жизни в стране и владение языком на уровне носителя дают не только бытовое удобство — они открывают реальный доступ, которого нет у человека, недавно приехавшего в страну. За время работы в Санта-Катарине я выстроил личные отношения с представителями бизнеса и муниципальной власти региона. Это не абстрактное «у меня есть знакомства» — это конкретный, годами наработанный доступ к людям, которые принимают решения на уровне города и штата. Для клиента это означает: вопросы, которые для стороннего инвестора решаются месяцами через официальные каналы, для меня часто решаются напрямую.",
          ],
        },
        {
          heading: "Что «план Б» означает практически",
          paragraphs: [
            "Здесь важно разделить два подхода, потому что их часто путают.",
            "Решение в последний момент: решения принимаются в спешке, под давлением обстоятельств; нет времени на due diligence — риск наткнуться на мошенников; переезд без подготовленных документов и понимания процесса; выбор под давлением вместо взвешенного решения.",
            "Подготовленная готовность: резиденция оформлена заранее, пока есть время выбирать спокойно; актив, который одновременно инвестиция и основание для визы; документы готовы — семья знает, куда и как можно поехать; решение принято на трезвую голову, заблаговременно.",
            "Это управление рисками, а не реакция на обстоятельства. Именно поэтому лучшее время подготовить план Б — это время, когда он ещё не понадобился.",
          ],
        },
        {
          heading: "О компании — почему Plan B Brazil",
          paragraphs: [
            "Plan B Brazil — независимая инвестиционная консультация, не аффилированная с застройщиками. Лицензия CRECI-SC 59616-F. Наш подход — аналитический: решения на основе данных, а не только впечатлений от красивой презентации. Именно поэтому в каждом материале, который мы публикуем, — реальные цифры, официальная статистика и проверяемые источники, а не общие обещания.",
          ],
        },
        {
          heading: "Честно о сроках и ограничениях",
          paragraphs: [
            "Путь к постоянной резиденции занимает реальное время — мы разбирали это подробно отдельно: от покупки до гражданства это годы, не месяцы. Присутствие в стране для сохранения статуса гибкое, но не номинальное. Бразилия — не идеальная страна без проблем, как и любая другая, и решение диверсифицироваться сюда требует реальной, а не поверхностной оценки.",
            "Но как опция, подготовленная заранее, — это работает предсказуемо, при условии, что процесс пройден правильно и легально с самого начала.",
          ],
        },
        {
          heading: "Что в итоге",
          paragraphs: [
            "Иметь план Б — значит относиться к будущему своей семьи серьёзно. Бразилия даёт для этого реальные, легальные инструменты: путь к резиденции и гражданству, безопасность, качество жизни, сильный паспорт, разрешённое двойное гражданство. Не обязательно использовать эту опцию — но иметь её подготовленной заранее значит выбирать спокойствие вместо спешки, если момент выбора когда-нибудь наступит.",
            "Материал носит информационный характер и не является юридической или иммиграционной консультацией. Индексы визовой доступности приведены по нескольким публичным источникам и могут отличаться в зависимости от методики. Для оценки конкретной ситуации рекомендуем консультацию с иммиграционным юристом.",
          ],
        },
      ],
    },
  },

  'kak-kupit-nedvizhimost-braziliya': {
    en: {
      sections: [
        {
          heading: "The Short Version",
          paragraphs: [
            "Two questions come up more than any others: \"how does this actually work\" and \"what will it cost on top of the price.\" Here are both, step by step, with figures at every stage — so you don't have to piece the picture together from different sources.",
          ],
        },
        {
          heading: "Can a Foreigner Even Buy Property in Brazil",
          paragraphs: [
            "Yes, without restrictions for urban real estate. A foreigner can own an apartment or house in Brazil under the same conditions as a citizen — no special permit is required, except for certain categories of border-zone and rural land, which don't apply to an ordinary residential purchase.",
            "An important scope note for this article. This covers buying a new-construction property — under construction or in pre-sale, directly from the developer. For the resale market, the due diligence process and legal verification can differ significantly (there, you actually check the matrícula of the specific property, which doesn't exist yet for new construction). For a resale transaction, we recommend a separate consultation.",
          ],
        },
        {
          heading: "Step by Step",
          paragraphs: [
            "1. CPF (Brazilian individual taxpayer ID) — without it you can't open an account, register a deal, or pay taxes. Obtained through a Brazilian consulate or directly in Brazil.",
            "2. Bank account — not always strictly mandatory, but practically necessary for the currency operation and its registration.",
            "3. Property selection and developer verification — full checklist further down this article.",
            "4. International wire transfer — from your bank to the Brazilian account, with the incoming capital registered at the Central Bank.",
            "5. Contract with the developer — signing the purchase agreement — may be structured as cotas or a direct contract, depending on the project.",
            "6. Delivery and registration — after construction completes, registration at the Cartório de Registro de Imóveis. From this point you're officially the owner.",
          ],
        },
        {
          heading: "What It Actually Costs — By Stage, Not One Number",
          paragraphs: [
            "Good news on commission. Agency or broker commission is typically 5% of the property's value. But when buying new construction, this commission is usually paid by the seller (the developer), not the buyer. For you as a buyer, this is most often not an extra line item.",
            "An important nuance about ITBI. When buying new construction, ITBI usually isn't paid at the time of purchase. This tax is only charged when the property is registered in the property registry — which happens after the building is delivered. That means you could even resell your unit before construction finishes without ever paying ITBI yourself — whoever ultimately registers the completed property in their name pays it.",
            "At purchase (pre-sale/under construction): commission is usually on the seller — often no direct cost to the buyer. At registration (after delivery): ITBI (property transfer tax) — 2–3% of the property's value, plus notary fees. Annually: IPTU — 0.3–1.5% of the assessed value per year. On sale: capital gains tax — details in a separate article.",
          ],
        },
        {
          heading: "How to Verify the Developer — What to Look At",
          paragraphs: [
            "New construction doesn't have its own matrícula — the building hasn't been built yet, and individual units haven't been registered as separate properties. So verification runs through the developer and the project itself, not a property-specific registry extract.",
            "Registro de Incorporação — the project's own registration (not the future unit's) at the real estate registry — legally required before sales can begin. It's tied to the matrícula of the land the building sits on, and it can be requested and checked.",
            "Track record of previous projects — how many projects the developer has delivered, whether on time, and any public reviews or lawsuits from past buyers.",
            "CNPJ and the company's legal history — corporate registration status, and any ongoing legal proceedings (processos judiciais) against the developer.",
            "Patrimônio de Afetação — whether this protection has been adopted for the specific project — covered in detail in our article on the SPE structure.",
            "The broker's CRECI — the license handling your transaction should be current and verifiable.",
            "Actual construction stage — verified through documents and, if possible, in person — not just from the presentation and renders.",
          ],
        },
        {
          heading: "Bottom Line",
          paragraphs: [
            "Buying property in Brazil as a foreigner has no legal barriers, but it follows a clear sequence: CPF → account → property verification → transfer → deed → registration. One-off entry costs run 4–6% on top of the property's price. Everything else comes down to verifying properly before the money moves, not after.",
            "This material is for informational purposes only and does not constitute legal or tax advice. For guidance on your specific transaction, consult an attorney.",
          ],
        },
      ],
    },
    ru: {
      sections: [
        {
          heading: "Коротко о главном",
          paragraphs: [
            "Два вопроса, которые задают чаще всего: «как это вообще происходит» и «сколько это будет стоить сверху». Отвечаю на оба сразу, по шагам, с цифрами на каждом этапе — чтобы не пришлось собирать картину по кусочкам из разных источников.",
          ],
        },
        {
          heading: "Может ли иностранец вообще купить недвижимость в Бразилии",
          paragraphs: [
            "Да, без ограничений для городской недвижимости. Иностранец может владеть квартирой или домом в Бразилии на тех же условиях, что и гражданин — специального разрешения не требуется, кроме отдельных категорий приграничных и сельских земель, которые не касаются обычной жилой покупки.",
            "Важная оговорка о сфере этой статьи. Здесь рассмотрена покупка новостройки — объекта на стадии строительства или предпродажи, напрямую у застройщика. Для вторичного рынка процесс due diligence и юридическая проверка могут существенно отличаться (там как раз проверяется matrícula конкретного объекта, чего нет у новостройки). Для сделки на вторичном рынке рекомендуем отдельную консультацию.",
          ],
        },
        {
          heading: "Шаг за шагом",
          paragraphs: [
            "1. CPF (бразильский налоговый номер физлица) — без него нельзя открыть счёт, зарегистрировать сделку, платить налоги. Оформляется через консульство или напрямую в Бразилии.",
            "2. Банковский счёт — формально не всегда строго обязателен, но практически необходим для валютной операции и её регистрации.",
            "3. Выбор объекта и проверка застройщика — подробный чек-лист ниже в этой статье.",
            "4. Международный перевод — из вашего банка на бразильский счёт, с регистрацией поступления капитала в Центробанке.",
            "5. Договор с застройщиком — подписание договора купли-продажи (может быть в виде котас или прямого контракта — зависит от структуры проекта).",
            "6. Сдача и регистрация — после завершения строительства, регистрация объекта в Cartório de Registro de Imóveis. С этого момента вы официально владелец.",
          ],
        },
        {
          heading: "Сколько это стоит на самом деле — по шагам, не одной цифрой",
          paragraphs: [
            "Хорошая новость про комиссию. Комиссия агентства или брокера обычно составляет 5% от стоимости объекта. Но при покупке новостройки эту комиссию, как правило, платит продавец (застройщик), а не покупатель. Для вас как покупателя это чаще всего не дополнительная статья расходов.",
            "Важный нюанс про ITBI. При покупке новостройки ITBI обычно не платится в момент покупки. Этот налог взимается только при регистрации объекта в реестре недвижимости — а она происходит уже после сдачи дома. Это значит, что можно даже перепродать свой юнит до завершения стройки, ни разу не заплатив ITBI лично — налог заплатит тот, кто в итоге зарегистрирует готовый объект на своё имя.",
            "При покупке (пресейл/стройка): комиссия обычно на продавце — прямых расходов для покупателя чаще всего нет. При регистрации (после сдачи): ITBI (налог на переход права собственности) — 2–3% от стоимости объекта, плюс нотариальные услуги. Ежегодно: IPTU — 0,3–1,5% от оценочной стоимости в год. При продаже: налог на прирост капитала — подробности в отдельной статье.",
          ],
        },
        {
          heading: "Как проверить застройщика — на что смотреть",
          paragraphs: [
            "У новостройки нет собственной matrícula — дом ещё не построен, юниты не выделены как отдельные объекты в реестре. Поэтому проверка идёт не через выписку по объекту, а через проверку самого застройщика и проекта.",
            "Registro de Incorporação — регистрация самого проекта (не будущего юнита) в реестре недвижимости — обязательна по закону до начала продаж. Привязана к matrícula земли, на которой строится объект, и её можно запросить и проверить.",
            "История сдачи предыдущих проектов — сколько объектов застройщик уже сдал, вовремя ли, есть ли публичные отзывы или судебные иски от предыдущих покупателей.",
            "CNPJ и юридическая история компании — регистрация юрлица, наличие текущих судебных процессов (processos judiciais) против застройщика.",
            "Patrimônio de afetação — оформлена ли эта защита по конкретному проекту — подробно разбирали в статье про структуру SPE.",
            "CRECI брокера, который сопровождает сделку — лицензия должна быть действующей и проверяемой.",
            "Реальный этап строительства — по документам и, если возможно, лично на месте — не только по презентации и рендерам.",
          ],
        },
        {
          heading: "Что в итоге",
          paragraphs: [
            "Покупка недвижимости в Бразилии иностранцем — процесс без юридических барьеров, но с чёткой последовательностью шагов: CPF → счёт → проверка объекта → перевод → сделка → регистрация. Разовые расходы на входе — 4–6% сверх цены объекта. Всё остальное — вопрос правильной проверки перед тем, как вносить деньги, а не после.",
            "Материал носит информационный характер и не является юридической или налоговой консультацией. Для оценки вашей конкретной сделки рекомендуем консультацию с юристом.",
          ],
        },
      ],
    },
  },

  'santa-catarina-market-outlook-2027': {
    en: {
      sections: [
        {
          heading: "The Short Version",
          paragraphs: [
            "Santa Catarina remains Brazil's fastest-growing real estate market, driven by infrastructure investment, tech sector expansion, and international migration. This outlook covers key projections for 2027 across all major investment areas, grounded in FipeZap data, Alphaplan/Sinduscon methodology, and Brain Inteligência Estratégica's industry analysis.",
            "Headline figures: 12% projected market growth, $4.2Bn market volume, 85+ active projects, 18% foreign buyer growth. Exchange rate used throughout: 1 USD = R$5.15.",
          ],
        },
        {
          heading: "Key Catalysts for 2027",
          paragraphs: [
            "Hercílio Luz Airport expansion — new international routes, capacity doubling.",
            "BR-101 highway improvements — faster connections between Balneário Camboriú, Itapema, and Porto Belo.",
            "Tech sector growth — 300+ startups, major companies relocating to Florianópolis.",
            "Brazil's digital nomad visa — increased foreign presence and rental demand.",
          ],
        },
        {
          heading: "Price Projections by Area for 2027",
          paragraphs: [
            "Itapema: $2.9K/m² (R$14.9K) in 2026 → $3.4K/m² (R$17.6K) est. 2027, +18% growth, Very Bullish outlook. Jurerê Internacional: $4.1K/m² (R$21.1K) → $4.6K/m² (R$23.7K), +12%, Bullish. Porto Belo: $1.6K/m² (R$8.2K) → $1.8K/m² (R$9.3K), +14%, Positive. Lagoa (Floripa): $2.4K/m² (R$12.4K) → $2.6K/m² (R$13.4K), +10%, Steady.",
            "Campeche: $1.7K/m² (R$8.8K) → $1.9K/m² (R$9.8K), +11%, Positive. Ingleses: $2.0K/m² (R$10.3K) → $2.2K/m² (R$11.3K), +9%, Steady. Rancho Queimado: $660/m² (R$3.4K) → $750/m² (R$3.9K), +12%, Emerging. Balneário Camboriú: $2.9K/m² (R$15K) in 2026 — see the Balneário Camboriú section below for a shift in coastal leadership.",
            "Prices are estimates based on current trajectories. Actual results may vary.",
          ],
        },
        {
          heading: "A Special Case: Balneário Camboriú — a Change of Leader",
          paragraphs: [
            "For years BC was Brazil's undisputed price-per-m² leader — holding the #1 spot in the FipeZap ranking since 2022. In May 2026, that changed: Itapema overtook BC for the first time — R$15,226/m² versus R$15,215/m², a razor-thin but symbolic R$11 difference.",
            "Not a decline — a shift in market shape. Land for new development in BC has nearly run out, and the city is shifting toward ultra-luxury: the average sold property value rose 15% to R$2.19 million — higher than São Paulo (R$895.9K) or Curitiba (R$734.5K). The landmark example is Senna Tower: 550 meters tall, units starting at R$28 million, total project VGV of R$8.5 billion.",
            "Practical takeaway: BC remains a mature, liquid market, but with land for mass development largely exhausted. Itapema and Porto Belo are where growth momentum is now building, thanks to a more flexible master plan and available land.",
          ],
        },
        {
          heading: "Key Investment Trends for 2027",
          paragraphs: [
            "1. Shift to Pre-Construction Buying — 60% of new buyer inquiries in 2026 were for off-plan properties, driven by price advantage and interest-free installment plans.",
            "2. Remote Worker Migration — 15,000+ remote workers annually to Florianópolis, driving demand for long-term rentals in Lagoa, Centro, and Campeche. Average stay: 6-18 months.",
            "3. Rise of Eco-Luxury in Porto Belo — Beto Carrero World expansion, new golf communities, and sustainable building mandates.",
            "4. Itapema as the New BC — mirrors BC's 2016 growth trajectory, now confirmed by an actual national price-per-m² leadership handover.",
            "5. Currency Advantage for Foreign Buyers — BRL depreciation against USD/EUR creates favorable entry points, a 15-25% purchasing power advantage for US and European buyers.",
          ],
        },
        {
          heading: "National Context — What Industry Analysis Says",
          paragraphs: [
            "Per Brain Inteligência Estratégica (nationwide 2026 outlook), demand in Brazil's real estate market continues to outpace supply, with prices growing faster than official inflation (IPCA) and the construction cost index (INCC). In the luxury and super-luxury segments, the trend is toward smaller footprints with greater focus on quality and location — directly mirroring what's happening in Santa Catarina.",
            "The methodology behind quarterly Balneário Camboriú market reports (a partnership between Alphaplan Inteligência em Pesquisas and Órulo, supported by Sinduscon) tracks inventory levels, VGV, units under construction, and units in pre-sale — the kind of granular data that explains the structural trends above.",
          ],
        },
        {
          heading: "Risks to Monitor",
          paragraphs: [
            "BRL volatility — high likelihood, medium impact. Mitigation: diversify entry timing, hedge currency.",
            "Oversupply in BC — medium likelihood, medium impact. Mitigation: focus on areas with genuine rental demand.",
            "Construction delays — medium likelihood, low impact. Mitigation: choose developers with a proven delivery record.",
            "Interest rate changes — low likelihood, medium impact. Mitigation: pre-construction buying locks in pricing.",
            "Environmental regulations — low likelihood, high impact. Mitigation: buy in already-approved developments.",
          ],
        },
        {
          heading: "Plan B's 2027 Outlook",
          paragraphs: [
            "We maintain a bullish outlook on Santa Catarina real estate for 2027. The combination of infrastructure investment, tech sector growth, international migration, and currency advantages creates a compelling investment case. Key recommendations: enter Itapema early, diversify across Floripa districts, and consider pre-construction for maximum upside. Target 12-18% appreciation in emerging areas, 8-12% in mature markets.",
            "This material is for informational purposes only and does not constitute investment advice. Sources: Índice FipeZap (2026), Alphaplan Inteligência em Pesquisas / Sinduscon, Brain Inteligência Estratégica. Forecast figures are estimates; actual results may vary.",
          ],
        },
      ],
    },
    ru: {
      sections: [
        {
          heading: "Коротко о главном",
          paragraphs: [
            "Санта-Катарина остаётся самым быстрорастущим рынком недвижимости Бразилии — драйверы: инфраструктурные инвестиции, рост технологического сектора и приток иностранных покупателей. Этот прогноз охватывает ключевые ожидания на 2027 год по всем основным зонам инвестирования, с опорой на данные FipeZap, Alphaplan/Sinduscon и отраслевую аналитику Brain.",
            "Ключевые цифры: 12% прогнозируемый рост рынка, $4,2 млрд объём рынка, 85+ активных проектов, 18% рост иностранных покупателей. Курс, используемый везде: 1 USD = R$5,15.",
          ],
        },
        {
          heading: "Ключевые катализаторы на 2027 год",
          paragraphs: [
            "Расширение аэропорта Эрсилиу-Лус — новые международные маршруты, удвоение пропускной способности.",
            "Улучшение трассы BR-101 — более быстрое сообщение между Балнеариу-Камбориу, Итапемой и Порту-Белу.",
            "Рост технологического сектора — 300+ стартапов, крупные компании переезжают во Флорианополис.",
            "Виза цифрового кочевника Бразилии — рост присутствия иностранцев и спроса на аренду.",
          ],
        },
        {
          heading: "Прогноз цен по районам на 2027 год",
          paragraphs: [
            "Итапема: $2,9K/м² (R$14,9K) в 2026 → $3,4K/м² (R$17,6K) прогноз на 2027, рост +18%, оценка Very Bullish. Журере Интернасьонал: $4,1K/м² (R$21,1K) → $4,6K/м² (R$23,7K), +12%, Bullish. Порту-Белу: $1,6K/м² (R$8,2K) → $1,8K/м² (R$9,3K), +14%, Positive. Лагоа (Флорипа): $2,4K/м² (R$12,4K) → $2,6K/м² (R$13,4K), +10%, Steady.",
            "Кампече: $1,7K/м² (R$8,8K) → $1,9K/м² (R$9,8K), +11%, Positive. Инглезес: $2,0K/м² (R$10,3K) → $2,2K/м² (R$11,3K), +9%, Steady. Ранчо-Кеймаду: $660/м² (R$3,4K) → $750/м² (R$3,9K), +12%, Emerging. Балнеариу-Камбориу: $2,9K/м² (R$15K) в 2026 — смотрите раздел ниже про смену лидера на побережье.",
            "Цены — оценки на основе текущих трендов. Реальные результаты могут отличаться.",
          ],
        },
        {
          heading: "Особый случай: Балнеариу-Камбориу — смена лидера",
          paragraphs: [
            "Долгие годы BC был безусловным лидером по цене за м² в Бразилии — с 2022 года держал первое место в рейтинге FipeZap. В мае 2026 года это изменилось: Итапема впервые обошла BC — R$15 226/м² против R$15 215/м², разница минимальна (R$11), но символична.",
            "Не падение, а смена формы рынка. Земли под новую застройку в BC почти не осталось, и город смещается в сегмент ультра-люкса: средний чек проданного объекта вырос на 15% и достиг R$2,19 млн — выше, чем в Сан-Паулу (R$895,9K) и Куритибе (R$734,5K). Знаковый пример — Senna Tower: 550 метров высоты, юниты от R$28 млн, VGV проекта — R$8,5 млрд.",
            "Практический вывод: BC остаётся зрелым, ликвидным рынком, но с исчерпанной землёй под массовую застройку. Итапема и Порту-Белу — там, где сейчас формируется темп роста, за счёт более гибкого генплана и доступной земли.",
          ],
        },
        {
          heading: "Ключевые инвестиционные тренды на 2027 год",
          paragraphs: [
            "1. Сдвиг к покупке на стадии предпродажи — 60% обращений новых покупателей в 2026 году касались объектов вне плана, за счёт цены и беспроцентной рассрочки.",
            "2. Миграция удалённых сотрудников — 15 000+ ежегодно во Флорианополис, спрос на долгосрочную аренду в Лагоа, Центре, Кампече. Средний срок пребывания 6–18 месяцев.",
            "3. Рост эко-люкса в Порту-Белу — расширение Beto Carrero World, новые гольф-сообщества, требования к устойчивому строительству.",
            "4. Итапема как «новый BC» — повторяет траекторию BC 2016 года, теперь подтверждено фактическим переходом национального лидерства по цене за м².",
            "5. Валютное преимущество — ослабление реала создаёт выгодные точки входа, 15–25% преимущества в покупательной способности для покупателей из США/Европы.",
          ],
        },
        {
          heading: "Национальный контекст — что говорит отраслевая аналитика",
          paragraphs: [
            "По оценке Brain Inteligência Estratégica (общенациональный прогноз на 2026), спрос на рынке недвижимости Бразилии продолжает опережать предложение, а цены растут быстрее официальной инфляции (IPCA) и индекса стоимости строительства (INCC). В сегменте люкс и супер-люкс — тренд на меньшие площади с фокусом на качество и локацию, что напрямую совпадает с тем, что происходит в Санта-Катарине.",
            "Методология квартальных отчётов по рынку Балнеариу-Камбориу (партнёрство Alphaplan Inteligência em Pesquisas и Órulo, при поддержке Sinduscon) фиксирует данные по запасу объектов, VGV, количеству объектов в стройке и на предпродаже — детальная статистика, которая объясняет структурные тренды выше.",
          ],
        },
        {
          heading: "Риски, которые стоит учитывать",
          paragraphs: [
            "Волатильность реала — высокая вероятность, среднее влияние. Как снизить: диверсифицировать момент входа, хеджировать валюту.",
            "Переизбыток предложения в BC — средняя вероятность, среднее влияние. Как снизить: фокус на районах с реальным спросом на аренду.",
            "Задержки строительства — средняя вероятность, низкое влияние. Как снизить: выбирать застройщиков с подтверждённой историей.",
            "Изменение процентных ставок — низкая вероятность, среднее влияние. Как снизить: покупка на предпродаже фиксирует цену.",
            "Экологическое регулирование — низкая вероятность, высокое влияние. Как снизить: покупать в уже согласованных проектах.",
          ],
        },
        {
          heading: "Прогноз Plan B на 2027 год",
          paragraphs: [
            "Мы сохраняем позитивный (bullish) прогноз по рынку недвижимости Санта-Катарины на 2027 год. Сочетание инфраструктурных инвестиций, роста технологического сектора, международной миграции и валютного преимущества формирует убедительный инвестиционный кейс. Ключевые рекомендации: ранний вход в Итапему, диверсификация по районам Флорианополиса, рассмотрение покупки на предпродаже для максимального потенциала роста. Целевой диапазон роста — 12–18% в развивающихся районах, 8–12% в зрелых рынках.",
            "Материал носит информационный характер и не является инвестиционной рекомендацией. Источники: Índice FipeZap (2026), Alphaplan Inteligência em Pesquisas / Sinduscon, Brain Inteligência Estratégica. Прогнозные цифры — оценки, фактические результаты могут отличаться.",
          ],
        },
      ],
    },
  },

  'best-areas-to-invest-in-santa-catarina-2026': {
    en: {
      sections: [
        {
          heading: "The Short Version",
          paragraphs: [
            "Santa Catarina has emerged as Brazil's premier real estate investment destination, combining exceptional quality of life, strong rental yields, and consistent property appreciation. This report analyzes the state's most promising areas for international and domestic investors. Exchange rate: 1 USD = R$5.15, unified across all Plan B materials.",
            "Headline figures: 7.3M state population, 8.2% avg. annual price growth, 6.5% avg. rental yield, 12.4% 5-year appreciation.",
            "Florianópolis leads — 42% of all foreign investment in Santa Catarina goes to this city. Jurerê Internacional is Brazil's most expensive beach neighborhood, at R$18,000–25,000 (~$3.5K–$4.9K)/m². Itapema shows the highest growth, with prices 30–40% below Balneário Camboriú. Porto Belo is an emerging eco-luxury destination on the back of the Beto Carrero World expansion.",
          ],
        },
        {
          heading: "Price per m² Comparison by Area",
          paragraphs: [
            "Data: FipeZap, developer reports, ZAP Imóveis (Q2 2026). Price per m², from premium to entry-level: Jurerê Internacional R$22,000 (~$4K) — yield 5.2%, growth 12%/yr, score 9.0. Balneário Camboriú R$15,000 (~$3K) — yield 4.8%, growth see BC section below, score 8.5. Lagoa da Conceição R$12,500 (~$2K) — yield 6.8%, growth 10%/yr, score 8.5.",
            "Ingleses R$10,800 (~$2K) — yield 7.1%, growth 9%/yr, score 8.2. Itapema (Meia Praia) R$10,000 (~$2K) — yield 7.2%, growth 18%/yr, score 9.0. Canasvieiras R$9,500 (~$2K) — yield 7.5%, growth 8%/yr, score 7.8.",
            "Campeche R$8,900 (~$2K) — yield 6.5%, growth 11%/yr, score 8.0. Porto Belo R$8,500 (~$2K) — yield 6.8%, growth 14%/yr, score 7.8. Centro (Floripa) R$7,200 (~$1K) — yield 6.2%, growth 7%/yr, score 7.2. Rancho Queimado R$3,500 (~$660) — yield 5.5%, growth 12%/yr, score 7.5.",
            "A note on the Itapema figure: R$10,000/m² is the price specifically at Meia Praia, a more affordable sub-area of Itapema. The city-wide average (FipeZap, May 2026) is R$15,226/m², reflecting new premium beachfront development that pushed Itapema to the national #1 price-per-m² spot, overtaking Balneário Camboriú. Both figures are accurate — they refer to different segments of the same city.",
          ],
        },
        {
          heading: "Florianópolis — Brazil's Silicon Island",
          paragraphs: [
            "Florianópolis is the economic and cultural center of Santa Catarina, with a metropolitan population of over 1 million. The city combines a thriving tech sector (\"Silicon Island\"), world-class beaches, and a growing international community. Hercílio Luz International Airport handles 4M+ passengers annually.",
            "By district: Jurerê Internacional R$22K/m², 5.2% yield, 12%/yr growth — premium investment. Lagoa da Conceição R$12.5K/m², 6.8% yield, 10%/yr — lifestyle + rental. Ingleses R$10.8K/m², 7.1% yield, 9%/yr — mid-range rental. Canasvieiras R$9.5K/m², 7.5% yield, 8%/yr — budget-friendly. Centro R$7.2K/m², 6.2% yield, 7%/yr — urban living. Campeche R$8.9K/m², 6.5% yield, 11%/yr — highest upside.",
            "Plan B commentary: Florianópolis offers the best combination of infrastructure, lifestyle, and investment returns in Brazil. Jurerê remains the blue-chip choice, while Campeche presents the highest upside potential for 2026–2028. For the full city-level breakdown — infrastructure catalysts, price trend since 2018, district-by-district verdicts — see our dedicated [Florianópolis investment report](/research/report/florianopolis-investment-report-2026).",
          ],
        },
        {
          heading: "Balneário Camboriú vs Itapema — a 2026 Leadership Shift",
          paragraphs: [
            "Known as the \"Brazilian Dubai,\" Balneário Camboriú has transformed into a luxury high-rise destination. For years BC was Brazil's undisputed price-per-m² leader — holding the #1 FipeZap ranking since 2022. In May 2026, that changed.",
            "Balneário Camboriú: price/m² R$15,215, rank #2 (was #1 since 2022), average deal value R$2.19M (+15%), market character ultra-luxury with land exhausted. Itapema: price/m² R$15,226, rank #1 (first time since May 2026), 12-month growth +8.22%, market character flexible master plan with available land.",
            "Not a decline for BC — a shift in market shape. Land for new development in BC has nearly run out, and the city is shifting toward ultra-luxury — the landmark example is Senna Tower: 550 meters tall, units starting at R$28 million. The average sold property value in BC rose 15% to R$2.19 million — higher than São Paulo.",
            "BC scores: Investment Potential 8.5/10, Rental Demand 7.0/10, Liquidity 8.0/10, Lifestyle 9.0/10, Long-Term Growth 8.5/10. Plan B commentary on BC: the luxury play — high entry cost but strong prestige factor, while seasonal rental demand remains the weak point. Best suited for investors with R$1,000,000 (~$194K)+ budgets. Long-term holds (5+ years) remain the most profitable strategy.",
            "Itapema scores: Investment Potential 9.0/10, Rental Demand 8.0/10, Liquidity 7.0/10, Lifestyle 7.5/10, Long-Term Growth 9.0/10. Plan B commentary on Itapema: our top pick for capital appreciation in 2026. The growth trajectory mirrors BC ten years ago. Entry point: R$500,000–800,000 (~$97K–$155K) for a 2BR.",
          ],
        },
        {
          heading: "Porto Belo & Rancho Queimado",
          paragraphs: [
            "Porto Belo — eco-luxury haven. Combines pristine beaches with a growing eco-tourism sector. Home to several luxury condominium projects and the upcoming Beto Carrero World expansion. Scores: Investment Potential 7.8/10, Rental Demand 7.5/10, Liquidity 6.5/10, Lifestyle 9.0/10, Long-Term Growth 8.0/10.",
            "Rancho Queimado — the future frontier. An emerging destination focused on gated communities and rural lifestyle properties. At prices starting from R$3,500 (~$680)/m², it offers the lowest entry point in Santa Catarina. Scores: Investment Potential 7.5/10, Rental Demand 5.5/10, Liquidity 5.0/10, Lifestyle 8.0/10, Long-Term Growth 8.5/10.",
          ],
        },
        {
          heading: "Final Rankings — Best Areas 2026",
          paragraphs: [
            "1. Florianópolis (Jurerê) — score 9.0, best for premium/liquidity, entry (2BR) R$1.2–1.8M (~$233–350K). 2. Itapema (Meia Praia) — score 9.0, capital appreciation, R$500–800K (~$97–155K). 3. Florianópolis (Lagoa) — score 8.5, lifestyle + rental income, R$700K–1M (~$136–194K). 4. Balneário Camboriú — score 8.5, luxury/HNWI buyers, R$1–2M (~$194–388K).",
            "5. Florianópolis (Campeche) — score 8.0, upside potential, R$500–700K (~$97–136K). 6. Porto Belo — score 7.8, eco-luxury/nature, R$400–700K (~$78–136K). 7. Florianópolis (Ingleses) — score 7.8, mid-range investment, R$550–800K (~$107–155K). 8. Rancho Queimado — score 7.5, speculative entry, R$200–350K (~$39–68K).",
          ],
        },
        {
          heading: "Risk Factors",
          paragraphs: [
            "Currency risk — BRL volatility, 10–20% annually vs USD/EUR. Liquidity risk — selling typically takes 6–18 months. Construction delays — 6–12 month delays are common. Regulatory changes — Brazilian property laws may evolve. For the macro backdrop behind these numbers — the 2026 rate environment, credit conditions, and why national/city averages increasingly mask submarket-level differences — see our [2026-2027 market strategy report](/research/report/brazil-market-strategy-2026-2027).",
          ],
        },
        {
          heading: "Plan B Verdict — Areas Analysis",
          paragraphs: [
            "Jurerê: blue-chip SC real estate, highest liquidity. Best for HNWIs and wealth preservation. Avoid if budget < R$1M. Itapema: ⭐ top pick for growth, \"BC of 2016.\" Best for growth investors, 3–7 yr horizon. Avoid if you need income now. Lagoa: best lifestyle + yield balance. Best for digital nomads. Avoid if seeking pure capital appreciation.",
            "Balneário Camboriú: the luxury play, seasonal rental is the weak point. Best for premium buyers, status. Avoid if you need cash flow immediately. Campeche: highest upside within Floripa. Best for value investors, 5+ yr. Avoid if you need an already-established neighborhood. Porto Belo: niche play, eco-luxury. Best for a secondary home. Avoid if you need high liquidity.",
            "Ingleses: solid rental market. Best for conservative investors. Avoid if seeking high capital growth. Rancho Queimado: speculative frontier. Best for risk-tolerant, rural-lifestyle buyers. Avoid if you need liquidity or income.",
          ],
        },
        {
          heading: "Plan B Top Recommendations 2026",
          paragraphs: [
            "1. Itapema (Meia Praia) — best capital appreciation. 18% growth, prices 30–40% below BC. 2. Florianópolis (Campeche) — best value in the capital. New infrastructure, growing demand. 3. Florianópolis (Jurerê) — best for wealth preservation. Highest liquidity.",
            "This material is for informational purposes only and does not constitute investment advice. Sources: Índice FipeZap (2026), developer reports, ZAP Imóveis (Q2 2026). Itapema and Balneário Camboriú figures updated with May 2026 data.",
          ],
        },
      ],
    },
    ru: {
      sections: [
        {
          heading: "Коротко о главном",
          paragraphs: [
            "Santa Catarina стала главным направлением для инвестиций в недвижимость в Бразилии — сочетание высокого качества жизни, устойчивой доходности от аренды и стабильного роста цен. Этот отчёт разбирает самые перспективные районы штата для международных и локальных инвесторов. Курс: 1 USD = R$5,15, унифицировано по всем материалам Plan B.",
            "Ключевые цифры: 7,3М население штата, 8,2% средний годовой рост цен, 6,5% средняя доходность от аренды, 12,4% рост цен за 5 лет.",
            "Флорианополис лидирует — 42% всех иностранных инвестиций в Санта-Катарине приходится на этот город. Журере Интернасьонал — самый дорогой пляжный район Бразилии, R$18 000–25 000 (~$3,5K–$4,9K)/м². Итапема показывает самый высокий рост, цены на 30–40% ниже, чем в Балнеариу-Камбориу. Порту-Белу — растущее направление эко-люкса на фоне расширения Beto Carrero World.",
          ],
        },
        {
          heading: "Сравнение цены за м² по районам",
          paragraphs: [
            "Данные: FipeZap, отчёты застройщиков, ZAP Imóveis (Q2 2026). Цена за м², от премиума до входного уровня: Журере Интернасьонал R$22 000 (~$4K) — доходность 5,2%, рост 12%/год, скор 9.0. Балнеариу-Камбориу R$15 000 (~$3K) — доходность 4,8%, рост см. раздел про BC ниже, скор 8.5. Лагоа-да-Консейсау R$12 500 (~$2K) — доходность 6,8%, рост 10%/год, скор 8.5.",
            "Инглезес R$10 800 (~$2K) — доходность 7,1%, рост 9%/год, скор 8.2. Итапема (Meia Praia) R$10 000 (~$2K) — доходность 7,2%, рост 18%/год, скор 9.0. Канасвиэйрас R$9 500 (~$2K) — доходность 7,5%, рост 8%/год, скор 7.8.",
            "Кампече R$8 900 (~$2K) — доходность 6,5%, рост 11%/год, скор 8.0. Порту-Белу R$8 500 (~$2K) — доходность 6,8%, рост 14%/год, скор 7.8. Центр (Флорипа) R$7 200 (~$1K) — доходность 6,2%, рост 7%/год, скор 7.2. Ранчо-Кеймаду R$3 500 (~$660) — доходность 5,5%, рост 12%/год, скор 7.5.",
            "О цифре по Итапеме: R$10 000/м² — цена конкретно на пляже Meia Praia, более доступного субрайона Итапемы. Общегородская средняя (FipeZap, май 2026) — R$15 226/м², с учётом новой премиальной застройки, которая вывела Итапему на первое место в стране по цене за м², обойдя Балнеариу-Камбориу. Обе цифры верны — они про разные сегменты одного города.",
          ],
        },
        {
          heading: "Флорианополис — Silicon Island Бразилии",
          paragraphs: [
            "Флорианополис — экономический и культурный центр Санта-Катарины, население агломерации превышает 1 миллион человек. Город сочетает растущий технологический сектор («Silicon Island»), пляжи мирового уровня и растущее международное сообщество. Международный аэропорт Эрсилиу-Лус обслуживает более 4 миллионов пассажиров в год.",
            "По районам: Журере Интернасьонал R$22K/м², доходность 5,2%, рост 12%/год — премиальные инвестиции. Лагоа-да-Консейсау R$12,5K/м², доходность 6,8%, рост 10%/год — лайфстайл + аренда. Инглезес R$10,8K/м², доходность 7,1%, рост 9%/год — аренда среднего сегмента. Канасвиэйрас R$9,5K/м², доходность 7,5%, рост 8%/год — бюджетный вход. Центр R$7,2K/м², доходность 6,2%, рост 7%/год — городская жизнь. Кампече R$8,9K/м², доходность 6,5%, рост 11%/год — наибольший потенциал роста.",
            "Комментарий Plan B: Флорианополис предлагает лучшее сочетание инфраструктуры, лайфстайла и доходности инвестиций в Бразилии. Журере остаётся выбором blue-chip, тогда как Кампече демонстрирует наибольший потенциал роста на 2026–2028 годы. Полную разбивку по городу — инфраструктурные катализаторы, динамику цен с 2018 года, вердикты по районам — см. в нашем отдельном [отчёте по Флорианополису](/research/report/florianopolis-investment-report-2026).",
          ],
        },
        {
          heading: "Балнеариу-Камбориу vs Итапема — смена лидера на 2026 год",
          paragraphs: [
            "Известный как «бразильский Дубай», Балнеариу-Камбориу превратился в направление люксовых высоток. Годами BC был безусловным национальным лидером по цене за м² — с 2022 года держал первое место в рейтинге FipeZap. В мае 2026 года это изменилось.",
            "Балнеариу-Камбориу: цена/м² R$15 215, позиция #2 (была #1 с 2022), средний чек сделки R$2,19M (+15%), характер рынка — ультра-люкс, земля исчерпана. Итапема: цена/м² R$15 226, позиция #1 (впервые с мая 2026), рост за год +8,22%, характер рынка — гибкий генплан, земля есть.",
            "Не ослабление BC, а смена формы рынка. Свободной земли под новую застройку в BC почти не осталось, и город смещается в сегмент ультра-люкса — знаковый пример Senna Tower: 550 метров высоты, юниты от R$28 млн. Средний чек проданного объекта в BC вырос на 15% и достиг R$2,19 млн — выше, чем в Сан-Паулу.",
            "Оценки BC: Investment Potential 8.5/10, Rental Demand 7.0/10, Liquidity 8.0/10, Lifestyle 9.0/10, Long-Term Growth 8.5/10. Комментарий Plan B по BC: игра на люксе — высокий порог входа, но сильный престиж-фактор, при этом сезонный спрос на аренду остаётся слабым местом. Лучше всего подходит инвесторам с бюджетом от R$1 000 000 (~$194K). Наиболее прибыльная стратегия — долгосрочное владение (5+ лет).",
            "Оценки Итапема: Investment Potential 9.0/10, Rental Demand 8.0/10, Liquidity 7.0/10, Lifestyle 7.5/10, Long-Term Growth 9.0/10. Комментарий Plan B по Итапеме: наш топ-пик для роста капитала на 2026 год. Траектория роста напоминает BC десять лет назад. Порог входа: R$500 000–800 000 (~$97K–$155K) за 2-комнатную квартиру.",
          ],
        },
        {
          heading: "Порту-Белу и Ранчо-Кеймаду",
          paragraphs: [
            "Порту-Белу — эко-люкс гавань. Сочетает нетронутые пляжи с растущим сектором эко-туризма. Здесь строится несколько люксовых кондоминиумов, ожидается расширение Beto Carrero World. Оценки: Investment Potential 7.8/10, Rental Demand 7.5/10, Liquidity 6.5/10, Lifestyle 9.0/10, Long-Term Growth 8.0/10.",
            "Ранчо-Кеймаду — граница будущего. Развивающееся направление с закрытыми посёлками и сельской недвижимостью. При цене от R$3 500 (~$680)/м² предлагает самый доступный вход в Санта-Катарине. Оценки: Investment Potential 7.5/10, Rental Demand 5.5/10, Liquidity 5.0/10, Lifestyle 8.0/10, Long-Term Growth 8.5/10.",
          ],
        },
        {
          heading: "Итоговый рейтинг районов 2026",
          paragraphs: [
            "1. Флорианополис (Журере) — score 9.0, премиум/ликвидность, вход (2BR) R$1,2–1,8M (~$233–350K). 2. Итапема (Meia Praia) — score 9.0, рост капитала, R$500–800K (~$97–155K). 3. Флорианополис (Лагоа) — score 8.5, лайфстайл + доход, R$700K–1M (~$136–194K). 4. Балнеариу-Камбориу — score 8.5, люкс/HNWI, R$1–2M (~$194–388K).",
            "5. Флорианополис (Кампече) — score 8.0, потенциал роста, R$500–700K (~$97–136K). 6. Порту-Белу — score 7.8, эко-люкс/природа, R$400–700K (~$78–136K). 7. Флорианополис (Инглезес) — score 7.8, инвестиции среднего сегмента, R$550–800K (~$107–155K). 8. Ранчо-Кеймаду — score 7.5, спекулятивный вход, R$200–350K (~$39–68K).",
          ],
        },
        {
          heading: "Факторы риска",
          paragraphs: [
            "Валютный риск — волатильность реала, 10–20% в год к USD/EUR. Риск ликвидности — продажа обычно занимает 6–18 месяцев. Задержки строительства — отклонения на 6–12 месяцев обычное явление. Регуляторные изменения — законы о недвижимости в Бразилии могут меняться. Макроконтекст за этими цифрами — ставки 2026 года, условия кредитования и почему средние по стране/городу всё хуже описывают разницу между субрынками — см. в нашем [отчёте о стратегии рынка 2026-2027](/research/report/brazil-market-strategy-2026-2027).",
          ],
        },
        {
          heading: "Вердикт Plan B по районам",
          paragraphs: [
            "Журере: blue-chip недвижимость СК, максимальная ликвидность. Лучше для HNWI, сохранения капитала. Не подходит, если бюджет < R$1M. Итапема: ⭐ топ-пик роста, «BC 2016 года». Лучше для инвесторов роста, горизонт 3–7 лет. Не подходит, если нужен доход сразу. Лагоа: лучший баланс лайфстайла и доходности. Лучше для цифровых кочевников. Не подходит, если нужен только рост капитала.",
            "Балнеариу-Камбориу: игра на люксе, сезонная аренда — слабое место. Лучше для премиальных покупателей, статуса. Не подходит, если нужен денежный поток сразу. Кампече: наибольший потенциал внутри Флорипы. Лучше для инвесторов ценности, 5+ лет. Не подходит, если нужен устоявшийся район. Порту-Белу: нишевая игра, эко-люкс. Лучше для второй недвижимости. Не подходит, если нужна высокая ликвидность.",
            "Инглезес: устойчивый рынок аренды. Лучше для консервативных инвесторов. Не подходит, если ищете высокий рост капитала. Ранчо-Кеймаду: спекулятивная граница. Лучше для готовых к риску, сельский лайфстайл. Не подходит, если нужна ликвидность или доход.",
          ],
        },
        {
          heading: "Топ-рекомендации Plan B на 2026 год",
          paragraphs: [
            "① Итапема (Meia Praia) — лучший потенциал роста капитала. 18% рост, цены на 30–40% ниже BC. ② Флорианополис (Кампече) — лучшее соотношение цена/качество в столице. Новая инфраструктура, растущий спрос. ③ Флорианополис (Журере) — лучший выбор для сохранения капитала. Максимальная ликвидность.",
            "Материал носит информационный характер и не является инвестиционной рекомендацией. Источники: Índice FipeZap (2026), отчёты застройщиков, ZAP Imóveis (Q2 2026). Цифры по Итапеме и Балнеариу-Камбориу уточнены с учётом данных за май 2026 года.",
          ],
        },
      ],
    },
  },

  'rancho-queimado-investment-report-2026': {
    en: {
      sections: [
        {
          heading: "The Short Version",
          paragraphs: [
            "R$5,000–7,000/m² for gated community houses, rural luxury, short-term rental potential, and the coolest climate in Santa Catarina. Exchange rate: 1 USD = R$5.15, unified across all Plan B materials.",
            "Headline figures: $1.2K avg. price/m² (~R$6K), 5.5% rental yield, 8% annual growth, 8,000 population.",
          ],
        },
        {
          heading: "Market Overview",
          paragraphs: [
            "Rancho Queimado is Santa Catarina's most affordable real estate entry point and an emerging rural-luxury destination. Located inland from Florianópolis in the Serra region, the municipality of 8,000 residents offers a cooler climate (average 18°C vs 25°C on the coast), mountain scenery, and a growing portfolio of gated communities and country estates.",
            "The area is positioned as a weekend escape and second-home destination for Florianópolis residents and visitors seeking nature, tranquility, and a mountain lifestyle.",
            "Located in the Serra region, approximately 50 km inland from Florianópolis and 30 km from São José. Accessed via SC-433 highway, a 45-minute drive from downtown Floripa. The municipality sits at 500–700 meters elevation, giving it a cooler climate than the coast. Surrounded by Atlantic Forest reserves, rivers, and mountain scenery.",
            "Approximately 8,000 permanent residents, with a small but growing number of second-home owners and remote workers. The demographic skews toward families and retirees who value the cooler climate and rural setting. A strong agricultural tradition (apples, grapes, artisanal products) adds to the area's charm.",
          ],
        },
        {
          heading: "Real Estate Price Analysis",
          paragraphs: [
            "Gated community houses: $1.0–1.3K/m² (~R$5–7K), entry from $291K+ (~R$1.5M+) for a 2BR — lifestyle buyers. Country estates (5+ ha): $0.8–1.1K/m² (~R$4–6K), entry from $485K+ (~R$2.5M+) — HNWIs, rural luxury. Standard houses (town): $0.6–0.9K/m² (~R$3–5K), entry from $97K+ (~R$500K+) — local buyers. Land (per hectare): R$100–200K/ha (~$19–39K) — developers, farmers.",
          ],
        },
        {
          heading: "Market Dynamics & Trends",
          paragraphs: [
            "Rancho Queimado is a niche market driven by lifestyle demand rather than speculation. The gated community segment (e.g., Condomínio Verdes Colinas) attracts buyers seeking rural luxury with modern amenities.",
            "STR potential for premium properties: top-performing gated houses achieve $60,000+/year revenue at 55% occupancy and $310/night rates. The market is illiquid — few transactions, limited buyer pool — but prices are stable to moderately rising (+5–10% annually).",
            "The area benefits from its proximity to Florianópolis (45 min) and the growing trend of remote work enabling rural living.",
          ],
        },
        {
          heading: "A Major Catalyst: Alpes Catarina — Indoor Ski Resort",
          paragraphs: [
            "Headline numbers: R$1.5Bn announced investment, 500m indoor slope length — the largest in the Americas, 800K m² Boa Vista tourism district footprint.",
            "Rancho Queimado has an approved project underway: Alpes Catarina, an indoor ski complex billed as the largest indoor ski slope in the Americas (500 meters). The project is part of a larger tourism district called Boa Vista, spanning roughly 800,000 m² and including hotels, restaurants, a brewery, a winery, commercial space, and residential villas.",
            "Project status — an approved plan, not a concept: the municipal master plan has already been approved; the developer is Grupo NOWA, which specializes in high-end real estate. The first residential village is expected to break ground in 2026, pending final environmental approvals. The town already has the Serra da Boa Vista lookout — the largest glass panoramic platform in the state — which already functions as an early tourism draw.",
            "For an investor, this means Rancho Queimado isn't just a niche lifestyle market today — it's a location with a large announced catalyst that could materially shift tourism flow and real estate demand over the coming years. A project of this scale (R$1.5 billion) in a municipality of just 8,000 residents is potentially transformational for the local real estate market.",
          ],
        },
        {
          heading: "Rental Market & Developers",
          paragraphs: [
            "Long-term (annual): $190–380/month (~R$1–2K), gross yield 3.0–4.0%. Short-term (Airbnb, premium): $2,300–4,700/month (~R$12–25K), 60–70% occupancy, gross yield 6.0–8.0%. STR (median): $850–1,300/month (~R$4.5–7K), 40–55% occupancy, gross yield 4.0–5.0%.",
            "Active developers: gated community developers (Verdes Colinas area, luxury houses 560m²+, premium segment), estate developers (rural 5+ hectare properties, ultra-premium), local builders (town center, standard houses, budget segment).",
          ],
        },
        {
          heading: "Plan B Investment Score",
          paragraphs: [
            "Investment 7.5/10. Rental Demand 5.5/10. Liquidity 5.0/10. Lifestyle 8.0/10. Growth 6.5/10. Overall 7.0/10. Plan B Expert Assessment — subjective evaluation based on market analysis. Not financial advice.",
          ],
        },
        {
          heading: "Plan B Verdict — Rancho Queimado",
          paragraphs: [
            "⚠ CONSIDER — for lifestyle + STR, 7+ year hold. Rancho Queimado is a niche lifestyle play with STR potential for premium properties. At $291K+ (~R$1.5M+) for gated community houses, it's accessible for buyers seeking rural luxury. Top-performing STR properties achieve $60K+/year revenue at 55% occupancy — competitive yields if you can secure a premium property. The market is illiquid — few transactions, limited buyer pool — so only invest if you're comfortable with a 7+ year hold. Best for lifestyle buyers who value the cooler climate, mountain scenery, and rural setting, with STR income as a bonus.",
            "This material is for informational purposes only and does not constitute investment advice.",
          ],
        },
      ],
    },
    ru: {
      sections: [
        {
          heading: "Коротко о главном",
          paragraphs: [
            "R$5 000–7 000/м² за дома в закрытых посёлках, сельский люкс, потенциал под краткосрочную аренду и самый прохладный климат в Санта-Катарине. Курс: 1 USD = R$5,15, унифицировано по всем материалам Plan B.",
            "Ключевые цифры: $1,2K средняя цена/м² (~R$6K), 5,5% доходность от аренды, 8% рост в год, 8К население.",
          ],
        },
        {
          heading: "Обзор рынка",
          paragraphs: [
            "Ранчо-Кеймаду — самый доступный вход в недвижимость Санта-Катарины и растущее направление «сельского люкса». Расположен в глубине материка от Флорианополиса, в регионе Серра, муниципалитет с населением 8 000 человек предлагает более прохладный климат (в среднем 18°C против 25°C на побережье), горные пейзажи и растущий портфель закрытых посёлков и загородных усадеб.",
            "Район позиционируется как направление для отдыха выходного дня и вторая недвижимость для жителей Флорианополиса и гостей, ищущих природу, спокойствие и горный лайфстайл.",
            "Регион Серра, примерно 50 км вглубь от Флорианополиса и 30 км от Сан-Жозе. Доступ по трассе SC-433, 45 минут на машине от центра Флорипы. Муниципалитет находится на высоте 500–700 метров, что даёт более прохладный климат, чем на побережье. Территория окружена заповедниками Атлантического леса, реками и горными пейзажами.",
            "Около 8 000 постоянных жителей, небольшое, но растущее число владельцев второй недвижимости и удалённых сотрудников. Демография смещена в сторону семей и пенсионеров, ценящих прохладный климат и сельский уклад. Сильные аграрные традиции (яблоки, виноград, ремесленные продукты) добавляют району характера.",
          ],
        },
        {
          heading: "Анализ цен на недвижимость",
          paragraphs: [
            "Дома в закрытых посёлках: $1,0–1,3K/м² (~R$5–7K), вход от $291K+ (~R$1,5M+) за 2BR — лайфстайл-покупатели. Усадьбы (5+ га): $0,8–1,1K/м² (~R$4–6K), вход от $485K+ (~R$2,5M+) — HNWI, сельский люкс. Обычные дома (город): $0,6–0,9K/м² (~R$3–5K), вход от $97K+ (~R$500K+) — локальные покупатели. Земля (за гектар): R$100–200K/га (~$19–39K) — застройщики, фермеры.",
          ],
        },
        {
          heading: "Рыночная динамика",
          paragraphs: [
            "Ранчо-Кеймаду — нишевый рынок, движимый лайфстайл-спросом, а не спекуляцией. Сегмент закрытых посёлков (например, Condomínio Verdes Colinas) привлекает покупателей, ищущих сельский люкс с современными удобствами.",
            "STR-потенциал премиальных объектов: топовые дома в закрытых посёлках приносят от $60 000+/год при загрузке 55% и ставке $310/ночь. Рынок низколиквидный — мало сделок, ограниченный пул покупателей — но цены стабильны или умеренно растут (+5–10% в год).",
            "Район выигрывает от близости к Флорианополису (45 минут) и растущего тренда удалённой работы, позволяющего жить за городом.",
          ],
        },
        {
          heading: "Крупный катализатор: Alpes Catarina — крытый горнолыжный курорт",
          paragraphs: [
            "Ключевые цифры: R$1,5Bn заявленный объём инвестиций, 500м длина крытой трассы — крупнейшей в Америках, 800К м² площадь туристического района Boa Vista.",
            "В Rancho Queimado утверждён и находится в стадии реализации проект Alpes Catarina — крытый горнолыжный комплекс, который заявлен как крупнейшая крытая горнолыжная трасса в Северной и Южной Америке (500 метров). Проект — часть более крупного туристического района Boa Vista площадью около 800 000 м², включающего отели, рестораны, пивоварню, винодельню, коммерческие площади и жилые виллы.",
            "Статус проекта — не концепция, а утверждённый план: генплан муниципалитета уже утверждён, застройщик — Grupo NOWA (специализация — недвижимость высокого класса). Первая жилая деревня комплекса должна выйти в стройку уже в 2026 году, при условии завершения экологических согласований. Город уже располагает смотровой площадкой Serra da Boa Vista — крупнейшей панорамной стеклянной платформой штата, которая работает как ранний магнит турпотока.",
            "Для инвестора это означает: Rancho Queimado — не просто нишевый лайфстайл-рынок сегодня, а территория с заявленным крупным катализатором, способным кардинально изменить турпоток и спрос на недвижимость в горизонте нескольких лет. Проект такого масштаба (R$1,5 млрд) в муниципалитете с населением всего 8 000 человек — потенциально трансформационное событие для локального рынка недвижимости.",
          ],
        },
        {
          heading: "Аренда и застройщики",
          paragraphs: [
            "Долгосрочная (годовая): $190–380/мес (~R$1–2K), валовая доходность 3,0–4,0%. Краткосрочная (Airbnb, премиум): $2 300–4 700/мес (~R$12–25K), загрузка 60–70%, валовая доходность 6,0–8,0%. STR (медиана): $850–1 300/мес (~R$4,5–7K), загрузка 40–55%, валовая доходность 4,0–5,0%.",
            "Активные застройщики: застройщики закрытых посёлков (район Verdes Colinas, дома от 560м², премиальный сегмент), застройщики усадеб (сельская недвижимость от 5 га, ультра-премиум), локальные застройщики (центр города, обычные дома, бюджетный сегмент).",
          ],
        },
        {
          heading: "Plan B Investment Score",
          paragraphs: [
            "Investment 7,5/10. Rental Demand 5,5/10. Liquidity 5,0/10. Lifestyle 8,0/10. Growth 6,5/10. Overall 7,0/10. Экспертная оценка Plan B — субъективная оценка на основе анализа рынка. Не является финансовой консультацией.",
          ],
        },
        {
          heading: "Вердикт Plan B — Rancho Queimado",
          paragraphs: [
            "⚠ CONSIDER — для лайфстайла + STR, горизонт 7+ лет. Ранчо-Кеймаду — нишевая лайфстайл-игра с потенциалом краткосрочной аренды для премиальных объектов. При входе от $291K (~R$1,5M+) за дом в закрытом посёлке, район доступен для покупателей, ищущих сельский люкс. Топовые STR-объекты приносят $60K+/год при загрузке 55% — конкурентная доходность, если удастся обеспечить премиальный объект. Рынок низколиквиден, поэтому инвестировать стоит, только если вы готовы к горизонту от 7 лет. Лучше всего подходит лайфстайл-покупателям, которые ценят прохладный климат, горные пейзажи и сельский уклад, с доходом от STR как бонусом.",
            "Материал носит информационный характер и не является инвестиционной рекомендацией.",
          ],
        },
      ],
    },
  },

  'porto-belo-investment-report-2026': {
    en: {
      sections: [
        {
          heading: "The Short Version",
          paragraphs: [
            "Eco-luxury coastal market — R$12–18K/m² on average (full range R$6–25K by segment), 14% annual growth, the Beto Carrero tourism corridor, nature-focused development. Exchange rate: 1 USD = R$5.15, unified across all Plan B materials.",
            "Headline figures: $2.3K avg. price/m² (~R$12K), 6.8% rental yield, 14% annual growth, 25,000 population.",
          ],
        },
        {
          heading: "Market Overview",
          paragraphs: [
            "Porto Belo is an emerging eco-luxury destination on Santa Catarina's central coast, between Itapema and Bombinhas. The municipality of 25,000 residents combines pristine beaches, Atlantic Forest reserves, and a growing portfolio of luxury gated communities.",
            "Porto Belo benefits from its location on the \"tourism corridor,\" which includes Beto Carrero World (Latin America's largest theme park, 15 km away, 1.5M+ annual visitors), cruise ship terminals in Itajaí, and the expanding real estate markets of Itapema and Balneário Camboriú.",
            "Central coast of Santa Catarina, approximately 60 km north of Florianópolis and 20 km south of Balneário Camboriú. Accessed via BR-101 highway and the SC-411 coastal road. The most developed beach area is Balneário Pereqüe. The area is surrounded by Atlantic Forest reserves with significant environmental protections limiting dense development — which actually protects property values by constraining supply.",
            "Approximately 25,000 permanent residents, with a seasonal population that doubles during summer. The municipality grows 3–4% annually, driven by internal migration. The demographic skews toward families and retirees who value the quieter, nature-oriented lifestyle. The summer influx includes significant numbers of theme park visitors, cruise passengers, and domestic tourists.",
          ],
        },
        {
          heading: "Real Estate Price Analysis",
          paragraphs: [
            "Beachfront luxury: $2.8–4.7K/m² (~R$15–25K), entry from $291K+ (~R$1.5M+) — luxury buyers, HNWI. Gated communities: $1.9–2.8K/m² (~R$10–15K), entry from $146K+ (~R$750K+) — upper-middle families. Mid-standard (Pereqüe): $1.3–1.9K/m² (~R$7–10K), entry from $78K+ (~R$400K+) — investors, first-time buyers. Pre-construction: $1.1–1.7K/m² (~R$6–9K), entry from $58K+ (~R$300K+) — growth investors.",
            "A note on the price range: the stated average of $2.3K/m² spans a wide spread — from pre-construction ($1.1K) to beachfront luxury ($4.7K). The \"Mid-standard (Pereqüe)\" segment is the most common and closest to the R$8.5K/m² figure used in our broader Santa Catarina market overviews (Outlook 2027, Best Areas).",
          ],
        },
        {
          heading: "A Major Catalyst: Beto Carrero World's R$2 Billion Expansion",
          paragraphs: [
            "Headline numbers: R$2Bn announced expansion investment, 5M target annual visitors (up from 2.7M), 3 new theme areas + a hotel complex.",
            "Latin America's largest theme park, located 15 km from Porto Belo, has announced a R$2 billion expansion plan — three new theme areas and a hotel complex of three hotels (~200 rooms each) integrated into the park.",
            "Not a concept — an announced, structured plan: confirmed projects include a SpongeBob-themed area in partnership with Paramount (the world's largest area dedicated to the character, by 2028) and a Galinha Pintadinha area (2026). The park's goal is to grow visitors from 2.7 million to 5 million annually within five years, and staff from 2,000 to 4,000 by 2030. Per the park's CEO Alex Murad: \"We're thinking about the park's future for the next 5, 10 years and beyond.\"",
            "For Porto Belo, sitting on the \"tourism corridor\" next to the park, this points to structural growth in tourist flow — and, by extension, demand for short-term rentals and real estate — for years to come, not a one-off effect.",
          ],
        },
        {
          heading: "Market Dynamics & Trends",
          paragraphs: [
            "Porto Belo is in the early-to-mid stage of its growth cycle. Prices are 30–40% below Balneário Camboriú and 20–30% below Itapema, offering significant upside as the area continues developing.",
            "The area is attracting eco-conscious developers who build sustainable, nature-integrated projects. Land near the beach is increasingly scarce due to environmental protections, which limits supply and supports price growth. Expect 8–12% nominal appreciation per year through 2026.",
          ],
        },
        {
          heading: "Rental Market & Developers",
          paragraphs: [
            "Long-term (annual): $280–470/month (~R$1.5–2.5K), gross yield 4.0–4.5%. Short-term (Airbnb): $470–750/month (~R$2.5–4K), 75–80% occupancy, gross yield 6.8–7.5%. Seasonal (Dec–Feb): $1,300–2,300/month (~R$7–12K), 85–92% occupancy — peak-season income, not an annual yield.",
            "Active developers: eco-luxury developers (gated communities, sustainable projects, 50–100 units, premium), regional builders (Balneário Pereqüe, mid-rise apartments, 30–60 units, mid-standard), boutique developers (nature-integrated, small eco-condos, 15–30 units, premium).",
          ],
        },
        {
          heading: "Plan B Investment Score",
          paragraphs: [
            "Investment 7.8/10. Rental Demand 7.5/10. Liquidity 6.5/10. Lifestyle 9.0/10. Growth 8.0/10. Overall 7.8/10. Plan B Expert Assessment — subjective evaluation based on market analysis. Not financial advice.",
          ],
        },
        {
          heading: "Plan B Verdict — Porto Belo",
          paragraphs: [
            "✅ BUY — for eco-luxury + growth, 5–7 year hold. Porto Belo combines eco-luxury with strong growth potential. At 30–40% below Balneário Camboriú prices, it offers significant upside as the area continues developing. Beto Carrero World's R$2 billion expansion provides a unique, structural rental demand driver not found in other SC beach markets. Entry at $78K–146K (~R$400–750K) in gated communities offers the best risk-adjusted returns. Best for nature lovers, secondary home buyers, and eco-conscious investors who accept lower liquidity for lifestyle quality.",
            "This material is for informational purposes only and does not constitute investment advice.",
          ],
        },
      ],
    },
    ru: {
      sections: [
        {
          heading: "Коротко о главном",
          paragraphs: [
            "Эко-люкс прибрежный рынок — R$12–18K/м² в среднем (полный диапазон R$6–25K по сегментам), рост 14% в год, туристический коридор Beto Carrero, природо-ориентированная застройка. Курс: 1 USD = R$5,15, унифицировано по всем материалам Plan B.",
            "Ключевые цифры: $2,3K средняя цена/м² (~R$12K), 6,8% доходность от аренды, 14% рост в год, 25K население.",
          ],
        },
        {
          heading: "Обзор рынка",
          paragraphs: [
            "Porto Belo — развивающееся направление эко-люкса на центральном побережье Санта-Катарины, между Итапемой и Бомбиньясом. Муниципалитет с населением 25 000 человек сочетает нетронутые пляжи, заповедники Атлантического леса и растущий портфель люксовых закрытых посёлков.",
            "Porto Belo выигрывает от расположения на «туристическом коридоре», включающем Beto Carrero World (крупнейший тематический парк Латинской Америки, в 15 км, 1,5 млн+ посетителей в год), круизные терминалы в Итажаи и растущие рынки недвижимости Итапемы и Балнеариу-Камбориу.",
            "Центральное побережье Санта-Катарины, примерно 60 км к северу от Флорианополиса и 20 км к югу от Балнеариу-Камбориу. Доступ по трассе BR-101 и прибрежной дороге SC-411. Наиболее развитый пляжный район — Balneário Pereqüe. Территория окружена заповедниками Атлантического леса со значительными экологическими ограничениями плотной застройки — это фактически защищает стоимость недвижимости, ограничивая предложение.",
            "Около 25 000 постоянных жителей, сезонное население удваивается летом. Рост муниципалитета — 3–4% в год, за счёт внутренней миграции. Демография смещена к семьям и пенсионерам, ценящим более тихий, природо-ориентированный лайфстайл. Летний приток включает значительное число посетителей парка, пассажиров круизов и внутренних туристов.",
          ],
        },
        {
          heading: "Анализ цен на недвижимость",
          paragraphs: [
            "Пляжный люкс: $2,8–4,7K/м² (~R$15–25K), вход от $291K+ (~R$1,5M+) — люкс-покупатели, HNWI. Закрытые посёлки: $1,9–2,8K/м² (~R$10–15K), вход от $146K+ (~R$750K+) — семьи верхнего среднего класса. Средний стандарт (Перекуэ): $1,3–1,9K/м² (~R$7–10K), вход от $78K+ (~R$400K+) — инвесторы, первая покупка. Предпродажа: $1,1–1,7K/м² (~R$6–9K), вход от $58K+ (~R$300K+) — инвесторы роста.",
            "О диапазоне цен: заявленная средняя $2,3K/м² охватывает широкий разброс — от предпродаж ($1,1K) до пляжного люкса ($4,7K). Сегмент «Средний стандарт (Перекуэ)» — самый распространённый и наиболее сопоставимый с оценкой R$8,5K/м², которая использовалась в наших более общих обзорах рынка Санта-Катарины (Outlook 2027, Best Areas).",
          ],
        },
        {
          heading: "Крупный катализатор: Beto Carrero World — расширение на R$2 млрд",
          paragraphs: [
            "Ключевые цифры: R$2Bn заявленный объём инвестиций в расширение, 5M целевой турпоток в год (сейчас 2,7M), 3 новые тематические зоны + гостиничный комплекс.",
            "Крупнейший тематический парк Латинской Америки, расположенный в 15 км от Porto Belo, объявил план расширения на R$2 миллиарда — три новые тематические зоны и гостиничный комплекс из трёх отелей (~200 номеров каждый), интегрированный в парк.",
            "Не концепция, а объявленный и структурированный план: среди подтверждённых проектов — зона Губки Боба в партнёрстве с Paramount (крупнейшая в мире зона, посвящённая персонажу, к 2028 году) и зона Галинки Пиньядинья (2026 год). Цель парка — удвоить турпоток с 2,7 млн до 5 млн посетителей в год в течение пяти лет, а штат — с 2 000 до 4 000 сотрудников к 2030 году. По словам CEO парка Алекса Мурада: «Мы думаем о будущем парка на следующие 5, 10 лет и дальше».",
            "Для Porto Belo, находящегося на «туристическом коридоре» рядом с парком, это означает структурный рост турпотока и, соответственно, спроса на краткосрочную аренду и недвижимость — на годы вперёд, а не разовый эффект.",
          ],
        },
        {
          heading: "Рыночная динамика",
          paragraphs: [
            "Porto Belo находится на ранней-средней стадии своего цикла роста. Цены на 30–40% ниже, чем в Балнеариу-Камбориу, и на 20–30% ниже, чем в Итапеме — это создаёт значительный потенциал роста по мере развития района.",
            "Район привлекает эко-ориентированных застройщиков, строящих устойчивые проекты, интегрированные в природу. Земля у побережья становится всё более дефицитной из-за экологических ограничений, что сдерживает предложение и поддерживает рост цен. Ожидаемая номинальная переоценка — 8–12% в год до 2026 года.",
          ],
        },
        {
          heading: "Аренда и застройщики",
          paragraphs: [
            "Долгосрочная (годовая): $280–470/мес (~R$1,5–2,5K), валовая доходность 4,0–4,5%. Краткосрочная (Airbnb): $470–750/мес (~R$2,5–4K), загрузка 75–80%, валовая доходность 6,8–7,5%. Сезонная (дек–фев): $1 300–2 300/мес (~R$7–12K), загрузка 85–92% — пиковый доход высокого сезона, не годовая доходность.",
            "Активные застройщики: эко-люкс застройщики (закрытые посёлки, устойчивые проекты на 50–100 юнитов, премиум), региональные застройщики (Balneário Pereqüe, среднеэтажные дома на 30–60 юнитов, средний стандарт), бутик-застройщики (природо-интегрированные, эко-кондо на 15–30 юнитов, премиум).",
          ],
        },
        {
          heading: "Plan B Investment Score",
          paragraphs: [
            "Investment 7,8/10. Rental Demand 7,5/10. Liquidity 6,5/10. Lifestyle 9,0/10. Growth 8,0/10. Overall 7,8/10. Экспертная оценка Plan B — субъективная оценка на основе анализа рынка. Не является финансовой консультацией.",
          ],
        },
        {
          heading: "Вердикт Plan B — Porto Belo",
          paragraphs: [
            "✅ BUY — для эко-люкса + роста, горизонт 5–7 лет. Porto Belo сочетает эко-люкс с сильным потенциалом роста. При ценах на 30–40% ниже Балнеариу-Камбориу, район предлагает значительный потенциал роста по мере развития. Расширение Beto Carrero World на R$2 млрд даёт уникальный, структурный драйвер спроса на аренду, которого нет на других пляжных рынках Санта-Катарины. Вход от $78K–146K (~R$400–750K) в закрытых посёлках предлагает лучшее соотношение риск/доходность. Лучше всего подходит любителям природы, покупателям второй недвижимости и эко-ориентированным инвесторам, готовым принять более низкую ликвидность ради качества лайфстайла.",
            "Материал носит информационный характер и не является инвестиционной рекомендацией.",
          ],
        },
      ],
    },
  },

  'itapema-investment-report-2026': {
    en: {
      sections: [
        {
          heading: "The Short Version",
          paragraphs: [
            "Itapema has surpassed Balneário Camboriú to become Brazil's most expensive residential market per square meter — R$15,226/m² (~$2.9K/m²) per FipeZAP data as of mid-2026. Exchange rate: 1 USD = R$5.15, unified across all Plan B materials.",
            "Headline figures: $2.9K avg. price/m² (~R$15.2K), 7.2% avg. yield, 18% annual growth, 70,000 population.",
          ],
        },
        {
          heading: "Market Overview",
          paragraphs: [
            "The city of 70,000 residents is experiencing the fastest real estate growth in Santa Catarina — 18% annual appreciation and +28–30% price variation over the past 12 months (a wider spread across property types, not just the index).",
            "The growth is driven by the Meia Praia development wave — a 5 km beachfront corridor of high-rise luxury towers, new infrastructure, and expanding amenities. Itapema mirrors BC's 2016 growth trajectory but with more available land and a faster appreciation curve.",
            "Central coast of Santa Catarina, approximately 70 km north of Florianópolis and 10 km south of Balneário Camboriú. Itapema occupies a coastal strip between the Atlantic Ocean and the Serra do Mar hills. The city's prime area is Meia Praia (\"Half Beach\"), a 5 km beachfront corridor running the length of the urban area. Access is via BR-101 highway, with the Meia Praia sand strip widening project improving beachfront infrastructure.",
            "Approximately 70,000 permanent residents, having grown rapidly over the past decade due to internal migration and development. Seasonal population reaches 200,000+ in summer. The city attracts buyers from São Paulo, Rio Grande do Sul, Paraná, and increasingly from abroad (Argentina, Europe, USA). The demographic skews toward upper-middle and high-income families seeking second homes or investments. A growing number of remote workers and retirees have relocated permanently.",
          ],
        },
        {
          heading: "Real Estate Price Analysis",
          paragraphs: [
            "Beachfront luxury (Meia Praia): $3.4K+/m² (~R$18K+), entry from $470K+ (~R$2.5M+) — HNWIs, luxury buyers. Premium (Meia Praia, 2nd line): $2.3–3.4K/m² (~R$12–18K), entry from $291K+ (~R$1.5M+) — upper-middle investors. Mid-range (inland): $1.7–2.3K/m² (~R$9–12K), entry from $146K+ (~R$750K+) — families, first-time buyers. Pre-construction: $1.9–2.8K/m² (~R$10–15K), entry from $194K+ (~R$1M+) — growth investors.",
          ],
        },
        {
          heading: "A Major Catalyst: the Meia Praia Beach Widening Project",
          paragraphs: [
            "Headline numbers: R$60M project value (50/50 municipality/state), up to 46.8% estimated beachfront appreciation potential, 4-month construction time starting August 2026.",
            "The Meia Praia beach widening project isn't a concept — it's a permitted and funded initiative. The environmental installation license (LAI) has already been issued by Santa Catarina's Environment Institute (May 2026). The project calls for laying 416,000–498,000 m³ of sand along 4.75 km of coastline, widening the beach by 20–60 meters.",
            "An appreciation estimate — not marketing, a developer's calculation: per methodology from the Appraisal Institute, beach widening generates up to 2.6% property appreciation for every 10% gain in sand strip width. Developer Edify applied this methodology to Itapema's case and arrived at an estimate: beachfront property could appreciate by up to 46.8% once the widening is complete. Local media are already framing this as a potential factor that could permanently cement Itapema's status as Brazil's most expensive real estate market per square meter.",
            "Construction is set to begin in August 2026 (after the fish spawning closed season) and should take 4 months — completing before the summer tourist season.",
          ],
        },
        {
          heading: "Market Dynamics & Trends",
          paragraphs: [
            "Itapema is in the midst of a luxury development boom. Meia Praia is being transformed from a quiet beach into a high-rise corridor with resort-style amenities, ocean views, and premium finishes.",
            "Key growth drivers: (1) territorial expansion still underway — unlike mature BC, Itapema has room to grow; (2) the beach widening project improves beachfront property value; (3) spillover demand from BC buyers priced out of the R$15K+/m² market; (4) strong marketing toward high-income buyers from other states. Per market analysts, the luxury segment is in \"rapidly accelerating annual appreciation.\" Transactions close 6–8% below asking price on average.",
          ],
        },
        {
          heading: "Rental Market & Developers",
          paragraphs: [
            "Long-term (annual): $470–750/month (~R$2.5–4K), gross yield 4.0–4.5%. Short-term (Airbnb): $850–1,500/month (~R$4.5–8K), 80–85% occupancy, gross yield 7.2–8.5%. Seasonal (Dec–Feb): $2,300–4,700/month (~R$12–25K), 92–97% occupancy — peak-season income, not an annual yield.",
            "Active developers: major SC developers (15+, Meia Praia beachfront, luxury towers 100–300 units, ultra-premium), regional builders (inland expansion, mid-rise condos 40–80 units, mid-to-premium), SP/RJ developers (emerging projects, new luxury launches, premium).",
          ],
        },
        {
          heading: "Plan B Investment Score",
          paragraphs: [
            "Investment 9.0/10. Rental Demand 8.0/10. Liquidity 7.0/10. Lifestyle 7.5/10. Growth 9.0/10. Overall 8.6/10. Plan B Expert Assessment — subjective evaluation based on market analysis. Not financial advice.",
          ],
        },
        {
          heading: "Plan B Verdict — Itapema",
          paragraphs: [
            "✅ STRONG BUY — our #1 growth pick for 2026, 3–7 year hold. Itapema is our top pick for capital appreciation: a confirmed #1 price-per-m² status nationally (R$15,226/m²), 18% annual appreciation (+28–30% over the past 12 months across a broader set of transactions). The market mirrors BC a decade ago — early-stage development, available land, a strong catalyst pipeline. Entry at $146K–291K (~R$750K–1.5M) for a 2BR in Meia Praia offers exceptional upside.",
            "Practical guidance: buy pre-construction for maximum appreciation, or existing units for immediate rental income. Properties near the improved beachfront, once the widening project completes, will see the strongest appreciation.",
            "This material is for informational purposes only and does not constitute investment advice. Sources: \u00cdndice FipeZap (2026), Prefeitura de Itapema, Instituto do Meio Ambiente de Santa Catarina (IMA).",
          ],
        },
      ],
    },
    ru: {
      sections: [
        {
          heading: "Коротко о главном",
          paragraphs: [
            "Итапема обошла Балнеариу-Камбориу и стала самым дорогим жилым рынком Бразилии по цене за квадратный метр — R$15 226/м² (~$2,9K/м²) по данным FipeZAP на середину 2026 года. Курс: 1 USD = R$5,15, унифицировано по всем материалам Plan B.",
            "Ключевые цифры: $2,9K средняя цена/м² (~R$15,2K), 7,2% средняя доходность, 18% годовой рост, 70K население.",
          ],
        },
        {
          heading: "Обзор рынка",
          paragraphs: [
            "Город с населением 70 000 человек показывает самый быстрый рост недвижимости в Санта-Катарине — 18% годового роста и +28–30% вариации цены за последние 12 месяцев (более широкий разброс по типам недвижимости, не только индекс).",
            "Рост движим волной застройки Meia Praia — 5-километровым прибрежным коридором люксовых высоток, новой инфраструктурой и расширяющимися удобствами. Итапема повторяет траекторию роста BC 2016 года, но с большим количеством свободной земли и более быстрой кривой удорожания.",
            "Центральное побережье Санта-Катарины, примерно 70 км к северу от Флорианополиса и 10 км к югу от Балнеариу-Камбориу. Итапема занимает прибрежную полосу между Атлантическим океаном и хребтом Серра-ду-Мар. Ключевой район — Meia Praia («Половина пляжа»), 5-километровый прибрежный коридор вдоль всей городской застройки. Доступ по трассе BR-101, инфраструктуру побережья улучшает проект расширения пляжной полосы Meia Praia.",
            "Около 70 000 постоянных жителей, город быстро рос последнее десятилетие за счёт внутренней миграции и застройки. Сезонное население достигает 200 000+ летом. Город привлекает покупателей из Сан-Паулу, Риу-Гранди-ду-Сул, Параны и всё больше из-за рубежа (Аргентина, Европа, США). Демография смещена к семьям верхнего среднего и высокого дохода, ищущим вторую недвижимость или инвестиции. Растёт число удалённых сотрудников и пенсионеров, переехавших на постоянной основе.",
          ],
        },
        {
          heading: "Анализ цен на недвижимость",
          paragraphs: [
            "Пляжный люкс (Meia Praia): $3,4K+/м² (~R$18K+), вход от $470K+ (~R$2,5M+) — HNWI, люкс-покупатели. Премиум (Meia Praia, 2-я линия): $2,3–3,4K/м² (~R$12–18K), вход от $291K+ (~R$1,5M+) — инвесторы верхнего среднего класса. Средний сегмент (вглубь): $1,7–2,3K/м² (~R$9–12K), вход от $146K+ (~R$750K+) — семьи, первая покупка. Предпродажа: $1,9–2,8K/м² (~R$10–15K), вход от $194K+ (~R$1M+) — инвесторы роста.",
          ],
        },
        {
          heading: "Крупный катализатор: расширение пляжа Meia Praia",
          paragraphs: [
            "Ключевые цифры: R$60M объём проекта (50/50 муниципалитет/штат), до 46,8% потенциального удорожания прибрежной недвижимости, 4 месяца строительства, старт в августе 2026.",
            "Проект расширения пляжной полосы Meia Praia — не концепция, а разрешённая и профинансированная инициатива. Экологическая лицензия на установку (LAI) уже выдана Институтом окружающей среды Санта-Катарины (май 2026). Проект предусматривает укладку 416–498 тысяч м³ песка вдоль 4,75 км побережья, с расширением пляжной полосы на 20–60 метров.",
            "Оценка потенциального удорожания — не маркетинг, а расчёт застройщика: по методике консалтинговой компании Appraisal Institute, расширение пляжной полосы даёт до 2,6% удорожания недвижимости на каждые 10% прироста ширины пляжа. Застройщик Edify применил эту методику к реалиям Итапемы и получил оценку: пляжная недвижимость может подорожать до 46,8% после завершения расширения. СМИ уже называют это потенциальным фактором, который окончательно закрепит за Итапемой статус самого дорогого рынка недвижимости Бразилии по цене за м².",
            "Строительство стартует в августе 2026 года (после окончания периода нереста рыбы) и должно завершиться за 4 месяца — до начала летнего туристического сезона.",
          ],
        },
        {
          heading: "Рыночная динамика",
          paragraphs: [
            "Итапема переживает бум люксовой застройки. Meia Praia превращается из тихого пляжа в коридор высоток с курортными удобствами, видом на океан и премиальной отделкой.",
            "Ключевые драйверы роста: (1) территориальная экспансия всё ещё продолжается — в отличие от зрелого BC, у Итапемы есть куда расти; (2) проект расширения пляжной полосы повышает ценность прибрежной недвижимости; (3) спрос от покупателей, вытесненных из рынка BC ценами от R$15K+/м²; (4) активный маркетинг на состоятельных покупателей из других штатов. По оценке рыночных аналитиков, люксовый сегмент находится в состоянии «быстро ускоряющейся годовой переоценки». Сделки закрываются в среднем на 6–8% ниже запрашиваемой цены.",
          ],
        },
        {
          heading: "Аренда и застройщики",
          paragraphs: [
            "Долгосрочная (годовая): $470–750/мес (~R$2,5–4K), валовая доходность 4,0–4,5%. Краткосрочная (Airbnb): $850–1 500/мес (~R$4,5–8K), загрузка 80–85%, валовая доходность 7,2–8,5%. Сезонная (дек–фев): $2 300–4 700/мес (~R$12–25K), загрузка 92–97% — пиковый доход в высокий сезон, не годовая доходность.",
            "Активные застройщики: крупные застройщики Санта-Катарины (15+, прибрежная застройка Meia Praia, люксовые башни на 100–300 юнитов, ультра-премиум), региональные застройщики (экспансия вглубь территории, среднеэтажные кондо на 40–80 юнитов, средне-премиальный сегмент), застройщики из SP/RJ (новые проекты, люксовые запуски, премиум).",
          ],
        },
        {
          heading: "Plan B Investment Score",
          paragraphs: [
            "Investment 9,0/10. Rental Demand 8,0/10. Liquidity 7,0/10. Lifestyle 7,5/10. Growth 9,0/10. Overall 8,6/10. Экспертная оценка Plan B — субъективная оценка на основе анализа рынка. Не является финансовой консультацией.",
          ],
        },
        {
          heading: "Вердикт Plan B — Itapema",
          paragraphs: [
            "✅ STRONG BUY — топ-пик роста на 2026 год, горизонт 3–7 лет. Итапема — наш главный выбор на рост капитала: подтверждённый статус #1 по цене за м² в стране (R$15 226/м²), рост 18% в год (+28–30% за последние 12 месяцев по более широкому кругу сделок). Рынок повторяет путь BC десять лет назад — ранняя стадия развития, свободная земля, сильный пайплайн катализаторов. Вход $146K–291K (~R$750K–1,5M) за 2BR на Meia Praia даёт исключительный потенциал роста.",
            "Практическая рекомендация: покупайте на стадии предпродажи для максимального роста стоимости, либо готовые юниты — для немедленного дохода от аренды. Объекты рядом с обновлённой пляжной полосой (после завершения проекта расширения) получат наиболее сильный рост стоимости.",
            "Материал носит информационный характер и не является инвестиционной рекомендацией. Источники: Índice FipeZap (2026), Prefeitura de Itapema, Instituto do Meio Ambiente de Santa Catarina (IMA).",
          ],
        },
      ],
    },
  },

  'balneario-camboriu-investment-report-2026': {
    en: {
      sections: [
        {
          heading: "The Short Version",
          paragraphs: [
            "Balneário Camboriú (BC) is Brazil's most iconic luxury beach destination, known as the \"Brazilian Dubai.\" The city features some of South America's tallest residential towers, premium shopping, and a cosmopolitan lifestyle. Exchange rate: 1 USD = R$5.15, unified across all Plan B materials.",
            "Headline figures: $2.8K avg. price/m² (~R$15K), 4.8% avg. yield, 117% price growth since 2018, 150,000 population.",
          ],
        },
        {
          heading: "Market Overview",
          paragraphs: [
            "With 150,000+ permanent residents and 4M+ annual visitors, BC combines year-round activity with seasonal luxury tourism. In 2026, BC ranks #1–2 nationally for price per m² at approximately R$15,000/m² (~$2.8K/m²), having grown 117% since 2018 (from R$6,873 to R$14,906/m², FipeZap data, January 2018–December 2025).",
            "Central coast of Santa Catarina, approximately 80 km north of Florianópolis and 120 km south of Joinville. A narrow coastal strip between the Atlantic Ocean and the Serra do Mar hills. Accessed via BR-101 highway, a 1-hour drive from both Florianópolis and Joinville airports. The beachfront (Avenida Atlântica) runs 5 km and is the city's primary commercial and residential corridor.",
            "Approximately 150,000 permanent residents, having grown 29% between 2010 and 2022 per IBGE data. Seasonal population reaches 500,000+ during summer (December–February) and major holidays. The city attracts significant internal migration from São Paulo, Rio Grande do Sul, and Paraná. The demographic skews toward upper-middle and high-income households, with a growing expat community from Argentina, Uruguay, and Europe.",
          ],
        },
        {
          heading: "Real Estate Price Analysis",
          paragraphs: [
            "Luxury towers (beachfront): $5.7K+/m² (~R$30K+), entry from $146K+ (~R$750K+) — HNWIs, status buyers. Premium (Barra Sul, Pioneiros): $2.8–4.7K/m² (~R$15–25K), entry $74K–111K (~R$2–3M) — upper-middle class. Mid-range: $1.9–2.8K/m² (~R$10–15K), entry $37K–74K (~R$1–2M) — investors, families. Budget (inland): $1.3–1.9K/m² (~R$7–10K), entry $25K–37K (~R$700K–1M) — first-time buyers.",
          ],
        },
        {
          heading: "A Shifting Dynamic: BC vs Itapema in 2026",
          paragraphs: [
            "Headline numbers: R$3–2.78Bn 2025 sales volume (two sources — DWV / industry data), R$4.1Bn Itapema's 2025 sales volume — overtook BC, up to R$40K ultra-luxury segment potential by 2030.",
            "An honest picture, not just good news: BC held the #1 spot in FipeZap's price-per-m² ranking since 2022 — but in May 2026, Itapema overtook BC for the first time (R$15,226/m² vs R$15,215/m²). More significantly, in total sales volume (VGV) for full-year 2025, Itapema (population just 86,000) already outsold BC (150,000) — R$4.1 billion versus R$3 billion per DWV platform data. This isn't a narrow, one-off loss — it's a broader shift in market dynamics.",
            "That said, BC's market isn't weakening — it's changing shape. Per a Sort Investimentos projection, prices in select premium projects could double by 2030, reaching R$40,000/m², at an average annual growth of 16% in the ultra-luxury segment. A R$5 million investment in 2025 at that pace could grow to roughly R$13.4 million by 2030 — a 167.6% gain. Some penthouses already command R$40,000–60,000/m² (~$7.5–11K/m²).",
          ],
        },
        {
          heading: "A Major Catalyst: Senna Tower",
          paragraphs: [
            "Headline numbers: 550m height — the world's tallest residential building, R$110K avg. price/m² (~$21.4K/m²), R$2.48Bn sales volume already at an early stage.",
            "Senna Tower isn't a concept — it's an actively under-construction project on Avenida Atlântica, at the heart of Barra Sul, between the Camboriú River and Praia Central. The building will be the world's tallest residential structure — roughly 70% taller than the Eiffel Tower (324m), with 157 floors, 228 exclusive units, and penthouses up to 903 m².",
            "An active construction site, not just renders: as of March 2026, this isn't a project on paper — it's a construction site in active progress: foundations 40 meters deep, engineering equipment unprecedented in Brazil already operating on site. The building will be the first in Latin America to use Tuned Mass Damper (TMD) technology to mitigate wind sway, and the world's first supertall residential building certified LEED Platinum. The developer is FG Empreendimentos, with 40+ years in the BC market, 60+ delivered mega-projects, and 5,500+ units. It's a partnership with the Senna family. Expected completion: 2032–2033.",
            "The effect is already visible: properties within the tower's radius of influence — both in Barra Sul itself and adjacent neighborhoods — are registering additional appreciation on the back of the increased prestige and international visibility the project brings to the city as a whole.",
          ],
        },
        {
          heading: "Market Dynamics & Trends",
          paragraphs: [
            "BC operates in a league of its own in Brazil. The market is driven by luxury high-rise towers with full resort amenities, targeting HNWIs from across Brazil and South America. Key districts include Barra Sul (emerging luxury corridor), Pioneiros (established premium), Centro (urban core), and the iconic beachfront Avenida Atlântica.",
            "The city's small geographic area (46 km²) and limited beachfront land create natural supply constraints. The market is maturing — appreciation is expected to moderate from the 2018–2023 boom but remain above national averages.",
          ],
        },
        {
          heading: "Rental Market & Developers",
          paragraphs: [
            "Long-term (annual): $570–950/month (~R$3–5K), gross yield 3.5–4.0%. Short-term (Airbnb): $950–1,900/month (~R$5–10K), 75–80% occupancy, gross yield 5.0–6.0%. Seasonal (Dec–Feb): $2,800–5,700/month (~R$15–30K), 92–97% occupancy — peak-season income, not an annual yield.",
            "Active developers: major SC developers (10+, luxury high-rises, 100–300 units, ultra-premium), regional builders (mid-rises, 40–80 units, mid-to-premium), SP/RJ developers (Barra Sul corridor, emerging projects, premium).",
          ],
        },
        {
          heading: "Plan B Investment Score",
          paragraphs: [
            "Investment 8.5/10. Rental Demand 7.0/10. Liquidity 8.5/10. Lifestyle 9.5/10. Growth 8.5/10. Overall 8.5/10. Plan B Expert Assessment — subjective evaluation based on market analysis. Not financial advice.",
          ],
        },
        {
          heading: "Plan B Verdict — Balneário Camboriú",
          paragraphs: [
            "✅ BUY — for prestige and long-term growth, 5+ year hold. BC remains the premier luxury play in Santa Catarina. At R$15,000/m² (~$2.8K/m²), it's the most expensive coastal market in Brazil, with 117% price growth since 2018. Best for HNWIs with $74K+ budgets who value status, lifestyle, and long-term capital appreciation. The market is maturing — appreciation will moderate but remain above national averages.",
            "Key strategy: buy premium segment in Barra Sul (emerging luxury corridor) for the best growth runway. Hold 5+ years for maximum appreciation. Short-term rental during peak season (Dec–Mar) offsets carrying costs.",
            "This material is for informational purposes only and does not constitute investment advice. Sources: Índice FipeZap (2026), DWV (sales volume data), Sort Investimentos (ultra-luxury segment projection).",
          ],
        },
      ],
    },
    ru: {
      sections: [
        {
          heading: "Коротко о главном",
          paragraphs: [
            "Balneário Camboriú (BC) — самый узнаваемый люксовый пляжный курорт Бразилии, известный как «бразильский Дубай». Город с одними из самых высоких жилых башен Южной Америки, премиальным шопингом и космополитичным лайфстайлом. Курс: 1 USD = R$5,15, унифицировано по всем материалам Plan B.",
            "Ключевые цифры: $2,8K средняя цена/м² (~R$15K), 4,8% средняя доходность, 117% рост цены с 2018 года, 150K население.",
          ],
        },
        {
          heading: "Обзор рынка",
          paragraphs: [
            "150 000+ постоянных жителей и 4 млн+ туристов в год — BC сочетает круглогодичную активность с сезонным люксовым туризмом. В 2026 году BC занимает #1–2 место в стране по цене за м² — около R$15 000/м² (~$2,8K/м²), выросшей на 117% с 2018 года (с R$6 873 до R$14 906/м², данные FipeZap, январь 2018 — декабрь 2025).",
            "Центральное побережье Санта-Катарины, примерно 80 км к северу от Флорианополиса и 120 км к югу от Жоинвиля. Узкая прибрежная полоса между Атлантическим океаном и хребтом Серра-ду-Мар. Доступ по трассе BR-101, час езды от аэропортов Флорианополиса и Жоинвиля. Набережная (Avenida Atlântica) — 5 км, главный коммерческий и жилой коридор города.",
            "Около 150 000 постоянных жителей, рост на 29% за 2010–2022 (данные IBGE). Сезонное население достигает 500 000+ летом (декабрь–февраль) и в крупные праздники. Город привлекает значительную внутреннюю миграцию из Сан-Паулу, Риу-Гранди-ду-Сул и Параны. Демография смещена к домохозяйствам верхнего среднего и высокого дохода, растёт сообщество экспатов из Аргентины, Уругвая и Европы.",
          ],
        },
        {
          heading: "Анализ цен на недвижимость",
          paragraphs: [
            "Люксовые башни (1-я линия): $5,7K+/м² (~R$30K+), вход от $146K+ (~R$750K+) — HNWI, статусные покупатели. Премиум (Barra Sul, Pioneiros): $2,8–4,7K/м² (~R$15–25K), вход $74K–111K (~R$2–3M) — верхний средний класс. Средний сегмент: $1,9–2,8K/м² (~R$10–15K), вход $37K–74K (~R$1–2M) — инвесторы, семьи. Бюджетный (вглубь территории): $1,3–1,9K/м² (~R$7–10K), вход $25K–37K (~R$700K–1M) — первая покупка.",
          ],
        },
        {
          heading: "Смена динамики: BC vs Итапема в 2026 году",
          paragraphs: [
            "Ключевые цифры: R$3–2,78Bn объём продаж 2025 (два источника — DWV / отраслевые данные), R$4,1Bn объём продаж Итапемы за 2025 — обошла BC, до R$40K потенциал ультра-люкс сегмента к 2030.",
            "Честная картина, не только хорошие новости: BC удерживал позицию #1 в рейтинге FipeZap по цене за м² с 2022 года — но в мае 2026 года Итапема впервые обошла BC (R$15 226/м² против R$15 215/м²). Более того, по общему объёму продаж (VGV) за весь 2025 год Итапема (население всего 86 000) уже обошла BC (150 000) — R$4,1 млрд против R$3 млрд по данным платформы DWV. Это не разовая узкая потеря, а более широкий сдвиг рыночной динамики.",
            "При этом рынок BC не ослабевает — он меняет форму. По прогнозу Sort Investimentos, цены в отдельных премиальных проектах могут удвоиться к 2030 году, достигнув R$40 000/м², при среднегодовом росте 16% в ультра-люкс сегменте. Инвестиция R$5 млн в 2025 году при таком темпе может вырасти до ~R$13,4 млн к 2030 — рост на 167,6%. Некоторые пентхаусы уже сегодня достигают R$40 000–60 000/м² (~$7,5–11K/м²).",
          ],
        },
        {
          heading: "Крупный катализатор: Senna Tower",
          paragraphs: [
            "Ключевые цифры: 550м высота — самое высокое жилое здание в мире, R$110K средняя цена/м² (~$21,4K/м²), R$2,48Bn объём продаж уже на начальной стадии.",
            "Senna Tower — не концепция, а активно строящийся объект на Avenida Atlântica в самом сердце Barra Sul, между рекой Камбориу и Praia Central. Здание станет самым высоким жилым зданием в мире — на 70% выше Эйфелевой башни (324м), 157 этажей, 228 эксклюзивных юнитов, пентхаусы площадью до 903 м².",
            "Реальная стройка, не только рендеры: по состоянию на март 2026 года — это не проект на бумаге, а объект в активном строительстве: фундамент на глубине 40 метров, беспрецедентное для Бразилии инженерное оборудование на площадке. Здание первым в Латинской Америке применит технологию Tuned Mass Damper (TMD) для гашения ветровых колебаний и станет первым в мире жилым супернебоскрёбом с платиновым сертификатом LEED. Застройщик — FG Empreendimentos, более 40 лет на рынке BC, 60+ реализованных мегапроектов, 5 500+ юнитов. Партнёрство с семьёй Айртона Сенны. Планируемое завершение — 2032–2033 год.",
            "Эффект уже заметен: объекты в радиусе влияния башни — как в самом Barra Sul, так и в соседних районах — фиксируют дополнительный рост стоимости на фоне возросшего престижа и международной видимости, которую проект придаёт городу в целом.",
          ],
        },
        {
          heading: "Рыночная динамика",
          paragraphs: [
            "BC работает в своей собственной лиге в Бразилии. Рынок движим люксовыми высотками с полным курортным набором удобств, нацеленными на состоятельных покупателей со всей Бразилии и Южной Америки. Ключевые районы: Barra Sul (растущий люксовый коридор), Pioneiros (устоявшийся премиум), Центр (городское ядро), набережная Avenida Atlântica (культовый люкс).",
            "Небольшая площадь города (46 км²) и ограниченная прибрежная земля создают естественные ограничения предложения. Рынок взрослеет — ожидается, что темп удорожания замедлится относительно бума 2018–2023, но останется выше среднего по стране.",
          ],
        },
        {
          heading: "Аренда и застройщики",
          paragraphs: [
            "Долгосрочная (годовая): $570–950/мес (~R$3–5K), валовая доходность 3,5–4,0%. Краткосрочная (Airbnb): $950–1 900/мес (~R$5–10K), загрузка 75–80%, валовая доходность 5,0–6,0%. Сезонная (дек–фев): $2 800–5 700/мес (~R$15–30K), загрузка 92–97% — пиковый доход в высокий сезон, не годовая доходность.",
            "Активные застройщики: крупные застройщики Санта-Катарины (10+, люксовые высотки на 100–300 юнитов, ультра-премиум), региональные застройщики (среднеэтажные дома на 40–80 юнитов, средний-премиальный сегмент), застройщики из SP/RJ (коридор Barra Sul, новые проекты, премиум).",
          ],
        },
        {
          heading: "Plan B Investment Score",
          paragraphs: [
            "Investment 8,5/10. Rental Demand 7,0/10. Liquidity 8,5/10. Lifestyle 9,5/10. Growth 8,5/10. Overall 8,5/10. Экспертная оценка Plan B — субъективная оценка на основе анализа рынка. Не является финансовой консультацией.",
          ],
        },
        {
          heading: "Вердикт Plan B — Balneário Camboriú",
          paragraphs: [
            "✅ BUY — для престижа и долгосрочного роста, горизонт 5+ лет. BC остаётся главной люксовой игрой в Санта-Катарине. При R$15 000/м² (~$2,8K/м²) — это самый дорогой прибрежный рынок Бразилии, со 117% роста цены с 2018 года. Лучше всего подходит состоятельным покупателям с бюджетом от $74K, ценящим статус, лайфстайл и долгосрочный прирост капитала. Рынок взрослеет — темп замедлится, но останется выше среднего по стране.",
            "Ключевая стратегия: покупайте премиум-сегмент в Barra Sul (растущий люксовый коридор) для лучшей траектории роста. Держите от 5 лет для максимального удорожания. Краткосрочная аренда в пиковый сезон (дек–март) компенсирует расходы на содержание.",
            "Материал носит информационный характер и не является инвестиционной рекомендацией. Источники: Índice FipeZap (2026), DWV (данные по объёму продаж), Sort Investimentos (прогноз ультра-люкс сегмента).",
          ],
        },
      ],
    },
  },

  'florianopolis-investment-report-2026': {
    en: {
      sections: [
        {
          heading: "The Short Version",
          paragraphs: [
            "Florianópolis is the capital of Santa Catarina and Brazil's leading tech hub outside São Paulo. Known as \"Silicon Island,\" the city combines a thriving technology sector, world-class beaches, and a growing international community. Exchange rate: 1 USD = R$5.15, unified across all Plan B materials.",
            "Headline figures: 550K city population (metro area 1M+), 4M+ annual tourists, 6.5% average rental yield, 300+ tech startups.",
          ],
        },
        {
          heading: "Market Overview",
          paragraphs: [
            "The metro area has over 1 million residents, and the city attracts 4M+ tourists annually. Hercílio Luz Airport handles 4M+ passengers annually, with direct flights to São Paulo, Buenos Aires, and seasonal European routes. Tech sector: 300+ startups, major tech companies, a growing remote worker community.",
          ],
        },
        {
          heading: "Infrastructure Catalysts",
          paragraphs: [
            "Florianópolis is going through a wave of major infrastructure projects simultaneously — a rare confluence for one city in one time window. Headline numbers: R$350M Marina Beira-Mar Norte (440,000 m²), R$19M airport expansion in 2026, +330% international passenger growth over 7 years.",
            "Marina Beira-Mar Norte — downtown's biggest transformation since the 1960s: a R$350 million project (private investment, developer JL Construções) across 440,000 m² — public and private marinas totaling 612 boat slips, a park, a boardwalk, and commercial space. Environmental licenses were granted in February 2026, construction began in March 2026, with a 4-year timeline. Expected to generate 2,000+ jobs. The mayor called it \"the biggest transformation of downtown since the construction of Avenida Beira-Mar Norte itself in the 1960s.\" Districts that benefit directly: Centro, Agronômica, Trindade, Itacorubi.",
            "The airport — already Brazil's #3 for international traffic: the airport's 30-year development master plan calls for roughly R$988 million in investment through 2046. In 2026 specifically, R$19 million is allocated for expanding the international terminal (+824 m², 9 e-gates, a new Duty Free), completing early 2027. International passenger traffic has grown 330% over 7 years — in Q1 2026, international flights accounted for 41% of all passengers, a record. Florianópolis already ranks #3 among Brazilian airports for international traffic, behind only Guarulhos (São Paulo) and Galeão (Rio). A new route to Panama launches, 5x weekly.",
            "Downtown revitalization and regional cruise infrastructure: the \"Viva Cidade Arborizada\" project is greening 7 key downtown streets with mature trees, improving comfort and urban aesthetics — part of a broader downtown revitalization already being linked in local media to a new wave of residential development. Separately, in the nearby port city of Itajaí (not on the island itself, but in the same coastal region), a new cruise terminal is being developed — designed by WSP (250+ ports worldwide), able to receive the world's largest cruise ships, and presented in Miami with Royal Caribbean, MSC Cruzeiros, and Costa Cruzeiros. This strengthens the whole region's positioning as a world-class tourism destination.",
          ],
        },
        {
          heading: "Price per m² Trend — 2018–2026",
          paragraphs: [
            "Source: FipeZap, ZAP Imóveis, data as of June 2026. This is a city-wide average trajectory — it differs from premium districts like Jurerê, where prices are significantly higher. Average price per m² by year (R$): 2018 — 5.8K, 2019 — 6.4K, 2020 — 7.1K, 2021 — 7.5K, 2022 — 8.0K, 2023 — 8.4K, 2024 — 8.9K, 2025* — ~9.05K (interpolated, not directly provided by the source), 2026 — 9.2K.",
            "Growth from R$5,800 to R$9,200/m² over 8 years — a cumulative +58.6%. This is a conservative city-wide metric, closer to mid-tier districts (such as Campeche) than to premium areas.",
          ],
        },
        {
          heading: "District Analysis",
          paragraphs: [
            "Jurerê Internacional: R$22K (~$4.3K)/m², yield 5.2%, growth 12%/yr, score 9.0 — premium luxury. Lagoa da Conceição: R$12.5K (~$2.4K)/m², yield 6.8%, growth 10%/yr, score 8.5 — lifestyle + rental. Ingleses: R$10.8K (~$2.1K)/m², yield 7.1%, growth 9%/yr, score 8.2 — mid-range rental.",
            "Canasvieiras: R$9.5K (~$1.8K)/m², yield 7.5%, growth 8%/yr, score 7.8 — budget-friendly. Centro: R$7.2K (~$1.4K)/m², yield 6.2%, growth 7%/yr, score 7.2 — urban living. Campeche: R$8.9K (~$1.7K)/m², yield 6.5%, growth 11%/yr, score 8.0 — highest upside.",
          ],
        },
        {
          heading: "Investment Opportunities",
          paragraphs: [
            "1. Pre-construction in Campeche — R$500K–700K (~$97K–$136K) for a 2BR, 11% annual growth. 2. Long-term rental in Ingleses — 7–7.5% yields with stable demand. 3. Luxury appreciation in Jurerê — +180% over 7 years, limited supply. 4. Commercial in Centro — growing tech sector creates office demand.",
          ],
        },
        {
          heading: "Risks",
          paragraphs: [
            "Seasonal vacancy — beach areas see 60–70% occupancy in winter. Construction oversupply — several large launches simultaneously. Environmental regulations — coastal zone restrictions limit development. Infrastructure strain — growth is testing water, sewage, and road capacity.",
          ],
        },
        {
          heading: "Outlook 2027–2030",
          paragraphs: [
            "Florianópolis is positioned for continued growth. Key catalysts: Hercílio Luz Airport expansion (new international routes), the tech sector boom (300+ startups), remote worker demand — plus the marina, downtown revitalization, and regional cruise infrastructure detailed above. We project 8–12% appreciation in emerging areas (Campeche, Lagoa) and 5–8% in mature markets (Jurerê, Centro).",
          ],
        },
        {
          heading: "Plan B Verdict by District",
          paragraphs: [
            "Our on-the-ground assessment based on direct experience with investors and developers. [Jurerê Int.](/research/report/jurere-internacional-investment-guide): SC's most resilient real estate, limited land, elite status, prices doubled since 2018. Best profile: HNWIs, from R$1.2M (~$233K)+. Key catalyst: limited supply.",
            "Lagoa: best lifestyle-to-price ratio, strong remote worker demand, \"the Brooklyn of Floripa.\" Best profile: digital nomads, lifestyle. Key catalyst: remote work migration. [Ingleses](/research/report/ingleses-investment-guide): most stable rental market in northern Floripa, safe conservative choice. Best profile: conservative rental investors. Key catalyst: airport proximity.",
            "[Canasvieiras](/research/report/canasvieiras-investment-guide): budget-friendly entry into Floripa's north, best for lowest entry with decent yields. Best profile: first-time SC investors. Key catalyst: lower prices attract development. Centro: urban core with commercial mix, growing tech office demand, not a beach play. Best profile: urban, commercial investors. Key catalyst: tech expansion.",
            "[Campeche](/research/report/campeche-investment-guide): ⭐ highest upside in Floripa, new urban center near the airport, risk: oversupply. Best profile: growth-focused, 5+ yr. Key catalyst: airport, urban center.",
          ],
        },
        {
          heading: "Plan B Top Recommendations 2026",
          paragraphs: [
            "1. Campeche — best value play. New infrastructure, growing demand, R$500K–700K (~$97K–$136K) for a 2BR. 2. Lagoa da Conceição — best lifestyle + yield balance. Remote worker demand. R$700K–1M (~$136K–$194K) for a 2BR. 3. Jurerê Internacional — best for wealth preservation. Highest liquidity. From R$1.2M (~$233K)+.",
            "This material is for informational purposes only and does not constitute investment advice. Sources: Índice FipeZap (2026), ZAP Imóveis, Prefeitura de Florianópolis, Zurich Airport Brasil, Instituto Mais Itajaí.",
          ],
        },
      ],
    },
    ru: {
      sections: [
        {
          heading: "Коротко о главном",
          paragraphs: [
            "Флорианополис — столица Санта-Катарины и ведущий технологический хаб Бразилии за пределами Сан-Паулу. Известный как «Silicon Island», город сочетает процветающий технологический сектор, пляжи мирового уровня и растущее международное сообщество. Курс: 1 USD = R$5,15, унифицировано по всем материалам Plan B.",
            "Ключевые цифры: 550K население города (агломерация 1M+), 4M+ туристов в год, 6,5% средняя доходность аренды, 300+ технологических стартапов.",
          ],
        },
        {
          heading: "Обзор рынка",
          paragraphs: [
            "Агломерация насчитывает более 1 миллиона жителей, город привлекает 4 млн+ туристов ежегодно. Аэропорт Эрсилиу-Лус обслуживает 4 млн+ пассажиров в год, с прямыми рейсами в Сан-Паулу, Буэнос-Айрес и сезонными европейскими маршрутами. Технологический сектор — 300+ стартапов, крупные технологические компании, растущее сообщество удалённых сотрудников.",
          ],
        },
        {
          heading: "Инфраструктурные катализаторы",
          paragraphs: [
            "Флорианополис переживает волну крупных инфраструктурных проектов одновременно — редкое сочетание для одного города в одном временном окне. Ключевые цифры: R$350M Марина Beira-Mar Norte (440 тыс. м²), R$19M расширение аэропорта в 2026 году, +330% рост международного потока за 7 лет.",
            "Марина Beira-Mar Norte — крупнейшая трансформация центра с 1960-х: проект стоимостью R$350 млн (частные инвестиции, застройщик JL Construções) на площади 440 тыс. м² — общественная и частная марины на 612 причалов, парк, набережная, коммерческие площади. Экологические лицензии получены в феврале 2026, строительство стартовало в марте 2026, срок — 4 года. Ожидается 2000+ рабочих мест. Мэр города назвал это «крупнейшей трансформацией центра со времён строительства самой Avenida Beira-Mar Norte в 1960-х». Районы, которые выиграют напрямую: Центр, Agronômica, Trindade, Itacorubi.",
            "Аэропорт — уже #3 в Бразилии по международному трафику: 30-летний мастер-план развития аэропорта Эрсилиу-Лус предполагает инвестиции около R$988 млн до 2046 года. В 2026 году отдельно выделено R$19 млн на расширение международного терминала (+824 м², 9 электронных пропускных пунктов, новый Duty Free), завершение — начало 2027. Международный пассажиропоток вырос на 330% за 7 лет — в I квартале 2026 года международные рейсы составили 41% всех пассажиров, рекордный показатель. Флорианополис уже занимает 3-е место среди аэропортов Бразилии по международному трафику, уступая только Гуарульюс (Сан-Паулу) и Галеан (Рио). Новый маршрут — в Панаму, 5 раз в неделю.",
            "Облагораживание центра и региональная круизная инфраструктура: проект «Viva Cidade Arborizada» озеленяет 7 ключевых улиц центра взрослыми деревьями, повышая комфорт и эстетику городской среды — часть более широкой ревитализации центрального района, уже связываемой в местных СМИ с новой волной жилой застройки. Отдельно, в соседнем портовом городе Итажаи (не на самом острове, но в том же прибрежном регионе) разрабатывается новый круизный терминал — спроектирован компанией WSP (250+ портов мира), рассчитан на приём крупнейших круизных лайнеров планеты, презентован в Майами при участии Royal Caribbean, MSC Cruzeiros и Costa Cruzeiros. Это усиливает позиционирование всего региона как туристического направления мирового уровня.",
          ],
        },
        {
          heading: "Динамика цены за м² — 2018–2026",
          paragraphs: [
            "Источник: FipeZap, ZAP Imóveis, данные на июнь 2026. Это общегородская усреднённая траектория — отличается от премиальных районов вроде Журере, где цены значительно выше. Средняя цена за м² по годам (R$): 2018 — 5,8K, 2019 — 6,4K, 2020 — 7,1K, 2021 — 7,5K, 2022 — 8,0K, 2023 — 8,4K, 2024 — 8,9K, 2025* — ~9,05K (интерполировано, данные за этот год не были предоставлены источником напрямую), 2026 — 9,2K.",
            "Рост с R$5 800 до R$9 200/м² за 8 лет — совокупно +58,6%. Это консервативная общегородская метрика, ближе к показателям среднего сегмента (например, Кампече), а не к премиальным районам.",
          ],
        },
        {
          heading: "Разбивка по районам",
          paragraphs: [
            "Журере Интернасьонал: R$22K (~$4,3K)/м², доходность 5,2%, рост 12%/год, score 9.0 — премиум люкс. Лагоа-да-Консейсау: R$12,5K (~$2,4K)/м², доходность 6,8%, рост 10%/год, score 8.5 — лайфстайл + аренда. Инглезес: R$10,8K (~$2,1K)/м², доходность 7,1%, рост 9%/год, score 8.2 — аренда среднего сегмента.",
            "Канасвиэйрас: R$9,5K (~$1,8K)/м², доходность 7,5%, рост 8%/год, score 7.8 — бюджетный вход. Центр: R$7,2K (~$1,4K)/м², доходность 6,2%, рост 7%/год, score 7.2 — городская жизнь. Кампече: R$8,9K (~$1,7K)/м², доходность 6,5%, рост 11%/год, score 8.0 — наибольший потенциал.",
          ],
        },
        {
          heading: "Инвестиционные возможности",
          paragraphs: [
            "1. Предпродажа в Кампече — R$500K–700K (~$97K–$136K) за 2BR, рост 11% в год. 2. Долгосрочная аренда в Инглезес — доходность 7–7,5% при стабильном спросе. 3. Люксовый рост в Журере — +180% за 7 лет, ограниченное предложение. 4. Коммерческая недвижимость в Центре — растущий техсектор создаёт спрос на офисы.",
          ],
        },
        {
          heading: "Риски",
          paragraphs: [
            "Сезонная вакантность — пляжные районы показывают загрузку 60–70% зимой. Переизбыток строительства — несколько крупных запусков одновременно. Экологические ограничения — прибрежная зона ограничивает застройку. Нагрузка на инфраструктуру — рост тестирует ёмкость воды, канализации, дорог.",
          ],
        },
        {
          heading: "Прогноз 2027–2030",
          paragraphs: [
            "Флорианополис готов к продолжению роста. Ключевые катализаторы: расширение аэропорта Эрсилиу-Лус (новые международные маршруты), бум технологического сектора (300+ стартапов), спрос от удалённых сотрудников — плюс исследованные выше марина, облагораживание центра и региональная круизная инфраструктура. Прогнозируем рост 8–12% в развивающихся районах (Кампече, Лагоа) и 5–8% в зрелых рынках (Журере, Центр).",
          ],
        },
        {
          heading: "Вердикт Plan B по районам",
          paragraphs: [
            "Наша оценка на основе прямого опыта работы с инвесторами и застройщиками. [Журере Инт.](/research/report/jurere-internacional-investment-guide): самая устойчивая недвижимость СК, ограниченная земля, элитный статус, цены удвоились с 2018. Лучший профиль: HNWI, от R$1,2M (~$233K)+. Ключевой катализатор: ограниченное предложение.",
            "Лагоа: лучшее соотношение лайфстайл/цена, сильный спрос от удалённых сотрудников, «Бруклин Флорипы». Лучший профиль: цифровые кочевники. Ключевой катализатор: миграция удалёнки. [Инглезес](/research/report/ingleses-investment-guide): самый стабильный рынок аренды севера Флорипы, безопасный консервативный выбор. Лучший профиль: консервативные инвесторы. Ключевой катализатор: близость к аэропорту.",
            "[Канасвиэйрас](/research/report/canasvieiras-investment-guide): доступный вход на север Флорипы, лучшее для минимального входа с приличной доходностью. Лучший профиль: начинающие инвесторы в СК. Ключевой катализатор: низкие цены привлекают застройку. Центр: городское ядро с коммерческим миксом, растущий спрос на офисы, не пляжная игра. Лучший профиль: городские, коммерческие инвесторы. Ключевой катализатор: расширение техсектора.",
            "[Кампече](/research/report/campeche-investment-guide): ⭐ наибольший потенциал во Флорипе, новый городской центр рядом с аэропортом, риск: избыток предложения. Лучший профиль: ориентир на рост, 5+ лет. Ключевой катализатор: аэропорт, городской центр.",
          ],
        },
        {
          heading: "Топ-рекомендации Plan B на 2026 год",
          paragraphs: [
            "1. Кампече — лучшее соотношение цена/качество. Новая инфраструктура, растущий спрос, R$500K–700K (~$97K–$136K) за 2BR. 2. Лагоа-да-Консейсау — лучший баланс лайфстайла и доходности. Спрос от удалённых сотрудников. R$700K–1M (~$136K–$194K) за 2BR. 3. Журере Интернасьонал — лучший выбор для сохранения капитала. Максимальная ликвидность. От R$1,2M (~$233K)+.",
            "Материал носит информационный характер и не является инвестиционной рекомендацией. Источники: Índice FipeZap (2026), ZAP Imóveis, Prefeitura de Florianópolis, Zurich Airport Brasil, Instituto Mais Itajaí.",
          ],
        },
      ],
    },
  },

  'brazil-investment-guide-2026': {
    en: {
      sections: [
        {
          heading: 'Important Notice',
          paragraphs: [
            'This document is a market research report provided for informational and educational purposes only. Published bi-annually (January & July editions). Data current as of June 2026.',
            "Plan B Brazil is an independent investment advisory. We receive commissions from developers on completed transactions — this is standard market practice among real estate consultants in Brazil, not a hidden conflict of interest. What matters is this: the decision always stays with the client. Our role is to lay out every option honestly, highlighting the strengths and weaknesses of each — including cases where we recommend against a purchase entirely, as in our separate report on the risks of the SPE structure — rather than steering you toward a specific developer for our own benefit.",
            'All information in this guide is based on publicly available market data, government sources (IBGE, FipeZap, Banco Central do Brasil), and our professional field research in the Santa Catarina real estate market as of June 2026.',
            'This report does not constitute an offer to sell or a solicitation to buy any property or investment. Past performance of the real estate market is not indicative of future results. No return is guaranteed, and all investments carry risk. Before making any investment decision, you should consult with a qualified lawyer and accountant licensed in Brazil, as well as your financial advisor in your home country.',
            '© 2026 Plan B Brazil — Independent Investment Advisory · Florianópolis, Santa Catarina, Brazil · CRECI-SC 59616 · All rights reserved',
          ],
        },
        {
          heading: "What's Inside",
          paragraphs: [
            'Executive Summary · Letter from the Founder · Research Methodology & Data Sources · Why Santa Catarina? · Market Overview & Data Analysis · Investment Strategies · Buying Process for Foreigners · Taxes & Legal Considerations · Residency Through Real Estate · Risk Analysis · The Plan B Investment Score™ · Sample Property Analysis · Neighbourhood Guide · How Investors Get Misled · Market Scenarios · How Plan B Brazil Works · Pre-Purchase Checklist · Next Steps',
          ],
        },
        {
          heading: 'Why This Guide Exists',
          paragraphs: [
            "Brazil's southern coast has become one of the most compelling real estate opportunities for international investors. Santa Catarina, Brazil's smallest coastal state, consistently ranks #1 in quality of life — yet remains largely unknown outside Latin America.",
            'This guide was created because international investors typically discover São Paulo or Rio first and never learn that Santa Catarina offers higher safety, better infrastructure, stronger rental yields, and a more stable regulatory environment.',
          ],
        },
        {
          heading: 'Key Numbers at a Glance',
          paragraphs: [
            '#1 Quality of Life in Brazil. R$4,200+ avg. price/m² (Florianópolis premium). 5–7% short-term rental yield. ~100–180% price growth in Jurerê (2018–2025).',
            'Estimates vary by property segment and data source methodology. See our full [Florianópolis Investment Report](/research/report/florianopolis-investment-report-2026) for a detailed breakdown by district.',
          ],
        },
        {
          heading: 'Who This Guide Is For',
          paragraphs: [
            'European and North American investors seeking geographic diversification beyond traditional markets like Portugal, Spain, or the Caribbean.',
            'Digital entrepreneurs and remote workers considering a Latin American base with reliable infrastructure and digital nomad visa access.',
            'Retirees looking for an affordable coastal lifestyle with modern healthcare and the Brazilian investor visa pathway.',
            'High-net-worth individuals exploring real estate for residency, wealth preservation, and lifestyle diversification.',
            'Anyone curious about Brazil\'s real estate market who wants honest, data-driven information — not marketing.',
          ],
        },
        {
          heading: 'What This Guide Is Not',
          paragraphs: [
            'This is not a sales brochure. We will not guarantee returns, promise risk-free investments, or claim "now is the perfect time." We are an independent investment advisory, not a real estate agency. Our role is market analysis, property evaluation, and purchase support — always from the investor\'s perspective.',
            'Our approach: Plan B Brazil combines public data sources (IBGE, FipeZap, Central Bank), local market intelligence, and field research across Florianópolis, Balneário Camboriú, Itapema, and Bombinhas.',
          ],
        },
        {
          heading: 'Want the Full Picture?',
          paragraphs: [
            'The full 47-page guide is available for download below. Talk to Konstantin for a personal walkthrough of any section.',
            'For the full standalone reports behind each city mentioned above: [Florianópolis](/research/report/florianopolis-investment-report-2026), [Balneário Camboriú](/research/report/balneario-camboriu-investment-report-2026), [Itapema](/research/report/itapema-investment-report-2026), [Porto Belo](/research/report/porto-belo-investment-report-2026), and [Rancho Queimado](/research/report/rancho-queimado-investment-report-2026).',
            'Konstantin Bievskikh · Plan B Brazil · CRECI-SC 59616-F · planbbrazil.com · WhatsApp +55 (48) 98811-7424',
          ],
        },
      ],
    },
    ru: {
      sections: [
        {
          heading: 'Гид доступен на английском языке',
          paragraphs: [
            'Полный PDF-гид (47 страниц) издан только на английском языке. Текст на этой странице — русский перевод для ознакомления; при скачивании кнопка ведёт на английский PDF-файл.',
          ],
        },
        {
          heading: 'Важное уведомление',
          paragraphs: [
            'Этот документ — рыночное исследование, предоставляемое исключительно в информационных и образовательных целях. Издаётся дважды в год (январское и июльское издания). Данные актуальны на июнь 2026 года.',
            'Plan B Brazil — независимая инвестиционная консультация. Мы получаем комиссию от застройщиков за завершённые сделки — это стандартная рыночная практика среди консультантов по недвижимости в Бразилии, а не скрытый конфликт интересов. Ключевое: решение всегда остаётся за клиентом. Наша задача — честно показать все опции, подсветив сильные и слабые стороны каждой, включая случаи, когда мы прямо рекомендуем не покупать — как в нашем отдельном материале о рисках структуры СПЕ — а не подталкивать к конкретному застройщику ради собственной выгоды.',
            'Вся информация в этом гиде основана на общедоступных рыночных данных, государственных источниках (IBGE, FipeZap, Центральный банк Бразилии) и нашем профессиональном полевом исследовании рынка недвижимости Санта-Катарины по состоянию на июнь 2026 года.',
            'Этот отчёт не является предложением о продаже или предложением купить какую-либо недвижимость или инвестицию. Прошлые результаты рынка недвижимости не гарантируют будущих. Доходность не гарантирована, все инвестиции несут риск. Перед принятием инвестиционного решения проконсультируйтесь с квалифицированным юристом и бухгалтером, лицензированным в Бразилии, а также с вашим финансовым консультантом в стране проживания.',
            '© 2026 Plan B Brazil — Independent Investment Advisory · Флорианополис, Санта-Катарина, Бразилия · CRECI-SC 59616 · Все права защищены',
          ],
        },
        {
          heading: 'Что внутри',
          paragraphs: [
            'Executive Summary · Письмо от основателя · Методология исследования и источники данных · Почему Санта-Катарина? · Обзор рынка и анализ данных · Инвестиционные стратегии · Процесс покупки для иностранцев · Налоги и юридические аспекты · Резидентство через недвижимость · Анализ рисков · Plan B Investment Score™ · Пример анализа объекта · Гид по районам · Как инвесторов вводят в заблуждение · Рыночные сценарии · Как работает Plan B Brazil · Чек-лист перед покупкой · Следующие шаги',
          ],
        },
        {
          heading: 'Зачем нужен этот гид',
          paragraphs: [
            'Южное побережье Бразилии стало одной из самых убедительных возможностей для международных инвесторов в недвижимость. Санта-Катарина — самый маленький прибрежный штат Бразилии — стабильно занимает 1-е место по качеству жизни в стране, оставаясь при этом малоизвестным за пределами Латинской Америки.',
            'Этот гид создан потому, что международные инвесторы обычно сначала открывают для себя Сан-Паулу или Рио и так и не узнают, что Санта-Катарина предлагает более высокую безопасность, лучшую инфраструктуру, более сильную доходность аренды и более стабильную регуляторную среду.',
          ],
        },
        {
          heading: 'Ключевые цифры',
          paragraphs: [
            '#1 по качеству жизни в Бразилии. R$4 200+ средняя цена/м² (премиум-сегмент Флорианополиса). 5–7% доходность краткосрочной аренды. ~100–180% рост цен в Журере (2018–2025).',
            'Оценки различаются в зависимости от сегмента недвижимости и методологии источника. Подробная разбивка по районам — в нашем полном [отчёте по Флорианополису](/research/report/florianopolis-investment-report-2026).',
          ],
        },
        {
          heading: 'Кому подойдёт этот гид',
          paragraphs: [
            'Европейским и североамериканским инвесторам, ищущим географическую диверсификацию за пределами традиционных рынков вроде Португалии, Испании или Карибов.',
            'Цифровым предпринимателям и удалённым сотрудникам, рассматривающим базу в Латинской Америке с надёжной инфраструктурой и доступом к визе цифрового кочевника.',
            'Пенсионерам, ищущим доступный прибрежный лайфстайл с современным здравоохранением и путём через инвесторскую визу Бразилии.',
            'Состоятельным инвесторам, изучающим недвижимость для резидентства, сохранения капитала и диверсификации лайфстайла.',
            'Всем, кто интересуется рынком недвижимости Бразилии и хочет честную, основанную на данных информацию — не маркетинг.',
          ],
        },
        {
          heading: 'Чем этот гид не является',
          paragraphs: [
            'Это не рекламная брошюра. Мы не гарантируем доходность, не обещаем безрисковых инвестиций и не заявляем «сейчас идеальное время». Мы независимая инвестиционная консультация, не агентство недвижимости. Наша роль — анализ рынка, оценка объектов и сопровождение покупки — всегда с точки зрения интересов инвестора.',
            'Наш подход: Plan B Brazil объединяет публичные источники данных (IBGE, FipeZap, Центробанк), локальную рыночную аналитику и полевые исследования во Флорианополисе, Балнеариу-Камбориу, Итапеме и Бомбиньясе.',
          ],
        },
        {
          heading: 'Хотите обсудить детали?',
          paragraphs: [
            'Полный гид на 47 страниц (PDF, на английском языке) доступен для скачивания ниже. Пишите Константину, чтобы разобрать любой раздел лично.',
            'Полные отдельные отчёты по каждому упомянутому выше городу: [Флорианополис](/research/report/florianopolis-investment-report-2026), [Балнеариу-Камбориу](/research/report/balneario-camboriu-investment-report-2026), [Итапема](/research/report/itapema-investment-report-2026), [Порту-Белу](/research/report/porto-belo-investment-report-2026) и [Ранчо-Кеймаду](/research/report/rancho-queimado-investment-report-2026).',
            'Konstantin Bievskikh · Plan B Brazil · CRECI-SC 59616-F · planbbrazil.com · WhatsApp +55 (48) 98811-7424',
          ],
        },
      ],
    },
  },

  'brazil-for-dummies-culture-guide': {
    en: {
        sections: [
          {
            heading: 'The Short Version',
            paragraphs: [
              'This isn\'t about investment or real estate — it\'s about the country itself. Mentality, language, money, safety, and everyday life, as it actually is, without the gloss or the fear-mongering.',
              'Quick facts: Brazil ranks #81 of 116 countries for English proficiency. 93% of Brazilian adults use PIX. You can drive on a foreign license for 180 days. Plan B Brazil\'s founder has lived in Brazil since 2009.',
            ],
          },
          {
            heading: 'Language — a Nuance Worth Knowing Upfront',
            paragraphs: [
              'Brazil speaks Portuguese, not Spanish — the first thing that surprises many newcomers expecting Latin American Spanish. Brazilian Portuguese differs from European Portuguese in pronunciation and rhythm enough that it\'s worth learning Brazilian-specific materials from day one.',
              'On the EF English Proficiency Index, Brazil ranks 81st out of 116 countries — the "low proficiency" category. About 5% of the population speaks English fluently, and about 1% speaks it well.',
              'An honest detail for our region: the south of Brazil is an exception. Florianópolis consistently scores above the national average on English tests. Don\'t count on English as your primary language, but in Santa Catarina, your odds of meeting an English speaker are better than the Brazilian average.',
            ],
          },
          {
            heading: 'Mentality — "Jeitinho Brasileiro"',
            paragraphs: [
              'There\'s a concept that explains a lot of everyday life — jeitinho brasileiro, literally "the little Brazilian way." A flexible, informal approach to rules and obstacles — not deception, but resourcefulness and an ability to find a way through when the formal path looks like a dead end.',
              'In practice: schedules are treated flexibly, personal space is smaller than in Northern Europe or North America, greetings often include a hug or a cheek kiss even on a short acquaintance. It\'s not chaos — it\'s a different coordinate system you adjust to quickly.',
            ],
          },
          {
            heading: 'Money and PIX — What You Can\'t Get By Without',
            paragraphs: [
              'Forget the idea that cash or cards are the primary way to pay. Brazil runs on PIX — the Central Bank\'s instant payment system, launched in 2020.',
              'Payment methods in Brazil, 2026: PIX 46%, cash 22%, debit cards 17%, credit cards 12%.',
              '93% of Brazilian adults use PIX, with transfers processing instantly, 24/7, including weekends and holidays. Practical takeaway: set up PIX as soon as possible after opening a Brazilian bank account — it\'s not optional, it\'s how people actually pay for everything here, from coffee to rent.',
              'On tipping — restaurants often already include a 10% service charge on the bill (taxa de serviço); it\'s not mandatory but is socially expected if the service was decent.',
            ],
          },
          {
            heading: 'Driving — the 180-Day Rule',
            paragraphs: [
              'First 180 days: you can drive on your own license — carry your passport plus an International Driving Permit (IDP) or a certified Portuguese translation. After 180 days: your foreign license stops being valid — you need to convert to a Brazilian license (CNH), or face real fines.',
              'A nuance that surprises many: Mercosur countries (Argentina, Paraguay, Uruguay) — contrary to expectation — get no special benefit for license conversion. They convert under the same general rules as anyone else. Brazil has separate mutual-recognition agreements with a number of countries (including Spain, Italy, Germany, France, Japan, South Korea, Portugal) — for those, the driving test can be skipped, only a medical exam is required.',
            ],
          },
          {
            heading: 'What Genuinely Surprises Foreigners',
            paragraphs: [
              'Physical closeness in conversation. Hugs, touching an arm mid-conversation — this is the norm, not flirtation.',
              'Volume and emotion. Conversations on the street, in cafés — noticeably louder than in many other cultures. It\'s not an argument, just the normal manner of talking.',
              '"Da próxima vez" and flexible time. An agreement for "tomorrow" can mean a substantially wider time window than formally stated.',
              'Family at the center of everything. Sunday lunches with extended family, the importance of godparents — far more pronounced than the European or North American average.',
            ],
          },
          {
            heading: 'Common Misconceptions Foreigners Have',
            paragraphs: [
              '"They speak Spanish in Brazil" — No, only Portuguese.',
              '"All of Brazil is Rio and Carnival" — a continent-sized country; the south differs sharply from the northeast or Rio, both culturally and economically.',
              '"Bureaucracy can be worked around" — sometimes yes, but usually no; budgeting more time beats looking for shortcuts.',
              '"English will help in most situations" — it won\'t, outside tourist zones and business districts.',
            ],
          },
          {
            heading: 'Bank Account and Everyday Finances',
            paragraphs: [
              'Opening a Brazilian account requires a CPF and, typically, proof of address. Major banks (Banco do Brasil, Itaú, Bradesco) accept foreigners with a CPF and passport; some digital banks (Nubank, Inter) also work with foreigners. Without a local account, you can\'t set up PIX — and without PIX, everyday life in Brazil gets noticeably harder.',
            ],
          },
          {
            heading: 'Safety — Level-Headed, Without Panic or Complacency',
            paragraphs: [
              'We covered safety statistics by region in detail in our [separate article comparing Rio, São Paulo, and southern Brazil](/research/report/gde-kupit-nedvizhimost-braziliya) — in short: risk in Brazil depends heavily on the specific city and neighborhood, and the gap between Florianópolis and, say, Rio, is a multiple, not a percentage.',
              'Practical habits that work everywhere: don\'t display expensive items openly on the street, stay alert in crowded places and public transport, use vetted taxis/apps at night. This is ordinary urban caution, not something uniquely "dangerous" about Brazil.',
            ],
          },
          {
            heading: 'Bureaucracy — Patience Pays Off',
            paragraphs: [
              'Brazil is famous for bureaucracy (burocracia) — that\'s not a myth. The first and most essential document you\'ll need for almost everything is a CPF, Brazil\'s individual tax ID. We covered how to get one in detail in [our article on buying property](/research/report/kak-kupit-nedvizhimost-braziliya). Budget more time for any official procedure than seems logical — that\'s not the exception, it\'s the norm.',
            ],
          },
          {
            heading: 'Everyday Details That Save You Grief',
            paragraphs: [
              'Business hours — many small shops and services close for lunch, especially outside major cities. Holidays — Brazil observes many official and regional holidays, when much is closed, including banks. Food — lunch (almoço) is often the main meal of the day, not dinner as in Europe.',
            ],
          },
          {
            heading: 'Check for Yourself — Two Free Tools',
            paragraphs: [
              '[Brazil Fit Score](/brazil-fit-score) — a 7-question, 2-minute test that scores how well Brazil fits you — for life, investment, work, nature.',
              '[Visa & Residency Path Calculator](/visa-path) — 6 questions that determine the best residency or citizenship path for your specific situation. Both free, no registration.',
            ],
          },
          {
            heading: 'Bottom Line',
            paragraphs: [
              'Brazil isn\'t one country with one set of rules — it\'s a sum of very different regions. What\'s true for Rio isn\'t always true for Santa Catarina. Language, money, bureaucracy, and safety are the baseline you should arrive with, not something to discover through trial and error in your first week. Once you\'ve got the country-level basics down, our [practical guide for newcomers to Florianópolis](/research/report/newcomers-guide-florianopolis) covers the city-specific first months — schools, healthcare, transport, and where to live.',
              'This material is for informational purposes only and is based on publicly available sources (EF EPI, Central Bank of Brazil) and personal experience living in Brazil since 2009.',
            ],
          },
        ],
    },
    ru: {
        sections: [
          {
            heading: 'Коротко о главном',
            paragraphs: [
              'Это не про инвестиции и не про недвижимость — это про саму страну. Менталитет, язык, деньги, безопасность и повседневная жизнь, как она есть, без глянца и без запугивания.',
              'Быстрые факты: Бразилия занимает 81-е место из 116 стран по владению английским. 93% взрослых бразильцев пользуются PIX. По иностранным правам можно ездить 180 дней. Основатель Plan B Brazil живёт в Бразилии с 2009 года.',
            ],
          },
          {
            heading: 'Язык — и здесь есть нюанс, который стоит знать заранее',
            paragraphs: [
              'Бразилия говорит на португальском, не на испанском — это первое, что удивляет многих новичков, ожидающих латиноамериканский испанский. Бразильский португальский отличается от европейского произношением и ритмом настолько, что учить стоит именно бразильские, а не португальские материалы с самого начала.',
              'По индексу владения английским (EF EPI) Бразилия занимает 81-е место из 116 стран — категория «низкий уровень». Свободно говорят по-английски около 5% населения, действительно хорошо — около 1%.',
              'Честная деталь для нашего региона: юг Бразилии — исключение. Флорианополис стабильно показывает результаты на тестах английского выше среднего по стране. Не рассчитывайте на английский как на основной язык общения, но в Санта-Катарине шансы встретить говорящего по-английски выше, чем в среднем по Бразилии.',
            ],
          },
          {
            heading: 'Менталитет — «jeitinho brasileiro»',
            paragraphs: [
              'Есть понятие, которое объясняет многое в повседневной жизни — jeitinho brasileiro, буквально «маленький бразильский способ». Гибкий, неформальный подход к правилам и препятствиям — не обман, а скорее находчивость и способность договориться там, где формальный путь кажется тупиковым.',
              'Практически это означает: расписания воспринимаются гибко, личное пространство меньше, чем в Северной Европе или Северной Америке, приветствие часто включает объятия или поцелуй в щёку даже при недолгом знакомстве. Это не хаос — это другая система координат, к которой быстро привыкаешь.',
            ],
          },
          {
            heading: 'Деньги и PIX — то, без чего не обойтись',
            paragraphs: [
              'Забудьте о том, что наличные или карты — основной способ платить. В Бразилии доминирует PIX — система мгновенных платежей от Центробанка, запущенная в 2020 году.',
              'Способы оплаты в Бразилии, 2026: PIX 46%, наличные 22%, дебетовые карты 17%, кредитные карты 12%.',
              '93% взрослого населения Бразилии пользуются PIX, переводы происходят мгновенно, 24/7, включая выходные и праздники. Практический вывод: оформите PIX как можно раньше после открытия бразильского счёта — это не опция, а то, как здесь реально платят за всё, от кофе до аренды квартиры.',
              'Что касается чаевых — в ресторанах часто уже включена сервисная плата 10% в счёт (taxa de serviço), она необязательна к оплате, но социально ожидаема, если сервис был нормальным.',
            ],
          },
          {
            heading: 'Вождение — правило 180 дней',
            paragraphs: [
              'Первые 180 дней: можно ездить на своих правах — при себе паспорт + международное удостоверение (IDP) или заверенный перевод на португальский. После 180 дней: иностранные права перестают действовать — нужна конвертация в бразильские права (CNH), иначе реальные штрафы.',
              'Нюанс, который многих удивляет: страны Меркосур (Аргентина, Парагвай, Уругвай) — вопреки ожиданиям — не имеют льготного упрощённого обмена прав. Конвертация идёт на общих основаниях. У Бразилии есть отдельные соглашения о взаимном признании с рядом стран (Испания, Италия, Германия, Франция, Япония, Южная Корея, Португалия) — с ними экзамен на вождение можно пропустить, нужна только медсправка.',
            ],
          },
          {
            heading: 'Что реально удивляет иностранцев',
            paragraphs: [
              'Физическая близость в общении. Объятия, прикосновения к руке во время разговора — это норма, не заигрывание.',
              'Громкость и эмоциональность. Разговоры на улице, в кафе — заметно громче, чем во многих других культурах. Это не ссора, а обычная манера общения.',
              '«Da próxima vez» и гибкое время. Договорённость на «завтра» может означать существенно более широкое окно времени, чем формально сказано.',
              'Семья в центре всего. Воскресные обеды с большой семьёй, важность крёстных родителей — гораздо более выражены, чем в среднем по Европе.',
            ],
          },
          {
            heading: 'Частые заблуждения иностранцев',
            paragraphs: [
              '«В Бразилии говорят по-испански» — нет, только португальский.',
              '«Вся Бразилия — это Рио и карнавал» — страна размером с континент; юг культурно и экономически сильно отличается от северо-востока или Рио.',
              '«Бюрократию можно обойти» — иногда да, но чаще нет; закладывать больше времени надёжнее, чем искать короткие пути.',
              '«Английский поможет в большинстве ситуаций» — не поможет за пределами туристических зон и бизнес-районов.',
            ],
          },
          {
            heading: 'Банковский счёт и повседневные финансы',
            paragraphs: [
              'Для открытия бразильского счёта потребуется CPF и, как правило, подтверждение адреса. Крупные банки (Banco do Brasil, Itaú, Bradesco) принимают иностранцев с CPF и паспортом; некоторые цифровые банки (Nubank, Inter) тоже работают с иностранцами. Без местного счёта не получится подключить PIX — а без PIX повседневная жизнь в Бразилии заметно сложнее.',
            ],
          },
          {
            heading: 'Безопасность — трезво, без паники и без беспечности',
            paragraphs: [
              'Мы подробно разбирали статистику безопасности по регионам в отдельной [статье о сравнении Рио, Сан-Паулу и юга Бразилии](/research/report/gde-kupit-nedvizhimost-braziliya) — вкратце: уровень риска в Бразилии сильно зависит от конкретного города и района, разница между Флорианополисом и, например, Рио — кратная, не на проценты.',
              'Практические привычки, которые работают везде: не демонстрировать дорогие вещи открыто на улице, быть внимательным в людных местах и общественном транспорте, пользоваться проверенными такси/приложениями вечером. Это обычная городская осторожность, не что-то специфически «опасное для Бразилии».',
            ],
          },
          {
            heading: 'Бюрократия — наберитесь терпения заранее',
            paragraphs: [
              'Бразилия славится бюрократией (burocracia) — это не миф. Первый и главный документ, который понадобится почти для всего — CPF, бразильский налоговый номер физлица. Мы подробно разбирали, как его получить, в [статье про покупку недвижимости](/research/report/kak-kupit-nedvizhimost-braziliya). Закладывайте больше времени на любую официальную процедуру, чем кажется логичным — это не исключение, а норма.',
            ],
          },
          {
            heading: 'Повседневные мелочи, которые экономят нервы',
            paragraphs: [
              'Рабочие часы — многие небольшие магазины и сервисы закрываются на обед, особенно вне крупных городов. Праздники — Бразилия отмечает много официальных и региональных праздников, в эти дни многое закрыто, включая банки. Еда — обед (almoço) часто главный приём пищи дня, а не ужин, как принято в Европе.',
            ],
          },
          {
            heading: 'Проверьте сами — два бесплатных инструмента',
            paragraphs: [
              '[Brazil Fit Score](/brazil-fit-score) — тест на 7 вопросов (2 минуты), который оценивает, насколько Бразилия подходит именно вам — для жизни, инвестиций, работы, природы.',
              '[Visa & Residency Path Calculator](/visa-path) — 6 вопросов, определяющих оптимальный путь к резиденции или гражданству под вашу ситуацию. Оба бесплатны, без регистрации.',
            ],
          },
          {
            heading: 'Что в итоге',
            paragraphs: [
              'Бразилия — не одна страна с одним набором правил, а сумма очень разных регионов. То, что верно для Рио, не всегда верно для Санта-Катарины. Язык, деньги, бюрократия и безопасность — это база, с которой стоит въезжать в страну, а не открывать для себя методом проб и ошибок в первую неделю. Когда база по стране уже понятна, наш [практический гид для новоприбывших в Флорианополисе](/research/report/newcomers-guide-florianopolis) разбирает первые месяцы уже на уровне города — школы, врачи, транспорт и где жить.',
              'Материал носит информационный характер и основан на общедоступных источниках (EF EPI, Центральный банк Бразилии) и личном опыте жизни в Бразилии с 2009 года.',
            ],
          },
        ],
    },
  },
  'jurere-internacional-investment-guide': {
    en: {
      sections: [
        {
          heading: 'The Short Version',
          paragraphs: [
            'Jurerê Internacional is a planned luxury beachfront community on the north shore of Santa Catarina Island, widely regarded as the most prestigious real estate address in southern Brazil. Exchange rate: 1 USD = R$5.15, unified across all Plan B materials.',
            'Headline figures: $4.1K avg. price/m² (~R$22K), 5.2% rental yield, 12% annual growth, ~3K permanent residents.',
          ],
        },
        {
          heading: 'Market Overview',
          paragraphs: [
            'Created over 30 years ago by the Habitasul Group as a tourism-oriented master-planned development, the neighborhood combines luxury single-family houses, upscale condominiums, and hospitality properties (resorts, beach clubs, hotels). Known for its high-society residents, designer architecture, beach clubs, and summer social scene.',
            'Land is scarce and tightly regulated, making Jurerê Internacional one of the most exclusive and resilient luxury markets in Latin America.',
            'North shore of Santa Catarina Island, approximately 20 km from downtown Florianópolis and 16 km from Hercílio Luz Airport. Occupies the eastern portion of the broader Jurerê neighborhood, with direct beachfront access and a master-planned grid of streets, parks, and commercial areas. Bordered by the Atlantic Ocean to the east and the natural dunes of Jurerê beach to the west. For the full city-wide picture — infrastructure catalysts, price trends, and how Jurerê compares to the other districts — see our [Florianópolis investment report](/research/report/florianopolis-investment-report-2026).',
            'A very small permanent resident population — estimated at approximately 3,000 or fewer — due to its low-density, single-family-home character. The seasonal population swells dramatically during summer, with thousands of second-home owners, tourists, and hospitality workers. The demographic is predominantly high-net-worth individuals, with median household incomes far above the national average.',
          ],
        },
        {
          heading: 'Real Estate Price Analysis',
          paragraphs: [
            'Luxury houses (beachfront): $5.7K+/m² (~R$30K+), entry (2BR) $1.9M+ (~R$10M+) — HNWIs, celebrities. Upscale condos: $3.8–5.7K/m² (~R$20–30K), entry $380K+ (~R$2M+) — upper-class investors. Standard condos (Jurerê proper): $2.8–3.8K/m² (~R$15–20K), entry $226K+ (~R$1.2M+) — upper-middle class. Long-term rental: from $1,900/month (~R$10K) — expats, executives.',
            'Methodological note — cross-referencing our [2026-2027 market strategy report](/research/report/brazil-market-strategy-2026-2027): there, we cited Alphaplan/Sinduscon data where "Jurerê" (~R$28.6K/m²) and "Jurerê Internacional" (~R$33K/m²) appear as two separate districts. Here, we present three tiers within Jurerê Internacional itself, from "Jurerê proper" ($2.8–3.8K) to beachfront luxury ($5.7K+). These are different segmentation systems for the same territory, not a contradiction: our analysis and FipeZap group by property type within a single master plan, while Alphaplan/Sinduscon group by geographic sub-brand.',
          ],
        },
        {
          heading: 'Market Dynamics',
          paragraphs: [
            'Jurerê Internacional operates on a completely different dynamic from the rest of Florianópolis. Prices are driven by three factors: scarcity (limited beachfront land), brand value (the "Jurerê" name carries premium status), and lifestyle demand (beach clubs, safety, exclusivity).',
            'The market is resilient to downturns — even during Brazil\'s 2015–2016 recession, Jurerê prices held steady. New supply is extremely limited due to environmental regulations and the Habitasul master plan. Most transactions are resales of existing properties rather than new construction. The neighborhood is experiencing a trend toward modernization — older houses are being demolished and rebuilt with contemporary architecture.',
          ],
        },
        {
          heading: 'Rental Market & Developers',
          paragraphs: [
            'Long-term (annual): $1,900–3,800/month (~R$10–20K), 75–80% occupancy, gross yield 3.5–4.0%. Short-term (luxury Airbnb): $3,800–7,500/month (~R$20–40K), 40–55% occupancy, gross yield 4.5–5.5%. Seasonal (Dec–Feb): $7,500–15,000/month (~R$40–80K), 90–100% occupancy.',
            'The rental market here is less about yield and more about offsetting the carrying costs of a second home. During December–February, properties rent at 3–5x the off-season rate, often booked months in advance.',
            'Active developers: Habitasul Group (master developer, 30+ years, original neighborhood planner), individual architects (custom houses, luxury, eco-sustainable projects), boutique developers (infill condos, small luxury projects, 10–20 units, ultra-premium).',
          ],
        },
        {
          heading: 'Infrastructure & Amenities',
          paragraphs: [
            'Jurerê Open (open-air shopping with restaurants and shops), multiple beach clubs (P12, Coco Bambu, and others), parks, playgrounds, and 24-hour security. The neighborhood has a supermarket, pharmacy, and medical clinic. Habitasul maintains the area\'s landscaping, signage, and public spaces to high standards.',
            'The neighborhood is connected to Floripa\'s bus network, but most residents drive. The main limitation is distance from downtown (30–40 min) and the lack of urban amenities like large hospitals or universities nearby.',
          ],
        },
        {
          heading: 'Plan B Investment Score',
          paragraphs: [
            'Investment 9.0/10. Rental Demand 6.5/10. Liquidity 9.0/10. Lifestyle 9.5/10. Growth 8.5/10. Overall 8.7/10. Plan B Expert Assessment — subjective evaluation based on market analysis. Not financial advice.',
          ],
        },
        {
          heading: 'Plan B Verdict — Jurerê Internacional',
          paragraphs: [
            '✅ BUY — for wealth preservation and prestige, 5+ year hold. Jurerê Internacional is Santa Catarina\'s most prestigious address and one of the most resilient luxury markets in Latin America. With constrained land supply, strong brand value, and consistent high-income demand, it offers wealth preservation and steady 12% annual appreciation.',
            'Entry at $226K+ (~R$1.2M+) for condos or $1.9M+ (~R$10M+) for beachfront houses puts it out of reach for most investors, but for HNWIs, it offers the best combination of lifestyle, status, and long-term value protection in southern Brazil. Not a cash-flow play — this is a prestige and wealth preservation asset.',
            'For a broader look at how Jurerê compares to other north-side beach districts on yield and entry price, see our [Canasvieiras](/research/report/canasvieiras-investment-guide) and [Ingleses](/research/report/ingleses-investment-guide) guides, or the full [Santa Catarina district comparison](/research/report/best-areas-to-invest-in-santa-catarina-2026).',
            'This material is for informational purposes only and does not constitute investment advice.',
          ],
        },
      ],
    },
    ru: {
      sections: [
        {
          heading: 'Коротко о главном',
          paragraphs: [
            'Jurerê Internacional — спланированное люксовое прибрежное сообщество на северном берегу острова Санта-Катарина, повсеместно признанное самым престижным адресом недвижимости на юге Бразилии. Курс: 1 USD = R$5,15, унифицировано по всем материалам Plan B.',
            'Ключевые цифры: $4,1K средняя цена/м² (~R$22K), 5,2% доходность от аренды, 12% рост в год, ~3К постоянных жителей.',
          ],
        },
        {
          heading: 'Обзор рынка',
          paragraphs: [
            'Создан более 30 лет назад группой Habitasul как туристически-ориентированная застройка по единому мастер-плану, район сочетает люксовые частные дома, престижные кондоминиумы и гостиничную недвижимость (резорты, пляжные клубы, отели). Известен своими состоятельными резидентами, архитектурой от именитых бюро, пляжными клубами и летней светской жизнью.',
            'Земля дефицитна и строго регулируется — это делает Jurerê Internacional одним из самых эксклюзивных и устойчивых люксовых рынков Латинской Америки.',
            'Северный берег острова Санта-Катарина, примерно 20 км от центра Флорианополиса и 16 км от аэропорта Эрсилиу-Лус. Занимает восточную часть более широкого района Журере, с прямым выходом к пляжу и спланированной сеткой улиц, парков и коммерческих зон. Ограничен Атлантическим океаном с востока и природными дюнами пляжа Журере с запада. Полную картину по городу — инфраструктурные катализаторы, динамику цен и сравнение с другими районами — см. в нашем [отчёте по Флорианополису](/research/report/florianopolis-investment-report-2026).',
            'Очень малое постоянное население — около 3000 человек или менее, из-за низкой плотности застройки частными домами. Сезонное население резко растёт летом — тысячи владельцев второй недвижимости, туристов и работников гостиничной сферы. Демография преимущественно состоятельная, медианный доход домохозяйств значительно выше среднего по стране.',
          ],
        },
        {
          heading: 'Анализ цен на недвижимость',
          paragraphs: [
            'Люксовые дома (1-я линия): $5,7K+/м² (~R$30K+), вход (2BR) $1,9M+ (~R$10M+) — HNWI, знаменитости. Апскейл кондо: $3,8–5,7K/м² (~R$20–30K), вход $380K+ (~R$2M+) — инвесторы высшего класса. Стандартные кондо (Jurerê proper): $2,8–3,8K/м² (~R$15–20K), вход $226K+ (~R$1,2M+) — верхний средний класс. Долгосрочная аренда: от $1900/мес (~R$10K) — экспаты, руководители.',
            'Методологическая сноска — сверка с нашей [статьёй про стратегию 2026-2027](/research/report/brazil-market-strategy-2026-2027): там мы приводили данные Alphaplan/Sinduscon, где «Журере» (~R$28,6K/м²) и «Журере Интернасьонал» (~R$33K/м²) фигурируют как два отдельных района. Здесь же — три яруса внутри самого Jurerê Internacional, от «Jurerê proper» ($2,8–3,8K) до пляжного люкса ($5,7K+). Это разные системы сегментации одной и той же территории, не противоречие: наш анализ и FipeZap группируют по типу недвижимости внутри единого мастер-плана, Alphaplan/Sinduscon — по географическим суббрендам.',
          ],
        },
        {
          heading: 'Рыночная динамика',
          paragraphs: [
            'Jurerê Internacional живёт по совершенно другой логике, чем остальной Флорианополис. Цены движимы тремя факторами: дефицитом (ограниченная прибрежная земля), ценностью бренда (само имя «Журере» несёт премиальный статус) и лайфстайл-спросом (пляжные клубы, безопасность, эксклюзивность).',
            'Рынок устойчив к спадам — даже во время рецессии в Бразилии 2015–2016 годов цены в Журере держались стабильно. Новое предложение крайне ограничено из-за экологических регуляций и мастер-плана Habitasul. Большинство сделок — перепродажи существующих объектов, а не новое строительство. Район переживает тренд на модернизацию — старые дома сносят и отстраивают заново в современной архитектуре.',
          ],
        },
        {
          heading: 'Аренда и застройщики',
          paragraphs: [
            'Долгосрочная (годовая): $1 900–3 800/мес (~R$10–20K), загрузка 75–80%, валовая доходность 3,5–4,0%. Краткосрочная (люкс Airbnb): $3 800–7 500/мес (~R$20–40K), загрузка 40–55%, валовая доходность 4,5–5,5%. Сезонная (дек–фев): $7 500–15 000/мес (~R$40–80K), загрузка 90–100%.',
            'Рынок аренды здесь не столько про доходность, сколько про покрытие расходов на содержание второго дома. В декабре-феврале объекты сдаются по ставке в 3-5 раз выше межсезонной, часто забронированы за месяцы вперёд.',
            'Активные застройщики: Habitasul Group (мастер-девелопер, 30+ лет, оригинальный план района), индивидуальные архитекторы (кастомные дома, люкс, эко-устойчивые проекты), бутик-застройщики (инфилл-кондо, небольшие люксовые проекты на 10-20 юнитов, ультра-премиум).',
          ],
        },
        {
          heading: 'Инфраструктура и удобства',
          paragraphs: [
            'Jurerê Open (открытый торговый центр с ресторанами и магазинами), несколько пляжных клубов (P12, Coco Bambu и другие), парки, детские площадки, круглосуточная охрана. В районе есть супермаркет, аптека, медицинская клиника. Habitasul поддерживает ландшафт, навигацию и общественные пространства на высоком уровне.',
            'Район подключён к автобусной сети Флорипы, но большинство жителей передвигаются на машине. Главное ограничение — удалённость от центра (30–40 минут) и отсутствие рядом крупных больниц или университетов.',
          ],
        },
        {
          heading: 'Plan B Investment Score',
          paragraphs: [
            'Investment 9,0/10. Rental Demand 6,5/10. Liquidity 9,0/10. Lifestyle 9,5/10. Growth 8,5/10. Overall 8,7/10. Экспертная оценка Plan B — субъективная оценка на основе анализа рынка. Не является финансовой консультацией.',
          ],
        },
        {
          heading: 'Вердикт Plan B — Jurerê Internacional',
          paragraphs: [
            '✅ BUY — для сохранения капитала и престижа, горизонт 5+ лет. Jurerê Internacional — самый престижный адрес Санта-Катарины и один из самых устойчивых люксовых рынков Латинской Америки. При ограниченном предложении земли, сильной ценности бренда и стабильном спросе высокодоходной аудитории — это инструмент сохранения капитала со стабильным ростом 12% в год.',
            'Вход от $226K (~R$1,2M+) за кондо или $1,9M+ (~R$10M+) за дом на первой линии делает район недоступным для большинства инвесторов, но для состоятельных покупателей это лучшее сочетание лайфстайла, статуса и долгосрочной защиты капитала на юге Бразилии. Это не инструмент для денежного потока — это актив престижа и сохранения капитала.',
            'Для более широкого сравнения Журере с другими пляжными районами севера острова по доходности и порогу входа — см. наши гиды по [Canasvieiras](/research/report/canasvieiras-investment-guide) и [Ingleses](/research/report/ingleses-investment-guide), а также полное [сравнение районов Санта-Катарины](/research/report/best-areas-to-invest-in-santa-catarina-2026).',
            'Материал носит информационный характер и не является инвестиционной рекомендацией.',
          ],
        },
      ],
    },
  },

  'canasvieiras-investment-guide': {
    en: {
      sections: [
        {
          heading: 'The Short Version',
          paragraphs: [
            'Canasvieiras is one of the most established tourist neighborhoods in northern Florianópolis, with a resident population of approximately 9,800 that swells dramatically during summer. Exchange rate: 1 USD = R$5.15, unified across all Plan B materials.',
            'Headline figures: $1.8K avg. price/m² (~R$9.5K), 7.5% rental yield, 8% annual growth, 9.8K permanent residents.',
          ],
        },
        {
          heading: 'Market Overview',
          paragraphs: [
            'The neighborhood is particularly popular with Argentine and Uruguayan tourists, who have been visiting for decades and maintain a strong presence through seasonal rentals and second-home ownership. Canasvieiras has a lively beachfront strip with restaurants, bars, and shops, creating a resort-town atmosphere.',
            'The real estate market is mature — most buildings were constructed between 1990–2015, with newer infill projects focusing on modernized units.',
            'Northern tip of Santa Catarina Island, approximately 23 km from downtown Florianópolis. Canasvieiras is the northernmost urbanized beach neighborhood on the island, bordered by Ingleses to the south (2 km) and the Atlantic Ocean to the north. The beach faces northeast with calm, warm waters. Access is via SC-401 highway, with the neighborhood\'s main commercial strip running parallel to the beach. For the full city-wide picture and how Canasvieiras stacks up against the other districts, see our [Florianópolis investment report](/research/report/florianopolis-investment-report-2026).',
            'Approximately 9,814 permanent residents (52% female, 48% male) across 3.55 km². The effective population during summer reaches 30,000–40,000+ due to the strong influx of Argentine, Uruguayan, and Brazilian tourists. The neighborhood has a significant Argentine community — many families have owned second homes here for 20+ years. The seasonal demographic is heavily family-oriented.',
          ],
        },
        {
          heading: 'Price by Property Type — Older Stock vs New Construction',
          paragraphs: [
            'Older stock (discounted): from $58K per unit. Renovated units: up to $97K. New construction (premium): from $97K+.',
            'Most buildings in Canasvieiras were constructed between 1990–2015 — creating a genuine price gap between discounted older stock and select new-construction projects. The key threshold is around $97K (~R$500K): above that, the premium for newness stops paying for itself through rental yield, and the classic value-add investor loses their edge.',
          ],
        },
        {
          heading: 'A Major Catalyst: Sapiens Parque',
          paragraphs: [
            'Headline figures: #1 innovation park in Brazil, 900+ resident tech companies, park expansion underway now (2026).',
            'Sapiens Parque sits literally between Canasvieiras and the neighboring district of Cachoeira do Bom Jesus — this isn\'t an abstract "nearby driver," it\'s effectively part of the district\'s own infrastructure. The park\'s official address is registered under Canasvieiras.',
            'Expansion works are in full swing, with direct support from the state governor, who requested new partnerships to further develop the area. Beyond growth in the number of resident tech companies, a new space recently opened — Passeio Sapiens — an urban gastronomy, culture, and coworking hub within the park, 5 minutes from the sea. The stated goal from local developers is honest: give the north of the island "something beyond its summer vocation" — a permanent space for living, business, and leisure year-round, not just during peak season.',
            'For a real estate investor, this means Canasvieiras is no longer solely dependent on Argentine and Uruguayan summer tourism. A growing tech cluster creates demand from a completely different audience — resident-company employees, entrepreneurs, and people seeking year-round housing near work, not just seasonal rentals.',
          ],
        },
        {
          heading: 'Rental Market & Yields',
          paragraphs: [
            'Long-term (annual): $340–470/month (~R$1.8–2.5K), 80–85% occupancy, gross yield 4.5–5.0%. Short-term (Airbnb): $570–850/month (~R$3–4.5K), 50–70% occupancy, gross yield 7.5–8.5%. Seasonal (Dec–Feb): $1,500–2,500/month (~R$8–13K), 88–95% occupancy — peak-season income, not an annual yield.',
            'Three demand drivers: Argentine and Uruguayan families on 2–4 week summer stays — the largest segment, consistent for 20+ years. Brazilian domestic tourists (São Paulo, Rio Grande do Sul) on weekend and holiday stays. Remote workers on 1–3 month stays during the off-season. The neighborhood has a well-developed seasonal rental ecosystem with local property managers, cleaning services, and booking platforms. Long-term rental demand is moderate — the neighborhood is primarily optimized for short-term yields.',
          ],
        },
        {
          heading: 'Plan B Investment Score',
          paragraphs: [
            'Investment 7.8/10. Rental Demand 7.5/10. Liquidity 6.5/10. Lifestyle 7.0/10. Growth 6.5/10. Overall 7.1/10. Plan B Expert Assessment — subjective evaluation based on market analysis. Not financial advice.',
          ],
        },
        {
          heading: 'Plan B Verdict — Canasvieiras',
          paragraphs: [
            '✅ BUY — for yield, value-add strategy. Canasvieiras is the best yield play in northern Florianópolis. With 7.5%+ rental yields and entry prices starting at $58K (~R$300K) for older stock, it offers the best cash-flow-to-price ratio on the island. The mature market means lower appreciation potential (8% annually) but more predictable returns.',
            'Best for conservative investors who prioritize rental income over capital gains. Key strategy: buy older units at a discount, renovate, and rent seasonally. Avoid new construction at premium pricing — the yield advantage disappears above $97K (~R$500K).',
            'For a broader comparison of yield-focused north-side districts, see our [Jurerê Internacional](/research/report/jurere-internacional-investment-guide) and [Ingleses](/research/report/ingleses-investment-guide) guides.',
            'This material is for informational purposes only and does not constitute investment advice.',
          ],
        },
      ],
    },
    ru: {
      sections: [
        {
          heading: 'Коротко о главном',
          paragraphs: [
            'Canasvieiras — один из самых устоявшихся туристических районов севера Флорианополиса, с постоянным населением около 9800 человек, которое резко растёт летом. Курс: 1 USD = R$5,15, унифицировано по всем материалам Plan B.',
            'Ключевые цифры: $1,8K средняя цена/м² (~R$9,5K), 7,5% доходность от аренды, 8% рост в год, 9,8K постоянных жителей.',
          ],
        },
        {
          heading: 'Обзор рынка',
          paragraphs: [
            'Район особенно популярен у аргентинских и уругвайских туристов, приезжающих десятилетиями и сохраняющих сильное присутствие через сезонную аренду и владение второй недвижимостью. У Canasvieiras оживлённая набережная с ресторанами, барами и магазинами — атмосфера курортного городка.',
            'Рынок недвижимости зрелый — большинство зданий построено в 1990–2015 годах, новые точечные проекты фокусируются на модернизированных юнитах.',
            'Северная оконечность острова Санта-Катарина, примерно 23 км от центра Флорианополиса. Canasvieiras — самый северный урбанизированный пляжный район острова, граничит с Инглезес на юге (2 км) и Атлантическим океаном на севере. Пляж выходит на северо-восток, спокойные тёплые воды. Доступ по трассе SC-401, главная коммерческая улица идёт параллельно пляжу. Полную картину по городу и сравнение Canasvieiras с другими районами см. в нашем [отчёте по Флорианополису](/research/report/florianopolis-investment-report-2026).',
            'Около 9814 постоянных жителей (52% женщины, 48% мужчины) на 3,55 км². Эффективное население летом достигает 30–40 тысяч+ за счёт мощного притока аргентинских, уругвайских и бразильских туристов. Значительное аргентинское сообщество — многие семьи владеют второй недвижимостью здесь 20+ лет. Сезонная демография сильно ориентирована на семьи.',
          ],
        },
        {
          heading: 'Цена по типу объекта — старый фонд vs новостройка',
          paragraphs: [
            'Старый фонд (со скидкой): от $58K за юнит. Модернизированные юниты: до $97K. Новостройка (премиум): от $97K+.',
            'Большинство зданий в Canasvieiras построено в 1990–2015 годах — это создаёт реальный ценовой разрыв между старым фондом со скидкой и точечными новостройками. Ключевой порог — около $97K (~R$500K): выше этой отметки премия за новизну перестаёт окупаться доходностью от аренды, и класический value-add инвестор теряет своё преимущество.',
          ],
        },
        {
          heading: 'Крупный катализатор: Sapiens Parque',
          paragraphs: [
            'Ключевые цифры: #1 инновационный парк Бразилии, 900+ резидентных технологических компаний, расширение парка идёт прямо сейчас (2026).',
            'Sapiens Parque расположен буквально между Canasvieiras и соседним районом Cachoeira do Bom Jesus — это не абстрактный «драйвер поблизости», а фактически собственная инфраструктура района. Официальный адрес парка числится за Canasvieiras.',
            'Работы по расширению парка идут полным ходом, с прямой поддержкой губернатора штата, который запросил новые партнёрства для дальнейшего развития территории. Помимо роста числа резидентных технологических компаний, недавно открылся Passeio Sapiens — новое городское пространство с гастрономией, культурой и коворкингом внутри парка, в 5 минутах от моря. Идея честно озвучена местными застройщиками: дать северу острова «нечто большее, чем летнее призвание» — постоянное пространство для жизни, бизнеса и досуга круглый год, а не только в высокий сезон.',
            'Для инвестора в недвижимость Canasvieiras это означает: район больше не зависит исключительно от аргентинского и уругвайского турпотока летом. Растущий технологический кластер создаёт спрос от совершенно другой аудитории — сотрудников резидентных компаний, предпринимателей, тех, кто ищет жильё рядом с работой круглый год, а не только сезонную аренду.',
          ],
        },
        {
          heading: 'Аренда и доходность',
          paragraphs: [
            'Долгосрочная (годовая): $340–470/мес (~R$1,8–2,5K), загрузка 80–85%, валовая доходность 4,5–5,0%. Краткосрочная (Airbnb): $570–850/мес (~R$3–4,5K), загрузка 50–70%, валовая доходность 7,5–8,5%. Сезонная (дек–фев): $1 500–2 500/мес (~R$8–13K), загрузка 88–95% — пиковый доход в высокий сезон, не годовая доходность.',
            'Три драйвера спроса: аргентинские и уругвайские семьи на летний отдых 2–4 недели — крупнейший сегмент, устойчивый уже 20+ лет. Бразильские внутренние туристы (Сан-Паулу, Риу-Гранди-ду-Сул) на выходные и праздники. Удалённые сотрудники на 1–3 месяца в межсезонье. Район обладает развитой экосистемой сезонной аренды — локальные управляющие компании, клининг, букинг-платформы. Спрос на долгосрочную аренду умеренный — район в первую очередь оптимизирован под краткосрочную доходность.',
          ],
        },
        {
          heading: 'Plan B Investment Score',
          paragraphs: [
            'Investment 7,8/10. Rental Demand 7,5/10. Liquidity 6,5/10. Lifestyle 7,0/10. Growth 6,5/10. Overall 7,1/10. Экспертная оценка Plan B — субъективная оценка на основе анализа рынка. Не является финансовой консультацией.',
          ],
        },
        {
          heading: 'Вердикт Plan B — Canasvieiras',
          paragraphs: [
            '✅ BUY — для доходности, стратегия value-add. Canasvieiras — лучшая игра на доходность на севере Флорианополиса. При доходности от 7,5% и входе от $58K (~R$300K) за объекты старого фонда, район предлагает лучшее соотношение денежного потока к цене на острове. Зрелый рынок означает более низкий потенциал роста (8% в год), но более предсказуемую доходность.',
            'Лучше всего подходит консервативным инвесторам, которые ставят доход от аренды выше прироста капитала. Ключевая стратегия: покупайте старые юниты со скидкой, ремонтируйте, сдавайте посезонно. Избегайте новостроек по премиальным ценам — преимущество в доходности исчезает выше $97K (~R$500K).',
            'Для более широкого сравнения районов севера острова по доходности — см. наши гиды по [Jurerê Internacional](/research/report/jurere-internacional-investment-guide) и [Ingleses](/research/report/ingleses-investment-guide).',
            'Материал носит информационный характер и не является инвестиционной рекомендацией.',
          ],
        },
      ],
    },
  },

  'ingleses-investment-guide': {
    en: {
      sections: [
        {
          heading: 'The Short Version',
          paragraphs: [
            'Ingleses (officially "Ingleses do Rio Vermelho") is a beach neighborhood on the north shore of Santa Catarina Island, known for its 3.5 km sandy beach with calm, warm waters — ideal for families. Exchange rate: 1 USD = R$5.15, unified across all Plan B materials.',
            'Headline figures: $2.0K avg. price/m² (~R$10.8K), 7.1% rental yield, 9% annual growth, 5.4K permanent residents.',
          ],
        },
        {
          heading: 'Market Overview',
          paragraphs: [
            'The area is subdivided into Ingleses Norte, Ingleses Centro, and Ingleses Sul. Unlike the party-focused Canasvieiras, Ingleses has a more family-oriented atmosphere — a mix of mid-rise apartment buildings, vacation homes, and local commerce. It has become one of Florianópolis\'s most stable rental markets, with consistent demand from both Brazilian tourists and long-term residents.',
            'Northern tip of the island, approximately 22 km from downtown Florianópolis and 18 km from Hercílio Luz Airport. Accessed via SC-401 highway, which connects to Canasvieiras (2 km north) and Jurerê (4 km east). The beach faces north, meaning calmer waters and warmer temperatures — a key differentiator from the surf beaches on the island\'s east coast. For the full city-wide picture and how Ingleses compares to the other districts, see our [Florianópolis investment report](/research/report/florianopolis-investment-report-2026).',
            'The broader Ingleses do Rio Vermelho district has approximately 5,442 residents across its sub-sectors: Centro (3,142), Sul (1,323), Norte (977). The effective population during summer (December–February) swells to 15,000–20,000+ due to seasonal tourism. The resident population is predominantly middle-class families, with a growing number of remote workers and retirees from other Brazilian states. Unlike pure tourist zones, Ingleses has schools, health clinics, and local commerce serving permanent residents year-round.',
          ],
        },
        {
          heading: 'Real Estate Price Analysis',
          paragraphs: [
            'Beachfront / first line: $2.0–2.3K/m² (~R$10.8–12K), entry (2BR) $104K+ (~R$550K+) — investors, second homes. Mid-rise (2–3 blocks): $1.7–1.9K/m² (~R$8.9–10K), entry $85K+ (~R$450K+) — families, long-term renters. Inland / Rio Vermelho side: $1.3–1.5K/m² (~R$7–8K), entry $66K+ (~R$350K+) — budget investors. Pre-construction: $1.5–1.9K/m² (~R$8–10K), entry $75K+ (~R$400K+) — value investors.',
            'Ingleses has a mature but not saturated market. Most buildings are 3–6 floors, built between 2000–2020, with newer developments focusing on compact 1–2 BR units optimized for seasonal rental. The neighborhood benefits from its proximity to Jurerê Internacional (4 km) — buyers priced out of Jurerê often choose Ingleses as the next best north-side option.',
            'Price growth has been steady at 9% annually — below the explosive rates of Itapema, but more predictable. Redevelopment of older houses into small condo projects is the primary supply driver.',
          ],
        },
        {
          heading: 'Infrastructure & Amenities',
          paragraphs: [
            'Unlike many beach neighborhoods on the island\'s north side, Ingleses functions essentially as a self-contained small city — with a full set of urban infrastructure, not just seasonal services.',
            'Open Shopping Ingleses — the district\'s shopping center. Beach-widening was completed in May 2023 — already delivered, not a future promise. Proximity to UFSC and IFSC universities (about 20 minutes), with coworking spaces and study areas nearby. In 2025, a new municipal school, Red Park, opened in the adjacent Rio Vermelho area. Well-developed cycling infrastructure runs along the main SC-403 avenue.',
            'This infrastructure directly supports the neighborhood\'s core thesis — not a one-off tourist wave, but a genuinely sustainable place to live year-round, which explains why the rental market stays stable across seasons.',
          ],
        },
        {
          heading: 'Rental Market & Yields',
          paragraphs: [
            'Long-term (annual): $380–570/month (~R$2–3K), 88–92% occupancy, gross yield 5.0–5.5%. Short-term (Airbnb): $660–950/month (~R$3.5–5K), 60–75% occupancy, gross yield 7.1–8.0%. Seasonal (Dec–Feb): $1,900–3,200/month (~R$10–17K), 92–97% occupancy.',
            'Ingleses\'s rental market is one of the most stable on the island. Long-term tenants include local families, service workers, and remote workers. Short-term demand comes primarily from Brazilian families (São Paulo, Rio Grande do Sul, Paraná) who appreciate the calm beach and family-friendly atmosphere. The neighborhood is less dependent on Argentine tourism than Canasvieiras, making it more resilient to BRL currency fluctuations. Off-season occupancy remains solid at 60%+ thanks to the permanent resident base.',
          ],
        },
        {
          heading: 'Plan B Investment Score',
          paragraphs: [
            'Investment 8.2/10. Rental Demand 7.5/10. Liquidity 7.0/10. Lifestyle 7.5/10. Growth 7.0/10. Overall 7.6/10. Plan B Expert Assessment — subjective evaluation based on market analysis. Not financial advice.',
          ],
        },
        {
          heading: 'Plan B Verdict — Ingleses',
          paragraphs: [
            '✅ BUY — for stable income, 3–7 year hold. Ingleses is the most stable and conservative play in northern Florianópolis. With 7.1% rental yields, 88%+ long-term occupancy, and steady 9% annual appreciation, it offers reliable returns without the volatility of emerging markets.',
            'Best for first-time SC investors who want predictable cash flow and moderate growth. Entry at $85K–104K (~R$450–550K) for a 2BR in buildings 2–3 blocks from the beach offers the best value. Proximity to Jurerê (4 km) provides an upside catalyst — as Jurerê prices continue rising, Ingleses becomes the logical alternative.',
            'For a broader comparison of north-side beach districts, see our [Jurerê Internacional](/research/report/jurere-internacional-investment-guide) and [Canasvieiras](/research/report/canasvieiras-investment-guide) guides.',
            'This material is for informational purposes only and does not constitute investment advice.',
          ],
        },
      ],
    },
    ru: {
      sections: [
        {
          heading: 'Коротко о главном',
          paragraphs: [
            'Ingleses (официально «Ingleses do Rio Vermelho») — пляжный район на северном берегу острова Санта-Катарина, известный 3,5-километровым песчаным пляжем со спокойными тёплыми водами — идеально для семей. Курс: 1 USD = R$5,15, унифицировано по всем материалам Plan B.',
            'Ключевые цифры: $2,0K средняя цена/м² (~R$10,8K), 7,1% доходность от аренды, 9% рост в год, 5,4K постоянных жителей.',
          ],
        },
        {
          heading: 'Обзор рынка',
          paragraphs: [
            'Район делится на три субрайона — Ingleses Norte, Ingleses Centro и Ingleses Sul. В отличие от «тусовочного» Canasvieiras, Ingleses отличается более семейной атмосферой — смесь среднеэтажных домов, дач и локальной торговли. Стал одним из самых стабильных рынков аренды Флорианополиса, с устойчивым спросом и от бразильских туристов, и от долгосрочных резидентов.',
            'Северная оконечность острова, примерно 22 км от центра Флорианополиса и 18 км от аэропорта Эрсилиу-Лус. Доступ по трассе SC-401, которая связывает с Canasvieiras (2 км на север) и Журере (4 км на восток). Пляж выходит на север — спокойнее воды и теплее температура, ключевое отличие от сёрф-пляжей восточного побережья острова. Полную картину по городу и сравнение Ingleses с другими районами см. в нашем [отчёте по Флорианополису](/research/report/florianopolis-investment-report-2026).',
            'Более широкий район Ingleses do Rio Vermelho насчитывает около 5442 жителей по субрайонам: Centro (3142), Sul (1323), Norte (977). Эффективное население летом (декабрь–февраль) растёт до 15–20 тысяч+ за счёт сезонного туризма. Постоянное население — преимущественно семьи среднего класса, растёт число удалённых сотрудников и пенсионеров из других штатов Бразилии. В отличие от чисто туристических зон, здесь есть школы, клиники и локальная торговля, обслуживающая постоянных резидентов круглый год.',
          ],
        },
        {
          heading: 'Анализ цен на недвижимость',
          paragraphs: [
            'Пляж / 1-я линия: $2,0–2,3K/м² (~R$10,8–12K), вход (2BR) $104K+ (~R$550K+) — инвесторы, вторая недвижимость. Среднеэтажки (2–3 квартала): $1,7–1,9K/м² (~R$8,9–10K), вход $85K+ (~R$450K+) — семьи, долгосрочные арендаторы. Вглубь / сторона Rio Vermelho: $1,3–1,5K/м² (~R$7–8K), вход $66K+ (~R$350K+) — бюджетные инвесторы. Предпродажа: $1,5–1,9K/м² (~R$8–10K), вход $75K+ (~R$400K+) — инвесторы ценности.',
            'Ingleses — зрелый, но не перенасыщенный рынок. Большинство зданий 3-6 этажей, построены в 2000–2020 годах, новые проекты фокусируются на компактных 1-2BR юнитах, оптимизированных под сезонную аренду. Район выигрывает от близости к Журере Интернасьонал (4 км) — покупатели, вытесненные ценами Журере, часто выбирают Ingleses как следующий лучший вариант на севере острова.',
            'Рост цен стабилен на уровне 9% в год — ниже взрывных темпов Итапемы, но более предсказуем. Редевелопмент старых домов в небольшие кондо-проекты — основной драйвер нового предложения.',
          ],
        },
        {
          heading: 'Инфраструктура и удобства',
          paragraphs: [
            'В отличие от многих пляжных районов севера острова, Ingleses функционирует как самостоятельный небольшой город — с полным набором городской инфраструктуры, а не только сезонными сервисами.',
            'Open Shopping Ingleses — торговый центр района. Расширение пляжной полосы завершено в мае 2023 года — уже готовый, а не планируемый проект. Близость к университетам UFSC и IFSC (около 20 минут), с коворкингами и учебными пространствами рядом. В 2025 году в примыкающем районе Rio Vermelho открылась новая муниципальная школа Red Park. Вдоль главной улицы SC-403 — развитая велоинфраструктура.',
            'Этот набор инфраструктуры напрямую поддерживает главный тезис района — не разовый туристический всплеск, а действительно устойчивое место для постоянной жизни, что и объясняет стабильность рынка аренды круглый год.',
          ],
        },
        {
          heading: 'Аренда и доходность',
          paragraphs: [
            'Долгосрочная (годовая): $380–570/мес (~R$2–3K), загрузка 88–92%, валовая доходность 5,0–5,5%. Краткосрочная (Airbnb): $660–950/мес (~R$3,5–5K), загрузка 60–75%, валовая доходность 7,1–8,0%. Сезонная (дек–фев): $1 900–3 200/мес (~R$10–17K), загрузка 92–97%.',
            'Рынок аренды Ingleses один из самых стабильных на острове. Долгосрочные арендаторы — местные семьи, работники сферы услуг, удалённые сотрудники. Краткосрочный спрос идёт в первую очередь от бразильских семей (Сан-Паулу, Риу-Гранди-ду-Сул, Парана), ценящих спокойный пляж и семейную атмосферу. Район меньше зависит от аргентинского туризма, чем Canasvieiras, что делает его более устойчивым к колебаниям курса реала. Загрузка в межсезонье остаётся солидной — 60%+ — благодаря постоянной резидентной базе.',
          ],
        },
        {
          heading: 'Plan B Investment Score',
          paragraphs: [
            'Investment 8,2/10. Rental Demand 7,5/10. Liquidity 7,0/10. Lifestyle 7,5/10. Growth 7,0/10. Overall 7,6/10. Экспертная оценка Plan B — субъективная оценка на основе анализа рынка. Не является финансовой консультацией.',
          ],
        },
        {
          heading: 'Вердикт Plan B — Ingleses',
          paragraphs: [
            '✅ BUY — для стабильного дохода, горизонт 3–7 лет. Ingleses — самая стабильная и консервативная игра на севере Флорианополиса. При доходности 7,1%, загрузке долгосрочной аренды 88%+ и стабильном росте 9% в год, район предлагает надёжную доходность без волатильности развивающихся рынков.',
            'Лучше всего подходит начинающим инвесторам в Санта-Катарине, которые хотят предсказуемый денежный поток и умеренный рост. Вход от $85K–104K (~R$450–550K) за 2BR в домах в 2-3 кварталах от пляжа предлагает лучшее соотношение цена/качество. Близость к Журере (4 км) даёт катализатор роста — по мере роста цен в Журере, Ingleses становится логичной альтернативой.',
            'Для более широкого сравнения пляжных районов севера острова — см. наши гиды по [Jurerê Internacional](/research/report/jurere-internacional-investment-guide) и [Canasvieiras](/research/report/canasvieiras-investment-guide).',
            'Материал носит информационный характер и не является инвестиционной рекомендацией.',
          ],
        },
      ],
    },
  },

  'campeche-investment-guide': {
    en: {
      sections: [
        {
          heading: 'The Short Version',
          paragraphs: [
            'Campeche is a fast-growing beach neighborhood in southern Florianópolis that has transformed from a quiet fishing village into one of the city\'s most dynamic real estate markets. Exchange rate: 1 USD = R$5.15, unified across all Plan B materials.',
            'Headline figures: $1.7K avg. price/m² (~R$8.9K), 6.5% rental yield, 11% annual growth, 30K+ population (greater area).',
          ],
        },
        {
          heading: 'Market Overview',
          paragraphs: [
            'The area encompasses several sub-districts — Campeche Sul, Norte, Leste, Central, and the premium Novo Campeche development — each offering a different investment profile. Known for its 4 km sandy beach, surf culture, and a more "authentic" feel compared to the established north-side beaches.',
            'South coast of Santa Catarina Island, approximately 18 km from downtown Florianópolis and 12 km from Hercílio Luz Airport (which is undergoing major expansion). The neighborhood sits between Lagoa da Conceição to the north and Ribeirão da Ilha to the south, with easy access via SC-406 highway. For the full city-wide picture and how Campeche compares to the other districts, see our [Florianópolis investment report](/research/report/florianopolis-investment-report-2026).',
            'The greater Campeche area is home to approximately 30,000+ residents across all sub-districts. Campeche Sul alone had ~6,240 residents in the most recent census, with 36.5% population growth from 2000–2015 and 189% growth from 1975–2015. The median age is approximately 32 — significantly younger than the city average — driven by young families, remote workers, and lifestyle migrants relocating from other Brazilian states. Seasonal population swells by 40–60% during summer (December–March).',
          ],
        },
        {
          heading: 'Real Estate Price Analysis',
          paragraphs: [
            'Beachfront (Novo Campeche): $1.7–1.9K/m² (~R$9–10K), entry (2BR) $94K+ (~R$500K+) — upper-middle, investors. Second line (Campeche Sul): $1.3–1.5K/m² (~R$7–8K), entry $66K+ (~R$350K+) — families, first-time buyers. Inland (Campeche Norte): $0.9–1.1K/m² (~R$5–6K), entry $47K+ (~R$250K+) — budget-conscious. Pre-construction: $1.1–1.5K/m² (~R$6–8K), entry $57K+ (~R$300K+) — growth investors.',
          ],
        },
        {
          heading: 'A Major Catalyst: Novo Campeche',
          paragraphs: [
            'Headline figures: #2 claimed price ranking in Floripa (needs verification), 24/7 security across the entire subdivision, 100% of properties with clean public deed.',
            'Novo Campeche isn\'t an abstract label — it\'s a specific, planned subdivision (loteamento) within Campeche: wide, tree-lined streets, thoughtful urban planning, 24-hour security across the whole area. Several active developers are building here, including a consortium of Shore Urban + Placon Empreendimentos + Studio Methafora, as well as Grupo OAD with its Makai Beachfront project.',
            'Methodological note — verifying a price claim: one source describes Campeche as "the second most expensive neighborhood in Florianópolis after Jurerê Internacional," per FipeZap. This claim is not supported by our detailed segment figures (Novo Campeche\'s top tier — $1.7–1.9K/m² — is several times lower than even Jurerê\'s average of $4.1K). The source may be using a different methodology (transaction volume rather than price per m², or outdated data). We do not include this claim as fact — the segment figures above remain our primary reference point.',
            'The area is surrounded by an environmental protection zone (APA), and the city\'s new master plan reinforces these building restrictions — a structural supply constraint, a pattern familiar from other districts on the island. All properties come with a clean public deed, reducing legal risk compared to some less formalized plots.',
          ],
        },
        {
          heading: 'Market Dynamics',
          paragraphs: [
            'Campeche is experiencing strong verticalization — 4–6 floor buildings are replacing older single-family homes, particularly in Novo Campeche. The neighborhood is driven by lifestyle migration — remote workers and families from São Paulo, Rio Grande do Sul, and other states who value the beach lifestyle and lower cost of living compared to Jurerê or Lagoa da Conceição. New mixed-use developments are appearing along Av. Campeche.',
            'Land availability is still good compared to saturated north-side beaches, giving Campeche a 5–7 year growth runway before prices converge with premium areas.',
          ],
        },
        {
          heading: 'Rental Market & Yields',
          paragraphs: [
            'Long-term (annual): $340–470/month (~R$1.8–2.5K), 85–90% occupancy, gross yield 4.5–5.0%. Short-term (Airbnb): $570–850/month (~R$3–4.5K), 55–70% occupancy, gross yield 6.5–7.5%. Seasonal (Dec–Feb): $1,500–2,800/month (~R$8–15K), 90–95% occupancy.',
            'Three demand drivers: remote workers on 3–12 month stays, drawn by beach proximity and lower rents than central Floripa. Seasonal Brazilian tourists (families, surfers) in summer. Argentines and Uruguayans on 2–4 week summer stays. Long-term occupancy above 85% year-round makes the neighborhood stable even off-season. Short-term yields spike to 7.5%+ in peak season.',
          ],
        },
        {
          heading: 'Developers & Infrastructure',
          paragraphs: [
            'Active developers: Grupo OAD (Novo Campeche, Porto da Lagoa — Makai Beachfront and Natura projects, high-end and eco-certified), local builders (5+, Campeche Sul/Central, small condos, 20–50 units), SP/RJ developers (Novo Campeche beachfront, emerging luxury towers, premium).',
            'Significant infrastructure investment: new supermarkets (Zeer, Kobrasol), pharmacies, gyms, surf schools, and cafés along the main avenue. There\'s a public school, a health clinic, and regular bus service to downtown Floripa (45 min). SC-406 highway provides fast access to the airport and southern beaches.',
            'Honest about the risk — not just good news: the main concern is increasing traffic during peak season — the single access road (Av. Campeche) becomes congested. Environmental constraints near dunes and mangroves limit construction in some areas — on one hand, this protects property values by limiting oversupply; on the other, it\'s a real inconvenience for everyday logistics.',
          ],
        },
        {
          heading: 'Plan B Investment Score',
          paragraphs: [
            'Investment 8.0/10. Rental Demand 7.0/10. Liquidity 6.5/10. Lifestyle 8.0/10. Growth 8.5/10. Overall 7.6/10. Plan B Expert Assessment — subjective evaluation based on market analysis. Not financial advice.',
          ],
        },
        {
          heading: 'Plan B Verdict — Campeche',
          paragraphs: [
            '✅ BUY — for growth, 5+ year hold. Campeche has the highest upside in Florianópolis for 2026–2028. The combination of lifestyle migration, airport expansion (12 km away), and an active developer pipeline (led by Grupo OAD\'s Makai Beachfront) creates a compelling growth story.',
            'Entry at $66K–94K (~R$350–500K) for a 2BR in second-line positions offers the best risk-adjusted returns. Beachfront Novo Campeche commands premium pricing ($94K+ / ~R$500K+) but offers stronger appreciation. Key risk: oversupply from concurrent projects — verify the building pipeline before buying. Best for growth-focused investors willing to hold 5+ years.',
            'For a broader comparison of Florianópolis beach districts, see our [best areas to invest in Santa Catarina](/research/report/best-areas-to-invest-in-santa-catarina-2026) guide.',
            'This material is for informational purposes only and does not constitute investment advice.',
          ],
        },
      ],
    },
    ru: {
      sections: [
        {
          heading: 'Коротко о главном',
          paragraphs: [
            'Campeche — быстрорастущий пляжный район на юге Флорианополиса, превратившийся из тихой рыбацкой деревни в один из самых динамичных рынков недвижимости города. Курс: 1 USD = R$5,15, унифицировано по всем материалам Plan B.',
            'Ключевые цифры: $1,7K средняя цена/м² (~R$8,9K), 6,5% доходность от аренды, 11% рост в год, 30K+ население большого района.',
          ],
        },
        {
          heading: 'Обзор рынка',
          paragraphs: [
            'Район включает несколько субрайонов — Campeche Sul, Norte, Leste, Central и премиальный Novo Campeche — каждый со своим инвестиционным профилем. Известен 4-километровым песчаным пляжем, сёрф-культурой и более «аутентичной» атмосферой по сравнению с устоявшимися пляжами севера острова.',
            'Южное побережье острова Санта-Катарина, примерно 18 км от центра Флорианополиса и 12 км от аэропорта Эрсилиу-Лус (который проходит масштабное расширение). Район расположен между Лагоа-да-Консейсау на севере и Рибейран-да-Илья на юге, доступ по трассе SC-406. Полную картину по городу и сравнение Campeche с другими районами см. в нашем [отчёте по Флорианополису](/research/report/florianopolis-investment-report-2026).',
            'Большой район Campeche насчитывает 30 000+ жителей по всем субрайонам. Только Campeche Sul — около 6240 жителей по последней переписи, с ростом населения на 36,5% за 2000–2015 и 189% за 1975–2015. Медианный возраст около 32 лет — заметно моложе среднего по городу, за счёт молодых семей, удалённых сотрудников и лайфстайл-мигрантов из других штатов Бразилии. Сезонное население растёт на 40–60% летом (декабрь–март).',
          ],
        },
        {
          heading: 'Анализ цен на недвижимость',
          paragraphs: [
            'Пляж (Novo Campeche): $1,7–1,9K/м² (~R$9–10K), вход (2BR) $94K+ (~R$500K+) — верхний средний класс, инвесторы. 2-я линия (Campeche Sul): $1,3–1,5K/м² (~R$7–8K), вход $66K+ (~R$350K+) — семьи, первая покупка. Вглубь (Campeche Norte): $0,9–1,1K/м² (~R$5–6K), вход $47K+ (~R$250K+) — бюджетные покупатели. Предпродажа: $1,1–1,5K/м² (~R$6–8K), вход $57K+ (~R$300K+) — инвесторы роста.',
          ],
        },
        {
          heading: 'Крупный катализатор: Novo Campeche',
          paragraphs: [
            'Ключевые цифры: #2 заявленное место по цене в Флорипе (нужна сверка), круглосуточная охрана по всему микрорайону, 100% объектов с чистой escritura pública.',
            'Novo Campeche — не абстрактное название, а конкретный спланированный микрорайон (loteamento) внутри Campeche: широкие озеленённые улицы, продуманная урбанистика, круглосуточная охрана по всей территории. Несколько активных застройщиков ведут здесь проекты — включая консорциум Shore Urban + Placon Empreendimentos + Studio Methafora, а также Grupo OAD с проектом Makai Beachfront.',
            'Методологическая сноска — сверка заявления о цене: один из источников описывает Campeche как «второй самый дорогой район Флорианополиса после Журере Интернасьонал» по данным FipeZap. Эта формулировка не подтверждается нашими детальными цифрами по сегментам (топ-сегмент Novo Campeche — $1,7–1,9K/м², в разы ниже даже среднего Журере в $4,1K). Возможно, источник использует другую методологию (объём сделок, не цену за м², или устаревшие данные). Мы не включаем это заявление как факт — цифры сегментации выше остаются нашим основным ориентиром.',
            'Район окружён зоной экологической защиты (APA), а новый генплан города усиливает эти ограничения на застройку — структурный сдерживающий фактор предложения, знакомый паттерн из других районов острова. Все объекты — с чистой публичной escritura, что снижает юридические риски покупки по сравнению с некоторыми менее формализованными участками.',
          ],
        },
        {
          heading: 'Рыночная динамика',
          paragraphs: [
            'Campeche переживает сильную вертикализацию — здания на 4-6 этажей заменяют старые частные дома, особенно в Novo Campeche. Район движим лайфстайл-миграцией — удалённые сотрудники и семьи из Сан-Паулу, Риу-Гранди-ду-Сул и других штатов, ценящие пляжный образ жизни и более низкую стоимость жизни по сравнению с Журере или Лагоа. Новые смешанные (жильё+коммерция) проекты появляются вдоль Av. Campeche.',
            'Доступность земли всё ещё хорошая по сравнению с перенасыщенными пляжами севера острова — это даёт Campeche «взлётную полосу» роста на 5–7 лет, прежде чем цены сойдутся с премиальными районами.',
          ],
        },
        {
          heading: 'Аренда и доходность',
          paragraphs: [
            'Долгосрочная (годовая): $340–470/мес (~R$1,8–2,5K), загрузка 85–90%, валовая доходность 4,5–5,0%. Краткосрочная (Airbnb): $570–850/мес (~R$3–4,5K), загрузка 55–70%, валовая доходность 6,5–7,5%. Сезонная (дек–фев): $1 500–2 800/мес (~R$8–15K), загрузка 90–95%.',
            'Три драйвера спроса на аренду: удалённые сотрудники на 3–12 месяцев, привлечённые близостью к пляжу и более низкой арендой, чем в центре Флорипы. Сезонные бразильские туристы (семьи, сёрферы) летом. Аргентинцы и уругвайцы на 2–4 недели летом. Загрузка долгосрочной аренды свыше 85% круглый год делает район стабильным даже в межсезонье. Краткосрочная доходность подскакивает до 7,5%+ в высокий сезон.',
          ],
        },
        {
          heading: 'Застройщики и инфраструктура',
          paragraphs: [
            'Активные застройщики: Grupo OAD (Novo Campeche, Porto da Lagoa — проекты Makai Beachfront, Natura, высокий класс с эко-сертификацией), локальные застройщики (5+, Campeche Sul/Central, небольшие кондо на 20-50 юнитов), застройщики из SP/RJ (побережье Novo Campeche, растущие люксовые башни, премиум).',
            'Значительные инвестиции в инфраструктуру: новые супермаркеты (Zeer, Kobrasol), аптеки, спортзалы, школы сёрфинга и кафе вдоль главной улицы. Есть государственная школа, медицинская клиника, регулярный автобус до центра Флорипы (45 мин). Трасса SC-406 даёт быстрый доступ к аэропорту и южным пляжам.',
            'Честно про риск — не только хорошие новости: главная проблема — растущий трафик в высокий сезон: единственная дорога доступа (Av. Campeche) перегружается. Экологические ограничения у дюн и мангровых зарослей ограничивают застройку в некоторых зонах — с одной стороны, это защищает стоимость недвижимости за счёт ограничения переизбытка предложения, с другой — реальное неудобство для повседневной логистики.',
          ],
        },
        {
          heading: 'Plan B Investment Score',
          paragraphs: [
            'Investment 8,0/10. Rental Demand 7,0/10. Liquidity 6,5/10. Lifestyle 8,0/10. Growth 8,5/10. Overall 7,6/10. Экспертная оценка Plan B — субъективная оценка на основе анализа рынка. Не является финансовой консультацией.',
          ],
        },
        {
          heading: 'Вердикт Plan B — Campeche',
          paragraphs: [
            '✅ BUY — для роста, горизонт 5+ лет. Campeche обладает наибольшим потенциалом роста во Флорианополисе на 2026–2028 годы. Сочетание лайфстайл-миграции, расширения аэропорта (12 км) и активного пайплайна застройщиков (во главе с Makai Beachfront от Grupo OAD) создаёт убедительную историю роста.',
            'Вход от $66K–94K (~R$350–500K) за 2BR на 2-й линии предлагает лучшее соотношение риск/доходность. Пляжный Novo Campeche стоит дороже ($94K+ / ~R$500K+), но даёт более сильный потенциал роста. Ключевой риск: переизбыток предложения от одновременных проектов — проверяйте пайплайн строительства перед покупкой. Лучше всего подходит инвесторам, ориентированным на рост, готовым держать от 5 лет.',
            'Для более широкого сравнения пляжных районов Флорианополиса — см. наш гид по [лучшим районам для инвестиций в Санта-Катарине](/research/report/best-areas-to-invest-in-santa-catarina-2026).',
            'Материал носит информационный характер и не является инвестиционной рекомендацией.',
          ],
        },
      ],
    },
  },

  'newcomers-guide-florianopolis': {
    en: {
      sections: [
          {
            heading: 'The Short Version',
            paragraphs: [
              'This isn\'t about investment — it\'s about your first months living on the island. Schools, healthcare, transport, shopping, and the practical details that save you time and stress.',
              'Quick facts: city population 587K (metro area 1.1M). Two bridges connect the island to the mainland. HDI 0.847 — very high development index. Plan B Brazil\'s founder has lived in Florianópolis since 2021.',
            ],
          },
          {
            heading: 'Transport — What to Understand Right Away',
            paragraphs: [
              'Florianópolis is an island connected to the mainland by bridges, and this shapes daily logistics more than it might seem at first.',
              'The actual vehicular link is the Colombo Salles Bridge (opened 1975) — not the famous Hercílio Luz Bridge, which is now open to pedestrians and cyclists only. Traffic jams entering/exiting the island at rush hour are a real, well-known issue, not a tourist legend; an alternative bridge has been under construction for a long time.',
              'Practical takeaway: a car or scooter is practically a necessity for daily life, especially if you don\'t live downtown. Public transport (the TICEN bus system) is basic and not always intuitive without Portuguese. Uber works well in Florianópolis — unlike many Brazilian cities where the service is less developed.',
              'Bike infrastructure is partially developed, especially along the Beira-Mar waterfront, but hilly terrain and traffic limit it as a primary mode of transport.',
            ],
          },
          {
            heading: 'Schools — International and Bilingual Options',
            paragraphs: [
              'Families with children in Florianópolis have a choice between two types of schools: international schools (IB accreditation or American curricula, focused on foreign university admission, higher cost) and bilingual schools (Brazilian curriculum + English immersion, prepare for ENEM/vestibular, more affordable).',
              'International options: Dual International School — IB World School, English/Portuguese, Spanish from Grade 6, since 2014. Escola Internacional de Florianópolis (EIF) — American curriculum, Trindade district, since 2005.',
              'Bilingual options: Maple Bear Canadian School — Canadian methodology. Escola Dinâmica Bilíngue, Escola St. Patrick — other popular options.',
            ],
          },
          {
            heading: 'Healthcare — Public and Private',
            paragraphs: [
              'Brazil offers free public healthcare (SUS) for everyone, including foreign residents, but most expats and affluent Brazilians use private care or health insurance (plano de saúde) for faster access and shorter waits.',
              'Well-known private hospitals in Florianópolis: Hospital Baía Sul, Hospital Universitário (at UFSC), Imperial Hospital de Caridade. Private insurance is usually arranged through an employer or directly — cost depends on age and coverage level.',
            ],
          },
          {
            heading: 'Bank Account and First Documents',
            paragraphs: [
              'We covered opening an account and the role of the CPF in detail in our general ["Brazil for Dummies"](/research/report/brazil-for-dummies-culture-guide) guide — the same logic applies here: without a CPF you can\'t open an account, without an account you can\'t set up PIX, and without PIX everyday life gets noticeably harder.',
            ],
          },
          {
            heading: 'Where to Shop — From Groceries to Everything Else',
            paragraphs: [
              'Supermarkets: Angeloni (a major chain originally from Santa Catarina), Giassi, and other regional chains.',
              'Mercado Público — the historic public market downtown — fresh produce, restaurants, bars, local culture.',
              'Big-ticket purchases — furniture and electronics — shopping centers are spread across the island and mainland; plan your route around the bridges and traffic.',
            ],
          },
          {
            heading: 'Neighborhoods — Where to Live, Not Where to Invest',
            paragraphs: [
              'We covered Florianópolis\'s neighborhoods from an investment angle in a separate, detailed report — here it\'s a different lens: where it\'s genuinely comfortable to live in your first months.',
              'Families with children often find districts near international schools convenient (Trindade, home to EIF). Remote workers who value infrastructure tend toward Campeche and Lagoa, with their growing digital nomad community. Centro suits those who prefer urban rhythm without a beach focus.',
            ],
          },
          {
            heading: 'Check for Yourself — A Free Tool',
            paragraphs: [
              'Ideal Regions — a personalized report (after the short Brazil Fit Score test) that tells you which district of Florianópolis and Santa Catarina fits your specific situation.',
            ],
          },
          {
            heading: 'Bottom Line',
            paragraphs: [
              'Your first months in Florianópolis are easier once you understand the island\'s logistics (the bridges and traffic are real), choose the right school system for your kids, arrange health insurance, and know where everyday needs get met. It\'s no harder than moving to any other new city — just with its own local specifics. If you\'re still working out the legal side of moving here, see our guide to [Brazil residency through real estate](/research/report/vnzh-braziliya-nedvizhimost) for the visa mechanics and timeline.',
              'This material is for informational purposes only and is based on publicly available sources and personal experience living in Florianópolis since 2021.',
            ],
          },
      ],
    },
    ru: {
      sections: [
          {
            heading: 'Коротко о главном',
            paragraphs: [
              'Не про инвестиции — про первые месяцы жизни на острове. Школы, врачи, транспорт, покупки и практические мелочи, которые экономят время и нервы.',
              'Быстрые факты: население города 587 тыс. (агломерация 1,1 млн). Два моста связывают остров с материком. Индекс развития HDI 0,847 — очень высокий. Основатель Plan B Brazil живёт во Флорианополисе с 2021 года.',
            ],
          },
          {
            heading: 'Транспорт — главное, что нужно понять сразу',
            paragraphs: [
              'Флорианополис — остров, соединённый с материком мостами, и это определяет повседневную логистику сильнее, чем кажется на первый взгляд.',
              'Реальная автомобильная связь идёт через мост Colombo Salles (открыт в 1975 году) — не через знаменитый мост Эрсилиу-Лус, который сейчас открыт только для пешеходов и велосипедистов. Пробки на въезде/выезде с острова в час пик — реальная, известная проблема, а не туристическая легенда; ещё один альтернативный мост находится в стройке уже долгое время.',
              'Практический вывод: машина или скутер — практически необходимость для повседневной жизни, особенно если вы живёте не в центре. Общественный транспорт (система TICEN) базовый и не всегда интуитивно понятен без знания португальского. Uber работает хорошо во Флорианополисе — в отличие от многих городов Бразилии, где сервис менее развит.',
              'Велосипедная инфраструктура частично развита, особенно вдоль набережной Beira-Mar, но холмистый рельеф и трафик ограничивают её как основной способ передвижения.',
            ],
          },
          {
            heading: 'Школы — международные и билингвальные варианты',
            paragraphs: [
              'Для семей с детьми в Флорианополисе есть выбор между двумя типами школ: международные школы (аккредитация IB или американские программы, ориентация на поступление в зарубежные вузы, выше стоимость) и билингвальные школы (бразильская программа + погружение в английский, готовят к ENEM/vestibular, более доступная цена).',
              'Международные варианты: Dual International School — IB World School, англ/порт, испанский с 6 класса, с 2014. Escola Internacional de Florianópolis (EIF) — американская программа, район Trindade, с 2005.',
              'Билингвальные варианты: Maple Bear Canadian School — канадская методология. Escola Dinâmica Bilíngue, Escola St. Patrick — другие популярные варианты.',
            ],
          },
          {
            heading: 'Здравоохранение — государственное и частное',
            paragraphs: [
              'Бразилия предлагает бесплатную государственную систему здравоохранения (SUS) для всех, включая иностранных резидентов, но большинство экспатов и состоятельных бразильцев используют частную медицину или медицинскую страховку (plano de saúde) для более быстрого доступа и меньших очередей.',
              'Известные частные больницы во Флорианополисе: Hospital Baía Sul, Hospital Universitário при UFSC, Imperial Hospital de Caridade. Частная страховка обычно оформляется через работодателя или напрямую — стоимость зависит от возраста и объёма покрытия.',
            ],
          },
          {
            heading: 'Банковский счёт и первые документы',
            paragraphs: [
              'Мы подробно разбирали открытие счёта и роль CPF в общем гиде [«Brazil for Dummies»](/research/report/brazil-for-dummies-culture-guide) — та же логика применима и здесь: без CPF не откроете счёт, без счёта не подключите PIX, без PIX повседневная жизнь заметно сложнее.',
            ],
          },
          {
            heading: 'Где покупать — от продуктов до всего остального',
            paragraphs: [
              'Супермаркеты: Angeloni (крупная сеть родом из Санта-Катарины), Giassi и другие региональные сети.',
              'Mercado Público — исторический общественный рынок в центре — свежие продукты, рестораны, бары, локальный колорит.',
              'Крупные покупки — мебель и техника — торговые центры на острове и на материковой части; планируйте маршрут с учётом мостов и пробок.',
            ],
          },
          {
            heading: 'Районы — где жить, а не куда инвестировать',
            paragraphs: [
              'Мы подробно разбирали районы Флорианополиса с инвестиционной точки зрения в отдельном большом отчёте — здесь другой угол: где реально комфортно жить в первые месяцы.',
              'Для семей с детьми часто удобны районы ближе к международным школам (Trindade, где расположена EIF). Для тех, кто работает удалённо и ценит инфраструктуру — Кампече и Лагоа с их растущим сообществом цифровых кочевников. Центр — для тех, кто предпочитает городской ритм без пляжной ориентации.',
            ],
          },
          {
            heading: 'Проверьте сами — бесплатный инструмент',
            paragraphs: [
              'Ideal Regions — персональный отчёт (после короткого теста Brazil Fit Score), который подскажет, какой район Флорианополиса и Санта-Катарины подходит именно вашей ситуации.',
            ],
          },
          {
            heading: 'Что в итоге',
            paragraphs: [
              'Первые месяцы во Флорианополисе проще, если заранее понимать логистику острова (мосты и пробки реальны), выбрать подходящую школьную систему для детей, оформить медицинскую страховку и знать, где закрываются повседневные нужды. Это не сложнее, чем переезд в любой другой новый город — просто со своей местной спецификой. Если юридическая сторона переезда ещё не закрыта — см. наш гид по [ВНЖ Бразилии через недвижимость](/research/report/vnzh-braziliya-nedvizhimost), там разобраны механика визы и сроки.',
              'Материал носит информационный характер и основан на общедоступных источниках и личном опыте жизни во Флорианополисе с 2021 года.',
            ],
          },
        ],
    },
  },

  'cfl-construtora-developer-review-2026': {
    en: {
      sections: [
        {
          heading: 'The Short Version',
          paragraphs: [
            'CFL Construtora is an established luxury developer that has been active in the Florianópolis market since 2006. The company specializes in projects at the state\'s most expensive and prestigious locations — Jurerê Internacional, Campeche, downtown — typically beachfront, with an exclusive view, or a strategic position.',
            'Headline figures: in the Florianópolis market since 2006, R$1.3 billion in sales in 30 days (Oceana), 0% discount off list price per Plan B\'s experience, Plan B Overall Developer Score 7.8/10.',
          ],
        },
        {
          heading: 'Company Overview',
          paragraphs: [
            'CFL entered the Florianópolis market in 2006 with the Acqua project on Beira-Mar Norte. In 2011, the company delivered a landmark project — Square SC on the SC-401 highway, transforming it from a pass-through road into a genuine business and innovation corridor on the island; CFL\'s headquarters sit there today.',
            'Since then, the company has consistently established itself in the luxury segment — not mid-premium, as some general market overviews mistakenly describe it.',
            'Portfolio — prime locations, not mid-tier: in [Jurerê Internacional](/research/report/jurere-internacional-investment-guide) — Al Mare, Quay Luxury Home Design, Jay Luxury Home Design, Vitra. Oceana (architecture by Arquitectonica of Miami and Obra Prima of Uruguay) sold out completely in 30 days, R$1.3 billion in sales over that same period. Terraço Cacupé — 26 exclusive houses on a peninsula (launched 2024). La Mare Campeche has been announced — a 12,000+ m² lot, 109 units up to 385 m², architect Guilherme Torres, in partnership with the Milano group — right in the district we covered in our separate [Campeche](/research/report/campeche-investment-guide) guide.',
            'The company\'s clientele is affluent buyers, including politicians and businesspeople, seeking not just square meters but a specific location and status.',
          ],
        },
        {
          heading: 'Track Record & Quality',
          paragraphs: [
            'CFL has demonstrated consistent delivery reliability across multiple projects.',
            'Plan B Developer Score: Delivery Reliability 8.0/10. Construction Quality 7.5/10. Financial Stability 7.5/10. Customer Satisfaction 7.0/10. Market Reputation 7.5/10. Transparency 7.0/10. Overall 7.8/10. Plan B Expert Assessment — subjective evaluation based on market analysis. Not financial advice. Overall is a calculated average of the six metrics.',
          ],
        },
        {
          heading: 'Strengths',
          paragraphs: [
            'Established presence in prime locations — Jurerê Internacional, Campeche, downtown — since 2006, multiple completed landmark projects. International architecture — Arquitectonica (Miami), Obra Prima (Uruguay), Guilherme Torres — internationally recognized firms. Consistent on-time delivery — multiple projects delivered on schedule, a real advantage in a market where 6–12 month delays are common.',
            'Pricing discipline — per Plan B\'s experience, CFL essentially never discounts off list price, a signal of confidence in the property\'s value, though it also means less room to negotiate for the buyer. Active pipeline — the company is growing, not stagnating, with new announcements like La Mare Campeche.',
          ],
        },
        {
          heading: 'Areas to Consider',
          paragraphs: [
            'Financial stability — an active pipeline indicates healthy cash flow, with no bankruptcy events, but as a regional developer, it\'s more exposed to local downturns. Warranty response time — generally positive feedback on the sales process and post-delivery support, but response times on warranty claims can lag some premium-tier competitors. No room to negotiate — the same pricing discipline noted above as a strength, but for a buyer, it means budgeting for the full list price, with no discount expected.',
          ],
        },
        {
          heading: 'Plan B Verdict — CFL Construtora',
          paragraphs: [
            '✅ RECOMMENDED — for luxury-segment buyers and prime-location investors. CFL Construtora isn\'t a "solid but average" developer, as broader market overviews sometimes describe it — it\'s one of Santa Catarina\'s leading luxury-segment players. An established presence in Jurerê Internacional and Campeche, international architecture, and proven sales velocity (Oceana — R$1.3 billion in 30 days) speak for themselves.',
            'Consistent on-time delivery and clear pricing discipline (the company essentially never concedes on price) make it a reliable but demanding partner — budget for the full list price. Best suited to buyers focused on status, location, and long-term value preservation rather than seeking a discount at purchase.',
            'This material is for informational purposes only and does not constitute investment advice. Assessment based on publicly available information, project visits, market data, and buyer feedback. Plan B Brazil acts as an independent advisor, is not affiliated with CFL Construtora, and is not a developer.',
          ],
        },
      ],
    },
    ru: {
      sections: [
        {
          heading: 'Коротко о главном',
          paragraphs: [
            'CFL Construtora — устоявшийся люксовый застройщик, работающий на рынке Флорианополиса с 2006 года. Компания специализируется на проектах в самых дорогих и престижных локациях штата — Журере Интернасьонал, Кампече, центр города — как правило, на первой линии, с эксклюзивным видом или стратегическим позиционированием.',
            'Ключевые цифры: на рынке Флорианополиса с 2006 года, R$1,3 млрд продаж за 30 дней (Oceana), 0% скидка от заявленной цены по опыту Plan B, Plan B Overall Developer Score 7,8/10.',
          ],
        },
        {
          heading: 'Обзор компании',
          paragraphs: [
            'CFL вышла на рынок Флорианополиса в 2006 году с проектом Acqua на Beira-Mar Norte. В 2011 году компания реализовала знаковый проект — Square SC на трассе SC-401, превративший её из проходной дороги в полноценный бизнес- и инновационный коридор острова; там же сегодня расположен головной офис CFL.',
            'С тех пор компания последовательно закрепилась именно в люксовом сегменте, а не в mid-premium, как иногда ошибочно указывается в общих обзорах рынка.',
            'Портфолио — прайм-локации, не средний сегмент: в [Журере Интернасьонал](/research/report/jurere-internacional-investment-guide) — Al Mare, Quay Luxury Home Design, Jay Luxury Home Design, Vitra. Oceana (архитектура Arquitectonica из Майами и Obra Prima из Уругвая) — полностью распродан за 30 дней, R$1,3 млрд продаж за тот же срок. Terraço Cacupé — 26 эксклюзивных домов на полуострове (запуск 2024). Анонсирован La Mare Campeche — участок 12 000+ м², 109 юнитов до 385 м², архитектор Гильерме Торрес, партнёрство с группой Milano — прямо в районе, который мы уже разбирали в отдельном гиде по [Campeche](/research/report/campeche-investment-guide).',
            'Клиентура компании — состоятельные покупатели, включая политиков и бизнесменов, ищущих не просто квадратные метры, а конкретную локацию и статус.',
          ],
        },
        {
          heading: 'Послужной список и качество',
          paragraphs: [
            'CFL демонстрирует последовательную надёжность поставки на протяжении множества проектов.',
            'Plan B Developer Score: Delivery Reliability 8,0/10. Construction Quality 7,5/10. Financial Stability 7,5/10. Customer Satisfaction 7,0/10. Market Reputation 7,5/10. Transparency 7,0/10. Overall 7,8/10. Экспертная оценка Plan B — субъективная оценка на основе анализа рынка. Не является финансовой консультацией. Overall — расчётное среднее по шести метрикам.',
          ],
        },
        {
          heading: 'Сильные стороны',
          paragraphs: [
            'Устоявшееся присутствие в прайм-локациях — Журере Интернасьонал, Кампече, центр — с 2006 года, множество завершённых знаковых проектов. Международная архитектура — Arquitectonica (Майами), Obra Prima (Уругвай), Гильерме Торрес — признанные на международном уровне бюро. Стабильная поставка в срок — множество проектов сдано вовремя, существенное преимущество на рынке, где задержки в 6-12 месяцев обычны.',
            'Ценовая дисциплина — по опыту Plan B, CFL практически никогда не даёт скидку от заявленной цены, сигнал уверенности в ценности объекта, но и меньше пространства для переговоров покупателю. Активный пайплайн — компания растёт, не стагнирует, новые анонсы вроде La Mare Campeche.',
          ],
        },
        {
          heading: 'На что обратить внимание',
          paragraphs: [
            'Финансовая устойчивость — активный пайплайн говорит о здоровом денежном потоке, банкротств не зафиксировано, но как региональный застройщик компания более подвержена локальным спадам. Скорость реакции по гарантии — в целом позитивные отзывы о процессе продажи и постпродажной поддержке, но скорость ответа по гарантийным случаям иногда медленнее, чем у некоторых конкурентов премиум-сегмента. Отсутствие торга — та же ценовая дисциплина, что сильная сторона выше, но для покупателя означает: рассчитывайте на полную заявленную цену, скидок не будет.',
          ],
        },
        {
          heading: 'Вердикт Plan B — CFL Construtora',
          paragraphs: [
            '✅ РЕКОМЕНДОВАНО — для покупателей люкс-сегмента и инвесторов в прайм-локации. CFL Construtora — не «средний, но надёжный» застройщик, как иногда описывают рынок в целом, а один из ведущих игроков люксового сегмента Санта-Катарины. Устоявшееся присутствие в Журере Интернасьонал и Кампече, международная архитектура и подтверждённая скорость продаж (Oceana — R$1,3 млрд за 30 дней) говорят сами за себя.',
            'Стабильная поставка в срок и очевидная ценовая дисциплина (компания практически не идёт на уступки по цене) делают её надёжным, но требовательным партнёром — рассчитывайте на полную заявленную стоимость. Лучше всего подходит покупателям, ориентированным на статус, локацию и долгосрочное сохранение стоимости, а не на поиск скидки при покупке.',
            'Материал носит информационный характер и не является инвестиционной рекомендацией. Оценка основана на общедоступной информации, посещении объектов, рыночных данных и обратной связи покупателей. Plan B Brazil выступает независимым советником, не аффилирован с CFL Construtora и не является девелопером.',
          ],
        },
      ],
    },
  },

  'modulare-incorporadora-developer-review-2026': {
    en: {
      sections: [
        {
          heading: 'The Short Version',
          paragraphs: [
            'Modulare Empreendimentos is a developer with a 10-year history in Florianópolis, founded in 2015. The company\'s name often causes confusion with prefabricated construction technology — in reality, it refers to flexible, "modular" floor plans within units and a cooperative SPE ("preço de custo") model, not factory-built construction.',
            'Headline figures: founded 2015, 10 years in the Florianópolis market, R$1.5 billion announced across Rancho Queimado projects (whole region), #1 first vertical project in Rancho Queimado\'s history, Plan B Overall Developer Score 6.8/10.',
          ],
        },
        {
          heading: 'Company Overview & Methodological Note',
          paragraphs: [
            'Some source material describes Modulare as an "innovative modular/prefabricated construction" developer. This isn\'t supported by the evidence — per the company\'s own website and independent sources, Modulare\'s actual specialty is flexible modular floor plans (reconfigurable studios, lofts, duplexes) combined with a cooperative SPE "preço de custo" model — the same structure we covered in detail in our separate article on [SPE risks and mechanics](/research/report/spe-struktura-nedvizhimost-braziliya).',
            'Portfolio — specific projects, not generic claims: Maxxi Garden (Cachoeira do Bom Jesus) — a "Home Club" concept near Sapiens Parque, the same innovation-park catalyst we covered in our [Canasvieiras](/research/report/canasvieiras-investment-guide) guide, 80 units, from R$289K, delivery H2 2027. Maxxi View (Jurerê/Canajurê) — ocean view, architect [Robson Nascimento](/research/report/robson-nascimento-architect-jurere) (award-winning, published internationally), 1–4 bedroom units from 25 to 262 m², SPE model, delivery 2027–2028.',
          ],
        },
        {
          heading: 'A Major Catalyst: Maxxi Valley in Rancho Queimado',
          paragraphs: [
            'Modulare was among the first major companies to spot the potential of Rancho Queimado — and is now building the city\'s first-ever vertical residential project, Maxxi Valley Residence.',
            'Precise positioning — not a coincidence: the project sits exactly at the city\'s new entrance point — where a viaduct is being built on the BR-282 highway (km 59, R$19M in federal investment, completing July 2026). The architecture follows a "mountain contemporary" style. CEO Jorge Falcão: "Modulare isn\'t just following the city\'s growth — we\'re here to be part of this new moment for Rancho Queimado." The company released an English-language video specifically targeting international investors — a deliberate global outreach strategy.',
            'Maxxi Valley and the Alpes Catarina ski-resort project (R$1.5 billion), already covered in our separate [Rancho Queimado](/research/report/rancho-queimado-investment-report-2026) guide, are jointly cited as the key signals to watch for whether the region\'s investment cycle plays out.',
          ],
        },
        {
          heading: 'Track Record & Quality',
          paragraphs: [
            'Plan B Developer Score: Delivery 7.0/10. Quality 7.0/10. Stability 6.5/10. Satisfaction 7.0/10. Reputation 6.5/10. Transparency 6.5/10. Overall 6.8/10. Plan B Expert Assessment — subjective evaluation based on market analysis. Not financial advice.',
            'Modulare is a younger company with a developing track record compared to developers operating for 20–30 years. Early projects show promising construction speed and quality, but the company needs a few more years of completed deliveries to build a full statistical picture.',
          ],
        },
        {
          heading: 'Strengths',
          paragraphs: [
            'Flexible, modular floor plans — a concrete mechanism: after buying a unit with a base floor plan, the buyer can select one of 2-3 alternative layouts; the window to change stays open until the architectural project is finalized before construction. SPE "preço de custo" model — a transparent cost-price structure, the same model covered separately in our SPE guide; requires understanding the mechanics, but delivers real cost without an intermediary markup.',
            'Early market vision — among the first major developers to see Rancho Queimado\'s potential, before it became obvious. Notable architecture — Robson Nascimento on Maxxi View, a recognized architect published in international outlets.',
          ],
        },
        {
          heading: 'Areas to Consider',
          paragraphs: [
            'Younger track record — 10 years in the market, less than established players like CFL (since 2006). Fewer completed properties for full statistics. SPE model requires understanding — "preço de custo" isn\'t a fixed price, the final cost depends on the cooperative\'s structure; important to understand the mechanics before buying. Rancho Queimado — an unproven cycle — the first vertical project in a new region for the company is both an opportunity and an uncertainty, the market hasn\'t completed a full cycle yet.',
          ],
        },
        {
          heading: 'Plan B Verdict — Modulare Empreendimentos',
          paragraphs: [
            '⚠ CONSIDER — for innovative floor-plan design, monitor the track record. Modulare is a growing developer with flexible, "modular" floor plans and a transparent SPE "preço de custo" model (not to be confused with prefabricated building construction technology — this is about unit configuration, not factory production). A younger track record means more uncertainty, but also an opportunity for early buyers to secure competitive pricing.',
            'Best suited to investors comfortable working with a newer developer and interested in flexible housing formats. Worth watching the track record over the next 2–3 years as more projects complete — especially Maxxi Valley, the first vertical project in Rancho Queimado: the early-positioning model is promising but not yet tested through a full cycle in this market.',
            'This material is for informational purposes only and does not constitute investment advice. Assessment based on publicly available information, market data, and buyer feedback. Plan B Brazil acts as an independent advisor, is not affiliated with Modulare Empreendimentos, and is not a developer.',
          ],
        },
      ],
    },
    ru: {
      sections: [
        {
          heading: 'Коротко о главном',
          paragraphs: [
            'Modulare Empreendimentos — застройщик с 10-летней историей во Флорианополисе, основанный в 2015 году. Название компании часто вызывает путаницу с технологией сборного строительства — на деле речь о гибких, «модульных» планировках внутри квартир и кооперативной модели SPE («preço de custo»), а не о заводском производстве зданий.',
            'Ключевые цифры: год основания 2015, 10 лет на рынке Флорианополиса, R$1,5 млрд заявлено в проектах Ранчо-Кеймаду (весь регион), #1 первый вертикальный проект в истории Ранчо-Кеймаду, Plan B Overall Developer Score 6,8/10.',
          ],
        },
        {
          heading: 'Обзор компании и методологическая сноска',
          paragraphs: [
            'В исходных материалах по рынку Modulare иногда описывают как «инновационное модульное/сборное строительство». Это не подтверждается — по данным официального сайта компании и независимых источников, реальная специализация Modulare это гибкие модульные планировки (перепланируемые студии, лофты, дуплексы) в сочетании с кооперативной моделью SPE «preço de custo» — той же структурой, которую мы подробно разбирали в отдельной статье про [риски и механику SPE](/research/report/spe-struktura-nedvizhimost-braziliya).',
            'Портфолио — конкретные проекты, не общие формулировки: Maxxi Garden (Cachoeira do Bom Jesus) — концепция «Home Club», рядом с Sapiens Parque — тем же катализатором-инновационным парком, который мы разбирали в гиде по [Canasvieiras](/research/report/canasvieiras-investment-guide), 80 юнитов, от R$289 тыс., сдача 2-е полугодие 2027. Maxxi View (Jurerê/Canajurê) — вид на океан, архитектор [Робсон Насименто](/research/report/robson-nascimento-architect-jurere) (отмеченный наградами, публикуется в международных изданиях), юниты 1-4 спальни от 25 до 262 м², SPE-модель, сдача 2027-2028.',
          ],
        },
        {
          heading: 'Крупный катализатор: Maxxi Valley в Ранчо-Кеймаду',
          paragraphs: [
            'Modulare одной из первых крупных компаний обратила внимание на потенциал Ранчо-Кеймаду — и теперь строит там первый в истории города вертикальный жилой проект, Maxxi Valley Residence.',
            'Точное позиционирование — не случайность: проект расположен именно на новом въезде в город — там, где строится виадук на трассе BR-282 (км 59, R$19 млн федеральных инвестиций, сдача июль 2026). Архитектура в стиле «mountain contemporary». CEO компании Жоржи Фалкан: «Modulare приходит не просто вслед за ростом города, а чтобы стать частью этого нового момента для Ранчо-Кеймаду». Компания выпустила англоязычное видео специально для международных инвесторов — сознательная стратегия выхода на глобальную аудиторию.',
            'Maxxi Valley и уже описанный нами в отдельном гиде по [Ранчо-Кеймаду](/research/report/rancho-queimado-investment-report-2026) проект Alpes Catarina (горнолыжный курорт, R$1,5 млрд) вместе называются ключевыми сигналами того, состоится ли инвестиционный цикл в регионе.',
          ],
        },
        {
          heading: 'Послужной список и качество',
          paragraphs: [
            'Plan B Developer Score: Delivery 7,0/10. Quality 7,0/10. Stability 6,5/10. Satisfaction 7,0/10. Reputation 6,5/10. Transparency 6,5/10. Overall 6,8/10. Экспертная оценка Plan B — субъективная оценка на основе анализа рынка. Не является финансовой консультацией.',
            'Modulare — более молодая компания с формирующимся послужным списком по сравнению с застройщиками, работающими 20-30 лет. Ранние проекты показывают хорошие результаты по скорости строительства и качеству, но компании потребуется ещё несколько лет завершённых поставок, чтобы сформировать полноценную историю.',
          ],
        },
        {
          heading: 'Сильные стороны',
          paragraphs: [
            'Гибкие, модульные планировки — конкретный механизм: купив юнит с базовой планировкой, покупатель может выбрать одну из 2-3 альтернативных планировок — окно для изменения открыто, пока архитектурный проект не утверждён окончательно перед стройкой. Модель SPE «preço de custo» — прозрачная структура цены по себестоимости, та же модель, что мы разбирали отдельно; требует понимания механики, но даёт реальную стоимость без наценки посредника.',
            'Раннее рыночное видение — одни из первых крупных застройщиков, разглядевших потенциал Ранчо-Кеймаду до того, как это стало очевидным. Именитая архитектура — Робсон Насименто на Maxxi View, признанный, публикуемый в международных изданиях архитектор.',
          ],
        },
        {
          heading: 'На что обратить внимание',
          paragraphs: [
            'Более молодой послужной список — 10 лет на рынке, меньше, чем у устоявшихся игроков вроде CFL (с 2006). Меньше завершённых объектов для полной статистики. Модель SPE требует понимания — «preço de custo» не фиксированная цена, итоговая стоимость зависит от структуры кооператива; важно разобраться в механике перед покупкой. Ранчо-Кеймаду — неподтверждённый цикл — первый вертикальный проект в новом для компании регионе, одновременно возможность и неопределённость: рынок ещё не прошёл полный цикл.',
          ],
        },
        {
          heading: 'Вердикт Plan B — Modulare Empreendimentos',
          paragraphs: [
            '⚠ CONSIDER — для инновационного подхода к планировкам, следите за послужным списком. Modulare — растущий застройщик с гибкими, «модульными» планировками и прозрачной SPE-моделью «preço de custo» (не путать с технологией сборного строительства зданий — это про конфигурацию квартир, не про заводское производство). Более молодой послужной список означает больше неопределённости, но и возможность для ранних покупателей получить конкурентную цену.',
            'Лучше всего подходит инвесторам, готовым работать с более новым застройщиком и заинтересованным в гибких форматах жилья. Стоит наблюдать за послужным списком в течение следующих 2-3 лет по мере завершения проектов — особенно за Maxxi Valley, первым вертикальным проектом в Ранчо-Кеймаду: модель раннего позиционирования многообещающая, но ещё не проверена полным циклом на этом рынке.',
            'Материал носит информационный характер и не является инвестиционной рекомендацией. Оценка основана на общедоступной информации, рыночных данных и обратной связи покупателей. Plan B Brazil выступает независимым советником, не аффилирован с Modulare Empreendimentos и не является девелопером.',
          ],
        },
      ],
    },
  },

  'hantei-incorporadora-developer-review-2026': {
    en: {
      sections: [
        {
          heading: 'The Short Version',
          paragraphs: [
            'Hantei Incorporadora is one of Florianópolis\'s oldest luxury developers, in the market since 1997. By the company\'s own account, it has specialized in the city\'s luxury segment for over two decades — not a "growing mid-segment" player, as general market overviews sometimes describe it.',
            'Headline figures: founding year 1997, 29 years in the market, 4,000+ units delivered, Plan B Overall Developer Score 7.5/10.',
          ],
        },
        {
          heading: 'Company Overview',
          paragraphs: [
            'Hantei was founded in January 1997 by Nelson João de Moraes Filho, who remains the company\'s administrator to this day. Headquartered in the Ratones district of Florianópolis, with a registered share capital of R$10 million. The company has built over 370,000–570,000 m² (sources vary slightly) and delivered more than 4,000 units.',
            'A direct quote from the company\'s own website: "For over two decades we at Hantei have been operating in the high-end market, specializing in the luxury segment in Florianópolis. We relentlessly pursue perfection, delivering developments that combine modern design, impeccable quality, and a unique architectural vision."',
            'Portfolio — specific projects: Felipe Moraes Residence Club (João Paulo) — 78 luxury units, 130–164 m², sea and sunset views, named after the founder\'s son. Águas do Santinho (Praia dos Ingleses) — integrated with a preserved natural landscape, in a district we\'ve covered in our separate [Ingleses](/research/report/ingleses-investment-guide) guide. Azzure Home Club (Praia Brava) — beachfront units up to 4 bedrooms, 326 m². BOSC Ecovillage (Saco Grande) — compact, nature-integrated units. Hantei Office Building — commercial real estate downtown.',
          ],
        },
        {
          heading: 'Track Record & Quality',
          paragraphs: [
            'Hantei demonstrates consistent delivery reliability — notable for a developer with nearly three decades of history, spanning several of Brazil\'s economic cycles, including the 2015–2016 recession.',
            'Plan B Developer Score: Delivery 7.5/10. Quality 8.0/10. Stability 7.0/10. Satisfaction 8.0/10. Reputation 7.5/10. Transparency 7.0/10. Overall 7.5/10. Plan B Expert Assessment — subjective evaluation based on market analysis. Not financial advice.',
          ],
        },
        {
          heading: 'Strengths',
          paragraphs: [
            'Nearly three decades in the market — since 1997, having weathered several of Brazil\'s economic cycles, including the 2015–2016 recession, a rare level of proven resilience. Genuine luxury segment — not just "quality finishes," the company\'s own direct positioning as a Florianópolis luxury specialist, in the same tier as the branded luxury developments we cover in our [Jurerê Internacional](/research/report/jurere-internacional-investment-guide) guide.',
            'Diversified portfolio — from beachfront residential (Azzure, Águas do Santinho) to eco-integrated projects (BOSC) and commercial real estate (Hantei Office Building). Thoughtful design — modern facades, quality materials, layouts that maximize natural light and views.',
          ],
        },
        {
          heading: 'Areas to Consider',
          paragraphs: [
            'Family-led governance structure — the company is still administered by the founder and a related family entity, typical for the regional market, but worth factoring into due diligence. Less internationally branded — unlike some competitors who bring in architects at the Arquitectonica (Miami) tier, Hantei relies predominantly on local architectural expertise. Some discrepancy in built-area data — sources vary on the exact built-area figure (370K vs. 570K m²), we recommend confirming current data directly when evaluating a specific project.',
          ],
        },
        {
          heading: 'Plan B Verdict — Hantei Incorporadora',
          paragraphs: [
            '✅ RECOMMENDED — for buyers who value architecture, quality, and a proven history. Hantei isn\'t a "growing mid-segment developer," as general market overviews sometimes describe it — it\'s one of Florianópolis\'s oldest luxury-segment players, with nearly three decades of history and a portfolio of thousands of delivered units. Modern architecture, thoughtful layouts, and attention to detail are a durable part of the company\'s identity, not a recent pivot.',
            'Best suited to buyers who value architecture and finish quality combined with a time-tested track record — a rare combination even among established developers. A diversified portfolio (residential, commercial, eco-integrated) offers flexibility for different investment goals.',
            'This material is for informational purposes only and does not constitute investment advice. Assessment based on publicly available information, market data, and buyer feedback. Plan B Brazil acts as an independent advisor, is not affiliated with Hantei Incorporadora, and is not a developer.',
          ],
        },
      ],
    },
    ru: {
      sections: [
        {
          heading: 'Коротко о главном',
          paragraphs: [
            'Hantei Incorporadora — один из старейших люксовых застройщиков Флорианополиса, на рынке с 1997 года. По собственному заявлению компании, более двух десятилетий она специализируется именно на люксовом сегменте города, а не на «растущем среднем сегменте», как иногда описывают её в общих обзорах рынка.',
            'Ключевые цифры: год основания 1997, 29 лет на рынке, 4000+ сданных юнитов, Plan B Overall Developer Score 7,5/10.',
          ],
        },
        {
          heading: 'Обзор компании',
          paragraphs: [
            'Hantei основана в январе 1997 года Нелсоном Жоаном ди Мораес Фильо, который остаётся администратором компании по сей день. Штаб-квартира — в районе Ratones, Флорианополис, зарегистрированный уставной капитал — R$10 млн. Компания построила более 370-570 тыс. м² (данные разных источников незначительно расходятся) и сдала свыше 4000 юнитов.',
            'Прямая цитата с официального сайта компании: «Более двух десятилетий мы в Hantei работаем в высоком сегменте рынка, специализируясь именно на люксовом сегменте Флорианополиса. Мы неустанно стремимся к совершенству, создавая проекты, сочетающие современный дизайн, безупрекорное качество и уникальное архитектурное видение».',
            'Портфолио — конкретные проекты: Felipe Moraes Residence Club (João Paulo) — 78 люксовых юнитов, 130-164 м², вид на море и закат, назван в честь сына основателя. Águas do Santinho (Praia dos Ingleses) — интеграция с сохранённым природным ландшафтом, в районе, который мы уже разбирали в отдельном гиде по [Ingleses](/research/report/ingleses-investment-guide). Azzure Home Club (Praia Brava) — прибрежные юниты до 4 спалень, 326 м². BOSC Ecovillage (Saco Grande) — компактные эко-интегрированные юниты. Hantei Office Building — коммерческая недвижимость в центре города.',
          ],
        },
        {
          heading: 'Послужной список и качество',
          paragraphs: [
            'Hantei демонстрирует устойчивую надёжность поставки — редкость среди застройщиков с почти тридцатилетней историей, охватывающей несколько экономических циклов Бразилии, включая рецессию 2015-2016 годов.',
            'Plan B Developer Score: Delivery 7,5/10. Quality 8,0/10. Stability 7,0/10. Satisfaction 8,0/10. Reputation 7,5/10. Transparency 7,0/10. Overall 7,5/10. Экспертная оценка Plan B — субъективная оценка на основе анализа рынка. Не является финансовой консультацией.',
          ],
        },
        {
          heading: 'Сильные стороны',
          paragraphs: [
            'Почти три десятилетия на рынке — с 1997 года, пережила несколько экономических циклов Бразилии, включая рецессию 2015-2016 — редкий уровень проверенной устойчивости. Подлинный люксовый сегмент — не просто «качественная отделка», а прямое позиционирование компании как специалиста по люксу Флорианополиса, в том же классе, что и брендовые люксовые проекты, которые мы разбираем в гиде по [Журере Интернасьонал](/research/report/jurere-internacional-investment-guide).',
            'Диверсифицированный портфель — от прибрежного жилья (Azzure, Águas do Santinho) до эко-интегрированных проектов (BOSC) и коммерческой недвижимости (Hantei Office Building). Продуманный дизайн — современные фасады, качественные материалы, планировки, максимизирующие естественный свет и виды.',
          ],
        },
        {
          heading: 'На что обратить внимание',
          paragraphs: [
            'Семейная структура управления — компания по-прежнему администрируется основателем и связанной семейной структурой — типично для регионального рынка, но стоит учитывать при due diligence. Менее международный бренд — в отличие от некоторых конкурентов, привлекающих архитекторов уровня Arquitectonica (Майами), Hantei опирается в основном на локальную архитектурную экспертизу. Расхождение в данных по площади — источники расходятся в точной цифре построенной площади (370 против 570 тыс. м²), рекомендуем уточнять актуальные данные напрямую при рассмотрении конкретного проекта.',
          ],
        },
        {
          heading: 'Вердикт Plan B — Hantei Incorporadora',
          paragraphs: [
            '✅ РЕКОМЕНДОВАНО — для покупателей, ценящих архитектуру, качество и проверенную историю. Hantei — не «растущий застройщик среднего сегмента», как иногда описывает рынок в целом, а один из старейших люксовых игроков Флорианополиса, с почти тридцатилетней историей и портфелем в тысячи сданных юнитов. Современная архитектура, продуманные планировки и внимание к деталям — устойчивая часть идентичности компании, а не новое направление.',
            'Лучше всего подходит покупателям, которые ценят архитектуру и качество отделки в сочетании с проверенным временем послужным списком — редкая комбинация даже среди устоявшихся застройщиков. Диверсифицированный портфель (жилой, коммерческий, эко-интегрированный) даёт гибкость выбора под разные инвестиционные цели.',
            'Материал носит информационный характер и не является инвестиционной рекомендацией. Оценка основана на общедоступной информации, рыночных данных и обратной связи покупателей. Plan B Brazil выступает независимым советником, не аффилирован с Hantei Incorporadora и не является девелопером.',
          ],
        },
      ],
    },
  },

  'cba-incorporadora-developer-review-2026': {
    en: {
      sections: [
        {
          heading: 'The Short Version',
          paragraphs: [
            'CBA Incorporadora (Grupo CBA) isn\'t a "mid-range regional developer," as general market overviews sometimes describe it — it\'s a fast-growing luxury holding company with capital built in agribusiness and a project portfolio worth billions of reais, including properties in [Jurerê Internacional](/research/report/jurere-internacional-investment-guide).',
            'Headline figures: founding year 2015, land bank R$4.5 billion+ (~30 plots in SC), project portfolio (VGV) R$3.5 billion+, Plan B Overall Developer Score 7.7/10.',
          ],
        },
        {
          heading: 'Company Overview',
          paragraphs: [
            'Grupo CBA was founded in 2015 in Cachoeira do Sul (Rio Grande do Sul) — capital was originally built in agribusiness before the company diversified into real estate. Headquarters have moved to Florianópolis, specifically Jurerê. The group\'s president is Cíntia Pereira — a family business led by a woman, a notable detail in a market where this is rare.',
            'Financial strength from another sector — a real competitive advantage: unlike many developers overly dependent on bank leverage, Grupo CBA relies on its own liquidity, accumulated in agriculture. The land bank comprises roughly 30 owned plots in Santa Catarina, valued at over R$4.5 billion. The current project portfolio exceeds R$3.5 billion in total sales value (VGV).',
            'The company operates under two brands: CBA Empreendimentos (luxury segment) and Viva Corp (elevated first-home standard). Over 400 employees, 16 simultaneous construction sites (12 in Santa Catarina — Florianópolis, São José, Biguaçu, Itajaí).',
            'Portfolio & partnerships: specific projects — Meraki Sunset (João Paulo), Physis Place (Centro), Porto Madero and Meraki Allure, both in Jurerê Internacional. Strategic partnerships with ATrinca (Flávio Augusto, Joel Jota, Caio Carneiro) and wealth management firm Charlie — property is positioned as a high-performance financial asset, not just housing.',
          ],
        },
        {
          heading: 'Track Record & Quality',
          paragraphs: [
            'CBA demonstrates consistent delivery reliability across completed projects. No public data on significant delays or quality issues was found.',
            'Plan B Developer Score: Delivery 8.0/10. Quality 7.5/10. Stability 8.0/10. Satisfaction 7.5/10. Reputation 8.0/10. Transparency 7.0/10. Overall 7.7/10. Plan B Expert Assessment — subjective evaluation based on market analysis. Not financial advice.',
          ],
        },
        {
          heading: 'Strengths',
          paragraphs: [
            'Financial stability from agribusiness — own liquidity instead of excessive reliance on bank leverage, a rare structural advantage among developers. Genuine luxury segment — projects in Jurerê Internacional, not "affordable middle-class housing."',
            'Notable strategic partnerships — ATrinca and Charlie position CBA properties as a financial instrument, not just a place to live. Operational scale — 400+ employees, 16 simultaneous construction sites, a rare level for a decade-old company.',
          ],
        },
        {
          heading: 'Areas to Consider',
          paragraphs: [
            'Relatively new specifically in Santa Catarina — the core historical track record is tied to RS; fewer completed properties in SC so far, though the pipeline is actively growing. Two-brand structure — CBA Empreendimentos (luxury) and Viva Corp (elevated standard), confirm which brand a specific property falls under. Financial positioning of property — partnerships with wealth managers are a plus for investors, but require understanding that a purchase here may be framed as part of a broader investment strategy, not just housing.',
          ],
        },
        {
          heading: 'Plan B Verdict — CBA Incorporadora',
          paragraphs: [
            '✅ RECOMMENDED — for investors seeking luxury backed by an unusual financial base. CBA Incorporadora isn\'t a mid-range regional developer — it\'s a fast-growing luxury holding company whose financial stability is built on agribusiness capital, a rare and strong structural feature. Projects in Jurerê Internacional and partnerships with notable investors confirm genuine luxury positioning.',
            'Best suited to investors who value a developer\'s financial stability as much as the property itself — CBA\'s own liquidity reduces the typical delay risks tied to bank financing. Worth confirming which brand (CBA Empreendimentos or Viva Corp) a specific project falls under.',
            'This material is for informational purposes only and does not constitute investment advice. Assessment based on publicly available information, market data, and buyer feedback. Plan B Brazil acts as an independent advisor, is not affiliated with CBA Incorporadora, and is not a developer.',
          ],
        },
      ],
    },
    ru: {
      sections: [
        {
          heading: 'Коротко о главном',
          paragraphs: [
            'CBA Incorporadora (Grupo CBA) — не «региональный застройщик среднего сегмента», как иногда описывают рынок в целом, а быстрорастущий люксовый холдинг с капиталом, построенным в агробизнесе, и портфелем проектов на миллиарды реалов, включая объекты в [Журере Интернасьонал](/research/report/jurere-internacional-investment-guide).',
            'Ключевые цифры: год основания 2015, земельный банк R$4,5 млрд+ (~30 участков в СК), портфель проектов (VGV) R$3,5 млрд+, Plan B Overall Developer Score 7,7/10.',
          ],
        },
        {
          heading: 'Обзор компании',
          paragraphs: [
            'Группа CBA основана в 2015 году в Cachoeira do Sul (Риу-Гранди-ду-Сул) — капитал изначально построен в агробизнесе, прежде чем компания диверсифицировалась в недвижимость. Штаб-квартира перенесена в Флорианополис, конкретно в Журере. Президент группы — Синтия Перейра, семейный бизнес с женщиной во главе — заметная деталь на рынке, где это редкость.',
            'Финансовая сила из другого сектора — реальное конкурентное преимущество: в отличие от многих застройщиков, чрезмерно зависящих от банковского плеча, Grupo CBA опирается на собственную ликвидность, накопленную в сельском хозяйстве. Земельный банк — около 30 собственных участков в Санта-Катарине, оценённых свыше R$4,5 млрд. Портфель текущих проектов превышает R$3,5 млрд в общем объёме продаж (VGV).',
            'Компания работает через два бренда: CBA Empreendimentos (люксовый сегмент) и Viva Corp (первое жильё повышенного стандарта). Более 400 сотрудников, 16 строек одновременно (12 в Санта-Катарине — Флорианополис, Сан-Жозе, Бигуасу, Итажаи).',
            'Портфолио и партнёрства: конкретные проекты — Meraki Sunset (João Paulo), Physis Place (центр), Porto Madero и Meraki Allure — оба в Журере Интернасьонал. Стратегические партнёрства с ATrinca (Флавио Аугусто, Жоэл Жота, Кайо Карнейро) и компанией по управлению капиталом Charlie — недвижимость позиционируется как высокодоходный финансовый актив, не просто жильё.',
          ],
        },
        {
          heading: 'Послужной список и качество',
          paragraphs: [
            'CBA демонстрирует последовательную надёжность поставки по завершённым проектам. Публичных данных о значительных задержках или проблемах с качеством не найдено.',
            'Plan B Developer Score: Delivery 8,0/10. Quality 7,5/10. Stability 8,0/10. Satisfaction 7,5/10. Reputation 8,0/10. Transparency 7,0/10. Overall 7,7/10. Экспертная оценка Plan B — субъективная оценка на основе анализа рынка. Не является финансовой консультацией.',
          ],
        },
        {
          heading: 'Сильные стороны',
          paragraphs: [
            'Финансовая устойчивость из агробизнеса — собственная ликвидность вместо чрезмерной зависимости от банковского плеча — редкое структурное преимущество среди застройщиков. Реальный люксовый сегмент — проекты в Журере Интернасьонал, не «доступное жильё среднего класса».',
            'Заметные стратегические партнёрства — ATrinca и Charlie позиционируют недвижимость CBA как финансовый инструмент, не только жильё. Масштаб операций — 400+ сотрудников, 16 одновременных строек — редкий уровень для компании десятилетнего возраста.',
          ],
        },
        {
          heading: 'На что обратить внимание',
          paragraphs: [
            'Относительно новая именно в Санта-Катарине — основной послужной список исторически связан с RS; в СК пока меньше завершённых объектов, хотя пайплайн активно растёт. Структура двух брендов — CBA Empreendimentos (люкс) и Viva Corp (повышенный стандарт), уточняйте, под каким именно брендом идёт конкретный объект. Финансовое позиционирование недвижимости — партнёрства с wealth-менеджерами — плюс для инвесторов, но требует понимания, что покупка здесь может рассматриваться как часть более широкой инвестиционной стратегии, не только жильё.',
          ],
        },
        {
          heading: 'Вердикт Plan B — CBA Incorporadora',
          paragraphs: [
            '✅ РЕКОМЕНДОВАНО — для инвесторов, ищущих люкс с необычной финансовой базой. CBA Incorporadora — не региональный застройщик среднего сегмента, а быстрорастущий люксовый холдинг, чья финансовая устойчивость построена на капитале из агробизнеса — редкая и сильная структурная особенность. Проекты в Журере Интернасьонал и партнёрства с известными инвесторами подтверждают реальное люксовое позиционирование.',
            'Лучше всего подходит инвесторам, которые ценят финансовую устойчивость застройщика не меньше, чем сам объект — собственная ликвидность CBA снижает типичные риски задержек, связанные с банковским финансированием. Стоит уточнять, под каким брендом (CBA Empreendimentos или Viva Corp) идёт конкретный проект.',
            'Материал носит информационный характер и не является инвестиционной рекомендацией. Оценка основана на общедоступной информации, рыночных данных и обратной связи покупателей. Plan B Brazil выступает независимым советником, не аффилирован с CBA Incorporadora и не является девелопером.',
          ],
        },
      ],
    },
  },

  'oad-construtora-developer-review-2026': {
    en: {
      sections: [
        {
          heading: 'The Short Version',
          paragraphs: [
            'Grupo OAD Incorporações is a Florianópolis-based developer focused on mid-to-high-end residential projects in the south of the island — primarily Campeche, Novo Campeche, and Porto da Lagoa. Founded in 2021, it has already delivered over 800 units and became the first Santa Catarina developer with "Lixo Zero" (Zero Waste) certification.',
            'Headline figures: founding year 2021, 800+ units delivered, 90% of site waste recycled, Plan B Overall Developer Score 8.0/10.',
          ],
        },
        {
          heading: 'Company Overview',
          paragraphs: [
            'OAD is the first developer in Santa Catarina with "Compromisso Lixo Zero" certification: at least 90% of construction site waste is sent for recycling. The company\'s flagship project, Makai Beachfront, is Brazil\'s largest construction site with this certification.',
            'A real prefabrication partnership — not just a name: OAD uses a hybrid construction model with off-site prefabrication, in partnership with Cassol Pré-Fabricados — the largest prefabricated concrete complex in Latin America (66+ years of history, 22,000 m³ of concrete monthly). In October 2024, the two companies jointly hosted a sustainable-construction conference where Makai Beachfront was presented as the case study. This model typically cuts construction time by 20–30% compared to traditional methods.',
            'World-class portfolio & partnerships: Makai Beachfront (Novo Campeche) — R$1 billion VGV, 406 apartments (49 penthouses + 357 units), 63,000+ m², 5 blocks. Landscape design by the Burle Marx studio (founded by the legendary Roberto Burle Marx in 1955, creator of Copacabana\'s iconic wave-pattern sidewalk). Architecture by AO + Di Leone Arquitetura. In December 2025, the company partnered with Rio Bravo Investimentos, one of Brazil\'s leading independent financial firms.',
            'The company also contributes to urban legacy: it donated land for a public square and funded drainage improvements on Av. Campeche as part of the Makai Beachfront project — a direct improvement to the exact single-access-road traffic issue we flagged in our separate [Campeche](/research/report/campeche-investment-guide) guide.',
            'Project portfolio: Makai Beachfront (Novo Campeche) — beachfront luxury, eco-certified. Natura (Porto da Lagoa) — first Lixo Zero site in SC. Campeche Hills (Campeche Hillside) — mid-standard. Las Lunas Los Mares (South Island) — mid-standard. Mobby (South Island) — mid-standard.',
          ],
        },
        {
          heading: 'Track Record & Quality',
          paragraphs: [
            'OAD has delivered 800+ residential units since its 2021 founding — a strong execution indicator for a relatively young company. No public data on delays or customer complaints was found, but the company is young — a long-term track record is still being established.',
            'Plan B Developer Score: Delivery 8.5/10. Quality 8.0/10. Stability 7.5/10. Satisfaction 8.0/10. Reputation 8.0/10. Transparency 7.5/10. Overall 8.0/10. Plan B Expert Assessment — subjective evaluation based on market analysis. Not financial advice.',
          ],
        },
        {
          heading: 'Strengths',
          paragraphs: [
            'Genuine sustainability leadership — SC\'s first Lixo Zero certification, backed by a verified partnership with industrial giant Cassol. Prestigious partnerships — landscape by the Burle Marx studio, financial partnership with Rio Bravo Investimentos.',
            'Fast execution — 800+ units in 5 years, a strong pace for a young company, supported by hybrid prefab technology. Contribution to city infrastructure — land donated for a public square, funding for Av. Campeche drainage, a real local infrastructure improvement, not just marketing.',
          ],
        },
        {
          heading: 'Areas to Consider',
          paragraphs: [
            'Young company — founded in 2021, a long-term track record spanning full economic cycles is still being built. South-island concentration — focus on Campeche/Novo Campeche/Porto da Lagoa, less geographic diversification than island-wide developers. Makai — the best quality indicator — the flagship project is still under construction, real execution quality will be clearer once delivered.',
          ],
        },
        {
          heading: 'Plan B Verdict — Grupo OAD Incorporações',
          paragraphs: [
            '✅ RECOMMENDED — for eco-conscious buyers and south-island focus. OAD Construtora is a reliable mid-to-high-end developer with genuine sustainable-construction leadership and a growing reputation in southern Florianópolis. The "Lixo Zero" certification and hybrid prefab model aren\'t marketing — they\'re real differentiators, backed by a partnership with industrial giant Cassol.',
            'With 800+ units delivered since 2021, the company has already demonstrated execution capability. Best suited to buyers who value environmental responsibility, modern construction methods, and south-island growth potential. The company is relatively young — worth monitoring delivery quality over the next 2–3 years as more projects complete. Makai Beachfront in Novo Campeche is OAD\'s flagship and best quality indicator.',
            'This material is for informational purposes only and does not constitute investment advice. Assessment based on publicly available information, market data, and buyer feedback. Plan B Brazil acts as an independent advisor, is not affiliated with Grupo OAD Incorporações, and is not a developer.',
          ],
        },
      ],
    },
    ru: {
      sections: [
        {
          heading: 'Коротко о главном',
          paragraphs: [
            'Grupo OAD Incorporações — застройщик из Флорианополиса, специализирующийся на mid-to-high-end жилых проектах на юге острова, в первую очередь в Campeche, Novo Campeche и Porto da Lagoa. Основан в 2021 году, но уже сдал более 800 юнитов и стал первым застройщиком Санта-Катарины с сертификатом «Lixo Zero» (Ноль отходов).',
            'Ключевые цифры: год основания 2021, 800+ сданных юнитов, 90% отходов стройтельства идёт на переработку, Plan B Overall Developer Score 8,0/10.',
          ],
        },
        {
          heading: 'Обзор компании',
          paragraphs: [
            'OAD — первый застройщик в Санта-Катарине с сертификацией «Compromisso Lixo Zero»: минимум 90% отходов со стройтельных площадок отправляется на переработку. Флагшанский проект компании, Makai Beachfront, — крупнейшая стройтельная площадка Бразилии с этим сертификатом.',
            'Реальное партнёрство в сборном строительстве — не просто название: OAD использует гибридную модель строительства с внезаводской сборкой конструкций, в партнёрстве с Cassol Pré-Fabricados — крупнейшим комплексом сборного железобетона в Латинской Америке (66+ лет истории, 22 000 м³ бетона в месяц). В октябре 2024 компании совместно провели конференцию по устойчивому строительству, где именно Makai Beachfront был представлен как кейс. Данная модель обычно сокращает сроки строительства на 20-30% по сравнению с традиционными методами.',
            'Портфолио и партнёрства мирового уровня: Makai Beachfront (Novo Campeche) — VGV R$1 млрд, 406 квартир (49 пентхаусов + 357 юнитов), 63 000+ м², 5 корпусов. Ландшафтный дизайн — студия Burle Marx (основана легендарным Роберто Бурле Марксом в 1955, автором знаменитого волнистого паттерна тротуара Копакабаны). Архитектура — AO + Di Leone Arquitetura. В декабре 2025 компания заключила партнёрство с Rio Bravo Investimentos, одной из ведущих независимых финансовых компаний Бразилии.',
            'Компания также вносит вклад в городское наследие: пожертвовала землю под общественную площадь и профинансировала улучшение дренажа на Av. Campeche как часть проекта Makai Beachfront — прямое улучшение той самой транспортной проблемы единственной дороги доступа, которую мы отметили в отдельном гиде по [Campeche](/research/report/campeche-investment-guide).',
            'Портфолио проектов: Makai Beachfront (Novo Campeche) — пляжный люкс, эко-сертификат. Natura (Porto da Lagoa) — первая площадка Lixo Zero в СК. Campeche Hills (Campeche Hillside) — средний стандарт. Las Lunas Los Mares (ёг острова) — средний стандарт. Mobby (ёг острова) — средний стандарт.',
          ],
        },
        {
          heading: 'Послужной список и качество',
          paragraphs: [
            'OAD сдал 800+ жилых юнитов с момента основания в 2021 году — сильный показатель исполнения для относительно молодой компании. Публичных данных о задержках или жалобах клиентов не найдено, но компания молодая — долгосрочный послужной список ещё формируется.',
            'Plan B Developer Score: Delivery 8,5/10. Quality 8,0/10. Stability 7,5/10. Satisfaction 8,0/10. Reputation 8,0/10. Transparency 7,5/10. Overall 8,0/10. Экспертная оценка Plan B — субъективная оценка на основе анализа рынка. Не является финансовой консультацией.',
          ],
        },
        {
          heading: 'Сильные стороны',
          paragraphs: [
            'Подлинное лидерство в устойчивости — первый в СК сертификат Lixo Zero, подтверждённое партнёрство с промышленным гигантом Cassol. Престижные партнёрства — ландшафт от студии Burle Marx, финансовое партнёрство с Rio Bravo Investimentos.',
            'Быстрое исполнение — 800+ юнитов за 5 лет, сильный темп для молодой компании, поддержанный гибридной сборной технологией. Вклад в городскую инфраструктуру — донорство земли под площадь, финансирование дренажа на Av. Campeche — реальное улучшение локальной инфраструктуры, не только маркетинг.',
          ],
        },
        {
          heading: 'На что обратить внимание',
          paragraphs: [
            'Молодая компания — основана в 2021, долгосрочный послужной список на полных экономических циклах ещё формируется. Концентрация на юге острова — фокус на Campeche/Novo Campeche/Porto da Lagoa, меньше географической диверсификации, чем у застройщиков, работающих по всему острову. Makai — лучший индикатор качества — флагманский проект пока в стройке, реальное качество исполнения будет виднее после сдачи.',
          ],
        },
        {
          heading: 'Вердикт Plan B — Grupo OAD Incorporações',
          paragraphs: [
            '✅ РЕКОМЕНДОВАНО — для эко-ориентированных покупателей и юга острова. OAD Construtora — надёжный застройщик mid-to-high-end сегмента с подлинным лидерством в устойчивом строительстве и растущей репутацией на юге Флорианополиса. Сертификат «Lixo Zero» и гибридная сборная модель — не маркетинг, а реально дифференцирующие компанию факторы, подтверждённые партнёрством с промышленным гигантом Cassol.',
            'При 800+ сданных юнитах с 2021 года компания уже продемонстрировала способность исполнять обязательства. Лучше всего подходит покупателям, ценящим экологическую ответственность, современные методы строительства и потенциал роста юга острова. Компания относительно молода — стоит следить за качеством поставки в следующие 2-3 года по мере завершения новых проектов. Makai Beachfront в Novo Campeche — флагман и лучший индикатор качества компании.',
            'Материал носит информационный характер и не является инвестиционной рекомендацией. Оценка основана на общедоступной информации, рыночных данных и обратной связи покупателей. Plan B Brazil выступает независимым советником, не аффилирован с Grupo OAD Incorporações и не является девелопером.',
          ],
        },
      ],
    },
  },
  'starting-a-business-in-brazil-2026': {
    en: {
      sections: [
        {
          heading: 'Numbers That Bring You Back to Reality',
          paragraphs: [
            'Brazil is open to foreign investment — that\'s true. But there\'s a huge gap between "possible" and "easy," and the numbers make that case more forcefully than words ever could.',
            'On the World Bank\'s Ease of Doing Business index, Brazil ranks 126th out of 183 countries overall, and specifically in the "starting a business" category — 120th.',
            'Opening a standard company in Brazil takes 13 steps. For a foreigner, it\'s already 22 steps, and the process can take up to 180 days. For comparison: in the US, a foreigner opens a business in at most 10 days, and a local resident in 6. This isn\'t a subjective sense of "Brazilian bureaucracy" — it\'s a measurable, documented gap specifically for those who aren\'t citizens of the country.',
          ],
        },
        {
          heading: 'Formal Requirements You Can\'t Skip',
          paragraphs: [
            'A foreigner can be the sole owner of a company through the Sociedade Limitada Unipessoal (SLU) structure — good news. But beyond that, mandatory steps requiring local presence begin: CPF (Brazil\'s individual tax ID — without it you can\'t open an account or sign a single document); Central Bank Registration via the RDE-IED system (Registro Declaratório Eletrônico – Investimento Estrangeiro Direto); and a mandatory Local Representative (procurador) — a Brazilian resident authorized to receive legal citations on your behalf. Without one, a non-resident physically cannot be part of a Brazilian company.',
            'If you\'re planning an investor visa — minimum investment of R$150K, plus a formal investment plan demonstrating the social value of the investment (typically job creation). This is a separate, lower-threshold path from residency through real estate (from R$1M in Santa Catarina) — see our detailed breakdown of [Brazil residency through real estate](/research/report/vnzh-braziliya-nedvizhimost) for how that path compares on cost, timeline, and requirements.',
          ],
        },
        {
          heading: 'Why Hiring an Accountant Alone Won\'t Solve This',
          paragraphs: [
            'One consultant specializing in foreign capital localization in Brazil puts it plainly: "few professionals in the country combine both accounting and legal expertise" needed to properly support this process. Entity type, tax regime, CNAE code, licenses — these aren\'t formalities, they\'re strategic decisions with long-term consequences, and a mistake at any of these steps creates problems that surface months or years later.',
          ],
        },
        {
          heading: 'Bureaucracy Is Only Half the Story',
          paragraphs: [
            'Formal requirements are what you can find in guides and mostly resolve with paperwork. What\'s harder is what isn\'t written in any official checklist: how decisions actually get made here, who trusts whom and why, what informal rules govern the business environment. We covered this in detail in a separate piece, ["Brazil for Dummies"](/research/report/brazil-for-dummies-culture-guide) — including the jeitinho brasileiro phenomenon and why bureaucracy here can\'t just be "worked around" by knowing the right shortcuts.',
            'In Brazil, personal relationships and business connections play a significantly larger role in business success than in many other countries. Knowing the right people, understanding who actually makes decisions at the local level, spending years building trust with local partners — this isn\'t a "workaround" for the system, it\'s part of how the system actually functions here.',
          ],
        },
        {
          heading: 'Bringing Your Business to the Brazilian Market',
          paragraphs: [
            'You could spend six months figuring out those 22 steps by trial and error — time a competitor with a local partner would spend actually launching their business. We help businesses from Russia and the CIS enter the Brazilian market and expand their presence here — acting as your outsourced BDM (Business Development Manager), without hiring local staff.',
            'Who this is for: companies looking at Brazil as a new market — real estate, e-commerce, product businesses, B2B — who want a real person on the ground, not a theoretical agency.',
            'What we take on: market reconnaissance and finding an entry point for your specific niche; suppliers, partners, and contractors (local sourcing and negotiation); deal support (registration, logistics, counterparties); sales and channel development in Brazil; reporting and integration into your team, remote or on-site.',
            'Why us: 15+ years in Santa Catarina, our own real estate business here; corporate international experience (SLB) — projects and contracts across 5+ countries, budgets from $1M+; e-commerce and B2B background — bringing SKUs to market, growing revenue from $7K to $195K/month, scaling brands on Amazon; RU / EN / PT, physically based in Brazil.',
          ],
        },
        {
          heading: 'Before You Take the First Step',
          paragraphs: [
            'Before taking your first steps and making important decisions, consult with a specialist. Reach out, and I\'ll help you build the first steps for your business in Brazil — whether that\'s finding staff, expanding, or bringing your product to a new market.',
            'This material is for informational purposes only and does not replace consultation with a qualified lawyer and accountant licensed in Brazil.',
          ],
        },
      ],
    },
    ru: {
      sections: [
        {
          heading: 'Цифры, которые отрезвляют',
          paragraphs: [
            'Бразилия открыта для иностранных инвестиций — это правда. Но между «можно» и «легко» — огромная дистанция, и цифры это подтверждают жёстче, чем любые слова.',
            'По индексу Ease of Doing Business Всемирного банка Бразилия занимает 126-е место из 183 стран в целом, и конкретно по категории «открытие бизнеса» — 120-е место.',
            'Открытие обычной компании в Бразилии — 13 шагов. Для иностранца — уже 22 шага, и процесс может занять до 180 дней. Для сравнения: в США иностранец открывает бизнес максимум за 10 дней, а местный резидент — за 6. Это не субъективное ощущение «бразильской бюрократии» — это измеримый, задокументированный разрыв именно для тех, кто не является гражданином страны.',
          ],
        },
        {
          heading: 'Формальные требования, которые нельзя обойти',
          paragraphs: [
            'Иностранец может быть единственным владельцем компании через структуру Sociedade Limitada Unipessoal (SLU) — хорошая новость. Но дальше начинаются обязательные шаги, требующие локального присутствия: CPF (бразильский налоговый номер — без него не откроете счёт и не подпишете ни один документ); регистрация в Центробанке через систему RDE-IED (Registro Declaratório Eletrônico – Investimento Estrangeiro Direto); и обязательный местный представитель (procurador) — резидент Бразилии с полномочиями получать судебные извещения от вашего имени. Без него нерезидент физически не может быть частью бразильской компании.',
            'Если планируете инвесторскую визу — минимальная сумма инвестиций R$150 тыс., плюс формальный инвестиционный план, доказывающий социальную значимость вложений (обычно — создание рабочих мест). Это отдельный путь с более низким порогом входа, чем ВНЖ через недвижимость (от R$1М в Санта-Катарине) — подробное сравнение по стоимости, срокам и требованиям см. в нашем гиде по [ВНЖ Бразилии через недвижимость](/research/report/vnzh-braziliya-nedvizhimost).',
          ],
        },
        {
          heading: 'Почему это не решается просто наймом бухгалтера',
          paragraphs: [
            'Один из консультантов по локализации иностранного капитала в Бразилии прямо говорит: «мало профессионалов в стране владеют одновременно бухгалтерской и юридической экспертизой», необходимой для полноценного сопровождения этого процесса. Тип юрлица, налоговый режим, код CNAE, лицензии — это не формальности, а стратегические решения с долгосрочными последствиями, и ошибка на любом из этих шагов создаёт проблемы, которые вскрываются месяцами или годами позже.',
          ],
        },
        {
          heading: 'Бюрократия — только половина истории',
          paragraphs: [
            'Формальные требования — это то, что можно найти в гайдах и по большей части решить документами. Сложнее то, что не описано ни в одном официальном чек-листе: как здесь на самом деле принимаются решения, кому и как доверяют, какие неформальные правила работают в бизнес-среде. Мы подробно разбирали это в отдельном материале [«Brazil for Dummies»](/research/report/brazil-for-dummies-culture-guide) — включая феномен jeitinho brasileiro и то, почему бюрократию здесь нельзя просто «обойти», зная правильные лазейки.',
            'В Бразилии личные отношения и деловые связи играют значительно большую роль в успехе бизнеса, чем во многих других странах. Знать нужных людей, понимать, кто реально принимает решения на местном уровне, годами выстраивать доверие с локальными партнёрами — это не «обходной путь» вокруг системы, а часть того, как система здесь на самом деле работает.',
          ],
        },
        {
          heading: 'Выводим ваш бизнес на рынок Бразилии',
          paragraphs: [
            'Можно потратить полгода, разбираясь с 22 шагами методом проб и ошибок — время, которое конкурент с локальным партнёром потратит на реальный запуск бизнеса. Мы помогаем бизнесу из России и СНГ заходить на рынок Бразилии и расширять здесь присутствие — работаем как ваш BDM (Business Development Manager) на аутсорсе, без найма локального штата.',
            'Кому актуально: компаниям, которые смотрят на Бразилию как на новый рынок — недвижимость, e-commerce, товарный бизнес, B2B — и хотят понятного человека на месте, а не агентство «в теории».',
            'Что берём на себя: разведка рынка, поиск точки входа под конкретную нишу; поставщики, партнёры, подрядчики — поиск и переговоры на месте; сопровождение сделок — регистрация, логистика, контрагенты; продажи и развитие канала в Бразилии; отчётность и включённость в вашу команду — удалённо или с выездами.',
            'Почему мы: 15+ лет в Санта-Катарине, свой бизнес в недвижимости здесь; корпоративный международный опыт (SLB): проекты и контракты в 5+ странах, бюджеты от $1M+; e-commerce и B2B бэкграунд: вывод SKU на рынок, рост оборота с $7K до $195K/мес, масштабирование брендов на Amazon; RU / EN / PT, физически в Бразилии.',
          ],
        },
        {
          heading: 'Прежде чем делать первые шаги',
          paragraphs: [
            'Прежде чем делать первые шаги и принимать важные решения, проконсультируйтесь со специалистом. Напишите мне, и я помогу выстроить первые шаги для вашего бизнеса в Бразилии — будь то поиск персонала, расширение или вывод вашего товара на новый рынок.',
            'Материал носит информационный характер и не заменяет консультацию с квалифицированным юристом и бухгалтером, лицензированным в Бразилии.',
          ],
        },
      ],
    },
  },
  'stv-construcoes-developer-review-2026': {
    en: {
      sections: [
        {
          heading: 'The Short Version',
          paragraphs: [
            "Not every developer takes the leap of moving its head office from the state capital to a fast-emerging coastal town. STV did exactly that in 2025 — a bet on the same trend we've covered in detail in our own [Porto Belo guide](/research/report/porto-belo-investment-report-2026): the large-scale urban transformation of Balneário Perequê.",
            'Founded 2009, registered capital R$100 million, 40+ projects delivered in Florianópolis over 16 years. Plan B Overall Score 8.4/10.',
          ],
        },
        {
          heading: 'Company Overview',
          paragraphs: [
            'STV Construções was founded in 2009, with registered capital of R$100 million. The company is run by Stevan Parmegiani and Ana Claudia Espindola Parmegiani. For 16 years the company built in Florianópolis — over 40 delivered projects.',
            "In 2025, STV moved its headquarters from Florianópolis to Porto Belo, specifically Balneário Perequê — the heart of the urban transformation we've covered in a separate article (beach widening, Perequê river mouth jetties, a mobility and tourism master plan).",
          ],
        },
        {
          heading: 'Flagship Project — Nautik Class',
          paragraphs: [
            'The company\'s first Porto Belo project, delivered November 8, 2025: 19 floors, 12,000 m² of built area, 56 three-bedroom units, a few meters from the sea. Units sold in pre-launch in 2021 for R$400K, today valued at over R$2 million — a potential gain of up to 300%. All units are already sold.',
            'Amenities: 568 m² of leisure space (delivered furnished and decorated), balconies with charcoal churrasqueiras, automated blinds, two private parking spots plus a hobby box per unit, individual water/electricity/gas meters, two custom next-generation elevators.',
          ],
        },
        {
          heading: 'Active Project Pipeline',
          paragraphs: [
            'Three major construction sites running simultaneously — Downtown Boulevard, The Level, Pier Monte Carlo (towers of 25-30 floors). For 2026, Summit is set to launch — 30 floors, 72 three-bedroom units, already 95% reserved before construction begins. In the planning stage: an ambitious 32,000 m² beachfront complex, described as one of the boldest projects on the "Costa Esmeralda," with 3, 4, and 5-bedroom units.',
          ],
        },
        {
          heading: 'Market Context',
          paragraphs: [
            "Porto Belo wasn't a random choice for the headquarters move. The city led Santa Catarina in real estate launches in 2024, its population grew from 16,000 to 27,000 over 12 years, and regional VGV exceeds R$10 billion. Mayor Joel Lucinda directly credits private construction investment with this growth.",
          ],
        },
        {
          heading: 'A First-Hand Story — Why Stevan Bet on Porto Belo',
          paragraphs: [
            'The company originally comes from Gramado (Rio Grande do Sul) — it built there and in Florianópolis before betting specifically on Porto Belo. Stevan Parmegiani personally walked me through the logic behind that decision.',
            'About 10 years ago, he saw that Balneário Camboriú, Meia Praia, and Itapema had nowhere left to grow — either up (complex and expensive) or out. The market took the simple path and started expanding north, toward Porto Belo and Perequê. The timing coincided with the city\'s approval of a new master plan, permitting towers up to 30 floors, and land at the time cost a fraction of Florianópolis prices.',
            'A 300-400 m² plot that could sell for R$7-8 million today was bought back then for R$200-300K. Stevan built up enough land reserves for the next 30-40 years — no need to think about buying land for decades to come.',
          ],
        },
        {
          heading: 'SPE vs Classic Incorporadora',
          paragraphs: [
            "Per Stevan's own observation, roughly 90% of the Florianópolis market today operates via SPE schemes (cooperative/shared construction). We've covered this structure in detail in a separate article on [SPE risks](/research/report/spe-struktura-nedvizhimost-braziliya) — the key point worth repeating here: sales in such a scheme can start before the architectural project is approved, before construction permits are issued, and even before the land itself is registered to the developer. The project's risks are legally shifted onto the buyers themselves as co-owners — this is confirmed by Article 58 of Lei 4.591/64, which specifically governs this format (\"regime de administração,\" \"preço de custo\").",
            'STV works differently — a classic incorporadora. STV, like most Porto Belo and Perequê developers, operates as a classic incorporadora — building on its own capital or with bank financing, not on buyers\' money from day one. Under Lei 4.591/64, in this model liability falls on the developer itself as the "incorporador" — legal protection for the buyer is significantly stronger than under SPE schemes. Whichever structure a deal ends up using, structuring the payment itself through an [escrow account](/research/report/eskrou-schet-nedvizhimost-braziliya-zashchita-pokupatelya) adds a further layer of protection on top of the developer\'s own legal form.',
            "That's exactly why the Porto Belo and Perequê market builds fast and confidently, delivers on time — and gives clients a real, not just paper, potential for 300% growth in 4-5 years, as the Nautik Class case demonstrated.",
            'When I asked whether he\'d want to go back to building on the island, Stevan smiled and said: "The game has changed, the balance of power has shifted — Porto Belo wins now." He sees big potential for the city over the next 50 years.',
          ],
        },
        {
          heading: 'Plan B Investment Score',
          paragraphs: [
            'Delivery 8.0/10. Quality 8.4/10. Stability 9.0/10. Satisfaction 7.0/10. Reputation 9.0/10. Transparency 9.0/10. Overall 8.4/10.',
            "The lower Satisfaction score isn't due to customer complaints — nearly all five of the company's current projects are over 90% sold, some before construction has even started. The figure reflects limited availability for new buyers, not dissatisfaction with service.",
          ],
        },
        {
          heading: 'Plan B Verdict — STV Construções',
          paragraphs: [
            '✅ RECOMMENDED. A stable developer with unusually strong deal-structure transparency and a proven ROI case (Nautik Class, up to 300% in 4-5 years). A classic incorporadora, not an SPE — significantly stronger legal protection for the buyer under Brazilian law.',
            "Of the company's five active projects, there's almost no availability left — the market has already voted. But I have insider information on STV's next project, currently in the approval process — and it's genuinely a strong one. Prices are still very appealing, and as always, there's room to negotiate — where, as usual, I'm on the buyer's side.",
            'This material is for informational purposes only and does not constitute investment advice. Plan B Brazil acts as an independent advisor, is not affiliated with STV Construções, and is not a developer.',
          ],
        },
      ],
    },
    ru: {
      sections: [
        {
          heading: 'Коротко о главном',
          paragraphs: [
            'Не каждый застройщик решается перенести головной офис из столицы штата в развивающийся прибрежный город. STV сделала это в 2025 году — ставка на то, что мы уже подробно разбирали в собственном [гиде по Porto Belo](/research/report/porto-belo-investment-report-2026): масштабная городская трансформация Balneário Perequê.',
            'Основана в 2009, зарегистрированный капитал R$100 млн, 40+ сданных проектов во Флорианополисе за 16 лет. Plan B Overall Score 8,4/10.',
          ],
        },
        {
          heading: 'Обзор компании',
          paragraphs: [
            'STV Construções основана в 2009 году, зарегистрированный капитал — R$100 млн. Управляют компанией Стевен Пармеджани и Ана Клаудиа Эспиндола Пармеджани. 16 лет компания строила во Флорианополисе — свыше 40 сданных проектов.',
            'В 2025 году STV перенесла штаб-квартиру из Флорианополиса в Порту-Белу, конкретно в Balneário Perequê — сердце городской трансформации, которую мы уже описывали в отдельной статье (расширение пляжной полосы, дамбы устья реки Perequê, мастер-план по мобильности и туризму).',
          ],
        },
        {
          heading: 'Флагманский проект — Nautik Class',
          paragraphs: [
            'Первый проект компании в Порту-Белу, сдан 8 ноября 2025 года: 19 этажей, 12 тыс. м² построенной площади, 56 юнитов на три спальни, в нескольких метрах от моря. Юниты продавались на предпродаже в 2021 году по R$400 тыс., сегодня оцениваются свыше R$2 млн — потенциал роста до 300%. Все юниты уже проданы.',
            'Удобства: зоны отдыха 568 м² (сданы меблированными и декорированными), балконы с угольной шураскейрой, автоматизированные жалюзи, два личных парковочных места + hobby box на юнит, индивидуальные счётчики воды/света/газа, два кастомных лифта последнего поколения.',
          ],
        },
        {
          heading: 'Активный пайплайн проектов',
          paragraphs: [
            'Три крупные стройки одновременно — Downtown Boulevard, The Level, Pier Monte Carlo (башни 25-30 этажей). На 2026 год запланирован старт Summit — 30 этажей, 72 юнита на три спальни, уже 95% забронировано до начала строительства. В стадии проекта — амбициозный прибрежный комплекс на 32 тыс. м², описываемый как один из самых дерзких проектов «Costa Esmeralda», с юнитами на 3, 4 и 5 спален.',
          ],
        },
        {
          heading: 'Контекст рынка',
          paragraphs: [
            'Порту-Белу — не случайный выбор для переноса штаб-квартиры. Город лидировал по числу запусков недвижимости в Санта-Катарине в 2024 году, население выросло с 16 до 27 тысяч за 12 лет, региональный VGV превышает R$10 млрд. Мэр города Жоэл Лусинда прямо связывает этот рост с частными инвестициями в строительство.',
          ],
        },
        {
          heading: 'История из первых рук — почему Стеван поставил на Порту-Белу',
          paragraphs: [
            'Компания родом из Грамаду (Риу-Гранди-ду-Сул) — строила там и во Флорианополисе, прежде чем сделать ставку именно на Порту-Белу. Стеван Пармеджани лично рассказал мне логику этого решения.',
            'Около 10 лет назад он увидел, что Балнеариу-Камбориу, Меа-Прая и Итапеме уже некуда расти — либо вверх (сложно и дорого), либо вширь. Рынок пошёл по простому пути и стал расширяться на север, в сторону Порту-Белу и Perequê. Момент совпал с утверждением генплана города, разрешившего высотки до 30 этажей, а земля тогда стоила в разы дешевле, чем во Флорипе.',
            'Участок в 3-4 сотки, который сегодня может стоить R$7-8 млн, тогда покупался за R$200-300 тыс. Стеван успел накопить земельный резерв на следующие 30-40 лет вперёд — не нужно думать о покупке земли ещё долгие десятилетия.',
          ],
        },
        {
          heading: 'SPE vs классическая инкорпорадора',
          paragraphs: [
            'По наблюдению Стевана, сегодня практически весь рынок Флорианополиса — порядка 90% — работает по схемам SPE (кооперативное/долевое строительство). Мы подробно разбирали эту структуру в отдельной статье о [рисках SPE](/research/report/spe-struktura-nedvizhimost-braziliya) — здесь важно повторить главное: продажи в такой схеме могут стартовать ещё до утверждения архитектурного проекта, до получения разрешений на строительство и даже до оформления земли в собственность застройщика. Риски проекта юридически возлагаются на самих покупателей как совладельцев — это подтверждается статьёй 58 Lei 4.591/64.',
            'STV работает иначе — классическая инкорпорадора. STV, как и большинство застройщиков Порту-Белу и Perequê, работает по модели классической инкорпорадоры — строит на собственный капитал либо с привлечением банковского финансирования, не на деньги дольщиков с самого начала. Юридическая защита покупателя здесь значительно сильнее, чем в SPE-схемах. Какая бы структура ни использовалась в конкретной сделке, оформление самого платежа через [эскроу-счёт](/research/report/eskrou-schet-nedvizhimost-braziliya-zashchita-pokupatelya) добавляет дополнительный уровень защиты поверх юридической формы самого застройщика.',
            'Именно поэтому рынок Порту-Белу и Perequê строит быстро и уверенно, сдаёт объекты вовремя — и даёт клиентам реальный, а не бумажный потенциал роста в 300% за 4-5 лет, как показал кейс Nautik Class.',
            'На вопрос, хотел бы он вернуться строить на остров, Стеван улыбнулся и ответил: «Игра изменилась, силы не равны — сейчас выигрывает Порту-Белу». Он видит для города большой потенциал на ближайшие 50 лет.',
          ],
        },
        {
          heading: 'Plan B Investment Score',
          paragraphs: [
            'Delivery 8,0/10. Quality 8,4/10. Stability 9,0/10. Satisfaction 7,0/10. Reputation 9,0/10. Transparency 9,0/10. Overall 8,4/10.',
            'Оценка Satisfaction ниже остальных не из-за жалоб клиентов — почти во всех пяти текущих проектах компании продано свыше 90% юнитов, некоторые ещё даже не вышли в стройку. Показатель отражает ограниченную доступность для новых покупателей, а не недовольство сервисом.',
          ],
        },
        {
          heading: 'Вердикт Plan B — STV Construções',
          paragraphs: [
            '✅ РЕКОМЕНДОВАНО. Устойчивый застройщик с редкой прозрачностью структуры сделки и подтверждённым кейсом доходности (Nautik Class, до 300% за 4-5 лет). Классическая инкорпорадора, не SPE — значительно более сильная юридическая защита покупателя по бразильскому закону.',
            'Из пяти активных проектов компании свободных юнитов почти не осталось — рынок уже проголосовал. Но у меня есть инсайдерская информация о следующем проекте STV, который сейчас проходит согласование — и это действительно сильная заявка. Цены пока очень приятные, и, как всегда, предусмотрен торг — в котором я, как обычно, на стороне покупателя.',
            'Материал носит информационный характер и не является инвестиционной рекомендацией. Plan B Brazil выступает независимым советником, не аффилирован с STV Construções и не является девелопером.',
          ],
        },
      ],
    },
  },
  'eskrou-schet-nedvizhimost-braziliya-zashchita-pokupatelya': {
    en: {
      sections: [
        {
          heading: 'The Short Version',
          paragraphs: [
            "A classic real estate deal is, at its core, a matter of trust — who pays first. The buyer risks paying before the paperwork is settled; the seller risks handing over documents before payment. That's exactly the problem a new instrument for Brazil — the escrow account — solves, having received an official legal foundation since 2023.",
          ],
        },
        {
          heading: 'The Scale of the Problem Escrow Solves',
          paragraphs: [
            'Per the Anuário Brasileiro de Segurança Pública 2025, Brazil records roughly 2.2 million fraud (estelionato) cases per year — about 4 cases per minute nationwide. A significant share involves real estate: forged documents, one property sold to multiple buyers, hidden debts and liens. Fraud cases have grown sharply by state since 2018: São Paulo +553%, Paraná +430%, Rio de Janeiro +317%, Minas Gerais +286%. For the specific warning signs to watch for in a deal, see our separate breakdown of [how to recognize a real estate fraud scheme in Brazil](/research/report/kak-raspoznat-moshennichestvo-nedvizhimost-braziliya).',
            'This isn\'t abstract data from somewhere far away. In June 2026, a court blocked R$490 million from parties involved in an illegal property sales scheme on the coast of Santa Catarina — the exact region where we work. Two months earlier, "Operação Real State" uncovered a scheme in the same state with roughly R$12 million in losses.',
          ],
        },
        {
          heading: 'What an Escrow Account Is and How It Works',
          paragraphs: [
            'An escrow account (conta escrow) is an account into which the buyer deposits funds not directly to the seller, but under the management of an independent third party — in the Brazilian version, a notary (tabelião de notas). The money is held and transferred to the seller only once the agreed conditions of the deal are confirmed.',
            '1. Buyer deposits funds — money goes not directly to the seller, but into an escrow account managed by a notary. 2. Deal conditions are verified — the notary confirms the conditions are met, typically registration of title at the Cartório de Registro de Imóveis. 3. Funds are released to the seller — only after confirmation. If conditions aren\'t met, the money is returned to the buyer.',
          ],
        },
        {
          heading: 'The Legal Basis — Not an Experimental Scheme, But Law',
          paragraphs: [
            'The instrument is formalized by Lei 14.711/2023 (known as the "Marco Legal das Garantias") — this law introduced Article 7º-A into Lei 8.935/1994 (the notary law), explicitly authorizing notaries to open and manage escrow accounts. The mechanism is further regulated by CNJ Provimento No. 197/25. At the end of 2024, the Brazilian Notary College (Colégio Notarial do Brasil) partnered with Banco Safra specifically to formalize opening such accounts through notary offices — meaning this is no longer an ad-hoc practice of individual lawyers, but an institutionalized system.',
            'Funds are held in a segregated account, protected from judicial and tax liens against either party. The maximum holding period is up to 180 days, extendable. The model is inspired by the notary systems of Germany, Italy, and France, and is especially valuable for deals without bank financing, where the full amount is typically handed to the seller before registration completes — the same no-financing structure common in [SPE deals](/research/report/spe-struktura-nedvizhimost-braziliya), where escrow can meaningfully reduce the buyer\'s exposure.',
          ],
        },
        {
          heading: 'Why This Matters Especially for Foreign Buyers',
          paragraphs: [
            "A foreign buyer — especially one who isn't physically present in Brazil at all times and can't personally oversee every step of the deal — is structurally more vulnerable to real estate fraud than a local resident. An escrow account removes part of that risk: money doesn't reach the seller until clean title registration is confirmed, regardless of whether you're physically in the country at that moment.",
          ],
        },
        {
          heading: 'Be Wary of Unverified Intermediaries',
          paragraphs: [
            "The arrival of a new protective instrument doesn't remove the need for basic caution. Only work with verified notaries, lawyers, and consultants — those with real, verifiable practice in Brazil, not just a nice website. This is exactly the kind of due diligence we cover in our separate guide on [choosing a real estate consultant in Brazil](/research/report/kak-vybrat-investicionnogo-konsultanta-florianopolis). We work with verified professionals — for example, immigration lawyer Dr. Wilian Campos (OAB/SC 50.897, WK International Services), whom we partner with on visa and tax matters — and we select a notary with real experience specifically in escrow structures for each individual deal. For a transparent, classic-incorporadora example of the same verified-partner approach, see our review of [STV Construções](/research/report/stv-construcoes-developer-review-2026).",
          ],
        },
        {
          heading: 'Bottom Line',
          paragraphs: [
            "An escrow account isn't a marketing novelty — it's a real, legally established instrument, institutionally backed by Brazil's banking sector and notary system. It doesn't eliminate the need for due diligence before a purchase, but it substantially reduces one specific risk: losing money before title registration is complete.",
            'This material is for informational purposes only and does not constitute legal advice. Sources: Lei 14.711/2023, Lei 8.935/1994 (Art. 7º-A), CNJ Provimento No. 197/25, Anuário Brasileiro de Segurança Pública 2025. Plan B Brazil acts as an independent advisor and is not a developer.',
          ],
        },
      ],
    },
    ru: {
      sections: [
        {
          heading: 'Коротко о главном',
          paragraphs: [
            'Классическая сделка с недвижимостью — это, по сути, вопрос доверия: кто платит первым. Покупатель рискует, платя до оформления документов; продавец рискует, передавая документы до оплаты. Именно эту проблему и решает новый для Бразилии инструмент — эскроу-счёт, который с 2023 года получил официальную законодательную основу.',
          ],
        },
        {
          heading: 'Масштаб проблемы, которую решает эскроу',
          paragraphs: [
            'По данным Anuário Brasileiro de Segurança Pública 2025, в Бразилии фиксируется около 2,2 млн случаев мошенничества (estelionato) в год — это порядка 4 случая в минуту по всей стране. Значительная часть — сделки с недвижимостью: поддельные документы, продажа одного объекта нескольким покупателям, сокрытие долгов и обременений. Рост случаев мошенничества по штатам с 2018 года: Сан-Паулу +553%, Парана +430%, Рио-де-Жанейро +317%, Минас-Жерайс +286%. Конкретные тревожные признаки при сделке мы разбирали отдельно — в статье [как распознать мошенничество с недвижимостью в Бразилии](/research/report/kak-raspoznat-moshennichestvo-nedvizhimost-braziliya).',
            'Это не абстрактная статистика откуда-то издалека. В июне 2026 года суд заблокировал R$490 млн у фигурантов схемы незаконной продажи недвижимости на побережье именно Санта-Катарины — региона, где мы работаем. Двумя месяцами ранее операция «Real State» вскрыла в том же штате схему с ущербом около R$12 млн.',
          ],
        },
        {
          heading: 'Что такое эскроу-счёт и как он работает',
          paragraphs: [
            'Эскроу-счёт (conta escrow) — это счёт, на который покупатель вносит средства не напрямую продавцу, а под управление независимой третьей стороны — в бразильском варианте это нотариус (tabelião de notas). Деньги хранятся на счету и переводятся продавцу только после подтверждения выполнения оговорённых условий сделки.',
            '1. Покупатель вносит средства — деньги идут не продавцу напрямую, а на эскроу-счёт под управлением нотариуса. 2. Проверка условий сделки — нотариус подтверждает выполнение условий, как правило, регистрацию права собственности в Cartório de Registro de Imóveis. 3. Средства переводятся продавцу — только после подтверждения. Если условия не выполнены, деньги возвращаются покупателю.',
          ],
        },
        {
          heading: 'Юридическая основа — не экспериментальная схема, а закон',
          paragraphs: [
            'Инструмент формализован Lei 14.711/2023 (известным как «Marco Legal das Garantias») — этот закон ввёл статью 7º-A в Lei 8.935/1994 (закон о нотариате), прямо разрешив нотариусам открывать и вести эскроу-счета. Дополнительно механизм регулируется провизией CNJ № 197/25. В конце 2024 года Коллегия нотариусов Бразилии (Colégio Notarial do Brasil) заключила партнёрство с Banco Safra специально для формализации открытия таких счетов через нотариальные конторы — то есть это уже не разовая практика отдельных юристов, а институционализированная система.',
            'Средства хранятся на сегрегированном счёте — защищены от судебных и налоговых арестов в отношении любой из сторон сделки. Максимальный срок удержания — до 180 дней, с возможностью продления. Модель вдохновлена нотариальными системами Германии, Италии и Франции и особенно ценна для сделок без банковского финансирования, где обычно вся сумма передаётся продавцу до завершения регистрации — той же структуры без финансирования, что часто встречается в [сделках через SPE](/research/report/spe-struktura-nedvizhimost-braziliya), где эскроу может ощутимо снизить риск покупателя.',
          ],
        },
        {
          heading: 'Почему это особенно важно для иностранного покупателя',
          paragraphs: [
            'Иностранный покупатель — особенно тот, кто физически не находится в Бразилии постоянно и не может лично контролировать каждый этап сделки, — структурно более уязвим перед мошенничеством с недвижимостью, чем местный резидент. Эскроу-счёт снимает часть этого риска: деньги не переходят продавцу, пока не подтверждён факт чистой регистрации права собственности, независимо от того, находитесь ли вы физически в стране в этот момент.',
          ],
        },
        {
          heading: 'Остерегайтесь непроверенных посредников',
          paragraphs: [
            'Появление нового инструмента защиты не отменяет базовой осторожности. Работайте только с проверенными нотариусами, юристами и консультантами — теми, у кого есть реальная, подтверждаемая практика в Бразилии, а не только красивый сайт. Именно этому подходу к due diligence посвящён наш отдельный гид о [выборе инвестиционного консультанта в Бразилии](/research/report/kak-vybrat-investicionnogo-konsultanta-florianopolis). Мы работаем с проверенными профессионалами — например, с иммиграционным юристом Dr. Wilian Campos (OAB/SC 50.897, WK International Services), с которым сотрудничаем по визовым и налоговым вопросам, — и подбираем нотариуса с реальным опытом именно эскроу-структур под каждую конкретную сделку. Пример такого же принципа проверенного партнёрства — в прозрачной, классической модели инкорпорадоры — см. наш обзор [STV Construções](/research/report/stv-construcoes-developer-review-2026).',
          ],
        },
        {
          heading: 'Что в итоге',
          paragraphs: [
            'Эскроу-счёт — не маркетинговая новинка, а реальный, законодательно закреплённый инструмент, институционально поддержанный банковским сектором и нотариатом Бразилии. Он не устраняет необходимость due diligence перед покупкой, но существенно снижает конкретный риск — потерю денег до завершения регистрации права собственности.',
            'Материал носит информационный характер и не является юридической консультацией. Источники: Lei 14.711/2023, Lei 8.935/1994 (ст. 7º-A), Provimento CNJ № 197/25, Anuário Brasileiro de Segurança Pública 2025. Plan B Brazil выступает независимым советником и не является девелопером.',
          ],
        },
      ],
    },
  },
  'kak-raspoznat-moshennichestvo-nedvizhimost-braziliya': {
    en: {
      sections: [
        {
          heading: 'The Short Version',
          paragraphs: [
            "Most real estate fraud schemes in Brazil aren't particularly inventive — they rely on urgency and buyer inattention. Below are concrete signs to watch for before you hand over a single real. On the resale market, the decisive check is an updated matrícula. On new construction, it's incorporation registration and transparency in the developer's cash flows.",
          ],
        },
        {
          heading: 'The Most Common Schemes',
          paragraphs: [
            'Per legal sources, the most common are: fake ownership (selling someone else\'s property with forged documents), double sale (one property sold to multiple buyers), fake agencies, hidden debts (selling a property with undisclosed liens), and financing fraud. Brazil records roughly 42,000+ defrauded buyers from the Encol collapse alone (1999) — for the broader fraud statistics behind these numbers, see our separate piece on [escrow accounts as a new layer of protection](/research/report/eskrou-schet-nedvizhimost-braziliya-zashchita-pokupatelya).',
          ],
        },
        {
          heading: 'Seven Warning Signs — Secondary Market',
          paragraphs: [
            'Price significantly below market — a classic lure; if it looks too good to be true, it probably is. Pressure to decide quickly — "there are other buyers," "offer today only" — a tactic to deny you time to verify. Payment requested before viewing or signing — no legitimate deal requires money before you\'ve seen the property and signed a vetted contract. Seller avoids written communication, insists on cash — the absence of a paper trail is a red flag. Seller is hard to find in person, or gives contradictory details. Refuses to provide an updated matrícula — the one document confirming the real owner and any liens. Broker without CRECI registration — checkable officially and free; a legitimate broker won\'t refuse to confirm it.',
            'The one check that matters more than all the others: order a fresh matrícula atualizada for the property at the Cartório de Registro de Imóveis before signing anything. This document shows the real owner and any liens — it legally outweighs any verbal assurance from the seller. Structuring the payment itself through an [escrow account](/research/report/eskrou-schet-nedvizhimost-braziliya-zashchita-pokupatelya) adds another layer of protection on top of this check, since funds only release after the notary confirms clean title.',
          ],
        },
        {
          heading: "A Legal Protection Most Buyers Don't Know About",
          paragraphs: [
            'Brazil\'s Supreme Court (STJ) established Súmula 375 — it protects a good-faith buyer from being accused of "fraud against creditors" (fraude à execução). A deal can only be annulled if a lien (penhora) was registered before the purchase, or if the buyer knowingly knew of pending lawsuits against the seller.',
          ],
        },
        {
          heading: 'The Primary Market — a Different Risk Category: Defrauded Co-Investors',
          paragraphs: [
            "Everything above concerns resale property. But with new construction, the risk works fundamentally differently — it's not about individual units, but money invested in a project that may never be completed. Scale of real cases: Encol (1999, largest historical case) — 42K+ buyers. Pyramid scheme (SPE/SCP) — R$200M, 1000+ victims. \"Black Flow,\" Itapema, 2025 — R$90M in losses.",
            "Brazil's largest construction scandal: over 42,000 buyers paid for apartments and received nothing, hundreds of abandoned construction sites across 23 states, 23,000 workers suddenly unemployed. The Encol collapse is what drove the introduction of the patrimônio de afetação protection mechanism, which we covered in detail in our separate article on [SPE risks and mechanics](/research/report/spe-struktura-nedvizhimost-braziliya).",
            'In September 2025, Operation "Black Flow" uncovered a scheme causing R$90 million in losses right in Itapema — the region next to us. The scheme involved illegal fund transfers between different SPEs and developers within the same group, selling units without incorporation registration, and multiple liens on the same property to different creditors.',
          ],
        },
        {
          heading: 'Warning Signs Specific to New Construction',
          paragraphs: [
            'Units sold before incorporation registration (registro de incorporação) — a direct violation of Lei 4.591/64. The developer promises "dividends" or guaranteed returns from itself — a classic pyramid-scheme signal. Overly rapid geographic expansion without a matching capital base. Lack of transparent, verifiable financial statements. Fund flows between different legal entities within the group with no clear logic.',
            'If construction does halt, you have legal recourse: Brazilian courts treat halted construction as an objective breach by the developer — this grants the right to rescind the contract and get a refund, typically around 90% of the amount paid.',
          ],
        },
        {
          heading: "It's Not Always Malicious Intent — the Risk of Incompetence",
          paragraphs: [
            "A separate, less obvious risk category isn't fraud in the legal sense, but ordinary incompetence or simply wanting to close a deal at any cost. A realtor more interested in selling something than understanding your strategy may not lie outright — but won't warn you about real risks either. The outcome for the buyer often looks like fraud's aftermath — just without malicious intent on the other side.",
            "That's exactly why choosing the professional who supports your deal deserves the same diligence as checking the property itself — independence from the developer, willingness to explain the logic behind a recommendation with numbers, honesty about risks, not just upside. We cover exactly this evaluation process in a separate guide on [how to choose a real estate consultant in Brazil](/research/report/kak-vybrat-investicionnogo-konsultanta-florianopolis).",
          ],
        },
        {
          heading: 'Bottom Line',
          paragraphs: [
            'Most fraud schemes can be spotted in advance — no legal training required, just attention to the signs above. This material is for informational purposes only and does not constitute legal advice. Plan B Brazil acts as an independent advisor and is not a developer.',
          ],
        },
      ],
    },
    ru: {
      sections: [
        {
          heading: 'Коротко о главном',
          paragraphs: [
            'Большинство мошеннических схем с недвижимостью в Бразилии не отличаются изобретательностью — они полагаются на спешку и невнимательность покупателя. Ниже — конкретные признаки, на которые стоит обращать внимание, прежде чем передать хоть один реал. На вторичке решающая проверка — актуальная matrícula. На первичке — регистрация инкорпорации и прозрачность денежных потоков застройщика.',
          ],
        },
        {
          heading: 'Самые частые схемы',
          paragraphs: [
            'По данным юридических источников, наиболее распространены: фальшивый собственник (продажа чужой недвижимости по поддельным документам), двойная продажа (один объект — нескольким покупателям), фиктивные агентства, скрытые долги (продажа объекта с необъявленными обременениями) и мошенничество с финансированием. Только крах застройщика Encol в 1999 году затронул свыше 42 000 обманутых покупателей — подробнее о статистике мошенничества и о том, как эскроу-счёт помогает от него защититься, читайте в отдельной статье про [эскроу-счёт как новый уровень защиты](/research/report/eskrou-schet-nedvizhimost-braziliya-zashchita-pokupatelya).',
          ],
        },
        {
          heading: 'Семь тревожных признаков — вторичный рынок',
          paragraphs: [
            'Цена значительно ниже рынка — классическая приманка: если предложение выглядит слишком хорошим, чтобы быть правдой, — вероятно, так и есть. Давление на скорость решения — «есть ещё покупатели», «предложение только сегодня» — приём, чтобы не дать вам времени на проверку. Оплата до просмотра или подписания договора — ни одна легитимная сделка не требует денег до того, как вы увидели объект и подписали проверенный контракт. Продавец избегает письменной коммуникации, настаивает на наличных — отсутствие бумажного следа — красный флаг. Продавца сложно найти лично, или он даёт противоречивые детали. Отказ предоставить актуальную matrícula — единственный документ, подтверждающий реального собственника и обременения. Брокер без регистрации в CRECI — проверяется официально и бесплатно, легитимный брокер не откажется подтвердить.',
            'Единственная проверка, которая важнее всех остальных: закажите свежую matrícula atualizada объекта в Cartório de Registro de Imóveis до подписания чего-либо. Именно этот документ показывает, кто реальный собственник и есть ли обременения — юридически он имеет решающее значение, не устные заверения продавца. Дополнительный уровень защиты добавляет структурирование самого платежа через [эскроу-счёт](/research/report/eskrou-schet-nedvizhimost-braziliya-zashchita-pokupatelya) — средства переводятся только после подтверждения нотариусом чистой регистрации права собственности.',
          ],
        },
        {
          heading: 'Правовая защита, о которой мало кто знает',
          paragraphs: [
            'Верховный суд Бразилии (STJ) закрепил Súmula 375 — она защищает добросовестного покупателя от обвинения в «мошенничестве против кредиторов» (fraude à execução). Сделка может быть аннулирована только если арест на имущество был зарегистрирован до покупки, или если покупатель заведомо знал о судебных процессах против продавца.',
          ],
        },
        {
          heading: 'Первичный рынок — другая категория риска: обманутые дольщики',
          paragraphs: [
            'Всё выше — про вторичное жильё. Но с новостройками риск устроен принципиально иначе — здесь он касается не отдельных квартир, а денег, вложенных в проект, который может никогда не быть достроен. Масштаб реальных кейсов: Encol (1999, крупнейший исторический) — 42K+ покупателей. Схема-пирамида (SPE/SCP) — R$200M, 1000+ пострадавших. «Black Flow», Итапема, 2025 — R$90M ущерба.',
            'Крупнейший строительный скандал в истории Бразилии: свыше 42 000 покупателей заплатили за квартиры и не получили ничего, сотни заброшенных строек в 23 штатах, 23 000 рабочих потеряли работу в одночасье. Именно крах Encol стал причиной введения защитного механизма patrimônio de afetação, о котором мы подробно писали в отдельной статье про [риски и механику SPE](/research/report/spe-struktura-nedvizhimost-braziliya).',
            'В сентябре 2025 года операция «Black Flow» вскрыла схему на R$90 млн ущерба именно в Итапеме — соседнем с нами регионе. Схема включала незаконные переводы средств между разными SPE и застройщиками внутри одной группы, продажу юнитов без регистрации инкорпорации, и множественные залоги одной и той же недвижимости разным кредиторам.',
          ],
        },
        {
          heading: 'Тревожные признаки именно для новостроек',
          paragraphs: [
            'Продажа юнитов до регистрации инкорпорации (registro de incorporação) — прямое нарушение Lei 4.591/64. Застройщик обещает «дивиденды» или гарантированную доходность от себя — характерный признак пирамиды. Слишком быстрая географическая экспансия без сопоставимого роста капитала. Отсутствие прозрачной, проверяемой финансовой отчётности. Денежные потоки между разными юрлицами группы без ясной логики.',
            'Если стройка всё же остановилась — у вас есть правовая защита: бразильские суды признают остановку строительства объективным нарушением обязательств застройщика — это даёт право на расторжение договора и возврат порядка 90% внесённой суммы.',
          ],
        },
        {
          heading: 'Не только преступный умысел — риск некомпетентности',
          paragraphs: [
            'Отдельная, менее очевидная категория риска — не мошенничество в юридическом смысле, а обычная некомпетентность или простое желание закрыть сделку любой ценой. Риелтор, которому важнее продать хоть что-то, чем разобраться в вашей стратегии, может не соврать напрямую — но и не предупредит о реальных рисках объекта. Результат для покупателя часто похож на последствия настоящего мошенничества — просто без злого умысла с другой стороны.',
            'Именно поэтому к выбору профессионала, который сопровождает сделку, стоит подходить так же ответственно, как к проверке самого объекта — независимость от застройщика, готовность объяснять логику рекомендации цифрами, честность про риски, а не только про плюсы. Именно этому критерию мы посвятили отдельный гид о том, [как выбрать инвестиционного консультанта в Бразилии](/research/report/kak-vybrat-investicionnogo-konsultanta-florianopolis).',
          ],
        },
        {
          heading: 'Что в итоге',
          paragraphs: [
            'Большинство мошеннических схем распознаются заранее — без юридического образования, просто вниманием к перечисленным признакам. Материал носит информационный характер и не является юридической консультацией. Plan B Brazil выступает независимым советником и не является девелопером.',
          ],
        },
      ],
    },
  },
  'kak-vybrat-investicionnogo-konsultanta-florianopolis': {
    en: {
      sections: [
        {
          heading: 'The Short Version',
          paragraphs: [
            "The right consultant for real estate investment in Florianópolis isn't the one with the prettiest presentation — it's the one who's independent from specific developers, explains the logic behind their recommendations with numbers rather than nice pictures, and understands the tax specifics for non-residents. Below are concrete criteria for evaluating any consultant, including us.",
          ],
        },
        {
          heading: "Independent Consultant vs. a Developer's Realtor — What's the Difference",
          paragraphs: [
            "A realtor working with a single developer earns money by selling that developer's specific properties — their job is to sell what's in the portfolio, even if it isn't ideal for your strategy. An independent consultant earns money by matching a strategy to your goals, not a property to their portfolio — if the optimal option doesn't exist with any developer, an independent consultant will tell you so directly.",
          ],
        },
        {
          heading: 'Six Criteria for Evaluating a Consultant',
          paragraphs: [
            '1. Independence from a specific developer — ask directly whether the consultant works with just one developer, or selects from properties across different companies market-wide. 2. Can explain the logic behind a recommendation, not just show a presentation — a good consultant will explain why they recommend a specific district or property, not just send you a developer\'s brochure. 3. Provides yield, liquidity, and district analysis — concrete numbers, not generic phrases like "great investment." 4. Works with foreigners and knows non-resident tax nuances — buying property as a foreigner in Brazil has its own specifics, from deal structure to taxation on sale. 5. Talks honestly about risks, not just upside — for example, the difference between an SPE and a classic incorporadora, which we\'ve covered in detail in a [separate article on SPE risks](/research/report/spe-struktura-nedvizhimost-braziliya). 6. Speaks your language — literally — on deals involving serious money, misunderstanding due to a language barrier can be costly.',
            'This same independence and risk-transparency standard is exactly what we look for when reviewing developers ourselves — see, for example, our review of [STV Construções](/research/report/stv-construcoes-developer-review-2026), a classic incorporadora with unusually strong deal-structure transparency.',
          ],
        },
        {
          heading: 'Frequently Asked Questions',
          paragraphs: [
            "Do I even need an investment consultant if I've already found a property through a developer? It's worth getting an independent assessment before signing anything — a consultant with no stake in that specific deal can tell you honestly whether the price is fair and whether the deal structure fits your goals.",
            'How is an investment consultant different from a regular realtor? A realtor helps you find and buy a specific property. An investment consultant first determines a strategy (rental, resale, land, commercial) and then selects a property to match — a broader task than closing one transaction.',
            'How much do independent consultant services cost? Models vary — from a one-time consultation to full deal support. Clarify the payment format upfront and make sure you understand exactly what you\'re paying for. And before signing anything, it\'s worth structuring the payment itself safely — see our separate piece on [escrow accounts](/research/report/eskrou-schet-nedvizhimost-braziliya-zashchita-pokupatelya) as a legal protection layer, and on [recognizing fraud schemes](/research/report/kak-raspoznat-moshennichestvo-nedvizhimost-braziliya) before you get that far.',
          ],
        },
        {
          heading: 'Our Approach at Plan B Brazil',
          paragraphs: [
            "We're an independent real estate investment consultant in Santa Catarina: not tied to any developer, working with foreign investors, providing an honest yield and risk calculation for every property, speaking Russian, English, and Portuguese. Our district and developer reports are built on this same logic — open data, named sources, honest risk warnings where they exist.",
            'This material is for informational purposes only and does not constitute investment advice. Plan B Brazil acts as an independent advisor and is not a developer.',
          ],
        },
      ],
    },
    ru: {
      sections: [
        {
          heading: 'Коротко о главном',
          paragraphs: [
            'Правильный консультант для инвестиций в недвижимость Флорианополиса — не тот, у кого самая красивая презентация, а тот, кто независим от конкретных застройщиков, объясняет логику своих рекомендаций цифрами, а не только красивыми картинками, и понимает налоговые особенности именно для нерезидентов. Ниже — конкретные критерии, по которым стоит проверять любого консультанта, включая нас.',
          ],
        },
        {
          heading: 'Независимый консультант или риелтор при застройщике — в чём разница',
          paragraphs: [
            'Риелтор, работающий с одним застройщиком, зарабатывает на продаже конкретных объектов этого застройщика — его задача продать то, что есть в портфеле, даже если объект не идеален под вашу стратегию. Независимый консультант зарабатывает на том, чтобы подобрать стратегию под ваши цели, а не объект под свой портфель — если оптимального варианта нет ни у одного застройщика, независимый консультант скажет вам об этом прямо.',
          ],
        },
        {
          heading: 'Шесть критериев, по которым стоит оценивать консультанта',
          paragraphs: [
            '1. Независимость от конкретного застройщика — уточните прямо, с одним ли застройщиком работает консультант, или подбирает из объектов разных компаний по всему рынку. 2. Может объяснить логику рекомендации, а не только показать презентацию — хороший консультант расскажет, почему рекомендует конкретный район или объект, а не просто пришлёт брошюру застройщика. 3. Даёт расчёт доходности, ликвидности и анализ района — конкретные цифры, а не общие фразы «отличная инвестиция». 4. Работает с иностранцами и знает налоговые нюансы для нерезидентов — покупка недвижимости иностранцем в Бразилии имеет свою специфику, от структуры сделки до налогообложения при продаже. 5. Честно говорит о рисках, а не только о плюсах — например, о разнице между SPE и классической инкорпорадорой, которую мы подробно разбирали в [отдельной статье про риски SPE](/research/report/spe-struktura-nedvizhimost-braziliya). 6. Говорит с вами на одном языке — в буквальном смысле: при сделках на серьёзные суммы недопонимание из-за языкового барьера может стоить дорого.',
            'Тот же стандарт независимости и прозрачности рисков мы применяем и при разборе самих застройщиков — см., например, наш обзор [STV Construções](/research/report/stv-construcoes-developer-review-2026), классической инкорпорадоры с редкой прозрачностью структуры сделки.',
          ],
        },
        {
          heading: 'Часто задаваемые вопросы',
          paragraphs: [
            'Нужен ли вообще инвестиционный консультант, если я уже нашёл объект через застройщика? Стоит получить независимую оценку прежде, чем подписывать что-либо — консультант без интереса в конкретной сделке может честно сказать, справедлива ли цена и подходит ли структура сделки под ваши цели.',
            'Чем инвестиционный консультант отличается от обычного риелтора? Риелтор помогает найти и купить конкретный объект. Инвестиционный консультант сначала определяет стратегию (аренда, перепродажа, земля, коммерция) и уже под неё подбирает объект — задача шире, чем закрыть одну сделку.',
            'Сколько стоят услуги независимого консультанта? Модели различаются — от разовой консультации до полного сопровождения сделки. Уточняйте формат оплаты заранее и убедитесь, что понимаете, за что именно платите. И прежде, чем подписывать что-либо, стоит безопасно структурировать сам платёж — см. наш отдельный материал про [эскроу-счёта](/research/report/eskrou-schet-nedvizhimost-braziliya-zashchita-pokupatelya) как дополнительный уровень юридической защиты, и про [распознавание мошеннических схем](/research/report/kak-raspoznat-moshennichestvo-nedvizhimost-braziliya) до того, как вы до этого дошли.',
          ],
        },
        {
          heading: 'Наш подход в Plan B Brazil',
          paragraphs: [
            'Мы — независимый инвестиционный консультант по недвижимости Санта-Катарины: не привязаны к застройщикам, работаем с иностранными инвесторами, даём честный расчёт доходности и рисков по каждому объекту, говорим на русском, английском и португальском. Наши отчёты по районам и застройщикам построены на этой же логике — открытые данные, названные источники, честные предупреждения о рисках там, где они есть.',
            'Материал носит информационный характер и не является инвестиционной рекомендацией. Plan B Brazil выступает независимым советником и не является девелопером.',
          ],
        },
      ],
    },
  },
  'robson-nascimento-architect-jurere': {
    en: {
      sections: [
        {
          heading: "Who Is Robson Nascimento",
          paragraphs: [
            "Some architects design houses. Others become architects whose name is itself part of the property's price. After years working this market in Santa Catarina, I've become convinced: Robson Nascimento is the latter.",
            'Robson founded R. Nascimento Arquitetos in 1995, headquartered right in the heart of [Jurerê Internacional](/research/report/jurere-internacional-investment-guide). Today he runs the firm together with architect Caroline Dutra. Over 30 years — more than 400 completed projects, mostly in Jurerê and the island\'s north, but also across Brazil and abroad — Argentina, Paraguay, Uruguay, Greece, Germany.',
            'They work across five areas: residential architecture, interiors, commercial, hospitality, and — importantly — urban planning. TOP100, one of Brazil\'s most prestigious architecture awards — ten wins, ten years running, the most recent just recently. There\'s recognition at the state level too.',
          ],
        },
        {
          heading: 'Influence That Extends Beyond a Single Firm',
          paragraphs: [
            "I've been in this market long enough to notice: nearly every major developer in Florianópolis is connected to Robson's name in one way or another — from [CFL Construtora](/research/report/cfl-construtora-developer-review-2026)'s Jurerê-focused luxury portfolio to newer players like [Modulare](/research/report/modulare-incorporadora-developer-review-2026), whose Maxxi View project he designed. Sometimes he's the project's architect, sometimes a co-founder. And it's not just developers — city officials and the urban planning establishment take his opinion seriously too. That's a rare level of influence for a practicing architect.",
            'Over the past few years his focus has shifted: previously predominantly elite private homes in Jurerê, now increasingly large residential complexes and direct work with private clients, not only through developers. He works extensively in Jurerê, Canajuê, and Cachoeira do Bom Jesus — and not just as a hired architect, but often as a project co-founder.',
          ],
        },
        {
          heading: 'A Signature Style, Instantly Recognizable',
          paragraphs: [
            'His projects share a recognizable spatial logic. You walk into the house, and from a single point you can see nearly everything, every angle. Minimal walls, maximum air and light. That feeling repeats every time — the house seems to breathe.',
            'At a meeting once, I asked him directly: "Robson, honestly — what can\'t you imagine a Brazilian house without?" He didn\'t even pause: "A charcoal churrasqueira. And a pool." That was it. Those two things capture his whole philosophy — a home should work not just as architecture, but as a place to live that genuinely fits how people actually live here in Brazil.',
          ],
        },
        {
          heading: 'The Name Effect — a Real, Measurable Market Fact',
          paragraphs: [
            "Take two identical houses — one designed by Robson, one not. The one with his name will cost roughly 10% more. And that's not a developer markup — it's how the market itself, unprompted, values his work. In my own experience, units in complexes he's designed don't need advertising. They sell themselves while I'm still telling the client who the architect is.",
          ],
        },
        {
          heading: 'Landmark Projects',
          paragraphs: [
            'Among his work — Surfland (Garopaba), Flyville (a residential and aeronautical condominium — yes, you can literally keep a plane there), Residencial Jay and Maxxi View (both in Jurerê), Vistas Sambaqui with its 180° panorama of Sambaqui beach, and Trésor Résidence — luxury towers in European classical style.',
          ],
        },
        {
          heading: 'The Other Side of the Name Effect',
          paragraphs: [
            'And here\'s where I have to be honest, not just praise a man I personally consider a friend and genuinely respect. This is a general market pattern — not about any specific Robson Nascimento project.',
            'A well-known architect\'s name is a genuine asset. But that same market property sometimes gets used in ways that don\'t serve the investor. It happens like this: a project is objectively missing something — a mediocre location, a young and unproven developer, weak nearby infrastructure. And then a famous name gets brought in specifically to lend the project weight it doesn\'t otherwise have. The buyer\'s logic becomes: "well, the location isn\'t ideal, but the architect is famous — so it must be reliable." That\'s far from always justified, especially when you\'re thinking about resale.',
            "The problem doesn't surface at the moment of purchase. It surfaces later — when you try to sell that property, to an end buyer or another investor. And that's when you find out: a famous architect's name doesn't compensate for a weak location or an unreliable developer on the secondary market nearly as well as it worked during the developer's original sales push. Capital gets frozen. The property is hard to sell at the price you expected — precisely because the fundamentals, not the architecture, turned out weaker than they seemed at the start.",
          ],
        },
        {
          heading: 'What This Means for You as an Investor',
          paragraphs: [
            "An architect's name on a project is a real, measurable value factor. But not the only one, and definitely not one to rely on alone. Before buying a property where a famous name is the seller's main argument, always evaluate everything else separately and soberly: the location, the developer's reputation, real demand in that specific micro-neighborhood.",
            "This material is based on publicly available information and the author's personal professional experience. Plan B Brazil acts as an independent advisor and is not a developer.",
          ],
        },
      ],
    },
    ru: {
      sections: [
        {
          heading: 'Кто такой Робсон Насименто',
          paragraphs: [
            'Есть архитекторы, которые проектируют дома. А есть те, чьё имя само по себе становится частью цены объекта. За годы работы в Санта-Катарине я убедился: Робсон Насименто — из вторых.',
            'Бюро R. Nascimento Arquitetos Робсон основал в 1995 году, штаб-квартира — в самом сердце [Журере Интернасьонал](/research/report/jurere-internacional-investment-guide). Сегодня бюро он ведёт вместе с архитектором Каролиной Дутра. За 30 лет — больше 400 реализованных проектов, в основном в Журере и на севере острова, но также по всей Бразилии и за рубежом — в Аргентине, Парагвае, Уругвае, Греции, Германии.',
            'Работают по пяти направлениям: жилая архитектура, интерьеры, коммерция, отели и — что важно — градостроительство. TOP100 — одна из самых престижных архитектурных наград Бразилии — десять побед, десять лет подряд, последнюю получил совсем недавно. Есть признание и на уровне штата.',
          ],
        },
        {
          heading: 'Влияние, которое выходит за рамки одного бюро',
          paragraphs: [
            'Я работаю на этом рынке достаточно давно, чтобы заметить: практически все крупные застройщики Флорианополиса так или иначе связаны с именем Робсона — от люксового портфеля [CFL Construtora](/research/report/cfl-construtora-developer-review-2026), сфокусированного на Журере, до более новых игроков вроде [Modulare](/research/report/modulare-incorporadora-developer-review-2026), для которых он спроектировал Maxxi View. Иногда он — архитектор проекта, иногда — соучредитель. И дело не только в застройщиках — с его мнением считается и городская власть, и градостроительная сфера в целом. Это редкий уровень влияния для практикующего архитектора.',
            'За последние несколько лет его фокус сместился: раньше — преимущественно элитные частные дома в Журере, сейчас — всё больше крупных жилых комплексов и работа напрямую с частными клиентами, не только через застройщиков. Он плотно работает в Журере, Канажуре, Кашоэйра-ду-Бон-Жезус — и не просто как нанятый архитектор, а нередко как соучредитель проекта.',
          ],
        },
        {
          heading: 'Почерк, который узнаётся сразу',
          paragraphs: [
            'У его проектов узнаваемая логика пространства. Заходишь в дом — и с одной точки видно практически всё, все углы. Минимум перегородок, максимум воздуха и света. Это ощущение повторяется каждый раз — дом словно дышит.',
            'Однажды на встрече я спросил его напрямую: «Робсон, вот честно — без чего ты вообще не можешь представить дом в Бразилии?» Он даже не задумался: «Без шураскейры на углях. И без бассейна». Всё. В этих двух словах — вся его философия: дом должен работать не только как архитектура, а как место жизни, действительно соответствующее тому, как здесь, в Бразилии, живут.',
          ],
        },
        {
          heading: 'Эффект имени — реальный, измеримый рыночный факт',
          paragraphs: [
            'Возьмите два одинаковых дома — один спроектирован Робсоном, другой нет. Тот, что с его именем, будет стоить примерно на 10% дороже. И это не наценка застройщика — это то, как рынок сам, без подсказок, оценивает его работу. По моему собственному опыту — квартиры в комплексах, которые он проектировал, вообще не нуждаются в рекламе. Они продают себя сами, пока я просто рассказываю клиенту, кто архитектор.',
          ],
        },
        {
          heading: 'Знаковые проекты',
          paragraphs: [
            'Среди его работ — Surfland (Гарожаба), Flyville (жилой и авиационный кондоминиум — да, там буквально можно держать самолёт), Residencial Jay и Maxxi View (оба в Журере), Vistas Sambaqui с панорамой на 180° на пляж Самбаки, и Trésor Résidence — люксовые башни в европейском классическом стиле.',
          ],
        },
        {
          heading: 'Обратная сторона эффекта известного имени',
          paragraphs: [
            'Здесь я должен быть честным, а не просто хвалить человека, с которым лично дружу и которого искренне уважаю. Это общий паттерн рынка — не про конкретный проект Робсона Насименто.',
            'Известное имя архитектора — реальный актив. Но это же свойство рынка иногда используют не в интересах инвестора. Бывает так: у проекта объективно чего-то не хватает — так себе локация, молодой и непроверенный застройщик, слабая инфраструктура рядом. И тогда приглашают архитектора с именем именно для того, чтобы придать проекту вес, которого ему иначе не хватает. Логика покупателя становится: «ну, локация не идеальная, зато архитектор известный — значит, надёжно». Это далеко не всегда оправдано, особенно если думать о перепродаже.',
            'Проблема всплывает не в момент покупки. Она всплывает позже — когда вы пытаетесь этот объект продать — конечному покупателю или другому инвестору. И тут выясняется: известное имя архитектора не компенсирует слабую локацию или ненадёжного застройщика на вторичном рынке так же хорошо, как это работало на этапе продаж от застройщика. Капитал замораживается. Объект сложно продать по той цене, на которую вы рассчитывали.',
          ],
        },
        {
          heading: 'Что это значит для вас как инвестора',
          paragraphs: [
            'Имя архитектора на проекте — реальный, измеримый фактор стоимости. Но не единственный, и точно не тот, на который стоит полагаться в одиночку. Прежде чем покупать объект, где громкое имя — главный аргумент продавца, всегда советую отдельно и трезво оценить остальное: локацию, репутацию застройщика, реальный спрос в конкретном микрорайоне.',
            'Материал основан на общедоступной информации и личном профессиональном опыте автора. Plan B Brazil выступает независимым советником и не является девелопером.',
          ],
        },
      ],
    },
  },
};
