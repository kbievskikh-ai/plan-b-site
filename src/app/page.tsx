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
import { fetchSettings } from "@/lib/api";

export default async function Home() {
  // Fetch admin settings for video URL (and any other config)
  let videoUrl: string | undefined;
  try {
    const settings = await fetchSettings();
    videoUrl = settings.video_url || undefined;
  } catch {
    // fallback: no video
  }

  return (
    <main className="min-h-screen">
      <Header />
      <Hero videoUrl={videoUrl} />
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
