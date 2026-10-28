'use strict';
let competitionRun=null,competitionReceipt=null,pendingAnswer=null,rankReturn='intro',rankSerial=0,joining=false;
const SUPABASE_ENDPOINT='https://jzepdmolnoobgbgdavyf.supabase.co/functions/v1/orbita-2910';
const SUPABASE_KEY='sb_publishable_wjcJ0tnDxK9ucEu3B3vchQ_CtMn6R8M';
let studentSession='';try{studentSession=sessionStorage.getItem('orbita-session-v1')||'';}catch{}
async function gameRequest(path,body){const response=await fetch(SUPABASE_ENDPOINT+path,{method:body===undefined?'GET':'POST',headers:{apikey:SUPABASE_KEY,'x-session':studentSession,'Content-Type':'application/json'},body:body===undefined?undefined:JSON.stringify(body),cache:'no-store'});return response;}
let trainingCompleted=false,currentPlayer=null,rosterSerial=0;
try{const pref=JSON.parse(localStorage.getItem('orbita-student-v1')||'null');if(pref){$('#classroom').value=pref.classroom;trainingCompleted=localStorage.getItem('orbita-trained-'+pref.studentId)==='yes';}}catch{}
$('#skip').hidden=!trainingCompleted;
async function api(body){const response=await gameRequest('',body);let data;try{data=await response.json();}catch{throw new Error('Sem conexão com o ranking. Tente novamente.');}if(!response.ok)throw new Error(data.error||'Não foi possível salvar. Tente novamente.');if(body.action==='register'&&data.token){studentSession=data.token;try{sessionStorage.setItem('orbita-session-v1',studentSession);}catch{}delete data.token;}return data;}
async function loadRoster(){const serial=++rosterSerial;$('#student').disabled=true;$('#student').replaceChildren(new Option('Carregando lista…',''));try{const response=await gameRequest('/alunos?classroom='+encodeURIComponent($('#classroom').value));const data=await response.json();if(serial!==rosterSerial)return;if(!response.ok)throw Error(data.error);$('#student').replaceChildren(new Option('Selecione seu nome',''),...data.alunos.map(a=>new Option(a.nome,a.id)));$('#student').disabled=false;try{const pref=JSON.parse(localStorage.getItem('orbita-student-v1')||'null');if(pref&&pref.classroom===$('#classroom').value)$('#student').value=pref.studentId;}catch{}$('#entrymsg').textContent='Selecione seu próprio nome. Seu melhor resultado fica salvo no Supabase.';}catch(e){if(serial!==rosterSerial)return;$('#student').replaceChildren(new Option('Lista indisponível',''));$('#entrymsg').textContent=e.message||'Não foi possível carregar os nomes.';}}
async function registerPlayer(){if($('#student').disabled||!$('#entry').reportValidity())return false;const data=await api({action:'register',studentId:$('#student').value,classroom:$('#classroom').value});currentPlayer=data.player;trainingCompleted=false;try{trainingCompleted=localStorage.getItem('orbita-trained-'+currentPlayer.id)==='yes';}catch{}$('#skip').hidden=!trainingCompleted;try{localStorage.setItem('orbita-student-v1',JSON.stringify({studentId:data.player.id,classroom:data.player.classroom}));}catch{}return true;}
$('#classroom').onchange=loadRoster;
loadRoster();
async function enter(training){if(joining)return;joining=true;$('#start').disabled=true;$('#skip').disabled=true;$('#entrymsg').textContent='Conectando à central…';try{if(await registerPlayer()){if(training)start(true);else await beginCompetition();$('#entrymsg').textContent='Selecione seu próprio nome. Seu melhor resultado fica salvo no Supabase.';}}catch(e){$('#entrymsg').textContent=e.message;}finally{joining=false;$('#start').disabled=false;$('#skip').disabled=false;}}
$('#entry').onsubmit=e=>{e.preventDefault();enter(true);};
$('#start').onclick=()=>enter(true);
$('#skip').onclick=()=>enter(false);
function completeTraining(){trainingCompleted=true;try{localStorage.setItem('orbita-trained-'+currentPlayer.id,'yes');}catch{}$('#skip').hidden=false;mode='ready';show('ready');GameFX.stop();window.scrollTo(0,0);}
async function beginCompetition(){
 if(!trainingCompleted){start(true);return;}
 const guard=++token;mode='countdown';busy=true;show('countdown');window.scrollTo(0,0);GameFX.stop();competitionReceipt=null;pendingAnswer=null;
 try{
  for(const n of [3,2,1]){if(guard!==token)return;$('#countNumber').textContent=n;await new Promise(r=>setTimeout(r,900));}
  if(guard!==token)return;$('#countNumber').textContent='VAI!';
  const data=await api({action:'start'});if(guard!==token)return;competitionRun=data.runId;
  mode='mission';tasks=data.tasks;index=0;errors=0;firsts=0;started=performance.now();show('play');GameFX.reset();load();
 }catch(e){if(guard!==token)return;mode='ready';busy=false;show('ready');$('#readymsg').textContent=e.message;}
}
async function submitAnswer(dest){
 if(!pendingAnswer||pendingAnswer.index!==index||pendingAnswer.x!==dest.x||pendingAnswer.y!==dest.y)pendingAnswer={action:'answer',runId:competitionRun,index,x:dest.x,y:dest.y,requestId:crypto.randomUUID()};
 const result=await api(pendingAnswer);pendingAnswer=null;return result;
}
async function useHint(){
 if(busy||solved)return;
 if(pendingAnswer){say('Primeiro reenvie a rota para confirmar o registro anterior.','bad');return;}
 if(mode==='mission'){busy=true;controls();try{await api({action:'hint',runId:competitionRun,index,requestId:crypto.randomUUID()});}catch(e){busy=false;controls();say(e.message,'bad');return;}busy=false;}
 hinted=true;drawMap(true);controls();say('Siga o caminho: X → coluna; depois Y ↑ altura. Com dica, este resgate não conta como acerto de primeira.');
}
async function loadRanking(){
 const serial=++rankSerial;$('#rankStatus').textContent='Buscando resultados…';
 try{const response=await gameRequest('/ranking?classroom='+encodeURIComponent($('#rankClass').value));const data=await response.json();if(serial!==rankSerial||mode!=='ranking')return;if(!response.ok)throw new Error(data.error);$('#rankList').replaceChildren();for(const row of data.rows){const li=document.createElement('li');li.classList.toggle('mine',row.mine);const pos=document.createElement('b');pos.className='position';pos.textContent=({1:'🥇',2:'🥈',3:'🥉'})[row.position]||row.position+'º';pos.setAttribute('aria-label',row.position+'º lugar');const name=document.createElement('span');name.className='rankname';name.textContent=row.nickname+(row.mine?' · você':'');const detail=document.createElement('span');detail.className='rankdetail';detail.textContent=row.firsts+'/10 de primeira · '+row.errors+' ajuste(s)';name.append(detail);const time=document.createElement('span');time.className='ranktime';time.textContent=format(row.elapsed);li.append(pos,name,time);$('#rankList').append(li);}const mine=data.rows.find(r=>r.mine);$('#rankStatus').textContent=data.rows.length?(mine?'Sua posição: '+mine.position+'º · ':'')+data.rows.length+' participante(s) · atualizado agora':'Ainda sem resultados nesta turma. Complete uma partida para aparecer!';}
 catch(e){if(serial===rankSerial){$('#rankStatus').textContent=e.message||'Ranking indisponível. Tente atualizar.';$('#rankList').replaceChildren();}}
}
function openRanking(){rankReturn=mode==='result'?'result':'intro';mode='ranking';show('leaderboard');$('#rankClass').value=$('#classroom').value;GameFX.stop();window.scrollTo(0,0);loadRanking();}
$('#rankingIntro').onclick=async()=>{if(joining)return;joining=true;try{if(await registerPlayer())openRanking();}catch(e){$('#entrymsg').textContent=e.message;}finally{joining=false;}};$('#rankingResult').onclick=openRanking;
$('#rankClass').onchange=()=>{$('#rankList').replaceChildren();loadRanking();};$('#refreshRank').onclick=loadRanking;
$('#backRank').onclick=()=>{rankSerial++;mode=rankReturn;show(rankReturn);window.scrollTo(0,0);};
$('#beginMission').onclick=beginCompetition;$('#moreTraining').onclick=()=>start(true);
setInterval(()=>{if(mode==='ranking'&&!document.hidden)loadRanking();},10000);
const originalHome=$('#home').onclick;
$('#home').onclick=()=>{if((mode==='mission'||mode==='countdown')&&!confirm('Voltar à base? Esta partida será encerrada. Seu melhor resultado permanece salvo.'))return;originalHome();rankSerial++;};

