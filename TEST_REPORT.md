# Verification report - district edition 0.3

Verified on Windows / Node.js / Chromium WebGL2, 2026-11-14.

- Unit suite: 18 tests covering all 44 missions, six clue gates, finances, legacy Day 2 save migration, journey checkpoints, actual world geometry, all 30 directed auto routes including turns, dynamic bridge closure and regional walking destinations.
- Browser: the Day 3-4 checkpoint runner completed every new step through collision-aware movement, normal interactions, twelve auto trips and the final ending. The checkpoint generates completed Days 1-2 through the mission engine first.
- Optional auto UI: chose Mango orchards from Chandanpur, fare fell from 410 to 395, reloaded and continued the journey with balance still 395.
- Map: region selector, Rampur post-office destination and marked-route message verified.
- Graphics remain stylized; automated accelerated traversal FPS is not a performance benchmark. No broad GPU/mobile certification.
- Local assets unchanged from version 0.2; all are bundled for offline serving.

## Historical version 0.2 verification

# Verification report — village edition 0.2

Verified on Windows / Node.js / Chromium WebGL2, 2026-11-14.

## Automated checks

- `npm test`: 11 passed, zero failed. Covers all 28 missions, inventory/money/choice gates, day transition, save validation, wall detours, bridge-only canal crossing, unreachable destinations, full bus footprint collision and both road routes including conservative turning clearance.
- The Windows sandbox blocks the child-process form of Node's test runner. `tests/run.js` imports both suites and runs them in-process on Windows and GitHub Actions.
- `npm run build`: passed, creating the static site and local Three.js vendor files.
- Asset audit: 37 bundled files, 55.57 MB, no missing glTF buffer/image references. SHA-256 hashes are in ASSET_MANIFEST.json.

## Browser checks

The opt-in `/?qa=1` runner completed both chapters twice with the revised collision layout, including the final code with both Day 2 sellers. It moves through real controller/collider logic, normal proximity interactions, both bus journeys, purchases, dialogue choices and activities. It uses a separate test save and accelerated simulation. Final result:

```
PASS: all 28 missions / both days completed through collision-aware movement.
```

The completion dialog displayed 700 XP and free exploration. This is an integration traversal, not a claim that every mission was manually played with a physical keyboard.

Direct visual checks:

- Imported characters rendered and animated; the separate development inspector exposed and helped correct shirt skin classification, scalp coverage and sari drape height. Mother/Aarav outfits inspected at full height. Other profiles share this rig, with role-specific garments and accessories.
- Full map opened and accepted a marked location near the school; blue path visibly detoured around village buildings. After closing the map, minimap retained the route and arrowheads; HUD read compass direction and remaining route distance.
- Gold story routes changed as objectives progressed.
- Running gait visibly changed during traversal; retargeting retains target limb lengths. Sprint exhaustion has a recovery threshold to avoid rapid gait toggling.
- Revised asphalt, leaf-card vegetation, courtyard and house details rendered.
- Early PBR texture-copy warnings were corrected by waiting for image data before updating each texture. No newer warnings or errors appeared in the final revised local run; the browser log retained earlier warnings from before the correction.

## Scope and remaining verification

Desktop mouse/keyboard only. Performance depends on GPU, quality settings and viewport. Multiple WebGL tabs and the accelerated test are not representative FPS benchmarks. Broad device testing, complete physical mouse input testing, cloth clipping/foot sliding refinement, mobile controls and future story days remain outside this build. See KNOWN_LIMITATIONS.md.
