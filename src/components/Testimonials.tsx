"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import ScrollAnimation from "./ScrollAnimation";

const testimonials = [
  {
    id: 1,
    name: "Michael Chen",
    country: "Singapore",
    investmentType: "Investment Property",
    quote: "Migronis made our first international property investment seamless. Their team guided us through every step, from property selection to legal documentation. Our Balneário Camboriú apartment has exceeded ROI expectations.",
    image: null, // Placeholder
  },
  {
    id: 2,
    name: "Sarah & James Wilson",
    country: "United Kingdom",
    investmentType: "Vacation Home",
    quote: "We dreamed of a vacation home in Brazil for years. The Migronis team understood our vision and found us the perfect villa in Florianópolis. The process was transparent and their ongoing property management service is excellent.",
    image: null,
  },
  {
    id: 3,
    name: "Alexander Petrov",
    country: "Germany",
    investmentType: "Portfolio Investment",
    quote: "As a portfolio investor, I needed a partner who understood both the Brazilian market and international tax implications. Migronis delivered comprehensive analysis and helped me build a diversified Brazilian property portfolio.",
    image: null,
  },
  {
    id: 4,
    name: "Maria González",
    country: "Spain",
    investmentType: "Residential Relocation",
    quote: "Moving to Brazil was a big decision. Migronis not only found us the ideal home in Itapema but also connected us with relocation services, banking, and local community. True end-to-end support.",
    image: null,
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="section-padding bg-navy-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-1 gold-gradient" />
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <ScrollAnimation className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-gold-400" />
            <span className="text-gold-400 text-sm tracking-[0.3em] uppercase">Testimonials</span>
            <div className="w-8 h-[1px] bg-gold-400" />
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-white mb-4 [text-wrap:balance]">
            Client Success Stories
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Hear from international investors who trusted Migronis with their Brazilian property journey.
          </p>
        </ScrollAnimation>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Main testimonial */}
          <ScrollAnimation>
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-12 max-w-4xl mx-auto"
            >
              {/* Quote icon */}
              <svg className="w-12 h-12 text-gold-400/30 mb-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <blockquote className="text-white/90 text-xl md:text-2xl font-light leading-relaxed mb-8">
                &ldquo;{testimonials[activeIndex].quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-4">
                {/* Avatar placeholder */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-navy-900 font-heading text-xl">
                  {testimonials[activeIndex].name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="text-white font-medium text-lg">
                    {testimonials[activeIndex].name}
                  </div>
                  <div className="text-white/50 text-sm">
                    {testimonials[activeIndex].country} · {testimonials[activeIndex].investmentType}
                  </div>
                </div>
              </div>
            </motion.div>
          </ScrollAnimation>

          {/* Navigation dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 transition-all duration-300 ${
                  index === activeIndex 
                    ? 'bg-gold-400 scale-125' 
                    : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          {/* Arrow navigation */}
          <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-0 right-0 justify-between pointer-events-none">
            <button
              onClick={() => setActiveIndex(i => (i - 1 + testimonials.length) % testimonials.length)}
              className="pointer-events-auto w-12 h-12 border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-gold-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setActiveIndex(i => (i + 1) % testimonials.length)}
              className="pointer-events-auto w-12 h-12 border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-gold-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
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
