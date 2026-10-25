"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Calendar,
  Clock,
  Edit,
  Newspaper,
  PlusCircle,
  Search,
  Trash2,
} from "lucide-react";
import { getCmsArticles, saveCmsArticle, deleteCmsArticle } from "@/lib/cms";
import { type Article } from "@/data/articles";
import ImageUploader from "@/components/admin/ImageUploader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function AdminNewsPage() {
  const [articlesList, setArticlesList] = useState<Article[]>([]);
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<Partial<Article>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadArticles();
  }, []);

  async function loadArticles() {
    const data = await getCmsArticles();
    setArticlesList(data);
  }

  function handleOpenCreate() {
    setCurrentArticle({
      id: Date.now(),
      slug: "",
      title: "",
      category: "Community Care",
      excerpt: "",
      content: "",
      image: "/images/news/news-931.jpg",
      author: "Edunite2Serve Malawi",
      readTime: "3 min read",
      formattedDate: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    });
    setIsEditing(true);
  }

  function handleOpenEdit(article: Article) {
    setCurrentArticle({ ...article });
    setIsEditing(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!currentArticle.title || !currentArticle.content) return;

    setIsSaving(true);
    const slug =
      currentArticle.slug ||
      currentArticle.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    const payload: Partial<Article> = {
      ...currentArticle,
      slug,
      excerpt:
        currentArticle.excerpt ||
        (currentArticle.content || "").slice(0, 160) + "...",
    };

    await saveCmsArticle(payload);
    await loadArticles();
    setIsSaving(false);
    setIsEditing(false);
  }

  async function handleDelete(slugOrId: string | number) {
    if (confirm("Are you sure you want to delete this article?")) {
      await deleteCmsArticle(slugOrId);
      await loadArticles();
    }
  }

  const filtered = articlesList.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase()) ||
      a.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="m-0 font-sans text-2xl sm:text-3xl font-bold text-brand-forest">
            News & Field Dispatches
          </h1>
          <p className="m-0 text-sm text-brand-muted mt-1">
            Publish and manage community stories, agricultural updates, and volunteer articles.
          </p>
        </div>

        <Button
          onClick={handleOpenCreate}
          className="rounded-full bg-brand-green hover:bg-brand-forest text-white font-bold text-sm px-6 py-2.5 h-auto shadow-sm"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Write New Story
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-muted/60" />
        <Input
          placeholder="Search articles by title or keyword..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 bg-white border-[#d8e3d5] rounded-full text-sm h-10"
        />
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((art) => (
          <Card
            key={art.id}
            className="flex flex-col justify-between overflow-hidden rounded-2xl border border-[#dfe5db] bg-white p-0 shadow-xs hover:shadow-md transition-all"
          >
            <div>
              <div className="relative h-44 w-full bg-slate-100">
                <Image
                  src={art.image}
                  alt={art.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute left-3 top-3">
                  <Badge className="bg-brand-forest text-brand-lime text-[11px] font-bold uppercase tracking-wider border-0 px-2.5 py-0.5">
                    {art.category}
                  </Badge>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-3 text-xs font-semibold text-brand-muted mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-brand-green" />
                    {art.formattedDate}
                  </span>
                  <span>•</span>
                  <span>{art.readTime}</span>
                </div>

                <h3 className="m-0 font-sans text-lg font-bold text-brand-forest leading-snug line-clamp-2">
                  {art.title}
                </h3>

                <p className="m-0 mt-2 text-xs leading-[1.65] text-brand-muted line-clamp-3">
                  {art.excerpt}
                </p>
              </div>
            </div>

            <div className="border-t border-[#edf2ea] p-4 bg-[#fafcfa] flex items-center justify-between">
              <span className="text-xs text-brand-muted truncate max-w-[150px]">
                By {art.author}
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenEdit(art)}
                  className="h-8 px-3 text-xs font-bold"
                >
                  <Edit className="h-3.5 w-3.5 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => handleDelete(art.slug || art.id)}
                  className="h-8 w-8 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Write / Edit Article Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-3xl bg-white p-6 sm:p-8 rounded-2xl border border-[#dfe5db] shadow-2xl overflow-y-auto max-h-[90vh]">
          <DialogHeader className="border-b border-[#edf2ea] pb-4">
            <DialogTitle className="font-sans text-2xl font-bold text-brand-forest">
              {currentArticle.slug ? "Edit Article" : "Write New Story / Dispatch"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-forest mb-1">
                Story Title *
              </label>
              <Input
                required
                value={currentArticle.title || ""}
                onChange={(e) =>
                  setCurrentArticle({ ...currentArticle, title: e.target.value })
                }
                placeholder="e.g., Vegetarian Cookery Training in Zomba"
                className="rounded-xl border-[#d8e3d5]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-forest mb-1">
                  Category
                </label>
                <Input
                  value={currentArticle.category || ""}
                  onChange={(e) =>
                    setCurrentArticle({
                      ...currentArticle,
                      category: e.target.value,
                    })
                  }
                  placeholder="e.g., Child Education, Sustainable Agriculture"
                  className="rounded-xl border-[#d8e3d5]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-forest mb-1">
                  Author
                </label>
                <Input
                  value={currentArticle.author || ""}
                  onChange={(e) =>
                    setCurrentArticle({
                      ...currentArticle,
                      author: e.target.value,
                    })
                  }
                  placeholder="e.g., Edunite2Serve Malawi"
                  className="rounded-xl border-[#d8e3d5]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-forest mb-1">
                  Read Time
                </label>
                <Input
                  value={currentArticle.readTime || ""}
                  onChange={(e) =>
                    setCurrentArticle({
                      ...currentArticle,
                      readTime: e.target.value,
                    })
                  }
                  placeholder="e.g., 3 min read"
                  className="rounded-xl border-[#d8e3d5]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-forest mb-1">
                Excerpt (Summary for card preview)
              </label>
              <textarea
                rows={2}
                value={currentArticle.excerpt || ""}
                onChange={(e) =>
                  setCurrentArticle({ ...currentArticle, excerpt: e.target.value })
                }
                placeholder="Brief 1-2 sentence hook for the homepage and cards..."
                className="w-full rounded-xl border border-[#d8e3d5] p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-forest mb-1">
                Full Article Content *
              </label>
              <textarea
                required
                rows={7}
                value={currentArticle.content || ""}
                onChange={(e) =>
                  setCurrentArticle({ ...currentArticle, content: e.target.value })
                }
                placeholder="Write the full story. Paragraphs separated by blank lines..."
                className="w-full rounded-xl border border-[#d8e3d5] p-3 text-sm font-sans focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
              />
            </div>

            {/* Cloudinary Image Uploader */}
            <ImageUploader
              value={currentArticle.image || ""}
              onChange={(url) =>
                setCurrentArticle({ ...currentArticle, image: url })
              }
              folder="edunite2serve/news"
              label="Story Featured Image (Cloudinary CDN)"
            />

            <DialogFooter className="border-t border-[#edf2ea] pt-4 flex flex-row items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSaving}
                className="bg-brand-green hover:bg-brand-forest text-white font-bold"
              >
                {isSaving ? "Saving..." : "Publish Article"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
