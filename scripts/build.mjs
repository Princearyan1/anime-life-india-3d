import {cp,mkdir,readFile,writeFile} from 'node:fs/promises';
await mkdir('dist/vendor',{recursive:true});
for(const name of ['src','public'])await cp(name,'dist/'+name,{recursive:true});
await cp('node_modules/three/build','dist/vendor/build',{recursive:true});
await cp('node_modules/three/examples/jsm','dist/vendor/addons',{recursive:true});
await cp('node_modules/three/LICENSE','dist/vendor/THREE-LICENSE.txt');
await writeFile('dist/index.html',(await readFile('index.html','utf8')).replaceAll('./node_modules/three/build/','./vendor/build/').replaceAll('./node_modules/three/examples/jsm/','./vendor/addons/'));
console.log('Static offline build: dist/index.html (serve over HTTP with Live Server).');
