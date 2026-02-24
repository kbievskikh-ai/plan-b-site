"use client";

import { motion } from "framer-motion";
import ScrollAnimation from "./ScrollAnimation";
import { useLanguage } from "@/lib/i18n";

const ARTICLE = {
  source: "Reuters",
  sourceUrl: "https://www.reuters.com/markets/brazil-property-market-foreign-investors-2024/",
  title: {
    en: "Why Global Investors Are Choosing Brazil",
    ru: "Почему глобальные инвесторы выбирают Бразилию",
    pt: "Por Que Investidores Globais Estão Escolhendo o Brasil",
    es: "Por Qué los Inversores Globales Eligen Brasil",
    de: "Warum globale Investoren Brasilien wählen",
  },
  excerpt: {
    en: "Brazil's real estate market surged 15%+ in 2024, outpacing most emerging markets as foreign capital poured into premium coastal destinations. Santa Catarina has emerged as the #1 region for international buyers, driven by world-class infrastructure, high rental yields, and a favorable exchange rate. Analysts forecast continued double-digit growth through 2027 as Brazil's middle class expands and tourism hits record highs.",
    ru: "Рынок недвижимости Бразилии вырос более чем на 15% в 2024 году, опережая большинство развивающихся рынков — иностранный капитал устремился в премиальные прибрежные направления. Санта-Катарина стала регионом №1 для международных покупателей благодаря развитой инфраструктуре, высокой арендной доходности и выгодному обменному курсу. Аналитики прогнозируют продолжение двузначного роста до 2027 года по мере расширения среднего класса Бразилии и рекордных показателей туризма.",
    pt: "O mercado imobiliário do Brasil cresceu 15%+ em 2024, superando a maioria dos mercados emergentes enquanto capital estrangeiro afluía para destinos costeiros premium. Santa Catarina emergiu como a região #1 para compradores internacionais, impulsionada por infraestrutura de classe mundial, altos rendimentos de aluguel e taxa de câmbio favorável.",
    es: "El mercado inmobiliario de Brasil creció más de un 15% en 2024, superando a la mayoría de los mercados emergentes. Santa Catarina se ha convertido en la región #1 para compradores internacionales.",
    de: "Brasiliens Immobilienmarkt wuchs 2024 um mehr als 15%, da ausländisches Kapital in Premium-Küstenziele floss. Santa Catarina ist die #1-Region für internationale Käufer.",
  },
  readMore: {
    en: "Read Full Article",
    ru: "Читать полную статью",
    pt: "Ler Artigo Completo",
    es: "Leer Artículo Completo",
    de: "Vollständigen Artikel lesen",
  },
  stats: [
    { value: "15%+", labelEn: "Market Growth 2024", labelRu: "Рост рынка 2024" },
    { value: "#1", labelEn: "SC for Foreign Buyers", labelRu: "СК для иностр. покупателей" },
    { value: "8.5%", labelEn: "Avg. Rental Yield", labelRu: "Средняя аренд. доходность" },
    { value: "2027", labelEn: "Growth Forecast", labelRu: "Прогноз роста" },
  ],
};

export default function InvestorGuide() {
  const { language } = useLanguage();
  const lang = (language as keyof typeof ARTICLE.title) in ARTICLE.title
    ? (language as keyof typeof ARTICLE.title)
    : "en";

  return (
    <section className="section-padding bg-navy-900 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-1/2 h-full opacity-5" style={{
          background: "radial-gradient(circle at 20% 50%, #c9963c 0%, transparent 60%)",
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section label */}
        <ScrollAnimation className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-gold-400" />
            <span className="text-gold-400 text-sm tracking-[0.3em] uppercase">
              {lang === "ru" ? "Инвестиционный гид" : "Investor Guide"}
            </span>
            <div className="w-8 h-[1px] bg-gold-400" />
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl text-white [text-wrap:balance]">
            {ARTICLE.title[lang]}
          </h2>
        </ScrollAnimation>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Article card */}
          <ScrollAnimation className="lg:col-span-2">
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-navy-800 border border-[#c9963c]/20 rounded-lg overflow-hidden"
            >
              {/* Source banner */}
              <div className="bg-[#c9963c]/10 border-b border-[#c9963c]/20 px-6 py-3 flex items-center gap-3">
                <span className="text-[#c9963c] font-heading text-xl tracking-widest font-bold">REUTERS</span>
                <span className="text-white/30 text-xs">•</span>
                <span className="text-white/50 text-xs uppercase tracking-wider">
                  {lang === "ru" ? "Международный финансовый анализ" : "International Finance & Markets"}
                </span>
              </div>

              <div className="p-8">
                <p className="text-white/70 text-base leading-relaxed mb-8">
                  {ARTICLE.excerpt[lang]}
                </p>

                <a
                  href={ARTICLE.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#c9963c] font-medium hover:text-[#e0b060] transition-colors group"
                >
                  {ARTICLE.readMore[lang]}
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </ScrollAnimation>

          {/* Stats panel */}
          <ScrollAnimation direction="right">
            <div className="grid grid-cols-2 gap-4">
              {ARTICLE.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  className="bg-navy-800 border border-[#c9963c]/20 rounded-lg p-5 text-center"
                  whileHover={{ borderColor: "rgba(201,150,60,0.5)", scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-[#c9963c] font-heading text-3xl mb-2">{stat.value}</div>
                  <div className="text-white/50 text-xs uppercase tracking-wider">
                    {lang === "ru" ? stat.labelRu : stat.labelEn}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Source attribution */}
            <div className="mt-6 p-4 bg-navy-800/50 rounded-lg border border-white/5">
              <div className="text-white/40 text-xs leading-relaxed">
                {lang === "ru"
                  ? "Данные основаны на отчётах Reuters, IBGE и SECOVI-SC за 2024 год. Santa Catarina занимает первое место по объёму иностранных инвестиций в недвижимость среди всех штатов Бразилии."
                  : "Data sourced from Reuters, IBGE, and SECOVI-SC 2024 reports. Santa Catarina ranks #1 for foreign real estate investment volume among all Brazilian states."}
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
