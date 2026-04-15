'use client';
import { motion } from 'framer-motion';

export default function BanyaClient() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1c1208', color: '#f0d9b5' }}>
      {/* ─── HERO ─── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1400&q=80" alt="Russian Banya" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(28,18,8,0.6) 0%, rgba(28,18,8,0.3) 50%, rgba(28,18,8) 100%)' }} />
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
              Русская Баня
            </h1>
            <div className="w-20 h-px mx-auto mb-6" style={{ backgroundColor: 'rgba(212,160,86,0.5)' }} />
            <p className="text-lg mb-1" style={{ color: '#c9a050' }}>из розового кедра</p>
            <p className="text-sm text-amber-100/70">Единственная настоящая русская баня в Бразилии</p>
            <p className="text-xs text-amber-100/50 mt-2">Кампече, Флорианополис</p>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}>
            <a href="https://wa.me/554892005878" target="_blank" rel="noopener noreferrer"
              className="inline-block mt-8 font-bold px-8 py-3 text-base transition-all hover:scale-105"
              style={{ backgroundColor: '#c4842a', color: '#1c1208', borderRadius: '6px' }}>
              Записаться на парение
            </a>
          </motion.div>
        </div>
      </section>

      {/* ─── INTRO ─── */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <p className="text-lg leading-relaxed" style={{ color: '#d4b896' }}>
              Это не сауна и не спа. Это русская парная — горячий влажный воздух, дубовый веник,
              горячая кожа и ледяная вода. Берёзовый дым, аромат розового кедра, полное расслабление.
              Всё как дома, только в самом сердце Флорианополиса.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── THREE PILLARS WITH PHOTOS ─── */}
      <section className="py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {[
              {
                img: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80',
                label: 'Розовый кедр',
                desc: 'Натуральное дерево. Целебные масла успокаивают нервную систему и наполняют парную тёплым ароматом.',
              },
              {
                img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
                label: 'Веники',
                desc: 'Берёзовые и дубовые — собранные вручную. Разгоняют кровь, раскрывают поры, выводят токсины.',
              },
              {
                img: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80',
                label: 'Морские соли',
                desc: 'Натуральные соли с минералами наносятся на распаренное тело. Очищают, питают, делают кожу бархатной.',
              },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="relative h-[420px] group overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.img} alt={item.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 group-hover:opacity-60 transition-opacity duration-500" style={{ backgroundColor: 'rgba(28,18,8,0.8)' }} />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-xl font-bold mb-3 tracking-wide" style={{ fontFamily: 'Georgia, serif', color: '#e8c87a' }}>{item.label}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#d4b896' }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── RITUALS ─── */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 tracking-tight" style={{ fontFamily: 'Georgia, serif', color: '#e8c87a' }}>
            Ритуал парения
          </h2>
          <div className="space-y-10">
            {[
              { step: '01', title: 'Прогрев', desc: 'Мягкий пар постепенно разогревает тело, раскрывая поры и подготавливая к основным процедурам.' },
              { step: '02', title: 'Парение вениками', desc: 'Берёзовые и дубовые веники. Мастер-парильщик работает с телом, разгоняя кровь и выводя токсины.' },
              { step: '03', title: 'Обтирание солями', desc: 'Натуральные морские соли с минералами наносятся на распаренное тело, очищая и питая кожу.' },
              { step: '04', title: 'Охлаждение', desc: 'Контрастное охлаждение — купель или прохладный душ. Завершает цикл и дарит невероятную лёгкость.' },
              { step: '05', title: 'Чай и отдых', desc: 'Травяной чай из натуральных сборов и отдых в тёплой комнате. Идеальное завершение.' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex gap-8 items-start">
                <div className="text-4xl font-light shrink-0 mt-1" style={{ color: 'rgba(232,200,122,0.25)' }}>{item.step}</div>
                <div className="border-l pl-6 pb-8" style={{ borderColor: 'rgba(212,160,86,0.15)' }}>
                  <h3 className="font-bold text-lg mb-2 tracking-wide">{item.title}</h3>
                  <p className="leading-relaxed" style={{ color: '#a08060' }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section className="py-20 px-4" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight" style={{ fontFamily: 'Georgia, serif', color: '#e8c87a' }}>
              Стоимость
            </h2>
            <p className="mb-12" style={{ color: '#8a6a4a' }}>Запись через WhatsApp у Натальи</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="p-10 rounded-2xl" style={{ backgroundColor: '#2a1d10', border: '1px solid rgba(212,160,86,0.2)' }}>
                <h3 className="text-sm tracking-widest mb-6 uppercase" style={{ color: '#8a6a4a' }}>Индивидуально</h3>
                <div className="text-5xl font-bold mb-2" style={{ color: '#e8c87a' }}>R$ 1.500</div>
                <p className="text-sm mb-8" style={{ color: '#8a6a4a' }}>от 1 до 3 человек, весь ритуал</p>
                <a href="https://wa.me/554892005878?text=Хочу+записаться+на+парение+(1-3+человека)" target="_blank" rel="noopener noreferrer"
                  className="block w-full font-bold py-3 transition hover:opacity-90"
                  style={{ backgroundColor: '#c4842a', color: '#1c1208', borderRadius: '6px' }}>
                  Записаться
                </a>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                className="p-10 rounded-2xl" style={{ backgroundColor: '#2a1d10', border: '1px solid rgba(212,160,86,0.35)' }}>
                <h3 className="text-sm tracking-widest mb-6 uppercase" style={{ color: '#8a6a4a' }}>Группа</h3>
                <div className="text-5xl font-bold mb-1" style={{ color: '#e8c87a' }}>R$ 300</div>
                <p className="text-sm mb-8" style={{ color: '#8a6a4a' }}>с человека, до 6 человек</p>
                <a href="https://wa.me/554892005878?text=Хочу+записаться+на+парение+(группа+4-6+человек)" target="_blank" rel="noopener noreferrer"
                  className="block w-full font-bold py-3 transition hover:opacity-90"
                  style={{ backgroundColor: '#c4842a', color: '#1c1208', borderRadius: '6px' }}>
                  Записаться
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── WHY ─── */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 tracking-tight" style={{ fontFamily: 'Georgia, serif', color: '#e8c87a' }}>
            Почему русская баня
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { title: 'Здоровье', desc: 'Укрепляет иммунитет, очищает кожу, выводит токсины, улучшает кровообращение.' },
              { title: 'Расслабление', desc: 'Снимает стресс, мышечное напряжение, дарит глубокое спокойствие.' },
              { title: 'Настоящий пар', desc: 'Не сауна. Мягкий влажный пар при 60-80C — совершенно другой опыт.' },
              { title: 'Компания', desc: 'Место для друзей и семьи. Тёплые разговоры, травяной чай, настоящая атмосфера.' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <h3 className="font-bold text-lg mb-2 tracking-wide">{item.title}</h3>
                <p className="leading-relaxed" style={{ color: '#a08060' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT / SOUL ─── */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <div className="mb-6 text-4xl" style={{ color: '#e8c87a' }}>~</div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ fontFamily: 'Georgia, serif', color: '#e8c87a' }}>
              Баня с душой
            </h2>
            <p className="text-lg leading-relaxed mb-6" style={{ color: '#d4b896' }}>
              Это не бизнес — это любовь. Баню строили своими руками, из настоящего розового кедра.
              Каждое бревно подбиралось вручную, каждая полка шлифовалась до гладкости.
            </p>
            <p className="text-lg leading-relaxed mb-6" style={{ color: '#d4b896' }}>
              Наталья — мастер-парильщик с многолетним опытом. Она не просто &#171;парит&#187; — она чувствует тело
              и подбирает температуру, веники и соли именно под вас. Каждый гость уходит другим человеком.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: '#d4b896' }}>
              Приходите одни, с друзьями, с семьёй. Здесь нет спешки. Только пар, тепло и забота.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── GALLERY ─── */}
      <section className="py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=500&q=80',
              'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=500&q=80',
              'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=500&q=80',
              'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&q=80',
            ].map((src, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="aspect-square overflow-hidden rounded-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="Banya" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-20 px-4" style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 tracking-tight" style={{ fontFamily: 'Georgia, serif', color: '#e8c87a' }}>
            Отзывы
          </h2>
          <div className="space-y-10">
            {[
              {
                text: '«Одна из лучших парений в моей жизни. Настоящая русская баня — единственная в Южной Америке. Аромат розового кедра, берёзовые веники, морские соли. После такого не хочется идти ни в какую сауну.»',
                name: 'Константин',
                tag: 'постоянный гость',
              },
              {
                text: '«Мы были вчетвером — три подруги и я. Это невероятный опыт! Наталья — супер-специалист, всё идеально: пар, веники, соли. Мы вышли как заново родившиеся. Всем рекомендуем!»',
                name: 'Анна и девушки',
                tag: 'группа 4 человека',
              },
              {
                text: '«Заказали баню для нашей годовщины. Это был лучший вечер за долгое время — пар, тишина, травяной чай. Вдвоём с женой провели время, о котором давно мечтали. Очень рекомендую иногда так делать — просто остановиться и побыть вместе.»',
                name: 'Андрей и Оксана',
                tag: 'семейная пара',
              },
            ].map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl" style={{ backgroundColor: 'rgba(42,29,16,0.5)', border: '1px solid rgba(212,160,86,0.1)' }}>
                <p className="text-lg leading-relaxed mb-4 italic" style={{ fontFamily: 'Georgia, serif', color: '#d4b896' }}>
                  {t.text}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px" style={{ backgroundColor: 'rgba(212,160,86,0.3)' }} />
                  <div>
                    <span className="font-medium" style={{ color: '#c9a050' }}>{t.name}</span>
                    <span className="text-sm ml-2" style={{ color: '#8a6a4a' }}>{t.tag}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1400&q=80" alt="Banya" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #1c1208 0%, rgba(28,18,8,0.8) 50%, rgba(28,18,8,0.6) 100%)' }} />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight" style={{ fontFamily: 'Georgia, serif', color: '#e8c87a' }}>
              Готовы?
            </h2>
            <p className="mb-8" style={{ color: '#d4b896' }}>
              Запишитесь через WhatsApp — Наталья ответит и подберёт удобное время.
            </p>
            <a href="https://wa.me/554892005878" target="_blank" rel="noopener noreferrer"
              className="inline-block font-bold px-10 py-4 transition-all hover:scale-105"
              style={{ backgroundColor: '#c4842a', color: '#1c1208', borderRadius: '6px' }}>
              Написать Наталье
            </a>
            <p className="text-sm mt-4" style={{ color: '#8a6a4a' }}>
              +55 (48) 9200-5878
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-8 px-4 text-center text-xs" style={{ borderTop: '1px solid rgba(212,160,86,0.1)', color: '#5a4030' }}>
        <p>Русская Баня — Кампече, Флорианополис</p>
      </footer>
    </div>
  );
}
