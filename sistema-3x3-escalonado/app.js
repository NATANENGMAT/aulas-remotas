const STAGES = [
  {type:'copy', tag:'ETAPA 1/20 • SISTEMA 3×3', title:'O que é um sistema 3×3?', lines:[
    '<strong>Sistema 3×3</strong>: conjunto de 3 equações com 3 incógnitas.',
    'As incógnitas podem ser <strong>x, y e z</strong>.',
    'Resolver o sistema é encontrar um trio que satisfaça as três equações.'
  ], system:['x + y + z = 6','2x − y + z = 3','3x + 2y − z = 4']},

  {type:'copy', tag:'ETAPA 2/20 • MONTAGEM', title:'Como montar um sistema 3×3', lines:[
    'Cada equação ocupa <strong>uma linha</strong>.',
    'Mantenha sempre a mesma ordem das incógnitas.',
    'Se uma incógnita não aparecer, seu coeficiente é <strong>0</strong>.'
  ], system:['x + 2y − z = 4','2x − y + 3z = 9','−x + y + 2z = 3']},

  {type:'copy', tag:'ETAPA 3/20 • ORGANIZAÇÃO', title:'As colunas precisam ficar alinhadas', lines:[
    'Pense em três colunas de incógnitas.',
    'Isso permite enxergar rapidamente quais incógnitas aparecem em cada linha.'
  ], system:['x + 2y − z = 4','0x + 3y + 2z = 8','0x + 0y + 5z = 15'], note:'Quando começam a aparecer zeros à esquerda, o sistema está formando uma escada.'},

  {type:'copy', tag:'ETAPA 4/20 • SISTEMA ESCALONADO', title:'Como é um sistema 3×3 escalonado?', lines:[
    'As incógnitas desaparecem aos poucos nas linhas de baixo.',
    'A 1ª linha pode ter <strong>x, y e z</strong>.',
    'A 2ª linha começa em <strong>y</strong>. A 3ª linha começa em <strong>z</strong>.'
  ], system:['x + y + z = 6','2y + z = 7','3z = 9']},

  {type:'copy', tag:'ETAPA 5/20 • OBSERVE A ESCADA', title:'A “escada” do sistema', lines:[
    '<strong>1ª linha:</strong> x, y e z.',
    '<strong>2ª linha:</strong> y e z.',
    '<strong>3ª linha:</strong> somente z.'
  ], system:['x + y + z = 6','0x + 2y + z = 7','0x + 0y + 3z = 9'], note:'Para resolver, começamos pela linha que tem apenas uma incógnita.'},

  {type:'choice', tag:'ETAPA 6/20 • LEITURA', title:'Por onde começamos?', system:['x + y + z = 6','2y + z = 7','3z = 9'], prompt:'Qual equação deve ser resolvida primeiro?', options:['x + y + z = 6','2y + z = 7','3z = 9','Qualquer uma'], correct:2, feedback:'Começamos por 3z = 9, porque ela tem somente uma incógnita.'},

  {type:'animation', kind:'z', tag:'ETAPA 7/20 • RESOLVENDO z', title:'1º — Resolva a equação com uma incógnita'},
  {type:'animation', kind:'y', tag:'ETAPA 8/20 • SUBSTITUINDO z', title:'2º — Substitua z na segunda equação'},
  {type:'animation', kind:'x', tag:'ETAPA 9/20 • SUBSTITUINDO y e z', title:'3º — Substitua na primeira equação'},

  {type:'choice', tag:'ETAPA 10/20 • SOLUÇÃO', title:'Solução do sistema', prompt:'Encontramos x = 1, y = 2 e z = 3. Qual é o trio solução?', options:['(1, 2, 3)','(3, 2, 1)','(1, 3, 2)','(2, 1, 3)'], correct:0, feedback:'S = {(1, 2, 3)}.'},

  {type:'copy', tag:'ETAPA 11/20 • REGRA', title:'Como resolver um sistema já escalonado', lines:[
    '<strong>1.</strong> Pegue a equação com apenas uma incógnita e resolva.',
    '<strong>2.</strong> Substitua o valor encontrado na equação de cima.',
    '<strong>3.</strong> Resolva a nova incógnita.',
    '<strong>4.</strong> Substitua os valores na primeira equação.',
    '<strong>5.</strong> Escreva a solução na ordem pedida.'
  ], note:'A resolução acontece de <strong>baixo para cima</strong>.'},

  {type:'choice', tag:'ETAPA 12/20 • RECONHECER', title:'Qual destes está escalonado?', prompt:'Escolha a matriz que representa a forma de escada.', matrixOptions:[
    [['1','2','1','6'],['0','3','−1','5'],['0','0','2','4']],
    [['1','2','1','6'],['2','3','−1','5'],['0','0','2','4']],
    [['0','2','1','6'],['1','3','−1','5'],['0','0','2','4']],
    [['1','0','1','6'],['0','0','2','5'],['0','3','0','4']]
  ], correct:0, feedback:'Há zeros abaixo e as incógnitas vão desaparecendo nas linhas de baixo.'},

  {type:'choice', tag:'ETAPA 13/20 • EXERCÍCIO', title:'Comece pela última linha', system:['x + 2y + z = 8','2y + z = 7','z = 3'], prompt:'Qual valor já podemos descobrir?', options:['x = 3','y = 3','z = 3','x = 8'], correct:2, feedback:'A última linha já mostra z = 3.'},

  {type:'choice', tag:'ETAPA 14/20 • EXERCÍCIO', title:'Substitua z', system:['x + 2y + z = 8','2y + z = 7','z = 3'], prompt:'Depois de substituir z = 3 na segunda equação, obtemos:', options:['2y + 3 = 7','2y − 3 = 7','2y = 3','y + 3 = 7'], correct:0, feedback:'2y + z = 7 ⇒ 2y + 3 = 7.'},

  {type:'choice', tag:'ETAPA 15/20 • EXERCÍCIO', title:'Encontre y', prompt:'2y + 3 = 7. Quanto vale y?', options:['1','2','3','4'], correct:1, feedback:'2y = 4 ⇒ y = 2.'},

  {type:'choice', tag:'ETAPA 16/20 • EXERCÍCIO', title:'Encontre x', system:['x + 2y + z = 8','2y + z = 7','z = 3'], prompt:'Com y = 2 e z = 3, quanto vale x?', options:['1','2','3','4'], correct:0, feedback:'x + 4 + 3 = 8 ⇒ x = 1.'},

  {type:'choice', tag:'ETAPA 17/20 • NOVO SISTEMA', title:'Resolva de baixo para cima', system:['2x − y + z = 5','3y − z = 3','2z = 6'], prompt:'Qual é o valor de z?', options:['1','2','3','6'], correct:2, feedback:'2z = 6 ⇒ z = 3.'},

  {type:'choice', tag:'ETAPA 18/20 • NOVO SISTEMA', title:'Substitua z', system:['2x − y + z = 5','3y − z = 3','2z = 6'], prompt:'3y − 3 = 3. Quanto vale y?', options:['1','2','3','6'], correct:1, feedback:'3y = 6 ⇒ y = 2.'},

  {type:'choice', tag:'ETAPA 19/20 • NOVO SISTEMA', title:'Encontre x', system:['2x − y + z = 5','3y − z = 3','2z = 6'], prompt:'Com y = 2 e z = 3, quanto vale x?', options:['1','2','3','4'], correct:1, feedback:'2x − 2 + 3 = 5 ⇒ 2x = 4 ⇒ x = 2.'},

  {type:'copy', tag:'ETAPA 20/20 • RESUMO', title:'Sistema 3×3 escalonado', lines:[
    '<strong>1.</strong> Resolva a equação com uma incógnita.',
    '<strong>2.</strong> Substitua na equação de cima.',
    '<strong>3.</strong> Continue subindo até encontrar todas as incógnitas.',
    '<strong>4.</strong> Escreva o trio solução.'
  ], note:'Ordem do exemplo: <strong>z → y → x</strong>.'}
];

const $=s=>document.querySelector(s);
const slides=$('#slides'), prog=$('#prog'), counter=$('#counter'), prev=$('#prev'), next=$('#next'), scoreEl=$('#score');
let current=0, score=0; const answered=new Array(STAGES.length).fill(false);
let animationRun=0;

function matrixHTML(m){
  if(!m) return '';
  return `<div class="matrix-wrap"><div class="matrix">${m.map(r=>`<div class="mrow">${r.slice(0,3).map(v=>`<span>${v}</span>`).join('')}<b></b><span>${r[3]}</span></div>`).join('')}</div></div>`;
}
function systemHTML(sys){return sys?`<div class="system">${sys.map(e=>`<div>${e}</div>`).join('')}</div>`:''}
function notebook(lines){return `<div class="notebook">${lines.map(x=>`<p>${x}</p>`).join('')}</div>`}
function optionsHTML(s){
  if(s.matrixOptions){return `<div class="matrix-options">${s.matrixOptions.map((m,k)=>`<button data-opt="${k}">${matrixHTML(m)}</button>`).join('')}</div>`}
  return `<div class="options">${s.options.map((o,k)=>`<button data-opt="${k}">${o}</button>`).join('')}</div>`;
}

function frac(n,d,id=''){
  return `<span class="frac" ${id?`data-id="${id}"`:''}><span>${n}</span><span>${d}</span></span>`;
}

function animationHTML(s,i){
  return `<section class="slide animation-slide" data-i="${i}" data-kind="${s.kind}"><div class="tag">${s.tag}</div><h2>${s.title}</h2><div class="anim-board" aria-live="polite"></div><button type="button" class="replay">▶ Repetir animação</button><div class="anim-caption"></div></section>`;
}

function renderStage(s,i){
  if(s.type==='copy') return `<section class="slide" data-i="${i}"><div class="tag">${s.tag}</div><h1>${s.title}</h1>${s.lines?notebook(s.lines):''}${systemHTML(s.system)}${matrixHTML(s.matrix)}${s.note?`<div class="note">${s.note}</div>`:''}</section>`;
  if(s.type==='animation') return animationHTML(s,i);
  return `<section class="slide" data-i="${i}"><div class="tag">${s.tag}</div><h2>${s.title}</h2>${systemHTML(s.system)}${matrixHTML(s.matrix)}<div class="question">${s.prompt}</div>${optionsHTML(s)}<div class="feedback">Escolha uma resposta.</div></section>`;
}

const sleep=ms=>new Promise(r=>setTimeout(r,ms));

async function flyToken(slide,from,to,text,run){
  if(run!==animationRun||!from||!to)return;
  const sr=slide.getBoundingClientRect(), a=from.getBoundingClientRect(), b=to.getBoundingClientRect();
  const ghost=document.createElement('span');
  ghost.className='fly-token'; ghost.textContent=text;
  ghost.style.left=`${a.left-sr.left+a.width/2}px`; ghost.style.top=`${a.top-sr.top+a.height/2}px`;
  slide.appendChild(ghost);
  const dx=(b.left+b.width/2)-(a.left+a.width/2), dy=(b.top+b.height/2)-(a.top+a.height/2);
  const anim=ghost.animate([
    {transform:'translate(-50%,-50%) scale(1)',opacity:1},
    {transform:`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) scale(1.22)`,opacity:1}
  ],{duration:850,easing:'cubic-bezier(.2,.75,.25,1)',fill:'forwards'});
  await anim.finished.catch(()=>{});
  ghost.remove();
}

function setBoard(slide,html,caption=''){
  slide.querySelector('.anim-board').innerHTML=html;
  slide.querySelector('.anim-caption').innerHTML=caption;
}

async function playZ(slide,run){
  setBoard(slide,`<div class="anim-eq active"><span data-id="from3">3</span><span>z</span><span>=</span><span>9</span></div><div class="anim-eq ghost-row"><span>z</span><span>=</span>${frac('9','□','den3')}</div>`,`Pegue a equação com uma incógnita: <strong>3z = 9</strong>.`);
  await sleep(900); if(run!==animationRun)return;
  slide.querySelector('.ghost-row').classList.add('show');
  await sleep(300);
  await flyToken(slide,slide.querySelector('[data-id="from3"]'),slide.querySelector('[data-id="den3"] span:last-child'),'3',run);
  if(run!==animationRun)return;
  setBoard(slide,`<div class="anim-eq done"><span>3</span><span>z</span><span>=</span><span>9</span></div><div class="anim-arrow">↓</div><div class="anim-eq active"><span>z</span><span>=</span>${frac('9','3')}</div>`,`O <strong>3</strong> que multiplicava passa para o outro lado <strong>dividindo</strong>.`);
  await sleep(1100); if(run!==animationRun)return;
  setBoard(slide,`<div class="anim-eq done"><span>z</span><span>=</span>${frac('9','3')}</div><div class="anim-arrow">↓</div><div class="anim-eq result"><span>z</span><span>=</span><strong>3</strong></div>`,`<strong>z = 3</strong>. Agora esse valor será usado na 2ª equação.`);
}

async function playY(slide,run){
  setBoard(slide,`<div class="known-chip"><span>z =</span> <strong data-id="known3">3</strong></div><div class="anim-eq active"><span>2y</span><span>+</span><span data-id="zslot">z</span><span>=</span><span>7</span></div><div class="anim-eq ghost-row"><span>2y</span><span>+</span><span>(<i data-id="sub3">□</i>)</span><span>=</span><span>7</span></div>`,`Substitua <strong>z = 3</strong> na segunda equação.`);
  await sleep(850); if(run!==animationRun)return;
  slide.querySelector('.ghost-row').classList.add('show');
  await flyToken(slide,slide.querySelector('[data-id="known3"]'),slide.querySelector('[data-id="sub3"]'),'3',run);
  if(run!==animationRun)return;
  setBoard(slide,`<div class="anim-eq done"><span>2y</span><span>+</span><span>z</span><span>=</span><span>7</span></div><div class="anim-arrow">↓</div><div class="anim-eq active"><span>2y</span><span>+</span><span>(3)</span><span>=</span><span>7</span></div>`,`O <strong>3</strong> entrou no lugar do <strong>z</strong>.`);
  await sleep(900); if(run!==animationRun)return;
  setBoard(slide,`<div class="anim-eq active"><span>2y</span><span>+</span><span data-id="plus3">3</span><span>=</span><span>7</span></div><div class="anim-eq ghost-row show"><span>2y</span><span>=</span><span>7</span><span data-id="minus3">−3</span></div>`,`Agora o <strong>+3</strong> passa para o outro lado como <strong>−3</strong>.`);
  await sleep(500);
  await flyToken(slide,slide.querySelector('[data-id="plus3"]'),slide.querySelector('[data-id="minus3"]'),'3',run);
  if(run!==animationRun)return;
  setBoard(slide,`<div class="anim-eq done"><span>2y</span><span>+</span><span>3</span><span>=</span><span>7</span></div><div class="anim-arrow">↓</div><div class="anim-eq active"><span>2y</span><span>=</span><span>7</span><span>−</span><span>3</span></div>`,`Mudou de lado, mudou de sinal.`);
  await sleep(900); if(run!==animationRun)return;
  setBoard(slide,`<div class="anim-eq active"><span>2y</span><span>=</span><strong>4</strong></div>`,`7 − 3 = 4.`);
  await sleep(850); if(run!==animationRun)return;
  setBoard(slide,`<div class="anim-eq active"><span data-id="coef2">2</span><span>y</span><span>=</span><span>4</span></div><div class="anim-eq ghost-row show"><span>y</span><span>=</span>${frac('4','□','den2')}</div>`,`O <strong>2</strong> que multiplica y passa dividindo.`);
  await sleep(450);
  await flyToken(slide,slide.querySelector('[data-id="coef2"]'),slide.querySelector('[data-id="den2"] span:last-child'),'2',run);
  if(run!==animationRun)return;
  setBoard(slide,`<div class="anim-eq done"><span>2y</span><span>=</span><span>4</span></div><div class="anim-arrow">↓</div><div class="anim-eq active"><span>y</span><span>=</span>${frac('4','2')}</div>`,`y = 4 ÷ 2.`);
  await sleep(950); if(run!==animationRun)return;
  setBoard(slide,`<div class="anim-eq result"><span>y</span><span>=</span><strong>2</strong></div>`,`<strong>y = 2</strong>.`);
}

async function playX(slide,run){
  setBoard(slide,`<div class="known-row"><div class="known-chip"><span>y =</span> <strong data-id="known2">2</strong></div><div class="known-chip"><span>z =</span> <strong data-id="known3x">3</strong></div></div><div class="anim-eq active"><span>x</span><span>+</span><span>y</span><span>+</span><span>z</span><span>=</span><span>6</span></div><div class="anim-eq ghost-row"><span>x</span><span>+</span><span>(<i data-id="sub2">□</i>)</span><span>+</span><span>(<i data-id="sub3x">□</i>)</span><span>=</span><span>6</span></div>`,`Substitua <strong>y = 2</strong> e <strong>z = 3</strong> na primeira equação.`);
  await sleep(850); if(run!==animationRun)return;
  slide.querySelector('.ghost-row').classList.add('show');
  await flyToken(slide,slide.querySelector('[data-id="known2"]'),slide.querySelector('[data-id="sub2"]'),'2',run);
  if(run!==animationRun)return;
  await flyToken(slide,slide.querySelector('[data-id="known3x"]'),slide.querySelector('[data-id="sub3x"]'),'3',run);
  if(run!==animationRun)return;
  setBoard(slide,`<div class="anim-eq active"><span>x</span><span>+</span><span>(2)</span><span>+</span><span>(3)</span><span>=</span><span>6</span></div>`,`Os valores entraram no lugar de <strong>y</strong> e <strong>z</strong>.`);
  await sleep(900); if(run!==animationRun)return;
  setBoard(slide,`<div class="anim-eq active"><span>x</span><span>+</span><span>2</span><span>+</span><span>3</span><span>=</span><span>6</span></div>`,`Retire os parênteses.`);
  await sleep(850); if(run!==animationRun)return;
  setBoard(slide,`<div class="anim-eq active"><span>x</span><span>+</span><span data-id="plus5">5</span><span>=</span><span>6</span></div><div class="anim-eq ghost-row show"><span>x</span><span>=</span><span>6</span><span data-id="minus5">−5</span></div>`,`2 + 3 = 5. Agora o <strong>+5</strong> passa para o outro lado como <strong>−5</strong>.`);
  await sleep(500);
  await flyToken(slide,slide.querySelector('[data-id="plus5"]'),slide.querySelector('[data-id="minus5"]'),'5',run);
  if(run!==animationRun)return;
  setBoard(slide,`<div class="anim-eq done"><span>x</span><span>+</span><span>5</span><span>=</span><span>6</span></div><div class="anim-arrow">↓</div><div class="anim-eq active"><span>x</span><span>=</span><span>6</span><span>−</span><span>5</span></div>`,`Mudou de lado, mudou de sinal.`);
  await sleep(950); if(run!==animationRun)return;
  setBoard(slide,`<div class="anim-eq result"><span>x</span><span>=</span><strong>1</strong></div>`,`<strong>x = 1</strong>.`);
}

function playAnimation(slide){
  const run=++animationRun;
  const kind=slide.dataset.kind;
  if(kind==='z')playZ(slide,run);
  if(kind==='y')playY(slide,run);
  if(kind==='x')playX(slide,run);
}

function build(){
  slides.innerHTML=STAGES.map(renderStage).join('');
  document.querySelectorAll('.slide').forEach((sl,i)=>{
    const s=STAGES[i];
    if(s.type==='animation'){
      sl.querySelector('.replay').addEventListener('click',()=>playAnimation(sl));
      return;
    }
    if(s.type!=='choice') return;
    sl.querySelectorAll('[data-opt]').forEach(btn=>btn.addEventListener('click',()=>{
      const k=Number(btn.dataset.opt); const fb=sl.querySelector('.feedback');
      sl.querySelectorAll('[data-opt]').forEach(b=>b.classList.remove('correct','wrong'));
      if(k===s.correct){btn.classList.add('correct');fb.className='feedback good';fb.innerHTML=`✅ <strong>Correto.</strong> ${s.feedback}`; if(!answered[i]){answered[i]=true;score++;scoreEl.textContent=score;}}
      else{btn.classList.add('wrong');fb.className='feedback bad';fb.textContent='Ainda não. Observe o sistema e tente novamente.';}
    }));
  });
  show(0);
}
function show(i){
  animationRun++;
  current=Math.max(0,Math.min(STAGES.length-1,i));
  document.querySelectorAll('.slide').forEach((s,n)=>s.classList.toggle('on',n===current));
  prog.style.width=`${(current+1)/STAGES.length*100}%`;counter.textContent=`Etapa ${current+1} de ${STAGES.length}`;
  prev.disabled=current===0; next.textContent=current===STAGES.length-1?'Recomeçar ↻':'Próximo →';
  const sl=document.querySelector(`.slide[data-i="${current}"]`);
  if(STAGES[current].type==='animation')setTimeout(()=>playAnimation(sl),220);
}
prev.addEventListener('click',()=>show(current-1));
next.addEventListener('click',()=>{if(current===STAGES.length-1){score=0;answered.fill(false);scoreEl.textContent='0';build()}else show(current+1)});
document.addEventListener('keydown',e=>{if(e.key==='ArrowRight')show(current+1);if(e.key==='ArrowLeft')show(current-1)});
build();