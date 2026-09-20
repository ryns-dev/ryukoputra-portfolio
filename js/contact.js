const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const okImg=p=>/^data:image\/(jpeg|webp|png);base64,[A-Za-z0-9+\/=]+$/.test(p||'');
export function initContact(c){

 const f=document.getElementById('cform'),st=document.getElementById('cstat');
 f.addEventListener('submit',async e=>{e.preventDefault();const d=Object.fromEntries(new FormData(f));st.textContent='Mengirim...';
  try{const r=await fetch('https://formsubmit.co/ajax/'+c.email,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({...d,_subject:'Pesan baru dari portfolio'})});
   const j=await r.json();if(!r.ok||j.success==='false')throw 0;f.reset();st.textContent='Terkirim! Terima kasih.'}catch{st.textContent='Gagal mengirim. Coba lagi ya.'}});

 document.getElementById('soc').addEventListener('click',e=>{const a=e.target.closest('a[data-app]');
  if(!a||!a.dataset.app||!/Android|iPhone|iPad/i.test(navigator.userAgent))return;
  e.preventDefault();location.href=a.dataset.app;setTimeout(()=>{if(!document.hidden)window.open(a.href,'_blank','noopener')},900)});

 const K='pf_comments',list=document.getElementById('clist'),cnt=document.getElementById('ccount'),file=document.getElementById('cfile'),hint=document.getElementById('fhint');
 const base=(c.supabaseUrl||'').replace(/\/$/,''),live=!!(base&&c.supabaseKey);
 const H={apikey:c.supabaseKey,'Content-Type':'application/json'};
 if((c.supabaseKey||'').startsWith('eyJ'))H.Authorization='Bearer '+c.supabaseKey;
 let data=[],photo='';
 const ago=t=>{const s=(Date.now()-t)/1e3;return s<60?'baru saja':s<3600?Math.floor(s/60)+'m ago':s<86400?Math.floor(s/3600)+'h ago':Math.floor(s/86400)+'d ago'};
 const say=t=>{hint.textContent=t;setTimeout(()=>hint.textContent='Max file size: 5MB',3500)};
 const show=()=>{cnt.textContent=data.length;list.innerHTML=data.map(m=>`<article class="cm">${okImg(m.p)?`<img src="${m.p}" alt="">`:'<i class="bi bi-person-circle"></i>'}<div><header><b>${esc(m.n)}</b><time>${ago(m.t)}<br>${new Date(m.t).toLocaleString('id-ID',{dateStyle:'medium',timeStyle:'short'})}</time></header><p>${esc(m.c)}</p></div></article>`).join('')};
 (async()=>{
  if(live){try{const r=await fetch(base+'/rest/v1/comments?select=name,message,photo,created_at&order=created_at.desc&limit=100',{headers:H});
   if(!r.ok)throw 0;data=(await r.json()).map(m=>({n:m.name,c:m.message,p:m.photo||'',t:new Date(m.created_at).getTime()}))}catch{say('Komentar gagal dimuat')}}
  else{try{data=JSON.parse(localStorage.getItem(K)||'[]')}catch{}}
  show()})();

 file.addEventListener('change',async()=>{const f=file.files[0];if(!f)return;
  if(f.size>5*1024*1024){say('File terlalu besar (maks 5MB)');file.value='';photo='';return}
  const b=await createImageBitmap(f),k=document.createElement('canvas');k.width=k.height=80;const s=Math.min(b.width,b.height),x=k.getContext('2d');
  x.fillStyle='#222';x.fillRect(0,0,80,80);x.drawImage(b,(b.width-s)/2,(b.height-s)/2,s,s,0,0,80,80);photo=k.toDataURL('image/jpeg',.75);
  document.getElementById('fname').textContent=f.name});

 document.getElementById('cmform').addEventListener('submit',async e=>{e.preventDefault();
  const form=e.target,d=new FormData(form),n=d.get('n').trim(),t=d.get('t').trim(),btn=form.querySelector('button[type=submit]');
  if(Date.now()-(+localStorage.getItem('pf_last')||0)<30000){say('Tunggu sebentar sebelum kirim lagi ya');return}
  btn.disabled=true;
  try{
   if(live){const r=await fetch(base+'/rest/v1/comments',{method:'POST',headers:{...H,Prefer:'return=minimal'},body:JSON.stringify({name:n,message:t,photo:photo||null})});if(!r.ok)throw 0}
   data.unshift({n,c:t,p:photo,t:Date.now()});data=data.slice(0,100);
   if(!live)localStorage.setItem(K,JSON.stringify(data));
   localStorage.setItem('pf_last',Date.now());
   form.reset();photo='';document.getElementById('fname').textContent='Choose Profile Photo';show();
  }catch{say('Gagal mengirim komentar, coba lagi ya')}
  btn.disabled=false});
}
