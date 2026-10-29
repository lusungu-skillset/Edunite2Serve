import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TeamDirectory from "@/components/TeamDirectory";
import type { TeamMember } from "@/lib/team";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet Edunite2Serve's staff leaders, program leads, and team members across Malawi.",
};

function describeTeamLoadError(error: unknown) {
  if (error instanceof Error) {
    return { name: error.name, message: error.message };
  }

  if (typeof error === "object" && error !== null) {
    const details = error as {
      code?: unknown;
      message?: unknown;
      details?: unknown;
      hint?: unknown;
    };
    return {
      code: details.code,
      message: details.message || "Unknown database error",
      details: details.details,
      hint: details.hint,
    };
  }

  return { message: String(error) };
}

async function getPublicTeamMembers(): Promise<TeamMember[]> {
  try {
    const supabase = await createClient();
    if (!supabase) return [];

    const { data, error } = await supabase
      .from("team_members")
      .select("id, name, role, bio, initials, image, department, order_index, is_published")
      .eq("is_published", true)
      .order("order_index", { ascending: true });

    if (error?.code === "42703") {
      // Older databases have only the original columns. Keep existing real
      // rows visible until the team-directory migration has been applied.
      const { data: legacyData, error: legacyError } = await supabase
        .from("team_members")
        .select("id, name, role, bio, initials, order_index")
        .order("order_index", { ascending: true });

      if (legacyError) throw legacyError;

      return (legacyData || []).map((member) => ({
        ...member,
        image: undefined,
        department: "General",
        is_published: true,
      })) as TeamMember[];
    }

    if (error) throw error;

    return (data || []) as TeamMember[];
  } catch (error) {
    console.error("Unable to load public team members:", describeTeamLoadError(error));
    return [];
  }
}

async function TeamFeed() {
  const members = await getPublicTeamMembers();
  return <TeamDirectory members={members} />;
}

function TeamLoading() {
  return (
    <section aria-label="Loading team members" className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <div className="h-14 w-14 animate-pulse rounded-full bg-[#f1effa]" />
          <div className="mt-5 h-3 w-40 animate-pulse rounded bg-[#e9eee7]" />
          <div className="mt-4 h-10 w-56 animate-pulse rounded bg-[#edf1eb]" />
          <div className="mt-4 h-4 w-full max-w-md animate-pulse rounded bg-[#f1f3f0]" />
        </div>
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }, (_, index) => (
            <div key={index} className="flex min-h-60 animate-pulse flex-col items-center rounded-2xl border border-[#f0f0f1] bg-white px-5 py-7 shadow-sm">
              <div className="h-20 w-20 rounded-full bg-[#f1f3f0]" />
              <div className="mt-5 h-4 w-32 rounded bg-[#edf1eb]" />
              <div className="mt-3 h-3 w-24 rounded bg-[#f1f3f0]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function TeamPage() {

  return (
    <>
      <Suspense fallback={<TeamLoading />}>
        <TeamFeed />
      </Suspense>

      <section className="bg-brand-cream px-4 py-16 text-center sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
            Contact
          </p>
          <h2 className="m-0 font-sans text-3xl font-extrabold text-brand-forest sm:text-4xl">
            Get in touch with our team
          </h2>
          <p className="mb-0 mt-4 text-sm leading-7 text-brand-muted sm:text-base">
            Contact Edunite2Serve for questions about our people, programs, and work in Malawi.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button
              className="h-auto rounded-full bg-brand-green px-7 py-3 font-bold text-white shadow-sm hover:bg-brand-forest"
              render={<Link href="/contact" />}
            >
              Contact the Team <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              className="h-auto rounded-full border border-[#cbd9c8] bg-white px-7 py-3 font-bold text-brand-forest hover:bg-[#f5f8f2]"
              render={<Link href="/about-us" />}
              variant="outline"
            >
              About Us
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
