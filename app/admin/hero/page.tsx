"use client";

import { useState, useEffect } from "react";
import {
  PageHeader,
  Card,
  Field,
  Input,
  Textarea,
  Select,
  SaveButton,
  Toast,
  SectionLabel,
  ImageUpload,
  ThumbUpload,
} from "@/components/admin/AdminUI";
import { stripMeta, getImageUrl } from "@/lib/utils";
import api from "@/lib/api";

const ROUTE_OPTIONS = [
  { label: "Home", value: "/" },
  { label: "Gallery", value: "/gallery" },
  { label: "Price List", value: "/price-list" },
  { label: "About Us", value: "/about" },
  { label: "Contact", value: "/contact" },
];

interface Hero {
  id?: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string;
  image1?: string;
  image2?: string;
  image3?: string;
  updatedAt?: string;
}

export default function HeroAdminPage() {
  const [hero, setHero] = useState<Hero>({
    title: "",
    subtitle: "",
    ctaText: "",
    ctaLink: "/",
  });
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (
    message: string,
    type: "success" | "error" = "success",
  ) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    api
      .get("/hero")
      .then((r) => {
        // Filter out any blob URLs that may have been saved incorrectly
        const data = r.data;
        setHero({
          ...data,
          image1: data.image1?.startsWith("blob:") ? undefined : data.image1,
          image2: data.image2?.startsWith("blob:") ? undefined : data.image2,
          image3: data.image3?.startsWith("blob:") ? undefined : data.image3,
          backgroundImage: data.backgroundImage?.startsWith("blob:")
            ? undefined
            : data.backgroundImage,
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleFileUpload = async (file: File, field: keyof Hero) => {
    setUploadingField(field as string);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const { data } = await api.post("/hero/upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // Only set the real Uploadcare URL — never a blob
      setHero((h) => ({ ...h, [field]: data.url }));
      showToast("Image uploaded");
    } catch {
      showToast("Image upload failed", "error");
    } finally {
      setUploadingField(null);
    }
  };

  const handleSave = async () => {
    if (uploadingField) {
      showToast("Please wait for image upload to finish", "error");
      return;
    }
    setSaving(true);
    try {
      const payload = stripMeta(hero);

      // Nuclear option — strip any non-Uploadcare URLs before saving
      const imageFields = [
        "backgroundImage",
        "image1",
        "image2",
        "image3",
      ] as const;

      for (const field of imageFields) {
        const val = payload[field];
        if (
          val &&
          !val.startsWith("https://ucarecdn.com/") &&
          !val.startsWith("/")
        ) {
          delete payload[field]; // only strip blob: and other bad URLs
        }
      }

      await api.patch("/hero", payload);
      setSaved(true);
      showToast("Hero section updated");
      setTimeout(() => setSaved(false), 2500);
    } catch {
      showToast("Failed to save", "error");
    } finally {
      setSaving(false);
    }
  };
  if (loading)
    return <div className="p-8 text-sm text-taupe font-inter">Loading...</div>;

  return (
    <div className="p-8 ">
      <PageHeader
        title="Hero Section"
        description="Edit the main banner on the homepage."
        action={
          <SaveButton
            onClick={handleSave}
            loading={saving}
            saved={saved}
            disabled={!!uploadingField}
          />
        }
      />

      <div className="flex flex-col gap-5">
        {/* Content */}
        <Card>
          <SectionLabel>Content</SectionLabel>
          <div className="flex flex-col gap-4">
            <Field label="Headline" hint="Use \n for a line break">
              <Textarea
                value={hero.title}
                onChange={(v) => setHero((h) => ({ ...h, title: v }))}
                placeholder="SOLID\nWOOD\nPRODUCTS"
                rows={3}
              />
            </Field>
            <Field label="Subtitle">
              <Textarea
                value={hero.subtitle}
                onChange={(v) => setHero((h) => ({ ...h, subtitle: v }))}
                placeholder="Describe your brand..."
              />
            </Field>
          </div>
        </Card>

        {/* CTA */}
        <Card>
          <SectionLabel>Call to action</SectionLabel>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Button text">
              <Input
                value={hero.ctaText}
                onChange={(v) => setHero((h) => ({ ...h, ctaText: v }))}
                placeholder="Order"
              />
            </Field>
            <Field label="Button link">
              <Select
                value={hero.ctaLink}
                onChange={(v) => setHero((h) => ({ ...h, ctaLink: v }))}
                options={ROUTE_OPTIONS}
              />
            </Field>
          </div>
        </Card>

        {/* Background image */}
        <Card>
          <SectionLabel>Background image</SectionLabel>
          <ImageUpload
            value={
              hero.backgroundImage && !hero.backgroundImage.startsWith("blob:")
                ? getImageUrl(hero.backgroundImage)
                : undefined
            }
            onChange={(file) => handleFileUpload(file, "backgroundImage")}
            label="Upload background image"
            uploading={uploadingField === "backgroundImage"}
          />
        </Card>

        {/* Hero images */}
        <Card>
          <SectionLabel>Side images (3 staggered photos)</SectionLabel>
          <div className="grid grid-cols-3 gap-3">
            {(["image1", "image2", "image3"] as const).map((key, i) => (
              <Field key={key} label={`Image ${i + 1}`}>
                <ThumbUpload
                  value={hero[key] ? getImageUrl(hero[key]!) : undefined}
                  onChange={(file) => handleFileUpload(file, key)}
                  label={`Photo ${i + 1}`}
                  uploading={uploadingField === key}
                />
              </Field>
            ))}
          </div>
        </Card>

        {/* Live preview */}
        <Card>
          <SectionLabel>Preview</SectionLabel>
          <div className="p-6 rounded-sm bg-gradient-to-br from-obsidian to-wood-deep/30">
            <div className="font-kyiv text-white text-2xl font-medium mb-2 leading-tight">
              {hero.title.split("\\n").map((line, i) => (
                <div key={i} className={i === 1 ? "text-wood-ember" : ""}>
                  {line || "\u00A0"}
                </div>
              ))}
            </div>
            <p className="text-sm text-taupe font-inter mb-4">
              {hero.subtitle}
            </p>
            <div className="inline-block px-5 py-2 text-xs font-medium font-inter bg-wood-ember text-obsidian rounded-sm">
              {hero.ctaText || "Button"}
            </div>
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
