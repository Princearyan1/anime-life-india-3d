// The bus follows a swept rectangle; no point-only collision assumptions.
export function busFootprint(heading){return{halfX:Math.abs(Math.cos(heading))*1.5+Math.abs(Math.sin(heading))*3.8,halfZ:Math.abs(Math.sin(heading))*1.5+Math.abs(Math.cos(heading))*3.8};}
export function busHitsBuilding(buildings,x,z,heading){const {halfX,halfZ}=busFootprint(heading);return buildings.some(b=>Math.abs(x-b.x)<halfX+b.w/2+.3&&Math.abs(z-b.z)<halfZ+b.d/2+.3);}
export function travelRoute(from,to){return[{x:from.x,z:from.z},{x:111,z:16},{x:to.x,z:to.z}];}
export const autoStops={autoReservoir:{x:610,z:-160},autoStation:{x:610,z:-440},autoVillage:{x:19,z:16},autoTown:{x:310,z:16},autoDepot:{x:310,z:-160},autoShelter:{x:-280,z:-160},autoFair:{x:250,z:240},autoOrchard:{x:-260,z:240}};
const nodes={...autoStops,west:{x:-280,z:16},east:{x:250,z:16}};
const edges=[['autoDepot','autoReservoir'],['autoReservoir','autoStation'],['west','autoVillage'],['autoVillage','east'],['east','autoTown'],['west','autoShelter'],['autoShelter','autoDepot'],['autoDepot','autoTown'],['east','autoFair'],['autoFair','autoOrchard']];
export function autoRoute(from,to){
 if(!autoStops[from]||!autoStops[to])throw Error('Unknown auto stop');
 const costs={[from]:0},previous={},visited=new Set();
 while(true){const u=Object.keys(costs).filter(k=>!visited.has(k)).sort((a,b)=>costs[a]-costs[b])[0];if(!u)throw Error('Disconnected auto route');if(u===to)break;visited.add(u);for(const [a,b] of edges){const v=a===u?b:b===u?a:null;if(!v)continue;const c=costs[u]+Math.hypot(nodes[u].x-nodes[v].x,nodes[u].z-nodes[v].z);if(c<(costs[v]??Infinity)){costs[v]=c;previous[v]=u;}}}
 const result=[];let u=to;while(u){result.push({...nodes[u]});u=previous[u];}return result.reverse();
}
export function autoHitsBuilding(buildings,x,z,heading){const halfX=Math.abs(Math.cos(heading))*1.05+Math.abs(Math.sin(heading))*1.65,halfZ=Math.abs(Math.sin(heading))*1.05+Math.abs(Math.cos(heading))*1.65;return buildings.some(b=>Math.abs(x-b.x)<halfX+b.w/2+.2&&Math.abs(z-b.z)<halfZ+b.d/2+.2);}
