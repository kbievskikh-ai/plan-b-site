"use client";

export default function ContactForm() {
  return (
    <section id="contact" className="section-padding bg-navy-900 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-full h-1 gold-gradient" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left - Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-gold-400" />
              <span className="text-gold-400 text-sm tracking-[0.3em] uppercase">Contact</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-white mb-6 leading-tight">
              Start Your <br />
              <span className="text-gold-400">Investment Journey</span>
            </h2>
            <p className="text-white/50 text-lg mb-10 leading-relaxed max-w-md">
              Get a free consultation with our Brazil property experts. We&apos;ll help
              you find the perfect investment opportunity matched to your goals.
            </p>

            {/* Contact info */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 border border-gold-400/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <div className="text-white/30 text-xs tracking-wider uppercase mb-1">Email</div>
                  <div className="text-white">brazil@migronis.com</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 border border-gold-400/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <div className="text-white/30 text-xs tracking-wider uppercase mb-1">WhatsApp</div>
                  <div className="text-white">+55 (48) 9999-0000</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 border border-gold-400/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-white/30 text-xs tracking-wider uppercase mb-1">Office</div>
                  <div className="text-white">Florianópolis, SC, Brazil</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div>
            <form className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 lg:p-10">
              <h3 className="font-heading text-2xl text-white mb-8">Request a Consultation</h3>

              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-white/40 text-xs tracking-wider uppercase mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/20 focus:border-gold-400 focus:outline-none transition-colors"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-white/40 text-xs tracking-wider uppercase mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/20 focus:border-gold-400 focus:outline-none transition-colors"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/40 text-xs tracking-wider uppercase mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/20 focus:border-gold-400 focus:outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-white/40 text-xs tracking-wider uppercase mb-2">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/20 focus:border-gold-400 focus:outline-none transition-colors"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div>
                  <label className="block text-white/40 text-xs tracking-wider uppercase mb-2">
                    Investment Budget
                  </label>
                  <select className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white/60 focus:border-gold-400 focus:outline-none transition-colors appearance-none">
                    <option value="">Select budget range</option>
                    <option value="200-500">$200,000 - $500,000</option>
                    <option value="500-1m">$500,000 - $1,000,000</option>
                    <option value="1m+">$1,000,000+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/40 text-xs tracking-wider uppercase mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/20 focus:border-gold-400 focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your investment goals..."
                  />
                </div>

                <button type="submit" className="btn-gold w-full text-center mt-2">
                  Send Request
                </button>

                <p className="text-white/20 text-xs text-center">
                  By submitting, you agree to our Privacy Policy. We&apos;ll respond within 24 hours.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
