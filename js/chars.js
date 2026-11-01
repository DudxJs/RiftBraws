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
function put(cv,key,c,sk,k,t){const x=cv.getContext('2d'),p=PVO[key]||(PVO[key]={f:1,ak:0,at:0,ad:0,g:1,hs:0,dg:0,inv:0,has:[1,1]});p.c=c;p.sk=sk;p.cur=LG[c].w[0];let vx=0;p.ak=0;
 if(t!=null){const ph=(t/1000)%4.5;if(ph<1.5)vx=3;else if(ph>3){p.ak=ph>3.8?2:1;p.at=Math.floor(((ph-3)%.75)*30)}}
 x.clearRect(0,0,cv.width,cv.height);x.save();x.scale(k,k);drawChar(x,p,cv.width/2/k,cv.height*.9/k,vx,0);x.restore()}

// ---- PERSONAGENS COM ARTE: peças PNG (assets/legends) em esqueleto animado; sem as imagens usa o boneco desenhado em código ----
const RIGIMG={},TINT={};
function rigLoad(){LG.forEach((l,i)=>{const r=RIG[l.n.toLowerCase()],I=RIGIMG[i]={},ks=Object.keys(r);let n=0;
 ks.forEach(k=>{const im=new Image();im.onload=()=>{if(++n==ks.length)I.ok=1};im.src=(typeof RIGSRC!='undefined'&&RIGSRC[r[k].f])||'assets/legends/'+r[k].f;I[k]=im})})}
const hd=(a,b)=>((a-b+540)%360)-180,cl=t=>t<0?0:t>1?1:t,ss=(t,m,w)=>{const u=cl((t-(m-w))/(2*w));return u*u*(3-2*u)};
function hsl(c){let[r,g,b]=typeof c=='string'?[1,3,5].map(i=>parseInt(c.substr(i,2),16)):c;r/=255;g/=255;b/=255;const M=Math.max(r,g,b),m=Math.min(r,g,b),l=(M+m)/2,d=M-m;let h=0,s=0;
 if(d){s=d/(1-Math.abs(2*l-1));h=M==r?((g-b)/d+6)%6:M==g?(b-r)/d+2:(r-g)/d+4;h*=60}return[h,s,l]}
function rgb(h,s,l){h=((h%360)+360)%360;const c=(1-Math.abs(2*l-1))*s,x=c*(1-Math.abs(h/60%2-1)),m=l-c/2,[r,g,b]=[[c,x,0],[x,c,0],[0,c,x],[0,x,c],[x,0,c],[c,0,x]][h/60|0];return[(r+m)*255,(g+m)*255,(b+m)*255]}
// Skin = troca de paleta só na roupa (pele e contornos escuros ficam). Feita em fila, 1 peça por quadro, para não travar; até ficar pronta usa a cor original
const TQ={a:[],q:{},t:0},TM={},NT=3,GUNS=[8,11,13];
function bake(j){const{c,k,sk,key}=j,im=RIGIMG[c][k],o=document.createElement('canvas');o.width=im.width;o.height=im.height;const x=o.getContext('2d'),s=SK[sk];x.drawImage(im,0,0);
 try{const d=x.getImageData(0,0,o.width,o.height),a=d.data,sh=hsl(LG[c].sk),mk=c+'_'+sk,M=TM[mk]||(TM[mk]=new Int32Array(32768));
  for(let i=0;i<a.length;i+=4){if(a[i+3]<10)continue;const q=(a[i]>>3)<<10|(a[i+1]>>3)<<5|a[i+2]>>3;let v=M[q];
   if(!v){const h=hsl([a[i],a[i+1],a[i+2]]);if(h[2]<.2||(Math.abs(hd(h[0],sh[0]))<26&&Math.abs(h[1]-sh[1])<.4&&Math.abs(h[2]-sh[2])<.38))v=-1;
    else{const n=rgb(h[0]+s.h,Math.min(1,h[1]*s.s),Math.min(.95,h[2]*s.l));v=1+(((n[0]|0)<<16)|((n[1]|0)<<8)|(n[2]|0))}M[q]=v}
   if(v>0){const w=v-1;a[i]=w>>16&255;a[i+1]=w>>8&255;a[i+2]=w&255}}
  x.putImageData(d,0,0)}catch(e){}
 return TINT[key]=o}
function rigPart(c,k,sk){const im=RIGIMG[c][k];if(!sk||k[0]=='w')return im;const key=c+k+sk;if(TINT[key])return TINT[key];if(!TQ.q[key]){TQ.q[key]=1;TQ.a.push({c,k,sk,key})}return im}
function rigHit(c,k){const key=c+k+'h';if(TINT[key])return TINT[key];const im=RIGIMG[c][k],o=document.createElement('canvas');o.width=im.width;o.height=im.height;const x=o.getContext('2d');
 x.drawImage(im,0,0);x.globalCompositeOperation='source-atop';x.fillStyle='#fff';x.fillRect(0,0,o.width,o.height);return TINT[key]=o}
// Dobra uma peça em faixas: cada faixa gira um pouco mais que a anterior (curva suave). up=true cresce para cima (tronco)
function bend(c,o,d,A,N,th,up,sl,dry){const sh=d.h/N,Hd=sh*(sl||1),dv=a=>up?[Math.sin(a),-Math.cos(a)]:[-Math.sin(a),Math.cos(a)],t0=th(.5/N),py=up?d.h-d.py:d.py;
 let v=dv(t0),x=A[0]-v[0]*py,y=A[1]-v[1]*py,last=t0;const pts=[[x,y]];
 for(let i=0;i<N;i++){const a=th((i+.5)/N);if(!dry){c.save();c.translate(x,y);c.rotate(a);c.drawImage(o,0,up?d.h-(i+1)*sh:i*sh,d.w,sh+1,-d.px,up?-Hd-1:0,d.w,Hd+1);c.restore()}
  v=dv(a);x+=v[0]*Hd;y+=v[1]*Hd;pts.push([x,y]);last=a}
 return{pts,a:last}}
function atkAng(p){const a=atk(p),s=p.ak==3?[-1.2,-6.2]:p.ad==1?[-.6,-2.6]:p.ad==2?[.6,2.2]:[-1.5,1.1],d=s[1]-s[0];let u;
 if(p.at<a[1])u=-.22*Math.sin(p.at/Math.max(1,a[1])*1.57);else if(p.at<=a[2]){const k=(p.at-a[1])/Math.max(1,a[2]-a[1]);u=1-(1-k)*(1-k)}else u=1;return[s[0]+d*u,u]}
function drawRig(c,p,x,y,vx,vy){const L=LG[p.c],r=RIG[L.n.toLowerCase()],T=performance.now()/1000,run=p.g&&Math.abs(vx)>.8,air=!p.g,K=.32,A=p.A||(p.A={}),hf=p.hs>0&&p.hs%6<3,sg=CFG.swap?1:-1;
 if(TQ.a.length&&T*1000-TQ.t>10){TQ.t=T*1000;bake(TQ.a.shift())}
 const P=k=>hf&&k[0]!='w'?rigHit(p.c,k):rigPart(p.c,k,p.sk);
 if(p.g)p.ph=(p.ph||0)+Math.min(.45,Math.abs(vx)*.075);const ph=p.ph||0,lf=Math.sin(ph),cs=Math.cos(ph),br=Math.sin(T*2.4),armed=p.cur>=0,gun=armed&&GUNS.includes(p.cur);
 const oi=armed?(p.cur==L.w[0]?1:0):-1,hasO=oi>=0&&p.has&&p.has[oi],ow=hasO?L.w[oi]:-1;
 if(!p._g&&p.g){p.sq=7;if(CFG.parts&&p.rx!=null)for(let i=0;i<5;i++)parts.push({x:p.rx+(Math.random()-.5)*20,y:p.ry,vx:(Math.random()-.5)*3,vy:-Math.random()*2,l:20,c:'#ccd'})}
 p._g=p.g;if(p.sq>0)p.sq--;
 const sy=1+(p.g?-(p.sq||0)*.02:Math.min(.15,Math.abs(vy)*.01)),sx=2-sy;
 let F1,F2,F3=0,B1,B2,B3=0,f1,f2,f3=0,b1,b2,b3=0,lean,bob=0,WA=armed?(gun?-.08:-.5)+(run?lf*.1:br*.03):0,g=0,u=0;
 if(p.hs>0){F1=-.5;F2=.6;B1=.6;B2=.5;f1=-1.2;f2=.5;b1=1;b2=.4;lean=-.3}
 else if(p.dg){F1=-.7;F2=.9;B1=.5;B2=.8;f1=-.4;f2=-.6;b1=.6;b2=-.4;lean=.5}
 else if(p.ak){const q=atkAng(p);g=q[0];u=q[1];f1=g-Math.PI/2;f2=-.7*(1-Math.max(0,u));lean=.28*Math.max(0,u)-(u<0?.12:0);F1=-.1-.35*Math.max(0,u);F2=.2;B1=.1+.4*Math.max(0,u);B2=.1;b1=.3;b2=-.3;bob=2;WA=g}
 else if(air){const up=vy<0;F1=up?-.7:-.25;F2=up?1.1:.35;F3=.3;B1=up?.35:.1;B2=up?.9:.2;B3=.2;f1=up?-1.1:-.6;f2=-.4;b1=up?.8:.5;b2=-.2;lean=up?.06:-.04;if(armed){f1=gun?-1.35:-.9;f2=gun?-.15:-.4}}
 else if(run){F1=-lf*.85;F2=Math.max(0,cs)*1.2+.1;F3=cs*.25;B1=lf*.85;B2=Math.max(0,-cs)*1.2+.1;B3=-cs*.25;f1=lf*.9;f2=-(.3+Math.max(0,-cs)*.5);b1=-lf*.9;b2=-(.3+Math.max(0,cs)*.5);lean=.14;bob=-Math.abs(cs)*9;if(armed){f1=(gun?-1.35:-.55)+lf*.1;f2=gun?-.15:-.5}}
 else{F1=-.06;F2=.08;B1=.1;B2=.05;f1=.08+br*.03;f2=-.12;b1=.1;b2=-.1;lean=br*.012;bob=br*2.5;if(armed){f1=(gun?-1.35:-.5)+br*.03;f2=gun?-.15:-.5}}
 let WB=0;if(hasO&&!p.hs&&!p.dg){b1=run?-.3-lf*.2:-.3+br*.03;b2=-.7;WB=GUNS.includes(ow)?-.12:.4}
 const tg={F1,F2,F3,B1,B2,B3,f1,f2,f3,b1,b2,b3,lean,bob,WA,WB};
 for(const k in tg){const rt=p.ak&&'f1f2WAlean'.includes(k)?.6:air||p.hs>0?.4:.28;A[k]=A[k]==null?tg[k]:A[k]+(tg[k]-A[k])*rt}
 A.head=(A.head||0)+(-A.lean*.7-(A.head||0))*.15;
 const ac=p.ac||(p.ac={a:0,v:0});ac.v+=((run?-.35:0)-vx*p.f*.05-ac.a)*.1;ac.v*=.85;ac.a+=ac.v;const flut=Math.sin(T*7+x*.05)*.08*(1+run);
 c.save();c.translate(x,y);c.scale(p.f*sx*K,sy*K);if(p.hs>0)c.rotate(-.2);
 c.globalAlpha=p.dg?.4:p.inv>0&&p.inv%6<3?.45:1;
 if(p.ult>=100&&!p.ak){const q=1+Math.sin(T*6)*.1,gr=c.createRadialGradient(0,-10,5,0,-10,110*q);gr.addColorStop(0,'#ffd16688');gr.addColorStop(1,'#ffd16600');c.fillStyle=gr;c.fillRect(-130,-130,260,150)}
 if(p.dg){c.fillStyle=L.col+'55';c.fillRect(-170,-250,90,250)}
 const bb=A.bob,T0=r.torso,tth=t=>A.lean*Math.pow(t,1.2),tp=bend(c,P('torso'),T0,[T0.ax,T0.ay+bb],NT,tth,true,1,true);
 const at=f=>{const i=Math.min(NT-1,f*NT|0),u=f*NT-i,a=tp.pts[i],b=tp.pts[i+1];return[a[0]+(b[0]-a[0])*u,a[1]+(b[1]-a[1])*u]},dl=f=>{const a=at(f);return[a[0]-T0.ax,a[1]-(T0.ay+bb+(T0.h-T0.py)-f*T0.h)]};
 const piece=(k,ax,ay,rot)=>{const d=r[k];c.save();c.translate(ax,ay);c.rotate(rot);c.drawImage(P(k),-d.px,-d.py);c.restore()};
 const limb=(k,a1,a2,a3,N,ox,oy,sl)=>{const d=r[k];return bend(c,P(k),d,[d.ax*sg+ox,d.ay+oy],N,t=>a1+a2*ss(t,.5,.15)+a3*ss(t,.9,.07),false,sl)};
 const hold=(e,d,wk,ang,id)=>{const w=r[wk],v=[-Math.sin(e.a),Math.cos(e.a)],n=e.pts.length-1,hx=e.pts[n][0]-v[0]*d.h*.08+Math.cos(e.a)*d.hx,hy=e.pts[n][1]-v[1]*d.h*.08+Math.sin(e.a)*d.hx;
  c.save();c.translate(hx,hy);c.rotate(ang);
  if(id==9){c.translate(34,0);const gr=c.createRadialGradient(0,0,2,0,0,46);gr.addColorStop(0,'#c77dffcc');gr.addColorStop(1,'#c77dff00');c.fillStyle=gr;c.fillRect(-46,-46,92,92)}
  if(w.fl)c.scale(-1,1);c.drawImage(rigPart(p.c,wk,0),-w.gx*w.w,-w.gy*w.h);c.restore()};
 const sh=dl(.9),hdp=dl(1),ach=dl(.88);
 piece('acc',r.acc.ax+ach[0],r.acc.ay+bb+ach[1],ac.a+flut+tp.a*.4);
 const eb=limb('armB',A.b1,A.b2,A.b3,6,sh[0],bb+sh[1]);if(hasO)hold(eb,r.armB,oi?'w2':'w1',A.WB,ow);
 limb('legB',A.B1,A.B2,A.B3,7,0,bb,(r.legB.h-bb)/r.legB.h);
 bend(c,P('torso'),T0,[T0.ax,T0.ay+bb],NT,tth,true,1);
 limb('legF',A.F1,A.F2,A.F3,7,0,bb,(r.legF.h-bb)/r.legF.h);
 piece('head',r.head.ax+hdp[0],r.head.ay+bb+hdp[1],A.head+tp.a*.6+Math.sin(T*2.4)*.015);
 const wk=armed?(p.cur==L.w[0]?'w1':'w2'):0,d=r.armF,e=limb('armF',A.f1,A.f2,A.f3,6,sh[0],bb+sh[1]);
 if(wk)hold(e,d,wk,A.WA,p.cur);
 if(p.ak&&CFG.parts){const a=atk(p);if(p.at>=a[1]-3&&p.at<=a[2]+6){const sv=p.at;p.at=Math.max(a[1],sv-4);const g0=atkAng(p)[0];p.at=sv;
  const R=(wk?r[wk].w:90)*.9+40;c.save();c.translate(d.ax*sg+sh[0],d.ay+bb+sh[1]);c.strokeStyle=L.col+'88';c.lineWidth=16;c.lineCap='round';c.beginPath();c.arc(0,0,R,g0,g,g<g0);c.stroke();c.restore()}}
 c.restore()}
function drawChar(c,p,x,y,vx,vy){const I=RIGIMG[p.c];(I&&I.ok?drawRig:drawChar0)(c,p,x,y,vx,vy)}
rigLoad();
