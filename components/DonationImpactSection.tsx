import Link from "next/link";
import { homepageContent } from "@/data/homepage";
import DonationImpactCarousel from "@/components/DonationImpactCarousel";
import { Button } from "@/components/ui/button";

type DonationImpactSectionProps = {
  headingLevel?: "h1" | "h2";
};

export default function DonationImpactSection({
  headingLevel = "h2",
}: DonationImpactSectionProps) {
  const { eyebrow, title, description, primaryCta, secondaryCta, items } =
    homepageContent.donationImpact;
  const Heading = headingLevel;
  return (
    <section
      aria-labelledby="donation-impact-heading"
      className="bg-[#f5f7f0] py-[88px] max-[720px]:py-[68px]"
      id="donation-impact"
    >
      <div className="mx-auto w-full max-w-[1720px] px-10 max-[720px]:max-w-[596px] max-[720px]:px-[18px] max-[440px]:max-w-[570px] max-[440px]:px-[15px]">
        <div className="mx-auto mb-[48px] max-w-[1040px] text-center">
          <div className="mb-[18px] flex w-full items-center gap-4 text-left">
            <p className="giving-purpose-heading m-0 whitespace-nowrap font-brand text-[clamp(24px,3vw,40px)] font-extrabold italic leading-[1.1] tracking-[-.04em] text-[#00876f]">
              {eyebrow}
            </p>
            <span
              aria-hidden="true"
              className="giving-purpose-rule h-px min-w-[22px] flex-1 bg-[#83b9a7]"
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
          <Heading
            className="m-0 font-sans text-[clamp(38px,4.4vw,58px)] font-bold leading-[1.12] tracking-[-.035em] text-brand-forest"
            id="donation-impact-heading"
          >
            {title}
          </Heading>
          <p className="mx-auto mb-0 mt-[18px] max-w-[800px] text-[18px] leading-[1.75] text-brand-muted">
            {description}
          </p>

          <div className="mt-[30px] flex flex-wrap justify-center gap-3 max-[440px]:flex-col">
            <Button
              className="donate-attention min-h-[54px] gap-3 rounded-[12px] bg-brand-green hover:bg-brand-forest text-white font-bold text-base px-6 border-0 max-[440px]:w-full"
              render={<Link href={primaryCta.href} />}
            >
              {primaryCta.label}
              <span aria-hidden="true" className="text-lg">→</span>
            </Button>
            <Button
              className="min-h-[54px] gap-3 rounded-[12px] border-[#bdcbbb] bg-transparent hover:bg-white text-brand-forest font-bold text-base px-6 max-[440px]:w-full"
              render={<Link href={secondaryCta.href} />}
              variant="outline"
            >
              {secondaryCta.label}
              <span aria-hidden="true" className="text-lg">→</span>
            </Button>
          </div>
        </div>

        <DonationImpactCarousel items={items} />
      </div>
    </section>
  );
}
