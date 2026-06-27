'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import {
  PageHeader, Card, Field, Input, Textarea,
  SaveButton, PrimaryButton, GhostButton, Toast, SectionLabel, Spinner, ThumbUpload
} from '@/components/admin/AdminUI';
import { getImageUrl } from '@/lib/utils';
import api from '@/lib/api';

interface Service { id: string; title: string; description: string; icon?: string; image?: string; order: number; }
type FormState = { title: string; description: string; icon: string; image?: string; imageFile?: File; };

export default function ServicesAdminPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<FormState>({ title: '', description: '', icon: '' });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const load = useCallback(async () => {
    try {
      const { data } = await api.get('/services');
      setServices(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const startEdit = (s: Service) => {
    setForm({ title: s.title, description: s.description, icon: s.icon || '', image: s.image });
    setEditingId(s.id);
    setCreating(false);
  };

  const cancel = () => { setEditingId(null); setCreating(false); };

  const save = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      let imageUrl = form.image;

      // Upload image if new file selected
      if (form.imageFile) {
        const fd = new FormData();
        fd.append('file', form.imageFile);
        const token = localStorage.getItem('access_token');
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/upload`, {
          method: 'POST',
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          body: fd,
        });
        if (res.ok) {
          const data = await res.json();
          imageUrl = data.url;
        }
      }

      const payload = { title: form.title, description: form.description, icon: form.icon, image: imageUrl };

      if (creating) {
        await api.post('/services', payload);
        showToast('Service created');
      } else {
        await api.patch(`/services/${editingId}`, payload);
        showToast('Service updated');
      }
      await load();
      cancel();
    } catch {
      showToast('Failed to save', 'error');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this service?')) return;
    try {
      await api.delete(`/services/${id}`);
      showToast('Deleted');
      setServices(ss => ss.filter(s => s.id !== id));
    } catch {
      showToast('Failed to delete', 'error');
    }
  };

  const EditForm = () => (
    <div className="mt-1 p-5 border border-wood-ember/20 bg-obsidian rounded-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Field label="Title">
          <Input value={form.title} onChange={v => setForm(f => ({ ...f, title: v }))} placeholder="Custom Furniture" />
        </Field>
        <Field label="Icon name" hint="e.g. sofa, home, wrench (Lucide icon name)">
          <Input value={form.icon} onChange={v => setForm(f => ({ ...f, icon: v }))} placeholder="wrench" />
        </Field>
      </div>
      <div className="mb-4">
        <Field label="Description">
          <Textarea value={form.description} onChange={v => setForm(f => ({ ...f, description: v }))} placeholder="Describe this service..." />
        </Field>
      </div>
      <div className="mb-5">
        <Field label="Service image">
          <ThumbUpload
            value={form.image ? (form.image.startsWith('blob:') ? form.image : getImageUrl(form.image)) : undefined}
            onChange={file => setForm(f => ({ ...f, imageFile: file, image: URL.createObjectURL(file) }))}
            label="Upload service image"
          />
        </Field>
      </div>
      <div className="flex gap-3">
        <SaveButton onClick={save} loading={saving} />
        <GhostButton onClick={cancel}>Cancel</GhostButton>
      </div>
    </div>
  );

  return (
    <div className="p-8">
      <PageHeader
        title="Services"
        description="Manage the services offered by BioWood."
        action={<PrimaryButton onClick={() => { setCreating(true); setEditingId(null); setForm({ title: '', description: '', icon: '' }); }}><Plus size={13} /> Add service</PrimaryButton>}
      />

      {/* Placement note */}
      <div className="mb-6 px-4 py-3 border border-steel-dark/30 bg-steel-dark/10 rounded-sm">
        <p className="text-xs text-steel-light font-inter leading-relaxed">
          <span className="font-medium text-steel-light">💡 Suggestion:</span> Services are best displayed in a dedicated section between the gallery and advantages — e.g. "What we offer" with icon cards. Add a <code className="bg-obsidian px-1 rounded">ServicesSection</code> component to your homepage and pass the services from the API.
        </p>
      </div>

      {creating && (
        <Card className="mb-4">
          <SectionLabel>New service</SectionLabel>
          <EditForm />
        </Card>
      )}

      {loading ? <Spinner /> : (
        <div className="flex flex-col gap-2">
          {services.map(service => (
            <div key={service.id} className="rounded-sm overflow-hidden">
              <div
                className={`border p-4 flex items-start gap-4 transition-colors ${
                  editingId === service.id ? 'border-wood-ember/40 bg-wood-deep/10' : 'border-wood-deep/20 bg-charcoal'
                }`}
              >
                {/* Image or icon placeholder */}
                <div className="w-12 h-12 flex-shrink-0 overflow-hidden rounded-sm border border-wood-deep/20 bg-obsidian">
                  {service.image ? (
                    <img src={getImageUrl(service.image)} alt={service.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs font-bold text-wood-ember font-inter">
                      {(service.icon || service.title).slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-ash font-inter mb-0.5">{service.title}</p>
                  <p className="text-xs text-slate font-inter truncate">{service.description}</p>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  <button onClick={() => editingId === service.id ? cancel() : startEdit(service)} className="p-2 text-slate hover:text-wood-ember transition-colors">
                    <Pencil size={13} />
                  </button>
                  <button onClick={() => remove(service.id)} className="p-2 text-slate hover:text-wood-sand transition-colors">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
              {editingId === service.id && <EditForm />}
            </div>
          ))}

          {services.length === 0 && (
            <div className="text-center py-12 text-sm text-slate font-inter border border-dashed border-wood-deep/20 rounded-sm">
              No services yet. Add your first one above.
            </div>
          )}
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}
