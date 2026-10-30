// UI: menu principal, telas, lobby, sons de interface e animações
const $$=s=>[...document.querySelectorAll(s)];
const ST={str:'FOR',dex:'DES',def:'DEF',spd:'VEL'};
const MENU=[['⚔','TREINO VS BOT','Configure bots e dificuldade','go:train'],['🌐','SALA ONLINE','Crie ou entre com amigos','go:room'],['🦸','LENDAS','Escolha seu lutador','go:legends'],['🎨','SKINS','Texturas e estilos','go:skins'],['🗡','ARMAS','Códex de armas','go:weapons'],['⚙','CONFIGURAÇÕES','Áudio, vídeo e jogo','go:settings'],['★','CRÉDITOS','Quem fez o jogo','go:credits']];
const TIPS=['A esquiva dá invencibilidade: use no momento certo.','Quanto maior o %, mais longe você voa. Fique na arena!','Armas caem do céu: pegue com E e arremesse para causar dano.','Segure W ao atacar para golpear para cima; S no ar vira spike.','A barra azul é o Ultimate: encha causando dano e aperte I.','A cada 30s vem a tempestade gravitacional: ótima para combos aéreos.'];
const bar=(l,s)=>`<div class="bar" style="--c:${l.col}"><i style="width:${l[s]*10}%"></i><span>${ST[s]} ${l[s]}</span></div>`;
const row=(t,h)=>`<div class="row"><span>${t}</span>${h}</div>`,swc=k=>`<label class="sw2"><input type="checkbox" data-k="${k}"><i></i></label>`,rng=k=>`<input type="range" min="0" max="1" step=".05" data-k="${k}">`;
const back='<button class="back" data-a="go:home">◀ VOLTAR</button>',det='<div class="panel det"><canvas class="pvc" width="260" height="260"></canvas>';
$('menu').innerHTML=MENU.map((m,i)=>`<button class="big${i==1?' go':''}" data-a="${m[3]}" style="animation:in .4s ${i*.06}s both"><i>${m[0]}</i><span><b>${m[1]}</b><small>${m[2]}</small></span></button>`).join('');
$('s-room').innerHTML=back+`<h2>SALA ONLINE</h2><div class="two"><div class="panel"><h3>CRIAR SALA</h3><p>Você vira o host, recebe um código e convida até 3 amigos.</p><button class="big go" id="rc"><i>🌐</i><span><b>CRIAR SALA</b></span></button></div><div class="panel"><h3>ENTRAR EM SALA</h3><p>Digite o código de 5 letras enviado pelo host.</p><input id="co" maxlength="5" placeholder="ABCDE" autocomplete="off"><button class="big" id="rj"><i>🚪</i><span><b>ENTRAR</b></span></button></div></div><p id="ss"></p>`;
$('s-legends').innerHTML=back+`<h2>LENDAS</h2><div class="split"><div id="lt" class="tiles">${LG.map((l,i)=>`<div class="tile" data-l="${i}" style="--c:${l.col}"><canvas width="96" height="110"></canvas><br>${l.n}</div>`).join('')}</div>${det}<h3 id="ln"></h3><small id="lr"></small><div id="lb"></div><div id="lw" class="chips"></div></div></div>`;
$('s-skins').innerHTML=back+`<h2>SKINS</h2><div class="split"><div class="tiles">${SK.map((s,i)=>`<div class="tile" data-s="${i}"><canvas width="96" height="110"></canvas><br>${s.n}</div>`).join('')}</div>${det}<h3 id="sn"></h3><small>Texturas próprias: veja assets/skins/README.md</small></div></div>`;
const pc=(v,m)=>`<div class="bar"><i style="width:${v/m*100}%"></i><span>${v}</span></div>`;
$('s-weapons').innerHTML=back+`<h2>ARMAS</h2><div class="wgrid">${WP.map((w,i)=>`<div class="panel"><canvas data-w="${i}" width="130" height="64"></canvas><h3 style="color:${w.k}">${w.n}</h3><small>Leve</small>${pc(w.L[3],20)}<small>Pesado</small>${pc(w.H[3],20)}<small>Alcance</small>${pc(w.H[6],240)}<small>${LG.filter(l=>l.w.includes(i)).map(l=>l.n).join(', ')}</small></div>`).join('')}</div>`;
$('s-settings').innerHTML=back+`<h2>CONFIGURAÇÕES</h2><div class="two"><div class="panel"><h3>PERFIL E PARTIDA</h3>${row('Nome','<input data-k="name" maxlength="10" placeholder="Seu nome" style="width:150px">')}${row('Vidas (host)','<select data-k="stocks">'+[1,2,3,4,5].map(n=>`<option>${n}</option>`).join('')+'</select>')}</div><div class="panel"><h3>ÁUDIO</h3>${row('Efeitos',swc('snd'))}${row('Volume dos efeitos',rng('vol'))}${row('Música',swc('mus'))}${row('Volume da música',rng('mv'))}</div><div class="panel"><h3>VÍDEO</h3>${row('Tremor de tela',swc('shake'))}${row('Partículas',swc('parts'))}${row('Mostrar FPS',swc('fps'))}</div><div class="panel"><h3>CONTROLES</h3><small>A/D mover · W/Espaço pular (2x) · S descer<br>J leve · K pesado · L esquiva · I ultimate<br>E pegar/arremessar arma · Q trocar arma · Esc sair<br>No celular: botões na tela.</small></div></div>`;
$('s-train').innerHTML=back+`<h2>TREINO VS BOT</h2><div class="two"><div class="panel"><h3>CONFIGURAR LUTA</h3>${row('Bots','<select data-k="bots"><option>1</option><option>2</option><option>3</option></select>')}${row('Dificuldade','<select data-k="diff"><option value="0">Fácil</option><option value="1">Normal</option><option value="2">Difícil</option></select>')}${row('Vidas','<select data-k="stocks">'+[1,2,3,4,5].map(n=>`<option>${n}</option>`).join('')+'</select>')}</div><div class="panel det"><canvas class="pvc" width="260" height="260"></canvas><button class="big go" data-a="bot"><i>⚔</i><span><b>COMEÇAR</b></span></button></div></div>`;
$('s-credits').innerHTML=back+`<div class="panel cr"><h2>RIFT BRAWL</h2><p>Por: <b>Eduardo (@dudx._js)</b></p><small>Projeto de fã inspirado no gênero platform fighter. Personagens, nomes, arte e sons são originais; o jogo não é afiliado ao Brawlhalla, Ubisoft ou Blue Mountain.</small></div>`;
function drawTiles(){$$('[data-l] canvas').forEach((c,i)=>put(c,'tl'+i,i,CFG.skin,.9));$$('[data-s] canvas').forEach((c,i)=>put(c,'ts'+i,CFG.legend,i,.9))}
$$('[data-w]').forEach(c=>{const k=+c.dataset.w,x=c.getContext('2d'),s=Math.min(1.6,70/(WP[k].v+22));x.translate(22,32);x.scale(s,s);x.rotate(-.2);drawWp(x,k)});
function refresh(){const l=LG[CFG.legend];
 $('chip').textContent=(CFG.name||'Jogador')+' · '+l.n+' · '+SK[CFG.skin].n;$('mu').classList.toggle('off',!CFG.mus);
 $('hn').textContent=l.n;$('hr').textContent=l.r+' · '+l.w.map(w=>WP[w].n).join(' + ');$('hb').innerHTML=Object.keys(ST).map(s=>bar(l,s)).join('');$('hb').style.width='100%';
 $('ln').textContent=l.n;$('lr').textContent=l.r;$('lb').innerHTML=Object.keys(ST).map(s=>bar(l,s)).join('');$('lw').innerHTML=l.w.map(w=>`<span>${WP[w].n}</span>`).join('');$('sn').textContent=SK[CFG.skin].n;
 $$('[data-l]').forEach(e=>e.classList.toggle('on',+e.dataset.l==CFG.legend));$$('[data-s]').forEach(e=>e.classList.toggle('on',+e.dataset.s==CFG.skin))}
function go(n){$$('.scr').forEach(e=>e.hidden=e.id!='s-'+n);refresh();drawTiles()}
// ---- interações e sons de UI
document.addEventListener('click',e=>{const b=e.target.closest('button,.tile'); const a=e.target.closest('[data-a]');if(a){const v=a.dataset.a;v=='bot'?location.href='sala.html?modo=treino':go(v.slice(3))}
 const l=e.target.closest('[data-l]'),s=e.target.closest('[data-s]');if(l)CFG.legend=+l.dataset.l;if(s)CFG.skin=+s.dataset.s;if(l||s){save();refresh();drawTiles()}});
$$('[data-k]').forEach(e=>{const k=e.dataset.k,cb=e.type=='checkbox';cb?e.checked=!!CFG[k]:e.value=CFG[k];
 e.oninput=()=>{CFG[k]=cb?+e.checked:e.type=='range'||e.tagName=='SELECT'?+e.value:e.value;save();refresh();if(k=='snd'||k=='vol')AU.sfx('tog')}});
$('mu').onclick=()=>{CFG.mus=+!CFG.mus;save();refresh()};
$('rc').onclick=()=>location.href='sala.html?modo=criar';$('rj').onclick=()=>{const k=$('co').value.trim();k?location.href='sala.html?sala='+encodeURIComponent(k):$('ss').textContent='Digite o código da sala'};
// ---- fundo animado, hero e lobby
const bgc=$('bg'),bx=bgc.getContext('2d'),SHD=[...Array(36)].map((_,i)=>({x:Math.random(),y:Math.random(),v:Math.random()*.0003+.0001,r:Math.random()*16+5,k:i%3}));
function bgdraw(t){if(bgc.width!=innerWidth)bgc.width=innerWidth;if(bgc.height!=innerHeight)bgc.height=innerHeight;const w=bgc.width,h=bgc.height;
 const gr=bx.createRadialGradient(w*.3,h*.2,0,w*.5,h*.5,Math.max(w,h));gr.addColorStop(0,'#1d2b64');gr.addColorStop(1,'#070a18');bx.fillStyle=gr;bx.fillRect(0,0,w,h);
 bx.globalAlpha=.12;bx.fillStyle='#f72585';bx.beginPath();bx.arc(w*(.75+Math.sin(t/4000)*.05),h*.7,h*.35,0,6.3);bx.fill();bx.fillStyle='#4cc9f0';bx.beginPath();bx.arc(w*.2,h*(.35+Math.cos(t/5000)*.05),h*.3,0,6.3);bx.fill();
 bx.globalAlpha=.3;SHD.forEach(s=>{s.y-=s.v*16;if(s.y<-.05)s.y=1.05;bx.save();bx.translate(s.x*w,s.y*h);bx.rotate(t/1500+s.x*9);bx.fillStyle=['#4cc9f0','#f72585','#ffd166'][s.k];bx.fillRect(-s.r/2,-s.r/2,s.r,s.r);bx.restore()});bx.globalAlpha=1}
function uiLoop(t){
 {bgdraw(t);if(!$('s-home').hidden)put($('hero'),'h',CFG.legend,CFG.skin,2.6,t);$$('.pvc').forEach(c=>{if(c.offsetParent)put(c,'p',CFG.legend,CFG.skin,1.8,t)})}
 requestAnimationFrame(uiLoop)}
let tipi=0;const tp=()=>$('tip').textContent='💡 '+TIPS[tipi++%TIPS.length];tp();setInterval(tp,6000);
go('home');requestAnimationFrame(uiLoop);
const q=new URLSearchParams(location.search).get('sala');if(q)location.href='sala.html?sala='+encodeURIComponent(q);
