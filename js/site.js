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


  const weatherWidget=document.querySelector('[data-weather-widget]');
  if(weatherWidget){
    const status=weatherWidget.querySelector('[data-weather-status]');
    const note=weatherWidget.querySelector('[data-weather-note]');
    const art=weatherWidget.querySelector('[data-weather-art]');
    const set=(selector,value)=>{const el=weatherWidget.querySelector(selector);if(el)el.textContent=value;};
    const fail=message=>{status.textContent='Unavailable';status.classList.remove('is-live');status.classList.add('is-error');set('[data-weather-updated]','Forecast feed unavailable');note.textContent=message;};
    const load=async()=>{
      const endpoint=window.SPTA_WEATHER_API_URL||'';
      if(!endpoint){status.textContent='Setup required';set('[data-weather-updated]','Weather service not connected');note.textContent='The weather panel design is active. The secure forecast endpoint must be configured before live conditions can appear.';return;}
      try{
        status.textContent='Updating';
        const response=await fetch(endpoint,{headers:{Accept:'application/json'}});
        if(!response.ok)throw new Error('The forecast service returned an error.');
        const data=await response.json();
        if(typeof data.temperature!=='number')throw new Error('Forecast data was incomplete.');
        set('[data-weather-temp]',Math.round(data.temperature)+'°');
        set('[data-weather-condition]',data.condition||'Conditions unavailable');
        set('[data-weather-feels]',Number.isFinite(data.feelsLike)?Math.round(data.feelsLike)+'°C':'—');
        set('[data-weather-humidity]',Number.isFinite(data.humidity)?Math.round(data.humidity)+'%':'—');
        set('[data-weather-wind]',Number.isFinite(data.windSpeed)?Math.round(data.windSpeed)+' km/h':'—');
        set('[data-weather-rain]',Number.isFinite(data.rainNext6h)?data.rainNext6h.toFixed(1)+' mm':'— mm');
        const updated=data.updatedAt?new Date(data.updatedAt):null;
        set('[data-weather-updated]',updated&&!Number.isNaN(updated.getTime())?'Forecast issued '+updated.toLocaleTimeString('en-ZA',{hour:'2-digit',minute:'2-digit'}):'Forecast data received');
        note.textContent='Forecast for Polokwane. Rain figure is accumulated forecast precipitation over the next six hours, not a probability or measured observation.';
        status.textContent='Forecast data';status.classList.remove('is-error');status.classList.add('is-live');
        art.classList.remove('is-clear','is-cloudy','is-rain','is-snow');
        const symbol=String(data.symbol||'').toLowerCase();
        if(symbol.includes('thunder')||symbol.includes('rain')||symbol.includes('sleet'))art.classList.add('is-rain');
        else if(symbol.includes('snow'))art.classList.add('is-snow');
        else if(symbol.includes('clearsky')||symbol.includes('sun'))art.classList.add('is-clear');
        else art.classList.add('is-cloudy');
      }catch(error){fail(error.message||'Unable to retrieve the forecast.');}
    };
    load();
    window.setInterval(load,3*60*60*1000);
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
