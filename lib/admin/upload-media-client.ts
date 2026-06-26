export type MediaUploadResult = { url: string };

export async function uploadAdminMedia(
  file: File,
  options?: { folder?: string; clientKey?: string },
): Promise<MediaUploadResult> {
  const formData = new FormData();
  formData.append("file", file);
  if (options?.folder) formData.append("folder", options.folder);
  if (options?.clientKey) formData.append("clientKey", options.clientKey);

  const res = await fetch("/api/admin/media/upload", {
    method: "POST",
    credentials: "same-origin",
    body: formData,
  });

  const data = (await res.json().catch(() => ({}))) as {
    url?: string;
    error?: string;
  };

  if (!res.ok || !data.url) {
    throw new Error(data.error || "Upload failed");
  }

  return { url: data.url };
}
