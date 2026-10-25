import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Sprout,
  Users,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import { aboutContent } from "@/data/about";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { donationUrl } from "@/data/navigation";

export const metadata: Metadata = {
  title: "About Us | Edunite2Serve",
  description:
    "Learn about Edunite2Serve, our story, mission, leadership, and our commitment to sustainable Christ-centered community development in Malawi.",
};

export default function AboutUsPage() {
  const { story, missionVision, values, communityInvolvement, leadership, faqs } =
    aboutContent;

  return (
    <>
      <PageHeader
        eyebrow={aboutContent.eyebrow}
        title={aboutContent.title}
        description={aboutContent.description}
        breadcrumbs={[{ label: "About Us" }]}
        primaryCta={{ label: "Donate to Malawi Missions", href: donationUrl }}
        secondaryCta={{ label: "Explore Our Projects", href: "/projects" }}
      />

      {/* Story & Origins */}
      <section className="bg-white py-[84px] max-[720px]:py-[60px] border-b border-[#edf2ea]">
        <div className="mx-auto w-full max-w-[1720px] px-10 max-[720px]:max-w-[596px] max-[720px]:px-[18px] max-[440px]:max-w-[570px] max-[440px]:px-[15px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow={story.eyebrow}
                title={story.title}
                description="Founded on compassionate action, faith, and sustainable grassroots empowerment."
              />

              <div className="space-y-5 text-[16px] sm:text-[17px] leading-[1.8] text-brand-muted">
                {story.paragraphs.map((p, idx) => (
                  <p key={idx} className="m-0">
                    {p}
                  </p>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2.5 rounded-full bg-[#f4f8f1] px-4 py-2 border border-[#dfe8dc]">
                  <CheckCircle2 className="h-4 w-4 text-brand-green" />
                  <span className="text-xs font-bold text-brand-forest uppercase tracking-wider">
                    Registered 501(c)(3) USA Partner
                  </span>
                </div>
                <div className="flex items-center gap-2.5 rounded-full bg-[#f4f8f1] px-4 py-2 border border-[#dfe8dc]">
                  <Users className="h-4 w-4 text-brand-green" />
                  <span className="text-xs font-bold text-brand-forest uppercase tracking-wider">
                    100% Volunteer Leadership
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl bg-gradient-to-br from-[#07361f] to-[#147a3f] p-6 sm:p-10 text-white shadow-xl">
                <Sparkles className="h-10 w-10 text-brand-lime/80 mb-6" />
                <blockquote className="m-0 font-sans text-xl sm:text-2xl font-bold leading-relaxed">
                  &ldquo;Seeing a need for energetic, nonprofit mission work in Africa, Edunite2Serve was formed to provide sensible Christ-centered sustainable solutions.&rdquo;
                </blockquote>
                <div className="mt-8 border-t border-white/20 pt-6">
                  <cite className="not-italic block font-sans text-lg font-bold text-brand-lime">
                    {story.founder}
                  </cite>
                  <p className="m-0 text-sm font-medium text-white/80">
                    Founder & International Director
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-[#f5f8f2] py-[84px] max-[720px]:py-[60px] border-b border-[#edf2ea]">
        <div className="mx-auto w-full max-w-[1720px] px-10 max-[720px]:max-w-[596px] max-[720px]:px-[18px] max-[440px]:max-w-[570px] max-[440px]:px-[15px]">
          <SectionHeading
            eyebrow="Our North Star"
            title="Mission & Vision"
            description="Guiding every initiative, partnership, and community engagement in south-central Africa."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            {/* Mission Card */}
            <Card className="rounded-2xl border border-[#dfe5db] border-t-4 border-t-[#00876f] bg-white p-8 shadow-sm">
              <Badge className="bg-[#e5f4ef] text-[#00876f] font-bold text-xs uppercase tracking-wider mb-4 border-0">
                {missionVision.mission.eyebrow}
              </Badge>
              <h3 className="m-0 font-sans text-2xl font-bold text-brand-forest">
                {missionVision.mission.title}
              </h3>
              <CardContent className="p-0 mt-4">
                <p className="m-0 text-[16px] leading-[1.8] text-brand-muted">
                  {missionVision.mission.statement}
                </p>
              </CardContent>
            </Card>

            {/* Vision Card */}
            <Card className="rounded-2xl border border-[#dfe5db] border-t-4 border-t-brand-orange bg-white p-8 shadow-sm">
              <Badge className="bg-[#fdf0e9] text-brand-orange font-bold text-xs uppercase tracking-wider mb-4 border-0">
                {missionVision.vision.eyebrow}
              </Badge>
              <h3 className="m-0 font-sans text-2xl font-bold text-brand-forest">
                {missionVision.vision.title}
              </h3>
              <CardContent className="p-0 mt-4">
                <p className="m-0 text-[16px] leading-[1.8] text-brand-muted">
                  {missionVision.vision.statement}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-white py-[84px] max-[720px]:py-[60px] border-b border-[#edf2ea]">
        <div className="mx-auto w-full max-w-[1720px] px-10 max-[720px]:max-w-[596px] max-[720px]:px-[18px] max-[440px]:max-w-[570px] max-[440px]:px-[15px]">
          <SectionHeading
            eyebrow="What Drives Us"
            title="Our Guiding Values"
            description="Every project is measured against these foundational principles of service and integrity."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {values.map((val) => (
              <Card
                key={val.title}
                className="group rounded-2xl border border-[#dfe5db] bg-[#fafcf9] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:bg-white"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-forest text-brand-lime mb-5 group-hover:scale-105 transition-transform">
                  {val.icon === "heart-handshake" && <HeartHandshake className="h-6 w-6" />}
                  {val.icon === "sprout" && <Sprout className="h-6 w-6" />}
                  {val.icon === "book-open-check" && <BookOpenCheck className="h-6 w-6" />}
                  {val.icon === "shield-check" && <ShieldCheck className="h-6 w-6" />}
                </div>
                <h3 className="m-0 font-sans text-lg font-bold text-brand-forest">
                  {val.title}
                </h3>
                <CardContent className="p-0 mt-2.5">
                  <p className="m-0 text-sm leading-[1.65] text-brand-muted">
                    {val.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Involvement Highlights */}
      <section className="bg-brand-cream py-[84px] max-[720px]:py-[60px] border-b border-[#edf2ea]">
        <div className="mx-auto w-full max-w-[1720px] px-10 max-[720px]:max-w-[596px] max-[720px]:px-[18px] max-[440px]:max-w-[570px] max-[440px]:px-[15px]">
          <SectionHeading
            eyebrow={communityInvolvement.eyebrow}
            title={communityInvolvement.title}
            description={communityInvolvement.description}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {communityInvolvement.highlights.map((h, i) => (
              <div
                key={i}
                className="rounded-2xl border border-[#dfe5db] bg-white p-6 shadow-xs"
              >
                <span className="inline-block text-2xl font-brand font-extrabold text-[#00876f] mb-2">
                  0{i + 1}.
                </span>
                <h4 className="m-0 font-sans text-base font-bold text-brand-forest">
                  {h.title}
                </h4>
                <p className="m-0 mt-2 text-sm leading-[1.65] text-brand-muted">
                  {h.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="bg-white py-[84px] max-[720px]:py-[60px] border-b border-[#edf2ea]">
        <div className="mx-auto w-full max-w-[1720px] px-10 max-[720px]:max-w-[596px] max-[720px]:px-[18px] max-[440px]:max-w-[570px] max-[440px]:px-[15px]">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <SectionHeading
              eyebrow="Dedicated Stewards"
              title="Our Leadership Team"
              description="A dedicated volunteer leadership network driving operations, education, and finance."
              className="mb-0"
            />
            <Button
              className="rounded-full bg-brand-green hover:bg-brand-forest text-white font-bold text-sm px-6 h-auto py-2.5 self-start md:self-auto shrink-0"
              render={<Link href="/team" />}
            >
              View Full Team & Members →
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {leadership.map((leader) => (
              <Card
                key={leader.name}
                className="rounded-2xl border border-[#dfe5db] bg-[#fbfdfa] p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-forest text-brand-lime font-brand text-lg font-bold">
                      {leader.initials}
                    </div>
                    <div>
                      <h3 className="m-0 font-sans text-lg font-bold text-brand-forest">
                        {leader.name}
                      </h3>
                      <p className="m-0 text-xs font-semibold text-brand-green uppercase tracking-wide">
                        {leader.role}
                      </p>
                    </div>
                  </div>
                  <CardContent className="p-0">
                    <p className="m-0 text-sm leading-[1.65] text-brand-muted">
                      {leader.bio}
                    </p>
                  </CardContent>
                </div>

                <div className="mt-5 pt-3 border-t border-[#edf2ea]">
                  <span className="text-[11px] font-semibold text-brand-forest bg-[#e9f2e4] px-2.5 py-1 rounded-full">
                    Malawi Mission Leader
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#f5f8f2] py-[84px] max-[720px]:py-[60px] border-b border-[#edf2ea]">
        <div className="mx-auto w-full max-w-[1040px] px-10 max-[720px]:px-[18px]">
          <SectionHeading
            eyebrow="Got Questions?"
            title="Frequently Asked Questions"
            description="Learn more about our legal status, donation pathways, and volunteer opportunities."
            centered
          />

          <div className="mt-10">
            <Accordion multiple className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="rounded-2xl border border-[#dfe5db] bg-white px-6 shadow-xs"
                >
                  <AccordionTrigger className="font-sans text-lg font-bold text-brand-forest hover:text-brand-green py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[15px] leading-[1.75] text-brand-muted pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#07361f] text-white py-[72px]">
        <div className="mx-auto w-full max-w-[1200px] px-10 text-center">
          <Badge className="bg-brand-lime/20 text-brand-lime font-bold text-xs uppercase tracking-wider mb-4 border-0">
            Make an Impact Today
          </Badge>
          <h2 className="m-0 font-sans text-[clamp(32px,4vw,48px)] font-bold text-white leading-tight">
            Partner With Us to Transform Lives in Malawi
          </h2>
          <p className="mx-auto mt-4 max-w-[650px] text-[17px] text-white/80 leading-[1.7]">
            Every gift directly funds classrooms, fresh meals, sustainable agricultural training, and vital healthcare outreach.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              className="rounded-full bg-brand-green hover:bg-[#10a344] text-white font-bold text-base px-8 py-3.5 h-auto shadow-lg"
              render={<Link href={donationUrl} />}
            >
              Donate Now
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <Button
              className="rounded-full border border-white/30 bg-transparent hover:bg-white/10 text-white font-bold text-base px-8 py-3.5 h-auto"
              render={<Link href="/contact" />}
              variant="outline"
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
