# Verification report — 2026-11-14

## Result

Both implemented chapters completed in the browser integration runner: **28 missions**, including every Day 1 substep, both school-bus journeys, classroom time skip, first-aid kit handoff, purchases, dialogue choices, and the Day 2 ending. This is an accelerated integration run, not a claim that every interaction was manually played with a physical keyboard.

## Environment and commands

- Windows host, Node.js, Codex in-app Chromium browser, WebGL2.
- `npm install --ignore-scripts`: succeeded for the sole dependency, Three.js 0.180.0; npm reported zero vulnerabilities. The initial Vite/esbuild installation was blocked by Windows child-process permissions; the final project does not use Vite or native installation scripts.
- Development server: `node scripts/server.mjs`, serving http://127.0.0.1:5173. `npm run dev` invokes this same script.
- `npm run build`: passed, created local static `dist/` with vendored Three.js modules and assets.
- `npm test`: **6 passed, 0 failed**. Uses Node's in-process test runner; the first subprocess-based `node --test` attempt was blocked by host permissions and was replaced.
- Syntax checks for main/world scripts: passed.
- glTF resource audit: **28 bundled asset files, no missing referenced buffers or images**. Hashes and sizes recorded in `ASSET_MANIFEST.json`.

## Browser integration

Visited `/?qa=1` and clicked **Run both chapters**. The optional runner:

1. Starts a separate fresh test save.
2. Plans paths using the actual world collision checks.
3. Supplies movement through the normal controller, including sprint and its stamina limits.
4. Triggers the same proximity-gated interaction functions used by E/F.
5. Waits through actual activity logic and road-following bus movement.
6. Selects dialogue buttons and checks save readability after each step.

Observed final result:

```text
PASS day1-mission1:0 through day1-mission12:1
PASS day2-mission1:0 through day2-mission15:0
PASS: all 28 missions / both days completed through collision-aware movement.
```

The final line is emitted when the last sleep interaction sets the finished state. This test is not a visual assertion of every animation or a medical/traffic simulation test. It validates completion of the implemented event paths.

### Bugs found and fixed during browser testing

- Two character normal-map filenames referenced `_png.png` aliases missing from the original archive folder. Copied the corresponding licensed included normal maps to resolve the references.
- School front entrance intersected the canal's blocked zone. Moved the school and classroom onto dry land.
- Passenger exit position landed on the school back wall. Moved the disembark point to the road side of the stop.
- Escape opened the pause dialog and the browser's default Escape behavior immediately closed it. Prevented that default action.
- Clothing recoloring previously used animated/world transforms. Captured rest-pose transforms so changing outfits uses stable body regions.

No new console errors/warnings were observed after the texture fixes during the corrected story run. The tool retained the three earlier texture errors in its history; they predate the corrections.

## Direct UI checks

| Check | Evidence / scope |
|---|---|
| Main menu and game load | Village, imported characters and functional buttons rendered. |
| Wake up | Pressed E; objective changed to Brush your teeth; XP and save indicator appeared. |
| Movement and collision | Integration runner traversed both chapters through the actual controller, including classroom doorway. Short W inputs were also dispatched manually. |
| Camera | Follow camera operated during traversal and bus journeys; keyboard camera inputs dispatched. Full mouse pointer-lock, wall-avoidance edge cases and wheel behavior need broader manual testing. |
| Minimap | Rendered player/mission markers and changed through traversal; no pixel-level coordinate assertion. |
| Full map | Opened with M; clicked map; received “Waypoint placed · 28 metres away”. |
| Save/Continue | Reloaded page, clicked Continue and restored Brush your teeth. Manual Save and Exit to menu also worked. Save parsing/gating additionally covered by unit tests. |
| Pause | Escape displayed pause menu. Clock remained exactly 09:31 across separate tool calls; resumed via UI. |
| Settings | Changed graphics to Low and weather to Rain; HUD and rendered world updated. |
| Responsive layout | Inspected 1920×1080, 960×540, and initial narrower app viewport. Main HUD remained legible. Full-map labels are small and crowded. |
| Standalone build | Opened `/dist/index.html` over the local server. Source build and static build use local assets; no runtime CDN. |

## Performance observations

- An initial smaller viewport showed **59 FPS**, 555 draw calls.
- At a verified **1920×1080** viewport on **Low**, the HUD showed **60 FPS**, 276 draw calls; canvas render resolution was **1536×864** (0.8 render scale).
- Another Low/rain sample showed **57 FPS**.
- With two WebGL tabs and the accelerated runner active, samples dropped to roughly **28–32 FPS**. These are not representative single-instance benchmarks.

These are short HUD samples from this machine, not GPU-independent guarantees, sustained benchmark averages, or validation of 1080p Ultra. High/Ultra presets, long sessions, full GPU/driver coverage, and accessibility need further testing.

## Unverified or absent

No claim that absent Days 3–10, other vehicle types, streaming, advanced physics, realistic activity animations, NPC schedules, or AAA visual quality work. See `KNOWN_LIMITATIONS.md`. User-side VS Code Live Server and a standalone external Chrome/Edge session were not manually exercised; the equivalent HTTP static build was checked in the in-app browser.
