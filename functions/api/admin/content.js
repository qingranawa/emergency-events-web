import { ensureEventIds, readContentRow, validateContentDocument } from '../../lib/content.js';
import { json, readJson, requireAdmin } from '../../lib/auth.js';

export async function onRequestGet(context) {
    const auth = await requireAdmin(context, context.request);
    if (auth.response) return auth.response;
    if (!context.env.CONTENT_DB) return json({ error: 'CONTENT_DB binding is not configured' }, 503);

    try {
        const row = await readContentRow(context.env.CONTENT_DB);
        if (!row) return json({ error: 'content document not found' }, 404);
        const document = ensureEventIds(row.document);
        return json({ document, updatedAt: row.updatedAt, user: { id: auth.session.id, username: auth.session.username } });
    } catch (error) {
        console.error('[admin-content] read failed', error);
        return json({ error: '后台内容读取失败' }, 503);
    }
}

export async function onRequestPut(context) {
    const auth = await requireAdmin(context, context.request, { mutating: true });
    if (auth.response) return auth.response;
    if (!context.env.CONTENT_DB) return json({ error: 'CONTENT_DB binding is not configured' }, 503);

    const body = await readJson(context.request);
    const document = ensureEventIds(body?.document);
    const expectedUpdatedAt = typeof body?.expectedUpdatedAt === 'string' ? body.expectedUpdatedAt : '';
    const validationError = validateContentDocument(document);
    if (validationError || !expectedUpdatedAt) return json({ error: validationError || '缺少内容版本号' }, 400);

    try {
        const current = await readContentRow(context.env.CONTENT_DB);
        if (!current) return json({ error: 'content document not found' }, 404);
        if (current.updatedAt !== expectedUpdatedAt) {
            return json({ error: '内容已被其他操作更新，请刷新后重试', updatedAt: current.updatedAt, document: current.document }, 409);
        }

        const updatedAt = new Date().toISOString();
        await context.env.CONTENT_DB.prepare(
            'UPDATE content_documents SET content_json = ?, updated_at = ?, schema_version = ? WHERE document_key = ? AND updated_at = ?'
        ).bind(JSON.stringify(document), updatedAt, document.schema_version || 1, 'emergency-events', expectedUpdatedAt).run();

        const saved = await readContentRow(context.env.CONTENT_DB);
        if (!saved || saved.updatedAt !== updatedAt) return json({ error: '内容保存后校验失败' }, 503);
        return json({ document: saved.document, updatedAt: saved.updatedAt });
    } catch (error) {
        console.error('[admin-content] write failed', error);
        return json({ error: '后台内容保存失败' }, 503);
    }
}
