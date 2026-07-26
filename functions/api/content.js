import { readContentRow } from '../lib/content.js';

export async function onRequestGet(context) {
    const database = context.env.CONTENT_DB;
    if (!database) {
        return Response.json({ error: 'CONTENT_DB binding is not configured' }, { status: 503 });
    }

    try {
        const row = await readContentRow(database);
        if (!row) {
            return Response.json({ error: 'content document not found' }, { status: 404 });
        }
        return new Response(JSON.stringify(row.document), {
            headers: {
                'content-type': 'application/json; charset=utf-8',
                'cache-control': 'public, max-age=60, s-maxage=300',
                'x-content-source': 'cloudflare-d1',
            },
        });
    } catch (error) {
        console.error('[content-api] D1 read failed', error);
        return Response.json({ error: 'content service unavailable' }, { status: 503 });
    }
}
