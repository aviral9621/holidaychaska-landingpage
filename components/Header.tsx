"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useInquiryModal } from "./ModalProvider";
import { waUrl } from "@/lib/whatsapp";
import { WhatsAppIcon, HamburgerIcon, BriefcaseIcon, PhoneIcon } from "./Icons";

const NAV = [
  { label: "Home", href: "#home" },
  { label: "Tour Packages", href: "#packages" },
  { label: "Why Choose Us", href: "#why-choose-us" },
  { label: "Testimonials", href: "#trust" },
  { label: "FAQ", href: "#faq" },
  { label: "Inquiry", href: "#inquiry" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openModal } = useInquiryModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll when drawer is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [menuOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[100] transition-all"
        style={{
          background: scrolled ? "rgba(6,15,10,0.98)" : "rgba(6,15,10,0.92)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          boxShadow: scrolled
            ? "var(--shadow-header)"
            : "0 1px 0 rgba(201,146,42,0.12)",
        }}
      >
        <div className="max-w-[1480px] mx-auto h-[80px] sm:h-[88px] lg:h-[96px] px-4 sm:px-7 lg:px-10 flex items-center justify-between gap-4 relative">
          {/* MOBILE / TABLET (under xl): hamburger left */}
          <button
            type="button"
            className="xl:hidden text-white p-2 -ml-2 z-[2] flex-shrink-0"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <HamburgerIcon width={28} height={28} />
          </button>

          {/* Logo: left on desktop, absolutely-centered on mobile/tablet */}
          <Link
            href="#home"
            aria-label="Uttarakhand Tour Packages — Home"
            className="flex items-center flex-shrink-0 z-[1]
                       xl:static xl:translate-x-0
                       absolute left-1/2 -translate-x-1/2"
          >
            <Image
              src="/new logo.png"
              alt="Uttarakhand Tour Packages — A Holiday Chaska Company"
              width={320}
              height={84}
              priority
              style={{ width: "auto", maxWidth: "none" }}
              className="object-contain object-center xl:object-left logo-img"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-7 2xl:gap-9">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="text-white text-[12.5px] font-semibold uppercase tracking-[0.1em] hover:text-[var(--color-gold-light)] transition-colors relative
                           after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-2 after:h-[2px] after:bg-[var(--color-gold)] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3 z-[2] flex-shrink-0">
            <a
              href="#packages"
              className="hidden xl:inline-flex header-btn header-btn-outline"
            >
              <BriefcaseIcon width={16} height={16} />
              <span>Explore Packages</span>
            </a>
            <button
              type="button"
              onClick={() => openModal()}
              className="hidden xl:inline-flex header-btn header-btn-gold"
            >
              <PhoneIcon width={15} height={15} />
              <span>Enquire Now</span>
            </button>
            <a
              href={waUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="header-btn header-btn-wa hidden xl:inline-flex"
            >
              <WhatsAppIcon width={17} height={17} />
              <span>WhatsApp Us</span>
            </a>

            {/* Tablet/mobile compact CTA */}
            <a
              href="#packages"
              aria-label="View Packages"
              className="xl:hidden inline-flex items-center justify-center gap-1.5 h-10 sm:h-11 px-3 sm:px-4 rounded-md bg-[var(--color-gold)] text-white font-semibold text-[12px] uppercase tracking-[0.06em] whitespace-nowrap shadow-[0_4px_14px_rgba(201,146,42,0.35)] hover:bg-[var(--color-gold-light)] transition"
            >
              <BriefcaseIcon width={15} height={15} />
              <span className="hidden sm:inline">View Packages</span>
            </a>
          </div>
        </div>
      </header>

      {/*
        Mobile/tablet drawer — rendered OUTSIDE <header> on purpose.
        The header has `backdrop-filter`, which creates a containing block,
        so a `fixed` child would only fill the header strip, not the viewport.
      */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[150] xl:hidden flex flex-col"
          style={{ background: "var(--color-navy-dark)" }}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          {/* Drawer header */}
          <div
            className="flex items-center justify-between px-5 border-b border-[var(--color-border)] flex-shrink-0"
            style={{ height: 80 }}
          >
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="text-white text-3xl p-2 -ml-2"
            >
              ✕
            </button>
            <Image
              src="/new logo.png"
              alt="Uttarakhand Tour Packages"
              width={260}
              height={64}
              style={{ width: "auto", height: 52 }}
              className="object-contain"
              priority
            />
            <span className="w-9" aria-hidden />
          </div>

          {/* Nav body */}
          <nav className="flex-1 flex flex-col px-6 py-6 overflow-y-auto">
            <ul className="flex flex-col gap-1 mb-6">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    onClick={() => setMenuOpen(false)}
                    className="block text-white text-[15px] font-semibold uppercase tracking-[0.1em] py-3.5 border-b border-[rgba(255,255,255,0.08)] hover:text-[var(--color-gold-light)] transition"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3 mt-auto pt-4">
              <a
                href="#packages"
                onClick={() => setMenuOpen(false)}
                className="header-btn header-btn-outline inline-flex justify-center"
              >
                <BriefcaseIcon width={16} height={16} />
                <span>Explore Packages</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  openModal();
                }}
                className="header-btn header-btn-gold inline-flex justify-center"
              >
                <PhoneIcon width={15} height={15} />
                <span>Enquire Now</span>
              </button>
              <a
                href={waUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="header-btn header-btn-wa inline-flex justify-center"
              >
                <WhatsAppIcon width={17} height={17} />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
