export type Project = {
  slug: string;
  title: string;
  category: string;
  location: string;
  description: string;
  highlight: string;
  image: string;
  imageAlt: string;
  impactMetrics?: string;
};

export const projectDirectory: readonly Project[] = [
  {
    slug: "lakeside-farm",
    title: "Lake Side Edunite2Serve Farm",
    category: "Sustainable Farming",
    location: "Malawi Adventist University and nearby communities",
    description:
      "The Lakeside farming initiative cultivates organic crops, grains, and vegetables to help support under-resourced university students and vulnerable families in surrounding communities with nutrition and practical bio-intensive agricultural training.",
    highlight: "Growing food with direct student & community benefit",
    image: "/images/featured-projects/lakeside-farm.jpg",
    imageAlt: "A community member tending young crops at a farm in Malawi.",
    impactMetrics: "10+ Acres cultivated · Hundreds of student meals supported",
  },
  {
    slug: "mangunda-school",
    title: "Mangunda Adventist Primary School",
    category: "Child Education",
    location: "Thyolo, Southern Region, Malawi",
    description:
      "Mangunda serves more than 200 young learners across Standards 1–7. Edunite2Serve supports vital classroom rehabilitation, learning materials, and student wellbeing to overcome severe facility deficits and give every child a dignifying educational start.",
    highlight: "200+ learners · Standards 1–7",
    image: "/images/featured-projects/mangunda-school.jpg",
    imageAlt: "Learners and volunteers gathered at Mangunda Adventist Primary School.",
    impactMetrics: "200+ active primary students · Daily educational support",
  },
  {
    slug: "give-hope-malawi",
    title: "Give-HOPE Malawi Partnership",
    category: "Community Care",
    location: "Across 15 projects in Malawi",
    description:
      "Through its close strategic collaboration with Give-HOPE, Edunite2Serve provides educational sponsorships, spiritual guidance, and compassionate social welfare for vulnerable children and community support clubs across Malawi.",
    highlight: "Active work across 15 community projects in Malawi",
    image: "/images/featured-projects/give-hope-malawi.jpg",
    imageAlt: "Give-HOPE volunteers and learners gathered with a project banner.",
    impactMetrics: "15 grassroots project centers across central and southern Malawi",
  },
  {
    slug: "community-orchard",
    title: "Kamwisa Community Orchard",
    category: "Food Access",
    location: "Kamwisa, Traditional Authority Kachindamoto",
    description:
      "Established in 2021, this community orchard was planted to make a wide variety of nutritious fruits affordable and accessible to local households, while teaching regenerative soil care and perennial tree stewardship.",
    highlight: "Community orchard launched in 2021",
    image: "/images/featured-projects/lakeside-farm.jpg",
    imageAlt: "Young crops and fruit trees growing at Kamwisa orchard.",
    impactMetrics: "Diverse fruit tree varieties · Ongoing seasonal harvest",
  },
  {
    slug: "church-construction",
    title: "Malawi Churches Construction",
    category: "Community Infrastructure",
    location: "Rural communities across Malawi",
    description:
      "With generous funding from international partners and US supporters, Edunite2Serve helps rural congregations build durable brick churches and community assembly halls, creating safe shelters for worship, youth development, and emergency aid.",
    highlight: "Durable worship and community assembly spaces",
    image: "/images/featured-projects/church-construction.jpg",
    imageAlt: "A brick church building under construction in Malawi.",
    impactMetrics: "Safe, weather-resistant sanctuary and community centers",
  },
  {
    slug: "farm-stew",
    title: "FARM STEW International",
    category: "Healthy Living",
    location: "Zomba, Dedza & Nationwide",
    description:
      "Through the holistic FARM STEW recipe (Farming, Attitude, Rest, Meals, Sanitation, Temperance, Enterprise, Water), local certified trainers empower families with life-changing skills in plant-based nutrition, hygiene, clean water, and micro-enterprise.",
    highlight: "Practical skills for healthier, self-reliant lives",
    image: "/images/featured-projects/farmstew-international.jpg",
    imageAlt: "A participant receives recognition during a FARM STEW training in Malawi.",
    impactMetrics: "Hundreds trained in holistic wellness and organic gardening",
  },
  {
    slug: "virtual-learning-community",
    title: "FARM STEW Virtual Learning Community (VLC)",
    category: "Education",
    location: "Online & Regional Study Hubs",
    description:
      "An innovative distance learning platform providing smart online certifications and training in community health, leadership, and sustainable agriculture for students and practitioners across Africa.",
    highlight: "Online education and verified certification",
    image: "/images/featured-projects/mangunda-school.jpg",
    imageAlt: "Students engaging in collaborative learning sessions.",
    impactMetrics: "Smart digital certificate courses available worldwide",
  },
] as const;

export const featuredProjectItems = projectDirectory.slice(0, 3);
