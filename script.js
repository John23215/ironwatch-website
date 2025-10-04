// theme toggle
const toggle = document.getElementById('themeToggle');
let dark = true;
toggle?.addEventListener('click', () => {
  dark = !dark;
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  toggle.textContent = dark ? '☾' : '☀';
});
// tabs & command filter
const tabs = document.querySelectorAll('.tab');
const cmdGroups = {
  mod: document.querySelectorAll('.cmd.mod'),
  tickets: document.querySelectorAll('.cmd.tickets'),
  invoices: document.querySelectorAll('.cmd.invoices'),
  give: document.querySelectorAll('.cmd.give'),
  utils: document.querySelectorAll('.cmd.utils'),
};
function showTab(key){
  tabs.forEach(t=>t.classList.toggle('active', t.dataset.tab===key));
  Object.entries(cmdGroups).forEach(([k,nodes])=>nodes.forEach(n=>n.classList.toggle('hidden', k!==key)));
}
tabs.forEach(t=>t.addEventListener('click',()=>showTab(t.dataset.tab)));
if(tabs.length) showTab('mod');
const search = document.getElementById('cmdSearch');
function filterCmd(){
  const q = (search?.value||'').toLowerCase();
  document.querySelectorAll('.cmd').forEach(el=>{
    el.style.display = el.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
}
search?.addEventListener('input', filterCmd);
// carousel
const frames = document.querySelectorAll('.frame');
const dots = document.querySelectorAll('.dot');
function go(i){
  frames.forEach((f,idx)=>f.classList.toggle('active', idx===i));
  dots.forEach((d,idx)=>d.classList.toggle('active', idx===i));
}
dots.forEach(d=>d.addEventListener('click',()=>go(+d.dataset.idx)));
if(frames.length){ let i=0; setInterval(()=>{i=(i+1)%frames.length; go(i)},6000); }
// particles bg
const c = document.getElementById('bg'); const ctx = c?.getContext?.('2d');
function particles(){
  if(!c||!ctx) return;
  let w,h; const P=[];
  function resize(){w=c.width=innerWidth; h=c.height=innerHeight}
  addEventListener('resize',resize); resize();
  for(let i=0;i<80;i++) P.push({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-0.5)*0.4,vy:(Math.random()-0.5)*0.4,r:1+Math.random()*2});
  (function loop(){
    ctx.clearRect(0,0,w,h);
    for(const p of P){
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0||p.x>w) p.vx*=-1;
      if(p.y<0||p.y>h) p.vy*=-1;
      const g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*6);
      g.addColorStop(0,'rgba(124,58,237,.25)'); g.addColorStop(1,'rgba(6,182,212,0)');
      ctx.fillStyle=g; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
    }
    requestAnimationFrame(loop);
  })();
}
particles();
// status demo
(function status(){
  const el = (id)=>document.getElementById(id);
  if(!el('ping')) return;
  function rnd(a,b){ return Math.floor(Math.random()*(b-a+1))+a }
  setInterval(()=>{
    el('ping').textContent = rnd(28,72)+'ms';
    el('uptime').textContent = (99.9 + Math.random()*0.09).toFixed(3)+'%';
    el('guilds').textContent = (1240 + rnd(0,5)).toString();
  }, 1500);
})();
