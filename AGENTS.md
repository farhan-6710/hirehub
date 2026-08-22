# Agent rules

## Match what is here

- Follow existing names and folders. Client: `src/app`, `src/components/<domain>`, `src/services`, `src/providers`, `src/hooks`, `src/constants`, `src/types`, `src/redux`, `src/lib`. Server: `src/routes`, `src/controllers`, `src/middlewares`, `src/config`, `src/utils`, `src/seeds`, `prisma/`.
- Client imports use `@/` (`@/*` → `src/*`). shadcn aliases: `@/components/ui`, `@/lib/utils`, `@/hooks`.
- Components: PascalCase files, grouped by feature (`home/hero-section`, `jobs/jobs-listing-section`, `employer/post-job`). Hooks: `useX.ts` (existing exception: `use-mobile.ts`). API modules: `*Api.ts`. Server files: camelCase (`jobController.ts`, `authRoutes.ts`).
- Quotes: client double quotes; server single quotes. Keep the file’s export style (named vs default). Do not restyle unrelated files.
- Prefer editing an existing file over adding a new one. No drive-by refactors, no extra docs unless asked.

## Size and layers

- UI component files ≤ 120 lines. Split by responsibility: subcomponents, hooks, constants, types.
- Keep layers separate:
  - **UI** — `app/` pages, `components/`
  - **State** — local state; Context for auth/modals/theme; Redux only for chat/feedback
  - **API** — `services/*Api.ts` + `constants/api.ts` on the client; `routes` → `controllers` on the server
  - **Domain** — `types/`, Prisma models
  - **Server I/O** — Prisma/`db.ts`, multer uploads, cookies
- Do not put Prisma or Express in the client. Do not fetch from components if a `*Api` method already exists — extend that module.
- Employer UX stays on `/employer` with in-page tabs, not nested employer routes. Auth stays modal-based.

## Quality

- Client: `bun run lint` (eslint-config-next). Server: `bun run lint` (`eslintrc.js`). Server typecheck is `bun run build` (`prisma generate && tsc`). Client TypeScript is strict (`tsconfig.json`).
- No unused imports. Formatting: match the file (no repo-wide Prettier script).
- Never commit secrets or `.env` / `.env.local`. Do not add new env keys unless the code needs them; document names only, never values.

## Do not invent

- User id for writes comes from the JWT, not the request body.
- Skills: `skills` + `job_skills` only. `requirements` / `responsibilities` stay arrays on `jobs`.
- Resumes: local multer disk (`uploads/resumes`), not object storage.
- Application status: `pending` | `reviewed` | `accepted` | `rejected`.
