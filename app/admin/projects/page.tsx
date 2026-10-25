"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Edit,
  FolderKanban,
  MapPin,
  PlusCircle,
  Search,
  Trash2,
  CheckCircle2,
} from "lucide-react";
import { getCmsProjects, saveCmsProject, deleteCmsProject } from "@/lib/cms";
import { type Project } from "@/data/projects";
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

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<Project>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    const data = await getCmsProjects();
    setProjects(data);
  }

  function handleOpenCreate() {
    setCurrentProject({
      slug: "",
      title: "",
      category: "Sustainable Farming",
      location: "",
      description: "",
      highlight: "",
      image: "/images/featured-projects/lakeside-farm.jpg",
      imageAlt: "",
      impactMetrics: "",
    });
    setIsEditing(true);
  }

  function handleOpenEdit(project: Project) {
    setCurrentProject({ ...project });
    setIsEditing(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!currentProject.title || !currentProject.description) return;

    setIsSaving(true);
    const slug =
      currentProject.slug ||
      currentProject.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    const payload: Project = {
      slug,
      title: currentProject.title || "Untitled Project",
      category: currentProject.category || "Community Care",
      location: currentProject.location || "Malawi",
      description: currentProject.description || "",
      highlight: currentProject.highlight || "",
      image: currentProject.image || "/images/featured-projects/lakeside-farm.jpg",
      imageAlt: currentProject.imageAlt || currentProject.title || "",
      impactMetrics: currentProject.impactMetrics || "",
    };

    await saveCmsProject(payload);
    await loadProjects();
    setIsSaving(false);
    setIsEditing(false);
  }

  async function handleDelete(slug: string) {
    if (confirm("Are you sure you want to remove this project?")) {
      await deleteCmsProject(slug);
      await loadProjects();
    }
  }

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="m-0 font-sans text-2xl sm:text-3xl font-bold text-brand-forest">
            Community Projects
          </h1>
          <p className="m-0 text-sm text-brand-muted mt-1">
            Manage grassroots educational, agricultural, and community initiatives in Malawi.
          </p>
        </div>

        <Button
          onClick={handleOpenCreate}
          className="rounded-full bg-brand-green hover:bg-brand-forest text-white font-bold text-sm px-6 py-2.5 h-auto shadow-sm"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add New Project
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-muted/60" />
        <Input
          placeholder="Filter projects by title, category, or district..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 bg-white border-[#d8e3d5] rounded-full text-sm h-10"
        />
      </div>

      {/* Projects Table / Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project) => (
          <Card
            key={project.slug}
            className="flex flex-col justify-between overflow-hidden rounded-2xl border border-[#dfe5db] bg-white p-0 shadow-xs hover:shadow-md transition-all"
          >
            <div>
              <div className="relative h-44 w-full bg-slate-100">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  className="object-cover"
                />
                <div className="absolute left-3 top-3">
                  <Badge className="bg-brand-forest text-brand-lime text-[11px] font-bold uppercase tracking-wider border-0 px-2.5 py-0.5">
                    {project.category}
                  </Badge>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-green mb-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  <span className="truncate">{project.location}</span>
                </div>

                <h3 className="m-0 font-sans text-lg font-bold text-brand-forest leading-snug line-clamp-1">
                  {project.title}
                </h3>

                <p className="m-0 mt-2 text-xs leading-[1.65] text-brand-muted line-clamp-3">
                  {project.description}
                </p>

                {project.highlight && (
                  <div className="mt-3 rounded-lg bg-[#f4f7f1] p-2 text-[11px] font-semibold text-brand-forest border border-[#e4ede1]">
                    ✦ {project.highlight}
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-[#edf2ea] p-4 bg-[#fafcfa] flex items-center justify-between">
              <span className="text-xs font-mono text-brand-muted truncate max-w-[150px]">
                /{project.slug}
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenEdit(project)}
                  className="h-8 px-3 text-xs font-bold"
                >
                  <Edit className="h-3.5 w-3.5 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => handleDelete(project.slug)}
                  className="h-8 w-8 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Create / Edit Project Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-2xl bg-white p-6 sm:p-8 rounded-2xl border border-[#dfe5db] shadow-2xl overflow-y-auto max-h-[90vh]">
          <DialogHeader className="border-b border-[#edf2ea] pb-4">
            <DialogTitle className="font-sans text-2xl font-bold text-brand-forest">
              {currentProject.slug ? "Edit Community Project" : "Add New Community Project"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-forest mb-1">
                Project Title *
              </label>
              <Input
                required
                value={currentProject.title || ""}
                onChange={(e) =>
                  setCurrentProject({ ...currentProject, title: e.target.value })
                }
                placeholder="e.g., Lake Side Edunite2Serve Farm"
                className="rounded-xl border-[#d8e3d5]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-forest mb-1">
                  Category
                </label>
                <Input
                  value={currentProject.category || ""}
                  onChange={(e) =>
                    setCurrentProject({ ...currentProject, category: e.target.value })
                  }
                  placeholder="e.g., Sustainable Farming, Child Education"
                  className="rounded-xl border-[#d8e3d5]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-forest mb-1">
                  Location / District
                </label>
                <Input
                  value={currentProject.location || ""}
                  onChange={(e) =>
                    setCurrentProject({ ...currentProject, location: e.target.value })
                  }
                  placeholder="e.g., Thyolo, Malawi"
                  className="rounded-xl border-[#d8e3d5]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-forest mb-1">
                Project Description *
              </label>
              <textarea
                required
                rows={4}
                value={currentProject.description || ""}
                onChange={(e) =>
                  setCurrentProject({ ...currentProject, description: e.target.value })
                }
                placeholder="Describe the initiative, beneficiaries, and long-term goals..."
                className="w-full rounded-xl border border-[#d8e3d5] p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-forest mb-1">
                  Highlight Text
                </label>
                <Input
                  value={currentProject.highlight || ""}
                  onChange={(e) =>
                    setCurrentProject({ ...currentProject, highlight: e.target.value })
                  }
                  placeholder="e.g., 200+ learners supported"
                  className="rounded-xl border-[#d8e3d5]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-forest mb-1">
                  Impact Metrics
                </label>
                <Input
                  value={currentProject.impactMetrics || ""}
                  onChange={(e) =>
                    setCurrentProject({
                      ...currentProject,
                      impactMetrics: e.target.value,
                    })
                  }
                  placeholder="e.g., 10+ acres cultivated"
                  className="rounded-xl border-[#d8e3d5]"
                />
              </div>
            </div>

            {/* Cloudinary Image Uploader */}
            <ImageUploader
              value={currentProject.image || ""}
              onChange={(url) =>
                setCurrentProject({ ...currentProject, image: url })
              }
              folder="edunite2serve/projects"
              label="Project Feature Image (Cloudinary CDN)"
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
                {isSaving ? "Saving to Supabase..." : "Save Project"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
