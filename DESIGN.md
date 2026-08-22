# Design

## Product / UX (in the product today)

- Landing is a marketing page: hero, brands, metrics, reviews, FAQs, contact. Header uses in-page anchors.
- Auth is modal (login / signup), not dedicated routes. Unauthenticated apply opens login. Role gates: employers cannot apply; non-employers cannot use `/employer`.
- Candidates browse `/jobs` (client-side filters) and apply on `/jobs/[jobId]` with cover letter + resume file.
- Employer workspace is one route (`/employer`) with sidebar tabs: dashboard, my jobs, post job, profile, settings.
- Light/dark via `next-themes` (`class` on `html`, system default). Toasts (Sonner) for success/error/warning.
- Motion: Framer Motion on landing/header; blur blobs and a grid backdrop on jobs/employer pages. Mobile: sheet nav, overlay sidebar.

## Visual system

Tokens live in `client/src/app/globals.css` (`:root` / `.dark`) and are mapped into Tailwind via `@theme inline`. Primary is `#e53544`. Also: background, foreground, card, popover, secondary, muted, accent, destructive, border, input, ring, sidebar, chart, glow blobs, `--radius` (`0.625rem`).

Fonts: Eczar is `html` / body (`font-eczar`). Geist, Geist Mono, and Merriweather are loaded on the root layout.

Primitives: shadcn/ui (`components.json` style `radix-nova`, Hugeicons) under `client/src/components/ui/` — button (including `glow`), input, textarea, select, card, badge, dialog, sheet, tabs, sidebar, sonner, etc. Compose with `cn()` (`clsx` + `tailwind-merge`).

### Component hierarchy

1. `app/` route files compose pages.
2. Shared shells: `AnimatedHeaderWrapper`, `BlurryBlobSectionWrapper`, `PageBackgroundWrapper`, `background-beams-with-collision`, employer `MainLayout`.
3. Feature folders: `home/`, `jobs/`, `employer/`, `auth/`, `ai-assistant/`, `modals/`, `skeletons/`.
4. `components/ui/` primitives only.

**Hard rule:** every UI component file ≤ 120 lines. If larger, split by responsibility (subcomponents, hooks, constants, types). Extract rather than grow the same file.

## Screen composition

- **Root layout** — fonts, `globals.css`, `AppProviders` (Redux persist → theme → auth → auth modal → role access → Toaster).
- **`/`** — `Header` (`AnimatedHeaderWrapper` + auth + AI sheet) then section components then `FooterSection`. Hero: `HeroSection` → beams wrapper → `HeroContent`. Other sections typically `BlurryBlobSectionWrapper`.
- **`/jobs`** — `jobs/layout` (`JobsPageHeader` + header-height context) → `PageBackgroundWrapper` → `JobsListingSection` (`FiltersPanel` + `JobsList` / `JobCard`).
- **`/jobs/[jobId]`** — same wrapper → `JobDetailsSection` with `rightPanel={<JobApplyPanel />}` (`ResumeUploadContainer`).
- **`/employer`** — `MainLayout` (left sidebar + `EmployersPageHeader`) → tab: `DashboardTab` | `MyJobsTab` | `PostJobTab` | `ProfileTab` | `SettingsTab`.

AI assistant is a header `Sheet`: `AiAssistant` splits header / chat / welcome / footer; logic in `useAiAssistant`.

## Data flow

```
UI event
  → local useState (forms, tabs, filters, apply)
  → Context: AuthProvider, AuthModalProvider, RoleAccessProvider, ThemeProvider
  → Redux: chat + feedback only (persisted)
  → services/*Api.ts → axiosInstance (cookie credentials)
  → Express route → controller → Prisma → PostgreSQL
```

- Session: `AuthProvider` calls `GET /auth/me`. Axios sends the HttpOnly JWT cookie.
- Domain APIs: `jobsApi` (list, detail, create, apply), `employerApi` (dashboard, profile, my jobs, applications).
- Apply uses `FormData` (`coverLetter`, `resumeFile`). Filters (`useJobsFilters`) run on the already-fetched job list. Post-job company name/location come from the employer profile, not the form.
