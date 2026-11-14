import * as T from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {clone} from 'three/addons/utils/SkeletonUtils.js';
import {box,material} from './world.js';
const base='./public/assets/characters/';
export class Characters{
 async load(progress){const l=new GLTFLoader();const files=['Superhero_Male_FullBody.gltf','Superhero_Female_FullBody.gltf','animations.glb'];let n=0;const data=await Promise.all(files.map(f=>l.loadAsync(base+f).then(v=>{progress(++n/3);return v;})));this.models={male:data[0].scene,female:data[1].scene};this.clips=data[2].animations;}
 create(sex='male',color=0x759a8a,height=1.75){const root=new T.Group(),body=clone(this.models[sex]);root.add(body);body.updateMatrixWorld(true);let bounds=new T.Box3().setFromObject(body),size=bounds.getSize(new T.Vector3());const scale=height/size.y;body.scale.multiplyScalar(scale);body.position.y=-bounds.min.y*scale;body.updateMatrixWorld(true);const bodyMeshes=[];body.traverse(m=>{if(!m.isMesh)return;m.castShadow=true;m.frustumCulled=false;if(!m.name.toLowerCase().includes('eye')){m.geometry=m.geometry.clone();m.material=material(0xffffff,{vertexColors:true});bodyMeshes.push(m);}});
 const restMatrices=new Map(bodyMeshes.map(m=>[m,m.matrixWorld.clone()]));let lastOutfit=null;
 const recolor=(outfit)=>{if(lastOutfit===outfit)return;lastOutfit=outfit;for(const m of bodyMeshes){const pos=m.geometry.attributes.position,colors=[];for(let i=0;i<pos.count;i++){const v=new T.Vector3().fromBufferAttribute(pos,i).applyMatrix4(restMatrices.get(m));let c=v.y>height*.83?0x9b6745:v.y<height*.1?0x292e2c:v.y<height*.49?0x293f50:outfit==='uniform'?0xe8e5d8:outfit==='festival'?0xd4953d:color; // Simple opaque clothing color regions; base texture is replaced.
 if(Math.abs(v.x)>height*.32&&v.y<height*.68)c=0x9b6745;const co=new T.Color(c);colors.push(co.r,co.g,co.b);}m.geometry.setAttribute('color',new T.Float32BufferAttribute(colors,3));}};recolor('home');
 // Original simple hairstyle, attached to the head bone so it follows animation.
 const head=body.getObjectByName('Head');if(head){const hair=new T.Mesh(new T.SphereGeometry(.115,12,8),material(sex==='female'?0x24211f:0x30281e));hair.scale.set(1,.65,1.02);hair.position.set(0,.16,-.01);head.add(hair);hair.castShadow=true;}
 const bag=box(root,0,height*.62,-.2,.38,.48,.19,material(0x334b49));bag.visible=false;
 const mixer=new T.AnimationMixer(body);const actions={};for(const clip of this.clips){const tracks=clip.tracks.filter(t=>body.getObjectByName(t.name.split('.')[0]));if(tracks.length)actions[clip.name]=mixer.clipAction(new T.AnimationClip(clip.name,clip.duration,tracks));}let current=null;
 const play=name=>{if(!actions[name])name='Idle_Loop';if(current===name)return;const next=actions[name];if(!next)return;next.reset().play();if(current)next.crossFadeFrom(actions[current],.22,true);current=name;};play('Idle_Loop');return{root,body,mixer,actions,play,bag,outfit:name=>{recolor(name);bag.visible=name==='uniform';},update:dt=>mixer.update(dt)};
 }
}
