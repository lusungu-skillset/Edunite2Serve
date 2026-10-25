import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  GraduationCap,
  HeartHandshake,
  Sparkles,
  Users,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { donationUrl } from "@/data/navigation";

export const metadata: Metadata = {
  title: "Opportunities | Edunite2Serve",
  description:
    "Explore volunteer, internship, and career pathways with Edunite2Serve in Malawi and worldwide.",
};

const pathways = [
  {
    title: "Volunteer Program",
    eyebrow: "Most Active Pathway",
    description:
      "Join our volunteer team on the ground in Malawi or remotely. Contribute your skills in education, regenerative farming, community health, or logistics.",
    status: "Actively Recruiting",
    statusTone: "bg-[#e5f4ef] text-[#00876f]",
    href: "/opportunities/volunteer",
    ctaLabel: "Apply to Volunteer",
    icon: HeartHandshake,
    highlights: [
      "School teaching & mentoring in Thyolo",
      "Bio-intensive farming at Lakeside Farm",
      "Plant-based nutrition workshops",
      "Community project coordination",
    ],
  },
  {
    title: "Internship Placements",
    eyebrow: "Learning & Development",
    description:
      "Gain hands-on humanitarian and NGO experience through structured learning attachments in community development, public health, and nonprofit administration.",
    status: "No Current Openings",
    statusTone: "bg-[#f5f5f5] text-brand-muted",
    href: "/opportunities/internship",
    ctaLabel: "View Internship Status",
    icon: GraduationCap,
    highlights: [
      "Field research & data collection",
      "Agricultural extension training",
      "Community health promotion",
      "Academic credit cooperation",
    ],
  },
  {
    title: "Career Vacancies",
    eyebrow: "Staff & Key Roles",
    description:
      "As a volunteer-centered nonprofit, our operations are led by passionate volunteers. When specialized project vacancies open, they are announced here.",
    status: "No Current Vacancies",
    statusTone: "bg-[#f5f5f5] text-brand-muted",
    href: "/opportunities/vacancies",
    ctaLabel: "Check Vacancy Status",
    icon: Briefcase,
    highlights: [
      "100% volunteer-led leadership",
      "Project-specific contracts when funded",
      "Transparent recruitment process",
      "Equal opportunity in community service",
    ],
  },
];

export default function OpportunitiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get Involved"
        title="Opportunities to Serve, Learn, and Lead"
        description="Whether you are an experienced agriculturalist, an educator, a passionate volunteer, or an international supporter, there are meaningful ways to lend your hands."
        breadcrumbs={[{ label: "Opportunities" }]}
        primaryCta={{ label: "Volunteer With Us", href: "/opportunities/volunteer" }}
        secondaryCta={{ label: "Donate to Missions", href: donationUrl }}
      />

      <section className="bg-[#f4f7f1] py-[84px] max-[720px]:py-[60px]">
        <div className="mx-auto w-full max-w-[1720px] px-10 max-[720px]:max-w-[596px] max-[720px]:px-[18px] max-[440px]:max-w-[570px] max-[440px]:px-[15px]">
          <SectionHeading
            eyebrow="Engagement Pathways"
            title="Explore Ways to Connect"
            description="Select an opportunity pathway below to see current recruitment status, requirements, and application details."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {pathways.map((pathway) => {
              const Icon = pathway.icon;
              return (
                <Card
                  key={pathway.title}
                  className="group flex flex-col justify-between rounded-2xl border border-[#dfe5db] bg-white p-8 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-forest text-brand-lime">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${pathway.statusTone}`}
                      >
                        {pathway.status}
                      </span>
                    </div>

                    <p className="m-0 text-xs font-bold text-brand-green uppercase tracking-wide">
                      {pathway.eyebrow}
                    </p>
                    <h3 className="m-0 mt-1 font-sans text-2xl font-bold text-brand-forest">
                      {pathway.title}
                    </h3>

                    <CardContent className="p-0 mt-3">
                      <p className="m-0 text-sm leading-[1.7] text-brand-muted">
                        {pathway.description}
                      </p>
                    </CardContent>

                    <div className="mt-6 border-t border-[#edf2ea] pt-4">
                      <p className="m-0 text-xs font-bold uppercase tracking-wider text-brand-forest mb-2.5">
                        Focus Areas:
                      </p>
                      <ul className="m-0 p-0 list-none space-y-1.5 text-xs text-brand-muted">
                        {pathway.highlights.map((h, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#edf2ea]">
                    <Button
                      className="w-full rounded-xl bg-brand-green hover:bg-brand-forest text-white font-bold text-sm py-2.5"
                      render={<Link href={pathway.href} />}
                    >
                      {pathway.ctaLabel}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Volunteer Culture Callout */}
      <section className="bg-white py-[84px] max-[720px]:py-[60px] border-t border-[#edf2ea]">
        <div className="mx-auto w-full max-w-[1200px] px-10 text-center">
          <Badge className="bg-[#e9f2e4] text-brand-forest font-bold text-xs uppercase tracking-wider mb-4 border-0">
            Volunteer-Centered Movement
          </Badge>
          <h2 className="m-0 font-sans text-[clamp(32px,3.8vw,48px)] font-bold text-brand-forest leading-tight">
            Driven by Passion, Built on Integrity
          </h2>
          <p className="mx-auto mt-4 max-w-[720px] text-[17px] text-brand-muted leading-[1.8]">
            Edunite2Serve operates with 100% volunteer governance. Every leader, field worker, and international coordinator commits their time selflessly to ensure that donor funding reaches classrooms, farms, and clinics directly.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              className="rounded-full bg-brand-green hover:bg-brand-forest text-white font-bold text-base px-8 py-3.5 h-auto shadow-sm"
              render={<Link href="/opportunities/volunteer" />}
            >
              Apply as Volunteer Now
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <Button
              className="rounded-full border border-[#cbd9c8] bg-white hover:bg-[#f4f8f1] text-brand-forest font-bold text-base px-8 py-3.5 h-auto"
              render={<Link href="/contact" />}
              variant="outline"
            >
              Contact Opportunities Team
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
