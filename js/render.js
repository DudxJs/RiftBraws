// RENDER: skins com texturas, animações dos personagens, arena e HUD
const texC={},imgs={};
function texCv(p){const k=p.sk+'_'+p.c;if(texC[k])return texC[k];const s=SK[p.sk]||SK[0],c=document.createElement('canvas');c.width=c.height=32;const x=c.getContext('2d');
 x.fillStyle=s.a||LG[p.c].col;x.fillRect(0,0,32,32);x.fillStyle=s.b;x.strokeStyle=s.b;x.lineWidth=2;
 if(s.pat=='stripe')for(let i=0;i<32;i+=8)x.fillRect(0,i,32,4);
 if(s.pat=='dots')for(let a=4;a<32;a+=12)for(let b=4;b<32;b+=12){x.beginPath();x.arc(a,b,3,0,6.3);x.fill()}
 if(s.pat=='checker')for(let a=0;a<32;a+=8)for(let b=0;b<32;b+=8)if((a+b)/8%2==0)x.fillRect(a,b,8,8);
 if(s.pat=='wave')for(let b=6;b<32;b+=10){x.beginPath();for(let a=0;a<=32;a+=2)x.lineTo(a,b+Math.sin(a/3)*3);x.stroke()}
 if(s.pat=='stars')for(let i=0;i<7;i++)x.fillRect(i*13%32,i*17%32,i%2+1,i%2+1);
 if(s.pat=='camo')for(let i=0;i<6;i++){x.beginPath();x.ellipse(i*11%32,i*7%32,7,4,i,0,6.3);x.fill()}
 if(s.pat=='grad'){const q=x.createLinearGradient(0,0,32,32);q.addColorStop(0,s.a);q.addColorStop(.5,s.b);q.addColorStop(1,s.a);x.fillStyle=q;x.fillRect(0,0,32,32)}
 return texC[k]=c}
// Texturas próprias: coloque assets/skins/<idLenda>_<idSkin>.png (ex.: 0_1.png) e ela substitui o corpo
function skinImg(p){const k='assets/skins/'+p.c+'_'+p.sk+'.png';if(!imgs[k]){const i=new Image();i.onload=()=>i.ok=1;i.src=k;imgs[k]=i}return imgs[k].ok?imgs[k]:null}
function drawWp(c,k){const w=WP[k],L=w.v;c.strokeStyle=c.fillStyle=w.k;c.lineCap='round';c.lineWidth=4;c.beginPath();c.moveTo(0,0);c.lineTo(L,0);c.stroke();
 if(w.h==0){c.beginPath();c.moveTo(L*.3,-5);c.lineTo(L+8,0);c.lineTo(L*.3,5);c.fill()}
 else if(w.h==1)c.fillRect(L-8,-11,18,22);
 else if(w.h==2){c.beginPath();c.moveTo(L-12,-15);c.lineTo(L+5,0);c.lineTo(L-12,15);c.fill()}
 else if(w.h==3){c.beginPath();c.arc(L,0,10,0,6.3);c.fill()}
 else{c.lineWidth=3;c.beginPath();c.arc(L*.4,0,L*.6,-1.2,1.2);c.stroke()}}
function drawChar(c,p,x,y,vx,vy){const L=LG[p.c],T=performance.now()/1000,run=p.g&&Math.abs(vx)>.8,sw=run?Math.sin(T*16)*9:0;
 if(!p._g&&p.g)p.sq=7;p._g=p.g;if(p.sq>0)p.sq--;
 const sy=1+(p.g?-(p.sq||0)*.02:Math.min(.18,Math.abs(vy)*.012)),sx=2-sy,bob=p.g&&!run?Math.sin(T*3)*1.5:0;
 c.save();c.translate(x,y);c.scale(p.f*sx,sy);if(p.hs>0)c.rotate(-.25);
 if(p.dg){c.globalAlpha=.15;c.fillStyle=L.col;c.fillRect(-34,-56,28,52)}
 c.globalAlpha=p.dg?.35:p.inv>0&&p.inv%6<3?.45:1;
 const im=skinImg(p);c.strokeStyle='#000b';c.lineWidth=2;
 if(im)c.drawImage(im,-32,-72,64,72);else{
  c.fillStyle='#10132a';[-1,1].forEach(s=>{c.save();c.translate(s*6,-16);c.rotate(s*sw*.05);c.fillRect(-4,0,9,16);c.restore()});
  c.fillStyle=p.hs>0?'#fff':c.createPattern(texCv(p),'repeat');c.beginPath();c.roundRect(-14,-50+bob,28,36,10);c.fill();c.stroke();
  c.fillStyle=p.hs>0?'#fff':L.col;c.beginPath();c.arc(2,-60+bob,12,0,6.3);c.fill();c.stroke();
  c.fillStyle='#fff';c.fillRect(6,-63+bob,6,5);c.fillStyle='#000';c.fillRect(9,-62+bob,3,3)}
 let ang=run?-.2+Math.sin(T*16)*.3:-.4+Math.sin(T*3)*.05;
 if(p.ak){const a=atk(p),u=Math.min(1,p.at/a[0]),s=p.ad==1?[-.6,-2.6]:p.ad==2?[.6,2.2]:[-1.5,1.1];ang=p.ak==3?-1.2-u*5:s[0]+(s[1]-s[0])*Math.min(1,u*1.6)}
 c.save();c.translate(8,-42+bob);c.rotate(ang);c.strokeStyle=L.col;c.lineWidth=6;c.lineCap='round';c.beginPath();c.moveTo(0,0);c.lineTo(10,0);c.stroke();c.translate(10,0);
 if(p.cur>=0)drawWp(c,p.cur);else{c.fillStyle=L.col;c.beginPath();c.arc(3,0,6,0,6.3);c.fill()}
 c.restore();c.restore()}
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
  g.fillStyle=col;g.font='13px system-ui';g.textAlign='center';g.fillText(p.name+(p.id==me?' ★':''),x,y-80)});
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
