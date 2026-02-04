'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const investmentGoals = [
  { value: '', label: 'Select your goal...' },
  { value: 'investment', label: 'Investment / Rental Income' },
  { value: 'residence', label: 'Personal Residence' },
  { value: 'vacation', label: 'Vacation Home' },
  { value: 'business', label: 'Business / Commercial' },
  { value: 'other', label: 'Other' },
];

const budgetRanges = [
  { value: '', label: 'Select budget range...' },
  { value: '200k-500k', label: '$200k - $500k' },
  { value: '500k-1m', label: '$500k - $1M' },
  { value: '1m-2m', label: '$1M - $2M' },
  { value: '2m+', label: '$2M+' },
  { value: 'flexible', label: 'Flexible / Discuss' },
];

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

    // Simulate form submission
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
    <section id="contact" className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-gold-500" />
            <span className="text-gold-500 text-sm tracking-[0.3em] uppercase">Get Started</span>
            <div className="w-8 h-[1px] bg-gold-500" />
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-navy-900 mb-6">
            Start Your Investment Journey
          </h2>
          <p className="text-navy-900/60 max-w-3xl mx-auto text-lg">
            Ready to explore Brazilian real estate opportunities? Tell us about your goals 
            and we&apos;ll provide personalized guidance for your investment journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Contact Information */}
          <div className="lg:col-span-2">
            <div className="bg-navy-900 p-8 rounded-lg text-white">
              <h3 className="font-heading text-2xl mb-6">
                Let&apos;s Discuss Your Investment Goals
              </h3>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-navy-900 text-lg">📞</span>
                  </div>
                  <div>
                    <div className="font-medium mb-1">Phone Consultation</div>
                    <div className="text-white/70 text-sm">
                      +55 48 3333-4444<br />
                      Schedule a call at your convenience
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-navy-900 text-lg">📧</span>
                  </div>
                  <div>
                    <div className="font-medium mb-1">Email</div>
                    <div className="text-white/70 text-sm">
                      invest@migronis-brazil.com<br />
                      Detailed responses within 24 hours
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-navy-900 text-lg">📍</span>
                  </div>
                  <div>
                    <div className="font-medium mb-1">Office</div>
                    <div className="text-white/70 text-sm">
                      Florianópolis, Santa Catarina<br />
                      Brazil (by appointment)
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-navy-900 text-lg">🌐</span>
                  </div>
                  <div>
                    <div className="font-medium mb-1">Languages</div>
                    <div className="text-white/70 text-sm">
                      English, Portuguese, Spanish,<br />
                      German, French
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/20">
                <div className="text-gold-500 font-medium mb-2">Typical Response Time</div>
                <div className="text-white/70 text-sm">
                  We respond to all inquiries within 24 hours. Urgent requests are handled 
                  within 4 business hours during São Paulo business hours (UTC-3).
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
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="font-heading text-2xl text-navy-900 mb-4">
                    Thank You!
                  </h3>
                  <p className="text-navy-900/60 mb-6">
                    We&apos;ve received your inquiry and will contact you within 24 hours 
                    to discuss your Brazilian real estate investment goals.
                  </p>
                  <button 
                    onClick={() => setSubmitStatus('idle')}
                    className="btn-outline"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-navy-900 font-medium mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-navy-900/20 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-navy-900 font-medium mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-navy-900/20 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  {/* Phone and Country */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-navy-900 font-medium mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-navy-900/20 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block text-navy-900 font-medium mb-2">
                        Country of Residence *
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-navy-900/20 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors"
                        placeholder="United States"
                      />
                    </div>
                  </div>

                  {/* Investment Goal and Budget */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-navy-900 font-medium mb-2">
                        Investment Goal *
                      </label>
                      <select
                        name="goal"
                        value={formData.goal}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-navy-900/20 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors"
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
                        Budget Range *
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-navy-900/20 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors"
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
                      Message / Specific Requirements
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-navy-900/20 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors resize-none"
                      placeholder="Tell us about your investment timeline, preferred regions, specific requirements, or any questions you have..."
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
                          Sending Message...
                        </>
                      ) : (
                        <>
                          Send Message
                          <span>📨</span>
                        </>
                      )}
                    </button>
                  </div>

                  {submitStatus === 'error' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
                      There was an error sending your message. Please try again or contact us directly.
                    </div>
                  )}

                  {/* Privacy Notice */}
                  <div className="text-xs text-navy-900/40 pt-4 border-t border-gray-200">
                    By submitting this form, you agree to our privacy policy. We will never share your information 
                    with third parties and will only use it to provide you with relevant investment opportunities and updates.
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
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="font-heading text-xl text-navy-900 mb-3">
              Schedule Video Consultation
            </h3>
            <p className="text-navy-900/60 mb-6 text-sm">
              Book a 30-minute video call to discuss your investment goals and explore opportunities.
            </p>
            <button className="btn-outline w-full">
              Book Video Call
            </button>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="font-heading text-xl text-navy-900 mb-3">
              Download Investment Guide
            </h3>
            <p className="text-navy-900/60 mb-6 text-sm">
              Get our comprehensive guide to Brazilian real estate investment for foreign buyers.
            </p>
            <button className="btn-outline w-full">
              Download Guide (PDF)
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}