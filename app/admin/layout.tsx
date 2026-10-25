"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FolderKanban,
  Newspaper,
  MessageSquareQuote,
  Images,
  Users2,
  MailQuestion,
  LayoutDashboard,
  LogOut,
  ExternalLink,
  Menu,
  X,
  BriefcaseBusiness,
} from "lucide-react";
import { getAdminUser, signOutAdmin, type AdminUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "News & Blogs", href: "/admin/news", icon: Newspaper },
  { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
  { label: "Gallery", href: "/admin/gallery", icon: Images },
  { label: "Team", href: "/admin/team", icon: Users2 },
  { label: "Opportunities", href: "/admin/opportunities", icon: BriefcaseBusiness },
  { label: "Inquiries", href: "/admin/inquiries", icon: MailQuestion },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) return;
    getAdminUser().then((user) => {
      if (!user) router.push("/admin/login");
      else setAdminUser(user);
    });
  }, [pathname, isLoginPage, router]);

  if (isLoginPage) return <>{children}</>;

  async function handleSignOut() {
    await signOutAdmin();
    router.push("/admin/login");
    router.refresh();
  }

  function SidebarContent() {
    return (
      <div className="flex flex-col h-full">
        {/* Brand */}
        <div className="px-5 py-5 border-b border-[#edf2ea]">
          <Link href="/admin" className="flex items-center gap-2.5">
            <Image
              src="/images/brand/edunite2serve-logo.png"
              alt="Edunite2Serve"
              width={36}
              height={36}
              className="h-9 w-auto object-contain"
            />
            <div>
              <p className="m-0 font-sans text-sm font-bold text-brand-forest leading-none">
                Edunite2Serve
              </p>
              <p className="m-0 text-[10px] text-brand-muted font-medium leading-none mt-0.5">
                Admin Panel
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-brand-forest text-white"
                    : "text-brand-muted hover:bg-[#f0f5ed] hover:text-brand-forest"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="px-4 py-4 border-t border-[#edf2ea]">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-brand-forest text-white font-bold text-xs shrink-0">
              {adminUser?.fullName?.[0] || "A"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="m-0 text-xs font-semibold text-brand-forest truncate">
                {adminUser?.fullName || "Administrator"}
              </p>
              <p className="m-0 text-[10px] text-brand-muted truncate">
                {adminUser?.email || ""}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="flex-1 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 border-[#e8d8d8] h-8"
            >
              <LogOut className="h-3.5 w-3.5 mr-1.5" />
              Sign Out
            </Button>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-8 w-8 rounded-xl border border-[#dfe5db] bg-[#fafcf9] text-brand-muted hover:text-brand-forest hover:border-brand-green/40 transition-colors"
              title="View live site"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f9f5] flex font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col bg-white border-r border-[#dfe5db] shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-xs"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-64 bg-white shadow-2xl flex flex-col">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="absolute top-3 right-3 p-1.5 rounded-lg text-brand-muted hover:bg-slate-100"
            >
              <X className="h-4 w-4" />
            </button>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar (mobile) */}
        <header className="lg:hidden sticky top-0 z-30 flex items-center gap-3 border-b border-[#dfe5db] bg-white/90 px-4 py-3 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="p-1.5 rounded-lg text-brand-forest hover:bg-slate-100"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Image
            src="/images/brand/edunite2serve-logo.png"
            alt="Edunite2Serve"
            width={28}
            height={28}
            className="h-7 w-auto object-contain"
          />
          <span className="font-sans text-sm font-bold text-brand-forest">
            Admin Panel
          </span>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
