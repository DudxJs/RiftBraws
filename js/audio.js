// ÁUDIO: efeitos e música 100% sintetizados (WebAudio), sem arquivos externos
const AU={c:null,iv:0,n:0,
 x(){if(!this.c){const A=window.AudioContext||window.webkitAudioContext;if(!A)return;this.c=new A()}if(this.c.state=='suspended')this.c.resume();return this.c},
 t(f,d,ty,v,sl,m){const c=this.x();if(!c)return;const vol=m?CFG.mus*CFG.mv:CFG.snd*CFG.vol;if(!vol)return;
  const o=c.createOscillator(),g=c.createGain(),n=c.currentTime;o.type=ty;o.frequency.setValueAtTime(f,n);
  if(sl)o.frequency.exponentialRampToValueAtTime(Math.max(20,f*sl),n+d);
  g.gain.setValueAtTime(Math.max(.0002,vol*v*.2),n);g.gain.exponentialRampToValueAtTime(.0002,n+d);o.connect(g);g.connect(c.destination);o.start(n);o.stop(n+d+.02)},
 n(f0,f1,d,v,q){const c=this.x();if(!c)return;const vol=CFG.snd*CFG.vol;if(!vol)return;
  if(!this.nb){const b=c.createBuffer(1,c.sampleRate,c.sampleRate),a=b.getChannelData(0);for(let i=0;i<a.length;i++)a[i]=Math.random()*2-1;this.nb=b}
  const s=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain(),t=c.currentTime;s.buffer=this.nb;f.type='bandpass';f.Q.value=q;f.frequency.setValueAtTime(f0,t);f.frequency.exponentialRampToValueAtTime(f1,t+d);
  g.gain.setValueAtTime(Math.max(.0002,vol*v*.5),t);g.gain.exponentialRampToValueAtTime(.0002,t+d);s.connect(f);f.connect(g);g.connect(c.destination);s.start(t,Math.random()*.5);s.stop(t+d+.02)},
 sfx(k){const N={sw1:[1800,600,.12,.7,2],sw2:[900,250,.24,1,1.5],g:[3200,800,.09,.9,.7],b:[500,2000,.12,.6,3]};if(N[k]){this.n(...N[k]);if(k=='g')this.t(170,.12,'sine',.7,.3);if(k=='b')this.t(260,.1,'triangle',.5,2.5);return}const F={hover:[1100,.04,'triangle',.4],click:[520,.09,'square',.6,1.8],back:[420,.09,'square',.5,.6],tog:[700,.05,'square',.4],ok:[440,.3,'square',.7,2],
  h:[220,.14,'square',1,.3],k:[110,.4,'sawtooth',1.2,.25],j:[300,.1,'triangle',.5,2],d:[800,.14,'sine',.5,.4],a:[300,.08,'sawtooth',.35,.5],p:[600,.12,'triangle',.7,2],u:[140,.55,'sawtooth',1,4],w:[523,.5,'square',.8,1.5]};
  const a=F[k];if(a)this.t(...a)},
 start(){this.x();if(this.iv)return;const S=[0,3,7,10,12,10,7,3],B=[0,0,5,3];
  this.iv=setInterval(()=>{if(!CFG.mus)return;const i=this.n++,b=B[i>>3&3];this.t(220*2**((S[i%8]+b)/12),.2,'square',.25,0,1);if(i%4==0)this.t(55*2**(b/12),.5,'sawtooth',.5,0,1)},240)}};
['pointerdown','keydown'].forEach(e=>addEventListener(e,()=>AU.start(),{once:true}));
function sfx(k){AU.sfx(k)}
document.addEventListener('click',e=>{const b=e.target.closest('button,.tile,a.back');if(b)AU.sfx(b.closest('.back')?'back':'click')});
document.addEventListener('pointerover',e=>{const b=e.target.closest('button,.tile');if(b&&!b.contains(e.relatedTarget))AU.sfx('hover')});
