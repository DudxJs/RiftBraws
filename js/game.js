// SIMULAÇÃO (roda no host): física, combate, armas, drops, bots
const atk=p=>p.ak==1?(p.cur>=0?WP[p.cur]:UN).L:p.ak==2?(p.cur>=0?WP[p.cur]:UN).H:ULT;
function hb(p){if(p.ak==3)return{x:p.x,y:p.y-28,r:170,circ:1};
 const a=atk(p),r=a[6],s=a[7];let x=p.x+p.f*r*.6,y=p.y-30,w=r,h=s;
 if(p.ad==1){x=p.x;y=p.y-56-r*.45;w=s+20;h=r}else if(p.ad==2){x=p.x;y=p.y+r*.3;w=s+20;h=r}
 return{x,y,w,h}}
function pick(p){const w=LG[p.c].w,it=G.items.find(i=>!i.th&&w.includes(i.w)&&Math.abs(i.x-p.x)<46&&Math.abs(i.y-(p.y-20))<56);
 if(it){G.items.splice(G.items.indexOf(it),1);p.has[w.indexOf(it.w)]=1;p.cur=it.w;fx(['s',0,0,'p'])}
 else if(p.cur>=0){const k=w.indexOf(p.cur);G.items.push({id:++iid,w:p.cur,x:p.x,y:p.y-30,vx:p.f*13,vy:-2,th:p.id});p.has[k]=0;p.cur=p.has[1-k]?w[1-k]:-1}}
function itemsTick(){
 for(const i of G.items){i.vy+=.6;const py=i.y;i.x+=i.vx;i.y+=i.vy;i.vx*=i.th?.995:.9;
  for(const q of PL)if(i.vy>=0&&py<=q.y+2&&i.y>=q.y&&i.x>q.x&&i.x<q.x+q.w){i.y=q.y;i.vy=0;i.th=0}
  if(i.th)for(const q of G.ps)if(q.id!=i.th&&!q.out&&q.rs<=0&&q.inv<=0&&Math.abs(q.x-i.x)<28&&Math.abs(q.y-28-i.y)<38){
   q.dmg+=8;const m=(7+q.dmg*.06)/LG[q.c].wt;q.vx=Math.sign(i.vx)*m;q.vy=-m*.5;q.hs=12;q.ak=0;q.dg=0;q.g=0;fx(['h',q.x,q.y-28,m]);i.th=0;i.vx*=.2;break}
  if(i.y>900)i.dead=1}
 G.items=G.items.filter(i=>!i.dead);
 if(G.t%300==30&&G.items.length<3&&G.ps.length){const ws=G.ps.flatMap(p=>LG[p.c].w);G.items.push({id:++iid,w:ws[Math.random()*ws.length|0],x:350+Math.random()*500,y:-30,vx:0,vy:0,th:0})}}
function fx(e){if(mode=='h')outq.push(e);fxh(e)}
function fxh(e){const[k,x,y,m]=e;if(k=='s')return sfx(m);sfx(k);const n=CFG.parts?(k=='h'?8+(m|0):30):0;if(CFG.shake)shake=Math.max(shake,k=='h'?Math.min(m/2,12):16);
 for(let i=0;i<n;i++){const a=Math.random()*6.28,s=Math.random()*(k=='h'?5:10)+2;parts.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,l:30,c:k=='h'?'#fff':COLS[m%4]})}}
function strike(p,a){const b=hb(p);
 for(const q of G.ps){if(q==p||q.out||q.rs>0||q.inv>0||p.hit.includes(q.id))continue;
  const qx=q.x,qy=q.y-28,ok=b.circ?Math.hypot(qx-b.x,qy-b.y)<b.r+22:Math.abs(qx-b.x)<b.w/2+18&&Math.abs(qy-b.y)<b.h/2+28;
  if(!ok)continue;p.hit.push(q.id);q.dmg+=a[3]*(1+(LG[p.c].str-5)*.06);
  const m=(a[4]+q.dmg*a[5])/LG[q.c].wt,dx=b.circ?(Math.sign(q.x-p.x)||p.f):p.f;
  if(p.ad==1&&!b.circ){q.vx=dx*m*.3;q.vy=-m*1.1}
  else if(p.ad==2&&!q.g&&!b.circ){q.vx=dx*m*.3;q.vy=m*.9}
  else{q.vx=dx*m*.95;q.vy=-m*(b.circ?.7:.5)}
  q.hs=Math.min(45,8+m*1.5)|0;q.ak=0;q.dg=0;q.g=0;
  p.ult=Math.min(100,p.ult+a[3]*1.6);q.ult=Math.min(100,q.ult+a[3]);fx(['h',qx,qy,m])}}
function spawn(p){p.x=350+Math.random()*500;p.y=-60;p.vx=p.vy=0;p.inv=150;p.jumps=2;p.dmg=0}
function step(p,I,t){const c=LG[p.c],pd=I&~p.pi;p.pi=I;
 if(p.rs>0){if(--p.rs==0&&!p.out)spawn(p);return}
 if(p.out)return;
 const D=I&8,dir=(I&2?1:0)-(I&1?1:0);
 ['inv','cd','hs','dt'].forEach(k=>p[k]>0&&p[k]--);
 const free=p.hs<=0&&!p.ak&&!p.dg;
 if(free&&dir)p.f=dir;
 if(free&&p.cd<=0&&pd&128){p.dg=14;p.inv=16;fx(['s',0,0,'d']);p.cd=70-c.dex*3;p.vx=(dir||p.f)*11;p.vy=0}
 else if(free){
  if(pd&96){p.ak=pd&32?1:2;fx(['s',0,0,'a']);p.at=0;p.ad=I&4?1:(D&&!p.g?2:0);p.hit=[]}
  else if(pd&256&&p.ult>=100){p.ak=3;fx(['s',0,0,'u']);p.at=0;p.ad=0;p.hit=[];p.ult=0}
  if(pd&16&&p.jumps>0){p.vy=-c.jp;p.jumps--;p.g=0;fx(['s',0,0,'j'])}
  if(pd&1024&&p.has[0]&&p.has[1])p.cur=p.cur==c.w[0]?c.w[1]:c.w[0];
  if(pd&512)pick(p)}
 if(p.dg){p.vy=0;p.vx*=.88;p.dg--}
 else if(p.hs>0)p.vx*=.985;
 else if(p.ak){const a=atk(p);p.at++;
  if(p.ak==2&&p.at==a[1])p.vx+=p.f*3;
  p.vx*=p.g?.8:.97;
  if(p.ak==3&&p.at<a[1])p.inv=2;
  if(p.at>=a[1]&&p.at<=a[2])strike(p,a);
  if(p.at>=a[0])p.ak=0}
 else p.vx+=(dir*c.sp-p.vx)*(p.g?.25:.09);
 if(!p.dg){const st=storm(t);p.vy+=st?.45:.85;if(D&&p.vy>0&&p.hs<=0)p.vy+=.6;if(p.hs<=0)p.vy=Math.min(p.vy,st?9:17)}
 if(pd&8&&p.pl&&p.pl.s)p.dt=14;
 p.x+=p.vx;const py=p.y;p.y+=p.vy;p.g=0;p.pl=null;
 if(p.vy>=0)for(const q of PL){if(q.s&&p.dt>0)continue;
  if(py<=q.y+2&&p.y>=q.y&&p.x+14>q.x&&p.x-14<q.x+q.w){p.y=q.y;p.vy=0;p.g=1;p.jumps=2;p.pl=q;p.x+=q.dx||0;break}}
 if(p.x<-250||p.x>1450||p.y>900||p.y<-450){
  fx(['k',Math.max(30,Math.min(1170,p.x)),Math.max(30,Math.min(670,p.y)),p.c]);
  p.stocks--;p.rs=90;p.vx=p.vy=0;p.ak=0;p.hs=0;if(p.stocks<=0)p.out=1}}
function ai(p){const o=G.ps.filter(q=>q!=p&&!q.out&&q.rs<=0).sort((a,b)=>Math.abs(a.x-p.x)-Math.abs(b.x-p.x))[0];
 if(p.rs>0||!o)return 0;let I=0;const dx=o.x-p.x,dy=o.y-p.y,r=Math.random();
 if(p.x<260||p.x>940||p.y>540){I|=p.x<600?2:1;if(p.y>400&&p.vy>0||r<.03)I|=16;return I}
 if(p.cur<0){const it=G.items.find(i=>!i.th&&LG[p.c].w.includes(i.w)&&i.y>p.y-110&&i.y<p.y+60);if(it){const d=it.x-p.x;if(Math.abs(d)>20)I|=d>0?2:1;else I|=512;if(it.y<p.y-60&&r<.05)I|=16;return I}}
 if(Math.abs(dx)>70)I|=dx>0?2:1;
 if(dy<-80&&r<.05)I|=16|4;
 if(Math.abs(dx)<130&&Math.abs(dy)<90&&r<[.04,.1,.2][CFG.diff])I|=Math.random()<.5?32:64;
 if(p.ult>=100&&Math.abs(dx)<150)I|=256;
 if(o.ak&&Math.abs(dx)<120&&r<.1)I|=128;
 return I}
function reset(){G.ps.forEach(p=>{p.stocks=CFG.stocks;p.cur=-1;p.has=[0,0];p.dmg=0;p.ult=0;p.out=0;p.rs=40;p.ak=0;p.hs=0;p.dg=0});G.win=null;G.items=[]}
function tick(){G.t++;PL=plats(G.t);itemsTick();
 if(G.lobby){for(const p of G.ps){p.rs=40;p.stocks=CFG.stocks;p.dmg=0;p.cur=-1;p.has=[0,0];p.ult=0}G.items=[];G.win=null}
 for(const p of G.ps){let I;if(p.id==me)I=getInput();else if(p.bot)I=ai(p);else{I=p.raw|p.press;p.press=0}step(p,I,G.t)}
 const al=G.ps.filter(p=>!p.out);
 if(!G.win&&G.ps.length>1&&al.length<=1){G.win=al[0]?al[0].name:'Empate';G.wt=200;fx(['s',0,0,'w'])}
 if(G.win&&--G.wt<=0)reset();
 if(mode=='h'&&G.t%2==0){const s={t:'s',tm:G.t,w:G.win,l:G.lobby,i:G.items.map(i=>[i.w,i.x,i.y,i.th?1:0]),fx:outq.splice(0),p:G.ps.map(p=>[p.id,p.x,p.y,p.f,p.dmg|0,p.stocks,p.c,p.ak,p.at,p.ad,p.inv,p.ult|0,p.rs,p.g,p.hs,p.dg,p.name,p.out,p.sk,p.cur])};
  Object.values(conns).forEach(c=>c.open&&c.send(s))}}
function apply(d){G.t=d.tm;G.win=d.w;G.lobby=d.l;G.items=d.i.map(([w,x,y,th])=>({w,x,y,th}));d.fx.forEach(fxh);const old=new Map(G.ps.map(p=>[p.id,p]));
 G.ps=d.p.map(a=>{const[id,x,y,f,dmg,stocks,c,ak,at,ad,inv,ult,rs,gr,hs,dg,name,out,sk,cur]=a,p=old.get(id)||{id};
  return Object.assign(p,{x,y,f,dmg,stocks,c,ak,at,ad,inv,ult,rs,g:gr,hs,dg,name,out,sk,cur})})}
