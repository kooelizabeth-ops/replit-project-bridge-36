<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Single-page venue site lives in `src/routes/index.tsx`, composed from `src/sections/*`; section anchors (#space, #booking…) are in-page scroll targets, not routes — the original site is one page.
- Brand palette tokens (brand, ivory, paper, ink, graphite, ash, mist, rule…) and editorial utilities (shell, section-y, display-*, label-mono, reveal) live in `src/styles.css`; components use those classes — add new colors/type styles there, not inline. The brand accent stays a literal hex because it must match exactly.
- Venue photos, logo and video are Lovable Assets pointers in `src/assets/*.asset.json`, referenced from `src/data/photos.ts` and `src/data/content.ts`.
- Booking enquiries are inserted from the browser into `public.enquiries` (phone stored in `contact`, optional `comment`); RLS allows insert only, nobody can read them from the site — keep it write-only.
