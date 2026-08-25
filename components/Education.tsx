import { education } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Education() {
  return (
    <section id="education" className="py-20 sm:py-28 border-t border-line">
      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        <div className="grid sm:grid-cols-[1fr_2fr] gap-8 sm:gap-16">
          <div>
            <p className="text-sm text-muted">Education</p>
          </div>
          <Reveal>
            <p className="font-semibold text-lg">
              {education.school} · {education.location}
            </p>
            <p className="text-ink-soft mt-1">{education.degree}</p>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted">
              <span>{education.period}</span>
              <span>·</span>
              <span>GPA {education.gpa}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {education.honors.map((honor) => (
                <span
                  key={honor}
                  className="text-sm px-3 py-1 rounded-full bg-bg-raised text-ink-soft"
                >
                  {honor}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
