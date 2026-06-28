'use client';

import { useState, useEffect } from 'react';
import {
  PageHeader, Card, Field, Input, Textarea,
  SaveButton, Toast, SectionLabel, ThumbUpload, Spinner
} from '@/components/admin/AdminUI';
import { getImageUrl, stripMeta } from '@/lib/utils';
import api from '@/lib/api';

interface About {
  id?: string;
  brandName: string;
  description: string;
  image1?: string;
  image2?: string;
  image3?: string;
  updatedAt?: string;
}

type ImageFiles = { image1?: File; image2?: File; image3?: File; };

export default function AboutAdminPage() {
  const [about, setAbout] = useState<About>({ brandName: '', description: '' });
  const [previews, setPreviews] = useState<{ image1?: string; image2?: string; image3?: string }>({});
  const [imageFiles, setImageFiles] = useState<ImageFiles>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    api.get('/about').then(r => {
      setAbout(r.data);
      setPreviews({
        image1: r.data.image1 ? getImageUrl(r.data.image1) : undefined,
        image2: r.data.image2 ? getImageUrl(r.data.image2) : undefined,
        image3: r.data.image3 ? getImageUrl(r.data.image3) : undefined,
      });
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleImageFile = (key: keyof ImageFiles, file: File) => {
    const url = URL.createObjectURL(file);
    setImageFiles(f => ({ ...f, [key]: file }));
    setPreviews(p => ({ ...p, [key]: url }));
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fd = new FormData();
    fd.append('file', file);
    const token = localStorage.getItem('access_token');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/about/upload`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: fd,
    });
    if (!res.ok) throw new Error('Upload failed');
    const data = await res.json();
    return data.url;
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = { ...stripMeta(about) };

      // Upload any new image files
      if (imageFiles.image1) payload.image1 = await uploadImage(imageFiles.image1);
      if (imageFiles.image2) payload.image2 = await uploadImage(imageFiles.image2);
      if (imageFiles.image3) payload.image3 = await uploadImage(imageFiles.image3);

      await api.patch('/about', payload);
      setSaved(true);
      showToast('About section updated');
      setImageFiles({});
      setTimeout(() => setSaved(false), 2500);
    } catch {
      showToast('Failed to save', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="p-8 l">
      <PageHeader
        title="About Section"
        description="Edit the about us content on the homepage."
        action={<SaveButton onClick={handleSave} loading={saving} saved={saved} />}
      />

      <div className="flex flex-col gap-5">
        <Card>
          <SectionLabel>Content</SectionLabel>
          <div className="flex flex-col gap-4">
            <Field label="Brand name">
              <Input
                value={about.brandName}
                onChange={v => setAbout(a => ({ ...a, brandName: v }))}
                placeholder="BIO CWT"
              />
            </Field>
            <Field label="Description">
              <Textarea
                value={about.description}
                onChange={v => setAbout(a => ({ ...a, description: v }))}
                placeholder="Tell your brand story..."
                rows={5}
              />
            </Field>
          </div>
        </Card>

        <Card>
          <SectionLabel>Photos (3 staggered images)</SectionLabel>
          <p className="text-xs text-slate font-inter mb-4">
            These appear as overlapping photos in the about section. Image 2 is the largest and most prominent.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {(['image1', 'image2', 'image3'] as const).map((key, i) => (
              <Field key={key} label={`Photo ${i + 1}${i === 1 ? ' (main)' : ''}`}>
                <ThumbUpload
                  value={previews[key]}
                  onChange={file => handleImageFile(key, file)}
                  label={`Upload photo ${i + 1}`}
                />
              </Field>
            ))}
          </div>
        </Card>

        <div className="flex justify-end">
          <SaveButton onClick={handleSave} loading={saving} saved={saved} />
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}
