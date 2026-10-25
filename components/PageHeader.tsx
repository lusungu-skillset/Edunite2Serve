import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  centered?: boolean;
};

export default function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
  primaryCta,
  secondaryCta,
  centered = false,
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-[#edf6ef] border-b border-[#e1ece3] py-[72px] pb-[80px] max-[720px]:py-[56px] max-[720px]:pb-[64px]">
      <div className="mx-auto w-full max-w-[1720px] px-10 max-[720px]:max-w-[596px] max-[720px]:px-[18px] max-[440px]:max-w-[570px] max-[440px]:px-[15px]">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-green/80 m-0 p-0 list-none">
              <li>
                <Link href="/" className="hover:text-brand-forest transition-colors">
                  Home
                </Link>
              </li>
              {breadcrumbs.map((crumb, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span aria-hidden="true" className="text-brand-muted/40">/</span>
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-brand-forest transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-brand-forest font-bold">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className={centered ? "mx-auto max-w-[880px] text-center" : "max-w-[960px]"}>
          {/* Eyebrow signature: cursive brand font + rule + sparkle */}
          <div className={`mb-4 flex items-center gap-4 ${centered ? "justify-center" : "text-left"}`}>
            <p className="giving-purpose-heading m-0 whitespace-nowrap font-brand text-[clamp(22px,2.8vw,36px)] font-extrabold italic leading-[1.1] tracking-[-.04em] text-[#00876f]">
              {eyebrow}
            </p>
            <span
              aria-hidden="true"
              className="giving-purpose-rule h-px min-w-[22px] flex-1 max-w-[120px] bg-[#83b9a7]"
            />
            <svg
              aria-hidden="true"
              className="giving-purpose-sparkle h-[19px] w-[19px] shrink-0 text-[#00876f]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="m12 2 2.45 7.55L22 12l-7.55 2.45L12 22l-2.45-7.55L2 12l7.55-2.45L12 2Z" />
            </svg>
          </div>

          <h1 className="m-0 font-sans text-[clamp(36px,4.5vw,60px)] font-bold leading-[1.12] tracking-[-.035em] text-brand-forest">
            {title}
          </h1>

          {description && (
            <p className="mb-0 mt-5 max-w-[780px] text-[17px] leading-[1.75] text-brand-muted sm:text-[18px]">
              {description}
            </p>
          )}

          {(primaryCta || secondaryCta) && (
            <div className={`mt-8 flex flex-wrap items-center gap-4 ${centered ? "justify-center" : ""}`}>
              {primaryCta && (
                <Button
                  className="rounded-[12px] bg-brand-green hover:bg-brand-forest text-white font-bold text-base px-7 py-3 h-auto shadow-sm"
                  render={<Link href={primaryCta.href} />}
                >
                  {primaryCta.label}
                  <ArrowRight aria-hidden="true" className="h-4 w-4 ml-2" />
                </Button>
              )}
              {secondaryCta && (
                <Button
                  className="rounded-[12px] border border-[#bdcbbb] bg-white hover:bg-[#f5f8ef] text-brand-forest font-bold text-base px-6 py-3 h-auto"
                  render={<Link href={secondaryCta.href} />}
                  variant="outline"
                >
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
