(function () {
    'use strict';

    const ThemeSwitcher = {
        // 配置
        config: {
            darkClass: 'dark-theme',
            lightClass: 'light-theme',
            storageKey: 'user-theme',
            defaultTheme: 'dark-theme'
        },

        // 初始化
        init() {
            this.cacheDOM();
            this.bindEvents();
            this.setInitialTheme();
        },

        // 缓存DOM元素
        cacheDOM() {
            this.body = document.body;
            this.themeToggle = document.getElementById('theme-toggle');
        },

        // 绑定事件
        bindEvents() {
            if (this.themeToggle) {
                this.themeToggle.addEventListener('click', () => this.toggleTheme());
            }

            // 监听系统主题变化
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
                if (!localStorage.getItem(this.config.storageKey)) {
                    this.setTheme(e.matches ? this.config.darkClass : this.config.lightClass);
                }
            });
        },

        // 设置初始主题
        setInitialTheme() {
            const savedTheme = localStorage.getItem(this.config.storageKey);
            const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

            let theme = savedTheme ||
                (systemDark ? this.config.darkClass : this.config.lightClass) ||
                this.config.defaultTheme;

            this.setTheme(theme);
        },

        // 切换主题
        toggleTheme() {
            const isDark = this.body.classList.contains(this.config.darkClass);
            const newTheme = isDark ? this.config.lightClass : this.config.darkClass;
            this.setTheme(newTheme);
        },

        // 应用主题
        setTheme(theme) {
            // 移除所有主题类
            this.body.classList.remove(this.config.darkClass, this.config.lightClass);

            // 添加新主题类
            this.body.classList.add(theme);

            // 更新ARIA标签
            const isDark = theme === this.config.darkClass;
            this.themeToggle?.setAttribute('aria-label', isDark ? '切换到浅色主题' : '切换到深色主题');

            // 保存到本地存储
            try {
                localStorage.setItem(this.config.storageKey, theme);
            } catch (e) {
                console.warn('无法保存主题偏好:', e);
            }

            // 触发自定义事件
            document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
        }
    };

    // 初始化
    document.addEventListener('DOMContentLoaded', () => ThemeSwitcher.init());
})();