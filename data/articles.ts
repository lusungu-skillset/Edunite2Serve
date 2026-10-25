import articlesData from "./articles.json";

export type Article = {
  id: number;
  slug: string;
  title: string;
  date: string;
  formattedDate: string;
  author: string;
  category: string;
  readTime: string;
  excerpt: string;
  content: string;
  image: string;
};

export const articles: Article[] = articlesData;

export const articleCategories = [
  "All",
  "Education",
  "Sustainable Agriculture",
  "Nutrition & Health",
  "Youth Empowerment",
  "Community Care",
] as const;
