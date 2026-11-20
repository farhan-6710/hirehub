# Architecture — HireHub (client)

Shared product and data: [PRD](../PRD.md) · [DATABASE](../DATABASE.md) · [RULES](../RULES.md). API: [server ARCHITECTURE](../server/ARCHITECTURE.md).

## System

```text
Browser (Next.js) ── Axios + HttpOnly cookie ──► Express /api/v1 ──► Prisma ──► Neon Postgres
        └── AI sheet ──► OpenRouter (direct from the browser)
```

## Stack

Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS 4 (`@tailwindcss/postcss`, `tw-animate-css`), shadcn/ui 4 (`radix-ui`, `class-variance-authority`), Hugeicons, next-themes, Redux Toolkit 2 + redux-persist (AI chat and feedback only), React Hook Form 7 + Zod 4, Axios, Framer Motion 12, Embla, Sonner 2. ESLint 9 with `eslint-config-next`. Package manager: bun.

## Routes

`/` landing · `/jobs` listing · `/jobs/[jobId]` details and apply · `/employer?tab=dashboard|my-jobs|post-job|profile|settings`.

## Folders

| Path | Purpose |
| --- | --- |
| `src/app` | Routes; theme tokens in `globals.css` |
| `src/components/<domain>` | `home`, `jobs`, `employer`, `auth`, `ai-assistant`, `modals`, `shared`, `skeletons`; shadcn in `ui/` |
| `src/redux` | Store and slices (`chatSlice`, `feedbackSlice`) |
| `src/animations`, `src/config` | Framer Motion variants; Sonner toast config |
| `src/lib/utils.ts` | `cn` re-export |
| `src/hooks` | Data and form logic (`useJobApplications`, `usePostJob`, `useEmployerProfile`, ...) |
| `src/services` | `*Api.ts` Axios modules; endpoints in `constants/api.ts` |
| `src/providers` | Auth, auth modal, role access, theme, Redux |
| `src/constants`, `src/types`, `src/utils` | Constants (including `brand.ts`), types, helpers |
| `../brandManifest.json` | Brand copy, the single source (read only by `constants/brand.ts`) |

Dependencies flow down: pages → components → hooks → services → API.

## State

Local state for forms and filters. Context for auth, auth modal, role access and theme. Redux only for AI chat and feedback (persisted to `localStorage`, cleared on sign out). The employer tab lives in the URL.

## Data flow

Component → hook (`useApplyForJob`, `usePostJob`, ...) → `services/*Api.ts` (shared Axios instance, `withCredentials`) → Express. Errors surface through `getApiErrorMessage` and a Sonner toast. The AI sheet calls OpenRouter directly from `useAiAssistant`.

## Config

`.env.local` (names only): `NEXT_PUBLIC_SERVER_URL` (include `/api/v1`; default `http://localhost:5001/api/v1`), `NEXT_PUBLIC_OPENROUTER_API_KEY`, `NEXT_PUBLIC_OPENROUTER_MODEL` (has a built-in default). `NEXT_PUBLIC_*` values are readable in the browser.

## SEO and sharing

Copy, URLs and icon paths live in `brandManifest.json` (`siteUrl`, `seo`, `logo`). `src/lib/seo.ts` builds the metadata; `app/layout.tsx` applies it and adds JSON-LD.

| Piece | Where |
|---|---|
| Base URL | `siteUrl`: `VERCEL_PROJECT_PRODUCTION_URL`, else manifest `siteUrl` (`https://hirehub-brown.vercel.app`) |
| Title, description, keywords, Open Graph, Twitter card | `rootMetadata` (title template `%s | HireHub`; card `summary_large_image`) |
| Canonical and `og:url` | `homeMetadata`, set on `/` only (Next replaces `openGraph` per segment, so it reuses the full object) |
| Icons | `public/brand/favicon-{light,dark}.png` with `prefers-color-scheme` media, `public/favicon.ico`, `public/brand/apple-icon.png`. No `app/favicon.ico` or `icon.*`: they would add extra links |
| Share image | `public/brand/share-card.jpg`, 1200x630 |
| JSON-LD | `siteJsonLd` (Organization + WebSite) |
| `robots.ts`, `sitemap.ts` | `/employer` disallowed; sitemap lists `/` and `/jobs` only |
| `/employer` | `employer/layout.tsx` sets `noindex, nofollow` |

Regenerate the share card and icons: `npm run share-card` in `client/` (needs Google Chrome, Pillow, network for Google Fonts). Edit `scripts/share-card/card.html` and `icons.py`.

## Deploy

Vercel, Root Directory `client`. The client imports `../brandManifest.json`, so "Include files outside the root directory in the Build Step" must stay on; `next.config.ts` sets `turbopack.root` to the repo root. `NEXT_PUBLIC_SERVER_URL` is baked in at build time. Set the API's `CLIENT_URL` to the Vercel origin.
