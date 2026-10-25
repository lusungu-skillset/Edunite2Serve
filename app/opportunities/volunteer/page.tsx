import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  HeartHandshake,
  Mail,
  MapPin,
  Sprout,
  UtensilsCrossed,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Volunteer With Us | Edunite2Serve",
  description:
    "Volunteer with Edunite2Serve Malawi projects now. Teach children, support organic farming, lead nutrition workshops, or contribute administrative skills.",
};

const volunteerRoles = [
  {
    title: "Primary School Teacher & Mentor",
    location: "Mangunda Primary School, Thyolo",
    category: "Child Education",
    icon: GraduationCap,
    description:
      "Support standard 1-7 learners in literacy, numeracy, creative arts, and spiritual growth. Assist local educators with classroom activities and after-school clubs.",
  },
  {
    title: "Organic Farm & Orchard Assistant",
    location: "Lakeside Farm & Kamwisa Orchard",
    category: "Sustainable Agriculture",
    icon: Sprout,
    description:
      "Work alongside community farmers in bio-intensive crop management, fruit tree planting, natural pest deterrence, and seed preservation.",
  },
  {
    title: "Community Nutrition Workshop Facilitator",
    location: "Zomba, Dedza & Local Centers",
    category: "Health & Nutrition",
    icon: UtensilsCrossed,
    description:
      "Facilitate hands-on plant-based cooking classes with Becky Vermilyea and FARM STEW modules, demonstrating healthy, affordable whole foods.",
  },
  {
    title: "Digital & Operations Support",
    location: "Remote / Blantyre Study Hub",
    category: "Media & Administration",
    icon: HeartHandshake,
    description:
      "Contribute design, writing, video storytelling, or administrative coordination for our Virtual Learning Community (VLC) and international outreach.",
  },
];

export default function VolunteerPage() {
  return (
    <>
      <PageHeader
        eyebrow="Join the Mission"
        title="Volunteer with Edunite2serve Malawi Projects Now"
        description="Lend your passion, energy, and skills to grassroots community transformation in Malawi. We welcome local and international volunteers across education, farming, and public health."
        breadcrumbs={[
          { label: "Opportunities", href: "/opportunities" },
          { label: "Volunteer" },
        ]}
        primaryCta={{
          label: "Apply Now on Career Portal",
          href: "https://career.edunite2serve.org/",
        }}
        secondaryCta={{ label: "Contact Us for Questions", href: "/contact" }}
      />

      {/* Main Roles Section */}
      <section className="bg-white py-[84px] max-[720px]:py-[60px] border-b border-[#edf2ea]">
        <div className="mx-auto w-full max-w-[1720px] px-10 max-[720px]:max-w-[596px] max-[720px]:px-[18px] max-[440px]:max-w-[570px] max-[440px]:px-[15px]">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <SectionHeading
              eyebrow="Field Roles"
              title="Current Volunteer Opportunities"
              description="Explore open placements where your unique talents can create measurable, lasting change."
              className="mb-0"
            />
            <Button
              className="rounded-full bg-brand-green hover:bg-brand-forest text-white font-bold text-sm px-6 h-auto py-3 shrink-0"
              render={
                <a
                  href="https://career.edunite2serve.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              Open Application Portal
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {volunteerRoles.map((role) => {
              const Icon = role.icon;
              return (
                <Card
                  key={role.title}
                  className="rounded-2xl border border-[#dfe5db] bg-[#fafcf9] p-8 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-forest text-brand-lime">
                        <Icon className="h-6 w-6" />
                      </div>
                      <Badge className="bg-[#e9f2e4] text-brand-forest font-bold text-xs uppercase tracking-wider border-0">
                        {role.category}
                      </Badge>
                    </div>

                    <h3 className="m-0 font-sans text-xl font-bold text-brand-forest">
                      {role.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-green mt-1 mb-3">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{role.location}</span>
                    </div>

                    <CardContent className="p-0">
                      <p className="m-0 text-sm leading-[1.7] text-brand-muted">
                        {role.description}
                      </p>
                    </CardContent>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#edf2ea] flex items-center justify-between">
                    <span className="text-xs font-bold text-brand-green">
                      Flexible Volunteer Terms
                    </span>
                    <Button
                      className="rounded-xl bg-brand-green hover:bg-brand-forest text-white font-bold text-xs px-4 py-2 h-auto"
                      render={
                        <a
                          href="https://career.edunite2serve.org/"
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      }
                    >
                      Apply Now <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Volunteer Benefits */}
      <section className="bg-[#f5f8f2] py-[84px] max-[720px]:py-[60px] border-b border-[#edf2ea]">
        <div className="mx-auto w-full max-w-[1200px] px-10 text-center">
          <SectionHeading
            eyebrow="Why Volunteer?"
            title="What You Will Gain"
            description="Volunteering with Edunite2Serve is a deeply collaborative, transformative journey."
            centered
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 text-left">
            {[
              {
                title: "Real Grassroots Impact",
                desc: "Work directly with teachers, students, and farming families—witnessing immediate results.",
              },
              {
                title: "Cross-Cultural Growth",
                desc: "Immerse in the rich traditions, hospitality, and communal spirit of Malawi (The Warm Heart of Africa).",
              },
              {
                title: "Practical Skills Training",
                desc: "Learn bio-intensive agriculture, plant-based nutrition principles, and community project leadership.",
              },
              {
                title: "Formal Recognition",
                desc: "Receive official verification, letters of recommendation, and certificate of service for academic and career advancement.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[#dfe5db] bg-white p-6 shadow-xs"
              >
                <CheckCircle2 className="h-6 w-6 text-brand-green mb-3" />
                <h4 className="m-0 font-sans text-base font-bold text-brand-forest">
                  {item.title}
                </h4>
                <p className="m-0 mt-2 text-xs leading-[1.65] text-brand-muted">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Button
              className="rounded-full bg-brand-forest hover:bg-[#147a3f] text-brand-lime font-bold text-base px-8 py-3.5 h-auto shadow-md"
              render={
                <a
                  href="https://career.edunite2serve.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              Submit Your Volunteer Application Now
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
