export function runLoader(RM){return new Promise(done=>{
 const L=document.getElementById('loader'),cv=document.getElementById('fx'),x=cv.getContext('2d'),bar=document.getElementById('bar'),pc=document.getElementById('pc');
 const W=innerWidth,H=innerHeight,d=Math.min(devicePixelRatio||1,1.5);
 cv.width=W*d;cv.height=H*d;x.scale(d,d);

 // Style khusus loader (otomatis dihapus setelah selesai)
 const css=document.createElement('style');
 css.textContent=`.lt{position:absolute;left:0;right:0;top:44%;transform:translate3d(0,-50%,0);text-align:center;z-index:2;padding:0 12px;will-change:transform,opacity}
.lt.go{transition:transform .8s cubic-bezier(.6,0,.9,.4),opacity .6s ease-in;transform:translate3d(0,-50%,0) scale(2.2);opacity:0}
.lw{font-weight:700;line-height:1.15;white-space:nowrap}
.lw.a{font-size:clamp(1.4rem,6.5vw,2.4rem);color:#e8eeff}
.lw.b{font-size:clamp(1.9rem,9vw,3.8rem);color:#2563eb;text-shadow:0 0 28px rgba(37,99,235,.7)}
.lw span{display:inline-block;opacity:0;transform:translate3d(0,26px,0) scale(.5);animation:li .9s cubic-bezier(.22,1,.36,1) forwards;animation-delay:calc(var(--i)*55ms + 250ms)}
.lw.b span{animation-delay:calc(var(--i)*55ms + 900ms)}
@keyframes li{to{opacity:1;transform:none}}
.lflash{position:absolute;inset:0;z-index:3;background:#fff;opacity:0;pointer-events:none;transition:opacity .35s ease-out}
.lflash.on{opacity:.9}
@media(prefers-reduced-motion:reduce){.lw span{opacity:1!important;transform:none!important}}`;
 document.head.appendChild(css);

 // Teks
 const t=document.createElement('div');t.className='lt';
 const word=(s,c)=>`<div class="lw ${c}">${[...s].map((ch,i)=>`<span style="--i:${i}">${ch===' '?'&nbsp;':ch}</span>`).join('')}</div>`;
 t.innerHTML=word('Welcome To My','a')+word('Portfolio Website','b');
 L.appendChild(t);
 const fl=document.createElement('div');fl.className='lflash';L.appendChild(fl);

 // Bintang
 const N=W<600?220:380,S=[];
 const reset=(s,far)=>{s.x=(Math.random()-.5)*2*W;s.y=(Math.random()-.5)*2*H;s.z=far?W:Math.random()*W+1;s.pz=s.z};
 for(let i=0;i<N;i++){const s={};reset(s);S.push(s)}
 const cx=W/2,cy=H*.44,f=W*.5;

 const dur=RM?900:3600,s0=performance.now();
 let last=s0,fin=0,stop=false,loaded=document.readyState==='complete';
 if(!loaded)addEventListener('load',()=>loaded=true);

 const frame=now=>{
  if(stop)return;
  const dt=Math.min(now-last,50);last=now;
  let p=Math.min((now-s0)/dur,1);if(!loaded)p=Math.min(p,.92);
  let sp=RM?0:(.3+p*p*2.2)*dt;
  if(fin)sp*=1+Math.min((now-fin)/600,1)*5;

  x.clearRect(0,0,W,H);x.strokeStyle='#cfe0ff';x.lineCap='round';
  for(const s of S){
   s.pz=s.z;s.z-=sp;
   if(s.z<1){reset(s,true);continue}
   const a=cx+s.x/s.z*f,b=cy+s.y/s.z*f,c=cx+s.x/s.pz*f,e=cy+s.y/s.pz*f;
   x.globalAlpha=Math.min(1,(1-s.z/W)*1.4+.1);x.lineWidth=(1-s.z/W)*2+.4;
   x.beginPath();x.moveTo(c,e);x.lineTo(a,b);x.stroke();
  }
  x.globalAlpha=1;
  bar.style.transform=`scaleX(${p})`;pc.textContent=Math.round(p*100)+'%';

  if(p>=1&&!fin){
   fin=now;
   setTimeout(()=>{t.classList.add('go');fl.classList.add('on')},RM?0:350);
   setTimeout(()=>{stop=true;L.classList.add('out');done();setTimeout(()=>{L.remove();css.remove()},1300)},RM?300:850);
  }
  requestAnimationFrame(frame);
 };
 requestAnimationFrame(frame);
})}
