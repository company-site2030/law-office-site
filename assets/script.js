/* ملفات الجافاسكربت: خلفية كانڤاس متحركة + وظائف القوائم والجوال + نموذج الحفظ */
(function(){
  // انتشار التاريخ في الفوتر
  const year = new Date().getFullYear();
  ["year","year2","year3","year4","year5"].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.textContent = year;
  });

  /* ---------- Canvas animated particles & soft gradient blobs ---------- */
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
  let w = window.innerWidth, h = window.innerHeight;
  if(canvas && ctx){
    canvas.width = w; canvas.height = h;
    const particles = [];
    const count = Math.max(30, Math.round((w*h)/150000));
    function rand(a,b){return Math.random()*(b-a)+a;}

    function P(){
      this.x = rand(0,w);
      this.y = rand(0,h);
      this.r = rand(0.8,3.6);
      this.vx = rand(-0.3,0.6);
      this.vy = rand(-0.2,0.4);
      this.alpha = rand(0.02,0.12);
    }
    for(let i=0;i<count;i++) particles.push(new P());

    function resize(){
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);

    function draw(){
      ctx.clearRect(0,0,w,h);
      // moving soft radial glow
      const g = ctx.createLinearGradient(0,0,w,h);
      g.addColorStop(0,'rgba(201,164,58,0.03)');
      g.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0,0,w,h);

      // floating particles
      for(const p of particles){
        p.x += p.vx; p.y += p.vy;
        if(p.x < -10) p.x = w+10;
        if(p.x > w+10) p.x = -10;
        if(p.y < -10) p.y = h+10;
        if(p.y > h+10) p.y = -10;
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.fill();
      }
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ---------- Mobile pages overlay toggles ---------- */
  const mobileBtn = document.getElementById('mobilePagesBtn');
  const overlay = document.getElementById('mobilePagesOverlay');
  const closeMobile = document.getElementById('closeMobilePages');

  if(mobileBtn && overlay){
    mobileBtn.addEventListener('click', ()=> overlay.classList.add('show'));
    closeMobile && closeMobile.addEventListener('click', ()=> overlay.classList.remove('show'));
    overlay.addEventListener('click', (e)=> { if(e.target === overlay) overlay.classList.remove('show'); });
  }

  /* ---------- Hamburger for main nav on small screens ---------- */
  const hamburgerButtons = document.querySelectorAll('#hamburger');
  hamburgerButtons.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const nav = document.getElementById('mainNav');
      if(!nav) return;
      if(nav.style.display === 'block') nav.style.display = '';
      else nav.style.display = 'block';
    });
  });

  /* ---------- Card 3D subtle follow ---------- */
  const card3d = document.querySelector('.card-3d');
  if(card3d){
    card3d.addEventListener('mousemove', (e)=>{
      const rect = card3d.getBoundingClientRect();
      const cx = rect.left + rect.width/2;
      const cy = rect.top + rect.height/2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const rx = (-dy / rect.height) * 10;
      const ry = (dx / rect.width) * 10;
      const inner = card3d.querySelector('.card-inner');
      if(inner) inner.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    card3d.addEventListener('mouseleave', ()=>{
      const inner = card3d.querySelector('.card-inner');
      if(inner) inner.style.transform = '';
    });
  }

  /* ---------- Contact form: تنزيل الملف النصي عند الإرسال (يعمل 100% محليًا) ---------- */
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const name = (document.getElementById('name')||{value:''}).value.trim();
      const email = (document.getElementById('email')||{value:''}).value.trim();
      const phone = (document.getElementById('phone')||{value:''}).value.trim();
      const message = (document.getElementById('message')||{value:''}).value.trim();
      if(!message){
        alert('الرجاء كتابة تفاصيل القضية.');
        return;
      }
      const now = new Date().toLocaleString();
      const content = `— ملف تواصل —\nالوقت: ${now}\nالاسم: ${name}\nالبريد: ${email}\nالهاتف: ${phone}\n\nتفاصيل القضية:\n${message}\n\n(حفظ محلي — اضف خدمة بريدية لاحقًا لإرسال فعلي)`;
      const blob = new Blob([content], {type: 'text/plain;charset=utf-8'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `contact-${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      // feedback
      showToast('تم تنزيل ملف يحتوي تفاصيل القضية — احفظه وارفقه لاحقًا');
      form.reset();
    });

    const clearBtn = document.getElementById('clearForm');
    if(clearBtn) clearBtn.addEventListener('click', ()=> form.reset());
  }

  /* ---------- Simple toast for feedback ---------- */
  function showToast(msg){
    let t = document.getElementById('siteToast');
    if(!t){
      t = document.createElement('div');
      t.id = 'siteToast';
      t.style.position = 'fixed';
      t.style.bottom = '86px';
      t.style.left = '50%';
      t.style.transform = 'translateX(-50%)';
      t.style.background = 'rgba(0,0,0,0.7)';
      t.style.color = '#fff';
      t.style.padding = '10px 14px';
      t.style.borderRadius = '10px';
      t.style.zIndex = 9999;
      t.style.fontSize = '14px';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.opacity = '1';
    clearTimeout(t._hide);
    t._hide = setTimeout(()=> { t.style.opacity = '0'; }, 3800);
  }

})();
