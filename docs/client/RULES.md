# Rules — HireHub (client)

Shared rules: [docs/RULES.md](../RULES.md). Product: [PRD.md](../PRD.md) · Structure: [ARCHITECTURE.md](./ARCHITECTURE.md) · Look: [DESIGN.md](./DESIGN.md).

## Non-negotiable (client)

- Brand copy only from `@/constants/brand`. The logo text is `components/shared/BrandWordmark`.
- Theme tokens only in `src/app/globals.css`. Use semantic classes (`bg-primary`, `text-muted-foreground`), never raw colours. There is no `tailwind.config.ts`.
- No Prisma or Express code in the client. Fetch through a `services/*Api.ts` module and extend it instead of calling Axios from a component.
- Employer UX stays on `/employer` with `?tab=` (the URL is the source of truth). Auth stays modal-based.

## UX

- Toast after every mutation. Never fail silently; show the API's `error` message through `getApiErrorMessage`.
- Disable controls while saving. Icon-only buttons need an `aria-label`.
- Confirm destructive actions with `ConfirmationModal`.

## Naming and folders

| Thing | Convention |
| --- | --- |
| Component | `PascalCase.tsx`, grouped by feature (`home/`, `jobs/`, `employer/`, `auth/`) |
| Hook | `useCamelCase.ts` in `src/hooks` |
| API module | `*Api.ts` in `src/services`; endpoints in `src/constants/api.ts` |
| Imports | `@/` maps to `src/` |
| Quotes | Double quotes; keep each file's export style |

## Code

- UI component files stay at or under 120 lines. Split into subcomponents, hooks, constants or types.
- Local state for forms and filters; Context for auth, modals and theme; Redux only for AI chat and feedback.
- TypeScript strict, no `any`. No unused imports.

## Working

- Before finishing: `bun run lint` and `bun run build` pass; check changed screens on phone and desktop widths, light and dark. Update [TASKS.md](./TASKS.md) and [MEMORY.md](./MEMORY.md).
