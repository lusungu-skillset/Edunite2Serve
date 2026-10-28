"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { partners } from "@/data/partners";

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
      className="bg-[#f4f7f1] px-[clamp(18px,4vw,64px)] py-[76px] max-[760px]:py-12"
    >
      <div className="mx-auto w-full max-w-[1640px]">
        <h2 className="sr-only" id="partners-heading">
          Our Partners
        </h2>

        <motion.div
          className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6"
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
              <div className="group flex min-h-[150px] w-full items-center justify-center rounded-2xl border border-[#dce8dd] bg-white p-5 shadow-[0_4px_18px_rgba(20,58,35,.04)] transition-all duration-300 hover:border-[#a3cfb5] hover:shadow-[0_12px_32px_rgba(20,58,35,.1)]">
                <Image
                  alt={partner.name}
                  className="max-h-[92px] w-auto max-w-full object-contain transition-transform duration-300 motion-reduce:transition-none group-hover:scale-105"
                  height={partner.height}
                  sizes="(max-width: 640px) 42vw, (max-width: 1024px) 28vw, 15vw"
                  src={partner.src}
                  width={partner.width}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
