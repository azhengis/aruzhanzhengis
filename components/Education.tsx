import { education } from "@/lib/content";

export function Education() {
  return (
    <section id="education" className="py-16 sm:py-20">
      <div className="px-5 sm:px-8">
        <div className="grid sm:grid-cols-[7rem_1fr] gap-6 sm:gap-10">
          <div>
            <p className="font-mono text-xs tracking-widest text-muted uppercase">Education</p>
          </div>
          <div>
            <p className="font-semibold">
              {education.school} · {education.location}
            </p>
            <p className="text-ink-soft mt-1">{education.degree}</p>
            <p className="text-sm text-muted mt-2">
              {education.period} · GPA {education.gpa}
            </p>
            {education.honors.length > 0 && (
              <p className="text-sm text-muted mt-1">{education.honors.join(" · ")}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
