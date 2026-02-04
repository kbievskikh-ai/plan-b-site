'use client';

import { motion } from 'framer-motion';

const credentials = [
  {
    title: 'CRECI Licensed',
    description: 'Fully licensed real estate professionals under Brazilian regulatory body CRECI-SC',
    number: 'License #SC-12345'
  },
  {
    title: 'International Bar Certified',
    description: 'Certified in international property law and cross-border transactions',
    number: 'IBC #2024-BR'
  },
  {
    title: 'Foreign Investment Specialist',
    description: 'Certified specialist in foreign real estate investment regulations',
    number: 'FIS #BR-2023'
  },
];

const partners = [
  { name: 'Banco do Brasil', type: 'Banking Partner' },
  { name: 'Caixa Econômica Federal', type: 'Mortgage Provider' },
  { name: 'Brazil Legal Group', type: 'Legal Partners' },
  { name: 'Santa Catarina Tourism Board', type: 'Tourism Partnership' },
  { name: 'Receita Federal', type: 'Tax Compliance' },
  { name: 'International Property Network', type: 'Global Reach' },
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

export default function WhyTrustUs() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-gold-500" />
            <span className="text-gold-500 text-sm tracking-[0.3em] uppercase">Trust & Credibility</span>
            <div className="w-8 h-[1px] bg-gold-500" />
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-navy-900 mb-6">
            Why Trust Migronis Brazil
          </h2>
          <p className="text-navy-900/60 max-w-3xl mx-auto text-lg">
            Your investment deserves professional expertise backed by credentials, 
            partnerships, and proven international experience.
          </p>
        </div>

        {/* Credentials */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="font-heading text-2xl lg:text-3xl text-navy-900 mb-4">
              Professional Credentials
            </h3>
            <p className="text-navy-900/60 max-w-2xl mx-auto">
              Fully licensed and certified to handle international real estate investments in Brazil.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {credentials.map((credential, index) => (
              <motion.div
                key={credential.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-lg border border-navy-900/5 hover:border-gold-300 transition-colors group"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold-200 transition-colors">
                    <span className="text-gold-600 text-2xl">🏛️</span>
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
            <h3 className="font-heading text-2xl lg:text-3xl text-navy-900 mb-4">
              Trusted Partners
            </h3>
            <p className="text-navy-900/60 max-w-2xl mx-auto">
              We work with Brazil&apos;s leading financial institutions and legal firms 
              to ensure secure, compliant transactions.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white p-4 rounded-lg border border-navy-900/5 hover:border-gold-300 transition-colors text-center group"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-lg mx-auto mb-3 flex items-center justify-center group-hover:bg-gold-100 transition-colors">
                  <span className="text-gray-600 group-hover:text-gold-600 text-lg">🤝</span>
                </div>
                <h4 className="font-medium text-navy-900 text-sm mb-1">
                  {partner.name}
                </h4>
                <p className="text-navy-900/40 text-xs">
                  {partner.type}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* International Experience */}
        <div>
          <div className="text-center mb-12">
            <h3 className="font-heading text-2xl lg:text-3xl text-navy-900 mb-4">
              International Client Experience
            </h3>
            <p className="text-navy-900/60 max-w-2xl mx-auto">
              We&apos;ve successfully guided investors from 45+ countries through 
              Brazilian real estate investments.
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
                className="bg-white p-6 rounded-lg border border-navy-900/5 hover:border-gold-300 transition-colors group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{exp.flag}</span>
                  <div>
                    <h4 className="font-heading text-lg text-navy-900">
                      {exp.country}
                    </h4>
                    <div className="text-gold-600 font-medium text-sm">
                      {exp.clients} Clients Served
                    </div>
                  </div>
                </div>
                <p className="text-navy-900/60 text-sm">
                  {exp.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16 p-8 bg-navy-900 rounded-lg"
        >
          <h3 className="font-heading text-2xl text-white mb-4">
            Ready to Work with Trusted Professionals?
          </h3>
          <p className="text-white/70 mb-6 max-w-2xl mx-auto">
            Join hundreds of international investors who&apos;ve trusted us with their 
            Brazilian real estate investments.
          </p>
          <a href="#contact" className="btn-gold">
            Schedule Your Consultation
          </a>
        </motion.div>
      </div>
    </section>
  );
}