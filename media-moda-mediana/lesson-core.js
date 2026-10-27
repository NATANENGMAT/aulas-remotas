const STAGES=window.LESSON_STAGES;
const taskCount=STAGES.filter(s=>s.type==="task"||s.type==="rol_task").length;
const slidesRoot=document.getElementById("slides"),prog=document.getElementById("prog"),prev=document.getElementById("prev"),next=document.getElementById("next"),count=document.getElementById("count"),scoreText=document.getElementById("scoreText");
let current=0,score=0;const answered=new Array(STAGES.length).fill(false);
const notebook=a=>`<div class="notebook">${a.map(x=>`<p>${x}</p>`).join("")}</div>`;
function taskHTML(s,i){
  const rolOnly=s.type==="rol_task";
  return `<section class="slide" data-slide="${i}">
    <div class="tag">${s.tag}</div><h2>${s.title}</h2>
    <div class="taskgrid">
      <div class="panel">
        <h3>${rolOnly?"Monte o ROL em ordem crescente":"1º — Monte o ROL em ordem crescente"}</h3>
        <div class="sortwrap">
          <div class="zones">
            <div class="zonebox">
              <div class="sortlabel">DADOS</div>
              <div class="sourcezone dropzone">${s.values.map((v,k)=>`<button type="button" class="tile" data-id="${k}">${v}</button>`).join("")}</div>
            </div>
            <div class="moveArrow">→</div>
            <div class="zonebox rolbox">
              <div class="sortlabel">ROL</div>
              <div class="targetzone dropzone"></div>
            </div>
          </div>
          <div class="sorthelp">Arraste os números de <strong>DADOS</strong> para <strong>ROL</strong>, do menor para o maior.</div>
          <div class="checkrow"><button type="button" class="checkbtn">Conferir ROL</button><button type="button" class="resetbtn">Recomeçar</button></div>
          <div class="feedback sortfeedback" aria-live="polite">Monte o ROL.</div>
        </div>
      </div>
      ${rolOnly?"":`<div class="panel answerpanel locked"><h3>2º — ${s.question}</h3><div class="answers">${s.answers.map((a,k)=>`<button type="button" data-answer="${k}" disabled>${a}</button>`).join("")}</div><div class="feedback answerfeedback" aria-live="polite">A resposta será liberada depois do ROL.</div></div>`}
    </div>
  </section>`;
}
function render(s,i){
  if(s.type==="task"||s.type==="rol_task")return taskHTML(s,i);
  if(s.type==="copy")return `<section class="slide" data-slide="${i}"><div class="tag copytag">${s.tag}</div><h1>${s.title}</h1>${notebook(s.copy)}${s.note?`<div class="note">${s.note}</div>`:""}</section>`;
  return `<section class="slide" data-slide="${i}"><div class="tag copytag">${s.tag}</div><h1>${s.title}</h1><div class="finalbox">${s.body}</div>${notebook(s.copy)}<div class="finalbox">Atividades concluídas: <strong id="finalScore">${score}/${taskCount}</strong></div></section>`;
}
function build(){
  slidesRoot.innerHTML=STAGES.map(render).join("");
  document.querySelectorAll(".slide").forEach((slide,i)=>{
    const s=STAGES[i];
    if(s.type==="task"||s.type==="rol_task")setupLessonTask(slide,s,i,answered,()=>{score++;scoreText.textContent=`${score}/${taskCount}`});
  });
  show(0);
}
function show(i){
  current=Math.max(0,Math.min(STAGES.length-1,i));
  document.querySelectorAll(".slide").forEach((s,n)=>s.classList.toggle("on",n===current));
  prog.style.width=`${(current+1)/STAGES.length*100}%`;count.textContent=`Etapa ${current+1} de ${STAGES.length}`;
  prev.disabled=current===0;next.textContent=current===STAGES.length-1?"Recomeçar ↻":"Próximo →";
  const fs=document.getElementById("finalScore");if(fs)fs.textContent=`${score}/${taskCount}`;
}
prev.addEventListener("click",()=>show(current-1));
next.addEventListener("click",()=>{if(current===STAGES.length-1){score=0;answered.fill(false);scoreText.textContent=`0/${taskCount}`;build()}else show(current+1)});
document.addEventListener("keydown",e=>{if(["INPUT","TEXTAREA","SELECT"].includes(document.activeElement?.tagName))return;if(e.key==="ArrowRight")show(current+1);if(e.key==="ArrowLeft")show(current-1)});
build();