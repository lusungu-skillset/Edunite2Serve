import Image from "next/image";
import Link from "next/link";
import { UserRound } from "lucide-react";
import { homepageContent } from "@/data/homepage";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function OrganizationSection() {
  const { eyebrow, title, description, image, alt, href, hrefLabel } = homepageContent.organization;

  return (
    <section className="bg-white py-[100px] max-[720px]:py-[70px]">
      <div className="mx-auto grid w-full max-w-[1720px] grid-cols-2 items-center gap-[clamp(40px,7vw,96px)] px-10 max-[760px]:grid-cols-1 max-[760px]:gap-[42px] max-[720px]:max-w-[596px] max-[720px]:px-[18px] max-[440px]:max-w-[570px] max-[440px]:px-[15px]">
        <div className="relative aspect-[1.36] w-full max-w-[540px]">
          <span className="absolute bottom-[-17px] left-[-18px] z-0 h-[43%] w-[58%] rounded-[42%_6px_6px] border-2 border-brand-orange" aria-hidden="true" />
          <Image className="relative z-[1] block h-full w-full rounded-[10px_120px_10px_10px] border-[7px] border-white object-cover shadow-[0_12px_35px_rgba(8,49,29,.12)]" src={image} alt={alt} width={760} height={560} />
        </div>
        <div>
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
          <h2 className="m-0 font-sans text-[clamp(34px,4.1vw,58px)] font-bold leading-[1.16] tracking-[-.035em] max-[760px]:text-[39px]">{title}</h2>
          <p className="mb-[25px] mt-5 max-w-[520px] text-base leading-[1.75] text-brand-muted">{description}</p>
          <div className="flex flex-wrap items-center gap-4">
            <Button
              className="min-h-[52px] border-brand-green text-brand-green hover:bg-brand-green hover:text-white font-bold text-sm px-6"
              render={<Link href={href} />}
              variant="outline"
            >
              {hrefLabel} <span className="text-lg" aria-hidden="true">→</span>
            </Button>
            <div aria-label="Edunite2Serve team" className="flex items-center pl-2 -space-x-2.5" role="img">
              <Avatar size="lg" className="border-[3px] border-white shadow-[0_3px_10px_rgba(7,54,31,.12)]">
                <AvatarFallback className="bg-brand-forest text-white">
                  <UserRound className="h-[17px] w-[17px]" strokeWidth={1.8} />
                </AvatarFallback>
              </Avatar>
              <Avatar size="lg" className="border-[3px] border-white shadow-[0_3px_10px_rgba(7,54,31,.12)]">
                <AvatarFallback className="bg-[#087b65] text-white">
                  <UserRound className="h-[17px] w-[17px]" strokeWidth={1.8} />
                </AvatarFallback>
              </Avatar>
              <Avatar size="lg" className="border-[3px] border-white shadow-[0_3px_10px_rgba(7,54,31,.12)]">
                <AvatarFallback className="bg-brand-orange text-brand-forest">
                  <UserRound className="h-[17px] w-[17px]" strokeWidth={1.8} />
                </AvatarFallback>
              </Avatar>
              <Avatar size="lg" className="border-[3px] border-white shadow-[0_3px_10px_rgba(7,54,31,.12)]">
                <AvatarFallback className="bg-brand-lime text-brand-forest">
                  <UserRound className="h-[17px] w-[17px]" strokeWidth={1.8} />
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
