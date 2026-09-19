"use client";

// Simple Icons' public CDN serves a monochrome SVG per slug, no key required
// — same no-key-needed pattern as the Google favicon trick in CompanyLogo.
// Only real, named tools/languages get a slug; abstract skills (e.g. "LLMs")
// are intentionally left out of this map and just render as plain text.
const SLUGS: Record<string, string> = {
  python: "python",
  javascript: "javascript",
  typescript: "typescript",
  react: "react",
  "next.js": "nextdotjs",
  "node.js": "nodedotjs",
  // Note: no "aws" entry — Amazon had their logo removed from Simple Icons,
  // so AWS just renders as plain text below, same as any unmapped skill.
  pandas: "pandas",
  numpy: "numpy",
  pytorch: "pytorch",
  "scikit-learn": "scikitlearn",
  fastapi: "fastapi",
  git: "git",
  github: "github",
  vercel: "vercel",
  swift: "swift",
  java: "openjdk",
  docker: "docker",
  figma: "figma",
};

function iconUrl(slug: string) {
  return `https://cdn.simpleicons.org/${slug}`;
}

export function TechIcon({ name }: { name: string }) {
  const slug = SLUGS[name.toLowerCase()];
  if (!slug) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={iconUrl(slug)}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className="h-3.5 w-3.5 shrink-0 opacity-70"
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />
  );
}
