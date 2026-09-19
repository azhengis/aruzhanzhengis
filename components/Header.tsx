import Link from "next/link";
import { profile } from "@/lib/content";
import { ThemeToggle } from "./ThemeToggle";

function AboutIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <circle cx="10" cy="6.8" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3.5 17c.6-3.4 3.3-5.5 6.5-5.5s5.9 2.1 6.5 5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ExperienceIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <rect x="2.5" y="6.5" width="15" height="9.5" rx="1.8" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M7 6.5V5.2c0-.7.6-1.2 1.2-1.2h3.6c.7 0 1.2.6 1.2 1.2v1.3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WorkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <rect x="2.5" y="2.5" width="6" height="6" rx="1.3" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11.5" y="2.5" width="6" height="6" rx="1.3" stroke="currentColor" strokeWidth="1.5" />
      <rect x="2.5" y="11.5" width="6" height="6" rx="1.3" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11.5" y="11.5" width="6" height="6" rx="1.3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ContactIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M17.5 2.5 9.2 11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 2.5 12 17.5l-2.8-6.5-6.5-2.8 15-5.7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const NAV_ITEMS = [
  { id: "about", label: "About", Icon: AboutIcon },
  { id: "career", label: "Experiences", Icon: ExperienceIcon },
  { id: "work", label: "Projects", Icon: WorkIcon },
  { id: "contact", label: "Contact", Icon: ContactIcon },
];

export function Header() {
  return (
    <header>
      <div className="px-5 sm:px-8 h-14 flex items-center justify-between">
        <Link href="#top" className="font-signature text-xl leading-none">
          {profile.name.split(" ")[0]}
        </Link>

        <nav className="hidden sm:flex items-center gap-5">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink transition-colors"
            >
              <item.Icon width={15} height={15} className="shrink-0" />
              {item.label}
            </a>
          ))}
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
