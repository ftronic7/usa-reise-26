const header=document.querySelector('.site-header');
const nav=document.querySelector('.nav');
const toggle=document.querySelector('.nav-toggle');

function updateHeader(){header?.classList.toggle('scrolled',window.scrollY>30)}
updateHeader();
window.addEventListener('scroll',updateHeader,{passive:true});

toggle?.addEventListener('click',()=>{
  const willOpen=toggle.getAttribute('aria-expanded')!=='true';
  toggle.setAttribute('aria-expanded',String(willOpen));
  nav?.classList.toggle('open',willOpen);
});

nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
  nav.classList.remove('open');
  toggle?.setAttribute('aria-expanded','false');
}));

const routeStops=[...document.querySelectorAll('.route-stop')];
routeStops.forEach(stop=>stop.addEventListener('click',()=>{
  routeStops.forEach(item=>item.classList.remove('active'));
  stop.classList.add('active');
}));

const revealItems=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.14});
  revealItems.forEach(item=>observer.observe(item));
}else{
  revealItems.forEach(item=>item.classList.add('visible'));
}

const form=document.querySelector('#voteForm');
const message=document.querySelector('#formMessage');
let saved=[];
try{saved=JSON.parse(localStorage.getItem('usa26-interests')||'[]')}catch{saved=[]}

saved.forEach(value=>{
  const input=[...form?.querySelectorAll('input[name="interest"]')||[]].find(item=>item.value===value);
  if(input)input.checked=true;
});

form?.addEventListener('submit',event=>{
  event.preventDefault();
  const values=[...form.querySelectorAll('input:checked')].map(input=>input.value);
  localStorage.setItem('usa26-interests',JSON.stringify(values));
  message.textContent=values.length
    ? `${values.join(', ')} — klingt nach einem ziemlich guten Grund mitzukommen.`
    : 'Such dir mindestens einen Grund aus.';
});
