'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { loginUser } from '@/lib/auth';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const passwordValid = form.password.length >= 6;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!emailValid || !passwordValid) return;

    setLoading(true);
    setError('');

    await new Promise(r => setTimeout(r, 600)); // simulate network

    const result = loginUser(form.email, form.password);
    if (!result) {
      setError('Invalid email or password. Please try again.');
      setLoading(false);
      return;
    }

    login(result.token, result.user);
    router.push('/admin/dashboard');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #1E0C06 0%, #180b05 100%)' }}
    >
      {/* Back link */}
      <Link
        href="/"
        className="absolute top-6 left-6 text-xs tracking-widest uppercase flex items-center gap-2 transition-colors"
        style={{ color: '#7A574B', fontFamily: "'Inter', sans-serif" }}
        onMouseEnter={e => (e.currentTarget.style.color = '#E1764D')}
        onMouseLeave={e => (e.currentTarget.style.color = '#7A574B')}
      >
        ← Back to site
      </Link>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div
            className="inline-flex items-center justify-center w-12 h-12 mb-4"
            style={{ background: '#E1764D' }}
          >
            <span
              className="text-sm font-bold"
              style={{ fontFamily: "'KyivType Sans', serif", color: '#1E0C06' }}
            >
              BW
            </span>
          </div>
          <h1
            className="text-2xl mb-1"
            style={{ fontFamily: "'KyivType Sans', serif", color: '#F1DED0', fontWeight: 500 }}
          >
            Admin Login
          </h1>
          <p className="text-sm" style={{ color: '#7A574B', fontFamily: "'Inter', sans-serif" }}>
            Sign in to manage your website content
          </p>
        </div>

        {/* Form card */}
        <div
          className="p-8 border"
          style={{ background: '#261208', borderColor: 'rgba(225,118,77,0.15)' }}
        >
          {/* Demo hint */}
          <div
            className="mb-6 px-4 py-3 text-xs border"
            style={{
              background: 'rgba(225,118,77,0.05)',
              borderColor: 'rgba(225,118,77,0.2)',
              color: '#9F8578',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Demo: <strong style={{ color: '#E1764D' }}>admin@woodco.com</strong> / <strong style={{ color: '#E1764D' }}>admin123</strong>
          </div>

          {error && (
            <div
              className="mb-5 px-4 py-3 flex items-center gap-2 text-sm border"
              style={{
                background: 'rgba(139,57,33,0.15)',
                borderColor: 'rgba(139,57,33,0.4)',
                color: '#E59679',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <AlertCircle size={14} style={{ flexShrink: 0 }} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email */}
            <div>
              <label className="block text-xs mb-2 tracking-wide" style={{ color: '#9F8578', fontFamily: "'Inter', sans-serif" }}>
                Email address
              </label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#7A574B' }} />
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  onBlur={() => setTouched(t => ({ ...t, email: true }))}
                  placeholder="admin@woodco.com"
                  className="w-full pl-9 pr-4 py-3 text-sm outline-none transition-colors"
                  style={{
                    background: '#1E0C06',
                    border: `1px solid ${touched.email && !emailValid ? '#8E3921' : 'rgba(225,118,77,0.2)'}`,
                    color: '#F1DED0',
                    fontFamily: "'Inter', sans-serif",
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = '#E1764D')}
                />
              </div>
              {touched.email && !emailValid && (
                <p className="text-xs mt-1" style={{ color: '#E59679', fontFamily: "'Inter', sans-serif" }}>
                  Enter a valid email address
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs mb-2 tracking-wide" style={{ color: '#9F8578', fontFamily: "'Inter', sans-serif" }}>
                Password
              </label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#7A574B' }} />
                <input
                  type={showPw ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  onBlur={() => setTouched(t => ({ ...t, password: true }))}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-3 text-sm outline-none transition-colors"
                  style={{
                    background: '#1E0C06',
                    border: `1px solid ${touched.password && !passwordValid ? '#8E3921' : 'rgba(225,118,77,0.2)'}`,
                    color: '#F1DED0',
                    fontFamily: "'Inter', sans-serif",
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = '#E1764D')}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: '#7A574B' }}
                >
                  {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              {touched.password && !passwordValid && (
                <p className="text-xs mt-1" style={{ color: '#E59679', fontFamily: "'Inter', sans-serif" }}>
                  Password must be at least 6 characters
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="py-4 text-sm font-medium tracking-wide transition-all mt-2 disabled:opacity-60"
              style={{
                background: loading ? '#8E3921' : '#E1764D',
                color: '#1E0C06',
                fontFamily: "'Inter', sans-serif",
              }}
              onMouseEnter={e => !loading && ((e.currentTarget as HTMLButtonElement).style.background = '#FB9E6E')}
              onMouseLeave={e => !loading && ((e.currentTarget as HTMLButtonElement).style.background = '#E1764D')}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
