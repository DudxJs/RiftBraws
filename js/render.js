// RENDER DA PARTIDA: arena, itens, HUD
let fpsN=0,fpsT=performance.now(),fps=0;
function draw(){const st=storm(G.t),T=G.t%1800,tt=performance.now()/1000;g.save();
 const gr=g.createLinearGradient(0,0,0,H);gr.addColorStop(0,st?'#2b1055':'#0b1030');gr.addColorStop(1,st?'#7b2cbf':'#1d2b64');g.fillStyle=gr;g.fillRect(0,0,W,H);
 if(shake>.5){g.translate((Math.random()-.5)*shake,(Math.random()-.5)*shake);shake*=.88}
 g.fillStyle='#fff6';for(let i=0;i<70;i++)g.fillRect((i*197)%W,(i*83)%460,2,2);
 plats(G.t).forEach((q,i)=>{if(!i){g.fillStyle='#3a4478';g.beginPath();g.moveTo(q.x,q.y);g.lineTo(q.x+q.w,q.y);g.lineTo(q.x+q.w-120,q.y+140);g.lineTo(q.x+120,q.y+140);g.fill();g.fillStyle='#39d98a';g.fillRect(q.x,q.y,q.w,9)}
  else{g.fillStyle=q.dx?'#ffb86b':'#8fb3ff';g.fillRect(q.x,q.y,q.w,10)}});
 G.items.forEach(i=>{g.save();g.translate(i.x,i.y-8);if(!i.th){g.fillStyle='#fff3';g.beginPath();g.arc(0,0,20+Math.sin(tt*4)*3,0,6.3);g.fill();g.rotate(-.8)}else g.rotate(tt*14);g.translate(-WP[i.w].v/2,0);drawWp(g,i.w);g.restore()});
 G.ps.forEach(p=>{if(p.out||p.rs>0){p.rx=p.x;p.ry=p.y;p.px=p.rx;p.py=p.ry;return}
  p.rx=mode=='gst'&&p.rx!=null?p.rx+(p.x-p.rx)*.5:p.x;p.ry=mode=='gst'&&p.ry!=null?p.ry+(p.y-p.ry)*.5:p.y;
  const x=p.rx,y=p.ry,col=COLS[p.id%4],vx=x-(p.px??x),vy=y-(p.py??y);p.px=x;p.py=y;
  if(x<0||x>W||y<0||y>H){g.fillStyle=col;g.beginPath();g.arc(Math.max(14,Math.min(W-14,x)),Math.max(14,Math.min(H-14,y)),10,0,6.3);g.fill();return}
  if(p.ak){const a=atk(p);if(p.at>=a[1]&&p.at<=a[2]){const b=hb(p);g.fillStyle=LG[p.c].col+'55';g.strokeStyle=LG[p.c].col;g.lineWidth=3;
   if(b.circ){g.beginPath();g.arc(b.x,b.y,b.r*(.6+(p.at-a[1])/10),0,6.3);g.stroke();g.fill()}else{g.beginPath();g.roundRect(b.x-b.w/2,b.y-b.h/2,b.w,b.h,14);g.fill();g.stroke()}}}
  drawChar(g,p,x,y,vx,vy);
  g.fillStyle=col;g.font='13px system-ui';g.textAlign='center';g.fillText(p.name+(p.id==me?' ★':''),x,y-96)});
 parts=parts.filter(p=>--p.l>0);parts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.2;g.globalAlpha=p.l/30;g.fillStyle=p.c;g.fillRect(p.x,p.y,5,5)});g.globalAlpha=1;
 G.ps.slice(0,4).forEach((p,i)=>{const x=20+i*295,y=H-92,col=LG[p.c].col;
  g.fillStyle='#0008';g.beginPath();g.roundRect(x,y,275,78,12);g.fill();g.strokeStyle=COLS[p.id%4];g.lineWidth=2;g.stroke();
  g.textAlign='left';g.fillStyle=col;g.font='bold 14px system-ui';g.fillText(p.name+' · '+LG[p.c].n,x+12,y+20);
  g.fillStyle='#fffa';g.font='12px system-ui';g.fillText(p.cur>=0?WP[p.cur].n:'Desarmado',x+190,y+20);
  const k=Math.min(1,p.dmg/150);g.fillStyle=`rgb(255,${255-k*200|0},${255-k*200|0})`;g.font='bold 34px system-ui';g.fillText(p.dmg+'%',x+12,y+56);
  for(let s=0;s<Math.max(CFG.stocks,p.stocks);s++){g.fillStyle=s<p.stocks?col:'#fff2';g.beginPath();g.arc(x+150+s*18,y+44,6,0,6.3);g.fill()}
  g.fillStyle='#fff2';g.fillRect(x+12,y+64,251,7);g.fillStyle=p.ult>=100?'#ffd166':'#7aa2ff';g.fillRect(x+12,y+64,251*p.ult/100,7)});
 g.textAlign='center';g.fillStyle='#fff';g.font='bold 22px system-ui';
 if(mode=='h')g.fillText('Sala: '+code+'  ('+G.ps.length+'/4)  — passe o código aos amigos',W/2,30);
 if(st){g.fillStyle='#ffd166';g.fillText('GRAVIDADE REDUZIDA!',W/2,64)}else if(T>1230&&T<=1300){g.fillStyle='#ffd166';g.fillText('⚠ Tempestade gravitacional chegando...',W/2,64)}
 if(G.win){g.fillStyle='#fff';g.font='bold 56px system-ui';g.fillText('🏆 '+G.win+' venceu!',W/2,H/2-40)}
 else if(mode=='h'&&G.ps.length<2){g.fillStyle='#fffa';g.font='20px system-ui';g.fillText('Aguardando amigos... (podem entrar a qualquer momento)',W/2,H/2-120)}
 g.fillStyle='#fff7';g.font='11px system-ui';g.textAlign='right';g.fillText('Por: Eduardo (@dudx._js)',W-10,H-5);
 if(CFG.fps){g.textAlign='left';g.fillText(fps+' FPS',10,H-5)}
 g.restore()}
let acc=0,last=performance.now(),lastI=-1,kk=0;
function loop(now){acc+=Math.min(100,now-last);last=now;fpsN++;if(now-fpsT>1000){fps=fpsN;fpsN=0;fpsT=now}
 if(mode=='h'||mode=='l')while(acc>=16.67){tick();acc-=16.67}else acc=0;
 if(mode=='gst'&&conn&&conn.open){const i=getInput();if(i!=lastI||++kk%4==0){conn.send({t:'i',i});lastI=i}}
 if(mode&&!G.lobby)draw();requestAnimationFrame(loop)}
requestAnimationFrame(loop);
