"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SiteLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() || "";
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <div className="min-h-screen bg-slate-950 font-sans text-slate-100">{children}</div>;
  }

  return (
    <>
      <a
        className="fixed left-3 top-3 z-50 -translate-y-[150%] rounded-md bg-brand-forest px-4 py-2.5 text-white focus-visible:translate-y-0"
        href="#main-content"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
