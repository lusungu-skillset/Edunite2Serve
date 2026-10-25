import { Suspense } from "react";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import GalleryView from "@/components/GalleryView";
import { getCmsGallery } from "@/lib/cms";
import { donationUrl } from "@/data/navigation";

export const metadata: Metadata = {
  title: "Photo Gallery | Edunite2Serve",
  description:
    "Visual journey through Edunite2Serve projects in Malawi—education at Mangunda, farming at Lakeside, cookery workshops, and community life.",
};

async function GalleryFeed() {
  const items = await getCmsGallery();
  return <GalleryView items={items} />;
}

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Visual Journey"
        title="Impact in Pictures: Our Field Gallery"
        description="Explore photographic moments from our partner schools, community orchards, nutrition workshops, and volunteer outreaches in Malawi."
        breadcrumbs={[{ label: "Gallery" }]}
        primaryCta={{ label: "Donate to Missions", href: donationUrl }}
        secondaryCta={{ label: "Volunteer With Us", href: "/opportunities/volunteer" }}
      />

      <section
        aria-label="Edunite2Serve photographic gallery"
        className="bg-[#f4f7f1] py-[84px] max-[720px]:py-[60px]"
      >
        <div className="mx-auto w-full max-w-[1720px] px-10 max-[720px]:max-w-[596px] max-[720px]:px-[18px] max-[440px]:max-w-[570px] max-[440px]:px-[15px]">
          <SectionHeading
            eyebrow="Field Moments"
            title="Stories Told Through the Lens"
            description="Every image represents real students with brighter horizons, farmers harvesting organic nutrition, and local volunteers serving with joy."
          />

          <Suspense fallback={<GalleryView />}>
            <GalleryFeed />
          </Suspense>
        </div>
      </section>
    </>
  );
}
