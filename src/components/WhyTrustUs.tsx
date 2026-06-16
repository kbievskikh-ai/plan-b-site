'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';

// SVG Icons
const BuildingIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
  </svg>
);


export default function WhyTrustUs({ showClientExperience = true }: { showClientExperience?: boolean }) {
  const { t } = useLanguage();

  const credentials = [
    {
      title: t('trust.creciLicensed'),
      description: t('trust.creciDesc'),
      number: 'CRECI-SC 59616'
    },
  ];

  const partners = [
    {
      name: 'Caixa Econômica Federal',
      type: 'Mortgage Provider',
      url: 'https://www.caixa.gov.br/',
      abbr: 'CEF',
    },
    {
      name: 'Receita Federal',
      type: 'Tax Compliance',
      url: 'https://www.gov.br/receitafederal/',
      abbr: 'RF',
    },
    {
      name: 'Banco do Brasil',
      type: 'Banking Partner',
      url: 'https://www.bb.com.br/',
      abbr: 'BB',
    },
    {
      name: 'Brazil Legal Group',
      type: 'Legal Partners',
      url: 'https://brazillegalgroup.com/',
      abbr: 'BLG',
    },
    {
      name: 'Santa Catarina Tourism Board',
      type: 'Tourism Partnership',
      url: 'https://www.santur.sc.gov.br/',
      abbr: 'SANTUR',
    },
    {
      name: 'International Property Network',
      type: 'Global Reach',
      url: 'https://www.ipn.org/',
      abbr: 'IPN',
    },
  ];

  const experiences = [
    {
      flag: '🇺🇸',
      country: 'United States',
      clients: '150+',
      description: 'American investors seeking vacation homes and rental properties'
    },
    {
      flag: '🇩🇪',
      country: 'Germany',
      clients: '80+',
      description: 'European investors attracted to Brazil\'s growing economy'
    },
    {
      flag: '🇦🇷',
      country: 'Argentina',
      clients: '120+',
      description: 'Regional investors leveraging currency advantages'
    },
    {
      flag: '🇫🇷',
      country: 'France',
      clients: '45+',
      description: 'French investors in luxury coastal developments'
    },
    {
      flag: '🇨🇦',
      country: 'Canada',
      clients: '60+',
      description: 'Canadian retirees and winter residence seekers'
    },
    {
      flag: '🇬🇧',
      country: 'United Kingdom',
      clients: '35+',
      description: 'UK investors in Brazilian real estate opportunities'
    },
  ];

  return (
    <section className="section-padding bg-cream-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-gold-500" />
            <span className="text-gold-500 text-sm tracking-[0.3em] uppercase">{t('trust.sectionLabel')}</span>
            <div className="w-8 h-[1px] bg-gold-500" />
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-navy-900 mb-6 [text-wrap:balance]">
            {t('trust.title')}
          </h2>
          <p className="text-navy-900/60 max-w-3xl mx-auto text-lg">
            {t('trust.subtitle')}
          </p>
        </div>

        {/* Credentials */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="font-heading text-xl lg:text-2xl text-navy-900 mb-4">
              {t('trust.credentials')}
            </h3>
            <p className="text-navy-900/60 max-w-2xl mx-auto">
              {t('trust.credentialsSubtitle')}
            </p>
          </div>

          <div className="flex justify-center">
            {credentials.map((credential, index) => (
              <motion.div
                key={credential.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-lg border border-navy-900/10 hover:border-gold-300 transition-colors group max-w-sm w-full"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold-200 transition-colors">
                    <span className="text-gold-600"><BuildingIcon /></span>
                  </div>
                  <h4 className="font-heading text-lg text-navy-900 mb-2">
                    {credential.title}
                  </h4>
                  <p className="text-navy-900/60 text-sm mb-4">
                    {credential.description}
                  </p>
                  <div className="text-gold-600 font-mono text-xs tracking-wider">
                    {credential.number}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Partners */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="font-heading text-xl lg:text-2xl text-navy-900 mb-4">
              {t('trust.partners')}
            </h3>
            <p className="text-navy-900/60 max-w-2xl mx-auto">
              {t('trust.partnersSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {partners.map((partner, index) => (
              <motion.a
                key={partner.name}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white p-4 rounded-lg border border-navy-900/10 hover:border-gold-300 transition-colors text-center group cursor-pointer no-underline"
              >
                {/* Logo-like block */}
                <div className="w-full h-12 bg-cream-50 rounded-lg mx-auto mb-3 flex items-center justify-center group-hover:bg-gold-50 transition-colors border border-gray-100 group-hover:border-gold-200">
                  <span className="text-navy-900/60 group-hover:text-gold-700 font-bold text-xs tracking-widest uppercase px-2 text-center">
                    {partner.abbr}
                  </span>
                </div>
                <h4 className="font-medium text-navy-900 text-xs mb-1 leading-tight">
                  {partner.name}
                </h4>
                <p className="text-navy-900/50 text-[10px]">
                  {partner.type}
                </p>
              </motion.a>
            ))}
          </div>
        </div>

        {/* International Experience */}
        {showClientExperience && <div>
          <div className="text-center mb-12">
            <h3 className="font-heading text-xl lg:text-2xl text-navy-900 mb-4">
              {t('trust.internationalExperience')}
            </h3>
            <p className="text-navy-900/60 max-w-2xl mx-auto">
              {t('trust.internationalExperienceSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.country}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg border border-navy-900/10 hover:border-gold-300 transition-colors group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{exp.flag}</span>
                  <div>
                    <h4 className="font-heading text-lg text-navy-900">
                      {exp.country}
                    </h4>
                    <div className="text-gold-600 font-medium text-sm">
                      {exp.clients} {t('trust.clientsServed')}
                    </div>
                  </div>
                </div>
                <p className="text-navy-900/60 text-sm">
                  {exp.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>}

        {/* Trust CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16 p-8 bg-navy-900 rounded-lg"
        >
          <h3 className="font-heading text-2xl text-white mb-4">
            {t('trust.readyToWork')}
          </h3>
          <p className="text-white/70 mb-6 max-w-2xl mx-auto">
            {t('trust.readyToWorkSubtitle')}
          </p>
          <a href="https://wa.me/5548988117424" target="_blank" rel="noopener noreferrer" className="btn-gold">
            {t('trust.scheduleConsultation')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
