# Feature: gentleman-discord-banner

## Goal

Add a second community band directly below the existing Stack & Flow community band that
shares the Gentleman Programming Discord and states that the site owner is a maintainer of
Gentle-AI™.

## Decisions (user-approved)

- **Copy** (Spanish, user-facing site copy; final, after the user's rename request):
  - title: `Gentleman Programming en Discord`
  - description: `Maintainer de Gentleman Programming. Debatimos harness, agentes, RDD y flujos de trabajo reales en el Discord de la comunidad.`
  - CTA label: `Acceder al Discord`
  - Rename scope the user approved: the product name goes in the title and after
    "Maintainer de", and the closing clause becomes "en el Discord de la comunidad" instead
    of repeating the name a third time. `Discord` stays capitalized as a proper noun even
    though the request wrote it lowercase. The string `Gentle-AI` no longer appears in `src/`.
  - Superseded first revision: title `Gentle-AI™ en Discord`, description
    `Maintainer de Gentle-AI™. Debatimos harness, agentes, RDD y flujos de trabajo reales en el Discord de Gentleman Programming.`
- **Backgrounds**: both Discord bands must share one background. `.community-band--gentle`
  overrode `background` with its own `linear-gradient(225deg, …)` + `rgba(255,255,255,0.04)`;
  that override was deleted so the band inherits the base `.community-band` background.
  `border-top: none` (single seam between adjacent bands) and `transition-delay: 280ms`
  (reveal cascade) stay.
- **Links**: Discord only.
  `https://discord.com/invite/3QVhF5vRsR`
  (source: `Gentleman-Programming/gentle-ai` README badge)
- **Logo**: reuse the existing unused asset `src/assets/gentle.svg` (Gentleman Programming
  mustache + monocle).
  - First revision wrapped it in a light chip (`<span class="community-band__logo-chip">`,
    `#FEFEFE`) on the assumption that the glyph is black-only and would vanish on the dark
    page. **That assumption was wrong**: the asset already carries white fills (`#FEFEFE`
    ellipse + circle) that hold the contrast on a dark background, with the small black
    pupil drawn on top of them. The chip was redundant and flattened the mark.
  - Superseding user decision (final): the mark sits directly on the band background, no
    plate. The wrapper element is gone and `aria-hidden` moved onto the SVG itself;
    `.community-band__logo--gentle` is `78x50px`, `display: block`, `margin-bottom: 1rem`.

## Constraints

- No new dependencies. Pure CSS, reuse existing design tokens and fonts.
- Keep the existing Stack & Flow band untouched.
- Match house conventions: BEM-ish `community-band__*` class names, `fade-in-visible`
  mount animation driven by the existing `mounted` state, `container` wrapper, external
  links with `target="_blank" rel="noopener noreferrer"`.
- Responsive: reuse the existing `@media (max-width: 900px)` stacking behavior; the second
  band must not double-up borders against the first one.
- Accessibility: decorative logo marked `aria-hidden`, CTA is a real link.

## Verification

- `npm run build` (tsc + vite build) — no test framework exists in this repo, so build is
  the technical gate.
- Visual check of the rendered band (dark background, logo legibility, mobile stacking).
- `npm run lint` has no resolvable ESLint config at the repo root; treat as a blocked check
  and report it instead of inventing one.

## Tasks

- [x] T1 — Add the new community band markup in `src/App.tsx`, below the existing
      `community-band` section and above the footer.
- [x] T2 — Add the band variant styles in `src/App.css` (final: no logo plate; an interim
      light-chip style was implemented, then removed in T4).
- [x] T3 — Verify: build, visual render check (desktop + <=900px), and report lint status.
- [x] T4 — Remove the white chip behind the Gentle mark so the asset sits directly on the
      band background (user request); delete the wrapper, the chip rules and the now-dead
      `@media` `align-self` rule, and size the mark at `78x50px` with its own bottom margin.
- [x] T5 — Equalize the two band backgrounds (drop the `.community-band--gentle` background
      override) and rename the `Gentle-AI` copy to `Gentleman Programming` in title and
      description, closing with "en el Discord de la comunidad".

## Evidence

Verified revision fingerprint (SHA-256 of `git diff -- src/App.tsx src/App.css`):
final revision `f61297ffd37ab58bf82482268127107831383c91eb15064f5d128f6d9c32f256` — 37
insertions, 2 files. (Superseded: `af0b5479…` 57 insertions with the chip; `7e19ee90…` 41
insertions chip-less but with the old copy and the divergent background.)

- T1+T2 writer: `gentle-ai-worker`, scoped to the two allowed surfaces. Result: implemented,
  `npm run build` green.
- Independent verification (`gentle-ai-verify`, read-only) ran against revision R1 below and
  reported: spec conformance 6/6, accessibility clean, no regression; `npm run build` PASS
  (exit 0, 48 modules); `npm run lint` FAIL (exit 2) because the repo has **no ESLint config
  at all** — pre-existing gap, not caused by this change.
- Parent review of R1 found a real render defect the verifier could not see (it had no
  browser): `vite-plugin-svgr` runs with `icon: true`, which gives the SVG a 1:1 intrinsic
  box, so `width: auto; height: 44px` rendered the 2538x1631 artwork as a 44x44 letterboxed
  box with the mark ~28px tall and dead space in the chip. Fixed by declaring the artwork
  ratio explicitly (`width: 68px; height: 44px`) and dropping a no-op white border on a white
  chip. Rule order was also normalized so the `@media` block closes the `community-band`
  section again.
- Render evidence after the fix (Chromium, `Emulation.setDeviceMetricsOverride` + CDP
  `Page.captureScreenshot`), desktop 1280 and mobile 420: band heights 298/299 and 434/405,
  chip 92x60 with a 68x44 glyph, single border seam between the two bands, mobile stacks with
  the chip hugging its content.
- `npm run build` re-run on the chipped revision: PASS, `✓ built in 956ms`.
- Chip removal (final revision, delegated to `gentle-ai-worker`): wrapper deleted, chip rules
  and their `@media` `align-self` rule deleted, logo rule renamed to
  `.community-band__logo--gentle` at `78x50px` with `margin-bottom: 1rem`.
  `grep -rn "logo-chip" src/` → 0 references; `pnpm build` PASS (`✓ built in 1.42s`).
- Render evidence after chip removal (same Chromium/CDP harness), desktop 1280 and mobile
  420: band heights 298/289 and 434/395, mark measured at 78x50 directly on the band
  background, no plate, legible white ellipse + pink-rimmed monocle + magenta mustache with
  the black pupil reading against the white shape, single border seam preserved.

### pnpm toolchain repair (same session, separate concern)

While verifying, `pnpm build` / `pnpm dev` were found broken for reasons unrelated to this
feature: `pnpm-workspace.yaml` held pnpm 11.25's own undecided-build sentinel
(`set this to true or false`), and the file was untracked because `.gitignore` had
`*-workspace.yaml`. Fixed by the user's chosen option: `allowBuilds: esbuild: true` plus a
`!pnpm-workspace.yaml` negation in `.gitignore`. Verified afterwards: `pnpm build` PASS,
`pnpm dev` PASS on 5173. Detail lives in the Engram observation
`egdev-social/pnpm-build-approval`.

### Revision notes

- R1 = first delivered revision (headings verified by `gentle-ai-verify`).
- R2 = R1 + the two CSS corrections (ratio-matched logo box, `@media` rule order) — gated by
  build + render evidence, not by a second independent verification run.
- R3 = R2 minus the white chip, per the user's request (T4). Delegated write; `pnpm build` +
  render evidence.
- R4 (final) = R3 + background equalization and the Gentle-AI -> Gentleman Programming copy
  rename (T5). Delegated write, verified as follows.
- Independent verification still covers **R1 only**. Offering a fresh `gentle-ai-verify` pass
  over R4 if the user wants that seal.

### R4 verification (backgrounds + copy)

- Copy: `grep -rn "Gentle-AI" src/` → 0 references. Titles rendered:
  `Comunidad de desarrollo en Discord` / `Gentleman Programming en Discord`.
- Background equality, computed style: both bands now report the SAME
  `background-image` (`linear-gradient(135deg, rgba(255,0,54,0.08) 0%, …)`), the same
  `background-size` (`auto, auto`) and the same `background-color`
  (`rgba(255,255,255,0.08)`). The only remaining computed difference is `border-top-width`
  (1px vs 0px), which is intentional to avoid a doubled seam.
- Background equality, pixels: viewport-faithful screenshot (`captureBeyondViewport: false`,
  both bands fully visible in one 1280x900 viewport), PNG decoded (zlib + unfilter, ~110
  lines) and two identically-shaped empty strips sampled (300x36 at the same offset inside
  each band): band 1 avg RGB `43,19,22`, band 2 avg RGB `37,19,22`, max per-channel delta
  48/255.
- **Caveat, and it is a page-level one**: the two bands now share identical CSS but their
  composite is still not pixel-identical, because `.app__accent`, `.app__glow`, `.app__spot`
  and `.app__vignette` are `position: fixed; inset: 0` — viewport-anchored gradients. They
  cannot paint the same at two different vertical positions of the page, and they affect the
  social cards the same way. Truly byte-identical bands would require either an opaque band
  background (losing the translucent show-through of the bokeh/glow) or converting those
  four overlay layers from `fixed` to `absolute` (a page-wide behaviour change). Not done;
  offered to the user.
- **Also corrected here**: an earlier report claimed band 2 looked "flatter/darker" because
  of its own style. That was partly a screenshot artifact — `captureBeyondViewport: true`
  paints `position: fixed` layers only once, so the lower half of the capture had no
  overlays at all. Use viewport-faithful captures for this page.
- `pnpm build` on R4: PASS (`✓ built in 1.10s`).

### Not done (needs your call)

- Nothing committed. `odd/` is currently untracked and not ignored by `.gitignore`.
- `npm run lint` stays broken until an ESLint config lands (pre-existing).
