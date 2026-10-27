const STAGES = [
  {type:'copy', tag:'ETAPA 1/20 • SISTEMA 3×3', title:'O que é um sistema 3×3?', lines:[
    '<strong>Sistema 3×3</strong>: conjunto de 3 equações com 3 incógnitas.',
    'As incógnitas serão <strong>x, y e z</strong>.',
    'Resolver o sistema é encontrar um trio <strong>(x, y, z)</strong> que satisfaça as três equações.'
  ], system:['x + y + z = 6','2x − y + z = 3','3x + 2y − z = 4']},

  {type:'copy', tag:'ETAPA 2/20 • MONTAGEM', title:'Como montar um sistema 3×3', lines:[
    'Cada equação ocupa <strong>uma linha</strong>.',
    'Mantenha sempre a mesma ordem das incógnitas: <strong>x, depois y, depois z</strong>.',
    'Se uma incógnita não aparecer, seu coeficiente é <strong>0</strong>.'
  ], system:['x + 2y − z = 4','2x − y + 3z = 9','−x + y + 2z = 3']},

  {type:'copy', tag:'ETAPA 3/20 • ORGANIZAÇÃO', title:'As colunas precisam ficar alinhadas', lines:[
    'Pense em três colunas: <strong>x | y | z</strong>.',
    'Isso permite enxergar rapidamente quais incógnitas aparecem em cada linha.'
  ], system:['x + 2y − z = 4','0x + 3y + 2z = 8','0x + 0y + 5z = 15'], note:'Quando começam a aparecer zeros à esquerda, o sistema está formando uma escada.'},

  {type:'copy', tag:'ETAPA 4/20 • SISTEMA ESCALONADO', title:'Como é um sistema 3×3 escalonado?', lines:[
    'Um sistema está <strong>escalonado</strong> quando as incógnitas desaparecem aos poucos nas linhas de baixo.',
    'A 1ª linha pode ter <strong>x, y e z</strong>.',
    'A 2ª linha começa em <strong>y</strong>. A 3ª linha começa em <strong>z</strong>.'
  ], system:['x + y + z = 6','2y + z = 7','3z = 9']},

  {type:'copy', tag:'ETAPA 5/20 • OBSERVE A ESCADA', title:'A “escada” do sistema', lines:[
    '<strong>1ª linha:</strong> x, y e z.',
    '<strong>2ª linha:</strong> y e z.',
    '<strong>3ª linha:</strong> somente z.'
  ], system:['x + y + z = 6','0x + 2y + z = 7','0x + 0y + 3z = 9'], note:'Os zeros aparecem abaixo: primeiro some o x; depois somem x e y.'},

  {type:'choice', tag:'ETAPA 6/20 • LEITURA', title:'Qual equação deve ser resolvida primeiro?', system:['x + y + z = 6','2y + z = 7','3z = 9'], prompt:'Em um sistema escalonado, por onde começamos?', options:['Pela 1ª linha','Pela 2ª linha','Pela 3ª linha','Qualquer linha'], correct:2, feedback:'Começamos pela última linha, porque ela tem apenas uma incógnita.'},

  {type:'choice', tag:'ETAPA 7/20 • PASSO 1', title:'Descubra z', system:['x + y + z = 6','2y + z = 7','3z = 9'], prompt:'Da última linha: 3z = 9. Quanto vale z?', options:['1','2','3','9'], correct:2, feedback:'3z = 9 ⇒ z = 3.'},

  {type:'copy', tag:'ETAPA 8/20 • SUBSTITUIR', title:'Agora suba uma linha', lines:[
    'Já sabemos que <strong>z = 3</strong>.',
    'Substituímos esse valor na 2ª linha.'
  ], system:['2y + z = 7','2y + 3 = 7'], note:'Agora restou apenas y.'},

  {type:'choice', tag:'ETAPA 9/20 • PASSO 2', title:'Descubra y', prompt:'2y + 3 = 7. Quanto vale y?', options:['1','2','3','4'], correct:1, feedback:'2y = 4 ⇒ y = 2.'},

  {type:'copy', tag:'ETAPA 10/20 • SUBSTITUIR', title:'Suba para a primeira linha', lines:[
    'Agora sabemos: <strong>y = 2</strong> e <strong>z = 3</strong>.',
    'Substituímos os dois valores na 1ª linha.'
  ], system:['x + y + z = 6','x + 2 + 3 = 6'], note:'Agora restou apenas x.'},

  {type:'choice', tag:'ETAPA 11/20 • PASSO 3', title:'Descubra x', prompt:'x + 2 + 3 = 6. Quanto vale x?', options:['1','2','3','6'], correct:0, feedback:'x + 5 = 6 ⇒ x = 1.'},

  {type:'choice', tag:'ETAPA 12/20 • SOLUÇÃO', title:'Escreva a solução', prompt:'Encontramos x = 1, y = 2 e z = 3. Qual é a solução?', options:['(1, 2, 3)','(3, 2, 1)','(1, 3, 2)','(2, 1, 3)'], correct:0, feedback:'S = {(1, 2, 3)}.'},

  {type:'copy', tag:'ETAPA 13/20 • REGRA', title:'Como resolver qualquer sistema já escalonado', lines:[
    '<strong>1.</strong> Resolva a última linha e encontre z.',
    '<strong>2.</strong> Substitua z na linha de cima e encontre y.',
    '<strong>3.</strong> Substitua y e z na primeira linha e encontre x.',
    '<strong>4.</strong> Escreva a solução na ordem <strong>(x, y, z)</strong>.'
  ], note:'Sempre resolvemos de <strong>baixo para cima</strong>.'},

  {type:'choice', tag:'ETAPA 14/20 • RECONHECER', title:'Qual destes está escalonado?', prompt:'Escolha a matriz que representa a forma de escada.', matrixOptions:[
    [['1','2','1','6'],['0','3','−1','5'],['0','0','2','4']],
    [['1','2','1','6'],['2','3','−1','5'],['0','0','2','4']],
    [['0','2','1','6'],['1','3','−1','5'],['0','0','2','4']],
    [['1','0','1','6'],['0','0','2','5'],['0','3','0','4']]
  ], correct:0, feedback:'Há zeros abaixo dos pivôs e a escada avança para a direita.'},

  {type:'choice', tag:'ETAPA 15/20 • EXERCÍCIO', title:'Comece pela última linha', system:['x + 2y + z = 8','2y + z = 7','z = 3'], prompt:'Qual é o primeiro valor que podemos descobrir?', options:['x = 3','y = 3','z = 3','x = 8'], correct:2, feedback:'A última linha já mostra z = 3.'},

  {type:'choice', tag:'ETAPA 16/20 • EXERCÍCIO', title:'Encontre y', system:['x + 2y + z = 8','2y + z = 7','z = 3'], prompt:'Com z = 3, quanto vale y?', options:['1','2','3','4'], correct:1, feedback:'2y + 3 = 7 ⇒ 2y = 4 ⇒ y = 2.'},

  {type:'choice', tag:'ETAPA 17/20 • EXERCÍCIO', title:'Encontre x', system:['x + 2y + z = 8','2y + z = 7','z = 3'], prompt:'Com y = 2 e z = 3, quanto vale x?', options:['1','2','3','4'], correct:0, feedback:'x + 4 + 3 = 8 ⇒ x = 1.'},

  {type:'choice', tag:'ETAPA 18/20 • NOVO SISTEMA', title:'Resolva de baixo para cima', system:['2x − y + z = 5','3y − z = 3','2z = 6'], prompt:'Qual é o valor de z?', options:['1','2','3','6'], correct:2, feedback:'2z = 6 ⇒ z = 3.'},

  {type:'choice', tag:'ETAPA 19/20 • NOVO SISTEMA', title:'Continue subindo', system:['2x − y + z = 5','3y − z = 3','2z = 6'], prompt:'Com z = 3, encontramos y = 2. Qual é o valor de x?', options:['1','2','3','4'], correct:1, feedback:'2x − 2 + 3 = 5 ⇒ 2x + 1 = 5 ⇒ 2x = 4 ⇒ x = 2. Solução: (2, 2, 3).'},

  {type:'copy', tag:'ETAPA 20/20 • RESUMO', title:'Sistema 3×3 escalonado', lines:[
    '<strong>Sistema 3×3:</strong> 3 equações e 3 incógnitas.',
    '<strong>Escalonado:</strong> as incógnitas vão desaparecendo nas linhas de baixo, formando uma escada.',
    '<strong>Para resolver:</strong> comece pela última linha.',
    '<strong>Ordem:</strong> encontre z → depois y → depois x.',
    '<strong>Solução:</strong> escreva o trio (x, y, z).'
  ], note:'Ideia-chave: sistema escalonado = resolver de <strong>baixo para cima</strong>.'}
];

const $=s=>document.querySelector(s);
const slides=$('#slides'), prog=$('#prog'), counter=$('#counter'), prev=$('#prev'), next=$('#next'), scoreEl=$('#score');
let current=0, score=0; const answered=new Array(STAGES.length).fill(false);

function matrixHTML(m){
  if(!m) return '';
  return `<div class="matrix-wrap"><div class="matrix">${m.map(r=>`<div class="mrow">${r.slice(0,3).map(v=>`<span>${v}</span>`).join('')}<b></b><span>${r[3]}</span></div>`).join('')}</div></div>`;
}
function systemHTML(sys){return sys?`<div class="system">${sys.map(e=>`<div>${e}</div>`).join('')}</div>`:''}
function notebook(lines){return `<div class="notebook">${lines.map(x=>`<p>${x}</p>`).join('')}</div>`}
function optionsHTML(s,i){
  if(s.matrixOptions){return `<div class="matrix-options">${s.matrixOptions.map((m,k)=>`<button data-opt="${k}">${matrixHTML(m)}</button>`).join('')}</div>`}
  return `<div class="options">${s.options.map((o,k)=>`<button data-opt="${k}">${o}</button>`).join('')}</div>`;
}
function renderStage(s,i){
  if(s.type==='copy') return `<section class="slide" data-i="${i}"><div class="tag">${s.tag}</div><h1>${s.title}</h1>${s.lines?notebook(s.lines):''}${systemHTML(s.system)}${matrixHTML(s.matrix)}${s.note?`<div class="note">${s.note}</div>`:''}</section>`;
  return `<section class="slide" data-i="${i}"><div class="tag">${s.tag}</div><h2>${s.title}</h2>${systemHTML(s.system)}${matrixHTML(s.matrix)}<div class="question">${s.prompt}</div>${optionsHTML(s,i)}<div class="feedback">Escolha uma resposta.</div></section>`;
}
function build(){
  slides.innerHTML=STAGES.map(renderStage).join('');
  document.querySelectorAll('.slide').forEach((sl,i)=>{
    const s=STAGES[i]; if(s.type!=='choice') return;
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
  current=Math.max(0,Math.min(STAGES.length-1,i));
  document.querySelectorAll('.slide').forEach((s,n)=>s.classList.toggle('on',n===current));
  prog.style.width=`${(current+1)/STAGES.length*100}%`;counter.textContent=`Etapa ${current+1} de ${STAGES.length}`;
  prev.disabled=current===0; next.textContent=current===STAGES.length-1?'Recomeçar ↻':'Próximo →';
}
prev.addEventListener('click',()=>show(current-1));
next.addEventListener('click',()=>{if(current===STAGES.length-1){score=0;answered.fill(false);scoreEl.textContent='0';build()}else show(current+1)});
document.addEventListener('keydown',e=>{if(e.key==='ArrowRight')show(current+1);if(e.key==='ArrowLeft')show(current-1)});
build();