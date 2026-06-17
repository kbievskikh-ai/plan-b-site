'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';

export default function ConsultationCTA() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-navy-950 to-navy-900 relative overflow-hidden">
      {/* Subtle top accent */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-gold-400" />
            <span className="text-gold-400 text-xs tracking-[0.25em] uppercase font-semibold">
              {t('contact.sectionLabel') || 'Get Started'}
            </span>
            <div className="w-8 h-[1px] bg-gold-400" />
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-white leading-tight">
            Ready to Discuss <span className="text-gold-400">Your Goals?</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/50 max-w-xl mx-auto leading-relaxed">
            Book a consultation and receive personalized guidance based on your investment objectives.
          </p>
        </motion.div>

        {/* CTA Cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-3 gap-5 max-w-2xl mx-auto"
        >
          {/* Book Consultation */}
          <motion.a
            href="https://cal.com/konstantin-bievskikh"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -4 }}
            className="group relative rounded-xl p-[1px] bg-gradient-to-b from-gold-400/40 via-gold-400/20 to-transparent hover:shadow-lg hover:shadow-gold-400/10"
          >
            <div className="bg-navy-900 rounded-xl p-6 flex flex-col items-center text-center h-full">
              <div className="w-14 h-14 rounded-full bg-gold-400/10 border border-gold-400/20 flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
              </div>
              <h3 className="font-heading text-white text-lg mb-2 group-hover:text-gold-400 transition-colors">
                Book Consultation
              </h3>
              <p className="text-white/50 text-xs leading-relaxed">
                Schedule a call to discuss your investment goals.
              </p>
            </div>
          </motion.a>

          {/* WhatsApp */}
          <motion.a
            href="https://wa.me/5548988117424"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -4 }}
            className="group relative rounded-xl p-[1px] bg-gradient-to-b from-green-400/40 via-green-400/20 to-transparent hover:shadow-lg hover:shadow-green-400/10"
          >
            <div className="bg-navy-900 rounded-xl p-6 flex flex-col items-center text-center h-full">
              <div className="w-14 h-14 rounded-full bg-green-400/10 border border-green-400/20 flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <h3 className="font-heading text-white text-lg mb-2 group-hover:text-green-400 transition-colors">
                WhatsApp
              </h3>
              <p className="text-white/50 text-xs leading-relaxed">
                Quick questions? Message us directly.
              </p>
            </div>
          </motion.a>

          {/* Download Guide */}
          <motion.a
            href="/Plan_B_Investment_Guide.pdf"
            download
            whileHover={{ y: -4 }}
            className="group relative rounded-xl p-[1px] bg-gradient-to-b from-amber-400/40 via-amber-400/20 to-transparent hover:shadow-lg hover:shadow-amber-400/10"
          >
            <div className="bg-navy-900 rounded-xl p-6 flex flex-col items-center text-center h-full">
              <div className="w-14 h-14 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
              </div>
              <h3 className="font-heading text-white text-lg mb-2 group-hover:text-amber-400 transition-colors">
                Download Guide
              </h3>
              <p className="text-white/50 text-xs leading-relaxed">
                Free Investment Guide for Brazil.
              </p>
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
