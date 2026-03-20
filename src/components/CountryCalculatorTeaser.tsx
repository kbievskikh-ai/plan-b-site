'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';

const flagUrl = (code: string) => `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${code}.svg`;
const flags: Record<string, string> = {
  BR: flagUrl('1f1e7-1f1f7'),
  UY: flagUrl('1f1fa-1f1fe'),
  PT: flagUrl('1f1f5-1f1f9'),
};

const previewCountries = [
  { code: 'BR', name: { en: 'Brazil', ru: 'Бразилия', pt: 'Brasil' }, score: 92, tags: ['🏖️', '📈 +12%', '🌿'] },
  { code: 'UY', name: { en: 'Uruguay', ru: 'Уругвай', pt: 'Uruguai' }, score: 87, tags: ['💰 0% tax', '🛡️', '🛂'] },
  { code: 'PT', name: { en: 'Portugal', ru: 'Португалия', pt: 'Portugal' }, score: 84, tags: ['🇪🇺 EU', '☀️', '🎓'] },
];

const confettiColors = ['#C9A94E', '#D4B85A', '#fff', '#E8D48B', '#FFD700', '#FF69B4', '#00CED1', '#FF6347'];

function ConfettiPiece({ delay, color, x, y }: { delay: number; color: string; x: number; y: number }) {
  return (
    <motion.div
      initial={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
      animate={{ opacity: [1, 1, 0], x, y, rotate: Math.random() * 720 - 360, scale: [1, 1.2, 0.5] }}
      transition={{ duration: 1.5, delay, ease: 'easeOut' }}
      className="absolute pointer-events-none"
      style={{
        width: Math.random() * 8 + 4, height: Math.random() * 8 + 4,
        background: color, borderRadius: Math.random() > 0.5 ? '50%' : '2px',
        top: '50%', left: '50%', zIndex: 10,
      }}
    />
  );
}

export default function CountryCalculatorTeaser() {
  const { language } = useLanguage();
  const [exploded, setExploded] = useState(false);
  const [confetti, setConfetti] = useState<Array<{ id: number; color: string; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/twemoji@14.0.2/dist/twemoji.min.js';
      script.onload = () => {
        // @ts-expect-error twemoji loaded dynamically
        if (window.twemoji) window.twemoji.parse(document.getElementById('calc-teaser'), { folder: 'svg', ext: '.svg' });
      };
      document.head.appendChild(script);
    }
  }, [exploded]);

  const handleGiftClick = () => {
    if (exploded) return;
    setConfetti(Array.from({ length: 40 }, (_, i) => ({
      id: i, color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      x: (Math.random() - 0.5) * 300, y: (Math.random() - 0.5) * 250 - 50, delay: Math.random() * 0.3,
    })));
    setExploded(true);
  };

  return (
    <section id="calc-teaser" className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #6B1D3A 0%, #4A1228 50%, #3a0e20 100%)' }}>
      <style>{`
        @keyframes wave { 0%{transform:perspective(200px) rotateY(0deg) scaleX(1)} 25%{transform:perspective(200px) rotateY(5deg) scaleX(1.02)} 50%{transform:perspective(200px) rotateY(0deg) scaleX(1)} 75%{transform:perspective(200px) rotateY(-5deg) scaleX(0.98)} 100%{transform:perspective(200px) rotateY(0deg) scaleX(1)} }
        .flag-wave { animation: wave 3s ease-in-out infinite; transform-origin: left center; }
        @keyframes shake { 0%,100%{transform:rotate(0)} 10%{transform:rotate(-8deg)} 20%{transform:rotate(8deg)} 30%{transform:rotate(-6deg)} 40%{transform:rotate(6deg)} 50%{transform:rotate(-4deg)} 60%{transform:rotate(4deg)} 70%{transform:rotate(-2deg)} 80%{transform:rotate(2deg)} 90%{transform:rotate(0)} }
        .gift-shake { animation: shake 0.8s ease-in-out infinite; cursor: pointer; }
        .gift-shake:hover { animation-duration: 0.4s; }
        @keyframes sparkle { 0%,100%{opacity:0;transform:scale(0) rotate(0)} 50%{opacity:1;transform:scale(1) rotate(180deg)} }
        .sparkle { animation: sparkle 2s ease-in-out infinite; }
      `}</style>

      {/* Gold borders */}
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, transparent, #C9A94E, transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, transparent, #C9A94E, transparent)' }} />
      <div className="absolute top-0 left-0 w-24 h-24 opacity-20" style={{ borderTop: '3px solid #C9A94E', borderLeft: '3px solid #C9A94E' }} />
      <div className="absolute top-0 right-0 w-24 h-24 opacity-20" style={{ borderTop: '3px solid #C9A94E', borderRight: '3px solid #C9A94E' }} />
      <div className="absolute bottom-0 left-0 w-24 h-24 opacity-20" style={{ borderBottom: '3px solid #C9A94E', borderLeft: '3px solid #C9A94E' }} />
      <div className="absolute bottom-0 right-0 w-24 h-24 opacity-20" style={{ borderBottom: '3px solid #C9A94E', borderRight: '3px solid #C9A94E' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Gift badge - centered, clickable */}
        <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <div className="relative inline-block" onClick={handleGiftClick}>
            <AnimatePresence>
              {!exploded ? (
                <motion.div className="gift-shake inline-block" key="gift">
                  <span className="text-5xl md:text-6xl inline-block">🎁</span>
                  <span className="sparkle absolute -top-2 -right-2 text-lg" style={{ animationDelay: '0s' }}>✨</span>
                  <span className="sparkle absolute -bottom-1 -left-2 text-sm" style={{ animationDelay: '0.7s' }}>✨</span>
                </motion.div>
              ) : (
                <motion.span key="opened" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300 }} className="text-5xl md:text-6xl inline-block">🎉</motion.span>
              )}
            </AnimatePresence>
            {confetti.map(p => <ConfettiPiece key={p.id} delay={p.delay} color={p.color} x={p.x} y={p.y} />)}
          </div>
          <div className="mt-3">
            <span className="inline-flex items-center gap-3 px-8 py-3 rounded-full" style={{ background: 'rgba(201,169,78,0.15)', border: '2px solid rgba(201,169,78,0.4)' }}>
              <span className="text-2xl font-bold" style={{ color: '#C9A94E', fontFamily: "'Playfair Display', serif" }}>15 {language === 'ru' ? 'ЛЕТ' : language === 'pt' ? 'ANOS' : 'YEARS'}</span>
              <span className="text-sm" style={{ color: '#C9A94E' }}>{language === 'ru' ? 'Подарок от Migronis' : language === 'pt' ? 'Presente da Migronis' : 'Gift from Migronis'}</span>
            </span>
          </div>
          {!exploded && <div className="text-white/20 text-xs mt-2 animate-pulse">{language === 'ru' ? '👆 Нажми на подарок!' : '👆 Tap the gift!'}</div>}
        </motion.div>

        {/* Two columns layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Text + CTA */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', serif", lineHeight: 1.1 }}>
              {language === 'ru' ? 'Толя, Куда' : language === 'pt' ? 'Tolya, Qual o' : 'Tolya, What\'s'}<br />
              <span style={{ color: '#C9A94E' }}>{language === 'ru' ? 'Дальше?!' : language === 'pt' ? 'Próximo?!' : 'Next?!'}</span>
            </h2>
            
            <p className="text-white/50 text-xl mb-8 leading-relaxed">
              {language === 'ru' ? 'Интерактивный калькулятор поможет определить лучшую страну для переезда, инвестиций или запасного аэродрома.'
                : language === 'pt' ? 'Calculadora interativa para encontrar o melhor país para mudar, investir ou plano B.'
                : 'Interactive calculator to find the best country for relocation, investment, or your Plan B.'}
            </p>

            <div className="flex gap-10 mb-10">
              {[
                { num: '10', label: language === 'ru' ? 'стран' : language === 'pt' ? 'países' : 'countries' },
                { num: '8', label: language === 'ru' ? 'вопросов' : language === 'pt' ? 'perguntas' : 'questions' },
                { num: '2', label: language === 'ru' ? 'минуты' : language === 'pt' ? 'minutos' : 'minutes' },
              ].map((s, i) => (
                <motion.div key={i} className="text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}>
                  <div className="text-4xl font-bold" style={{ color: '#C9A94E', fontFamily: "'Playfair Display', serif" }}>{s.num}</div>
                  <div className="text-sm text-white/40 uppercase tracking-wider mt-1">{s.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.a href="/country-calculator.html"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-xl text-xl font-bold"
              style={{ background: 'linear-gradient(135deg, #C9A94E, #D4B85A)', color: '#4A1228', boxShadow: '0 4px 20px rgba(201,169,78,0.3)' }}
              whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(201,169,78,0.5)' }}
              whileTap={{ scale: 0.98 }}>
              🎯 {language === 'ru' ? 'Пройти тест' : language === 'pt' ? 'Fazer o teste' : 'Take the Quiz'} →
            </motion.a>
          </motion.div>

          {/* Right: Country cards with waving flags */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="space-y-5">
            {previewCountries.map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.3 + i * 0.15 }}
                className="flex items-center gap-5 p-5 rounded-2xl"
                style={{ background: i === 0 ? 'rgba(201,169,78,0.12)' : 'rgba(255,255,255,0.05)', border: i === 0 ? '2px solid rgba(201,169,78,0.4)' : '1px solid rgba(255,255,255,0.08)' }}>
                <img src={flags[c.code]} alt={c.code} className="w-12 h-12 rounded-lg flag-wave" style={{ objectFit: 'cover', animationDelay: `${i * 0.4}s` }} />
                <div className="flex-1">
                  <div className="text-white font-bold text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>{c.name[language as keyof typeof c.name] || c.name.en}</div>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {c.tags.map((tag, j) => (
                      <span key={j} className="text-sm px-3 py-1 rounded-lg" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}>{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="text-3xl font-bold flex-shrink-0" style={{ color: '#C9A94E', fontFamily: "'Playfair Display', serif" }}>{c.score}%</div>
              </motion.div>
            ))}
            <div className="text-center text-white/20 text-sm mt-4 italic">
              {language === 'ru' ? '↑ Пример результата калькулятора' : language === 'pt' ? '↑ Exemplo de resultado' : '↑ Sample calculator result'}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}