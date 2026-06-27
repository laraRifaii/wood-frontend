"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });

  useEffect(() => {
    if (!isLoading && isAuthenticated) router.replace("/admin/dashboard");
  }, [isAuthenticated, isLoading, router]);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const passwordValid = form.password.length >= 6;
  const canSubmit = emailValid && passwordValid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!canSubmit) return;

    setSubmitting(true);
    setError("");
    const result = await login(form.email, form.password);
    if (result.error) {
      setError(result.error);
      setSubmitting(false);
    } else {
      router.push("/admin/dashboard");
    }
  };

  if (isLoading) return null;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo mark */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-20 h-10 mb-5 ">
            <div
              className="font-kyiv text-sm font-medium"
              style={{ color: "#1E0C06" }}
            >
              <Image
                src="/logo.png"
                alt="BioWood Logo"
                width={80}
                height={80}
                style={{ width: 50, height: 25 }}
              />
            </div>
          </div>
          <h1
            className="font-kyiv text-white mb-1"
            style={{ fontSize: 28, fontWeight: 500 }}
          >
            Admin Login
          </h1>
          <p
            className="text-sm"
            style={{ color: "#7A574B", fontFamily: "Inter, sans-serif" }}
          >
            Sign in to manage your website
          </p>
        </div>

        {/* Card */}
        <div className="p-7 border bg-obsidian">
          {error && (
            <div
              className="flex items-center gap-2 px-4 py-3 mb-5 text-sm border"
              style={{
                background: "rgba(142,57,33,0.12)",
                borderColor: "rgba(142,57,33,0.35)",
                color: "#E59679",
                fontFamily: "Inter, sans-serif",
              }}
            >
              <AlertCircle size={14} style={{ flexShrink: 0 }} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email */}
            <div>
              <label
                className="block text-xs uppercase tracking-widest mb-2"
                style={{ color: "#9F8578", fontFamily: "Inter, sans-serif" }}
              >
                Email
              </label>
              <div className="relative">
                <Mail
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: "#5B6069" }}
                />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  onBlur={(e) => {
                    setTouched((t) => ({ ...t, email: true }));
                    (e.currentTarget as HTMLInputElement).style.borderColor =
                      touched.email && !emailValid
                        ? "#8E3921"
                        : "rgba(225,118,77,0.2)";
                  }}
                  placeholder="admin@biowood.com"
                  autoComplete="email"
                  className="w-full pl-9 pr-4 py-3 text-sm outline-none transition-all"
                  style={{
                    background: "#1E0C06",
                    border: `1px solid ${touched.email && !emailValid ? "#8E3921" : "rgba(225,118,77,0.2)"}`,
                    color: "#F1DED0",
                    fontFamily: "Inter, sans-serif",
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "#E1764D")
                  }
                />
              </div>
              {touched.email && !emailValid && (
                <p
                  className="text-xs mt-1"
                  style={{ color: "#E59679", fontFamily: "Inter, sans-serif" }}
                >
                  Enter a valid email address
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                className="block text-xs uppercase tracking-widest mb-2"
                style={{ color: "#9F8578", fontFamily: "Inter, sans-serif" }}
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: "#5B6069" }}
                />
                <input
                  type={showPw ? "text" : "password"}
                  value={form.password}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, password: e.target.value }))
                  }
                  onBlur={(e) => {
                    setTouched((t) => ({ ...t, password: true }));
                    (e.currentTarget as HTMLInputElement).style.borderColor =
                      touched.password && !passwordValid
                        ? "#8E3921"
                        : "rgba(225,118,77,0.2)";
                  }}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full pl-9 pr-10 py-3 text-sm outline-none"
                  style={{
                    background: "#1E0C06",
                    border: `1px solid ${touched.password && !passwordValid ? "#8E3921" : "rgba(225,118,77,0.2)"}`,
                    color: "#F1DED0",
                    fontFamily: "Inter, sans-serif",
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "#E1764D")
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 "
                  style={{ color: "#5B6069" }}
                >
                  {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              {touched.password && !passwordValid && (
                <p
                  className="text-xs mt-1"
                  style={{ color: "#E59679", fontFamily: "Inter, sans-serif" }}
                >
                  Password must be at least 6 characters
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 py-3 text-sm bg-steel-light font-medium tracking-wide transition-all disabled:opacity-50"
              style={{
               
                color: "#1E0C06",
                fontFamily: "Inter, sans-serif",
              }}
              onMouseEnter={(e) =>
                !submitting &&
                ((e.currentTarget as HTMLButtonElement).style.background =
                  "#FB9E6E")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background =
                  "#E1764D")
              }
            >
              {submitting ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
        <p className="text-sm text-center pt-10">
          Email: admin@biowood.com
          <br />
          Password: Admin123!
        </p>
      </div>
    </div>
  );
}
