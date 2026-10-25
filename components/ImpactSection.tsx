import { impactAreas } from "@/lib/content";
import { Card, CardContent } from "@/components/ui/card";

export default function ImpactSection() {
  return (
    <section className="bg-[#103d33] py-[100px] text-white max-[720px]:py-[70px]">
      <div className="mx-auto w-full max-w-[1720px] px-10 max-[720px]:max-w-[596px] max-[720px]:px-[18px] max-[440px]:max-w-[570px] max-[440px]:px-[15px]">
        <div className="mb-[42px] max-w-[660px] max-[720px]:mb-[30px]">
          <p className="mb-[19px] flex items-center gap-[9px] text-[11px] font-extrabold uppercase leading-[1.4] tracking-[.14em] text-[#c3e5d0]">
            <span className="h-2 w-2 rounded-full bg-brand-orange" />The change we care about
          </p>
          <h2 className="m-0 font-sans text-[clamp(34px,4vw,52px)] font-bold leading-[1.16] tracking-[-.035em]">Small steps can make a lasting difference.</h2>
          <p className="mt-[17px] max-w-[560px] text-base text-[#c9d8ce]">
            We focus on the conditions that help young people learn, find opportunity
            and feel connected to the people around them.
          </p>
        </div>
        <div className="mt-[54px] grid grid-cols-3 gap-4 max-[720px]:grid-cols-1">
          {impactAreas.map((area) => (
            <Card
              className="min-h-[200px] rounded-xl border border-white/15 bg-white/5 p-0 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/25 max-[720px]:min-h-[170px]"
              key={area.number}
            >
              <CardContent className="p-7">
                <span className="inline-flex h-[35px] w-[35px] items-center justify-center rounded-full border border-white/40 text-[11px] text-[#d1e7d8] font-bold">
                  {area.number}
                </span>
                <h3 className="mb-2 mt-[26px] font-sans text-[23px] font-bold text-white max-[720px]:mt-[18px]">
                  {area.title}
                </h3>
                <p className="m-0 max-w-[300px] text-sm text-[#c9d8ce] leading-relaxed">
                  {area.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
