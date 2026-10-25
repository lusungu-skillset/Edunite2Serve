import Link from "next/link";
import { homepageContent } from "@/data/homepage";
import { Button } from "@/components/ui/button";

export default function SupportCta() {
  const { eyebrow, title, description, primaryCta, secondaryCta } = homepageContent.callToAction;

  return (
    <section className="bg-brand-forest py-[77px] text-white">
      <div className="mx-auto flex w-full max-w-[1720px] items-center justify-between gap-[35px] px-10 max-[760px]:items-start max-[760px]:flex-col max-[760px]:gap-7 max-[720px]:max-w-[596px] max-[720px]:px-[18px] max-[440px]:max-w-[570px] max-[440px]:px-[15px]">
        <div>
          <div className="mb-[18px] flex w-full items-center gap-4 text-left">
            <p className="giving-purpose-heading m-0 whitespace-nowrap font-brand text-[clamp(24px,3vw,40px)] font-extrabold italic leading-[1.1] tracking-[-.04em] text-[#d4a52e]">
              {eyebrow}
            </p>
            <span
              aria-hidden="true"
              className="h-px min-w-[22px] flex-1 bg-[#d4a52e]"
            />
            <svg
              aria-hidden="true"
              className="giving-purpose-sparkle h-[19px] w-[19px] shrink-0 text-[#d4a52e]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="m12 2 2.45 7.55L22 12l-7.55 2.45L12 22l-2.45-7.55L2 12l7.55-2.45L12 2Z" />
            </svg>
          </div>
          <h2 className="m-0 max-w-[700px] font-sans text-[clamp(32px,4vw,52px)] font-bold leading-[1.16] tracking-[-.035em]">{title}</h2>
          <p className="mt-[14px] max-w-[550px] text-[#dce8dc]">{description}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3 max-[760px]:w-full max-[440px]:flex-col max-[440px]:items-stretch">
          <Button
            className="donate-attention min-h-[52px] gap-3 rounded-md bg-brand-lime hover:bg-[#c5df7f] text-brand-forest font-bold text-sm px-6 border-0 max-[440px]:w-full"
            render={<Link href={primaryCta.href} />}
          >
            {primaryCta.label} <span className="text-lg" aria-hidden="true">↗</span>
          </Button>
          <Button
            className="min-h-[52px] gap-3 rounded-md border-white/70 bg-transparent hover:bg-white/10 text-white font-bold text-sm px-6 max-[440px]:w-full"
            render={<Link href={secondaryCta.href} />}
            variant="outline"
          >
            {secondaryCta.label} <span className="text-lg" aria-hidden="true">→</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
