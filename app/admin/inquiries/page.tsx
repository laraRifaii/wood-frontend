'use client';

import { useState, useEffect, useCallback } from 'react';
import { MessageSquare, Phone, Calendar, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { PageHeader, Toast, Spinner } from '@/components/admin/AdminUI';
import api from '@/lib/api';

interface Inquiry {
  id: string;
  name: string;
  phone: string;
  question: string;
  createdAt: string;
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const load = useCallback(async () => {
    try {
      const { data } = await api.get('/contact');
      setInquiries(data);
    } catch {
      showToast('Failed to load inquiries', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const remove = async (id: string) => {
    if (!confirm('Delete this inquiry?')) return;
    try {
      await api.delete(`/contact/${id}`);
      setInquiries(prev => prev.filter(i => i.id !== id));
      showToast('Inquiry deleted');
    } catch {
      showToast('Failed to delete', 'error');
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  return (
    <div className="p-8">
      <PageHeader
        title="Inquiries"
        description={`${inquiries.length} message${inquiries.length !== 1 ? 's' : ''} received from the contact form.`}
      />

      {loading ? <Spinner /> : inquiries.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-wood-deep/20 rounded-sm">
          <MessageSquare size={32} className="mx-auto mb-3 text-wood-deep/30" />
          <p className="text-sm text-slate font-inter">No inquiries yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {inquiries.map(inquiry => (
            <div
              key={inquiry.id}
              className="border border-wood-deep/20 bg-charcoal rounded-sm overflow-hidden"
            >
              {/* Row header */}
              <div
                className="flex items-center gap-4 p-4 cursor-pointer hover:bg-wood-deep/10 transition-colors"
                onClick={() => setExpanded(expanded === inquiry.id ? null : inquiry.id)}
              >
                {/* Avatar */}
                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-wood-ember/10 border border-wood-ember/20 rounded-sm">
                  <span className="text-xs font-medium text-wood-ember font-inter">
                    {inquiry.name.charAt(0).toUpperCase()}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-ash font-inter">{inquiry.name}</p>
                  <div className="flex items-center gap-4 mt-0.5">
                    <span className="flex items-center gap-1 text-xs text-slate font-inter">
                      <Phone size={10} className="text-wood-ember" />
                      {inquiry.phone}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate font-inter">
                      <Calendar size={10} className="text-wood-ember" />
                      {formatDate(inquiry.createdAt)}
                    </span>
                  </div>
                </div>

                {/* Preview of question */}
                <p className="hidden md:block text-xs text-slate font-inter truncate max-w-xs">
                  {inquiry.question}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={e => { e.stopPropagation(); remove(inquiry.id); }}
                    className="p-2 text-slate hover:text-wood-sand transition-colors"
                  >
                    <Trash2 size={13} />
                  </button>
                  {expanded === inquiry.id
                    ? <ChevronUp size={14} className="text-slate" />
                    : <ChevronDown size={14} className="text-slate" />
                  }
                </div>
              </div>

              {/* Expanded question */}
              {expanded === inquiry.id && (
                <div className="px-4 pb-4 pt-4 pb-4 border-t border-wood-deep/15">
                  <div className="mt-3 p-4 bg-obsidian rounded-sm">
                    <p className="text-xs uppercase tracking-widest text-wood-ember font-inter mb-2">
                      Message
                    </p>
                    <p className="text-sm text-ash font-inter leading-relaxed">
                      {inquiry.question}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    
                     <a href={`tel:${inquiry.phone}`}
                      className="flex items-center gap-1.5 px-4 py-2 text-xs font-inter bg-wood-ember text-obsidian hover:bg-wood-blush transition-colors rounded-sm"
                    >
                      <Phone size={11} /> Call back
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}