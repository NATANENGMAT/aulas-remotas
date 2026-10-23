'use strict';
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const escapeHTML = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const icons = {
 close:'<path d="m6 6 12 12M18 6 6 18"/>',
 sound:'<path d="M11 5 6 9H3v6h3l5 4V5Z"/><path d="M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>',
 mute:'<path d="M11 5 6 9H3v6h3l5 4V5Z"/><path d="m16 9 6 6m0-6-6 6"/>',
 arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',
 back:'<path d="M19 12H5m6-6-6 6 6 6"/>',
 bars:'<path d="M4 19V9h4v10m2 0V4h4v15m2 0v-7h4v7M2 20h20"/>',
 compare:'<path d="M4 20V9h5v11m6 0V4h5v16M2 20h20m-10-8v5m-2-2 2 2 2-2"/>',
 pie:'<path d="M12 3v9h9A9 9 0 1 1 12 3Z"/><path d="M15 3a9 9 0 0 1 6 6h-6V3Z"/>',
 check:'<path d="m5 12 4 4L19 6"/>',
 lock:'<rect x="5" y="10" width="14" height="11" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
 replay:'<path d="M3 10a9 9 0 1 1 2 8M3 4v6h6"/>',
 award:'<circle cx="12" cy="9" r="6"/><path d="m8 14-2 8 6-3 6 3-2-8m-7-5 2 2 4-4"/>',
 download:'<path d="M12 3v12m-5-5 5 5 5-5M5 16v5h14v-5"/>',
 book:'<path d="M3 4h6a3 3 0 0 1 3 3v14a3 3 0 0 0-3-3H3V4Zm18 0h-6a3 3 0 0 0-3 3v14a3 3 0 0 1 3-3h6V4Z"/>'
};
const icon = (name,cls='') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]||icons.check}</svg>`;
function mascot(big=false){return `<span class="mascot student-avatar${big?' big':''}" role="img" aria-label="Aluno da Escola Jacimar"><img src="assets/aluno-jacimar.webp" alt="" draggable="false"><span class="voice-dot" aria-hidden="true"></span></span>`;}
const colors=ChartMotion.colours;
function art(type){
 if(type==='book')return `<svg class="book-art" viewBox="0 0 90 90" aria-hidden="true"><path d="m22 12 49 5-3 65-49-5Z" fill="#ebaa5b"/><path d="m27 17 38 4-3 53-38-4Z" fill="#f8d397"/><path d="M14 24h12m-13 17h12M12 59h12" stroke="#726047" stroke-width="4" stroke-linecap="round"/><circle cx="45" cy="41" r="14" fill="#b5713c"/><path d="M45 27v14h14A14 14 0 0 0 45 27" fill="#ffe4b7"/><path d="m69 43 8 1-3 34-4 8-3-9Z" fill="#8c55a7"/><path d="m69 78 5 0-4 8Z" fill="#d8b285"/></svg>`;
 if(type==='cup')return `<svg class="intro-art" viewBox="0 0 220 200" aria-hidden="true"><ellipse cx="110" cy="175" rx="74" ry="12" fill="#e9e5d8"/><path d="M154 61h27v67h-32" stroke="#dba73c" stroke-width="10" fill="none"/><path d="m54 49 107 0-11 120H67Z" fill="#efbe57"/><path d="m61 61 91 0-8 98H73Z" fill="#71319b"/><ellipse cx="107" cy="60" rx="46" ry="9" fill="#9e57b6"/><path d="m112 16 15 0-10 61" stroke="#efe4bb" stroke-width="7" fill="none"/><path d="M80 103c21-15 39 16 58-2" stroke="#b573ce" stroke-width="7" fill="none"/><path d="m33 62 8-10m137 93 8 6M43 143l-9 4" stroke="#d7a94a" stroke-width="3" stroke-linecap="round"/></svg>`;
 if(type==='pie')return `<svg class="intro-art" viewBox="0 0 220 200" aria-hidden="true"><ellipse cx="110" cy="176" rx="74" ry="10" fill="#e9e5d8"/><g transform="translate(110 91) rotate(-90)"><circle r="73" fill="#63279d"/><path d="M0 0V-73A73 73 0 0 1 69.43 22.56Z" fill="#f1c72b"/><path d="M0 0 69.43 22.56A73 73 0 0 1-42.91 59.06Z" fill="#e344ba"/><path d="M0 0-42.91 59.06A73 73 0 0 1-69.43-22.56Z" fill="#9f3c9b"/><path d="M0 0-69.43-22.56A73 73 0 0 1 0-73Z" fill="#25265d"/><circle r="73" fill="none" stroke="#ffffff70" stroke-width="2"/></g><path d="m189 41 6-6m-7 116 7 4M31 52l-7-4" stroke="#dbb75c" stroke-width="3" stroke-linecap="round"/></svg>`;
 return `<svg class="intro-art" viewBox="0 0 220 200" aria-hidden="true"><ellipse cx="110" cy="175" rx="85" ry="11" fill="#e9e5d8"/><path d="M30 158V49M30 158h167" stroke="#d5d9ca" stroke-width="2"/><path d="M30 120h167M30 82h167M30 44h167" stroke="#e7eadf" stroke-width="1"/><rect x="43" y="112" width="27" height="46" rx="2" fill="#1762ca"/><rect x="81" y="85" width="27" height="73" rx="2" fill="#cf570a"/><rect x="119" y="36" width="27" height="122" rx="2" fill="#087d68"/><rect x="157" y="127" width="27" height="31" rx="2" fill="#ac246d"/><path d="m40 34 5-9m135 33 9-5" stroke="#deb566" stroke-width="3" stroke-linecap="round"/>${type==='compare'?'<path d="m66 64 5-16 14 9m-14-9 34 43" stroke="#67974b" stroke-width="3" fill="none" stroke-linecap="round"/>':''}</svg>`;
}
let STORAGE='jacimar-graficos-23-v1';
const fresh=()=>({version:2,lesson:0,indices:[0,0,0],done:[false,false,false],records:{},sound:true,started:false,finishedAt:null});
let state=fresh(), storageAvailable=true;
try{const raw=JSON.parse(localStorage.getItem(STORAGE)||'null');if([1,2].includes(raw?.version)&&Array.isArray(raw.indices)&&raw.indices.length===3&&Array.isArray(raw.done)&&raw.done.length===3&&raw.records&&typeof raw.records==='object'){const {xp:legacyPoints,...saved}=raw;state={...fresh(),...saved,version:2};state.indices=state.indices.map((v,i)=>Math.max(0,Math.min(Number.isInteger(v)?v:0,LESSONS[i].steps.length-1)));state.lesson=Math.max(0,Math.min(2,Number.isInteger(state.lesson)?state.lesson:0));for(const record of Object.values(state.records)){if(record&&typeof record==='object')delete record.xp;}if(raw.version===1){const order=[2,4,1,0,3];for(const k of ['0:7','0:8']){if(state.records[k]?.selection)state.records[k].selection=state.records[k].selection.map(i=>order[i]);}}}}catch{storageAvailable=false;}
let view='home',li=state.lesson,si=state.indices[li]||0,selected=[],feedback=null,toggleKind='bar',modalOpen=false,voiceReady=false,speechToken=0,toastTimer,practice=false,practiceRecords={},certificateFile=null,certificateURL=null;
const totalQuestions=LESSONS.reduce((n,l)=>n+l.steps.filter(s=>s.type==='question').length,0);
function save(){try{localStorage.setItem(STORAGE,JSON.stringify(state));}catch{storageAvailable=false;}}
function key(){return `${li}:${si}`;}
function step(){return LESSONS[li].steps[si];}
function speakerButton(){return `<button class="icon-btn sound ${state.sound?'on':''}" data-action="sound" aria-label="${state.sound?'Silenciar narração':'Ativar narração'}" title="Narração em português">${icon(state.sound?'sound':'mute')}</button>`;}
function toast(text){const el=$('#toast');el.textContent=text;el.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('visible'),2800);}
const voiceLibrary=typeof VOICE_LIBRARY==='undefined'?{}:VOICE_LIBRARY;
const recordedAudio=typeof Audio==='undefined'?null:new Audio();
if(recordedAudio){recordedAudio.id='guide-audio';recordedAudio.preload='auto';recordedAudio.hidden=true;document.body.append(recordedAudio);}
function voiceText(id,fallback=''){return voiceLibrary[id]?.text||fallback;}
function voiceId(){return view==='home'?'home':view==='complete'?'complete':view==='lesson-done'?`done-${li}`:`step-${li}-${si}`;}
function stopSpeakingStyle(){ $$('.speaking').forEach(el=>el.classList.remove('speaking')); }
function cancelSpeech(){speechToken++;if(recordedAudio){recordedAudio.onended=null;recordedAudio.onerror=null;recordedAudio.onplaying=null;recordedAudio.pause();try{recordedAudio.currentTime=0;}catch{}}if('speechSynthesis' in window)window.speechSynthesis.cancel();stopSpeakingStyle();}
function speechFallback(text,token){
 if(token!==speechToken)return;
 if(!('speechSynthesis' in window)){toast('Toque em Ouvir de novo para tentar o áudio novamente.');return;}
 const utterance=new SpeechSynthesisUtterance(text);utterance.lang='pt-BR';utterance.rate=.94;utterance.pitch=1.03;
 const voices=window.speechSynthesis.getVoices();const voice=voices.find(v=>v.lang==='pt-BR'&&/Luciana|Francisca|Maria|Google/i.test(v.name))||voices.find(v=>/^pt[-_]BR$/i.test(v.lang))||voices.find(v=>/^pt/i.test(v.lang));if(voice)utterance.voice=voice;
 utterance.onstart=()=>{if(token===speechToken){$('.screen')?.classList.add('speaking');$('.sound')?.classList.add('speaking');}};
 utterance.onend=utterance.onerror=()=>{if(token===speechToken)stopSpeakingStyle();};window.speechSynthesis.resume();window.speechSynthesis.speak(utterance);
}
function speak(text,force=false,clipIds=null){
 cancelSpeech();if((!state.sound&&!force)||!voiceReady)return;
 const token=speechToken, ids=clipIds||Object.keys(voiceLibrary).filter(id=>voiceLibrary[id].text===text).slice(0,1);
 if(!recordedAudio||!ids.length||ids.some(id=>!voiceLibrary[id]?.src)){speechFallback(text,token);return;}
 let index=0;
 const playClip=()=>{if(token!==speechToken)return;recordedAudio.src=voiceLibrary[ids[index]].src;recordedAudio.onplaying=()=>{if(token===speechToken){$('.screen')?.classList.add('speaking');$('.sound')?.classList.add('speaking');}};
  recordedAudio.onended=()=>{if(token!==speechToken)return;if(++index<ids.length)playClip();else stopSpeakingStyle();};
  recordedAudio.onerror=()=>{if(token!==speechToken)return;stopSpeakingStyle();speechFallback(text,token);};
  const playing=recordedAudio.play();if(playing?.catch)playing.catch(error=>{if(token!==speechToken||error.name==='AbortError')return;stopSpeakingStyle();if(error.name==='NotAllowedError')toast('Toque em Ouvir de novo para liberar a narração.');else speechFallback(text,token);});
 };playClip();
}
function narration(){
 if(voiceLibrary[voiceId()])return voiceLibrary[voiceId()].text;
 if(view==='home')return 'Olá! Eu sou seu guia. Hoje, dia 23 de outubro, vamos explorar gráficos em três pequenas aulas. Toque em começar para descobrir.';
 if(view==='lesson-done')return `Aula concluída! Você terminou ${LESSONS[li].title}. Vamos para a próxima descoberta?`;
 if(view==='complete')return 'Parabéns! Você finalizou a atividade do dia 23 de outubro da Escola Jacimar. Concluiu as três aulas sobre gráficos. Você pode salvar seu comprovante.';
 const s=step();return `${s.title||s.prompt}. ${s.text||''}${s.type==='question'?(s.options?' Escolha uma alternativa e toque em conferir.':` Toque ${s.pick>1?'nas '+s.pick+' categorias':'em uma categoria'} do gráfico e depois em conferir.`):''}`;
}
function startLesson(n){li=n;state.lesson=n;practice=Boolean(state.done[n]);practiceRecords={};si=practice?0:state.indices[n]||0;view='lesson';loadAnswer();save();render();voiceReady=true;speak(narration());}
function currentRecord(){return practice?practiceRecords[key()]:state.records[key()];}
function loadAnswer(){toggleKind='bar';const record=currentRecord();selected=record?.selection?[...record.selection]:[];feedback=record?(record.revealed?'revealed':'correct'):null;}
function openStart(){
 if(!state.started){openModal(`<div class="modal-top">${mascot()}<span class="eyebrow">SEU GUIA DE DESCOBERTAS</span></div><h2>Vamos aprender juntos?</h2><p>Eu leio as orientações e explico cada resposta. Você pode ouvir de novo ou silenciar quando quiser.</p><p class="fine">Ative o som do celular. As falas foram produzidas no OpenArt para acompanhar cada etapa. Você também pode ler as orientações na tela.</p><div class="modal-actions"><button class="btn orange" data-action="start-audio">Começar com narração ${icon('sound')}</button><button class="btn secondary" data-action="start-silent">Começar sem áudio</button></div>`);return;}
 voiceReady=true;startLesson(li);
}
function showHome(){cancelSpeech();closeModal(false);view='home';render();}
function render(direction='next'){
 const previousChart=ChartMotion.capture($('.chart'));
 const el=$('#app');el.innerHTML=view==='home'?renderHome():view==='lesson'?renderLesson():view==='lesson-done'?renderLessonDone():renderComplete();
 if(direction==='back')$('.screen')?.classList.add('back');
 bindActions();if(view==='lesson'){bindChart();ChartMotion.apply(previousChart,$('.chart'));}if(view==='complete'||view==='lesson-done')confetti();
}
function renderHome(){
 const n=state.done.findIndex(d=>!d);if(n!==-1&&!state.done[li]&&li>n)li=n;
 const all=state.done.every(Boolean),current=LESSONS[li];
 return `<main class="screen home"><header class="opening-header"><img class="school-crest" src="assets/brasao-jacimar.png" alt="Brasão da Escola Jacimar"><div><span class="school-name">Escola Jacimar</span><strong>Atividade remota do dia 23</strong><p>Matemática · Professor Natanael</p></div>${speakerButton()}</header><section class="home-heading"><span class="eyebrow">OLHAR · COMPARAR · DESCOBRIR</span><h1>Gráficos que<br>contam histórias.</h1><p>Seu colega da Jacimar vai acompanhar<br>você em cada descoberta.</p><div class="course-stats"><span>${icon('book')} 3 aulas</span><span>${icon('bars')} ${totalQuestions} desafios</span></div></section><div class="level-label"><small>SUA TRILHA DE HOJE</small><strong>Barras, comparações e partes do todo</strong></div><nav class="trail" aria-label="Trilha de aprendizagem">${LESSONS.map((l,i)=>{const unlocked=i===0||state.done[i-1]||state.done[i];return `<button class="trail-node ${unlocked?'':'locked'}" data-action="select-lesson" data-index="${i}" aria-label="${l.title}${state.done[i]?', concluída':unlocked?', disponível':', conclua a aula anterior'}" aria-pressed="${li===i}"><div class="platform-wrap">${li===i?mascot():''}<span class="platform ${li===i?'selected':''}">${icon(state.done[i]?'check':unlocked?l.icon:'lock','node-icon')}</span></div><span class="node-info"><small>${state.done[i]?'CONCLUÍDA ✓':'PARTE 0'+(i+1)}</small><strong>${l.title}</strong></span></button>`;}).join('')}</nav><section class="home-card"><h2>${current.title}</h2><p class="${all?'home-complete':''}">${state.done[li]?'Aula concluída ✓ · Pratique quando quiser':current.subtitle}</p><button class="btn orange" data-action="start">${state.done[li]?'Praticar novamente':state.indices[li]>0?'Continuar aula':'Começar aula'} ${icon('arrow')}</button>${all?'<button class="completion-link" data-action="show-complete">Ver minha conclusão do dia 23 ✓</button>':''}</section><footer class="home-foot">DADOS DE EXEMPLO PARA APRENDER${state.started?'<button class="restart" data-action="reset-progress">Recomeçar neste aparelho</button>':''}</footer></main>`;
}
function renderLesson(){
 const s=step(),isQ=s.type==='question',isIntro=['intro','checkpoint'].includes(s.type);let body='';
 if(isIntro){body=`${art(s.art)}<span class="eyebrow" style="margin-bottom:14px">${s.type==='checkpoint'?'VERIFICAÇÃO DE APRENDIZAGEM':'PARTE 0'+(li+1)}</span><h1>${s.title}</h1><p>${s.text}</p>`;}
 else {body=`${isQ?`<h1 class="question-text">${s.prompt}</h1><div class="question-meta"><span>${s.options?'Escolha uma alternativa':s.pick>1?`Selecione ${s.pick} categorias`:'Toque em uma categoria'}</span></div>`:`<h2>${s.title}</h2><p class="explain-copy">${s.text}</p>`}<div class="chart-wrap">${chart(s)}${isQ&&!s.options?`<div class="reset-line"><button data-action="reset-selection" ${feedback?'disabled':''}>↺ Limpar seleção</button></div>`:''}</div>${s.options?`<div class="options" role="group" aria-label="Alternativas">${s.options.map((o,i)=>`<button class="option ${String(o).length>12?'long':''} ${selected.includes(i)?'selected':''} ${feedback==='correct'&&selected.includes(i)?'correct':''} ${feedback==='revealed'&&o===s.answer?'correct':''} ${feedback==='wrong'&&selected.includes(i)?'wrong':''}" data-action="option" data-index="${i}" aria-pressed="${selected.includes(i)}" ${feedback?'disabled':''}>${escapeHTML(o)}${s.suffix||''}</button>`).join('')}</div>`:''}${s.toggle?`<div class="chart-toggle" role="group" aria-label="Tipo de gráfico"><button class="${toggleKind==='bar'?'active':''}" data-action="chart-type" data-type="bar" aria-pressed="${toggleKind==='bar'}">Gráfico de barras</button><button class="${toggleKind==='pie'?'active':''}" data-action="chart-type" data-type="pie" aria-pressed="${toggleKind==='pie'}">Gráfico de setores</button></div>`:''}`;}
 return `<main class="screen lesson"><header class="topline lesson-top"><button class="icon-btn" data-action="exit" aria-label="Sair da aula">${icon('close')}</button><div class="progress-track" role="progressbar" aria-valuenow="${si+1}" aria-valuemin="0" aria-valuemax="${LESSONS[li].steps.length}" aria-label="Progresso da aula"><div class="progress-fill" style="width:${(si+1)/LESSONS[li].steps.length*100}%"></div></div><span class="step-label">${si+1}/${LESSONS[li].steps.length}</span>${speakerButton()}</header><div class="lesson-caption"><span class="eyebrow">${s.skill?'HORA DE PRATICAR':LESSONS[li].detail}</span><button data-action="replay" aria-label="Ouvir orientação novamente">Ouvir de novo ↻</button></div><section class="lesson-body ${isIntro?'intro':''}" aria-label="Etapa da aula">${body}</section><footer class="lesson-foot">${isQ&&feedback?renderFeedback():`<div class="action-row">${mascot()}<button class="btn" data-action="${isQ?'check':'next'}" ${isQ&&!selectionValid()?'disabled':''}>${isQ?'Conferir':s.type==='intro'?'Vamos descobrir':'Continuar'}</button></div>`}<p class="gesture-hint">${si>0?'← Volte deslizando · ':''}${isQ&&(!feedback||feedback==='wrong')?'Responda para avançar':'Deslize para a esquerda para continuar →'}</p></footer></main>`;
}
function renderFeedback(){
 const wrong=feedback==='wrong',reveal=feedback==='revealed';return `<section class="feedback ${wrong?'wrong':reveal?'revealed':''}" role="status" aria-live="polite"><div class="feedback-heading"><strong><span>${wrong?'↻':reveal?'◉':'✓'}</span> ${wrong?'Vamos tentar de novo?':reveal?'Vamos entender juntos':'Parabéns! Você acertou.'}</strong><button data-action="explain">Por quê?</button></div><div class="feedback-actions">${wrong?`<button class="btn secondary" data-action="reveal">Ver resposta</button><button class="btn" data-action="retry">Tentar de novo</button>`:`<button class="btn ${reveal?'':'green'}" data-action="next">${si===LESSONS[li].steps.length-1?'Finalizar aula':'Continuar'} ${icon('arrow')}</button>`}</div></section>`;
}
function chart(s){const data=s.chart;if(!data)return '';return graphChart(data,s,s.toggle?toggleKind:(data.kind||'bar'));}
function isSelected(i){if(feedback==='revealed'&&!step().options)return step().answer.includes(i);return selected.includes(i);}
function graphChart(d,s,kind){
 const shapes=ChartMotion.geometry(d,kind),interactive=s.type==='question'&&!s.options,max=d.max||Math.ceil(Math.max(...d.values)/10)*10,ticks=[];
 for(let value=0;value<=max;value+=d.step||max/5)ticks.push(value);
 const total=d.values.reduce((a,b)=>a+b,0);
 return `<svg class="chart ${kind==='pie'?'pie-chart':'bar-chart'}" data-kind="${kind}" viewBox="0 0 348 244" role="group" aria-label="${escapeHTML(d.caption)}. ${kind==='pie'?'Gráfico de setores.':interactive?'Toque nas barras para responder.':'Gráfico de barras.'}"><g data-axis opacity="${kind==='bar'?1:0}" aria-hidden="${kind==='pie'}">${ticks.map(value=>{const y=213-value/max*195;return `<line class="grid" x1="35" x2="339" y1="${y}" y2="${y}"/><text class="tick" x="28" y="${y+3}" text-anchor="end">${value}</text>`;}).join('')}<text class="tick" x="35" y="8">${d.unit}</text></g><g data-plot>${shapes.map((g,i)=>{
  const active=interactive&&isSelected(i),dim=interactive&&(selected.length>0||feedback==='revealed')&&!active,correct=active&&['correct','revealed'].includes(feedback),wrong=active&&feedback==='wrong';
  const accessible=kind==='bar'?`${g.key}, ${g.value} ${d.unit}`:d.labels[i];
  return `<g data-graph-key="${escapeHTML(g.key)}" ${interactive?`role="button" tabindex="0" data-chart="${i}" aria-label="${escapeHTML(accessible)}" aria-pressed="${active}"`:''}>${kind==='bar'?`<rect x="${35+i*304/d.values.length}" y="12" width="${304/d.values.length}" height="232" fill="transparent"/>`:''}<path class="shape ${kind==='pie'?'slice':'bar'} ${active?'is-selected':''}" data-shape data-points='${JSON.stringify(g.points)}' d="${ChartMotion.path(g.points)}" fill="${g.color}" opacity="${dim?0.27:1}" stroke="${active?'#132b48':'#ffffff'}" stroke-width="${active?3.5:1.5}" stroke-linejoin="round"/>${kind==='bar'?`<text class="bar-label" data-label="category" x="${g.labelX}" y="${g.labelY}" text-anchor="middle">${escapeHTML(d.labels[i])}</text>${!interactive||active?`<text class="value-label" data-label="value" x="${g.valueX}" y="${g.valueY}" text-anchor="middle">${g.value}</text>`:''}`:(d.percent||s.toggle)?`<text class="sector-label" data-label="percent" x="${g.valueX}" y="${g.valueY}" text-anchor="middle">${g.percent}%</text>`:''}${correct||wrong?`<g class="answer-marker" transform="translate(${g.markerX},${Math.max(10,g.markerY)})" pointer-events="none"><circle r="10" fill="${wrong?'#a73b22':'#087d4f'}" stroke="white" stroke-width="2"/><text y="4" text-anchor="middle" fill="white" font-size="13" font-weight="800">${wrong?'×':'✓'}</text></g>`:''}</g>`;
 }).join('')}</g></svg>${kind==='pie'||s.toggle?`<div class="legend">${shapes.map((g,i)=>`<button ${interactive?`data-action="pie-legend" data-index="${i}" aria-pressed="${isSelected(i)}"`:'disabled'} class="${interactive&&isSelected(i)?'selected':''}"><i style="background:${g.color}"></i>${escapeHTML(d.labels[i])}${d.percent||s.toggle?`<strong>${Math.round(d.values[i]/total*100)}%</strong>`:''}${interactive&&isSelected(i)&&['correct','revealed'].includes(feedback)?'<strong class="legend-check">✓</strong>':''}</button>`).join('')}</div>`:''}<p class="chart-caption">${escapeHTML(d.caption)}</p>`;
}
function selectionValid(){const s=step();return s.options?selected.length===1:selected.length===(s.pick||1);}
function select(i){if(feedback)return;const s=step();if(s.options){selected=[i];}else if(selected.includes(i)){selected=selected.filter(v=>v!==i);}else if((s.pick||1)===1){selected=[i];}else if(selected.length<(s.pick||1)){selected.push(i);}else{toast(`Selecione apenas ${s.pick} categorias. Toque em uma delas para trocar.`);return;}renderWithoutMotion();}
function renderWithoutMotion(){const talking=recordedAudio&&!recordedAudio.paused;render();$('.screen').style.animation='none';if(talking){$('.screen')?.classList.add('speaking');$('.sound')?.classList.add('speaking');}}
function check(){if(!selectionValid())return;const s=step();const correct=s.options?s.options[selected[0]]===s.answer:selected.length===s.answer.length&&selected.every(i=>s.answer.includes(i));
 if(correct){feedback='correct';if(practice){practiceRecords[key()]={selection:[...selected],revealed:false};}else if(!state.records[key()]){state.records[key()]={selection:[...selected],first:!state.records['try:'+key()],revealed:false};}save();renderWithoutMotion();speak(voiceText('correct','Isso mesmo!')+' '+voiceText(`explain-${li}-${si}`,s.explanation),false,['correct',`explain-${li}-${si}`]);}
 else{feedback='wrong';if(!practice)state.records['try:'+key()]=true;save();renderWithoutMotion();speak(voiceText('wrong','Ainda não. Você pode tentar de novo ou ouvir uma explicação.'));}}
function reveal(){const s=step();selected=s.options?[s.options.findIndex(o=>o===s.answer)]:[...s.answer];feedback='revealed';const records=practice?practiceRecords:state.records;if(!records[key()])records[key()]={selection:[...selected],first:false,revealed:true};save();renderWithoutMotion();speak(voiceText('reveal','Vamos entender a resposta.')+' '+voiceText(`explain-${li}-${si}`,s.explanation),false,['reveal',`explain-${li}-${si}`]);}
function next(){if(modalOpen)return;if(view==='lesson-done'){const nextIndex=li+1;if(nextIndex<3){startLesson(nextIndex);}else{view='complete';render();speak(narration());}return;}
 if(view!=='lesson')return;if(step().type==='question'&&!['correct','revealed'].includes(feedback)){toast('Responda e confira para continuar.');return;}
 if(si===LESSONS[li].steps.length-1){state.done[li]=true;state.indices[li]=0;state.lesson=Math.min(2,li+1);if(state.done.every(Boolean)&&!state.finishedAt)state.finishedAt=new Date().toISOString();save();view=state.done.every(Boolean)?'complete':'lesson-done';render();speak(narration());return;}
 si++;if(!practice)state.indices[li]=si;save();loadAnswer();render();speak(narration());}
function previous(){if(modalOpen||view!=='lesson'||si===0)return;si--;if(!practice)state.indices[li]=si;save();loadAnswer();render('back');speak(narration());}
function openModal(html,onClose){cancelSpeech();modalOpen=true;$('#modal-root').innerHTML=`<div class="modal-overlay"><section class="modal" role="dialog" aria-modal="true" aria-label="${onClose==='explanation'?'Explicação':'Orientações'}" tabindex="-1">${html}</section></div>`;$('#app').inert=true;bindActions($('#modal-root'));$('.modal').focus();}
function closeModal(resume=true){modalOpen=false;$('#modal-root').innerHTML='';$('#app').inert=false;cancelSpeech();if(resume){$('.lesson-caption button')?.focus();}}
function explanation(){const s=step();openModal(`<div class="modal-top"><span class="eyebrow">VAMOS ENTENDER</span><button class="icon-btn" data-action="close-modal" aria-label="Fechar explicação">${icon('close')}</button></div><h2>Por que essa resposta?</h2><p>${s.explanation}</p><button class="modal-replay" data-action="replay-explanation">${icon('sound')} Ouvir explicação</button><button class="btn" data-action="close-modal">Entendi</button>`,'explanation');speak(voiceText(`explain-${li}-${si}`,s.explanation));}
function exitModal(){openModal(`<div class="modal-top">${mascot()}<button class="icon-btn" data-action="close-modal" aria-label="Continuar na aula">${icon('close')}</button></div><h2>Uma pausa na descoberta?</h2><p>${storageAvailable?'Seu progresso fica salvo neste navegador. Você pode continuar de onde parou.':'Este navegador não permitiu salvar. Ao fechar a página, seu progresso poderá ser perdido.'}</p><div class="modal-actions"><button class="btn orange" data-action="close-modal">Continuar aprendendo</button><button class="btn secondary" data-action="home">Voltar à trilha</button></div>`);}
function award(){return `<div class="award">${mascot(true)}<div class="award-ring"></div><span class="spark">✦</span><span class="spark">✦</span><span class="spark">✧</span></div>`;}
function renderLessonDone(){return `<main class="screen"><div class="end-controls">${speakerButton()}</div><div class="lesson-body success-body">${award()}<span class="eyebrow">PARTE 0${li+1} CONCLUÍDA</span><h1>Parabéns pela<br>sua descoberta!</h1><p>Você concluiu <strong>${LESSONS[li].title.toLowerCase()}</strong>. Vamos continuar aprendendo juntos?</p></div><footer><button class="btn orange" data-action="next">Próxima descoberta ${icon('arrow')}</button><button class="review-link" data-action="home">Voltar à trilha</button></footer><div class="confetti"></div></main>`;}
function stats(){const records=Object.entries(state.records).filter(([k])=>!k.startsWith('try:')).map(([,v])=>v);return {answered:records.length,first:records.filter(r=>r.first).length};}
function renderComplete(){return `<main class="screen"><div class="end-controls">${speakerButton()}</div><section class="lesson-body success-body">${award()}<span class="completion-date">ATIVIDADE DO DIA 23</span><h1>Parabéns!<br>Atividade finalizada.</h1><p>Você leu gráficos, comparou dados e descobriu as partes de um todo.<br><strong>Seu esforço merece ser celebrado!</strong></p><div class="completion-skills"><span>✓ Leitura de gráficos</span><span>✓ Comparação de dados</span><span>✓ Partes do todo</span></div></section><footer><button class="btn orange" data-action="certificate">${icon('download')} Salvar comprovante</button><button class="review-link" data-action="home">Rever minhas descobertas</button></footer><div class="confetti"></div></main>`;}

function confetti(){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const el=$('.confetti');if(el)el.innerHTML=Array.from({length:24},(_,i)=>`<i style="left:${(i*43)%100}%;background:${['#1762ca','#cf570a','#087d68','#ac246d'][i%4]};animation-delay:${(i%7)*.12}s;transform:rotate(${i*27}deg)"></i>`).join('');}
async function certificate(){
 const date=state.finishedAt?new Date(state.finishedAt).toLocaleString('pt-BR',{timeZone:'America/Manaus'}):'';
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350"><rect width="1080" height="1350" fill="#faf9f3"/><rect x="45" y="45" width="990" height="1260" rx="42" fill="none" stroke="#e2c28e" stroke-width="3"/><text x="540" y="154" text-anchor="middle" font-family="Arial,sans-serif" font-size="26" letter-spacing="5" fill="#778167">ESCOLA JACIMAR</text><circle cx="540" cy="360" r="112" fill="#e8f3d9"/><path d="m479 359 43 43 82-88" stroke="#47ad45" stroke-width="18" fill="none" stroke-linecap="round" stroke-linejoin="round"/><g text-anchor="middle" font-family="Arial,sans-serif"><text x="540" y="570" font-size="54" font-weight="700" fill="#283421">Atividade do dia 23</text><text x="540" y="642" font-size="54" font-weight="700" fill="#283421">finalizada!</text><text x="540" y="736" font-size="27" fill="#6c775e">Matemática • 23 de outubro de 2026</text><text x="540" y="840" font-size="29" fill="#455238">✓ Leitura de gráficos de barras</text><text x="540" y="903" font-size="29" fill="#455238">✓ Comparação de dados</text><text x="540" y="966" font-size="29" fill="#455238">✓ Gráficos de setores</text><text x="540" y="1028" font-size="21" fill="#283421">${escapeHTML(window.Jacimar?.studentLabel()||'')}</text><text x="540" y="1080" font-size="27" fill="#98672d">Parabéns pela conclusão!</text><text x="540" y="1186" font-size="18" fill="#8c947f">Matemática • Professor Natanael</text><text x="540" y="1224" font-size="17" fill="#8c947f">${escapeHTML(window.Jacimar?.receiptLabel()||date)}</text></g></svg>`;
 const canvas=document.createElement('canvas');canvas.width=1080;canvas.height=1350;const blob=new Blob([svg],{type:'image/svg+xml'});const svgUrl=URL.createObjectURL(blob);const image=new Image();
 image.onload=()=>{const ctx=canvas.getContext('2d');ctx.drawImage(image,0,0);URL.revokeObjectURL(svgUrl);canvas.toBlob(png=>{if(!png){toast('Não foi possível gerar o comprovante. Tente novamente.');return;}certificateFile=new File([png],'Jacimar-atividade-dia-23.png',{type:'image/png'});if(certificateURL)URL.revokeObjectURL(certificateURL);certificateURL=URL.createObjectURL(png);openModal(`<div class="modal-top"><span class="eyebrow">SUA CONQUISTA</span><button class="icon-btn" data-action="close-modal" aria-label="Fechar comprovante">${icon('close')}</button></div><h2>Seu comprovante está pronto!</h2><img class="certificate-preview" src="${certificateURL}" alt="Comprovante de conclusão da atividade do dia 23 da Escola Jacimar"><p class="fine">No iPhone, você também pode manter o dedo sobre a imagem para salvá-la em Fotos.</p><a class="btn orange" href="${certificateURL}" download="Jacimar-atividade-dia-23.png">Salvar imagem ${icon('download')}</a>${navigator.canShare?.({files:[certificateFile]})?'<button class="btn secondary" data-action="share-certificate">Compartilhar imagem</button>':''}`);},'image/png');};
 image.onerror=()=>{URL.revokeObjectURL(svgUrl);toast('Não foi possível gerar a imagem. Tente novamente.');};image.src=svgUrl;
}
function bindChart(){
 $$('[data-chart]').forEach(el=>{const activate=()=>select(Number(el.dataset.chart));el.addEventListener('click',activate);el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();activate();}});});
}
function bindActions(root=$('#app')){ $$('[data-action]',root).forEach(el=>el.addEventListener('click',()=>action(el))); }
function action(el){
 const a=el.dataset.action;
 if(a==='sound'){voiceReady=true;state.sound=!state.sound;save();renderWithoutMotion();if(state.sound)speak(narration());else cancelSpeech();return;}
 if(a==='replay'){voiceReady=true;speak(narration(),true);return;}
 if(a==='start'){openStart();return;}
 if(a==='start-audio'||a==='start-silent'){state.started=true;state.sound=a==='start-audio';voiceReady=true;closeModal(false);save();startLesson(li);return;}
 if(a==='select-lesson'){const n=Number(el.dataset.index);if(n>0&&!state.done[n-1]&&!state.done[n]){toast('Conclua a parte anterior para abrir esta descoberta.');return;}li=n;render();return;}
 if(a==='next'){next();return;}
 if(a==='option'||a==='pie-legend'){select(Number(el.dataset.index));return;}
 if(a==='reset-selection'){if(!feedback){selected=[];renderWithoutMotion();}return;}
 if(a==='check'){check();return;}
 if(a==='retry'){feedback=null;selected=[];renderWithoutMotion();speak(voiceText('retry','Vamos tentar de novo, com calma.'));return;}
 if(a==='reveal'){reveal();return;}
 if(a==='explain'){explanation();return;}
 if(a==='replay-explanation'){voiceReady=true;speak(voiceText(`explain-${li}-${si}`,step().explanation),true);return;}
 if(a==='close-modal'){closeModal();return;}
 if(a==='exit'){exitModal();return;}
 if(a==='home'){showHome();return;}
 if(a==='show-complete'){voiceReady=true;view='complete';render();speak(narration());return;}
 if(a==='certificate'){certificate();return;}
 if(a==='share-certificate'){if(certificateFile&&navigator.share)navigator.share({files:[certificateFile],title:'Atividade do dia 23 · Escola Jacimar'}).catch(e=>{if(e.name!=='AbortError')toast('Use Salvar imagem para guardar seu comprovante.');});return;}
 if(a==='reset-progress'){openModal(`<div class="modal-top">${mascot()}<button class="icon-btn" data-action="close-modal" aria-label="Cancelar">${icon('close')}</button></div><h2>Começar do início?</h2><p>Isso apaga o progresso desta atividade somente neste navegador. Salve seu comprovante antes, se quiser guardar a conclusão.</p><button class="btn orange" data-action="confirm-reset">Sim, recomeçar a atividade</button><button class="btn secondary" data-action="close-modal">Manter meu progresso</button>`);return;}
 if(a==='confirm-reset'){closeModal(false);state=fresh();practice=false;practiceRecords={};li=0;si=0;save();showHome();return;}
 if(a==='chart-type'){toggleKind=el.dataset.type;renderWithoutMotion();speak(voiceText(toggleKind==='pie'?'switch-pie':'switch-bar'));}
}
let touchStart=null;
$('#app').addEventListener('touchstart',e=>{if(e.touches.length!==1||e.target.closest('button,[role="button"]')){touchStart=null;return;}touchStart={x:e.touches[0].clientX,y:e.touches[0].clientY};},{passive:true});
$('#app').addEventListener('touchend',e=>{if(!touchStart||modalOpen)return;const dx=e.changedTouches[0].clientX-touchStart.x,dy=e.changedTouches[0].clientY-touchStart.y;touchStart=null;if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.5){if(dx<0)next();else previous();}},{passive:true});
document.addEventListener('keydown',e=>{if(modalOpen){if(e.key==='Escape'){closeModal();return;}if(e.key==='Tab'){const els=$$('button:not([disabled]),[tabindex="0"]',$('.modal'));if(!els.length)return;const first=els[0],last=els.at(-1);if(e.shiftKey&&(document.activeElement===first||document.activeElement===$('.modal'))){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}return;}if(e.target.closest('input,textarea,select'))return;if(e.key==='ArrowLeft')previous();if(e.key==='ArrowRight')next();});
document.addEventListener('visibilitychange',()=>{if(document.hidden)cancelSpeech();});
if('speechSynthesis' in window)window.speechSynthesis.getVoices();
render();
