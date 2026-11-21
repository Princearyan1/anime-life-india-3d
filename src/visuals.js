import * as T from 'three';
import {box,material} from './world.js';
// Deterministic decorative meshes. No mission positions or road colliders change.
export function enrichVillage(w){
 let seed=1741;const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
 const scene=w.scene;w.visualDetail=[];w.lanterns=[];
 function canvasTexture(draw){const c=document.createElement('canvas');c.width=c.height=256;draw(c.getContext('2d'));const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t;}
 const contact=canvasTexture(c=>{const g=c.createRadialGradient(128,128,30,128,128,128);if(g){g.addColorStop(0,'rgba(18,24,18,.55)');g.addColorStop(.65,'rgba(18,24,18,.25)');g.addColorStop(1,'rgba(18,24,18,0)');}c.fillStyle=g||'#182018';c.fillRect(0,0,256,256);});
 const shadowMat=new T.MeshBasicMaterial({map:contact,transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1});
 const dirt=canvasTexture(c=>{c.fillStyle='#aa9471';c.fillRect(0,0,256,256);for(let i=0;i<6000;i++){c.fillStyle=i%2?'#b5a07e':'#968061';c.fillRect(rand()*256,rand()*256,rand()*3+1,rand()*3+1);}});dirt.wrapS=dirt.wrapT=T.RepeatWrapping;dirt.repeat.set(5,5);
 const dirtMat=material(0xc9b68e,{map:dirt,roughness:1});
 const brick=material(0x9b7055),rim=material(0x7d7666),wood=material(0x68513b),metal=material(0x4c5550,{metalness:.25,roughness:.65});
 const tilePositions=[];
 for(const b of w.buildings){
  // Small apron joins each front veranda to its entrance, without covering roads.
  const apron=new T.Mesh(new T.PlaneGeometry(b.w+2,3.5),dirtMat);apron.rotation.x=-Math.PI/2;apron.position.set(b.x,.012,b.z+b.d/2+1.6);apron.receiveShadow=true;scene.add(apron);
  const shade=new T.Mesh(new T.PlaneGeometry(b.w+5,b.d+6),shadowMat);shade.rotation.x=-Math.PI/2;shade.position.set(b.x,.018,b.z);scene.add(shade);
  for(const side of [-1,1]){
   // Window muntins and deep lower sill give plaster walls actual depth.
   const x=b.x+side*b.w*.3,z=b.z+b.d/2+.32;
   box(scene,x,1.15,z,1.5,.13,.3,rim);for(const dx of [-.35,0,.35])box(scene,x+dx,1.8,z,.035,1.15,.05,wood);
   for(const y of [1.5,1.9,2.3])box(scene,x,y,z,1.17,.035,.05,wood);
  }
  if(b.w>=14){for(const side of [-1,1])for(let u=.4;u<b.w/2;u+=1)for(let z=-b.d/2;z<b.d/2+.2;z+=.42){const x=side*u,y=3.8+(b.w/4-u)*Math.tan(.24)+.13;tilePositions.push([b.x+x,y,b.z+z,-side*.24]);}}
  const lx=b.x+b.w/2-.8,lz=b.z+b.d/2+.45;
  box(scene,lx,2.2,lz,.18,.4,.22,metal);const bulb=new T.Mesh(new T.SphereGeometry(.09,8,6),material(0xffd9a1,{emissive:0xffb05a,emissiveIntensity:0}));bulb.position.set(lx,2.17,lz+.14);bulb.userData.dynamic=true;scene.add(bulb);w.lanterns.push(bulb);
 }
 // Shared instancing keeps thousands of curved clay tiles in one draw call.
 const vertices=[],indices=[];for(let x=0;x<2;x++)for(let i=0;i<=6;i++){const angle=i/6*Math.PI;vertices.push(x-.5,Math.sin(angle)*.075,Math.cos(angle)*.2);}for(let i=0;i<6;i++){indices.push(i,i+1,i+7,i+1,i+8,i+7);}const tileGeo=new T.BufferGeometry();tileGeo.setAttribute('position',new T.Float32BufferAttribute(vertices,3));tileGeo.setIndex(indices);tileGeo.computeVertexNormals();
 const tiles=new T.InstancedMesh(tileGeo,material(0xa77b60,{roughness:.95,side:T.DoubleSide}),tilePositions.length),dummy=new T.Object3D();tilePositions.forEach(([x,y,z,a],i)=>{dummy.position.set(x,y,z);dummy.rotation.set(0,0,a);dummy.scale.setScalar(1);dummy.updateMatrix();tiles.setMatrixAt(i,dummy.matrix);tiles.setColorAt(i,new T.Color().setHSL(.055+rand()*.025,.22+rand()*.12,.43+rand()*.14));});tiles.castShadow=true;tiles.receiveShadow=true;scene.add(tiles);w.visualDetail.push(tiles);
 // Gravel shoulders avoid the asphalt floating directly above leaf litter.
 const stones=[];for(const r of w.roads.filter(r=>r.paved)){const horizontal=r.w>r.d,length=horizontal?r.w:r.d;for(let t=-length/2;t<length/2;t+=3.5)for(const side of [-1,1]){const x=r.x+(horizontal?t:side*(r.w/2+.75)),z=r.z+(horizontal?side*(r.d/2+.75):t);if(w.buildings.some(b=>Math.abs(x-b.x)<b.w/2+1&&Math.abs(z-b.z)<b.d/2+1)||Math.abs(z-78)<12)continue;stones.push([x,z]);}}
 const gravel=new T.InstancedMesh(new T.IcosahedronGeometry(1,0),material(0xa9a18b),stones.length);stones.forEach(([x,z],i)=>{dummy.position.set(x,.035,z);dummy.rotation.set(rand(),rand()*6,rand());dummy.scale.set(.1+rand()*.1,.04+rand()*.06,.12+rand()*.15);dummy.updateMatrix();gravel.setMatrixAt(i,dummy.matrix);});gravel.receiveShadow=true;scene.add(gravel);w.visualDetail.push(gravel);
 // Boundary field beds, reeds and flowering shrubs are clear of all through roads.
 const plants=[];for(let i=0;i<1300;i++){const x=(rand()-.5)*760,z=(rand()-.5)*650;if(w.roads.some(r=>Math.abs(x-r.x)<r.w/2+2&&Math.abs(z-r.z)<r.d/2+2)||w.buildings.some(b=>Math.abs(x-b.x)<b.w/2+3&&Math.abs(z-b.z)<b.d/2+3)||Math.abs(z-78)<8||Math.hypot(x,z)<20)continue;plants.push([x,z]);}
 const shrubs=new T.InstancedMesh(new T.IcosahedronGeometry(1,1),material(0x667f48),plants.length);plants.forEach(([x,z],i)=>{dummy.position.set(x,.18,z);dummy.rotation.set(0,rand()*6,0);dummy.scale.set(.3+rand()*.4,.15+rand()*.3,.3+rand()*.35);dummy.updateMatrix();shrubs.setMatrixAt(i,dummy.matrix);shrubs.setColorAt(i,new T.Color().setHSL(.18+rand()*.08,.2+rand()*.15,.42+rand()*.14));});shrubs.receiveShadow=true;scene.add(shrubs);w.visualDetail.push(shrubs);
 // Utility poles and sagging overhead lines connect the lived-in village street.
 const poleMat=material(0x8b8170),wireMat=new T.LineBasicMaterial({color:0x363b35});
 for(let x=-100;x<=140;x+=60){box(scene,x,3.7,23,.18,7.4,.18,poleMat);box(scene,x,6.8,23,1.8,.12,.12,metal);for(const dx of [-.6,.6]){const insulator=new T.Mesh(new T.CylinderGeometry(.07,.07,.18,8),material(0xc7c5ae));insulator.position.set(x+dx,6.95,23);scene.add(insulator);if(x<140){const points=[];for(let k=0;k<=16;k++)points.push(new T.Vector3(x+dx+k*60/16,6.95-Math.sin(k/16*Math.PI)*.8,23));scene.add(new T.Line(new T.BufferGeometry().setFromPoints(points),wireMat));}}}
 // Clothesline, woven cots, water pots and crates make the courtyard inhabited.
 for(const x of [-10,-3])box(scene,x,2,-12,.08,4,.08,wood);const line=new T.Line(new T.BufferGeometry().setFromPoints([new T.Vector3(-10,3.7,-12),new T.Vector3(-6.5,3.45,-12),new T.Vector3(-3,3.7,-12)]),new T.LineBasicMaterial({color:0x534c3d}));scene.add(line);
 w.hangingCloth=[];for(let i=0;i<4;i++){const cloth=new T.Mesh(new T.PlaneGeometry(.75,1.1,5,8),material([0xb6b6a0,0x9c7361,0x667e84,0xba9e6d][i],{side:T.DoubleSide}));cloth.position.set(-9+i*1.5,2.95,-12);cloth.userData.dynamic=true;cloth.castShadow=true;scene.add(cloth);w.hangingCloth.push(cloth);}
 for(const [x,z] of [[45,8],[62,8],[327,1],[-282,228]]){for(let i=0;i<3;i++){box(scene,x+i*.8,.3,z,.7,.6,.65,wood);for(const h of [.12,.4])box(scene,x+i*.8,h,z+.34,.7,.025,.035,rim);}}
 // Warm pools use transparent planes rather than a large number of GPU lights.
 w.lightPools=[];const glow=canvasTexture(c=>{const g=c.createRadialGradient(128,128,1,128,128,125);if(g){g.addColorStop(0,'rgba(255,204,126,.24)');g.addColorStop(1,'rgba(255,204,126,0)');}c.fillStyle=g||'#ffcc7e';c.fillRect(0,0,256,256);});const glowMat=new T.MeshBasicMaterial({map:glow,transparent:true,depthWrite:false,blending:T.AdditiveBlending});
 for(const lamp of w.lanterns){const pool=new T.Mesh(new T.PlaneGeometry(5,5),glowMat);pool.rotation.x=-Math.PI/2;pool.position.set(lamp.position.x,.045,lamp.position.z+1);pool.userData.dynamic=true;pool.visible=false;scene.add(pool);w.lightPools.push(pool);}
 w.windTime={value:0};
 // Water keeps standard lighting/reflections, with moving surface normals.
 const waterMat=material(0x4d8284,{roughness:.26,metalness:.18});waterMat.onBeforeCompile=shader=>{shader.uniforms.villageTime=w.windTime;shader.vertexShader='varying vec3 villagePosition;\n'+shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvillagePosition=(modelMatrix*vec4(position,1.0)).xyz;');shader.fragmentShader='uniform float villageTime; varying vec3 villagePosition;\n'+shader.fragmentShader.replace('#include <normal_fragment_begin>','#include <normal_fragment_begin>\nnormal=normalize(normal+vec3(sin(villagePosition.x*1.8+villageTime*.7)*.09,0.0,cos(villagePosition.z*2.2+villageTime)*.07));');};waterMat.customProgramCacheKey=()=> 'village-water-1';
 scene.traverse(o=>{if(o.isMesh&&o.material?.color&&[0x477e80,0x5c9395].includes(o.material.color.getHex()))o.material=waterMat;});w.waterMaterial=waterMat;
}
export function updateVisuals(w,dt,rain,hour){
 if(!w.windTime)return;w.windTime.value+=dt;const t=w.windTime.value,night=hour>=18.5||hour<5.5;
 for(let i=0;i<w.hangingCloth.length;i++)w.hangingCloth[i].rotation.x=Math.sin(t*1.1+i)*.12;
 for(const bulb of w.lanterns)bulb.material.emissiveIntensity=night?2.5:0;
 for(const pool of w.lightPools)pool.visible=night;
 w.waterMaterial.roughness=rain?.38:.26;for(const road of w.pavedMaterials||[])road.roughness=rain?.42:.92;
 if(w.leafWind)w.leafWind.value=t;
}
