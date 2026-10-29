// UI: páginas, seleção de lenda/skin, códex de armas, configurações
const pages=['home','legends','skins','weapons','settings','credits'];
function go(p){pages.forEach(x=>$(x).hidden=x!=p);document.querySelectorAll('nav button').forEach(b=>b.classList.toggle('on',b.dataset.p==p));sum()}
document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>go(b.dataset.p));
const ST={str:'FOR',dex:'DES',def:'DEF',spd:'VEL'};
$('lg').innerHTML=LG.map((l,i)=>`<div class="card" data-i="${i}" style="--c:${l.col}"><b>${l.n}</b><small>${l.r}</small>${Object.keys(ST).map(s=>`<div class="bar" style="--c:${l.col}"><i style="width:${l[s]*10}%"></i><span>${ST[s]} ${l[s]}</span></div>`).join('')}<small>${l.w.map(w=>WP[w].n).join(' + ')}</small></div>`).join('');
$('sk').innerHTML=SK.map((s,i)=>`<button class="sw" data-i="${i}"><span style="background:${s.a||'linear-gradient(90deg,#4cc9f0,#f72585)'}"></span>${s.n}</button>`).join('');
$('wt').innerHTML='<tr><th>Arma</th><th>Leve</th><th>Pesado</th><th>Alcance</th><th>Usada por</th></tr>'+WP.map((w,i)=>`<tr><td style="color:${w.k}">${w.n}</td><td>${w.L[3]} dano</td><td>${w.H[3]} dano</td><td>${w.H[6]}</td><td>${LG.filter(l=>l.w.includes(i)).map(l=>l.n).join(', ')}</td></tr>`).join('');
function sel(){document.querySelectorAll('.card').forEach(e=>e.classList.toggle('on',+e.dataset.i==CFG.legend));document.querySelectorAll('.sw').forEach(e=>e.classList.toggle('on',+e.dataset.i==CFG.skin));sum()}
function sum(){$('sm').textContent='Lenda: '+LG[CFG.legend].n+' · Skin: '+SK[CFG.skin].n}
document.querySelectorAll('.card').forEach(e=>e.onclick=()=>{CFG.legend=+e.dataset.i;save();sel()});
document.querySelectorAll('.sw').forEach(e=>e.onclick=()=>{CFG.skin=+e.dataset.i;save();sel()});
[['cfName','name','t'],['cfSt','stocks','n'],['cfSh','shake','c'],['cfPa','parts','c'],['cfSn','snd','c'],['cfVo','vol','n'],['cfFp','fps','c']].forEach(([id,k,t])=>{const e=$(id);t=='c'?e.checked=!!CFG[k]:e.value=CFG[k];e.oninput=()=>{CFG[k]=t=='c'?+e.checked:t=='n'?+e.value:e.value;save()}});
$('bb').onclick=startLocal;$('bh').onclick=hostRoom;$('bj').onclick=()=>joinRoom($('co').value);
// Pré-visualização animada: corre, fica parado e ataca
const PV={f:1,ak:0,at:0,ad:0,g:1,cur:-1,hs:0,dg:0,inv:0,c:0,sk:0};
function pv(t){const ph=(t/1000)%4.5;PV.c=CFG.legend;PV.sk=CFG.skin;PV.cur=LG[PV.c].w[0];PV.ak=0;let vx=0;
 if(ph<1.5)vx=3;else if(ph>3){PV.ak=ph>3.8?2:1;PV.at=Math.floor(((ph-3)%.75)*30)}
 document.querySelectorAll('.pv').forEach(c=>{if(!c.offsetParent)return;const x=c.getContext('2d');x.clearRect(0,0,220,220);x.fillStyle='#fff1';x.fillRect(20,180,180,6);drawChar(x,PV,110,180,vx,0)});
 requestAnimationFrame(pv)}
sel();go('home');requestAnimationFrame(pv);
