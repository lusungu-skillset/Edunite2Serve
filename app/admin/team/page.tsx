"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Edit, PlusCircle, Trash2, Users2 } from "lucide-react";
import { deleteCmsTeamMember, getCmsTeam, saveCmsTeamMember, type CmsTeamMember } from "@/lib/cms";
import ImageUploader from "@/components/admin/ImageUploader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type TeamForm = {
  name: string;
  role: string;
  department: string;
  bio: string;
  image: string;
  is_published: boolean;
};

const emptyMember: TeamForm = {
  name: "",
  role: "",
  department: "General",
  bio: "",
  image: "",
  is_published: true,
};

function initialsFor(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function AdminTeamPage() {
  const [members, setMembers] = useState<CmsTeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMember, setCurrentMember] = useState<TeamForm>(emptyMember);
  const [editingMember, setEditingMember] = useState<CmsTeamMember | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    void loadMembers();
  }, []);

  async function loadMembers() {
    setIsLoading(true);
    setSaveError("");
    try {
      setMembers(await getCmsTeam());
    } catch (error) {
      setMembers([]);
      setSaveError(error instanceof Error ? error.message : "Unable to load team members. Please refresh and try again.");
    } finally {
      setIsLoading(false);
    }
  }

  function openCreate() {
    setEditingMember(null);
    setCurrentMember({ ...emptyMember });
    setSaveError("");
    setIsEditing(true);
  }

  function openEdit(member: CmsTeamMember) {
    setEditingMember(member);
    setCurrentMember({
      name: member.name,
      role: member.role,
      department: member.department || "General",
      bio: member.bio || "",
      image: member.image || "",
      is_published: member.is_published !== false,
    });
    setSaveError("");
    setIsEditing(true);
  }

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!currentMember.name.trim() || !currentMember.role.trim()) return;

    setIsSaving(true);
    setSaveError("");
    const member: CmsTeamMember = {
      ...currentMember,
      name: currentMember.name.trim(),
      role: currentMember.role.trim(),
      department: currentMember.department.trim() || "General",
      bio: currentMember.bio.trim(),
      initials: initialsFor(currentMember.name),
      order_index: editingMember?.order_index ?? members.length + 1,
      ...(editingMember?.id ? { id: editingMember.id } : {}),
    };

    try {
      const result = await saveCmsTeamMember(member, editingMember || undefined);
      if (!result.success) {
        setSaveError(result.error || "Unable to save this team member.");
        return;
      }
      await loadMembers();
      setIsEditing(false);
    } catch {
      setSaveError("Unable to save this team member. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(member: CmsTeamMember) {
    if (!confirm(`Remove ${member.name} from the team directory?`)) return;
    setSaveError("");
    try {
      const result = await deleteCmsTeamMember({ id: member.id, name: member.name });
      if (!result.success) {
        setSaveError(result.error || "Unable to remove this team member.");
        return;
      }
      await loadMembers();
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "Unable to remove this team member.");
    }
  }

  const groupedMembers = useMemo(() => {
    const groups = new Map<string, CmsTeamMember[]>();
    members.forEach((member) => {
      const department = member.department || "General";
      groups.set(department, [...(groups.get(department) || []), member]);
    });
    return Array.from(groups.entries());
  }, [members]);

  return (
    <div className="mx-auto max-w-[1400px] space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="m-0 font-sans text-2xl font-bold text-brand-forest sm:text-3xl">
            Team Members &amp; Roles
          </h1>
          <p className="m-0 mt-1 text-sm text-brand-muted">
            Manage staff details, department placement, profile photos, and visibility.
          </p>
        </div>
        <Button
          onClick={openCreate}
          className="h-auto rounded-full bg-brand-green px-6 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-brand-forest"
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Add Team Member
        </Button>
      </div>

      {saveError && !isEditing && (
        <p role="alert" className="m-0 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {saveError}
        </p>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <div key={item} className="h-48 animate-pulse rounded-2xl bg-white shadow-xs" />
          ))}
        </div>
      ) : members.length ? (
        <div className="space-y-8">
          {groupedMembers.map(([department, departmentMembers]) => (
            <section
              key={department}
              aria-labelledby={`team-${department.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
            >
              <div className="mb-3 flex items-center gap-2">
                <Users2 className="h-4 w-4 text-brand-green" />
                <h2
                  id={`team-${department.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  className="m-0 text-base font-bold text-brand-forest"
                >
                  {department}
                </h2>
                <span className="rounded-full bg-[#e9f2e4] px-2 py-0.5 text-[11px] font-bold text-brand-forest">
                  {departmentMembers.length}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {departmentMembers.map((member) => (
                  <Card
                    key={member.id || `${member.name}-${member.role}`}
                    className="flex flex-col justify-between rounded-2xl border border-[#dfe5db] bg-white p-5 shadow-xs transition-shadow hover:shadow-md"
                  >
                    <div>
                      <div className="mb-4 flex items-center gap-3.5">
                        <div className="relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full border border-[#dfe5db] bg-[#e8eee4]">
                          {member.image ? (
                            <Image src={member.image} alt={member.name} fill sizes="56px" className="object-cover" />
                          ) : (
                            <span className="font-sans text-base font-bold text-brand-forest">
                              {member.initials}
                            </span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <h3 className="m-0 truncate font-sans text-base font-bold text-brand-forest">
                            {member.name}
                          </h3>
                          <p className="m-0 mt-0.5 text-xs font-semibold uppercase tracking-wide text-brand-green">
                            {member.role}
                          </p>
                        </div>
                      </div>
                      <p className="m-0 min-h-10 text-xs leading-[1.7] text-brand-muted">
                        {member.bio || "No responsibilities added yet."}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-[#edf2ea] pt-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
                          member.is_published === false
                            ? "bg-amber-50 text-amber-800"
                            : "bg-[#e9f2e4] text-brand-forest"
                        }`}
                      >
                        {member.is_published === false ? "Hidden" : "Published"}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <Button variant="outline" size="sm" onClick={() => openEdit(member)} className="h-8 px-2.5 text-xs font-bold">
                          <Edit className="mr-1 h-3.5 w-3.5" /> Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label={`Remove ${member.name}`}
                          onClick={() => void handleDelete(member)}
                          className="h-8 w-8 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-[#cbd9c8] bg-white px-6 py-14 text-center">
          <Users2 className="mx-auto h-8 w-8 text-brand-green" />
          <h2 className="mb-0 mt-3 text-lg font-bold text-brand-forest">No team members yet</h2>
          <p className="mb-0 mt-1 text-sm text-brand-muted">Add your first staff profile to get started.</p>
        </div>
      )}

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-h-[90vh] max-w-[calc(100%-2rem)] overflow-y-auto rounded-2xl border border-[#dfe5db] bg-white p-5 shadow-2xl sm:max-w-xl sm:p-7">
          <DialogHeader className="border-b border-[#edf2ea] pb-3">
            <DialogTitle className="font-sans text-2xl font-bold text-brand-forest">
              {editingMember ? "Edit Team Member" : "Add Team Member"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-4 pt-2">
            <div>
              <label htmlFor="team-name" className="mb-1 block text-xs font-bold uppercase tracking-wider text-brand-forest">
                Full Name <span aria-hidden="true">*</span>
              </label>
              <Input
                id="team-name"
                required
                value={currentMember.name}
                onChange={(event) => setCurrentMember({ ...currentMember, name: event.target.value })}
                placeholder="e.g., Grey Sagawa"
                className="rounded-xl border-[#d8e3d5]"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="team-role" className="mb-1 block text-xs font-bold uppercase tracking-wider text-brand-forest">
                  Role / Title <span aria-hidden="true">*</span>
                </label>
                <Input
                  id="team-role"
                  required
                  value={currentMember.role}
                  onChange={(event) => setCurrentMember({ ...currentMember, role: event.target.value })}
                  placeholder="e.g., Operations Lead"
                  className="rounded-xl border-[#d8e3d5]"
                />
              </div>
              <div>
                <label htmlFor="team-department" className="mb-1 block text-xs font-bold uppercase tracking-wider text-brand-forest">
                  Department / Team
                </label>
                <Input
                  id="team-department"
                  list="team-department-options"
                  value={currentMember.department}
                  onChange={(event) => setCurrentMember({ ...currentMember, department: event.target.value })}
                  placeholder="e.g., FARM STEW"
                  className="rounded-xl border-[#d8e3d5]"
                />
                <datalist id="team-department-options">
                  {Array.from(new Set(members.map((member) => member.department || "General"))).map((department) => (
                    <option key={department} value={department} />
                  ))}
                </datalist>
              </div>
            </div>

            <ImageUploader
              value={currentMember.image}
              onChange={(image) => setCurrentMember((member) => ({ ...member, image }))}
              folder="edunite2serve/team"
              label="Profile Photo"
            />

            <div>
              <label htmlFor="team-bio" className="mb-1 block text-xs font-bold uppercase tracking-wider text-brand-forest">
                Bio / Responsibilities
              </label>
              <textarea
                id="team-bio"
                rows={4}
                value={currentMember.bio}
                onChange={(event) => setCurrentMember({ ...currentMember, bio: event.target.value })}
                placeholder="Describe this person's responsibilities and work."
                className="w-full rounded-xl border border-[#d8e3d5] p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
              />
            </div>

            <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-brand-forest">
              <input
                type="checkbox"
                checked={currentMember.is_published}
                onChange={(event) => setCurrentMember({ ...currentMember, is_published: event.target.checked })}
                className="h-4 w-4 accent-brand-green"
              />
              Show this profile on the public team page
            </label>

            {saveError && (
              <p role="alert" className="m-0 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                {saveError}
              </p>
            )}

            <DialogFooter className="flex flex-row items-center justify-end gap-3 border-t border-[#edf2ea] pt-4">
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)} disabled={isSaving}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving} className="bg-brand-green font-bold text-white hover:bg-brand-forest">
                {isSaving ? "Saving…" : "Save Member"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
