'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';

const EXCHANGE_RATE = 5.1;
const fmtUSD = (v: number) => '$' + Math.round(v).toLocaleString();
const fmtBRL = (v: number) => 'R$ ' + Math.round(v).toLocaleString('pt-BR');

const questions = [
  {
    key: 'goal',
    titleKey: 'q_goal_title', titleKeyRu: 'q_goal_titleRu',
    options: [
      { value: 'invest', labelKey: 'q_goal_invest', labelKeyRu: 'q_goal_investRu', emoji: '💰' },
      { value: 'business', labelKey: 'q_goal_business', labelKeyRu: 'q_goal_businessRu', emoji: '🚀' },
      { value: 'retire', labelKey: 'q_goal_retire', labelKeyRu: 'q_goal_retireRu', emoji: '🏖️' },
      { value: 'remote', labelKey: 'q_goal_remote', labelKeyRu: 'q_goal_remoteRu', emoji: '💻' },
      { value: 'family', labelKey: 'q_goal_family', labelKeyRu: 'q_goal_familyRu', emoji: '👨‍👩‍👧' },
      { value: 'marriage', labelKey: 'q_goal_marriage', labelKeyRu: 'q_goal_marriageRu', emoji: '💑' },
    ],
  },
  {
    key: 'budget',
    titleKey: 'q_budget_title', titleKeyRu: 'q_budget_titleRu',
    options: [
      { value: 'none', labelKey: 'q_budget_none', labelKeyRu: 'q_budget_noneRu', emoji: '—' },
      { value: 'low', labelKey: 'q_budget_low', labelKeyRu: 'q_budget_lowRu', emoji: '<$100K' },
      { value: 'mid', labelKey: 'q_budget_mid', labelKeyRu: 'q_budget_midRu', emoji: '$100–200K' },
      { value: 'high', labelKey: 'q_budget_high', labelKeyRu: 'q_budget_highRu', emoji: '$200K+' },
    ],
  },
  {
    key: 'income',
    titleKey: 'q_income_title', titleKeyRu: 'q_income_titleRu',
    options: [
      { value: 'none', labelKey: 'q_income_none', labelKeyRu: 'q_income_noneRu', emoji: '—' },
      { value: 'low', labelKey: 'q_income_low', labelKeyRu: 'q_income_lowRu', emoji: '<$400' },
      { value: 'mid', labelKey: 'q_income_mid', labelKeyRu: 'q_income_midRu', emoji: '$400–2K' },
      { value: 'high', labelKey: 'q_income_high', labelKeyRu: 'q_income_highRu', emoji: '$2K+' },
    ],
  },
  {
    key: 'remote',
    titleKey: 'q_remote_title', titleKeyRu: 'q_remote_titleRu',
    options: [
      { value: 'no', labelKey: 'q_remote_no', labelKeyRu: 'q_remote_noRu', emoji: '—' },
      { value: 'partially', labelKey: 'q_remote_partially', labelKeyRu: 'q_remote_partiallyRu', emoji: '🔄' },
      { value: 'fulltime', labelKey: 'q_remote_fulltime', labelKeyRu: 'q_remote_fulltimeRu', emoji: '🌍' },
    ],
  },
  {
    key: 'family',
    titleKey: 'q_family_title', titleKeyRu: 'q_family_titleRu',
    options: [
      { value: 'none', labelKey: 'q_family_none', labelKeyRu: 'q_family_noneRu', emoji: '—' },
      { value: 'distant', labelKey: 'q_family_distant', labelKeyRu: 'q_family_distantRu', emoji: '👥' },
      { value: 'close', labelKey: 'q_family_close', labelKeyRu: 'q_family_closeRu', emoji: '👨‍👩‍👧' },
      { value: 'married', labelKey: 'q_family_married', labelKeyRu: 'q_family_marriedRu', emoji: '💑' },
    ],
  },
  {
    key: 'citizenship',
    titleKey: 'q_citizenship_title', titleKeyRu: 'q_citizenship_titleRu',
    options: [
      { value: 'yes', labelKey: 'q_citizenship_yes', labelKeyRu: 'q_citizenship_yesRu', emoji: '🇧🇷' },
      { value: 'maybe', labelKey: 'q_citizenship_maybe', labelKeyRu: 'q_citizenship_maybeRu', emoji: '🤔' },
      { value: 'no', labelKey: 'q_citizenship_no', labelKeyRu: 'q_citizenship_noRu', emoji: '🏠' },
    ],
  },
];

const visaPrograms = [
  {
    id: 'investment', category: 'investment',
    nameKey: 'programs.investment_name', nameKeyRu: 'programs.investment_name',
    descKey: 'programs.investment_desc', descKeyRu: 'programs.investment_desc',
    bestForKey: 'programs.investment_bestFor', bestForKeyRu: 'programs.investment_bestFor',
    processingTime: '3–6 months', processingTimeRu: '3–6 мес',
    visaType: 'Permanent (PR)', visaTypeRu: 'ПМЖ',
    minInvestmentUSD: 200_000, minInvestmentUSD_NE: 100_000,
    citizenshipEligible: true, citizenshipYears: 4,
    reqKeys: ['programs.investment_req1', 'programs.investment_req2', 'programs.investment_req3', 'programs.investment_req4'],
    reqKeysRu: ['programs.investment_req1Ru', 'programs.investment_req2Ru', 'programs.investment_req3Ru', 'programs.investment_req4Ru'],
    tags: ['permanent', 'investment', 'fast-track'],
  },
  {
    id: 'business', category: 'business',
    nameKey: 'programs.business_name', nameKeyRu: 'programs.business_name',
    descKey: 'programs.business_desc', descKeyRu: 'programs.business_desc',
    bestForKey: 'programs.business_bestFor', bestForKeyRu: 'programs.business_bestFor',
    processingTime: '2–4 months', processingTimeRu: '2–4 мес',
    visaType: 'Temporary → Permanent (2y)', visaTypeRu: 'Временная → ПМЖ (2г)',
    minInvestmentUSD: 30_000,
    citizenshipEligible: true, citizenshipYears: 4,
    reqKeys: ['programs.business_req1', 'programs.business_req2', 'programs.business_req3', 'programs.business_req4'],
    reqKeysRu: ['programs.business_req1Ru', 'programs.business_req2Ru', 'programs.business_req3Ru', 'programs.business_req4Ru'],
    tags: ['business', 'temporary', 'job-creation'],
  },
  {
    id: 'retirement', category: 'retirement',
    nameKey: 'programs.retirement_name', nameKeyRu: 'programs.retirement_name',
    descKey: 'programs.retirement_desc', descKeyRu: 'programs.retirement_desc',
    bestForKey: 'programs.retirement_bestFor', bestForKeyRu: 'programs.retirement_bestFor',
    processingTime: '1–3 months', processingTimeRu: '1–3 мес',
    visaType: 'Temporary → Permanent', visaTypeRu: 'Временная → ПМЖ',
    minMonthlyIncomeUSD: 400,
    citizenshipEligible: true, citizenshipYears: 4,
    reqKeys: ['programs.retirement_req1', 'programs.retirement_req2', 'programs.retirement_req3', 'programs.retirement_req4'],
    reqKeysRu: ['programs.retirement_req1Ru', 'programs.retirement_req2Ru', 'programs.retirement_req3Ru', 'programs.retirement_req4Ru'],
    tags: ['retirement', 'passive-income', 'renewable'],
  },
  {
    id: 'digital-nomad', category: 'digital-nomad',
    nameKey: 'programs.nomad_name', nameKeyRu: 'programs.nomad_name',
    descKey: 'programs.nomad_desc', descKeyRu: 'programs.nomad_desc',
    bestForKey: 'programs.nomad_bestFor', bestForKeyRu: 'programs.nomad_bestFor',
    processingTime: '1–2 months', processingTimeRu: '1–2 мес',
    visaType: 'Temporary (1–2 years)', visaTypeRu: 'Временная (1–2 года)',
    minMonthlyIncomeUSD: 1_500, minBankBalanceUSD: 18_000,
    citizenshipEligible: true, citizenshipYears: 4,
    reqKeys: ['programs.nomad_req1', 'programs.nomad_req2', 'programs.nomad_req3'],
    reqKeysRu: ['programs.nomad_req1Ru', 'programs.nomad_req2Ru', 'programs.nomad_req3Ru'],
    tags: ['remote-work', 'temporary', 'digital-nomad'],
  },
  {
    id: 'family', category: 'family',
    nameKey: 'programs.family_name', nameKeyRu: 'programs.family_name',
    descKey: 'programs.family_desc', descKeyRu: 'programs.family_desc',
    bestForKey: 'programs.family_bestFor', bestForKeyRu: 'programs.family_bestFor',
    processingTime: '1–3 months', processingTimeRu: '1–3 мес',
    visaType: 'Temporary → Permanent', visaTypeRu: 'Временная → ПМЖ',
    citizenshipEligible: true, citizenshipYears: 4,
    reqKeys: ['programs.family_req1', 'programs.family_req2', 'programs.family_req3'],
    reqKeysRu: ['programs.family_req1Ru', 'programs.family_req2Ru', 'programs.family_req3Ru'],
    tags: ['family', 'permanent', 'direct'],
  },
  {
    id: 'marriage', category: 'marriage',
    nameKey: 'programs.marriage_name', nameKeyRu: 'programs.marriage_name',
    descKey: 'programs.marriage_desc', descKeyRu: 'programs.marriage_desc',
    bestForKey: 'programs.marriage_bestFor', bestForKeyRu: 'programs.marriage_bestFor',
    processingTime: '1–3 months', processingTimeRu: '1–3 мес',
    visaType: 'Permanent (PR)', visaTypeRu: 'ПМЖ',
    citizenshipEligible: true, citizenshipYears: 1,
    reqKeys: ['programs.marriage_req1', 'programs.marriage_req2', 'programs.marriage_req3'],
    reqKeysRu: ['programs.marriage_req1Ru', 'programs.marriage_req2Ru', 'programs.marriage_req3Ru'],
    tags: ['marriage', 'permanent', 'fast-citizenship'],
  },
];

export default function VisaPathClient() {
  const { t, language, setLanguage } = useLanguage();
  const isRu = language === 'ru';

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  const matchedPrograms = useMemo(() => {
    if (!showResults) return [];
    const { goal, budget, income, remote, family, citizenship } = answers;
    const scores: Record<string, number> = {};

    for (const p of visaPrograms) {
      let score = 0;
      if (goal === 'invest' && p.category === 'investment') score += 10;
      if (goal === 'business' && p.category === 'business') score += 10;
      if (goal === 'retire' && p.category === 'retirement') score += 10;
      if (goal === 'remote' && p.category === 'digital-nomad') score += 10;
      if (goal === 'family' && p.category === 'family') score += 10;
      if (goal === 'marriage' && p.category === 'marriage') score += 10;

      if (budget === 'high') { if (p.category === 'investment') score += 5; if (p.category === 'business') score += 3; }
      if (budget === 'mid') { if (p.category === 'investment') score += 3; if (p.category === 'business') score += 5; }
      if (budget === 'low') { if (p.category === 'business') score += 2; if (p.category === 'digital-nomad') score += 3; if (p.category === 'retirement') score += 2; }
      if (budget === 'none') { if (p.category === 'family') score += 4; if (p.category === 'marriage') score += 4; if (p.category === 'digital-nomad') score += 2; }

      if (income === 'high') { if (p.category === 'retirement') score += 5; if (p.category === 'investment') score += 3; }
      if (income === 'mid') { if (p.category === 'retirement') score += 5; if (p.category === 'digital-nomad') score += 3; }

      if (remote === 'fulltime' && p.category === 'digital-nomad') score += 5;
      if (remote === 'partially' && p.category === 'digital-nomad') score += 3;

      if (family === 'married' && p.category === 'marriage') score += 10;
      if (family === 'close' && p.category === 'family') score += 10;
      if (family === 'distant' && p.category === 'family') score += 3;

      if (citizenship === 'yes' && p.citizenshipEligible) score += 2;
      if (citizenship === 'yes' && p.citizenshipYears === 1) score += 3;

      if (score >= 2) scores[p.id] = score;
    }

    return visaPrograms.filter(p => scores[p.id]).sort((a, b) => scores[b.id] - scores[a.id]);
  }, [showResults, answers]);

  const handleAnswer = (key: string, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
    if (step < questions.length - 1) setStep(step + 1);
    else setShowResults(true);
  };

  const goBack = () => { if (step > 0) setStep(step - 1); };
  const resetQuiz = () => { setStep(0); setAnswers({}); setShowResults(false); setSelectedProgram(null); };

  const currentQ = questions[step];

  return (
    <div className="min-h-screen bg-navy-900 text-white">
      {/* Subtle accent line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />

      {/* Language Switcher */}
      <div className="pt-6 flex justify-center">
        <div className="flex items-center gap-1 bg-navy-800/90 backdrop-blur rounded-full border border-gold-400/30 p-1 shadow-lg">
          <button
            onClick={() => setLanguage('en')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              !isRu ? 'bg-gold-500 text-navy-950' : 'text-gold-400/60 hover:text-gold-400'
            }`}
          >EN</button>
          <button
            onClick={() => setLanguage('ru')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              isRu ? 'bg-gold-500 text-navy-950' : 'text-gold-400/60 hover:text-gold-400'
            }`}
          >RU</button>
        </div>
      </div>

      {/* Hero */}
      <div className="relative max-w-4xl mx-auto px-4 pt-8 pb-6 text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-gold-400" />
            <span className="text-gold-400 text-xs tracking-[0.25em] uppercase font-semibold">
              {isRu ? t('visaPath.badgeRu') : t('visaPath.badge')}
            </span>
            <div className="w-8 h-[1px] bg-gold-400" />
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-4">
            {t('visaPath.title1')}{' '}
            <span className="text-gold-400">{isRu ? t('visaPath.titleHighlightRu') : t('visaPath.titleHighlight')}</span>
          </h1>
          <p className="text-white/50 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {isRu ? t('visaPath.subtitleRu') : t('visaPath.subtitle')}
          </p>
        </motion.div>
      </div>

      <div className="max-w-3xl mx-auto px-4 pb-20">
        {/* Progress */}
        {!showResults && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-white/30 tracking-wider uppercase">
                {isRu ? t('visaPath.questionRu') : t('visaPath.question')} {step + 1} {isRu ? t('visaPath.ofRu') : t('visaPath.of')} {questions.length}
              </span>
              <span className="text-xs text-gold-400 font-semibold">{Math.round(((step + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-1">
              <motion.div
                className="bg-gradient-to-r from-[#009739] to-gold-400 h-1 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {/* Quiz */}
          {!showResults && (
            <motion.div
              key={currentQ.key}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative rounded-xl p-[1px] bg-gradient-to-b from-gold-400/20 via-gold-400/10 to-transparent">
                <div className="bg-navy-900/80 rounded-xl p-6 md:p-8">
                  <h2 className="font-heading text-xl sm:text-2xl text-white text-center mb-8">
                    {isRu ? t(`visaPath.${currentQ.titleKeyRu}`) : t(`visaPath.${currentQ.titleKey}`)}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentQ.options.map((opt, i) => (
                      <motion.button
                        key={opt.value}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => handleAnswer(currentQ.key, opt.value)}
                        className="text-left px-5 py-4 rounded-xl transition-all duration-200 bg-white/[0.03] border border-white/[0.08] hover:border-gold-400/40 hover:bg-gold-400/[0.06] group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{opt.emoji}</span>
                          <div>
                            <div className="text-sm text-white/80 group-hover:text-gold-400 transition-colors font-medium">
                              {isRu ? t(`visaPath.${opt.labelKeyRu}`) : t(`visaPath.${opt.labelKey}`)}
                            </div>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                  {step > 0 && (
                    <button
                      onClick={goBack}
                      className="mt-6 text-white/25 hover:text-gold-400 transition-colors text-xs tracking-wider uppercase"
                    >
                      ← {isRu ? 'Назад' : 'Back'}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Results */}
          {showResults && selectedProgram === null && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="w-8 h-[1px] bg-gold-400" />
                  <span className="text-gold-400 text-xs tracking-[0.25em] uppercase font-semibold">
                    {isRu ? 'Ваш результат' : 'Your Result'}
                  </span>
                  <div className="w-8 h-[1px] bg-gold-400" />
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl text-white">
                  🎯 {isRu ? t('visaPath.resultsTitleRu') : t('visaPath.resultsTitle')}
                </h2>
                <p className="text-white/40 text-sm mt-2">{isRu ? t('visaPath.resultsSubtitleRu') : t('visaPath.resultsSubtitle')}</p>
              </div>

              {matchedPrograms.length === 0 ? (
                <div className="relative rounded-xl p-[1px] bg-gradient-to-b from-gold-400/20 via-gold-400/10 to-transparent">
                  <div className="bg-navy-900/80 rounded-xl p-8 text-center">
                    <p className="text-white/50 mb-6">{isRu ? t('visaPath.noMatchTitleRu') : t('visaPath.noMatchTitle')}</p>
                    <a href="https://wa.me/5548988117424" target="_blank" rel="noopener noreferrer"
                      className="inline-block bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold px-6 py-3 rounded-lg transition text-sm">
                      💬 {isRu ? t('visaPath.freeConsultCTARu') : t('visaPath.freeConsultCTA')}
                    </a>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {matchedPrograms.map((p, i) => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => setSelectedProgram(p.id)}
                      className={`relative rounded-xl p-[1px] cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
                        i === 0
                          ? 'bg-gradient-to-b from-gold-400/30 via-gold-400/15 to-transparent'
                          : 'bg-gradient-to-b from-white/10 via-white/5 to-transparent hover:from-gold-400/20'
                      }`}
                    >
                      <div className="bg-navy-900/80 rounded-xl p-5">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            {i === 0 && (
                              <span className="inline-block px-2 py-0.5 bg-gold-500/15 text-gold-400 rounded text-[10px] font-semibold mb-2 tracking-wider uppercase">
                                {isRu ? t('visaPath.bestMatchRu') : t('visaPath.bestMatch')}
                              </span>
                            )}
                            <h3 className="font-heading text-lg text-white mb-1">
                              {isRu ? t(`visaPath.${p.nameKeyRu}`) : t(`visaPath.${p.nameKey}`)}
                            </h3>
                            <p className="text-xs text-white/40 leading-relaxed mb-3">
                              {isRu ? t(`visaPath.${p.descKeyRu}`) : t(`visaPath.${p.descKey}`)}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-2 py-0.5 bg-white/[0.05] rounded text-[10px] text-white/50 border border-white/[0.06]">
                                ⏱ {isRu ? p.processingTimeRu : p.processingTime}
                              </span>
                              <span className="px-2 py-0.5 bg-white/[0.05] rounded text-[10px] text-white/50 border border-white/[0.06]">
                                📋 {isRu ? p.visaTypeRu : p.visaType}
                              </span>
                              {p.minInvestmentUSD && (
                                <span className="px-2 py-0.5 bg-white/[0.05] rounded text-[10px] text-white/50 border border-white/[0.06]">
                                  💰 {fmtUSD(p.minInvestmentUSD)}
                                </span>
                              )}
                              {p.minMonthlyIncomeUSD && (
                                <span className="px-2 py-0.5 bg-white/[0.05] rounded text-[10px] text-white/50 border border-white/[0.06]">
                                  📈 {fmtUSD(p.minMonthlyIncomeUSD)}/mo
                                </span>
                              )}
                              {p.citizenshipEligible && (
                                <span className="px-2 py-0.5 bg-green-500/10 rounded text-[10px] text-green-400 border border-green-500/20">
                                  🇧🇷 {isRu ? 'Гражданство через' : 'Citizenship in'} {p.citizenshipYears}{isRu ? 'г' : 'yr'}
                                </span>
                              )}
                            </div>
                          </div>
                          <svg className="w-4 h-4 text-white/20 mt-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Citizenship info */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-10"
              >
                <div className="relative rounded-xl p-[1px] bg-gradient-to-b from-green-500/20 via-green-500/10 to-transparent">
                  <div className="bg-navy-900/80 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-[1px] bg-green-400/50" />
                      <h3 className="font-heading text-lg text-white">
                        🇧🇷 {isRu ? t('visaPath.citizenshipTitleRu') : t('visaPath.citizenshipTitle')}
                      </h3>
                      <div className="w-8 h-[1px] bg-green-400/50" />
                    </div>
                    <p className="text-xs text-white/40 leading-relaxed mb-6">
                      {isRu ? t('visaPath.citizenshipDescRu') : t('visaPath.citizenshipDesc')}
                    </p>

                    {/* Path visualization */}
                    <div className="flex items-start gap-1 overflow-x-auto pb-2 mb-6">
                      {[
                        { time: '0', label: isRu ? 'Резидентство' : 'Get Residency' },
                        { time: isRu ? '4 года' : '4 years', label: isRu ? 'Проживание' : 'Live in Brazil', note: isRu ? '1 год если женаты' : '1yr if married' },
                        { time: 'B1', label: isRu ? 'Португальский' : 'Portuguese test' },
                        { time: '1–3г', label: isRu ? 'Заявка на гражданство' : 'Apply for citizenship' },
                        { time: '🇧🇷', label: isRu ? 'Паспорт Бразилии' : 'Brazilian passport' },
                      ].map((p, i) => (
                        <div key={i} className="flex items-center min-w-fit">
                          <div className="text-center px-3 py-2 bg-white/[0.03] rounded-lg border border-gold-400/15">
                            <div className="text-sm font-bold text-gold-400">{p.time}</div>
                            <div className="text-[10px] text-white/40 mt-0.5">{p.label}</div>
                            {p.note && <div className="text-[9px] text-green-400/60 mt-0.5">{p.note}</div>}
                          </div>
                          {i < 4 && <div className="w-4 h-[1px] bg-gold-400/20 mx-0.5 mt-6" />}
                        </div>
                      ))}
                    </div>

                    {/* Benefits grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        { icon: '🛂', text: isRu ? 'Безвиз в 170+ стран' : 'Visa-free 170+ countries' },
                        { icon: '🏠', text: isRu ? 'Жить в любой точке Бразилии' : 'Live anywhere in Brazil' },
                        { icon: '💼', text: isRu ? 'Работа без ограничений' : 'Work without restrictions' },
                        { icon: '🎓', text: isRu ? 'Бесплатное образование' : 'Free public education' },
                        { icon: '🏥', text: isRu ? 'Медицина (SUS)' : 'Healthcare (SUS)' },
                        { icon: '🗳', text: isRu ? 'Право голоса' : 'Vote in elections' },
                      ].map((b, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-white/50">
                          <span>{b.icon}</span>
                          <span>{b.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8"
              >
                <div className="relative rounded-xl p-[1px] bg-gradient-to-b from-gold-400/30 via-gold-400/15 to-transparent">
                  <div className="bg-navy-900/80 rounded-xl p-6 text-center">
                    <p className="text-white/40 text-xs mb-4 max-w-sm mx-auto">
                      {isRu ? t('visaPath.freeNoteRu') : t('visaPath.freeNote')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <a href="https://wa.me/5548988117424" target="_blank" rel="noopener noreferrer"
                        className="inline-block bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold px-8 py-3 rounded-lg transition text-sm shadow-lg shadow-gold-500/20">
                        💬 {isRu ? t('visaPath.freeConsultCTARu') : t('visaPath.freeConsultCTA')}
                      </a>
                      <button onClick={resetQuiz}
                        className="inline-block bg-white/[0.05] hover:bg-white/[0.1] text-white/60 hover:text-gold-400 font-medium px-8 py-3 rounded-lg transition border border-white/[0.08] text-sm">
                        🔄 {isRu ? t('visaPath.startOverRu') : t('visaPath.startOver')}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Disclaimer */}
              <div className="mt-6 text-center">
                <p className="text-[10px] text-white/20 leading-relaxed">
                  ⚠️ {isRu ? t('visaPath.disclaimerRu') : t('visaPath.disclaimer')}
                </p>
              </div>
            </motion.div>
          )}

          {/* Program Detail */}
          {showResults && selectedProgram && (() => {
            const p = visaPrograms.find(pr => pr.id === selectedProgram);
            if (!p) return null;
            const reqs = isRu ? p.reqKeysRu : p.reqKeys;
            return (
              <motion.div key={`detail-${p.id}`} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
                <button
                  onClick={() => setSelectedProgram(null)}
                  className="text-white/25 hover:text-gold-400 transition-colors text-xs tracking-wider uppercase mb-6"
                >
                  ← {isRu ? t('visaPath.backRu') : t('visaPath.back')}
                </button>

                <div className="relative rounded-xl p-[1px] bg-gradient-to-b from-gold-400/30 via-gold-400/15 to-transparent">
                  <div className="bg-navy-900/80 rounded-xl p-6 md:p-8">
                    <h2 className="font-heading text-xl sm:text-2xl text-white mb-2">
                      {isRu ? t(`visaPath.${p.nameKeyRu}`) : t(`visaPath.${p.nameKey}`)}
                    </h2>
                    <p className="text-sm text-white/40 leading-relaxed mb-8">
                      {isRu ? t(`visaPath.${p.descKeyRu}`) : t(`visaPath.${p.descKey}`)}
                    </p>

                    {/* Stats grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                      <div className="bg-white/[0.03] rounded-xl p-4 text-center border border-white/[0.06]">
                        <div className="text-[10px] text-white/30 uppercase tracking-wider mb-1">{isRu ? t('visaPath.processingRu') : t('visaPath.processing')}</div>
                        <div className="text-lg font-bold text-gold-400">{isRu ? p.processingTimeRu : p.processingTime}</div>
                      </div>
                      <div className="bg-white/[0.03] rounded-xl p-4 text-center border border-white/[0.06]">
                        <div className="text-[10px] text-white/30 uppercase tracking-wider mb-1">{isRu ? t('visaPath.visaTypeRu') : t('visaPath.visaType')}</div>
                        <div className="text-sm font-bold text-white">{isRu ? p.visaTypeRu : p.visaType}</div>
                      </div>
                      {p.minInvestmentUSD && (
                        <div className="bg-white/[0.03] rounded-xl p-4 text-center border border-white/[0.06]">
                          <div className="text-[10px] text-white/30 uppercase tracking-wider mb-1">{isRu ? t('visaPath.minInvestmentRu') : t('visaPath.minInvestment')}</div>
                          <div className="text-lg font-bold text-white">{fmtUSD(p.minInvestmentUSD)}</div>
                          <div className="text-[10px] text-white/25">{fmtBRL(p.minInvestmentUSD * EXCHANGE_RATE)}</div>
                        </div>
                      )}
                      {p.minMonthlyIncomeUSD && (
                        <div className="bg-white/[0.03] rounded-xl p-4 text-center border border-white/[0.06]">
                          <div className="text-[10px] text-white/30 uppercase tracking-wider mb-1">{isRu ? t('visaPath.minIncomeRu') : t('visaPath.minIncome')}</div>
                          <div className="text-lg font-bold text-white">{fmtUSD(p.minMonthlyIncomeUSD)}</div>
                          <div className="text-[10px] text-white/25">{fmtBRL(p.minMonthlyIncomeUSD * EXCHANGE_RATE)}/mo</div>
                        </div>
                      )}
                    </div>

                    {/* Requirements */}
                    <h3 className="font-heading text-base text-white mb-3">
                      📋 {isRu ? t('visaPath.requirementsRu') : t('visaPath.requirements')}
                    </h3>
                    <div className="space-y-2 mb-8">
                      {reqs.map((r, i) => (
                        <div key={i} className="flex items-start gap-3 px-4 py-3 bg-white/[0.02] rounded-xl border border-white/[0.05]">
                          <span className="text-gold-400 mt-0.5 text-sm">✓</span>
                          <span className="text-sm text-white/60">{t(`visaPath.${r}`)}</span>
                        </div>
                      ))}
                    </div>

                    {/* Citizenship path */}
                    {p.citizenshipEligible && (
                      <div className="relative rounded-xl p-[1px] bg-gradient-to-b from-green-500/15 via-green-500/8 to-transparent mb-8">
                        <div className="bg-navy-900/60 rounded-xl p-5">
                          <h3 className="font-heading text-base text-green-400 mb-2">
                            🇧🇷 {isRu ? t('visaPath.pathToCitizenshipRu') : t('visaPath.pathToCitizenship')}
                          </h3>
                          <p className="text-xs text-white/40 leading-relaxed">
                            {isRu ? t('visaPath.eligibleAfterRu') : t('visaPath.eligibleAfter')} {p.citizenshipYears} {isRu ? (p.citizenshipYears === 1 ? t('visaPath.yearRu') : t('visaPath.yearsRu')) : (p.citizenshipYears === 1 ? t('visaPath.year') : t('visaPath.years'))} {isRu ? 'легального проживания' : 'of legal residence'}.
                            {p.citizenshipYears === 1 && ` (${isRu ? t('visaPath.fastTrackNoteRu') : t('visaPath.fastTrackNote')})`}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* CTA */}
                    <a href="https://wa.me/5548988117424" target="_blank" rel="noopener noreferrer"
                      className="block w-full bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-center py-4 rounded-lg transition text-sm shadow-lg shadow-gold-500/20">
                      💬 {isRu ? t('visaPath.helpCTARu') : t('visaPath.helpCTA')}
                    </a>
                    <p className="text-center text-[10px] text-white/25 mt-2">{isRu ? t('visaPath.freeNoteRu') : t('visaPath.freeNote')}</p>
                  </div>
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </div>
    </div>
  );
}
