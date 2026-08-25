"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { photos } from "@/lib/content";
import { TilePlaceholder } from "./Placeholder";

const GAP_PX = 12; // matches gap-3

function PhotoSet({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div className="flex items-center gap-3" aria-hidden={ariaHidden}>
      {photos.map((photo, i) =>
        photo.src ? (
          <Image
            key={i}
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            className="h-full w-auto rounded-2xl shrink-0"
            style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
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
  );
}

// One continuously scrolling row of photos. The loop distance is measured
// in JS from the actual rendered width of one set (not assumed via a CSS
// percentage), so the reset point lines up exactly with no skip or pop —
// percentage-based transforms can drift out of sync with variable-width,
// naturally-sized photos. Each photo keeps its own aspect ratio (scaled to
// the row's height) instead of being cropped into a fixed frame.
export function PhotoMarquee() {
  const setRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const el = setRef.current;
    if (!el) return;

    function measure() {
      setDistance(el!.getBoundingClientRect().width + GAP_PX);
    }
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="relative h-80 sm:h-96 overflow-hidden group">
      <div
        className="absolute inset-y-0 left-0 flex items-center gap-3 animate-marquee-x-precise group-hover:[animation-play-state:paused]"
        style={{ "--marquee-distance": `${distance}px` } as React.CSSProperties}
      >
        <div ref={setRef}>
          <PhotoSet />
        </div>
        <PhotoSet ariaHidden />
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
