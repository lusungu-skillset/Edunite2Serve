import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import SiteLayoutShell from "@/components/SiteLayoutShell";
import "./globals.css";
import { cn } from "@/lib/utils";

const mulish = Mulish({
  weight: "variable",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mulish",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://edunite2serve.org"),
  title: {
    default: "Edunite2Serve | Enterprise for Wholeness",
    template: "%s | Edunite2Serve",
  },
  description:
    "Edunite2Serve works through education, humanitarian service and sustainable development.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("scroll-smooth", "motion-reduce:scroll-auto", mulish.variable, "font-sans")}
    >
      <body
        suppressHydrationWarning
        className="m-0 bg-paper font-sans text-brand-ink antialiased leading-[1.6] selection:bg-[#b7dfc7] selection:text-brand-forest"
      >
        <TooltipProvider>
          <SiteLayoutShell>{children}</SiteLayoutShell>
        </TooltipProvider>
      </body>
    </html>
  );
}
