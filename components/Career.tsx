import { experience, leadership, profile } from "@/lib/content";
import { Reveal } from "./Reveal";
import { RoleList } from "./RoleList";

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
              {links.map((l, i) => (
                <Reveal key={l.label} delay={i * 80}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-line bg-card p-6 flex flex-col gap-1 hover:border-ink transition-colors"
                  >
                    <span className="font-semibold text-lg">{l.label}</span>
                    <span className="text-sm text-muted">{l.hint}</span>
                  </a>
                </Reveal>
              ))}
            </div>

            <RoleList
              label="Experience"
              roles={experience}
              emptyLabel="Add roles in lib/content.ts (experience array)"
            />

            <div className="mt-12">
              <RoleList
                label="Leadership"
                roles={leadership}
                emptyLabel="Add roles in lib/content.ts (leadership array)"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
