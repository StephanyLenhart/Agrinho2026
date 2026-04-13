// Menu Mobile
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Smooth Scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Fecha menu mobile se estiver aberto
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
    });
});

// Dados dos cards (soluções)
const solucoesData = [
    {
        titulo: "Irrigação Inteligente",
        descricao: "Sistema com IA que reduz consumo de água em até 85%, usando dados climáticos em tempo real.",
        imagem: "https://images.unsplash.com/photo-1531104987437-d28a2ca8e6e6?w=400&h=250&fit=crop",
        link: "#"
    },
    {
        titulo: "Bioinsumos Certificados",
        descricao: "Defensivos e fertilizantes 100% biodegradáveis que aumentam produtividade sem agredir o solo.",
        imagem: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=400&h=250&fit=crop",
        link: "#"
    },
    {
        titulo: "Agrofloresta Digital",
        descricao: "Plataforma de monitoramento de carbono e biodiversidade para propriedades sustentáveis.",
        imagem: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=250&fit=crop",
        link: "#"
    }
];

// Renderizar cards
function renderCards() {
    const container = document.getElementById('cardsContainer');
    if (!container) return;
    
    container.innerHTML = solucoesData.map(solucao => `
        <div class="card">
            <div class="card-img">
                <img src="${solucao.imagem}" alt="${solucao.titulo}">
            </div>
            <div class="card-content">
                <h3>${solucao.titulo}</h3>
                <p>${solucao.descricao}</p>
                <a href="${solucao.link}" class="saiba-mais">Saiba mais <i class="fas fa-arrow-right"></i></a>
            </div>
        </div>
    `).join('');
    
    // Adicionar evento de clique nos cards
    document.querySelectorAll('.card .saiba-mais').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            alert('🔜 Em breve mais informações! Entre em contato para uma demonstração.');
        });
    });
}

// Contador animado
function animateCounter(element, target, suffix = '') {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 30);
}

// Iniciar contadores quando o elemento entrar na viewport
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const impactCards = document.querySelectorAll('.impacto-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const value = card.getAttribute('data-value');
                const counterSpan = card.querySelector('.counter');
                const h3 = card.querySelector('h3');
                const suffix = h3.innerHTML.includes('M') ? 'M' : '%';
                const cleanValue = suffix === 'M' ? parseFloat(value) : parseInt(value);
                
                if (counterSpan && !counterSpan.classList.contains('animated')) {
                    animateCounter(counterSpan, cleanValue, suffix);
                    counterSpan.classList.add('animated');
                }
                observer.unobserve(card);
            }
        });
    }, { threshold: 0.5 });
    
    impactCards.forEach(card => observer.observe(card));
}

// Newsletter com validação e feedback
function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    const emailInput = document.getElementById('emailInput');
    const messageDiv = document.getElementById('formMessage');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = emailInput.value.trim();
            
            if (!email) {
                showMessage('Por favor, insira um e-mail.', 'error');
                return;
            }
            
            if (!email.includes('@') || !email.includes('.')) {
                showMessage('E-mail inválido. Use um formato como nome@exemplo.com', 'error');
                return;
            }
            
            // Simula envio
            showMessage('✅ Inscrição realizada com sucesso! Você receberá nossas novidades.', 'success');
            emailInput.value = '';
            
            // Limpa mensagem após 3 segundos
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 3000);
        });
    }
}

function showMessage(msg, type) {
    const messageDiv = document.getElementById('formMessage');
    messageDiv.textContent = msg;
    messageDiv.style.color = type === 'success' ? '#2e7d32' : '#d32f2f';
    messageDiv.style.display = 'block';
    messageDiv.style.marginTop = '1rem';
    messageDiv.style.fontWeight = '600';
}

// Botão "Descubra Como" (Hero)
function initHeroButton() {
    const btn = document.getElementById('saibaMaisBtn');
    if (btn) {
        btn.addEventListener('click', () => {
            const solucoesSection = document.getElementById('solucoes');
            if (solucoesSection) {
                solucoesSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// Animação de entrada ao scroll
function initScrollReveal() {
    const elements = document.querySelectorAll('.sobre-content, .card, .impacto-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255,255,255,0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'rgba(255,255,255,0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        }
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderCards();
    initCounters();
    initNewsletter();
    initHeroButton();
    initScrollReveal();
    initHeaderScroll();
    
    // Pequeno atraso para garantir que os elementos estejam na tela
    setTimeout(() => {
        initCounters(); // Reforça contadores caso já estejam visíveis
    }, 500);
});

// Adiciona classe active no link da navegação conforme scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLi.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});