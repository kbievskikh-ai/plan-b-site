import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import GTMScript from "@/components/GTMScript";
import MetaPixel from "@/components/MetaPixel";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Plan B — Real Estate Investment in Brazil",
  description:
    "Independent real estate investment advisor in Santa Catarina, Brazil — not tied to any developer. Honest yield and risk analysis for foreign investors in Florianópolis, Balneário Camboriú, and coastal Santa Catarina.",
  openGraph: {
    title: "Plan B — Real Estate Investment in Brazil",
    description: "Independent real estate investment advisor in Santa Catarina, Brazil — not tied to any developer. Honest yield and risk analysis for foreign investors.",
    url: "https://planbbrazil.com",
    siteName: "Plan B Brazil",
    images: [
      {
        url: "https://planbbrazil.com/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Plan B — Real Estate Investment in Brazil",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plan B — Real Estate Investment in Brazil",
    description: "Independent real estate investment advisor in Santa Catarina, Brazil — not tied to any developer. Honest yield and risk analysis for foreign investors.",
    images: ["https://planbbrazil.com/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="preconnect" href="https://plan-b-admin-api-production.up.railway.app" />
        <link rel="dns-prefetch" href="https://plan-b-admin-api-production.up.railway.app" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body className={inter.className}>
        <GTMScript />
        <MetaPixel />
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
