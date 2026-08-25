"use client";

import { useEffect, useRef, useState } from "react";

function EducationIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M10 3.5 2 7l8 3.5 8-3.5-8-3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M5.5 8.8v3.7c0 1.1 2 2 4.5 2s4.5-.9 4.5-2V8.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M17 7.5v4.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CareerIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <rect
        x="2.5"
        y="6.5"
        width="15"
        height="9.5"
        rx="1.8"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M7 6.5V5.2c0-.7.6-1.2 1.2-1.2h3.6c.7 0 1.2.6 1.2 1.2v1.3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M2.5 10.8h15" stroke="currentColor" strokeWidth="1.5" />
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

function LeadershipIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M4.5 2.5v15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M4.5 3.5h9l-2.2 2.8 2.2 2.8h-9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ConnectIcon(props: React.SVGProps<SVGSVGElement>) {
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
  { id: "education", label: "Education", Icon: EducationIcon },
  { id: "career", label: "Career", Icon: CareerIcon },
  { id: "leadership", label: "Leadership", Icon: LeadershipIcon },
  { id: "work", label: "Work", Icon: WorkIcon },
  { id: "about", label: "About", Icon: AboutIcon },
  { id: "connect", label: "Connect", Icon: ConnectIcon },
];

// A pill-shaped tab bar that tracks scroll position: whichever section sits
// in the vertical center band of the viewport gets a bigger icon and its
// label, while a sliding highlight glides between tabs underneath.
export function NavPill() {
  const [active, setActive] = useState(NAV_ITEMS[0].id);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function updateIndicator() {
      const btn = buttonRefs.current[active];
      const container = containerRef.current;
      if (!btn || !container) return;
      const containerRect = container.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      setIndicator({ left: btnRect.left - containerRect.left, width: btnRect.width });
    }
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [active]);

  return (
    <div
      ref={containerRef}
      className="relative hidden sm:flex items-center gap-1 rounded-full border border-line bg-card px-1.5 py-1.5"
    >
      {indicator && (
        <span
          aria-hidden="true"
          className="absolute top-1.5 bottom-1.5 rounded-full bg-bg-raised transition-all duration-300 ease-out"
          style={{ left: indicator.left, width: indicator.width }}
        />
      )}
      {NAV_ITEMS.map((item) => {
        const isActive = active === item.id;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            ref={(el) => {
              buttonRefs.current[item.id] = el;
            }}
            aria-current={isActive ? "true" : undefined}
            className={`relative z-10 flex items-center rounded-full px-3 py-1.5 transition-colors duration-300 ${
              isActive ? "text-ink" : "text-muted hover:text-ink-soft"
            }`}
          >
            <item.Icon
              className={`shrink-0 transition-transform duration-300 ${
                isActive ? "scale-125" : "scale-90"
              }`}
              width={16}
              height={16}
            />
            <span
              className={`overflow-hidden whitespace-nowrap text-sm transition-all duration-300 ${
                isActive ? "max-w-24 opacity-100 ml-1.5" : "max-w-0 opacity-0 ml-0"
              }`}
            >
              {item.label}
            </span>
          </a>
        );
      })}
    </div>
  );
}
