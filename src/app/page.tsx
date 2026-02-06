import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedProperties from "@/components/FeaturedProperties";
import AboutMigronis from "@/components/AboutMigronis";
import WhyTrustUs from "@/components/WhyTrustUs";
import InteractiveMap from "@/components/InteractiveMap";
import InvestmentAnalytics from "@/components/InvestmentAnalytics";
import CaseStudies from "@/components/CaseStudies";
import Testimonials from "@/components/Testimonials";
import WhyBrazil from "@/components/WhyBrazil";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <FeaturedProperties />
      <AboutMigronis />
      <WhyTrustUs />
      <InteractiveMap />
      <InvestmentAnalytics />
      <CaseStudies />
      <Testimonials />
      <WhyBrazil />
      <FAQ />
      <ContactForm />
      <Footer />
    </main>
  );
}