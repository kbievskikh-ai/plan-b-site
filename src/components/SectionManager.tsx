'use client';

import { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import FeaturedProperties from '@/components/FeaturedProperties';
import CalculatorTeaser from '@/components/CalculatorTeaser';
import AboutMigronis from '@/components/AboutMigronis';
import WhyTrustUs from '@/components/WhyTrustUs';
import InteractiveMap from '@/components/InteractiveMap';
import InvestmentAnalytics from '@/components/InvestmentAnalytics';
import PropertyManagement from '@/components/PropertyManagement';
import InvestmentPackages from '@/components/InvestmentPackages';
import InvestmentIntelligence from '@/components/InvestmentIntelligence';
import CaseStudies from '@/components/CaseStudies';
import InvestorGuide from '@/components/InvestorGuide';
import Testimonials from '@/components/Testimonials';
import WhyBrazil from '@/components/WhyBrazil';
import FAQ from '@/components/FAQ';
import ContactForm from '@/components/ContactForm';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.gronisbrazil.com';

export default function SectionManager() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/settings`)
      .then(res => res.json())
      .then(data => {
        setSettings(data);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  const show = (key: string) => settings[key] !== 'false';

  if (!loaded) {
    return (
      <>
        <Hero />
        <FeaturedProperties />
        <CalculatorTeaser />
        <AboutMigronis />
        <WhyTrustUs showClientExperience={true} />
        <InteractiveMap />
        <InvestmentAnalytics />
        <PropertyManagement />
        <InvestmentPackages />
        <InvestmentIntelligence />
        <InvestorGuide />
        <CaseStudies />
        <Testimonials />
        <WhyBrazil />
        <FAQ />
        <ContactForm />
      </>
    );
  }

  return (
    <>
      {show('section_hero') && <Hero videoUrl={settings.video_url || undefined} />}
      {show('section_featured_properties') && <FeaturedProperties />}
      {show('section_calculator') && <CalculatorTeaser />}
      {show('section_about') && <AboutMigronis />}
      {show('section_why_trust') && <WhyTrustUs showClientExperience={show('section_international_experience')} />}
      {show('section_map') && <InteractiveMap />}
      {show('section_analytics') && <InvestmentAnalytics />}
      {show('section_property_management') && <PropertyManagement />}
      {show('section_investment_packages') && <InvestmentPackages />}
      {show('section_investment_intelligence') && <InvestmentIntelligence />}
      {show('section_investor_guide') && <InvestorGuide />}
      {show('section_case_studies') && <CaseStudies />}
      {show('section_testimonials') && <Testimonials />}
      {show('section_why_brazil') && <WhyBrazil />}
      {show('section_faq') && <FAQ />}
      {show('section_contact') && <ContactForm />}
    </>
  );
}
