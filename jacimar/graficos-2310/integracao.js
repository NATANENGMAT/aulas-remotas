'use strict';
(()=>{
 const API='https://jzepdmolnoobgbgdavyf.supabase.co/functions/v1/graficos-2310',KEY='sb_publishable_wjcJ0tnDxK9ucEu3B3vchQ_CtMn6R8M',PANEL='https://natanengmat.github.io/aulas-remotas/painel/jacimar.html';
 let identity=null,request=0,sending=false;
 const originalRender=render;
 async function api(route,body){const r=await fetch(API+'/'+route,{method:body?'POST':'GET',headers:{apikey:KEY,...(body?{'Content-Type':'application/json'}:{}),...(identity?{'x-session':identity.token}:{})},body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(20000)});const d=await r.json();if(!r.ok)throw Error(d.error||'Não foi possível conectar. Tente novamente.');return d;}
 const time=d=>new Intl.DateTimeFormat('pt-BR',{timeZone:'America/Manaus',dateStyle:'short',timeStyle:'short'}).format(new Date(d));
 window.Jacimar={studentLabel:()=>identity?identity.aluno.nome+' · '+identity.aluno.turma.replace('º T','º '):'',receiptLabel:()=>identity?.entrega?'Entregue '+time(identity.entrega.enviada_em)+' · '+identity.entrega.protocolo:''};
 function login(){cancelSpeech();closeModal(false);view='login';$('#app').innerHTML=`<main class="screen identity-screen"><header class="opening-header"><img class="school-crest" src="assets/brasao-jacimar.png" alt="Brasão da Escola Jacimar"><div><span class="school-name">Escola Jacimar</span><strong>Atividade remota do dia 23</strong><p>Matemática · Professor Natanael</p></div></header><section class="identity-body">${mascot(true)}<h1>Vamos começar?</h1><p>Escolha sua turma e seu nome.</p><form id="identify"><label for="classSelect">Sua turma</label><select id="classSelect" required><option value="">Selecione a turma</option><option value="2º T4">2º 4</option><option value="3º T1">3º 1</option><option value="3º T2">3º 2</option></select><label for="studentSelect">Seu nome</label><select id="studentSelect" required disabled><option value="">Selecione a turma primeiro</option></select><p id="loginStatus" role="status"></p><button type="button" id="retryNames" hidden>Carregar nomes novamente</button><button class="btn orange" id="enterActivity">Entrar na atividade →</button></form></section><footer class="identity-notes"><p>Sem prazo final. Você pode refazer quantas vezes quiser; vale a última tentativa entregue.</p><p>Alunos e responsáveis podem consultar nome, turma e entrega no painel geral.</p><a href="${PANEL}" target="_blank" rel="noopener">Consultar painel geral ↗</a></footer></main>`;
 const turma=$('#classSelect'),aluno=$('#studentSelect'),status=$('#loginStatus');
 async function names(){const id=++request,t=turma.value;aluno.disabled=true;aluno.replaceChildren(new Option(t?'Carregando nomes…':'Selecione a turma primeiro',''));status.textContent='';$('#retryNames').hidden=true;if(!t)return;try{const d=await api('alunos?turma='+encodeURIComponent(t));if(id!==request)return;aluno.replaceChildren(new Option('Selecione seu nome',''),...d.alunos.map(a=>new Option(a.nome,a.id)));aluno.disabled=false;}catch(e){if(id!==request)return;status.textContent=e.message;$('#retryNames').hidden=false;}}
 turma.onchange=names;$('#retryNames').onclick=names;
 $('#identify').onsubmit=async e=>{e.preventDefault();const b=$('#enterActivity');b.disabled=true;turma.disabled=true;aluno.disabled=true;status.textContent='Conferindo seu acesso…';try{identity=await api('entrar',{turma:turma.value,aluno_id:aluno.value});STORAGE='jacimar-graficos-23-aluno-'+identity.aluno.id;state=fresh();try{const saved=JSON.parse(localStorage.getItem(STORAGE)||'null');if(saved?.version===2&&saved.indices?.length===3&&saved.done?.length===3&&saved.records)state={...fresh(),...saved};}catch{}li=state.lesson;si=state.indices[li]||0;practice=false;practiceRecords={};view='home';render();}catch(err){status.textContent=err.message;b.disabled=false;turma.disabled=false;aluno.disabled=false;}};
 }
 function receiptText(){return identity.entrega?'✓ Entregue em '+time(identity.entrega.enviada_em)+' · Manaus. Protocolo: '+identity.entrega.protocolo:'Ao terminar as três partes, toque em Entregar atividade para registrar no painel.';}
 render=function(direction){if(!identity){login();return;}originalRender(direction);
 if(view==='home'){
  const heading=$('.home-heading p');heading.textContent=identity.aluno.nome+' · '+identity.aluno.turma.replace('º T','º ');
  const footer=$('.home-foot');footer.innerHTML='<button class="restart" id="changeStudent">Trocar aluno</button><a href="'+PANEL+'" target="_blank" rel="noopener">Painel geral ↗</a>'+(state.started?'<button class="restart" id="newAttempt">Refazer atividade</button>':'');
  $('#changeStudent').onclick=()=>{save();identity=null;state=fresh();practice=false;login();};
  if($('#newAttempt'))$('#newAttempt').onclick=()=>action({dataset:{action:'reset-progress'}});
  if(identity.entrega){const note=document.createElement('small');note.className='delivered-note';note.textContent='✓ Já entregue. Uma nova tentativa só substitui a entrega ao enviar novamente.';$('.home-card').append(note);}
 }
 if(view==='complete'){
  const skills=$('.completion-skills');skills.innerHTML='<span>✓ As três partes foram concluídas</span>';
  const footer=$('#app footer'),box=document.createElement('div');box.className='delivery-box';box.innerHTML='<button class="btn orange" id="submitActivity">Entregar atividade →</button><p id="deliveryStatus" role="status"></p><a href="'+PANEL+'" target="_blank" rel="noopener">Consultar painel geral ↗</a>';footer.prepend(box);
  $('#deliveryStatus').textContent=state.receipt?'✓ Entrega desta tentativa registrada em '+time(state.receipt.enviada_em)+' · Manaus.':identity.entrega?'Você já entregou antes. Envie novamente para registrar esta tentativa.':'Falta registrar sua entrega no painel.';
  const b=$('#submitActivity');b.disabled=Boolean(state.receipt)||sending;b.textContent=state.receipt?'✓ Atividade entregue':'Entregar atividade →';b.onclick=submit;
 }
 };
 async function submit(){if(sending)return;const answers=LESSONS.flatMap((l,i)=>l.steps.flatMap((s,j)=>s.type==='question'?[(state.records[i+':'+j]?.selection||[]).slice().sort((a,b)=>a-b)]:[]));if(!state.done.every(Boolean)||answers.some(a=>!a.length)){toast('Conclua as três partes antes de entregar.');return;}
 if(!state.pendingSubmission){state.pendingSubmission={envio:crypto.randomUUID(),respostas:answers};save();}
 sending=true;$('#submitActivity').disabled=true;$('#deliveryStatus').textContent='Registrando sua entrega…';
 try{const receipt=await api('entregar',state.pendingSubmission);state.receipt=receipt;identity.entrega=receipt;save();render();openModal(`<div class="modal-top">${mascot()}<button class="icon-btn" data-action="close-modal" aria-label="Fechar">${icon('close')}</button></div><h2>Parabéns! Atividade entregue.</h2><p>Sua atividade do dia 23 já está registrada no painel geral.</p><p class="fine">${escapeHTML(identity.aluno.nome)} · ${escapeHTML(identity.aluno.turma)}<br>${time(receipt.enviada_em)} · Manaus<br>Protocolo: ${receipt.protocolo}</p><button class="btn orange" data-action="certificate">Salvar comprovante em imagem</button><button class="btn secondary" data-action="close-modal">Concluir</button>`);}catch(e){$('#deliveryStatus').textContent=e.message+' Sua tentativa está salva; toque em Entregar para tentar novamente.';$('#submitActivity').disabled=false;}finally{sending=false;}
 }
 login();
})();
