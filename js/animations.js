// GSAP Animations
function initializeAnimations() {
    // Make sure GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.error('GSAP not loaded');
        return;
    }
    
    gsap.registerPlugin(ScrollTrigger);

    // Timeline animations
    const timelineItems = gsap.utils.toArray('.timeline-item');
    if (timelineItems.length > 0) {
        timelineItems.forEach((item, index) => {
            gsap.fromTo(item, 
                {
                    opacity: 0,
                    y: 100,
                    scale: 0.9
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        scrub: 1,
                        toggleActions: 'play reverse play reverse'
                    }
                }
            );
        });
    }

    // Parallax text effect
    const parallaxElements = document.querySelectorAll('.parallax-text');
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        gsap.to(element, {
            y: () => window.innerHeight * speed,
            ease: 'none',
            scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });

    // Project cards animation
    const projectCards = gsap.utils.toArray('.project-card');
    if (projectCards.length > 0) {
        projectCards.forEach((card, index) => {
            gsap.fromTo(card,
                {
                    y: 150,
                    opacity: 0,
                    rotateY: -30
                },
                {
                    y: 0,
                    opacity: 1,
                    rotateY: 0,
                    duration: 1.5,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        end: 'bottom 15%',
                        scrub: 1,
                        toggleActions: 'play reverse play reverse'
                    }
                }
            );
        });
    }

    // Skills animation
    const skillCategories = gsap.utils.toArray('.skill-category');
    if (skillCategories.length > 0) {
        skillCategories.forEach((category, index) => {
            gsap.fromTo(category,
                {
                    y: 100,
                    opacity: 0,
                    scale: 0.8
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: category,
                        start: 'top 85%',
                        end: 'bottom 15%',
                        scrub: 1,
                        toggleActions: 'play reverse play reverse'
                    }
                }
            );

            // Animate skill items within each category
            const skillItems = category.querySelectorAll('.skill-item');
            skillItems.forEach((item, i) => {
                gsap.fromTo(item,
                    {
                        x: -30,
                        opacity: 0
                    },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.8,
                        delay: i * 0.05,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: category,
                            start: 'top 75%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            });
        });
    }

    // Section titles animation
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        gsap.fromTo(title,
            {
                scale: 0.7,
                opacity: 0,
                rotateX: -45
            },
            {
                scale: 1,
                opacity: 1,
                rotateX: 0,
                duration: 1.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: title,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    scrub: 1,
                    toggleActions: 'play reverse play reverse'
                }
            }
        );
    });

    // Stat cards animation
    const statCards = gsap.utils.toArray('.stat-card');
    if (statCards.length > 0) {
        statCards.forEach((card, index) => {
            gsap.fromTo(card,
                {
                    y: 80,
                    opacity: 0,
                    rotateY: -20
                },
                {
                    y: 0,
                    opacity: 1,
                    rotateY: 0,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        end: 'bottom 15%',
                        scrub: 1,
                        toggleActions: 'play reverse play reverse'
                    }
                }
            );
        });
    }

    // Publication showcase animation
    const pubShowcase = document.querySelector('.publication-showcase');
    if (pubShowcase) {
        gsap.fromTo('.publication-showcase',
            {
                y: 100,
                opacity: 0,
                scale: 0.9
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.publication-showcase',
                    start: 'top 80%',
                    end: 'bottom 20%',
                    scrub: 1,
                    toggleActions: 'play reverse play reverse'
                }
            }
        );
    }

    // Magnetic effect for interactive elements
    const magneticElements = document.querySelectorAll('.btn, .contact-icon, .stat-card, .skill-item');
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
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Floating animation for shapes
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        gsap.to(shape, {
            y: '+=30',
            x: '+=20',
            rotation: 360,
            duration: 10 + index * 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    });
}

// Export for use in main.js
window.initializeAnimations = initializeAnimations;