import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionManager from "@/components/SectionManager";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <SectionManager />
      <Footer />
    </main>
  );
}
