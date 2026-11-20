# Rules — HireHub

App rules: [client](./client/RULES.md) · [server](./server/RULES.md). Product: [PRD.md](./PRD.md). Data: [DATABASE.md](./DATABASE.md).

## Non-negotiable

- **User id** for writes comes from the JWT (`req.user`), never from the request body.
- **Roles** are enforced on the server with `requireRole`. Hiding a button in the UI is not access control.
- **Resumes** stay in Postgres and are served only to the employer who owns the job. The server validates type, size and file signature.
- **Skills** live only in `skills` and `job_skills`. `requirements` and `responsibilities` stay arrays on `jobs`.
- **Application status** is `pending`, `reviewed`, `accepted` or `rejected`.
- **Migrations** are append-only. Run `migrate:deploy` on a database before deploying code that needs it. Test on a Neon branch, never on production.
- **Brand copy** only from `brandManifest.json`, read in code through `client/src/constants/brand.ts`. Never type the product name into code.
- **Secrets**: never commit `.env` or `.env.local`; document variable names only.

## Working

- Smallest change that solves the problem. Match existing names and folders. No drive-by refactors.
- Update the app's `TASKS.md` and `MEMORY.md` when work lands. Create other markdown only when asked.
