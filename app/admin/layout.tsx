'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard, Layers, Wrench, Package, ImageIcon,
  Info, Star, LogOut, ExternalLink, ChevronRight, MessageSquare
} from 'lucide-react';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/hero', label: 'Hero Section', icon: Layers },
  { href: '/admin/products', label: 'Wood Types', icon: Package },
  { href: '/admin/services', label: 'Services', icon: Wrench },
  { href: '/admin/gallery', label: 'Gallery', icon: ImageIcon },
  { href: '/admin/about', label: 'About', icon: Info },
  { href: '/admin/advantages', label: 'Advantages', icon: Star },
  { href: '/admin/inquiries', label: 'Inquiries', icon: MessageSquare },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.replace('/login');
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-charcoal">
        <div className="w-5 h-5 border-2 border-wood-ember border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-screen flex overflow-hidden bg-obsidian">
      {/* Sidebar */}
      <aside className="w-52 shrink-0 flex flex-col border-r border-wood-deep/15 bg-charcoal h-screen overflow-y-auto">
        {/* Logo */}
        <div className="px-5 h-14 flex items-center border-b border-wood-deep/15">
          <Link href="/" target="_blank">
            <Image
              src="/icons/logo.svg"
              alt="BioWood"
              width={90}
              height={36}
              style={{ width: 'auto', height: 28 }}
            />
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 px-2 flex flex-col gap-0.5">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2.5 px-3 py-2 text-xs font-inter transition-all rounded-sm border-l-2 ${
                  active
                    ? 'bg-wood-ember/10 text-wood-ember border-wood-ember'
                    : 'text-taupe border-transparent hover:text-ash hover:bg-wood-deep/10'
                }`}
              >
                <Icon size={13} className="flex-shrink-0" />
                {label}
                {active && <ChevronRight size={10} className="ml-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-wood-deep/15">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 text-xs font-inter text-slate hover:text-taupe transition-colors mb-3"
          >
            <ExternalLink size={11} /> View site
          </Link>
          <p className="text-xs font-inter text-slate truncate mb-2">{user?.email}</p>
          <button
            onClick={async () => { await logout(); router.push('/login'); }}
            className="flex items-center gap-1.5 text-xs font-inter text-slate hover:text-wood-sand transition-colors"
          >
            <LogOut size={11} /> Sign out
          </button>
        </div>
      </aside>

      {/* Main — key forces remount on route change for speed */}
      <main key={pathname} className="flex-1 overflow-y-auto bg-obsidian">
        {children}
      </main>
    </div>
  );
}
