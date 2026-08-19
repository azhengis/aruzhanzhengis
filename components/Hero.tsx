import { profile, tagline } from "@/lib/content";
import { InlinePlaceholder } from "./Placeholder";
import { ScrollCue } from "./ScrollCue";
import { HeroDotField } from "./HeroDotField";

export function Hero() {
  return (
    <section id="top" className="pt-24 sm:pt-32 pb-20 sm:pb-24">
      <HeroDotField>
        <div className="mx-auto max-w-3xl px-6 sm:px-10">
          <p className="text-sm text-muted mb-5 animate-tick">
            Hi, I&apos;m {profile.name}.
          </p>

          <h1
            className="font-semibold leading-[1.15] tracking-[-0.01em] text-[clamp(1.9rem,4.6vw,3.25rem)] animate-tick"
            style={{ animationDelay: "60ms" }}
          >
            {tagline}
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
