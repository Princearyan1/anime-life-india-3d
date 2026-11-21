import {createReferenceHero} from './reference-assets.js';
import * as T from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {clone} from 'three/addons/utils/SkeletonUtils.js';
import {material} from './world.js';
const base='./public/assets/characters/';
const profiles={
 'Engineer Tara':{skin:0xa27350,shirt:0x72919d,trim:0xe0c8a3,salwar:true,braid:true},'Storekeeper Hari':{skin:0x926344,shirt:0xc1ae88,trim:0x737b5b,moustache:true},'Coach Dev':{skin:0xa77650,shirt:0x6b8c6d,trim:0xd9c69b},'Station keeper Rafiq':{skin:0x9b6849,shirt:0xc6b896,trim:0x5d716a,moustache:true},'Curator Sana':{skin:0xa37654,shirt:0x7c7f9c,trim:0xd3b77b,salwar:true,braid:true},
 'Sarpanch':{skin:0x966744,shirt:0xe6dac0,trim:0x9b704a,kurta:true,moustache:true},
 'Nurse Asha':{skin:0xa87a56,shirt:0xe8e6dc,trim:0x3b938b,sari:true,bun:true},
 'Shelter nurse':{skin:0x996343,shirt:0xe4e1d2,trim:0x43818e,salwar:true,braid:true},
 'Sarpanch Leela':{skin:0xb07e59,shirt:0x426d7a,trim:0xe2bb69,sari:true,bun:true},
 'Organiser Meena':{skin:0x9d694b,shirt:0xcc7255,trim:0xebbd6f,salwar:true,braid:true},
 'Kesar':{skin:0x8e5d3d,shirt:0xd3c4a4,trim:0xb46c39,kurta:true,turban:true,moustache:true},
 'Engineer Nandu':{skin:0xa47755,shirt:0x739baf,trim:0x284252,moustache:true},
 'Postmaster':{skin:0xa5704f,shirt:0xd5bd8d,trim:0x6c7159,moustache:true},
 'Mandi trader':{skin:0x936442,shirt:0xd5a86d,trim:0x635243,kurta:true,moustache:true},
 'Depot keeper':{skin:0xb3825c,shirt:0x68837a,trim:0xd5c59f,moustache:true},
 'Game host':{skin:0xa57453,shirt:0xa6714e,trim:0xdcc083,kurta:true},
 'Iqbal':{skin:0x9d6c49,shirt:0xb5a27d,trim:0x535b4a,moustache:true},
 Aarav:{skin:0xa87450,shirt:0x326a83,trim:0xd8c295,young:true},
 'Sweet seller':{skin:0xa27350,shirt:0xf3dfb0,trim:0xb86631,kurta:true,moustache:true},
 'Tea seller':{skin:0x97623e,shirt:0x99ada0,trim:0x704b33,moustache:true},
 Mother:{skin:0xa16b49,shirt:0xad493d,trim:0xeabf65,sari:true,bun:true},
 Dadi:{skin:0x9c7157,shirt:0xc7c5ac,trim:0x7c7686,sari:true,bun:true,grey:true},
 Father:{skin:0x9c6746,shirt:0xe1d5b7,trim:0x8c6b4c,kurta:true,moustache:true},
 'Gupta ji':{skin:0xa67855,shirt:0xb79962,trim:0xe7d7b2,moustache:true},
 'Nurse Meera':{skin:0xa57253,shirt:0xf2eddd,trim:0x387f7d,sari:true,bun:true},
 Teacher:{skin:0xa77956,shirt:0x365a86,trim:0xd8b65b,sari:true,bun:true},
 Bua:{skin:0x95603f,shirt:0x9e4974,trim:0xe1ae5a,sari:true,bun:true},
 Mausi:{skin:0xb28060,shirt:0x417668,trim:0xe9c277,sari:true,bun:true},
 Didi:{skin:0xac7859,shirt:0xd69345,trim:0x9f354e,salwar:true,braid:true},
 Uncle:{skin:0xa27350,shirt:0xdad9c5,trim:0x627b6e,kurta:true,moustache:true},
 Farmer:{skin:0x885b3e,shirt:0xe6d8b2,trim:0xa54234,kurta:true,moustache:true,turban:true},
 Ramesh:{skin:0xb18462,shirt:0x8b9e8b,trim:0x534b3b,moustache:true},
 Kabir:{skin:0x9e6e4c,shirt:0xe7e7dc,trim:0x274469,young:true},
 Student:{skin:0xac7851,shirt:0xebe6d5,trim:0x2e4870,young:true,braid:true},
 Villager:{skin:0x956648,shirt:0x966b4d,trim:0xc6bc93,moustache:true}
};
function clothTexture(color,trim){const c=document.createElement('canvas');c.width=c.height=128;const ctx=c.getContext('2d');ctx.fillStyle='#'+new T.Color(color).getHexString();ctx.fillRect(0,0,128,128);ctx.fillStyle='#'+new T.Color(trim).getHexString();ctx.fillRect(0,0,128,8);ctx.fillRect(0,120,128,8);for(let y=16;y<118;y+=15)for(let x=6;x<128;x+=16){ctx.beginPath();ctx.moveTo(x,y-2);ctx.lineTo(x+2,y);ctx.lineTo(x,y+2);ctx.lineTo(x-2,y);ctx.fill();}ctx.fillStyle='#ffffff12';for(let x=0;x<128;x+=3)ctx.fillRect(x,0,1,128);const map=new T.CanvasTexture(c);map.colorSpace=T.SRGBColorSpace;return map;}
export class Characters{
 async load(progress){const l=new GLTFLoader();let n=0;const data=await Promise.all(['Superhero_Male_FullBody.gltf','Superhero_Female_FullBody.gltf','animations.glb'].map(f=>l.loadAsync(base+f).then(v=>{progress(++n/3);return v;})));this.models={male:data[0].scene,female:data[1].scene};this.clips=data[2].animations;this.animationRig=data[2].scene;}
 create(sex='male',color=0x759a8a,height=1.75,name='Aarav'){
  if(name==='Aarav'&&this.referenceHero)return createReferenceHero(this.referenceHero,height,name);
  const profile=profiles[name]||{skin:0xa87854,shirt:color,trim:0xd8c795};
  const root=new T.Group(),body=clone(this.models[sex]);root.add(body);body.updateMatrixWorld(true);
  const bounds=new T.Box3().setFromObject(body),baseHeight=bounds.max.y-bounds.min.y,scale=height/baseHeight;
  body.scale.set(scale*(profile.young?.80:.91),scale,scale*.88);body.position.y=-bounds.min.y*scale;body.updateMatrixWorld(true);
  const bodyMeshes=[];let skinMesh=null;body.traverse(m=>{if(!m.isMesh)return;m.castShadow=true;m.frustumCulled=false;if(!m.name.toLowerCase().includes('eye')){m.geometry=m.geometry.clone();m.material=material(0xffffff,{vertexColors:true,roughness:.83});bodyMeshes.push(m);if(m.isSkinnedMesh)skinMesh=m;}});
  let lastOutfit=null;
  const recolor=outfit=>{if(lastOutfit===outfit)return;lastOutfit=outfit;for(const m of bodyMeshes){const pos=m.geometry.attributes.position,indices=m.geometry.attributes.skinIndex,weights=m.geometry.attributes.skinWeight,colors=[];m.geometry.computeBoundingBox();const top=m.geometry.boundingBox.max.y;for(let i=0;i<pos.count;i++){const y=pos.getY(i)/top;let joint='';if(indices&&weights&&m.skeleton){let best=0;for(let k=1;k<4;k++)if(weights.array[i*4+k]>weights.array[i*4+best])best=k;joint=m.skeleton.bones[indices.array[i*4+best]]?.name||'';}const exposed=/^(Head|neck|hand|lowerarm|index|middle|ring|pinky|thumb)/.test(joint);let c=exposed?profile.skin:y<.09?0x242724:y<.55?(profile.kurta||profile.salwar?0xd6c6a4:0x263e59):outfit==='uniform'?0xe7e4d7:outfit==='festival'?0xd28b35:profile.shirt;if(y>.95||(y>.90&&pos.getZ(i)<.015))c=profile.grey?0xb8b6ab:0x231d19;const co=new T.Color(c);colors.push(co.r,co.g,co.b);}m.geometry.setAttribute('color',new T.Float32BufferAttribute(colors,3));}};recolor('home');
  // Garments share the imported skeleton and bind matrices.
  function garment(geometry,mat,bone='pelvis',upper=false){if(!skinMesh)return null;const sk=skinMesh.skeleton,indices=[],weights=[],p=geometry.attributes.position;for(let i=0;i<p.count;i++){const joint=upper&&p.getY(i)>1.12?'spine_02':bone;const index=Math.max(0,sk.bones.findIndex(b=>b.name===joint));const spine=Math.max(0,sk.bones.findIndex(b=>b.name==='spine_02'));const blend=T.MathUtils.smoothstep(p.getY(i),.98,1.4);const leg=Math.max(0,sk.bones.findIndex(b=>b.name===(p.getX(i)>0?'thigh_l':'thigh_r')));const legWeight=bone==='pelvis'?.98*(1-T.MathUtils.smoothstep(p.getY(i),.9,1.12)):0;indices.push(index,spine,leg,0);weights.push((1-blend)*(1-legWeight),blend*(1-legWeight),legWeight,0);}geometry.setAttribute('skinIndex',new T.Uint16BufferAttribute(indices,4));geometry.setAttribute('skinWeight',new T.Float32BufferAttribute(weights,4));const m=new T.SkinnedMesh(geometry,mat);m.bind(sk,skinMesh.bindMatrix);m.castShadow=true;m.frustumCulled=false;skinMesh.parent.add(m);return m;}
  const fitted=points=>{const g=new T.LatheGeometry(points.map(([x,y])=>new T.Vector2(x,y)),32);g.scale(1,1,.62);return g;};
  const shirt=garment(fitted([[.205,1.00],[.215,1.20],[.265,1.40],[.275,1.48],[.205,1.55],[.08,1.61]]),material(profile.shirt,{side:T.DoubleSide}));
  const fabric=material(0xffffff,{map:clothTexture(profile.shirt,profile.trim),side:T.DoubleSide});
  if(profile.sari){garment(fitted([[.29,.15],[.28,.38],[.245,.75],[.205,1.04]]),fabric);const drape=new T.PlaneGeometry(.16,.45,4,8);drape.rotateZ(-.36);drape.translate(.02,1.23,.145);garment(drape,fabric,'spine_02',true);}
  const tunic=profile.kurta||profile.salwar||name==='Aarav'?garment(fitted([[.255,.64],[.23,.84],[.205,1.03],[.215,1.20],[.265,1.40],[.275,1.48],[.205,1.55],[.08,1.61]]),fabric):null;if(tunic&&name==='Aarav'){tunic.visible=false;tunic.material=material(0xffffff,{map:clothTexture(0xd28b35,0xf2d189),side:T.DoubleSide});}
  if(profile.salwar){const dupatta=new T.PlaneGeometry(.18,.65,2,8);dupatta.translate(-.15,1.12,.145);garment(dupatta,material(profile.trim,{side:T.DoubleSide}),'spine_02');}
  const head=body.getObjectByName('Head');const addHead=(geo,mat,x,y,z)=>{const m=new T.Mesh(geo,mat);m.position.set(x,y,z);m.castShadow=true;head?.add(m);return m;};
  const hairMat=material(profile.grey?0xb8b6ab:0x231d19);
  if(profile.bun)addHead(new T.SphereGeometry(.065,14,10),hairMat,0,.13,-.13);
  if(profile.braid)for(let i=0;i<6;i++){const b=addHead(new T.SphereGeometry(.03,10,8),hairMat,.025*Math.sin(i*2),-.035*i,-.115);b.scale.y=1.3;}
  if(profile.sari||profile.salwar){addHead(new T.SphereGeometry(.009,8,6),material(0xb62e27),0,.105,.103);for(const x of [-.115,.115])addHead(new T.TorusGeometry(.014,.003,5,10),material(0xdab76a,{metalness:.65}),x,.04,.015);}
  if(profile.moustache){const m=addHead(new T.CapsuleGeometry(.012,.065,3,8),hairMat,0,.012,.103);m.rotation.z=Math.PI/2;}
  if(profile.turban){const m=addHead(new T.SphereGeometry(.135,18,12),material(profile.trim),0,.19,-.01);m.scale.y=.7;}
  const torso=body.getObjectByName('spine_03'),bag=new T.Group();const bagBody=new T.Mesh(new T.BoxGeometry(.34,.4,.14),material(0x254859));bagBody.position.set(0,.03,-.21);bag.add(bagBody);for(const x of [-.12,.12]){const strap=new T.Mesh(new T.BoxGeometry(.035,.45,.035),material(0x193745));strap.position.set(x,.03,.18);bag.add(strap);}torso?.add(bag);bag.visible=false;
  // Retarget rotation deltas, retaining target limb lengths. Only the pelvis
  // carries source translation (relative to its rest pose) for gait bobbing.
  const mixer=new T.AnimationMixer(body),actions={};
  for(const clip of this.clips){const tracks=[];for(const tr of clip.tracks){const [boneName,property]=tr.name.split('.'),dest=body.getObjectByName(boneName),source=this.animationRig.getObjectByName(boneName);if(!dest||!source)continue;
   if(property==='quaternion'){const values=[],delta=dest.quaternion.clone().multiply(source.quaternion.clone().invert());for(let i=0;i<tr.values.length;i+=4){const q=delta.clone().multiply(new T.Quaternion().fromArray(tr.values,i));values.push(q.x,q.y,q.z,q.w);}tracks.push(new T.QuaternionKeyframeTrack(tr.name,tr.times,values));}
   else if(property==='position'&&boneName==='pelvis'){const values=[];for(let i=0;i<tr.values.length;i+=3)values.push(dest.position.x+(tr.values[i]-source.position.x),dest.position.y+(tr.values[i+1]-source.position.y),dest.position.z+(tr.values[i+2]-source.position.z));tracks.push(new T.VectorKeyframeTrack(tr.name,tr.times,values));}
  }if(tracks.length)actions[clip.name]=mixer.clipAction(new T.AnimationClip(clip.name,clip.duration,tracks));}
  let current=null;const play=(name,speed=1)=>{if(!actions[name])name='Idle_Loop';if(current===name){actions[name]?.setEffectiveTimeScale(speed);return;}const next=actions[name];if(!next)return;if(current)actions[current].fadeOut(.24);next.reset().setEffectiveWeight(1).setEffectiveTimeScale(speed).fadeIn(.24).play();current=name;};play('Idle_Loop');
  return{root,body,mixer,actions,play,bag,name,outfit:outfit=>{recolor(outfit);if(shirt)shirt.material.color.set(outfit==='uniform'?0xe7e4d7:outfit==='festival'?0xd28b35:profile.shirt);bag.visible=outfit==='uniform';if(tunic&&name==='Aarav')tunic.visible=outfit==='festival';},update:dt=>mixer.update(dt)};
 }
}
