document.addEventListener('DOMContentLoaded',()=>{const menu=document.querySelector('.menu-toggle');const nav=document.querySelector('.primary-nav');if(menu&&nav){menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'Close':'Menu';});}document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());const routeSearch=document.querySelector('#route-search');if(routeSearch){const cards=[...document.querySelectorAll('#route-list .route-card')];routeSearch.addEventListener('input',()=>{const q=routeSearch.value.trim().toLowerCase();cards.forEach(card=>card.hidden=!card.dataset.search.includes(q));});}const businessSearch=document.querySelector('#business-search');const category=document.querySelector('#business-category');if(businessSearch&&category){const cards=[...document.querySelectorAll('#business-list .business-card')];const filter=()=>{const q=businessSearch.value.trim().toLowerCase();const c=category.value;cards.forEach(card=>card.hidden=!(card.dataset.search.includes(q)&&(c==='all'||card.dataset.category===c)));};businessSearch.addEventListener('input',filter);category.addEventListener('change',filter);}const form=document.querySelector('#contact-form');if(form){form.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;const feedback=document.querySelector('#form-feedback');feedback.textContent='Demonstration only: your form passed validation, but no message was sent. Connect an approved form service or backend to receive enquiries.';form.reset();});}});
document.addEventListener('DOMContentLoaded',()=>{
  const intro=document.querySelector('#intro-screen');
  if(!intro)return;
  let alreadySeen=false;
  try{alreadySeen=sessionStorage.getItem('spta-intro-seen')==='1';}catch(error){}
  if(alreadySeen){intro.remove();return;}
  const skip=intro.querySelector('#intro-skip');
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let closed=false;
  document.body.classList.add('intro-active');
  const closeIntro=()=>{
    if(closed)return;
    closed=true;
    try{sessionStorage.setItem('spta-intro-seen','1');}catch(error){}
    document.body.classList.remove('intro-active');
    intro.classList.add('intro-closing');
    window.setTimeout(()=>intro.remove(),reducedMotion?0:650);
  };
  skip.addEventListener('click',closeIntro);
  intro.addEventListener('keydown',event=>{
    if(event.key==='Escape'){event.preventDefault();closeIntro();}
  });
  skip.focus({preventScroll:true});
  window.setTimeout(closeIntro,reducedMotion?900:3800);
});