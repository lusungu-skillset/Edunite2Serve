"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
import { signInAdmin } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const TURNSTILE_TEST_SITE_KEY = "1x00000000000000000000AA";
const turnstileSiteKey =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
  (process.env.NODE_ENV === "development" ? TURNSTILE_TEST_SITE_KEY : "");

type TurnstileOptions = {
  sitekey: string;
  callback: (token: string) => void;
  "expired-callback": () => void;
  "error-callback": () => void;
  theme?: "light" | "dark" | "auto";
};

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: TurnstileOptions) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

export default function AdminLoginPage() {
  const router = useRouter();
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetIdRef = useRef<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [turnstileReady, setTurnstileReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const turnstile = window.turnstile;
    const container = turnstileContainerRef.current;
    if (!turnstileSiteKey || !turnstileReady || !turnstile || !container) return;

    const widgetId = turnstile.render(container, {
      sitekey: turnstileSiteKey,
      theme: "light",
      callback: (token) => {
        setCaptchaToken(token);
        setError(null);
      },
      "expired-callback": () => {
        setCaptchaToken("");
        setError("Cloudflare verification expired. Please verify again.");
      },
      "error-callback": () => {
        setCaptchaToken("");
        setError("Cloudflare verification failed to load. Please try again.");
      },
    });
    turnstileWidgetIdRef.current = widgetId;

    return () => {
      turnstile.remove(widgetId);
      turnstileWidgetIdRef.current = null;
    };
  }, [turnstileReady]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (turnstileSiteKey && !captchaToken) {
      setError("Complete the Cloudflare verification before signing in.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await signInAdmin(email, password, captchaToken || undefined);
      if (result.error) {
        setError(result.error);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      if (turnstileWidgetIdRef.current) {
        window.turnstile?.reset(turnstileWidgetIdRef.current);
      }
      setCaptchaToken("");
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f4f7f1] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">

        {/* Logo & Brand */}
        <div className="flex flex-col items-center mb-8 text-center">
          <Link
            href="/"
            className="mb-4 inline-flex items-center justify-center rounded-2xl bg-white p-2 shadow-xs hover:shadow-md transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
          >
            <Image
              src="/images/brand/edunite2serve-mark.png"
              alt="Edunite2Serve"
              width={96}
              height={96}
              priority
              quality={100}
              className="h-24 w-24 object-contain"
            />
          </Link>
          <h1 className="font-sans text-2xl font-bold text-brand-forest m-0">
            Admin Sign In
          </h1>
          <p className="text-sm text-brand-muted mt-1">
            Edunite2Serve Management Portal
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-[#dfe5db] shadow-sm p-8 space-y-5">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-brand-forest uppercase tracking-wider mb-1.5"
              >
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@edunite2serve.org"
                className="h-11 rounded-xl border-[#d8e3d5] bg-[#fafcf9] text-sm text-brand-forest placeholder:text-brand-muted/70 focus:bg-white"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-brand-forest uppercase tracking-wider mb-1.5"
              >
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-11 rounded-xl border-[#d8e3d5] bg-[#fafcf9] text-sm text-brand-forest placeholder:text-brand-muted/70 focus:bg-white"
              />
            </div>

            {turnstileSiteKey && (
              <div className="flex min-h-[66px] justify-center" aria-label="Cloudflare security verification">
                <div ref={turnstileContainerRef} />
              </div>
            )}

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700 leading-relaxed">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading || (Boolean(turnstileSiteKey) && !captchaToken)}
              className="w-full rounded-xl bg-brand-forest hover:bg-brand-green text-white font-semibold text-sm py-2.5 h-11 shadow-sm"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Sign In
                  <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </form>
        </div>

        {turnstileSiteKey && (
          <Script
            id="cloudflare-turnstile"
            src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
            strategy="afterInteractive"
            onReady={() => setTurnstileReady(true)}
            onError={() => setError("Cloudflare verification could not be loaded. Check your connection and reload the page.")}
          />
        )}

        {/* Back link */}
        <p className="text-center mt-6 text-xs text-brand-muted">
          <Link href="/" className="font-semibold text-brand-green hover:text-brand-forest hover:underline">
            ← Back to website
          </Link>
        </p>

      </div>
    </div>
  );
}
