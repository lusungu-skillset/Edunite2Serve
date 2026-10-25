"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  HandHeart,
  Play,
} from "lucide-react";
import * as React from "react";
import { homepageContent } from "@/data/homepage";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

export default function ServicePillars() {
  const { eyebrow, title, description, items } = homepageContent.servicePillars;
  const storyVideoUrl = homepageContent.communityStory.videoUrl;
  const [api, setApi] = React.useState<CarouselApi>();

  // Duplicate items so that the carousel has enough slides to loop continuously on all screen sizes
  const displayItems = React.useMemo(() => [...items, ...items], [items]);

  return (
    <section
      aria-labelledby="service-pillars-heading"
      className="bg-[#f5f7f0] py-[88px] max-[720px]:py-[68px]"
      id="how-we-serve"
    >
      <div className="mx-auto w-full max-w-[1720px] px-10 max-[720px]:max-w-[596px] max-[720px]:px-[18px] max-[440px]:max-w-[570px] max-[440px]:px-[15px]">
        <div className="mb-[38px] flex items-start justify-between gap-8 max-[760px]:mb-[28px] max-[760px]:flex-col max-[760px]:gap-5">
          <div className="w-full max-w-[760px]">
            <div className="mb-5 flex items-center gap-3">
              <HandHeart
                aria-hidden="true"
                className="h-[21px] w-[21px] shrink-0 text-[#00876f]"
                strokeWidth={2}
              />
              <p className="giving-purpose-heading m-0 font-brand text-[clamp(19px,2vw,26px)] font-extrabold italic leading-[1.2] tracking-[-.035em] text-[#00876f]">
                {eyebrow}
              </p>
              <span
                aria-hidden="true"
                className="giving-purpose-rule h-px min-w-4 flex-1 bg-[#83b9a7]"
              />
              <svg
                aria-hidden="true"
                className="giving-purpose-sparkle h-[16px] w-[16px] shrink-0 text-[#00876f]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="m12 2 2.45 7.55L22 12l-7.55 2.45L12 22l-2.45-7.55L2 12l7.55-2.45L12 2Z" />
              </svg>
            </div>
            <h2
              className="m-0 max-w-[750px] font-sans text-[clamp(36px,4.2vw,56px)] font-bold leading-[1.12] tracking-[-.035em] text-brand-forest"
              id="service-pillars-heading"
            >
              {title}
            </h2>
            <p className="mb-0 mt-4 max-w-[720px] text-[17px] leading-[1.75] text-brand-muted sm:text-[18px]">
              {description}
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="mt-1 flex shrink-0 items-center gap-3">
            <Button
              type="button"
              aria-label="Previous service area"
              className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-brand-forest hover:bg-brand-green text-white shadow-[0_5px_16px_rgba(7,54,31,.12)] p-0 flex items-center justify-center cursor-pointer transition-all active:scale-95"
              onClick={() => api?.scrollPrev()}
            >
              <ChevronLeft aria-hidden="true" className="h-6 w-6" strokeWidth={2.5} />
            </Button>
            <Button
              type="button"
              aria-label="Next service area"
              className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-brand-green hover:bg-brand-forest text-white shadow-[0_5px_16px_rgba(7,54,31,.12)] p-0 flex items-center justify-center cursor-pointer transition-all active:scale-95"
              onClick={() => api?.scrollNext()}
            >
              <ChevronRight aria-hidden="true" className="h-6 w-6" strokeWidth={2.5} />
            </Button>
          </div>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          setApi={setApi}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {displayItems.map((item, itemIndex) => {
              const originalIndex = itemIndex % items.length;
              return (
                <CarouselItem
                  key={`${item.title}-${itemIndex}`}
                  className="pl-4 basis-full md:basis-1/2 xl:basis-1/3"
                >
                  <article className="group relative flex h-[460px] min-w-0 flex-col overflow-hidden rounded-[22px] border border-white/70 bg-brand-forest shadow-[0_12px_34px_rgba(7,54,31,.14)] sm:h-[480px] xl:h-[450px]">
                    <Image
                      alt={item.imageAlt}
                      className="object-cover transition-transform duration-700 motion-reduce:transition-none group-hover:scale-[1.035]"
                      fill
                      sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                      src={item.image}
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#031c10]/95 via-[#031c10]/38 to-[#031c10]/12"
                    />
                    <div className="relative z-10 flex h-full flex-col p-5 sm:p-6 lg:p-7">
                      {item.icon === "service" && (
                        <a
                          aria-label="Watch the Edunite2Serve community story"
                          className="video-play-attention absolute left-1/2 top-[42%] z-10 grid h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[5px] border-white/35 bg-brand-green text-white shadow-[0_8px_28px_rgba(0,0,0,.3)] transition-transform hover:scale-105 focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-brand-orange motion-reduce:transition-none"
                          href={storyVideoUrl}
                          rel="noreferrer"
                          target="_blank"
                        >
                          <Play aria-hidden="true" className="ml-1 h-7 w-7 fill-current" />
                        </a>
                      )}

                      <div className="mt-auto max-w-[430px]">
                        <h3 className="mb-2 mt-0 font-sans text-[26px] font-bold leading-[1.16] tracking-[-.025em] text-white sm:text-[30px]">
                          {item.title}
                        </h3>
                        <p className="mb-5 mt-0 max-w-[390px] text-[14px] leading-[1.65] text-white/90 sm:text-[15px]">
                          {item.description}
                        </p>
                        <Button
                          className="rounded-full bg-white px-[17px] text-[13px] font-bold text-brand-forest shadow-[0_5px_16px_rgba(0,0,0,.14)] hover:bg-brand-lime hover:text-brand-forest border-0 h-auto py-2.5"
                          render={<Link href={item.href} />}
                        >
                          {item.action}
                          <span aria-hidden="true" className="text-base ml-1.5">&rarr;</span>
                        </Button>
                      </div>
                    </div>
                  </article>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
