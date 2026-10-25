import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Heart,
  Share2,
  Sparkles,
  Tag,
  User,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { getCmsArticleBySlug, getCmsArticles } from "@/lib/cms";
import { articles as defaultArticles, type Article } from "@/data/articles";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { donationUrl } from "@/data/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const articles = await getCmsArticles();
  const list = articles.length > 0 ? articles : defaultArticles;
  return list.map((art) => ({
    slug: art.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getCmsArticleBySlug(slug);

  if (!article) {
    return {
      title: "News Story Not Found | Edunite2Serve",
    };
  }

  return {
    title: `${article.title} | Edunite2Serve News`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getCmsArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const allArticles = await getCmsArticles();
  const relatedArticles = (allArticles.length > 0 ? allArticles : defaultArticles)
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  // Split article content into paragraphs for clean typography
  const paragraphs = article.content
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <>
      <PageHeader
        eyebrow="News & Dispatches"
        title={article.title}
        description={`Published on ${article.formattedDate} by ${article.author}`}
        breadcrumbs={[
          { label: "Blogs & News", href: "/news" },
          { label: article.title },
        ]}
        primaryCta={{ label: "Donate to Malawi Missions", href: donationUrl }}
        secondaryCta={{ label: "All News & Stories", href: "/news" }}
      />

      <article className="bg-[#f4f7f1] py-12 sm:py-16">
        <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-6 lg:px-8">
          {/* Back Navigation Bar */}
          <div className="mb-8 flex items-center justify-between">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-forest hover:text-brand-green transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to All News & Stories
            </Link>

            <Badge className="bg-brand-forest text-brand-lime text-xs font-bold uppercase tracking-wider px-3.5 py-1">
              {article.category}
            </Badge>
          </div>

          {/* Main Card Container */}
          <div className="overflow-hidden rounded-3xl border border-[#dfe5db] bg-white shadow-sm">
            {/* Featured Image */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#e9eee6]">
              <Image
                src={article.image}
                alt={article.title}
                fill
                priority
                sizes="(max-width: 1100px) 100vw, 1100px"
                className="object-cover"
              />
            </div>

            <div className="p-6 sm:p-10 lg:p-12">
              {/* Meta Bar */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 border-b border-[#edf2ea] pb-6 text-xs sm:text-sm font-medium text-brand-muted">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-brand-green" />
                  {article.formattedDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-brand-green" />
                  {article.readTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4 text-brand-green" />
                  By {article.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Tag className="h-4 w-4 text-brand-green" />
                  {article.category}
                </span>
              </div>

              {/* Excerpt Lead */}
              <div className="mt-8 rounded-2xl bg-[#fafcf9] border-l-4 border-brand-green p-6 text-base sm:text-lg font-medium leading-relaxed text-brand-forest">
                {article.excerpt}
              </div>

              {/* Full Article Content */}
              <div className="mt-8 space-y-6 text-base sm:text-lg leading-[1.8] text-brand-ink/90">
                {paragraphs.map((paragraph, index) => {
                  // If paragraph looks like a quote or key message header
                  if (paragraph.startsWith('"') || paragraph.startsWith('“')) {
                    return (
                      <blockquote
                        key={index}
                        className="my-8 rounded-2xl bg-[#edf4ea] p-6 sm:p-8 font-brand text-xl sm:text-2xl font-bold italic text-brand-forest border border-[#d2e4cb]"
                      >
                        {paragraph}
                      </blockquote>
                    );
                  }

                  if (paragraph.startsWith("Key Messages:") || paragraph.startsWith("Highlights of the Training:")) {
                    return (
                      <div
                        key={index}
                        className="my-8 rounded-2xl border border-[#d8e3d5] bg-[#fafcf9] p-6 sm:p-8"
                      >
                        <h3 className="m-0 font-sans text-xl font-bold text-brand-forest mb-4 flex items-center gap-2">
                          <Sparkles className="h-5 w-5 text-brand-green" />
                          {paragraph}
                        </h3>
                      </div>
                    );
                  }

                  return (
                    <p key={index} className="m-0">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* Donation Impact Callout Box */}
              <div className="mt-12 rounded-3xl border border-[#cbe1c7] bg-gradient-to-br from-[#f2f8f0] to-[#e4f0e0] p-8 sm:p-10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div>
                    <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-brand-green">
                      <Heart className="h-3.5 w-3.5 fill-current" />
                      Make a Real Difference
                    </span>
                    <h3 className="mt-1 font-sans text-2xl font-bold text-brand-forest">
                      Help Us Continue This Life-Changing Work
                    </h3>
                    <p className="mt-2 text-sm text-brand-muted max-w-xl">
                      Every dollar donated directly supports teachers, nutritious meals, clean water, and sustainable farming across Malawi.
                    </p>
                  </div>
                  <Button
                    className="rounded-full bg-brand-forest hover:bg-brand-green text-white font-bold text-base px-8 py-3.5 h-auto shrink-0 shadow-sm"
                    render={<Link href={donationUrl} />}
                  >
                    Donate to This Mission
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Related Articles Section */}
          {relatedArticles.length > 0 && (
            <div className="mt-16">
              <h2 className="font-sans text-2xl font-bold text-brand-forest mb-6">
                More News & Dispatches
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((rel) => (
                  <Card
                    key={rel.slug}
                    className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#dfe5db] bg-white shadow-xs hover:shadow-md transition-all"
                  >
                    <div>
                      <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                        <Image
                          src={rel.image}
                          alt={rel.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5">
                        <span className="text-[11px] font-bold text-brand-green uppercase tracking-wider">
                          {rel.category}
                        </span>
                        <h3 className="mt-1 font-sans text-base font-bold text-brand-forest group-hover:text-brand-green transition-colors line-clamp-2">
                          <Link href={`/news/${rel.slug}`}>{rel.title}</Link>
                        </h3>
                        <p className="mt-2 text-xs text-brand-muted line-clamp-2">
                          {rel.excerpt}
                        </p>
                      </div>
                    </div>
                    <div className="border-t border-[#edf2ea] p-4 px-5 bg-[#fafcfa]">
                      <Link
                        href={`/news/${rel.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-brand-green hover:text-brand-forest transition-colors"
                      >
                        Read Full Story
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
