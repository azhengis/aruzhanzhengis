import { profile } from "@/lib/content";
import { InlinePlaceholder } from "./Placeholder";
import { LinkedInIcon, GithubIcon } from "./SocialIcons";

export function Contact() {
  return (
    <section id="contact" className="pt-24 sm:pt-32 pb-12 sm:pb-16">
      <div className="px-5 sm:px-8 text-center">
        <p className="text-2xl sm:text-3xl font-semibold">Let&apos;s work together.</p>

        {profile.email ? (
          <a
            href={`mailto:${profile.email}`}
            className="mt-6 inline-block text-2xl sm:text-4xl font-bold tracking-tight hover:text-accent transition-colors break-all"
          >
            {profile.email}
          </a>
        ) : (
          <div className="mt-6">
            <InlinePlaceholder>add email in lib/content.ts</InlinePlaceholder>
          </div>
        )}

        <div className="mt-8 flex items-center justify-center gap-5">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="h-11 w-11 rounded-full border border-line flex items-center justify-center text-ink-soft hover:text-ink hover:border-ink transition-colors"
          >
            <LinkedInIcon width={20} height={20} />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="h-11 w-11 rounded-full border border-line flex items-center justify-center text-ink-soft hover:text-ink hover:border-ink transition-colors"
          >
            <GithubIcon width={20} height={20} />
          </a>
        </div>
      </div>
    </section>
  );
}
