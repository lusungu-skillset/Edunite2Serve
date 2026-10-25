import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import { getCmsTeam } from "@/lib/cms";
import { aboutContent } from "@/data/about";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Our Leadership & Team | Edunite2Serve",
  description:
    "Meet the volunteer leaders, field coordinators, and directors driving Edunite2Serve's mission in Malawi and globally.",
};

type Member = {
  name: string;
  role: string;
  bio: string;
  initials: string;
};

function TeamCards({ team }: { team: readonly Member[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
      {team.map((member) => (
        <Card
          key={member.name}
          className="group flex flex-col justify-between rounded-2xl border border-[#dfe5db] bg-[#fafcf9] p-8 shadow-xs hover:shadow-md transition-all"
        >
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-brand-forest text-brand-lime font-brand text-xl font-bold shadow-xs group-hover:scale-105 transition-transform">
                {member.initials}
              </div>
              <div>
                <h3 className="m-0 font-sans text-xl font-bold text-brand-forest">
                  {member.name}
                </h3>
                <p className="m-0 text-xs font-semibold text-brand-green uppercase tracking-wide mt-1">
                  {member.role}
                </p>
              </div>
            </div>

            <CardContent className="p-0">
              <p className="m-0 text-sm leading-[1.7] text-brand-muted">
                {member.bio}
              </p>
            </CardContent>
          </div>

          <div className="mt-6 pt-4 border-t border-[#edf2ea] flex items-center justify-between">
            <span className="text-xs font-bold text-brand-forest bg-[#e9f2e4] px-3 py-1 rounded-full">
              Edunite2Serve Leader
            </span>
            <span className="text-xs text-brand-muted font-medium">
              Verified
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
}

async function TeamFeed() {
  const team = await getCmsTeam();
  return <TeamCards team={team} />;
}

export default function TeamPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our People"
        title="Meet Our Dedicated Leadership & Field Team"
        description="A passionate volunteer network uniting educators, agriculturalists, public health workers, and administrators committed to serving communities across Malawi."
        breadcrumbs={[{ label: "Team" }]}
        primaryCta={{ label: "Join As a Volunteer", href: "/opportunities/volunteer" }}
        secondaryCta={{ label: "Contact the Team", href: "/contact" }}
      />

      <section className="bg-white py-[84px] max-[720px]:py-[60px] border-b border-[#edf2ea]">
        <div className="mx-auto w-full max-w-[1720px] px-10 max-[720px]:max-w-[596px] max-[720px]:px-[18px] max-[440px]:max-w-[570px] max-[440px]:px-[15px]">
          <SectionHeading
            eyebrow="Volunteer Leadership"
            title="Directors & Field Coordinators"
            description="Our leaders give their time voluntarily, ensuring donor investments go straight to educational facilities, crops, and medical wellness."
          />

          <Suspense fallback={<TeamCards team={aboutContent.leadership} />}>
            <TeamFeed />
          </Suspense>
        </div>
      </section>

      {/* Join the Team CTA */}
      <section className="bg-brand-cream py-[84px] max-[720px]:py-[60px]">
        <div className="mx-auto w-full max-w-[1100px] px-10 text-center">
          <SectionHeading
            eyebrow="Want to Join?"
            title="We Are Always Welcoming New Hearts"
            description="Whether in teaching, farming, healthcare, finance, or media, your contribution will bring hope to south-central Africa."
            centered
          />

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              className="rounded-full bg-brand-green hover:bg-brand-forest text-white font-bold text-base px-8 py-3.5 h-auto shadow-sm"
              render={<Link href="/opportunities/volunteer" />}
            >
              Apply to Volunteer
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <Button
              className="rounded-full border border-[#cbd9c8] bg-white hover:bg-[#f5f8f2] text-brand-forest font-bold text-base px-8 py-3.5 h-auto"
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
