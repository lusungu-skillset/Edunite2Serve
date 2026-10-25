import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Clock,
  HeartHandshake,
  MapPin,
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
  title: "Events & Community Outreaches | Edunite2Serve",
  description:
    "Join and support community outreach events, medical clinics, educational distributions, and training sessions in Malawi.",
};

const eventsList = [
  {
    title: "Transforming Lives Through Education Support",
    date: "January 19, 2025",
    time: "09:00 AM – 03:00 PM CAT",
    location: "Mangunda Primary School, Thyolo, Malawi",
    category: "Education Outreach",
    description:
      "A dedicated field day providing classroom supplies, teaching resources, and educational sponsorships to more than 200 learners at Mangunda Adventist Primary School.",
    impact: "200+ primary learners supported",
  },
  {
    title: "Hygiene Support Through Provision of Sanitary Pads",
    date: "October 19, 2024",
    time: "10:00 AM – 02:00 PM CAT",
    location: "Ntcheu District, Central Region, Malawi",
    category: "Health & Hygiene",
    description:
      "Empowering young adolescent women in rural schools with vital hygiene education, dignity kits, and reusable sanitary materials to keep girls safely enrolled in school.",
    impact: "150+ adolescent students equipped",
  },
  {
    title: "Community Evangelism & Holistic Wellness Outreach",
    date: "October 19, 2024",
    time: "08:30 AM – 04:30 PM CAT",
    location: "Machinga District, Southern Region, Malawi",
    category: "Community Welfare",
    description:
      "Holistic community outreach bringing practical medical checks, spiritual encouragement, plant-based nutrition education, and food relief to underserved families.",
    impact: "Multi-village health and welfare fellowship",
  },
  {
    title: "Vegetarian Cookery & Bio-Intensive Farming Workshop",
    date: "Quarterly Program",
    time: "Weekend Intensive",
    location: "Zomba Regional Center, Malawi",
    category: "Skills Workshop",
    description:
      "Hands-on culinary training series with Becky Vermilyea and certified FARM STEW instructors teaching affordable, disease-preventing plant-based food preparation.",
    impact: "Certified community graduates teaching neighbor families",
  },
];

export default function EventsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Community Gatherings"
        title="Events & Field Outreaches"
        description="From classroom supply distributions in Thyolo to hygiene education in Ntcheu, discover how our volunteers bring practical hope to Malawian communities."
        breadcrumbs={[{ label: "Events" }]}
        primaryCta={{ label: "Sponsor an Event", href: donationUrl }}
        secondaryCta={{ label: "Volunteer at Next Outreach", href: "/opportunities/volunteer" }}
      />

      <section className="bg-white py-[84px] max-[720px]:py-[60px] border-b border-[#edf2ea]">
        <div className="mx-auto w-full max-w-[1720px] px-10 max-[720px]:max-w-[596px] max-[720px]:px-[18px] max-[440px]:max-w-[570px] max-[440px]:px-[15px]">
          <SectionHeading
            eyebrow="Field Calendar"
            title="Recent & Upcoming Outreaches"
            description="Witness compassionate service in action across the central and southern districts of Malawi."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            {eventsList.map((evt, idx) => (
              <Card
                key={idx}
                className="group flex flex-col justify-between rounded-2xl border border-[#dfe5db] bg-[#fafcf9] p-8 shadow-xs hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <Badge className="bg-brand-forest text-brand-lime font-bold text-xs uppercase tracking-wider border-0">
                      {evt.category}
                    </Badge>
                    <span className="flex items-center gap-1.5 text-xs font-bold text-brand-green">
                      <Calendar className="h-4 w-4" />
                      {evt.date}
                    </span>
                  </div>

                  <h3 className="m-0 font-sans text-2xl font-bold text-brand-forest leading-snug">
                    {evt.title}
                  </h3>

                  <div className="mt-3 flex flex-wrap gap-4 text-xs font-semibold text-brand-muted">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-brand-green" />
                      {evt.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-brand-green" />
                      {evt.time}
                    </span>
                  </div>

                  <CardContent className="p-0 mt-4">
                    <p className="m-0 text-sm leading-[1.7] text-brand-muted">
                      {evt.description}
                    </p>
                  </CardContent>

                  <div className="mt-4 rounded-xl bg-[#edf5ea] p-3 text-xs font-bold text-brand-forest border border-[#d6e7d1]">
                    ✦ Impact: {evt.impact}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#edf2ea] flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-green">
                    Field Mission Event
                  </span>
                  <Button
                    className="rounded-xl bg-brand-green hover:bg-brand-forest text-white font-bold text-xs px-5 py-2.5 h-auto"
                    render={<Link href={donationUrl} />}
                  >
                    Support Outreaches
                    <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
