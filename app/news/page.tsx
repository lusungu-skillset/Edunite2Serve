import { Suspense } from "react";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import ArticlesExplorer from "@/components/ArticlesExplorer";
import { getCmsArticles } from "@/lib/cms";
import { donationUrl } from "@/data/navigation";

export const metadata: Metadata = {
  title: "Blogs & Latest News | Edunite2Serve",
  description:
    "Read the latest dispatches, volunteer cooking classes, school partnerships, and farming updates from Edunite2Serve in Malawi.",
};

async function ArticlesFeed() {
  const articlesList = await getCmsArticles();
  return <ArticlesExplorer articles={articlesList} />;
}

export default function NewsPage() {
  return (
    <>
      <PageHeader
        eyebrow="News & Dispatches"
        title="Stories of Hope, Learning, and Impact"
        description="Stay connected with our grassroots initiatives across Malawi—from vegetarian cookery workshops in Zomba to classroom expansions in Thyolo."
        breadcrumbs={[{ label: "Blogs & News" }]}
        primaryCta={{ label: "Donate to Malawi Missions", href: donationUrl }}
        secondaryCta={{ label: "Volunteer Opportunities", href: "/opportunities" }}
      />

      <section
        aria-label="Edunite2Serve news stories"
        className="bg-[#f4f7f1] py-[84px] max-[720px]:py-[60px]"
      >
        <div className="mx-auto w-full max-w-[1720px] px-10 max-[720px]:max-w-[596px] max-[720px]:px-[18px] max-[440px]:max-w-[570px] max-[440px]:px-[15px]">
          <SectionHeading
            eyebrow="Field Dispatches"
            title="Latest News From Edunite2Serve"
            description="Real stories of transformed families, empowered teachers, and thriving community gardens directly from our teams in Malawi."
          />

          <Suspense fallback={<ArticlesExplorer />}>
            <ArticlesFeed />
          </Suspense>
        </div>
      </section>
    </>
  );
}
