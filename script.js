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
        titulo: "Irrigação de Precisão",
        descricao: "Sistema inteligente que reduz consumo de água em até 85% usando IA e dados climáticos em tempo real.",
        imagem: "https://images.unsplash.com/photo-1531104987437-d28a2ca8e6e6?w=400&h=250&fit=crop",
        categoria: "Tecnologia Hídrica"
    },
    {
        titulo: "Bioinsumos Digitais",
        descricao: "Plataforma que conecta produtores a bioinsumos certificados, aumentando produtividade sem agredir o solo.",
        imagem: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=400&h=250&fit=crop",
        categoria: "Biotech"
    },
    {
        titulo: "Carbono Agro",
        descricao: "Monitoramento de carbono e créditos verdes para propriedades que adotam práticas sustentáveis.",
        imagem: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=250&fit=crop",
        categoria: "Sustentabilidade"
    }
];

// Dados do Blog
const blogData = [
    {
        titulo: "Como a IA está revolucionando o agro sustentável",
        resumo: "Descubra como a inteligência artificial ajuda a reduzir desperdícios e aumentar produtividade no campo.",
        imagem: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=400&h=250&fit=crop",
        categoria: "Inovação",
        data: "15 Nov 2024"
    },
    {
        titulo: "Créditos de carbono: nova renda para o produtor",
        resumo: "Entenda como sua propriedade pode gerar receita extra com práticas sustentáveis.",
        imagem: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=250&fit=crop",
        categoria: "Mercado",
        data: "10 Nov 2024"
    },
    {
        titulo: "5 práticas regenerativas que transformam o solo",
        resumo: "Técnicas que melhoram a saúde do solo, retêm água e aumentam a biodiversidade.",
        imagem: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=250&fit=crop",
        categoria: "Sustentabilidade",
        data: "05 Nov 2024"
    }
];

// Renderizar cards de soluções
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
                <a href="#" class="saiba-mais" data-solucao="${solucao.titulo}">Saiba mais <i class="fas fa-arrow-right"></i></a>
            </div>
        </div>
    `).join('');
    
    // Adicionar evento de clique nos links
    document.querySelectorAll('.card .saiba-mais').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const solucao = link.getAttribute('data-solucao');
            showNotification(`🔜 Em breve mais informações sobre ${solucao}! Entre em contato para uma demonstração.`);
        });
    });
}

// Renderizar blog
function renderBlog() {
    const container = document.getElementById('blogGrid');
    if (!container) return;
    
    container.innerHTML = blogData.map(post => `
        <div class="blog-card">
            <div class="blog-img">
                <