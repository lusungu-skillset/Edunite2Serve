"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FolderKanban,
  Newspaper,
  MessageSquareQuote,
  Images,
  MailQuestion,
  Users2,
} from "lucide-react";
import { getCmsStats, getCmsProjects, getCmsArticles } from "@/lib/cms";
import { type Project } from "@/data/projects";
import { type Article } from "@/data/articles";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalArticles: 0,
    totalTestimonials: 0,
    totalGalleryItems: 0,
    totalTeamMembers: 0,
    unreadInquiries: 0,
  });
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [recentArticles, setRecentArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [s, p, a] = await Promise.all([
          getCmsStats(),
          getCmsProjects(),
          getCmsArticles(),
        ]);
        setStats(s);
        setRecentProjects(p.slice(0, 4));
        setRecentArticles(a.slice(0, 4));
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const statCards = [
    {
      label: "Projects",
      value: stats.totalProjects,
      sub: "Active",
      icon: FolderKanban,
      href: "/admin/projects",
    },
    {
      label: "News & Blogs",
      value: stats.totalArticles,
      sub: "Published",
      icon: Newspaper,
      href: "/admin/news",
    },
    {
      label: "Testimonials",
      value: stats.totalTestimonials,
      sub: "Live",
      icon: MessageSquareQuote,
      href: "/admin/testimonials",
    },
    {
      label: "Gallery",
      value: stats.totalGalleryItems,
      sub: "Photos",
      icon: Images,
      href: "/admin/gallery",
    },
    {
      label: "Team Members",
      value: stats.totalTeamMembers,
      sub: "Listed",
      icon: Users2,
      href: "/admin/team",
    },
    {
      label: "Inquiries",
      value: stats.unreadInquiries,
      sub: "Unread",
      icon: MailQuestion,
      href: "/admin/inquiries",
      alert: stats.unreadInquiries > 0,
    },
  ];

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto">
      {/* Page heading */}
      <div>
        <h1 className="m-0 font-sans text-2xl font-bold text-brand-forest">Overview</h1>
        <p className="mt-1 text-sm text-brand-muted">
          Manage content published to the Edunite2Serve website.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map(({ label, value, sub, icon: Icon, href, alert }) => (
          <Link key={href} href={href}>
            <Card className="group rounded-2xl border border-[#dfe5db] bg-white p-5 shadow-xs hover:shadow-md hover:border-brand-green/40 transition-all cursor-pointer">
              <div
                className={`grid h-9 w-9 place-items-center rounded-xl mb-3 ${
                  alert ? "bg-red-50 text-red-500" : "bg-[#eaf2e6] text-brand-green"
                }`}
              >
                <Icon className="h-4.5 w-4.5" />
              </div>
              <p className="m-0 font-sans text-2xl font-extrabold text-brand-forest leading-none">
                {loading ? "-" : value}
              </p>
              <p className="m-0 text-[11px] text-brand-muted font-medium mt-1">
                {sub} {label}
              </p>
            </Card>
          </Link>
        ))}
      </div>

      {/* Activity columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <Card className="rounded-2xl border border-[#dfe5db] bg-white shadow-xs">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#edf2ea]">
            <h2 className="m-0 font-sans text-base font-bold text-brand-forest">Recent Projects</h2>
            <Link
              href="/admin/projects"
              className="text-xs font-semibold text-brand-green hover:underline"
            >
              Manage →
            </Link>
          </div>
          <div className="divide-y divide-[#edf2ea]">
            {recentProjects.map((p) => (
              <div key={p.slug} className="flex items-center justify-between px-6 py-3.5">
                <div className="min-w-0 flex-1">
                  <p className="m-0 text-sm font-semibold text-brand-forest truncate">{p.title}</p>
                  <p className="m-0 text-xs text-brand-muted truncate">
                    {p.category} · {p.location}
                  </p>
                </div>
                <Badge className="bg-[#e9f2e4] text-brand-forest text-[10px] font-bold border-0 shrink-0 ml-3">
                  Active
                </Badge>
              </div>
            ))}
            {!loading && recentProjects.length === 0 && (
              <p className="px-6 py-4 text-sm text-brand-muted">No projects yet.</p>
            )}
            {loading && (
              <p className="px-6 py-4 text-sm text-brand-muted animate-pulse">Loading projects...</p>
            )}
          </div>
        </Card>

        {/* Recent Articles */}
        <Card className="rounded-2xl border border-[#dfe5db] bg-white shadow-xs">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#edf2ea]">
            <h2 className="m-0 font-sans text-base font-bold text-brand-forest">Recent Articles</h2>
            <Link
              href="/admin/news"
              className="text-xs font-semibold text-brand-green hover:underline"
            >
              Manage →
            </Link>
          </div>
          <div className="divide-y divide-[#edf2ea]">
            {recentArticles.map((a) => (
              <div key={a.id} className="flex items-center justify-between px-6 py-3.5">
                <div className="min-w-0 flex-1">
                  <p className="m-0 text-sm font-semibold text-brand-forest truncate">{a.title}</p>
                  <p className="m-0 text-xs text-brand-muted truncate">
                    {a.category} · {a.formattedDate}
                  </p>
                </div>
                <span className="text-[10px] font-bold text-brand-green shrink-0 ml-3">Live</span>
              </div>
            ))}
            {!loading && recentArticles.length === 0 && (
              <p className="px-6 py-4 text-sm text-brand-muted">No articles yet.</p>
            )}
            {loading && (
              <p className="px-6 py-4 text-sm text-brand-muted animate-pulse">Loading articles...</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
