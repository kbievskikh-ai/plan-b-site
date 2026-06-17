"use client";

import { motion } from "framer-motion";
import ScrollAnimation from "./ScrollAnimation";
import { useLanguage } from "@/lib/i18n";

export default function WhyBrazil() {
  const { t } = useLanguage();

  const reasons = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: t('whyBrazil.reason1Title'),
      desc: t('whyBrazil.reason1Desc'),
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: t('whyBrazil.reason2Title'),
      desc: t('whyBrazil.reason2Desc'),
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: t('whyBrazil.reason3Title'),
      desc: t('whyBrazil.reason3Desc'),
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: t('whyBrazil.reason4Title'),
      desc: t('whyBrazil.reason4Desc'),
    },
  ];

  return (
    <section id="investment" className="section-padding bg-navy-900 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-5">
        <div className="w-full h-full" style={{
          background: "radial-gradient(circle at 70% 30%, #c9963c 0%, transparent 60%)",
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <ScrollAnimation>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[1px] bg-gold-400" />
                <span className="text-gold-400 text-sm tracking-[0.3em] uppercase">{t('whyBrazil.sectionLabel')}</span>
                <div className="w-8 h-[1px] bg-gold-400" />
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-white mb-6 leading-tight [text-wrap:balance]">
                {t('whyBrazil.title1')}{" "}
                <span className="text-gold-400">{t('whyBrazil.titleHighlight')}</span>
              </h2>
              <p className="text-white/60 text-lg mb-12 leading-relaxed">
                {t('whyBrazil.subtitle')}
              </p>
            </ScrollAnimation>

            <div className="grid sm:grid-cols-2 gap-8">
              {reasons.map((reason, i) => (
                <ScrollAnimation key={i} delay={i * 0.1}>
                  <motion.div className="group" whileHover={{ x: 5 }}>
                    <div className="text-gold-400 mb-3 group-hover:scale-110 transition-transform duration-300 inline-block">
                      {reason.icon}
                    </div>
                    <h3 className="text-white font-medium mb-2 text-lg">{reason.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{reason.desc}</p>
                  </motion.div>
                </ScrollAnimation>
              ))}
            </div>
          </div>

          <ScrollAnimation direction="right">
            <div className="relative">
              {/* Video background */}
              <div className="aspect-[4/5] rounded-2xl overflow-hidden relative">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="/videos/hero-jurere.mp4" type="video/mp4" />
                </video>
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Stats overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-gold-400 font-heading text-xl">35%</div>
                      <div className="text-white/70 text-[10px] tracking-wider uppercase mt-1">{t('whyBrazil.stat1Label')}</div>
                    </div>
                    <div>
                      <div className="text-gold-400 font-heading text-xl">#1</div>
                      <div className="text-white/70 text-[10px] tracking-wider uppercase mt-1">{t('whyBrazil.stat2Label')}</div>
                    </div>
                    <div>
                      <div className="text-gold-400 font-heading text-xl">8.2%</div>
                      <div className="text-white/70 text-[10px] tracking-wider uppercase mt-1">{t('whyBrazil.stat3Label')}</div>
                    </div>
                    <div>
                      <div className="text-gold-400 font-heading text-xl">$200K</div>
                      <div className="text-white/70 text-[10px] tracking-wider uppercase mt-1">{t('whyBrazil.stat4Label')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>

        <ScrollAnimation className="text-center mt-16">
          <a href="https://wa.me/5548988117424" target="_blank" rel="noopener noreferrer" className="btn-gold inline-block">
            {t('whyBrazil.cta')}
          </a>
        </ScrollAnimation>

        {/* Small secondary CTA: Official Santa Catarina Video */}
        <ScrollAnimation className="text-center mt-8">
          <a
            href="https://www.youtube.com/watch?v=EXAMPLE"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/40 hover:text-gold-400 text-sm transition-colors duration-300 group"
          >
            <svg className="w-5 h-5 text-red-500 group-hover:text-red-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Watch Official Santa Catarina Overview
            <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </ScrollAnimation>
      </div>
    </section>
  );
}
