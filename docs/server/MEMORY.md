# Memory — HireHub (server)

Short durable facts. Shared decisions: [docs/MEMORY.md](../MEMORY.md). Work left: [TASKS.md](./TASKS.md).

## Decisions

- Resume upload uses multer memory storage; the controller saves the bytes to `applications.resume_file`.
- Login and sign-up are rate limited (20 attempts per 15 minutes per IP). `trust proxy` is set to 1 for Render.
- The cookie is `secure` and `sameSite=none` in production and is cleared with the same options it was set with.
- The server keeps `package-lock.json` next to `bun.lock`; after dependency changes run `npm install --package-lock-only`.
- `bun run test:smoke` writes data. It refuses to run without `SMOKE_CONFIRM_TEST_DB=yes`.
