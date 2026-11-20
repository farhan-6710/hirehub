# Rules — HireHub (server)

Shared rules: [docs/RULES.md](../RULES.md). Product: [PRD.md](../PRD.md) · Data: [DATABASE.md](../DATABASE.md) · Structure: [ARCHITECTURE.md](./ARCHITECTURE.md).

## Non-negotiable (server)

- Routes call controllers; controllers call Prisma. Auth is `protect`, roles are `requireRole(...)`. Do not repeat role lookups in controllers.
- Never select `resumeFile` outside `GET /employer/applications/:id/resume`. List queries select explicit fields.
- Validate every input at the controller boundary (`utils/validation.ts` for shared rules). Respond `{ error: string }` with the right status; log details on the server, send generic text for 500s.
- Schema changes go through a Prisma migration; applied migrations are never edited.

## Naming and folders

| Thing | Convention |
| --- | --- |
| Files | camelCase (`jobController.ts`, `authRoutes.ts`) |
| Folders | `routes`, `controllers`, `middlewares`, `config`, `utils`, `seeds`, `prisma/` |
| Quotes | Single quotes |
| DB columns | snake_case in the database, camelCase in Prisma |

## Working

- Before finishing: `bun run lint` and `bun run build` pass. For API changes run `bun run test:smoke` against a Neon branch (never production). Update [TASKS.md](./TASKS.md) and [MEMORY.md](./MEMORY.md).
