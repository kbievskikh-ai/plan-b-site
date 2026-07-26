// Helper to inject Cloudinary on-the-fly transformations into existing
// Cloudinary delivery URLs, without touching the stored/original asset.
// Cuts payload significantly (auto format -> WebP/AVIF where supported,
// auto quality, and resizing to the actual display width) with zero
// re-upload/storage changes.
//
// Example:
//   https://res.cloudinary.com/ddqokxhjq/image/upload/v123/migronis/property/abc.jpg
// becomes:
//   https://res.cloudinary.com/ddqokxhjq/image/upload/f_auto,q_auto,w_800,c_limit/v123/migronis/property/abc.jpg

export function cloudinaryResize(url: string | undefined | null, width: number): string {
  if (!url) return '';
  if (!url.includes('res.cloudinary.com') || !url.includes('/upload/')) return url;
  // Already has a transformation segment (e.g. from a previous call) — don't double up.
  const marker = '/upload/';
  const idx = url.indexOf(marker);
  if (idx === -1) return url;
  const before = url.slice(0, idx + marker.length);
  const after = url.slice(idx + marker.length);
  // Guard against double-transforming if this helper is (accidentally) called twice.
  if (/^f_auto,q_auto/.test(after)) return url;
  return `${before}f_auto,q_auto,w_${width},c_limit/${after}`;
}
