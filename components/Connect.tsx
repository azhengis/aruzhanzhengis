import { profile } from "@/lib/content";
import { Reveal } from "./Reveal";
import { InlinePlaceholder } from "./Placeholder";
import { DotDivider } from "./DotDivider";

type ConnectLink = {
  label: string;
  href?: string;
  hint: string;
  placeholder?: boolean;
};

const linkedinHandle = profile.linkedin.replace("https://www.linkedin.com", "").replace(/\/$/, "");
const githubHandle = profile.github.replace("https://", "");

export function Connect() {
  const links: ConnectLink[] = [
    { label: "LinkedIn", href: profile.linkedin, hint: linkedinHandle },
    { label: "GitHub", href: profile.github, hint: githubHandle },
    profile.email
      ? { label: "Email", href: `mailto:${profile.email}`, hint: profile.email }
      : { label: "Email", hint: "add email in lib/content.ts", placeholder: true },
    profile.hasResume
      ? { label: "Resume", href: "/resume.pdf", hint: "download here" }
      : { label: "Resume", hint: "add public/resume.pdf", placeholder: true },
  ];

  return (
    <section id="connect" className="border-t border-line">
      <DotDivider />

      <div className="py-16 sm:py-20">
        <div className="px-6 sm:px-10">
          <p className="text-sm text-muted mb-6">Connect</p>

          <Reveal>
            <p className="text-3xl sm:text-4xl font-semibold mb-12 sm:mb-16">
              Let&apos;s get in touch!
            </p>

            <div className="grid sm:grid-cols-2 gap-x-16 gap-y-10 sm:gap-y-12 max-w-3xl">
              {links.map((l, i) => (
                <Reveal key={l.label} delay={i * 60}>
                  {l.placeholder ? (
                    <div>
                      <p className="font-semibold text-lg">{l.label}</p>
                      <InlinePlaceholder>{l.hint}</InlinePlaceholder>
                    </div>
                  ) : (
                    <a
                      href={l.href}
                      target={l.href?.startsWith("mailto:") ? undefined : "_blank"}
                      rel={l.href?.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                      className="group block"
                    >
                      <p className="font-semibold text-lg group-hover:text-accent transition-colors">
                        {l.label}
                      </p>
                      <p className="text-sm text-muted mt-1">{l.hint}</p>
                    </a>
                  )}
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
