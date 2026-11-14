// The bus follows a swept rectangle; no point-only collision assumptions.
export function busFootprint(heading){return{halfX:Math.abs(Math.cos(heading))*1.5+Math.abs(Math.sin(heading))*3.8,halfZ:Math.abs(Math.sin(heading))*1.5+Math.abs(Math.cos(heading))*3.8};}
export function busHitsBuilding(buildings,x,z,heading){const {halfX,halfZ}=busFootprint(heading);return buildings.some(b=>Math.abs(x-b.x)<halfX+b.w/2+.3&&Math.abs(z-b.z)<halfZ+b.d/2+.3);}
export function travelRoute(from,to){return[{x:from.x,z:from.z},{x:111,z:16},{x:to.x,z:to.z}];}
