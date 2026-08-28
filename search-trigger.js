// 广播搜索类 - 优化版
class BroadcastSearch {
    constructor() {
        this.dom = {
            searchTrigger: document.getElementById('search-trigger'),
            searchModal: document.getElementById('search-modal'),
            searchBox: document.getElementById('search-box'),
            searchResults: document.getElementById('search-results'),
            closeSearch: document.getElementById('close-search')
        };

        this.currentFocus = -1;
        this.searchData = [];
        this.DEFAULT_ICON = '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path>';
        this.init();
    }

    init() {
        if (!this.dom.searchTrigger || !this.dom.searchModal) {
            console.warn('Search elements not found');
            return;
        }

        this.setupEventListeners();
        this.detectSystemTheme();
        this.loadSearchData();

        // 暴露给开发工具调试
        if (window.__DEV__) {
            window.__search = this;
        }
    }

    setupEventListeners() {
        // 打开搜索
        this.dom.searchTrigger.addEventListener('click', () => this.openSearch());

        // 关闭搜索
        this.dom.closeSearch.addEventListener('click', () => this.closeSearch());

        // 点击模态框外部关闭
        this.dom.searchModal.addEventListener('click', (e) => {
            if (e.target === this.dom.searchModal) {
                this.closeSearch();
            }
        });

        // 输入搜索
        this.dom.searchBox.addEventListener('input',
            this.debounce(() => this.handleSearch(), 300)
        );

        // 键盘导航
        this.dom.searchBox.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Home' || e.key === 'End') {
                this.handleKeyboardNavigation(e);
            } else if (e.key === 'Enter') {
                this.handleEnterKey();
            }
        });

        // 全局快捷键
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen()) {
                this.closeSearch();
            } else if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                this.toggleSearch();
            }
        });
    }

    isOpen() {
        return this.dom.searchModal.classList.contains('active');
    }

    toggleSearch() {
        this.isOpen() ? this.closeSearch() : this.openSearch();
    }

    openSearch() {
        this.dom.searchModal.classList.add('active');
        this.dom.searchBox.focus();

        // 动画效果
        this.dom.searchModal.style.opacity = '0';
        this.dom.searchModal.style.backdropFilter = 'blur(0px)';

        requestAnimationFrame(() => {
            this.dom.searchModal.style.opacity = '1';
            this.dom.searchModal.style.backdropFilter = `blur(${this.getBackdropBlur()}px)`;
        });
    }

    getBackdropBlur() {
        return window.innerWidth <= 768 ? 6 : 12;
    }

    closeSearch() {
        this.dom.searchModal.classList.remove('active');
        this.dom.searchBox.value = '';
        this.clearResults();
        this.currentFocus = -1;
    }

    async loadSearchData() {
        try {
            this.searchData = this.getBroadcastSources();
            if (this.searchData.length === 0) {
                console.warn('No broadcast data found');
            }
        } catch (error) {
            console.error('Error loading search data:', error);
        }
    }

    getBroadcastSources() {
        const sources = [];
        const eventElements = document.querySelectorAll('.event');

        for (const element of eventElements) {
            try {
                const title = element.querySelector('h3')?.textContent.trim() || '';
                const broadcast = element.querySelector('.broadcast')?.textContent.replace(/\s+/g, ' ').trim() || '';
                const summary = element.querySelector('.summary')?.textContent.trim() || '';

                if (broadcast) {
                    sources.push({
                        title: title,
                        text: broadcast,
                        summary: summary,
                        element: element,
                        icon: this.DEFAULT_ICON,
                        // 添加事件类型信息
                        type: this.detectEventType(title, broadcast)
                    });
                }
            } catch (error) {
                console.error('Error processing event element:', error);
            }
        }

        return sources;
    }

    detectEventType(title, broadcast) {
        const lowerTitle = title.toLowerCase();
        const lowerBroadcast = broadcast.toLowerCase();

        if (lowerTitle.includes('goc') || lowerBroadcast.includes('goc')) {
            return 'goc';
        } else if (lowerTitle.includes('scp') || lowerBroadcast.includes('scp')) {
            return 'scp';
        } else if (lowerTitle.includes('mtf') || lowerBroadcast.includes('mtf')) {
            return 'mtf';
        } else if (lowerTitle.includes('混沌') || lowerBroadcast.includes('混沌')) {
            return 'chaos';
        }

        return 'other';
    }

    handleSearch() {
        const query = this.dom.searchBox.value.trim().toLowerCase();
        this.clearResults();

        if (!query) {
            this.showEmptyState();
            return;
        }

        if (window.requestIdleCallback) {
            requestIdleCallback(() => this.performSearch(query), { timeout: 500 });
        } else {
            this.performSearch(query);
        }
    }

    performSearch(query) {
        this.showLoading();

        const results = [];
        const queryWords = query.split(/\s+/).filter(Boolean);
        const searchFields = ['title', 'text', 'summary'];

        for (const item of this.searchData) {
            let matchesAll = true;

            for (const word of queryWords) {
                let wordFound = false;

                // 在所有字段中搜索
                for (const field of searchFields) {
                    if (item[field] && item[field].toLowerCase().includes(word)) {
                        wordFound = true;
                        break;
                    }
                }

                if (!wordFound) {
                    matchesAll = false;
                    break;
                }
            }

            if (matchesAll) {
                results.push(item);
                if (results.length >= 50) break;
            }
        }

        if (results.length > 0) {
            this.displayResults(results, query);
        } else {
            this.showNoResults();
        }
    }

    displayResults(results, query) {
        const fragment = document.createDocumentFragment();

        // 不分组直接显示
        for (const result of results) {
            fragment.appendChild(this.createResultElement(result, query));
        }

        this.dom.searchResults.innerHTML = '';
        this.dom.searchResults.appendChild(fragment);
    }

    createResultElement(result, query) {
        const resultElement = document.createElement('div');
        resultElement.className = 'search-result';
        resultElement.tabIndex = '0';
        resultElement.dataset.type = result.type;

        const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        icon.setAttribute('class', 'search-result-icon');
        icon.setAttribute('width', '18');
        icon.setAttribute('height', '18');
        icon.setAttribute('viewBox', '0 0 24 24');
        icon.innerHTML = result.icon || this.DEFAULT_ICON;

        const content = document.createElement('div');
        content.className = 'search-result-content';

        const title = document.createElement('div');
        title.className = 'search-result-title';
        title.innerHTML = this.highlightText(result.title, query);

        const description = document.createElement('div');
        description.className = 'search-result-description';
        description.innerHTML = this.highlightText(
            result.text.substring(0, 120) + (result.text.length > 120 ? '...' : ''),
            query
        );

        content.appendChild(title);
        content.appendChild(description);
        resultElement.appendChild(icon);
        resultElement.appendChild(content);

        resultElement.addEventListener('click', () => this.handleResultClick(result));
        resultElement.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.handleResultClick(result);
            }
        });

        return resultElement;
    }

    highlightText(text, query) {
        if (!text || !query) return text;

        const words = query.split(/\s+/).filter(Boolean);
        let highlighted = text;

        words.forEach(word => {
            const regex = new RegExp(`(${this.escapeRegExp(word)})`, 'gi');
            highlighted = highlighted.replace(
                regex,
                '<span class="highlight">$1</span>'
            );
        });

        return highlighted;
    }

    handleResultClick(result) {
        this.closeSearch();

        if (result.element) {
            // 添加高亮动画
            result.element.classList.add('search-highlight');

            // 移除可能存在的旧高亮
            const oldHighlights = document.querySelectorAll('.search-highlight');
            oldHighlights.forEach(el => {
                if (el !== result.element) {
                    el.classList.remove('search-highlight');
                }
            });

            // 滚动到元素
            result.element.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });

            // 3秒后移除高亮
            setTimeout(() => {
                result.element.classList.remove('search-highlight');
            }, 3000);
        }
    }

    showEmptyState() {
        this.dom.searchResults.innerHTML = `
            <div class="search-empty-state">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
                <p>输入关键词搜索广播内容</p>
                <div class="search-tips">
                    <span>可以搜索事件标题、广播内容或概要</span>
                    <span>例如: "核弹"、"GOC" 或 "SCP-096"</span>
                </div>
            </div>
        `;
    }

    showLoading() {
        this.dom.searchResults.innerHTML = `
            <div class="search-loading">
                <div class="loading-spinner"></div>
                <p>搜索中...</p>
            </div>
        `;
    }

    showNoResults() {
        this.dom.searchResults.innerHTML = `
            <div class="no-result">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    <line x1="11" y1="8" x2="11" y2="14"></line>
                    <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
                <p>没有找到匹配的广播内容</p>
                <div class="search-tips">
                    <span>尝试不同的关键词或更短的搜索词</span>
                </div>
            </div>
        `;
    }

    clearResults() {
        this.dom.searchResults.innerHTML = '';
    }

    handleKeyboardNavigation(e) {
        const items = this.dom.searchResults.querySelectorAll('.search-result');
        if (items.length === 0) return;

        e.preventDefault();

        if (e.key === 'ArrowDown') {
            this.currentFocus = (this.currentFocus + 1) % items.length;
        } else if (e.key === 'ArrowUp') {
            this.currentFocus = (this.currentFocus - 1 + items.length) % items.length;
        } else if (e.key === 'Home') {
            this.currentFocus = 0;
        } else if (e.key === 'End') {
            this.currentFocus = items.length - 1;
        }

        items[this.currentFocus].focus();
        items[this.currentFocus].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
        });
    }

    handleEnterKey() {
        const items = this.dom.searchResults.querySelectorAll('.search-result');
        if (items.length > 0 && this.currentFocus >= 0) {
            items[this.currentFocus].click();
        } else if (items.length > 0) {
            items[0].click();
        }
    }

    detectSystemTheme() {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (!prefersDark) {
            document.documentElement.classList.add('light-theme');
        }

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            document.documentElement.classList.toggle('light-theme', !e.matches);
        });
    }

    escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    debounce(func, wait) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }
}

// 初始化搜索
document.addEventListener('DOMContentLoaded', () => {
    try {
        new BroadcastSearch();
    } catch (error) {
        console.error('Search initialization failed:', error);
    }
});