# Tasks — HireHub

## Before the next deploy

- Apply migration `20261119000000_store_resume_file_in_db` to the production database: in `server/`, `DATABASE_URL=<production url> bun run migrate:deploy`. The new API code needs the new columns.
- In Vercel, confirm "Include files outside the root directory in the Build Step" is on.
- Re-check the live flow once: sign up, apply with a PDF, view the resume as the employer.

## Open

- Add unit and component tests. Today only `server/scripts/smoke.sh` (`bun run test:smoke`) exists; it checks the API flow against a disposable database.
- Candidate area: applied jobs and their status.
- Pagination for `/jobs` and applications.
- Password reset by email.
- Company logo upload (the `companyLogo` URL is stored but not shown anywhere).
- Marketing copy: footer links, FAQ answers and the landing metrics are placeholders, not live data.
