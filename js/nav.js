export function initDock(RM){
 const dock=document.querySelector('.dock'),pill=dock.querySelector('.pill'),hl=dock.querySelector('.hl'),links=[...dock.querySelectorAll('a')];
 const PAD=16,OFF=8,Z=1.2,gel=matchMedia('(pointer:coarse)').matches?.4:1;
 // pembiasan SVG hanya di Chrome/Edge dengan mouse (berat di HP); zoom teks jalan di semua browser
 if(/Chrome\//.test(navigator.userAgent)&&matchMedia('(pointer:fine)').matches)document.documentElement.classList.add('refract');
 // salinan label untuk efek zoom di dalam lensa
 const zoom=document.createElement('div');zoom.className='zoom';zoom.setAttribute('aria-hidden','true');
 links.forEach(a=>{const c=document.createElement('a');c.textContent=a.textContent;zoom.appendChild(c)});pill.appendChild(zoom);
 let H=dock.offsetHeight,x=0,v=0,tx=0,sw=100,tw=100,ps=0,pt=0,run=false,down=false,sx=0,moved=false,lock=0;
 const loop=()=>{
  v+=(tx-x)*.16-v*.28;x+=v;sw+=(tw-sw)*.2;ps+=(pt-ps)*.22;
  const st=RM?0:Math.min(Math.abs(v)*.012*gel,.12),bw=sw+PAD*2,w=bw*(1+st),lx=x-PAD-(w-bw)/2;
  hl.style.width=sw+'px';hl.style.transform=`translate3d(${x}px,0,0)`;hl.style.opacity=1-ps*.8;
  pill.style.visibility=ps<.02?'hidden':'visible';pill.style.opacity=Math.min(1,ps*1.4);
  pill.style.width=w+'px';pill.style.transform=`translate3d(${lx}px,0,0) scale(${.82+.18*ps})`;
  const cx=w/2,cy=(H+OFF*2)/2,z=1+(Z-1)*ps;
  zoom.style.transform=`translate3d(${cx-z*(lx+cx)}px,${cy+z*(OFF-cy)}px,0) scale(${z})`;
  if(Math.abs(v)>.01||Math.abs(tx-x)>.1||Math.abs(tw-sw)>.1||Math.abs(pt-ps)>.004)requestAnimationFrame(loop);else run=false};
 const kick=()=>{if(RM){x=tx;sw=tw;v=0;ps=pt}if(!run||RM){run=true;requestAnimationFrame(loop)}};
 const go=i=>{tx=links[i].offsetLeft;tw=links[i].offsetWidth};
 const set=i=>{if(i<0)return;links.forEach((a,j)=>a.classList.toggle('on',j===i));H=dock.offsetHeight;go(i);kick()};
 const idxAt=cx=>{const r=dock.getBoundingClientRect(),px=cx-r.left;let bi=0,bd=1e9;
  links.forEach((a,i)=>{const d=Math.abs(a.offsetLeft+a.offsetWidth/2-px);if(d<bd){bd=d;bi=i}});return bi};
 set(0);x=tx;sw=tw;
 const cur=()=>links.findIndex(a=>a.classList.contains('on'));
 const spy=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&!down&&performance.now()>lock)set(links.findIndex(a=>a.hash==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
 document.querySelectorAll('main section').forEach(s=>spy.observe(s));
 addEventListener('resize',()=>set(cur()));
 document.fonts&&document.fonts.ready.then(()=>set(cur()));
 // tekan bar -> lensa muncul di tab yang ditekan
 dock.addEventListener('pointerdown',e=>{if(e.button>0)return;down=true;moved=false;sx=e.clientX;pt=1;go(idxAt(e.clientX));kick()});
 // geser -> lensa mengikuti jari
 addEventListener('pointermove',e=>{if(!down)return;
  if(!moved&&Math.abs(e.clientX-sx)>6)moved=true;if(!moved)return;
  const r=dock.getBoundingClientRect(),i=idxAt(e.clientX),f=links[0].offsetLeft,l=links[links.length-1];
  tw=links[i].offsetWidth;tx=Math.max(f,Math.min(l.offsetLeft+l.offsetWidth-tw,e.clientX-r.left-tw/2));kick()});
 const end=(e,cancel)=>{if(!down)return;down=false;pt=0;
  if(cancel){set(cur());return}
  const bi=idxAt(e.clientX);set(bi);lock=performance.now()+1100;
  if(moved)document.querySelector(links[bi].hash).scrollIntoView()};
 addEventListener('pointerup',e=>end(e,false));
 addEventListener('pointercancel',e=>end(e,true));
 dock.addEventListener('contextmenu',e=>e.preventDefault());
 dock.addEventListener('dragstart',e=>e.preventDefault());
 links.forEach(a=>a.draggable=false);
 dock.addEventListener('click',e=>{lock=performance.now()+1100;if(moved){e.preventDefault();moved=false}else set(links.indexOf(e.target.closest('a')))},true);
}
