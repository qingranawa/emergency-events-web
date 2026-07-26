import { hashPassword, json, readJson, requireAdmin } from '../../lib/auth.js';

const USERNAME_PATTERN = /^[a-zA-Z0-9_.-]{3,80}$/;
const MIN_PASSWORD_LENGTH = 10;
const MAX_PASSWORD_LENGTH = 200;

const validateCredentials = (username, password) => {
    if (!USERNAME_PATTERN.test(username)) return '账号需使用 3-80 位字母、数字、下划线、点或短横线';
    if (password.length < MIN_PASSWORD_LENGTH || password.length > MAX_PASSWORD_LENGTH) return '密码长度需为 10-200 位';
    return '';
};

export async function onRequestGet(context) {
    const auth = await requireAdmin(context, context.request);
    if (auth.response) return auth.response;
    if (!context.env.CONTENT_DB) return json({ error: 'CONTENT_DB binding is not configured' }, 503);

    try {
        const result = await context.env.CONTENT_DB.prepare(
            'SELECT id, username, created_at, updated_at, last_login_at FROM admin_users ORDER BY id ASC'
        ).all();
        return json({ users: result.results || [] });
    } catch (error) {
        console.error('[admin-users] list failed', error);
        return json({ error: '管理员列表读取失败' }, 503);
    }
}

export async function onRequestPost(context) {
    const auth = await requireAdmin(context, context.request, { mutating: true });
    if (auth.response) return auth.response;
    if (!context.env.CONTENT_DB) return json({ error: 'CONTENT_DB binding is not configured' }, 503);

    const body = await readJson(context.request);
    const username = typeof body?.username === 'string' ? body.username.trim() : '';
    const password = typeof body?.password === 'string' ? body.password : '';
    const validationError = validateCredentials(username, password);
    if (validationError) return json({ error: validationError }, 400);

    try {
        const existing = await context.env.CONTENT_DB.prepare(
            'SELECT id FROM admin_users WHERE username = ? LIMIT 1'
        ).bind(username).first();
        if (existing) return json({ error: '该管理员账号已存在' }, 409);

        const { salt, hash } = await hashPassword(password);
        const result = await context.env.CONTENT_DB.prepare(
            'INSERT INTO admin_users (username, password_salt, password_hash, failed_attempts, locked_until) VALUES (?, ?, ?, 0, NULL)'
        ).bind(username, salt, hash).run();
        return json({ user: { id: result.meta?.last_row_id, username } }, 201);
    } catch (error) {
        console.error('[admin-users] create failed', error);
        return json({ error: '管理员账号创建失败' }, 503);
    }
}
