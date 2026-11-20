# Architecture — HireHub (server)

Shared product and data: [PRD](../PRD.md) · [DATABASE](../DATABASE.md) · [RULES](../RULES.md). Client: [client ARCHITECTURE](../client/ARCHITECTURE.md).

## Stack

Express 5, TypeScript 5, Prisma 7 with `@prisma/adapter-pg`, Neon Postgres, JWT in an HttpOnly cookie (`jsonwebtoken` 9, `cookie-parser`), bcryptjs 3, Google OAuth (`google-auth-library` 10), Multer 2 (memory storage), express-rate-limit 8, cors, dotenv. Dev: nodemon + ts-node. Lint: ESLint 9 + typescript-eslint. Package manager: bun (`package-lock.json` is kept too). CommonJS output to `dist/`.

## Folders

| Path | Purpose |
| --- | --- |
| `src/server.ts` | Process entry |
| `src/app.ts` | CORS, cookies, `/api/v1` routes, `/api/v1/health`, error handler last |
| `src/routes` → `src/controllers` | HTTP layer |
| `src/middlewares` | `protect` (JWT), `requireRole`, `uploadResume`, `errorHandler` |
| `src/utils` | Token and cookie helpers, resume file checks, validation rules, Google client |
| `src/config` | Port and environment (`config.ts`), Prisma client (`db.ts`) |
| `src/seeds` | Demo data scripts |
| `prisma/` | Schema and migrations |
| `scripts/smoke.sh` | API smoke test for a disposable database |

## Data flow

Route → `protect` / `requireRole` → controller (validate input) → Prisma → Neon. Errors go to `errorHandler`.

## API (`/api/v1`)

| Area | Routes |
| --- | --- |
| Auth | `POST /auth/signup`, `POST /auth/login`, `POST /auth/logout`, `GET /auth/me`, `PATCH /auth/password`, `DELETE /auth/me`, `GET /auth/google`, `GET /auth/google/callback` |
| Jobs | `GET /jobs`, `GET /jobs/:jobId`, `POST /jobs` (employer), `POST /jobs/:jobId/apply` (candidate, multipart `resumeFile` + `coverLetter`) |
| Employer | `GET /employer/dashboard`, `GET /employer/my-jobs`, `DELETE /employer/jobs/:jobId`, `GET /employer/jobs/:jobId/applications`, `GET /employer/applications/:applicationId/resume`, `PATCH /employer/applications/:applicationId/status`, `GET` and `PUT /employer/profile` |
| Health | `GET /api/v1/health` |

Every `/employer` route runs `protect` then `requireRole('employer')`. Errors are `{ error: string }`. Resume bytes never appear in JSON.

## Config

`.env` (names only): `PORT` (default 5001), `NODE_ENV`, `DATABASE_URL`, `JWT_SECRET`, `AUTH_COOKIE_NAME` (default `jwt-token`), `CLIENT_URL` (default `http://localhost:3000`), `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REDIRECT_URL`. In production the cookie is `secure` and `sameSite=none`, so client and API must both use HTTPS.

## Deploy

- **API:** Render, configured in its dashboard (no config file in the repo). The repo scripts are `build` (`prisma generate` and `tsc`) and `start` (`node dist/server.js`).
- **Database:** Neon Postgres. Apply schema changes with `bun run migrate:deploy` and `DATABASE_URL` pointing at the target database, before deploying code that needs them.
- Render's disk is not persistent, which is why resumes live in Postgres.
