// ---------------------------------------------------------------------------
// EDIT ME: this file holds every piece of personal content on the site.
// Fields set to `null` or marked TODO render as visible placeholders on the
// page so they're easy to find — fill them in and the placeholder disappears.
// ---------------------------------------------------------------------------

export const profile = {
  name: "Aruzhan Zhengis",
  role: "Computer Science Senior @ DePaul University" as string | null,
  location: "Chicago, IL" as string | null,
  linkedin: "https://www.linkedin.com/in/aruzhan-zhengis/",
  github: "https://github.com/azhengis",
  // TODO: add an email you want listed publicly, or leave null to hide it
  email: null as string | null,
  // TODO: add a PDF at /public/resume.pdf and flip this to true
  hasResume: false,
};

// One-line hero statement — the big text on the homepage. Draft copy, edit freely.
export const tagline =
  "I build software, chase hackathon deadlines, and race personal bests on foot and on skis.";

// Short bio for the About section — from your LinkedIn About.
export const bio =
  "Hi! I'm Aruzhan Zhengis, a senior studying Computer Science at DePaul University. With experience in hackathons and hands-on development, I'm passionate about app building, AI integration, and project management.";

// Interests — shown as plain tags in the About section.
export const interests = ["Skiing", "Running", "Formula 1", "Music"];

// Photos for the About section's scrolling column. Add files under
// /public/photos/ and reference them here — leave `src: null` to keep the
// dashed placeholder. Order here is the scroll order.
export const photos = [
  { src: null as string | null, alt: "Skiing" },
  { src: null as string | null, alt: "Running" },
  { src: null as string | null, alt: "Formula 1" },
  { src: null as string | null, alt: "Music" },
];

// Career timeline — from your LinkedIn Experience section.
// `logoDomain` is the company's web domain, used to pull their logo via
// Clearbit's public logo API (https://logo.clearbit.com/{domain}) — no
// key required. If a domain has no logo, the image just quietly hides.
export type Role = {
  org: string;
  title: string;
  period: string;
  summary?: string;
  logoDomain?: string;
};

export const experience: Role[] = [
  {
    org: "The DePaul AI Institute",
    title: "Research Intern",
    period: "Jun 2026 — Present",
    logoDomain: "depaul.edu",
  },
  {
    org: "2389 Research",
    title: "Engineering Intern",
    period: "Jun 2026 — Present",
    logoDomain: "2389.ai",
  },
  {
    org: "Amazon Web Services (AWS)",
    title: "Student Builder Group Leader",
    period: "May 2026 — Present",
    logoDomain: "aws.amazon.com",
  },
  {
    org: "DePaul iD Lab",
    title: "Data Scientist",
    period: "Apr 2026 — Present",
    logoDomain: "depaul.edu",
  },
  {
    org: "NASA Space Apps Chicago",
    title: "Local Co-Lead",
    period: "May 2025 — Present",
    logoDomain: "spaceappschallenge.org",
  },
];

// Selected work / projects. Empty on purpose — add your own.
export type Project = {
  name: string;
  description: string;
  href?: string;
  tag?: string;
};

export const projects: Project[] = [
  // { name: "Project name", description: "One line description.", href: "https://...", tag: "Web" },
];
