import * as T from 'three';
import {box,material,sign} from './world.js';
import {newLocations} from './chapters.js';
export const districtRoads=[
 {x:15,z:-160,w:590,d:8,paved:true},{x:-280,z:-72,w:8,d:176,paved:true},
 {x:310,z:-72,w:8,d:176,paved:true},{x:250,z:128,w:8,d:224,paved:true},
 {x:-5,z:240,w:510,d:8,paved:true}
];
export function extendDistrict(w){
 const scene=w.scene;
 for(const [x,z,ww,dd,c,name] of [
  [275,-3,16,10,0xd7e5d8,'रामपुर स्वास्थ्य केंद्र · HEALTH CENTRE'],[330,-3,16,10,0xd8bb83,'अनाज मंडी · GRAIN MARKET'],[355,-3,14,10,0xc78267,'रामपुर डाकघर · POST OFFICE'],
  [330,-178,18,14,0x9faeaf,'उत्तरी गोदाम · NORTH DEPOT'],[286,-179,14,12,0xc5ccb0,'सिंचाई विभाग · IRRIGATION'],
  [-255,-181,22,16,0xe0c5a0,'नीम सामुदायिक भवन · SHELTER'],[-285,222,18,12,0xc9b27f,'आम पैकिंग केंद्र · ORCHARD'],[280,222,20,12,0xe9cc96,'गाँव का मंच · COMMUNITY STAGE']
 ])w.house(x,z,ww,dd,c,name);
 // Neighbourhoods are set back from the through roads and their junctions.
 for(let i=0;i<7;i++){if(Math.abs(240+i*22-310)>12)w.house(240+i*22,-48,12,10,[0xb6c7bb,0xddbc92,0xc7a593][i%3]);w.house(-340+i*20,-218,11,9,0xd4c5a0);}
 for(let i=0;i<5;i++)w.house(175+i*24,285,12,10,0xc8bb95);
 for(const [x,z,label] of [[285,-37,'RAMPUR · रामपुर'],[-285,-210,'NEEM · नीम टोला'],[250,275,'RIVERSIDE MELA · नदी मेला']])sign(scene,label,x,5,z,12);
 const stripe=material(0xe2d4ad),rail=material(0x717b75);
 for(let z=28;z<237;z+=10)box(scene,250,.04,z,.1,.015,4,stripe);
 for(let x=-270;x<305;x+=12)box(scene,x,.04,-160,4,.015,.1,stripe);
 // The eastern road bridge gives vehicles a safe crossing over the canal.
 box(scene,250,-.04,78,9.3,.13,15,rail);
 for(const x of [245.2,254.8]){box(scene,x,.8,78,.18,.18,16,rail);w.solid(x,78,.2,16,1.2);for(let z=71;z<=85;z+=2)box(scene,x,.4,z,.18,.8,.18,rail);}
 sign(scene,'EAST ROAD BRIDGE',256,3,69,4);
 for(const p of Object.values(newLocations).filter(p=>p.stop)){
  const x=p.x+5.7,z=p.z;box(scene,x,.55,z,2.7,.15,1.2,w.wood);box(scene,x,2.4,z-.9,.1,4.8,.1,w.dark);sign(scene,'AUTO · ऑटो  ₹15',x,3,z-.8,3.2);
 }
 // Harvest rows, baskets and mango trees make the southern district distinct.
 const green=material(0x56784a),bark=material(0x756044),gold=material(0xe4b34a);
 for(let row=0;row<5;row++)for(let col=0;col<5;col++){
  const x=-339+col*13,z=166+row*13;
  const trunk=new T.Mesh(new T.CylinderGeometry(.2,.35,3,7),bark);trunk.position.set(x,1.5,z);scene.add(trunk);
  const canopy=new T.Mesh(new T.IcosahedronGeometry(3.8,1),green);canopy.position.set(x,4,z);canopy.scale.y=.7;scene.add(canopy);
  for(let k=0;k<4;k++){const fruit=new T.Mesh(new T.SphereGeometry(.18,7,5),gold);fruit.position.set(x+Math.sin(k*2)*2.3,3.6,z+Math.cos(k*2)*2.3);scene.add(fruit);}
 }
 for(const id of ['orchardEast','orchardWest','packing']){const p=newLocations[id];box(scene,p.x,.35,p.z,1.3,.7,1,w.wood);for(let i=0;i<8;i++){const f=new T.Mesh(new T.SphereGeometry(.17,8,6),gold);f.position.set(p.x+(i%4-.5)*.22-.25,.72,p.z+(i>3?.22:-.22));scene.add(f);}}
 // Depot stacks, water tank, mela stalls, bunting and a small ferris wheel.
 for(const [i,c] of [0x476c9c,0x5f8056,0xe6ddc5].entries())for(let k=0;k<3;k++)box(scene,321+i*4,.4+k*.8,-169,2.4,.75,2,material(c));
 box(scene,-305,1,-180,3,2,3,material(0xa8aca0));const tank=new T.Mesh(new T.CylinderGeometry(1.4,1.4,2,16),material(0x688a8e));tank.position.set(-305,3,-180);scene.add(tank);
 sign(scene,'MEETING POINT: RAISED HALL',-305,1.8,-178.4,4);
 for(let i=0;i<6;i++){const x=195+i*14;box(scene,x,.8,210,5,.2,2,w.wood);for(const dx of [-2.5,2.5])box(scene,x+dx,1.7,209,.12,3.4,.12,w.wood);box(scene,x,3.4,209.5,5.8,.12,3,material(i%2?0xb55143:0xd8ad54));}
 sign(scene,'MANGO  →  BOOK  →  LAMP',205,2,226,5);
 w.fairLamps=[];for(let i=0;i<26;i++){const bulb=new T.Mesh(new T.SphereGeometry(.12,6,4),material(0xffd881,{emissive:0xffa735,emissiveIntensity:.1}));bulb.userData.dynamic=true;bulb.position.set(190+i*4,4-Math.sin(i/25*Math.PI),235);scene.add(bulb);w.fairLamps.push(bulb);}
 const wheel=new T.Group();wheel.userData.dynamic=true;wheel.position.set(180,6,265);scene.add(wheel);const rim=new T.Mesh(new T.TorusGeometry(5,.12,6,40),material(0xc69152));wheel.add(rim);for(let i=0;i<8;i++){const spoke=box(wheel,0,0,0,.08,10,.08,w.wood);spoke.rotation.z=i*Math.PI/4;const a=i*Math.PI/4;box(wheel,Math.cos(a)*5,Math.sin(a)*5,0,1,.65,1,material(i%2?0xb65a48:0x6f9c9b));}w.fairWheel=wheel;for(const x of [178,182])box(scene,x,3,265,.3,6,.3,w.wood);
 w.bridgeBarrier=new T.Group();w.bridgeBarrier.userData.dynamic=true;scene.add(w.bridgeBarrier);box(w.bridgeBarrier,-55,.85,73.5,6,.4,.25,material(0xd29a39));for(const x of [-57,-53])box(w.bridgeBarrier,x,.45,73.5,.18,.9,.3,w.wood);sign(w.bridgeBarrier,'CLOSED · ENGINEER INSPECTION',-55,1.5,73.4,5);w.bridgeBarrier.visible=false;
 w.npcSpawns.push(['Sarpanch',5,43,'male'],['Nurse Asha',275,4,'female'],['Mandi trader',330,4,'male'],['Postmaster',355,4,'male'],['Depot keeper',330,-168,'male'],['Engineer Nandu',286,-170,'male'],['Sarpanch Leela',-255,-170,'female'],['Shelter nurse',-249,-170,'female'],['Kesar',-305,200,'male'],['Organiser Meena',280,230,'female'],['Game host',205,228,'male']);
}
export function makeAuto(w){
 const g=new T.Group();g.userData.dynamic=true;g.position.set(19,0,16);g.rotation.y=Math.PI/2;w.scene.add(g);w.auto=g;
 const green=material(0x23684f,{metalness:.2,roughness:.45}),yellow=material(0xe8b946),black=material(0x242c2b),glass=material(0x9ac7ce,{transparent:true,opacity:.38,roughness:.2});
 box(g,0,.55,0,1.65,.25,2.8,green);box(g,0,1.05,-1.15,1.65,.9,.3,green);box(g,0,2.03,-.1,1.8,.14,2.8,yellow);box(g,0,.9,1.15,1.4,.6,.4,green);
 for(const x of [-.79,.79]){box(g,x,1.4,-1.2,.08,1.3,.08,black);box(g,x,1.5,1.1,.08,1.1,.08,yellow);box(g,x,.85,-.25,.12,.5,1.5,green);}
 box(g,0,1.56,1.13,1.48,.8,.04,glass);box(g,0,.86,-.5,1.4,.18,.7,black);box(g,0,1.15,-.82,1.4,.6,.13,black);box(g,0,.9,.65,.65,.18,.55,black);
 const handle=box(g,0,1.3,.87,.65,.05,.06,black);handle.rotation.x=.25;
 for(const x of [-.46,.46])box(g,x,.95,1.38,.25,.18,.05,material(0xfff1c5,{emissive:0xddbd66,emissiveIntensity:.5}));sign(g,'UP 32 · AUTO',0,.58,1.42,1.1);sign(g,'CHANDANPUR',0,1.75,-1.33,1.3).rotation.y=Math.PI;
 w.autoWheels=[];for(const [x,z] of [[0,1.05],[-.85,-.85],[.85,-.85]]){const pivot=new T.Group();pivot.position.set(x,.34,z);g.add(pivot);const tire=new T.Mesh(new T.CylinderGeometry(.32,.32,.19,20),black);tire.rotation.z=Math.PI/2;pivot.add(tire);w.autoWheels.push(pivot);}
}
