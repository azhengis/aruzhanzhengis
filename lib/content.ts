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

// Hero statement — the big text on the homepage. `taglineLead` renders bold
// and full-color, `taglineRest` renders muted, same size. Draft copy, edit freely.
export const taglineLead = "I build software.";
export const taglineRest =
  " I also chase hackathon deadlines, and race personal bests on foot and on skis.";

// Short bio for the About section — from your LinkedIn About.
export const bio =
  "Hi! I'm Aruzhan Zhengis, a senior studying Computer Science at DePaul University. With experience in hackathons and hands-on development, I'm passionate about app building, AI integration, and project management.";

// Interests — shown as plain tags in the About section.
export const interests = ["Skiing", "Running", "Formula 1", "Music"];

// Photos for the About section's scrolling column. Add files under
// /public/photos/ and reference them here — leave `src: null` to keep the
// dashed placeholder. `width`/`height` are the real image dimensions, used
// so each photo scrolls at its own natural aspect ratio (not cropped to a
// fixed frame). Order here is the scroll order.
export const photos = [
  { src: "/photos/ski-1.jpg" as string | null, alt: "Skiing", width: 1200, height: 1600 },
  { src: "/photos/run-1.jpg" as string | null, alt: "Running", width: 1200, height: 1600 },
  { src: "/photos/f1-1.jpg" as string | null, alt: "Formula 1", width: 1600, height: 1200 },
  { src: "/photos/run-2.jpg" as string | null, alt: "Running", width: 1600, height: 1067 },
  { src: "/photos/f1-2.jpg" as string | null, alt: "Formula 1", width: 1200, height: 1600 },
  { src: null as string | null, alt: "Music", width: 1200, height: 1600 },
];

// Education — from your resume.
export const education = {
  school: "DePaul University",
  location: "Chicago, IL",
  degree: "BS in Computer Science, Artificial Intelligence Concentration",
  period: "Expected June 2027",
  gpa: "3.526",
  honors: [
    "Presidential Scholarship",
    "Dean's List",
    "Grace Hopper Scholar",
    "Upsilon Pi Epsilon",
  ],
};

// Career timeline. `logoDomain` is the org's web domain, used to pull their
// logo via Clearbit's public logo API (https://logo.clearbit.com/{domain}) —
// no key required. If a domain has no logo, the image just quietly hides.
export type Role = {
  org: string;
  title: string;
  period: string;
  summary?: string;
  logoDomain?: string;
};

// Paid / research roles — from your resume's Experience section.
export const experience: Role[] = [
  {
    org: "2389 Research Inc.",
    title: "Software Engineering Intern",
    period: "Jun 2026 — Sept 2026",
    logoDomain: "2389.ai",
    summary:
      "Built Postique, a pipeline turning long-form podcast video into publish-ready Instagram, Reels, and LinkedIn posts. Designed the LLM-based clip-analysis layer that scores and ranks the highest-retention moments, and extended the system to a second brand via a brand-voice config layer.",
  },
  {
    org: "The DePaul AI Institute",
    title: "Research Intern",
    period: "Jun 2026 — Present",
    logoDomain: "depaul.edu",
    summary:
      "Built an AI faculty-matching portal over a 1,389-person faculty database, replacing informal referral search. Architected a six-node LangGraph pipeline using SPECTER2 hybrid retrieval with cross-encoder reranking, shipped end-to-end.",
  },
  {
    org: "DePaul iD Lab",
    title: "Data Scientist",
    period: "Apr 2026 — Present",
    logoDomain: "depaul.edu",
    summary:
      "Build and evaluate classification, regression, and anomaly-detection models in Python (pandas, scikit-learn, PyTorch) for active research questions, owning workflows end-to-end from SQL extraction through stakeholder-facing dashboards.",
  },
];

// Leadership — from your resume's Leadership section.
export const leadership: Role[] = [
  {
    org: "NASA Space Apps Chicago",
    title: "Co-Lead Organizer",
    period: "May 2025 — Present",
    logoDomain: "spaceappschallenge.org",
    summary:
      "Co-lead one of NASA's largest global chapters, scaling the hackathon to 600+ participants across two days at 1871. Own mentor matching, team formation, and technical programming; pursuing a federal grant to link Chicago, Charlotte, and a Polish partner chapter.",
  },
  {
    org: "AWS Student Builder Group — DePaul University",
    title: "Group Leader",
    period: "May 2026 — Present",
    logoDomain: "aws.amazon.com",
    summary:
      "Lead DePaul's AWS Student Builder Group, selected through AWS's national application process. Host hands-on workshops on core AWS services and partner with faculty and the AWS community team to bring speakers, credits, and resources to campus.",
  },
  {
    org: "Upsilon Pi Epsilon (CS Honor Society)",
    title: "Treasurer",
    period: "Jul 2026 — Present",
    summary:
      "Manage the chapter budget — dues, national induction fees, and event funding — and reconcile spending with the university's student-organization finance office each term.",
  },
];

// Selected work / projects — from your resume.
export type Project = {
  name: string;
  description: string;
  href?: string;
  tag?: string;
};

export const projects: Project[] = [
  {
    name: "Lyora",
    description:
      "Full-stack platform (FastAPI + scikit-learn Isolation Forest, Next.js 14, deployed on Vercel/Render) flagging contamination spikes and infrastructure failures in water-system telemetry. Repositioned from utilities to property insurers and pipeline operators under investor mentorship.",
    tag: "AI / Full-stack",
  },
  {
    name: "Formula 1 Race Outcome Prediction",
    description:
      "Engineered 40+ time-series features from 10+ seasons of driver and track data to train Random Forest and XGBoost models — 78% accuracy on unseen races, a 20%+ lift over baseline, with SHAP attribution served via FastAPI.",
    tag: "Time-Series ML",
  },
  {
    name: "Lot-to-Life",
    description:
      "Python/SQL ETL pipelines integrating zoning, parcel, and neighborhood data across 40,000+ vacant Chicago parcels in 77 community areas. Engineered 20+ spatial and socioeconomic features scoring redevelopment potential — DemonHacks winner.",
    tag: "Data / Urban Analytics",
  },
];

// Skills — from your resume.
export const skills = [
  { category: "Languages", items: ["Python", "SQL", "Java", "Swift"] },
  {
    category: "ML & AI",
    items: [
      "PyTorch",
      "scikit-learn",
      "XGBoost/LightGBM",
      "LangGraph",
      "RAG & embedding retrieval",
      "anomaly detection",
      "time-series forecasting",
      "SHAP",
    ],
  },
  {
    category: "Data",
    items: [
      "pandas",
      "NumPy",
      "Statsmodels",
      "EDA",
      "feature engineering",
      "A/B testing",
      "hypothesis testing",
    ],
  },
  {
    category: "Cloud & Engineering",
    items: ["AWS", "FastAPI", "Next.js", "Streamlit", "Azure OpenAI", "Git", "Vercel", "Render"],
  },
  { category: "Visualization", items: ["Matplotlib", "Plotly"] },
];
