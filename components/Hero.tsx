import { profile, taglineLead, taglineRest } from "@/lib/content";
import { InlinePlaceholder } from "./Placeholder";
import { ScrollCue } from "./ScrollCue";
import { HeroDotField } from "./HeroDotField";

export function Hero() {
  return (
    <section id="top" className="pt-10 sm:pt-14 pb-20 sm:pb-24">
      <HeroDotField>
        <div className="max-w-2xl sm:max-w-3xl px-6 sm:px-10">
          <p className="text-sm text-muted mb-5 animate-tick">
            Hi, I&apos;m {profile.name}.
          </p>

          <h1
            className="font-semibold leading-[1.1] tracking-[-0.02em] text-[clamp(2.25rem,6vw,4.25rem)] animate-tick"
            style={{ animationDelay: "60ms" }}
          >
            <span className="text-ink">{taglineLead}</span>
            <span className="text-muted">{taglineRest}</span>
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-ink-soft">
            {profile.role ? (
              <span>{profile.role}</span>
            ) : (
              <InlinePlaceholder>add role in lib/content.ts</InlinePlaceholder>
            )}
            <span className="text-muted">·</span>
            {profile.location ? (
              <span>{profile.location}</span>
            ) : (
              <InlinePlaceholder>add location</InlinePlaceholder>
            )}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-ink text-bg text-sm font-medium hover:opacity-85 transition-opacity"
            >
              LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full border border-line text-sm font-medium hover:border-ink transition-colors"
            >
              GitHub
            </a>
            {profile.hasResume ? (
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full border border-line text-sm font-medium hover:border-ink transition-colors"
              >
                Resume
              </a>
            ) : (
              <span className="placeholder-tile px-4 py-2 rounded-full text-sm">
                Resume — add public/resume.pdf
              </span>
            )}
          </div>

          <ScrollCue />
        </div>
      </HeroDotField>
    </section>
  );
}
