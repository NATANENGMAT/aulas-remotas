const STAGES = [
  {type:'copy', tag:'ETAPA 1/20 • SISTEMA 3×3', title:'O que é um sistema 3×3?', lines:[
    '<strong>Sistema 3×3</strong>: conjunto de 3 equações com 3 incógnitas.',
    'As incógnitas serão <strong>x, y e z</strong>.',
    'Resolver o sistema é encontrar um trio <strong>(x, y, z)</strong> que satisfaça as três equações.'
  ], system:['x + y + z = 6','2x − y + z = 3','3x + 2y − z = 4']},
  {type:'copy', tag:'ETAPA 2/20 • OBJETIVO', title:'O que significa resolver?', lines:[
    'Queremos descobrir os valores de <strong>x, y e z</strong>.',
    'A estratégia será transformar o sistema em outro equivalente, porém mais fácil de resolver.'
  ]},
  {type:'copy', tag:'ETAPA 3/20 • ESCALONAMENTO', title:'O que é escalonar?', lines:[
    '<strong>Escalonar</strong> é criar zeros abaixo dos pivôs.',
    'A forma final fica parecida com uma escada.'
  ], matrix:[['1','1','1','6'],['0','−3','−1','−9'],['0','0','−11','−33']]},
  {type:'copy', tag:'ETAPA 4/20 • OPERAÇÕES', title:'Operações que podemos fazer', lines:[
    '① Trocar duas linhas.',
    '② Multiplicar uma linha por um número diferente de zero.',
    '③ Somar a uma linha um múltiplo de outra linha.'
  ], note:'A operação mais usada para escalonar é: linha de baixo ← linha de baixo − múltiplo da linha de cima.'},
  {type:'copy', tag:'ETAPA 5/20 • EXEMPLO', title:'Vamos resolver este sistema', lines:['Começamos pela matriz aumentada:'], matrix:[['1','1','1','6'],['2','−1','1','3'],['3','2','−1','4']], system:['x + y + z = 6','2x − y + z = 3','3x + 2y − z = 4']},
  {type:'choice', tag:'ETAPA 6/20 • ELIMINAR x', title:'Zere o x da 2ª linha', prompt:'Qual operação elimina o 2 abaixo do primeiro pivô?', options:['L₂ ← L₂ − 2L₁','L₂ ← L₂ + 2L₁','L₂ ← 2L₂ − L₁','L₁ ← L₁ − 2L₂'], correct:0, feedback:'Certo. 2 − 2·1 = 0, então o x desaparece da 2ª linha.'},
  {type:'choice', tag:'ETAPA 7/20 • NOVA L₂', title:'Calcule a nova 2ª linha', matrix:[['1','1','1','6'],['2','−1','1','3']], prompt:'L₂ − 2L₁ resulta em:', options:['[0, −3, −1 | −9]','[0, 1, −1 | 9]','[0, −3, 3 | −9]','[0, −1, −1 | −3]'], correct:0, feedback:'Nova L₂: [0, −3, −1 | −9].'},
  {type:'choice', tag:'ETAPA 8/20 • ELIMINAR x', title:'Agora zere o x da 3ª linha', prompt:'Qual operação elimina o 3 abaixo do primeiro pivô?', options:['L₃ ← L₃ − 3L₁','L₃ ← L₃ + 3L₁','L₃ ← 3L₃ − L₁','L₁ ← L₁ − 3L₃'], correct:0, feedback:'Certo. 3 − 3·1 = 0.'},
  {type:'choice', tag:'ETAPA 9/20 • NOVA L₃', title:'Calcule a nova 3ª linha', prompt:'L₃ − 3L₁ resulta em:', options:['[0, −1, −4 | −14]','[0, 1, −4 | 14]','[0, −1, 2 | −14]','[0, 5, −4 | 14]'], correct:0, feedback:'Nova L₃: [0, −1, −4 | −14].', matrix:[['1','1','1','6'],['0','−3','−1','−9'],['0','−1','−4','−14']]},
  {type:'choice', tag:'ETAPA 10/20 • ELIMINAR y', title:'Agora zere o y da 3ª linha', prompt:'Qual operação elimina o −1 usando a L₂ = [0, −3, −1 | −9]?', options:['L₃ ← 3L₃ − L₂','L₃ ← L₃ − 3L₂','L₂ ← 3L₂ − L₃','L₃ ← L₃ + L₂'], correct:0, feedback:'3L₃ tem −3 na coluna de y. Subtraindo L₂, o y vira zero.'},
  {type:'choice', tag:'ETAPA 11/20 • SISTEMA ESCALONADO', title:'Chegamos à forma escalonada', matrix:[['1','1','1','6'],['0','−3','−1','−9'],['0','0','−11','−33']], prompt:'Qual equação está na última linha?', options:['−11z = −33','−3y − z = −9','x + y + z = 6','−11y = −33'], correct:0, feedback:'Perfeito. A última linha tem apenas z.'},
  {type:'choice', tag:'ETAPA 12/20 • SUBSTITUIÇÃO REGRESSIVA', title:'Resolva de baixo para cima', prompt:'−11z = −33. Quanto vale z?', options:['1','2','3','−3'], correct:2, feedback:'z = 3.'},
  {type:'choice', tag:'ETAPA 13/20 • ENCONTRE y', title:'Volte para a 2ª linha', prompt:'−3y − z = −9 e z = 3. Quanto vale y?', options:['1','2','3','4'], correct:1, feedback:'−3y − 3 = −9 ⇒ −3y = −6 ⇒ y = 2.'},
  {type:'choice', tag:'ETAPA 14/20 • ENCONTRE x', title:'Volte para a 1ª linha', prompt:'x + y + z = 6, com y = 2 e z = 3. Quanto vale x?', options:['1','2','3','6'], correct:0, feedback:'x + 2 + 3 = 6 ⇒ x = 1.'},
  {type:'choice', tag:'ETAPA 15/20 • SOLUÇÃO', title:'Solução do sistema', prompt:'Qual é o trio solução?', options:['(1, 2, 3)','(2, 1, 3)','(1, 3, 2)','(3, 2, 1)'], correct:0, feedback:'S = {(1, 2, 3)}. Esse trio satisfaz as três equações.'},
  {type:'choice', tag:'ETAPA 16/20 • EXERCÍCIO', title:'Escolha a primeira operação', system:['x + 2y + z = 7','2x + y + z = 6','3x + y − z = 4'], prompt:'Para zerar o x da 2ª linha, qual operação você usaria?', options:['L₂ ← L₂ − 2L₁','L₂ ← L₂ + 2L₁','L₁ ← L₁ − 2L₂','L₂ ← 2L₂ + L₁'], correct:0, feedback:'Correto: use o pivô da L₁ para eliminar o x da L₂.'},
  {type:'choice', tag:'ETAPA 17/20 • EXERCÍCIO', title:'Reconheça a forma escalonada', prompt:'Qual matriz está escalonada?', matrixOptions:[
    [['1','2','0','4'],['0','3','1','5'],['0','0','2','6']],
    [['1','2','0','4'],['2','0','1','5'],['0','0','2','6']],
    [['0','2','1','4'],['1','0','0','5'],['0','3','2','6']],
    [['1','0','0','4'],['0','0','2','5'],['0','3','0','6']]
  ], correct:0, feedback:'Na forma escalonada, os pivôs avançam para a direita e há zeros abaixo deles.'},
  {type:'choice', tag:'ETAPA 18/20 • EXERCÍCIO', title:'Comece pela última linha', matrix:[['1','2','1','9'],['0','3','−1','5'],['0','0','4','8']], prompt:'Qual valor de z?', options:['1','2','3','4'], correct:1, feedback:'4z = 8 ⇒ z = 2.'},
  {type:'choice', tag:'ETAPA 19/20 • EXERCÍCIO', title:'Continue a substituição regressiva', matrix:[['1','2','1','9'],['0','3','−1','5'],['0','0','4','8']], prompt:'Com z = 2, quanto vale y na equação 3y − z = 5?', options:['1','2','7/3','3'], correct:2, feedback:'3y − 2 = 5 ⇒ 3y = 7 ⇒ y = 7/3.'},
  {type:'copy', tag:'ETAPA 20/20 • RESUMO', title:'Como resolver um sistema 3×3 por escalonamento', lines:[
    '<strong>1.</strong> Escolha o primeiro pivô.',
    '<strong>2.</strong> Zere os termos abaixo dele.',
    '<strong>3.</strong> Vá para o segundo pivô e zere o termo abaixo.',
    '<strong>4.</strong> Com o sistema escalonado, resolva de <strong>baixo para cima</strong>.',
    '<strong>5.</strong> Se quiser conferir, substitua x, y e z no sistema original.'
  ], note:'Ideia-chave: ESCALONAR primeiro, SUBSTITUIR depois.'}
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
      else{btn.classList.add('wrong');fb.className='feedback bad';fb.textContent='Ainda não. Observe o pivô e tente novamente.';}
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