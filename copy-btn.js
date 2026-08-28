document.addEventListener('DOMContentLoaded', () => {
    // 事件委托处理所有复制按钮
    document.addEventListener('click', async (e) => {
        const copyBtn = e.target.closest('.copy-btn');
        if (!copyBtn) return;

        // 获取要复制的文本（排除按钮自身）
        let text = copyBtn.parentElement.textContent
            .replace(copyBtn.textContent, '')
            .trim();

        // 忽略两个及以上的连续空白字符
        text = text.replace(/\s{2,}/g, ' ');

        // 保存原始图标
        const originalIcon = copyBtn.innerHTML;

        // 显示复制中状态
        copyBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
        `;

        try {
            await navigator.clipboard.writeText(text);
            showCopyFeedback(copyBtn, true);
        } catch (err) {
            try {
                // 降级方案
                const textarea = document.createElement('textarea');
                textarea.value = text;
                textarea.style.position = 'fixed';
                document.body.appendChild(textarea);
                textarea.select();
                const success = document.execCommand('copy');
                document.body.removeChild(textarea);

                showCopyFeedback(copyBtn, success);
            } catch (e) {
                showCopyFeedback(copyBtn, false);
            }
        }
    });

    // 显示复制反馈
    function showCopyFeedback(button, success) {
        // 更新按钮状态
        button.classList.add('copied');
        button.innerHTML = success ?
            `<svg viewBox="0 0 24 24" fill="none" stroke="#64dd8e" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
            </svg>` :
            `<svg viewBox="0 0 24 24" fill="none" stroke="#ff6b6b" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>`;

        // 显示通知
        showToast(success ? '内容已复制' : '复制失败', success);

        // 2秒后恢复原状
        setTimeout(() => {
            button.classList.remove('copied');
            button.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
                </svg>
            `;
        }, 2000);
    }

    // 显示通知
    function showToast(message, success = true) {
        const toast = document.createElement('div');
        toast.className = `copy-toast ${success ? 'success' : 'error'}`;
        toast.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                ${success ?
                '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>' :
                '<path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>'}
            </svg>
            ${message}
        `;
        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
});