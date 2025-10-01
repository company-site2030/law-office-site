// Basic scripts: canvas particles background + small UI bits
(function(){
  // set year in footers
  const year = new Date().getFullYear();
  ["year","year2","year3","year4","year5"].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.textContent = year;
  });

  // Canvas particle background
  const canvas = document.getElementById('bg');
  const ctx = canvas.getContext('2d');
  let w = canvas.width = innerWidth;
  let h = canvas.height = innerHeight;
  const particles = [];
  const PARTICLE_COUNT = Math.round((w*h)/70000);

  function rand(min,max){ return Math.random()*(max-min)+min; }
  function resize(){ w = canvas.width = innerWidth; h = canvas.height = innerHeight; }
  addEventListener('resize', resize);

  function Particle(){
    this.x = rand(0,w);
    this.y = rand(0,h);
    this.vx = rand(-0.2,0.6);
    this.vy = rand(-0.2,0.6);
    this.r = rand(0.6,2.2);
    this.life = rand(60,240);
    this.alpha = rand(0.04,0.12);
  }
  function initParticles(){
    particles.length = 0;
    for(let i=0;i<PARTICLE_COUNT;i++) particles.push(new Particle());
  }
  initParticles();

  function step(){
    ctx.clearRect(0,0,w,h);
    // subtle radial glow
    const g = ctx.createRadialGradient(w*0.15,h*0.1,0,w*0.5,h*0.5,Math.max(w,h));
    g.addColorStop(0,'rgba(201,164,58,0.03)');
    g.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0,0,w,h);

    for(let p of particles){
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
      if(p.x < -10) p.x = w+10;
      if(p.x > w+10) p.x = -10;
      if(p.y < -10) p.y = h+10;
      if(p.y > h+10) p.y = -10;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
      ctx.fill();
    }
    requestAnimationFrame(step);
  }
  step();

  // 3D card hover subtle mouse follow
  const card = document.querySelector('.card-3d');
  if(card){
    card.addEventListener('mousemove', (e)=>{
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width/2;
      const cy = rect.top + rect.height/2;
      const dx = (e.clientX - cx);
      const dy = (e.clientY - cy);
      const rx = (-dy / rect.height) * 10;
      const ry = (dx / rect.width) * 10;
      card.querySelectorAll('.card-face').forEach(f=>{
        f.style.transform = `rotateY(${ry}deg) rotateX(${rx}deg)`;
      });
    });
    card.addEventListener('mouseleave', ()=>{
      card.querySelectorAll('.card-face').forEach(f=>{
        f.style.transform = '';
      });
    });
  }
})();
