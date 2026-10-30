// REDE (WebRTC via PeerJS): host autoritativo, convidados enviam input
function begin(){G.items=[];iid=0}
const say=s=>$('ss').textContent=s;
function startLocal(){mode='l';G.lobby=0;nid=0;const a=newP(nm(),CFG.legend);a.sk=CFG.skin;me=a.id;G.ps=[a];for(let i=0;i<CFG.bots;i++){const b=newP('Bot'+(i+1),Math.random()*LG.length|0,1);b.sk=Math.random()*SK.length|0;G.ps.push(b)}begin()}
function hostRoom(){code=[...Array(5)].map(()=>'ABCDEFGHJKMNPQRSTUVWXYZ23456789'[Math.random()*31|0]).join('');
 say('Criando sala...');peer=new Peer('rb'+code);
 peer.on('error',e=>e.type=='unavailable-id'?hostRoom():say('Erro: '+e.type+' (tente de novo)'));
 peer.on('open',()=>{mode='h';const a=newP(nm(),CFG.legend);a.sk=CFG.skin;me=a.id;G.ps.push(a);G.lobby=1;begin()});
 peer.on('connection',c=>{
  c.on('data',d=>{if(d.t=='h'){if(G.ps.length>=4){c.send({t:'full'});return}
    const p=newP(String(d.n).slice(0,10),d.c%LG.length);p.sk=d.s|0;c.pid=p.id;conns[p.id]=c;G.ps.push(p);c.send({t:'w',id:p.id})}
   else if(d.t=='i'){const p=G.ps.find(q=>q.id==c.pid);if(p){p.press|=d.i&~p.raw;p.raw=d.i}}});
  c.on('close',()=>{delete conns[c.pid];G.ps=G.ps.filter(p=>p.id!=c.pid)})})}
function joinRoom(k){k=k.trim().toUpperCase();code=k;if(!k)return say('Digite o código da sala');
 say('Conectando...');peer=new Peer();peer.on('error',e=>say('Erro: '+e.type));
 peer.on('open',()=>{conn=peer.connect('rb'+k,{reliable:true});
  conn.on('open',()=>{conn.send({t:'h',n:nm(),c:CFG.legend,s:CFG.skin});mode='gst';G.lobby=1;begin()});
  conn.on('data',d=>{if(d.t=='w')me=d.id;else if(d.t=='s')apply(d);else if(d.t=='full'){say('Sala cheia');location.reload()}});
  conn.on('close',()=>{alert('Conexão com o host perdida');location.reload()})})}
function startMatch(){G.lobby=0;G.win=null;G.ps.forEach(p=>p.rs=30);fx(['s',0,0,'ok'])}
function addBot(){if(G.ps.length>=4)return;const b=newP('Bot',Math.random()*LG.length|0,1);b.sk=Math.random()*SK.length|0;G.ps.push(b)}
