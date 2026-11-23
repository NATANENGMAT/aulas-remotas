import json
OUT="/workspace/aulas-remotas/funcao-2grau/index.html"
M="−"  # sinal de menos

def fmt(n): return (M+str(abs(n))) if n<0 else str(n)
def numhtml(n):
    return f'<span class="neg">{M}</span>{abs(n)}' if n<0 else str(n)

def scene(sid, label, start, title, kicker, nums, steps_spec, notes, mirror=False):
    """steps_spec: list of dicts {kind: pick|split|result|pairsplit|final, round:i, d:float, cap:str}"""
    h=[]; js=[]; frags=[]
    t=0.0
    # ---------- HTML ----------
    rounds=[]
    for i,n in enumerate(nums):
        r=n*n
        rounds.append(f'''
      <div class="line" data-layout-allow-overlap id="{sid}-L{i}">
        <span class="par">(</span><span class="slot" id="{sid}-slot{i}"><span class="num" id="{sid}-num{i}">{numhtml(n)}</span></span><span class="cl">)<span class="sq" id="{sid}-sq{i}">2</span></span><span class="mul" id="{sid}-mul{i}"><span class="dot">·</span><span class="par">(</span><span class="num2" id="{sid}-n2{i}">{numhtml(n)}</span><span class="par">)</span></span><span class="res" id="{sid}-res{i}"><span class="eq">=</span><span class="val">{r}</span></span>
      </div>''')
    cards=''.join(f'<span class="card" id="{sid}-card{i}">{numhtml(n)}</span>' for i,n in enumerate(nums))
    chips=''.join(f'<span class="chip" id="{sid}-chip{i}"><span class="par">(</span> {numhtml(n)} <span class="par">)</span>² = <b>{n*n}</b></span>' for i,n in enumerate(nums))
    mchips=''
    if mirror:
        mchips=''.join(f'<span class="chip mir" id="{sid}-mir{i}"><span class="par">(</span> {abs(n)} <span class="par">)</span>² = <b>{n*n}</b></span>' for i,n in enumerate(nums))
    caps=''.join(f'<div class="cap" data-layout-allow-overlap id="{sid}-cap{k}">{s["cap"]}</div>' for k,s in enumerate(steps_spec) if s.get("cap"))
    note=''
    # ---------- JS ----------
    js.append(f'const tl=gsap.timeline();')
    js.append(f'const q=(s)=>"#{sid}-"+s;')
    # initial states
    js.append(f'gsap.set("#{sid} .line",{{opacity:0}});gsap.set("#{sid} .cap",{{opacity:0,y:20}});gsap.set("#{sid} .chip",{{opacity:0,y:30}});')
    js.append(f'gsap.set("#{sid} .mul",{{opacity:0,x:-40}});gsap.set("#{sid} .res",{{opacity:0,scale:.6,transformOrigin:"0% 60%"}});gsap.set("#{sid} .num",{{opacity:0}});gsap.set("#{sid} .num2",{{opacity:0}});')
    # intro
    js.append(f'gsap.set("#{sid}-L0",{{opacity:1}});gsap.set("#{sid}-cap0",{{opacity:1,y:0}});')
    js.append(f'tl.to({{"{sid}-L0":1}},{{}});') if False else None
    t=0.4
    frags.append(0.2)
    curcap=None; curround=None
    for k,s in enumerate(steps_spec):
        kind=s["kind"]; i=s.get("round"); d=s["d"]; t0=t
        if s.get("cap"):
            if curcap is not None:
                js.append(f'tl.to("#{sid}-cap{curcap}",{{opacity:0,y:-15,duration:.3}},{t0:.2f});')
            js.append(f'tl.to("#{sid}-cap{k}",{{opacity:1,y:0,duration:.5,ease:"power2.out"}},{t0+.25:.2f});')
            curcap=k
        def enter_round(at):
            # exit previous round, enter this one
            lines=[]
            if curround is not None and curround!=i:
                lines.append(f'tl.to("#{sid}-L{curround}",{{opacity:0,y:-50,duration:.4}},{at:.2f});')
                lines.append(f'tl.to("#{sid}-card{curround}",{{opacity:.6,scale:1,duration:.3}},{at:.2f});')
                lines.append(f'tl.to("#{sid}-L{i}",{{opacity:1,duration:.4}},{at+.35:.2f});')
            return lines
        def pick(at):
            L=[]
            L.append(f'tl.to("#{sid}-card{i}",{{scale:1.18,backgroundColor:"#ffe08a",duration:.35,ease:"back.out(2)"}},{at:.2f});')
            L.append(f'gsap.set("#{sid}-num{i}",{{y:-320,scale:1.5}});')
            L.append(f'tl.to("#{sid}-num{i}",{{opacity:1,y:0,scale:1,duration:.7,ease:"bounce.out"}},{at+.3:.2f});')
            L.append(f'tl.to("#{sid}-slot{i}",{{borderColor:"rgba(217,72,15,0)",duration:.4}},{at+.9:.2f});')
            return L
        def split(at):
            L=[]
            L.append(f'tl.to("#{sid}-sq{i}",{{opacity:0,y:-70,duration:.4,ease:"power2.in"}},{at:.2f});')
            L.append(f'gsap.set("#{sid}-n2{i}",{{scale:1.4}});')
            L.append(f'tl.to("#{sid}-mul{i}",{{opacity:1,x:0,duration:.6,ease:"power2.out"}},{at+.3:.2f});')
            L.append(f'tl.to("#{sid}-n2{i}",{{opacity:1,scale:1,duration:.5,ease:"back.out(2)"}},{at+.5:.2f});')
            return L
        def result(at):
            L=[]
            L.append(f'tl.to("#{sid}-res{i}",{{opacity:1,scale:1,duration:.6,ease:"back.out(2.2)"}},{at:.2f});')
            L.append(f'tl.to("#{sid}-chip{i}",{{opacity:1,y:0,duration:.5,ease:"power2.out"}},{at+.5:.2f});')
            return L
        if kind=="pick":
            js+=enter_round(t0) if curround is not None else []
            js+=pick(t0+(0 if curround is None else .45)); curround=i
        elif kind=="split":
            js+=split(t0)
        elif kind=="result":
            js+=result(t0)
        elif kind=="pairsplit":   # pick + split in one click
            js+=enter_round(t0)
            a=t0+.45
            js+=pick(a); js+=split(a+1.2); curround=i
        elif kind=="final":
            if mirror:
                for j in range(len(nums)):
                    js.append(f'tl.to("#{sid}-mir{j}",{{opacity:1,y:0,duration:.5,ease:"power2.out"}},{t0+.3+.25*j:.2f});')
            else:
                js.append(f'tl.to("#{sid}-L{curround}",{{opacity:1,duration:.1}},{t0:.2f});')
                js.append(f'tl.to("#{sid} .card",{{opacity:1,scale:1,backgroundColor:"#ffe08a",duration:.4,stagger:.1}},{t0:.2f});')
        t=t0+d+0.1
        frags.append(round(t,2))
    dur=round(t+0.8,2)
    js.append(f'MASTER.add(tl,{start});')
    # ---------- slide html ----------
    mirlabel='<div class="mirlabel">espelho: o positivo e o negativo caem no mesmo lugar</div>' if mirror else ''
    html=f'''
  <div id="{sid}" class="clip scene" data-composition-id="{sid}" data-label="{label}" data-start="{start}" data-duration="{dur}" data-width="1920" data-height="1080" data-track-index="0">
    <div class="margin"></div>
    <div class="intro kicker">{kicker}</div>
    <h1 class="intro">{title}</h1>
    <div class="tray intro"><span class="trl">Escolha um número:</span>{cards}</div>
    <div class="stage">{''.join(rounds)}
    </div>
    <div class="caps">{caps}</div>
    <div class="chips">{chips}</div>
    {('<div class="chips mrow">'+mchips+'</div>') if mirror else ''}
    <div class="foot l">Aulão ENEM · Matemática</div>
    <div class="foot r">Prof. Natanael</div>
  </div>'''
    island={"sceneId":sid,"fragments":[round(start+f,2) for f in frags],"notes":notes}
    return html, "\n".join(x for x in js if x), island, start+dur

P=[2,3,5]; N=[-2,-3,-5]
spec_pos=[
 dict(kind="pick",round=0,d=1.4,cap="Coloque um número no espaço do ( )²"),
 dict(kind="split",round=0,d=1.4,cap="Elevar ao quadrado é <b>multiplicar o número por ele mesmo</b>"),
 dict(kind="result",round=0,d=1.2,cap="2 vezes 2 é <b class='g'>4</b>"),
 dict(kind="pairsplit",round=1,d=2.4,cap="Agora o <b>3</b>: ele entra nos dois parênteses"),
 dict(kind="result",round=1,d=1.2,cap="3 vezes 3 é <b class='g'>9</b>"),
 dict(kind="pairsplit",round=2,d=2.4,cap="E o <b>5</b>?"),
 dict(kind="result",round=2,d=1.2,cap="5 vezes 5 é <b class='g'>25</b>"),
 dict(kind="final",d=1.2,cap="Sempre: <b>( número )² = número · número</b>"),
]
spec_neg=[
 dict(kind="pick",round=0,d=1.4,cap="E se o número for <b class='c'>negativo</b>? Ele entra <b>com o sinal</b>"),
 dict(kind="split",round=0,d=1.4,cap="Os <b>dois</b> parênteses levam o sinal"),
 dict(kind="result",round=0,d=1.2,cap="<b class='c'>menos</b> vezes <b class='c'>menos</b> dá <b class='g'>mais</b>: resultado 4"),
 dict(kind="pairsplit",round=1,d=2.4,cap="Mesma coisa com o <b class='c'>−3</b>"),
 dict(kind="result",round=1,d=1.2,cap="−3 vezes −3 é <b class='g'>9</b>"),
 dict(kind="pairsplit",round=2,d=2.4,cap="E o <b class='c'>−5</b>?"),
 dict(kind="result",round=2,d=1.2,cap="−5 vezes −5 é <b class='g'>25</b>"),
 dict(kind="final",d=1.4,cap="<b>Espelho:</b> o positivo (azul) e o negativo (verde) deram o <b>mesmo</b> resultado"),
]
notes1=("(Ao abrir o slide: espaço vazio ( )², sem número.) [CLIQUE 1] Olhem esse espaço vazio: ( )². Qualquer número pode entrar aqui. Vou escolher o 2. "
"[CLIQUE 2] O expoente 2 quer dizer: multiplica o número por ele mesmo. O 2 aparece nos dois parênteses. "
"[CLIQUE 3] 2 vezes 2 dá 4. Fica anotado embaixo. "
"[CLIQUE 4] Agora o 3: ( 3 ) vezes ( 3 ). "
"[CLIQUE 5] 3 vezes 3 dá 9. "
"[CLIQUE 6] E o 5: ( 5 ) vezes ( 5 ). "
"[CLIQUE 7] 5 vezes 5 dá 25. "
"[CLIQUE 8] Sempre a mesma máquina: o número vezes ele mesmo.")
notes2=("(Ao abrir o slide: espaço vazio ( )², cartões com números negativos.) [CLIQUE 1] E se o número for negativo? Ele entra com o sinal, dentro do parêntese. Vou escolher o menos 2. "
"[CLIQUE 2] Os dois parênteses levam o sinal: ( −2 ) vezes ( −2 ). "
"[CLIQUE 3] Menos vezes menos dá mais. Resultado: 4. "
"[CLIQUE 4] Mesma coisa com o menos 3. "
"[CLIQUE 5] Menos 3 vezes menos 3 dá 9. "
"[CLIQUE 6] E o menos 5? "
"[CLIQUE 7] Dá 25. "
"[CLIQUE 8] Olhem o espelho: 2 e −2 deram 4; 3 e −3 deram 9; 5 e −5 deram 25. Positivo e negativo caem no mesmo lugar. Por isso a parábola é simétrica.")

h1,j1,i1,end1=scene("maquina-pos","A máquina ( )²: números positivos",0,"A máquina do ( )²","FUNÇÃO DO 2º GRAU · PARTE A",P,spec_pos,notes1)
h2,j2,i2,end2=scene("maquina-neg","A máquina ( )²: números negativos",round(end1,2),"E os números negativos?","FUNÇÃO DO 2º GRAU · PARTE A",N,spec_neg,notes2,mirror=True)

css='''
@font-face{font-family:"Patrick Hand";src:url("assets/fonts/patrick.woff2") format("woff2");font-weight:400}
@font-face{font-family:"Caveat";src:url("assets/fonts/caveat.woff2") format("woff2");font-weight:400 700}
:root{--ink:#1f2a33;--laranja:#d9480f;--verde:#0f9d8a;--azul:#2f6fdb;--amarelo:#f0a202;--coral:#e4572e;--papel:#fbf8f1;--grade:#cfdcea}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1920px;height:1080px;overflow:hidden;background:var(--papel)}
.deck-root{position:absolute;left:0;top:0;width:1920px;height:1080px}
.scene{position:absolute;left:0;top:0;width:1920px;height:1080px;overflow:hidden;color:var(--ink);font-family:"Patrick Hand",cursive;
 background-color:var(--papel);
 background-image:linear-gradient(var(--grade) 2px,transparent 2px),linear-gradient(90deg,var(--grade) 2px,transparent 2px);
 background-size:54px 54px;background-position:0 0}
.margin{position:absolute;left:150px;top:0;width:4px;height:1080px;background:var(--coral);box-shadow:10px 0 0 rgba(228,87,46,.35)}
.kicker{position:absolute;left:210px;top:48px;font-size:34px;letter-spacing:.08em;color:var(--azul)}
h1{position:absolute;left:210px;top:92px;font-weight:400;font-size:96px;line-height:1.05;color:var(--ink)}
.tray{position:absolute;right:110px;top:70px;display:flex;align-items:center;gap:26px;font-size:36px}
.trl{color:var(--ink);margin-right:8px}
.card{display:inline-flex;align-items:center;justify-content:center;min-width:112px;height:112px;padding:0 20px;font-size:76px;background:#fff;border:4px solid var(--ink);border-radius:20px;box-shadow:5px 6px 0 var(--ink)}
.neg{color:var(--coral)}
.card .neg{color:#b83214}
.stage{position:absolute;left:250px;top:330px;width:1500px;height:260px}
.line{position:absolute;left:0;top:0;display:flex;align-items:center;white-space:nowrap;font-size:168px;line-height:1.1;color:var(--ink)}
.par{color:var(--azul)}
.slot{display:inline-block;margin:0 .06em;padding:0 .12em;border:5px dashed var(--laranja);border-radius:18px}
.num,.num2{color:var(--laranja);display:inline-block}
.cl{position:relative;color:var(--azul)}
.sq{position:absolute;left:100%;top:-.12em;font-size:.55em;color:var(--azul)}
.mul{display:inline-flex;align-items:center;margin-left:.1em}
.dot{margin:0 .22em;color:var(--ink)}
.res{display:inline-flex;align-items:center;margin-left:.3em;color:var(--verde)}
.eq{margin-right:.25em;color:var(--ink)}
.val{color:var(--verde)}
.caps{position:absolute;left:250px;top:640px;width:1500px;height:110px}
.cap{position:absolute;left:0;top:0;width:100%;font-size:62px;line-height:1.1;color:var(--ink)}
.cap b{font-weight:400;color:var(--laranja)}.cap b.g{color:var(--verde)}.cap b.c{color:var(--coral)}
.chips{position:absolute;left:250px;top:780px;display:flex;gap:44px}
.chips.mrow{top:880px}
.chip{font-size:56px;padding:6px 26px;background:#fff;border:4px solid var(--verde);border-radius:18px;white-space:nowrap}
.chip b{font-weight:400;color:var(--verde)}
.chip.mir{border-color:var(--azul)}.chip.mir b{color:var(--azul)}
.mirlabel{position:absolute;left:250px;top:830px;font-size:34px;color:var(--azul);opacity:0}
.foot{position:absolute;top:985px;font-size:34px;color:var(--ink)}
.foot.l{left:210px}.foot.r{right:120px;font-family:"Caveat",cursive;font-size:56px;top:972px;color:var(--laranja)}
'''
tail='\nwindow.__timelines["root"] = MASTER;\n'
all_js="\n".join([f'(function(){{\n{j1}\n}})();',f'(function(){{\n{j2}\n}})();'])
island={"slides":[i1,i2]}
doc=f'''<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=1920, height=1080" />
<title>Função do 2º grau · A máquina ( )²</title>
<script src="assets/gsap.min.js"></script>
<script>if(!window.__hf){{document.write('<script src="assets/hyperframe.runtime.iife.js"><\/script>');}}</script>
<style>{css}</style>
</head>
<body>
<script type="application/hyperframes-slideshow+json">
{json.dumps(island,ensure_ascii=False,indent=2)}
</script>
<div id="root" data-composition-id="root" data-root="true" data-start="0" data-duration="{end2}" data-width="1920" data-height="1080">
{h1}
{h2}
</div>
<script>
window.__timelines = window.__timelines || {{}};
const MASTER = gsap.timeline({{paused:true}}).to({{}}, {{duration:{end2}}}, 0);
{all_js}{tail}
</script>
</body>
</html>
'''
open(OUT,"w").write(doc)
print(end1,end2,i1["fragments"],i2["fragments"])
