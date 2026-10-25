export type NavigationItem = {
  label: string;
  href: string;
  children?: NavigationItem[];
};

export const donationUrl =
  "https://www.paypal.com/donate/?hosted_button_id=8V9B9URMXXY4Y";

// This follows the public WordPress menu. The smaller Next.js destination pages
// remain placeholders until their content is migrated and approved.
export const navigationItems: NavigationItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about-us",
    children: [{ label: "Contact Us", href: "/contact" }],
  },
  {
    
    label: "Projects",
    href: "/projects",
    children: [
      { label: "Event", href: "/events" },
      { label: "Projects", href: "/projects" },
      {
        label: "Medias",
        href: "/media",
        children: [
          { label: "Resources", href: "/resources" },
          { label: "Gallery", href: "/gallery" },
        ],
      },
    ],
  },
  {
    label: "Blogs",
    href: "/news",
    children: [
      { label: "News", href: "/news" },
      {
        label: "Other Pages",
        href: "/other-pages",
        children: [
          { label: "FAQs", href: "/faq" },
          { label: "Team", href: "/team" },
        ],
      },
    ],
  },
  {
    label: "Opportunities",
    href: "/opportunities",
    children: [
      { label: "Internship", href: "/opportunities/internship" },
      { label: "Vacancies", href: "/opportunities/vacancies" },
      { label: "Volunteer", href: "/opportunities/volunteer" },
    ],
  },
];

export const footerGroups = [
  {
    title: "Explore",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Projects", href: "/projects" },
      { label: "News", href: "/news" },
      { label: "Resources", href: "/resources" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    title: "Get involved",
    links: [
      { label: "Events", href: "/events" },
      { label: "Opportunities", href: "/opportunities" },
      { label: "Team", href: "/team" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

export const contactDetails = {
  email: "info@edunite2serve.org",
  phoneLabel: "+265 989 158 325",
  phoneHref: "+265989158325",
};
