import test from 'node:test';
import assert from 'node:assert/strict';
import {findPath,routeLength,compassDirection} from '../src/navigation.js';
import {busHitsBuilding,travelRoute} from '../src/travel.js';
import {locations} from '../src/story.js';

test('walking directions detour around a wall instead of cutting through it',()=>{
 const world={blocked:(x,z)=>Math.abs(x)<1&&Math.abs(z)<7};
 const start={x:-10,z:0},goal={x:10,z:0},path=findPath(world,start,goal);
 assert.ok(path?.length);assert.ok(path.some(p=>Math.abs(p.z)>=7));
 let last=start;for(const p of path){for(let t=0;t<=1;t+=.1)assert.equal(world.blocked(last.x+(p.x-last.x)*t,last.z+(p.z-last.z)*t),false);last=p;}
 assert.ok(routeLength(start,path)>20);
});
test('canal navigation crosses only at the bridge',()=>{
 const world={blocked:(x,z)=>z>73&&z<83&&Math.abs(x+55)>3};
 const path=findPath(world,{x:0,z:60},{x:0,z:95});assert.ok(path);
 for(const p of path)if(p.z>73&&p.z<83)assert.ok(Math.abs(p.x+55)<=3);
 assert.equal(compassDirection({x:0,z:0},{x:0,z:-1}),'North');
});
test('unreachable enclosed destination does not produce a straight unsafe line',()=>{
 const world={blocked:(x,z)=>Math.abs(x)>25||Math.abs(z)>25||(Math.abs(x)<6&&Math.abs(z)<6&&(Math.abs(x)>4||Math.abs(z)>4))};
 assert.equal(findPath(world,{x:12,z:0},{x:0,z:0}),null);
});
test('bus body detects a building even when its centre is outside',()=>{
 const house=[{x:0,z:0,w:9,d:7}];
 assert.equal(busHitsBuilding(house,7,0,Math.PI/2),true);
 assert.equal(busHitsBuilding(house,0,8,0),false);
});
test('both school bus routes clear all destination buildings including turns',()=>{
 const buildings=['grocery','market','clinic','medical','police','hospital','bua','mausi','didi','grandparents','friend','uncle','panchayat','tea'].map(key=>{const p=locations[key],big=['hospital','panchayat'].includes(key);return{x:p.x,z:p.z-6,w:big?15:9,d:big?9:7};});
 buildings.push({x:0,z:-11,w:18,d:10},{x:115,z:60,w:25,d:12});
 for(const [a,b] of [[locations.bus,locations.schoolbus],[locations.schoolbus,locations.bus]]){
  const points=travelRoute(a,b);
  for(let i=1;i<points.length;i++){const p=points[i-1],q=points[i],heading=Math.atan2(q.x-p.x,q.z-p.z),steps=Math.ceil(Math.hypot(q.x-p.x,q.z-p.z)*5);for(let j=0;j<=steps;j++){const t=j/steps;assert.equal(busHitsBuilding(buildings,p.x+(q.x-p.x)*t,p.z+(q.z-p.z)*t,heading),false);}}
  for(const p of points)for(let angle=0;angle<Math.PI*2;angle+=.05)assert.equal(busHitsBuilding(buildings,p.x,p.z,angle),false);
 }
});
