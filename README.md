# Anime Life India 3D — Chandanpur

[Play in your browser](https://princearyan1.github.io/anime-life-india-3d/) · [GitHub source](https://github.com/Princearyan1/anime-life-india-3d)

Version 0.2 is a playable Three.js village story milestone for Windows desktop browsers. This is a stylized development build, **not a finished AAA game**. Day 1 and Day 2 are implemented; Days 3–10 are not.

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

Visit `http://127.0.0.1:5173/?qa=1` and click **Run both chapters**. This opt-in runner uses a separate save key. It navigates with the same character controller and collision tests, invokes normal interactions, runs both bus routes and timed activities, selects a dialogue reply, and reports each step. It accelerates simulation by running multiple updates per rendered frame. It does not teleport between walking objectives. Its FPS is **not a performance benchmark**. See `TEST_REPORT.md` for checks actually performed.

## Credits and scope

Read `ASSET_CREDITS.md` for licenses and modifications; `KNOWN_LIMITATIONS.md` records the remaining work. No PUBG/BGMI assets, logos, animations, or proprietary content are included.

## Village edition 0.2

Seventeen NPCs including both Day 2 sellers, patterned Indian outfits and accessories, smoother jog/sprint animation, bus body collision and cleared road layout, detailed school bus with seats/windows/opening door, asphalt/plaster/bark PBR textures, leaf-card trees, courtyard gate/rangoli/tulsi and improved house trim. Static scenery is batched by material. Graphics remain stylized.

GitHub Actions runs tests, builds the static site and deploys GitHub Pages on pushes to main. The local character inspector is `tests/characters.html` while the development server runs.
