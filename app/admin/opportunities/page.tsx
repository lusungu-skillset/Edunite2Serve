"use client";

import { useState } from "react";
import { Edit, HeartHandshake, PlusCircle, Trash2 } from "lucide-react";
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

const initialRoles = [
  {
    id: "o1",
    title: "Primary School Teacher & Mentor",
    type: "volunteer",
    category: "Child Education",
    location: "Mangunda Primary School, Thyolo",
    description: "Support standard 1-7 learners in literacy, numeracy, creative arts, and spiritual growth.",
    status: "Actively Recruiting",
  },
  {
    id: "o2",
    title: "Organic Farm & Orchard Assistant",
    type: "volunteer",
    category: "Sustainable Agriculture",
    location: "Lakeside Farm & Kamwisa Orchard",
    description: "Work alongside community farmers in bio-intensive crop management, fruit tree planting, and soil care.",
    status: "Actively Recruiting",
  },
  {
    id: "o3",
    title: "Community Nutrition Workshop Facilitator",
    type: "volunteer",
    category: "Health & Nutrition",
    location: "Zomba, Dedza & Local Centers",
    description: "Facilitate hands-on plant-based cooking classes with Becky Vermilyea and FARM STEW modules.",
    status: "Actively Recruiting",
  },
  {
    id: "o4",
    title: "Student Academic Attachments",
    type: "internship",
    category: "University Programs",
    location: "Regional Hubs",
    description: "Structured learning attachments in community public health, agronomy, and education.",
    status: "Cohort Open Inquiries",
  },
];

export default function AdminOpportunitiesPage() {
  const [roles, setRoles] = useState(initialRoles);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRole, setCurrentRole] = useState<any>({
    title: "",
    type: "volunteer",
    category: "Child Education",
    location: "Malawi",
    description: "",
    status: "Actively Recruiting",
  });

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!currentRole.title) return;

    if (currentRole.id) {
      setRoles(roles.map((r) => (r.id === currentRole.id ? currentRole : r)));
    } else {
      setRoles([{ ...currentRole, id: "o-" + Date.now() }, ...roles]);
    }
    setIsEditing(false);
  }

  function handleDelete(id: string) {
    if (confirm("Remove this opportunity?")) {
      setRoles(roles.filter((r) => r.id !== id));
    }
  }

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="m-0 font-sans text-2xl sm:text-3xl font-bold text-brand-forest">
            Opportunities & Openings
          </h1>
          <p className="m-0 text-sm text-brand-muted mt-1">
            Manage volunteer roles, internship placement tracks, and vacancy notices.
          </p>
        </div>

        <Button
          onClick={() => {
            setCurrentRole({
              title: "",
              type: "volunteer",
              category: "Child Education",
              location: "Thyolo, Malawi",
              description: "",
              status: "Actively Recruiting",
            });
            setIsEditing(true);
          }}
          className="rounded-full bg-brand-green hover:bg-brand-forest text-white font-bold text-sm px-6 py-2.5 h-auto shadow-sm"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Opportunity
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roles.map((role) => (
          <Card
            key={role.id}
            className="flex flex-col justify-between rounded-2xl border border-[#dfe5db] bg-white p-6 shadow-xs hover:shadow-md transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <Badge className="bg-[#e9f2e4] text-brand-forest font-bold text-[11px] uppercase border-0">
                  {role.category}
                </Badge>
                <span className="text-xs font-bold text-brand-green">
                  {role.status}
                </span>
              </div>

              <h3 className="m-0 font-sans text-lg font-bold text-brand-forest leading-snug">
                {role.title}
              </h3>
              <p className="m-0 text-xs font-semibold text-brand-muted mt-1 mb-2.5">
                {role.location} • Type: <span className="uppercase text-brand-forest font-bold">{role.type}</span>
              </p>

              <CardContent className="p-0">
                <p className="m-0 text-xs leading-[1.65] text-brand-muted">
                  {role.description}
                </p>
              </CardContent>
            </div>

            <div className="mt-5 pt-3 border-t border-[#edf2ea] flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setCurrentRole(role);
                  setIsEditing(true);
                }}
                className="h-8 px-3 text-xs font-bold"
              >
                <Edit className="h-3.5 w-3.5 mr-1" /> Edit
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => handleDelete(role.id)}
                className="h-8 w-8 text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-xl bg-white p-6 sm:p-8 rounded-2xl border border-[#dfe5db] shadow-2xl">
          <DialogHeader className="border-b border-[#edf2ea] pb-3">
            <DialogTitle className="font-sans text-2xl font-bold text-brand-forest">
              {currentRole.id ? "Edit Opportunity" : "Add Opportunity"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-forest mb-1">
                Role Title *
              </label>
              <Input
                required
                value={currentRole.title}
                onChange={(e) =>
                  setCurrentRole({ ...currentRole, title: e.target.value })
                }
                placeholder="e.g., Primary School Teacher & Mentor"
                className="rounded-xl border-[#d8e3d5]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-forest mb-1">
                  Type
                </label>
                <select
                  value={currentRole.type}
                  onChange={(e) =>
                    setCurrentRole({ ...currentRole, type: e.target.value })
                  }
                  className="w-full rounded-xl border border-[#d8e3d5] bg-white h-10 px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
                >
                  <option value="volunteer">Volunteer</option>
                  <option value="internship">Internship</option>
                  <option value="vacancy">Vacancy</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-forest mb-1">
                  Category
                </label>
                <Input
                  value={currentRole.category}
                  onChange={(e) =>
                    setCurrentRole({ ...currentRole, category: e.target.value })
                  }
                  placeholder="e.g., Child Education"
                  className="rounded-xl border-[#d8e3d5]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-forest mb-1">
                Location
              </label>
              <Input
                value={currentRole.location}
                onChange={(e) =>
                  setCurrentRole({ ...currentRole, location: e.target.value })
                }
                placeholder="e.g., Mangunda Primary, Thyolo"
                className="rounded-xl border-[#d8e3d5]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-forest mb-1">
                Description
              </label>
              <textarea
                rows={4}
                value={currentRole.description}
                onChange={(e) =>
                  setCurrentRole({ ...currentRole, description: e.target.value })
                }
                placeholder="Responsibilities, focus areas, and requirements..."
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
                className="bg-brand-green hover:bg-brand-forest text-white font-bold"
              >
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
