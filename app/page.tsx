import FeaturedProjects from "@/components/FeaturedProjects";
import CommunityStorySection from "@/components/CommunityStorySection";
import DonationImpactSection from "@/components/DonationImpactSection";
import Hero from "@/components/Hero";
import NewsUpdates from "@/components/NewsUpdates";
import OrganizationSection from "@/components/OrganizationSection";
import OurPartners from "@/components/OurPartners";
import ServicePillars from "@/components/ServicePillars";
import SupportCta from "@/components/SupportCta";
import { homepageContent } from "@/data/homepage";
import { getNewsSectionContent } from "@/lib/news";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const newsContent = await getNewsSectionContent();

  return (
    <>
      <Hero {...homepageContent.hero} variant="home" />
      <OurPartners />
      <DonationImpactSection />
      <CommunityStorySection />
      <ServicePillars />
      <FeaturedProjects />
      <OrganizationSection />
      <NewsUpdates content={newsContent} />
      <SupportCta />
    </>
  );
}
