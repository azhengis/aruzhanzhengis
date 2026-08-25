import Link from "next/link";
import { profile } from "@/lib/content";
import { ThemeToggle } from "./ThemeToggle";
import { NavPill } from "./NavPill";

export function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-bg/70 bg-bg/95 border-b border-line">
      <div className="mx-auto max-w-5xl px-6 sm:px-10 h-16 flex items-center justify-between">
        <Link href="#top" className="font-semibold text-sm">
          {profile.name}
        </Link>
        <NavPill />
        <ThemeToggle />
      </div>
    </header>
  );
}
