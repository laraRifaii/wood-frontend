const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:3001';

export function getImageUrl(path?: string | null): string {
  if (!path) return '';
  // Full URL (Uploadcare, http, blob) — return as-is
  if (path.startsWith('http') || path.startsWith('blob:') || path.startsWith('data:')) return path;
  // Backend uploads — prepend backend URL
  if (path.startsWith('/uploads/')) return `${BACKEND_URL}${path}`;
  // Static frontend files — served by Vercel
  return path;
}
export async function uploadFile(
  file: File,
  endpoint: string,
  token?: string,
): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: fd,
  });

  if (!res.ok) throw new Error("Upload failed");
  const data = await res.json();
  return data.url || data.src || data.path || "";
}

export function stripMeta<T extends object>(
  obj: T,
): Omit<T, "id" | "createdAt" | "updatedAt"> {
  const { id, createdAt, updatedAt, ...rest } = obj as any;
  return rest;
}
