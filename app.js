const entries=[...CONTENT.prose.map((x,i)=>({...x,type:"prose",n:i+1,book:"FIRST FLIGHT · PROSE"})),...CONTENT.poems.map((x,i)=>({...x,type:"poems",n:i+1,book:"FIRST FLIGHT · POETRY"})),...CONTENT.supplementary.map((x,i)=>({...x,type:"supplementary",n:i+1,book:"FOOTPRINTS WITHOUT FEET"}))];let filter="all";const cards=document.querySelector("#cards"),search=document.querySelector("#search");function render(){let q=search.value.toLowerCase().trim(),list=entries.filter(x=>(filter==="all"||x.type===filter)&&JSON.stringify(x).toLowerCase().includes(q));cards.innerHTML=list.map(x=>`<article class="lesson"><div class="meta"><span>${x.book}</span><span>${x.type.toUpperCase()}</span></div><div class="num">${String(x.n).padStart(2,"0")}</div><h3>${x.title}</h3><p>${x.hook}</p><button data-index="${entries.indexOf(x)}">Open lesson guide →</button></article>`).join("");document.querySelector("#empty").hidden=!!list.length;cards.querySelectorAll("button").forEach(b=>b.onclick=()=>open(entries[+b.dataset.index]));}document.querySelectorAll(".tabs button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".tabs button").forEach(x=>x.classList.remove("active"));b.classList.add("active");filter=b.dataset.type;render()});search.oninput=render;function esc(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function open(x){
  const guide=x.fullGuide;
  if(guide){
    const list=(items)=>`<ul>${items.map(v=>`<li>${esc(v)}</li>`).join("")}</ul>`;
    const qa=(items)=>items.map((q,i)=>`<section class="block wide"><h3>${i+1}. ${esc(q.prompt)}</h3><p>${esc(q.answer)}</p>${q.simple?`<p><strong>Simplified answer:</strong> ${esc(q.simple)}</p>`:""}${q.why?`<p><strong>Why:</strong> ${esc(q.why)}</p>`:""}</section>`).join("");
    const themes=guide.themes.map(t=>`<section class="block"><h3>${esc(t.name)}</h3><p>${esc(t.detail)}</p></section>`).join("");
    const characters=guide.characters.map(t=>`<section class="block"><h3>${esc(t.name)}</h3><p>${esc(t.detail)}</p></section>`).join("");
    const mcqs=guide.competencyQuestions.map((q,i)=>`<section class="block wide"><h3>${i+1}. ${esc(q.prompt)}</h3>${q.options?list(q.options):""}<details><summary>Reveal answer and explanation</summary><p><strong>Answer:</strong> ${esc(q.answer)}</p><p>${esc(q.why)}</p></details></section>`).join("");
    document.querySelector("#detail").innerHTML=`<div class="meta">${esc(x.book)} · COMPLETE CHAPTER GUIDE</div><h2>${esc(x.title)}</h2><p class="lead">${esc(x.hook)}</p>
    <div class="detailgrid">
      <section class="block wide"><h3>Learning goals</h3>${list(guide.learningGoals)}</section>
      <section class="block wide"><h3>Detailed chapter summary</h3>${list(guide.detailedSummary)}</section>
      <section class="block wide"><h3>Major themes</h3><div class="detailgrid">${themes}</div></section>
      <section class="block wide"><h3>Character study</h3><div class="detailgrid">${characters}</div></section>
      <section class="block wide"><h3>Textbook exercise – detailed answers</h3>${qa(guide.exerciseAnswers)}</section>
      <section class="block wide"><h3>Short-answer practice</h3>${qa(guide.shortAnswers)}</section>
      <section class="block wide"><h3>Long-answer practice</h3>${qa(guide.longAnswers)}</section>
      <section class="block wide"><h3>Competency-based practice</h3>${mcqs}</section>
      <section class="block wide"><h3>CBSE answer-writing guidance</h3>${list(guide.examFocus)}</section>
      <section class="block wide"><h3>Quick revision</h3>${list(guide.quickRevision)}</section>
    </div><div class="footnote">Original LitVibe study material. Questions are paraphrased for learning and practice; consult your prescribed textbook for the exact exercise wording. LitVibe is an independent educational resource and is not affiliated with NCERT or CBSE.</div>`;
  } else {
    let poem=x.type==="poems",blocks=poem?[["Central idea",x.central],["Simplified explanation",x.explanation],["Poetic devices",x.devices],["Interpretation",x.analysis],["Poet",x.poet]]:[["Chapter summary",x.summary],["Major themes",x.themes||x.central],["Character study",x.characters],["Deeper understanding",x.analysis]];
    document.querySelector("#detail").innerHTML=`<div class="meta">${x.book}</div><h2>${x.title}</h2><p class="lead">${x.hook}</p><div class="detailgrid">${blocks.map((b,i)=>`<section class="block ${i===0||i===blocks.length-1?"wide":""}"><h3>${b[0]}</h3><p>${b[1]}</p></section>`).join("")}</div><div class="footnote">Original LitVibe learning guide. This site does not reproduce textbook passages.</div>`;
  }
  document.querySelector("#overlay").hidden=false;document.body.style.overflow="hidden";
}function close(){document.querySelector("#overlay").hidden=true;document.body.style.overflow=""}document.querySelector("#close").onclick=close;document.querySelector("#overlay").onclick=e=>{if(e.target.id==="overlay")close()};document.onkeydown=e=>{if(e.key==="Escape")close()};document.querySelector("#year").textContent=new Date().getFullYear();render();