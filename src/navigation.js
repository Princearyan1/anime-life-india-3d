// Shared pedestrian navigation for the minimap and opt-in integration tests.
class Heap{
 constructor(){this.a=[];}push(v){let i=this.a.length;this.a.push(v);while(i){const p=(i-1)>>1;if(this.a[p].f<=v.f)break;this.a[i]=this.a[p];i=p;this.a[i]=v;}}
 pop(){const a=this.a,top=a[0],last=a.pop();if(a.length){a[0]=last;let i=0;while(true){let n=i,l=i*2+1,r=l+1;if(l<a.length&&a[l].f<a[n].f)n=l;if(r<a.length&&a[r].f<a[n].f)n=r;if(n===i)break;[a[n],a[i]]=[a[i],a[n]];i=n;}}return top;}get length(){return this.a.length;}
}
export function findPath(world,start,goal){
 const size=.75,min=-399,n=1065,cell=v=>Math.round((v-min)/size),pos=(x,z)=>({x:min+x*size,z:min+z*size}),key=(x,z)=>z*n+x;
 const sx=cell(start.x),sz=cell(start.z),gx=cell(goal.x),gz=cell(goal.z);if([sx,sz,gx,gz].some(v=>v<0||v>=n))return null;
 const open=new Heap(),previous=new Map(),scores=new Map([[key(sx,sz),0]]),closed=new Set();open.push({x:sx,z:sz,g:0,f:0});let end=null,iterations=0;
 while(open.length&&iterations++<70000){const cur=open.pop(),k=key(cur.x,cur.z);if(closed.has(k))continue;closed.add(k);const wp=pos(cur.x,cur.z);if(Math.hypot(wp.x-goal.x,wp.z-goal.z)<2.4){end=k;break;}
  for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]]){const x=cur.x+dx,z=cur.z+dz,k2=key(x,z);if(x<0||z<0||x>=n||z>=n||closed.has(k2))continue;const p=pos(x,z);if(world.blocked(p.x,p.z)||world.blocked(p.x,wp.z)||world.blocked(wp.x,p.z))continue;const road=world.roads?.some(r=>Math.abs(p.x-r.x)<r.w/2&&Math.abs(p.z-r.z)<r.d/2),g=cur.g+Math.hypot(dx,dz)*(road?.82:1);if(g>=(scores.get(k2)??Infinity))continue;scores.set(k2,g);previous.set(k2,k);open.push({x,z,g,f:g+Math.hypot(x-gx,z-gz)*.8});}
 }
 if(end===null)return null;const path=[];while(end!==key(sx,sz)){path.push(pos(end%n,Math.floor(end/n)));end=previous.get(end);if(end===undefined)return null;}return path.reverse();
}
export function routeLength(origin,path){let last=origin,total=0;for(const p of path||[]){total+=Math.hypot(p.x-last.x,p.z-last.z);last=p;}return total;}
export function compassDirection(origin,next){if(!next)return'Arrived';const angle=(Math.atan2(next.x-origin.x,-(next.z-origin.z))*180/Math.PI+360)%360;return['North','North-east','East','South-east','South','South-west','West','North-west'][Math.round(angle/45)%8];}
