import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  HeartHandshake,
  ShieldAlert,
  Users,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Career Vacancies | Edunite2Serve",
  description:
    "Current job openings and career vacancies with Edunite2Serve in Malawi and internationally.",
};

export default function VacanciesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Employment & Roles"
        title="Career Vacancies"
        description="Information on paid positions, project-funded consultancies, and organizational roles at Edunite2Serve."
        breadcrumbs={[
          { label: "Opportunities", href: "/opportunities" },
          { label: "Vacancies" },
        ]}
        primaryCta={{ label: "Explore Volunteer Roles", href: "/opportunities/volunteer" }}
        secondaryCta={{ label: "Contact Our HR Team", href: "/contact" }}
      />

      {/* Current Status Notice */}
      <section className="bg-white py-[84px] max-[720px]:py-[60px] border-b border-[#edf2ea]">
        <div className="mx-auto w-full max-w-[960px] px-10 max-[720px]:px-[18px] text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[#f4f7ed] text-brand-forest mb-6">
            <Briefcase className="h-8 w-8 text-brand-green" />
          </div>

          <Badge className="bg-[#f2f4ec] text-brand-forest font-bold text-xs uppercase tracking-wider mb-4 border-0">
            Recruitment Status
          </Badge>

          {/* Heading directly from WordPress CMS */}
          <h2 className="m-0 font-sans text-[clamp(28px,3.5vw,42px)] font-bold text-brand-forest leading-tight">
            Currently, there are no vacancy opportunities
          </h2>

          <p className="mx-auto mt-4 max-w-[680px] text-[16px] sm:text-[17px] leading-[1.75] text-brand-muted">
            Edunite2Serve is a proudly volunteer-led humanitarian mission. All core officers, directors, and field contributors serve on a voluntary basis so that donations are concentrated directly into school supplies, farm inputs, and community programs.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              className="rounded-full bg-brand-green hover:bg-brand-forest text-white font-bold text-sm px-7 py-3 h-auto"
              render={<Link href="/opportunities/volunteer" />}
            >
              Join Our Volunteer Team
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <Button
              className="rounded-full border border-[#cbd9c8] bg-white hover:bg-[#f5f8f2] text-brand-forest font-bold text-sm px-6 py-3 h-auto"
              render={<Link href="/contact" />}
              variant="outline"
            >
              General Employment Inquiries
            </Button>
          </div>
        </div>
      </section>

      {/* Volunteer-Driven Model Info */}
      <section className="bg-[#f5f8f2] py-[84px] max-[720px]:py-[60px] border-b border-[#edf2ea]">
        <div className="mx-auto w-full max-w-[1200px] px-10">
          <SectionHeading
            eyebrow="Our Stewardship Philosophy"
            title="Why Volunteer-Led Governance Matters"
            description="Our commitment to keeping operational overhead low guarantees maximum impact for every donor dollar."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {[
              {
                title: "Direct Field Impact",
                desc: "Donated funds are channeled directly into physical projects—classroom roofs, fruit trees, clean water tanks, and seed stock.",
                icon: HeartHandshake,
              },
              {
                title: "Transparent Stewardship",
                desc: "Governed under strict accounting protocols through our Atlanta, Georgia 501(c)(3) partner and Malawi regulatory bodies.",
                icon: CheckCircle2,
              },
              {
                title: "Community Ownership",
                desc: "Local community volunteers are trained and entrusted as key decision-makers, fostering self-reliance rather than reliance on external staff.",
                icon: Users,
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <Card
                  key={i}
                  className="rounded-2xl border border-[#dfe5db] bg-white p-7 shadow-xs"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-forest text-brand-lime mb-5">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="m-0 font-sans text-lg font-bold text-brand-forest">
                    {item.title}
                  </h3>
                  <CardContent className="p-0 mt-2.5">
                    <p className="m-0 text-sm leading-[1.7] text-brand-muted">
                      {item.desc}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
