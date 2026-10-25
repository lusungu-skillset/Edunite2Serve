import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import HeroGlobe from "@/components/HeroGlobe";

type HeroProps = {
  eyebrow?: string;
  eyebrowItems?: readonly string[];
  title?: string;
  accent?: string;
  titleLines?: readonly { text: string; tone?: "accent" | "ink" }[];
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  image?: { src: string; alt: string };
  variant?: "home" | "page";
};

export default function Hero({
  eyebrow,
  eyebrowItems,
  title,
  accent,
  titleLines,
  description,
  primaryCta,
  secondaryCta,
  image,
  variant = "page",
}: HeroProps) {
  const isHome = variant === "home";

  return (
    <section className={isHome ? "relative isolate overflow-hidden bg-brand-forest text-white" : "relative overflow-hidden bg-[#edf6ef] text-[#17372f]"}>
      {/* Background subtle image overlay for Home */}
      {isHome && image ? (
        <div className="pointer-events-none absolute inset-y-0 right-0 z-0 w-[55%] opacity-20 max-lg:inset-0 max-lg:w-full">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-forest via-brand-forest/90 to-transparent max-lg:bg-gradient-to-t max-lg:from-brand-forest" />
        </div>
      ) : null}

      <div
        className={isHome
          ? "relative mx-auto grid min-h-[620px] max-[760px]:min-h-0 w-full max-w-[1720px] grid-cols-1 items-center gap-10 px-10 py-16 max-[760px]:py-10 max-[760px]:gap-8 lg:grid-cols-12 lg:py-24 max-[720px]:max-w-[596px] max-[720px]:px-[18px] max-[440px]:max-w-[570px] max-[440px]:px-[15px]"
          : "mx-auto w-full max-w-[1640px] px-10 py-[76px] pb-[82px] max-[720px]:max-w-[596px] max-[720px]:px-[18px] max-[440px]:max-w-[570px] max-[440px]:px-[15px]"}
      >
        {/* Left Column: Text & CTA */}
        <div className={`relative z-10 w-full ${isHome ? "lg:col-span-6" : "max-w-[820px]"}`}>
          {eyebrowItems?.length ? (
            <p
              className="mb-[21px] flex flex-wrap items-center gap-0 text-[clamp(15px,1.25vw,23px)] font-medium leading-[1.4] tracking-[.08em] text-[#e2efcf]"
              aria-label={eyebrowItems.join(" · ")}
            >
              {eyebrowItems.map((item, index) => (
                <span className="inline-flex items-center whitespace-nowrap" key={item}>
                  {item}
                  {index < eyebrowItems.length - 1 ? (
                    <span className="mx-[clamp(8px,1.5vw,22px)] inline-flex items-center gap-[7px] text-[#d8ef94]" aria-hidden="true">
                      <span className="block h-px w-[clamp(24px,5vw,75px)] bg-current" />
                      <b className="text-[.8em] font-medium">✦</b>
                    </span>
                  ) : null}
                </span>
              ))}
            </p>
          ) : eyebrow ? (
            <p className={`mb-[19px] flex items-center gap-[9px] text-[11px] font-extrabold uppercase leading-[1.4] tracking-[.14em] ${isHome ? "text-[#e2efcf]" : "text-[#176b55]"}`}>
              <span className="h-2 w-2 rounded-full bg-[#ed9b68]" />
              {eyebrow}
            </p>
          ) : null}

          <h1 className={isHome
            ? "m-0 max-w-[900px] font-sans text-[clamp(2.75rem,4.4vw,4.5rem)] font-bold leading-[1.12] tracking-[-.045em] max-[760px]:text-[clamp(1.75rem,6vw,3rem)]"
            : "m-0 max-w-[820px] font-sans text-[clamp(42px,6vw,68px)] font-bold leading-[1.14] tracking-[-.035em] max-[760px]:text-[clamp(39px,10vw,58px)]"}
          >
            {titleLines?.length ? (
              titleLines.map((line, index) => (
                <span
                  className={`block ${isHome ? "motion-safe:animate-hero-title" : ""} ${line.tone === "accent" ? (isHome ? "text-brand-lime" : "text-brand-green") : ""}`}
                  key={line.text}
                  style={isHome ? { animationDelay: `${index * 300}ms` } : undefined}
                >
                  {line.text}
                </span>
              ))
            ) : (
              <>
                {title} {accent ? <span className={isHome ? "text-brand-lime" : "text-brand-green"}>{accent}</span> : null}
              </>
            )}
          </h1>

          {description ? (
            <p className={isHome
              ? "mt-[22px] max-w-[570px] text-[17px] leading-[1.7] text-white/90"
              : "mt-[22px] max-w-[570px] text-[17px] leading-[1.7] text-[#536c62] max-[760px]:mt-[17px] max-[760px]:text-[15px]"}
            >
              {description}
            </p>
          ) : null}

          {primaryCta || secondaryCta ? (
            <div className="mt-[32px] flex flex-wrap items-center gap-6 max-[760px]:mt-[25px] max-[760px]:gap-[18px] max-[440px]:flex-col max-[440px]:items-stretch max-[440px]:gap-3">
              {primaryCta ? (
                <Button
                  className="donate-attention min-h-[52px] gap-3 rounded-[8px] bg-brand-green hover:bg-brand-forest text-white font-bold text-sm px-6 max-[440px]:w-full max-[440px]:justify-center"
                  render={<Link href={primaryCta.href} />}
                >
                  {primaryCta.label} <span className="text-lg" aria-hidden="true">↗</span>
                </Button>
              ) : null}
              {secondaryCta ? (
                <Button
                  className={`min-h-[52px] gap-2.5 text-sm font-bold p-0 ${isHome ? "text-white hover:text-brand-lime" : "text-[#17372f] hover:text-brand-green"} hover:bg-transparent max-[440px]:w-full max-[440px]:justify-center max-[440px]:py-2`}
                  render={<Link href={secondaryCta.href} />}
                  variant="ghost"
                >
                  {secondaryCta.label} <span className="text-lg" aria-hidden="true">→</span>
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>

        {/* Right Column: 3D Rotating Globe (Home only) */}
        {isHome && (
          <div className="relative z-10 flex w-full items-center justify-center lg:col-span-6">
            <HeroGlobe />
          </div>
        )}
      </div>
    </section>
  );
}
