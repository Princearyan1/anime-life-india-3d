# Assets and licenses

Downloaded and inspected for this build on 2026-11-14. All runtime files are local. Preserve this file with redistributions.

| Asset | Creator | Verified source | License / attribution | Integration and modifications |
|---|---|---|---|---|
| Universal Base Characters, free Standard archive: Superhero Male and Female | Quaternius | https://quaternius.com/packs/universalbasecharacters.html ; actual download page https://quaternius.itch.io/universal-base-characters | CC0 1.0. Attribution not required, provided here. Bundled `public/assets/characters/License_Standard.txt` explicitly states CC0. | Original glTF, binary buffers, eye and normal textures retained. Bodies scaled to game height; body surface texture replaced with opaque vertex-colored clothing regions. Original simple hair geometry added. Adult proportions remain; these are declared stand-ins, not a realistic teenage or elderly model. Two missing `_png` normal-map filename aliases were repaired from the corresponding included PNG files. |
| Universal Animation Library, free Standard, `UAL1_Standard.glb` | Quaternius | https://quaternius.com/packs/universalanimationlibrary.html ; https://quaternius.itch.io/universal-animation-library | CC0 1.0. Attribution not required. Bundled `ANIMATION-LICENSE.txt` inspected. | Local `animations.glb` supplies 43 named skeletal clips. The game uses idle, walk, sprint, jump, crouch, interact, sitting, and talking clips with AnimationMixer crossfades. Clips bind to matching named joints. No bespoke brushing, eating, bathing, rakhi, boarding, or sleeping clips are claimed. |
| Brown Mud Leaves 01, diffuse, OpenGL normal, roughness, 1K JPG | Rob Tuytel / Poly Haven | https://polyhaven.com/a/brown_mud_leaves_01 | CC0 1.0, as stated on the asset page. Attribution not required. https://polyhaven.com/license | Downloaded from Poly Haven's `dl.polyhaven.org/file/ph-assets/Textures/jpg/1k/brown_mud_leaves_01/` file directory; locally tiled on ground with reduced normal strength. |
| Three.js 0.180.0 | Three.js authors | https://github.com/mrdoob/three.js ; npm package `three` | MIT. Preserve copyright and license; included in the static build as `vendor/THREE-LICENSE.txt` and in the installed package. | WebGL2 renderer, GLTFLoader, SkeletonUtils, AnimationMixer. |
| Village buildings, roofs, school, shops, charpai, hand pump, privacy enclosure, bridge, school bus, landscape, foliage, signs, procedural plaster/brick textures | Original project work | `src/world.js` | Original generated project assets; no third-party model dependencies. | Explicit stylized procedural fallbacks, not photorealistic purchased or scanned assets. Instanced vegetation. |
| Story, interface, synthesized sound cue, clothing colors, simple hair mesh | Original project work | `src/` | Original project content. | No third-party music, voice acting, logos, or game content. |

## Asset gaps

The free character archive contains adult superhero-proportion base rigs, not the entire six-body commercial/source pack advertised on the overview page. Only the downloaded Standard files were integrated. No source/pro/paid assets were acquired.

Indian age-specific clothing, elderly morphology, a realistic teenage face, scanned rural houses, charpai, school bus, auto-rickshaw, tractor, and detailed trees have **not** been sourced as production-quality models. Original simplified geometry is used where present; missing vehicles remain unimplemented. The original request's full 15-category asset search and Blender optimization pipeline are not complete.

## Source records

The source character archive's own license and the animation archive's own license are included beside the models. The public model and texture source pages were checked before integration. Models are kept in their supplied glTF/GLB formats; no Blender conversion is claimed. Hair files retained from the Standard pack are licensed identically; the runtime uses its own simple head-attached hair shape.
