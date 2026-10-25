import Link from "next/link";
import Hero from "@/components/Hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, ArrowRight } from "lucide-react";

type RoutePlaceholderProps = {
  title: string;
  description: string;
  sourceHref: string;
  sourceLabel: string;
  links?: { label: string; href: string }[];
};

export default function RoutePlaceholder({
  title,
  description,
  sourceHref,
  sourceLabel,
  links,
}: RoutePlaceholderProps) {
  return (
    <>
      <Hero eyebrow="Temporary page" title={title} description={description} />
      <section className="bg-[#fffefa] py-[80px] pb-[110px] max-[720px]:py-[62px] max-[720px]:pb-20">
        <div className="mx-auto w-full max-w-[838px] px-6 max-[720px]:max-w-[596px] max-[720px]:px-[18px] max-[440px]:max-w-[570px] max-[440px]:px-[15px]">
          <Badge className="mb-[18px] rounded-full bg-[#f3e8d9] px-[12px] py-1 text-[11px] font-bold uppercase tracking-[.1em] text-[#76451f] hover:bg-[#ebd7c3] border-0" variant="secondary">
            Content migration placeholder
          </Badge>
          <h2 className="mb-[15px] mt-0 font-sans text-[clamp(30px,3.6vw,42px)] font-bold leading-[1.16] tracking-[-.035em]">The current Edunite2Serve page is still available.</h2>
          <p className="mb-[38px] mt-0 max-w-[690px] text-[17px] text-brand-muted">
            This route keeps the new site navigation working while its content is
            reviewed. Continue to the existing page for the current information.
          </p>
          <Button
            className="min-h-[52px] gap-3 px-6 text-sm font-bold bg-brand-green hover:bg-brand-forest text-white"
            render={<a href={sourceHref} target="_blank" rel="noopener noreferrer" />}
          >
            {sourceLabel} <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </Button>
          {links?.length ? (
            <Card className="mt-[38px] border-brand-line bg-[#f7f8f3] p-0 shadow-sm">
              <CardContent className="p-[23px]">
                <h3 className="mb-[14px] mt-0 text-[15px] font-bold text-brand-forest">Explore related pages</h3>
                <ul className="m-0 flex list-none flex-wrap gap-[13px_24px] p-0">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link className="inline-flex items-center gap-1.5 text-[13px] font-bold text-brand-green transition-colors hover:text-brand-forest hover:underline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-brand-orange" href={link.href}>
                        {link.label} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </section>
    </>
  );
}
