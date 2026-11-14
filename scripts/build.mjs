import {cp,mkdir,readFile,writeFile,rm} from 'node:fs/promises';
const output=new URL('../dist/',import.meta.url);
// Only remove the generated dist directory owned by this build script.
if(output.protocol!=='file:'||!output.pathname.endsWith('/dist/'))throw Error('Unexpected output path');
await rm(output,{recursive:true,force:true});
await mkdir('dist/vendor',{recursive:true});
for(const name of ['src','public'])await cp(name,'dist/'+name,{recursive:true});
await cp('node_modules/three/build','dist/vendor/build',{recursive:true});
await cp('node_modules/three/examples/jsm','dist/vendor/addons',{recursive:true});
await cp('node_modules/three/LICENSE','dist/vendor/THREE-LICENSE.txt');
await writeFile('dist/index.html',(await readFile('index.html','utf8')).replaceAll('./node_modules/three/build/','./vendor/build/').replaceAll('./node_modules/three/examples/jsm/','./vendor/addons/'));
console.log('Static offline build: dist/index.html (serve over HTTP with Live Server).');
