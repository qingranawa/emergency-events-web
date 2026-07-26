document.addEventListener('DOMContentLoaded', function () {
    const tocLinks = document.querySelectorAll('.toc-links a');
    const sections = document.querySelectorAll('.section[id], #changelog, #footer-container');

    // 更流畅的滚动函数
    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            const offset = 70;
            const targetY = element.getBoundingClientRect().top + window.scrollY - offset;

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
        });
    });

    function updateActiveSection(currentSection) {
        tocLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === currentSection);
        });
    }

    const sectionObserver = new IntersectionObserver((entries) => {
        const visibleSection = entries.find(entry => entry.isIntersecting);
        if (visibleSection) {
            updateActiveSection(`#${visibleSection.target.id}`);
        }
    }, {
        rootMargin: '-12% 0px -72% 0px',
        threshold: 0
    });

    sections.forEach(section => sectionObserver.observe(section));
});
