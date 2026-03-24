/**
 * Hustle & Flow - Main JS
 */

// --- 1. SPLASH SCREEN & SCROLL LOCK ---
const initSplash = () => {
    const splash = document.getElementById("splash");
    const unlockScroll = () => {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
    };

    if (splash) {
        document.body.style.overflow = "hidden";
        setTimeout(() => splash.classList.add("dark"), 1000);
        setTimeout(() => splash.style.opacity = "0", 2000);
        setTimeout(() => {
            splash.remove();
            unlockScroll();
        }, 2700);
    } else {
        unlockScroll();
    }
    setTimeout(unlockScroll, 5000);
};

// --- 2. INFINITE SERVICES SLIDER LOGIC ---
let serviceIndex = 0;
let isMoving = false;

const initServicesSlider = () => {
    const track = document.getElementById("servicesGrid");
    if (!track) return;

    const cards = Array.from(track.children);
    if (cards.length === 0) return;

    // Clone cards for infinite effect
    cards.forEach(card => track.appendChild(card.cloneNode(true))); 
    cards.slice().reverse().forEach(card => track.prepend(card.cloneNode(true))); 

    const totalCards = track.children.length;
    const realCardCount = cards.length;
    const cardWidth = cards[0].offsetWidth + 30; 

    // Set initial position
    serviceIndex = realCardCount;
    track.style.transition = "none";
    track.style.transform = `translateX(-${serviceIndex * cardWidth}px)`;

    // Global function for the buttons
    window.moveServices = (direction) => {
        if (isMoving) return;
        isMoving = true;

        if (direction === "right") serviceIndex++;
        else serviceIndex--;

        track.style.transition = "transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)";
        track.style.transform = `translateX(-${serviceIndex * cardWidth}px)`;

        // Teleport Logic
        setTimeout(() => {
            track.style.transition = "none";

            if (serviceIndex >= totalCards - realCardCount) {
                serviceIndex = realCardCount;
                track.style.transform = `translateX(-${serviceIndex * cardWidth}px)`;
            }

            if (serviceIndex < realCardCount) {
                serviceIndex = totalCards - (realCardCount * 2);
                track.style.transform = `translateX(-${serviceIndex * cardWidth}px)`;
            }
            isMoving = false;
        }, 460); 
    };
};

// --- 3. DOM CONTENT LOADED ---
document.addEventListener('DOMContentLoaded', () => {
    // REVIEWS & BLOGS (Standard Scroll)
    const setupSlider = (trackId, prevBtnClass, nextBtnClass, amount) => {
        const track = document.getElementById(trackId);
        const prevBtn = document.querySelector(prevBtnClass);
        const nextBtn = document.querySelector(nextBtnClass);

        if (track && prevBtn && nextBtn) {
            nextBtn.addEventListener('click', () => track.scrollBy({ left: amount, behavior: 'smooth' }));
            prevBtn.addEventListener('click', () => track.scrollBy({ left: -amount, behavior: 'smooth' }));
        }
    };

    setupSlider('reviewsTrack', '.prev-btn', '.next-btn', 430);
    setupSlider('blogTrack', '.blog-prev', '.blog-next', 400);

    // GSAP
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        const targets = ['.hero-eyebrow', '.hero-main-title', '.hero-sub-text', '.hero-cta-group'];
        targets.forEach((selector, i) => {
            const el = document.querySelector(selector);
            if (el) {
                gsap.fromTo(el, { y: 50, opacity: 0 }, { 
                    y: 0, opacity: 1, duration: 1, delay: i * 0.1, ease: "power4.out",
                    scrollTrigger: { trigger: el, start: "top 95%", toggleActions: "play none none none" }
                });
            }
        });
    }
    
    // PHILOSOPHY CARD
    (() => {
        const philBtn = document.getElementById("flipBtn");
        const philCard = document.getElementById("philosophyCard");

        if (!philBtn || !philCard) return;

        philBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            philCard.classList.toggle("flipped");
        });
    })();

}); 
