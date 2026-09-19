import { aboutParagraphs } from "@/lib/content";
import { PhotoMarquee } from "./PhotoMarquee";

export function About() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="px-5 sm:px-8">
        <div className="grid sm:grid-cols-[7rem_1fr] gap-6 sm:gap-10">
          <div>
            <p className="font-mono text-xs tracking-widest text-muted uppercase">About Me</p>
          </div>
          <div className="space-y-5">
            {aboutParagraphs.map((paragraph, i) => (
              <p key={i} className="text-ink-soft leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 sm:mt-16 relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
        <PhotoMarquee />
      </div>
    </section>
  );
}
