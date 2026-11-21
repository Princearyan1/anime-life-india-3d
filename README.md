# Anime Life India 3D — Chandanpur

[Play in your browser](https://princearyan1.github.io/anime-life-india-3d/) · [GitHub source](https://github.com/Princearyan1/anime-life-india-3d)

Version 0.5 is a playable Three.js village story milestone for Windows desktop browsers. This is a stylized development build, **not a finished AAA game**. Days 1–6 are implemented (60 missions); Days 7–10 are not.

## Run on Windows

Install a current Node.js LTS release. In PowerShell, open this project folder and run:

```powershell
npm install
npm run dev
```

Open **http://127.0.0.1:5173** in Chrome or Edge with hardware acceleration enabled. The server is local-only. No paid API, account, network game service, or runtime CDN is used. Assets are bundled locally.

```powershell
npm test
npm run build
```

`npm run build` creates `dist/`, including Three.js and its license. Open `dist/index.html` with the VS Code **Live Server** extension. Alternatively, after `npm install`, open the root `index.html` with Live Server. Opening an HTML file directly with `file://` will not work because ES modules and glTF files need HTTP.

The ZIP includes `dist/`, so Live Server can serve that directory without installing dependencies. `node_modules/` is deliberately excluded from the ZIP. Build and development scripts use Node's standard library rather than a native bundler.

## Play

- **W A S D**: jog relative to camera; **Alt**: walk; **Shift**: sprint; **Space**: jump; **Ctrl**: crouch.
- Click the world to capture the mouse. Move the mouse to look; **Esc** releases capture and pauses. Right-button drag and arrow keys are camera fallbacks.
- **Mouse wheel**: zoom. Optional shoulder camera is in Settings.
- **E**: interact within four metres of the gold objective; **F**: board the bus when prompted.
- **M**: map; click a destination to place a blue waypoint and a collision-aware route. Close the map to keep following the blue line, arrowheads, compass instruction and remaining distance on the minimap. Gold routes follow the active story objective when no personal waypoint is set. The map has a directions toggle and Clear waypoint button. **Tab**: journal. **I**: inventory and relationships.
- **Esc**: pause, save, settings, or exit to menu.

Start at the charpai. Follow the gold marker to the washing area, bathing enclosure, Dadi, kitchen, and school bus. Enter the school through its front doorway. The school activity advances the clock to 11:30. Return by bus, eat lunch, ask the clinic nurse for adult help, deliver the sealed kit, buy groceries, hear Dadi's story, and sleep to unlock the festival chapter.

The clock runs at one in-game minute per second by default. Change speed or weather in Settings. Activity transitions are deliberately brief. Dialogue choices require clicking a reply. Bus travel is visible and automatic; passengers are placed just beside the bus after arrival.

## Save system

The game stores a versioned save in browser `localStorage`, with autosaves after interactions and bus arrival. Saves contain day, mission, substep, position, outfit, inventory, money, XP, relationships, decisions, and clock. Continue uses the same browser and origin (hostname + port). Changing the port or clearing browser data creates a separate save. Invalid saves are rejected. Storage failure is shown in the HUD.

Reset Progress and New Game ask for confirmation inside the game. Use the pause menu to save before closing. No cloud sync is provided.

## Architecture

- `src/story.js`: declarative chapters, event-driven mission validation, inventory transactions, save validation.
- `src/world.js`: original village geometry, colliders, instanced foliage, bus, rain, signs and textures.
- `src/characters.js`: licensed glTF rigs, skeletal animation blending, rest-pose rotation retargeting, skin-weight-aware clothing colors, Indian sari/kurta/salwar meshes, head details and accessories.
- `src/main.js`: input, third-person camera, physics approximation, bus routes, activity transitions, HUD, menus, audio cues and integration.
- `src/navigation.js`: shared A* walking paths for minimap and integration checks.
- `src/travel.js`: shared bus route and full vehicle footprint collision.
- `tests/story.test.js` and `tests/navigation.test.js`: progression, gating, purchases, save validation, and day transitions.
- `scripts/`: dependency-free local server and offline static packager.
- `public/assets/`: integrated assets and bundled licenses.

## Browser integration test

Visit `http://127.0.0.1:5173/?qa=1` and click **Run all six days**. This opt-in runner uses a separate save key. It navigates with the same character controller and collision tests, invokes normal interactions, runs both bus routes and timed activities, selects a dialogue reply, and reports each step. It accelerates simulation by running multiple updates per rendered frame. It does not teleport between walking objectives. Its FPS is **not a performance benchmark**. See `TEST_REPORT.md` for checks actually performed.

## Credits and scope

Read `ASSET_CREDITS.md` for licenses and modifications; `KNOWN_LIMITATIONS.md` records the remaining work. No PUBG/BGMI assets, logos, animations, or proprietary content are included.

## Village edition 0.2

Seventeen NPCs including both Day 2 sellers, patterned Indian outfits and accessories, smoother jog/sprint animation, bus body collision and cleared road layout, detailed school bus with seats/windows/opening door, asphalt/plaster/bark PBR textures, leaf-card trees, courtyard gate/rangoli/tulsi and improved house trim. Static scenery is batched by material. Graphics remain stylized.

GitHub Actions runs tests, builds the static site and deploys GitHub Pages on pushes to main. The local character inspector is `tests/characters.html` while the development server runs.

## District edition 0.3

Days 1-4 are playable: 44 missions total. A 1.2 km square boundary includes Rampur town, North depot, Neem hamlet, mango orchard and riverside mela. Day 3 adds eight multi-step monsoon relief missions and a bridge repair; Day 4 adds eight orchard, missing-parcel and mela missions. Six clue puzzles, journal notes, twelve story auto journeys and festival lights extend the story.

Press R near any of six green auto stands from Day 3 to choose a destination (15 rupees). Optional rides reserve remaining story expenses. M opens region and destination selectors; close the map to follow minimap directions. Tab shows clues. Completed version 0.2 saves unlock Day 3 on Continue. Reloading during a ride restarts it at departure without charging an optional fare again.

New modules: src/chapters.js (Day 3-4 story), src/district.js (regional scenery and auto), tests/district.test.js (progression, migration, all 30 directed auto routes and real-world navigation).

## Frontier edition 0.4

Day 5: water-cooperative investigation, three observation records, compatible-kit puzzle, training sequence, and a 70-second three-checkpoint field trial with free retries. Day 6: heritage station mystery, three-part archive reference, evidence matching, toy-signal sequence and a community exhibition. Sixteen new multi-step missions bring the total to sixty.

The boundary is now 1.8 km square. Suraj reservoir and the heritage station add two auto stops (eight total), fenced water, viewing areas, a filter demonstration, trial walls, archive, disused railway display, clock, museum and memorial garden. The map has a Suraj/station region.

Jog speed is 5 m/s (previously 3.8), sprint is 8 m/s (previously 6.5), walking is 2.8 m/s. Sprint drains stamina more slowly and recovers faster. Movement substeps prevent long frames from skipping colliders; frame time up to 150 ms is retained instead of cutting it at 50 ms. Clock progression defaults to one game minute per four real seconds.

NPC dialogue now begins only after a nearby interaction, not when the next objective activates. The HUD still shows the next destination from a distance. Clothing uses fitted torso/kurta geometry and blended spine/thigh weights; base rigs remain stylized adult stand-ins. Repeated plain materials are shared so scenery batches into fewer draw calls.

Completed version 0.3 Day 4 saves unlock Day 5 automatically on Continue. Same browser/origin required. Tests use a separate QA save.

## Visual update 0.5

Sky-based environment reflections, rippling canal/reservoir normals, wind-driven leaf cards and hanging laundry, curved instanced clay roof tiles on larger buildings, deep window sills and glazing, dusty entrance aprons, contact shading, gravel shoulders, shrubs, utility lines, market crates, warm exterior lanterns and night-time light pools. Rain reduces road roughness; paved surfaces now sit above crossing dirt tracks to remove overlap patches.

Low quality omits the extra tile, gravel and shrub instances. These are decorative changes: mission targets, vehicle routes, collision boundaries and save format are retained. Visuals remain stylized; this is not photorealistic rendering or a new character asset pack.

### v0.5 visual preview assets

Adds an imported textured hoodie/backpack player with walk/run clips, a detailed yellow bus, and instanced broadleaf trees. Asset credits: [reference asset credits](public/assets/reference/CREDITS.md). Browser visual QA is pending; hero seated/jump/crouch clips are retargeted; wardrobe changes recolor the hoodie rather than replace clothing geometry.
