// PERSONAGENS: texturas, armas e boneco articulado (usado no menu e na sala)
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
function limb(c,x,y,a1,l1,a2,l2,w,col){const kx=x+Math.sin(a1)*l1,ky=y+Math.cos(a1)*l1,ex=kx+Math.sin(a2)*l2,ey=ky+Math.cos(a2)*l2;c.lineCap=c.lineJoin='round';
 [['#000b',w+4],[col,w]].forEach(([s,lw])=>{c.strokeStyle=s;c.lineWidth=lw;c.beginPath();c.moveTo(x,y);c.lineTo(kx,ky);c.lineTo(ex,ey);c.stroke()});return[ex,ey]}
// Boneco articulado: pernas com joelho, braços, capa/cachecol com vento, cabelo/elmo por lenda, ciclo de corrida, pulo, ataque
function drawChar0(c,p,x,y,vx,vy){const L=LG[p.c],T=performance.now()/1000,run=p.g&&Math.abs(vx)>.8,ph=T*14,air=!p.g;
 if(!p._g&&p.g)p.sq=7;p._g=p.g;if(p.sq>0)p.sq--;
 const sy=1+(p.g?-(p.sq||0)*.02:Math.min(.15,Math.abs(vy)*.01)),sx=2-sy,bob=p.g&&!run?Math.sin(T*3)*1.5:run?Math.abs(Math.sin(ph))*-2:0,tr=Math.max(-16,Math.min(16,-vx*p.f*3));
 c.save();c.translate(x,y);c.scale(p.f*sx,sy);if(p.hs>0)c.rotate(-.25);
 if(p.dg){c.globalAlpha=.15;c.fillStyle=L.col;c.fillRect(-34,-56,28,52)}
 c.globalAlpha=p.dg?.35:p.inv>0&&p.inv%6<3?.45:1;
 const im=skinImg(p),HT=p.hs>0,sk=HT?'#fff':L.sk,pat=HT?'#fff':c.createPattern(texCv(p),'repeat'),hr=L.hair;
 c.strokeStyle='#000b';c.lineWidth=2;
 if(im)c.drawImage(im,-32,-72,64,72);else{
  if(L.acc){const w=Math.sin(T*9+x)*3;c.fillStyle=HT?'#fff':L.acc=='cape'?L.col:L.c2;c.beginPath();
   if(L.acc=='cape'){c.moveTo(-8,-46+bob);c.quadraticCurveTo(-18+tr,-30,-14+tr*1.3+w,-8+(air?-6:0));c.lineTo(-2+tr*.6,-14);c.lineTo(2,-44+bob)}
   else{c.moveTo(-6,-46+bob);c.quadraticCurveTo(-16+tr,-46+w,-24+tr*1.5,-40+w*2);c.lineTo(-22+tr*1.5,-33+w*2);c.quadraticCurveTo(-12+tr,-38,-2,-40+bob)}
   c.fill();c.stroke()}
  const lg=s=>{let a1,a2;if(air){a1=s*.35+(vy<0?.3:-.1);a2=a1-.9}else if(run){const q=ph+(s>0?0:3.14);a1=Math.sin(q)*.9;a2=a1-Math.max(0,-Math.sin(q+1))*1.3-.2}else if(p.ak){a1=s*.45;a2=a1}else{a1=s*.12;a2=a1}
   const f=limb(c,s*4,-22+bob,a1,11,a2,11,7,L.c2);c.fillStyle='#222';c.beginPath();c.ellipse(f[0]+3,f[1],6,3.5,0,0,6.3);c.fill()};
  lg(-1);
  c.save();c.translate(-4,-43+bob);{const a=run?-Math.sin(ph)*1.1-.3:.25+Math.sin(T*3)*.05,h=limb(c,0,0,a,10,a+.5,10,6,L.c2);c.fillStyle=sk;c.beginPath();c.arc(h[0],h[1],4,0,6.3);c.fill()}c.restore();
  c.fillStyle=pat;c.beginPath();c.moveTo(-11,-46+bob);c.lineTo(11,-46+bob);c.lineTo(8,-21);c.lineTo(-8,-21);c.closePath();c.fill();c.stroke();
  c.fillStyle=L.col;c.fillRect(-9,-26,18,4);c.fillStyle='#fffc';c.fillRect(-2,-26,4,4);
  c.fillStyle=HT?'#fff':L.col;c.beginPath();c.arc(-10,-45+bob,5,0,6.3);c.arc(10,-45+bob,5,0,6.3);c.fill();
  lg(1);
  const hy=-58+bob;c.fillStyle=sk;c.beginPath();c.arc(1,hy,11,0,6.3);c.fill();c.stroke();c.fillStyle=HT?'#fff':L.col;
  if(hr==0){c.beginPath();for(let i=0;i<5;i++){c.lineTo(-9+i*5,hy-6);c.lineTo(-7+i*5,hy-17-(i%2)*4)}c.lineTo(11,hy-5);c.fill();c.stroke()}
  else if(hr==1){c.beginPath();c.arc(1,hy-3,11.5,3.14,6.28);c.fill();c.beginPath();c.moveTo(-8,hy-6);c.quadraticCurveTo(-18+tr,hy+4,-20+tr*1.5,hy+16+Math.sin(T*8)*3);c.lineTo(-12,hy+4);c.fill();c.stroke()}
  else if(hr==2||hr==5){c.beginPath();c.arc(1,hy-2,12.5,3.14,6.28);c.lineTo(13,hy+2);c.lineTo(-11,hy+2);c.fill();c.stroke();c.fillStyle=HT?'#fff':'#e8e8e8';
   if(hr==2)c.fillRect(-1,hy-19,5,8);else[-1,1].forEach(s=>{c.beginPath();c.moveTo(1+s*10,hy-8);c.quadraticCurveTo(1+s*22,hy-14,1+s*17,hy-24);c.lineTo(1+s*12,hy-10);c.fill();c.stroke()})}
  else if(hr==3){c.beginPath();c.arc(1,hy-1,13,2.6,6.9);c.lineTo(-8,hy+10);c.lineTo(-13,hy+4);c.fill();c.stroke()}
  else if(hr==7){c.fillRect(-11,hy-5,24,5);c.strokeRect(-11,hy-5,24,5);c.beginPath();c.moveTo(-11,hy-3);c.lineTo(-22+tr,hy-8+Math.sin(T*9)*3);c.lineTo(-22+tr,hy+2);c.fill()}
  else if(hr==6){c.beginPath();c.arc(1,hy-3,11.5,3.14,6.28);c.fill();c.fillStyle=HT?'#fff':'#ffd166';c.fillRect(-2,hy-6,15,6);c.strokeRect(-2,hy-6,15,6);c.fillStyle='#4cc9f0';c.fillRect(6,hy-4,5,3)}
  else{c.beginPath();c.moveTo(-14,hy-7);c.lineTo(1,hy-30);c.lineTo(16,hy-7);c.closePath();c.fill();c.stroke();c.fillRect(-15,hy-8,32,4)}
  if(hr!=6){c.fillStyle='#fff';c.fillRect(4,hy-3,6,5);c.fillStyle='#111';c.fillRect(7,hy-2,3,3)}}
 let ang=run?-.2+Math.sin(ph)*.3:-.4+Math.sin(T*3)*.05;
 if(p.ak){const a=atk(p),u=Math.min(1,p.at/a[0]),s=p.ad==1?[-.6,-2.6]:p.ad==2?[.6,2.2]:[-1.5,1.1];ang=p.ak==3?-1.2-u*5:s[0]+(s[1]-s[0])*Math.min(1,u*1.6)}
 c.save();c.translate(6,-43+bob);c.rotate(ang);c.lineCap='round';[['#000b',11],[L.c2,7]].forEach(([s,w])=>{c.strokeStyle=s;c.lineWidth=w;c.beginPath();c.moveTo(0,0);c.lineTo(14,0);c.stroke()});
 c.translate(14,0);c.fillStyle=sk;c.beginPath();c.arc(0,0,4.5,0,6.3);c.fill();if(p.cur>=0)drawWp(c,p.cur);
 c.restore();c.restore()}
const PVO={};
function put(cv,key,c,sk,k,t){const x=cv.getContext('2d'),p=PVO[key]||(PVO[key]={f:1,ak:0,at:0,ad:0,g:1,hs:0,dg:0,inv:0});p.c=c;p.sk=sk;p.cur=LG[c].w[0];let vx=0;p.ak=0;
 if(t!=null){const ph=(t/1000)%4.5;if(ph<1.5)vx=3;else if(ph>3){p.ak=ph>3.8?2:1;p.at=Math.floor(((ph-3)%.75)*30)}}
 x.clearRect(0,0,cv.width,cv.height);x.save();x.scale(k,k);drawChar(x,p,cv.width/2/k,cv.height*.9/k,vx,0);x.restore()}

// ---- PERSONAGENS COM ARTE: peças PNG (assets/legends) em esqueleto animado; sem as imagens usa o boneco desenhado em código ----
const RIGIMG={},TINT={};
function rigLoad(){LG.forEach((l,i)=>{const r=RIG[l.n.toLowerCase()],I=RIGIMG[i]={},ks=Object.keys(r);let n=0;
 ks.forEach(k=>{const im=new Image();im.onload=()=>{if(++n==ks.length)I.ok=1};im.src=(typeof RIGSRC!='undefined'&&RIGSRC[r[k].f])||'assets/legends/'+r[k].f;I[k]=im})})}
function rigPart(c,k,sk){const key=c+k+sk;if(TINT[key])return TINT[key];const im=RIGIMG[c][k],o=document.createElement('canvas');o.width=im.width;o.height=im.height;
 const x=o.getContext('2d'),f=SK[sk].f;if(f&&'filter' in x)x.filter=f;x.drawImage(im,0,0);return TINT[key]=o}
function angAt(p,u){const s=p.ad==1?[-.6,-2.6]:p.ad==2?[.6,2.2]:[-1.5,1.1];return p.ak==3?-1.2-u*5:s[0]+(s[1]-s[0])*Math.min(1,u*1.6)}
function drawRig(c,p,x,y,vx,vy){const L=LG[p.c],r=RIG[L.n.toLowerCase()],T=performance.now()/1000,run=p.g&&Math.abs(vx)>.8,ph=T*14,air=!p.g,K=.32;
 if(!p._g&&p.g){p.sq=7;if(CFG.parts&&p.rx!=null)for(let i=0;i<5;i++)parts.push({x:p.rx+(Math.random()-.5)*20,y:p.ry,vx:(Math.random()-.5)*3,vy:-Math.random()*2,l:20,c:'#ccd'})}
 p._g=p.g;if(p.sq>0)p.sq--;
 const sy=1+(p.g?-(p.sq||0)*.02:Math.min(.15,Math.abs(vy)*.01)),sx=2-sy,bob=run?-Math.abs(Math.sin(ph))*12:p.g?Math.sin(T*3)*3:0,tr=Math.max(-.5,Math.min(.5,-vx*p.f*.12)),P=k=>rigPart(p.c,k,p.sk);
 const D=(k,rot,oy)=>{const d=r[k];c.save();c.translate(d.ax,d.ay+oy);c.rotate(rot);c.drawImage(P(k),-d.px,-d.py);c.restore()};
 const LB=(k,a1,a2,oy,fn)=>{const d=r[k],o=P(k),ky=d.h*.5;c.save();c.translate(d.ax,d.ay+oy);c.rotate(a1);c.drawImage(o,0,0,d.w,ky+3,-d.px,-d.py,d.w,ky+3);
  c.translate(0,ky-d.py);c.rotate(a2);c.drawImage(o,0,ky,d.w,d.h-ky,-d.px,0,d.w,d.h-ky);if(fn)fn(d,ky);c.restore()};
 c.save();c.translate(x,y);c.scale(p.f*sx*K,sy*K);if(p.hs>0)c.rotate(-.25);
 c.globalAlpha=p.dg?.35:p.inv>0&&p.inv%6<3?.45:1;if(p.hs>0&&'filter' in c)c.filter='brightness(2) saturate(.3)';
 if(p.ult>=100&&!p.ak){const q=1+Math.sin(T*6)*.1,gr=c.createRadialGradient(0,-10,5,0,-10,110*q);gr.addColorStop(0,'#ffd16688');gr.addColorStop(1,'#ffd16600');c.fillStyle=gr;c.fillRect(-130,-130,260,150)}
 if(p.dg){c.fillStyle=L.col+'55';c.fillRect(-170,-250,90,250)}
 let F1,F2,B1,B2;
 if(air){F1=vy<0?-.6:-.2;F2=vy<0?.8:.3;B1=vy<0?.35:.1;B2=.6}
 else if(run){F1=-Math.sin(ph)*.75;F2=Math.max(0,Math.sin(ph-1))*.9+.05;B1=Math.sin(ph)*.75;B2=Math.max(0,-Math.sin(ph-1))*.9+.05}
 else if(p.ak){F1=-.35;F2=.1;B1=.4;B2=.1}else{F1=-.04;F2=.04;B1=.05;B2=.03}
 const aB=run?Math.sin(ph)*.8:.08+Math.sin(T*3)*.03;let aF=p.cur>=0?-.6:.1,WA=-.5;
 if(p.ak){const a=atk(p),u=Math.min(1,p.at/a[0]),g=angAt(p,u);aF=g-Math.PI/2;WA=g}else if(run){aF=-Math.sin(ph)*.8;WA=-.3}else if(p.cur>=0)aF+=Math.sin(T*3)*.03;
 D('acc',(run?-.25:0)+Math.sin(T*7+x*.05)*.1+tr*.5,bob);
 LB('armB',aB,run?Math.max(0,-Math.sin(ph))*.5:.1,bob);
 LB('legB',B1,B2,0);
 D('torso',tr*.5+(run?.08:0)+(p.ak?.1:0),bob*.4);
 LB('legF',F1,F2,0);
 D('head',-tr*.3+Math.sin(T*3)*.02,bob);
 const wk=p.cur>=0?(p.cur==L.w[0]?'w1':'w2'):0,a2=p.ak?0:.15;
 LB('armF',aF,a2,bob,(d,ky)=>{if(!wk)return;const w=r[wk];c.save();c.translate(d.hx,d.h*.92-ky);c.rotate(WA-aF-a2);
  if(p.cur==9){c.translate(34,0);const gr=c.createRadialGradient(0,0,2,0,0,46);gr.addColorStop(0,'#c77dffcc');gr.addColorStop(1,'#c77dff00');c.fillStyle=gr;c.fillRect(-46,-46,92,92)}
  if(w.fl)c.scale(-1,1);c.drawImage(rigPart(p.c,wk,0),-w.gx*w.w,-w.gy*w.h);c.restore()});
 if(p.ak&&CFG.parts){const a=atk(p),u=Math.min(1,p.at/a[0]);if(p.at>=a[1]-3&&p.at<=a[2]+6){const d=r.armF,R=(wk?r[wk].w:90)*.9+40,s0=angAt(p,Math.max(0,u-.35)),s1=angAt(p,u);
  c.save();c.translate(d.ax,d.ay+bob);c.strokeStyle=L.col+'88';c.lineWidth=16;c.lineCap='round';c.beginPath();c.arc(0,0,R,s0,s1,s1<s0);c.stroke();c.restore()}}
 c.restore()}
function drawChar(c,p,x,y,vx,vy){const I=RIGIMG[p.c];(I&&I.ok?drawRig:drawChar0)(c,p,x,y,vx,vy)}
rigLoad();
