// ÁUDIO: efeitos e música 100% sintetizados (WebAudio), sem arquivos externos
const AU={c:null,iv:0,n:0,
 x(){if(!this.c){const A=window.AudioContext||window.webkitAudioContext;if(!A)return;this.c=new A()}if(this.c.state=='suspended')this.c.resume();return this.c},
 t(f,d,ty,v,sl,m){const c=this.x();if(!c)return;const vol=m?CFG.mus*CFG.mv:CFG.snd*CFG.vol;if(!vol)return;
  const o=c.createOscillator(),g=c.createGain(),n=c.currentTime;o.type=ty;o.frequency.setValueAtTime(f,n);
  if(sl)o.frequency.exponentialRampToValueAtTime(Math.max(20,f*sl),n+d);
  g.gain.setValueAtTime(Math.max(.0002,vol*v*.2),n);g.gain.exponentialRampToValueAtTime(.0002,n+d);o.connect(g);g.connect(c.destination);o.start(n);o.stop(n+d+.02)},
 sfx(k){const F={hover:[1100,.04,'triangle',.4],click:[520,.09,'square',.6,1.8],back:[420,.09,'square',.5,.6],tog:[700,.05,'square',.4],ok:[440,.3,'square',.7,2],
  h:[220,.14,'square',1,.3],k:[110,.4,'sawtooth',1.2,.25],j:[300,.1,'triangle',.5,2],d:[800,.14,'sine',.5,.4],a:[300,.08,'sawtooth',.35,.5],p:[600,.12,'triangle',.7,2],u:[140,.55,'sawtooth',1,4],w:[523,.5,'square',.8,1.5]};
  const a=F[k];if(a)this.t(...a)},
 start(){this.x();if(this.iv)return;const S=[0,3,7,10,12,10,7,3],B=[0,0,5,3];
  this.iv=setInterval(()=>{if(!CFG.mus)return;const i=this.n++,b=B[i>>3&3];this.t(220*2**((S[i%8]+b)/12),.2,'square',.25,0,1);if(i%4==0)this.t(55*2**(b/12),.5,'sawtooth',.5,0,1)},240)}};
['pointerdown','keydown'].forEach(e=>addEventListener(e,()=>AU.start(),{once:true}));
function sfx(k){AU.sfx(k)}
document.addEventListener('click',e=>{const b=e.target.closest('button,.tile,a.back');if(b)AU.sfx(b.closest('.back')?'back':'click')});
document.addEventListener('pointerover',e=>{const b=e.target.closest('button,.tile');if(b&&!b.contains(e.relatedTarget))AU.sfx('hover')});
