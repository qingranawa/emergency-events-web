function initTableOfContents() {
    const tocLinks = [...document.querySelectorAll('.toc-links a, .toc-mobile-links a')];
    const sections = [...document.querySelectorAll('.section[id], #changelog, #footer-container')];
    const menuToggle = document.querySelector('.toc-menu-toggle');
    const mobileMenu = document.querySelector('#toc-mobile-menu');
    const menuClose = document.querySelector('.toc-menu-close');

    if (!tocLinks.length || !sections.length) return;
    if (document.body.dataset.tocReady === 'true') return;
    document.body.dataset.tocReady = 'true';

    const closeMobileMenu = () => {
        if (!mobileMenu || !menuToggle) return;
        mobileMenu.classList.remove('is-open');
        mobileMenu.setAttribute('aria-hidden', 'true');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('toc-menu-open');
    };

    const smoothScroll = target => {
        const element = document.querySelector(target);
        if (!element) return;
        const navigation = document.querySelector('.toc-compact');
        const offset = (navigation?.offsetHeight || 0) + 28;
        const targetY = Math.max(0, element.getBoundingClientRect().top + window.scrollY - offset);
        window.scroll({ top: targetY, behavior: 'smooth' });
        element.classList.add('is-targeted');
        window.setTimeout(() => element.classList.remove('is-targeted'), 900);
    };

    tocLinks.filter(link => link.getAttribute('href')?.startsWith('#')).forEach(link => link.addEventListener('click', event => {
        event.preventDefault();
        smoothScroll(link.getAttribute('href'));
        closeMobileMenu();
    }));

    menuToggle?.addEventListener('click', () => {
        const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
        if (isOpen) {
            closeMobileMenu();
        } else {
            mobileMenu?.classList.add('is-open');
            mobileMenu?.setAttribute('aria-hidden', 'false');
            menuToggle.setAttribute('aria-expanded', 'true');
            document.body.classList.add('toc-menu-open');
        }
    });
    menuClose?.addEventListener('click', closeMobileMenu);
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') closeMobileMenu();
    });

    const updateActiveSection = currentSection => {
        tocLinks.forEach(link => {
            const active = link.getAttribute('href') === currentSection;
            link.classList.toggle('active', active);
            if (active) link.setAttribute('aria-current', 'page');
            else link.removeAttribute('aria-current');
        });
    };

    const sectionState = new Map();
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => sectionState.set(entry.target, entry));
        const visible = [...sectionState.values()]
            .filter(entry => entry.isIntersecting)
            .sort((left, right) => left.boundingClientRect.top - right.boundingClientRect.top);
        if (visible.length) updateActiveSection(`#${visible[0].target.id}`);
    }, { rootMargin: '-96px 0px -68% 0px', threshold: [0, 0.1, 0.25, 0.5, 1] });
    sections.forEach(section => observer.observe(section));
}

document.addEventListener('DOMContentLoaded', initTableOfContents);
document.addEventListener('content:ready', initTableOfContents);
