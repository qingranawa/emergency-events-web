import { getSession, json } from '../../lib/auth.js';

export async function onRequestGet(context) {
    const session = await getSession(context, context.request);
    if (!session) return json({ error: '未登录或会话已过期' }, 401);
    return json({
        user: { id: session.id, username: session.username },
        csrfToken: session.csrf_token,
        expiresAt: session.expires_at,
    });
}
