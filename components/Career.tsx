import { experience } from "@/lib/content";
import { RoleList } from "./RoleList";

export function Career() {
  return (
    <section id="career" className="py-16 sm:py-20">
      <div className="px-5 sm:px-8">
        <div className="grid sm:grid-cols-[7rem_1fr] gap-6">
          <div>
            <p className="font-mono text-xs tracking-widest text-muted uppercase text-center">
              Experience
            </p>
          </div>
          <div>
            <RoleList roles={experience} />
          </div>
        </div>
      </div>
    </section>
  );
}
