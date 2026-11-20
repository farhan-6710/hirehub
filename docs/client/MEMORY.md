# Memory — HireHub (client)

Short durable facts. Shared decisions: [docs/MEMORY.md](../MEMORY.md). Work left: [TASKS.md](./TASKS.md).

## Decisions

- The employer tab is read from the URL, not component state, so `?tab=profile` links work.
- Tailwind v4 reads `globals.css` only. `tailwind.config.ts` was removed because its `hsl(var(--x))` colours did not match the hex and oklch tokens.
- `client/next.config.ts` sets `turbopack.root` to the repo root so the client can import `brandManifest.json`.
- The client checks resume type and size before upload; the server checks again.
- Next replaces `openGraph` per route segment, so canonical and `og:url` are set on `/` only and reuse the full `openGraph` object. Setting `metadata.icons` drops file-convention icons, so `app/favicon.ico` was removed and everything is declared in `lib/seo.ts`.
- Production URL `https://hirehub-brown.vercel.app` comes from the README deploy table; it is in the manifest as `siteUrl`.
- Landing metrics, FAQ answers and footer links are placeholder marketing copy, not live data.
