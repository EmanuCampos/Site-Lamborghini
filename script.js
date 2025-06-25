document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const backgroundSlides = document.querySelectorAll('.slide');
    
    // Variáveis de estado
    let currentSection = 'home';
    let isAnimating = false;
    
    // Inicialização
    activateBackground(currentSection);
    
    // Menu mobile toggle
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Navegação por clique
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            
            if (targetId !== currentSection && !isAnimating) {
                navigateToSection(targetId);
            }
            
            // Fechar menu mobile após clique
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Observador de interseção para destacar seção atual durante scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.6
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isAnimating) {
                const sectionId = entry.target.id;
                currentSection = sectionId;
                activateSection(sectionId);
                activateBackground(sectionId);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Função para navegar entre seções com animação
    function navigateToSection(sectionId) {
        isAnimating = true;
        
        const currentIndex = Array.from(sections).findIndex(s => s.id === currentSection);
        const targetIndex = Array.from(sections).findIndex(s => s.id === sectionId);
        const direction = targetIndex > currentIndex ? 'right' : 'left';
        
        // Desativar seção atual visualmente
        const currentActiveSection = document.getElementById(currentSection);
        currentActiveSection.classList.add(direction === 'right' ? 'slide-out-left' : 'slide-out-right');
        
        // Ativar nova seção
        const targetSection = document.getElementById(sectionId);
        targetSection.classList.add(direction === 'right' ? 'slide-in-right' : 'slide-in-left');
        targetSection.classList.remove('slide-out-left', 'slide-out-right');
        
        // Rolagem suave para a seção
        window.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
        });
        
        // Atualizar background
        activateBackground(sectionId);
        
        // Ativar link de navegação
        activateSection(sectionId);
        
        // Resetar animação após conclusão
        setTimeout(() => {
            currentActiveSection.classList.remove('slide-out-left', 'slide-out-right');
            targetSection.classList.remove('slide-in-left', 'slide-in-right');
            currentSection = sectionId;
            isAnimating = false;
        }, 800);
    }
    
    // Funções auxiliares
    function activateSection(sectionId) {
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${sectionId}`) {
                item.classList.add('active');
            }
        });
    }
    
    function activateBackground(sectionId) {
        backgroundSlides.forEach(slide => {
            slide.classList.remove('active');
            if (slide.dataset.section === sectionId) {
                slide.classList.add('active');
            }
        });
    }
    
    // Botão CTA
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            navigateToSection('about');
        });
    }
});