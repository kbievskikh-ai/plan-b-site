"use client";

import { motion } from "framer-motion";
import ScrollAnimation from "./ScrollAnimation";
import { useLanguage } from "@/lib/i18n";

export default function AboutMigronis() {
  const { t } = useLanguage();

  const stats = [
    { value: "10+", label: t('about.yearsExperience') },
    { value: "500+", label: t('about.propertiesSold') },
    { value: "25+", label: t('about.countriesServed') },
    { value: "$150M+", label: t('about.transactionVolume') },
  ];

  const differentiators = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      ),
      title: t('about.internationalExpertise'),
      desc: t('about.internationalExpertiseDesc'),
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      title: t('about.endToEndService'),
      desc: t('about.endToEndServiceDesc'),
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
        </svg>
      ),
      title: t('about.dataDrivenApproach'),
      desc: t('about.dataDrivenApproachDesc'),
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
      title: t('about.localPartnerships'),
      desc: t('about.localPartnershipsDesc'),
    },
  ];

  return (
    <section id="about" className="section-padding bg-navy-900 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-1 gold-gradient" />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gold-500/5 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div>
            <ScrollAnimation>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[1px] bg-gold-400" />
                <span className="text-gold-400 text-sm tracking-[0.3em] uppercase">{t('about.sectionLabel')}</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-white mb-6 leading-tight [text-wrap:balance]">
                {t('about.title')}
                <br />
                <span className="text-gold-400">{t('about.titleHighlight')}</span>
              </h2>
              <p className="text-white/60 text-lg mb-8 leading-relaxed">
                {t('about.description1')}
              </p>
              <p className="text-white/50 mb-10 leading-relaxed">
                {t('about.description2')}
              </p>
            </ScrollAnimation>

            {/* Stats */}
            <ScrollAnimation delay={0.2}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl md:text-4xl font-heading text-gold-400 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-white/50 text-xs tracking-wider uppercase">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollAnimation>
          </div>

          {/* Right - Differentiators */}
          <div className="space-y-6">
            {differentiators.map((item, index) => (
              <ScrollAnimation key={item.title} delay={index * 0.1} direction="right">
                <motion.div
                  className="flex gap-5 p-6 border border-white/10 hover:border-gold-400/30 hover:bg-white/5 transition-all duration-300 group"
                  whileHover={{ x: 10 }}
                >
                  <div className="w-12 h-12 flex-shrink-0 border border-gold-400/30 flex items-center justify-center text-gold-400 group-hover:bg-gold-400 group-hover:text-navy-900 transition-all duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-heading text-lg text-white mb-2 group-hover:text-gold-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              </ScrollAnimation>
            ))}
          </div>
        </div>

        {/* CTA */}
        <ScrollAnimation className="text-center mt-16">
          <a href="#contact" className="btn-gold inline-block">
            {t('about.requestConsultation')}
          </a>
        </ScrollAnimation>
      </div>
    </section>
  );
}
