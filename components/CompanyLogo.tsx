"use client";

export function CompanyLogo({ domain, alt }: { domain?: string; alt: string }) {
  if (!domain) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://logo.clearbit.com/${domain}`}
      alt={alt}
      loading="lazy"
      className="h-9 w-9 rounded-md object-contain bg-bg-raised p-1.5 shrink-0"
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />
  );
}
