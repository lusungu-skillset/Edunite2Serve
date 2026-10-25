"use client";

import { useState } from "react";
import Image from "next/image";
import { Images, MapPin, PlusCircle, Trash2 } from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";
import { Card } from "@/components/ui/card";
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

const initialGallery = [
  {
    id: "g1",
    title: "Learners at Mangunda Adventist Primary School",
    category: "Child Education",
    location: "Thyolo, Malawi",
    image: "/images/featured-projects/mangunda-school.jpg",
    caption: "Standards 1–7 students gathering outside their classroom block.",
  },
  {
    id: "g2",
    title: "Organic Crop Cultivation at Lakeside Farm",
    category: "Sustainable Agriculture",
    location: "Malawi Adventist University & Surrounds",
    image: "/images/featured-projects/lakeside-farm.jpg",
    caption: "Bio-intensive farming initiative growing sustainable staple crops.",
  },
  {
    id: "g3",
    title: "FARM STEW Community Recognition & Training",
    category: "Healthcare & Nutrition",
    location: "Zomba District, Malawi",
    image: "/images/featured-projects/farmstew-international.jpg",
    caption: "Graduates receiving certificates after completing comprehensive training.",
  },
  {
    id: "g4",
    title: "Give-HOPE Malawi Community Care Gathering",
    category: "Community Care",
    location: "Southern Region, Malawi",
    image: "/images/featured-projects/give-hope-malawi.jpg",
    caption: "Volunteer coordinators and learners celebrating sponsorships.",
  },
  {
    id: "g5",
    title: "Community Church Construction",
    category: "Infrastructure",
    location: "Rural Malawi",
    image: "/images/featured-projects/church-construction.jpg",
    caption: "Local builders raising durable brick sanctuaries.",
  },
];

export default function AdminGalleryPage() {
  const [items, setItems] = useState(initialGallery);
  const [isEditing, setIsEditing] = useState(false);
  const [newItem, setNewItem] = useState({
    title: "",
    category: "Child Education",
    location: "Malawi",
    image: "",
    caption: "",
  });

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!newItem.title || !newItem.image) return;

    setItems([
      {
        id: "g-" + Date.now(),
        ...newItem,
      },
      ...items,
    ]);

    setIsEditing(false);
    setNewItem({
      title: "",
      category: "Child Education",
      location: "Malawi",
      image: "",
      caption: "",
    });
  }

  function handleDelete(id: string) {
    if (confirm("Delete this photo?")) {
      setItems(items.filter((i) => i.id !== id));
    }
  }

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="m-0 font-sans text-2xl sm:text-3xl font-bold text-brand-forest">
            Photo Gallery & Media
          </h1>
          <p className="m-0 text-sm text-brand-muted mt-1">
            Upload high-resolution field photography to Cloudinary and manage public gallery stories.
          </p>
        </div>

        <Button
          onClick={() => setIsEditing(true)}
          className="rounded-full bg-brand-green hover:bg-brand-forest text-white font-bold text-sm px-6 py-2.5 h-auto shadow-sm"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Upload New Photo
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Card
            key={item.id}
            className="group overflow-hidden rounded-2xl border border-[#dfe5db] bg-white p-0 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative h-52 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute left-3 top-3">
                  <Badge className="bg-brand-forest/90 text-brand-lime text-[11px] font-bold uppercase tracking-wider border-0 backdrop-blur-xs">
                    {item.category}
                  </Badge>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-green mb-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{item.location}</span>
                </div>
                <h3 className="m-0 font-sans text-base font-bold text-brand-forest leading-snug">
                  {item.title}
                </h3>
                <p className="m-0 mt-2 text-xs leading-[1.65] text-brand-muted line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </div>

            <div className="border-t border-[#edf2ea] p-3 px-5 bg-[#fafcfa] flex items-center justify-between">
              <span className="text-[11px] font-mono text-brand-muted truncate max-w-[200px]">
                {item.image}
              </span>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => handleDelete(item.id)}
                className="h-8 w-8 text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Upload Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-xl bg-white p-6 sm:p-8 rounded-2xl border border-[#dfe5db] shadow-2xl">
          <DialogHeader className="border-b border-[#edf2ea] pb-3">
            <DialogTitle className="font-sans text-2xl font-bold text-brand-forest">
              Upload New Photo to Cloudinary
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCreate} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-forest mb-1">
                Photo Title *
              </label>
              <Input
                required
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                placeholder="e.g., Primary Students Receiving Textbooks"
                className="rounded-xl border-[#d8e3d5]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-forest mb-1">
                  Category
                </label>
                <Input
                  value={newItem.category}
                  onChange={(e) =>
                    setNewItem({ ...newItem, category: e.target.value })
                  }
                  placeholder="e.g., Child Education"
                  className="rounded-xl border-[#d8e3d5]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-forest mb-1">
                  Location / District
                </label>
                <Input
                  value={newItem.location}
                  onChange={(e) =>
                    setNewItem({ ...newItem, location: e.target.value })
                  }
                  placeholder="e.g., Thyolo, Malawi"
                  className="rounded-xl border-[#d8e3d5]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-forest mb-1">
                Story Caption
              </label>
              <textarea
                rows={3}
                value={newItem.caption}
                onChange={(e) =>
                  setNewItem({ ...newItem, caption: e.target.value })
                }
                placeholder="Brief narrative context describing what is happening in the photo..."
                className="w-full rounded-xl border border-[#d8e3d5] p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
              />
            </div>

            {/* Cloudinary Image Uploader */}
            <ImageUploader
              value={newItem.image}
              onChange={(url) => setNewItem({ ...newItem, image: url })}
              folder="edunite2serve/gallery"
              label="Field Photo (Auto-optimized on Cloudinary)"
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
                disabled={!newItem.image || !newItem.title}
                className="bg-brand-green hover:bg-brand-forest text-white font-bold"
              >
                Save Photo
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
