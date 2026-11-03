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
- Brand palette (ink/slate/stone/signal/moss) is registered as Tailwind colors in `src/styles.css` `@theme`; components use those classes, so add new colors there, not inline.
- Venue photos, logo and video are Lovable Assets pointers in `src/assets/*.asset.json`, referenced from `src/data/photos.ts` and `src/data/content.ts`.
- Booking enquiries are inserted from the browser into `public.enquiries`; RLS allows insert only, nobody can read them from the site — keep it write-only.
- Hero motion (chapters, brand-reveal logo, SCROLL cue, header-logo handover via a CSS variable, video scrub) is driven by the single rAF loop in `src/hooks/useHeroVideoScrub.ts`; add hero effects there instead of new scroll listeners so timing stays in one place.
- The АРКА 123 logo for preloader and hero is one inline SVG (`src/components/BrandMark.tsx`, paths in `src/data/preloaderLogo.ts`), coloured via `fill-*`; both screens share the same size/offset classes so the preloader fade has no logo jump.
