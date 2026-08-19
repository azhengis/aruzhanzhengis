import Image from "next/image";
import { photos } from "@/lib/content";
import { TilePlaceholder } from "./Placeholder";

// One continuously scrolling row of photos — list is duplicated once so the
// loop from -50% back to 0% is seamless.
export function PhotoMarquee() {
  const items = [...photos, ...photos];

  return (
    <div className="relative h-64 sm:h-72 overflow-hidden group">
      <div className="absolute inset-y-0 left-0 flex gap-3 animate-marquee-x group-hover:[animation-play-state:paused]">
        {items.map((photo, i) =>
          photo.src ? (
            <Image
              key={i}
              src={photo.src}
              alt={photo.alt}
              width={320}
              height={288}
              className="h-full w-auto aspect-[4/5] object-cover rounded-2xl shrink-0"
            />
          ) : (
            <TilePlaceholder
              key={i}
              label={`Add ${photo.alt.toLowerCase()} photo`}
              className="h-full aspect-[4/5] shrink-0"
            />
          )
        )}
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-bg to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-bg to-transparent"
      />
    </div>
  );
}
