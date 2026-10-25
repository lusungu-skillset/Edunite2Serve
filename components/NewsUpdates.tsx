"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Pause,
  Play,
  Quote,
  Sparkles,
  User,
} from "lucide-react";
import type { NewsSectionContent, NewsStory } from "@/data/news";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { donationUrl } from "@/data/navigation";

export default function NewsUpdates({
  content,
}: {
  content: NewsSectionContent;
}) {
  const { eyebrow, title, description, items, href, hrefLabel, itemLinkLabel } =
    content;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeStory, setActiveStory] = useState<NewsStory | null>(null);

  const total = items.length;

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-advance news posts from right to left every 4.5 seconds
  useEffect(() => {
    if (isPaused || activeStory !== null) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const timer = setInterval(() => {
      handleNext();
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused, activeStory, handleNext]);

  return (
    <section
      className="relative overflow-hidden bg-[#faf7f2] py-[96px] max-[720px]:py-[68px] border-y border-[#ede6da]"
      id="news-updates"
      aria-labelledby="news-updates-heading"
    >
      <div className="mx-auto w-full max-w-[1720px] px-10 max-[720px]:max-w-[596px] max-[720px]:px-[18px] max-[440px]:max-w-[570px] max-[440px]:px-[15px]">
        {/* Section Header with Homepage Signature Style */}
        <div className="mb-[40px] flex items-end justify-between gap-[25px] max-[760px]:flex-col max-[760px]:items-start max-[760px]:gap-[19px]">
          <div className="mb-0 max-w-[760px]">
            {/* Signature Eyebrow: Cursive font-brand + rule + sparkle */}
            <div className="mb-[18px] flex w-full items-center gap-4 text-left">
              <p className="giving-purpose-heading m-0 whitespace-nowrap font-brand text-[clamp(24px,3vw,38px)] font-extrabold italic leading-[1.1] tracking-[-.04em] text-[#00876f]">
                {eyebrow}
              </p>
              <span
                aria-hidden="true"
                className="giving-purpose-rule h-px min-w-[22px] flex-1 max-w-[120px] bg-[#83b9a7]"
              />
              <svg
                aria-hidden="true"
                className="giving-purpose-sparkle h-[19px] w-[19px] shrink-0 text-[#00876f]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="m12 2 2.45 7.55L22 12l-7.55 2.45L12 22l-2.45-7.55L2 12l7.55-2.45L12 2Z" />
              </svg>
            </div>

            <h2
              className="m-0 font-sans text-[clamp(34px,4.2vw,54px)] font-bold leading-[1.12] tracking-[-.035em] text-brand-forest"
              id="news-updates-heading"
            >
              {title}
            </h2>
            <p className="mb-0 mt-4 max-w-[720px] text-[17px] leading-[1.75] text-brand-muted sm:text-[18px]">
              {description}
            </p>
          </div>

          <Button
            className="rounded-full bg-brand-forest hover:bg-brand-green text-brand-lime hover:text-white font-bold text-sm px-6 py-3 h-auto shadow-sm shrink-0"
            render={<Link href={href} />}
          >
            {hrefLabel} <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        {/* 180° Circular Pattern Motion Carousel */}
        <div
          className="relative mx-auto w-full overflow-hidden py-10"
          style={{ perspective: "1400px" }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Subtle Ambient Depth Arc Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[380px] w-[90%] max-w-[1200px] rounded-full bg-gradient-to-r from-brand-lime/10 via-brand-green/10 to-brand-orange/10 blur-3xl opacity-70"
          />

          {/* 3D Arc Track */}
          <div
            className="relative mx-auto flex h-[480px] sm:h-[500px] w-full max-w-[340px] sm:max-w-[400px] md:max-w-[430px] items-center justify-center select-none"
            style={{ transformStyle: "preserve-3d" }}
          >
            {items.map((item, index) => {
              // Calculate shortest circular offset on 180° circular cylinder
              let offset = ((index - currentIndex) % total + total) % total;
              if (offset > total / 2) offset -= total;

              // Only render items within the 180° circular arc [-2, 2] and buffer edge [3, -3]
              const isVisible = Math.abs(offset) <= 2;
              const isCenter = offset === 0;

              // 180-degree circular pattern geometry:
              // Cards enter from the right (positive offset, rotateY inwards -25° to -45°)
              // Peak front and center at 0° (scale 1.0, rotateY 0°)
              // Exit to the left (negative offset, rotateY outwards +25° to +45°)
              const xPercent = offset * 70;
              const rotateY = -offset * 26;
              const rotateZ = offset * 2.5;
              const scale = isCenter
                ? 1
                : Math.max(0.72, 1 - Math.abs(offset) * 0.14);
              const zTranslate = -Math.abs(offset) * 110;
              const opacity =
                Math.abs(offset) > 2 ? 0 : Math.abs(offset) === 2 ? 0.45 : Math.abs(offset) === 1 ? 0.86 : 1;
              const zIndex = 20 - Math.abs(offset) * 5;

              return (
                <motion.div
                  key={item.id}
                  className="absolute inset-0 cursor-pointer"
                  style={{
                    transformStyle: "preserve-3d",
                    pointerEvents: isVisible ? "auto" : "none",
                  }}
                  animate={{
                    x: `${xPercent}%`,
                    y: Math.abs(offset) * 12, // subtle 180-degree vertical downward sag forming a circular arc
                    rotateY,
                    rotateZ,
                    scale,
                    z: zTranslate,
                    opacity,
                    zIndex,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 240,
                    damping: 26,
                    mass: 0.8,
                  }}
                  onClick={() => {
                    if (isCenter) {
                      setActiveStory(item);
                    } else {
                      setCurrentIndex(index);
                    }
                  }}
                >
                  <Card
                    className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border bg-white p-0 shadow-lg transition-shadow duration-300 ${
                      isCenter
                        ? "border-[#147a3f]/50 ring-2 ring-brand-green/20 shadow-[0_20px_45px_rgba(7,54,31,.18)]"
                        : "border-[#dfe5db] opacity-95 hover:opacity-100 shadow-[0_10px_25px_rgba(7,54,31,.08)]"
                    }`}
                  >
                    {/* Top Image Block */}
                    <div className="relative h-[210px] sm:h-[225px] w-full overflow-hidden bg-[#e9eee6]">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 640px) 340px, 430px"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                      {/* Category Badge */}
                      <div className="absolute left-4 top-4">
                        <Badge className="bg-brand-forest text-brand-lime text-[11px] font-extrabold uppercase tracking-wider border-0 shadow-xs px-3 py-1">
                          {item.label}
                        </Badge>
                      </div>

                      {/* Center Card Status Pill */}
                      {isCenter && (
                        <div className="absolute right-4 top-4">
                          <span className="flex items-center gap-1 rounded-full bg-brand-green px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs">
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-lime animate-pulse" />
                            Latest
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card Content Block */}
                    <div className="flex flex-1 flex-col justify-between p-6">
                      <div>
                        {/* Meta info */}
                        <div className="flex items-center gap-3 text-xs font-semibold text-brand-muted/80 mb-2.5">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5 text-brand-green" />
                            {item.date}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-brand-green" />
                            {item.readTime}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="m-0 font-sans text-[18px] sm:text-[19px] font-bold leading-snug text-brand-forest group-hover:text-brand-green transition-colors line-clamp-2">
                          {item.title}
                        </h3>

                        {/* Excerpt */}
                        <CardContent className="p-0 mt-2.5">
                          <p className="m-0 text-xs sm:text-[13px] leading-[1.65] text-brand-muted line-clamp-2">
                            {item.description}
                          </p>
                        </CardContent>
                      </div>

                      {/* Card Footer */}
                      <div className="mt-4 pt-3 border-t border-[#edf2ea] flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-brand-muted">
                          {item.author}
                        </span>

                        <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-green group-hover:text-brand-forest transition-colors">
                          {itemLinkLabel}
                          <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Carousel Navigation Bar (Prev / Next & Dots) */}
          <div className="mt-10 flex items-center justify-between gap-4 max-w-[680px] mx-auto px-4">
            <Button
              aria-label="Previous news story"
              onClick={handlePrev}
              className="h-11 w-11 rounded-full bg-brand-forest text-white hover:bg-brand-green shadow-md p-0 shrink-0"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            {/* Pagination Indicators */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Jump to news story ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    i === currentIndex
                      ? "w-8 bg-brand-green shadow-xs"
                      : "w-2.5 bg-brand-green/25 hover:bg-brand-green/50"
                  }`}
                />
              ))}
            </div>

            <Button
              aria-label="Next news story"
              onClick={handleNext}
              className="h-11 w-11 rounded-full bg-brand-forest text-white hover:bg-brand-green shadow-md p-0 shrink-0"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Full News Story Modal Dialog */}
      <Dialog
        open={activeStory !== null}
        onOpenChange={(isOpen) => {
          if (!isOpen) setActiveStory(null);
        }}
      >
        <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-2xl md:max-w-3xl bg-white p-6 sm:p-8 rounded-2xl border border-[#dfe5db] shadow-2xl overflow-y-auto max-h-[90vh]">
          {activeStory && (
            <div className="space-y-5">
              <div className="border-b border-[#edf2ea] pb-4">
                <div className="flex items-center gap-2 mb-2.5">
                  <Badge className="bg-brand-forest text-brand-lime text-xs font-bold uppercase tracking-wider border-0 px-3 py-1">
                    {activeStory.category}
                  </Badge>
                  <span className="text-xs font-semibold text-brand-muted flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {activeStory.date}
                  </span>
                  <span className="text-xs font-semibold text-brand-muted flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {activeStory.readTime}
                  </span>
                </div>

                <DialogTitle className="m-0 font-sans text-2xl sm:text-3xl font-bold leading-tight text-brand-forest">
                  {activeStory.title}
                </DialogTitle>

                <p className="m-0 mt-2 text-xs font-semibold text-brand-green">
                  Dispatched by {activeStory.author}
                </p>
              </div>

              {/* Story Image */}
              <div className="relative h-[260px] sm:h-[320px] w-full overflow-hidden rounded-xl bg-slate-100">
                <Image
                  src={activeStory.image}
                  alt={activeStory.alt}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Story Full Content */}
              <DialogDescription className="prose max-w-none text-[#24352a] text-base leading-[1.8] space-y-4 font-normal">
                {activeStory.content ? (
                  activeStory.content.split("\n\n").map((para, idx) => (
                    <span key={idx} className="block m-0">
                      {para}
                    </span>
                  ))
                ) : (
                  <p>{activeStory.description}</p>
                )}
              </DialogDescription>

              {/* Story Footer Actions */}
              <DialogFooter className="mt-4 pt-3 border-t border-[#edf2ea] bg-transparent flex flex-row items-center justify-end gap-3 -mx-0 -mb-0">
                <Button
                  variant="outline"
                  onClick={() => setActiveStory(null)}
                  className="rounded-xl px-5"
                >
                  Close
                </Button>
                <Button
                  className="rounded-xl bg-brand-green hover:bg-brand-forest text-white font-bold px-6 border-0"
                  render={<Link href={donationUrl} />}
                >
                  Support This Mission →
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
