/* D1 content is inserted asynchronously, so motion bindings are refreshed on content:ready. */
(() => {
    'use strict';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.body.classList.add('motion-loaded');

    const initDynamicMotion = () => {
        const revealTargets = document.querySelectorAll(
            '.event, .changelog-item, .author-card, .thanks-section, .license-section, ' +
            '.poem-container, .section h2, .changelog-title'
        );
        const observer = reduceMotion ? null : new IntersectionObserver((entries, activeObserver) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                activeObserver.unobserve(entry.target);
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -36px 0px' });

        revealTargets.forEach((element, index) => {
            element.classList.add('motion-item');
            element.style.setProperty('--motion-delay', `${Math.min(index % 8, 7) * 38}ms`);
            if (reduceMotion) element.classList.add('is-visible');
            else observer.observe(element);
        });

        document.querySelectorAll('.changelog-details').forEach(details => {
            if (details.dataset.motionReady === 'true') return;
            const summary = details.querySelector('summary');
            if (!summary) return;
            details.dataset.motionReady = 'true';
            summary.setAttribute('aria-expanded', String(details.open));
            summary.addEventListener('click', event => {
                event.preventDefault();
                window.clearTimeout(details.motionCloseTimer);
                if (details.open) {
                    details.classList.add('is-closing');
                    summary.setAttribute('aria-expanded', 'false');
                    details.motionCloseTimer = window.setTimeout(() => {
                        details.open = false;
                        details.classList.remove('is-closing');
                    }, 220);
                    return;
                }
                details.open = true;
                summary.setAttribute('aria-expanded', 'true');
                requestAnimationFrame(() => details.classList.add('is-opening'));
                window.setTimeout(() => details.classList.remove('is-opening'), 420);
            });
        });
    };

    document.addEventListener('pointerdown', event => {
        const control = event.target.closest('.copy-btn, #search-trigger, #scroll-to-top, #theme-toggle');
        control?.classList.add('motion-pressed');
    });
    document.addEventListener('pointerup', event => event.target.closest('.motion-pressed')?.classList.remove('motion-pressed'));
    document.addEventListener('pointercancel', event => event.target.closest('.motion-pressed')?.classList.remove('motion-pressed'));
    document.addEventListener('themeChanged', () => {
        document.documentElement.classList.add('motion-theme-swap');
        window.setTimeout(() => document.documentElement.classList.remove('motion-theme-swap'), 460);
    });
    document.addEventListener('DOMContentLoaded', initDynamicMotion);
    document.addEventListener('content:ready', initDynamicMotion);
})();
