import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, HandHeart, PhoneCall, Play } from "lucide-react";
import { homepageContent } from "@/data/homepage";
import { contactDetails } from "@/data/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CommunityStorySection() {
  const { eyebrow, title, description, videoUrl, priorities } =
    homepageContent.communityStory;
  const { mission, vision } = homepageContent.missionVision;

  return (
    <section
      aria-labelledby="community-story-heading"
      className="bg-white mx-0 sm:mx-6 lg:mx-12 px-4 py-[64px] sm:px-8 lg:py-[104px]"
      id="community-story"
    >
      <div className="mx-auto grid w-full max-w-[1480px] items-center gap-8 lg:grid-cols-2 lg:gap-8">
        <div className="relative mx-auto h-[380px] xs:h-[440px] sm:h-[580px] w-full max-w-[640px] lg:mx-0 lg:h-[650px]">
          <a
            aria-label="Watch the Edunite2Serve community story video on YouTube (opens in a new tab)"
            className="group absolute bottom-[4%] left-[10%] right-[6%] top-[5%] overflow-hidden rounded-[24px] border border-[#d6e4d5] bg-[#e8eee4] shadow-[0_18px_50px_rgba(7,54,31,.16)] outline-offset-4 focus-visible:outline-[3px] focus-visible:outline-brand-orange"
            href={videoUrl}
            rel="noreferrer"
            target="_blank"
          >
            <Image
              alt="A volunteer spending time with children in a Malawi community."
              className="object-cover object-center transition-transform duration-500 motion-reduce:transition-none group-hover:scale-[1.025]"
              fill
              priority={false}
              sizes="(max-width: 1023px) min(78vw, 390px), 36vw"
              src="/images/community-story/community-visit.jpg"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#031c10]/75 via-transparent to-[#031c10]/10"
            />
            <span className="video-play-attention absolute left-1/2 top-[48%] grid h-[84px] w-[84px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[6px] border-[#07361f]/35 bg-[#0b790d] text-[#041807] shadow-[0_8px_28px_rgba(0,0,0,.3)] transition-transform duration-200 group-hover:scale-105 motion-reduce:transition-none sm:h-[96px] sm:w-[96px]">
              <Play aria-hidden="true" className="ml-1 h-9 w-9 fill-current" />
            </span>
            <span className="absolute inset-x-0 bottom-0 px-5 pb-5 pt-12 text-left text-white sm:px-6 sm:pb-6">
              <span className="block text-xs font-bold uppercase tracking-[.14em] text-white/80">
                Edunite2Serve · Malawi
              </span>
              <span className="mt-1 block text-lg font-bold leading-snug sm:text-xl">
                Watch our community story
              </span>
            </span>
          </a>

          <div
            aria-hidden="true"
            className="absolute left-0 top-0 z-10 aspect-[1.62/1] w-[43%] overflow-hidden rounded-[16px] border-[5px] border-white bg-white shadow-[0_8px_24px_rgba(7,54,31,.18)]"
          >
            <Image
              alt=""
              className="object-cover"
              fill
              sizes="(max-width: 1023px) 34vw, 16vw"
              src="/images/community-story/learners-group.png"
            />
          </div>

          <div
            aria-hidden="true"
            className="absolute bottom-0 right-0 z-10 aspect-[1.62/1] w-[45%] overflow-hidden rounded-[16px] border-[5px] border-white bg-white shadow-[0_8px_24px_rgba(7,54,31,.18)]"
          >
            <Image
              alt=""
              className="object-cover"
              fill
              sizes="(max-width: 1023px) 36vw, 17vw"
              src="/images/community-story/classroom-learners.png"
            />
          </div>

          <div className="absolute bottom-[25%] left-0 z-20 rounded-r-[14px] border-y border-r border-[#b1d58e] bg-[#087b65] px-3 py-4 text-[12px] font-extrabold leading-[1.35] tracking-[.04em] text-white shadow-[0_8px_24px_rgba(7,54,31,.2)] [writing-mode:vertical-rl] rotate-180 sm:px-3.5 sm:text-[13px] hidden sm:block">
            Join us in supporting children in Malawi
          </div>
        </div>

        <div className="min-w-0">
          <div className="mb-5 flex items-center gap-3">
            <HandHeart
              aria-hidden="true"
              className="h-[21px] w-[21px] shrink-0 text-[#00876f]"
              strokeWidth={2}
            />
            <p className="giving-purpose-heading m-0 text-[clamp(19px,2vw,26px)] font-extrabold italic leading-[1.2] tracking-[-.035em] text-[#00876f]">
              {eyebrow}
            </p>
            <span
              aria-hidden="true"
              className="giving-purpose-rule h-px min-w-4 flex-1 bg-[#83b9a7]"
            />
            <span
              aria-hidden="true"
              className="giving-purpose-sparkle shrink-0 text-[16px] leading-none text-[#00876f]"
            >
              ✦
            </span>
          </div>

          <h2
            className="m-0 max-w-[750px] font-sans text-[clamp(36px,4.2vw,56px)] font-bold leading-[1.12] tracking-[-.035em] text-brand-forest"
            id="community-story-heading"
          >
            {title}
          </h2>
          <p className="mb-0 mt-4 max-w-[720px] text-[17px] leading-[1.75] text-brand-muted sm:text-[18px]">
            {description}
          </p>

          <div className="mt-8 grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4">
            <Card className="rounded-[16px] border border-[#e2e9df] bg-[#f3f7f0] p-0 shadow-none">
              <CardContent className="px-5 py-[18px] sm:px-6">
                <h3 className="m-0 text-[18px] font-bold leading-snug text-brand-forest">
                  Our vision
                </h3>
                <p className="mb-0 mt-2 text-[15px] leading-[1.7] text-brand-muted sm:text-base">
                  {vision}
                </p>
              </CardContent>
            </Card>
            <Card className="rounded-[16px] border border-[#f0e3d8] bg-[#fbf2e9] p-0 shadow-none">
              <CardContent className="px-5 py-[18px] sm:px-6">
                <h3 className="m-0 text-[18px] font-bold leading-snug text-brand-forest">
                  Our mission
                </h3>
                <p className="mb-0 mt-2 text-[15px] leading-[1.7] text-brand-muted sm:text-base">
                  {mission}
                </p>
              </CardContent>
            </Card>
          </div>

          <ul className="m-0 mt-7 grid list-none gap-[13px] p-0">
            {priorities.map((priority) => (
              <li className="flex items-start gap-3 text-[15px] leading-[1.65] text-brand-ink sm:text-base" key={priority}>
                <CheckCircle2
                  aria-hidden="true"
                  className="mt-[2px] h-[18px] w-[18px] shrink-0 text-[#087b65]"
                  strokeWidth={2.7}
                />
                <span>{priority}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4 max-[440px]:flex-col max-[440px]:items-stretch">
            <Button
              className="min-h-[52px] rounded-full bg-[#087b16] px-7 text-base font-bold text-white shadow-[0_5px_14px_rgba(7,54,31,.12)] hover:bg-brand-forest h-auto max-[440px]:w-full max-[440px]:justify-center"
              render={<Link href="/about-us" />}
            >
              More About Us
            </Button>
            <a
              aria-label={`Call Edunite2Serve at ${contactDetails.phoneLabel}`}
              className="inline-flex min-h-[52px] items-center gap-3 rounded-full px-2 py-2 text-brand-forest outline-offset-4 focus-visible:outline-[3px] focus-visible:outline-brand-orange max-[440px]:justify-center"
              href={`tel:${contactDetails.phoneHref}`}
            >
              <PhoneCall aria-hidden="true" className="h-6 w-6 shrink-0" strokeWidth={1.7} />
              <span className="flex flex-col text-left leading-tight">
                <span className="text-[13px] font-semibold text-brand-muted">Phone</span>
                <span className="mt-1 text-[15px] font-bold">{contactDetails.phoneLabel}</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
