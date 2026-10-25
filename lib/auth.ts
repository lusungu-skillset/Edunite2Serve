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
  pass: string
): Promise<{ user: AdminUser | null; error: string | null; isMock?: boolean }> {
  // If Supabase is not configured yet, support Sandbox Demo Admin mode
  if (!isSupabaseConfigured()) {
    if (email.toLowerCase().includes("admin") || pass.length >= 6) {
      const mockAdmin: AdminUser = {
        id: "mock-admin-01",
        email: email || "admin@edunite2serve.org",
        fullName: "Chief Administrator",
        role: "admin",
      };
      if (typeof window !== "undefined") {
        localStorage.setItem("e2s_mock_admin", JSON.stringify(mockAdmin));
      }
      return { user: mockAdmin, error: null, isMock: true };
    }
    return { user: null, error: "Invalid credentials (use password with at least 6 characters)" };
  }

  const supabase = createClient();
  if (!supabase) {
    return { user: null, error: "Supabase client initialization failed" };
  }

  // 1. Authenticate with Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password: pass,
  });

  if (authError || !authData.user) {
    return { user: null, error: authError?.message || "Invalid email or password" };
  }

  // 2. Query user profile if profiles table exists, otherwise gracefully fallback to auth user info
  let fullName =
    authData.user.user_metadata?.full_name ||
    authData.user.user_metadata?.name ||
    authData.user.email?.split("@")[0] ||
    "Administrator";
  let role: "admin" | "editor" | "viewer" = "admin";

  try {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role, full_name")
      .eq("id", authData.user.id)
      .maybeSingle();

    if (profile) {
      if (profile.role && profile.role !== "admin") {
        await supabase.auth.signOut();
        return {
          user: null,
          error: `Access Denied: Your account role is "${profile.role}". Only administrators are authorized.`,
        };
      }
      if (profile.full_name) fullName = profile.full_name;
      if (profile.role) role = profile.role as "admin";
    }
  } catch (err) {
    // If profiles table does not exist or has RLS issues, fall through safely
    console.warn("Profiles check skipped:", err);
  }

  const userObj: AdminUser = {
    id: authData.user.id,
    email: authData.user.email || email,
    fullName,
    role,
  };

  // Cache admin user locally as safety fallback
  if (typeof window !== "undefined") {
    localStorage.setItem("e2s_admin_user", JSON.stringify(userObj));
  }

  return {
    user: userObj,
    error: null,
  };
}

/**
 * Get current authenticated admin user.
 */
export async function getAdminUser(): Promise<AdminUser | null> {
  if (!isSupabaseConfigured()) {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("e2s_mock_admin");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {}
      }
    }
    return null;
  }

  const supabase = createClient();
  if (!supabase) return null;

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    let fullName =
      user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      user.email?.split("@")[0] ||
      "Administrator";
    let role: "admin" | "editor" | "viewer" = "admin";

    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role, full_name")
        .eq("id", user.id)
        .maybeSingle();

      if (profile) {
        if (profile.role && profile.role !== "admin") return null;
        if (profile.full_name) fullName = profile.full_name;
        if (profile.role) role = profile.role as "admin";
      }
    } catch {
      // profiles table doesn't exist
    }

    return {
      id: user.id,
      email: user.email || "",
      fullName,
      role,
    };
  } catch {
    // Fallback to locally cached session if offline/slow network
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem("e2s_admin_user");
      if (cached) {
        try {
          return JSON.parse(cached);
        } catch {}
      }
    }
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
