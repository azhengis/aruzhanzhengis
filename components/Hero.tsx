import Image from "next/image";
import { profile, taglineLead, taglineRest } from "@/lib/content";
import { InlinePlaceholder } from "./Placeholder";

export function Hero() {
  return (
    <section id="top" className="pt-16 sm:pt-20 pb-20 sm:pb-24">
      <div className="max-w-2xl mx-auto px-5 sm:px-8">
        <h1 className="font-semibold leading-[1.15] tracking-[-0.02em] text-[clamp(1.5rem,4vw,2.25rem)]">
          <span className="block">
            Hi, I&apos;m{" "}
            {profile.avatar ? (
              <Image
                src={profile.avatar}
                alt={profile.name}
                width={36}
                height={36}
                className="inline-block h-7 w-7 sm:h-8 sm:w-8 rounded-lg object-cover align-middle mx-0.5 -translate-y-0.5"
              />
            ) : (
              "👋"
            )}{" "}
            {profile.name}
          </span>
          {profile.role ? (
            <span className="block">{profile.role}</span>
          ) : (
            <InlinePlaceholder>add role in lib/content.ts</InlinePlaceholder>
          )}
        </h1>

        <p className="mt-4 text-ink-soft">
          {taglineLead}
          {taglineRest}
        </p>

        <div className="mt-7">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-5 py-2.5 rounded-full bg-ink text-bg text-sm font-medium hover:opacity-85 transition-opacity"
          >
            Let&apos;s connect
          </a>
        </div>
      </div>
    </section>
  );
}
