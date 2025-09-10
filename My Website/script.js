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
                    loader.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        loader.remove();
                        document.body.classList.add('loaded');
                        startMainAnimations();
                    }, 400);
                }
            }, 1200);
        });
    }
    
    // Custom Interactive Cursor
    function initCustomCursor() {
        // Check if device supports hover and is not touch-only
        const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        const cursor = document.querySelector('.custom-cursor');
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');
        
        if (!cursor || !isDesktop || window.innerWidth <= 1024) {
            if (cursor) cursor.style.display = 'none';
            document.body.classList.remove('cursor-enabled');
            return;
        }
        
        // Enable custom cursor
        document.body.classList.add('cursor-enabled');
        cursor.style.display = 'block';
        
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let outlineX = 0, outlineY = 0;
        
        // Smooth cursor following with RAF
        function updateCursor(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }
        
        function animateCursor() {
            // Smooth interpolation for cursor movement
            const ease = 0.15;
            const outlineEase = 0.1;
            
            cursorX += (mouseX - cursorX) * ease;
            cursorY += (mouseY - cursorY) * ease;
            
            outlineX += (mouseX - outlineX) * outlineEase;
            outlineY += (mouseY - outlineY) * outlineEase;
            
            if (cursorDot) {
                cursorDot.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
            }
            
            if (cursorOutline) {
                cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
            }
            
            requestAnimationFrame(animateCursor);
        }
        
        document.addEventListener('mousemove', updateCursor);
        requestAnimationFrame(animateCursor);
        
        // Interactive hover effects
        const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-item, .contact-item, .nav-link, .tech-icon, .skill-category');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
            });
        });
        
        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });
        
        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
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
            
            // Typewriter effect
            let i = 0;
            
            function type() {
                if (i < text.length) {
                    nameElement.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, 80);
                } else {
                    // Animate other elements
                    setTimeout(() => {
                        if (subtitle) {
                            subtitle.style.opacity = '1';
                            subtitle.style.animation = 'fadeInUp 0.8s ease both';
                        }
                        if (description) {
                            setTimeout(() => {
                                description.style.opacity = '1';
                                description.style.animation = 'fadeInUp 0.8s ease both';
                            }, 200);
                        }
                    }, 300);
                }
            }
            
            setTimeout(type, 800);
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
        const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        
        projectCards.forEach(card => {
            if (isDesktop) {
                // Enhanced 3D tilt effect for desktop
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateX = (y - centerY) / 12;
                    const rotateY = (centerX - x) / 12;
                    
                    card.style.transform = `
                        perspective(1000px) 
                        rotateX(${rotateX}deg) 
                        rotateY(${rotateY}deg) 
                        translateY(-5px) 
                        scale(1.01)
                    `;
                });
                
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
                });
            }
            
            // Click effect
            card.addEventListener('click', (e) => {
                e.preventDefault();
                card.style.animation = 'projectCardClick 0.2s ease';
                setTimeout(() => {
                    card.style.animation = '';
                }, 200);
            });
            
            // Touch feedback for mobile
            if (!isDesktop) {
                card.addEventListener('touchstart', () => {
                    card.style.transform = 'scale(0.98)';
                });
                
                card.addEventListener('touchend', () => {
                    card.style.transform = 'scale(1)';
                });
            }
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
        // Only enable parallax on desktop
        const isDesktop = window.innerWidth > 1024;
        const parallaxElements = document.querySelectorAll('.hero-image, .floating-shapes');
        
        function handleParallax() {
            if (!isDesktop) return;
            
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(el => {
                const speed = parseFloat(el.dataset.speed) || 0.3;
                const yPos = scrolled * speed;
                el.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
        }
        
        // Scroll progress indicator
        createScrollIndicator();
        
        // Section reveals
        initSectionReveals();
        
        if (isDesktop) {
            window.addEventListener('scroll', throttle(handleParallax, 16));
        }
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
        // Only enable on desktop with good performance
        const isDesktop = window.innerWidth > 1024;
        const hasGoodPerformance = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (!isDesktop || !hasGoodPerformance) {
            return;
        }
        
        const particleCount = Math.min(30, Math.floor(window.innerWidth / 40));
        const particles = [];
        let animationId;
        
        class Particle {
            constructor() {
                this.reset();
                
                this.element = document.createElement('div');
                this.element.className = 'particle';
                this.element.style.cssText = `
                    position: fixed;
                    width: 1px;
                    height: 1px;
                    background: radial-gradient(circle, rgba(37,99,235,0.4) 0%, transparent 70%);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: -1;
                    will-change: transform, opacity;
                `;
                
                document.body.appendChild(this.element);
            }
            
            reset() {
                this.x = Math.random() * window.innerWidth;
                this.y = window.innerHeight + 50;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = -(Math.random() * 0.5 + 0.2);
                this.life = 100;
                this.decay = Math.random() * 0.01 + 0.005;
            }
            
            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.life -= this.decay;
                
                // Wrap horizontally
                if (this.x > window.innerWidth + 50) this.x = -50;
                if (this.x < -50) this.x = window.innerWidth + 50;
                
                // Reset when off screen or life expired
                if (this.y < -50 || this.life <= 0) {
                    this.reset();
                }
                
                // Update position and opacity
                this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
                this.element.style.opacity = Math.max(0, Math.min(1, this.life / 100));
            }
            
            destroy() {
                if (this.element && this.element.parentNode) {
                    this.element.remove();
                }
            }
        }
        
        // Create particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        
        // Animation loop with throttling
        let lastFrame = 0;
        function animateParticles(currentTime) {
            if (currentTime - lastFrame >= 16) { // ~60fps
                particles.forEach(particle => particle.update());
                lastFrame = currentTime;
            }
            animationId = requestAnimationFrame(animateParticles);
        }
        
        animationId = requestAnimationFrame(animateParticles);
        
        // Cleanup on resize or visibility change
        function cleanup() {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            particles.forEach(particle => particle.destroy());
            particles.length = 0;
        }
        
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 1024) {
                cleanup();
            }
        });
        
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                if (animationId) {
                    cancelAnimationFrame(animationId);
                }
            } else {
                animationId = requestAnimationFrame(animateParticles);
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
            const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
            const cursor = document.querySelector('.custom-cursor');
            
            if (isDesktop && window.innerWidth > 1024 && cursor) {
                if (cursor.style.display === 'none') {
                    initCustomCursor();
                }
            } else if (cursor) {
                cursor.style.display = 'none';
                document.body.classList.remove('cursor-enabled');
            }
            
            // Close mobile menu if open
            const navMenu = document.getElementById('nav-menu');
            const hamburger = document.getElementById('hamburger');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }
        }, 150);
    });
    
    // Add dynamic CSS for animations
    addDynamicCSS();
    
    function addDynamicCSS() {
        const style = document.createElement('style');
        style.textContent = `
            .animate-in {
                animation: fadeInUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
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
                background: radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%);
                border-radius: 50%;
                animation: ripple 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                transform: translate(-50%, -50%);
                pointer-events: none;
            }
            
            @keyframes ripple {
                to {
                    width: 150px;
                    height: 150px;
                    opacity: 0;
                }
            }
            
            .tech-click-effect {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                background: radial-gradient(circle, rgba(245,158,11,0.3) 0%, transparent 70%);
                border-radius: 50%;
                animation: techClickExpand 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                transform: translate(-50%, -50%);
                pointer-events: none;
            }
            
            @keyframes techClickExpand {
                to {
                    width: 100px;
                    height: 100px;
                    opacity: 0;
                }
            }
            
            .tech-info-panel {
                position: fixed;
                background: rgba(15, 23, 42, 0.95);
                backdrop-filter: blur(10px);
                color: white;
                padding: 1rem 1.2rem;
                border-radius: 12px;
                max-width: 280px;
                z-index: 1000;
                transform: scale(0.9) translateY(10px);
                opacity: 0;
                transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                border: 1px solid rgba(255, 255, 255, 0.1);
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            }
            
            .tech-info-panel.visible {
                transform: scale(1) translateY(0);
                opacity: 1;
            }
            
            .tech-info-panel h4 {
                margin: 0 0 0.5rem 0;
                color: #f59e0b;
                font-weight: 600;
                font-size: 1rem;
            }
            
            .tech-info-panel p {
                margin: 0 0 0.5rem 0;
                font-size: 0.9rem;
                line-height: 1.5;
                color: #e2e8f0;
            }
            
            .tech-experience {
                font-size: 0.8rem;
                color: #94a3b8;
                font-weight: 500;
            }
            
            .contact-ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(37,99,235,0.2);
                animation: contactRippleEffect 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                pointer-events: none;
            }
            
            @keyframes contactRippleEffect {
                to {
                    transform: scale(1.8);
                    opacity: 0;
                }
            }
            
            .scroll-progress {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 2px;
                background: rgba(0,0,0,0.05);
                z-index: 9999;
            }
            
            .scroll-progress-bar {
                height: 100%;
                background: linear-gradient(90deg, #667eea, #764ba2);
                width: 0;
                transition: width 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                box-shadow: 0 0 10px rgba(102, 126, 234, 0.3);
            }
            
            .section-hidden {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            .section-visible {
                opacity: 1;
                transform: translateY(0);
            }
            
            @keyframes markerPulse {
                0% { transform: scale(1); box-shadow: 0 0 0 rgba(37,99,235,0.6); }
                50% { transform: scale(1.1); box-shadow: 0 0 15px rgba(37,99,235,0.4); }
                100% { transform: scale(1); box-shadow: 0 0 0 rgba(37,99,235,0.6); }
            }
            
            @keyframes projectCardClick {
                0% { transform: scale(1); }
                50% { transform: scale(0.98); }
                100% { transform: scale(1); }
            }
            
            /* Smooth focus styles */
            *:focus {
                outline: 2px solid #667eea;
                outline-offset: 2px;
            }
            
            /* Smooth transitions for all interactive elements */
            a, button, .nav-link, .skill-item, .project-card, .contact-item {
                transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            /* Enhanced loading state */
            .hero-subtitle, .hero-description {
                opacity: 0;
            }
            
            @media (max-width: 1024px) {
                .custom-cursor {
                    display: none !important;
                }
                
                .tech-info-panel {
                    max-width: 250px;
                    padding: 0.8rem 1rem;
                }
            }
            
            @media (max-width: 768px) {
                .bg-animation,
                .floating-shapes {
                    display: none !important;
                }
                
                .tech-info-panel {
                    position: fixed;
                    left: 50% !important;
                    transform: translateX(-50%) scale(0.9) translateY(10px);
                    max-width: calc(100vw - 2rem);
                }
                
                .tech-info-panel.visible {
                    transform: translateX(-50%) scale(1) translateY(0);
                }
            }
            
            @media (prefers-reduced-motion: reduce) {
                * {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData && perfData.loadEventEnd - perfData.loadEventStart < 3000) {
                    console.log('🚀 Portfolio loaded successfully with optimized performance');
                } else {
                    console.log('⚡ Portfolio loaded - Consider optimizing for better performance');
                }
            }, 1000);
        });
    }
    
    console.log('🎨 Interactive Portfolio Ready - Inspired by Creative Web Development');
});