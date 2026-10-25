import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import type { projectDirectory } from "@/data/projects";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Project = (typeof projectDirectory)[number];

export default function ProjectCard({ project }: { project: Project }) {
  const projectHref = `/projects/${project.slug}`;

  return (
    <Card
      className="group flex h-full scroll-mt-28 flex-col overflow-hidden rounded-[20px] border border-[#e1e7de] bg-card p-0 shadow-[0_10px_30px_rgba(25,49,32,.07)] ring-0 transition-[transform,box-shadow] duration-300 motion-reduce:transition-none hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(25,49,32,.13)]"
      id={project.slug}
    >
      <Link
        aria-label={`View ${project.title} project`}
        className="relative block aspect-[1.58/1] overflow-hidden bg-[#e8eee4]"
        href={projectHref}
      >
        <Image
          alt={project.imageAlt}
          className="object-cover transition-transform duration-700 motion-reduce:transition-none group-hover:scale-[1.035]"
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
          src={project.image}
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#031c10]/75 via-transparent to-[#031c10]/10"
        />
        <Badge
          className="absolute left-5 top-5 rounded-full border border-white/70 bg-white/95 px-3 py-[7px] text-[10px] font-extrabold uppercase tracking-[.1em] text-brand-green shadow-sm backdrop-blur-sm"
          variant="outline"
        >
          {project.category}
        </Badge>
        <span className="absolute inset-x-5 bottom-4 flex items-center gap-2 text-[12px] font-semibold leading-snug text-white drop-shadow-[0_1px_4px_rgba(0,0,0,.6)]">
          <MapPin aria-hidden="true" className="h-4 w-4 shrink-0" />
          {project.location}
        </span>
      </Link>

      <CardContent className="flex grow flex-col p-5 sm:p-6">
        <h3 className="mb-3 mt-0 font-sans text-[23px] font-bold leading-[1.24] tracking-[-.025em] text-brand-forest sm:text-[25px]">
          <Link
            className="rounded-sm transition-colors hover:text-brand-green focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
            href={projectHref}
          >
            {project.title}
          </Link>
        </h3>
        <p className="mb-6 mt-0 text-[14px] leading-[1.7] text-brand-muted sm:text-[15px]">
          {project.description}
        </p>

        <div className="mt-auto flex gap-3 rounded-[13px] border border-[#e5eee3] bg-[#f4f8f1] px-4 py-3.5">
          <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-brand-green shadow-[0_2px_8px_rgba(7,54,31,.08)]">
            <Sparkles aria-hidden="true" className="h-4 w-4" />
          </span>
          <div>
            <p className="mb-1 mt-0 text-[9px] font-extrabold uppercase tracking-[.12em] text-brand-green">
              Project in focus
            </p>
            <p className="m-0 text-[13px] font-bold leading-[1.45] text-brand-forest">
              {project.highlight}
            </p>
          </div>
        </div>

        <Button
          className="mt-5 inline-flex h-auto p-0 font-extrabold text-[13px] text-brand-green hover:bg-transparent hover:text-brand-forest self-start"
          render={<Link href={projectHref} />}
          variant="ghost"
        >
          Explore this project
          <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardContent>
    </Card>
  );
}
