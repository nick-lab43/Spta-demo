document.addEventListener('DOMContentLoaded',()=>{
  const menu=document.querySelector('.menu-toggle');
  const nav=document.querySelector('.primary-nav');
  if(menu&&nav){
    menu.addEventListener('click',()=>{
      const open=nav.classList.toggle('open');
      menu.setAttribute('aria-expanded',String(open));
      menu.textContent=open?'Close':'Menu';
    });
    nav.addEventListener('keydown',event=>{
      if(event.key==='Escape'&&nav.classList.contains('open')){
        nav.classList.remove('open');
        menu.setAttribute('aria-expanded','false');
        menu.textContent='Menu';
        menu.focus();
      }
    });
  }

  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());

  const routeSearch=document.querySelector('#route-search');
  if(routeSearch){
    const cards=[...document.querySelectorAll('#route-list .route-card')];
    routeSearch.addEventListener('input',()=>{
      const q=routeSearch.value.trim().toLowerCase();
      cards.forEach(card=>card.hidden=!card.dataset.search.includes(q));
    });
  }

  const form=document.querySelector('#contact-form');
  if(form){
    form.addEventListener('submit',event=>{
      event.preventDefault();
      if(!form.reportValidity())return;
      const feedback=document.querySelector('#form-feedback');
      feedback.textContent='Demonstration only: the form is valid, but no message was sent or stored. Contact SPTA directly using the published telephone number or email address.';
      form.reset();
    });
  }

  const intro=document.querySelector('#intro-screen');
  if(!intro)return;
  let alreadySeen=false;
  try{alreadySeen=sessionStorage.getItem('spta-intro-seen')==='1';}catch(error){}
  if(alreadySeen){intro.remove();return;}

  const skip=intro.querySelector('#intro-skip');
  const background=[...document.querySelectorAll('body > header,body > main,body > footer')];
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let closed=false;
  let closeTimer;
  background.forEach(element=>{
    element.inert=true;
    element.setAttribute('aria-hidden','true');
  });
  document.body.classList.add('intro-active');

  const closeIntro=()=>{
    if(closed)return;
    closed=true;
    window.clearTimeout(closeTimer);
    try{sessionStorage.setItem('spta-intro-seen','1');}catch(error){}
    background.forEach(element=>{
      element.inert=false;
      element.removeAttribute('aria-hidden');
    });
    document.body.classList.remove('intro-active');
    intro.classList.add('intro-closing');
    window.setTimeout(()=>{
      intro.remove();
      document.querySelector('.hero .button')?.focus({preventScroll:true});
    },reducedMotion?0:650);
  };

  intro.addEventListener('keydown',event=>{
    if(event.key==='Escape'){
      event.preventDefault();
      closeIntro();
    }
    if(event.key==='Tab'){
      event.preventDefault();
      skip.focus();
    }
  });
  skip.addEventListener('click',closeIntro);
  skip.focus({preventScroll:true});
  closeTimer=window.setTimeout(closeIntro,reducedMotion?900:3800);
});
