import Image from "next/image";
import { profile, projects } from "@/lib/content";
import { TilePlaceholder } from "./Placeholder";

export function Projects() {
  return (
    <section id="work" className="py-16 sm:py-20">
      <div className="px-5 sm:px-8">
        <div className="grid sm:grid-cols-[7rem_1fr] gap-6 sm:gap-10">
          <div>
            <p className="font-mono text-xs tracking-widest text-muted uppercase">Projects</p>
          </div>
          <div>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-10">
              {projects.map((p) => {
                const Wrapper = p.href ? "a" : "div";
                return (
                  <Wrapper
                    key={p.name}
                    {...(p.href
                      ? { href: p.href, target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group block"
                  >
                    {p.image ? (
                      <Image
                        src={p.image}
                        alt={p.name}
                        width={640}
                        height={360}
                        className="w-full aspect-video object-cover rounded-xl"
                      />
                    ) : (
                      <TilePlaceholder
                        label={p.href ? p.name : `Add ${p.name} screenshot`}
                        className="w-full aspect-video"
                      />
                    )}
                    <p className="font-semibold mt-3 group-hover:text-accent transition-colors">
                      {p.name}
                    </p>
                    <p className="text-sm text-ink-soft mt-1">{p.description}</p>
                  </Wrapper>
                );
              })}
            </div>

            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-8 text-sm text-ink-soft hover:text-ink transition-colors"
            >
              See all projects on GitHub →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
