document.addEventListener('DOMContentLoaded', function () {
    const tocLinks = document.querySelectorAll('.toc-links a, .toc-mobile-links a');
    const sections = document.querySelectorAll('.section[id], #changelog, #footer-container');
    const sectionState = new Map();
    const menuToggle = document.querySelector('.toc-menu-toggle');
    const mobileMenu = document.querySelector('#toc-mobile-menu');
    const menuClose = document.querySelector('.toc-menu-close');

    // 更流畅的滚动函数
    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            const navigation = document.querySelector('.toc-compact');
            const offset = (navigation?.offsetHeight || 0) + 28;
            const targetY = Math.max(0, element.getBoundingClientRect().top + window.scrollY - offset);

            window.scroll({
                top: targetY,
                behavior: 'smooth'
            });

            element.classList.add('is-targeted');
            window.setTimeout(() => element.classList.remove('is-targeted'), 900);
        }
    }

    // 更高效的事件处理
    tocLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            smoothScroll(this.getAttribute('href'));
            closeMobileMenu();
        });
    });

    function closeMobileMenu() {
        if (!mobileMenu || !menuToggle) return;
        mobileMenu.classList.remove('is-open');
        mobileMenu.setAttribute('aria-hidden', 'true');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('toc-menu-open');
    }

    function openMobileMenu() {
        if (!mobileMenu || !menuToggle) return;
        mobileMenu.classList.add('is-open');
        mobileMenu.setAttribute('aria-hidden', 'false');
        menuToggle.setAttribute('aria-expanded', 'true');
        document.body.classList.add('toc-menu-open');
    }

    menuToggle?.addEventListener('click', () => {
        const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
        isOpen ? closeMobileMenu() : openMobileMenu();
    });

    menuClose?.addEventListener('click', closeMobileMenu);

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') closeMobileMenu();
    });

    function updateActiveSection(currentSection) {
        tocLinks.forEach(link => {
            const isActive = link.getAttribute('href') === currentSection;
            link.classList.toggle('active', isActive);
            if (isActive) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            sectionState.set(entry.target, entry);
        });

        const visibleSections = [...sectionState.values()]
            .filter(entry => entry.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visibleSections.length > 0) {
            updateActiveSection(`#${visibleSections[0].target.id}`);
        }
    }, {
        rootMargin: '-96px 0px -68% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 1]
    });

    sections.forEach(section => sectionObserver.observe(section));
});
