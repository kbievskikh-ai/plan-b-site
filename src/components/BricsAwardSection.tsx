'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';

// Extended BRICS Property Awards jury section, shown under the About block.
// STATUS NOTE: "invited"/"приглашённый"/"convidado" wording reflects that
// the offer contract with organizers is not yet signed. After signing and
// publication of the final jury list (expected after Aug 25, 2026), remove
// that word from this file AND from BricsAwardBadge.tsx (three languages,
// both files — six edits total).
const TEXT = {
  ru: {
    sectionLabel: 'Международное признание',
    pre: 'Константин приглашён в состав международного жюри премии ',
    link1: 'BRICS Property Awards',
    mid: ' и в деловую программу ',
    link2: 'Строительной недели BRICS',
    post: ' — крупного международного мероприятия, которое пройдёт в Казани 10–13 ноября 2026 года при поддержке Минстроя и МИД России. Это признание его экспертизы на рынке недвижимости Санта-Катарины на международном уровне.',
  },
  en: {
    sectionLabel: 'International Recognition',
    pre: 'Konstantin has been invited to join the international jury of the ',
    link1: 'BRICS Property Awards',
    mid: ' and the business program of ',
    link2: 'BRICS Construction Week',
    post: " — a major international event taking place in Kazan on November 10–13, 2026, supported by Russia's Ministry of Construction and Ministry of Foreign Affairs. This is international recognition of his expertise in the Santa Catarina real estate market.",
  },
  pt: {
    sectionLabel: 'Reconhecimento Internacional',
    pre: 'Konstantin foi convidado a integrar o júri internacional do ',
    link1: 'BRICS Property Awards',
    mid: ' e o programa de negócios da ',
    link2: 'Semana da Construção BRICS',
    post: ' — um grande evento internacional que acontecerá em Kazan de 10 a 13 de novembro de 2026, com apoio do Ministério da Construção e do Ministério das Relações Exteriores da Rússia. É um reconhecimento internacional da sua expertise no mercado imobiliário de Santa Catarina.',
  },
};

export default function BricsAwardSection() {
  const { language } = useLanguage();
  const t = TEXT[language] || TEXT.en;

  return (
    <section className="py-14 sm:py-16 bg-navy-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-gold-400/50" />
            <span className="text-gold-400 text-xs tracking-[0.25em] uppercase font-semibold">
              {t.sectionLabel}
            </span>
            <div className="w-8 h-[1px] bg-gold-400/50" />
          </div>
          <p className="text-white/70 text-base sm:text-lg leading-relaxed">
            {t.pre}
            <a
              href="https://bricsweek.ru/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-400 underline hover:no-underline"
            >
              {t.link1}
            </a>
            {t.mid}
            <a
              href="https://bricsweek.ru/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-400 underline hover:no-underline"
            >
              {t.link2}
            </a>
            {t.post}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
