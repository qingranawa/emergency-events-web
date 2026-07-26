import { hashPassword, json, readJson, requireAdmin, verifyPassword, hashToken } from '../../lib/auth.js';

const MIN_PASSWORD_LENGTH = 10;
const MAX_PASSWORD_LENGTH = 200;

export async function onRequestGet(context) {
    const auth = await requireAdmin(context, context.request);
    if (auth.response) return auth.response;
    if (!context.env.CONTENT_DB) return json({ error: 'CONTENT_DB binding is not configured' }, 503);

    try {
        const user = await context.env.CONTENT_DB.prepare(
            'SELECT id, username, created_at, updated_at, last_login_at FROM admin_users WHERE id = ? LIMIT 1'
        ).bind(auth.session.id).first();
        if (!user) return json({ error: '管理员账号不存在' }, 404);
        return json({ user });
    } catch (error) {
        console.error('[admin-account] read failed', error);
        return json({ error: '账号信息读取失败' }, 503);
    }
}

export async function onRequestPut(context) {
    const auth = await requireAdmin(context, context.request, { mutating: true });
    if (auth.response) return auth.response;
    if (!context.env.CONTENT_DB) return json({ error: 'CONTENT_DB binding is not configured' }, 503);

    const body = await readJson(context.request);
    const currentPassword = typeof body?.currentPassword === 'string' ? body.currentPassword : '';
    const newPassword = typeof body?.newPassword === 'string' ? body.newPassword : '';
    if (newPassword.length < MIN_PASSWORD_LENGTH || newPassword.length > MAX_PASSWORD_LENGTH) {
        return json({ error: '新密码长度需为 10-200 位' }, 400);
    }
    if (!currentPassword) return json({ error: '请输入当前密码' }, 400);

    try {
        const user = await context.env.CONTENT_DB.prepare(
            'SELECT password_salt, password_hash FROM admin_users WHERE id = ? LIMIT 1'
        ).bind(auth.session.id).first();
        if (!user) return json({ error: '管理员账号不存在' }, 404);
        if (!await verifyPassword(currentPassword, user.password_salt, user.password_hash)) {
            return json({ error: '当前密码错误' }, 401);
        }
        if (newPassword === currentPassword) {
            return json({ error: '新密码不能与当前密码相同' }, 400);
        }

        const { salt, hash } = await hashPassword(newPassword);
        const currentTokenHash = await hashToken(auth.session.rawToken);
        await context.env.CONTENT_DB.batch([
            context.env.CONTENT_DB.prepare(
                'UPDATE admin_users SET password_salt = ?, password_hash = ?, failed_attempts = 0, locked_until = NULL, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
            ).bind(salt, hash, auth.session.id),
            context.env.CONTENT_DB.prepare(
                'DELETE FROM admin_sessions WHERE admin_user_id = ? AND token_hash != ?'
            ).bind(auth.session.id, currentTokenHash),
        ]);

        return json({ message: '密码已更新，其他登录会话已退出' });
    } catch (error) {
        console.error('[admin-account] password update failed', error);
        return json({ error: '密码更新失败' }, 503);
    }
}
