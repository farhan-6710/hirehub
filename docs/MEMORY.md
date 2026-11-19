# Memory — HireHub (shared)

Short durable facts for both packages. Client: [MEMORY](./client/MEMORY.md) · Server: [MEMORY](./server/MEMORY.md).

## Decisions

- Resumes are stored in Postgres (`bytea`), not on disk. Render's disk is not persistent, and the one real uploaded resume in the old data returned 404 from the live API.
- The JWT is never returned in response bodies; the HttpOnly cookie is the only session carrier.
- Applicant counts are computed from `applications`, not stored.
- Brand copy lives in one JSON file; theme tokens stay in CSS by choice.

## Ops

- Live client: https://hirehub-brown.vercel.app (Vercel). Live API: https://hirehub-backend-mebq.onrender.com (Render).
- Database: Neon project `my-projects`, database `hirehub-db`.
- Testing schema changes and the API: create a Neon branch of the database, run `migrate:deploy` and the API against it, run `bun run test:smoke` in `server/`, then delete the branch.
- Do not commit `.env` or secrets.
