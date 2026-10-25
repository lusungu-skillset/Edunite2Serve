import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Download,
  FileCheck,
  FileText,
  Sparkles,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { donationUrl } from "@/data/navigation";

export const metadata: Metadata = {
  title: "Resources & Publications | Edunite2Serve",
  description:
    "Download official training reports, newsletters, agricultural guides, and annual reports from Edunite2Serve in Malawi.",
};

const resourceItems = [
  {
    title: "Empowering Rural Women and Farmers with FARM STEW Micro-Business Ideas",
    category: "Field Training Manual",
    format: "PDF Document",
    date: "2025 Edition",
    description:
      "A comprehensive practical handbook providing sustainable micro-enterprise strategies, agro-processing, and village savings principles for rural Malawian households.",
    downloadLabel: "Download Field Guide",
    fileSize: "3.2 MB",
  },
  {
    title: "Second Quarter Newsletter 2025",
    category: "Quarterly Dispatch",
    format: "Newsletter",
    date: "Q2 2025",
    description:
      "Field dispatches covering Mangunda Primary School rehabilitation, Zomba vegetarian cookery graduations, and Lake Malawi Land development milestones.",
    downloadLabel: "Download Newsletter",
    fileSize: "1.8 MB",
  },
  {
    title: "First Quarter Newsletter 2025",
    category: "Quarterly Dispatch",
    format: "Newsletter",
    date: "Q1 2025",
    description:
      "Highlights from the launch of the 2025 planting season, community orchards in Kamwisa, and volunteer orientations across Dedza.",
    downloadLabel: "Download Newsletter",
    fileSize: "2.1 MB",
  },
  {
    title: "FARM STEW Planters Training Report",
    category: "Field Evaluation",
    format: "Evaluation Report",
    date: "2024–2025",
    description:
      "An in-depth assessment of the bio-intensive agriculture training cycles conducted with regional church leaders, university students, and rural smallholders.",
    downloadLabel: "Download Training Report",
    fileSize: "4.5 MB",
  },
  {
    title: "Edunite2Serve Annual Narrative Impact Report",
    category: "Annual Report",
    format: "Official Report",
    date: "Annual Review",
    description:
      "Complete organizational narrative reviewing mission stewardship, donor funds utilization, partner achievements, and multi-year community milestones.",
    downloadLabel: "Download Annual Report",
    fileSize: "5.1 MB",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Knowledge & Publications"
        title="Resources, Guides & Newsletters"
        description="Access field evaluations, training curricula, official quarterly newsletters, and annual reports documenting our work in Malawi."
        breadcrumbs={[{ label: "Resources" }]}
        primaryCta={{ label: "Donate to Missions", href: donationUrl }}
        secondaryCta={{ label: "Volunteer Opportunities", href: "/opportunities" }}
      />

      <section className="bg-white py-[84px] max-[720px]:py-[60px] border-b border-[#edf2ea]">
        <div className="mx-auto w-full max-w-[1720px] px-10 max-[720px]:max-w-[596px] max-[720px]:px-[18px] max-[440px]:max-w-[570px] max-[440px]:px-[15px]">
          <SectionHeading
            eyebrow="Downloadable Materials"
            title="Official Documents & Reports"
            description="Explore and download our official documentation for research, partner verification, and community learning."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {resourceItems.map((res, i) => (
              <Card
                key={i}
                className="group flex flex-col justify-between rounded-2xl border border-[#dfe5db] bg-[#fafcf9] p-8 shadow-xs hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-forest text-brand-lime">
                      <FileText className="h-6 w-6" />
                    </div>
                    <Badge className="bg-[#e9f2e4] text-brand-forest font-bold text-xs uppercase tracking-wider border-0">
                      {res.category}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-semibold text-brand-muted/80 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-brand-green" />
                      {res.date}
                    </span>
                    <span>•</span>
                    <span>{res.fileSize}</span>
                  </div>

                  <h3 className="m-0 font-sans text-xl font-bold leading-snug text-brand-forest">
                    {res.title}
                  </h3>

                  <CardContent className="p-0 mt-3">
                    <p className="m-0 text-sm leading-[1.7] text-brand-muted">
                      {res.description}
                    </p>
                  </CardContent>
                </div>

                <div className="mt-8 pt-4 border-t border-[#edf2ea] flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-green">
                    {res.format}
                  </span>
                  <Button
                    className="rounded-xl bg-brand-green hover:bg-brand-forest text-white font-bold text-xs px-4 py-2 h-auto"
                    render={<Link href="/contact" />}
                  >
                    Request / Read
                    <Download className="h-3.5 w-3.5 ml-1.5" />
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
