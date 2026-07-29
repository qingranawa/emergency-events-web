(() => {
    'use strict';

    const state = { document: null, updatedAt: '', csrfToken: '', selectedSectionId: '', selectedEventId: '', dirty: false };
    const $ = selector => document.querySelector(selector);

    const setMessage = (element, message = '', isError = false) => {
        element.textContent = message;
        element.classList.toggle('is-error', isError);
    };

    const formatDate = value => value ? new Date(value).toLocaleString('zh-CN', { dateStyle: 'medium', timeStyle: 'short' }) : '—';

    const request = async (path, options = {}) => {
        const headers = { Accept: 'application/json', ...(options.body ? { 'content-type': 'application/json' } : {}), ...(options.headers || {}) };
        if (state.csrfToken && options.method && options.method !== 'GET') headers['X-CSRF-Token'] = state.csrfToken;
        const response = await fetch(path, { ...options, headers, credentials: 'include' });
        let data = null;
        try { data = await response.json(); } catch { /* empty response */ }
        return { response, data, ok: response.ok };
    };

    const showDashboard = visible => {
        $('#login-panel').hidden = visible;
        $('#dashboard-panel').hidden = !visible;
    };

    const activeSection = () => state.document?.event_sections.find(section => section.id === state.selectedSectionId);
    const activeEvent = () => activeSection()?.events.find(event => event.id === state.selectedEventId);

    const setDirty = dirty => {
        state.dirty = dirty;
        $('#save-button').disabled = !dirty;
        $('#save-message').textContent = dirty ? '有未保存的修改' : '';
    };

    const renderSidebar = () => {
        const list = $('#section-list');
        list.replaceChildren();
        let eventCount = 0;
        state.document.event_sections.forEach(section => {
            eventCount += section.events.length;
            const sectionButton = document.createElement('button');
            sectionButton.type = 'button';
            sectionButton.className = `section-button${section.id === state.selectedSectionId ? ' is-active' : ''}`;
            sectionButton.textContent = section.heading;
            sectionButton.addEventListener('click', () => selectSection(section.id));
            list.append(sectionButton);

            if (section.id === state.selectedSectionId) {
                const events = document.createElement('div');
                events.className = 'event-list';
                section.events.forEach(event => {
                    const eventButton = document.createElement('button');
                    eventButton.type = 'button';
                    eventButton.className = `event-button${event.id === state.selectedEventId ? ' is-active' : ''}`;
                    eventButton.textContent = event.title || '未命名事件';
                    eventButton.addEventListener('click', () => selectEvent(event.id));
                    events.append(eventButton);
                });
                list.append(events);
            }
        });
        $('#event-count').textContent = `${eventCount} 个事件`;
    };

    const renderBroadcasts = event => {
        const list = $('#broadcast-list');
        list.replaceChildren();
        event.broadcasts.forEach((broadcast, index) => {
            const row = document.createElement('div');
            row.className = 'broadcast-row';
            const textarea = document.createElement('textarea');
            textarea.className = 'broadcast-input';
            textarea.rows = 7;
            textarea.maxLength = 20000;
            textarea.value = broadcast;
            textarea.setAttribute('aria-label', `广播 ${index + 1}`);
            const remove = document.createElement('button');
            remove.type = 'button';
            remove.className = 'danger-button';
            remove.textContent = '删除';
            remove.addEventListener('click', () => {
                if (document.querySelectorAll('.broadcast-input').length <= 1) return;
                row.remove();
                setDirty(true);
            });
            row.append(textarea, remove);
            list.append(row);
        });
    };

    const renderEditor = () => {
        const section = activeSection();
        const event = activeEvent();
        const editor = $('#event-editor');
        const empty = $('#empty-editor');
        $('#section-select').replaceChildren();
        state.document.event_sections.forEach(item => {
            const option = document.createElement('option');
            option.value = item.id;
            option.textContent = item.heading;
            option.selected = item.id === state.selectedSectionId;
            $('#section-select').append(option);
        });
        $('#event-select').replaceChildren();
        section?.events.forEach(item => {
            const option = document.createElement('option');
            option.value = item.id;
            option.textContent = item.title || '未命名事件';
            option.selected = item.id === state.selectedEventId;
            $('#event-select').append(option);
        });

        if (!event) {
            editor.hidden = true;
            empty.hidden = false;
            $('#editor-heading').textContent = '选择一个事件';
            return;
        }
        editor.hidden = false;
        empty.hidden = true;
        $('#editor-heading').textContent = event.title || '编辑事件';
        $('#event-title').value = event.title || '';
        $('#event-task').value = event.task || '';
        $('#event-summary').value = event.summary || '';
        renderBroadcasts(event);
    };

    const renderAll = () => {
        renderSidebar();
        renderEditor();
    };

    const renderAdminList = users => {
        const list = $('#admin-list');
        list.replaceChildren();
        $('#admin-list-count').textContent = `${users.length} 个账号`;
        users.forEach(user => {
            const item = document.createElement('li');
            const name = document.createElement('strong');
            name.textContent = user.username;
            const meta = document.createElement('span');
            meta.textContent = `创建于 ${formatDate(user.created_at)}`;
            item.append(name, meta);
            list.append(item);
        });
    };

    const loadAccount = async () => {
        const [accountResult, usersResult] = await Promise.all([
            request('/api/admin/account/'),
            request('/api/admin/users/'),
        ]);
        if (!accountResult.ok || !usersResult.ok) {
            if (accountResult.response.status === 401 || usersResult.response.status === 401) {
                showLogin('登录已过期，请重新登录');
                return;
            }
            setMessage($('#admin-create-message'), accountResult.data?.error || usersResult.data?.error || '账号信息加载失败', true);
            return;
        }
        const user = accountResult.data.user;
        $('#account-username').textContent = user.username;
        $('#account-created-at').textContent = formatDate(user.created_at);
        $('#account-last-login').textContent = formatDate(user.last_login_at);
        renderAdminList(usersResult.data.users || []);
    };

    const activateTab = tabId => {
        document.querySelectorAll('.admin-tab').forEach(tab => {
            const active = tab.dataset.tab === tabId;
            tab.classList.toggle('is-active', active);
            tab.setAttribute('aria-selected', String(active));
        });
        document.querySelectorAll('.admin-tab-panel').forEach(panel => {
            panel.hidden = panel.id !== tabId;
        });
        if (tabId === 'account-tab') loadAccount();
    };

    const selectSection = sectionId => {
        if (state.dirty && !window.confirm('当前有未保存的修改，确定切换吗？')) return;
        state.selectedSectionId = sectionId;
        state.selectedEventId = activeSection()?.events[0]?.id || null;
        setDirty(false);
        renderAll();
    };

    const selectEvent = eventId => {
        if (state.dirty && !window.confirm('当前有未保存的修改，确定切换吗？')) return;
        const section = activeSection();
        state.selectedEventId = section?.events.some(event => event.id === eventId) ? eventId : null;
        setDirty(false);
        renderAll();
    };

    const readEditor = () => {
        const event = activeEvent();
        if (!event) return;
        event.title = $('#event-title').value.trim();
        event.broadcasts = [...document.querySelectorAll('.broadcast-input')].map(input => input.value);
        event.task = $('#event-task').value;
        event.summary = $('#event-summary').value;
    };

    const save = async () => {
        readEditor();
        const button = $('#save-button');
        button.disabled = true;
        setMessage($('#save-message'), '正在保存…');
        const result = await request('/api/admin/content/', {
            method: 'PUT',
            body: JSON.stringify({ document: state.document, expectedUpdatedAt: state.updatedAt }),
        });
        if (!result.ok) {
            if (result.response.status === 401) return showLogin('登录已过期，请重新登录');
            if (result.response.status === 409 && result.data?.document) {
                state.document = result.data.document;
                state.updatedAt = result.data.updatedAt;
                setDirty(false);
                renderAll();
            }
            setMessage($('#save-message'), result.data?.error || '保存失败', true);
            button.disabled = !state.dirty;
            return;
        }
        state.document = result.data.document;
        state.updatedAt = result.data.updatedAt;
        setDirty(false);
        renderAll();
        setMessage($('#save-message'), '已保存到 D1');
    };

    const addEvent = () => {
        const section = activeSection() || state.document.event_sections[0];
        if (!section) return;
        state.selectedSectionId = section.id;
        const event = { id: `${section.id}-${crypto.randomUUID()}`, title: '新事件', broadcasts: [''], task: '', summary: '' };
        section.events.push(event);
        state.selectedEventId = event.id;
        setDirty(true);
        renderAll();
    };

    const deleteEvent = () => {
        const section = activeSection();
        if (!section || !activeEvent()) return;
        if (!window.confirm('确定删除当前事件吗？保存后无法从后台撤销。')) return;
        section.events = section.events.filter(event => event.id !== state.selectedEventId);
        state.selectedEventId = section.events[0]?.id || null;
        setDirty(true);
        renderAll();
    };

    const showLogin = message => {
        state.csrfToken = '';
        showDashboard(false);
        setMessage($('#login-message'), message, Boolean(message));
    };

    const updatePassword = async event => {
        event.preventDefault();
        const currentPassword = $('#current-password').value;
        const newPassword = $('#new-password').value;
        const confirmPassword = $('#confirm-password').value;
        if (newPassword !== confirmPassword) {
            setMessage($('#password-message'), '两次输入的新密码不一致', true);
            return;
        }
        const button = event.target.querySelector('button[type="submit"]');
        button.disabled = true;
        setMessage($('#password-message'), '正在更新…');
        const result = await request('/api/admin/account/', {
            method: 'PUT',
            body: JSON.stringify({ currentPassword, newPassword }),
        });
        button.disabled = false;
        if (!result.ok) {
            if (result.response.status === 401) return setMessage($('#password-message'), result.data?.error || '当前密码错误', true);
            return setMessage($('#password-message'), result.data?.error || '密码更新失败', true);
        }
        $('#password-form').reset();
        setMessage($('#password-message'), result.data?.message || '密码已更新');
    };

    const createAdmin = async event => {
        event.preventDefault();
        const button = event.target.querySelector('button[type="submit"]');
        button.disabled = true;
        setMessage($('#admin-create-message'), '正在创建…');
        const result = await request('/api/admin/users/', {
            method: 'POST',
            body: JSON.stringify({ username: $('#new-admin-username').value.trim(), password: $('#new-admin-password').value }),
        });
        button.disabled = false;
        if (!result.ok) {
            if (result.response.status === 401) return showLogin('登录已过期，请重新登录');
            return setMessage($('#admin-create-message'), result.data?.error || '管理员账号创建失败', true);
        }
        $('#admin-create-form').reset();
        setMessage($('#admin-create-message'), '管理员账号已创建');
        await loadAccount();
    };

    const loadContent = async () => {
        const result = await request('/api/admin/content/');
        if (!result.ok) return showLogin(result.data?.error || '无法加载后台内容');
        state.document = result.data.document;
        state.updatedAt = result.data.updatedAt;
        state.selectedSectionId = state.document.event_sections[0]?.id || '';
        state.selectedEventId = state.document.event_sections[0]?.events[0]?.id || null;
        $('#admin-user').textContent = `已登录：${result.data.user.username}`;
        setDirty(false);
        showDashboard(true);
        activateTab('content-tab');
        renderAll();
    };

    const login = async event => {
        event.preventDefault();
        setMessage($('#login-message'), '正在验证…');
        const result = await request('/api/auth/login/', {
            method: 'POST',
            body: JSON.stringify({ username: $('#login-username').value, password: $('#login-password').value }),
        });
        if (!result.ok) return setMessage($('#login-message'), result.data?.error || '登录失败', true);
        state.csrfToken = result.data.csrfToken;
        $('#login-password').value = '';
        await loadContent();
    };

    document.addEventListener('DOMContentLoaded', async () => {
        $('#login-form').addEventListener('submit', login);
        document.querySelectorAll('.admin-tab').forEach(tab => tab.addEventListener('click', () => activateTab(tab.dataset.tab)));
        $('#password-form').addEventListener('submit', updatePassword);
        $('#admin-create-form').addEventListener('submit', createAdmin);
        $('#section-select').addEventListener('change', event => selectSection(event.target.value));
        $('#event-select').addEventListener('change', event => selectEvent(event.target.value));
        $('#event-editor').addEventListener('input', () => setDirty(true));
        $('#save-button').addEventListener('click', save);
        $('#new-event-button').addEventListener('click', addEvent);
        $('#delete-event-button').addEventListener('click', deleteEvent);
        $('#add-broadcast-button').addEventListener('click', () => {
            const list = $('#broadcast-list');
            const event = activeEvent();
            if (!event) return;
            event.broadcasts.push('');
            renderBroadcasts(event);
            setDirty(true);
        });
        $('#logout-button').addEventListener('click', async () => {
            await request('/api/auth/logout/', { method: 'POST' });
            showLogin('已退出登录');
        });

        const session = await request('/api/auth/session/');
        if (session.ok) {
            state.csrfToken = session.data.csrfToken;
            await loadContent();
        } else {
            showLogin();
        }
    });
})();
