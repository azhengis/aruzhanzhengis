import { bioLead, bioRest, interests } from "@/lib/content";
import { PhotoMarquee } from "./PhotoMarquee";
import { Reveal } from "./Reveal";
import { DotDivider } from "./DotDivider";
import { InlineLogoBadge } from "./CompanyLogo";

export function About() {
  return (
    <section id="about" className="border-t border-line">
      <DotDivider />

      <div className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6 sm:px-10">
          <div className="grid sm:grid-cols-[1fr_2fr] gap-8 sm:gap-16">
            <div>
              <p className="text-sm text-muted">About</p>
            </div>
            <Reveal>
              <p className="text-lg leading-relaxed max-w-xl">
                <span className="text-ink">{bioLead}</span>
                <InlineLogoBadge domain="depaul.edu" alt="DePaul University" />
                <span className="text-ink">.</span>
                <span className="text-muted">{bioRest}</span>
              </p>

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
            </Reveal>
          </div>
        </div>

        <Reveal delay={120} className="mt-10">
          <PhotoMarquee />
        </Reveal>
      </div>
    </section>
  );
}
