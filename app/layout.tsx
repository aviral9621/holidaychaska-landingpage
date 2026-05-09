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

export const metadata: Metadata = {
  title: "Gujarat Tour Packages | Pilgrimage, Heritage & Wildlife Tours | Holiday Chaska",
  description:
    "Book the best Gujarat tour packages — Dwarka Somnath, Rann of Kutch, Statue of Unity, Gir Wildlife Safari and more. Customized packages by Holiday Chaska. Enquire now!",
  openGraph: {
    title: "Gujarat Tour Packages | Holiday Chaska",
    description:
      "Top Gujarat tour packages — tailored for families, pilgrims, and adventurers.",
    images: ["/hero-desktop.jpg"],
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
