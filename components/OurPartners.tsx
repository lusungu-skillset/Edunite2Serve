"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { partners } from "@/data/partners";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

export default function OurPartners() {
  return (
    <section
      aria-labelledby="partners-heading"
      className="bg-[#f4f7f1] font-sans font-[family-name:var(--font-mulish)] px-[clamp(18px,4vw,64px)] py-[76px] max-[760px]:py-12"
    >
      <div className="mx-auto w-full max-w-[1640px]">
        {/* Section Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h2
                className="m-0 whitespace-nowrap font-sans font-[family-name:var(--font-mulish)] text-[clamp(28px,3vw,38px)] font-bold italic leading-tight tracking-[-.03em] text-[#0a8051]"
                id="partners-heading"
              >
                Our Partners
              </h2>
              <span
                className="h-px w-[clamp(36px,6vw,96px)] bg-[#8ab9a0]"
                aria-hidden="true"
              />
              <span
                className="text-[17px] leading-none text-[#0a8051]"
                aria-hidden="true"
              >
                ✦
              </span>
            </div>
          </div>
        </div>

        {/* Partners Grid */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
          initial="hidden"
          variants={containerVariants}
          viewport={{ once: true, margin: "-50px" }}
          whileInView="visible"
        >
          {partners.map((partner) => (
            <motion.div
              key={partner.name}
              className="flex w-full"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.22, ease: "easeOut" } }}
            >
              <Tooltip>
                <TooltipTrigger
                  className="group flex h-full w-full flex-col justify-between rounded-2xl border border-[#dce8dd] bg-white p-5 sm:p-6 shadow-[0_4px_18px_rgba(20,58,35,.04)] transition-all duration-300 hover:border-[#a3cfb5] hover:shadow-[0_12px_32px_rgba(20,58,35,.1)] text-left cursor-default focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-brand-green"
                  render={<div tabIndex={0} role="article" aria-label={`${partner.name} - ${partner.role}`} />}
                >
                  {/* Standardized Logo Area */}
                  <div className="flex h-[104px] w-full items-center justify-center rounded-xl bg-[#fafcf9] p-4 transition-colors duration-200 group-hover:bg-[#f3f8f2]">
                    <Image
                      alt={partner.name}
                      className="max-h-[68px] w-auto max-w-[145px] object-contain transition-transform duration-300 motion-reduce:transition-none group-hover:scale-106"
                      height={partner.height}
                      sizes="145px"
                      src={partner.src}
                      width={partner.width}
                    />
                  </div>

                  {/* Partner Metadata */}
                  <div className="mt-4 border-t border-[#edf2ea] pt-3 flex flex-col justify-between flex-1">
                    <h3 className="m-0 font-sans font-[family-name:var(--font-mulish)] text-[15px] sm:text-[16px] font-bold leading-[1.3] text-brand-forest group-hover:text-brand-green transition-colors line-clamp-2 min-h-[42px] flex items-center">
                      {partner.name}
                    </h3>
                    <p className="m-0 mt-2 font-sans text-[12px] sm:text-[13px] font-extrabold uppercase tracking-[0.06em] text-brand-green">
                      {partner.role}
                    </p>
                  </div>
                </TooltipTrigger>

              
              </Tooltip>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
