import { articles } from "./articles";

export type NewsStory = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  label: string;
  href: string;
  date: string;
  category: string;
  readTime: string;
  author: string;
  content: string;
};

export type NewsSectionContent = {
  eyebrow: string;
  title: string;
  description: string;
  items: NewsStory[];
  href: string;
  hrefLabel: string;
  itemLinkLabel: string;
};

export const realNewsStories: NewsStory[] = articles.map((art) => ({
  id: String(art.id),
  slug: art.slug,
  title: art.title,
  description: art.excerpt,
  image: art.image,
  alt: art.title,
  label: art.category,
  href: `/news/${art.slug}`,
  date: art.formattedDate,
  category: art.category,
  readTime: art.readTime,
  author: art.author,
  content: art.content,
}));

export const newsSectionContent: NewsSectionContent = {
  eyebrow: "Blogs & Updates",
  title: "Latest News From Edunite2Serve",
  description:
    "Real-time dispatches from our grassroots work in Malawi—education in Thyolo, sustainable farming at Lake Malawi, and nutrition workshops in Zomba.",
  items: realNewsStories,
  href: "/news",
  hrefLabel: "View All News & Stories",
  itemLinkLabel: "Read Full Story",
};

// Deprecated placeholder seed replaced with real news content
export const newsSectionSeed = newsSectionContent;
