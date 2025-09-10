// Theme Toggle Functionality
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.themeIcon = this.themeToggle.querySelector('.theme-toggle-icon');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        this.init();
    }
    
    init() {
        this.setTheme(this.currentTheme);
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }
    
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }
}

// Smooth Scrolling Navigation
class SmoothScroll {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }
    
    init() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleClick(e));
        });
    }
    
    handleClick(e) {
        const targetHref = e.target.getAttribute('href');
        
        // Check if it's an external link (to another page)
        if (targetHref.includes('.html')) {
            // Allow default behavior for external links
            return;
        }
        
        // Handle anchor links on the same page
        e.preventDefault();
        const targetSection = document.querySelector(targetHref);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver(
                (entries) => this.handleIntersection(entries),
                this.observerOptions
            );
            
            this.observeElements();
        }
    }
    
    observeElements() {
        const elementsToAnimate = document.querySelectorAll(`
            .section-title,
            .project-card,
            .skill-category,
            .contact-item
        `);
        
        elementsToAnimate.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            this.observer.observe(el);
        });
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                this.observer.unobserve(entry.target);
            }
        });
    }
}

// Navigation Active State
class NavigationTracker {
    constructor() {
        this.sections = document.querySelectorAll('section[id]');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => this.updateActiveLink());
        this.updateActiveLink(); // Set initial state
    }
    
    updateActiveLink() {
        const scrollPosition = window.scrollY + 120; // Increased offset for better detection
        
        let currentSection = '';
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            // Check if we're in this section
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Handle edge case: if we're at the very bottom of the page, highlight the last section
        if (scrollPosition + window.innerHeight >= document.documentElement.scrollHeight - 10) {
            const lastSection = this.sections[this.sections.length - 1];
            if (lastSection) {
                currentSection = lastSection.getAttribute('id');
            }
        }
        
        // Update active states
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            
            // Handle both anchor links (#section) and page links
            if (linkHref === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
}

// Typing Animation for Hero
class TypingAnimation {
    constructor() {
        this.heroSubtitle = document.querySelector('.hero-subtitle');
        this.titles = [
            'Lead Backend Developer',
            'Node.js Expert',
            'TypeScript Enthusiast',
            'Database Architect',
            'Team Leader'
        ];
        this.currentTitle = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.typeSpeed = 100;
        this.deleteSpeed = 50;
        this.pauseDuration = 2000;
        
        if (this.heroSubtitle) {
            this.init();
        }
    }
    
    init() {
        this.heroSubtitle.textContent = '';
        setTimeout(() => this.type(), 1000);
    }
    
    type() {
        const currentText = this.titles[this.currentTitle];
        
        if (this.isDeleting) {
            this.heroSubtitle.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.heroSubtitle.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }
        
        let typeSpeed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;
        
        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = this.pauseDuration;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.currentTitle = (this.currentTitle + 1) % this.titles.length;
            typeSpeed = 500;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

// Particle Animation Background
class ParticleSystem {
    constructor() {
        this.canvas = this.createCanvas();
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 50;
        
        if (window.innerWidth > 768) { // Only on desktop
            this.init();
        }
    }
    
    createCanvas() {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '-1';
        canvas.style.opacity = '0.3';
        document.body.appendChild(canvas);
        return canvas;
    }
    
    init() {
        this.resize();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off edges
            if (particle.x <= 0 || particle.x >= this.canvas.width) {
                particle.vx *= -1;
            }
            if (particle.y <= 0 || particle.y >= this.canvas.height) {
                particle.vy *= -1;
            }
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(143, 223, 221, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Magnetic Button Effect
class MagneticButtons {
    constructor() {
        this.buttons = document.querySelectorAll('.btn, .project-card, .skill-category');
        this.init();
    }
    
    init() {
        this.buttons.forEach(button => {
            button.addEventListener('mousemove', (e) => this.handleMouseMove(e, button));
            button.addEventListener('mouseleave', (e) => this.handleMouseLeave(e, button));
        });
    }
    
    handleMouseMove(e, element) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const moveX = x * 0.1;
        const moveY = y * 0.1;
        
        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
    
    handleMouseLeave(e, element) {
        element.style.transform = 'translate(0, 0)';
    }
}

// Contact Form Validation (if you add a form later)
class ContactForm {
    constructor() {
        this.form = document.querySelector('#contact-form');
        if (this.form) {
            this.init();
        }
    }
    
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    
    handleSubmit(e) {
        e.preventDefault();
        // Add form validation and submission logic here
        console.log('Form submitted');
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.init();
    }
    
    init() {
        // Reduce animations on low-end devices
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
            document.body.classList.add('reduced-motion');
        }
        
        // Pause animations when tab is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                document.body.style.animationPlayState = 'paused';
            } else {
                document.body.style.animationPlayState = 'running';
            }
        });
    }
}

// Experience Card Navigation



// Professional Scroll Progress
class ScrollProgress {
    constructor() {
        this.createProgressBar();
        this.init();
    }
    
    createProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
        this.progressBar = progressBar;
    }
    
    init() {
        window.addEventListener('scroll', () => {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            this.progressBar.style.width = scrolled + '%';
        });
    }
}

// Enhanced Professional Interactions
class ProfessionalInteractions {
    constructor() {
        this.init();
    }
    
    init() {
        this.addExperienceCardClicks();
        this.addScrollToTopFunctionality();
        this.addSmoothScrollToSection();
    }
    
    addExperienceCardClicks() {
        const experienceCards = document.querySelectorAll('.experience-card-mini');
        experienceCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const jobId = card.getAttribute('data-job');
                if (jobId) {
                    window.location.href = `experience.html#${jobId}`;
                }
            });
        });
    }
    
    
    addScrollToTopFunctionality() {
        const heroScroll = document.querySelector('.hero-scroll');
        if (heroScroll) {
            heroScroll.addEventListener('click', () => {
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                    const offsetTop = aboutSection.offsetTop - 100; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        }
    }
    
    addSmoothScrollToSection() {
        // Add smooth reveal animation to sections as they come into view
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                }
            });
        }, observerOptions);
        
        // Observe sections that haven't been animated yet
        document.querySelectorAll('section:not(.hero)').forEach(section => {
            section.style.opacity = '0.95';
            observer.observe(section);
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new SmoothScroll();
    new ScrollAnimations();
    new NavigationTracker();
    new TypingAnimation();
    new ParticleSystem();
    new MagneticButtons();
    new ContactForm();
    new PerformanceMonitor();
    new ScrollProgress();
    new ProfessionalInteractions();
});

// Add some fun easter eggs
class EasterEggs {
    constructor() {
        this.konamiCode = [
            'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
            'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
            'KeyB', 'KeyA'
        ];
        this.userInput = [];
        this.init();
    }
    
    init() {
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }
    
    handleKeyPress(e) {
        this.userInput.push(e.code);
        
        if (this.userInput.length > this.konamiCode.length) {
            this.userInput.shift();
        }
        
        if (this.userInput.length === this.konamiCode.length &&
            this.userInput.every((key, index) => key === this.konamiCode[index])) {
            this.activateEasterEgg();
        }
    }
    
    activateEasterEgg() {
        // Add some fun animation or effect
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
        
        console.log('🎉 Easter egg activated! You found the Konami code!');
    }
}

// Initialize easter eggs
document.addEventListener('DOMContentLoaded', () => {
    new EasterEggs();
});

// Add CSS for rainbow animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    .reduced-motion * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
    
    .nav-link.active {
        color: var(--accent-text);
    }
    
    .nav-link.active::after {
        transform: scaleX(1);
    }
`;
document.head.appendChild(style);