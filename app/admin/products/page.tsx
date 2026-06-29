"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, X, Upload } from "lucide-react";
import {
  PageHeader,
  Card,
  Field,
  Input,
  SaveButton,
  PrimaryButton,
  GhostButton,
  Toast,
  SectionLabel,
  Spinner,
} from "@/components/admin/AdminUI";
import { getImageUrl } from "@/lib/utils";
import api from "@/lib/api";
import { compressImage } from "@/lib/compress";

interface WoodImage {
  id: string;
  url: string;
  order: number;
}
interface WoodType {
  id: string;
  name: string;
  pros: string[];
  cons: string[];
  order: number;
  images: WoodImage[];
}
type FormState = { name: string; pros: string[]; cons: string[] };

// ── Edit form lifted outside component to prevent remount on each keystroke ──
interface EditFormProps {
  form: FormState;
  saving: boolean;
  onSave: () => void;
  onCancel: () => void;
  setPros: (pros: string[]) => void;
  setCons: (cons: string[]) => void;
  setName: (name: string) => void;
}

function EditForm({
  form,
  saving,
  onSave,
  onCancel,
  setPros,
  setCons,
  setName,
}: EditFormProps) {
  return (
    <div className="mt-1 p-5 border border-wood-ember/20 bg-obsidian rounded-sm">
      <div className="mb-4">
        <Field label="Wood type name">
          <input
            type="text"
            value={form.name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Oak"
            className="w-full px-3 py-2.5 text-sm bg-obsidian border border-wood-deep/30 text-linen font-inter outline-none focus:border-wood-ember rounded-sm"
          />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-5">
        {/* Pros */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-widest text-taupe font-inter">
              Pros
            </span>
            <button
              onClick={() => setPros([...form.pros, ""])}
              className="text-xs text-wood-ember font-inter hover:text-wood-blush"
            >
              + Add
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {form.pros.map((p, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={p}
                  onChange={(e) => {
                    const arr = [...form.pros];
                    arr[i] = e.target.value;
                    setPros(arr);
                  }}
                  placeholder="e.g. Durability"
                  className="flex-1 px-3 py-2 text-xs bg-charcoal border border-wood-deep/30 text-linen font-inter outline-none focus:border-wood-ember rounded-sm"
                />
                <button
                  onClick={() => setPros(form.pros.filter((_, j) => j !== i))}
                  className="text-slate hover:text-wood-sand flex-shrink-0"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Cons */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-widest text-taupe font-inter">
              Cons
            </span>
            <button
              onClick={() => setCons([...form.cons, ""])}
              className="text-xs text-wood-ember font-inter hover:text-wood-blush"
            >
              + Add
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {form.cons.map((c, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={c}
                  onChange={(e) => {
                    const arr = [...form.cons];
                    arr[i] = e.target.value;
                    setCons(arr);
                  }}
                  placeholder="e.g. Expensive"
                  className="flex-1 px-3 py-2 text-xs bg-charcoal border border-wood-deep/30 text-linen font-inter outline-none focus:border-wood-ember rounded-sm"
                />
                <button
                  onClick={() => setCons(form.cons.filter((_, j) => j !== i))}
                  className="text-slate hover:text-wood-sand flex-shrink-0"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <SaveButton onClick={onSave} loading={saving} />
        <GhostButton onClick={onCancel}>Cancel</GhostButton>
      </div>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────
export default function ProductsAdminPage() {
  const [woods, setWoods] = useState<WoodType[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: "",
    pros: [""],
    cons: [""],
  });
  const [saving, setSaving] = useState(false);
  const [uploadingFor, setUploadingFor] = useState<string | null>(null);
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

  const load = useCallback(async () => {
    try {
      const { data } = await api.get("/wood-types");
      setWoods(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const startEdit = (w: WoodType) => {
    setForm({
      name: w.name,
      pros: w.pros.length ? [...w.pros] : [""],
      cons: w.cons.length ? [...w.cons] : [""],
    });
    setEditingId(w.id);
    setCreating(false);
  };

  const startCreate = () => {
    setForm({ name: "", pros: [""], cons: [""] });
    setCreating(true);
    setEditingId(null);
  };

  const cancel = () => {
    setEditingId(null);
    setCreating(false);
  };

  const setPros = (pros: string[]) => setForm((f) => ({ ...f, pros }));
  const setCons = (cons: string[]) => setForm((f) => ({ ...f, cons }));
  const setName = (name: string) => setForm((f) => ({ ...f, name }));

  const save = async () => {
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      const payload = {
        name: form.name,
        pros: form.pros.filter((p) => p.trim()),
        cons: form.cons.filter((c) => c.trim()),
      };
      if (creating) {
        await api.post("/wood-types", payload);
        showToast("Wood type created");
      } else {
        await api.patch(`/wood-types/${editingId}`, payload);
        showToast("Wood type updated");
      }
      await load();
      cancel();
    } catch {
      showToast("Failed to save", "error");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this wood type and all its images?")) return;
    try {
      await api.delete(`/wood-types/${id}`);
      showToast("Deleted");
      setWoods((ws) => ws.filter((w) => w.id !== id));
    } catch {
      showToast("Failed to delete", "error");
    }
  };

  const uploadImage = async (woodId: string, file: File) => {
    setUploadingFor(woodId);
    try {
      const compressed = await compressImage(file);
      const fd = new FormData();
      fd.append("file", compressed);
      await api.post(`/wood-types/${woodId}/images`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      showToast("Image uploaded");
      await load();
    } catch {
      showToast("Upload failed", "error");
    } finally {
      setUploadingFor(null);
    }
  };

  const deleteImage = async (imageId: string) => {
    try {
      await api.delete(`/wood-types/images/${imageId}`);
      showToast("Image removed");
      await load();
    } catch {
      showToast("Failed to remove", "error");
    }
  };

  return (
    <div className="p-8">
      <PageHeader
        title="Wood Types"
        description="Manage the wood materials shown on the homepage."
        action={
          <PrimaryButton onClick={startCreate}>
            <Plus size={13} /> Add wood type
          </PrimaryButton>
        }
      />

      {creating && (
        <Card className="mb-4">
          <SectionLabel>New wood type</SectionLabel>
          <EditForm
            form={form}
            saving={saving}
            onSave={save}
            onCancel={cancel}
            setPros={setPros}
            setCons={setCons}
            setName={setName}
          />
        </Card>
      )}

      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col gap-2">
          {woods.map((wood) => (
            <div key={wood.id} className="rounded-sm overflow-hidden">
              <div
                className={`border p-4 transition-colors ${
                  editingId === wood.id
                    ? "border-wood-ember/40 bg-wood-deep/10"
                    : "border-wood-deep/20 bg-charcoal"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-ash font-inter mb-2">
                      {wood.name}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {wood.pros.map((p) => (
                        <span
                          key={p}
                          className="text-xs px-2 py-0.5 bg-steel-dark/20 text-steel-light font-inter rounded-sm"
                        >
                          ✓ {p}
                        </span>
                      ))}
                      {wood.cons.map((c) => (
                        <span
                          key={c}
                          className="text-xs px-2 py-0.5 bg-wood-ember/10 text-wood-sand font-inter rounded-sm"
                        >
                          ✕ {c}
                        </span>
                      ))}
                    </div>

                    {/* Images */}
                    <div className="flex items-center gap-2 flex-wrap">
                      {wood.images?.map((img) => (
                        <div
                          key={img.id}
                          className="relative group w-12 h-12 rounded-sm overflow-hidden border border-wood-deep/20"
                        >
                          <img
                            src={getImageUrl(img.url)}
                            alt=""
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (
                                e.currentTarget as HTMLImageElement
                              ).style.opacity = "0.2";
                            }}
                          />
                          <button
                            onClick={() => deleteImage(img.id)}
                            className="absolute inset-0 bg-obsidian/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                          >
                            <X size={11} className="text-wood-sand" />
                          </button>
                        </div>
                      ))}

                      <label className="w-12 h-12 flex flex-col items-center justify-center border border-dashed border-wood-deep/30 cursor-pointer hover:border-wood-ember transition-colors rounded-sm">
                        {uploadingFor === wood.id ? (
                          <div className="w-3 h-3 border border-wood-ember border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <Upload
                              size={11}
                              className="text-wood-ember mb-0.5"
                            />
                            <span
                              className="font-inter text-slate"
                              style={{ fontSize: 9 }}
                            >
                              Add
                            </span>
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) uploadImage(wood.id, f);
                            e.target.value = "";
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() =>
                        editingId === wood.id ? cancel() : startEdit(wood)
                      }
                      className="p-2 text-slate hover:text-wood-ember transition-colors"
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      onClick={() => remove(wood.id)}
                      className="p-2 text-slate hover:text-wood-sand transition-colors"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>

              {editingId === wood.id && (
                <EditForm
                  form={form}
                  saving={saving}
                  onSave={save}
                  onCancel={cancel}
                  setPros={setPros}
                  setCons={setCons}
                  setName={setName}
                />
              )}
            </div>
          ))}

          {woods.length === 0 && (
            <div className="text-center py-12 text-sm text-slate font-inter border border-dashed border-wood-deep/20 rounded-sm">
              No wood types yet. Add your first one above.
            </div>
          )}
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}
