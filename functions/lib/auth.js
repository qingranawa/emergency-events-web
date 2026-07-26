const encoder = new TextEncoder();
const SESSION_COOKIE = 'emergency_admin_session';
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;
const PASSWORD_ITERATIONS = 100000;

const toBase64Url = bytes => {
    const view = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
    let binary = '';
    for (const byte of view) binary += String.fromCharCode(byte);
    return btoa(binary)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/g, '');
};

const fromBase64Url = value => {
    const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized + '='.repeat((4 - normalized.length % 4) % 4);
    const binary = atob(padded);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) {
        bytes[index] = binary.charCodeAt(index);
    }
    return bytes.buffer;
};

const randomToken = (bytes = 32) => {
    const value = new Uint8Array(bytes);
    crypto.getRandomValues(value);
    return toBase64Url(value);
};

const digest = async value => toBase64Url(new Uint8Array(await crypto.subtle.digest('SHA-256', encoder.encode(value))));

export const hashPassword = async (password, salt = randomToken(16)) => {
    const key = await crypto.subtle.importKey(
        'raw',
        encoder.encode(password),
        { name: 'PBKDF2' },
        false,
        ['deriveBits']
    );
    const bits = await crypto.subtle.deriveBits(
        { name: 'PBKDF2', salt: fromBase64Url(salt), iterations: PASSWORD_ITERATIONS, hash: 'SHA-256' },
        key,
        256
    );
    return { salt, hash: toBase64Url(new Uint8Array(bits)) };
};

const constantTimeEqual = (left, right) => {
    if (left.length !== right.length) return false;
    let difference = 0;
    for (let index = 0; index < left.length; index += 1) {
        difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
    }
    return difference === 0;
};

export const verifyPassword = async (password, salt, expectedHash) => {
    const actual = await hashPassword(password, salt);
    return constantTimeEqual(actual.hash, expectedHash);
};

const parseCookies = request => {
    const header = request.headers.get('Cookie') || '';
    return Object.fromEntries(header.split(';').map(part => part.trim().split('=')) .filter(parts => parts.length >= 2));
};

const cookie = (value, maxAge, request) => {
    const secure = request ? new URL(request.url).protocol === 'https:' : true;
    return `${SESSION_COOKIE}=${value}; Path=/; HttpOnly;${secure ? ' Secure;' : ''} SameSite=Lax; Max-Age=${maxAge}`;
};

export const json = (body, status = 200, headers = {}) => Response.json(body, {
    status,
    headers: { 'cache-control': 'no-store', ...headers },
});

export const readJson = async request => {
    try {
        const body = await request.json();
        return body && typeof body === 'object' ? body : null;
    } catch {
        return null;
    }
};

export const createSession = async (database, userId) => {
    const rawToken = randomToken();
    const csrfToken = randomToken(24);
    const expiresAt = Date.now() + SESSION_TTL_SECONDS * 1000;
    await database.prepare(
        'INSERT INTO admin_sessions (token_hash, admin_user_id, csrf_token, expires_at) VALUES (?, ?, ?, ?)'
    ).bind(await digest(rawToken), userId, csrfToken, expiresAt).run();
    return { rawToken, csrfToken, expiresAt };
};

export const getSession = async (context, request) => {
    const database = context.env.CONTENT_DB;
    const rawToken = parseCookies(request)[SESSION_COOKIE];
    if (!database || !rawToken) return null;

    const session = await database.prepare(
        `SELECT s.token_hash, s.csrf_token, s.expires_at, u.id, u.username
         FROM admin_sessions s JOIN admin_users u ON u.id = s.admin_user_id
         WHERE s.token_hash = ? AND s.expires_at > ? LIMIT 1`
    ).bind(await digest(rawToken), Date.now()).first();
    return session ? { ...session, rawToken } : null;
};

export const requireAdmin = async (context, request, { mutating = false } = {}) => {
    const session = await getSession(context, request);
    if (!session) return { response: json({ error: '未登录或会话已过期' }, 401) };

    if (mutating) {
        const origin = request.headers.get('Origin');
        if (origin && origin !== new URL(request.url).origin) {
            return { response: json({ error: '非法请求来源' }, 403) };
        }
        const csrf = request.headers.get('X-CSRF-Token') || '';
        if (!constantTimeEqual(csrf, session.csrf_token)) {
            return { response: json({ error: 'CSRF 校验失败' }, 403) };
        }
    }

    return { session };
};

export const sessionCookie = (rawToken, request) => cookie(rawToken, SESSION_TTL_SECONDS, request);
export const expiredSessionCookie = request => cookie('', 0, request);
export const sessionCookieName = SESSION_COOKIE;
export const hashToken = digest;
