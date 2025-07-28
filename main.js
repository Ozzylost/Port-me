// Preloader
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0';
    setTimeout(function() {
        preloader.style.display = 'none';
    }, 500);
});

// Inicializar AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: false,
    mirror: false
});

// Menu Mobile
document.addEventListener('DOMContentLoaded', function() {
    const menuMobile = document.querySelector('.menu-mobile');
    const menuDesktop = document.querySelector('.menu-desktop');
    
    menuMobile.addEventListener('click', function() {
        menuDesktop.classList.toggle('active');
        menuMobile.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuDesktop.classList.remove('active');
            menuMobile.classList.remove('active');
        });
    });
});

// Rolagem suave para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Header fixo com mudança de estilo ao rolar
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 100) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});

// Botão Voltar ao Topo
window.addEventListener('scroll', function() {
    const backToTop = document.querySelector('.back-to-top');
    
    if (window.scrollY > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

// Contador de estatísticas
function animateCounter(element, target) {
    let current = 0;
    const increment = target > 100 ? 2 : 1;
    const duration = 2000;
    const steps = Math.ceil(duration / 30);
    const step = Math.ceil(target / steps);
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = current;
        }
    }, 30);
}

// Iniciar contadores quando a seção estiver visível
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumeros = entry.target.querySelectorAll('.stat-numero');
            statNumeros.forEach(numero => {
                const target = parseInt(numero.getAttribute('data-target'));
                animateCounter(numero, target);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const estatisticas = document.querySelector('.estatisticas');
    if (estatisticas) {
        observer.observe(estatisticas);
    }
});

// Filtro de Projetos
document.querySelectorAll('.filtro-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Remover classe ativo de todos os botões
        document.querySelectorAll('.filtro-btn').forEach(btn => {
            btn.classList.remove('ativo');
        });
        
        // Adicionar classe ativo ao botão clicado
        this.classList.add('ativo');
        
        const filtro = this.getAttribute('data-filtro');
        
        // Filtrar projetos
        document.querySelectorAll('.projeto-item').forEach(item => {
            if (filtro === 'todos' || item.getAttribute('data-categoria') === filtro) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Destacar link de navegação ativo durante o scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const headerHeight = document.getElementById('header').offsetHeight;
        
        if (window.scrollY >= (sectionTop - headerHeight - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});
