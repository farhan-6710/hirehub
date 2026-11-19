# Rules — HireHub

Day-to-day commands and conventions are in [CLAUDE.md](../CLAUDE.md). These are the non-negotiable ones.

- **Brand copy** only from `shared/brand/brandManifest.json`, read through `@/constants/brand`. Never type the product name into code.
- **Theme tokens** only in `client/src/app/globals.css`. Use semantic classes (`bg-primary`, `text-muted-foreground`), never raw colours.
- **User id** for writes comes from the JWT (`req.user`), never from the request body.
- **Roles** are enforced on the server with `requireRole`. Hiding a button in the UI is not access control.
- **Resumes** stay in Postgres and are served only to the employer who owns the job. Validate type, size and file signature on the server.
- **Skills** live only in `skills` and `job_skills`. `requirements` and `responsibilities` stay arrays on `jobs`.
- **Application status** is `pending`, `reviewed`, `accepted` or `rejected`.
- **Migrations** are append-only. Run `migrate:deploy` on a database before deploying code that needs it.
- **Secrets**: never commit `.env` or `.env.local`; document variable names only.
- **UI files** stay at or under 120 lines. Split into subcomponents, hooks, constants or types.
- **Layers**: no Prisma or Express in the client; fetch through an existing `*Api.ts` module.
- **Employer UX** stays on `/employer` with `?tab=`; auth stays modal-based.
