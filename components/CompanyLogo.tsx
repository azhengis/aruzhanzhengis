"use client";

// Clearbit's logo API (logo.clearbit.com) no longer resolves — using Google's
// favicon service instead, which is stable and needs no key.
function faviconUrl(domain: string, size: number) {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;
}

export function CompanyLogo({ domain, alt }: { domain?: string; alt: string }) {
  if (!domain) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={faviconUrl(domain, 64)}
      alt={alt}
      loading="lazy"
      className="h-5 w-5 rounded object-contain shrink-0"
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />
  );
}
