export function initDock(RM){
 const dock=document.querySelector('.dock'),pill=dock.querySelector('.pill'),links=[...dock.querySelectorAll('a')];
 const gel=matchMedia('(pointer:coarse)').matches?.3:1;
 const PAD=6,chromium=/Chrome\//.test(navigator.userAgent);
 if(chromium)document.documentElement.classList.add('refract');
 let x=0,v=0,tx=0,sw=100,tw=100,ps=1,pt=1,run=false,down=false,sx=0,moved=false;
 const loop=()=>{v+=(tx-x)*.16-v*.28;x+=v;sw+=(tw-sw)*.2;ps+=(pt-ps)*.2;
  const st=RM?0:Math.min(Math.abs(v)*.018*gel,.4),bw=sw+PAD*2,w=bw*(1+st)*ps;
  pill.style.width=w+'px';
  pill.style.transform=`translate3d(${x-PAD-(w-bw)/2}px,0,0) scaleY(${(1-st*.6)*ps})`;
  if(Math.abs(v)>.01||Math.abs(tx-x)>.1||Math.abs(tw-sw)>.1||Math.abs(pt-ps)>.002)requestAnimationFrame(loop);else run=false};
 const kick=()=>{if(RM){x=tx;sw=tw;v=0}if(!run||RM){run=true;requestAnimationFrame(loop)}};
 const set=i=>{if(i<0)return;links.forEach((a,j)=>a.classList.toggle('on',j===i));tx=links[i].offsetLeft;tw=links[i].offsetWidth;kick()};
 set(0);x=tx;sw=tw;
 const spy=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&!down)set(links.findIndex(a=>a.hash==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
 document.querySelectorAll('main section').forEach(s=>spy.observe(s));
 addEventListener('resize',()=>set(links.findIndex(a=>a.classList.contains('on'))));
 dock.addEventListener('pointerdown',e=>{down=true;moved=false;sx=e.clientX});
 addEventListener('pointermove',e=>{if(!down)return;if(Math.abs(e.clientX-sx)>8&&!moved){moved=true;pt=RM?1:1.1;kick()}if(!moved)return;
  const r=dock.getBoundingClientRect();tx=Math.max(0,Math.min(r.width-sw,e.clientX-r.left-sw/2));kick()});
 addEventListener('pointerup',e=>{if(!down)return;down=false;pt=1;kick();if(!moved)return;
  const r=dock.getBoundingClientRect(),cx=e.clientX-r.left;let bi=0,bd=1e9;
  links.forEach((a,i)=>{const d=Math.abs(a.offsetLeft+a.offsetWidth/2-cx);if(d<bd){bd=d;bi=i}});
  set(bi);document.querySelector(links[bi].hash).scrollIntoView()});
 dock.addEventListener('click',e=>{if(moved){e.preventDefault();moved=false}else set(links.indexOf(e.target.closest('a')))},true);
}
