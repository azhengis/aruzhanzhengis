"use client";

// Clearbit's logo API (logo.clearbit.com) no longer resolves — swapped to
// Google's favicon service, which is stable and needs no key.
function faviconUrl(domain: string, size: number) {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;
}

export function CompanyLogo({ domain, alt }: { domain?: string; alt: string }) {
  if (!domain) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={faviconUrl(domain, 128)}
      alt={alt}
      loading="lazy"
      className="h-9 w-9 rounded-md object-contain bg-bg-raised p-1.5 shrink-0"
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />
  );
}

// A small pill-shaped badge meant to sit inline inside a sentence — e.g.
// "…studying Computer Science at [DePaul logo] ." — rather than a standalone
// block tile.
export function InlineLogoBadge({ domain, alt }: { domain?: string; alt: string }) {
  if (!domain) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={faviconUrl(domain, 64)}
      alt={alt}
      loading="lazy"
      className="inline-block h-6 w-6 align-middle rounded-full object-contain bg-bg-raised p-1 mx-1"
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />
  );
}
