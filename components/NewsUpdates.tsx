"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
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
} from "lucide-react";
import type { NewsSectionContent } from "@/data/news";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function NewsUpdates({
  content,
}: {
  content: NewsSectionContent;
}) {
  const router = useRouter();
  const { eyebrow, title, description, items, href, hrefLabel, itemLinkLabel } =
    content;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const total = items.length;

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // Auto-advance news posts every 3 seconds (smooth, brisk transition)
  useEffect(() => {
    if (isPaused) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const timer = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  return (
    <section
      className="relative overflow-hidden bg-[#faf7f2] py-[96px] max-[720px]:py-[68px] border-y border-[#ede6da]"
      id="news-updates"
      aria-labelledby="news-updates-heading"
    >
      <div className="mx-auto w-full max-w-[1720px] px-10 max-[720px]:max-w-[596px] max-[720px]:px-[18px] max-[440px]:max-w-[570px] max-[440px]:px-[15px]">
        {/* Section Header */}
        <div className="mb-12 flex items-end justify-between gap-6 max-[880px]:flex-col max-[880px]:items-start">
          <div className="max-w-[760px]">
            <div className="mb-4 flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-brand-green" />
              <p className="giving-purpose-heading m-0 font-brand text-[clamp(20px,2.2vw,28px)] font-extrabold italic text-[#00876f]">
                {eyebrow}
              </p>
              <span className="h-px flex-1 bg-[#83b9a7] min-w-4" />
            </div>
            <h2
              id="news-updates-heading"
              className="m-0 font-sans text-[clamp(34px,4vw,52px)] font-bold tracking-tight text-brand-forest leading-[1.12]"
            >
              {title}
            </h2>
            <p className="mt-3 text-base sm:text-lg leading-relaxed text-brand-muted max-w-[680px]">
              {description}
            </p>
          </div>

          {/* Action CTAs & Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              aria-label={isPaused ? "Resume auto-rotation" : "Pause auto-rotation"}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#cbd9c8] bg-white text-brand-forest hover:bg-[#eef5eb] transition-colors"
            >
              {isPaused ? <Play className="h-4 w-4 fill-current ml-0.5" /> : <Pause className="h-4 w-4" />}
            </button>

            <Button
              className="rounded-full bg-brand-forest hover:bg-brand-green text-white font-bold text-sm px-6 py-2.5 h-11 shadow-sm"
              render={<Link href={href} />}
            >
              {hrefLabel}
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </div>
        </div>

        {/* 180° Circular Orbit Carousel Container */}
        <div
          className="relative mx-auto mt-6 w-full max-w-[1400px] select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative h-[530px] sm:h-[560px] w-full flex items-center justify-center overflow-visible">
            {items.map((item, index) => {
              // Calculate angular position on a 180-degree semicircular arc
              let offset = (index - currentIndex) % total;
              if (offset > total / 2) offset -= total;
              if (offset < -total / 2) offset += total;

              // Hide items that are too far behind the arc for smooth performance
              if (Math.abs(offset) > 2) {
                return null;
              }

              const isCenter = offset === 0;

              // Trigonometric 3D layout coordinates along a 180° arc
              const angle = (offset * Math.PI) / 4.2; // spacing angle
              const radiusX = 460; // horizontal arc spread
              const radiusY = 40;  // depth curvature

              const xTranslate = Math.sin(angle) * radiusX;
              const yTranslate = (1 - Math.cos(angle)) * radiusY;
              const zTranslate = -Math.abs(offset) * 110;
              const rotateY = offset * -14; // face toward the center viewer
              const rotateZ = offset * 2.5;  // gentle arc tilt
              const scale = 1 - Math.abs(offset) * 0.14;
              const opacity = 1 - Math.abs(offset) * 0.28;
              const zIndex = 20 - Math.abs(offset) * 5;

              const storyHref = item.href || `/news/${item.slug || item.id}`;

              return (
                <motion.div
                  key={item.id}
                  className="absolute w-[90vw] sm:w-[410px] md:w-[430px] cursor-pointer will-change-transform"
                  style={{
                    perspective: 1200,
                  }}
                  animate={{
                    x: xTranslate,
                    y: yTranslate,
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
                      router.push(storyHref);
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

                        <Link
                          href={storyHref}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-xs font-bold text-brand-green group-hover:text-brand-forest transition-colors"
                        >
                          {itemLinkLabel}
                          <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" />
                        </Link>
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
              type="button"
              aria-label="Previous news story"
              onClick={handlePrev}
              className="h-11 w-11 rounded-full bg-brand-forest text-white hover:bg-brand-green shadow-md p-0 shrink-0 flex items-center justify-center cursor-pointer"
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
              type="button"
              aria-label="Next news story"
              onClick={handleNext}
              className="h-11 w-11 rounded-full bg-brand-forest text-white hover:bg-brand-green shadow-md p-0 shrink-0 flex items-center justify-center cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
