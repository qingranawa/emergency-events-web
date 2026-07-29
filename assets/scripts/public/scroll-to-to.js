class ScrollToTop {
    constructor() {
        this.btn = document.querySelector('.scroll-top-btn');
        this.progressCircle = this.btn?.querySelector('.progress-circle');
        this.progressText = this.btn?.querySelector('.progress-text');
        this.scrollThreshold = 300;
        this.init();
    }

    init() {
        if (!this.btn) return;

        window.addEventListener('scroll', this.handleScroll.bind(this));
        this.btn.addEventListener('click', this.scrollToTop.bind(this));

        // 触摸反馈
        this.btn.addEventListener('touchstart', () => {
            this.btn.style.transform = 'scale(0.95)';
        }, { passive: true });

        this.btn.addEventListener('touchend', () => {
            this.btn.style.transform = '';
        }, { passive: true });
    }

    handleScroll() {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = Math.round((scrollY / scrollHeight) * 100);

        // 显示/隐藏按钮
        if (scrollY > this.scrollThreshold) {
            this.btn.style.display = 'flex';
            setTimeout(() => this.btn.classList.add('visible'), 10);
        } else {
            this.btn.classList.remove('visible');
            setTimeout(() => {
                if (!this.btn.classList.contains('visible')) {
                    this.btn.style.display = 'none';
                }
            }, 300);
        }

        // 更新进度条和文本
        this.updateProgress(scrollY, scrollHeight, scrollProgress);
    }

    updateProgress(scrollY, scrollHeight, progress) {
        if (this.progressCircle) {
            this.progressCircle.style.background =
                `conic-gradient(rgba(255,255,255,0.3) 0%, transparent ${progress}%)`;
        }

        if (this.progressText) {
            this.progressText.textContent = `${progress}%`;

            // 当接近顶部时隐藏百分比
            if (progress < 5) {
                this.progressText.style.opacity = '0';
            } else {
                this.progressText.style.opacity = '0.8';
            }
        }
    }

    scrollToTop(e) {
        e.preventDefault();

        // 点击动画
        this.btn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.btn.style.transform = '';
        }, 200);

        // 平滑滚动
        const startPosition = window.scrollY || document.documentElement.scrollTop;
        const startTime = performance.now();
        const duration = Math.min(700, startPosition * 0.5);

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = this.easeInOutCubic(progress);

            window.scrollTo(0, startPosition * (1 - ease));

            // 实时更新进度
            const currentY = startPosition * (1 - ease);
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const currentProgress = Math.round((currentY / scrollHeight) * 100);
            this.updateProgress(currentY, scrollHeight, currentProgress);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => new ScrollToTop());