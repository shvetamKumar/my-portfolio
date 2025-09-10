// Enhanced Interactive Portfolio - Inspired by Creative Web Development
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive systems
    initLoader();
    initCustomCursor();
    initNavigation();
    initAnimations();
    initInteractiveElements();
    initScrollEffects();
    initParticleSystem();
    
    // Global variables for performance
    let ticking = false;
    let currentCursorX = 0;
    let currentCursorY = 0;
    
    // Creative Loading Screen
    function initLoader() {
        const loader = document.getElementById('loader');
        const loaderCircle = document.querySelector('.loader-circle');
        
        // Animate loader circle
        setTimeout(() => {
            if (loaderCircle) {
                loaderCircle.style.strokeDashoffset = '0';
            }
        }, 500);
        
        // Hide loader with creative exit animation
        window.addEventListener('load', () => {
            setTimeout(() => {
                if (loader) {
                    loader.style.opacity = '0';
                    loader.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        loader.remove();
                        document.body.classList.add('loaded');
                        startMainAnimations();
                    }, 500);
                }
            }, 1500);
        });
    }
    
    // Custom Interactive Cursor
    function initCustomCursor() {
        const cursor = document.querySelector('.custom-cursor');
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');
        
        if (!cursor || window.innerWidth <= 768) {
            if (cursor) cursor.style.display = 'none';
            document.body.style.cursor = 'auto';
            return;
        }
        
        // Smooth cursor following
        function updateCursor(e) {
            currentCursorX = e.clientX;
            currentCursorY = e.clientY;
            
            if (cursorDot) {
                cursorDot.style.left = currentCursorX + 'px';
                cursorDot.style.top = currentCursorY + 'px';
            }
            
            if (cursorOutline) {
                cursorOutline.style.left = currentCursorX + 'px';
                cursorOutline.style.top = currentCursorY + 'px';
            }
        }
        
        document.addEventListener('mousemove', updateCursor);
        
        // Interactive hover effects
        const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-item, .contact-item, .nav-link, .tech-icon');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
            });
        });
    }
    
    // Enhanced Navigation with Creative Effects
    function initNavigation() {
        const navbar = document.getElementById('navbar');
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        const logo = document.querySelector('.logo-svg');
        
        // Navbar scroll effect with morphing
        function handleScroll() {
            const scrolled = window.scrollY > 50;
            navbar.classList.toggle('scrolled', scrolled);
            
            if (logo) {
                const logoCircle = logo.querySelector('.logo-circle');
                const logoRing = logo.querySelector('.logo-ring');
                
                if (scrolled) {
                    logoCircle.style.filter = 'drop-shadow(0 0 10px rgba(102, 126, 234, 0.6))';
                    logoRing.style.strokeDashoffset = '0';
                } else {
                    logoCircle.style.filter = 'drop-shadow(0 0 5px rgba(102, 126, 234, 0.3))';
                    logoRing.style.strokeDashoffset = '283';
                }
            }
        }
        
        // Enhanced mobile menu
        function toggleMobileMenu() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animate menu items
            if (navMenu.classList.contains('active')) {
                navLinks.forEach((link, index) => {
                    link.style.opacity = '0';
                    link.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        link.style.transition = 'all 0.3s ease';
                        link.style.opacity = '1';
                        link.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
            
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        }
        
        // Active nav highlighting with smooth transitions
        function setActiveNavLink() {
            const sections = document.querySelectorAll('section[id]');
            const scrollPosition = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    if (correspondingNavLink) {
                        correspondingNavLink.classList.add('active');
                    }
                }
            });
        }
        
        // Smooth scrolling with easing
        function smoothScroll(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                
                // Custom easing function
                animateScroll(window.scrollY, offsetTop, 1000);
            }
            
            // Close mobile menu
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Custom scroll animation with easing
        function animateScroll(start, end, duration) {
            const startTime = performance.now();
            const difference = end - start;
            
            function step(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function (ease-in-out-cubic)
                const easeProgress = progress < 0.5 
                    ? 4 * progress * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
                
                window.scrollTo(0, start + (difference * easeProgress));
                
                if (progress < 1) {
                    requestAnimationFrame(step);
                }
            }
            
            requestAnimationFrame(step);
        }
        
        // Event listeners
        window.addEventListener('scroll', throttle(handleScroll, 10));
        window.addEventListener('scroll', throttle(setActiveNavLink, 50));
        
        if (hamburger) hamburger.addEventListener('click', toggleMobileMenu);
        
        navLinks.forEach(link => {
            // Add span wrapper for animation
            const text = link.textContent;
            link.innerHTML = `<span>${text}</span>`;
            link.addEventListener('click', smoothScroll);
        });
        
        // Logo click animation
        if (logo) {
            logo.addEventListener('click', () => {
                animateScroll(window.scrollY, 0, 800);
            });
        }
        
        // Initialize
        handleScroll();
        setActiveNavLink();
    }
    
    // Advanced Animation System
    function initAnimations() {
        // Intersection Observer for reveal animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    // Different animation types based on element
                    if (element.classList.contains('timeline-item')) {
                        animateTimelineItem(element);
                    } else if (element.classList.contains('skill-category')) {
                        animateSkillCategory(element);
                    } else if (element.classList.contains('project-card')) {
                        animateProjectCard(element);
                    } else {
                        // Default fade in up
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }
                    
                    observer.unobserve(element);
                }
            });
        }, observerOptions);
        
        // Observe all animatable elements
        const animateElements = document.querySelectorAll(
            '.timeline-item, .project-card, .skill-category, .stat-item, .contact-item'
        );
        
        animateElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(el);
        });
    }
    
    // Specialized animation functions
    function animateTimelineItem(element) {
        element.style.opacity = '1';
        element.style.transform = 'translateX(0)';
        
        // Animate timeline marker
        const marker = element.querySelector('.timeline-marker');
        if (marker) {
            setTimeout(() => {
                marker.style.animation = 'markerPulse 1s ease';
            }, 300);
        }
    }
    
    function animateSkillCategory(element) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0) scale(1)';
        
        // Animate skill items with stagger
        const skillItems = element.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'translateY(0) scale(1)';
                item.style.opacity = '1';
            }, index * 50);
        });
    }
    
    function animateProjectCard(element) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0) scale(1)';
        
        // Add ripple effect
        setTimeout(() => {
            createRippleEffect(element);
        }, 200);
    }
    
    function createRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Interactive Elements Enhancement
    function initInteractiveElements() {
        // Enhanced hero typing animation
        animateHeroText();
        
        // Interactive tech icons
        initTechIcons();
        
        // Project card interactions
        initProjectCards();
        
        // Skill category interactions
        initSkillCategories();
        
        // Contact item animations
        initContactItems();
    }
    
    function animateHeroText() {
        const nameElement = document.querySelector('.name');
        const subtitle = document.querySelector('.hero-subtitle');
        const description = document.querySelector('.hero-description');
        
        if (nameElement) {
            const text = nameElement.textContent;
            nameElement.textContent = '';
            nameElement.style.opacity = '1';
            
            // Typewriter effect with cursor
            let i = 0;
            const cursor = document.createElement('span');
            cursor.textContent = '|';
            cursor.className = 'typing-cursor';
            
            function type() {
                if (i < text.length) {
                    nameElement.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, 100);
                } else {
                    // Remove cursor and animate other elements
                    setTimeout(() => {
                        if (subtitle) subtitle.style.animation = 'fadeInUp 0.8s ease 0.5s both';
                        if (description) description.style.animation = 'fadeInUp 0.8s ease 0.8s both';
                    }, 500);
                }
            }
            
            setTimeout(type, 1000);
        }
    }
    
    function initTechIcons() {
        const techIcons = document.querySelectorAll('.tech-icon');
        
        techIcons.forEach(icon => {
            icon.addEventListener('click', () => {
                // Create expanding circle effect
                const circle = document.createElement('div');
                circle.className = 'tech-click-effect';
                icon.appendChild(circle);
                
                setTimeout(() => {
                    circle.remove();
                }, 500);
                
                // Show tech info with animation
                showTechInfo(icon);
            });
        });
    }
    
    function showTechInfo(icon) {
        const techName = icon.getAttribute('data-tech');
        const info = getTechInfo(techName);
        
        // Create floating info panel
        const infoPanel = document.createElement('div');
        infoPanel.className = 'tech-info-panel';
        infoPanel.innerHTML = `
            <h4>${techName}</h4>
            <p>${info.description}</p>
            <div class="tech-experience">${info.experience}</div>
        `;
        
        document.body.appendChild(infoPanel);
        
        // Position near icon
        const iconRect = icon.getBoundingClientRect();
        infoPanel.style.left = iconRect.left + 'px';
        infoPanel.style.top = (iconRect.bottom + 10) + 'px';
        
        // Animate in
        setTimeout(() => {
            infoPanel.classList.add('visible');
        }, 10);
        
        // Remove after delay
        setTimeout(() => {
            infoPanel.classList.remove('visible');
            setTimeout(() => {
                infoPanel.remove();
            }, 300);
        }, 3000);
    }
    
    function getTechInfo(techName) {
        const techData = {
            'TypeScript': {
                description: 'Strongly typed JavaScript for large-scale applications',
                experience: '6+ years experience'
            },
            'Node.js': {
                description: 'Server-side JavaScript runtime for scalable applications',
                experience: '8+ years experience'
            },
            'GraphQL': {
                description: 'Query language for APIs with strong type system',
                experience: '5+ years experience'
            },
            'PostgreSQL': {
                description: 'Advanced relational database with JSON support',
                experience: '7+ years experience'
            }
        };
        
        return techData[techName] || {
            description: 'Cutting-edge technology',
            experience: 'Professional experience'
        };
    }
    
    function initProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            // Enhanced 3D tilt effect
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 8;
                const rotateY = (centerX - x) / 8;
                
                card.style.transform = `
                    perspective(1000px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg) 
                    translateY(-10px) 
                    scale(1.02)
                `;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
            });
            
            // Click effect
            card.addEventListener('click', () => {
                card.style.animation = 'projectCardClick 0.3s ease';
                setTimeout(() => {
                    card.style.animation = '';
                }, 300);
            });
        });
    }
    
    function initSkillCategories() {
        const skillCategories = document.querySelectorAll('.skill-category');
        
        skillCategories.forEach(category => {
            category.addEventListener('mouseenter', () => {
                // Animate skill items on hover
                const skillItems = category.querySelectorAll('.skill-item');
                skillItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.transform = 'translateY(-3px) scale(1.05)';
                    }, index * 30);
                });
            });
            
            category.addEventListener('mouseleave', () => {
                const skillItems = category.querySelectorAll('.skill-item');
                skillItems.forEach(item => {
                    item.style.transform = 'translateY(0) scale(1)';
                });
            });
        });
    }
    
    function initContactItems() {
        const contactItems = document.querySelectorAll('.contact-item');
        
        contactItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.2}s`;
            
            item.addEventListener('click', (e) => {
                // Add click effect
                const ripple = document.createElement('div');
                ripple.className = 'contact-ripple';
                
                const rect = item.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
                ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
                
                item.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
    
    // Advanced Scroll Effects
    function initScrollEffects() {
        // Parallax scrolling
        const parallaxElements = document.querySelectorAll('.hero-image, .floating-shapes');
        
        function handleParallax() {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(el => {
                const speed = el.dataset.speed || 0.5;
                el.style.transform = `translateY(${scrolled * speed}px)`;
            });
        }
        
        // Scroll progress indicator
        createScrollIndicator();
        
        // Section reveals
        initSectionReveals();
        
        window.addEventListener('scroll', throttle(handleParallax, 10));
    }
    
    function createScrollIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'scroll-progress';
        indicator.innerHTML = '<div class="scroll-progress-bar"></div>';
        document.body.appendChild(indicator);
        
        const progressBar = indicator.querySelector('.scroll-progress-bar');
        
        function updateScrollProgress() {
            const scrollTop = document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (scrollTop / docHeight) * 100;
            
            progressBar.style.width = scrolled + '%';
        }
        
        window.addEventListener('scroll', throttle(updateScrollProgress, 10));
    }
    
    function initSectionReveals() {
        const sections = document.querySelectorAll('section');
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                }
            });
        }, { threshold: 0.1 });
        
        sections.forEach(section => {
            section.classList.add('section-hidden');
            sectionObserver.observe(section);
        });
    }
    
    // Particle System for Background
    function initParticleSystem() {
        const particleCount = window.innerWidth > 768 ? 50 : 20;
        const particles = [];
        
        class Particle {
            constructor() {
                this.x = Math.random() * window.innerWidth;
                this.y = Math.random() * window.innerHeight;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.life = Math.random() * 100;
                this.decay = Math.random() * 0.02 + 0.005;
                
                this.element = document.createElement('div');
                this.element.className = 'particle';
                this.element.style.cssText = `
                    position: fixed;
                    width: 2px;
                    height: 2px;
                    background: radial-gradient(circle, rgba(37,99,235,0.6) 0%, transparent 70%);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: -1;
                `;
                
                document.body.appendChild(this.element);
            }
            
            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.life -= this.decay;
                
                // Wrap around screen
                if (this.x > window.innerWidth) this.x = 0;
                if (this.x < 0) this.x = window.innerWidth;
                if (this.y > window.innerHeight) this.y = 0;
                if (this.y < 0) this.y = window.innerHeight;
                
                // Update position and opacity
                this.element.style.left = this.x + 'px';
                this.element.style.top = this.y + 'px';
                this.element.style.opacity = Math.max(0, this.life / 100);
                
                // Reset if life expired
                if (this.life <= 0) {
                    this.life = 100;
                    this.x = Math.random() * window.innerWidth;
                    this.y = Math.random() * window.innerHeight;
                }
            }
            
            destroy() {
                this.element.remove();
            }
        }
        
        // Create particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        
        // Animation loop
        function animateParticles() {
            particles.forEach(particle => particle.update());
            requestAnimationFrame(animateParticles);
        }
        
        // Start animation on larger screens
        if (window.innerWidth > 768) {
            requestAnimationFrame(animateParticles);
        }
        
        // Cleanup on resize
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
                particles.forEach(particle => particle.destroy());
                particles.length = 0;
            }
        });
    }
    
    // Start main animations after loader
    function startMainAnimations() {
        // Animate hero elements
        const heroElements = document.querySelectorAll('.hero-text > *');
        heroElements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.2}s`;
            el.classList.add('animate-in');
        });
        
        // Start profile decorations
        const profileRings = document.querySelectorAll('.profile-ring-1, .profile-ring-2, .profile-ring-3');
        profileRings.forEach(ring => {
            ring.style.animationPlayState = 'running';
        });
    }
    
    // Utility Functions
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    function debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            
            if (callNow) func.apply(context, args);
        };
    }
    
    // Responsive handling
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Reinitialize cursor on resize
            if (window.innerWidth > 768 && document.querySelector('.custom-cursor')) {
                const cursor = document.querySelector('.custom-cursor');
                if (cursor.style.display === 'none') {
                    initCustomCursor();
                }
            } else if (window.innerWidth <= 768) {
                const cursor = document.querySelector('.custom-cursor');
                if (cursor) cursor.style.display = 'none';
                document.body.style.cursor = 'auto';
            }
        }, 250);
    });
    
    // Add dynamic CSS for animations
    addDynamicCSS();
    
    function addDynamicCSS() {
        const style = document.createElement('style');
        style.textContent = `
            .typing-cursor {
                animation: blink 1s infinite;
            }
            
            @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0; }
            }
            
            .animate-in {
                animation: fadeInUp 0.8s ease both;
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .ripple-effect {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                background: radial-gradient(circle, rgba(37,99,235,0.3) 0%, transparent 70%);
                border-radius: 50%;
                animation: ripple 0.6s ease;
                transform: translate(-50%, -50%);
            }
            
            @keyframes ripple {
                to {
                    width: 200px;
                    height: 200px;
                }
            }
            
            .tech-click-effect {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                background: radial-gradient(circle, rgba(245,158,11,0.4) 0%, transparent 70%);
                border-radius: 50%;
                animation: techClickExpand 0.5s ease;
                transform: translate(-50%, -50%);
            }
            
            @keyframes techClickExpand {
                to {
                    width: 120px;
                    height: 120px;
                }
            }
            
            .tech-info-panel {
                position: fixed;
                background: rgba(0,0,0,0.9);
                color: white;
                padding: 1rem;
                border-radius: 8px;
                max-width: 250px;
                z-index: 1000;
                transform: scale(0.8) translateY(10px);
                opacity: 0;
                transition: all 0.3s ease;
            }
            
            .tech-info-panel.visible {
                transform: scale(1) translateY(0);
                opacity: 1;
            }
            
            .tech-info-panel h4 {
                margin: 0 0 0.5rem 0;
                color: #f59e0b;
            }
            
            .tech-info-panel p {
                margin: 0 0 0.5rem 0;
                font-size: 0.9rem;
            }
            
            .tech-experience {
                font-size: 0.8rem;
                color: #9ca3af;
            }
            
            .contact-ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(37,99,235,0.3);
                animation: contactRippleEffect 0.6s ease;
                pointer-events: none;
            }
            
            @keyframes contactRippleEffect {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
            
            .scroll-progress {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 3px;
                background: rgba(0,0,0,0.1);
                z-index: 9999;
            }
            
            .scroll-progress-bar {
                height: 100%;
                background: linear-gradient(90deg, #667eea, #764ba2);
                width: 0;
                transition: width 0.1s ease;
            }
            
            .section-hidden {
                opacity: 0;
                transform: translateY(50px);
                transition: all 0.8s ease;
            }
            
            .section-visible {
                opacity: 1;
                transform: translateY(0);
            }
            
            @keyframes markerPulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.2); box-shadow: 0 0 20px rgba(37,99,235,0.6); }
                100% { transform: scale(1); }
            }
            
            @keyframes projectCardClick {
                0% { transform: scale(1); }
                50% { transform: scale(0.98); }
                100% { transform: scale(1); }
            }
            
            @media (max-width: 768px) {
                .particle,
                .floating-shapes {
                    display: none;
                }
                
                .custom-cursor {
                    display: none !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    console.log('🚀 Interactive Portfolio Loaded - Inspired by Creative Web Development');
});