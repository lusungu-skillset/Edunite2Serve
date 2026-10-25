import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
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
  initials?: string;
  image?: string;
};

function TeamCards({ team }: { team: readonly Member[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
      {team.map((member) => (
        <Card
          key={member.name}
          className="group flex flex-col items-center text-center rounded-2xl border border-[#dfe5db] bg-white p-7 sm:p-8 shadow-xs hover:shadow-md transition-all duration-300"
        >
          {/* Photo of Team member */}
          <div className="relative h-32 w-32 sm:h-36 sm:w-36 rounded-full overflow-hidden mb-5 border-4 border-[#e8eee4] shadow-sm bg-[#e8eee4] shrink-0">
            {member.image ? (
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="(max-width: 640px) 128px, 144px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="grid h-full w-full place-items-center bg-brand-forest text-brand-lime font-brand text-2xl font-bold">
                {member.initials || member.name.slice(0, 2).toUpperCase()}
              </div>
            )}
          </div>

          {/* Member Name */}
          <h3 className="m-0 font-sans text-xl sm:text-[22px] font-bold text-brand-forest">
            {member.name}
          </h3>

          {/* Position */}
          <p className="m-0 text-xs sm:text-sm font-bold text-brand-green uppercase tracking-wider mt-1.5 mb-4">
            {member.role}
          </p>

          {/* Description */}
          <CardContent className="p-0">
            <p className="m-0 text-sm leading-[1.75] text-brand-muted">
              {member.bio}
            </p>
          </CardContent>
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
