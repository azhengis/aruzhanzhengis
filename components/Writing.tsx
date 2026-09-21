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
                    className="group block rounded-xl border border-line p-5 hover:border-ink transition-colors"
                  >
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
