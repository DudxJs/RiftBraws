// ESTADO GLOBAL, CONFIG e ENTRADA
const $=i=>document.getElementById(i);
const W=1200,H=700,cv=$('c'),g=cv.getContext('2d');cv.width=W;cv.height=H;
let G={t:0,ps:[],items:[],win:null,wt:0},PL=plats(0),mode='',me=0,nid=0,iid=0,conns={},outq=[],parts=[],shake=0,peer,conn,keys={},code='';
const CFG=Object.assign({name:'',stocks:3,shake:1,parts:1,snd:1,vol:.5,mus:1,mv:.35,fps:0,legend:0,skin:0},JSON.parse(localStorage.getItem('rb_cfg')||'{}'));
const save=()=>localStorage.setItem('rb_cfg',JSON.stringify(CFG));
const nm=()=>CFG.name.trim()||'Jogador'+(1+Math.random()*99|0);
function newP(name,c,bot){return{id:++nid,name,c,bot,sk:0,cur:-1,has:[0,0],x:600,y:-60,vx:0,vy:0,f:1,dmg:0,stocks:CFG.stocks,ult:0,ak:0,at:0,ad:0,hit:[],hs:0,dg:0,inv:0,cd:0,dt:0,jumps:2,g:0,rs:30,out:0,pi:0,raw:0,press:0}}
// A/D mover · W/Espaço pular · S baixo · J leve · K pesado · L esquiva · I ultimate · E pegar/arremessar arma · Q trocar arma
const KM={KeyA:1,ArrowLeft:1,KeyD:2,ArrowRight:2,KeyW:20,ArrowUp:20,Space:16,KeyS:8,ArrowDown:8,KeyJ:32,KeyZ:32,KeyK:64,KeyX:64,KeyL:128,KeyC:128,KeyI:256,KeyV:256,KeyE:512,KeyB:512,KeyQ:1024,KeyN:1024};
addEventListener('keydown',e=>{if(e.code=='Escape'&&mode&&confirm('Sair da partida?'))location.reload();if(KM[e.code]){keys[e.code]=1;if(mode)e.preventDefault()}});
addEventListener('keyup',e=>delete keys[e.code]);addEventListener('blur',()=>keys={});
let tm=0;const getInput=()=>Object.keys(keys).reduce((a,k)=>a|KM[k],tm);

// Controles de toque (aparecem só em telas touch)
const tc=document.createElement('div');tc.id='tc';
[['◀',1,'l1'],['▶',2,'l2'],['▲',4,'l3'],['▼',8,'l4'],['PULO',16,'r1'],['J',32,'r2'],['K',64,'r3'],['ESQ',128,'r4'],['ULT',256,'r5'],['E',512,'r6']].forEach(([t,b,c])=>{
 const e=document.createElement('button');e.textContent=t;e.className=c;
 e.onpointerdown=ev=>{ev.preventDefault();tm|=b;e.classList.add('on')};
 ['pointerup','pointercancel','pointerleave'].forEach(n=>e['on'+n]=()=>{tm&=~b;e.classList.remove('on')});tc.appendChild(e)});
document.body.appendChild(tc);
