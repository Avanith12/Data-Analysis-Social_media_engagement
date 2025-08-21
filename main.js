// ---- Typing animation (type once, keep blinking cursor)
const typeEl = document.getElementById('type');
const phrase = 'Social Media Engagement Dataset Analysis';
let idx = 0;
(function typeOnce(){
  if(!typeEl) return;
  if(idx <= phrase.length){
    typeEl.textContent = phrase.slice(0, idx++);
    setTimeout(typeOnce, 60);
  }
})();

// ripple mouse position (for CTA)
document.querySelectorAll('.ripple').forEach(el=>{
  el.addEventListener('mousemove',(e)=>{
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--y', `${e.clientY - rect.top}px`);
  });
});

// ---- Lightbox (click any image to zoom)
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');
document.querySelectorAll('.fig').forEach(img => {
  img.addEventListener('click', () => { lbImg.src = img.src; lb.style.display = 'flex'; });
});
lb.addEventListener('click', () => { lb.style.display = 'none'; lbImg.src = ''; });

// ---- Scroll-reveal + re-trigger chip animation when hero re-enters
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.classList.contains('hero')) {
        document.querySelectorAll('.pill').forEach(p => {
          p.style.animation = 'none'; void p.offsetWidth; p.style.animation = ''; // restart
        });
      }
    }
  });
}, { threshold: 0.18 });
revealEls.forEach(el => io.observe(el));

// ---- Scroll progress bar + back-to-top
const progress = document.getElementById('progress');
const toTop = document.getElementById('toTop');
function onScroll(){
  const h = document.documentElement;
  const scrolled = (h.scrollTop)/(h.scrollHeight - h.clientHeight);
  progress.style.width = `${scrolled * 100}%`;
  if (h.scrollTop > 400) toTop.classList.add('show'); else toTop.classList.remove('show');
}
window.addEventListener('scroll', onScroll);
toTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
onScroll();

// ---- Magnetic button (follows cursor slightly)
document.querySelectorAll('.magnetic').forEach(btn=>{
  const strength = 20; // px
  btn.addEventListener('mousemove', (e)=>{
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width/2) / (rect.width/2);
    const y = (e.clientY - rect.top - rect.height/2) / (rect.height/2);
    btn.style.transform = `translate(${x*strength}px, ${y*strength}px)`;
  });
  btn.addEventListener('mouseleave', ()=>{ btn.style.transform = 'translate(0,0)'; });
});

// ---- Tilt / parallax panels
document.querySelectorAll('.tilt').forEach(card=>{
  const max = 6; // degrees
  card.addEventListener('mousemove', (e)=>{
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (py - 0.5) * -max;
    const ry = (px - 0.5) *  max;
    card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  card.addEventListener('mouseleave', ()=>{ card.style.transform = 'rotateX(0) rotateY(0)'; });
});

// ---- Custom cursor (dot + ring)
const cDot = document.getElementById('cDot');
const cRing = document.getElementById('cRing');
let mouseX = 0, mouseY = 0;
window.addEventListener('mousemove', (e)=>{
  mouseX = e.clientX; mouseY = e.clientY;
  cDot.style.transform = `translate(${mouseX-3}px, ${mouseY-3}px)`;
  cRing.style.transform = `translate(${mouseX-13}px, ${mouseY-13}px)`;
});
['a','button','.magnetic','.fig'].forEach(sel=>{
  document.querySelectorAll(sel).forEach(el=>{
    el.addEventListener('mouseenter', ()=> cRing.classList.add('active'));
    el.addEventListener('mouseleave', ()=> cRing.classList.remove('active'));
  });
});

// ---- Accessibility: hide custom cursor on touch devices
function isTouch(){ return ( 'ontouchstart' in window ) || navigator.maxTouchPoints > 0; }
if (isTouch()){ cDot.style.display = 'none'; cRing.style.display = 'none'; }
