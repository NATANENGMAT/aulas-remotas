import re,json,base64
D="/workspace/aulas-remotas/funcao-2grau/"
h=open(D+"index.html",encoding="utf-8").read()
m=re.search(r'<script type="application/hyperframes-slideshow\+json">(.*?)</script>',h,re.S)
island=json.loads(m.group(1)); h=h.replace(m.group(0),"")
# scenes start times
starts=[float(x) for x in re.findall(r'class="clip scene"[^>]*data-start="([\d.]+)"',h)]
stops=[]; notes=[]
for k,sl in enumerate(island["slides"]):
    for t in sl["fragments"]: stops.append({"s":k,"t":t})
    notes.append(sl["notes"])
# inline assets
b64=lambda p:base64.b64encode(open(D+p,"rb").read()).decode()
h=h.replace('url("assets/fonts/patrick.woff2")',f'url("data:font/woff2;base64,{b64("assets/fonts/patrick.woff2")}")')
h=h.replace('url("assets/fonts/caveat.woff2")',f'url("data:font/woff2;base64,{b64("assets/fonts/caveat.woff2")}")')
gs=open(D+"assets/gsap.min.js",encoding="utf-8").read()
h=h.replace('<script src="assets/gsap.min.js"></script>',"<script>"+gs+"</script>")
h=re.sub(r"<script>if\(!window\.__hf\).*?</script>\n?","",h,flags=re.S)
# layout: scale stage to window
h=h.replace("html,body{width:1920px;height:1080px;overflow:hidden;background:var(--papel)}",
 "html,body{width:100%;height:100%;overflow:hidden;background:#fbf8f1;cursor:pointer}\n#root{position:absolute;left:0;top:0;width:1920px;height:1080px;transform-origin:0 0}\n.scene{display:none}\n#hud{position:fixed;left:50%;bottom:6px;transform:translateX(-50%);font:16px/1 system-ui,sans-serif;color:#1f2a33;opacity:.55;z-index:9;user-select:none}\n#notes{position:fixed;left:3%;right:3%;bottom:3%;max-height:40%;overflow:auto;background:#fff;border:3px solid #1f2a33;border-radius:14px;padding:16px 20px;font:22px/1.4 system-ui,sans-serif;color:#1f2a33;z-index:10;display:none}")
h=h.replace("<title>Função do 2º grau · A máquina ( )²</title>","<title>A máquina ( )² · Função do 2º grau</title>")
nav='''
(function(){
 const STOPS=%s, NOTES=%s;
 const scenes=[...document.querySelectorAll('.scene')], root=document.getElementById('root');
 const hud=document.getElementById('hud'), nb=document.getElementById('notes');
 let i=0, busy=null;
 function fit(){const k=Math.min(innerWidth/1920,innerHeight/1080);root.style.transform='translate('+((innerWidth-1920*k)/2)+'px,'+((innerHeight-1080*k)/2)+'px) scale('+k+')';}
 function show(s){scenes.forEach((e,k)=>e.style.display=k===s?'block':'none');}
 function upd(){hud.textContent='Slide '+(STOPS[i].s+1)+'/'+NOTES.length+'  ·  clique '+(i+1)+'/'+STOPS.length+'  ·  → avança  ← volta  F tela cheia  N falas';nb.textContent=NOTES[STOPS[i].s];}
 function go(n){
  if(n<0||n>=STOPS.length)return;
  if(busy){busy.kill();busy=null;MASTER.time(STOPS[i].t);}
  const to=STOPS[n], from=STOPS[i];
  if(n>i&&to.s===from.s){busy=MASTER.tweenTo(to.t,{ease:'none',onComplete:()=>{busy=null;}});}
  else{MASTER.time(to.t);show(to.s);}
  i=n;upd();
 }
 addEventListener('resize',fit);fit();
 addEventListener('keydown',e=>{
  if(e.key==='ArrowRight'||e.key===' '||e.key==='PageDown'||e.key==='Enter'){go(i+1);e.preventDefault();}
  else if(e.key==='ArrowLeft'||e.key==='PageUp'||e.key==='Backspace'){go(i-1);e.preventDefault();}
  else if(e.key==='f'||e.key==='F'){document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen();}
  else if(e.key==='n'||e.key==='N'){nb.style.display=nb.style.display==='block'?'none':'block';}
  else if(e.key==='Home'){go(0);}
 });
 addEventListener('click',e=>{go(e.clientX<innerWidth*0.15?i-1:i+1);});
 MASTER.time(STOPS[0].t);show(0);upd();
 window.__go=go;
})();
''' % (json.dumps(stops),json.dumps(notes,ensure_ascii=False))
h=h.replace('window.__timelines["root"] = MASTER;','window.__timelines["root"] = MASTER;\n'+nav)
h=h.replace("<body>","<body>\n<div id=\"hud\"></div><div id=\"notes\"></div>",1)
open(D+"maquina-quadrado.html","w",encoding="utf-8").write(h)
print(len(h)//1024,"KB",len(stops),"paradas")
