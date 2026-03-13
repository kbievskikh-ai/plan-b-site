'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';

const API_URL = 'https://migronis-admin-api-production.up.railway.app';

interface ContactSettings {
  phone: string;
  email: string;
  whatsapp: string;
  address: string;
}

const DEFAULT_CONTACT: ContactSettings = {
  phone: '+55 48 988117424',
  email: 'info@migronisbrazil.com',
  whatsapp: '+55 48 99999-0000',
  address: 'Florianópolis, Santa Catarina',
};

// SVG Icons
const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);

const EmailIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

const LocationIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

const GlobeIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>
);

const DocumentIcon = () => (
  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

interface FormData {
  name: string;
  email: string;
  phone: string;
  country: string;
  goal: string;
  budget: string;
  message: string;
}

export default function ContactForm() {
  const { t } = useLanguage();
  const [contact, setContact] = useState<ContactSettings>(DEFAULT_CONTACT);

  useEffect(() => {
    fetch(`${API_URL}/api/settings`)
      .then(r => r.json())
      .then((data: Record<string, string>) => {
        setContact({
          phone: data.contact_phone || DEFAULT_CONTACT.phone,
          email: data.contact_email || DEFAULT_CONTACT.email,
          whatsapp: data.whatsapp || DEFAULT_CONTACT.whatsapp,
          address: data.contact_address || DEFAULT_CONTACT.address,
        });
      })
      .catch(() => { /* keep defaults */ });
  }, []);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    country: '',
    goal: '',
    budget: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const investmentGoals = [
    { value: '', label: t('contact.selectGoal') },
    { value: 'investment', label: t('contact.investmentRental') },
    { value: 'residence', label: t('contact.personalResidence') },
    { value: 'vacation', label: t('contact.vacationHome') },
    { value: 'business', label: t('contact.businessCommercial') },
    { value: 'other', label: t('contact.other') },
  ];

  const budgetRanges = [
    { value: '', label: t('contact.selectBudget') },
    { value: '200k-500k', label: t('contact.budget200k500k') },
    { value: '500k-1m', label: t('contact.budget500k1m') },
    { value: '1m-2m', label: t('contact.budget1m2m') },
    { value: '2m+', label: t('contact.budget2mPlus') },
    { value: 'flexible', label: t('contact.budgetFlexible') },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        country: '',
        goal: '',
        budget: '',
        message: '',
      });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-cream-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-gold-500" />
            <span className="text-gold-500 text-sm tracking-[0.3em] uppercase">{t('contact.sectionLabel')}</span>
            <div className="w-8 h-[1px] bg-gold-500" />
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-navy-900 mb-6 [text-wrap:balance]">
            {t('contact.title')}
          </h2>
          <p className="text-navy-900/60 max-w-3xl mx-auto text-lg">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Contact Information */}
          <div className="lg:col-span-2">
            <div className="bg-navy-900 p-8 rounded-lg text-white">
              <h3 className="font-heading text-xl lg:text-2xl mb-6">
                {t('contact.discussGoals')}
              </h3>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center flex-shrink-0 text-navy-900">
                    <PhoneIcon />
                  </div>
                  <div>
                    <div className="font-medium mb-1">{t('contact.phoneConsultation')}</div>
                    <div className="text-white/70 text-sm">
                      <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="hover:text-gold-400 transition-colors">{contact.phone}</a><br />
                      {t('contact.scheduleCall')}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center flex-shrink-0 text-navy-900">
                    <EmailIcon />
                  </div>
                  <div>
                    <div className="font-medium mb-1">{t('contact.email')}</div>
                    <div className="text-white/70 text-sm">
                      <a href={`mailto:${contact.email}`} className="hover:text-gold-400 transition-colors">{contact.email}</a><br />
                      {t('contact.detailedResponses')}
                    </div>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center flex-shrink-0 text-navy-900">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium mb-1">WhatsApp</div>
                    <div className="text-white/70 text-sm">
                      <a href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 transition-colors">{contact.whatsapp}</a><br />
                      {t('contact.scheduleCall')}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center flex-shrink-0 text-navy-900">
                    <LocationIcon />
                  </div>
                  <div>
                    <div className="font-medium mb-1">{t('contact.office')}</div>
                    <div className="text-white/70 text-sm">
                      {contact.address}<br />
                      {t('contact.byAppointment')}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center flex-shrink-0 text-navy-900">
                    <GlobeIcon />
                  </div>
                  <div>
                    <div className="font-medium mb-1">{t('contact.languages')}</div>
                    <div className="text-white/70 text-sm">
                      English, Português, Русский
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/20">
                <div className="text-gold-500 font-medium mb-2">{t('contact.responseTime')}</div>
                <div className="text-white/70 text-sm">
                  {t('contact.responseTimeDesc')}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              {submitStatus === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-2xl text-navy-900 mb-4">
                    {t('contact.thankYou')}
                  </h3>
                  <p className="text-navy-900/60 mb-6">
                    {t('contact.thankYouMessage')}
                  </p>
                  <button 
                    onClick={() => setSubmitStatus('idle')}
                    className="btn-outline"
                  >
                    {t('contact.sendAnother')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-navy-900 font-medium mb-2">
                        {t('contact.fullName')} *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-navy-900/20 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors placeholder:text-navy-900/40"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-navy-900 font-medium mb-2">
                        {t('contact.emailAddress')} *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-navy-900/20 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors placeholder:text-navy-900/40"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  {/* Phone and Country */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-navy-900 font-medium mb-2">
                        {t('contact.phoneNumber')}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-navy-900/20 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors placeholder:text-navy-900/40"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block text-navy-900 font-medium mb-2">
                        {t('contact.countryOfResidence')} *
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-navy-900/20 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors placeholder:text-navy-900/40"
                        placeholder="United States"
                      />
                    </div>
                  </div>

                  {/* Investment Goal and Budget */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-navy-900 font-medium mb-2">
                        {t('contact.investmentGoal')} *
                      </label>
                      <select
                        name="goal"
                        value={formData.goal}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-navy-900/20 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors placeholder:text-navy-900/40"
                      >
                        {investmentGoals.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-navy-900 font-medium mb-2">
                        {t('contact.budgetRange')} *
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-navy-900/20 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors placeholder:text-navy-900/40"
                      >
                        {budgetRanges.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-navy-900 font-medium mb-2">
                      {t('contact.message')}
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-navy-900/20 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors placeholder:text-navy-900/40 resize-none"
                      placeholder={t('contact.messagePlaceholder')}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full btn-gold flex items-center justify-center gap-2 ${
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          {t('contact.sendingMessage')}
                        </>
                      ) : (
                        <>
                          {t('contact.sendMessage')}
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>

                  {submitStatus === 'error' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
                      {t('contact.errorMessage')}
                    </div>
                  )}

                  {/* Privacy Notice */}
                  <div className="text-xs text-navy-900/40 pt-4 border-t border-gray-200">
                    {t('contact.privacyNotice')}
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>

        {/* Additional CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 mt-16"
        >
          <div className="bg-white p-8 rounded-lg shadow-lg text-center flex flex-col">
            <div className="text-gold-600 mb-4 flex justify-center">
              <CalendarIcon />
            </div>
            <h3 className="font-heading text-xl text-navy-900 mb-3">
              {t('contact.scheduleVideo')}
            </h3>
            <p className="text-navy-900/60 mb-6 text-sm flex-1">
              {t('contact.scheduleVideoDesc')}
            </p>
            <button className="btn-outline w-full">
              {t('contact.bookVideoCall')}
            </button>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg text-center flex flex-col">
            <div className="text-gold-600 mb-4 flex justify-center">
              <DocumentIcon />
            </div>
            <h3 className="font-heading text-xl text-navy-900 mb-3">
              {t('contact.downloadGuide')}
            </h3>
            <p className="text-navy-900/60 mb-6 text-sm flex-1">
              {t('contact.downloadGuideDesc')}
            </p>
            <button className="btn-outline w-full">
              {t('contact.downloadGuidePdf')}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
