'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/lib/i18n';

// Promo block for Real Parque / BeWiki, replacing the old "Personalized
// Recommendations" (PropertyFinder) section on the homepage. Mirrors the
// hero of /real-parque.html (video background, shade, heading, CTAs, logo
// strip, KPI row) but stays inside the homepage container with rounded
// corners instead of a full-bleed section.
//
// Video is lazy: it only starts loading/playing once the block scrolls into
// view (IntersectionObserver), uses the 720p file on narrow viewports, and
// is skipped entirely for prefers-reduced-motion users (poster only).

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

function pushDataLayer(event: string) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event });
}

export default function RealParquePromo() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Always link to the Russian page regardless of site language (per spec).
  const href = '/real-parque.html';
  const hrefVillas = '/real-parque.html#villas';

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mql.matches);
    const mqlMobile = window.matchMedia('(max-width: 760px)');
    setIsMobile(mqlMobile.matches);
    const onChange = () => setReducedMotion(mql.matches);
    const onChangeMobile = () => setIsMobile(mqlMobile.matches);
    mql.addEventListener?.('change', onChange);
    mqlMobile.addEventListener?.('change', onChangeMobile);
    return () => {
      mql.removeEventListener?.('change', onChange);
      mqlMobile.removeEventListener?.('change', onChangeMobile);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setShouldLoadVideo(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoadVideo(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    if (shouldLoadVideo && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [shouldLoadVideo]);

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-20"
      aria-label="Real Parque"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-[#14213D] text-[#F7F5F0]">
          {!reducedMotion && shouldLoadVideo && (
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              muted
              loop
              playsInline
              preload="none"
              poster="/real-parque/video/poster.jpg"
              aria-hidden="true"
            >
              <source
                src={isMobile ? '/real-parque/video/video-720.mp4' : '/real-parque/video/video-1080.mp4'}
                type="video/mp4"
              />
            </video>
          )}
          {/* Poster fallback: always rendered, hidden once video plays, shown for reduced-motion users */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/real-parque/video/poster.jpg"
            alt="Real Parque"
            className={`absolute inset-0 w-full h-full object-cover ${!reducedMotion && shouldLoadVideo ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, rgba(14,22,42,.92) 0%, rgba(14,22,42,.72) 45%, rgba(14,22,42,.18) 100%)',
            }}
          />

          <div className="relative px-5 py-9 sm:px-11 sm:py-14 max-w-xl">
            <div className="text-[#E8D58E] text-xs sm:text-sm font-semibold tracking-widest uppercase">
              {t('realParque.eyebrow')}
            </div>
            <h2 className="mt-3 font-heading text-2xl sm:text-4xl font-bold leading-tight text-[#FBF9F4]">
              {t('realParque.title')}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#D5D9E3] max-w-[46ch]">
              {t('realParque.text')}
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <a
                href={href}
                onClick={() => pushDataLayer('real_parque_promo_click')}
                className="inline-flex items-center gap-2 bg-gold-500 text-[#14213D] font-semibold px-5 py-3 rounded-lg hover:bg-gold-400 transition-colors"
              >
                {t('realParque.ctaPrimary')}
              </a>
              <a
                href={hrefVillas}
                onClick={() => pushDataLayer('real_parque_villas_click')}
                className="inline-flex items-center gap-2 border border-white/35 text-[#F7F5F0] font-semibold px-5 py-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                {t('realParque.ctaSecondary')}
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-7 pt-5 border-t border-white/15">
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/real-parque/bewiki/realparque_logo_w.png"
                  alt="Real Parque — Novo Norte"
                  className="h-8 w-auto"
                />
                <span className="w-px h-6 bg-white/25" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/real-parque/bewiki/bewiki-home-white.svg"
                  alt="BeWiki"
                  className="h-5 w-auto"
                />
              </div>
              <p className="text-xs text-[#C2C8D6] max-w-[32ch] leading-snug">
                {t('realParque.stripText')}
              </p>
            </div>
          </div>

          <div className="relative grid grid-cols-2 sm:grid-cols-4 border-t border-white/15">
            {[
              [t('realParque.stat1Num'), t('realParque.stat1Label')],
              [t('realParque.stat2Num'), t('realParque.stat2Label')],
              [t('realParque.stat3Num'), t('realParque.stat3Label')],
              [t('realParque.stat4Num'), t('realParque.stat4Label')],
            ].map(([num, label], i) => (
              <div
                key={i}
                className="px-4 py-4 sm:px-6 border-r border-white/10 last:border-r-0 even:border-r-0 sm:even:border-r sm:[&:nth-child(4)]:border-r-0"
              >
                <b className="font-heading text-xl sm:text-2xl font-semibold text-[#E8D58E] block leading-tight">
                  {num}
                </b>
                <span className="text-[11px] sm:text-xs text-[#C2C8D6]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
