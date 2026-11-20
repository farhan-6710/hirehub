# Tasks — HireHub (client)

`[x]` done · `[ ]` to do.

Product: [PRD](../PRD.md) · Structure: [ARCHITECTURE](./ARCHITECTURE.md).

## Done

- [x] Landing page, job listing with filters, job details and apply
- [x] Modal auth (email and password, Google), role gates
- [x] Employer workspace: dashboard, my jobs, applications and resume view, post job, company profile, settings (change password, delete account)
- [x] Brand manifest, AI assistant sheet, light and dark theme
- [x] Every UI component at 120 lines or fewer
- [x] Single brand manifest at the repo root, read through `constants/brand.ts` (`7de5cf0`)
- [x] Removed `tailwind.config.ts` and unused ESLint config; tokens live in `globals.css` (`e23c9b3`)
- [x] Resume upload checks type and size in the browser (`8619c5b`)
- [x] Docs split into shared, client and server, loaded from `CLAUDE.md`
- [x] Favicons (light and dark, ico, apple), 1200x630 share card, metadata, JSON-LD, `robots.ts`, `sitemap.ts`; `/employer` noindex

## Needs the owner

- [ ] In Vercel, confirm "Include files outside the root directory in the Build Step" is on
- [ ] After deploying, check the live flow once: sign up, apply with a PDF, view the resume as the employer
- [ ] Apply the production migration first: see [server TASKS](../server/TASKS.md)
- [ ] After deploy, paste https://hirehub-brown.vercel.app into WhatsApp and opengraph.xyz to confirm the share card shows (WhatsApp caches previews)

## Later

- [ ] Candidate area: applied jobs and their status
- [ ] Company logo upload (`companyLogo` is stored but shown nowhere)
- [ ] Unit and component tests
- [ ] Per-job metadata and sitemap entries for `/jobs/[jobId]` (the page is a client component fed by the API)
- [ ] Marketing copy: footer links, FAQ answers and landing metrics are placeholders, not live data
- [ ] Landing section headings and hero copy are typed in components; move to the manifest if they should be one source

Server work is tracked in [server TASKS](../server/TASKS.md).
