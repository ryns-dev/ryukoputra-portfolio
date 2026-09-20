export function initDock(RM){
 const dock=document.querySelector('.dock'),pill=dock.querySelector('.pill'),mas=dock.querySelector('.mascot'),links=[...dock.querySelectorAll('a')];
 const gel=matchMedia('(pointer:coarse)').matches?.3:1;
 let x=0,v=0,tx=0,sw=100,tw=100,mx=0,run=false,down=false,sx=0,moved=false;
 const loop=()=>{v+=(tx-x)*.16-v*.28;x+=v;sw+=(tw-sw)*.2;
  const st=RM?0:Math.min(Math.abs(v)*.018*gel,.4);
  pill.style.transform=`translate3d(${x}px,0,0) scale(${sw/100*(1+st)},${1-st*.6})`;
  mx+=(x+sw/2-17-mx)*.25;mas.style.transform=`translate3d(${mx}px,0,0)`;
  if(Math.abs(v)>.01||Math.abs(tx-x)>.1||Math.abs(tw-sw)>.1)requestAnimationFrame(loop);else run=false};
 const kick=()=>{if(RM){x=tx;sw=tw;v=0}if(!run||RM){run=true;requestAnimationFrame(loop)}};
 const set=i=>{if(i<0)return;links.forEach((a,j)=>a.classList.toggle('on',j===i));tx=links[i].offsetLeft;tw=links[i].offsetWidth;kick()};
 set(0);x=tx;sw=tw;mx=x+sw/2-17;
 const spy=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&!down)set(links.findIndex(a=>a.hash==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
 document.querySelectorAll('main section').forEach(s=>spy.observe(s));
 addEventListener('resize',()=>set(links.findIndex(a=>a.classList.contains('on'))));
 dock.addEventListener('pointerdown',e=>{down=true;moved=false;sx=e.clientX});
 addEventListener('pointermove',e=>{if(!down)return;if(Math.abs(e.clientX-sx)>8)moved=true;if(!moved)return;
  const r=dock.getBoundingClientRect();tx=Math.max(0,Math.min(r.width-sw,e.clientX-r.left-sw/2));kick()});
 addEventListener('pointerup',e=>{if(!down)return;down=false;if(!moved)return;
  const r=dock.getBoundingClientRect(),cx=e.clientX-r.left;let bi=0,bd=1e9;
  links.forEach((a,i)=>{const d=Math.abs(a.offsetLeft+a.offsetWidth/2-cx);if(d<bd){bd=d;bi=i}});
  set(bi);document.querySelector(links[bi].hash).scrollIntoView()});
 dock.addEventListener('click',e=>{if(moved){e.preventDefault();moved=false}else set(links.indexOf(e.target.closest('a')))},true);
}
