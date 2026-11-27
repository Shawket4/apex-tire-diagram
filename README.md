# apex-tire-diagram

The Apex truck wheel diagram — the plain 2D wheel map plus the optional 3D
animated tanker rig — shared by:

- **apex-maintenance-tauri** (the garage desktop app), where it is the wheel picker on the tire screens;
- **apex-react** (the office dashboard), on the car page's maintenance tab.

Both apps depend on a pinned tag of this repo, so the drawing, its words
(Arabic and English) and its behaviour cannot drift apart. Change it here,
tag a release, bump the tag in both apps.

It is **pure presentation**: rows and callbacks come in as props, nothing is
fetched, nothing is written. Each app maps its own data onto `DiagramAxle` /
`DiagramPosition` with a small adapter.

## Install

```jsonc
// package.json
"apex-tire-diagram": "github:Shawket4/apex-tire-diagram#v0.1.1"
```

Peer dependencies: `react` 19, `react-dom` 19, `three`, `@react-three/fiber` 9,
`@react-three/drei` 10, `lucide-react`. The built `dist/` is committed (CI
checks it matches the source), so installing from git needs no build step.

## API

```tsx
import { WheelDiagram, WheelMap, WheelLegend, positionLabel } from "apex-tire-diagram";
import { TruckDiagram } from "apex-tire-diagram/3d"; // the 3D scene alone (pulls in three.js)

<WheelDiagram
  axles={axles}            // DiagramAxle[]
  positions={positions}    // P[] where P extends DiagramPosition (extra fields are fine)
  lang="ar"                // "ar" | "en" — words, digits and text direction
  selectedId={selectedId}  // string | null
  onSelect={(p) => …}      // receives your own row type P back
/>
```

- `WheelDiagram` — 2D/3D toggle (remembered per device in `localStorage["apex-wheel-view"]`).
  The 2D map is the default; the 3D scene is a lazy chunk (three.js is only fetched
  when someone picks 3D) and falls back to the map with a notice when WebGL is
  missing or the context is lost.
- `WheelMap` — the top-down HTML map. Every wheel is a button; omit `onSelect` for a
  picture only, `compact` for the small layout preview.
- `WheelLegend` — what the colours mean.
- `TruckDiagram` (`apex-tire-diagram/3d`) — the 3D scene on its own. Choosing a wheel of a
  dual pair zooms in on that pair; clicking empty space or pressing Esc steps back out to the
  whole truck. Stepping out keeps the wheel selected (the app's form stays open); choosing a
  wheel goes back in.
- Helpers: `positionLabel(p, axles, lang)` ("Tractor axle 2, left outer"),
  `wheelShortLabel`, `positionParts`, `buildMapLayout`, `wheelState`, `tireName`,
  `syntheticChassis(config)` / `wheelCount(config)` (mirror the garage's Rust planner),
  `translator(lang)`, `messages`, `formatNumber`, `textDir`.

### Data

```ts
interface DiagramAxle { id; section: "tractor" | "trailer"; section_index; axle_type; is_steering; is_lifted }
interface DiagramPosition {
  id; axle_id: string | null; side: "left" | "right" | null; depth: "single" | "outer" | "inner" | null;
  is_spare; spare_index; position_code; tire_id: string | null; brand; model; size;
  pending: boolean; // mount not yet acknowledged by the server (garage only; the office passes false)
}
```

## Styling contract

The components are styled with Tailwind utility classes, so they pick up each
app's theme. The consuming app must:

1. **Scan this package for classes.**
   - Tailwind v4: `@source "../node_modules/apex-tire-diagram/dist";` in the CSS entry
     (path relative to that CSS file).
   - Tailwind v3: add `"./node_modules/apex-tire-diagram/dist/**/*.js"` to `content`.
2. **Provide these colour tokens** (shadcn names plus a few status ones):
   `background`, `foreground`, `card`, `muted`, `muted-foreground`, `accent`, `primary`,
   `ring`, `border`, `border-strong`, `status-ok`, `status-ok-soft`, `info`, `info-soft`,
   `status-due_soon`, `status-due_soon-soft`. They must accept opacity modifiers (`/30`, `/50`).
3. **Provide a `pointer-coarse` variant** (`@media (pointer: coarse)`). Tailwind v4 has
   it built in; on v3 add it with a plugin (`addVariant('pointer-coarse', '@media (pointer: coarse)')`).

The 3D stage keeps a light background in dark mode on purpose (the scene is lit
for a light stage).

## Develop

```sh
npm ci
npm run typecheck
npm test
npm run build      # rewrites dist/ — commit it with the source change
```

Release: bump `version`, `npm run build`, commit, `git tag vX.Y.Z`, push the tag, then
bump the tag in both apps.
