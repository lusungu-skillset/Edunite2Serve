import { homepageContent } from "@/data/homepage";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function MissionVision() {
  const { eyebrow, title, mission, vision } = homepageContent.missionVision;

  return (
    <section className="bg-white py-[100px] max-[720px]:py-[70px]" id="mission-vision">
      <div className="mx-auto w-full max-w-[1720px] px-10 max-[720px]:max-w-[596px] max-[720px]:px-[18px] max-[440px]:max-w-[570px] max-[440px]:px-[15px]">
        <div className="mb-[42px] max-w-[790px] max-[720px]:mb-[30px]">
          <p className="mb-[19px] flex items-center gap-[9px] text-[11px] font-extrabold uppercase leading-[1.4] tracking-[.14em] text-brand-green">
            <span className="h-2 w-2 rounded-full bg-brand-orange" />{eyebrow}
          </p>
          <h2 className="m-0 font-sans text-[clamp(34px,4.1vw,58px)] font-bold leading-[1.16] tracking-[-.035em]">{title}</h2>
        </div>
        <div className="grid grid-cols-[1.3fr_.8fr] gap-5 max-[760px]:grid-cols-1">
          <Card className="relative min-h-[230px] overflow-hidden rounded-2xl border-0 bg-[#f2f5ed] p-0 shadow-sm transition-all duration-300 hover:shadow-md max-[760px]:min-h-0">
            <CardContent className="p-8 max-[760px]:p-[25px]">
              <Badge className="bg-white/80 text-brand-green border-brand-line/50 hover:bg-white text-xs font-extrabold uppercase tracking-[.12em] px-3 py-1 gap-2" variant="outline">
                <span className="h-[7px] w-[7px] rounded-full bg-brand-orange" />Our mission
              </Badge>
              <p className="relative z-10 mt-[18px] max-w-[690px] text-base leading-[1.8] text-[#45594c]">{mission}</p>
            </CardContent>
          </Card>
          <Card className="relative min-h-[230px] overflow-hidden rounded-2xl border-0 bg-[#f8e9dc] p-0 shadow-sm transition-all duration-300 hover:shadow-md max-[760px]:min-h-0">
            <CardContent className="p-8 max-[760px]:p-[25px]">
              <Badge className="bg-white/80 text-brand-green border-brand-line/50 hover:bg-white text-xs font-extrabold uppercase tracking-[.12em] px-3 py-1 gap-2" variant="outline">
                <span className="h-[7px] w-[7px] rounded-full bg-brand-orange" />Our vision
              </Badge>
              <p className="relative z-10 mt-[18px] max-w-[420px] font-sans text-[21px] font-medium leading-[1.55] text-[#45594c] max-[760px]:text-[19px]">{vision}</p>
              <span className="pointer-events-none absolute -bottom-[57px] right-4 text-[220px] leading-none text-brand-orange/20 select-none" aria-hidden="true">✳</span>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
