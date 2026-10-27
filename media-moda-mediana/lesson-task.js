window.setupLessonTask=function(slide,s,si,answered,onScore){
  const source=slide.querySelector(".sourcezone");
  const target=slide.querySelector(".targetzone");
  const check=slide.querySelector(".checkbtn");
  const reset=slide.querySelector(".resetbtn");
  const answerPanel=slide.querySelector(".answerpanel");
  const answers=[...slide.querySelectorAll(".answers button")];
  const sortFeedback=slide.querySelector(".sortfeedback");
  const answerFeedback=slide.querySelector(".answerfeedback");

  const allTiles=()=>[...slide.querySelectorAll(".tile")];
  const targetVals=()=>[...target.querySelectorAll(".tile")].map(t=>Number(t.textContent.trim()));
  const isSorted=a=>a.length===s.values.length&&a.every((v,i)=>i===0||a[i-1]<=v);

  function shuffleSource(){
    const nodes=allTiles();
    nodes.forEach(n=>{
      n.classList.remove("locked");
      source.appendChild(n);
    });
    for(let i=nodes.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [nodes[i],nodes[j]]=[nodes[j],nodes[i]];
    }
    if(nodes.length>1){
      const vals=nodes.map(n=>Number(n.textContent.trim()));
      const sorted=vals.every((v,i)=>i===0||vals[i-1]<=v);
      if(sorted)[nodes[0],nodes[nodes.length-1]]=[nodes[nodes.length-1],nodes[0]];
    }
    nodes.forEach(n=>source.appendChild(n));
  }

  function updateTargetState(){
    target.classList.toggle("hasitems",target.children.length>0);
  }

  function moveTile(tile){
    if(tile.classList.contains("locked"))return;
    if(tile.parentElement===source){
      target.appendChild(tile);
    }else{
      source.appendChild(tile);
    }
    updateTargetState();
    sortFeedback.className="feedback sortfeedback";
    sortFeedback.textContent=target.children.length===s.values.length?"Agora confira o ROL.":"Clique nos números na ordem crescente.";
  }

  shuffleSource();
  updateTargetState();

  allTiles().forEach(tile=>{
    tile.addEventListener("click",()=>moveTile(tile));
  });

  check.addEventListener("click",()=>{
    const vals=targetVals();
    if(vals.length!==s.values.length){
      sortFeedback.className="feedback sortfeedback bad";
      sortFeedback.innerHTML="Coloque <strong>todos os números</strong> na área ROL.";
      return;
    }
    if(!isSorted(vals)){
      sortFeedback.className="feedback sortfeedback bad";
      sortFeedback.innerHTML="Ainda não. O ROL deve ficar do <strong>menor para o maior</strong>. Toque em um número do ROL para devolvê-lo a DADOS e tente novamente.";
      return;
    }

    allTiles().forEach(t=>t.classList.add("locked"));
    check.disabled=true;
    reset.disabled=true;

    if(s.type==="rol_task"){
      sortFeedback.className="feedback sortfeedback good";
      sortFeedback.innerHTML=`✅ <strong>ROL correto.</strong> ${s.explain||""}`;
      if(!answered[si]){answered[si]=true;onScore()}
    }else{
      sortFeedback.className="feedback sortfeedback good";
      sortFeedback.innerHTML="✅ <strong>ROL correto.</strong> Agora faça o cálculo abaixo.";
      answerPanel.classList.remove("locked");
      answers.forEach(b=>b.disabled=false);
    }
  });

  reset.addEventListener("click",()=>{
    check.disabled=false;
    reset.disabled=false;
    allTiles().forEach(t=>t.classList.remove("locked"));
    shuffleSource();
    updateTargetState();
    sortFeedback.className="feedback sortfeedback";
    sortFeedback.textContent="Clique nos números na ordem crescente.";
    if(answerPanel){
      answerPanel.classList.add("locked");
      answers.forEach(b=>{
        b.disabled=true;
        b.classList.remove("correct","wrong");
      });
      answerFeedback.className="feedback answerfeedback";
      answerFeedback.textContent="A resposta será liberada depois do ROL.";
    }
  });

  answers.forEach((btn,k)=>btn.addEventListener("click",()=>{
    if(btn.disabled)return;
    answers.forEach(b=>b.classList.remove("correct","wrong"));
    if(k===s.correct){
      btn.classList.add("correct");
      answerFeedback.className="feedback answerfeedback good";
      answerFeedback.innerHTML=`✅ <strong>Correto!</strong> ${s.explain}`;
      if(!answered[si]){answered[si]=true;onScore()}
    }else{
      btn.classList.add("wrong");
      answerFeedback.className="feedback answerfeedback bad";
      answerFeedback.innerHTML="Ainda não. Use o ROL que você montou e tente novamente.";
    }
  }));
};