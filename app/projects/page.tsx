import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import ProjectsExplorer from "@/components/ProjectsExplorer";
import { getCmsProjects } from "@/lib/cms";
import { donationUrl } from "@/data/navigation";

export const metadata: Metadata = {
  title: "Projects & Community Initiatives | Edunite2Serve",
  description:
    "Explore Edunite2Serve's community initiatives in education, sustainable farming, clean food access, and local infrastructure across Malawi.",
};

export default async function ProjectsPage() {
  const projects = await getCmsProjects();

  return (
    <>
      <PageHeader
        eyebrow="Our Initiatives"
        title="Practical Work. Stronger Communities."
        description="Explore Edunite2Serve initiatives in education, sustainable farming, community care and local infrastructure across Malawi."
        breadcrumbs={[{ label: "Projects" }]}
        primaryCta={{ label: "Donate to Projects", href: donationUrl }}
        secondaryCta={{ label: "Volunteer With Us", href: "/opportunities/volunteer" }}
      />

      <section
        aria-label="Edunite2Serve projects directory"
        className="bg-[#f4f7f1] py-[84px] max-[720px]:py-[60px]"
      >
        <div className="mx-auto w-full max-w-[1720px] px-10 max-[720px]:max-w-[596px] max-[720px]:px-[18px] max-[440px]:max-w-[570px] max-[440px]:px-[15px]">
          <SectionHeading
            eyebrow="Grassroots Impact"
            title="Work Rooted in Community"
            description="Every initiative is developed hand-in-hand with local Malawian leaders, ensuring dignity, sustainable agriculture, and long-term educational growth."
          />

          <ProjectsExplorer projects={projects} />
        </div>
      </section>
    </>
  );
}
