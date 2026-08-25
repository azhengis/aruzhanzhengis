import { skills } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Skills() {
  return (
    <section id="skills" className="py-20 sm:py-28 border-t border-line">
      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        <div className="grid sm:grid-cols-[1fr_2fr] gap-8 sm:gap-16">
          <div>
            <p className="text-sm text-muted">Skills</p>
          </div>
          <div className="space-y-6">
            {skills.map((group, i) => (
              <Reveal key={group.category} delay={i * 60}>
                <p className="text-sm text-muted mb-2">{group.category}</p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-sm px-3 py-1 rounded-full bg-bg-raised text-ink-soft"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
