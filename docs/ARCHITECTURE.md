# Architecture

Two packages with no root workspace. The browser talks to an Express API; the API talks to Postgres.

```text
Browser (Next.js) ── Axios + HttpOnly cookie ──► Express /api/v1 ──► Prisma ──► Neon Postgres
        └── AI sheet ──► OpenRouter (direct from the browser)
```

## Folders

| Path | Purpose |
| --- | --- |
| `shared/brand/brandManifest.json` | Brand copy. The only source for name, wordmark, descriptions, SEO, assistant name, portal and tab labels |
| `client/src/app` | Routes: `/`, `/jobs`, `/jobs/[jobId]`, `/employer`; theme tokens in `globals.css` |
| `client/src/components/<domain>` | Feature UI: `home`, `jobs`, `employer`, `auth`, `ai-assistant`, `modals`, `shared`, `skeletons`; shadcn in `ui/` |
| `client/src/hooks` | Data and form logic (`useJobApplications`, `usePostJob`, `useEmployerProfile`, ...) |
| `client/src/services` | `*Api.ts` Axios modules; endpoints in `constants/api.ts` |
| `client/src/providers` | Auth, auth modal, role access, theme, Redux |
| `server/src/routes` → `controllers` | HTTP layer; `middlewares` hold JWT, role check, upload, errors |
| `server/prisma` | Schema and migrations |
| `server/src/seeds` | Demo data scripts |

Dependencies flow down: pages → components → hooks → services → API. The client never imports Prisma or Express.

## State

Local state for forms and filters. Context for auth, auth modal, role access and theme. Redux only for AI chat and feedback (persisted to `localStorage`, cleared on sign out). The employer tab lives in the URL (`?tab=`), so links to a tab work.

## API (`/api/v1`)

| Area | Routes |
| --- | --- |
| Auth | `POST /auth/signup`, `POST /auth/login`, `POST /auth/logout`, `GET /auth/me`, `PATCH /auth/password`, `DELETE /auth/me`, `GET /auth/google`, `GET /auth/google/callback` |
| Jobs | `GET /jobs`, `GET /jobs/:jobId`, `POST /jobs` (employer), `POST /jobs/:jobId/apply` (candidate, multipart `resumeFile` + `coverLetter`) |
| Employer | `GET /employer/dashboard`, `GET /employer/my-jobs`, `DELETE /employer/jobs/:jobId`, `GET /employer/jobs/:jobId/applications`, `GET /employer/applications/:applicationId/resume`, `PATCH /employer/applications/:applicationId/status`, `GET` and `PUT /employer/profile` |
| Health | `GET /health` |

Every `/employer` route runs `protect` then `requireRole('employer')`. Errors are `{ error: string }`. Resume bytes never appear in JSON responses.

## Config

Server `.env` (names only): `PORT` (default 5001), `NODE_ENV`, `DATABASE_URL`, `JWT_SECRET`, `AUTH_COOKIE_NAME` (default `jwt-token`), `CLIENT_URL` (default `http://localhost:3000`), `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REDIRECT_URL`.

Client `.env.local` (names only): `NEXT_PUBLIC_SERVER_URL` (include `/api/v1`), `NEXT_PUBLIC_OPENROUTER_API_KEY`, `NEXT_PUBLIC_OPENROUTER_MODEL`.

In production the cookie is `secure` and `sameSite=none`, so the client and API must both use HTTPS.

## Deploy

- **Client:** Vercel, Root Directory `client`. The client imports `../shared`, so "Include files outside the root directory in the Build Step" must stay on. `client/next.config.ts` sets `turbopack.root` to the repo root. `NEXT_PUBLIC_SERVER_URL` is baked in at build time.
- **API:** Render, configured in its dashboard (no config file in the repo). The repo scripts are `build` (`prisma generate` and `tsc`) and `start` (`node dist/server.js`).
- **Database:** Neon Postgres. Apply schema changes with `bun run migrate:deploy` in `server/` and `DATABASE_URL` pointing at the target database. Do this before deploying code that needs the change.
- Render's disk is not persistent, which is why resumes live in Postgres.
