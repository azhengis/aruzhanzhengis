import { leadership } from "@/lib/content";
import { RoleList } from "./RoleList";

export function Leadership() {
  return (
    <section id="leadership" className="py-20 sm:py-28 border-t border-line">
      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        <div className="grid sm:grid-cols-[1fr_2fr] gap-8 sm:gap-16">
          <div>
            <p className="text-sm text-muted">Leadership</p>
          </div>
          <div>
            <RoleList
              label="Roles"
              roles={leadership}
              emptyLabel="Add roles in lib/content.ts (leadership array)"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
