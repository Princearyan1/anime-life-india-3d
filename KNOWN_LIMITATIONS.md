# Current milestone and remaining work

## Implemented

- Local Three.js/WebGL2 game with imported skinned glTF characters and blended skeletal locomotion.
- Third-person movement, sprint/stamina, jump/gravity, crouch, mouse/keyboard camera, camera ray collision and zoom.
- Original stylized village within an 800 × 800 m boundary. Detailed play area is concentrated around the village, roughly 300 × 230 m. Walk-in buildings, labeled locations, field, forest edge, pond, canal, and bridge.
- Live circular minimap, full map, manual waypoints, distance and location HUD, menus, journal and inventory.
- Day 1's 12 connected missions, with extra substeps for safe adult assistance, kit delivery and groceries.
- Day 2's 16 connected festival missions, gifts, visits, rakhi activity, safety escape, reporting, dinner and sleep.
- Moving road-following school bus for outbound and return trips; boarding interaction and automatic exit.
- Short activity transitions and clock advancement, weather selection with rain, clock-dependent lighting.
- Fifteen named NPC representations; three walkers with simple collision checks and IDLE/WALK/INTERACT/RETURN state labels. Static family/vendor actors provide context dialogues.
- Versioned local saves, autosave, Continue and reset confirmation.
- Optional developer traversal test and six mission/save unit tests.

## Not complete / simplified

- **Days 3–10 are not implemented.** No claim of the full ten-day game or production completeness.
- Visual quality is stylized. Original scenery is geometric; it is not PUBG/BGMI fidelity. No ambient occlusion, photorealistic faces, cloth simulation, advanced hair or detailed skin shading.
- Adult base rigs stand in for teenager/elderly roles. Simple material regions stand in for tailored garments. Backpack is a simple mesh; it is not fully rigged clothing. Animation retargeting needs polish; foot alignment can vary.
- No bespoke brushing, eating, rakhi or bathing animations. Existing interaction/sitting clips and privacy/time-skip screens stand in. No full acted opening, dialogue close-up system, voiced Hindi dialogue, or complete cinematic editor.
- No procedural NPC schedules tied to the clock. Most NPCs remain at interaction locations. Only a small set walks bounded routes. No crowd navmesh or social simulation.
- Physics uses axis-separated collision rectangles and gravity, not Rapier. Character/NPC/vehicle mutual collision and stair stepping are incomplete. Trees and props are not all solid. Small jumps cannot traverse the canal; its boundaries are blocked except at the bridge.
- Bus is an original simplified model; wheel rotation and road travel work. No opening door animation, interior seats/camera, steering simulation, driver model, or manual exit control. No playable auto-rickshaw, bicycle, motorcycle, tractor, or cars.
- School time skip sets the story clock to at least 11:30, rather than always adding exactly three hours to arbitrary player arrival times.
- Suspense is conveyed by dialogue and a run-to-safety objective, not a pursuing mysterious-figure NPC. The runner only requires that sprint has been used during the session; it is not an adversarial chase.
- No region streaming, texture compression, mesh LOD, or spatial partitioning. Foliage is instanced; other repeated scenery still creates many draw calls. GPU-dependent performance needs broader testing.
- Weather is manually selected, not a forecast or mission-driven storm. No actual rainy Day 3 storyline.
- Sound is a brief synthesized interaction cue. No birds, cows, bus engines, music or voice acting is currently included.
- Saves are browser-local and origin-specific. Settings persist only for graphics quality; other settings reset on reload. No mid-ride resume: reloading returns to the last completed interaction/boarding checkpoint.
- Mouse and keyboard required; no mobile touch controls, controller support, remapping or complete accessibility mode.

## Next milestones

1. Replace adult stand-ins with appropriately dressed, age-specific character assets and retarget/polish activity animations.
2. Improve courtyard/house detail, terrain, PBR surfaces, foliage LOD and draw-call batching.
3. Add a proper bus interior, boarding/exit animation, traffic collision and NPC navigation/schedules.
4. Build and test the rainfall/bridge crisis chapter, then the remaining chapters as distinct activities rather than relabeled errands.
5. Add cinematic direction, environmental audio, comprehensive input/accessibility options, and broad desktop GPU testing.
