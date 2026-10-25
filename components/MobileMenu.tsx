"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { donationUrl, navigationItems, type NavigationItem } from "@/data/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function MobileMenu() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  function renderSubItems(items: NavigationItem[]) {
    return (
      <ul className="m-0 flex flex-col gap-1 list-none p-0 pl-3">
        {items.map((subItem) => (
          <li key={subItem.label}>
            {subItem.children?.length ? (
              <Accordion multiple className="w-full">
                <AccordionItem value={subItem.label} className="border-0">
                  <AccordionTrigger className="py-2 text-sm font-semibold text-[#2D3F12] hover:text-brand-green hover:no-underline">
                    {subItem.label}
                  </AccordionTrigger>
                  <AccordionContent className="pb-1 pt-0">
                    {renderSubItems(subItem.children)}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              <Link
                className="flex py-2 text-sm font-medium text-brand-muted hover:text-brand-forest transition-colors"
                href={subItem.href}
                aria-current={pathname === subItem.href ? "page" : undefined}
                onClick={() => setIsOpen(false)}
              >
                {subItem.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="relative ml-auto hidden max-[1180px]:block">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger
          className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-line bg-white text-brand-forest hover:bg-brand-forest/5 p-0 focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-brand-orange cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Menu</span>
        </SheetTrigger>

        <SheetContent side="right" className="w-[min(380px,calc(100vw-32px))] bg-[#f8faf4] p-6 flex flex-col justify-between overflow-y-auto">
          <div>
            <SheetHeader className="p-0 pb-6 text-left">
              <SheetTitle className="font-brand text-lg font-bold text-brand-forest uppercase tracking-wider">
                Edunite2Serve
              </SheetTitle>
            </SheetHeader>

            <nav aria-label="Mobile navigation">
              <Accordion multiple className="w-full">
                {navigationItems.map((item) => (
                  <div key={item.label} className="border-b border-[#edf0e9]">
                    {item.children?.length ? (
                      <AccordionItem value={item.label} className="border-0">
                        <AccordionTrigger className="py-3.5 font-brand text-base font-bold uppercase text-[#2D3F12] hover:text-brand-green hover:no-underline cursor-pointer">
                          <span>{item.label}</span>
                        </AccordionTrigger>
                        <AccordionContent className="pb-3 pt-0">
                          <ul className="m-0 flex flex-col gap-1 list-none p-0 pl-3">
                            <li>
                              <Link
                                className="flex py-2 text-sm font-bold text-brand-green hover:text-brand-forest transition-colors"
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                              >
                                {item.label} Overview →
                              </Link>
                            </li>
                            {item.children.map((subItem) => (
                              <li key={subItem.label}>
                                {subItem.children?.length ? (
                                  <Accordion multiple className="w-full">
                                    <AccordionItem value={subItem.label} className="border-0">
                                      <AccordionTrigger className="py-2 text-sm font-semibold text-[#2D3F12] hover:text-brand-green hover:no-underline">
                                        <span>{subItem.label}</span>
                                      </AccordionTrigger>
                                      <AccordionContent className="pb-1 pt-0">
                                        {renderSubItems(subItem.children)}
                                      </AccordionContent>
                                    </AccordionItem>
                                  </Accordion>
                                ) : (
                                  <Link
                                    className="flex py-2 text-sm font-medium text-brand-muted hover:text-brand-forest transition-colors"
                                    href={subItem.href}
                                    aria-current={pathname === subItem.href ? "page" : undefined}
                                    onClick={() => setIsOpen(false)}
                                  >
                                    {subItem.label}
                                  </Link>
                                )}
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ) : (
                      <Link
                        className="flex py-3.5 font-brand text-base font-bold uppercase text-[#2D3F12] hover:text-brand-green transition-colors"
                        href={item.href}
                        aria-current={pathname === item.href ? "page" : undefined}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </Accordion>
            </nav>
          </div>

          <div className="pt-6">
            <Button
              className="donate-attention flex min-h-16 w-full items-center justify-between gap-[18px] whitespace-nowrap rounded-[15px] border-0 bg-[#2b4012] py-[7px] pl-[22px] pr-2 font-brand text-base font-medium uppercase text-white hover:bg-[#3b531a] h-auto"
              render={<Link href={donationUrl} onClick={() => setIsOpen(false)} />}
            >
              Donate Now
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[11px] bg-[#f4f7ed] text-[#2b4012]" aria-hidden="true">
                <svg className="block h-[25px] w-[25px] fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2.2]" viewBox="0 0 24 24" focusable="false">
                  <path d="M4 12h15M13 5l7 7-7 7" />
                </svg>
              </span>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
