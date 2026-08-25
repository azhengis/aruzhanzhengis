import { experience } from "@/lib/content";
import { RoleList } from "./RoleList";

export function Career() {
  return (
    <section id="career" className="py-20 sm:py-28 border-t border-line">
      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        <div className="grid sm:grid-cols-[1fr_2fr] gap-8 sm:gap-16">
          <div>
            <p className="text-sm text-muted">Career</p>
          </div>
          <div>
            <RoleList
              label="Experience"
              roles={experience}
              emptyLabel="Add roles in lib/content.ts (experience array)"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
