import { expiredSessionCookie, getSession, hashToken, json } from '../../lib/auth.js';

export async function onRequestPost(context) {
    const session = await getSession(context, context.request);
    if (session && context.env.CONTENT_DB) {
        await context.env.CONTENT_DB.prepare('DELETE FROM admin_sessions WHERE token_hash = ?')
            .bind(await hashToken(session.rawToken)).run();
    }
    return json({ ok: true }, 200, { 'set-cookie': expiredSessionCookie(context.request) });
}
