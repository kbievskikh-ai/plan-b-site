'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';

// "Professional Network" trust section: real photos with named industry
// contacts (real estate, legal, architecture, construction associations),
// plus a row of organization/event logos. Sits below the About/BRICS blocks.
// Photos: person + name + role, circular crop (consistent with existing
// avatar treatment elsewhere on the site). Logos: rectangular cards on a
// light plate so no logo gets cropped regardless of its native aspect ratio.

const PEOPLE = [
  { key: 'ildar', img: '/images/trust/ildar-khusainov.jpg' },
  { key: 'carlos', img: '/images/trust/carlos-leite.jpg' },
  { key: 'wilian', img: '/images/trust/wilian-campos.jpg' },
  { key: 'robson', img: '/images/trust/robson-nascimento.jpg' },
  { key: 'ilya', img: '/images/trust/ilya-piskulin.jpg' },
] as const;

const LOGOS = [
  { img: '/images/trust/bewiki-home.svg', alt: 'BeWiki', darkIcon: true },
  { img: '/images/trust/logo-real-parque.png', alt: 'Real Parque — Novo Norte' },
  { img: '/images/trust/logo-etazhi.jpg', alt: 'ЭТАЖИ (Etazhi)' },
  { img: '/images/trust/logo-sinduscon-fpolis.jpg', alt: 'SINDUSCON Grande Florianópolis' },
  { img: '/images/trust/logo-wk.jpg', alt: 'WK International Services' },
  { img: '/images/trust/logo-robson-studio.jpg', alt: 'R. Nascimento Arquitetura e Urbanismo' },
  { img: '/images/trust/logo-dvizhenie.jpg', alt: 'Dvizhenie Real Estate Forum' },
  { img: '/images/trust/logo-brics-week.jpg', alt: 'BRICS Construction Week' },
  { img: '/images/trust/logo-brics-awards.jpg', alt: 'BRICS Property Awards 2026' },
  { img: '/images/trust/logo-sinduscon-bc.jpg', alt: 'SINDUSCON Balneário Camboriú' },
  { img: '/images/trust/logo-kalinka.jpg', alt: 'Kalinka Group' },
  { img: '/images/trust/logo-swoi.jpg', alt: 'SWOI' },
  { img: '/images/trust/logo-mipif.jpg', alt: 'MIPIF' },
  { img: '/images/trust/logo-alphaplan.jpg', alt: 'Alphaplan' },
];

export default function TrustNetwork() {
  const { t } = useLanguage();

  return (
    <section className="py-16 sm:py-20 bg-navy-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-gold-500 text-sm font-semibold tracking-widest uppercase">
            {t('trustNetwork.sectionLabel')}
          </span>
          <h2 className="mt-3 font-heading text-3xl sm:text-4xl font-bold text-navy-900">
            {t('trustNetwork.title')}
          </h2>
          <p className="mt-4 text-navy-900/60 text-base leading-relaxed">
            {t('trustNetwork.subtitle')}
          </p>
        </motion.div>

        {/* People */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-6 mb-16">
          {PEOPLE.map((p, i) => (
            <motion.div
              key={p.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden ring-2 ring-gold-400/30 mb-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.img}
                  alt={t(`trustNetwork.people.${p.key}.name`)}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-navy-900 text-sm font-semibold leading-snug">
                {t(`trustNetwork.people.${p.key}.name`)}
              </div>
              <div className="text-navy-900/55 text-xs mt-1 leading-snug max-w-[11rem]">
                {t(`trustNetwork.people.${p.key}.role`)}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Logos */}
        <div>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-navy-900/15" />
            <span className="text-navy-900/40 text-xs tracking-[0.2em] uppercase font-semibold">
              {t('trustNetwork.industryLabel')}
            </span>
            <div className="w-8 h-[1px] bg-navy-900/15" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {LOGOS.map((logo) => (
              <div
                key={logo.alt}
                className="bg-white rounded-xl border border-navy-100 h-20 flex items-center justify-center px-4 py-3 hover:shadow-md transition-shadow duration-300"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo.img}
                  alt={logo.alt}
                  className="max-w-full max-h-full object-contain"
                  style={'darkIcon' in logo && logo.darkIcon ? { color: '#14213D' } : undefined}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
