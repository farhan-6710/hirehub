# Tasks — HireHub Server

`[x]` done · `[ ]` to do.

Product: [PRD](../PRD.md) · Structure: [ARCHITECTURE](./ARCHITECTURE.md).

## Done

- [x] Auth: email and password, Google OAuth, logout, change password, delete account
- [x] Jobs: list, detail, create, apply with a PDF, DOC or DOCX resume stored in Postgres
- [x] Employer: dashboard, my jobs, applications, resume download, status, profile create and update
- [x] Role middleware, input validation, rate limiting, ESLint, smoke test script

## Before the next deploy

- [ ] Apply migration `20261119000000_store_resume_file_in_db` to the production database: in `server/`, `DATABASE_URL=<production url> bun run migrate:deploy`. The new API code needs the new columns.

## Later

- [ ] Unit and integration tests (only `scripts/smoke.sh` exists today)
- [ ] Pagination for jobs and applications
- [ ] Password reset by email
