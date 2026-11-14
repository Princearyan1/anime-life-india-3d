import test from 'node:test';
import assert from 'node:assert/strict';
import * as T from 'three';
import {MissionEngine,days,locations,freshState,SaveManager} from '../src/story.js';
import {autoStops,autoRoute} from '../src/travel.js';
import {findPath} from '../src/navigation.js';
import {VillageWorld} from '../src/world.js';

test('all four chapters finish, puzzles reject wrong choices without side effects, and no story fare bankrupts the player',()=>{
 const e=new MissionEngine();let steps=0,rides=0,puzzles=0;
 while(!e.state.finished){const s=e.step;assert.ok(s);if(s.correct){const before=structuredClone(e.state);assert.equal(e.accept(s.action,locations[s.at],{choice:s.choices.find(c=>c!==s.correct),sprinted:true}).ok,false);assert.deepEqual(e.state,before);puzzles++;}if(s.route==='auto')rides++;const result=e.accept(s.action,locations[s.at],{choice:s.correct||s.choices?.[0],sprinted:true});assert.equal(result.ok,true,JSON.stringify(s));assert.ok(e.state.money>=0);assert.ok(++steps<150);}
 assert.equal(e.state.completed.length,44);assert.equal(e.state.day,3);assert.equal(e.state.xp,1100);assert.equal(e.state.rides,12);assert.equal(rides,12);assert.equal(puzzles,6);assert.equal(e.state.flags.bridgeCleared,true);assert.equal(e.state.flags.fairLights,true);assert.ok(e.state.notes.length>=12);assert.ok(e.state.inventory.includes('Mela ribbon'));
});
test('an old completed Day 2 save upgrades once to Day 3 with progress and money preserved',()=>{
 const e=new MissionEngine();while(e.state.day<2){const s=e.step;e.accept(s.action,locations[s.at],{choice:s.choices?.[0],sprinted:true});}
 const old={...e.state,version:1,day:1,mission:16,step:0,finished:true,money:260};delete old.notes;delete old.flags;delete old.rides;let saved=JSON.stringify(old);globalThis.localStorage={getItem:()=>saved,setItem:(k,v)=>saved=v};
 const migrated=SaveManager.load();assert.equal(migrated.day,2);assert.equal(migrated.finished,false);assert.equal(migrated.mission,0);assert.equal(migrated.money,410);assert.equal(migrated.completed.length,28);assert.equal(migrated.version,2);SaveManager.save(migrated);assert.deepEqual(SaveManager.load(),migrated);
});
test('in-progress old saves retain the exact chapter, inventory and choices',()=>{
 const old={...freshState(),version:1,day:1,mission:7,money:184,inventory:['Rakhi'],decisions:[{choice:'test'}]};globalThis.localStorage={getItem:()=>JSON.stringify(old)};const saved=SaveManager.load();assert.equal(saved.day,1);assert.equal(saved.mission,7);assert.equal(saved.money,184);assert.deepEqual(saved.inventory,['Rakhi']);assert.deepEqual(saved.decisions,old.decisions);
});

// Geometry/collision tests use the production world with a no-op canvas context;
// no WebGL renderer or mocked collision layout is involved.
const ctx=new Proxy({}, {get:()=>()=>{}});globalThis.document={createElement:()=>({width:256,height:256,getContext:()=>ctx})};
const originalLoad=T.TextureLoader.prototype.load;T.TextureLoader.prototype.load=function(){return new T.Texture();};
const world=new VillageWorld(new T.Scene());T.TextureLoader.prototype.load=originalLoad;
test('every auto destination pair stays clear of actual buildings and crosses only the eastern vehicle bridge',()=>{
 for(const from of Object.keys(autoStops))for(const to of Object.keys(autoStops)){if(from===to)continue;const path=autoRoute(from,to);assert.deepEqual(path[0],autoStops[from]);assert.deepEqual(path.at(-1),autoStops[to]);for(let i=1;i<path.length;i++){const a=path[i-1],b=path[i],angle=Math.atan2(b.x-a.x,b.z-a.z),n=Math.ceil(Math.hypot(b.x-a.x,b.z-a.z)*2);for(let j=0;j<=n;j++){const t=j/n,x=a.x+(b.x-a.x)*t,z=a.z+(b.z-a.z)*t;assert.equal(world.vehicleBlocked('auto',x,z,angle),false,`${from} → ${to} at ${x},${z}`);}}for(const p of path)for(let angle=0;angle<Math.PI*2;angle+=.15)assert.equal(world.vehicleBlocked('auto',p.x,p.z,angle),false,`turn ${from} → ${to}`);}
});
test('story bridge closure, reopening and expanded map boundaries affect real navigation',()=>{
 world.applyStory({...freshState(),day:2});assert.equal(world.blocked(-55,78),true);assert.equal(world.blocked(250,78),false);assert.equal(world.blocked(590,0),false);assert.equal(world.blocked(600,0),true);
 world.applyStory({...freshState(),day:2,flags:{bridgeCleared:true}});assert.equal(world.blocked(-55,78),false);
});
test('new mission targets are reachable from their regional auto stop',()=>{
 world.applyStory({...freshState(),day:2});for(const id of [...new Set(days.slice(2).flatMap(d=>d.missions.flatMap(m=>m.steps.map(s=>s.at))))]){if(locations[id].stop)continue;const goal=locations[id],nearest=Object.values(autoStops).sort((a,b)=>Math.hypot(a.x-goal.x,a.z-goal.z)-Math.hypot(b.x-goal.x,b.z-goal.z))[0];assert.ok(findPath(world,nearest,goal),`unreachable ${id}`);}
});

test('journey checkpoints preserve a paid fare across save/load and reject unknown destinations',()=>{
 const state={...freshState(),day:2,mission:2,money:395,rideResume:{from:'autoVillage',to:'autoOrchard',kind:'auto',free:true}};let raw='';globalThis.localStorage={setItem:(k,v)=>raw=v,getItem:()=>raw};SaveManager.save(state);const loaded=SaveManager.load();assert.equal(loaded.money,395);assert.deepEqual(loaded.rideResume,state.rideResume);state.rideResume.to='missing';SaveManager.save(state);assert.equal(SaveManager.load(),null);
});
