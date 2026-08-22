![HireHub Banner](./client/public/app-screenshot.png)

# HireHub

HireHub is a job board: candidates browse and apply, employers post jobs and review applications. Auth is email/password or Google. Roles are `candidate` and `employer` on the user row.

This repo is two packages with no root workspace:

| Package | Role | Dev URL |
| --- | --- | --- |
| `client/` | Next.js App Router UI | `http://localhost:3000` |
| `server/` | Express REST API | `http://localhost:5001` |

The UI calls Express over Axios (`withCredentials: true`). JWT is stored in an HttpOnly cookie. Auth UI is header modals, not `/auth/*` routes. Employer UX is one `/employer` route with `?tab=` (`dashboard`, `my-jobs`, `post-job`, `profile`, `settings`).

## Stack

**Client:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Hugeicons, next-themes, Redux Toolkit + redux-persist (AI chat/feedback only), Axios, Framer Motion, Embla, Sonner.

**Server:** Express 5, TypeScript, Prisma 7, Neon (PostgreSQL) via `DATABASE_URL` and `@prisma/adapter-pg`, JWT (`jsonwebtoken`, `cookie-parser`), bcryptjs, Google OAuth (`google-auth-library`), Multer (`uploads/resumes`, served at `/uploads`).

**Assistant:** OpenRouter chat completions from the client (`useAiAssistant`).

## Layout

```
client/
  src/app/              # Routes: /, /jobs, /jobs/[jobId], /employer
  src/components/       # ui/, shared/, home/, jobs/, employer/, auth/, ai-assistant/
  src/providers/        # Redux, theme, auth, auth modal, role access
  src/services/         # Axios API modules
  src/redux/            # chat, feedback
  src/hooks/ constants/ types/
server/
  src/server.ts         # Process entry
  src/app.ts            # CORS, cookies, /api/v1, /uploads, /health
  src/routes/           # /auth /jobs /employer
  src/controllers/
  src/middlewares/      # JWT protect, resume upload, error handler
  src/config/db.ts      # Prisma client
  prisma/               # schema, migrations
  src/seeds/
```

```
UI → AuthContext / local state / Redux
       → services (Axios) → Express /api/v1 → controllers → Prisma → Neon (PostgreSQL)
AI sheet → OpenRouter
```

**Routes (client):** `/` landing, `/jobs` listing, `/jobs/[jobId]` details + apply, `/employer` tabs.

**Routes (server, `/api/v1`):**

- Auth: `POST /auth/signup` `POST /auth/login` `POST /auth/logout` `GET /auth/me` `GET /auth/google` `GET /auth/google/callback`
- Jobs: `GET /jobs` `GET /jobs/:jobId` `POST /jobs` (employer) `POST /jobs/:jobId/apply` (candidate; `resumeFile`, `coverLetter`)
- Employer (auth): `GET /employer/dashboard` `GET /employer/profile` `GET /employer/my-jobs` `DELETE /employer/jobs/:jobId` `GET /employer/jobs/:jobId/applications` `PATCH /employer/applications/:applicationId/status`
- Health: `GET /health`

Skills go through `skills` + `job_skills`. `requirements` and `responsibilities` are `String[]` on `jobs`. Application status: `pending` | `reviewed` | `accepted` | `rejected`.

## Setup

Requires Node. Both packages have `bun.lock`; server also has `package-lock.json`. Scripts below use bun.

Server `PORT` in code defaults to `5000`; client API default is `http://localhost:5001/api/v1`. Set env so they match.

### Server

```sh
cd server
bun install
```

Create `server/.env` (names only):

```
PORT
NODE_ENV
DATABASE_URL
JWT_SECRET
CLIENT_URL
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
GOOGLE_REDIRECT_URL
AUTH_COOKIE_NAME
```

`CLIENT_URL` defaults to `http://localhost:3000`. `AUTH_COOKIE_NAME` defaults to `jwt-token`.

```sh
bun run dev
```

### Client

```sh
cd client
bun install
```

Create `client/.env.local` (names only):

```
NEXT_PUBLIC_SERVER_URL
NEXT_PUBLIC_OPENROUTER_API_KEY
NEXT_PUBLIC_OPENROUTER_MODEL
```

`NEXT_PUBLIC_SERVER_URL` should include `/api/v1`.

```sh
bun run dev
```

## Scripts

**Client:** `dev`, `build`, `start`, `lint`.

**Server:** `dev` (nodemon + ts-node), `build` (`prisma generate` + `tsc`), `start` (`node dist/server.js`), `lint`, `seed:all` (also `seed:user`, `seed:employer-profile`, `seed:jobs`, `seed:my-jobs`, `seed:applications`).

## Deploy

Axios calls `process.env.NEXT_PUBLIC_SERVER_URL` (see `client/src/constants/api.ts`). That value is baked in at Vercel build time. Git repo is this monorepo; set Vercel **Root Directory** to `client`. Point the server `CLIENT_URL` at the Vercel origin.

| Piece | Platform | URL |
| --- | --- | --- |
| Client | Vercel | https://hirehub-brown.vercel.app/ |
| API | Render | https://hirehub-backend-asif.onrender.com |
| Database | Neon (PostgreSQL) | `DATABASE_URL` |
