// Static export has no image-optimisation server, so let Unsplash's CDN resize photos instead.
// Local files (logo, icon) are served as-is.
export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  if (src.startsWith("https://images.unsplash.com/")) {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 75));
    url.searchParams.set("auto", "format");
    return url.toString();
  }
  return `${src}?w=${width}`;
}
