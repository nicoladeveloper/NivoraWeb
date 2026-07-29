const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ==================== VITRINE GLOW (fundo ambiente) ====================
const glowCanvas = document.getElementById('glow');
if (glowCanvas && !prefersReducedMotion) {
    const gctx = glowCanvas.getContext('2d');
    let orbs = [];
    const colors = ['255,61,129', '34,230,197', '255,178,56', '167,139,250'];

    function resizeGlow() {
        glowCanvas.width = window.innerWidth;
        glowCanvas.height = Math.min(window.innerHeight * 2.2, document.body.scrollHeight);
    }
    resizeGlow();
    window.addEventListener('resize', resizeGlow);

    for (let i = 0; i < 5; i++) {
        orbs.push({
            x: Math.random() * glowCanvas.width,
            y: Math.random() * glowCanvas.height,
            r: 220 + Math.random() * 180,
            color: colors[i % colors.length],
            speed: 0.06 + Math.random() * 0.08,
            angle: Math.random() * Math.PI * 2
        });
    }

    function drawGlow() {
        gctx.clearRect(0, 0, glowCanvas.width, glowCanvas.height);
        orbs.forEach(o => {
            o.angle += o.speed * 0.01;
            o.x += Math.cos(o.angle) * 0.15;
            o.y += Math.sin(o.angle) * 0.15;
            const grad = gctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
            grad.addColorStop(0, `rgba(${o.color}, 0.06)`);
            grad.addColorStop(1, `rgba(${o.color}, 0)`);
            gctx.fillStyle = grad;
            gctx.fillRect(0, 0, glowCanvas.width, glowCanvas.height);
        });
        requestAnimationFrame(drawGlow);
    }
    drawGlow();
}

// ==================== HEADER SCROLL ====================
const header = document.getElementById('header');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    header.classList.toggle('scrolled', scrollY > 40);
    backToTop.classList.toggle('show', scrollY > 500);
}, { passive: true });

if (backToTop) backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
});

// ==================== HERO KINETIC HEADLINE ====================
window.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    requestAnimationFrame(() => {
        setTimeout(() => heroTitle && heroTitle.classList.add('is-lit'), 150);
    });
});

// ==================== SCROLL REVEAL ====================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ==================== SECTION-LEVEL REVEAL (título + fundo) ====================
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            sectionObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.08 });

document.querySelectorAll('.section-reveal').forEach(el => sectionObserver.observe(el));

// ==================== NUMBER COUNTER ====================
const statNums = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const count = parseInt(target.getAttribute('data-count'));
            let current = 0;
            const increment = count / 40;
            const timer = setInterval(() => {
                current += increment;
                if (current >= count) {
                    target.textContent = count;
                    clearInterval(timer);
                } else {
                    target.textContent = Math.floor(current);
                }
            }, 35);
            counterObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

statNums.forEach(el => counterObserver.observe(el));

// ==================== PROJETOS ====================
const projetos = [
    {
        nome: "MaxTenis",
        descricao: "Plataforma de E-commerce moderna e responsiva para a venda de tênis premium com animações avançadas e experiência de usuário excepcional.",
        linkDemo: "https://github.com/nicoladeveloper/DataShow/blob/main/README.md",
        linkRepo: "https://github.com/nicoladeveloper/DataShow/blob/main/README.md",
        video: "video/datashow.mp4",
        imagem: "img/projetos/maxtenis.jpg",
        tags: ["HTML", "CSS", "JavaScript"]
    },
    {
        nome: "NovaBarber",
        descricao: "Site de barbearia premium com design moderno, animações fluidas e sistema de agendamento.",
        linkDemo: "https://www.linkedin.com/posts/nicolas-oliveira-8b12a02b5_esg-prevenaexaetodedesastres-inteligenciaartificial-activity-7392403251909922816-Q3WY",
        linkRepo: "https://github.com/nicoladeveloper/Natural-Disaster-Watch",
        video: "video/disaster.mp4",
        imagem: "img/projetos/novabarber.jpg",
        tags: ["Angular", "HTML", "CSS", "JavaScript"]
    },
    {
        nome: "C6BANK",
        descricao: "Landing page moderna e interativa do C6 Bank com efeitos 3D avançados e animações fluidas. Showcase completo de serviços bancários: contas, cartões, investimentos e experiências.",
        linkDemo: "https://www.linkedin.com/feed/update/urn:li:activity:7374461185842384897/",
        linkRepo: "https://github.com/nicoladeveloper/C6BANK/blob/main/index.html",
        video: "video/kimetsu.mp4",
        imagem: "img/projetos/C6Bank.jpg",
        tags: ["JavaScript", "CSS", "HTML"]
    },
    {
        nome: "AllGames",
        descricao: "Interface visual e interativa sobre diferentes consoles com design atrativo e navegação funcional.",
        linkDemo: "https://www.linkedin.com/feed/update/urn:li:activity:7359367075640786946/",
        linkRepo: "https://github.com/nicoladeveloper/AllGames/blob/main/README.md",
        video: "video/allgames.mp4",
        imagem: "img/AllGames.jpg",
        tags: ["HTML", "CSS", "UI/UX"]
    },
    {
        nome: "SQL Search",
        descricao: "Consultas avançadas em banco de dados SQL Server retornando diferentes tipos de informação.",
        linkDemo: "https://www.linkedin.com/feed/update/urn:li:activity:7366233123585454080/",
        linkRepo: "https://github.com/nicoladeveloper/Filmes-SQL-server",
        video: "video/sql.mp4",
        imagem: "img/Sql projeto.jpeg",
        tags: ["SQL Server", "Database"]
    },
    {
        nome: "Hosting System",
        descricao: "Sistema de hospedagem em C# .NET para reservas de hotel com cálculo de desconto automático.",
        linkDemo: "https://www.linkedin.com/feed/update/urn:li:activity:7365168540716335104/",
        linkRepo: "https://github.com/nicoladeveloper/Sistema-de-Hopedagem",
        video: "video/hosting.mp4",
        imagem: "img/Sistema de Hospedagem.jpg",
        tags: ["C#", ".NET", "OOP"]
    }
];

function renderizarProjetos() {
    const container = document.getElementById('lista-projetos');
    if (!container) return;
    container.innerHTML = '';

    projetos.forEach((projeto, i) => {
        const card = document.createElement('div');
        card.className = 'card-projeto reveal';
        card.style.setProperty('--n', i % 3);

        const tagsHtml = (projeto.tags || []).map(t =>
            `<span style="font-size:0.7rem;padding:3px 10px;background:rgba(34,230,197,0.08);border:1px solid rgba(34,230,197,0.2);border-radius:20px;color:#22e6c5;font-weight:500;">${t}</span>`
        ).join('');

        card.innerHTML = `
            <div class="projeto-media">
                <video preload="none" muted loop playsInline
                    poster="${projeto.imagem}"
                    class="projeto-video"
                    data-src="${projeto.video}">
                </video>
            </div>
            <div class="card-projeto-content">
                <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px;">${tagsHtml}</div>
                <h3>${projeto.nome}</h3>
                <p>${projeto.descricao}</p>
                <div class="links-projeto">
                    <a href="${projeto.linkDemo}" target="_blank" rel="noopener noreferrer"><i class="fas fa-play"></i> Demo</a>
                    <a href="${projeto.linkRepo}" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i> GitHub</a>
                </div>
            </div>
        `;

        container.appendChild(card);
    });

    document.querySelectorAll('.card-projeto.reveal').forEach(el => revealObserver.observe(el));
}

// ==================== CAROUSEL DE CERTIFICADOS ====================
class CertificateCarousel {
    constructor() {
        this.wrapper = document.querySelector('.carousel-wrapper');
        this.btnPrev = document.getElementById('btn-anterior-certificado');
        this.btnNext = document.getElementById('btn-proximo-certificado');
        this.isDragging = false;
        this.startX = 0;
        this.scrollLeft = 0;
        if (this.wrapper) this.init();
    }
    init() {
        this.wrapper.addEventListener('mousedown', e => { this.isDragging = true; this.startX = e.pageX - this.wrapper.offsetLeft; this.scrollLeft = this.wrapper.scrollLeft; });
        this.wrapper.addEventListener('mouseleave', () => { this.isDragging = false; });
        this.wrapper.addEventListener('mouseup', () => { this.isDragging = false; });
        this.wrapper.addEventListener('mousemove', e => { if (!this.isDragging) return; const x = e.pageX - this.wrapper.offsetLeft; this.wrapper.scrollLeft = this.scrollLeft - (x - this.startX) * 2; }, { passive: true });
        this.wrapper.addEventListener('touchstart', e => { this.isDragging = true; this.startX = e.touches[0].pageX - this.wrapper.offsetLeft; this.scrollLeft = this.wrapper.scrollLeft; }, { passive: true });
        this.wrapper.addEventListener('touchend', () => { this.isDragging = false; }, { passive: true });
        this.wrapper.addEventListener('touchmove', e => { if (!this.isDragging) return; const x = e.touches[0].pageX - this.wrapper.offsetLeft; this.wrapper.scrollLeft = this.scrollLeft - (x - this.startX) * 2; }, { passive: true });
        this.btnPrev?.addEventListener('click', () => this.wrapper.scrollBy({ left: -350, behavior: 'smooth' }));
        this.btnNext?.addEventListener('click', () => this.wrapper.scrollBy({ left: 350, behavior: 'smooth' }));
    }
}

// ==================== MENU HAMBÚRGUER ====================
function setupMenuHamburguer() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('aberto');
        hamburger.classList.toggle('aberto', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('aberto');
            hamburger.classList.remove('aberto');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });
}

// ==================== SMOOTH SCROLL ====================
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
            }
        });
    });
}

// ==================== PARALLAX DO DECK NO HERO ====================
function setupHeroParallax() {
    const stage = document.getElementById('heroStage');
    if (!stage || prefersReducedMotion) return;
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (isTouch) return;

    let raf = null;
    stage.addEventListener('mousemove', (e) => {
        const rect = stage.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
            stage.style.transform = `rotateY(${relX * 6}deg) rotateX(${-relY * 6}deg)`;
        });
    });
    stage.addEventListener('mouseleave', () => {
        stage.style.transform = '';
    });
}

// ==================== RADAR CHART ====================
function drawRadarChart() {
    const canvas = document.getElementById('radarChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const cx = canvas.width / 2, cy = canvas.height / 2, radius = 73;
    const skills = [
        { label: 'Frontend', value: 0.92 },
        { label: 'Angular', value: 0.85 },
        { label: 'UI/UX', value: 0.83 },
        { label: 'JS/CSS', value: 0.90 },
        { label: 'LandPage', value: 0.95 },
        { label: 'Design', value: 0.80 },
    ];
    const total = skills.length;
    const angleStep = (Math.PI * 2) / total;
    function getPoint(i, r) {
        const angle = -Math.PI / 2 + i * angleStep;
        return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r };
    }
    let progress = 0;
    function animate() {
        progress = Math.min(progress + 0.04, 1);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        [0.25, 0.5, 0.75, 1].forEach(frac => {
            ctx.beginPath();
            for (let i = 0; i < total; i++) {
                const p = getPoint(i, radius * frac);
                i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
            }
            ctx.closePath();
            ctx.strokeStyle = 'rgba(255,61,129,0.16)'; ctx.lineWidth = 1; ctx.stroke();
        });
        for (let i = 0; i < total; i++) {
            const p = getPoint(i, radius);
            ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = 'rgba(255,61,129,0.12)'; ctx.lineWidth = 1; ctx.stroke();
        }
        ctx.beginPath();
        for (let i = 0; i < total; i++) {
            const p = getPoint(i, radius * skills[i].value * progress);
            i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
        }
        ctx.closePath();
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, 'rgba(34,230,197,0.45)'); grad.addColorStop(1, 'rgba(255,61,129,0.12)');
        ctx.fillStyle = grad; ctx.fill();
        ctx.strokeStyle = '#22e6c5'; ctx.lineWidth = 2; ctx.stroke();
        for (let i = 0; i < total; i++) {
            const p = getPoint(i, radius * skills[i].value * progress);
            ctx.beginPath(); ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#ff3d81'; ctx.fill();
            ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.stroke();
        }
        ctx.font = '600 9px Inter,sans-serif';
        ctx.fillStyle = 'rgba(167,154,174,0.9)';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        for (let i = 0; i < total; i++) {
            const lp = getPoint(i, radius + 18);
            ctx.fillText(skills[i].label, lp.x, lp.y);
        }
        if (progress < 1) requestAnimationFrame(animate);
    }
    animate();
}

const aboutSection = document.getElementById('sobre-mim');
if (aboutSection) {
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { drawRadarChart(); aboutObserver.disconnect(); }
        });
    }, { threshold: 0.3 });
    aboutObserver.observe(aboutSection);
}

// ==================== FAQ ====================
function setupFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {

            // Fecha os outros itens
            faqItems.forEach(other => {
                if (other !== item) {
                    other.classList.remove('is-open');
                    other.querySelector('.faq-question')
                        .setAttribute('aria-expanded', 'false');
                }
            });

            // Abre/fecha o clicado
            item.classList.toggle('is-open');

            question.setAttribute(
                'aria-expanded',
                item.classList.contains('is-open')
            );
        });
    });
}

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
    renderizarProjetos();
    setupMenuHamburguer();
    setupSmoothScroll();
    setupHeroParallax();
    new CertificateCarousel();

    setupFAQ(); // <-- ADICIONE ESTA LINHA
});