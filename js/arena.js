// ARENA: céu, nuvens e ilhas flutuantes desenhadas em código (arte original). Arte própria opcional: assets/arena/bg.jpg, main.png, soft.png (ligar em Configurações)
const AR={},CA={};
function rnd(s){return()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function island(w,hb,seed,vines,warm){const R=rnd(seed),P=20,cw=w+P*2,ch=hb+P*2+20,c=document.createElement('canvas');c.width=cw;c.height=ch;const x=c.getContext('2d'),top=P+6,pts=[],n=Math.max(8,w/40|0);
 for(let i=0;i<=n;i++){const u=i/n,e=Math.pow(Math.abs(u-.5)*2,1.7);pts.push([P+u*w,top+hb*(1-e*.78)+(R()-.5)*hb*.12])}
 x.beginPath();x.moveTo(P,top);pts.forEach(q=>x.lineTo(q[0],q[1]));x.lineTo(P+w,top);x.closePath();
 const g1=x.createLinearGradient(0,top,0,top+hb);g1.addColorStop(0,warm?'#7d7068':'#6f8284');g1.addColorStop(.7,warm?'#4d4a4a':'#3e5058');g1.addColorStop(1,'#46628f');x.fillStyle=g1;x.fill();x.save();x.clip();
 for(let i=0;i<w/38;i++){const px=P+R()*w,len=hb*(.5+R()*.5),sl=(R()-.5)*.9;x.fillStyle='rgba(255,255,255,'+(.05+R()*.08)+')';x.beginPath();x.moveTo(px,top);x.lineTo(px+30+R()*30,top);x.lineTo(px+30+sl*len,top+len);x.lineTo(px+sl*len*.8,top+len);x.closePath();x.fill();
  x.strokeStyle='rgba(10,20,25,.55)';x.lineWidth=2;x.beginPath();x.moveTo(px,top);x.lineTo(px+sl*len,top+len);x.stroke()}
 const g2=x.createLinearGradient(0,top+hb*.55,0,top+hb);g2.addColorStop(0,'rgba(120,160,230,0)');g2.addColorStop(1,'rgba(120,170,240,.8)');x.fillStyle=g2;x.fillRect(0,top+hb*.5,cw,hb);x.restore();
 x.strokeStyle='rgba(15,25,30,.6)';x.lineWidth=2.5;x.beginPath();x.moveTo(P,top);pts.forEach(q=>x.lineTo(q[0],q[1]));x.lineTo(P+w,top);x.stroke();
 for(let i=0;i<vines;i++){const vx=P+10+R()*(w-20),L=20+R()*hb*.45;for(let k=0;k<L/9;k++){x.fillStyle=k%2?'#127a69':'#17a086';x.beginPath();x.ellipse(vx+(R()-.5)*8,top+k*9,9,6,R()*3,0,6.3);x.fill()}}
 const gg=x.createLinearGradient(0,P,0,top+14);gg.addColorStop(0,'#3df5c8');gg.addColorStop(1,'#14a389');x.fillStyle=gg;x.beginPath();x.moveTo(P-6,P);x.lineTo(P+w+6,P);for(let px=P+w+6;px>=P-6;px-=11)x.lineTo(px,top+8+R()*10);x.closePath();x.fill();
 for(let px=P;px<P+w;px+=13){x.fillStyle=R()<.5?'#117a6b':'#16a085';x.beginPath();x.ellipse(px+R()*8,top+8+R()*8,10,6,R()*2,0,6.3);x.fill()}
 return c}
function fade(c,a){const x=c.getContext('2d');x.globalCompositeOperation='source-atop';x.fillStyle='rgba(205,232,255,'+a+')';x.fillRect(0,0,c.width,c.height);return c}
function clouds(seed,h,al){const R=rnd(seed),c=document.createElement('canvas');c.width=1800;c.height=h;const x=c.getContext('2d');
 for(let i=0;i<46;i++){const cx=R()*1800,cy=h*(.35+R()*.5),r=50+R()*90;for(const o of[-1800,0,1800]){const g=x.createRadialGradient(cx+o,cy-r*.2,r*.1,cx+o,cy,r);g.addColorStop(0,'rgba(255,255,255,'+al+')');g.addColorStop(.7,'rgba(235,248,255,'+al*.8+')');g.addColorStop(1,'rgba(200,230,255,0)');x.fillStyle=g;x.beginPath();x.arc(cx+o,cy,r,0,6.3);x.fill()}}
 return c}
function mkBG(){const c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');let g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#4aa8ff');g.addColorStop(.45,'#a8dcff');g.addColorStop(1,'#e8fbff');x.fillStyle=g;x.fillRect(0,0,W,H);
 g=x.createRadialGradient(600,120,5,600,120,320);g.addColorStop(0,'rgba(255,255,255,.95)');g.addColorStop(.15,'rgba(255,255,255,.5)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,W,H);
 x.globalAlpha=.55;x.drawImage(fade(island(260,90,23,1),.7),880,290);x.drawImage(fade(island(200,70,24,0),.7),90,320);x.globalAlpha=.7;x.drawImage(fade(island(500,170,21,2),.8),-170,440);x.drawImage(fade(island(460,150,22,2),.8),880,480);return c}
function arenaInit(){AR.bg=mkBG();AR.c1=clouds(7,320,.8);AR.c2=clouds(11,200,.95);AR.main=island(600,215,3,9);AR.soft=[island(190,56,5,3),island(190,56,8,3),island(160,50,12,2,1)];
 if(CFG.custom)['bg.jpg','main.png','soft.png'].forEach(f=>{const i=new Image();i.onload=()=>CA[f]=i;i.src='assets/arena/'+f})}
function drawBG(g,t,st){g.drawImage(CA['bg.jpg']||AR.bg,-16,-16,W+32,H+32);const dx=-((t*.12)%1800);g.drawImage(AR.c1,dx,190);g.drawImage(AR.c1,dx+1800,190);if(st){g.fillStyle='rgba(80,30,120,.45)';g.fillRect(-20,-20,W+40,H+40)}}
function drawPlat(g,q,i){const c=CA[i?'soft.png':'main.png'];if(c){const w=q.w+(i?30:60),h=c.height*w/c.width;g.drawImage(c,q.x-(w-q.w)/2,q.y-h*.06,w,h);return}g.drawImage(i?AR.soft[i-1]:AR.main,q.x-20,q.y-19)}
function drawFront(g,t){const dx=-((t*.3)%1800);g.drawImage(AR.c2,dx,585);g.drawImage(AR.c2,dx+1800,585)}
arenaInit();
