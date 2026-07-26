// ===== العد التنازلي (أرقام إنجليزية) =====
// موعد الفرح: السبت 1 أغسطس 2026 الساعة 9:00 مساءً
function updateCountdown() {
    const targetDate = new Date('2026-08-01T21:00:00').getTime();

    function tick() {
        const now = Date.now();
        const dist = targetDate - now;

        const el = id => document.getElementById(id);
        if (!el('days')) return;

        if (dist < 0) {
            ['days','hours','minutes','seconds'].forEach(i => el(i).textContent = '00');
            return;
        }

        const days = Math.floor(dist / 86400000);
        const hours = Math.floor((dist % 86400000) / 3600000);
        const minutes = Math.floor((dist % 3600000) / 60000);
        const seconds = Math.floor((dist % 60000) / 1000);

        el('days').textContent = String(days).padStart(2, '0');
        el('hours').textContent = String(hours).padStart(2, '0');
        el('minutes').textContent = String(minutes).padStart(2, '0');
        el('seconds').textContent = String(seconds).padStart(2, '0');
    }

    tick();
    setInterval(tick, 1000);
}

// ===== ورود خفيفة في الخلفية =====
function startPetals() {
    const layer = document.getElementById('petals');
    if (!layer) return;
    setInterval(() => {
        if (document.hidden) return;
        const img = document.createElement('img');
        img.src = 'rose_sm.png';
        img.className = 'petal-rose';
        const size = 18 + Math.random() * 22;
        img.style.width = size + 'px';
        img.style.left = Math.random() * 100 + 'vw';
        const op = (0.22 + Math.random() * 0.28);
        const dur = 10 + Math.random() * 8;
        layer.appendChild(img);
        img.animate([
            { transform: 'translateY(-50px) rotate(0deg)', opacity: 0 },
            { opacity: op, offset: 0.1 },
            { opacity: op, offset: 0.85 },
            { transform: `translateY(106vh) translateX(${(Math.random()*80-40)}px) rotate(${Math.random()*360}deg)`, opacity: 0 }
        ], { duration: dur * 1000, easing: 'linear', fill: 'forwards' });
        setTimeout(() => img.remove(), dur * 1000 + 500);
    }, 1200);
}

// ===== ظهور الأقسام عند التمرير =====
function setupReveal() {
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    document.querySelectorAll('.reveal').forEach(s => obs.observe(s));
}

// ===== نموذج تأكيد الحضور =====
function setupForm() {
    const form = document.getElementById('rsvpForm');
    if (!form) return;
    form.addEventListener('submit', e => {
        e.preventDefault();
        const data = {
            name: document.getElementById('name').value,
            attending: document.getElementById('attending').value,
            guests: document.getElementById('guests').value,
            song: document.getElementById('song').value,
            message: document.getElementById('message').value,
            timestamp: new Date().toISOString()
        };
        const list = JSON.parse(localStorage.getItem('rsvpResponses') || '[]');
        list.push(data);
        localStorage.setItem('rsvpResponses', JSON.stringify(list));
        alert(data.attending === 'yes'
            ? `شكراً لك ${data.name}! سعداء جداً بحضورك.\n\nنراكم يوم السبت ١ أغسطس ٢٠٢٦ 🤍`
            : `شكراً لك ${data.name}! نقدّر ردّك، وسنفتقدك في فرحنا 🤍`);
        form.reset();
    });
}

// ===== تمرير ناعم =====
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const href = a.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const t = document.querySelector(href);
            if (t) t.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// ===== فتح الدعوة (مطر ورود طبيعية) =====
function bloomFlowers() {
    const layer = document.getElementById('bloomLayer');
    if (!layer) return;
    const n = 32;
    for (let i = 0; i < n; i++) {
        const img = document.createElement('img');
        img.src = 'rose_sm.png';
        img.className = 'bloom-rose';
        const size = 30 + Math.random() * 60;
        img.style.width = size + 'px';
        img.style.left = (Math.random() * 100) + 'vw';
        layer.appendChild(img);

        const drift = (Math.random() * 200 - 100);
        const rot = (Math.random() * 600 - 300);
        const delay = Math.random() * 600;
        const dur = 2200 + Math.random() * 1600;

        img.animate([
            { transform: 'translateY(-14vh) translateX(0) rotate(0deg)', opacity: 0 },
            { opacity: 1, offset: 0.14 },
            { opacity: 1, offset: 0.75 },
            { transform: `translateY(112vh) translateX(${drift}px) rotate(${rot}deg)`, opacity: 0 }
        ], { duration: dur, delay, easing: 'cubic-bezier(.35,.12,.4,1)', fill: 'forwards' });
    }
}

function setupOpening() {
    const btn = document.getElementById('open-btn');
    const screen = document.getElementById('opening-screen');
    const content = document.getElementById('openingContent');
    const main = document.getElementById('main-invitation');
    if (!btn || !screen) return;

    document.body.style.overflow = 'hidden';

    btn.addEventListener('click', () => {
        btn.style.pointerEvents = 'none';
        startMusic();
        // تتفتّح الورود وتتناثر
        bloomFlowers();
        // الخاتم والمحتوى يكبر ويختفي
        content.classList.add('gone');

        setTimeout(() => {
            screen.classList.add('opened');
            main.classList.add('revealed');
            document.body.style.overflow = '';
            initInvitation();
        }, 1900);
    });
}

// ===== تشغيل بعد الفتح =====
let started = false;
function initInvitation() {
    if (started) return;
    started = true;
    updateCountdown();
    setupForm();
    setupSmoothScroll();
    setupReveal();
    startPetals();
    // إظهار أول قسم فوراً
    document.querySelector('#hero')?.classList.add('in');
}

// ===== الموسيقى =====
function startMusic() {
    const audio = document.getElementById('bgm');
    const toggle = document.getElementById('musicToggle');
    if (!audio || !toggle) return;
    if (window.__BGM__ && !audio.src) audio.src = window.__BGM__;
    audio.volume = 0;
    audio.play().then(() => {
        toggle.classList.add('show');
        // رفع الصوت تدريجياً
        let v = 0;
        const target = 0.55;
        const fade = setInterval(() => {
            v += 0.03;
            if (v >= target) { v = target; clearInterval(fade); }
            audio.volume = v;
        }, 120);
    }).catch(() => { toggle.classList.add('show', 'paused'); });

    toggle.addEventListener('click', () => {
        if (audio.paused) { audio.play(); toggle.classList.remove('paused'); }
        else { audio.pause(); toggle.classList.add('paused'); }
    });
}

document.addEventListener('DOMContentLoaded', setupOpening);
