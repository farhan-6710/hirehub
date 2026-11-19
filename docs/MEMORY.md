# Memory — HireHub

Short durable facts.

## Decisions

- Resumes are stored in Postgres (`bytea`), not on disk. Render's disk is not persistent, and the one real uploaded resume in the old data returned 404 from the live API.
- The employer tab is read from the URL, not component state, so `?tab=profile` links work.
- Tailwind v4 reads `globals.css` only. `tailwind.config.ts` was removed because its `hsl(var(--x))` colours did not match the hex and oklch tokens.
- Brand copy lives in one JSON file; tokens stay in CSS by choice.
- The server drops the JWT from response bodies; the HttpOnly cookie is the only session carrier.
- Applicant counts are computed, not stored.

## Ops

- Live client: https://hirehub-brown.vercel.app (Vercel). Live API: https://hirehub-backend-mebq.onrender.com (Render).
- Database: Neon project `my-projects`, database `hirehub-db`.
- Testing schema changes and the API: create a Neon branch of the database, run `migrate:deploy` and the API against it, run `bun run test:smoke`, then delete the branch.
