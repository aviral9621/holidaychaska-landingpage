import type { Metadata } from "next";
import { Cinzel, Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/components/ModalProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileBar from "@/components/StickyMobileBar";
import InquiryModalMount from "@/components/InquiryModalMount";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  display: "swap",
});
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const SITE_URL = "https://holidaychaska.com";
const SITE_TITLE =
  "Gujarat Tour Packages | Pilgrimage, Heritage & Wildlife Tours | Holiday Chaska";
const SITE_DESCRIPTION =
  "Book the best Gujarat tour packages — Dwarka Somnath, Rann of Kutch, Statue of Unity, Gir Wildlife Safari, Bhuj Heritage & more. Customized itineraries with hotels, sightseeing & AC transfers by Holiday Chaska. Get a free quote in 2 hours.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Gujarat Tour Packages by Holiday Chaska",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Gujarat Tour Packages",
  keywords: [
    "Gujarat tour packages",
    "Gujarat tourism",
    "Dwarka Somnath tour",
    "Rann of Kutch tour",
    "Statue of Unity tour",
    "Gir Wildlife Safari",
    "Bhuj Kutch heritage tour",
    "Saurashtra Diu tour",
    "Gujarat family holiday",
    "Gujarat pilgrimage tour",
    "Holiday Chaska",
    "Gujarat travel agency",
  ],
  authors: [{ name: "Holiday Chaska" }],
  creator: "Holiday Chaska",
  publisher: "Holiday Chaska",
  category: "Travel",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/site-icon.png", type: "image/png" },
      { url: "/site-icon.png", sizes: "32x32", type: "image/png" },
      { url: "/site-icon.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/site-icon.png",
    apple: [{ url: "/site-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Gujarat Tour Packages",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/hero-desktop.jpg",
        width: 1200,
        height: 630,
        alt: "Gujarat Tour Packages — Statue of Unity, Temples, Heritage & Wildlife",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/hero-desktop.jpg"],
    creator: "@holidaychaska",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${playfair.variable} ${dmSans.variable}`}
    >
      <head>
        <link rel="preload" as="image" href="/hero-desktop.jpg" />
        <meta name="theme-color" content="#0D1B3E" />
        <meta name="format-detection" content="telephone=yes" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              name: "Gujarat Tour Packages — Holiday Chaska",
              alternateName: "Holiday Chaska",
              url: SITE_URL,
              logo: `${SITE_URL}/new logo.png`,
              image: `${SITE_URL}/hero-desktop.jpg`,
              description: SITE_DESCRIPTION,
              telephone: "+91-9717580259",
              email: "enquiry@holidaychaska.com",
              priceRange: "₹₹",
              areaServed: { "@type": "AdministrativeArea", name: "Gujarat, India" },
              address: [
                {
                  "@type": "PostalAddress",
                  streetAddress:
                    "Manral Business Center, Raja Rani Vihar, Near Birla School",
                  addressLocality: "Haldwani",
                  addressRegion: "Uttarakhand",
                  addressCountry: "IN",
                },
                {
                  "@type": "PostalAddress",
                  streetAddress: "409, Titanium City Centre Mall, Satellite",
                  addressLocality: "Ahmedabad",
                  addressRegion: "Gujarat",
                  postalCode: "380015",
                  addressCountry: "IN",
                },
              ],
              sameAs: [],
            }),
          }}
        />
      </head>
      <body>
        <ModalProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <StickyMobileBar />
          <InquiryModalMount />
        </ModalProvider>
      </body>
    </html>
  );
}
