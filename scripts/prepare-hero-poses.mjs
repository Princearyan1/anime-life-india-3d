import fs from 'node:fs';
import * as T from 'three';
import {loadRig} from './load-rig.mjs';

const hero=await loadRig('public/assets/reference/hoodie.glb'),source=await loadRig('public/assets/characters/animations.glb');
const names={Hips:'pelvis',Spine:'spine_01',Spine01:'spine_02',Spine02:'spine_03',neck:'neck_01',Head:'Head',LeftShoulder:'clavicle_l',LeftArm:'upperarm_l',LeftForeArm:'lowerarm_l',LeftHand:'hand_l',RightShoulder:'clavicle_r',RightArm:'upperarm_r',RightForeArm:'lowerarm_r',RightHand:'hand_r',LeftUpLeg:'thigh_l',LeftLeg:'calf_l',LeftFoot:'foot_l',LeftToeBase:'ball_l',RightUpLeg:'thigh_r',RightLeg:'calf_r',RightFoot:'foot_r',RightToeBase:'ball_r'};
hero.scene.updateMatrixWorld(true);source.scene.updateMatrixWorld(true);const pairs=[];hero.scene.traverse(b=>{const s=source.scene.getObjectByName(names[b.name]);if(b.isBone&&s)pairs.push({b,s,q:b.getWorldQuaternion(new T.Quaternion()),inverse:s.getWorldQuaternion(new T.Quaternion()).invert(),rest:b.quaternion.clone()});});
const hip=hero.scene.getObjectByName('Hips'),srcHip=source.scene.getObjectByName('pelvis'),hipRest=hip.getWorldPosition(new T.Vector3()),srcRest=srcHip.getWorldPosition(new T.Vector3()),ratio=hipRest.y/srcRest.y;
const result=[];
for(const name of ['Idle_Loop','Idle_Talking_Loop','Sitting_Idle_Loop','Crouch_Idle_Loop','Crouch_Fwd_Loop','Jump_Loop','Interact']){const clip=source.animations.find(c=>c.name===name),mixer=new T.AnimationMixer(source.scene);mixer.clipAction(clip).play();const frames=Math.max(2,Math.ceil(clip.duration*24)),times=[],values=pairs.map(()=>[]),positions=[];
 for(let f=0;f<=frames;f++){const t=f/frames*clip.duration;times.push(t);mixer.setTime(f===frames?clip.duration-.00001:t);source.scene.updateMatrixWorld(true);for(const {b,rest} of pairs)b.quaternion.copy(rest);hero.scene.updateMatrixWorld(true);
  pairs.forEach(({b,s,q,inverse},i)=>{const target=s.getWorldQuaternion(new T.Quaternion()).multiply(inverse).multiply(q);const parent=b.parent.getWorldQuaternion(new T.Quaternion()).invert();b.quaternion.copy(parent.multiply(target)).normalize();b.updateMatrixWorld(true);values[i].push(...b.quaternion.toArray());});
  const pos=hipRest.clone();pos.y+=(srcHip.getWorldPosition(new T.Vector3()).y-srcRest.y)*ratio;hip.parent.worldToLocal(pos);positions.push(...pos.toArray());
 }
 const tracks=pairs.map(({b},i)=>new T.QuaternionKeyframeTrack(b.name+'.quaternion',times,values[i]));tracks.push(new T.VectorKeyframeTrack('Hips.position',times,positions));result.push(T.AnimationClip.toJSON(new T.AnimationClip(name,clip.duration,tracks)));mixer.stopAllAction();mixer.uncacheRoot(source.scene);
}
fs.writeFileSync('public/assets/reference/hero-poses.json',JSON.stringify(result));console.log('Generated',result.length,'retargeted poses; matched bones:',pairs.length);
