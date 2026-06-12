"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

interface HeroProps {
  videoUrl?: string;
}

export default function Hero({ videoUrl }: HeroProps) {
  const { t } = useLanguage();
  
  return (
    <section className="relative h-screen min-h-[700px] flex items-center pt-24 sm:pt-32 bg-navy-900 overflow-hidden">
      {/* Video/placeholder background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/60 via-navy-900/40 to-navy-900 z-10" />
        
        {videoUrl ? (
          /* Actual video background */
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : (
          /* Placeholder with gradient simulating aerial beach video */
          <motion.div
            className="w-full h-full"
            style={{
              background:
                "linear-gradient(135deg, #0a1628 0%, #0d2137 25%, #0f2d4a 45%, #1a4a5e 60%, #2a7a7a 75%, #1a5a5a 100%)",
            }}
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
            }}
            transition={{
              duration: 20,
              ease: "linear",
              repeat: Infinity,
            }}
          />
        )}
        
        {/* Play button overlay (only show when no video) */}
        {!videoUrl && (
          <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-500">
            <button className="w-20 h-20 rounded-full border-2 border-white/40 flex items-center justify-center backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-colors">
              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left: Text */}
          <div className="max-w-xl">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-12 h-[1px] bg-gold-400" />
              <span className="text-gold-400 text-sm tracking-[0.3em] uppercase font-medium">
                {t('hero.location')}
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-heading text-3xl sm:text-5xl lg:text-7xl text-white leading-[1.1] mb-4 sm:mb-6 [text-wrap:balance]"
            >
              {t('hero.title1')}
              <br />
              <span className="text-gold-400">{t('hero.title2')}</span>
              <br />
              {t('hero.title3')}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-white/60 text-sm sm:text-xl max-w-xl mb-6 sm:mb-10 leading-relaxed"
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.a
                href="#calculator"
                className="btn-gold text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('hero.calculateInvestment')}
              </motion.a>
              <motion.a
                href="https://wa.me/5548988117424" target="_blank" rel="noopener noreferrer"
                className="btn-outline text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('hero.requestConsultation')}
              </motion.a>
            </motion.div>
          </div>

          {/* Right: Floating video card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hidden lg:block relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-gold-500/20 border border-gold-500/30 aspect-video bg-navy-950">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/videos/hero-jurere.mp4" type="video/mp4" />
              </video>
            </div>
            {/* Accent border */}
            <div className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border-2 border-gold-500/20 -z-10" />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 hidden sm:flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs tracking-widest uppercase">{t('hero.scroll')}</span>
        <motion.div
          className="w-[1px] h-8 bg-gradient-to-b from-gold-400/60 to-transparent"
          animate={{ scaleY: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
