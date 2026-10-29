import { createClient } from "@/lib/supabase/client";

export type AdminUser = {
  id: string;
  email: string;
  fullName: string;
  role: "admin" | "editor" | "viewer";
};

/**
 * Validates whether Supabase environment variables are configured.
 */
export function isSupabaseConfigured(): boolean {
  return (
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  );
}

/**
 * Sign in an administrator with authentication and profile verification.
 */
export async function signInAdmin(
  email: string,
  pass: string,
  captchaToken?: string
): Promise<{ user: AdminUser | null; error: string | null }> {
  if (!isSupabaseConfigured()) {
    return { user: null, error: "Supabase is not configured. Admin sign-in is unavailable." };
  }

  const supabase = createClient();
  if (!supabase) {
    return { user: null, error: "Supabase client initialization failed" };
  }

  // 1. Authenticate with Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password: pass,
    ...(captchaToken ? { options: { captchaToken } } : {}),
  });

  if (authError || !authData.user) {
    return { user: null, error: authError?.message || "Invalid email or password" };
  }

  const fullName =
    authData.user.user_metadata?.full_name ||
    authData.user.user_metadata?.name ||
    authData.user.email?.split("@")[0] ||
    "Administrator";

  try {
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role, full_name")
      .eq("id", authData.user.id)
      .maybeSingle();

    if (profileError || !profile || profile.role !== "admin") {
      await supabase.auth.signOut();
      return {
        user: null,
        error: profileError?.message || "Access denied. Only administrators are authorized.",
      };
    }
    const userObj: AdminUser = {
      id: authData.user.id,
      email: authData.user.email || email,
      fullName: profile.full_name || fullName,
      role: "admin",
    };
    return { user: userObj, error: null };
  } catch (error) {
    await supabase.auth.signOut();
    return {
      user: null,
      error: error instanceof Error ? error.message : "Unable to verify administrator access.",
    };
  }
}

/**
 * Get current authenticated admin user.
 */
export async function getAdminUser(): Promise<AdminUser | null> {
  if (typeof window !== "undefined") {
    localStorage.removeItem("e2s_mock_admin");
    localStorage.removeItem("e2s_admin_user");
  }

  if (!isSupabaseConfigured()) {
    return null;
  }

  const supabase = createClient();
  if (!supabase) return null;

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const fullName =
      user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      user.email?.split("@")[0] ||
      "Administrator";

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role, full_name")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError || !profile || profile.role !== "admin") return null;

    return {
      id: user.id,
      email: user.email || "",
      fullName: profile.full_name || fullName,
      role: "admin",
    };
  } catch {
    return null;
  }
}

/**
 * Sign out administrator.
 */
export async function signOutAdmin(): Promise<void> {
  if (typeof window !== "undefined") {
    localStorage.removeItem("e2s_mock_admin");
    localStorage.removeItem("e2s_admin_user");
  }
  const supabase = createClient();
  if (supabase) {
    await supabase.auth.signOut();
  }
}
