// Opt-in browser integration harness. Only loaded by ?qa=1.
// Uses the same movement, collision, interaction, activity, bus and save paths as play.
export function findPath(world,start,goal){
 const size=.75,minX=-145,minZ=-95,nx=420,nz=280;
 const cell=(x,z)=>[Math.round((x-minX)/size),Math.round((z-minZ)/size)];
 const pos=(x,z)=>({x:minX+x*size,z:minZ+z*size});
 const [sx,sz]=cell(start.x,start.z),[gx,gz]=cell(goal.x,goal.z),key=(x,z)=>z*nx+x;
 const open=[{x:sx,z:sz,g:0,f:0}],previous=new Map(),scores=new Map([[key(sx,sz),0]]),closed=new Set();let end=null,iterations=0;
 while(open.length&&iterations++<60000){let bi=0;for(let i=1;i<open.length;i++)if(open[i].f<open[bi].f)bi=i;const cur=open.splice(bi,1)[0],k=key(cur.x,cur.z);if(closed.has(k))continue;closed.add(k);const wp=pos(cur.x,cur.z);if(Math.hypot(wp.x-goal.x,wp.z-goal.z)<2.5){end=k;break;}
 for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]]){const x=cur.x+dx,z=cur.z+dz,k2=key(x,z);if(x<0||z<0||x>=nx||z>=nz||closed.has(k2))continue;const p=pos(x,z);if(world.blocked(p.x,p.z)||world.blocked(p.x,wp.z)||world.blocked(wp.x,p.z))continue;const g=cur.g+Math.hypot(dx,dz);if(g>=(scores.get(k2)??Infinity))continue;scores.set(k2,g);previous.set(k2,k);open.push({x,z,g,f:g+Math.hypot(x-gx,z-gz)});}}
 if(end===null)return null;const path=[];while(end!==key(sx,sz)){path.push(pos(end%nx,Math.floor(end/nx)));end=previous.get(end);if(end===undefined)return null;}return path.reverse();
}
