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


  // The browser calls the Cloudflare Worker; the WeatherAPI key stays server-side.
  const WEATHER_API_URL = '';
  const weatherWidget = document.querySelector('[data-weather-widget]');
  if (weatherWidget) {
    const weatherStatus = weatherWidget.querySelector('[data-weather-status]');
    const weatherNote = weatherWidget.querySelector('[data-weather-note]');
    const weatherArt = weatherWidget.querySelector('[data-weather-art]');
    const setWeatherText = (selector, value) => {
      const element = weatherWidget.querySelector(selector);
      if (element) element.textContent = value;
    };
    const showWeatherError = (message) => {
      weatherStatus.textContent = 'Unavailable';
      weatherStatus.classList.remove('is-live');
      weatherStatus.classList.add('is-error');
      setWeatherText('[data-weather-updated]', 'Weather feed unavailable');
      weatherNote.textContent = message;
    };
    const loadPolokwaneWeather = async () => {
      if (!WEATHER_API_URL) {
        weatherStatus.textContent = 'Setup required';
        setWeatherText('[data-weather-updated]', 'Weather service not connected');
        weatherNote.textContent = 'The secure weather service has not been configured yet. No weather values are being invented.';
        return;
      }
      try {
        weatherStatus.textContent = 'Updating';
        const response = await fetch(WEATHER_API_URL, {
          method: 'GET',
          headers: { Accept: 'application/json' }
        });
        if (!response.ok) throw new Error('The weather service returned an error.');
        const data = await response.json();
        if (!data.current || !data.location) throw new Error('Weather data was incomplete.');
        const current = data.current;
        const condition = current.condition?.text || 'Conditions unavailable';
        const code = Number(current.condition?.code || 0);
        const hour = Number((data.location.localtime || '').slice(11, 13));
        const hours = data.forecast?.forecastday?.[0]?.hour || [];
        const upcoming = hours.filter(item => Number(item.time.slice(11, 13)) >= hour).slice(0, 6);
        const rainChance = upcoming.length
          ? Math.max(...upcoming.map(item => Number(item.chance_of_rain || 0)))
          : null;
        setWeatherText('[data-weather-temp]', Math.round(current.temp_c) + '°');
        setWeatherText('[data-weather-condition]', condition);
        setWeatherText('[data-weather-feels]', Math.round(current.feelslike_c) + '°C');
        setWeatherText('[data-weather-humidity]', Math.round(current.humidity) + '%');
        setWeatherText('[data-weather-wind]', Math.round(current.wind_kph) + ' km/h');
        setWeatherText('[data-weather-rain]', rainChance === null ? '—' : rainChance + '%');
        setWeatherText('[data-weather-updated]', 'Updated ' + (current.last_updated || data.location.localtime || '').slice(11, 16));
        weatherNote.textContent = rainChance === null
          ? 'Current conditions. Rain probability is not available for the remaining forecast hours.'
          : 'Rain chance is the highest hourly probability over the next six hours. Conditions are modelled and may change.';
        weatherStatus.textContent = 'Live data';
        weatherStatus.classList.remove('is-error');
        weatherStatus.classList.add('is-live');
        weatherArt.classList.remove('is-clear', 'is-cloudy', 'is-rain', 'is-snow');
        if ([1000].includes(code)) weatherArt.classList.add('is-clear');
        else if ([1063, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246, 1273, 1276].includes(code)) weatherArt.classList.add('is-rain');
        else if ([1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258].includes(code)) weatherArt.classList.add('is-snow');
        else weatherArt.classList.add('is-cloudy');
      } catch (error) {
        showWeatherError(error.message || 'Unable to retrieve current weather.');
      }
    };
    loadPolokwaneWeather();
    window.setInterval(loadPolokwaneWeather, 15 * 60 * 1000);
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
