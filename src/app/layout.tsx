import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import GTMScript from "@/components/GTMScript";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Migronis Real Estate — Premium Properties in Santa Catarina, Brazil",
  description:
    "Discover exclusive investment properties in Florianópolis, Balneário Camboriú, and coastal Brazil. Premium real estate for discerning investors.",
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
      </body>
    </html>
  );
}
