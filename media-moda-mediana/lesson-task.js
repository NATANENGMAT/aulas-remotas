window.setupLessonTask = function(slide,s,si,answered,onScore){
  const zone=slide.querySelector(".sortzone"),check=slide.querySelector(".checkbtn"),reset=slide.querySelector(".resetbtn"),panel=slide.querySelector(".answerpanel"),answers=[...slide.querySelectorAll(".answers button")],feedback=slide.querySelector(".feedback");
  let selected=null,drag=null;
  const vals=()=>[...zone.querySelectorAll(".tile")].map(t=>Number(t.textContent.trim()));
  const sorted=a=>a.every((v,i)=>i===0||a[i-1]<=v);
  const shuffle=()=>{
    const nodes=[...zone.children];
    for(let i=nodes.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[nodes[i],nodes[j]]=[nodes[j],nodes[i]]}
    nodes.forEach(n=>{n.classList.remove("locked","selected","dragging");zone.appendChild(n)});
    if(sorted(vals())&&nodes.length>1)zone.insertBefore(zone.lastElementChild,zone.firstElementChild);
  };
  const swap=(a,b)=>{
    if(a===b)return;
    const aNext=a.nextSibling===b?a:a.nextSibling;
    b.parentNode.insertBefore(a,b);a.parentNode.insertBefore(b,aNext);
  };
  shuffle();
  zone.querySelectorAll(".tile").forEach(tile=>{
    tile.addEventListener("pointerdown",e=>{
      if(tile.classList.contains("locked"))return;
      drag={tile,x:e.clientX,y:e.clientY,moved:false};tile.setPointerCapture?.(e.pointerId);
    });
    tile.addEventListener("pointermove",e=>{
      if(!drag||drag.tile!==tile||tile.classList.contains("locked"))return;
      if(Math.hypot(e.clientX-drag.x,e.clientY-drag.y)>7)drag.moved=true;
      if(!drag.moved)return;
      tile.classList.add("dragging");
      const under=document.elementFromPoint(e.clientX,e.clientY)?.closest?.(".tile");
      if(under&&under!==tile&&under.parentElement===zone){
        const r=under.getBoundingClientRect();
        zone.insertBefore(tile,e.clientX<r.left+r.width/2?under:under.nextSibling);
      }
    });
    tile.addEventListener("pointerup",()=>{
      if(!drag||drag.tile!==tile)return;
      tile.classList.remove("dragging");
      if(!drag.moved){
        if(!selected){selected=tile;tile.classList.add("selected")}
        else if(selected===tile){selected.classList.remove("selected");selected=null}
        else{selected.classList.remove("selected");swap(selected,tile);selected=null}
      }
      drag=null;
    });
    tile.addEventListener("pointercancel",()=>{tile.classList.remove("dragging");drag=null});
  });
  check.addEventListener("click",()=>{
    if(sorted(vals())){
      zone.querySelectorAll(".tile").forEach(t=>{t.classList.add("locked");t.classList.remove("selected")});
      panel.classList.remove("locked");answers.forEach(b=>b.disabled=false);
      feedback.className="feedback good";feedback.innerHTML="✅ <strong>ROL correto.</strong> Agora responda a pergunta.";
      check.disabled=true;reset.disabled=true;
    }else{
      feedback.className="feedback bad";feedback.innerHTML='Ainda não. O ROL deve ficar em <strong>ordem crescente</strong>, do menor para o maior.';
    }
  });
  reset.addEventListener("click",()=>{
    check.disabled=false;reset.disabled=false;panel.classList.add("locked");
    answers.forEach(b=>{b.disabled=true;b.classList.remove("correct","wrong")});
    feedback.className="feedback";feedback.textContent="Primeiro monte e confira o ROL.";
    selected=null;shuffle();
  });
  answers.forEach((btn,k)=>btn.addEventListener("click",()=>{
    if(btn.disabled)return;
    answers.forEach(b=>b.classList.remove("correct","wrong"));
    if(k===s.correct){
      btn.classList.add("correct");feedback.className="feedback good";feedback.innerHTML=`✅ <strong>Correto!</strong> ${s.explain}`;
      if(!answered[si]){answered[si]=true;onScore()}
    }else{
      btn.classList.add("wrong");feedback.className="feedback bad";feedback.innerHTML="Resposta ainda não correta. Use o ROL que você montou e tente novamente.";
    }
  }));
};