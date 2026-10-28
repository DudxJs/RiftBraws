const W=1200,H=700,cv=document.getElementById('c'),g=cv.getContext('2d');cv.width=W;cv.height=H;
const $=i=>document.getElementById(i),COLS=['#4cc9f0','#f72585','#ffd166','#06d6a0'];
const ULT=[36,20,25,18,11,.12,0,0];
const plats=t=>ST[G.st|0].p.map(([x,w,y,s,m])=>({x:x+(m?Math.sin(t/80)*m:0),w,y,s,dx:m?Math.cos(t/80)*m/80:0}));
const storm=t=>t%1800>1300; // a cada 30s: tempestade gravitacional de ~8s
let G={t:0,ps:[],win:null,wt:0,st:0,pj:[]},slow=0,PL=plats(0),mode='',me=0,nid=0,conns={},outq=[],parts=[],shake=0,pick=+ls('pick')||0,skin=+ls('skin')||0,stage=0,peer,conn,keys={},code='';

const nm=()=>$('nm').value.trim()||'Jogador'+(1+Math.random()*99|0);
function newP(name,c,bot,sk){return{id:++nid,name,c,bot,sk:sk|0,w:0,lg:null,ls:0,ly:0,lc:0,x:600,y:-60,vx:0,vy:0,f:1,dmg:0,stocks:3,ult:0,ak:0,at:0,ad:0,hit:[],hs:0,dg:0,inv:0,cd:0,dt:0,jumps:2,g:0,rs:30,out:0,pi:0,raw:0,press:0}}

// ---------- ENTRADA ----------
const KM={KeyA:1,ArrowLeft:1,KeyD:2,ArrowRight:2,KeyW:20,ArrowUp:20,Space:16,KeyS:8,ArrowDown:8,KeyJ:32,KeyZ:32,KeyK:64,KeyX:64,KeyL:128,KeyC:128,KeyI:256,KeyQ:512,KeyB:512,KeyV:256};
addEventListener('keydown',e=>{if(KM[e.code]){keys[e.code]=1;if(mode)e.preventDefault()}});
addEventListener('keyup',e=>delete keys[e.code]);addEventListener('blur',()=>keys={});
const getInput=()=>Object.keys(keys).reduce((a,k)=>a|KM[k],0);

// ---------- SIMULAÇÃO (roda no host) ----------
function hb(p){const c=gc(p);if(p.ak==3)return{x:p.x,y:p.y-28,r:170,circ:1};
 const a=p.ak==1?c.L:c.H,r=a[6],s=a[7];let x=p.x+p.f*r*.6,y=p.y-30,w=r,h=s;
 if(p.ad==1){x=p.x;y=p.y-56-r*.45;w=s+20;h=r}else if(p.ad==2){x=p.x;y=p.y+r*.3;w=s+20;h=r}
 return{x,y,w,h}}
let ac;function beep(f,d){try{ac=ac||new AudioContext();const o=ac.createOscillator(),v=ac.createGain();o.type='square';o.frequency.value=f;v.gain.value=.04;o.connect(v);v.connect(ac.destination);o.start();o.stop(ac.currentTime+d)}catch(e){}}
function fx(e){if(mode=='h')outq.push(e);fxh(e)}
function fxh(e){const[k,x,y,m]=e,n=k=='h'?8+(m|0):30;beep(k=='h'?150+m*6:80,k=='h'?.07:.35);shake=Math.max(shake,k=='h'?Math.min(m/2,12):16);
 for(let i=0;i<n;i++){const a=Math.random()*6.28,s=Math.random()*(k=='h'?5:10)+2;parts.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,l:30,c:k=='h'?'#fff':COLS[m%4]})}}
function strike(p,a){const b=hb(p);
 for(const q of G.ps){if(q==p||q.out||q.rs>0||q.inv>0||p.hit.includes(q.id))continue;
  const qx=q.x,qy=q.y-28,ok=b.circ?Math.hypot(qx-b.x,qy-b.y)<b.r+22:Math.abs(qx-b.x)<b.w/2+18&&Math.abs(qy-b.y)<b.h/2+28;
  if(!ok)continue;p.hit.push(q.id);hurt(p,q,a,b)}}
function hurt(p,q,a,b){const qx=q.x,qy=q.y-28;q.dmg+=a[3];
  const m=(a[4]+q.dmg*a[5])/gc(q).wt,dx=b.circ?(Math.sign(q.x-p.x)||p.f):p.f;
  if(p.ad==1&&!b.circ){q.vx=dx*m*.3;q.vy=-m*1.1}
  else if(p.ad==2&&!q.g&&!b.circ){q.vx=dx*m*.3;q.vy=m*.9}
  else{q.vx=dx*m*.95;q.vy=-m*(b.circ?.7:.5)}
  q.hs=Math.min(45,8+m*1.5)|0;q.ak=0;q.dg=0;q.g=0;
  p.ult=Math.min(100,p.ult+a[3]*1.6);q.ult=Math.min(100,q.ult+a[3]);fx(['h',qx,qy,m])}
function spawn(p){p.x=350+Math.random()*500;p.y=-60;p.vx=p.vy=0;p.inv=150;p.jumps=2;p.dmg=0}
function step(p,I,t){const c=gc(p),pd=I&~p.pi;p.pi=I;
 if(p.rs>0){if(--p.rs==0&&!p.out)spawn(p);return}
 if(p.out)return;
 const D=I&8,dir=(I&2?1:0)-(I&1?1:0);
 ['inv','cd','hs','dt','lc'].forEach(k=>p[k]>0&&p[k]--);
 const free=p.hs<=0&&!p.ak&&!p.dg;
 if(p.lg!=null){p.vx=p.vy=0;p.inv=2;p.x=p.lg+p.ls*14;p.y=p.ly+34;p.f=-p.ls;p.jumps=1;
  if(pd&16){p.lg=null;p.lc=25;p.vy=-c.jp;p.g=0}else if(pd&8||(dir==p.ls&&pd&3)){p.lg=null;p.lc=25}
  return}
 if(free&&dir)p.f=dir;
 if(free&&pd&512&&p.cd<=0){p.w^=1;p.cd=15}
 if(free&&p.cd<=0&&pd&128){p.dg=14;p.inv=16;p.cd=60;p.vx=(dir||p.f)*11;p.vy=0}
 else if(free){
  if(pd&96){p.ak=pd&32?1:2;p.at=0;p.ad=I&4?1:(D&&!p.g?2:0);p.hit=[]}
  else if(pd&256&&p.ult>=100){p.ak=3;p.at=0;p.ad=0;p.hit=[];p.ult=0}
  if(pd&16&&p.jumps>0){p.vy=-c.jp;p.jumps--;p.g=0}}
 if(p.dg){p.vy=0;p.vx*=.88;p.dg--}
 else if(p.hs>0)p.vx*=.985;
 else if(p.ak){const a=p.ak==1?c.L:p.ak==2?c.H:ULT;p.at++;
  if(p.ak==2&&p.at==a[1]){if(c.pr)G.pj.push({x:p.x+p.f*30,y:p.y-30,vx:p.f*c.pr,o:p.id,a,l:70,f:p.f});else p.vx+=p.f*3}
  p.vx*=p.g?.8:.97;
  if(p.ak==3&&p.at<a[1])p.inv=2;
  if(p.at>=a[1]&&p.at<=a[2]&&!(c.pr&&p.ak==2))strike(p,a);
  if(p.at>=a[0])p.ak=0}
 else p.vx+=(dir*c.sp-p.vx)*(p.g?.25:.09);
 if(!p.dg){const st=storm(t);p.vy+=st?.45:.85;if(D&&p.vy>0&&p.hs<=0)p.vy+=.6;if(p.hs<=0)p.vy=Math.min(p.vy,st?9:17)}
 if(pd&8&&p.pl&&p.pl.s)p.dt=14;
 p.x+=p.vx;const py=p.y;p.y+=p.vy;p.g=0;p.pl=null;
 if(p.vy>=0)for(const q of PL){if(q.s&&p.dt>0)continue;
  if(py<=q.y+2&&p.y>=q.y&&p.x+14>q.x&&p.x-14<q.x+q.w){p.y=q.y;p.vy=0;p.g=1;p.jumps=2;p.pl=q;p.x+=q.dx||0;break}}
 if(!p.g&&p.vy>0&&p.hs<=0&&!p.ak&&!p.dg&&p.lc<=0)for(const q of PL)if(!q.s){const e=p.x<q.x+q.w/2?q.x:q.x+q.w;if(Math.abs(p.x-e)<22&&p.y>q.y+4&&p.y<q.y+60){p.lg=e;p.ls=e==q.x?-1:1;p.ly=q.y;break}}
 if(p.x<-250||p.x>1450||p.y>900||p.y<-450){
  fx(['k',Math.max(30,Math.min(1170,p.x)),Math.max(30,Math.min(670,p.y)),p.c]);
  p.stocks--;p.rs=90;p.lg=null;slow=36;p.vx=p.vy=0;p.ak=0;p.hs=0;if(p.stocks<=0)p.out=1}}
function ai(p){const o=G.ps.filter(q=>q!=p&&!q.out&&q.rs<=0).sort((a,b)=>Math.abs(a.x-p.x)-Math.abs(b.x-p.x))[0];
 if(p.rs>0||!o)return 0;let I=0;const dx=o.x-p.x,dy=o.y-p.y,r=Math.random();
 if(p.x<260||p.x>940||p.y>540){I|=p.x<600?2:1;if(p.y>400&&p.vy>0||r<.03)I|=16;return I}
 if(Math.abs(dx)>(p.c==2?110:70))I|=dx>0?2:1;
 if(dy<-80&&r<.05)I|=16|4;
 if(Math.abs(dx)<130&&Math.abs(dy)<90&&r<.1)I|=r<.05?32:64;
 if(p.ult>=100&&Math.abs(dx)<150)I|=256;
 if(o.ak&&Math.abs(dx)<120&&r<.1)I|=128;
 return I}
function reset(){G.ps.forEach(p=>{p.stocks=3;p.dmg=0;p.ult=0;p.out=0;p.rs=40;p.ak=0;p.hs=0;p.dg=0;p.lg=null});G.win=null;G.pj=[]}
function tick(){G.t++;PL=plats(G.t);
 for(const p of G.ps){let I;if(p.id==me)I=getInput();else if(p.bot)I=ai(p);else{I=p.raw|p.press;p.press=0}step(p,I,G.t)}
 G.pj=G.pj.filter(j=>{j.x+=j.vx;if(--j.l<=0)return 0;const o=G.ps.find(p=>p.id==j.o);
  for(const q of G.ps){if(q.id==j.o||q.out||q.rs>0||q.inv>0)continue;
   if(Math.abs(q.x-j.x)<26&&Math.abs(q.y-28-j.y)<38){hurt({f:j.f,ad:0,ult:0},q,j.a,{});if(o)o.ult=Math.min(100,o.ult+j.a[3]);return 0}}return 1});
 if(slow>0)slow--;
 const al=G.ps.filter(p=>!p.out);
 if(!G.win&&G.ps.length>1&&al.length<=1){G.win=al[0]?al[0].name:'Empate';G.wt=200}
 if(G.win&&--G.wt<=0)reset();
 if(mode=='h'&&G.t%2==0){const s={t:'s',st:G.st,pj:G.pj.map(j=>[j.x,j.y,j.f]),tm:G.t,w:G.win,fx:outq.splice(0),p:G.ps.map(p=>[p.id,p.x,p.y,p.f,p.dmg|0,p.stocks,p.c,p.ak,p.at,p.ad,p.inv,p.ult|0,p.rs,p.lg!=null?2:p.g,p.hs,p.dg,p.name,p.out,p.sk,p.w])};
  Object.values(conns).forEach(c=>c.open&&c.send(s))}}
function apply(d){G.t=d.tm;G.st=d.st;G.pj=d.pj.map(([x,y,f])=>({x,y,f}));G.win=d.w;d.fx.forEach(fxh);const old=new Map(G.ps.map(p=>[p.id,p]));
 G.ps=d.p.map(a=>{const[id,x,y,f,dmg,stocks,c,ak,at,ad,inv,ult,rs,gr,hs,dg,name,out,sk,w]=a,p=old.get(id)||{id};
  return Object.assign(p,{x,y,f,dmg,stocks,c,ak,at,ad,inv,ult,rs,g:gr,hs,dg,name,out,sk,w})})}

// ---------- REDE (WebRTC via PeerJS) ----------
function begin(){$('m').style.display='none'}
const say=s=>$('ss').textContent=s;
$('bb').onclick=()=>{mode='l';nid=0;G.ps=[];G.st=stage;const a=newP(nm(),pick,0,skin);me=a.id;G.ps.push(a,newP('Bot',(pick+1)%LG.length,1,(skin+1)%SK.length));begin()};
$('bh').onclick=()=>{code=[...Array(5)].map(()=>'ABCDEFGHJKMNPQRSTUVWXYZ23456789'[Math.random()*31|0]).join('');
 say('Criando sala...');peer=new Peer('rb'+code);
 peer.on('error',e=>say('Erro: '+e.type+' (tente de novo)'));
 peer.on('open',()=>{mode='h';G.st=stage;const a=newP(nm(),pick,0,skin);me=a.id;G.ps.push(a);begin()});
 peer.on('connection',c=>{
  c.on('data',d=>{if(d.t=='h'){if(G.ps.length>=4){c.send({t:'full'});return}
    const p=newP(String(d.n).slice(0,10),d.c%LG.length,0,d.sk%SK.length);c.pid=p.id;conns[p.id]=c;G.ps.push(p);c.send({t:'w',id:p.id})}
   else if(d.t=='i'){const p=G.ps.find(q=>q.id==c.pid);if(p){p.press|=d.i&~p.raw;p.raw=d.i}}});
  c.on('close',()=>{delete conns[c.pid];G.ps=G.ps.filter(p=>p.id!=c.pid)})})};
$('bj').onclick=()=>{const k=$('co').value.trim().toUpperCase();if(!k)return say('Digite o código da sala');
 say('Conectando...');peer=new Peer();peer.on('error',e=>say('Erro: '+e.type));
 peer.on('open',()=>{conn=peer.connect('rb'+k,{reliable:true});
  conn.on('open',()=>{conn.send({t:'h',n:nm(),c:pick,sk:skin});mode='gst';begin()});
  conn.on('data',d=>{if(d.t=='w')me=d.id;else if(d.t=='s')apply(d);else if(d.t=='full'){say('Sala cheia');location.reload()}});
  conn.on('close',()=>{alert('Conexão com o host perdida');location.reload()})})};

// ---------- RENDER ----------
function draw(){const st=storm(G.t),T=G.t%1800;g.save();
 const gr=g.createLinearGradient(0,0,0,H);const B=ST[G.st|0].bg;gr.addColorStop(0,st?'#2b1055':B[0]);gr.addColorStop(1,st?'#7b2cbf':B[1]);
 g.fillStyle=gr;g.fillRect(0,0,W,H);
 if(shake>.5){g.translate((Math.random()-.5)*shake,(Math.random()-.5)*shake);shake*=.88}
 g.fillStyle='#fff6';for(let i=0;i<70;i++)g.fillRect((i*197)%W,(i*83)%460,2,2);
 plats(G.t).forEach(q=>{if(!q.s){g.fillStyle='#3a4478';g.beginPath();g.moveTo(q.x,q.y);g.lineTo(q.x+q.w,q.y);g.lineTo(q.x+q.w-120,q.y+140);g.lineTo(q.x+120,q.y+140);g.fill();g.fillStyle='#39d98a';g.fillRect(q.x,q.y,q.w,9)}
  else{g.fillStyle=q.dx?'#ffb86b':'#8fb3ff';g.fillRect(q.x,q.y,q.w,10)}});
 G.ps.forEach(p=>{if(p.out||p.rs>0){p.rx=p.x;p.ry=p.y;return}
  p.rx=mode=='gst'&&p.rx!=null?p.rx+(p.x-p.rx)*.5:p.x;p.ry=mode=='gst'&&p.ry!=null?p.ry+(p.y-p.ry)*.5:p.y;
  p.mv=Math.abs(p.rx-(p.px??p.rx))>.6;p.px=p.rx;
  const x=p.rx,y=p.ry,col=SK[(p.sk|0)%SK.length].c1,c=gc(p);
  if(x<0||x>W||y<0||y>H){g.fillStyle=col;g.beginPath();g.arc(Math.max(14,Math.min(W-14,x)),Math.max(14,Math.min(H-14,y)),10,0,6.3);g.fill();return}
  if(p.ak&&!(c.pr&&p.ak==2)){const b=hb(p),a=p.ak==1?c.L:p.ak==2?c.H:ULT;g.fillStyle=col+'66';g.strokeStyle=col;g.lineWidth=3;
   if(p.at>=a[1]){if(b.circ){g.beginPath();g.arc(b.x,b.y,b.r*(.6+(p.at-a[1])/10),0,6.3);g.stroke();g.fill()}else{g.beginPath();g.roundRect(b.x-b.w/2,b.y-b.h/2,b.w,b.h,12);g.fill();g.stroke()}}
   else if(p.ak==3){g.beginPath();g.arc(p.x,p.y-28,60-p.at,0,6.3);g.stroke()}}
  drawP(g,p,x,y,G.t);
  g.globalAlpha=1;g.fillStyle='#fff';g.font='13px system-ui';g.textAlign='center';g.fillText(p.name+(p.id==me?' ★':''),x,y-74)});
 G.pj.forEach(j=>{g.fillStyle='#ffd166';g.beginPath();g.arc(j.x,j.y,8,0,6.3);g.fill()});
 parts=parts.filter(p=>--p.l>0);parts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.2;g.globalAlpha=p.l/30;g.fillStyle=p.c;g.fillRect(p.x,p.y,5,5)});g.globalAlpha=1;
 // HUD
 G.ps.slice(0,4).forEach((p,i)=>{const x=20+i*295,y=H-92,col=COLS[p.id%4];
  g.fillStyle='#0008';g.beginPath();g.roundRect(x,y,275,78,12);g.fill();g.strokeStyle=col;g.lineWidth=2;g.stroke();
  g.textAlign='left';g.fillStyle=col;g.font='bold 14px system-ui';g.fillText(p.name+' · '+gc(p).n+'/'+gc(p).w.n,x+12,y+20);
  const k=Math.min(1,p.dmg/150);g.fillStyle=`rgb(255,${255-k*200|0},${255-k*200|0})`;g.font='bold 34px system-ui';g.fillText(p.dmg+'%',x+12,y+56);
  for(let s=0;s<3;s++){g.fillStyle=s<p.stocks?col:'#fff2';g.beginPath();g.arc(x+160+s*22,y+44,8,0,6.3);g.fill()}
  g.fillStyle='#fff2';g.fillRect(x+12,y+64,251,7);g.fillStyle=p.ult>=100?'#ffd166':'#7aa2ff';g.fillRect(x+12,y+64,251*p.ult/100,7)});
 g.textAlign='center';g.fillStyle='#fff';g.font='bold 22px system-ui';
 if(mode=='h')g.fillText('Sala: '+code+'  ('+G.ps.length+'/4)  — passe o código aos amigos',W/2,30);
 if(st){g.fillStyle='#ffd166';g.fillText('GRAVIDADE REDUZIDA!',W/2,64)}else if(T>1230&&T<=1300){g.fillStyle='#ffd166';g.fillText('⚠ Tempestade gravitacional chegando...',W/2,64)}
 if(G.win){g.fillStyle='#fff';g.font='bold 56px system-ui';g.fillText('🏆 '+G.win+' venceu!',W/2,H/2-40)}
 else if(mode=='h'&&G.ps.length<2){g.fillStyle='#fffa';g.font='20px system-ui';g.fillText('Aguardando amigos... (podem entrar a qualquer momento)',W/2,H/2-120)}
 g.restore()}
let acc=0,last=performance.now(),lastI=-1,kk=0;
function loop(now){acc+=Math.min(100,now-last)*(slow>0?.35:1);last=now;
 if(mode=='h'||mode=='l')while(acc>=16.67){tick();acc-=16.67}else acc=0;
 if(mode=='gst'&&conn&&conn.open){const i=getInput();if(i!=lastI||++kk%4==0){conn.send({t:'i',i});lastI=i}}
 if(mode)draw();else{g.fillStyle='#070a18';g.fillRect(0,0,W,H)}requestAnimationFrame(loop)}
requestAnimationFrame(loop);

function gc(p){const l=LG[p.c%LG.length],w=WP[l.w[p.w|0]],[st,d,df,sp]=l.st,k=1.25-d*.05,m=.7+st*.06,A=a=>[a[0]*k|0,a[1]*k|0,a[2]*k|0,a[3]*m,a[4],a[5],a[6],a[7]];
 return{n:l.n,sp:3.4+sp*.32,jp:13+d*.14,wt:.55+df*.09,L:A(w.L),H:A(w.H),pr:w.pr,w}}
function drawP(g,p,x,y,t){const S=SK[(p.sk|0)%SK.length],c=gc(p),a=p.ak,air=!p.g&&p.lg==null,hang=p.g==2||p.lg!=null,
 sw=p.mv&&!air?Math.sin(t/3)*9:0,sq=air?1+Math.min(Math.abs(p.vy||0),14)*.012:1+Math.sin(t/14)*.02;
 g.save();g.translate(x,y);g.globalAlpha=p.dg?.35:p.inv>0&&p.inv%6<3?.4:1;
 g.strokeStyle=COLS[p.id%4]||'#0000';g.lineWidth=2;g.beginPath();g.ellipse(0,2,20,5,0,0,6.3);g.stroke();
 g.scale(2-sq,sq);g.lineCap='round';
 if(S.fx=='flame'){g.fillStyle=S.c2;for(let i=0;i<3;i++){g.globalAlpha*=.6;g.beginPath();g.arc(-p.f*(14+i*9),-30+Math.sin(t/3+i)*6,9-i*2,0,6.3);g.fill()}g.globalAlpha=1}
 g.strokeStyle=S.c2;g.lineWidth=6;g.beginPath();g.moveTo(-6,-14);g.lineTo(-6+sw,0);g.moveTo(6,-14);g.lineTo(6-sw,0);g.stroke();
 g.fillStyle=p.hs>0?'#fff':S.c1;g.beginPath();g.roundRect(-16,-54,32,42,14);g.fill();
 g.fillStyle=S.c2;g.fillRect(-16,-30,32,5);g.fillStyle='#0b1030';g.fillRect(p.f*7-3,-42,7,7);
 if(S.fx=='crown'){g.fillStyle='#ffd166';g.beginPath();g.moveTo(-12,-54);g.lineTo(-12,-66);g.lineTo(-6,-58);g.lineTo(0,-68);g.lineTo(6,-58);g.lineTo(12,-66);g.lineTo(12,-54);g.fill()}
 else if(S.fx=='horns'){g.fillStyle=S.c2;[-1,1].forEach(d=>{g.beginPath();g.moveTo(d*8,-54);g.lineTo(d*16,-68);g.lineTo(d*14,-52);g.fill()})}
 else if(S.fx=='halo'){g.strokeStyle=S.c2;g.lineWidth=3;g.beginPath();g.ellipse(0,-64,13,4,0,0,6.3);g.stroke()}
 const A=a==1?c.L:a==2?c.H:ULT;let ang=hang?-2.2:-.5;
 if(a)ang=a==3?p.at*.6:-1.7+Math.min(1,p.at/A[0])*3.4;
 g.save();g.scale(p.f,1);g.translate(10,-28);g.rotate(ang);g.strokeStyle='#e8f1ff';g.lineWidth=c.w.th;g.beginPath();g.moveTo(0,0);g.lineTo((c.L[6]||50)*.7+10,0);g.stroke();g.restore();
 g.restore()}
