export const DOCUMENT_KEY = 'emergency-events';

export async function readContentRow(database) {
    const row = await database.prepare(
        'SELECT content_json, updated_at FROM content_documents WHERE document_key = ? LIMIT 1'
    ).bind(DOCUMENT_KEY).first();
    if (!row?.content_json) return null;
    return { document: JSON.parse(row.content_json), updatedAt: row.updated_at };
}

const isText = (value, maxLength) => typeof value === 'string' && value.length <= maxLength;

export function ensureEventIds(document) {
    if (!document || !Array.isArray(document.event_sections)) return document;
    document.event_sections.forEach(section => {
        section.events.forEach((event, index) => {
            if (!isText(event.id, 100) || !event.id) event.id = `${section.id}-${String(index + 1).padStart(3, '0')}-${crypto.randomUUID()}`;
        });
    });
    return document;
}

export function validateContentDocument(document) {
    if (!document || document.document_key !== DOCUMENT_KEY || !Array.isArray(document.event_sections)) {
        return '内容文档格式不正确';
    }
    if (document.event_sections.length > 20) return '事件分区数量超出限制';
    for (const section of document.event_sections) {
        if (!isText(section.id, 100) || !/^[a-z0-9-]+$/.test(section.id) || !isText(section.heading, 200)) return '事件分区格式不正确';
        if (!Array.isArray(section.events) || section.events.length > 500) return '事件数量超出限制';
        for (const event of section.events) {
            if (!isText(event.id, 100) || !isText(event.title, 300)) return '事件标题格式不正确';
            if (!Array.isArray(event.broadcasts) || event.broadcasts.length > 20) return '广播数量超出限制';
            if (event.broadcasts.some(broadcast => !isText(broadcast, 20000))) return '广播内容超出限制';
            if (!isText(event.task || '', 5000) || !isText(event.summary || '', 10000)) return '任务或概要格式不正确';
        }
    }
    if (!document.changelog || !Array.isArray(document.changelog.entries)) return '更新日志格式不正确';
    if (document.changelog.entries.length > 500) return '更新日志数量超出限制';
    for (const entry of document.changelog.entries) {
        if (!isText(entry.version, 200) || !isText(entry.text, 10000) || !Array.isArray(entry.classes)) return '更新日志条目格式不正确';
    }
    return null;
}
