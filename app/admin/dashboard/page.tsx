'use client';

import Link from 'next/link';
import { Layers, Package, Wrench, ImageIcon, Info, Star, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const cards = [
  { href: '/admin/hero', label: 'Hero Section', desc: 'Headline, subtitle, CTA and images', icon: Layers },
  { href: '/admin/products', label: 'Wood Types', desc: 'Create, edit and delete wood products', icon: Package },
  { href: '/admin/services', label: 'Services', desc: 'Manage the services you offer', icon: Wrench },
  { href: '/admin/gallery', label: 'Gallery', desc: 'Upload images and reorder the gallery', icon: ImageIcon },
  { href: '/admin/about', label: 'About', desc: 'Brand name, description and images', icon: Info },
  { href: '/admin/advantages', label: 'Advantages', desc: 'Update advantages and CTA button', icon: Star },
];

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="p-8">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-4 h-px bg-wood-ember" />
          <span className="text-xs uppercase tracking-widest text-wood-ember font-inter">Welcome back</span>
        </div>
        <h1 className="font-kyiv text-white text-3xl font-medium mb-2">{user?.name || 'Admin'}</h1>
        <p className="text-sm text-taupe font-inter">Manage all content on the BioWood website.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {cards.map(({ href, label, desc, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group p-5 border border-wood-deep/20 bg-charcoal hover:border-wood-ember/40 hover:bg-wood-deep/10 transition-all rounded-sm"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-8 h-8 flex items-center justify-center bg-wood-ember/10 border border-wood-ember/20 rounded-sm">
                <Icon size={14} className="text-wood-ember" />
              </div>
              <ArrowRight size={13} className="text-wood-deep group-hover:text-wood-ember transition-colors group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-sm font-medium text-ash font-inter mb-1">{label}</p>
            <p className="text-xs text-slate font-inter leading-relaxed">{desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
