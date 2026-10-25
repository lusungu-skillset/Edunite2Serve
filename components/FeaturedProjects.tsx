import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { homepageContent } from "@/data/homepage";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";

export default function FeaturedProjects() {
  const { eyebrow, title, description, items, href, hrefLabel } = homepageContent.featuredProjects;

  return (
    <section
      aria-labelledby="featured-projects-heading"
      className="bg-brand-cream py-[100px] max-[720px]:py-[70px]"
      id="featured-projects"
    >
      <div className="mx-auto w-full max-w-[1720px] px-10 max-[720px]:max-w-[596px] max-[720px]:px-[18px] max-[440px]:max-w-[570px] max-[440px]:px-[15px]">
        <div className="mb-[38px] flex items-end justify-between gap-[25px] max-[760px]:flex-col max-[760px]:items-start max-[760px]:gap-[19px]">
          <div className="mb-0 max-w-[760px]">
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
    
            <h2
              className="m-0 max-w-[750px] font-sans text-[clamp(36px,4.2vw,56px)] font-bold leading-[1.12] tracking-[-.035em] text-brand-forest"
              id="featured-projects-heading"
            >
              {title}
            </h2>
            <p className="mb-0 mt-4 max-w-[720px] text-[17px] leading-[1.75] text-brand-muted sm:text-[18px]">
              {description}
            </p>
          </div>
          <Button
            className="rounded-full bg-[#087b16] hover:bg-brand-forest text-white font-bold text-base px-7 py-3 h-auto shrink-0 shadow-[0_5px_14px_rgba(7,54,31,.12)]"
            render={<Link href={href} />}
          >
            {hrefLabel}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-3 items-stretch gap-5 max-[1023px]:grid-cols-2 max-[639px]:grid-cols-1 max-[639px]:gap-4">
          {items.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
