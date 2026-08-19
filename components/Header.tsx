import Link from "next/link";
import { profile } from "@/lib/content";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "#career", label: "Career" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-bg/70 bg-bg/95 border-b border-line">
      <div className="mx-auto max-w-5xl px-6 sm:px-10 h-16 flex items-center justify-between">
        <Link href="#top" className="font-semibold text-sm">
          {profile.name}
        </Link>
        <nav className="hidden sm:flex items-center gap-8 text-sm text-ink-soft">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-ink transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
