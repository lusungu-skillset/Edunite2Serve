"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Archive,
  CheckCircle2,
  Mail,
  Phone,
  Reply,
} from "lucide-react";
import { getCmsInquiries, updateInquiryStatus } from "@/lib/cms";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type AdminInquiry = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
  status: "unread" | "replied" | "archived";
};

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<AdminInquiry[]>([]);
  const [filter, setFilter] = useState("all");
  const [selectedInquiry, setSelectedInquiry] = useState<AdminInquiry | null>(null);
  const [inquiryError, setInquiryError] = useState("");

  const loadInquiries = useCallback(async () => {
    return (await getCmsInquiries()) as AdminInquiry[];
  }, []);

  useEffect(() => {
    let isCurrent = true;
    void loadInquiries().then((data) => {
      if (!isCurrent) return;
      setInquiries(data);
      setSelectedInquiry((current) =>
        (current && data.find((inquiry) => inquiry.id === current.id)) || data[0] || null
      );
    });

    return () => {
      isCurrent = false;
    };
  }, [loadInquiries]);

  async function handleSetStatus(id: string, status: "unread" | "replied" | "archived") {
    const result = await updateInquiryStatus(id, status);
    if (!result.success) {
      setInquiryError(result.error || "Unable to update this inquiry.");
      return;
    }
    setInquiryError("");
    const data = await loadInquiries();
    setInquiries(data);
    setSelectedInquiry((current) =>
      (current && data.find((inquiry) => inquiry.id === current.id)) || data[0] || null
    );
  }

  const filtered = inquiries.filter((i) => {
    if (filter === "unread") return i.status === "unread";
    if (filter === "replied") return i.status === "replied";
    if (filter === "archived") return i.status === "archived";
    return true;
  });

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="m-0 font-sans text-2xl sm:text-3xl font-bold text-brand-forest">
            Contact & Partnership Inquiries
          </h1>
          <p className="m-0 text-sm text-brand-muted mt-1">
            Review and respond to messages submitted through the public website contact form.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-[#dfe5db]">
          {["all", "unread", "replied", "archived"].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                filter === f
                  ? "bg-brand-forest text-brand-lime"
                  : "text-brand-muted hover:text-brand-forest"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {inquiryError && (
        <p role="alert" className="m-0 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {inquiryError}
        </p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left List */}
        <div className="lg:col-span-5 space-y-3">
          {filtered.map((inq) => (
            <div
              key={inq.id}
              onClick={() => setSelectedInquiry(inq)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                selectedInquiry?.id === inq.id
                  ? "border-brand-green bg-[#f4f9f2] shadow-sm"
                  : "border-[#dfe5db] bg-white hover:bg-[#fafcf9]"
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-sans text-sm font-bold text-brand-forest truncate">
                  {inq.name}
                </span>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    inq.status === "unread"
                      ? "bg-amber-100 text-amber-800"
                      : inq.status === "replied"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {inq.status}
                </span>
              </div>
              <p className="m-0 text-xs font-semibold text-brand-green truncate mb-1">
                {inq.subject}
              </p>
              <p className="m-0 text-xs text-brand-muted line-clamp-2">
                {inq.message}
              </p>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="rounded-2xl border border-dashed border-[#ccd8ca] bg-white p-8 text-center text-xs text-brand-muted">
              No inquiries found under this filter.
            </div>
          )}
        </div>

        {/* Right Detail Pane */}
        <div className="lg:col-span-7">
          {selectedInquiry ? (
            <Card className="rounded-2xl border border-[#dfe5db] bg-white p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 border-b border-[#edf2ea] pb-6">
                <div>
                  <Badge className="bg-[#e9f2e4] text-brand-forest font-bold text-xs uppercase mb-2 border-0">
                    {selectedInquiry.subject || "General Inquiry"}
                  </Badge>
                  <h2 className="m-0 font-sans text-2xl font-bold text-brand-forest">
                    {selectedInquiry.name}
                  </h2>
                  <div className="mt-2 flex flex-wrap gap-4 text-xs font-medium text-brand-muted">
                    <span className="flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-brand-green" />
                      <a href={`mailto:${selectedInquiry.email}`} className="text-brand-green hover:underline">
                        {selectedInquiry.email}
                      </a>
                    </span>
                    {selectedInquiry.phone && (
                      <span className="flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5 text-brand-green" />
                        {selectedInquiry.phone}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {selectedInquiry.status === "unread" && (
                    <Button
                      size="sm"
                      onClick={() => handleSetStatus(selectedInquiry.id, "replied")}
                      className="rounded-xl bg-brand-green hover:bg-brand-forest text-white text-xs font-bold"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                      Mark Replied
                    </Button>
                  )}
                  {selectedInquiry.status !== "archived" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSetStatus(selectedInquiry.id, "archived")}
                      className="rounded-xl text-xs font-bold"
                    >
                      <Archive className="h-3.5 w-3.5 mr-1" />
                      Archive
                    </Button>
                  )}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">
                  Message Content:
                </p>
                <div className="rounded-xl bg-[#fbfdfa] p-5 border border-[#edf2ea] text-sm leading-relaxed text-[#24352a]">
                  {selectedInquiry.message}
                </div>
              </div>

              <div className="pt-4 border-t border-[#edf2ea] flex items-center justify-between">
                <Button
                  render={<a href={`mailto:${selectedInquiry.email}?subject=Re: ${encodeURIComponent(selectedInquiry.subject || 'Edunite2Serve Inquiry')}`} />}
                  className="rounded-full bg-brand-forest hover:bg-brand-green text-brand-lime hover:text-white font-bold text-xs px-6"
                >
                  <Reply className="h-3.5 w-3.5 mr-1.5" />
                  Reply via Email
                </Button>
                <span className="text-xs text-brand-muted">
                  Received via Public Contact Form
                </span>
              </div>
            </Card>
          ) : (
            <div className="rounded-2xl border border-dashed border-[#ccd8ca] bg-white p-12 text-center text-sm text-brand-muted">
              Select a message on the left to read details and reply.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
