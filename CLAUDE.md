# HireHub

Job board. Candidates browse and apply to jobs. Employers post jobs and review applications. See [README.md](README.md) for routes, env variable names, and deploy notes.

Two packages, no root workspace. Run every command inside the package folder.

| Folder | What | Stack |
| --- | --- | --- |
| `client/` | Web UI | Next.js App Router, React, Tailwind v4, shadcn/ui |
| `server/` | REST API under `/api/v1` | Express, Prisma, PostgreSQL |
| `shared/brand/` | Brand manifest | JSON, read by the client |

## Brand copy

Brand copy comes only from [shared/brand/brandManifest.json](shared/brand/brandManifest.json): name, wordmark, descriptions, SEO title and description, assistant name, portal labels and employer tab labels. Longer copy (FAQ, reviews, metrics) interpolates `brand.name` instead of spelling it.

- Client code reads it through `@/constants/brand` (`brand.name`, `brand.seo.title`, ...). Do not hard-code these values.
- The header wordmark is `@/components/shared/BrandWordmark`.
- Edit the JSON, then rebuild. Nothing is generated from it.
- `client/next.config.ts` sets `turbopack.root` to the repo root so the client can import `../shared`. Keep it. On Vercel (Root Directory `client`), "Include files outside the root directory in the Build Step" must stay enabled.
- Theme tokens (colours, radius, fonts, the `animate-scroll` animation) live only in `client/src/app/globals.css` (`:root`, `.dark`, `@theme inline`). There is no `tailwind.config.ts`; Tailwind v4 reads the CSS.

## Key directories

- `client/src/app` routes: `/`, `/jobs`, `/jobs/[jobId]`, `/employer`
- `client/src/components/<domain>` feature UI; `components/ui` shadcn primitives only
- `client/src/services/*Api.ts` Axios calls; endpoints in `client/src/constants/api.ts`; data logic in `client/src/hooks`
- `client/src/providers` auth, auth modal, role access, theme; `client/src/redux` chat and feedback only
- `server/src/routes` then `server/src/controllers`; `server/src/middlewares` (JWT, resume upload, errors)
- `server/prisma` schema and migrations; `server/src/seeds` seed scripts

## Conventions

- Client imports use `@/` (`@/*` maps to `client/src/*`).
- Components: PascalCase files grouped by feature. Hooks: `useX.ts`. API modules: `*Api.ts`. Server files: camelCase (`jobController.ts`).
- Quotes: double in client, single in server. Keep each file's export style.
- UI component files stay at or under 120 lines. Split into subcomponents, hooks, constants or types.
- Layers: UI in `app/` and `components/`; state in local state, Context (auth, modals, theme) or Redux (chat, feedback only); API in `services/*Api.ts`; server flow is route, controller, Prisma.
- No Prisma or Express code in the client. Extend an existing `*Api` module instead of fetching from a component.
- Employer UX stays on `/employer` with `?tab=` tabs (the URL is the source of truth). Auth stays modal-based.
- Server role checks use `requireRole(...)` after `protect`; do not repeat role lookups in controllers.
- Prefer editing existing files. No drive-by refactors.

## Commands

Package manager: bun (`bun.lock` in both packages).

| | `client/` | `server/` |
| --- | --- | --- |
| Install | `bun install` | `bun install` |
| Dev | `bun run dev` | `bun run dev` (nodemon + ts-node) |
| Lint | `bun run lint` | `bun run lint` |
| Type-check / build | `bun run build` | `bun run build` (`prisma generate` + `tsc`) |
| Start | `bun run start` | `bun run start` |
| Migrate | | `bun run migrate:deploy` |
| Seed | | `bun run seed:all` (or `seed:user`, `seed:employer-profile`, `seed:jobs`, `seed:my-jobs`, `seed:applications`) |

There is no unit-test runner. `server`: `bun run test:smoke` walks the whole API flow (sign-up, profile, job, PDF/DOC/DOCX apply, resume download, status, password, delete). It writes data, so run the API against a Neon branch and use `API_URL=... SMOKE_CONFIRM_TEST_DB=yes bun run test:smoke`. Lint config: `client/eslint.config.mjs` (Next.js) and `server/eslint.config.mjs` (typescript-eslint). The server also keeps `package-lock.json`; after changing server deps, run `npm install --package-lock-only` so it stays in sync with `bun.lock`.

## Before finishing

- `client`: `bun run lint` and `bun run build` pass.
- `server`: `bun run lint` and `bun run build` pass.
- No hard-coded brand copy: `git grep -n -i "hirehub" client/src server/src` returns nothing.

## Hard rules

- User id for writes comes from the JWT, never the request body.
- Skills use `skills` + `job_skills`. `requirements` and `responsibilities` stay arrays on `jobs`.
- Resumes are stored in Postgres (`applications.resume_file`), served only to the job's employer. Never on disk, never in list responses.
- Application status is `pending` | `reviewed` | `accepted` | `rejected`.
- Schema changes: edit `server/prisma/schema.prisma` and add a migration with the Prisma CLI (`bunx prisma migrate dev --name <name>`). Never edit an applied migration. Apply to a deployed database with `bun run migrate:deploy` before deploying the code. Test against a Neon branch, not production.
- Never commit `.env` or `.env.local`. Add env keys only when code needs them; document names only.
- Google OAuth: `GOOGLE_REDIRECT_URL` must match the redirect URL set in the Google console.

## Other docs

- [README.md](README.md): setup, API routes, env names, deploy
- [docs/](docs/): PRD, ARCHITECTURE, DATABASE, DESIGN, RULES, MEMORY, TASKS
