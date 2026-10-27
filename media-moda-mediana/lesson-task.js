window.setupLessonTask=function(slide,s,si,answered,onScore){
  const source=slide.querySelector(".sourcezone"),target=slide.querySelector(".targetzone"),check=slide.querySelector(".checkbtn"),reset=slide.querySelector(".resetbtn"),answerPanel=slide.querySelector(".answerpanel"),answers=[...slide.querySelectorAll(".answers button")],sortFeedback=slide.querySelector(".sortfeedback"),answerFeedback=slide.querySelector(".answerfeedback");
  let drag=null;const allTiles=()=>[...slide.querySelectorAll(".tile")],targetVals=()=>[...target.querySelectorAll(".tile")].map(t=>Number(t.textContent.trim()));
  const isSorted=a=>a.length===s.values.length&&a.every((v,i)=>i===0||a[i-1]<=v);
  const shuffleSource=()=>{
    const nodes=allTiles();
    nodes.forEach(n=>{n.classList.remove("locked","dragging");source.appendChild(n)});
    for(let i=nodes.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));source.insertBefore(nodes[j],nodes[i])}
    const vals=[...source.querySelectorAll(".tile")].map(t=>Number(t.textContent.trim()));
    if(vals.length>1&&vals.every((v,i)=>i===0||vals[i-1]<=v))source.appendChild(source.firstElementChild);
  };
  const placeFromPoint=(tile,x,y)=>{
    const el=document.elementFromPoint(x,y);
    const underTile=el?.closest?.(".tile");
    const zone=el?.closest?.(".dropzone");
    if(underTile&&underTile!==tile&&(underTile.parentElement===source||underTile.parentElement===target)){
      const r=underTile.getBoundingClientRect();
      underTile.parentElement.insertBefore(tile,x<r.left+r.width/2?underTile:underTile.nextSibling);
    }else if(zone===source||zone===target){zone.appendChild(tile)}
  };
  shuffleSource();
  allTiles().forEach(tile=>{
    tile.addEventListener("pointerdown",e=>{
      if(tile.classList.contains("locked"))return;
      drag={tile,x:e.clientX,y:e.clientY,moved:false};tile.setPointerCapture?.(e.pointerId);
    });
    tile.addEventListener("pointermove",e=>{
      if(!drag||drag.tile!==tile||tile.classList.contains("locked"))return;
      if(Math.hypot(e.clientX-drag.x,e.clientY-drag.y)>7)drag.moved=true;
      if(!drag.moved)return;
      tile.classList.add("dragging");placeFromPoint(tile,e.clientX,e.clientY);
    });
    tile.addEventListener("pointerup",()=>{
      if(!drag||drag.tile!==tile)return;
      tile.classList.remove("dragging");
      if(!drag.moved){(tile.parentElement===source?target:source).appendChild(tile)}
      drag=null;
    });
    tile.addEventListener("pointercancel",()=>{tile.classList.remove("dragging");drag=null});
  });
  check.addEventListener("click",()=>{
    const vals=targetVals();
    if(vals.length!==s.values.length){sortFeedback.className="feedback bad";sortFeedback.innerHTML="Leve <strong>todos os números</strong> para a área ROL.";return}
    if(!isSorted(vals)){sortFeedback.className="feedback bad";sortFeedback.innerHTML="Ainda não. Organize o ROL do <strong>menor para o maior</strong>.";return}
    allTiles().forEach(t=>t.classList.add("locked"));check.disabled=true;reset.disabled=true;
    sortFeedback.className="feedback good";sortFeedback.innerHTML=`✅ <strong>ROL correto.</strong> ${s.explain||""}`;
    if(s.type==="rol_task"){
      if(!answered[si]){answered[si]=true;onScore()}
    }else{
      answerPanel.classList.remove("locked");answers.forEach(b=>b.disabled=false);
    }
  });
  reset.addEventListener("click",()=>{
    check.disabled=false;reset.disabled=false;allTiles().forEach(t=>t.classList.remove("locked"));
    shuffleSource();sortFeedback.className="feedback";sortFeedback.textContent="Monte o ROL.";
    if(answerPanel){answerPanel.classList.add("locked");answers.forEach(b=>{b.disabled=true;b.classList.remove("correct","wrong")});answerFeedback.className="feedback answerfeedback";answerFeedback.textContent="A resposta será liberada depois do ROL."}
  });
  answers.forEach((btn,k)=>btn.addEventListener("click",()=>{
    if(btn.disabled)return;
    answers.forEach(b=>b.classList.remove("correct","wrong"));
    if(k===s.correct){
      btn.classList.add("correct");answerFeedback.className="feedback answerfeedback good";answerFeedback.innerHTML=`✅ <strong>Correto!</strong> ${s.explain}`;
      if(!answered[si]){answered[si]=true;onScore()}
    }else{
      btn.classList.add("wrong");answerFeedback.className="feedback answerfeedback bad";answerFeedback.innerHTML="Ainda não. Use o ROL que você montou e tente novamente.";
    }
  }));
};