"use client";

import { motion } from "framer-motion";
import ScrollAnimation from "./ScrollAnimation";

const reasons = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: "High ROI Potential",
    desc: "Average 10-15% annual return on coastal properties, with strong appreciation trends in Santa Catarina.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Golden Visa Program",
    desc: "Brazil's investor visa program offers residency for property investments starting from $200,000 USD.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: "Year-Round Climate",
    desc: "Subtropical climate with 300+ days of sunshine. Perfect conditions for vacation homes and rental income.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Secure Investment",
    desc: "Transparent legal framework for foreign buyers. Full title deed ownership with complete property rights.",
  },
];

export default function WhyBrazil() {
  return (
    <section id="investment" className="section-padding bg-navy-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-5">
        <div className="w-full h-full" style={{
          background: "radial-gradient(circle at 70% 30%, #c9963c 0%, transparent 60%)",
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div>
            <ScrollAnimation>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[1px] bg-gold-400" />
                <span className="text-gold-400 text-sm tracking-[0.3em] uppercase">Why Brazil</span>
                <div className="w-8 h-[1px] bg-gold-400" />
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-white mb-6 leading-tight [text-wrap:balance]">
                The Smart Money is Moving to{" "}
                <span className="text-gold-400">Santa Catarina</span>
              </h2>
              <p className="text-white/60 text-lg mb-12 leading-relaxed">
                Santa Catarina has been ranked as Brazil&apos;s #1 state for quality of life
                for 5 consecutive years. With booming infrastructure, international
                airports, and a thriving expat community.
              </p>
            </ScrollAnimation>

            <div className="grid sm:grid-cols-2 gap-8">
              {reasons.map((reason, i) => (
                <ScrollAnimation key={i} delay={i * 0.1}>
                  <motion.div 
                    className="group"
                    whileHover={{ x: 5 }}
                  >
                    <div className="text-gold-400 mb-3 group-hover:scale-110 transition-transform duration-300 inline-block">
                      {reason.icon}
                    </div>
                    <h3 className="text-white font-medium mb-2 text-lg">{reason.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{reason.desc}</p>
                  </motion.div>
                </ScrollAnimation>
              ))}
            </div>
          </div>

          {/* Right - Image placeholder / Stats */}
          <ScrollAnimation direction="right">
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-navy-700 to-navy-800 relative overflow-hidden">
                {/* Decorative overlay simulating a luxury building photo */}
                <div className="absolute inset-0" style={{
                  background: "linear-gradient(160deg, #1a2a3a 0%, #0d1a2a 40%, #1a3a4a 70%, #0d2a3a 100%)",
                }} />
                {/* Gold accent border */}
                <div className="absolute bottom-0 left-0 right-0 h-1 gold-gradient" />
                {/* Floating stats card */}
                <motion.div 
                  className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md p-6 border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-gold-400 font-heading text-2xl">35%</div>
                      <div className="text-white/60 text-xs tracking-wider uppercase mt-1">
                        5-Year Price Growth
                      </div>
                    </div>
                    <div>
                      <div className="text-gold-400 font-heading text-2xl">#1</div>
                      <div className="text-white/60 text-xs tracking-wider uppercase mt-1">
                        Quality of Life
                      </div>
                    </div>
                    <div>
                      <div className="text-gold-400 font-heading text-2xl">8.2%</div>
                      <div className="text-white/60 text-xs tracking-wider uppercase mt-1">
                        Rental Yield
                      </div>
                    </div>
                    <div>
                      <div className="text-gold-400 font-heading text-2xl">$200K</div>
                      <div className="text-white/60 text-xs tracking-wider uppercase mt-1">
                        Min. Investment
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              {/* Decorative gold corner */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-gold-400/30" />
            </div>
          </ScrollAnimation>
        </div>

        {/* CTA */}
        <ScrollAnimation className="text-center mt-16">
          <a href="#contact" className="btn-gold inline-block">
            Get Consultation
          </a>
        </ScrollAnimation>
      </div>
    </section>
  );
}
