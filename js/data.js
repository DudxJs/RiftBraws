// DADOS: armas, lendas, skins. Ataque = [duração, início, fim, dano, knockback, escala%, alcance, tamanho]. h = formato (0 lâmina,1 bloco,2 curva,3 esfera,4 arco), v = comprimento visual
const WP=[
{n:'Espada',k:'#d7e3ff',h:0,v:34,L:[16,4,9,6,5,.05,55,46],H:[30,10,16,13,8,.10,70,60]},
{n:'Martelo',k:'#c9a66b',h:1,v:30,L:[22,7,13,9,6,.07,60,60],H:[42,18,26,20,10,.15,80,80]},
{n:'Lança',k:'#e8e8e8',h:0,v:60,L:[18,5,10,6,5,.05,95,30],H:[34,12,18,14,8,.11,125,36]},
{n:'Katares',k:'#ff8fa3',h:0,v:14,L:[10,3,6,4,4,.04,40,40],H:[22,7,12,9,6,.08,50,50]},
{n:'Machado',k:'#b8c0cc',h:2,v:32,L:[20,6,11,8,6,.06,62,54],H:[36,14,20,15,9,.12,72,70]},
{n:'Arco',k:'#a0e870',h:4,v:30,L:[16,5,8,5,4,.04,170,22],H:[30,12,16,10,7,.09,240,24]},
{n:'Manoplas',k:'#ffd166',h:3,v:6,L:[12,3,7,5,5,.05,42,50],H:[26,9,14,11,8,.10,52,60]},
{n:'Foice',k:'#c77dff',h:2,v:44,L:[17,5,10,6,5,.05,64,60],H:[32,11,17,13,8,.10,76,74]},
{n:'Canhão',k:'#6c757d',h:3,v:26,L:[20,6,11,8,6,.06,60,60],H:[38,16,22,16,10,.12,75,70]},
{n:'Orbe',k:'#4cc9f0',h:3,v:14,L:[16,4,9,6,5,.05,58,54],H:[30,11,17,12,8,.10,70,64]},
{n:'Montante',k:'#9db4d9',h:0,v:52,L:[20,6,11,8,6,.06,75,56],H:[40,16,24,18,10,.14,95,76]},
{n:'Blasters',k:'#ff9f1c',h:1,v:12,L:[14,4,7,4,4,.03,150,20],H:[28,10,14,9,6,.08,210,22]},
{n:'Lança-foguete',k:'#ff5d5d',h:0,v:56,L:[18,5,10,6,6,.05,90,34],H:[36,14,20,14,10,.12,115,42]},
{n:'Botas',k:'#8ecae6',h:1,v:8,L:[12,3,7,5,5,.05,48,40],H:[26,9,14,11,8,.10,60,50]}];
const UN={L:[12,3,7,4,4,.04,34,40],H:[22,8,13,7,6,.07,40,46]}; // desarmado
const ULT=[36,20,25,18,11,.12,0,0];
// Lendas originais. Cada uma só usa suas 2 armas (como no Brawlhalla). str=dano, dex=esquiva, def=resistência, spd=velocidade
const LG=[
{n:'Kael',r:'Espadachim',col:'#4cc9f0',w:[0,2],str:6,dex:6,def:5,spd:6},
{n:'Brokk',r:'Tanque',col:'#e76f51',w:[1,4],str:8,dex:3,def:8,spd:4},
{n:'Lyra',r:'Arqueira',col:'#a0e870',w:[5,11],str:4,dex:8,def:4,spd:7},
{n:'Nyx',r:'Assassina',col:'#c77dff',w:[7,3],str:6,dex:7,def:4,spd:7},
{n:'Orin',r:'Mago',col:'#48cae4',w:[9,12],str:5,dex:6,def:5,spd:6},
{n:'Tarn',r:'Guerreiro',col:'#ffd166',w:[10,6],str:8,dex:4,def:6,spd:5},
{n:'Zeph',r:'Artilheiro',col:'#ff5d5d',w:[12,8],str:7,dex:5,def:5,spd:5},
{n:'Rue',r:'Velocista',col:'#f72585',w:[13,11],str:5,dex:8,def:4,spd:8}];
LG.forEach(l=>{l.wt=1+(l.def-5)*.07;l.sp=3.4+l.spd*.28;l.jp=13.2+l.dex*.22});
const SK=[{n:'Clássico',a:null,b:'#ffffff44',pat:'solid'},{n:'Tigre',a:'#ff9f1c',b:'#2b1b0e',pat:'stripe'},{n:'Cereja',a:'#d62839',b:'#ffd6dc',pat:'dots'},
{n:'Xadrez',a:'#222',b:'#eee',pat:'checker'},{n:'Oceano',a:'#0077b6',b:'#90e0ef',pat:'wave'},{n:'Galáxia',a:'#1b0a3c',b:'#fff',pat:'stars'},
{n:'Camuflado',a:'#4b5d2a',b:'#2f3b19',pat:'camo'},{n:'Ouro',a:'#b8860b',b:'#fff3b0',pat:'grad'}];
const COLS=['#4cc9f0','#f72585','#ffd166','#06d6a0'];
const plats=t=>[{x:300,w:600,y:480},{x:370,w:190,y:350,s:1},{x:640,w:190,y:350,s:1},{x:520+Math.sin(t/80)*170,w:160,y:215,s:1,dx:Math.cos(t/80)*170/80}];
const storm=t=>t%1800>1300;
