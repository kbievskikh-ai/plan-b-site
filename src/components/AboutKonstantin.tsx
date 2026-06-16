'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';

export default function AboutKonstantin() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-navy-900">
                <img
                  src="/images/konstantin.jpg"
                  alt="Konstantin - Plan B Brazil"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Accent border */}
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl border-2 border-gold-500/30 -z-10" />
            </div>
          </motion.div>

          {/* Right: Story */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-gold-500 text-sm font-semibold tracking-widest uppercase">
              {t('about.konstantin.label')}
            </span>
            <h2 className="mt-3 font-heading text-3xl sm:text-4xl font-bold text-navy-900 leading-tight">
              {t('about.konstantin.title1')}{' '}
              <span className="text-gold-500">{t('about.konstantin.titleHighlight')}</span>
            </h2>

            <div className="mt-6 space-y-4 text-navy-900/70 text-base leading-relaxed">
              <p>{t('about.konstantin.p1')}</p>
              <p>{t('about.konstantin.p2')}</p>
              <p>{t('about.konstantin.p3')}</p>
            </div>

            {/* Trust badges */}
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="bg-gold-50 px-4 py-3 rounded-lg border border-gold-200">
                <div className="text-gold-700 text-sm font-semibold">CRECI-SC 59616</div>
                <div className="text-gold-600/70 text-xs">Licensed in Santa Catarina</div>
              </div>
              <div className="bg-navy-50 px-4 py-3 rounded-lg border border-navy-100">
                <div className="text-navy-700 text-sm font-semibold">Florianópolis, SC</div>
                <div className="text-navy-600/70 text-xs">Based on the ground</div>
              </div>
              <div className="bg-navy-50 px-4 py-3 rounded-lg border border-navy-100">
                <div className="text-navy-700 text-sm font-semibold">EN · RU · PT</div>
                <div className="text-navy-600/70 text-xs">Three languages</div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <a
                href="https://wa.me/5548988117424"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-block"
              >
                {t('about.konstantin.cta')}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
