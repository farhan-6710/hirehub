# Architecture — HireHub Client

Shared product and data: [PRD](../PRD.md) · [DATABASE](../DATABASE.md) · [RULES](../RULES.md). API: [server ARCHITECTURE](../server/ARCHITECTURE.md).

## System

```text
Browser (Next.js) ── Axios + HttpOnly cookie ──► Express /api/v1 ──► Prisma ──► Neon Postgres
        └── AI sheet ──► OpenRouter (direct from the browser)
```

## Stack

Next.js (App Router), React, TypeScript, Tailwind CSS v4, shadcn/ui, Hugeicons, next-themes, Redux Toolkit + redux-persist (AI chat and feedback only), Axios, Framer Motion, Embla, Sonner.

## Routes

`/` landing · `/jobs` listing · `/jobs/[jobId]` details and apply · `/employer?tab=dashboard|my-jobs|post-job|profile|settings`.

## Folders

| Path | Purpose |
| --- | --- |
| `src/app` | Routes; theme tokens in `globals.css` |
| `src/components/<domain>` | `home`, `jobs`, `employer`, `auth`, `ai-assistant`, `modals`, `shared`, `skeletons`; shadcn in `ui/` |
| `src/hooks` | Data and form logic (`useJobApplications`, `usePostJob`, `useEmployerProfile`, ...) |
| `src/services` | `*Api.ts` Axios modules; endpoints in `constants/api.ts` |
| `src/providers` | Auth, auth modal, role access, theme, Redux |
| `src/constants`, `src/types`, `src/utils` | Constants (including `brand.ts`), types, helpers |
| `../shared/brand/brandManifest.json` | Brand copy, the single source |

Dependencies flow down: pages → components → hooks → services → API.

## State

Local state for forms and filters. Context for auth, auth modal, role access and theme. Redux only for AI chat and feedback (persisted to `localStorage`, cleared on sign out). The employer tab lives in the URL.

## Config

`.env.local` (names only): `NEXT_PUBLIC_SERVER_URL` (include `/api/v1`), `NEXT_PUBLIC_OPENROUTER_API_KEY`, `NEXT_PUBLIC_OPENROUTER_MODEL`.

## Deploy

Vercel, Root Directory `client`. The client imports `../shared`, so "Include files outside the root directory in the Build Step" must stay on; `next.config.ts` sets `turbopack.root` to the repo root. `NEXT_PUBLIC_SERVER_URL` is baked in at build time. Set the API's `CLIENT_URL` to the Vercel origin.
