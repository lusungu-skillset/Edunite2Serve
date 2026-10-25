import Image from "next/image";
import Link from "next/link";
import { contactDetails, donationUrl, footerGroups } from "@/data/navigation";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="bg-[#052c1a] pt-[62px] text-white">
      <div className="mx-auto w-full max-w-[1720px] px-10 max-[720px]:max-w-[596px] max-[720px]:px-[18px] max-[440px]:max-w-[570px] max-[440px]:px-[15px]">
        <div className="grid grid-cols-[minmax(220px,1.35fr)_repeat(2,minmax(130px,.75fr))_minmax(180px,1fr)] gap-[35px] pb-[49px] max-[1040px]:grid-cols-[1.2fr_1fr_1fr] max-[1040px]:gap-[30px] max-[760px]:grid-cols-2 max-[760px]:gap-[34px_21px] max-[480px]:grid-cols-1 max-[480px]:gap-7">
          <div className="max-[760px]:col-[1/-1]">
            <Link className="inline-flex w-[210px] max-w-full rounded-md bg-white px-[11px] py-[9px] focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-brand-lime" href="/" aria-label="Edunite2Serve home">
              <Image className="block h-auto w-full" src="/images/brand/edunite2serve-logo.png" alt="Edunite2Serve — Enterprise for Wholeness" width={528} height={183} />
            </Link>
            <p className="my-[17px] max-w-[310px] text-sm text-[#d2e2d6]">In togetherness, we believe there is power to do amazing things together.</p>
            <Link className="inline-flex gap-3 font-bold text-brand-lime transition-colors hover:text-white focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-brand-lime" href="/news">
              Read the latest news <span aria-hidden="true">↗</span>
            </Link>
          </div>

          {footerGroups.map((group) => (
            <nav className="flex flex-col items-start gap-[11px]" aria-label={group.title} key={group.title}>
              <h2 className="mb-2 mt-1 text-xs font-extrabold uppercase tracking-[.13em] text-white">{group.title}</h2>
              {group.links.map((item) => (
                <Link className="text-[13px] text-[#d2e2d6] transition-colors duration-150 motion-reduce:transition-none hover:text-brand-lime focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-brand-lime" href={item.href} key={item.href}>{item.label}</Link>
              ))}
            </nav>
          ))}

          <div className="flex flex-col items-start gap-[11px] max-[1040px]:col-[2/-1] max-[760px]:col-auto">
            <h2 className="mb-2 mt-1 text-xs font-extrabold uppercase tracking-[.13em] text-white">Get in touch</h2>
            <a className="text-[13px] text-[#d2e2d6] transition-colors duration-150 motion-reduce:transition-none hover:text-brand-lime focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-brand-lime" href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>
            <a className="text-[13px] text-[#d2e2d6] transition-colors duration-150 motion-reduce:transition-none hover:text-brand-lime focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-brand-lime" href={`tel:${contactDetails.phoneHref}`}>{contactDetails.phoneLabel}</a>
            <Link className="mt-[5px] inline-flex items-center gap-2 font-extrabold text-brand-lime transition-colors hover:text-white focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-brand-lime" href={donationUrl}>Donate Now <span aria-hidden="true">↗</span></Link>
          </div>
        </div>

        <Separator className="bg-white/15" />

        <div className="flex justify-between gap-5 py-[17px] text-[11px] text-[#b7c9bc] max-[720px]:flex-col max-[720px]:gap-1">
          <span>© Edunite2Serve</span>
          <span>Enterprise for Wholeness</span>
        </div>
      </div>
    </footer>
  );
}
