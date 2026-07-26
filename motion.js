/* === UI/UX Pro Max Motion Controller === */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.body.classList.add('motion-loaded');

    // 只观察真正需要入场的内容，避免对每个文本节点创建观察器。
    const revealTargets = document.querySelectorAll(
        '.event, .changelog-item, .author-card, .thanks-section, .license-section, ' +
        '.poem-container, .section h2, .changelog-title'
    );

    if (reduceMotion) {
        revealTargets.forEach(element => element.classList.add('motion-item', 'is-visible'));
    } else {
        const observer = new IntersectionObserver((entries, activeObserver) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add('is-visible');
                activeObserver.unobserve(entry.target);
            });
        }, {
            threshold: 0.08,
            rootMargin: '0px 0px -36px 0px'
        });

        revealTargets.forEach((element, index) => {
            element.classList.add('motion-item');
            element.style.setProperty('--motion-delay', `${Math.min(index % 8, 7) * 38}ms`);
            observer.observe(element);
        });
    }

    // 把原生 details 变成可逆的抽屉：保留语义，也保留关闭动画。
    document.querySelectorAll('.changelog-details').forEach(details => {
        const summary = details.querySelector('summary');
        if (!summary) return;

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

    // 主题切换时给页面一个统一的色彩交叉过渡。
    document.addEventListener('themeChanged', () => {
        document.documentElement.classList.add('motion-theme-swap');
        window.setTimeout(() => document.documentElement.classList.remove('motion-theme-swap'), 460);
    });

    // 触摸/鼠标按下反馈，不改变布局尺寸。
    document.querySelectorAll('.copy-btn, #search-trigger, #scroll-to-top, #theme-toggle').forEach(control => {
        control.addEventListener('pointerdown', () => control.classList.add('motion-pressed'));
        ['pointerup', 'pointercancel', 'pointerleave'].forEach(eventName => {
            control.addEventListener(eventName, () => control.classList.remove('motion-pressed'));
        });
    });
});
