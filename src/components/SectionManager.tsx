'use client';

import { useState } from 'react';
import Hero from '@/components/Hero';
import FeaturedProperties from '@/components/FeaturedProperties';
import CalculatorTeaser from '@/components/CalculatorTeaser';
import AboutMigronis from '@/components/AboutMigronis';
import WhyTrustUs from '@/components/WhyTrustUs';
// import InteractiveMap from '@/components/InteractiveMap';
import GlobalMap from '@/components/GlobalMap';
import InvestmentAnalytics from '@/components/InvestmentAnalytics';
import PropertyManagement from '@/components/PropertyManagement';
import InvestmentPackages from '@/components/InvestmentPackages';
import InvestmentIntelligence from '@/components/InvestmentIntelligence';
import CaseStudies from '@/components/CaseStudies';
import InvestorGuide from '@/components/InvestorGuide';
import Testimonials from '@/components/Testimonials';
import WhyBrazil from '@/components/WhyBrazil';
// import CountryCalculatorTeaser from '@/components/CountryCalculatorTeaser';
import PropertyFinder from '@/components/PropertyFinder';
import FAQ from '@/components/FAQ';
import ContactForm from '@/components/ContactForm';
import { useSettings } from '@/lib/settings';
import CountrySelector from '@/components/CountrySelector';

function FloatingChat() {
  const [chatOpen, setChatOpen] = useState(false);
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {chatOpen && (
        <div className="mb-4 flex flex-col gap-3 items-end">
          <a href="https://wa.me/5548988752300" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white shadow-lg rounded-full pl-4 pr-2 py-2 hover:shadow-xl transition-all duration-300 group">
            <span className="text-sm text-navy-700 group-hover:text-navy-900">WhatsApp</span>
            <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
          </a>
          <a href="https://t.me/Gronis_Leads_bot" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white shadow-lg rounded-full pl-4 pr-2 py-2 hover:shadow-xl transition-all duration-300 group">
            <span className="text-sm text-navy-700 group-hover:text-navy-900">Telegram</span>
            <div className="w-12 h-12 bg-[#0088cc] rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </div>
          </a>
        </div>
      )}
      <button onClick={() => setChatOpen(!chatOpen)}
        className={`w-16 h-16 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:scale-110 ${chatOpen ? 'bg-navy-700 rotate-45' : 'bg-gold-500 animate-bounce'}`}
        style={{ animationDuration: '2s' }}>
        {chatOpen ? (
          <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
        ) : (
          <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
        )}
      </button>
    </div>
  );
}

export default function SectionManager() {
  const { settings, show, loaded } = useSettings();

  if (!loaded) {
    return (
      <>
        <CountrySelector />
        <FloatingChat />
        <Hero />
        <FeaturedProperties />
        <PropertyFinder />
        <CalculatorTeaser />
        <AboutMigronis />
        <WhyTrustUs showClientExperience={true} />
        <GlobalMap />
        <InvestmentAnalytics />
        <PropertyManagement />
        <InvestmentPackages />
        <InvestmentIntelligence />
        <InvestorGuide />
        <CaseStudies />
        <Testimonials />
        <WhyBrazil />
        {/* <CountryCalculatorTeaser /> — hidden per request */}
        <FAQ />
        <ContactForm />
      </>
    );
  }

  return (
    <>
      <CountrySelector />
      <FloatingChat />
      {show('section_hero') && <Hero videoUrl={settings.video_url || undefined} />}
      {show('section_featured_properties') && <FeaturedProperties />}
      <PropertyFinder />
      {show('section_calculator') && <CalculatorTeaser />}
      {show('section_about') && <AboutMigronis />}
      {show('section_why_trust') && <WhyTrustUs showClientExperience={show('section_international_experience')} />}
      {show('section_map') && <GlobalMap />}
      {show('section_analytics') && <InvestmentAnalytics />}
      {show('section_property_management') && <PropertyManagement />}
      {show('section_investment_packages') && <InvestmentPackages />}
      {show('section_investment_intelligence') && <InvestmentIntelligence />}
      {show('section_investor_guide') && <InvestorGuide />}
      {show('section_case_studies') && <CaseStudies />}
      {show('section_testimonials') && <Testimonials />}
      {show('section_why_brazil') && <WhyBrazil />}
      {/* <CountryCalculatorTeaser /> — hidden per request */}
      {show('section_faq') && <FAQ />}
      {show('section_contact') && <ContactForm />}
    </>
  );
}
