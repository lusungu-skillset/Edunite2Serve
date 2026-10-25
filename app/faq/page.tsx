import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HelpCircle, Mail, MessageSquare, Phone } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { donationUrl, contactDetails } from "@/data/navigation";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Edunite2Serve",
  description:
    "Find answers to frequently asked questions about Edunite2Serve, donations, volunteer programs, and legal status.",
};

const faqCategories = [
  {
    category: "About & Legal Status",
    items: [
      {
        q: "What is Edunite2Serve?",
        a: "Edunite2Serve is a volunteer-led nonprofit humanitarian organization dedicated to enhancing whole living to those challenged by poverty in south-central Africa. Founded by Professor Sharon Pittman, we mobilize resources for education, sustainable agriculture, and community self-reliance.",
      },
      {
        q: "Where is Edunite2Serve located?",
        a: "Our USA counterpart operates as a registered 501(c)(3) nonprofit at 3721 New Macland Rd Suite 200 - 312, Powder Springs, GA 30127, USA. Our African field headquarters is located in Dedza, Malawi (P.O. Box 30705, Dedza).",
      },
      {
        q: "How does the USA 501(c)(3) partnership work?",
        a: "Edunite2Serve works closely with its USA registered 501(c)(3) partner in Atlanta, Georgia. This allows donations made by US tax residents to qualify for tax deductions while maintaining strict financial transparency and audited disbursements directly to Malawian initiatives.",
      },
    ],
  },
  {
    category: "Donations & Financial Stewardship",
    items: [
      {
        q: "Are donations tax-deductible?",
        a: "Yes! Contributions through our USA partner are tax-deductible to the fullest extent permitted by law. You will receive an official tax acknowledgment receipt for your records.",
      },
      {
        q: "Can I direct my donation to a specific project?",
        a: "Yes. Donors can choose to support Child Education at Mangunda Primary School, Sustainable Agriculture at Lakeside Farm, Community Orchards, Church Construction, or general mission needs.",
      },
      {
        q: "How much of my donation goes directly to the field?",
        a: "Because Edunite2Serve is governed by 100% volunteer leadership, our operational overhead is kept to an absolute minimum, ensuring the vast majority of all donated funds go directly to local schools, seeds, construction materials, and community programs.",
      },
    ],
  },
  {
    category: "Volunteering & Community Outreach",
    items: [
      {
        q: "How can I volunteer with Edunite2Serve?",
        a: "We welcome volunteers in primary education, organic farming, plant-based nutrition, and administrative/media coordination. You can apply directly through our career portal at career.edunite2serve.org or submit an inquiry on our Volunteer page.",
      },
      {
        q: "Do you accept international volunteers?",
        a: "Yes! We coordinate both remote volunteers (for curriculum writing, translation, media, grant research) and on-site volunteers in Malawi for teaching, agricultural training, and medical outreach.",
      },
      {
        q: "Can my church, school, or community group organize a fundraiser?",
        a: "Absolutely! We encourage schools, youth groups, and churches to sponsor classrooms, orchards, or water projects. Contact us at info@edunite2serve.org to receive fundraising toolkits and mission materials.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="Got Questions?"
        title="Frequently Asked Questions"
        description="Clear answers about our organization, donations, tax deductibility, and field missions in Malawi."
        breadcrumbs={[{ label: "FAQs" }]}
        primaryCta={{ label: "Donate to Missions", href: donationUrl }}
        secondaryCta={{ label: "Contact Our Team", href: "/contact" }}
      />

      <section className="bg-white py-[84px] max-[720px]:py-[60px] border-b border-[#edf2ea]">
        <div className="mx-auto w-full max-w-[1040px] px-10 max-[720px]:px-[18px]">
          <div className="space-y-12">
            {faqCategories.map((cat, idx) => (
              <div key={idx}>
                <h3 className="font-sans text-xl sm:text-2xl font-bold text-brand-forest mb-4 pb-2 border-b border-[#edf2ea] flex items-center gap-2">
                  <span className="text-brand-green font-brand text-lg">✦</span>
                  {cat.category}
                </h3>

                <Accordion multiple className="w-full space-y-3.5">
                  {cat.items.map((item, itemIdx) => (
                    <AccordionItem
                      key={itemIdx}
                      value={`item-${idx}-${itemIdx}`}
                      className="rounded-2xl border border-[#dfe5db] bg-[#fafcf9] px-6 shadow-xs"
                    >
                      <AccordionTrigger className="font-sans text-base sm:text-lg font-bold text-brand-forest hover:text-brand-green py-5 text-left">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-[15px] leading-[1.75] text-brand-muted pb-5">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>

          {/* Quick Contact Card */}
          <Card className="mt-14 rounded-3xl border border-[#dfe5db] bg-[#f5f8f2] p-8 sm:p-10 text-center shadow-xs">
            <HelpCircle className="h-10 w-10 text-brand-green mx-auto mb-4" />
            <h3 className="m-0 font-sans text-2xl font-bold text-brand-forest">
              Didn’t Find Your Answer?
            </h3>
            <p className="mx-auto mt-2 max-w-[500px] text-sm text-brand-muted leading-relaxed">
              Our volunteer leadership team is always happy to answer questions about specific projects, wire transfers, or academic partnerships.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Button
                className="rounded-full bg-brand-green hover:bg-brand-forest text-white font-bold text-sm px-7 py-3 h-auto"
                render={<Link href="/contact" />}
              >
                Send Us a Message
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button
                className="rounded-full border border-[#cbd9c8] bg-white hover:bg-[#edf4ea] text-brand-forest font-bold text-sm px-6 py-3 h-auto"
                render={<a href={`mailto:${contactDetails.email}`} />}
                variant="outline"
              >
                Email Support Team
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}
