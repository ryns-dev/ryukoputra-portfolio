import {initSky} from './stars.js';
import {runLoader} from './loader.js';
import {render} from './render.js';
import {initDock} from './nav.js';
import {reveal,typing,counters,spider,gallery,techZoom,tabs} from './effects.js';
import {initContact} from './contact.js';
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
initSky(RM);
const cp=render().catch(e=>{console.error('Gagal render config:',e);return null});
await runLoader(RM);
const c=await cp;
document.body.classList.remove('lock');document.body.classList.add('ready');
const run=f=>{try{f()}catch(e){console.error(e)}};
run(()=>initDock(RM));
run(()=>typing(document.getElementById('typing'),c?.typing||'Junior Developer',RM));
run(reveal);run(counters);run(spider);run(()=>gallery(RM));run(()=>techZoom(RM));run(tabs);
if(c)run(()=>initContact(c));

