export type Partner = {
  name: string;
  shortName: string;
  role: string;
  src: string;
  width: number;
  height: number;
};

export const partners: readonly Partner[] = [
  {
    name: "Malawi Adventist University",
    shortName: "MAU",
    role: "Higher Education",
    src: "/images/partners/malawi-adventist-university.png",
    width: 294,
    height: 210,
  },
  {
    name: "Give-HOPE",
    shortName: "Give-HOPE",
    role: "Child Welfare & Nutrition",
    src: "/images/partners/give-hope.png",
    width: 455,
    height: 548,
  },
  {
    name: "Government of Malawi",
    shortName: "Republic of Malawi",
    role: "National Authority",
    src: "/images/partners/malawi-coat-of-arms.png",
    width: 500,
    height: 516,
  },
  {
    name: "Non-Governmental Organizations Regulatory Authority",
    shortName: "NGORA",
    role: "Regulatory Body",
    src: "/images/partners/ngora.png",
    width: 544,
    height: 458,
  },
  {
    name: "Seventh-day Adventist Church",
    shortName: "SDA Church",
    role: "Faith & Community",
    src: "/images/partners/sda-logo.png",
    width: 256,
    height: 256,
  },
] as const;
