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

export const REPORT_CONTENT: Record<string, ReportContent> = {
  // ПРИМЕР структуры (удалить и заменить реальными данными):
  //
  // 'jurere-investment-report': {
  //   sections: [
  //     {
  //       heading: 'Market Overview',
  //       paragraphs: [
  //         'Jurerê is one of Florianópolis's most established premium beach districts...',
  //         'Average pricing sits at R$14,400/m², below the R$20,000+/m² ceiling...',
  //       ],
  //     },
  //     {
  //       heading: 'Who Invests Here',
  //       paragraphs: ['...'],
  //     },
  //     {
  //       heading: 'Risks',
  //       paragraphs: ['...'],
  //     },
  //   ],
  // },
};
