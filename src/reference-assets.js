import * as T from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {KTX2Loader} from 'three/addons/loaders/KTX2Loader.js';
import {MeshoptDecoder} from 'three/addons/libs/meshopt_decoder.module.js';
import {clone} from 'three/addons/utils/SkeletonUtils.js';
const base='./public/assets/reference/';
export async function loadReferenceAssets(renderer,world,characters){
 const transcoder=new KTX2Loader().setTranscoderPath(new URL('../libs/basis/',import.meta.resolve('three/addons/loaders/KTX2Loader.js')).href).detectSupport(renderer);
 const loader=new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).setKTX2Loader(transcoder);
 const [hero,bus,...trees]=await Promise.all(['hoodie.glb','non-step-city-bus0.glb','plane-tree2.glb','strangler-fig2.glb'].map(f=>loader.loadAsync(base+f)));
 const poses=await new T.FileLoader().setResponseType('json').loadAsync(base+'hero-poses.json');hero.poses=poses.map(data=>T.AnimationClip.parse(data));characters.referenceHero=hero;
 world.bus.clear();const model=bus.scene;model.updateMatrixWorld(true);const bounds=new T.Box3().setFromObject(model),size=bounds.getSize(new T.Vector3()),center=bounds.getCenter(new T.Vector3());model.scale.set(2.8/size.x,3.15/size.y,7.4/size.z);model.position.set(-center.x*model.scale.x,-bounds.min.y*model.scale.y,-center.z*model.scale.z);
 model.traverse(m=>{if(!m.isMesh)return;m.castShadow=m.receiveShadow=true;for(const mat of Array.isArray(m.material)?m.material:[m.material]){if(/paint|accent|skirt/.test(mat.name))mat.color.set(/accent|skirt/.test(mat.name)?0x35362d:0xe5ac23);if(mat.transmission)mat.transmission=0;}});world.bus.add(model);world.busDoor=model.getObjectByName('door_front_a')||new T.Group();world.wheels=['wheel_FL','wheel_FR','wheel_RL','wheel_RR'].map(n=>model.getObjectByName(n)).filter(Boolean);
 for(const m of world.oldTrees||[])m.visible=false;
 const spots=world.treeSpots||[],groups=[];
 for(let type=0;type<trees.length;type++){const source=trees[type].scene;source.updateMatrixWorld(true);const b=new T.Box3().setFromObject(source),s=9/(b.max.y-b.min.y);source.traverse(mesh=>{if(!mesh.isMesh)return;const geometry=mesh.geometry.clone().applyMatrix4(mesh.matrixWorld);geometry.translate(0,-b.min.y,0);geometry.scale(s,s,s);const batch=new T.InstancedMesh(geometry,mesh.material,spots.length);batch.castShadow=true;batch.receiveShadow=true;batch.frustumCulled=false;batch.count=0;world.scene.add(batch);groups.push({batch,type});});}
 world.referenceTreeRadius=170;world.setReferenceQuality=level=>{world.referenceTreeRadius=[105,150,195,230][level];for(const {batch} of groups)batch.castShadow=level>1;lastX=Infinity;};
 let lastX=Infinity,lastZ=Infinity;const dummy=new T.Object3D();world.updateReferenceTrees=p=>{if(Math.hypot(p.x-lastX,p.z-lastZ)<15)return;lastX=p.x;lastZ=p.z;for(const {batch,type} of groups){let count=0;for(let i=0;i<spots.length;i++){const [x,z]=spots[i];if(i%2!==type||Math.hypot(x-p.x,z-p.z)>world.referenceTreeRadius)continue;dummy.position.set(x,0,z);dummy.rotation.set(0,i*2.399,0);dummy.scale.setScalar(.75+(i%7)*.08);dummy.updateMatrix();batch.setMatrixAt(count++,dummy.matrix);}batch.count=count;batch.instanceMatrix.needsUpdate=true;}};world.updateReferenceTrees(new T.Vector3());transcoder.dispose();
}
export function createReferenceHero(asset,height,name){
 const root=new T.Group(),body=new T.Group(),model=clone(asset.scene);body.add(model);root.add(body);model.updateMatrixWorld(true);const bounds=new T.Box3().setFromObject(model),scale=height/(bounds.max.y-bounds.min.y);model.scale.multiplyScalar(scale);model.position.y-=bounds.min.y*scale;
 const cloth={value:new T.Color(0x30383c)};model.traverse(m=>{if(m.isMesh){m.castShadow=true;m.frustumCulled=false;m.material=m.material.clone();m.material.onBeforeCompile=shader=>{shader.uniforms.heroCloth=cloth;shader.fragmentShader='uniform vec3 heroCloth;\n'+shader.fragmentShader.replace('#include <map_fragment>','#include <map_fragment>\nfloat fabricMask=smoothstep(0.015,0.09,diffuseColor.g-max(diffuseColor.r,diffuseColor.b)); diffuseColor.rgb=mix(diffuseColor.rgb,heroCloth*max(0.22,dot(diffuseColor.rgb,vec3(0.2126,0.7152,0.0722)))*2.0,fabricMask);');};m.material.customProgramCacheKey=()=> 'hoodie-wardrobe-1';}});
 const mixer=new T.AnimationMixer(model),actions={};
 for(const clip of asset.animations){const c=clip.clone();for(const track of c.tracks){if(track.name.endsWith('.position')&&/Hips|Armature/.test(track.name)){for(let i=0;i<track.values.length;i+=3){track.values[i]=track.values[0];track.values[i+2]=track.values[2];}}}actions[clip.name]=mixer.clipAction(c);}
 // Hold the supported walk's neutral stance instead of the model's bind pose.
 const idle=asset.animations.find(c=>c.name==='walk').clone();idle.name='idle';for(const track of idle.tracks){const width=track.getValueSize();track.times=new Float32Array([0]);track.values=track.values.slice(0,width);}idle.duration=1;actions.idle=mixer.clipAction(idle);
 for(const clip of asset.poses||[])actions[clip.name]=mixer.clipAction(clip);
 let current;const play=(name,speed=1)=>{const key=actions[name]?name:/Sprint|Jog/.test(name)?'run':/Walk/.test(name)?'walk':actions.Idle_Loop?'Idle_Loop':'idle';if(current===key){actions[key].setEffectiveTimeScale(speed);return;}if(current)actions[current].fadeOut(.2);actions[key].reset().setEffectiveTimeScale(speed).fadeIn(.2).play();current=key;};play('Idle_Loop');const bag=new T.Group();return{root,body,mixer,actions,play,bag,name,outfit:style=>cloth.value.set(style==='uniform'?0xc2c8c3:style==='festival'?0xb06b28:0x30383c),update:dt=>mixer.update(dt)};
}
