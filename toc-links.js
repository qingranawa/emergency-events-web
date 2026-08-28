document.addEventListener('DOMContentLoaded', function () {
    const tocLinks = document.querySelectorAll('.toc-links a');
    const sections = document.querySelectorAll('section[id], #changelog, #footer-container');

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

            // 更轻量的高亮效果
            element.style.backgroundColor = 'rgba(52, 152, 219, 0.2)';
            setTimeout(() => {
                element.style.transition = 'background-color 1s ease';
                element.style.backgroundColor = '';
            }, 100);

            setTimeout(() => {
                element.style.transition = '';
            }, 1100);
        }
    }

    // 更高效的事件处理
    tocLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            smoothScroll(this.getAttribute('href'));
        });
    });

    // 优化滚动检测
    let isScrolling;
    window.addEventListener('scroll', function () {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(updateActiveSection, 50);
    }, false);

    function updateActiveSection() {
        const offset = 80;
        let currentSection = '';

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= offset && rect.bottom >= offset) {
                currentSection = '#' + section.id;
            }
        });

        tocLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === currentSection);
        });
    }

    // 初始状态
    updateActiveSection();
});