import { Role } from "@/lib/content";
import { TilePlaceholder } from "./Placeholder";
import { CompanyLogo } from "./CompanyLogo";
import { Reveal } from "./Reveal";

export function RoleList({
  label,
  roles,
  emptyLabel,
}: {
  label: string;
  roles: Role[];
  emptyLabel: string;
}) {
  return (
    <div>
      <p className="text-sm text-muted mb-4">{label}</p>

      {roles.length === 0 ? (
        <TilePlaceholder label={emptyLabel} className="w-full py-12" />
      ) : (
        <ol className="space-y-6">
          {roles.map((role, i) => (
            <li
              key={`${role.org}-${role.period}`}
              className="grid sm:grid-cols-[8rem_1fr] gap-2 sm:gap-6"
            >
              <span className="text-sm text-muted pt-1">{role.period}</span>
              <Reveal delay={i * 70}>
                <div className="flex items-start gap-3">
                  <CompanyLogo domain={role.logoDomain} alt={role.org} />
                  <div>
                    <p className="font-semibold text-lg">
                      {role.title} · {role.org}
                    </p>
                    {role.summary && <p className="text-ink-soft mt-1">{role.summary}</p>}
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
