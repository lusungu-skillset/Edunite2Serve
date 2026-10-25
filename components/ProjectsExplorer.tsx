"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Search } from "lucide-react";
import { projectDirectory, type Project } from "@/data/projects";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { donationUrl } from "@/data/navigation";

const categories = [
  "All",
  "Child Education",
  "Sustainable Farming",
  "Community Care",
  "Food Access",
  "Community Infrastructure",
  "Healthy Living",
];

export default function ProjectsExplorer({
  projects = projectDirectory,
}: {
  projects?: readonly Project[];
} = {}) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" ||
        project.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesSearch =
        searchQuery.trim() === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <div>
      {/* Category Pills & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-8 sm:mb-10">
        <div className="flex overflow-x-auto no-scrollbar pb-1 sm:flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map((cat) => (
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
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-white border-[#d8e3d5] rounded-full text-sm h-10 focus-visible:ring-brand-green"
          />
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#ccd8ca] bg-white p-12 text-center">
          <p className="text-base text-brand-muted m-0">
            No projects found matching your search. Try adjusting the category or search keywords.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="mt-4 rounded-full"
          >
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {filteredProjects.map((project) => (
            <Card
              key={project.slug}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#dfe5db] bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div>
                <div className="relative h-[220px] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4">
                    <Badge className="bg-brand-forest/90 text-brand-lime text-xs font-bold uppercase tracking-wider backdrop-blur-xs border-0 px-3 py-1">
                      {project.category}
                    </Badge>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-green mb-2">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    <span className="line-clamp-1">{project.location}</span>
                  </div>

                  <h3 className="m-0 font-sans text-xl font-bold leading-tight text-brand-forest group-hover:text-brand-green transition-colors">
                    {project.title}
                  </h3>

                  <CardContent className="p-0 mt-3">
                    <p className="m-0 text-sm leading-[1.7] text-brand-muted line-clamp-3">
                      {project.description}
                    </p>
                  </CardContent>

                  {project.highlight && (
                    <div className="mt-4 rounded-xl bg-[#f5f8f2] p-3 text-xs font-semibold text-brand-forest border border-[#e4ede1]">
                      ✦ {project.highlight}
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-[#edf2ea] p-4 px-6 bg-[#fafcfa] flex items-center justify-between">
                <span className="text-xs font-bold text-brand-green">
                  Active Mission
                </span>
                <Button
                  className="rounded-full bg-brand-green hover:bg-brand-forest text-white font-bold text-xs px-4 py-1.5 h-auto"
                  render={<Link href={donationUrl} />}
                >
                  Support Project
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
