"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitCmsInquiry } from "@/lib/cms";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    try {
      setSubmitting(true);
      await submitCmsInquiry(formData);
      setSubmitted(true);
    } catch (err) {
      console.error("Submission failed", err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-brand-green/30 bg-[#f4f9f2] p-8 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-green text-white mb-4">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="m-0 font-sans text-2xl font-bold text-brand-forest">
          Thank You for Reaching Out!
        </h3>
        <p className="mt-2 text-sm text-brand-muted max-w-[420px] mx-auto leading-relaxed">
          Your message has been received. A member of our volunteer team in Malawi or Atlanta will get back to you shortly.
        </p>
        <Button
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
          }}
          className="mt-6 rounded-full bg-brand-forest hover:bg-brand-green text-white text-xs font-bold"
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-brand-forest mb-1.5">
            Full Name *
          </label>
          <Input
            required
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="rounded-xl border-[#d8e3d5] bg-white h-11 text-sm focus-visible:ring-brand-green"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-brand-forest mb-1.5">
            Email Address *
          </label>
          <Input
            required
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="rounded-xl border-[#d8e3d5] bg-white h-11 text-sm focus-visible:ring-brand-green"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-brand-forest mb-1.5">
            Phone Number
          </label>
          <Input
            type="tel"
            placeholder="+265 989 158 325"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="rounded-xl border-[#d8e3d5] bg-white h-11 text-sm focus-visible:ring-brand-green"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-brand-forest mb-1.5">
            Subject
          </label>
          <Input
            placeholder="Volunteering / Partnership / Donation"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="rounded-xl border-[#d8e3d5] bg-white h-11 text-sm focus-visible:ring-brand-green"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-brand-forest mb-1.5">
          Your Message *
        </label>
        <textarea
          required
          rows={5}
          placeholder="How can we partner with you or answer your questions?..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full rounded-xl border border-[#d8e3d5] bg-white p-3.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
        />
      </div>

      <Button
        type="submit"
        disabled={submitting}
        className="w-full sm:w-auto rounded-full bg-brand-green hover:bg-brand-forest text-white font-bold text-base px-8 py-3.5 h-auto shadow-sm disabled:opacity-50"
      >
        {submitting ? (
          <>
            Submitting...
            <Loader2 className="h-4 w-4 ml-2 animate-spin" />
          </>
        ) : (
          <>
            Send Message
            <Send className="h-4 w-4 ml-2" />
          </>
        )}
      </Button>
    </form>
  );
}
