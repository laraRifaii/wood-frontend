'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Upload, Trash2, GripVertical, X, ImageIcon } from 'lucide-react';
import { PageHeader, PrimaryButton, SaveButton, Toast, Spinner } from '@/components/admin/AdminUI';
import { getImageUrl } from '@/lib/utils';
import api from '@/lib/api';

interface GalleryImage { id: string; src: string; alt: string; category?: string; order: number; }

const CATEGORIES = ['Furniture', 'Interior', 'Restoration', 'Uncategorized'];

export default function GalleryAdminPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const load = useCallback(async () => {
    try {
      const { data } = await api.get('/gallery');
      setImages(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleUpload = async (files: FileList | null) => {
    if (!files?.length) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append('file', file);
        await api.post('/gallery/upload', fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
          params: { alt: file.name.replace(/\.[^.]+$/, '') },
        });
      }
      showToast(`${files.length} image${files.length > 1 ? 's' : ''} uploaded`);
      await load();
    } catch {
      showToast('Upload failed', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleSaveOrder = async () => {
    setSaving(true);
    try {
      await api.patch('/gallery/reorder', {
        items: images.map((img, i) => ({ id: img.id, order: i })),
      });
      setSaved(true);
      showToast('Order saved');
      setTimeout(() => setSaved(false), 2500);
    } catch {
      showToast('Failed to save order', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this image?')) return;
    try {
      await api.delete(`/gallery/${id}`);
      setImages(imgs => imgs.filter(i => i.id !== id));
      showToast('Image removed');
    } catch {
      showToast('Failed to remove', 'error');
    }
  };

  const updateMeta = (id: string, key: 'alt' | 'category', val: string) => {
    setImages(imgs => imgs.map(i => i.id === id ? { ...i, [key]: val } : i));
  };

  // Drag reorder
  const onDragStart = (id: string) => setDragging(id);
  const onDragOver = (e: React.DragEvent, id: string) => { e.preventDefault(); setDragOver(id); };
  const onDrop = (targetId: string) => {
    if (!dragging || dragging === targetId) { setDragging(null); setDragOver(null); return; }
    const from = images.findIndex(i => i.id === dragging);
    const to = images.findIndex(i => i.id === targetId);
    const arr = [...images];
    const [moved] = arr.splice(from, 1);
    arr.splice(to, 0, moved);
    setImages(arr);
    setDragging(null);
    setDragOver(null);
  };

  return (
    <div className="p-8">
      <PageHeader
        title="Gallery"
        description={`${images.length} images · drag to reorder`}
        action={
          <div className="flex gap-3">
            <PrimaryButton onClick={() => fileRef.current?.click()}>
              <Upload size={13} /> {uploading ? 'Uploading...' : 'Upload'}
            </PrimaryButton>
            <SaveButton onClick={handleSaveOrder} loading={saving} saved={saved} />
          </div>
        }
      />

      {/* Drop zone */}
      <div
        className="border-2 border-dashed border-wood-deep/25 bg-charcoal p-10 text-center mb-6 cursor-pointer hover:border-wood-ember/50 transition-colors rounded-sm"
        onClick={() => fileRef.current?.click()}
        onDragOver={e => { e.preventDefault(); e.currentTarget.style.borderColor = 'var(--color-wood-ember)'; }}
        onDragLeave={e => { e.currentTarget.style.borderColor = ''; }}
        onDrop={e => {
          e.preventDefault();
          e.currentTarget.style.borderColor = '';
          handleUpload(e.dataTransfer.files);
        }}
      >
        <ImageIcon size={22} className="mx-auto mb-2 text-wood-deep/50" />
        <p className="text-sm text-taupe font-inter">
          Drop images here or <span className="text-wood-ember">click to upload</span>
        </p>
        <p className="text-xs text-slate font-inter mt-1">JPG, PNG, WebP</p>
      </div>

      <input ref={fileRef} type="file" multiple accept="image/*" className="hidden"
        onChange={e => { handleUpload(e.target.files); e.target.value = ''; }} />

      {loading ? <Spinner /> : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map((img, idx) => (
            <div
              key={img.id}
              draggable
              onDragStart={() => onDragStart(img.id)}
              onDragOver={e => onDragOver(e, img.id)}
              onDrop={() => onDrop(img.id)}
              onDragEnd={() => { setDragging(null); setDragOver(null); }}
              className={`border rounded-sm overflow-hidden transition-all cursor-grab ${
                dragOver === img.id ? 'border-wood-ember' : 'border-wood-deep/20'
              } ${dragging === img.id ? 'opacity-40' : ''} bg-charcoal`}
            >
              {/* Image */}
              <div className="relative w-full bg-obsidian" style={{ aspectRatio: '4/3' }}>
                {img.src ? (
                  <img
                    src={getImageUrl(img.src)}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                    onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon size={20} className="text-wood-deep/40" />
                  </div>
                )}

                {/* Order badge */}
                <div className="absolute top-2 left-2 w-5 h-5 flex items-center justify-center bg-obsidian/80 text-wood-ember rounded-sm" style={{ fontSize: 9, fontFamily: 'Inter, sans-serif' }}>
                  {idx + 1}
                </div>
                <div className="absolute top-2 right-8 text-linen/30">
                  <GripVertical size={13} />
                </div>
                <button
                  onClick={() => handleDelete(img.id)}
                  className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center bg-obsidian/80 text-slate hover:text-wood-sand transition-colors"
                >
                  <X size={10} />
                </button>
              </div>

              {/* Meta */}
              <div className="p-2 flex flex-col gap-1.5">
                <input
                  type="text"
                  value={img.alt}
                  onChange={e => updateMeta(img.id, 'alt', e.target.value)}
                  placeholder="Alt text"
                  className="w-full px-2 py-1.5 text-xs bg-obsidian border border-wood-deep/20 text-ash font-inter outline-none focus:border-wood-ember rounded-sm"
                />
                <select
                  value={img.category || 'Uncategorized'}
                  onChange={e => updateMeta(img.id, 'category', e.target.value)}
                  className="w-full px-2 py-1.5 text-xs bg-obsidian border border-wood-deep/20 text-taupe font-inter outline-none rounded-sm"
                >
                  {CATEGORIES.map(c => <option key={c} value={c} className="bg-obsidian">{c}</option>)}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}
