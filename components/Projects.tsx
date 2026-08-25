import { profile, projects } from "@/lib/content";
import { TilePlaceholder } from "./Placeholder";
import { Reveal } from "./Reveal";

export function Projects() {
  return (
    <section id="work" className="py-20 sm:py-28 border-t border-line">
      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        <div className="grid sm:grid-cols-[1fr_2fr] gap-8 sm:gap-16">
          <div>
            <p className="text-sm text-muted">Work</p>
          </div>
          <div>
            {projects.length === 0 ? (
              <Reveal className="space-y-4">
                <TilePlaceholder
                  label="Add projects in lib/content.ts (projects array)"
                  className="w-full py-12"
                />
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm text-ink-soft hover:text-ink transition-colors"
                >
                  Browse repositories on GitHub
                </a>
              </Reveal>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {projects.map((p, i) => (
                  <Reveal key={p.name} delay={i * 80}>
                    <a
                      href={p.href || undefined}
                      target={p.href ? "_blank" : undefined}
                      rel={p.href ? "noopener noreferrer" : undefined}
                      className="rounded-xl border border-line bg-card p-6 flex flex-col gap-2 hover:border-ink transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-lg">{p.name}</span>
                        {p.tag && (
                          <span
                            className="text-xs px-2 py-0.5 rounded-full text-accent"
                            style={{
                              background:
                                "color-mix(in srgb, var(--accent) 12%, transparent)",
                            }}
                          >
                            {p.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-ink-soft text-sm">{p.description}</p>
                    </a>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
