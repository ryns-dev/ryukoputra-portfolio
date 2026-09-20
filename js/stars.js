export function initSky(RM){
 const c=document.getElementById('stars'),x=c.getContext('2d');let lw=0;
 const draw=()=>{const d=Math.min(devicePixelRatio||1,2),w=innerWidth,h=innerHeight;if(w===lw)return;lw=w;c.width=w*d;c.height=h*d;x.setTransform(d,0,0,d,0,0);
  const n=Math.round(w*h/5000);x.fillStyle='#fff';
  for(let i=0;i<n;i++){x.globalAlpha=Math.random()*.7+.3;x.beginPath();x.arc(Math.random()*w,Math.random()*h,Math.random()<.08?1.5:Math.random()*.8+.35,0,7);x.fill()}};
 draw();let t;addEventListener('resize',()=>{clearTimeout(t);t=setTimeout(draw,250)});
 if(RM)return;
 const comet=()=>{const e=document.createElement('i');e.className='comet';
  e.style.setProperty('--x',Math.random()*innerWidth*.6-100+'px');e.style.setProperty('--y',Math.random()*innerHeight*.35-40+'px');
  document.body.appendChild(e);e.addEventListener('animationend',()=>e.remove())};
 const burst=()=>{comet();setTimeout(comet,700)};
 setTimeout(burst,2500);setInterval(burst,10000);
}
