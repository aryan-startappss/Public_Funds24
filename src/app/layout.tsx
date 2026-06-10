import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "@/styles/globals.css";
import Footer from "@/components/shared/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["600"],
});

export const metadata: Metadata = {
  title: {
    default: "Funds24 - Fast & Secure Financial Services Network",
    template: "%s | Funds24"
  },
  description: "Funds24 is a certified Financial DSA network providing access to personal loans, credit cards, insurance, and investments with 50+ trusted lenders.",
  keywords: ["financial solutions", "loans", "credit cards", "insurance", "investments", "DSA network", "Funds24"],
  authors: [{ name: "Funds24 Team" }],
  metadataBase: new URL("https://funds24.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://funds24.in",
    siteName: "Funds24",
    title: "Funds24 - Fast & Secure Financial Services Network",
    description: "Compare and apply for loans, credit cards, and investments from 50+ trusted lenders with 100% digital approvals.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Funds24 Financial Solutions",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "name": "Funds24",
  "url": "https://funds24.in",
  "logo": "https://funds24.in/logo.png",
  "description": "Premium financial service network providing access to digital loans, credit cards, and investment solutions with 50+ trusted partners.",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN"
  },
  "potentialAction": {
    "@type": "Action",
    "name": "Check Eligibility",
    "target": "https://funds24.in/signup"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${lora.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
