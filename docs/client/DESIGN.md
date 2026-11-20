# Design — HireHub (client)

Product behaviour is in [PRD.md](../PRD.md), system layout in [ARCHITECTURE.md](./ARCHITECTURE.md). Rules: [RULES.md](./RULES.md).

## Design principles

- Calm, editorial job board: serif type, a single red accent, soft glow blobs behind sections.
- Semantic tokens only (`bg-primary`, `text-muted-foreground`). Never raw colours in components.
- Auth is modal, the employer area is one route with a sidebar, every mutation ends in a toast.
- Light and dark are equal citizens; check both before finishing a screen.

## Typography

Both fonts come from `next/font/google` in `src/app/layout.tsx`.

| Font | Subset / weights | CSS variable | Use |
| --- | --- | --- | --- |
| Eczar | `latin-ext`, 400 and 700 | `--font-eczar` | Everything: `font-eczar` is set on `<html>` and in `@layer base` |
| Merriweather | `latin` | `--font-serif` | `font-serif` utility only |

No sans-serif or mono font is loaded.

## Colour tokens

Defined in `src/app/globals.css` (`:root` and `.dark`), mapped to Tailwind with `@theme inline`. Base colour in `components.json` is `neutral`.

| Token | Light | Dark |
| --- | --- | --- |
| `--primary`, `--ring`, `--sidebar-primary` | `#e53544` | `#e53544` |
| `--primary-foreground` | `#ffffff` | `#ffffff` |
| `--background` | `oklch(97.566% 0.00181 249.234)` | `oklch(15.993% 0.00531 173.779)` |
| `--foreground` | `oklch(23.787% 0.00892 255.651)` | `oklch(92.758% 0.00592 264.656)` |
| `--card` | `oklch(100% 0.00011 271.152)` | `#101214` |
| `--secondary` / `-foreground` | `#fdecef` / `#e53544` | `#31181b` / `#f17a84` |
| `--muted` / `-foreground` | `oklch(92.758% 0.00592 264.656)` / `oklch(55.102% 0.02343 264.389)` | `oklch(25.376% 0.0096 248.279)` / `oklch(71.366% 0.01926 261.373)` |
| `--border` | `oklch(87.168% 0.00944 258.479)` | `oklch(26.209% 0.00952 248.267)` |
| `--destructive` | `oklch(49.551% 0.18434 31.289)` | `oklch(50.578% 0.19606 30.422)` |
| `--chart-1` to `--chart-5` | `#f17a84` `#e53544` `#c62c39` `#a5242f` `#7d1b24` | same |

Also defined: `popover`, `accent`, `input`, `sidebar*`, and three section glows (`--glow-green-bg` red tint, `--glow-purple-bg`, `--glw-blue-bg`; Tailwind names `glow-green-bg`, `glow-purple-bg`, `glow-blue-bg`).

## Theme, radius, spacing

- `next-themes`: `attribute="class"`, `defaultTheme="system"`, `disableTransitionOnChange`. Tailwind dark variant: `&:is(.dark *)`.
- `--radius: 0.625rem`. Scale: `sm` 0.6x, `md` 0.8x, `lg` 1x, `xl` 1.4x, `2xl` 1.8x, `3xl` 2.2x, `4xl` 2.6x.
- Spacing is the default Tailwind scale. `html` has `scroll-smooth`; buttons get `cursor-pointer`.

## Motion

- Framer Motion variants in `src/animations/index.ts`: `fade` (2.5 s, 0.8 s delay), `staggerContainer` (0.1 s stagger), `slideInItem` (x -20 to 0, 0.4 s). Used by forms and the landing header.
- Landing: `AnimatedHeaderWrapper`, collision beams hero (`background-beams-with-collision`, `CollisionMechanism`), brand marquee (`--animate-scroll`, 40 s linear loop), Embla carousel for reviews.
- Jobs and employer pages: `BlurryBlobSectionWrapper` blobs and `PageBackgroundWrapper` grid backdrop.
- `tw-animate-css` provides shadcn enter and exit transitions. Theme switch has no transition.

## Components

shadcn/ui (`components.json` style `radix-nova`, icons Hugeicons) in `src/components/ui/`: avatar, badge, breadcrumb, button (extra `glow` variant), card, checkbox, dialog, dropdown-menu, input, label, select, separator, sheet, sidebar, skeleton, sonner, spinner, tabs, textarea, tooltip. Classes merge through `cn()` from `@/lib/utils` (re-export of the `cn` package).

Hierarchy:

1. `app/` route files compose pages.
2. Shells: `AnimatedHeaderWrapper`, `BlurryBlobSectionWrapper`, `PageBackgroundWrapper`, `background-beams-with-collision`, employer `MainLayout`.
3. Feature folders: `home/`, `jobs/`, `employer/`, `auth/`, `ai-assistant/`, `modals/`, `skeletons/`, `shared/`.
4. `ui/` primitives only.

Shared pieces: `SectionEyebrow` (icon and label above a section title), `BrandWordmark` (gradient `primary` to `chart-2` accent, then foreground), `ListInput` (add and remove list items in Post Job), `ConfirmationModal`, auth form parts (`AuthFormParts`, `AuthFormFooter`, `RoleToggle`).

Brand copy (name, wordmark, descriptions, SEO, assistant name, portal and tab labels) comes from `brandManifest.json` through `@/constants/brand`.

## Icons and share card

- Mark: the briefcase-H from `public/logo-gray.png` (slate) and `logo-white.png` (light grey). Favicons use the slate mark on light browser UI and the light mark on dark, with no glow or shadow. `favicon.ico` and the 180x180 apple icon use the brand red `#e53544` (white mark on red for apple).
- Share card: dark `#0a0b0b` grid background with a red glow, HIRE in red and HUB in white (Eczar), headline in Eczar 700, support line in Merriweather, three stacked job cards as the signature visual, red domain strip. Source: `scripts/share-card/card.html`.

## Screen composition

- **Root layout**: fonts, `globals.css`, `AppProviders` (Redux persist, theme, auth, auth modal, role access, Sonner `Toaster` top-right).
- **`/`**: `Header` (`AnimatedHeaderWrapper`, auth, AI sheet; anchors `#metrics`, `#reviews`, `#faqs`, `#contact`), then hero, brands, metrics, reviews, FAQs, contact form, `FooterSection`. Hero: `HeroSection` then beams wrapper then `HeroContent`.
- **`/jobs`**: `jobs/layout` (`JobsPageHeader`, header-height context), `PageBackgroundWrapper`, `JobsListingSection` (`FiltersPanel`, `JobsList`, `JobCard`).
- **`/jobs/[jobId]`**: same wrapper, `JobDetailsSection` (`JobFacts`) with `JobApplyPanel` (`useApplyForJob`, `ResumeUploadContainer`).
- **`/employer`**: `MainLayout` (left sidebar, `EmployersPageHeader`), tab `DashboardTab` | `MyJobsTab` | `PostJobTab` | `ProfileTab` | `SettingsTab`. Post Job asks for the company profile first when missing. Mobile: sheet nav, overlay sidebar.
- **AI assistant**: header `Sheet` (`AiAssistantSheet`); `AiAssistant` splits header, chat, welcome, footer. Logic in `useAiAssistant`.
- **Gating**: unauthenticated apply opens login; employers cannot apply; non-employers cannot use `/employer` (role access modals).
