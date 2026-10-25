import Image from "next/image";
import Link from "next/link";
import DesktopNavigation from "@/components/DesktopNavigation";
import MobileMenu from "@/components/MobileMenu";
import { contactDetails, donationUrl } from "@/data/navigation";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <>
      <div className="bg-[#2b4012] font-sans text-base text-white">
        <div className="relative mx-auto flex min-h-[62px] w-full max-w-[1720px] items-center justify-center gap-6 px-10 max-[720px]:max-w-[596px] max-[720px]:px-[18px] max-[440px]:max-w-[570px] max-[440px]:px-[15px]">
          <div className="absolute right-10 flex items-center gap-6 font-medium max-[720px]:right-[18px] max-[720px]:gap-[13px] max-[440px]:right-[15px]">
            <a className="text-white hover:text-brand-lime focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-brand-orange [&>span]:pr-1.5 [&>span]:text-brand-lime max-[760px]:text-[0] max-[760px]:[&>span]:text-xs" href={`tel:${contactDetails.phoneHref}`}>
              <span aria-hidden="true">☎</span> {contactDetails.phoneLabel}
            </a>
            <a className="text-white hover:text-brand-lime focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-brand-orange [&>span]:pr-1.5 [&>span]:text-brand-lime max-[760px]:text-[0] max-[760px]:[&>span]:text-xs" href={`mailto:${contactDetails.email}`}>
              <span aria-hidden="true">✉</span> {contactDetails.email}
            </a>
          </div>
        </div>
      </div>
      <header className="relative z-10 border-b border-[#e7eddf] bg-[#f5f8ef] font-sans text-[#2D3F12]">
        <div className="mx-auto flex min-h-[104px] w-full max-w-[1720px] items-center justify-between gap-[clamp(14px,2vw,30px)] px-10 max-[1180px]:min-h-[86px] max-[1040px]:min-h-[82px] max-[720px]:max-w-[596px] max-[720px]:px-[18px] max-[440px]:min-h-[74px] max-[440px]:max-w-[570px] max-[440px]:px-[15px]">
          <Link className="w-[205px] max-w-[22vw] shrink-0 max-[1180px]:w-[190px] max-[1040px]:w-[200px] max-[1040px]:max-w-[54vw] max-[440px]:w-[175px] focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-brand-orange" href="/" aria-label="Edunite2Serve home">
            <Image
              src="/images/brand/edunite2serve-logo.png"
              alt="Edunite2Serve — Enterprise for Wholeness"
              width={528}
              height={183}
              priority
              className="block h-auto w-full"
            />
          </Link>

          <DesktopNavigation />

          <Button
            className="donate-attention ml-1 inline-flex min-h-16 items-center justify-between gap-[18px] whitespace-nowrap rounded-[15px] border-0 bg-[#2b4012] py-[2px] pl-[22px] pr-2 font-brand text-base font-bold text-white transition-colors duration-150 motion-reduce:transition-none hover:bg-[#3b531a] max-[1180px]:hidden h-auto"
            render={<Link href={donationUrl} />}
          >
            Donate Now
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[11px] bg-[#f4f7ed] text-[#2b4012]" aria-hidden="true">
              <svg className="block h-[25px] w-[25px] fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2.2]" viewBox="0 0 24 24" focusable="false">
                <path d="M4 12h15M13 5l7 7-7 7" />
              </svg>
            </span>
          </Button>
          <MobileMenu />
        </div>
      </header>
    </>
  );
}
