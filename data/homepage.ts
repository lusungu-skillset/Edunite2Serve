import { donationUrl } from "./navigation";
import { featuredProjectItems } from "./projects";

export const homepageContent = {
  hero: {
    titleLines: [
      { text: "Giving Help To Those" },
      { text: "People Who" },
      { text: "Need It" },
    ],
    image: {
      src: "/images/homepage-community-learning.jpg",
      alt: "School learners gathered for a lesson in a classroom in Malawi.",
    },
    primaryCta: { label: "Donate Now", href: donationUrl },
  },
  missionVision: {
    eyebrow: "Our purpose",
    title: "Education, Service and Sustainable Development",
    mission:
      "Edunite2Serve exists to empower communities through education, humanitarian service, and sustainable development. We are committed to building resilience and fostering hope by uniting evidence-based research, compassionate outreach, and faith-driven service—transforming lives and strengthening local capacity for long-term impact.",
    vision:
      "Edunite2Serve is a fully volunteer organization that is dedicated to enhancing whole living to those challenged by poverty in south-central Africa.",
  },
  communityStory: {
    eyebrow: "Start Donating Poor People",
    title: "Helping Each Other Can Make World Better",
    description:
      "Together we will turn your dreams into reality by giving back through life-changing experiences.",
    // The source site's story video; replace this URL when the new video is ready.
    videoUrl: "https://www.youtube.com/watch?v=JwOEW89rJV8",
    priorities: [
      "Foster active participation in community service initiatives.",
      "Give children the gift of an education.",
      "Encourage collaboration among students, educators, and community members to address local needs.",
      "Focus on STEM education, arts, and vocational training to prepare participants for diverse career paths.",
      "Give-HOPE implements programs using the ‘My Bible First’ curriculum, which focuses on biblical teachings and values.",
    ],
  },
  servicePillars: {
    eyebrow: "How we serve",
    title: "A Shared Effort Across Three Areas",
    description:
      "We empower communities through education, humanitarian service, and sustainable development.",
    items: [
      {
        title: "Education",
        description:
          "Give children the gift of an education, with a focus on STEM, the arts, and vocational training.",
        image: "/images/how-we-serve/education-volunteers.jpg",
        imageAlt: "School learners gathered with volunteers in Malawi.",
        action: "Explore education",
        href: "/projects",
        icon: "education",
      },
      {
        title: "Humanitarian service",
        description:
          "Bring students, educators, and community members together to respond to local needs.",
        image: "/images/how-we-serve/community-service.jpg",
        imageAlt: "Children and community members gathered outside in Malawi.",
        action: "Get involved",
        href: "/opportunities",
        icon: "service",
      },
      {
        title: "Sustainable development",
        description:
          "Support healthier, more resilient lives through farming, nutrition, sanitation, and entrepreneurship.",
        image: "/images/community-story/community-visit.jpg",
        imageAlt: "A FARM STEW volunteer spending time with children in Malawi.",
        action: "Support this work",
        href: donationUrl,
        icon: "development",
      },
    ],
  },
  donationImpact: {
    eyebrow: "Give with Purpose",
    title: "Charity With Difference",
    description:
      "Join our monthly giving program to provide consistent support to our initiatives. Regular contributions, no matter the size, help us plan and sustain long-term projects.",
    primaryCta: { label: "Donate now", href: donationUrl },
    secondaryCta: { label: "Explore our work", href: "/projects" },
    items: [
      {
        title: "Healthy Food",
        quote:
          "A successful cooking class series was held with 16 enthusiastic participants. Their families are now enjoying new, healthy meals and the graduates are already sharing their new skills with others. More classes planned for the future.",
        author: "Becky Vermilyea",
        accent: "teal",
        icon: "healthy-food",
      },
      {
        title: "Farming",
        quote:
          "We sincerely thank all our donors for your generous support of FARM STEW International’s work in Malawi. Your contributions have played a vital role in empowering families and communities through life-changing training in farming, nutrition, sanitation, entrepreneurship, and spiritual health. Because of your partnership, more people are gaining the knowledge and tools they need to live healthier, more self-reliant lives. We are deeply grateful for your continued compassion and investment in sustainable change—may your kindness be richly rewarded.",
        author: "Joy Kauffman",
        accent: "orange",
        icon: "farming",
      },
      {
        title: "Child Education",
        quote:
          "We extend our heartfelt gratitude to all our generous donors for the invaluable support you have provided to Mangunda Adventist Primary School. Your contributions—whether financial, material, or through services—have made a meaningful difference in the lives of our learners and the growth of our school.",
        author: "Prof. S. Pittman",
        accent: "gold",
        icon: "education",
      },
    ],
  },
  featuredProjects: {
    eyebrow: "From our projects",
    title: "Work Rooted in Community",
    description:
      "See how community farming, school support and the Give-HOPE partnership are creating practical opportunities for children and families in Malawi.",
    items: featuredProjectItems,
    href: "/projects",
    hrefLabel: "View all projects",
  },
  organization: {
    eyebrow: "People and community",
    title: "A non-profit Organization, Working Alongside Communities",
    description:
      "As a fully non-profit organization, Edunite2Serve works alongside communities in south-central Africa through education, humanitarian service, and sustainable development.",
    image: "/images/how-we-serve/community-service.jpg",
    alt: "Children and community members gathered beneath a tree at a community service event in Malawi.",
    href: "/team",
    hrefLabel: "Meet the team",
  },
  callToAction: {
    eyebrow: "Take part",
    title: "Help Create Room for Learning and Possibility",
    description:
      "Choose a way to support Edunite2Serve or explore current opportunities to get involved.",
    primaryCta: { label: "Donate Now", href: donationUrl },
    secondaryCta: { label: "Explore Opportunities", href: "/opportunities" },
  },
} as const;
