"use client";

import { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
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

interface AdvantageItem {
  id?: string;
  description: string;
  order?: number;
}
interface Advantages {
  id?: string;
  image?: string;
  cta: string;
  items: AdvantageItem[];
  updatedAt?: string;
}

const MAX_ITEMS = 5;

export default function AdvantagesAdminPage() {
  const [data, setData] = useState<Advantages>({ cta: "", items: [] });
  const [imagePreview, setImagePreview] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const showToast = (
    message: string,
    type: "success" | "error" = "success",
  ) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    api
      .get("/advantages")
      .then((r) => {
        setData(r.data);
        if (r.data.image) setImagePreview(getImageUrl(r.data.image));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleImageFile = async (file: File) => {
    // NO createObjectURL
    setUploadingImage(true);
    try {
      const compressed = await compressImage(file);
      const fd = new FormData();
      fd.append("file", compressed);
      const { data: res } = await api.post("/advantages/upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setData((d) => ({ ...d, image: res.url }));
      setImagePreview(res.url); // real URL only
      showToast("Image uploaded");
    } catch {
      showToast("Upload failed", "error");
      // don't clear imagePreview — keep whatever was there before
    } finally {
      setUploadingImage(false);
    }
  };

  const addItem = () => {
    if (data.items.length >= MAX_ITEMS) return;
    setData((d) => ({ ...d, items: [...d.items, { description: "" }] }));
  };

  const updateItem = (i: number, val: string) => {
    const items = [...data.items];
    items[i] = { ...items[i], description: val };
    setData((d) => ({ ...d, items }));
  };

  const removeItem = (i: number) => {
    setData((d) => ({ ...d, items: d.items.filter((_, j) => j !== i) }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.patch("/advantages", {
        cta: data.cta,
        image: data.image,
        items: data.items.filter((i) => i.description.trim()),
      });
      setSaved(true);
      showToast("Advantages updated");
      setTimeout(() => setSaved(false), 2500);
    } catch {
      showToast("Failed to save", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Spinner />;

  const atLimit = data.items.length >= MAX_ITEMS;

  return (
    <div className="p-8">
      <PageHeader
        title="Advantages"
        description="Manage the advantages section on the homepage."
        action={
          <SaveButton onClick={handleSave} loading={saving} saved={saved} />
        }
      />

      <div className="flex flex-col gap-5">
        <Card>
          <SectionLabel>Settings</SectionLabel>
          <Field label="CTA button text">
            <Input
              value={data.cta}
              onChange={(v) => setData((d) => ({ ...d, cta: v }))}
              placeholder="Receive a consultation"
            />
          </Field>
        </Card>

        <Card>
          <SectionLabel>Section image</SectionLabel>
          <ThumbUpload
            value={imagePreview}
            onChange={handleImageFile}
            label="Upload section image"
            uploading={!!uploadingImage}
          />
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-5">
            <SectionLabel>
              Advantages ({data.items.length}/{MAX_ITEMS})
            </SectionLabel>
            <button
              onClick={addItem}
              disabled={atLimit}
              className={`flex items-center gap-1 text-xs font-inter transition-colors ${
                atLimit
                  ? "text-slate cursor-not-allowed"
                  : "text-wood-ember hover:text-wood-blush"
              }`}
            >
              <Plus size={12} />
              {atLimit ? `Max ${MAX_ITEMS} reached` : "Add"}
            </button>
          </div>

          {data.items.length === 0 && (
            <p className="text-xs text-slate font-inter text-center py-4">
              No advantages yet. Click "Add" to create one.
            </p>
          )}

          <div className="flex flex-col gap-3">
            {data.items.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className="w-5 h-5 shrink-0 flex items-center justify-center bg-wood-ember/10 text-wood-ember rounded-sm mt-2.5"
                  style={{ fontSize: 9, fontFamily: "Inter, sans-serif" }}
                >
                  {i + 1}
                </div>
                <div className="flex-1">
                  <Textarea
                    value={item.description}
                    onChange={(v) => updateItem(i, v)}
                    placeholder="Describe this advantage..."
                    rows={2}
                  />
                </div>
                <button
                  onClick={() => removeItem(i)}
                  className="mt-2.5 p-1 text-slate hover:text-wood-sand transition-colors shrink-0"
                >
                  <X size={13} />
                </button>
              </div>
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
