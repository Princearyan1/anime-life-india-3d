# Current milestone and remaining work

## Implemented

- Local Three.js/WebGL2 game with imported skinned glTF characters and blended skeletal locomotion.
- Third-person movement, sprint/stamina, jump/gravity, crouch, mouse/keyboard camera, camera ray collision and zoom.
- Original stylized village within an 1.8 × 1.8 km boundary. Detailed play area is concentrated around the village, roughly 300 × 230 m. Walk-in buildings, labeled locations, field, forest edge, pond, canal, and bridge.
- Live circular minimap, full map, manual waypoints with collision-aware route lines, direction toggle, compass, distance and location HUD, menus, journal and inventory.
- Day 1's 12 connected missions, with extra substeps for safe adult assistance, kit delivery and groceries.
- Day 2's 16 connected festival missions, gifts, visits, rakhi activity, safety escape, reporting, dinner and sleep.
- Moving road-following school bus for outbound and return trips; boarding interaction and automatic exit.
- Short activity transitions and clock advancement, weather selection with rain, clock-dependent lighting.
- Thirty-three named world NPC representations plus an auto driver; three walkers with simple collision checks and IDLE/WALK/INTERACT/RETURN state labels. Static family/vendor actors provide context dialogues.
- Versioned local saves, autosave, Continue and reset confirmation.
- Optional developer traversal test and mission/save/navigation/vehicle unit tests.

## Not complete / simplified

- **Days 7–10 are not implemented.** No claim of the full ten-day game or production completeness.
- Visual quality is stylized. Original scenery is geometric; it is not PUBG/BGMI fidelity. No ambient occlusion, photorealistic faces, cloth simulation, advanced hair or detailed skin shading.
- Adult base rigs stand in for teenager/elderly roles. Original Indian garment meshes, skin-weight-aware clothing colors and head accessories distinguish roles. Garments are simply skinned rather than cloth-simulated. Backpack follows the spine. Locomotion retargeting preserves limb lengths, but foot sliding and garment clipping can still occur.
- No bespoke brushing, eating, rakhi or bathing animations. Existing interaction/sitting clips and privacy/time-skip screens stand in. No full acted opening, dialogue close-up system, voiced Hindi dialogue, or complete cinematic editor.
- No procedural NPC schedules tied to the clock. Most NPCs remain at interaction locations. Only a small set walks bounded routes. No crowd navmesh or social simulation.
- Physics uses axis-separated collision rectangles and gravity, not Rapier. Character/NPC/vehicle mutual collision and stair stepping are incomplete. Trees and props are not all solid. Small jumps cannot traverse the canal; its boundaries are blocked except at the bridge.
- Bus is an original simplified model; wheel rotation and road travel work. Opening door, window glazing and interior seats are present. No interior camera, continuous steering simulation, driver model, or manual exit control. Auto rides are automatic between eight stands, with a seated driver/passenger. No manual driving, bicycle, motorcycle, tractor or cars.
- School time skip sets the story clock to at least 11:30, rather than always adding exactly three hours to arbitrary player arrival times.
- Suspense is conveyed by dialogue and a run-to-safety objective, not a pursuing mysterious-figure NPC. The runner only requires that sprint has been used during the session; it is not an adversarial chase.
- No region streaming, texture compression, mesh LOD, or spatial partitioning. Foliage is instanced and static scenery is batched by material. GPU-dependent performance needs broader testing.
- Day 3 sets rain and closes the old footbridge until repair. Weather can also be overridden in Settings. No fluid simulation.
- Sound is a brief synthesized interaction cue. No birds, cows, bus engines, music or voice acting is currently included.
- Saves are browser-local and origin-specific. Settings persist only for graphics quality; other settings reset on reload. Saved rides restart at the departure stand; exact mid-road position is not restored.
- Mouse and keyboard required; no mobile touch controls, controller support, remapping or complete accessibility mode.

## Next milestones

1. Replace adult stand-ins with appropriately dressed, age-specific character assets and retarget/polish activity animations.
2. Extend terrain variety and add foliage LOD/streaming beyond the updated PBR surfaces and courtyard detail.
3. Add bus interior camera, boarding/exit character animations, traffic interactions and NPC schedules.
4. Build Days 7-10 beyond the completed monsoon relief and mela chapters.
5. Add cinematic direction, environmental audio, comprehensive input/accessibility options, and broad desktop GPU testing.

Days 3-4 include sixteen multi-step missions and twelve required auto journeys. Relief work and bridge repair use interaction/time-skip sequences. The expanded district is stylized and sparsely populated.

Version 0.4 includes Days 5 and 6. The reservoir repair is carried out through a staff observation/time-skip scene; the valve and signal puzzles are demonstration models, not full physical simulations. Character silhouettes and garment deformation are improved, but remain stylized with occasional cloth clipping. No claim of photorealistic character quality or a completed ten-day game.
