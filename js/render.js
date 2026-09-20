const A=['left','up','right','rise','zoom','flip'];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export async function render(){
 const c=await (await fetch('data/config.json')).json(),$=id=>document.getElementById(id);
 $('btnProject').href=c.projectsUrl;
 $('spotify').src=`https://open.spotify.com/embed/playlist/${c.spotifyPlaylistId}?utm_source=generator&theme=0`;
 $('edu').innerHTML=c.education.map((e,i)=>`<div class="col-md-6 col-lg-4"><div class="item" data-a="${A[i%A.length]}"><span class="ic"><i class="bi ${esc(e.icon)}"></i></span><div><h4>${esc(e.title)}</h4><p>${esc(e.sub)}</p><b>${esc(e.year)}</b></div></div></div>`).join('');
 $('pj').innerHTML=c.projects.map((p,i)=>`<div class="col-md-6 col-lg-4"><a class="proj glass" data-a="${A[(i+2)%A.length]}" href="${esc(p.url)}" target="_blank" rel="noopener"><i class="t bi ${esc(p.icon)}"></i><h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p><span>Buka GitHub <i class="bi bi-arrow-up-right"></i></span></a></div>`).join('');
 const cols=innerWidth>=992?4:innerWidth>=576?3:2;
 const cw=cols==2?'col-6':cols==3?'col-4':'col-3';
 $('techgrid').innerHTML=c.tech.map((t,i)=>`<div class="${cw}" data-a="cross" style="--d:${((i%cols)+Math.floor(i/cols))*.1}s"><div class="tech glass"><img class="${t.invert?'inv':''}" src="${esc(t.logo)}" alt="" width="60" height="60" loading="lazy"><span>${esc(t.name)}</span></div></div>`).join('');
 $('gal').innerHTML=c.gallery.map((u,i)=>`<div class="slide"><img src="${esc(u)}" alt="Foto ${i+1}" width="440" height="330" loading="lazy" draggable="false"></div>`).join('');
 $('soc').innerHTML=c.socials.map(s=>`<a class="soc" href="${esc(s.web)}" target="_blank" rel="noopener" data-app="${esc(s.app||'')}"><i class="bi ${esc(s.icon)}"></i><div><b>${esc(s.name)}</b><small>${esc(s.handle)}</small></div></a>`).join('');
 return c;
}
