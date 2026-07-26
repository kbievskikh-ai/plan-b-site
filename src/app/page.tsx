import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionManager from "@/components/SectionManager";

const SITE = "https://planbbrazil.com";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE}/#organization`,
  name: "Plan B Brazil",
  alternateName: "Konstantin Bievskikh — Plan B Brazil",
  description:
    "Independent real estate investment advisor in Santa Catarina, Brazil — not tied to any developer, works with foreign investors, provides honest yield and risk analysis for every property.",
  url: SITE,
  image: `${SITE}/opengraph-image.png`,
  telephone: "+5548988117424",
  email: "kbievskikh@planbbrazil.com",
  identifier: "CRECI-SC 59616-F",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Florianópolis",
    addressRegion: "SC",
    addressCountry: "BR",
  },
  areaServed: {
    "@type": "State",
    name: "Santa Catarina",
  },
  founder: {
    "@type": "Person",
    name: "Konstantin Bievskikh",
    jobTitle: "Independent Real Estate Investment Advisor",
    identifier: "CRECI-SC 59616-F",
  },
  sameAs: [
    "https://www.instagram.com/kbievskikh/",
    "https://www.linkedin.com/in/konstantin-bievskikh-05b61731b",
    "https://t.me/+_rolsmvxwIs0ODMy",
  ],
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Header />
      <SectionManager />
      <Footer />
    </main>
  );
}
