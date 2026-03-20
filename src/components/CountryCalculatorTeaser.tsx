'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';

const previewCountries = [
  { flag: '🇧🇷', name: { en: 'Brazil', ru: 'Бразилия', pt: 'Brasil' }, score: 92, tags: ['🏖️ Beach', '📈 +12%', '🌿 Nature'] },
  { flag: '🇺🇾', name: { en: 'Uruguay', ru: 'Уругвай', pt: 'Uruguai' }, score: 87, tags: ['💰 0% Tax', '🛡️ Safe', '🛂 Fast ID'] },
  { flag: '🇵🇹', name: { en: 'Portugal', ru: 'Португалия', pt: 'Portugal' }, score: 84, tags: ['🇪🇺 EU Pass', '☀️ Sun', '🎓 Education'] },
];

export default function CountryCalculatorTeaser() {
  const { language } = useLanguage();

  return (
    <section id="country-calculator" className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #6B1D3A 0%, #4A1228 50%, #3a0e20 100%)' }}>
      {/* Gold border top & bottom */}
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, transparent, #C9A94E, transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, transparent, #C9A94E, transparent)' }} />
      
      {/* Decorative gold corner accents */}
      <div className="absolute top-0 left-0 w-24 h-24 opacity-20" style={{ borderTop: '3px solid #C9A94E', borderLeft: '3px solid #C9A94E' }} />
      <div className="absolute top-0 right-0 w-24 h-24 opacity-20" style={{ borderTop: '3px solid #C9A94E', borderRight: '3px solid #C9A94E' }} />
      <div className="absolute bottom-0 left-0 w-24 h-24 opacity-20" style={{ borderBottom: '3px solid #C9A94E', borderLeft: '3px solid #C9A94E' }} />
      <div className="absolute bottom-0 right-0 w-24 h-24 opacity-20" style={{ borderBottom: '3px solid #C9A94E', borderRight: '3px solid #C9A94E' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Anniversary badge - prominent */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-3 px-8 py-3 rounded-full mb-6" style={{ background: 'rgba(201,169,78,0.15)', border: '2px solid rgba(201,169,78,0.4)' }}>
            <span className="text-4xl">🎁</span>
            <div className="text-left">
              <div className="text-2xl font-bold" style={{ color: '#C9A94E', fontFamily: "'Playfair Display', serif" }}>
                15 {language === 'ru' ? 'ЛЕТ' : language === 'pt' ? 'ANOS' : 'YEARS'}
              </div>
              <div className="text-xs uppercase tracking-widest text-white/50">
                {language === 'ru' ? 'Подарок от Migronis' : language === 'pt' ? 'Presente da Migronis' : 'Gift from Migronis'}
              </div>
            </div>
            <span className="text-4xl">🎁</span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Text + CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', serif", lineHeight: 1.1 }}>
              {language === 'ru' ? 'Толя, Куда' : language === 'pt' ? 'Tolya, Qual o' : 'Tolya, What\'s'}
              <br />
              <span style={{ color: '#C9A94E' }}>
                {language === 'ru' ? 'Дальше?!' : language === 'pt' ? 'Próximo?!' : 'Next?!'}
              </span>
            </h2>
            
            <p className="text-white/50 text-xl mb-8 leading-relaxed">
              {language === 'ru' 
                ? 'Интерактивный калькулятор поможет определить лучшую страну для переезда, инвестиций или запасного аэродрома.' 
                : language === 'pt'
                ? 'Calculadora interativa para encontrar o melhor país para mudar, investir ou plano B.'
                : 'Interactive calculator to find the best country for relocation, investment, or your Plan B.'}
            </p>

            {/* Stats - bigger */}
            <div className="flex gap-10 mb-10">
              {[
                { num: '10', label: language === 'ru' ? 'стран' : language === 'pt' ? 'países' : 'countries' },
                { num: '8', label: language === 'ru' ? 'вопросов' : language === 'pt' ? 'perguntas' : 'questions' },
                { num: '2', label: language === 'ru' ? 'минуты' : language === 'pt' ? 'minutos' : 'minutes' },
              ].map((s, i) => (
                <motion.div 
                  key={i} 
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                >
                  <div className="text-4xl font-bold" style={{ color: '#C9A94E', fontFamily: "'Playfair Display', serif" }}>{s.num}</div>
                  <div className="text-sm text-white/40 uppercase tracking-wider mt-1">{s.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.a 
              href="/country-calculator.html"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-xl text-xl font-bold transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, #C9A94E, #D4B85A)', color: '#4A1228', boxShadow: '0 4px 20px rgba(201,169,78,0.3)' }}
              whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(201,169,78,0.5)' }}
              whileTap={{ scale: 0.98 }}
            >
              🎯 {language === 'ru' ? 'Пройти тест' : language === 'pt' ? 'Fazer o teste' : 'Take the Quiz'} →
            </motion.a>
          </motion.div>

          {/* Right: Preview Cards - bigger with flags */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5"
          >
            {previewCountries.map((country, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.15 }}
                className="flex items-center gap-5 p-5 rounded-2xl backdrop-blur-sm"
                style={{ 
                  background: i === 0 ? 'rgba(201,169,78,0.12)' : 'rgba(255,255,255,0.05)',
                  border: i === 0 ? '2px solid rgba(201,169,78,0.4)' : '1px solid rgba(255,255,255,0.08)'
                }}
              >
                <span className="text-5xl leading-none">{country.flag}</span>
                <div className="flex-1">
                  <div className="text-white font-bold text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {country.name[language as keyof typeof country.name] || country.name.en}
                  </div>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {country.tags.map((tag, j) => (
                      <span key={j} className="text-sm px-3 py-1 rounded-lg" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}>{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-3xl font-bold" style={{ color: '#C9A94E', fontFamily: "'Playfair Display', serif" }}>{country.score}%</div>
                </div>
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