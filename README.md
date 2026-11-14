# Anime Life India 3D — Chandanpur

A local, playable Three.js village story milestone for Windows desktop browsers. This is a stylized development build, **not a finished AAA game**. Day 1 and Day 2 are implemented; Days 3–10 are not.

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

- **W A S D**: move relative to camera; **Shift**: sprint; **Space**: jump; **Ctrl**: crouch.
- Click the world to capture the mouse. Move the mouse to look; **Esc** releases capture and pauses. Right-button drag and arrow keys are camera fallbacks.
- **Mouse wheel**: zoom. Optional shoulder camera is in Settings.
- **E**: interact within four metres of the gold objective; **F**: board the bus when prompted.
- **M**: map; click a destination to place a blue waypoint. **Tab**: journal. **I**: inventory and relationships.
- **Esc**: pause, save, settings, or exit to menu.

Start at the charpai. Follow the gold marker to the washing area, bathing enclosure, Dadi, kitchen, and school bus. Enter the school through its front doorway. The school activity advances the clock to 11:30. Return by bus, eat lunch, ask the clinic nurse for adult help, deliver the sealed kit, buy groceries, hear Dadi's story, and sleep to unlock the festival chapter.

The clock runs at one in-game minute per second by default. Change speed or weather in Settings. Activity transitions are deliberately brief. Dialogue choices require clicking a reply. Bus travel is visible and automatic; passengers are placed just beside the bus after arrival.

## Save system

The game stores a versioned save in browser `localStorage`, with autosaves after interactions and bus arrival. Saves contain day, mission, substep, position, outfit, inventory, money, XP, relationships, decisions, and clock. Continue uses the same browser and origin (hostname + port). Changing the port or clearing browser data creates a separate save. Invalid saves are rejected. Storage failure is shown in the HUD.

Reset Progress and New Game ask for confirmation inside the game. Use the pause menu to save before closing. No cloud sync is provided.

## Architecture

- `src/story.js`: declarative chapters, event-driven mission validation, inventory transactions, save validation.
- `src/world.js`: original village geometry, colliders, instanced foliage, bus, rain, signs and textures.
- `src/characters.js`: licensed glTF rigs, skeletal animation blending, original simplified clothing materials.
- `src/main.js`: input, third-person camera, physics approximation, bus routes, activity transitions, HUD, menus, audio cues and integration.
- `src/qa.js`: optional collision-aware A* traversal for browser integration checks.
- `tests/story.test.js`: progression, gating, purchases, save validation, and day transitions.
- `scripts/`: dependency-free local server and offline static packager.
- `public/assets/`: integrated assets and bundled licenses.

## Browser integration test

Visit `http://127.0.0.1:5173/?qa=1` and click **Run both chapters**. This opt-in runner uses a separate save key. It navigates with the same character controller and collision tests, invokes normal interactions, runs both bus routes and timed activities, selects a dialogue reply, and reports each step. It accelerates simulation by running multiple updates per rendered frame. It does not teleport between walking objectives. Its FPS is **not a performance benchmark**. See `TEST_REPORT.md` for checks actually performed.

## Credits and scope

Read `ASSET_CREDITS.md` for licenses and modifications; `KNOWN_LIMITATIONS.md` records the remaining work. No PUBG/BGMI assets, logos, animations, or proprietary content are included.
