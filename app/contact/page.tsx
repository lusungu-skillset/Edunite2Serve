import type { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  Globe,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { contactDetails, donationUrl } from "@/data/navigation";

export const metadata: Metadata = {
  title: "Contact Us | Edunite2Serve",
  description:
    "Get in touch with Edunite2Serve in Malawi and our USA 501(c)(3) office in Atlanta, Georgia.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get In Touch"
        title="Join Us for a Better Life and Beautiful Future"
        description="Whether you have questions about our field initiatives in Malawi, want to volunteer, or need donation assistance through our USA 501(c)(3) partner, we are here to connect."
        breadcrumbs={[{ label: "Contact Us" }]}
        primaryCta={{ label: "Donate to Missions", href: donationUrl }}
        secondaryCta={{ label: "Explore Opportunities", href: "/opportunities" }}
      />

      <section className="bg-white py-[84px] max-[720px]:py-[60px] border-b border-[#edf2ea]">
        <div className="mx-auto w-full max-w-[1720px] px-10 max-[720px]:max-w-[596px] max-[720px]:px-[18px] max-[440px]:max-w-[570px] max-[440px]:px-[15px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Contact details cards */}
            <div className="lg:col-span-5 space-y-6">
              <SectionHeading
                eyebrow="Direct Contacts"
                title="Our Field & Regional Offices"
                description="Reach our team across Africa and North America."
              />

              {/* Malawi Office */}
              <Card className="rounded-2xl border border-[#dfe5db] bg-[#fafcf9] p-6 shadow-xs">
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-forest text-brand-lime">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <Badge className="bg-[#e9f2e4] text-brand-forest font-bold text-xs uppercase tracking-wider border-0 mb-1.5">
                      Malawi Field Office
                    </Badge>
                    <h3 className="m-0 font-sans text-lg font-bold text-brand-forest">
                      Dedza, Malawi
                    </h3>
                    <p className="m-0 mt-1.5 text-sm text-brand-muted leading-relaxed">
                      Edunite2serve, P.O. Box 30705, Dedza, Malawi.
                    </p>
                  </div>
                </div>
              </Card>

              {/* USA Office */}
              <Card className="rounded-2xl border border-[#dfe5db] bg-[#fafcf9] p-6 shadow-xs">
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-forest text-brand-lime">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <div>
                    <Badge className="bg-[#e9f2e4] text-brand-forest font-bold text-xs uppercase tracking-wider border-0 mb-1.5">
                      USA Registered 501(c)(3) Partner
                    </Badge>
                    <h3 className="m-0 font-sans text-lg font-bold text-brand-forest">
                      Atlanta, Georgia (USA)
                    </h3>
                    <p className="m-0 mt-1.5 text-sm text-brand-muted leading-relaxed">
                      3721 New Macland Rd Suite 200 - 312, Powder Springs, GA 30127, USA.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-[#dfe5db] bg-[#fafcf9] p-5 shadow-xs">
                  <Phone className="h-5 w-5 text-brand-green mb-2" />
                  <p className="m-0 text-xs font-bold uppercase tracking-wider text-brand-muted">
                    Phone / WhatsApp
                  </p>
                  <a
                    href="tel:+265989158325"
                    className="mt-1 block text-sm font-bold text-brand-forest hover:text-brand-green"
                  >
                    +265 989 158 325
                  </a>
                  <p className="m-0 text-[11px] text-brand-muted/70 mt-0.5">
                    For information & work in Africa
                  </p>
                </div>

                <div className="rounded-2xl border border-[#dfe5db] bg-[#fafcf9] p-5 shadow-xs">
                  <Mail className="h-5 w-5 text-brand-green mb-2" />
                  <p className="m-0 text-xs font-bold uppercase tracking-wider text-brand-muted">
                    Official Inquiries
                  </p>
                  <a
                    href="mailto:info@edunite2serve.org"
                    className="mt-1 block text-sm font-bold text-brand-forest hover:text-brand-green truncate"
                  >
                    info@edunite2serve.org
                  </a>
                  <p className="m-0 text-[11px] text-brand-muted/70 mt-0.5">
                    edunite2serve@gmail.com
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              <Card className="rounded-3xl border border-[#dfe5db] bg-[#fbfdfa] p-5 sm:p-8 lg:p-10 shadow-sm">
                <Badge className="bg-brand-forest text-brand-lime font-bold text-xs uppercase tracking-wider mb-4 border-0">
                  Send a Message
                </Badge>
                <h3 className="m-0 font-sans text-2xl sm:text-3xl font-bold text-brand-forest mb-2">
                  How Can We Help You?
                </h3>
                <p className="m-0 text-sm leading-relaxed text-brand-muted mb-8">
                  Fill out the form below and our team will get in touch with you promptly.
                </p>

                <ContactForm />
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
