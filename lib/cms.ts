import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/auth";
import type { Project } from "@/data/projects";
import { articles, type Article } from "@/data/articles";
import type { TeamMember } from "@/lib/team";

type CmsTestimonial = {
  id?: string;
  title: string;
  author: string;
  quote: string;
  accent?: string;
  icon?: string;
  rating?: number;
};

type SaveMode = "create" | "update";

export type CmsGalleryItem = {
  id: string;
  title: string;
  category: string;
  location: string;
  image: string;
  caption: string;
  order_index?: number;
  created_at?: string;
};

function createUniqueSlug(baseSlug: string, existingSlugs: Iterable<string>): string {
  const normalizedBase = baseSlug
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || `item-${Date.now()}`;
  const usedSlugs = new Set(existingSlugs);

  if (!usedSlugs.has(normalizedBase)) return normalizedBase;

  let suffix = 2;
  while (usedSlugs.has(`${normalizedBase}-${suffix}`)) suffix += 1;
  return `${normalizedBase}-${suffix}`;
}

/* =========================================================================
   PROJECTS
========================================================================= */

export async function getCmsProjects(): Promise<Project[]> {
  if (isSupabaseConfigured()) {
    const supabase = createClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Unable to load projects:", error.message);
        return [];
      }
      return (data || []).map((p) => ({
          slug: p.slug,
          title: p.title,
          category: p.category,
          location: p.location,
          description: p.description,
          highlight: p.highlight || "",
          image: p.image,
          imageAlt: p.image_alt || p.title,
          impactMetrics: p.impact_metrics || "",
        }));
    }
  }
  return [];
}

export async function getCmsProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getCmsProjects();
  return projects.find((p) => p.slug === slug) || null;
}

export async function saveCmsProject(
  project: Project,
  mode: SaveMode,
  existingSlug?: string
): Promise<{ success: boolean; error?: string }> {
  if (isSupabaseConfigured()) {
    const supabase = createClient();
    if (supabase) {
      const projectFields = {
        slug: project.slug,
        title: project.title,
        category: project.category,
        location: project.location,
        description: project.description,
        highlight: project.highlight,
        image: project.image,
        image_alt: project.imageAlt,
        impact_metrics: project.impactMetrics,
        is_published: true,
      };

      if (mode === "update") {
        if (!existingSlug) {
          return { success: false, error: "The project to update could not be identified." };
        }
        const { data, error } = await supabase
          .from("projects")
          .update(projectFields)
          .eq("slug", existingSlug)
          .select("slug")
          .maybeSingle();
        if (error) return { success: false, error: error.message };
        if (!data) return { success: false, error: "The project could not be found." };
        return { success: true };
      }

      const { data: existingProjects, error: lookupError } = await supabase
        .from("projects")
        .select("slug");
      if (lookupError) return { success: false, error: lookupError.message };

      const uniqueProject = {
        ...projectFields,
        slug: createUniqueSlug(project.slug || project.title, (existingProjects || []).map((item) => item.slug)),
      };
      const { error } = await supabase.from("projects").insert(uniqueProject);
      if (error) return { success: false, error: error.message };
      return { success: true };
    }
  }

  return { success: false, error: "Supabase is not configured or unavailable." };
}

export async function deleteCmsProject(slug: string): Promise<{ success: boolean; error?: string }> {
  if (isSupabaseConfigured()) {
    const supabase = createClient();
    if (supabase) {
      const { error } = await supabase.from("projects").delete().eq("slug", slug);
      if (error) return { success: false, error: error.message };
      return { success: true };
    }
  }

  return { success: false, error: "Supabase is not configured or unavailable." };
}

/* =========================================================================
   ARTICLES (NEWS & BLOGS)
========================================================================= */

export async function getCmsArticles(): Promise<Article[]> {
  if (isSupabaseConfigured()) {
    const supabase = createClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Unable to load articles:", error.message);
        return [];
      }
      return (data || []).map((a) => ({
          id: a.id,
          slug: a.slug,
          title: a.title,
          category: a.category,
          excerpt: a.excerpt,
          content: a.content,
          image: a.image,
          author: a.author,
          readTime: a.read_time,
          formattedDate: a.published_date,
          date: a.published_date,
        }));
    }
  }
  return [];
}

export async function getCmsNewsArchive(): Promise<Article[]> {
  const cmsArticles = await getCmsArticles();
  const archiveBySlug = new Map(articles.map((article) => [article.slug, article]));

  for (const article of cmsArticles) {
    archiveBySlug.set(article.slug, article);
  }

  return Array.from(archiveBySlug.values()).sort((a, b) => {
    const dateA = Date.parse(a.date || a.formattedDate);
    const dateB = Date.parse(b.date || b.formattedDate);
    return (Number.isFinite(dateB) ? dateB : 0) - (Number.isFinite(dateA) ? dateA : 0);
  });
}

export async function getCmsArticleBySlug(slug: string): Promise<Article | null> {
  const archive = await getCmsNewsArchive();
  return archive.find((article) => article.slug === slug || String(article.id) === slug) || null;
}

export async function saveCmsArticle(
  article: Partial<Article>,
  mode: SaveMode,
  existingSlug?: string
): Promise<{ success: boolean; error?: string }> {
  if (isSupabaseConfigured()) {
    const supabase = createClient();
    if (supabase) {
      const articleFields = {
        slug: article.slug || `article-${Date.now()}`,
        title: article.title,
        category: article.category,
        excerpt: article.excerpt,
        content: article.content,
        image: article.image,
        author: article.author || "Edunite2Serve Malawi",
        read_time: article.readTime || "3 min read",
        published_date: article.formattedDate || new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        is_published: true,
      };

      if (mode === "update") {
        if (!existingSlug) {
          return { success: false, error: "The article to update could not be identified." };
        }
        const { data, error } = await supabase
          .from("articles")
          .update(articleFields)
          .eq("slug", existingSlug)
          .select("slug")
          .maybeSingle();
        if (error) return { success: false, error: error.message };
        if (!data) return { success: false, error: "The article could not be found." };
        return { success: true };
      }

      const { data: existingArticles, error: lookupError } = await supabase
        .from("articles")
        .select("slug");
      if (lookupError) return { success: false, error: lookupError.message };

      const uniqueArticle = {
        ...articleFields,
        slug: createUniqueSlug(articleFields.slug || article.title || "article", (existingArticles || []).map((item) => item.slug)),
      };
      const { error } = await supabase.from("articles").insert(uniqueArticle);
      if (error) return { success: false, error: error.message };
      return { success: true };
    }
  }

  return { success: false, error: "Supabase is not configured or unavailable." };
}

export async function deleteCmsArticle(slugOrId: string | number): Promise<{ success: boolean; error?: string }> {
  if (isSupabaseConfigured()) {
    const supabase = createClient();
    if (supabase) {
      const { error } = await supabase.from("articles").delete().eq("slug", String(slugOrId));
      if (error) return { success: false, error: error.message };
      return { success: true };
    }
  }

  return { success: false, error: "Supabase is not configured or unavailable." };
}

/* =========================================================================
   TESTIMONIALS
========================================================================= */

export async function getCmsTestimonials() {
  if (isSupabaseConfigured()) {
    const supabase = createClient();
    if (supabase) {
      const { data, error } = await supabase.from("testimonials").select("*");
      if (error) {
        console.error("Unable to load testimonials:", error.message);
        return [];
      }
      return data || [];
    }
  }
  return [];
}

export async function saveCmsTestimonial(
  t: CmsTestimonial
): Promise<{ success: boolean; error?: string }> {
  if (isSupabaseConfigured()) {
    const supabase = createClient();
    if (supabase) {
      const { error } = await supabase.from("testimonials").upsert({
        ...(t.id ? { id: t.id } : {}),
        title: t.title,
        author: t.author,
        quote: t.quote,
        accent: t.accent || "teal",
        icon: t.icon || "farming",
        rating: t.rating || 5,
        is_published: true,
      });
      if (error) return { success: false, error: error.message };
      return { success: true };
    }
  }

  return { success: false, error: "Supabase is not configured or unavailable." };
}

export async function deleteCmsTestimonial(
  testimonial: CmsTestimonial
): Promise<{ success: boolean; error?: string }> {
  if (isSupabaseConfigured()) {
    const supabase = createClient();
    if (supabase) {
      if (!testimonial.id) {
        return { success: false, error: "This testimonial could not be identified in the database." };
      }

      const { error } = await supabase.from("testimonials").delete().eq("id", testimonial.id);
      if (error) return { success: false, error: error.message };
      return { success: true };
    }
  }

  return { success: false, error: "Supabase is not configured or unavailable." };
}

/* =========================================================================
   INQUIRIES
========================================================================= */

export async function getCmsInquiries() {
  if (isSupabaseConfigured()) {
    const supabase = createClient();
    if (supabase) {
      const { data, error } = await supabase.from("contact_inquiries").select("*").order("created_at", { ascending: false });
      if (error) {
        console.error("Unable to load inquiries:", error.message);
        return [];
      }
      return data || [];
    }
  }
  return [];
}

export async function submitCmsInquiry(inquiry: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}) {
  if (!isSupabaseConfigured()) {
    return { success: false, error: "Supabase is not configured." };
  }
  const supabase = createClient();
  if (!supabase) return { success: false, error: "Unable to initialize the Supabase client." };

  const { error } = await supabase.from("contact_inquiries").insert([
        {
          name: inquiry.name,
          email: inquiry.email,
          phone: inquiry.phone || null,
          subject: inquiry.subject || null,
          message: inquiry.message,
          status: "unread",
        },
      ]);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function updateInquiryStatus(
  id: string,
  status: "unread" | "replied" | "archived"
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: "Supabase is not configured." };
  }
  const supabase = createClient();
  if (!supabase) return { success: false, error: "Unable to initialize the Supabase client." };

  const { error } = await supabase.from("contact_inquiries").update({ status }).eq("id", id);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

/* =========================================================================
   GALLERY
========================================================================= */

export async function getCmsGallery(
  options: { throwOnError?: boolean } = {}
): Promise<CmsGalleryItem[]> {
  if (isSupabaseConfigured()) {
    const supabase = createClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("gallery_items")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        if (options.throwOnError) throw new Error(error.message);
        console.error("Unable to load gallery photos:", error.message);
        return [];
      }

      return (data || []).map((item) => ({
        id: String(item.id),
        title: item.title,
        category: item.category,
        location: item.location,
        image: item.image,
        caption: item.caption,
        order_index: item.order_index,
        created_at: item.created_at,
      }));
    }
  }

  if (options.throwOnError) {
    throw new Error("Supabase is not configured. Gallery data is unavailable.");
  }
  return [];
}

export async function saveCmsGalleryItem(
  item: Omit<CmsGalleryItem, "id" | "created_at"> & { id?: string }
): Promise<{ success: boolean; error?: string }> {
  if (isSupabaseConfigured()) {
    const supabase = createClient();
    if (supabase) {
      const { error } = await supabase.from("gallery_items").insert({
        title: item.title,
        category: item.category,
        location: item.location,
        image: item.image,
        caption: item.caption,
        order_index: item.order_index ?? 0,
      });
      if (error) return { success: false, error: error.message };
      return { success: true };
    }
  }

  return { success: false, error: "Supabase is not configured or unavailable." };
}

export async function deleteCmsGalleryItem(id: string): Promise<{ success: boolean; error?: string }> {
  if (isSupabaseConfigured()) {
    const supabase = createClient();
    if (supabase) {
      const { error } = await supabase.from("gallery_items").delete().eq("id", id);
      if (error) return { success: false, error: error.message };
      return { success: true };
    }
  }
  return { success: false, error: "Supabase is not configured or unavailable." };
}

/* =========================================================================
   TEAM
========================================================================= */

export type CmsTeamMember = TeamMember & {
  id?: string;
  created_at?: string;
};

export async function getCmsTeam(): Promise<CmsTeamMember[]> {
  if (!isSupabaseConfigured()) {
    throw new Error("Team management requires Supabase configuration.");
  }

  const supabase = createClient();
  if (!supabase) throw new Error("Unable to initialize the Supabase client.");

  const { data, error } = await supabase
    .from("team_members")
    .select("id, name, role, bio, initials, image, department, is_published, order_index, created_at")
    .order("order_index", { ascending: true });

  if (error?.code === "42703") {
    throw new Error(
      "The team directory database schema is outdated. Apply supabase/migrations/20261029_team_directory.sql, then refresh this page."
    );
  }
  if (error) throw new Error(`Unable to load team members: ${error.message}`);
  return (data || []) as CmsTeamMember[];
}

export async function saveCmsTeamMember(
  member: CmsTeamMember,
  existingMember?: Pick<CmsTeamMember, "id" | "name">
): Promise<{ success: boolean; error?: string }> {
  const payload = {
    name: member.name,
    role: member.role,
    bio: member.bio,
    initials: member.initials,
    image: member.image || "",
    department: member.department || "General",
    order_index: member.order_index ?? 0,
    is_published: member.is_published ?? true,
  };

  if (!isSupabaseConfigured()) {
    return { success: false, error: "Team management requires Supabase configuration." };
  }

  const supabase = createClient();
  if (!supabase) return { success: false, error: "Unable to initialize the Supabase client." };

  if (existingMember) {
    if (!existingMember.id) {
      return { success: false, error: "This team member is missing a database ID and cannot be edited." };
    }

    const { data, error } = await supabase
      .from("team_members")
      .update(payload)
      .eq("id", existingMember.id)
      .select("id")
      .maybeSingle();
    if (error) return { success: false, error: error.message };
    if (!data) return { success: false, error: "This team member could not be found." };
    return { success: true };
  }

  const { error } = await supabase.from("team_members").insert(payload);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function deleteCmsTeamMember(
  member: Pick<CmsTeamMember, "id" | "name">
): Promise<{ success: boolean; error?: string }> {
  if (!member.id) {
    return { success: false, error: "This team member is missing a database ID and cannot be removed." };
  }

  if (!isSupabaseConfigured()) {
    return { success: false, error: "Team management requires Supabase configuration." };
  }

  const supabase = createClient();
  if (!supabase) return { success: false, error: "Unable to initialize the Supabase client." };

  const { data, error } = await supabase
    .from("team_members")
    .delete()
    .eq("id", member.id)
    .select("id")
    .maybeSingle();
  if (error) return { success: false, error: error.message };
  if (!data) return { success: false, error: "This team member could not be found." };
  return { success: true };
}

/* =========================================================================
   OVERVIEW STATS
========================================================================= */

export async function getCmsStats() {
  const projects = await getCmsProjects();
  const news = await getCmsArticles();
  const inquiries = await getCmsInquiries();
  const testimonials = await getCmsTestimonials();
  const team = isSupabaseConfigured() ? await getCmsTeam() : [];

  return {
    totalProjects: projects.length,
    totalArticles: news.length,
    totalTestimonials: testimonials.length,
    unreadInquiries: inquiries.filter((inquiry: { status: string }) => inquiry.status === "unread").length,
    totalGalleryItems: (await getCmsGallery()).length,
    totalTeamMembers: team.length,
  };
}
