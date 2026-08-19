Personal portfolio, built with Next.js, TypeScript, and Tailwind CSS.

## Run it

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Fill in your content

Everything personal lives in one file: `lib/content.ts`. Anything left as
`null`/`TODO`/an empty array shows up on the site as a visible dashed
placeholder, so it's easy to spot what's left:

- `profile` — role, location, email, and flags for your photo/resume
- `bio` — a couple of sentences about yourself
- `interests` — the skiing / running / F1 / music strip; add a stat to each if you want
- `photos` — drop images in `public/photos/` and reference them here
- `experience` — your work history (empty on purpose, shows an "add roles" placeholder until filled)
- `projects` — selected work (same — empty until you add some)

For your resume, add a PDF at `public/resume.pdf` and set `hasResume: true`
in `lib/content.ts`.

## Deploy

```bash
vercel deploy
```
