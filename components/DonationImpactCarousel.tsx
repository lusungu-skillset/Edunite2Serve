"use client";

import {
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Quote,
  Sprout,
  Star,
  UtensilsCrossed,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

type DonationImpactItem = {
  title: string;
  quote: string;
  author: string;
  accent: string;
  icon: string;
};

type DonationImpactCarouselProps = {
  items: readonly DonationImpactItem[];
};

const accentStyles: Record<
  string,
  { borderTop: string; ink: string; wash: string; badge: string }
> = {
  teal: {
    borderTop: "border-t-[#14786f]",
    ink: "text-[#14786f]",
    wash: "bg-[#eaf4f1]",
    badge: "bg-[#e5f2ef] text-[#14786f]",
  },
  orange: {
    borderTop: "border-t-[#cf6543]",
    ink: "text-[#b65334]",
    wash: "bg-[#fbf0eb]",
    badge: "bg-[#faeee7] text-[#b65334]",
  },
  gold: {
    borderTop: "border-t-[#d4a52e]",
    ink: "text-[#957014]",
    wash: "bg-[#faf4e4]",
    badge: "bg-[#f8f1dc] text-[#957014]",
  },
};

function ImpactIcon({ name }: { name: string }) {
  const iconClassName = "h-6 w-6";

  switch (name) {
    case "healthy-food":
      return <UtensilsCrossed aria-hidden="true" className={iconClassName} strokeWidth={2} />;
    case "farming":
      return <Sprout aria-hidden="true" className={iconClassName} strokeWidth={2} />;
    case "education":
      return <GraduationCap aria-hidden="true" className={iconClassName} strokeWidth={2} />;
    default:
      return <Sprout aria-hidden="true" className={iconClassName} strokeWidth={2} />;
  }
}

export default function DonationImpactCarousel({
  items,
}: DonationImpactCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const [selectedTestimonial, setSelectedTestimonial] =
    React.useState<DonationImpactItem | null>(null);

  // Auto-advance cards from right to left every 5 seconds
  React.useEffect(() => {
    if (!api || isPaused || selectedTestimonial !== null) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const timer = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [api, isPaused, selectedTestimonial]);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div
      aria-label="Giving with purpose testimonials"
      className="relative mx-auto w-full max-w-[960px] xl:max-w-[1640px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent className="-ml-5">
          {items.map((item) => {
            const colors = accentStyles[item.accent] ?? accentStyles.teal;

            return (
              <CarouselItem
                key={item.title}
                className="pl-5 basis-full md:basis-1/2 xl:basis-1/3"
              >
                <Card
                  className={`group relative flex h-[360px] sm:h-[370px] min-w-0 flex-col justify-between overflow-hidden rounded-2xl border border-[#dfe5db] border-t-[4px] bg-white p-6 shadow-[0_4px_18px_rgba(25,49,32,.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(25,49,32,.1)] ${colors.borderTop}`}
                >
                  {/* Decorative background quote icon watermark */}
                  <Quote
                    aria-hidden="true"
                    className="pointer-events-none absolute right-4 top-4 h-16 w-16 text-black/[0.03] select-none"
                  />

                  {/* Card Header: Icon with 360-degree rotation on hover + Title & Stars */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      {/* Icon Container: spins 360 degrees smoothly when hovered! */}
                      <div
                        className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl transition-transform duration-700 ease-in-out group-hover:rotate-[360deg] shadow-xs ${colors.wash} ${colors.ink}`}
                      >
                        <ImpactIcon name={item.icon} />
                      </div>

                      <div>
                        <h3 className={`m-0 font-sans text-[18px] sm:text-[19px] font-bold leading-tight ${colors.ink}`}>
                          {item.title}
                        </h3>
                        {/* 5-Star Testimonial Rating */}
                        <div className="mt-1 flex items-center gap-0.5" aria-label="5 out of 5 stars">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className="h-3.5 w-3.5 fill-[#e99c36] text-[#e99c36]"
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wider ${colors.badge}`}
                    >
                      Impact
                    </span>
                  </div>

                  {/* Card Body: Quote preview with comfortable size, line clamping, and Read more button */}
                  <CardContent className="p-0 my-auto py-2">
                    <blockquote
                      className="m-0 text-[14px] sm:text-[15px] leading-[1.6] text-brand-muted line-clamp-3 sm:line-clamp-4 cursor-pointer hover:text-brand-forest transition-colors"
                      onClick={() => setSelectedTestimonial(item)}
                      title="Click to read full testimonial"
                    >
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>

                    <div className="mt-2.5">
                      <button
                        type="button"
                        onClick={() => setSelectedTestimonial(item)}
                        className="group/readmore inline-flex items-center gap-1.5 text-[13px] font-bold text-brand-green hover:text-brand-forest transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-1 rounded-sm py-0.5"
                        aria-haspopup="dialog"
                        aria-label={`Read more of testimonial by ${item.author}`}
                      >
                        <span>Read more</span>
                        <span
                          aria-hidden="true"
                          className="font-bold transition-transform duration-200 group-hover/readmore:translate-x-1"
                        >
                          →
                        </span>
                      </button>
                    </div>
                  </CardContent>

                  {/* Card Footer: Verified Author */}
                  <footer className="mt-auto border-t border-[#edf2ea] pt-3 flex items-center justify-between">
                    <div>
                      <cite className="not-italic font-sans text-[14px] font-bold text-brand-forest">
                        {item.author}
                      </cite>
                      <p className="m-0 text-[11px] font-semibold text-brand-green/80 uppercase tracking-wide">
                        Verified Contributor
                      </p>
                    </div>

                    <span className="text-[11px] font-semibold text-brand-muted bg-[#f4f7f1] px-2.5 py-1 rounded-full">
                      Malawi Mission
                    </span>
                  </footer>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>

      {/* Navigation Controls: Prev / Pagination dots / Next */}
      {count > 1 && (
        <div className="mt-7 flex items-center justify-between gap-4">
          <Button
            aria-label="Previous impact testimonial"
            className="h-10 w-10 rounded-full bg-brand-green text-white shadow-sm hover:bg-brand-forest p-0"
            onClick={() => api?.scrollPrev()}
          >
            <ChevronLeft aria-hidden="true" className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2">
            {Array.from({ length: count }, (_, index) => (
              <button
                aria-label={`Go to testimonial ${index + 1}`}
                aria-pressed={index === current}
                className={`h-2.5 rounded-full transition-all focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-brand-green motion-reduce:transition-none cursor-pointer ${
                  index === current ? "w-7 bg-brand-green" : "w-2.5 bg-brand-green/30"
                }`}
                key={index}
                onClick={() => api?.scrollTo(index)}
                type="button"
              />
            ))}
          </div>

          <Button
            aria-label="Next impact testimonial"
            className="h-10 w-10 rounded-full bg-brand-green text-white shadow-sm hover:bg-brand-forest p-0"
            onClick={() => api?.scrollNext()}
          >
            <ChevronRight aria-hidden="true" className="h-5 w-5" />
          </Button>
        </div>
      )}

      {/* Testimonial Full Story Modal Dialog */}
      <Dialog
        open={selectedTestimonial !== null}
        onOpenChange={(isOpen) => {
          if (!isOpen) setSelectedTestimonial(null);
        }}
      >
        <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-xl md:max-w-2xl bg-white p-6 sm:p-8 rounded-2xl border border-[#dfe5db] shadow-2xl overflow-y-auto max-h-[90vh]">
          {selectedTestimonial && (() => {
            const modalColors =
              accentStyles[selectedTestimonial.accent] ?? accentStyles.teal;

            return (
              <div className="flex flex-col gap-5">
                {/* Header: Rotating Icon, Title, Rating, Impact Badge */}
                <div className="flex items-start justify-between gap-4 border-b border-[#edf2ea] pb-4">
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl transition-transform duration-700 ease-in-out hover:rotate-[360deg] shadow-xs ${modalColors.wash} ${modalColors.ink}`}
                    >
                      <ImpactIcon name={selectedTestimonial.icon} />
                    </div>
                    <div>
                      <DialogTitle className="m-0 font-sans text-xl sm:text-2xl font-bold text-brand-forest">
                        {selectedTestimonial.title}
                      </DialogTitle>
                      <div
                        className="mt-1 flex items-center gap-1"
                        aria-label="5 out of 5 stars"
                      >
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-[#e99c36] text-[#e99c36]"
                            aria-hidden="true"
                          />
                        ))}
                        <span className="ml-1 text-xs font-semibold text-brand-muted">
                          5.0 Verified Impact
                        </span>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wider ${modalColors.badge}`}
                  >
                    Full Testimonial
                  </span>
                </div>

                {/* Full Testimonial Quote */}
                <div className="relative py-2">
                  <Quote
                    aria-hidden="true"
                    className="absolute -top-1 -left-2 h-10 w-10 text-brand-green/10 select-none pointer-events-none"
                  />
                  <DialogDescription className="text-base sm:text-[17px] leading-[1.8] text-[#24352a] font-normal pl-4 border-l-2 border-brand-green/40">
                    &ldquo;{selectedTestimonial.quote}&rdquo;
                  </DialogDescription>
                </div>

                {/* Contributor Details */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl bg-[#f8faf6] p-4 border border-[#e8efe5]">
                  <div>
                    <p className="m-0 font-sans text-[15px] font-bold text-brand-forest">
                      {selectedTestimonial.author}
                    </p>
                    <p className="m-0 text-xs font-semibold text-brand-green uppercase tracking-wide">
                      Verified Contributor & Partner
                    </p>
                  </div>
                  <span className="self-start sm:self-auto text-xs font-semibold text-brand-forest bg-[#e9f2e4] px-3 py-1 rounded-full">
                    Malawi Mission
                  </span>
                </div>

                {/* Actions */}
                <DialogFooter className="mt-2 pt-2 border-t border-[#edf2ea] bg-transparent flex flex-row items-center justify-end gap-3 -mx-0 -mb-0">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedTestimonial(null)}
                    className="rounded-xl px-5 border-[#dfe5db] text-brand-forest hover:bg-[#f5f7f0]"
                  >
                    Close
                  </Button>
                  <Button
                    className="rounded-xl bg-brand-green hover:bg-brand-forest text-white font-bold px-6 border-0"
                    render={<Link href="/donate" />}
                    onClick={() => setSelectedTestimonial(null)}
                  >
                    Support This Cause →
                  </Button>
                </DialogFooter>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
}
