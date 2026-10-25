"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Clock,
  Search,
  User,
} from "lucide-react";
import { articles as defaultArticles, type Article, articleCategories } from "@/data/articles";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ArticlesExplorer({
  articles = defaultArticles,
}: {
  articles?: Article[];
} = {}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory =
        selectedCategory === "All" ||
        article.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesSearch =
        searchQuery.trim() === "" ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  return (
    <div>
      {/* Category Filter Pills & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-8 sm:mb-10">
        <div className="flex overflow-x-auto no-scrollbar pb-1 sm:flex-wrap items-center gap-2 w-full md:w-auto">
          {articleCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shrink-0 ${
                selectedCategory === cat
                  ? "bg-brand-forest text-brand-lime shadow-xs"
                  : "bg-white text-brand-muted hover:bg-[#ebf2e7] hover:text-brand-forest border border-[#d8e3d5]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-muted/60" />
          <Input
            type="text"
            placeholder="Search news & stories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-white border-[#d8e3d5] rounded-full text-sm h-10 focus-visible:ring-brand-green"
          />
        </div>
      </div>

      {/* Articles Feed */}
      {filteredArticles.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#ccd8ca] bg-white p-12 text-center">
          <p className="text-base text-brand-muted m-0">
            No articles found matching your criteria. Try adjusting the category or search keywords.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="mt-4 rounded-full"
          >
            Show All Articles
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {filteredArticles.map((article) => (
            <Card
              key={article.id}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#dfe5db] bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div>
                <Link
                  href={`/news/${article.slug}`}
                  className="relative block h-[220px] w-full overflow-hidden bg-slate-100"
                >
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4">
                    <Badge className="bg-brand-forest/90 text-brand-lime text-xs font-bold uppercase tracking-wider backdrop-blur-xs border-0 px-3 py-1">
                      {article.category}
                    </Badge>
                  </div>
                </Link>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs font-semibold text-brand-muted/80 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-brand-green" />
                      {article.formattedDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-brand-green" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="m-0 font-sans text-xl font-bold leading-tight text-brand-forest group-hover:text-brand-green transition-colors line-clamp-2">
                    <Link href={`/news/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>

                  <CardContent className="p-0 mt-3">
                    <p className="m-0 text-sm leading-[1.7] text-brand-muted line-clamp-3">
                      {article.excerpt}
                    </p>
                  </CardContent>
                </div>
              </div>

              <div className="border-t border-[#edf2ea] p-4 px-6 bg-[#fafcfa] flex items-center justify-between">
                <Link
                  href={`/news/${article.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-forest hover:text-brand-green transition-colors"
                >
                  Read Story
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>

                <span className="text-[11px] font-semibold text-brand-muted">
                  By {article.author}
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
