import type { RentalYieldCard, RentalYieldReportContent } from '@/data/rental-yield-report-content';

// Полный визуальный рендер Rental Yield Report на сайте (не только текст-заглушка).
// Переиспользуется дважды на странице: один раз для видимого языка, один раз
// (sr-only) для языка-конкурента, чтобы обе версии оставались индексируемы.
// Никаких новых графиков не рисуется — барчарт и сезонность это готовые PNG,
// сгенерированные тем же скриптом, что собирает PDF (matplotlib), просто <img>.

const CATEGORY_STYLES: Record<string, string> = {
  favorite: 'border-l-4 border-emerald-500 bg-emerald-500/5',
  gold: 'border-l-4 border-gold-400 bg-gold-400/5',
  resale: 'border-l-4 border-white/30 bg-white/5',
};

const CATEGORY_TAG_STYLES: Record<string, string> = {
  favorite: 'bg-emerald-500 text-white',
  gold: 'bg-gold-400 text-navy-950',
  resale: 'bg-white/30 text-white',
};

function DistrictCard({ c, labels, colEntry, colHorizon, colDriver }: {
  c: RentalYieldCard;
  labels: Record<string, string>;
  colEntry: string;
  colHorizon: string;
  colDriver: string;
}) {
  const isHold = c.horizon !== undefined;
  return (
    <div className={`rounded-lg p-5 mb-4 ${CATEGORY_STYLES[c.category] || CATEGORY_STYLES.resale}`}>
      <div className="flex justify-between items-start gap-3 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-serif text-lg text-white">{c.name}</span>
          <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded ${CATEGORY_TAG_STYLES[c.category] || CATEGORY_TAG_STYLES.resale}`}>
            {labels[c.category] || c.category}
          </span>
        </div>
        <span className="text-sm italic text-white/70 text-right">{c.verdict}</span>
      </div>
      {isHold ? (
        <div className="grid grid-cols-2 gap-3 mb-2">
          <div className="bg-white/5 rounded p-2 text-center">
            <div className="font-serif text-base text-white">{c.entry}</div>
            <div className="text-[10px] text-white/50 uppercase">{colEntry}</div>
          </div>
          <div className="bg-white/5 rounded p-2 text-center">
            <div className="font-serif text-base text-gold-400">{c.horizon}</div>
            <div className="text-[10px] text-white/50 uppercase">{colHorizon}</div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3 mb-2">
          <div className="bg-white/5 rounded p-2 text-center">
            <div className="font-serif text-base text-white">{c.entry}</div>
            <div className="text-[10px] text-white/50 uppercase">Entry</div>
          </div>
          <div className="bg-white/5 rounded p-2 text-center">
            <div className="font-serif text-base text-gold-400">{c.net}</div>
            <div className="text-[10px] text-white/50 uppercase">Net Yield</div>
          </div>
          <div className="bg-white/5 rounded p-2 text-center">
            <div className="font-serif text-base text-white">{c.occ}</div>
            <div className="text-[10px] text-white/50 uppercase">Occupancy</div>
          </div>
        </div>
      )}
      {isHold && c.driver && (
        <div className="text-xs text-white/60 italic mb-2">
          <b className="not-italic text-gold-400">{colDriver}:</b> {c.driver}
        </div>
      )}
      <div className="text-sm text-white/70 leading-relaxed">{c.summary}</div>
    </div>
  );
}

export default function RentalYieldReportBody({ data }: { data: RentalYieldReportContent }) {
  return (
    <div className="prose prose-invert max-w-none">
      {/* ===== Thesis + gap chart ===== */}
      <section className="mb-10">
        <h2 className="text-2xl font-serif text-white mb-4">{data.thesis.title}</h2>
        <p className="text-white/70 leading-relaxed mb-4">{data.thesis.lede}</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={data.thesis.chartImage} alt={data.thesis.title} className="w-full rounded-lg mb-2 not-prose" />
        <p className="text-xs text-white/40 italic mb-4">{data.thesis.chartCaption}</p>
        <div className="border-l-4 border-gold-400 bg-white/5 rounded p-4 text-sm text-white/80 leading-relaxed">
          <b className="text-gold-400">Plan B:</b> {data.thesis.execSummary}
        </div>
      </section>

      {/* ===== Yield table ===== */}
      <section className="mb-10">
        <h2 className="text-2xl font-serif text-white mb-4">{data.table.title}</h2>
        <div className="overflow-x-auto not-prose">
          <table className="w-full text-sm border-collapse mb-3">
            <thead>
              <tr className="bg-navy-800 text-gold-400 text-xs uppercase tracking-wide">
                {data.table.columns.map((c, i) => (
                  <th key={i} className="text-left px-3 py-2 font-semibold">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.table.rows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white/5' : ''}>
                  {row.map((cell, j) => (
                    <td key={j} className={`px-3 py-2 text-white/80 ${j === 5 ? 'text-gold-400 font-semibold' : ''}`}>
                      {j === 0 ? <b className="text-white">{cell}</b> : cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-white/40 italic mb-6">{data.table.note}</p>

        <h3 className="text-lg font-serif text-white mb-3">{data.funnel.title}</h3>
        <p className="text-white/70 text-sm leading-relaxed mb-4">{data.funnel.intro}</p>
        <div className="grid md:grid-cols-2 gap-6 mb-4 not-prose">
          <div>
            <div className="font-semibold text-white text-sm mb-2">{data.funnel.onetimeTitle}</div>
            {data.funnel.onetime.map((item, i) => (
              <div key={i} className="border-l-4 border-gold-400 bg-white/5 rounded p-3 mb-2 text-sm">
                <b className="text-white block mb-1">{item.t}</b>
                <span className="text-white/60">{item.d}</span>
              </div>
            ))}
          </div>
          <div>
            <div className="font-semibold text-white text-sm mb-2">{data.funnel.annualTitle}</div>
            {data.funnel.annual.map((item, i) => (
              <div key={i} className="border-l-4 border-gold-400 bg-white/5 rounded p-3 mb-2 text-sm">
                <b className="text-white block mb-1">{item.t}</b>
                <span className="text-white/60">{item.d}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-navy-800 rounded-lg p-5 mb-3 not-prose">
          <div className="text-gold-400 font-bold text-xs uppercase tracking-wide mb-2">{data.funnel.keyInsightLabel}</div>
          <div className="text-white/85 text-sm leading-relaxed">{data.funnel.keyInsight}</div>
        </div>
        <p className="text-xs text-white/40 italic">{data.funnel.footnote}</p>
      </section>

      {/* ===== Seasonality ===== */}
      <section className="mb-10">
        <h2 className="text-2xl font-serif text-white mb-4">{data.seasonality.title}</h2>
        <p className="text-white/70 leading-relaxed mb-4">{data.seasonality.intro}</p>
        <p className="text-center text-gold-400 italic text-sm mb-2">{data.seasonality.chartCaption}</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={data.seasonality.chartImage} alt={data.seasonality.title} className="w-full rounded-lg mb-4 not-prose" />
        <div className="grid grid-cols-3 gap-3 mb-4 not-prose">
          {data.seasonality.stats.map((s, i) => (
            <div key={i} className="bg-white/5 rounded-lg p-3 text-center">
              <div className="font-serif text-base text-white">{s.v}</div>
              <div className="text-[10px] text-white/50 uppercase">{s.l}</div>
              {s.l2 && <div className="text-[10px] text-white/30">{s.l2}</div>}
            </div>
          ))}
        </div>
        <div className="border-l-4 border-gold-400 bg-white/5 rounded p-4 text-sm text-white/80 leading-relaxed mb-4">
          {data.seasonality.note}
        </div>
        <div className="bg-navy-800 rounded-lg p-5 mb-3 not-prose">
          <div className="text-gold-400 font-bold text-xs uppercase tracking-wide mb-2">{data.seasonality.keyInsightLabel}</div>
          <div className="text-white/85 text-sm leading-relaxed">{data.seasonality.tieIn}</div>
        </div>
        <p className="text-xs text-white/40 italic">{data.seasonality.sourceNote}</p>
      </section>

      {/* ===== Island cards ===== */}
      <section className="mb-10">
        <h2 className="text-2xl font-serif text-white mb-4">{data.islandTitle}</h2>
        <div className="not-prose">
          {data.islandCards.map((c, i) => (
            <DistrictCard key={i} c={c} labels={data.categoryLabels}
              colEntry={data.mainlandColEntry} colHorizon={data.mainlandColHorizon} colDriver={data.mainlandColDriver} />
          ))}
        </div>
        <p className="text-xs text-white/40 italic">{data.islandFootnote}</p>
      </section>

      {/* ===== Mainland cards ===== */}
      <section className="mb-10">
        <h2 className="text-2xl font-serif text-white mb-4">{data.mainlandTitle}</h2>
        <p className="text-white/70 leading-relaxed mb-4">{data.mainlandIntro}</p>
        <div className="not-prose">
          {data.mainlandCards.map((c, i) => (
            <DistrictCard key={i} c={c} labels={data.categoryLabels}
              colEntry={data.mainlandColEntry} colHorizon={data.mainlandColHorizon} colDriver={data.mainlandColDriver} />
          ))}
        </div>
      </section>

      {/* ===== Caution ===== */}
      <section className="mb-10">
        <h2 className="text-2xl font-serif text-white mb-4">{data.caution.title}</h2>
        <div className="border-l-4 border-gold-400 bg-white/5 rounded p-4 text-sm text-white/70 italic leading-relaxed mb-4">
          {data.caution.disclaimer}
        </div>
        <div className="not-prose">
          {data.caution.items.map((c, i) => (
            <div key={i} className="flex flex-wrap items-baseline gap-2 bg-white/5 border border-white/10 rounded p-3 mb-2 text-sm">
              <span className="font-bold text-white">{c.t}</span>
              <span className="font-bold text-gold-400">{c.verdict}</span>
              <span className="text-white/60">— {c.note}</span>
            </div>
          ))}
        </div>
        <div className="border-l-4 border-gold-400 bg-white/5 rounded p-4 text-sm text-white/80 leading-relaxed mt-4 mb-8">
          {data.caution.thread}
        </div>

        <h3 className="text-lg font-serif text-white mb-3">{data.methodology.title}</h3>
        <ul className="text-sm text-white/70 leading-relaxed list-disc pl-5">
          {data.methodology.items.map((m, i) => <li key={i}>{m}</li>)}
        </ul>
      </section>
    </div>
  );
}
