"use client";

import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NewsletterForm() {
  const [notice, setNotice] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("Newsletter sign-up is coming soon. Please check back.");
  }

  return (
    <form className="relative flex flex-col gap-2 max-w-[360px]" onSubmit={handleSubmit}>
      <div className="flex items-center gap-2">
        <label className="sr-only" htmlFor="newsletter-email">Email address</label>
        <Input
          className="border-white/30 bg-white/10 text-[13px] text-white placeholder:text-[#b5c8bd] focus-visible:ring-brand-lime"
          autoComplete="email"
          id="newsletter-email"
          name="email"
          type="email"
          placeholder="Your email address"
          required
        />
        <Button
          className="bg-brand-lime text-brand-forest hover:bg-brand-lime/80 font-bold text-xs shrink-0"
          type="submit"
          aria-label="Join the Edunite newsletter"
        >
          Join us <span className="pl-1 text-sm" aria-hidden="true">→</span>
        </Button>
      </div>
      {notice && (
        <p className="text-[12px] font-medium text-brand-lime" aria-live="polite">
          {notice}
        </p>
      )}
    </form>
  );
}
