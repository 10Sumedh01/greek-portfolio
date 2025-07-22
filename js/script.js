// Initialize GSAP and plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Global variables
let locoScroll;
let cursor;
let cursorFollower;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initLoader();
    initLocomotiveScroll();
    initCursor();
    initNavigation();
    initAnimations();
    initRoleRotation();
    initSkillBars();
    initContactForm();
    initCounters();
});

// Locomotive Scroll initialization
function initLocomotiveScroll() {
    locoScroll = new LocomotiveScroll({
        el: document.querySelector('#main'),
        smooth: true,
        multiplier: 1,
        class: 'is-revealed'
    });

    // Update ScrollTrigger when locomotive scroll updates
    locoScroll.on('scroll', ScrollTrigger.update);

    // ScrollTrigger proxy for locomotive scroll
    ScrollTrigger.scrollerProxy('#main', {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        },
        pinType: document.querySelector('#main').style.transform ? 'transform' : 'fixed'
    });

    // Refresh ScrollTrigger when locomotive scroll is updated
    ScrollTrigger.addEventListener('refresh', () => locoScroll.update());
    ScrollTrigger.refresh();
}

// Loader animation
function initLoader() {
    const loaderText = document.querySelector('.loader-text');
    const loaderProgress = document.querySelector('.loader-progress');
    const loader = document.getElementById('loader');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        loaderText.textContent = Math.floor(progress) + '%';
        loaderProgress.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                gsap.to(loader, {
                    y: '-100%',
                    duration: 1,
                    ease: 'power2.inOut',
                    onComplete: () => {
                        loader.style.display = 'none';
                        startMainAnimations();
                    }
                });
            }, 500);
        }
    }, 100);
}

// Start main animations after loader
function startMainAnimations() {
    // Animate hero elements
    const tl = gsap.timeline();
    
    tl.from('.name-line', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    })
    .from('.hero-roles', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
    }, '-=0.5')
    .from('.hero-description', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
    }, '-=0.3')
    .from('.cta-button', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
    }, '-=0.3')
    .to('.scroll-indicator', {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out'
    }, '-=0.2');
}

// Custom cursor
function initCursor() {
    cursor = document.getElementById('cursor');
    cursorFollower = document.getElementById('cursor-follower');
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        gsap.to(cursor, {
            x: mouseX - 10,
            y: mouseY - 10,
            duration: 0.1
        });
    });
    
    // Smooth follower animation
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        gsap.set(cursorFollower, {
            x: followerX - 20,
            y: followerY - 20
        });
        
        requestAnimationFrame(animateFollower);
    }
    animateFollower();
    
    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-item');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            gsap.to(cursor, {
                scale: 2,
                backgroundColor: '#6096B4',
                duration: 0.3
            });
            gsap.to(cursorFollower, {
                scale: 1.5,
                duration: 0.3
            });
        });
        
        element.addEventListener('mouseleave', () => {
            gsap.to(cursor, {
                scale: 1,
                backgroundColor: '#D4E2D4',
                duration: 0.3
            });
            gsap.to(cursorFollower, {
                scale: 1,
                duration: 0.3
            });
        });
    });
}

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            navToggle.classList.toggle('active');
        });
    }

    // Navbar scroll effect
    ScrollTrigger.create({
        trigger: '#main',
        start: 'top -80',
        scroller: '#main',
        onUpdate: self => {
            navbar.classList.toggle('scrolled', self.direction === 1);
        }
    });
    
    // Smooth scroll to sections
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href'); // keeps #
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                locoScroll.scrollTo(targetElement);
            }

            // Close menu on link click
            if (navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                navToggle.classList.remove('active');
            }
        });
    });
}


// Role rotation animation
function initRoleRotation() {
    const roles = document.querySelectorAll('.role');
    let currentRole = 0;
    
    function rotateRoles() {
        roles[currentRole].classList.remove('active');
        currentRole = (currentRole + 1) % roles.length;
        roles[currentRole].classList.add('active');
    }
    
    setInterval(rotateRoles, 3000);
}

// Scroll-triggered animations
function initAnimations() {
    // About section animations
    gsap.from('.about-intro h3', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 80%',
            scroller: '#main'
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    });
    
    gsap.from('.about-intro p', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 70%',
            scroller: '#main'
        },
        x: -30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
    });
    
    gsap.from('.profile-card', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 60%',
            scroller: '#main'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    });
    
    // Skills section animations
    gsap.from('.skill-category', {
        scrollTrigger: {
            trigger: '.skills-section',
            start: 'top 80%',
            scroller: '#main'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.3,
        ease: 'power2.out'
    });
    
    // Projects section animations
    gsap.from('.project-card', {
        scrollTrigger: {
            trigger: '.projects-section',
            start: 'top 80%',
            scroller: '#main'
        },
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: 'power2.out'
    });
    
    // Contact section animations
    gsap.from('.contact-item', {
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 80%',
            scroller: '#main'
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
    });
    
    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 70%',
            scroller: '#main'
        },
        x: 50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    });
}

// Skill bars animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        
        ScrollTrigger.create({
            trigger: bar,
            start: 'top 90%',
            scroller: '#main',
            onEnter: () => {
                gsap.to(bar, {
                    width: width + '%',
                    duration: 1.5,
                    ease: 'power2.out'
                });
            }
        });
    });
}

// Counter animation
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        
        ScrollTrigger.create({
            trigger: counter,
            start: 'top 90%',
            scroller: '#main',
            onEnter: () => {
                gsap.to(counter, {
                    textContent: target,
                    duration: 2,
                    ease: 'power2.out',
                    snap: { textContent: 1 },
                    stagger: 0.2
                });
            }
        });
    });
}

// Contact form functionality
function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.querySelector('.submit-btn');
    
    form.addEventListener('submit', (e) => {
        // Animate button
        gsap.to(submitBtn, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1
        });
    });
}

// Parallax effects
function initParallax() {
    gsap.utils.toArray('.parallax').forEach(element => {
        gsap.to(element, {
            yPercent: -50,
            ease: 'none',
            scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scroller: '#main',
                scrub: true
            }
        });
    });
}

// Text reveal animation
function initTextReveal() {
    gsap.utils.toArray('.text-reveal').forEach(element => {
        gsap.from(element, {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 90%',
                scroller: '#main'
            }
        });
    });
}

// Magnetic effect for buttons
function initMagneticEffect() {
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(element, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        element.addEventListener('mouseleave', () => {
            gsap.to(element, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    });
}

// Resize handler
window.addEventListener('resize', () => {
    if (locoScroll) {
        locoScroll.update();
    }
    ScrollTrigger.refresh();
});

// Page visibility change handler
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is hidden
        gsap.globalTimeline.pause();
    } else {
        // Resume animations when page is visible
        gsap.globalTimeline.resume();
    }
});

// Smooth scroll to top
function scrollToTop() {
    locoScroll.scrollTo('top');
}

// Add scroll to top button
function addScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="ri-arrow-up-line"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #7C9D96, #6096B4);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        transform: translateY(100px);
        transition: all 0.3s ease;
        z-index: 1000;
        font-size: 1.2rem;
    `;
    
    document.body.appendChild(scrollBtn);
    
    scrollBtn.addEventListener('click', scrollToTop);
    
    ScrollTrigger.create({
        trigger: '#main',
        start: 'top -200',
        scroller: '#main',
        onUpdate: (self) => {
            if (self.progress > 0.1) {
                gsap.to(scrollBtn, {
                    opacity: 1,
                    y: 0,
                    duration: 0.3
                });
            } else {
                gsap.to(scrollBtn, {
                    opacity: 0,
                    y: 100,
                    duration: 0.3
                });
            }
        }
    });
}

// Initialize scroll to top button
addScrollToTopButton();

// Performance optimization
function optimizePerformance() {
    // Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.globalTimeline.timeScale(0.5);
    }
    
    // Optimize scroll performance
    let ticking = false;
    
    function updateScrollAnimations() {
        // Update any scroll-dependent animations here
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollAnimations);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Initialize performance optimizations
optimizePerformance();

// Debug mode (remove in production)
if (window.location.search.includes('debug=true')) {
    ScrollTrigger.batch('.debug-element', {
        onEnter: (elements) => console.log('Elements entered:', elements),
        onLeave: (elements) => console.log('Elements left:', elements)
    });
}

