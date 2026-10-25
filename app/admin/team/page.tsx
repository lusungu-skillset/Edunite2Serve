"use client";

import { useState } from "react";
import { Edit, PlusCircle, Trash2, Users2 } from "lucide-react";
import { aboutContent } from "@/data/about";
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

export default function AdminTeamPage() {
  const [members, setMembers] = useState([...aboutContent.leadership]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMember, setCurrentMember] = useState({
    name: "",
    role: "",
    bio: "",
    initials: "",
  });

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!currentMember.name || !currentMember.role) return;

    const initials =
      currentMember.initials ||
      currentMember.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    const existingIndex = members.findIndex((m) => m.name === currentMember.name);
    if (existingIndex >= 0) {
      const updated = [...members];
      updated[existingIndex] = { ...currentMember, initials };
      setMembers(updated);
    } else {
      setMembers([{ ...currentMember, initials }, ...members]);
    }

    setIsEditing(false);
  }

  function handleDelete(name: string) {
    if (confirm(`Remove ${name} from leadership directory?`)) {
      setMembers(members.filter((m) => m.name !== name));
    }
  }

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="m-0 font-sans text-2xl sm:text-3xl font-bold text-brand-forest">
            Leadership & Field Coordinators
          </h1>
          <p className="m-0 text-sm text-brand-muted mt-1">
            Manage directors, field project leaders, and verified contributors.
          </p>
        </div>

        <Button
          onClick={() => {
            setCurrentMember({ name: "", role: "", bio: "", initials: "" });
            setIsEditing(true);
          }}
          className="rounded-full bg-brand-green hover:bg-brand-forest text-white font-bold text-sm px-6 py-2.5 h-auto shadow-sm"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Team Member
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <Card
            key={member.name}
            className="flex flex-col justify-between rounded-2xl border border-[#dfe5db] bg-white p-6 shadow-xs hover:shadow-md transition-all"
          >
            <div>
              <div className="flex items-center gap-3.5 mb-4">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-forest text-brand-lime font-brand text-lg font-bold">
                  {member.initials}
                </div>
                <div>
                  <h3 className="m-0 font-sans text-lg font-bold text-brand-forest">
                    {member.name}
                  </h3>
                  <p className="m-0 text-xs font-semibold text-brand-green uppercase tracking-wide">
                    {member.role}
                  </p>
                </div>
              </div>

              <CardContent className="p-0">
                <p className="m-0 text-xs leading-[1.7] text-brand-muted">
                  {member.bio}
                </p>
              </CardContent>
            </div>

            <div className="mt-5 pt-3 border-t border-[#edf2ea] flex items-center justify-between">
              <span className="text-[11px] font-semibold text-brand-forest bg-[#e9f2e4] px-2.5 py-0.5 rounded-full">
                Active Leader
              </span>
              <div className="flex items-center gap-1.5">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setCurrentMember(member);
                    setIsEditing(true);
                  }}
                  className="h-7 px-2.5 text-xs font-bold"
                >
                  <Edit className="h-3 w-3 mr-1" /> Edit
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => handleDelete(member.name)}
                  className="h-7 w-7 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-xl bg-white p-6 sm:p-8 rounded-2xl border border-[#dfe5db] shadow-2xl">
          <DialogHeader className="border-b border-[#edf2ea] pb-3">
            <DialogTitle className="font-sans text-2xl font-bold text-brand-forest">
              {currentMember.name ? "Edit Team Member" : "Add Team Member"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-forest mb-1">
                Full Name *
              </label>
              <Input
                required
                value={currentMember.name}
                onChange={(e) =>
                  setCurrentMember({ ...currentMember, name: e.target.value })
                }
                placeholder="e.g., Grey Sagawa"
                className="rounded-xl border-[#d8e3d5]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-forest mb-1">
                Role / Title *
              </label>
              <Input
                required
                value={currentMember.role}
                onChange={(e) =>
                  setCurrentMember({ ...currentMember, role: e.target.value })
                }
                placeholder="e.g., Chief Executive Officer (CEO)"
                className="rounded-xl border-[#d8e3d5]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-forest mb-1">
                Bio / Responsibilities
              </label>
              <textarea
                rows={4}
                value={currentMember.bio}
                onChange={(e) =>
                  setCurrentMember({ ...currentMember, bio: e.target.value })
                }
                placeholder="Describe leadership responsibilities and mission achievements..."
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
                Save Member
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
