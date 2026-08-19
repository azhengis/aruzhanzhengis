import { profile } from "@/lib/content";
import { InlinePlaceholder } from "./Placeholder";
import { HalftoneName } from "./HalftoneName";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line pt-14 pb-8">
      <HalftoneName text={profile.name} />

      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-muted">
            © {year} {profile.name}. Say hi on{" "}
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-soft hover:text-ink transition-colors"
            >
              LinkedIn
            </a>{" "}
            or{" "}
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-soft hover:text-ink transition-colors"
            >
              GitHub
            </a>
            .
          </p>
          <p className="text-sm text-muted">
            {profile.email ? (
              <a href={`mailto:${profile.email}`} className="hover:text-ink transition-colors">
                {profile.email}
              </a>
            ) : (
              <InlinePlaceholder>add email in lib/content.ts</InlinePlaceholder>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
