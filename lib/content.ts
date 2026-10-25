export type SiteLink = {
  label: string;
  href: string;
};

export const primaryNavigation: SiteLink[] = [
  { label: "About us", href: "/about-us" },
  { label: "Projects", href: "/projects" },
  { label: "Events", href: "/events" },
  { label: "News", href: "/news" },
  { label: "Team", href: "/team" },
];

export const footerNavigation: { title: string; links: SiteLink[] }[] = [
  {
    title: "Discover",
    links: [
      { label: "About us", href: "/about-us" },
      { label: "Projects", href: "/projects" },
      { label: "Our team", href: "/team" },
      { label: "Frequently asked questions", href: "/faq" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Events", href: "/events" },
      { label: "Media", href: "/media" },
      { label: "Gallery", href: "/gallery" },
      { label: "News", href: "/news" },
    ],
  },
  {
    title: "Get involved",
    links: [
      { label: "Internships", href: "/opportunities/internship" },
      { label: "Vacancies", href: "/opportunities/vacancies" },
      { label: "Volunteer", href: "/opportunities/volunteer" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const pageCopy = {
  about: {
    eyebrow: "Who we are",
    title: "Learning grows stronger when we grow together.",
    description:
      "Edunite is a community-minded organisation focused on opening up learning, opportunity and connection for young people.",
  },
  projects: {
    eyebrow: "What we do",
    title: "Ideas that bring people closer to opportunity.",
    description:
      "Our project areas are designed to connect young people with practical support, new skills and a community that believes in their potential.",
  },
  events: {
    eyebrow: "Come together",
    title: "Good things happen when we meet.",
    description:
      "Workshops, conversations and community moments make space to learn from one another and take the next step together.",
  },
  media: {
    eyebrow: "Media room",
    title: "A closer look at the work and the people behind it.",
    description:
      "Find updates, resources and stories from the Edunite community. New material will be added here as it becomes available.",
  },
  gallery: {
    eyebrow: "In pictures",
    title: "The moments that bring our community to life.",
    description:
      "A growing collection of the people, places and shared experiences that shape the Edunite story.",
  },
  news: {
    eyebrow: "Latest stories",
    title: "Notes from a community in motion.",
    description:
      "Updates, reflections and announcements from Edunite. Check back as we share more from our work and community.",
  },
  faq: {
    eyebrow: "Here to help",
    title: "A few things you might be wondering.",
    description:
      "Learn more about Edunite, the ways to get involved and how to stay connected.",
  },
  team: {
    eyebrow: "The people",
    title: "Different perspectives, one shared purpose.",
    description:
      "Edunite is shaped by people who care about learning, possibility and stronger communities.",
  },
  contact: {
    eyebrow: "Say hello",
    title: "Let’s start a conversation.",
    description:
      "Have a question, an idea or a partnership in mind? We would love to hear what brings you here.",
  },
  donate: {
    eyebrow: "Support the work",
    title: "Help make more room for possibility.",
    description:
      "Your support can help create more opportunities for young people to learn, connect and shape what comes next.",
  },
  internship: {
    eyebrow: "Grow with us",
    title: "Bring your curiosity. Build your experience.",
    description:
      "An internship is a chance to learn by doing, share your perspective and contribute to work that matters to the community.",
  },
  vacancies: {
    eyebrow: "Work with us",
    title: "Bring your skills to a shared purpose.",
    description:
      "We value thoughtful, community-minded people who want to help make learning and opportunity more accessible.",
  },
  volunteer: {
    eyebrow: "Give your time",
    title: "A little time can open a new door.",
    description:
      "Share your skills, lend a hand at an event or help us build a more connected community around young people.",
  },
} satisfies Record<string, { eyebrow: string; title: string; description: string }>;

export const projectCards = [
  {
    number: "01",
    category: "Learning",
    title: "Learning support",
    description:
      "Create welcoming spaces where young people can build confidence, curiosity and the skills to keep learning.",
    href: "/projects#learning-support",
    tone: "mint",
  },
  {
    number: "02",
    category: "Opportunity",
    title: "Skills for what’s next",
    description:
      "Connect learning with practical experiences that help young people explore their interests and future pathways.",
    href: "/projects#skills",
    tone: "peach",
  },
  {
    number: "03",
    category: "Community",
    title: "Stronger together",
    description:
      "Bring local voices, partners and young people together to shape ideas that respond to community needs.",
    href: "/projects#community",
    tone: "lavender",
  },
] as const;

export const impactAreas = [
  {
    number: "01",
    title: "Learn with confidence",
    description: "Make learning feel welcoming, practical and full of possibility.",
  },
  {
    number: "02",
    title: "Find a way forward",
    description: "Help young people discover skills, pathways and people who can support them.",
  },
  {
    number: "03",
    title: "Belong to community",
    description: "Create stronger connections where people can contribute and grow together.",
  },
];

export const faqs = [
  {
    question: "What is Edunite?",
    answer:
      "Edunite is a community-minded organisation focused on learning, opportunity and connection for young people.",
  },
  {
    question: "Who can get involved?",
    answer:
      "Young people, volunteers, organisations and community partners can all explore ways to take part. Visit the opportunities page to see the different routes in.",
  },
  {
    question: "How can I support Edunite?",
    answer:
      "You can share your skills, volunteer your time, explore a partnership or get in touch to learn about supporting the work.",
  },
  {
    question: "Where does Edunite work?",
    answer:
      "Local programme locations and current activities will be shared here as they are confirmed. Please contact the team with a specific enquiry.",
  },
];

export const opportunityLinks: SiteLink[] = [
  { label: "Internship", href: "/opportunities/internship" },
  { label: "Vacancies", href: "/opportunities/vacancies" },
  { label: "Volunteer", href: "/opportunities/volunteer" },
];
