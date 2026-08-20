"use client";

import { useLanguage } from "@/lib/i18n";

interface HeroProps {
  mediaUrl?: string;
  mediaType?: 'gradient' | 'image' | 'video' | string;
}

export default function Hero({ mediaUrl, mediaType }: HeroProps) {
  const { t } = useLanguage();
  const hasVideo = mediaType === 'video' && !!mediaUrl;
  const hasImage = mediaType === 'image' && !!mediaUrl;

  return (
    <section className="relative h-screen min-h-[700px] flex items-center pt-24 sm:pt-32 bg-navy-900 overflow-hidden">
      {/* Video/image/gradient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/60 via-navy-900/40 to-navy-900 z-10" />

        {hasVideo ? (
          /* Actual video background */
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          >
            <source src={mediaUrl} type="video/mp4" />
          </video>
        ) : hasImage ? (
          /* Static hero image background */
          <img
            src={mediaUrl}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          /* Placeholder with gradient simulating aerial beach video */
          <div
            className="w-full h-full"
            style={{
              background:
                "linear-gradient(135deg, #0a1628 0%, #0d2137 25%, #0f2d4a 45%, #1a4a5e 60%, #2a7a7a 75%, #1a5a5a 100%)",
            }}
          />
        )}

        {/* Play button overlay (only show for gradient placeholder, no real media) */}
        {!hasVideo && !hasImage && (
          <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-500">
            <button aria-label="Play video" className="w-20 h-20 rounded-full border-2 border-white/40 flex items-center justify-center backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-colors">
              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="hero-anim-eyebrow flex items-center gap-3 mb-6">
            <div className="w-12 h-[1px] bg-gold-400" />
            <span className="text-gold-400 text-sm tracking-[0.3em] uppercase font-medium">
              {t('hero.location')}
            </span>
          </div>

          {/* Heading — no fade-in animation: this is the LCP element and must
              paint immediately without waiting on JS hydration. */}
          <h1
            className="font-heading text-3xl sm:text-5xl lg:text-7xl text-white leading-[1.1] mb-4 sm:mb-6 [text-wrap:balance]"
          >
            {t('hero.title1')}
            <br />
            <span className="text-gold-400">{t('hero.title2')}</span>
            <br />
            {t('hero.title3')}
          </h1>

          {/* Subtitle */}
          <p className="hero-anim-subtitle text-white/60 text-sm sm:text-xl max-w-xl mb-6 sm:mb-10 leading-relaxed">
            {t('hero.subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="hero-anim-cta flex flex-col sm:flex-row gap-4">
            <a
              href="#calculator"
              className="btn-gold text-center transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              {t('hero.calculateInvestment')}
            </a>
            <a
              href="https://wa.me/5548988117424" target="_blank" rel="noopener noreferrer"
              className="btn-outline text-center transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              {t('hero.requestConsultation')}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-anim-scroll absolute bottom-8 left-1/2 -translate-x-1/2 z-30 hidden sm:flex flex-col items-center gap-2">
        <span className="text-white/50 text-xs tracking-widest uppercase">{t('hero.scroll')}</span>
        <div className="hero-anim-scroll-bar w-[1px] h-8 bg-gradient-to-b from-gold-400/60 to-transparent" />
      </div>
    </section>
  );
}
