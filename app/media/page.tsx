import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, FileText, Image as ImageIcon, Video } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import GalleryView from "@/components/GalleryView";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { donationUrl } from "@/data/navigation";

export const metadata: Metadata = {
  title: "Media & Resources Hub | Edunite2Serve",
  description:
    "Explore videos, field photography, newsletters, and publications from Edunite2Serve in Malawi.",
};

export default function MediaHubPage() {
  return (
    <>
      <PageHeader
        eyebrow="Multimedia Hub"
        title="Stories, Photos & Video Dispatches"
        description="Explore visual and written accounts of how education, sustainable farming, and humanitarian outreach are bringing lasting hope across Malawi."
        breadcrumbs={[{ label: "Media" }]}
        primaryCta={{ label: "Donate to Missions", href: donationUrl }}
        secondaryCta={{ label: "Read Field News", href: "/news" }}
      />

      {/* Media Channels Overview */}
      <section className="bg-white py-[84px] max-[720px]:py-[60px] border-b border-[#edf2ea]">
        <div className="mx-auto w-full max-w-[1720px] px-10 max-[720px]:max-w-[596px] max-[720px]:px-[18px] max-[440px]:max-w-[570px] max-[440px]:px-[15px]">
          <SectionHeading
            eyebrow="Explore Channels"
            title="Choose a Media Channel"
            description="Access photography, documentaries, quarterly newsletters, and downloadable guides."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <Card className="rounded-2xl border border-[#dfe5db] bg-[#fafcf9] p-8 shadow-xs flex flex-col justify-between">
              <div>
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-forest text-brand-lime mb-5">
                  <ImageIcon className="h-6 w-6" />
                </div>
                <h3 className="m-0 font-sans text-2xl font-bold text-brand-forest">
                  Photo Gallery
                </h3>
                <CardContent className="p-0 mt-3">
                  <p className="m-0 text-sm leading-[1.7] text-brand-muted">
                    Curated photographic stories from Mangunda Primary School, Lakeside Farm, and local partner initiatives.
                  </p>
                </CardContent>
              </div>
              <div className="mt-6 pt-4 border-t border-[#edf2ea]">
                <Button
                  className="w-full rounded-xl bg-brand-green hover:bg-brand-forest text-white font-bold text-xs py-2.5"
                  render={<Link href="/gallery" />}
                >
                  View Full Gallery <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                </Button>
              </div>
            </Card>

            <Card className="rounded-2xl border border-[#dfe5db] bg-[#fafcf9] p-8 shadow-xs flex flex-col justify-between">
              <div>
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-forest text-brand-lime mb-5">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="m-0 font-sans text-2xl font-bold text-brand-forest">
                  Official Resources & Newsletters
                </h3>
                <CardContent className="p-0 mt-3">
                  <p className="m-0 text-sm leading-[1.7] text-brand-muted">
                    Download quarterly newsletters, FARM STEW training reports, and our Annual Narrative Impact Report.
                  </p>
                </CardContent>
              </div>
              <div className="mt-6 pt-4 border-t border-[#edf2ea]">
                <Button
                  className="w-full rounded-xl bg-brand-green hover:bg-brand-forest text-white font-bold text-xs py-2.5"
                  render={<Link href="/resources" />}
                >
                  Browse Resources <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                </Button>
              </div>
            </Card>

            <Card className="rounded-2xl border border-[#dfe5db] bg-[#fafcf9] p-8 shadow-xs flex flex-col justify-between">
              <div>
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-forest text-brand-lime mb-5">
                  <Video className="h-6 w-6" />
                </div>
                <h3 className="m-0 font-sans text-2xl font-bold text-brand-forest">
                  Community Video Documentary
                </h3>
                <CardContent className="p-0 mt-3">
                  <p className="m-0 text-sm leading-[1.7] text-brand-muted">
                    Watch our official field documentary covering the mission and transformation of vulnerable children in Malawi.
                  </p>
                </CardContent>
              </div>
              <div className="mt-6 pt-4 border-t border-[#edf2ea]">
                <Button
                  className="w-full rounded-xl bg-brand-forest hover:bg-[#147a3f] text-brand-lime font-bold text-xs py-2.5"
                  render={
                    <a
                      href="https://www.youtube.com/watch?v=JwOEW89rJV8"
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                >
                  Watch Video on YouTube <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Gallery Preview */}
      <section className="bg-[#f4f7f1] py-[84px] max-[720px]:py-[60px]">
        <div className="mx-auto w-full max-w-[1720px] px-10 max-[720px]:max-w-[596px] max-[720px]:px-[18px] max-[440px]:max-w-[570px] max-[440px]:px-[15px]">
          <SectionHeading
            eyebrow="Visual Highlights"
            title="Featured Field Photography"
            description="A glimpse of daily community life, classroom smiles, and thriving harvests."
          />

          <GalleryView />
        </div>
      </section>
    </>
  );
}
