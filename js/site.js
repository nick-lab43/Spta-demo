document.addEventListener('DOMContentLoaded',()=>{
const intro=document.querySelector('#intro-screen');
if(intro){
 const key='spta-intro-seen';
 const skip=document.querySelector('#intro-skip');
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 let timer;
 const closeIntro=()=>{
  if(intro.hidden)return;
  intro.classList.add('is-closing');
  document.body.classList.remove('intro-active');
  window.clearTimeout(timer);
  window.setTimeout(()=>{intro.hidden=true;intro.classList.remove('is-closing');},reduced?0:650);
 };
 if(!sessionStorage.getItem(key)){
  intro.hidden=false;
  document.body.classList.add('intro-active');
  sessionStorage.setItem(key,'1');
  if(reduced) closeIntro();
  else timer=window.setTimeout(closeIntro,3100);
  skip?.addEventListener('click',closeIntro,{once:true});
 }else intro.remove();
}
const menu=document.querySelector('.menu-toggle');const nav=document.querySelector('.primary-nav');if(menu&&nav){menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'Close':'Menu';});}document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());const routeSearch=document.querySelector('#route-search');if(routeSearch){const cards=[...document.querySelectorAll('#route-list .route-card')];routeSearch.addEventListener('input',()=>{const q=routeSearch.value.trim().toLowerCase();cards.forEach(card=>card.hidden=!card.dataset.search.includes(q));});}const businessSearch=document.querySelector('#business-search');const category=document.querySelector('#business-category');if(businessSearch&&category){const cards=[...document.querySelectorAll('#business-list .business-card')];const filter=()=>{const q=businessSearch.value.trim().toLowerCase();const c=category.value;cards.forEach(card=>card.hidden=!(card.dataset.search.includes(q)&&(c==='all'||card.dataset.category===c)));};businessSearch.addEventListener('input',filter);category.addEventListener('change',filter);}const form=document.querySelector('#contact-form');if(form){form.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;const feedback=document.querySelector('#form-feedback');feedback.textContent='Demonstration only: your form passed validation, but no message was sent. Connect an approved form service or backend to receive enquiries.';form.reset();});}});