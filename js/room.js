// SALA DE BATALHA (sala.html): modo treino, criar/entrar em sala, lobby e partida
$('slots').innerHTML=[0,1,2,3].map(()=>'<div class="slot"><canvas width="130" height="150"></canvas><b>—</b><small></small></div>').join('');
$('lst').value=CFG.stocks;$('lst').onchange=()=>{CFG.stocks=+$('lst').value;save()};
$('lbot').onclick=addBot;$('lgo').onclick=startMatch;$('lex').onclick=()=>location.href='index.html';
const copy=(t,m)=>{navigator.clipboard&&navigator.clipboard.writeText(t);$('lmsg').textContent=m};
$('lcp').onclick=()=>copy(code,'Código copiado!');$('lln').onclick=()=>copy(location.origin+location.pathname+'?sala='+code,'Link copiado! Envie aos amigos.');
function lobbyUI(t){const lob=mode&&G.lobby;$('lobby').hidden=!lob;if(!lob)return;const h=mode=='h';
 $('lcode').textContent=code||'—';$('lbot').hidden=$('lgo').hidden=!h;$('lst').parentNode.hidden=!h;
 if(!$('lmsg').textContent.includes('copiado'))$('lmsg').textContent=h?(G.ps.length<2?'Aguardando amigos... compartilhe o código!':'Tudo pronto! Inicie quando quiser.'):'Aguardando o host iniciar a partida...';
 [...document.querySelectorAll('.slot')].forEach((s,i)=>{const p=G.ps[i],c=s.children[0];
  if(p){put(c,'L'+p.id,p.c,p.sk,1.1,t);s.children[1].textContent=p.name+(p.id==me?' ★':'');s.children[2].textContent=LG[p.c].n+' · '+(i?(p.bot?'BOT':'JOGADOR'):'HOST');s.classList.add('on')}
  else{const x=c.getContext('2d');x.clearRect(0,0,130,150);x.fillStyle='#fff4';x.font='bold 60px system-ui';x.textAlign='center';x.fillText('+',65,90+Math.sin(t/300)*4);s.children[1].textContent='Vaga aberta';s.children[2].textContent='';s.classList.remove('on')}})}
function syncView(t){document.body.classList.toggle('play',!!mode&&!G.lobby);$('conn').hidden=!!mode;lobbyUI(t)}
requestAnimationFrame(function f(t){syncView(t);requestAnimationFrame(f)});
const P=new URLSearchParams(location.search),M=P.get('modo'),S=P.get('sala');
if(S)joinRoom(S);else if(M=='criar')hostRoom();else if(M=='treino')startLocal();else location.href='index.html';
