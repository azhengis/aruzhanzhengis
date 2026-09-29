import Image from "next/image";
import { posts } from "@/lib/content";
import { TilePlaceholder } from "./Placeholder";

export function Writing() {
  return (
    <section id="writing" className="py-16 sm:py-20">
      <div className="px-5 sm:px-8">
        <div className="grid sm:grid-cols-[7rem_1fr] gap-6 sm:gap-10">
          <div>
            <p className="font-mono text-xs tracking-widest text-muted uppercase">Writing</p>
          </div>
          <div>
            {posts.length === 0 ? (
              <TilePlaceholder
                label="Add posts in lib/content.ts (posts array)"
                className="w-full py-12"
              />
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {posts.map((post) => (
                  <a
                    key={post.href}
                    href={post.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-xl border border-line overflow-hidden hover:border-ink transition-colors"
                  >
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={640}
                        height={320}
                        className="w-full aspect-[2/1] object-cover"
                      />
                    ) : (
                      <TilePlaceholder
                        label={`Add ${post.title} preview`}
                        className="w-full aspect-[2/1] rounded-none border-x-0 border-t-0"
                      />
                    )}
                    <div className="p-5">
                      <p className="text-xs text-muted uppercase tracking-wide">
                        {post.source}
                        {post.date && <span> · {post.date}</span>}
                      </p>
                      <p className="font-semibold mt-2 group-hover:text-accent transition-colors">
                        {post.title}
                      </p>
                      {post.excerpt && (
                        <p className="text-sm text-ink-soft mt-1.5">{post.excerpt}</p>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
