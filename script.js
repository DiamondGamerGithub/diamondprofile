const toast=document.querySelector('.toast');let toastTimer;
function notify(text){toast.textContent=text;clearTimeout(toastTimer);if(window.gsap&&!matchMedia('(prefers-reduced-motion: reduce)').matches){gsap.to(toast,{autoAlpha:1,duration:.18,overwrite:true});}else{toast.style.opacity='1';toast.style.visibility='visible';}toastTimer=setTimeout(()=>{if(window.gsap){gsap.to(toast,{autoAlpha:0,duration:.18,overwrite:true});}else{toast.style.opacity='0';toast.style.visibility='hidden';}},3200);}
for(const button of document.querySelectorAll('[data-copy]'))button.addEventListener('click',async()=>{const text=button.dataset.copy;try{await navigator.clipboard.writeText(text);notify(text==='play.fernsmp.net'?'Server IP copied: '+text:'Discord username copied: '+text);}catch{const dialog=document.querySelector('#copy-fallback'),input=document.querySelector('#copy-text');input.value=text;dialog.showModal();input.focus();input.select();}});
const filters=[...document.querySelectorAll('[data-filter]')],projects=[...document.querySelectorAll('[data-category]')];
const workCopy={
 all:'I manage communities and build apps, Discord bots and web projects. Here’s a selection of the work behind it.',
 app:'I turn app ideas into approachable experiences. Soufflé explores how a simple scan can help people discover the places around them. Development is currently paused.',
 bot:'I build Discord tools for support, community activities and staff organization. Explore FernSMP Services, Diamond Bot, Soufflé Services and a small look at my internal staff tools.',
 web:'I make useful web tools and playful experiments, from a simple commission receipt generator to a 3D maze game you can play in your browser.'
};
function setFilter(value,updateUrl=false){
 if(!Object.hasOwn(workCopy,value))value='all';
 for(const button of filters)button.setAttribute('aria-pressed',String(button.dataset.filter===value));
 for(const project of projects)project.hidden=value!=='all'&&project.dataset.category!==value;
 document.querySelector('#focus-description').textContent=workCopy[value];
 const visibleProjects=projects.filter(project=>!project.hidden);
 const count=visibleProjects.length;
 for(const project of projects)project.classList.toggle('project-last-visible',count%2===1&&project===visibleProjects[count-1]);
 document.querySelector('#filter-status').textContent=count+' showcase'+(count===1?'':'s');
 document.dispatchEvent(new CustomEvent('workfilterchange',{detail:{value,animate:updateUrl}}));
 if(updateUrl){const url=new URL(location.href);value==='all'?url.searchParams.delete('work'):url.searchParams.set('work',value);history.replaceState(null,'',url);}
}
for(const button of filters)button.addEventListener('click',()=>setFilter(button.dataset.filter,true));
setFilter(new URL(location.href).searchParams.get('work')||'all');
addEventListener('popstate',()=>setFilter(new URL(location.href).searchParams.get('work')||'all'));

// GSAP core/timelines/performance: short, finite compositor animations.
// This is an interactive website, not a HyperFrames video composition.
if(window.gsap){
 const media=gsap.matchMedia();
 let introPlayed=false;
 media.add({motion:'(prefers-reduced-motion: no-preference)',fine:'(hover: hover) and (pointer: fine)'},context=>{
  if(!context.conditions.motion)return;
  const removers=[],running=new Set();
  const listen=(element,type,handler,options)=>{element.addEventListener(type,handler,options);removers.push(()=>element.removeEventListener(type,handler,options));};
  const animate=(targets,from,to)=>{
   if(!targets.length)return;
   let tween;
   const finish=()=>{for(const el of targets)el.style.removeProperty('will-change');running.delete(tween);};
   for(const el of targets)el.style.willChange='transform, opacity';
   tween=gsap.fromTo(targets,from,{duration:.38,ease:'power2.out',stagger:{each:.035,amount:.14},overwrite:true,clearProps:'transform,opacity,visibility',...to,onComplete:finish,onInterrupt:finish});
   running.add(tween);return tween;
  };
  // A readable timeline coordinates the identity; navigation is never hidden.
  if(!introPlayed&&!location.hash){
   introPlayed=true;
   const intro=gsap.timeline({defaults:{duration:.48,ease:'power3.out',clearProps:'transform,opacity,visibility'}});
   intro.addLabel('identity',0)
    .fromTo('.profile-logo',{y:10,scale:.96,autoAlpha:.65},{y:0,scale:1,autoAlpha:1},'identity')
    .fromTo('.hero h1',{y:10,autoAlpha:.65},{y:0,autoAlpha:1},'identity+=.06')
    .fromTo('.profile-role,.hero-description',{y:8,autoAlpha:.7},{y:0,autoAlpha:1,stagger:.045},'identity+=.12')
    .fromTo('.profile-stats>div',{y:6,autoAlpha:.7},{y:0,autoAlpha:1,stagger:.045},'identity+=.2');
  }
  // Reveal only what enters the viewport. Nothing is pre-hidden off screen.
  const observed=[...document.querySelectorAll('.section-heading,.edited-heading,.work-project,.community-card,.collaborator-card,.video,.promo-short,.contact-section>div')];
  const observer=new IntersectionObserver(entries=>{
   const visible=entries.filter(entry=>entry.isIntersecting&&entry.target.getBoundingClientRect().height>0).map(entry=>entry.target);
   visible.forEach(el=>observer.unobserve(el));
   animate(visible,{y:32,autoAlpha:.18},{y:0,autoAlpha:1,duration:.7,ease:'power3.out'});
  },{threshold:.12,rootMargin:'0px 0px -16px 0px'});
  observed.forEach(el=>observer.observe(el));

  // One reusable transform for the active underline; no animated layout.
  const filters=document.querySelector('.filters');
  const indicator=document.createElement('span');
  indicator.className='filter-indicator';indicator.setAttribute('aria-hidden','true');filters.append(indicator);filters.classList.add('motion-tabs');
  function moveIndicator(immediate=false){
   const button=filters.querySelector('[aria-pressed="true"]');
   if(!button)return;
   const groupRect=filters.getBoundingClientRect(),buttonRect=button.getBoundingClientRect();
   const vars={x:buttonRect.left-groupRect.left,y:buttonRect.bottom-groupRect.top-2,scaleX:buttonRect.width};
   if(immediate)gsap.set(indicator,vars);else gsap.to(indicator,{...vars,duration:.28,ease:'power3.out',overwrite:true});
  }
  const resize=new ResizeObserver(()=>moveIndicator(true));resize.observe(filters);moveIndicator(true);
  listen(document,'workfilterchange',event=>{
   moveIndicator();
   if(event.detail.animate){
    animate([document.querySelector('.work-filter-description')],{autoAlpha:.65,y:3},{autoAlpha:1,y:0,duration:.24});
    const art=[...document.querySelectorAll('.work-project:not([hidden]) .project-mascot,.work-project:not([hidden]) .receipt-cover-paper,.work-project:not([hidden]) .game-cover>img,.work-project:not([hidden]) .adam-troll-cover>img')];
    gsap.killTweensOf(art);
    animate(art,{autoAlpha:.65},{autoAlpha:1,duration:.28,clearProps:'opacity,visibility'});
   }
  });

  if(context.conditions.fine){
   // Hover artwork, never the clickable layout box. Reuse one paused timeline.
   const hoverTargets=[...document.querySelectorAll('.demo-launch,.video,.promo-short,.collaborator-card,.community-card,.past-grid article,.social-links>a,.social-links>button')];
   for(const host of hoverTargets){
    const art=host.querySelector('.project-mascot,.video-image img,.short-image img,:scope>img,:scope>svg');
    if(!art)continue;
    const tiny=host.matches('.social-links>*');
    const hover=gsap.timeline({paused:true,defaults:{duration:.25,ease:'power2.out'}}).to(art,{y:tiny?-2:-3,scale:tiny?1.06:1.025,overwrite:'auto'});
    const enter=()=>{art.style.willChange='transform';hover.play();};
    const leave=()=>{hover.reverse();};
    hover.eventCallback('onReverseComplete',()=>art.style.removeProperty('will-change'));
    listen(host,'pointerenter',enter);listen(host,'pointerleave',leave);
    listen(host,'focusin',enter);listen(host,'focusout',leave);
    removers.push(()=>{hover.kill();gsap.set(art,{clearProps:'transform,willChange'});});
   }
  }
  if(context.conditions.fine){for(const img of document.querySelectorAll('img')){if(img.closest('.demo-launch,.video,.promo-short,.collaborator-card,.community-card,.past-grid article'))continue;listen(img,'pointerenter',()=>gsap.to(img,{scale:1.035,duration:.3,overwrite:true}));listen(img,'pointerleave',()=>gsap.to(img,{scale:1,duration:.3,overwrite:true,clearProps:'transform'}));}}
  const finishRunning=()=>{for(const tween of [...running])tween.progress(1);};
  listen(document,'visibilitychange',()=>{if(document.hidden)finishRunning();});
  return()=>{
   observer.disconnect();resize.disconnect();finishRunning();removers.forEach(remove=>remove());
   gsap.killTweensOf(indicator);indicator.remove();filters.classList.remove('motion-tabs');
  };
 });
}

// Preserve native details semantics, with interruptible expand/collapse motion.
document.querySelectorAll('details').forEach(details=>{
  const summary=details.querySelector(':scope > summary');
  if(!summary)return;
  const content=document.createElement('div');
  content.className='disclosure-content';
  while(summary.nextSibling)content.append(summary.nextSibling);
  details.append(content);
  let targetOpen=details.open;
  summary.addEventListener('click',event=>{
    if(!window.gsap||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    event.preventDefault();
    targetOpen=!targetOpen;
    const start=details.getBoundingClientRect().height;
    gsap.killTweensOf(details);
    details.style.height='auto';
    details.open=true;
    const end=targetOpen?details.getBoundingClientRect().height:summary.getBoundingClientRect().height;
    details.style.overflow='hidden';
    gsap.fromTo(details,{height:start},{height:end,duration:.32,ease:'power2.inOut',overwrite:true,onComplete:()=>{
      details.open=targetOpen;
      details.style.removeProperty('height');
      details.style.removeProperty('overflow');
    }});
  });
});

// Progressive enhancement: final totals remain readable without animation or JavaScript.
(function animateExperienceCounters(){
 const elements=[...document.querySelectorAll('[data-count-to]')];
 if(!elements.length)return;
 const preference=matchMedia('(prefers-reduced-motion: reduce)');
 const models=elements.map(element=>({element,target:Number(element.dataset.countTo),value:0}));
 if(!window.gsap||preference.matches||!('IntersectionObserver' in window))return;
 let started=false,finished=false,tween;
 const render=()=>models.forEach(model=>model.element.textContent=String(Math.round(model.value)));
 const finish=()=>{
  if(finished)return;finished=true;
  tween?.kill();models.forEach(model=>{model.value=model.target;});render();
  observer.disconnect();preference.removeEventListener('change',onPreference);
  document.removeEventListener('visibilitychange',onVisibility);
 };
 const onPreference=()=>{if(preference.matches)finish();};
 const onVisibility=()=>{if(document.hidden&&started)finish();};
 const observer=new IntersectionObserver(entries=>{
  if(started||finished||!entries.some(entry=>entry.isIntersecting))return;
  started=true;observer.disconnect();render();
  tween=gsap.to(models,{value:(_,model)=>model.target,duration:1.8,stagger:.08,ease:'power2.out',snap:{value:1},onUpdate:render,onComplete:finish});
 },{threshold:.25});
 observer.observe(document.querySelector('.profile-stats'));
 preference.addEventListener('change',onPreference);
 document.addEventListener('visibilitychange',onVisibility);
})();
