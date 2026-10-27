import { newsSectionContent, type NewsSectionContent } from "@/data/news";
import { getCmsNewsArchive } from "@/lib/cms";

export async function getNewsSectionContent(): Promise<NewsSectionContent> {
  const articles = await getCmsNewsArchive();
  const now = Date.now();
  const oneMonthAgo = now - 30 * 24 * 60 * 60 * 1000;
  const recentArticles = articles
    .map((article) => ({
      article,
      publishedAt: Date.parse(article.date || article.formattedDate),
    }))
    .filter(
      ({ publishedAt }) =>
        Number.isFinite(publishedAt) && publishedAt >= oneMonthAgo && publishedAt <= now
    )
    .sort((a, b) => b.publishedAt - a.publishedAt)
    .map(({ article }) => article);

  const items = recentArticles.map((article) => ({
    id: String(article.id),
    slug: article.slug,
    title: article.title,
    description: article.excerpt,
    image: article.image,
    alt: article.title,
    label: article.category,
    href: `/news/${article.slug}`,
    date: article.formattedDate || article.date,
    category: article.category,
    readTime: article.readTime,
    author: article.author,
    content: article.content,
  }));

  return {
    ...newsSectionContent,
    items,
  };
}
