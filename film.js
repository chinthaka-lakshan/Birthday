// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

    // 1. Initial fade in for the Hero slide
    gsap.from(".hero-slide .floating-container", {
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out"
    });

    // 2. Scroll Animations for Slides
    const slides = gsap.utils.toArray('.slide:not(.hero-slide)');
    
    slides.forEach((slide) => {
        gsap.from(slide.querySelector('.floating-container'), {
            y: 80,
            opacity: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: slide,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // 3. Timeline Items staggered animation
    gsap.from('.timeline-item', {
        x: (index) => index % 2 === 0 ? -50 : 50, // Alternate from left/right based on flex layout
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "back.out(1.7)",
        scrollTrigger: {
            trigger: '.timeline',
            start: "top 75%",
            toggleActions: "play none none reverse"
        }
    });

    // 4. The Interactive Mascot (Walking Cat)
    const catContainer = document.querySelector('#cat-container');
    const catBody = document.querySelector('#cat-body');

    // Make the cat walk across the screen based on overall scroll progress
    gsap.to(catContainer, {
        x: () => window.innerWidth + 100, // Move completely off the right edge
        ease: "none",
        scrollTrigger: {
            trigger: "#smooth-wrapper",
            start: "top top",
            end: "bottom bottom",
            scrub: 1, // Smooth scrubbing
            onUpdate: (self) => {
                // Determine direction to flip the cat SVG
                if (self.direction === 1) {
                    // Scrolling down (moving right)
                    gsap.to(catBody, { scaleX: 1, duration: 0.2, transformOrigin: "center" });
                    catContainer.classList.add('cat-walking');
                } else if (self.direction === -1) {
                    // Scrolling up (moving left)
                    gsap.to(catBody, { scaleX: -1, duration: 0.2, transformOrigin: "center" });
                    catContainer.classList.add('cat-walking');
                }

                // Stop bouncing animation if velocity is very low
                if (Math.abs(self.getVelocity()) < 10) {
                    catContainer.classList.remove('cat-walking');
                }
            }
        }
    });

    // Clean up animation class when scrolling stops
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            catContainer.classList.remove('cat-walking');
        }, 150);
    });

    // 5. Parallax Background Shapes
    const shapes = gsap.utils.toArray('.bg-shape');
    shapes.forEach((shape, i) => {
        const depth = (i + 1) * 0.1;
        gsap.to(shape, {
            y: (index, target) => -ScrollTrigger.maxScroll(window) * depth,
            ease: "none",
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: true
            }
        });
    });

});
