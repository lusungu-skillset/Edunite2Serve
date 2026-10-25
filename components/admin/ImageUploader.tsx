"use client";

import { useState, useRef, useCallback } from "react";
import { CloudUpload, Loader2, Trash2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ImageUploaderProps = {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
};

export default function ImageUploader({
  value,
  onChange,
  folder = "edunite2serve",
  label = "Image",
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(async (file: File) => {
    setIsUploading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `Upload failed (${res.status})`);
      }

      onChange(data.url);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || "Upload failed. Check Cloudinary credentials.");
    } finally {
      setIsUploading(false);
    }
  }, [folder, onChange]);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
    // Reset so same file can be re-selected
    e.target.value = "";
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) uploadFile(file);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wider text-brand-forest">
          {label}
        </label>
      )}

      {value ? (
        <div className="relative overflow-hidden rounded-xl border border-[#dfe5db] bg-[#fafcf9]">
          {/* Use plain <img> to support both data: URLs and https: URLs */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Uploaded preview"
            className="h-44 w-full object-cover rounded-t-xl"
          />
          <div className="flex items-center justify-between gap-2 px-3 py-2 border-t border-[#edf2ea]">
            <span className="truncate text-xs text-brand-muted font-mono max-w-[240px]">
              {value.startsWith("data:") ? "Preview (not saved to CDN)" : value}
            </span>
            <div className="flex items-center gap-1.5 shrink-0">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="h-7 text-xs px-2"
              >
                Replace
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => { onChange(""); setError(null); }}
                className="h-7 w-7 p-0 text-red-500 hover:bg-red-50"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center cursor-pointer transition-colors ${
            isDragging
              ? "border-brand-green bg-[#f0f9f4]"
              : "border-[#ccd8ca] bg-[#fafcf9] hover:border-brand-green hover:bg-[#f4f9f2]"
          }`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-7 w-7 animate-spin text-brand-green" />
              <p className="text-xs font-medium text-brand-forest">Uploading…</p>
            </div>
          ) : (
            <>
              <div className="grid h-11 w-11 place-items-center rounded-full bg-[#e9f2e4] mb-2">
                <CloudUpload className="h-5 w-5 text-brand-green" />
              </div>
              <p className="text-xs font-semibold text-brand-forest m-0">
                {isDragging ? "Drop image here" : "Click or drag to upload"}
              </p>
              <p className="text-[11px] text-brand-muted m-0 mt-0.5">
                PNG, JPG, WebP · max 10 MB
              </p>
            </>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Feedback messages */}
      {success && (
        <p className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Uploaded successfully
        </p>
      )}
      {error && (
        <p className="flex items-center gap-1.5 text-xs font-medium text-red-600">
          <AlertCircle className="h-3.5 w-3.5" />
          {error}
        </p>
      )}

      {/* Manual URL fallback */}
      <Input
        type="text"
        placeholder="Or paste an image URL…"
        value={value.startsWith("data:") ? "" : value}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 text-xs bg-white"
      />
    </div>
  );
}
