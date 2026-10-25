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
 * Sign in an administrator with RBAC verification.
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
    return { user: null, error: authError?.message || "Invalid credentials" };
  }

  // 2. RBAC Verification: Query user profile to verify role === 'admin'
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", authData.user.id)
    .single();

  if (profileError || !profile) {
    await supabase.auth.signOut();
    return {
      user: null,
      error: "User profile not found. Please contact the system administrator.",
    };
  }

  if (profile.role !== "admin") {
    // Reject access and revoke session immediately!
    await supabase.auth.signOut();
    return {
      user: null,
      error: `Access Denied: Your account role is "${profile.role}". Only users with the "admin" role are authorized to access this subdomain.`,
    };
  }

  return {
    user: {
      id: authData.user.id,
      email: authData.user.email || email,
      fullName: profile.full_name || "Administrator",
      role: profile.role,
    },
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

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") return null;

  return {
    id: user.id,
    email: user.email || "",
    fullName: profile.full_name || "Administrator",
    role: profile.role,
  };
}

/**
 * Sign out administrator.
 */
export async function signOutAdmin(): Promise<void> {
  if (typeof window !== "undefined") {
    localStorage.removeItem("e2s_mock_admin");
  }
  const supabase = createClient();
  if (supabase) {
    await supabase.auth.signOut();
  }
}
