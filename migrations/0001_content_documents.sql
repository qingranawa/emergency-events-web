CREATE TABLE IF NOT EXISTS content_documents (
    document_key TEXT PRIMARY KEY,
    schema_version INTEGER NOT NULL,
    content_json TEXT NOT NULL CHECK (json_valid(content_json)),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_content_documents_updated_at
    ON content_documents (updated_at);
