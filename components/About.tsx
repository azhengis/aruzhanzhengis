import { bio, interests } from "@/lib/content";
import { PhotoMarquee } from "./PhotoMarquee";

export function About() {
  return (
    <section id="about" className="py-20 sm:py-28 border-t border-line">
      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        <div className="grid sm:grid-cols-[1fr_2fr] gap-8 sm:gap-16">
          <div>
            <p className="text-sm text-muted">About</p>
          </div>
          <div>
            <p className="text-lg leading-relaxed text-ink-soft max-w-xl">{bio}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {interests.map((interest) => (
                <span
                  key={interest}
                  className="text-sm px-3 py-1 rounded-full bg-bg-raised text-ink-soft"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <PhotoMarquee />
      </div>
    </section>
  );
}
