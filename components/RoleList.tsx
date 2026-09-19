import { Role } from "@/lib/content";
import { CompanyLogo } from "./CompanyLogo";
import { TechIcon } from "./TechIcon";

// The line and every dot share one x-coordinate: -5rem, measured from this
// list's own left edge (which lines up with the label column's left edge —
// see Career.tsx / Leadership.tsx). Since the label column is 7rem wide and
// its text is center-aligned, -5rem + the column's own 3.5rem half-width... no —
// -5rem is simply "half the label column width" (3.5rem) plus this list's
// own offset from the label column's start (1.5rem grid gap), giving the
// line a home directly under the center of the label word above it.
const RAIL_OFFSET = "-left-[5rem]";

export function RoleList({ roles }: { roles: Role[] }) {
  return (
    <ol className="relative mt-3 sm:mt-4 space-y-10">
      <div
        aria-hidden="true"
        className={`absolute ${RAIL_OFFSET} top-6 bottom-0 w-0.5 -translate-x-1/2 bg-ink`}
      />
      {roles.map((role) => (
        <li key={`${role.org}-${role.period}`} className="relative pl-6">
          <span
            aria-hidden="true"
            className={`absolute ${RAIL_OFFSET} top-6 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink`}
          />
          <p className="text-sm text-muted">{role.period}</p>
          <p className="mt-1.5 font-semibold flex flex-wrap items-center gap-1.5">
            <span>{role.title} at</span>
            <CompanyLogo domain={role.logoDomain} alt={role.org} />
            <span>{role.org}</span>
          </p>

          {role.bullets && role.bullets.length > 0 && (
            <ul className="mt-4 space-y-1.5 list-disc list-outside pl-5 text-ink-soft">
              {role.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          )}

          {role.tech && role.tech.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
              {role.tech.map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5 text-sm text-muted">
                  <TechIcon name={t} />
                  {t}
                </span>
              ))}
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}
