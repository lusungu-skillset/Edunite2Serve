import { newsSectionContent, type NewsSectionContent } from "@/data/news";

export async function getNewsSectionContent(): Promise<NewsSectionContent> {
  return newsSectionContent;
}
