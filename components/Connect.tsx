import { profile } from "@/lib/content";
import { Reveal } from "./Reveal";
import { TilePlaceholder } from "./Placeholder";

type ConnectLink = {
  label: string;
  href: string;
  hint: string;
};

export function Connect() {
  const links: ConnectLink[] = [
    { label: "LinkedIn", href: profile.linkedin, hint: "Experience & recommendations" },
    { label: "GitHub", href: profile.github, hint: "Code & repositories" },
  ];
  if (profile.email) {
    links.push({ label: "Email", href: `mailto:${profile.email}`, hint: profile.email });
  }
  if (profile.hasResume) {
    links.push({ label: "Resume", href: "/resume.pdf", hint: "Download PDF" });
  }

  return (
    <section id="connect" className="py-20 sm:py-28 border-t border-line">
      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        <div className="grid sm:grid-cols-[1fr_2fr] gap-8 sm:gap-16">
          <div>
            <p className="text-sm text-muted">Connect</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-medium leading-snug mb-10">
              Let&apos;s get in touch.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {links.map((l, i) => (
                <Reveal key={l.label} delay={i * 80}>
                  <a
                    href={l.href}
                    target={l.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={l.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    className="rounded-xl border border-line bg-card p-6 flex flex-col gap-1 hover:border-ink transition-colors"
                  >
                    <span className="font-semibold text-lg">{l.label}</span>
                    <span className="text-sm text-muted">{l.hint}</span>
                  </a>
                </Reveal>
              ))}

              {!profile.email && (
                <TilePlaceholder
                  label="Add email in lib/content.ts"
                  className="py-10"
                />
              )}
              {!profile.hasResume && (
                <TilePlaceholder
                  label="Add resume — public/resume.pdf"
                  className="py-10"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
