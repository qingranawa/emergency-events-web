import {
    createSession,
    json,
    readJson,
    sessionCookie,
    verifyPassword,
} from '../../lib/auth.js';

export async function onRequestPost(context) {
    const database = context.env.CONTENT_DB;
    if (!database) return json({ error: 'CONTENT_DB binding is not configured' }, 503);

    const body = await readJson(context.request);
    const username = typeof body?.username === 'string' ? body.username.trim() : '';
    const password = typeof body?.password === 'string' ? body.password : '';
    if (!username || !password) return json({ error: '请输入管理员账号和密码' }, 400);

    const user = await database.prepare(
        'SELECT id, username, password_salt, password_hash, failed_attempts, locked_until FROM admin_users WHERE username = ? LIMIT 1'
    ).bind(username).first();
    const now = Date.now();
    if (user?.locked_until && user.locked_until > now) {
        return json({ error: '登录失败次数过多，请稍后再试' }, 429, { 'retry-after': String(Math.ceil((user.locked_until - now) / 1000)) });
    }

    let valid = false;
    try {
        valid = user ? await verifyPassword(password, user.password_salt, user.password_hash) : false;
    } catch (error) {
        console.error('[auth-login] password verification failed', error);
        return json({ error: '密码校验失败，请稍后重试' }, 500);
    }
    if (!valid) {
        if (user) {
            const failedAttempts = (user.failed_attempts || 0) + 1;
            const lockedUntil = failedAttempts >= 5 ? now + 10 * 60 * 1000 : null;
            await database.prepare(
                'UPDATE admin_users SET failed_attempts = ?, locked_until = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
            ).bind(failedAttempts, lockedUntil, user.id).run();
        }
        return json({ error: '管理员账号或密码错误' }, 401);
    }

    const session = await createSession(database, user.id);
    await database.batch([
        database.prepare('UPDATE admin_users SET failed_attempts = 0, locked_until = NULL, last_login_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id = ?').bind(user.id),
        database.prepare('DELETE FROM admin_sessions WHERE expires_at <= ?').bind(now),
    ]);

    return json({ user: { id: user.id, username: user.username }, csrfToken: session.csrfToken }, 200, {
        'set-cookie': sessionCookie(session.rawToken, context.request),
    });
}
