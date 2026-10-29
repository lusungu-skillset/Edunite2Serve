"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { UsersRound } from "lucide-react";
import type { TeamMember } from "@/data/team";

export default function TeamDirectory({ members }: { members: TeamMember[] }) {
  const [activeDepartment, setActiveDepartment] = useState("All");
  const departments = useMemo(
    () => Array.from(new Set(members.map((member) => member.department || "General"))),
    [members]
  );
  const filteredMembers =
    activeDepartment === "All"
      ? members
      : members.filter((member) => (member.department || "General") === activeDepartment);

  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto max-w-2xl text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#f1effa] text-brand-purple">
            <UsersRound aria-hidden="true" className="h-6 w-6" />
          </div>
          <p className="mb-2 mt-5 text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
            The people behind our work
          </p>
          <h1 className="m-0 font-sans text-4xl font-extrabold tracking-tight text-[#161a18] sm:text-5xl">
            Our Team
          </h1>
          <p className="mx-auto mb-0 mt-4 max-w-xl text-sm leading-7 text-brand-muted sm:text-base">
            Meet the people working across our programs and communities. Browse the team by
            department and area of service.
          </p>
        </header>

        {departments.length > 0 && (
          <div
            aria-label="Filter team by department"
            className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2"
          >
            {["All", ...departments].map((department) => {
              const selected = activeDepartment === department;
              return (
                <button
                  key={department}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActiveDepartment(department)}
                  className={`min-h-11 rounded-lg px-5 py-2.5 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 ${
                    selected
                      ? "bg-brand-forest text-white shadow-sm"
                      : "bg-[#f3f1fa] text-brand-purple hover:bg-[#e9e5f6]"
                  }`}
                >
                  {department}
                </button>
              );
            })}
          </div>
        )}

        {filteredMembers.length ? (
          <ul className="m-0 mt-12 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {filteredMembers.map((member) => (
              <li key={member.id || `${member.name}-${member.role}`}>
                <article className="group flex h-full min-h-60 flex-col items-center rounded-2xl border border-[#f0f0f1] bg-white px-5 py-7 text-center shadow-[0_10px_36px_rgba(20,30,24,0.055)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(20,30,24,0.11)]">
                  <div className="relative mb-4 grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-full bg-[#f1f3f0] ring-4 ring-[#f7f7f8]">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-xl font-extrabold text-brand-forest">
                        {member.initials}
                      </span>
                    )}
                  </div>
                  <h2 className="m-0 text-base font-bold text-[#202420]">{member.name}</h2>
                  <p className="mb-0 mt-1 text-sm leading-6 text-brand-muted">{member.role}</p>
                  {member.bio && (
                    <p className="mb-0 mt-3 line-clamp-3 text-xs leading-5 text-brand-muted/90">
                      {member.bio}
                    </p>
                  )}
                  <span className="mt-auto pt-4 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-green">
                    {member.department || "General"}
                  </span>
                </article>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mx-auto mt-12 max-w-lg rounded-2xl bg-[#f8faf7] px-6 py-10 text-center text-sm text-brand-muted">
            Team members will appear here as they are added.
          </p>
        )}
      </div>
    </section>
  );
}
