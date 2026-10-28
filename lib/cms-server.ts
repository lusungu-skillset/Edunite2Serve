import { homepageContent } from "@/data/homepage";
import { createClient } from "@/lib/supabase/server";

export async function getHomepageTestimonials() {
  const fallback = homepageContent.donationImpact.items;

  try {
    const supabase = await createClient();
    if (!supabase) return fallback;

    const { data, error } = await supabase
      .from("testimonials")
      .select("title, author, quote, accent, icon")
      .eq("is_published", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Unable to load homepage testimonials:", error.message);
      return fallback;
    }

    if (!data?.length) return fallback;

    return data.map((testimonial) => ({
      title: testimonial.title,
      author: testimonial.author,
      quote: testimonial.quote,
      accent: testimonial.accent,
      icon: testimonial.icon,
    }));
  } catch (error) {
    console.error("Unable to load homepage testimonials:", error);
    return fallback;
  }
}
