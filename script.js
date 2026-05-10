gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

    // Slide up text boxes
    gsap.utils.toArray('.text-box, .taped-paper, .polaroid-img').forEach(el => {
        gsap.from(el, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Staggered clip animations in string row
    gsap.utils.toArray('.string-row').forEach(row => {
        gsap.from(row.querySelectorAll('.polaroid-clip-wrapper'), {
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.5)",
            scrollTrigger: {
                trigger: row,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Parallax background bubbles
    gsap.utils.toArray('.bg-bubble').forEach(bubble => {
        gsap.to(bubble, {
            y: () => -ScrollTrigger.maxScroll(window) * 0.5,
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