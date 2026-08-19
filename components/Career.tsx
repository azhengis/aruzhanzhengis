import { experience, profile } from "@/lib/content";
import { TilePlaceholder } from "./Placeholder";
import { CompanyLogo } from "./CompanyLogo";

const links = [
  { label: "LinkedIn", href: profile.linkedin, hint: "Experience & recommendations" },
  { label: "GitHub", href: profile.github, hint: "Code & repositories" },
];

export function Career() {
  return (
    <section id="career" className="py-20 sm:py-28 border-t border-line">
      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        <div className="grid sm:grid-cols-[1fr_2fr] gap-8 sm:gap-16">
          <div>
            <p className="text-sm text-muted">Career</p>
          </div>
          <div>
            <div className="grid sm:grid-cols-2 gap-4 mb-14">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-line bg-card p-6 flex flex-col gap-1 hover:border-ink transition-colors"
                >
                  <span className="font-semibold text-lg">{l.label}</span>
                  <span className="text-sm text-muted">{l.hint}</span>
                </a>
              ))}
            </div>

            <p className="text-sm text-muted mb-4">Experience</p>

            {experience.length === 0 ? (
              <TilePlaceholder
                label="Add roles in lib/content.ts (experience array)"
                className="w-full py-12"
              />
            ) : (
              <ol className="space-y-6">
                {experience.map((role) => (
                  <li
                    key={`${role.org}-${role.period}`}
                    className="grid sm:grid-cols-[8rem_1fr] gap-2 sm:gap-6"
                  >
                    <span className="text-sm text-muted pt-1">{role.period}</span>
                    <div className="flex items-start gap-3">
                      <CompanyLogo domain={role.logoDomain} alt={role.org} />
                      <div>
                        <p className="font-semibold text-lg">
                          {role.title} · {role.org}
                        </p>
                        {role.summary && (
                          <p className="text-ink-soft mt-1">{role.summary}</p>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
