import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as T from 'three';
import {loadRig} from '../scripts/load-rig.mjs';
import {createReferenceHero} from '../src/reference-assets.js';
test('detailed hero keeps finite animation transforms, crouches and sits below standing height',async()=>{
 const asset=await loadRig('public/assets/reference/hoodie.glb');asset.poses=JSON.parse(fs.readFileSync('public/assets/reference/hero-poses.json','utf8')).map(json=>T.AnimationClip.parse(json));
 const actor=createReferenceHero(asset,1.65,'Aarav');const hip=actor.root.getObjectByName('Hips'),height=clip=>{actor.play(clip);actor.update(.6);actor.root.updateMatrixWorld(true);return hip.getWorldPosition(new T.Vector3()).y;};
 const standing=height('Idle_Loop');assert.ok(standing>.6&&standing<1.2);assert.ok(height('Sitting_Idle_Loop')<standing-.2);assert.ok(height('Crouch_Idle_Loop')<standing-.2);
 for(const clip of ['Walk_Loop','Sprint_Loop','Jump_Loop','Interact','Idle_Talking_Loop']){height(clip);actor.root.traverse(b=>{assert.ok(b.matrixWorld.elements.every(Number.isFinite));});}
 for(const clip of asset.poses)for(const track of clip.tracks)if(track.name.endsWith('.position'))assert.equal(track.name,'Hips.position','Retargeting must preserve limb lengths');
 const other=createReferenceHero(asset,1.65,'Aarav');actor.outfit('festival');other.outfit('uniform');let materialA,materialB;actor.root.traverse(m=>{if(m.isMesh)materialA=m.material;});other.root.traverse(m=>{if(m.isMesh)materialB=m.material;});assert.notEqual(materialA,materialB);
});
