import * as T from 'three';
import {box,material,sign} from './world.js';
export const frontierRoads=[{x:460,z:-160,w:300,d:8,paved:true},{x:610,z:-300,w:8,d:280,paved:true},{x:592,z:-440,w:170,d:8,paved:true},{x:592,z:-270,w:170,d:5},{x:530,z:-385,w:4,d:240},{x:670,z:-385,w:4,d:240},{x:600,z:-530,w:140,d:4}];
export function extendFrontier(w){
 const scene=w.scene,brick=material(0xa47e5e),cream=material(0xd7d0b4),metal=material(0x667b78,{metalness:.25}),water=material(0x5c9395,{metalness:.35,roughness:.22});
 for(const [x,z,ww,dd,c,label] of [[590,-183,18,12,0xd4cfaf,'SURAJ WATER COOPERATIVE'],[555,-183,16,12,0xbda780,'COOPERATIVE STORES'],[590,-463,19,12,0xc8ac83,'HERITAGE STATION'],[640,-463,18,12,0xc1c7b8,'VILLAGE ARCHIVE'],[535,-463,18,12,0xd9c1a0,'RAILWAY LEARNING CENTRE']])w.house(x,z,ww,dd,c,label);
 // Reservoir is fenced and outside the accessible observation path.
 box(scene,730,-.05,-220,100,.12,140,water);w.solid(730,-220,100,140,2);
 for(const x of [678,782]){box(scene,x,.8,-220,.2,.16,146,metal);for(let z=-292;z<-146;z+=6)box(scene,x,.45,z,.16,.9,.16,metal);}
 for(const z of [-293,-147])box(scene,730,.7,z,104,.18,.2,metal);
 for(let i=0;i<8;i++){box(scene,690+i*12,.02,-220,1,.015,120,material(0x83a5a0,{transparent:true,opacity:.25}));}
 sign(scene,'RESERVOIR LEVEL 80% · VIEWING AREA',640,2.5,-202,6);
 for(const x of [563,576])box(scene,x,.4,-215,1,.8,7,brick);
 sign(scene,'INLET CLEAR · OBSERVATION ONLY',570,2,-212,5);
 for(let i=0;i<3;i++){const tank=new T.Mesh(new T.CylinderGeometry(1.6,1.6,3.2,20),metal);tank.position.set(638+i*4,1.6,-248);scene.add(tank);box(scene,638+i*4,3.3,-248,1.2,.2,1.2,cream);}
 sign(scene,'F-24 / MESH 60 · HIGH PRESSURE',640,2.5,-242,6);
 for(const x of [586,590,594]){box(scene,x,.9,-242,2,.15,2,cream);const wheel=new T.Mesh(new T.TorusGeometry(.35,.045,8,20),material(0xa04e3d));wheel.position.set(x,1.3,-242);wheel.rotation.x=Math.PI/2;scene.add(wheel);}
 sign(scene,'TRAINING MODEL · ISOLATE / REPLACE / REOPEN',590,2,-244,7);
 // Low masonry forces a visible detour during the timed observation trial.
 for(const [x,z,ww,dd] of [[580,-303,2,27],[625,-313,2,27]]){box(scene,x,.6,z,ww,1.2,dd,brick);w.solid(x,z,ww,dd,1.3);}
 for(const [x,z,label] of [[540,-290,'START · 70 SECONDS'],[565,-315,'1 · BANYAN'],[610,-295,'2 · STONE WALL'],[650,-325,'3 · FLAG']]){box(scene,x,.025,z,3,.035,3,material(0xc7b472));sign(scene,label,x,2.3,z-2,4);box(scene,x-2,1.5,z-2,.1,3,.1,metal);}
 // Disused rails remain behind a fence; no active train simulation.
 for(const x of [704,706])box(scene,x,.12,-470,.12,.12,180,metal);
 for(let z=-555;z<-380;z+=2)box(scene,705,.04,z,4,.12,.3,brick);
 for(let z=-554;z<-380;z+=5)box(scene,692,.65,z,.15,1.3,.15,metal);
 box(scene,692,1,-470,.1,.12,180,metal);w.solid(692,-470,.3,180,1.4);
 sign(scene,'CLOSED HERITAGE LINE · BOX 7',660,2,-497,6);
 box(scene,565,3,-500,2.8,6,2.8,cream);const clock=new T.Mesh(new T.CircleGeometry(.9,32),material(0xf0e5ca));clock.position.set(565,5,-498.58);scene.add(clock);box(scene,565,5.25,-498.55,.06,.55,.04,metal);box(scene,565.25,5,-498.53,.5,.06,.04,metal);sign(scene,'RESTORED CLOCK · SHELF 3',565,2,-498.4,4);
 sign(scene,'SCHOOL VISIT 1986 · PREFIX N',535,2,-456,5);
 box(scene,535,.8,-497,4,.2,2,brick);w.signalLamps=[];
 for(let i=0;i<3;i++){const lamp=new T.Mesh(new T.SphereGeometry(.28,12,8),material([0xbd4940,0xd1a44d,0x5f9d6f][i],{emissive:[0xbd4940,0xd1a44d,0x5f9d6f][i],emissiveIntensity:.05}));lamp.position.set(534+i,1.2,-497);lamp.userData.dynamic=true;scene.add(lamp);w.signalLamps.push(lamp);}
 for(let i=0;i<5;i++){box(scene,628+i*6,1.3,-538,4,2.6,.2,cream);sign(scene,i===2?'VILLAGE MEMORIES':'PHOTO · RECORD · STORY',628+i*6,1.7,-537.8,3.5);}
 sign(scene,'NEEM · PLANTED BY SCHOOL PUPILS · 1986',585,1.5,-537,6);
 for(const [x,z] of [[585,-542],[550,-320],[550,-500],[660,-550],[490,-460],[650,-190]]){
  const trunk=new T.Mesh(new T.CylinderGeometry(.18,.35,4,9),brick);trunk.position.set(x,2,z);scene.add(trunk);
  for(let j=0;j<5;j++){const leaves=new T.Mesh(new T.IcosahedronGeometry(2.2,1),material(j%2?0x56794b:0x678753));leaves.position.set(x+Math.sin(j*2)*1.8,4+j%2,z+Math.cos(j*2)*1.5);scene.add(leaves);}
 }
 for(const [x,z] of [[585,-532],[560,-490],[645,-530]]){box(scene,x,.5,z,3,.15,1,w.wood);box(scene,x,1,z-.45,3,.8,.12,w.wood);}
 // Field rows, drainage strips, roadside bollards and varied plaster houses.
 for(let i=0;i<18;i++)box(scene,450+i*4,.04,-240,.8,.1,80,material(i%2?0x7e9053:0x617c49));
 for(let x=330;x<605;x+=18){box(scene,x,.04,-160,5,.02,.12,cream);for(const z of [-165,-155])box(scene,x,.35,z,.16,.7,.16,cream);}
 for(let i=0;i<5;i++)w.house(440+i*24,-115,13,10,[0xc8bba2,0xc2cbb9,0xc6ae95][i%3]);
 for(const [x,z] of [[616,-160],[616,-440]]){box(scene,x,.55,z,2.7,.15,1.2,w.wood);sign(scene,'AUTO · 15 RUPEES',x,2.6,z-1,3.5);}
 w.npcSpawns.push(['Engineer Tara',590,-174,'female'],['Storekeeper Hari',555,-174,'male'],['Coach Dev',540,-290,'male'],['Station keeper Rafiq',590,-454,'male'],['Curator Sana',535,-454,'female']);
}
