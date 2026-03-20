'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';

// Flag images via Twemoji CDN (works on Windows!)
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

export default function CountryCalculatorTeaser() {
  const { language } = useLanguage();

  // Parse emojis in tags with Twemoji
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/twemoji@14.0.2/dist/twemoji.min.js';
      script.onload = () => {
        // @ts-expect-error twemoji is loaded dynamically
        if (window.twemoji) window.twemoji.parse(document.getElementById('calc-teaser'), { folder: 'svg', ext: '.svg' });
      };
      document.head.appendChild(script);
    }
  }, []);

  return (
    <section id="calc-teaser" className="py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Compact gift card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl overflow-hidden p-8 md:p-10"
          style={{ 
            background: 'linear-gradient(135deg, #6B1D3A 0%, #4A1228 100%)',
            border: '2px solid rgba(201,169,78,0.35)',
            boxShadow: '0 4px 30px rgba(107,29,58,0.2), inset 0 1px 0 rgba(201,169,78,0.15)'
          }}
        >
          {/* Gold corner accents */}
          <div className="absolute top-0 left-0 w-12 h-12" style={{ borderTop: '2px solid #C9A94E', borderLeft: '2px solid #C9A94E', borderRadius: '16px 0 0 0' }} />
          <div className="absolute top-0 right-0 w-12 h-12" style={{ borderTop: '2px solid #C9A94E', borderRight: '2px solid #C9A94E', borderRadius: '0 16px 0 0' }} />
          <div className="absolute bottom-0 left-0 w-12 h-12" style={{ borderBottom: '2px solid #C9A94E', borderLeft: '2px solid #C9A94E', borderRadius: '0 0 0 16px' }} />
          <div className="absolute bottom-0 right-0 w-12 h-12" style={{ borderBottom: '2px solid #C9A94E', borderRight: '2px solid #C9A94E', borderRadius: '0 0 16px 0' }} />

          {/* 15 years badge */}
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm" style={{ background: 'rgba(201,169,78,0.15)', border: '1px solid rgba(201,169,78,0.3)', color: '#C9A94E' }}>
              🎁 <span className="font-bold">15 {language === 'ru' ? 'лет' : language === 'pt' ? 'anos' : 'years'} Migronis</span> · {language === 'ru' ? 'Подарок' : language === 'pt' ? 'Presente' : 'Gift'} 🎁
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            {language === 'ru' ? 'Толя, Куда ' : language === 'pt' ? 'Tolya, Qual o ' : 'Tolya, What\'s '}
            <span style={{ color: '#C9A94E' }}>
              {language === 'ru' ? 'Дальше?!' : language === 'pt' ? 'Próximo?!' : 'Next?!'}
            </span>
          </h2>

          <p className="text-white/40 text-center text-sm mb-6 max-w-lg mx-auto">
            {language === 'ru' 
              ? 'Интерактивный калькулятор — определи лучшую страну для переезда или инвестиций' 
              : language === 'pt' ? 'Calculadora interativa — encontre o melhor país para mudar ou investir'
              : 'Interactive calculator — find the best country for relocation or investment'}
          </p>

          {/* Country cards with flag images */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            {previewCountries.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
                className="flex-1 flex items-center gap-3 p-3 rounded-xl"
                style={{
                  background: i === 0 ? 'rgba(201,169,78,0.1)' : 'rgba(255,255,255,0.04)',
                  border: i === 0 ? '1px solid rgba(201,169,78,0.3)' : '1px solid rgba(255,255,255,0.06)'
                }}
              >
                <img src={flags[c.code]} alt={c.code} className="w-10 h-10 rounded" style={{ objectFit: 'cover' }} />
                <div className="flex-1 min-w-0">
                  <div className="text-white font-semibold text-sm truncate">{c.name[language as keyof typeof c.name] || c.name.en}</div>
                  <div className="flex gap-1 mt-1 flex-wrap">
                    {c.tags.map((tag, j) => (
                      <span key={j} className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', fontSize: '10px' }}>{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="text-lg font-bold flex-shrink-0" style={{ color: '#C9A94E', fontFamily: "'Playfair Display', serif" }}>{c.score}%</div>
              </motion.div>
            ))}
          </div>

          {/* Stats row */}
          <div className="flex justify-center gap-8 mb-6">
            {[
              { num: '10', label: language === 'ru' ? 'стран' : language === 'pt' ? 'países' : 'countries' },
              { num: '8', label: language === 'ru' ? 'вопросов' : language === 'pt' ? 'perguntas' : 'questions' },
              { num: '2', label: language === 'ru' ? 'мин' : language === 'pt' ? 'min' : 'min' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-xl font-bold" style={{ color: '#C9A94E', fontFamily: "'Playfair Display', serif" }}>{s.num}</div>
                <div className="text-xs text-white/30 uppercase">{s.label}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <motion.a 
              href="/country-calculator.html"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-bold"
              style={{ background: 'linear-gradient(135deg, #C9A94E, #D4B85A)', color: '#4A1228' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              🎯 {language === 'ru' ? 'Пройти тест' : language === 'pt' ? 'Fazer o teste' : 'Take the Quiz'} →
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}