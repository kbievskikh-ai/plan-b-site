import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedProperties from "@/components/FeaturedProperties";
import RegionsMap from "@/components/RegionsMap";
import WhyBrazil from "@/components/WhyBrazil";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <FeaturedProperties />
      <WhyBrazil />
      <RegionsMap />
      <ContactForm />
      <Footer />
    </main>
  );
}
