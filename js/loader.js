export function runLoader(RM){return new Promise(async done=>{
 const L=document.getElementById('loader'),cv=document.getElementById('fx'),x=cv.getContext('2d'),bar=document.getElementById('bar'),pc=document.getElementById('pc');
 const W=cv.width=innerWidth,H=cv.height=innerHeight,dur=RM?900:4200,P=[];
 try{await document.fonts.load('700 40px Roboto')}catch{}
 const fs=Math.min(W*.095,72),o=document.createElement('canvas');o.width=W;o.height=H;const g=o.getContext('2d',{willReadFrequently:true});
 g.textAlign='center';g.textBaseline='middle';g.font=`700 ${fs}px Roboto,sans-serif`;
 [['Welcome To My','#e8eeff',H*.5-fs*.6],['Portfolio Website','#2563eb',H*.5+fs*.7]].forEach(([t,c,y])=>{
  g.clearRect(0,0,W,H);g.fillStyle=c;g.fillText(t,W/2,y);const d=g.getImageData(0,0,W,H).data,st=W<600?3:4;
  for(let j=0;j<H;j+=st)for(let i=0;i<W;i+=st)if(d[(j*W+i)*4+3]>128){const a=Math.random()*6.283;P.push({x:i,y:j,c,dx:Math.cos(a),dy:Math.sin(a),r:60+Math.random()*260})}});
 let bolt=[],bt=-999;
 const mk=()=>{const p=[[0,0]];let px=0,y=0;while(y<H){y+=16+Math.random()*24;px+=(Math.random()-.5)*44;p.push([px,y])}return p};
 const drawBolt=t=>{if(t-bt>90){bt=t;bolt=mk()}const sway=W*.5+Math.sin(t/700)*W*.2,fl=.75+Math.random()*.25;x.globalCompositeOperation='lighter';x.lineJoin='round';
  [[26,.05],[11,.13],[4,.5],[1.8,1]].forEach(([w,a])=>{x.beginPath();bolt.forEach(([px,py],i)=>{const sx=px+sway+Math.sin(py/150+t/450)*38;i?x.lineTo(sx,py):x.moveTo(sx,py)});x.lineWidth=w;x.strokeStyle=w<3?`rgba(255,255,255,${a*fl})`:`rgba(110,180,255,${a*fl})`;x.stroke()});x.globalCompositeOperation='source-over'};
 const ease=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
 let loaded=document.readyState==='complete';if(!loaded)addEventListener('load',()=>loaded=true);
 const s0=performance.now();
 const frame=now=>{const el=now-s0;let p=Math.min(el/dur,1);if(!loaded)p=Math.min(p,.92);
  x.clearRect(0,0,W,H);if(!RM)drawBolt(now);
  const t=Math.min(el/(dur*.8),1),z=RM?1:1.5-.5*ease(Math.min(t*1.6,1));
  const sc=RM?0:t<.15?0:t<.45?ease((t-.15)/.3):t<.9?1-ease((t-.45)/.45):0;
  x.globalAlpha=1-.4*sc;
  for(const q of P){x.fillStyle=q.c;x.fillRect(W/2+(q.x-W/2+q.dx*q.r*sc)*z,H/2+(q.y-H/2+q.dy*q.r*sc)*z,2.4,2.4)}
  x.globalAlpha=1;bar.style.transform=`scaleX(${p})`;pc.textContent=Math.round(p*100)+'%';
  if(p<1)requestAnimationFrame(frame);else setTimeout(()=>{L.classList.add('out');done();setTimeout(()=>L.remove(),1300)},400)};
 requestAnimationFrame(frame);
})}
