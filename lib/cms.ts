import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/auth";
import { projectDirectory, type Project } from "@/data/projects";
import { articles, type Article } from "@/data/articles";
import { homepageContent } from "@/data/homepage";
import { aboutContent } from "@/data/about";

// In-memory / local storage cache for mock/dev fallback when Supabase keys are pending
const localStore = {
  projects: [...projectDirectory] as Project[],
  articles: [...articles] as Article[],
  testimonials: [...homepageContent.donationImpact.items],
  gallery: [
    {
      id: "gal-1",
      title: "Learners at Mangunda Primary School",
      category: "Child Education",
      location: "Thyolo, Malawi",
      image: "/images/featured-projects/mangunda-school.jpg",
      caption: "Standards 1–7 students gathering outside their classroom block.",
    },
    {
      id: "gal-2",
      title: "Organic Crop Cultivation at Lakeside Farm",
      category: "Sustainable Agriculture",
      location: "Malawi Adventist University & Surrounds",
      image: "/images/featured-projects/lakeside-farm.jpg",
      caption: "Bio-intensive farming initiative growing sustainable staple crops.",
    },
    {
      id: "gal-3",
      title: "FARM STEW Community Recognition",
      category: "Healthcare & Nutrition",
      location: "Zomba District, Malawi",
      image: "/images/featured-projects/farmstew-international.jpg",
      caption: "Graduates receiving certificates after completing comprehensive training.",
    },
  ],
  team: [...aboutContent.leadership],
  inquiries: [
    {
      id: "inq-1",
      name: "Pastor David Banda",
      email: "dbanda@example.org",
      phone: "+265 991 234 567",
      subject: "Church Construction in Dedza",
      message: "We would like to request assistance with bricks and roofing for our rural congregation sanctuary in Dedza West.",
      status: "unread",
      date: "2025-02-14",
    },
    {
      id: "inq-2",
      name: "Sarah Jenkins",
      email: "sjenkins@university.edu",
      phone: "+1 404 555 0192",
      subject: "University Volunteer Attachment",
      message: "I am a graduate student in public health and would love to volunteer with the FARM STEW nutrition training program this summer.",
      status: "replied",
      date: "2025-02-10",
    },
  ],
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

      if (!error && data && data.length > 0) {
        return data.map((p) => ({
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
  }
  return localStore.projects;
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

  // Fallback
  if (mode === "update") {
    if (!existingSlug) {
      return { success: false, error: "The project to update could not be identified." };
    }
    const existingIndex = localStore.projects.findIndex((p) => p.slug === existingSlug);
    if (existingIndex < 0) return { success: false, error: "The project could not be found." };
    const conflictingProject = localStore.projects.some(
      (p) => p.slug === project.slug && p.slug !== existingSlug
    );
    if (conflictingProject) return { success: false, error: "That project URL is already in use." };
    localStore.projects[existingIndex] = project;
  } else {
    const slug = createUniqueSlug(project.slug || project.title, localStore.projects.map((p) => p.slug));
    localStore.projects.unshift({ ...project, slug });
  }
  return { success: true };
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

  localStore.projects = localStore.projects.filter((p) => p.slug !== slug);
  return { success: true };
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

      if (!error && data && data.length > 0) {
        return data.map((a) => ({
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
  }
  return localStore.articles;
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

  const slug = article.slug || `article-${Date.now()}`;
  const newArticle: Article = {
    id: article.id || Date.now(),
    slug,
    title: article.title || "Untitled Article",
    date: article.date || new Date().toISOString().split("T")[0],
    formattedDate: article.formattedDate || "Recent",
    author: article.author || "Edunite2Serve Malawi",
    category: article.category || "Community Care",
    readTime: article.readTime || "3 min read",
    excerpt: article.excerpt || "",
    content: article.content || "",
    image: article.image || "/images/news/news-931.jpg",
  };

  if (mode === "update") {
    if (!existingSlug) {
      return { success: false, error: "The article to update could not be identified." };
    }
    const existingIndex = localStore.articles.findIndex((a) => a.slug === existingSlug);
    if (existingIndex < 0) return { success: false, error: "The article could not be found." };
    const conflictingArticle = localStore.articles.some(
      (a) => a.slug === newArticle.slug && a.slug !== existingSlug
    );
    if (conflictingArticle) return { success: false, error: "That article URL is already in use." };
    localStore.articles[existingIndex] = newArticle;
  } else {
    newArticle.slug = createUniqueSlug(newArticle.slug, localStore.articles.map((a) => a.slug));
    localStore.articles.unshift(newArticle);
  }
  return { success: true };
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

  localStore.articles = localStore.articles.filter((a) => a.slug !== String(slugOrId) && a.id !== slugOrId);
  return { success: true };
}

/* =========================================================================
   TESTIMONIALS
========================================================================= */

export async function getCmsTestimonials() {
  if (isSupabaseConfigured()) {
    const supabase = createClient();
    if (supabase) {
      const { data, error } = await supabase.from("testimonials").select("*").eq("is_published", true);
      if (!error && data && data.length > 0) return data;
    }
  }
  return localStore.testimonials;
}

export async function saveCmsTestimonial(t: any): Promise<{ success: boolean; error?: string }> {
  if (isSupabaseConfigured()) {
    const supabase = createClient();
    if (supabase) {
      const { error } = await supabase.from("testimonials").upsert({
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

  localStore.testimonials.unshift(t);
  return { success: true };
}

/* =========================================================================
   INQUIRIES
========================================================================= */

export async function getCmsInquiries() {
  if (isSupabaseConfigured()) {
    const supabase = createClient();
    if (supabase) {
      const { data, error } = await supabase.from("contact_inquiries").select("*").order("created_at", { ascending: false });
      if (!error && data) return data;
    }
  }
  return localStore.inquiries;
}

export async function submitCmsInquiry(inquiry: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}) {
  if (isSupabaseConfigured()) {
    const supabase = createClient();
    if (supabase) {
      await supabase.from("contact_inquiries").insert([
        {
          name: inquiry.name,
          email: inquiry.email,
          phone: inquiry.phone || null,
          subject: inquiry.subject || null,
          message: inquiry.message,
          status: "unread",
        },
      ]);
    }
  }
  const newInq = {
    id: `inq-${Date.now()}`,
    name: inquiry.name,
    email: inquiry.email,
    phone: inquiry.phone || "",
    subject: inquiry.subject || "",
    message: inquiry.message,
    status: "unread" as const,
    date: new Date().toISOString().split("T")[0],
  };
  localStore.inquiries.unshift(newInq);
  return { success: true };
}

export async function updateInquiryStatus(id: string, status: "unread" | "replied" | "archived") {
  if (isSupabaseConfigured()) {
    const supabase = createClient();
    if (supabase) {
      await supabase.from("contact_inquiries").update({ status }).eq("id", id);
    }
  }
  const item = localStore.inquiries.find((i) => i.id === id);
  if (item) item.status = status;
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

  return localStore.gallery;
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

  localStore.gallery.unshift({
    ...item,
    id: item.id || `gal-${Date.now()}`,
  });
  return { success: true };
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
  localStore.gallery = localStore.gallery.filter((g) => g.id !== id);
  return { success: true };
}

/* =========================================================================
   TEAM
========================================================================= */

export async function getCmsTeam() {
  if (isSupabaseConfigured()) {
    const supabase = createClient();
    if (supabase) {
      const { data, error } = await supabase.from("team_members").select("*").order("order_index", { ascending: true });
      if (!error && data && data.length > 0) return data;
    }
  }
  return localStore.team;
}

export async function saveCmsTeamMember(member: any): Promise<{ success: boolean; error?: string }> {
  if (isSupabaseConfigured()) {
    const supabase = createClient();
    if (supabase) {
      const { error } = await supabase.from("team_members").upsert({
        name: member.name,
        role: member.role,
        bio: member.bio,
        initials: member.initials,
        image: member.image,
        order_index: member.order_index || 0,
      });
      if (error) return { success: false, error: error.message };
      return { success: true };
    }
  }
  localStore.team.unshift({
    ...member,
  });
  return { success: true };
}

export async function deleteCmsTeamMember(name: string): Promise<{ success: boolean; error?: string }> {
  if (isSupabaseConfigured()) {
    const supabase = createClient();
    if (supabase) {
      const { error } = await supabase.from("team_members").delete().eq("name", name);
      if (error) return { success: false, error: error.message };
      return { success: true };
    }
  }
  localStore.team = localStore.team.filter((t) => t.name !== name);
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

  return {
    totalProjects: projects.length,
    totalArticles: news.length,
    totalTestimonials: testimonials.length,
    unreadInquiries: inquiries.filter((i: any) => i.status === "unread").length,
    totalGalleryItems: localStore.gallery.length,
    totalTeamMembers: localStore.team.length,
  };
}
