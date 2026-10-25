import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Heart,
  MapPin,
  ShieldCheck,
  Sparkles,
  Sprout,
  Users,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { getCmsProjectBySlug, getCmsProjects } from "@/lib/cms";
import { projectDirectory, type Project } from "@/data/projects";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { donationUrl } from "@/data/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getCmsProjects();
  const list = projects.length > 0 ? projects : projectDirectory;
  return list.map((proj) => ({
    slug: proj.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getCmsProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Edunite2Serve",
    };
  }

  return {
    title: `${project.title} | Edunite2Serve Projects`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.image],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getCmsProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const allProjects = await getCmsProjects();
  const otherProjects = (allProjects.length > 0 ? allProjects : projectDirectory)
    .filter((p) => p.slug !== project.slug)
    .slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow="Community Initiative"
        title={project.title}
        description={project.description}
        breadcrumbs={[
          { label: "Projects", href: "/projects" },
          { label: project.title },
        ]}
        primaryCta={{ label: "Donate to This Project", href: donationUrl }}
        secondaryCta={{ label: "Volunteer With Us", href: "/opportunities/volunteer" }}
      />

      <article className="bg-[#f4f7f1] py-12 sm:py-16">
        <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">
          {/* Back Navigation Bar */}
          <div className="mb-8 flex items-center justify-between">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-forest hover:text-brand-green transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to All Projects
            </Link>

            <Badge className="bg-brand-forest text-brand-lime text-xs font-bold uppercase tracking-wider px-3.5 py-1">
              {project.category}
            </Badge>
          </div>

          {/* Main Content Card */}
          <div className="overflow-hidden rounded-3xl border border-[#dfe5db] bg-white shadow-sm">
            {/* Project Hero Image */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#e9eee6]">
              <Image
                src={project.image}
                alt={project.imageAlt || project.title}
                fill
                priority
                sizes="(max-width: 1180px) 100vw, 1180px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-x-6 bottom-6 flex items-center justify-between text-white">
                <span className="flex items-center gap-2 text-sm font-semibold drop-shadow-sm">
                  <MapPin className="h-4 w-4 text-brand-lime" />
                  {project.location}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-10 lg:p-12">
              {/* Highlight / Metric Bar */}
              {project.impactMetrics && (
                <div className="rounded-2xl border border-[#d2e4cb] bg-[#f0f6ee] p-5 sm:p-6 mb-8">
                  <p className="m-0 text-xs font-bold uppercase tracking-wider text-brand-green">
                    Impact & Reach
                  </p>
                  <p className="m-0 font-sans text-base sm:text-lg font-bold text-brand-forest mt-1">
                    {project.impactMetrics}
                  </p>
                </div>
              )}

              {/* Project Narrative Overview */}
              <div>
                <h2 className="font-sans text-2xl sm:text-3xl font-bold text-brand-forest mb-4">
                  About This Initiative
                </h2>
                <p className="text-base sm:text-lg leading-[1.8] text-brand-ink/90">
                  {project.description}
                </p>
                {project.highlight && (
                  <p className="mt-4 text-base sm:text-lg leading-[1.8] text-brand-ink/90 font-medium">
                    ✦ {project.highlight}
                  </p>
                )}
              </div>

              {/* Why This Project Matters & Our Approach */}
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-2xl border border-[#dfe5db] bg-[#fafcf9] p-6 sm:p-7">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#e5eee2] text-brand-green">
                      <Users className="h-4.5 w-4.5" />
                    </span>
                    <h3 className="m-0 font-sans text-lg font-bold text-brand-forest">
                      Grassroots Partnership
                    </h3>
                  </div>
                  <p className="m-0 text-sm leading-[1.7] text-brand-muted">
                    We work hand-in-hand with Malawian teachers, traditional authorities, and village leaders, ensuring self-reliance, local dignity, and enduring community stewardship.
                  </p>
                </div>

                <div className="rounded-2xl border border-[#dfe5db] bg-[#fafcf9] p-6 sm:p-7">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#e5eee2] text-brand-green">
                      <Sprout className="h-4.5 w-4.5" />
                    </span>
                    <h3 className="m-0 font-sans text-lg font-bold text-brand-forest">
                      Sustainable & Self-Reliant
                    </h3>
                  </div>
                  <p className="m-0 text-sm leading-[1.7] text-brand-muted">
                    Every dollar invested provides permanent physical capacity—rehabilitated classrooms, drought-resilient bio-intensive crops, and lifelong nutritional knowledge.
                  </p>
                </div>
              </div>

              {/* Dedicated Donation & Support Section */}
              <div className="mt-12 rounded-3xl border border-[#cbe1c7] bg-gradient-to-br from-[#f2f8f0] via-[#eaf4e6] to-[#ddedea] p-8 sm:p-10 lg:p-12 shadow-xs">
                <div className="max-w-2xl">
                  <p className="m-0 text-xs font-bold uppercase tracking-wider text-brand-green">
                    Direct Mission Support
                  </p>
                  <h3 className="mt-2 font-sans text-2xl sm:text-3xl font-extrabold text-brand-forest leading-tight">
                    Support the {project.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-brand-muted leading-relaxed">
                    Edunite2Serve is a 100% volunteer organization. Every dollar contributed goes directly to the field in Malawi without administrative deductions.
                  </p>
                </div>

                {/* Donation impact tiers */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { amount: "$25", desc: "Seed supplies or basic school materials" },
                    { amount: "$50", desc: "Community farming tools or desk repairs" },
                    { amount: "$100", desc: "Full student meal & healthcare support" },
                    { amount: "$250+", desc: "Major infrastructure or bio-intensive farm plots" },
                  ].map((tier) => (
                    <div
                      key={tier.amount}
                      className="rounded-2xl border border-white/80 bg-white/90 p-4 shadow-xs"
                    >
                      <p className="m-0 font-sans text-xl font-extrabold text-brand-forest">
                        {tier.amount}
                      </p>
                      <p className="m-0 mt-1 text-xs text-brand-muted leading-normal">
                        {tier.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Button
                    className="rounded-full bg-brand-forest hover:bg-brand-green text-white font-bold text-base px-8 py-3.5 h-auto shadow-md"
                    render={<Link href={donationUrl} />}
                  >
                    Donate to Support This Project
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                  <Button
                    className="rounded-full border border-[#cbd9c8] bg-white hover:bg-[#f5f8f2] text-brand-forest font-bold text-base px-7 py-3.5 h-auto"
                    render={<Link href="/opportunities/volunteer" />}
                    variant="outline"
                  >
                    Volunteer for This Mission
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Other Projects Section */}
          {otherProjects.length > 0 && (
            <div className="mt-16">
              <h2 className="font-sans text-2xl font-bold text-brand-forest mb-6">
                Explore Other Initiatives
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {otherProjects.map((item) => (
                  <Card
                    key={item.slug}
                    className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#dfe5db] bg-white shadow-xs hover:shadow-md transition-all"
                  >
                    <div>
                      <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                        <Image
                          src={item.image}
                          alt={item.imageAlt || item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5">
                        <span className="text-[11px] font-bold text-brand-green uppercase tracking-wider">
                          {item.category}
                        </span>
                        <h3 className="mt-1 font-sans text-base font-bold text-brand-forest group-hover:text-brand-green transition-colors line-clamp-2">
                          <Link href={`/projects/${item.slug}`}>{item.title}</Link>
                        </h3>
                        <p className="mt-2 text-xs text-brand-muted line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <div className="border-t border-[#edf2ea] p-4 px-5 bg-[#fafcfa]">
                      <Link
                        href={`/projects/${item.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-brand-green hover:text-brand-forest transition-colors"
                      >
                        Explore Project
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
