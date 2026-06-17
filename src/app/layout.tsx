import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import GTMScript from "@/components/GTMScript";
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
    "Discover investment properties in Florianópolis, Balneário Camboriú, and coastal Brazil. Real estate for international investors.",
  openGraph: {
    title: "Plan B — Real Estate Investment in Brazil",
    description: "Discover investment properties in Florianópolis, Balneário Camboriú, and coastal Brazil. Real estate for international investors.",
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
    description: "Discover investment properties in Florianópolis, Balneário Camboriú, and coastal Brazil.",
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
      <body className={inter.className}>
        <GTMScript />
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
