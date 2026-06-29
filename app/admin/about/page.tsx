"use client";

import { useState, useEffect } from "react";
import {
  PageHeader,
  Card,
  Field,
  Input,
  Textarea,
  SaveButton,
  Toast,
  SectionLabel,
  ThumbUpload,
  Spinner,
} from "@/components/admin/AdminUI";
import { getImageUrl, stripMeta } from "@/lib/utils";
import api from "@/lib/api";
import { compressImage } from "@/lib/compress";
interface About {
  id?: string;
  brandName: string;
  description: string;
  image1?: string;
  image2?: string;
  image3?: string;
  updatedAt?: string;
}

export default function AboutAdminPage() {
  const [about, setAbout] = useState<About>({ brandName: "", description: "" });
  const [previews, setPreviews] = useState<{
    image1?: string;
    image2?: string;
    image3?: string;
  }>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  const showToast = (
    message: string,
    type: "success" | "error" = "success",
  ) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    api
      .get("/about")
      .then((r) => {
        setAbout(r.data);
        setPreviews({
          image1: r.data.image1 ? getImageUrl(r.data.image1) : undefined,
          image2: r.data.image2 ? getImageUrl(r.data.image2) : undefined,
          image3: r.data.image3 ? getImageUrl(r.data.image3) : undefined,
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleImageFile = async (
    key: "image1" | "image2" | "image3",
    file: File,
  ) => {
    // NO createObjectURL — mark uploading and wait for real URL
    setUploadingField(key);
    try {
      const compressed = await compressImage(file);
      const fd = new FormData();
      fd.append("file", compressed);

      const { data } = await api.post("/about/upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setAbout((a) => ({ ...a, [key]: data.url }));
      setPreviews((p) => ({ ...p, [key]: data.url })); // real URL only
      showToast("Image uploaded");
    } catch {
      showToast("Upload failed", "error");
      // don't touch previews on failure — keep the old value
    } finally {
      setUploadingField(null);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.patch("/about", stripMeta(about));
      setSaved(true);
      showToast("About section updated");
      setTimeout(() => setSaved(false), 2500);
    } catch {
      showToast("Failed to save", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="p-8">
      <PageHeader
        title="About Section"
        description="Edit the about us content on the homepage."
        action={
          <SaveButton onClick={handleSave} loading={saving} saved={saved} />
        }
      />

      <div className="flex flex-col gap-5">
        <Card>
          <SectionLabel>Content</SectionLabel>
          <div className="flex flex-col gap-4">
            <Field label="Brand name">
              <Input
                value={about.brandName}
                onChange={(v) => setAbout((a) => ({ ...a, brandName: v }))}
                placeholder="BIO CWT"
              />
            </Field>
            <Field label="Description">
              <Textarea
                value={about.description}
                onChange={(v) => setAbout((a) => ({ ...a, description: v }))}
                placeholder="Tell your brand story..."
                rows={5}
              />
            </Field>
          </div>
        </Card>

        <Card>
          <SectionLabel>Photos (3 staggered images)</SectionLabel>
          <p className="text-xs text-slate font-inter mb-4">
            These appear as overlapping photos in the about section. Image 2 is
            the largest and most prominent.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {(["image1", "image2", "image3"] as const).map((key, i) => (
              <Field
                key={key}
                label={`Photo ${i + 1}${i === 1 ? " (main)" : ""}`}
              >
                <ThumbUpload
                  value={previews[key]}
                  onChange={(file) => handleImageFile(key, file)}
                  label={`Upload photo ${i + 1}`}
                  uploading={uploadingField === key}
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
