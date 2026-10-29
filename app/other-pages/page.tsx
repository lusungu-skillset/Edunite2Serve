import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HelpCircle, Users } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { donationUrl } from "@/data/navigation";

export const metadata: Metadata = {
  title: "Other Pages Directory | Edunite2Serve",
  description:
    "Explore supplementary pages including Frequently Asked Questions and our Leadership Team.",
};

export default function OtherPagesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Directory"
        title="Other Pages & Supplementary Information"
        description="Quick access to our organizational FAQ, volunteer leadership directory, and supplementary governance information."
        breadcrumbs={[{ label: "Other Pages" }]}
        primaryCta={{ label: "Donate to Missions", href: donationUrl }}
        secondaryCta={{ label: "Contact Us", href: "/contact" }}
      />

      <section className="bg-[#f4f7f1] py-[84px] max-[720px]:py-[60px]">
        <div className="mx-auto w-full max-w-[1200px] px-10 max-[720px]:px-[18px]">
          <SectionHeading
            eyebrow="Quick Navigation"
            title="Explore Supplementary Pages"
            description="Detailed information on leadership, questions, and policies."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            <Card className="rounded-2xl border border-[#dfe5db] bg-white p-8 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-forest text-brand-lime mb-5">
                  <HelpCircle className="h-7 w-7" />
                </div>
                <h3 className="m-0 font-sans text-2xl font-bold text-brand-forest">
                  Frequently Asked Questions (FAQ)
                </h3>
                <CardContent className="p-0 mt-3">
                  <p className="m-0 text-sm leading-[1.7] text-brand-muted">
                    Clear answers regarding our 501(c)(3) tax deductibility, project locations in Malawi, volunteer onboarding, and donation security.
                  </p>
                </CardContent>
              </div>
              <div className="mt-8 pt-4 border-t border-[#edf2ea]">
                <Button
                  className="rounded-xl bg-brand-green hover:bg-brand-forest text-white font-bold text-sm px-6 py-2.5 h-auto"
                  render={<Link href="/faq" />}
                >
                  View All FAQs <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </Card>

            <Card className="rounded-2xl border border-[#dfe5db] bg-white p-8 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-forest text-brand-lime mb-5">
                  <Users className="h-7 w-7" />
                </div>
                <h3 className="m-0 font-sans text-2xl font-bold text-brand-forest">
                  Leadership & Volunteer Team
                </h3>
                <CardContent className="p-0 mt-3">
                  <p className="m-0 text-sm leading-[1.7] text-brand-muted">
                    Meet the executive, operations, finance, communications, education, and program teams serving communities across Malawi.
                  </p>
                </CardContent>
              </div>
              <div className="mt-8 pt-4 border-t border-[#edf2ea]">
                <Button
                  className="rounded-xl bg-brand-green hover:bg-brand-forest text-white font-bold text-sm px-6 py-2.5 h-auto"
                  render={<Link href="/team" />}
                >
                  Meet the Team <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
