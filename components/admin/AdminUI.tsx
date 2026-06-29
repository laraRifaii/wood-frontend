"use client";

import { ReactNode, useRef } from "react";
import { Check, Upload, X } from "lucide-react";

// ── Page Header ────────────────────────────────────────────────────────────
export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between mb-8 gap-4">
      <div>
        <h1 className="font-kyiv text-white text-2xl font-medium mb-1">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-taupe font-inter">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

// ── Card ───────────────────────────────────────────────────────────────────
export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border border-wood-deep/20 bg-obsidian/60 p-6 rounded-sm ${className}`}
    >
      {children}
    </div>
  );
}

// ── Section Label ──────────────────────────────────────────────────────────
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-4 h-px bg-wood-ember" />
      <span className="text-xs uppercase tracking-widest text-wood-ember font-inter">
        {children}
      </span>
    </div>
  );
}

// ── Field ──────────────────────────────────────────────────────────────────
export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs uppercase tracking-widest text-taupe font-inter">
        {label}
      </label>
      {children}
      {hint && <span className="text-xs text-slate font-inter">{hint}</span>}
    </div>
  );
}

// ── Input ──────────────────────────────────────────────────────────────────
export function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className="w-full px-3 py-2.5 text-sm bg-obsidian border border-wood-deep/30 text-linen font-inter outline-none transition-colors focus:border-wood-ember disabled:opacity-40 rounded-sm"
    />
  );
}

// ── Textarea ───────────────────────────────────────────────────────────────
export function Textarea({
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-3 py-2.5 text-sm bg-obsidian border border-wood-deep/30 text-linen font-inter outline-none transition-colors focus:border-wood-ember resize-vertical rounded-sm"
    />
  );
}

// ── Select ─────────────────────────────────────────────────────────────────
export function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2.5 text-sm bg-obsidian border border-wood-deep/30 text-linen font-inter outline-none transition-colors focus:border-wood-ember rounded-sm"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} className="bg-obsidian">
          {opt.label}
        </option>
      ))}
    </select>
  );
}

// ── Image Upload ───────────────────────────────────────────────────────────
export function ImageUpload({ value, onChange, label = 'Upload image', uploading = false }: {
  value?: string;
  onChange: (file: File) => void;
  label?: string;
  uploading?: boolean;
}) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-2">
      {uploading ? (
        <div className="w-full aspect-video border border-wood-deep/20 rounded-sm flex flex-col items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-wood-ember border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-taupe font-inter">Uploading...</span>
        </div>
      ) : value ? (
        <div className="relative w-full aspect-video overflow-hidden rounded-sm border border-wood-deep/20">
          <img
            src={value}
            alt="Preview"
            className="w-full h-full object-cover"
            onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          />
          <button
            onClick={() => ref.current?.click()}
            className="absolute inset-0 bg-obsidian/70 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-xs text-linen font-inter"
          >
            <Upload size={14} /> Change image
          </button>
        </div>
      ) : null}

      <button
        onClick={() => ref.current?.click()}
        className="flex items-center justify-center gap-2 w-full py-3 border border-dashed border-wood-deep/40 text-xs text-taupe font-inter hover:border-wood-ember hover:text-wood-ember transition-colors rounded-sm"
      >
        <Upload size={13} />
        {value ? 'Replace image' : label}
      </button>

      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) onChange(f); e.target.value = ''; }}
      />
    </div>
  );
}
// ── Small Image Upload (for thumbnails) ────────────────────────────────────
export function ThumbUpload({ value, onChange, label = 'Upload', uploading = false }: {
  value?: string;
  onChange: (file: File) => void;
  label?: string;
  uploading?: boolean;
}) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-1.5">
      <div
        onClick={() => !uploading && ref.current?.click()}
        className="relative w-full h-32 overflow-hidden border border-wood-deep/30 cursor-pointer group rounded-sm"
        style={{ background: 'var(--color-obsidian)' }}
      >
        {uploading ? (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-wood-ember border-t-transparent rounded-full animate-spin" />
            <span className="text-xs text-taupe font-inter">Uploading...</span>
          </div>
        ) : value ? (
          <>
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            />
            <div className="absolute inset-0 bg-obsidian/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 text-xs text-linen font-inter">
              <Upload size={12} /> Change
            </div>
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 text-slate group-hover:text-wood-ember transition-colors">
            <Upload size={16} />
            <span className="text-xs font-inter">{label}</span>
          </div>
        )}
      </div>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) onChange(f); e.target.value = ''; }}
      />
    </div>
  );
}
// ── Save Button ────────────────────────────────────────────────────────────
export function SaveButton({
  onClick,
  loading,
  saved,
  disabled,
}: {
  onClick: () => void;
  loading?: boolean;
  saved?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium font-inter transition-all disabled:opacity-50 rounded-sm ${
        saved
          ? "bg-wood-deep text-linen"
          : "bg-wood-ember text-obsidian hover:bg-wood-blush"
      }`}
    >
      {saved ? (
        <>
          <Check size={13} /> Saved
        </>
      ) : loading ? (
        "Saving..."
      ) : (
        "Save changes"
      )}
    </button>
  );
}

// ── Primary Button ─────────────────────────────────────────────────────────
export function PrimaryButton({
  onClick,
  children,
  disabled,
}: {
  onClick: () => void;
  children: ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium font-inter bg-wood-ember text-obsidian hover:bg-wood-blush transition-colors disabled:opacity-40 rounded-sm"
    >
      {children}
    </button>
  );
}

// ── Ghost Button ───────────────────────────────────────────────────────────
export function GhostButton({
  onClick,
  children,
  disabled,
}: {
  onClick: () => void;
  children: ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-1.5 px-4 py-2 text-xs font-inter border border-wood-deep/30 text-taupe hover:text-linen hover:border-wood-deep/60 transition-colors disabled:opacity-40 rounded-sm"
    >
      {children}
    </button>
  );
}

// ── Toast ──────────────────────────────────────────────────────────────────
export function Toast({
  message,
  type = "success",
  onClose,
}: {
  message: string;
  type?: "success" | "error";
  onClose?: () => void;
}) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 text-sm font-inter rounded-sm shadow-xl ${
        type === "success"
          ? "bg-wood-deep text-linen"
          : "bg-wood-bark text-linen"
      }`}
    >
      {type === "success" ? (
        <Check size={14} className="text-wood-ember" />
      ) : (
        <X size={14} className="text-wood-sand" />
      )}
      {message}
    </div>
  );
}

// ── Spinner ────────────────────────────────────────────────────────────────
export function Spinner() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="w-5 h-5 border-2 border-wood-ember border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

