"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import DesktopNavigation from "@/components/DesktopNavigation";
import MobileMenu from "@/components/MobileMenu";
import { contactDetails, donationUrl } from "@/data/navigation";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 60) {
        setIsScrolled(true);

        // Scrolling down: hide header; Scrolling up / sliding down: reveal header
        if (currentScrollY > lastScrollY.current && currentScrollY > 120) {
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY.current) {
          setIsVisible(true);
        }
      } else {
        setIsScrolled(false);
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 z-50 w-full transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${isScrolled ? "shadow-lg shadow-black/5" : ""}`}
    >
      {/* Top Utility Bar: Email on Top Left, Contact on Top Right */}
      <div className="bg-[#2b4012] font-sans text-xs sm:text-sm text-white border-b border-[#3b531a]">
        <div className="mx-auto flex min-h-[38px] sm:min-h-[44px] w-full max-w-[1720px] items-center justify-between px-4 sm:px-10">
          {/* Top Left: Email */}
          <a
            className="inline-flex items-center gap-1.5 text-white/95 hover:text-brand-lime transition-colors font-medium text-xs sm:text-sm"
            href={`mailto:${contactDetails.email}`}
            aria-label={`Email ${contactDetails.email}`}
          >
            <span aria-hidden="true" className="text-brand-lime font-bold">✉</span>
            <span className="truncate max-w-[200px] sm:max-w-none">{contactDetails.email}</span>
          </a>

          {/* Top Right: Contact */}
          <div className="flex items-center gap-3 sm:gap-6">
            <a
              className="inline-flex items-center gap-1.5 text-white/95 hover:text-brand-lime transition-colors font-medium text-xs sm:text-sm"
              href={`tel:${contactDetails.phoneHref}`}
              aria-label={`Call ${contactDetails.phoneLabel}`}
            >
              <span aria-hidden="true" className="text-brand-lime font-bold">☎</span>
              <span>{contactDetails.phoneLabel}</span>
            </a>
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center text-xs font-bold uppercase tracking-wider text-brand-lime hover:text-white transition-colors"
            >
              Contact &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="border-b border-[#e7eddf] bg-[#f5f8ef]/95 backdrop-blur-md font-sans text-[#2D3F12]">
        <div className="mx-auto flex min-h-[84px] sm:min-h-[96px] w-full max-w-[1720px] items-center justify-between gap-[clamp(14px,2vw,30px)] px-4 sm:px-10 max-[720px]:px-[18px] max-[440px]:px-[15px]">
          <Link
            className="w-[205px] max-w-[22vw] shrink-0 max-[1180px]:w-[190px] max-[1040px]:w-[200px] max-[1040px]:max-w-[54vw] max-[440px]:w-[175px] focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-brand-orange"
            href="/"
            aria-label="Edunite2Serve home"
          >
            <Image
              src="/images/brand/edunite2serve-logo.png"
              alt="Edunite2Serve — Enterprise for Wholeness"
              width={528}
              height={183}
              priority
              className="block h-auto w-full"
            />
          </Link>

          <DesktopNavigation />

          <Button
            className="donate-attention ml-1 inline-flex min-h-14 items-center justify-between gap-[18px] whitespace-nowrap rounded-[15px] border-0 bg-[#2b4012] py-[2px] pl-[22px] pr-2 font-brand text-base font-bold text-white transition-colors duration-150 motion-reduce:transition-none hover:bg-[#3b531a] max-[1180px]:hidden h-auto"
            render={<Link href={donationUrl} />}
          >
            Donate Now
            <span
              className="grid h-10 w-10 shrink-0 place-items-center rounded-[11px] bg-[#f4f7ed] text-[#2b4012]"
              aria-hidden="true"
            >
              <svg
                className="block h-[22px] w-[22px] fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2.2]"
                viewBox="0 0 24 24"
                focusable="false"
              >
                <path d="M4 12h15M13 5l7 7-7 7" />
              </svg>
            </span>
          </Button>
          <MobileMenu />
        </div>
      </header>
    </div>
  );
}
