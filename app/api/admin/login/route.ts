import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const WINDOW_SECONDS = 15 * 60;
const IP_MAX_ATTEMPTS = 30;
const EMAIL_MAX_ATTEMPTS = 8;
const MAX_REQUEST_BYTES = 4096;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type RateLimitResult = {
  allowed: boolean;
  retry_after_seconds: number;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function jsonError(message: string, status: number, retryAfterSeconds?: number) {
  const headers = new Headers({ "Cache-Control": "no-store" });
  if (retryAfterSeconds) headers.set("Retry-After", String(retryAfterSeconds));
  return NextResponse.json({ error: message }, { status, headers });
}

async function hashBucket(secret: string, value: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return Array.from(new Uint8Array(signature), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function consumeRateLimit(
  adminClient: unknown,
  bucketHash: string,
  maxAttempts: number
): Promise<RateLimitResult> {
  const rpcClient = adminClient as {
    rpc: (
      functionName: string,
      args: Record<string, string | number>
    ) => Promise<{ data: unknown; error: { message: string } | null }>;
  };
  const { data, error } = await rpcClient.rpc("consume_admin_login_rate_limit", {
    p_bucket_hash: bucketHash,
    p_max_attempts: maxAttempts,
    p_window_seconds: WINDOW_SECONDS,
  });

  if (error) throw new Error(error.message);
  const result = Array.isArray(data) ? data[0] : data;
  if (
    !isRecord(result) ||
    typeof result.allowed !== "boolean" ||
    typeof result.retry_after_seconds !== "number"
  ) {
    throw new Error("Rate-limit function returned an invalid response.");
  }
  return {
    allowed: result.allowed,
    retry_after_seconds: result.retry_after_seconds,
  };
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin) {
    return jsonError("Invalid sign-in request.", 403);
  }
  if (request.headers.get("sec-fetch-site") === "cross-site") {
    return jsonError("Invalid sign-in request.", 403);
  }

  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return jsonError("Expected a JSON sign-in request.", 415);
  }
  const contentLength = Number(request.headers.get("content-length") || "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    return jsonError("Sign-in request is too large.", 413);
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseAnonKey || !serviceRoleKey) {
    return jsonError("Admin sign-in is not configured.", 503);
  }

  let body: unknown;
  try {
    const requestBody = await request.text();
    if (new TextEncoder().encode(requestBody).byteLength > MAX_REQUEST_BYTES) {
      return jsonError("Sign-in request is too large.", 413);
    }
    body = JSON.parse(requestBody);
  } catch {
    return jsonError("Invalid sign-in request.", 400);
  }

  if (!isRecord(body)) return jsonError("Invalid sign-in request.", 400);
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  const captchaToken = typeof body.captchaToken === "string" ? body.captchaToken : undefined;

  const clientIp =
    request.headers.get("cf-connecting-ip")?.trim() ||
    request.headers.get("x-nf-client-connection-ip")?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    request.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim() ||
    "unknown";

  const adminClient = createSupabaseClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
  });

  try {
    const ipLimit = await consumeRateLimit(
      adminClient,
      await hashBucket(serviceRoleKey, `ip:${clientIp.slice(0, 128)}`),
      IP_MAX_ATTEMPTS
    );
    if (!ipLimit.allowed) {
      return jsonError("Too many sign-in attempts. Try again later.", 429, ipLimit.retry_after_seconds);
    }

    if (EMAIL_PATTERN.test(email) && email.length <= 320) {
      const emailLimit = await consumeRateLimit(
        adminClient,
        await hashBucket(serviceRoleKey, `email:${email}`),
        EMAIL_MAX_ATTEMPTS
      );
      if (!emailLimit.allowed) {
        return jsonError("Too many sign-in attempts. Try again later.", 429, emailLimit.retry_after_seconds);
      }
    }
  } catch (error) {
    console.error("Admin login rate limiter unavailable:", error instanceof Error ? error.message : "Unknown error");
    return jsonError("Admin sign-in is temporarily unavailable.", 503);
  }

  if (!EMAIL_PATTERN.test(email) || email.length > 320 || password.length < 1 || password.length > 1024) {
    return jsonError("Invalid email or password.", 400);
  }
  if (captchaToken && captchaToken.length > 4096) {
    return jsonError("Invalid sign-in request.", 400);
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
      },
    },
  });

  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
    ...(captchaToken ? { options: { captchaToken } } : {}),
  });

  if (authError || !authData.user) {
    return jsonError("Invalid email or password.", 401);
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", authData.user.id)
    .maybeSingle();

  if (profileError) {
    await supabase.auth.signOut();
    console.error("Unable to verify admin profile:", profileError.message);
    return jsonError("Unable to verify administrator access.", 503);
  }

  if (!profile || profile.role !== "admin") {
    await supabase.auth.signOut();
    return jsonError("Administrator access is required.", 403);
  }

  return NextResponse.json(
    {
      user: {
        id: authData.user.id,
        email: authData.user.email || email,
        fullName:
          profile.full_name ||
          authData.user.user_metadata?.full_name ||
          authData.user.user_metadata?.name ||
          email.split("@")[0],
        role: "admin",
      },
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
