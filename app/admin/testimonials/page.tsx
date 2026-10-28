"use client";

import { useState, useEffect } from "react";
import {
  Edit,
  GraduationCap,
  MessageSquareQuote,
  PlusCircle,
  Quote,
  Sparkles,
  Sprout,
  Star,
  Trash2,
  UtensilsCrossed,
} from "lucide-react";
import { getCmsTestimonials, saveCmsTestimonial } from "@/lib/cms";
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

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveNotice, setSaveNotice] = useState<string | null>(null);

  useEffect(() => {
    loadTestimonials();
  }, []);

  async function loadTestimonials() {
    const data = await getCmsTestimonials();
    setItems(data);
  }

  function handleOpenCreate() {
    setSaveError(null);
    setSaveNotice(null);
    setCurrentItem({
      title: "",
      author: "",
      quote: "",
      accent: "teal",
      icon: "farming",
      rating: 5,
    });
    setIsEditing(true);
  }

  function handleOpenEdit(item: any) {
    setSaveError(null);
    setSaveNotice(null);
    setCurrentItem({ ...item });
    setIsEditing(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!currentItem.title || !currentItem.author || !currentItem.quote) return;

    setIsSaving(true);
    setSaveError(null);
    setSaveNotice(null);

    try {
      const result = await saveCmsTestimonial(currentItem);
      if (!result.success) {
        setSaveError(result.error || "The testimonial could not be saved.");
        return;
      }

      await loadTestimonials();
      if (result.isMock) {
        setSaveNotice(
          "Saved in demo mode for this session only. Connect Supabase to publish it on the homepage."
        );
        setIsEditing(false);
        return;
      }

      setIsEditing(false);
    } catch (error) {
      setSaveError(
        error instanceof Error ? error.message : "The testimonial could not be saved."
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="m-0 font-sans text-2xl sm:text-3xl font-bold text-brand-forest">
            Homepage Impact Testimonials
          </h1>
          <p className="m-0 text-sm text-brand-muted mt-1">
            Manage the carousel cards and modal stories featured in the &quot;Give with Purpose&quot; homepage section.
          </p>
        </div>

        <Button
          onClick={handleOpenCreate}
          className="rounded-full bg-brand-green hover:bg-brand-forest text-white font-bold text-sm px-6 py-2.5 h-auto shadow-sm"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      {saveNotice && (
        <p
          className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900"
          role="status"
        >
          {saveNotice}
        </p>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, idx) => (
          <Card
            key={idx}
            className="flex flex-col justify-between rounded-2xl border border-[#dfe5db] bg-white p-6 shadow-xs hover:shadow-md transition-all relative overflow-hidden"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#e9f4ea] text-brand-green">
                    {item.icon === "healthy-food" ? (
                      <UtensilsCrossed className="h-5 w-5" />
                    ) : item.icon === "education" ? (
                      <GraduationCap className="h-5 w-5" />
                    ) : (
                      <Sprout className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <h3 className="m-0 font-sans text-base font-bold text-brand-forest">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-0.5 mt-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-3 w-3 fill-[#e99c36] text-[#e99c36]"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <Badge className="bg-[#e9f2e4] text-brand-forest text-[10px] font-bold uppercase border-0">
                  {item.accent}
                </Badge>
              </div>

              <blockquote className="m-0 text-xs sm:text-sm leading-[1.7] text-brand-muted line-clamp-4 italic border-l-2 border-brand-green/30 pl-3">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
            </div>

            <div className="mt-6 pt-3 border-t border-[#edf2ea] flex items-center justify-between">
              <div>
                <cite className="not-italic text-xs font-bold text-brand-forest block">
                  {item.author}
                </cite>
                <span className="text-[10px] text-brand-green uppercase font-semibold">
                  Verified Contributor
                </span>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handleOpenEdit(item)}
                className="h-7 px-2.5 text-xs font-bold"
              >
                <Edit className="h-3 w-3 mr-1" /> Edit
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Edit Modal */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-xl bg-white p-6 sm:p-8 rounded-2xl border border-[#dfe5db] shadow-2xl">
          <DialogHeader className="border-b border-[#edf2ea] pb-3">
            <DialogTitle className="font-sans text-2xl font-bold text-brand-forest">
              {currentItem.author ? "Edit Testimonial" : "Add Testimonial"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-4 pt-2">
            {saveError && (
              <p
                className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
                role="alert"
              >
                {saveError}
              </p>
            )}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-forest mb-1">
                Story Title / Pillar *
              </label>
              <Input
                required
                value={currentItem.title || ""}
                onChange={(e) =>
                  setCurrentItem({ ...currentItem, title: e.target.value })
                }
                placeholder="e.g., Healthy Food, Farming, Child Education"
                className="rounded-xl border-[#d8e3d5]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-forest mb-1">
                Contributor / Author Name *
              </label>
              <Input
                required
                value={currentItem.author || ""}
                onChange={(e) =>
                  setCurrentItem({ ...currentItem, author: e.target.value })
                }
                placeholder="e.g., Joy Kauffman, Becky Vermilyea"
                className="rounded-xl border-[#d8e3d5]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-forest mb-1">
                  Accent Color
                </label>
                <select
                  value={currentItem.accent || "teal"}
                  onChange={(e) =>
                    setCurrentItem({ ...currentItem, accent: e.target.value })
                  }
                  className="w-full rounded-xl border border-[#d8e3d5] bg-white h-10 px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
                >
                  <option value="teal">Teal (Nutrition / Clean Water)</option>
                  <option value="orange">Orange (Farming & Harvest)</option>
                  <option value="gold">Gold (Child Education)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-forest mb-1">
                  Matching 360° Icon
                </label>
                <select
                  value={currentItem.icon || "farming"}
                  onChange={(e) =>
                    setCurrentItem({ ...currentItem, icon: e.target.value })
                  }
                  className="w-full rounded-xl border border-[#d8e3d5] bg-white h-10 px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
                >
                  <option value="farming">Sprout (Farming)</option>
                  <option value="healthy-food">Utensils (Cooking/Nutrition)</option>
                  <option value="education">Graduation Cap (Education)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-forest mb-1">
                Full Testimonial Quote *
              </label>
              <textarea
                required
                rows={5}
                value={currentItem.quote || ""}
                onChange={(e) =>
                  setCurrentItem({ ...currentItem, quote: e.target.value })
                }
                placeholder="Write the full authentic quote from the partner or volunteer..."
                className="w-full rounded-xl border border-[#d8e3d5] p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
              />
            </div>

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
                {isSaving ? "Saving..." : "Save Testimonial"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
