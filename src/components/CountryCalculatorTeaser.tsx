'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';

const flagImg = (code: string) => `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${code}.svg`;
const previewCountries = [
  { flag: flagImg('1f1e7-1f1f7'), name: { en: 'Brazil', ru: 'Бразилия', pt: 'Brasil' }, score: 92, tags: ['🏖️', '📈', '🌿'] },
  { flag: flagImg('1f1fa-1f1fe'), name: { en: 'Uruguay', ru: 'Уругвай', pt: 'Uruguai' }, score: 87, tags: ['💰', '🛡️', '🛂'] },
  { flag: flagImg('1f1f5-1f1f9'), name: { en: 'Portugal', ru: 'Португалия', pt: 'Portugal' }, score: 84, tags: ['🇪🇺', '☀️', '🎓'] },
];

export default function CountryCalculatorTeaser() {
  const { language } = useLanguage();

  return (
    <section id="country-calculator" className="py-16 relative" style={{ background: 'linear-gradient(135deg, #6B1D3A 0%, #4A1228 50%, #3a0e20 100%)' }}>
      {/* Gold top and bottom lines */}
      <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, transparent, #C9A94E, transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, transparent, #C9A94E, transparent)' }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Text + CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6">
              <img src="https://cdn.migronis.com/img/logo.svg" alt="Migronis" style={{ height: '80px', filter: 'brightness(0) invert(1)' }} className="mb-3" />
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎁</span>
                <span className="text-xs uppercase tracking-widest" style={{ color: '#C9A94E' }}>
                  {language === 'ru' ? 'Подарок к 15-летию Migronis' : language === 'pt' ? 'Presente de 15 anos Migronis' : 'Migronis 15th Anniversary Gift'}
                </span>
              </div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              {language === 'ru' ? 'Толя, Куда' : language === 'pt' ? 'Tolya, Qual o' : 'Tolya, What\'s'}
              <span style={{ color: '#C9A94E' }}>
                {language === 'ru' ? ' Дальше?!' : language === 'pt' ? ' Próximo?!' : ' Next?!'}
              </span>
            </h2>
            
            <p className="text-white/60 text-lg mb-6">
              {language === 'ru' 
                ? 'Интерактивный калькулятор поможет определить лучшую страну для переезда, инвестиций или запасного аэродрома.' 
                : language === 'pt'
                ? 'Calculadora interativa para encontrar o melhor país para mudar, investir ou plano B.'
                : 'Interactive calculator to find the best country for relocation, investment, or your Plan B.'}
            </p>

            {/* Stats */}
            <div className="flex gap-6 mb-8">
              {[
                { num: '10', label: language === 'ru' ? 'стран' : language === 'pt' ? 'países' : 'countries' },
                { num: '8', label: language === 'ru' ? 'вопросов' : language === 'pt' ? 'perguntas' : 'questions' },
                { num: '2', label: language === 'ru' ? 'минуты' : language === 'pt' ? 'minutos' : 'minutes' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-bold" style={{ color: '#C9A94E', fontFamily: "'Playfair Display', serif" }}>{s.num}</div>
                  <div className="text-xs text-white/40 uppercase tracking-wide">{s.label}</div>
                </div>
              ))}
            </div>

            <a 
              href="/country-calculator.html"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ background: '#C9A94E', color: '#4A1228' }}
            >
              {language === 'ru' ? 'Пройти тест →' : language === 'pt' ? 'Fazer o teste →' : 'Take the Quiz →'}
            </a>
          </motion.div>

          {/* Right: Preview Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {previewCountries.map((country, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.15 }}
                className="flex items-center gap-4 p-4 rounded-xl backdrop-blur-sm"
                style={{ 
                  background: i === 0 ? 'rgba(201,169,78,0.1)' : 'rgba(255,255,255,0.05)',
                  border: i === 0 ? '1px solid rgba(201,169,78,0.3)' : '1px solid rgba(255,255,255,0.08)'
                }}
              >
                <img src={country.flag} alt="" className="w-10 h-10 rounded" />
                <div className="flex-1">
                  <div className="text-white font-semibold text-lg">{country.name[language as keyof typeof country.name] || country.name.en}</div>
                  <div className="flex gap-2 mt-1">
                    {country.tags.map((tag, j) => (
                      <span key={j} className="text-sm px-2 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.08)', fontSize: '14px' }}>{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold" style={{ color: '#C9A94E', fontFamily: "'Playfair Display', serif" }}>{country.score}%</div>
                  <div className="text-xs text-white/30">match</div>
                </div>
              </motion.div>
            ))}
            
            <div className="text-center text-white/20 text-sm mt-4">
              {language === 'ru' ? '↑ Пример результата калькулятора' : language === 'pt' ? '↑ Exemplo de resultado' : '↑ Sample calculator result'}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}