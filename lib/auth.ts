import { createClient } from "@/lib/supabase/client";

export type AdminUser = {
  id: string;
  email: string;
  fullName: string;
  role: "admin" | "editor" | "viewer";
};

function isAdminUser(value: unknown): value is AdminUser {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "email" in value &&
    "fullName" in value &&
    "role" in value &&
    typeof value.id === "string" &&
    typeof value.email === "string" &&
    typeof value.fullName === "string" &&
    value.role === "admin"
  );
}

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

  try {
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      cache: "no-store",
      body: JSON.stringify({ email, password: pass, captchaToken }),
    });

    const result: unknown = await response.json().catch(() => null);
    if (!response.ok) {
      const message =
        typeof result === "object" &&
        result !== null &&
        "error" in result &&
        typeof result.error === "string"
          ? result.error
          : "Unable to sign in. Please try again.";
      return { user: null, error: message };
    }

    const user =
      typeof result === "object" && result !== null && "user" in result
        ? result.user
        : null;
    if (!isAdminUser(user)) {
      return { user: null, error: "Unable to sign in. Please try again." };
    }

    return { user, error: null };
  } catch {
    return { user: null, error: "Unable to sign in. Please try again." };
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
