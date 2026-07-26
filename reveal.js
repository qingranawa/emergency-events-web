/**
 * High-End Visual Design :: Scroll Animations
 * IntersectionObserver-based fade-up reveals
 * GPU-safe: animates only transform & opacity
 */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    // Observe sections, events, changelog, footer, poem, ql
    const targets = document.querySelectorAll(
        '.section, .event, .changelog-container, ' +
        '.footer-container, .poem-container, .quick-links-section, ' +
        '.main-title'
    );

    targets.forEach((el) => {
        el.classList.add('will-reveal');
        observer.observe(el);
    });
});
