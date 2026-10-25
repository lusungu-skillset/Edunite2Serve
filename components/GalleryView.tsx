"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, MapPin, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { donationUrl } from "@/data/navigation";

export type GalleryItem = {
  id: string;
  title: string;
  category: string;
  location: string;
  image: string;
  caption: string;
};

const galleryData: GalleryItem[] = [
  {
    id: "mangunda-learners",
    title: "Learners at Mangunda Adventist Primary School",
    category: "Child Education",
    location: "Thyolo, Malawi",
    image: "/images/featured-projects/mangunda-school.jpg",
    caption:
      "Standards 1–7 students gathering outside their classroom block. Edunite2Serve supports learning resources, classroom rehabilitation, and daily nutrition.",
  },
  {
    id: "lakeside-crops",
    title: "Organic Crop Cultivation at Lakeside Farm",
    category: "Sustainable Agriculture",
    location: "Malawi Adventist University & Surrounds",
    image: "/images/featured-projects/lakeside-farm.jpg",
    caption:
      "Bio-intensive farming initiative growing sustainable staple crops to support under-resourced students and surrounding vulnerable households.",
  },
  {
    id: "farmstew-training",
    title: "FARM STEW Community Recognition & Training",
    category: "Healthcare & Nutrition",
    location: "Zomba District, Malawi",
    image: "/images/featured-projects/farmstew-international.jpg",
    caption:
      "Graduates receiving certificates after completing comprehensive training in sanitation, plant-based nutrition, organic gardening, and micro-enterprise.",
  },
  {
    id: "give-hope-assembly",
    title: "Give-HOPE Malawi Community Care Gathering",
    category: "Community Care",
    location: "Southern Region, Malawi",
    image: "/images/featured-projects/give-hope-malawi.jpg",
    caption:
      "Volunteer coordinators and learners celebrating educational sponsorships and spiritual mentorship across the 15 Give-HOPE community projects.",
  },
  {
    id: "church-build",
    title: "Community Church & Assembly Construction",
    category: "Infrastructure",
    location: "Rural Malawi",
    image: "/images/featured-projects/church-construction.jpg",
    caption:
      "Local builders raising durable brick sanctuaries that double as emergency community aid shelters and youth education centers.",
  },
  {
    id: "classroom-learning",
    title: "Interactive Classroom Study Sessions",
    category: "Child Education",
    location: "Mangunda School, Thyolo",
    image: "/images/community-story/classroom-learners.png",
    caption:
      "Students actively participating in lessons, benefiting from donated textbooks, writing supplies, and volunteer teaching support.",
  },
  {
    id: "community-visit",
    title: "Field Assessment & Family Care Visits",
    category: "Community Care",
    location: "Dedza & Rural Communities",
    image: "/images/community-story/community-visit.jpg",
    caption:
      "Edunite2Serve volunteer leaders conducting grassroots home visits to assess nutritional, educational, and clean water needs.",
  },
  {
    id: "education-volunteers",
    title: "Volunteer Teachers & Mentors in Action",
    category: "Child Education",
    location: "Thyolo District, Malawi",
    image: "/images/how-we-serve/education-volunteers.jpg",
    caption:
      "Dedicated volunteers working alongside local teachers to enrich literacy, numeracy, and character development programs.",
  },
  {
    id: "community-service-outreach",
    title: "Hands-on Community Service & Welfare Outreach",
    category: "Community Care",
    location: "Dedza, Malawi",
    image: "/images/how-we-serve/community-service.jpg",
    caption:
      "Mobilizing practical humanitarian assistance, hygiene kits, and emergency food supplies to vulnerable widows and families.",
  },
];

const categories = [
  "All",
  "Child Education",
  "Sustainable Agriculture",
  "Healthcare & Nutrition",
  "Community Care",
  "Infrastructure",
];

export default function GalleryView({ items }: { items?: GalleryItem[] } = {}) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const activeGalleryData = items && items.length > 0 ? items : galleryData;

  const filteredItems = useMemo(() => {
    if (selectedCategory === "All") return activeGalleryData;
    return activeGalleryData.filter(
      (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [selectedCategory, activeGalleryData]);

  return (
    <div>
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              selectedCategory === cat
                ? "bg-brand-forest text-brand-lime shadow-xs"
                : "bg-white text-brand-muted hover:bg-[#ebf2e7] hover:text-brand-forest border border-[#d8e3d5]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {filteredItems.map((item) => (
          <Card
            key={item.id}
            onClick={() => setActiveItem(item)}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-[#dfe5db] bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative h-[260px] w-full overflow-hidden bg-slate-100">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute left-4 top-4">
                <Badge className="bg-brand-forest/90 text-brand-lime text-xs font-bold uppercase tracking-wider backdrop-blur-xs border-0 px-3 py-1">
                  {item.category}
                </Badge>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-1 text-[11px] font-semibold text-brand-lime mb-1">
                  <MapPin className="h-3 w-3" />
                  <span>{item.location}</span>
                </div>
                <h3 className="m-0 font-sans text-lg font-bold leading-snug line-clamp-2">
                  {item.title}
                </h3>
              </div>

              <div className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-white/20 text-white backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="h-4 w-4" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Lightbox Modal */}
      <Dialog
        open={activeItem !== null}
        onOpenChange={(isOpen) => {
          if (!isOpen) setActiveItem(null);
        }}
      >
        <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-2xl md:max-w-3xl bg-white p-6 sm:p-8 rounded-2xl border border-[#dfe5db] shadow-2xl overflow-y-auto max-h-[90vh]">
          {activeItem && (
            <div className="space-y-5">
              <div className="flex items-start justify-between gap-4 border-b border-[#edf2ea] pb-3">
                <div>
                  <Badge className="bg-brand-forest text-brand-lime text-xs font-bold uppercase tracking-wider border-0 mb-2">
                    {activeItem.category}
                  </Badge>
                  <DialogTitle className="m-0 font-sans text-2xl font-bold text-brand-forest">
                    {activeItem.title}
                  </DialogTitle>
                  <p className="m-0 mt-1 flex items-center gap-1 text-xs font-semibold text-brand-green">
                    <MapPin className="h-3.5 w-3.5" />
                    {activeItem.location}
                  </p>
                </div>
              </div>

              <div className="relative h-[320px] sm:h-[400px] w-full overflow-hidden rounded-xl bg-slate-100">
                <Image
                  src={activeItem.image}
                  alt={activeItem.title}
                  fill
                  className="object-cover"
                />
              </div>

              <DialogDescription className="text-base leading-[1.75] text-[#24352a] font-normal">
                {activeItem.caption}
              </DialogDescription>

              <DialogFooter className="mt-4 pt-3 border-t border-[#edf2ea] bg-transparent flex flex-row items-center justify-end gap-3 -mx-0 -mb-0">
                <Button
                  variant="outline"
                  onClick={() => setActiveItem(null)}
                  className="rounded-xl px-5"
                >
                  Close
                </Button>
                <Button
                  className="rounded-xl bg-brand-green hover:bg-brand-forest text-white font-bold px-6 border-0"
                  render={<Link href={donationUrl} />}
                >
                  Support This Project →
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
