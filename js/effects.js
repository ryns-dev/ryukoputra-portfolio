export function reveal(){
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15,rootMargin:'0px 0px -6% 0px'});
 document.querySelectorAll('[data-a]').forEach(el=>{const sib=[...el.parentElement.children].filter(n=>n.dataset.a);
  if(!el.style.getPropertyValue('--d')&&sib.length>1)el.style.setProperty('--d',sib.indexOf(el)*.12+'s');io.observe(el)});
}
export function typing(el,txt,RM){
 if(RM){el.textContent=txt;return}
 let i=0,d=1;const t=()=>{i+=d;el.textContent=txt.slice(0,i);
  if(i===txt.length){d=-1;setTimeout(t,1800)}else if(i===0){d=1;setTimeout(t,500)}else setTimeout(t,d>0?110:55)};
 setTimeout(t,900);
}
export function counters(){
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;io.unobserve(e.target);
  const n=+e.target.dataset.n;let s;const f=t=>{s??=t;const p=Math.min((t-s)/1400,1);e.target.textContent=Math.round(n*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)}),{threshold:.6});
 document.querySelectorAll('[data-n]').forEach(e=>io.observe(e));
}
export function spider(){
 const box=document.getElementById('avatar');let busy=true;
 new IntersectionObserver((es,io)=>{if(es[0].isIntersecting){io.disconnect();setTimeout(()=>{box.classList.remove('spidey');setTimeout(()=>busy=false,1000)},1500)}},{threshold:.5}).observe(box);
 const flash=()=>{if(busy)return;busy=true;box.classList.add('spidey');setTimeout(()=>{box.classList.remove('spidey');setTimeout(()=>busy=false,1000)},1600)};
 box.addEventListener('click',flash);box.addEventListener('wheel',flash,{passive:true});box.addEventListener('touchstart',flash,{passive:true});
}
export function tabs(){
 const bs=[...document.querySelectorAll('.tabs button')];
 bs.forEach(b=>b.addEventListener('click',()=>{bs.forEach(x=>x.classList.toggle('on',x===b));
  document.querySelectorAll('.panel').forEach(p=>{const on=p.id===b.dataset.p;p.hidden=!on;
   if(on){const els=p.querySelectorAll('[data-a]');els.forEach(e=>e.classList.remove('in'));void p.offsetWidth;requestAnimationFrame(()=>els.forEach(e=>e.classList.add('in')))}})}));
}
export function techZoom(RM){
 const g=document.getElementById('techgrid');if(RM)return;let t=0;
 addEventListener('scroll',()=>{if(t)return;t=requestAnimationFrame(()=>{t=0;const r=g.getBoundingClientRect();if(!r.height)return;
  const p=Math.max(0,1-Math.abs((r.top+r.height/2)/innerHeight-.5)*1.4);g.style.transform=`scale(${.96+p*.06})`})},{passive:true});
}
export function gallery(RM){
 const tr=document.getElementById('gal'),cs=[...tr.children];let t=0,down=false,sx=0,sl=0;
 const upd=()=>{t=0;const m=tr.getBoundingClientRect(),cx=m.left+m.width/2;
  cs.forEach(c=>{const r=c.getBoundingClientRect(),d=(r.left+r.width/2-cx)/m.width;
   c.firstElementChild.style.transform=RM?'':`perspective(900px) rotateY(${-d*32}deg) rotateZ(${d*4}deg) scale(${1-Math.min(Math.abs(d),1)*.14})`})};
 tr.addEventListener('scroll',()=>{t||(t=requestAnimationFrame(upd))},{passive:true});upd();
 tr.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')return;down=true;sx=e.clientX;sl=tr.scrollLeft;tr.classList.add('drag');tr.setPointerCapture(e.pointerId)});
 tr.addEventListener('pointermove',e=>{if(down)tr.scrollLeft=sl-(e.clientX-sx)});
 const up=()=>{down=false;tr.classList.remove('drag')};tr.addEventListener('pointerup',up);tr.addEventListener('pointercancel',up);
}

