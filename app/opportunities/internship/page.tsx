import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bell,
  BookOpen,
  Calendar,
  CheckCircle2,
  GraduationCap,
  Mail,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Internship Opportunities | Edunite2Serve",
  description:
    "Information on student attachments and internship placements with Edunite2Serve in Malawi.",
};

export default function InternshipPage() {
  return (
    <>
      <PageHeader
        eyebrow="Academic & Field Attachments"
        title="Internship Opportunities"
        description="Structured learning attachments offering practical experience in sustainable agriculture, community health, child education, and humanitarian NGO administration."
        breadcrumbs={[
          { label: "Opportunities", href: "/opportunities" },
          { label: "Internship" },
        ]}
        primaryCta={{ label: "Explore Volunteer Roles", href: "/opportunities/volunteer" }}
        secondaryCta={{ label: "Contact Us for Academic Inquiries", href: "/contact" }}
      />

      {/* Current Status Banner */}
      <section className="bg-white py-[84px] max-[720px]:py-[60px] border-b border-[#edf2ea]">
        <div className="mx-auto w-full max-w-[960px] px-10 max-[720px]:px-[18px] text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[#f4f7ed] text-brand-forest mb-6">
            <GraduationCap className="h-8 w-8 text-brand-green" />
          </div>

          <Badge className="bg-[#f2f4ec] text-brand-forest font-bold text-xs uppercase tracking-wider mb-4 border-0">
            Recruitment Notice
          </Badge>

          {/* Heading directly from WordPress CMS */}
          <h2 className="m-0 font-sans text-[clamp(28px,3.5vw,42px)] font-bold text-brand-forest leading-tight">
            Currently, there are no Internship opportunities
          </h2>

          <p className="mx-auto mt-4 max-w-[680px] text-[16px] sm:text-[17px] leading-[1.75] text-brand-muted">
            Our structured internship cohorts open periodically based on field program cycles and academic terms. In the meantime, we welcome motivated students and recent graduates to join as active volunteers or submit an advance inquiry for upcoming cohorts.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              className="rounded-full bg-brand-green hover:bg-brand-forest text-white font-bold text-sm px-7 py-3 h-auto"
              render={<Link href="/opportunities/volunteer" />}
            >
              View Active Volunteer Roles
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <Button
              className="rounded-full border border-[#cbd9c8] bg-white hover:bg-[#f5f8f2] text-brand-forest font-bold text-sm px-6 py-3 h-auto"
              render={<Link href="/contact" />}
              variant="outline"
            >
              Submit University Inquiry
            </Button>
          </div>
        </div>
      </section>

      {/* Typical Internship Disciplines */}
      <section className="bg-[#f5f8f2] py-[84px] max-[720px]:py-[60px] border-b border-[#edf2ea]">
        <div className="mx-auto w-full max-w-[1720px] px-10 max-[720px]:max-w-[596px] max-[720px]:px-[18px] max-[440px]:max-w-[570px] max-[440px]:px-[15px]">
          <SectionHeading
            eyebrow="Fields of Study"
            title="Disciplines We Partner With"
            description="When placements open, Edunite2Serve collaborates with universities and polytechnics across several core development tracks."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[
              {
                title: "Sustainable Agriculture & Horticulture",
                desc: "Practical agronomy at Lakeside Farm and Kamwisa Orchard, focusing on bio-intensive organic techniques, soil regeneration, and perennial tree stewardship.",
              },
              {
                title: "Primary Education & Child Pedagogy",
                desc: "Classroom assistance at Mangunda Primary School, curriculum development, literacy promotion, and inclusive teaching methods in rural communities.",
              },
              {
                title: "Public Health & Plant-Based Nutrition",
                desc: "Community nutrition education in partnership with FARM STEW International, sanitation initiatives, and healthy culinary workshop coordination.",
              },
            ].map((track, i) => (
              <Card
                key={i}
                className="rounded-2xl border border-[#dfe5db] bg-white p-7 shadow-xs"
              >
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-forest text-brand-lime font-brand font-bold text-sm mb-4">
                  0{i + 1}
                </div>
                <h3 className="m-0 font-sans text-lg font-bold text-brand-forest">
                  {track.title}
                </h3>
                <CardContent className="p-0 mt-2.5">
                  <p className="m-0 text-sm leading-[1.7] text-brand-muted">
                    {track.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
