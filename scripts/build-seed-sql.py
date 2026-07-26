"""Build an idempotent D1 seed statement from data/content.json."""

from __future__ import annotations

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / "data" / "content.json"
OUTPUT = ROOT / "migrations" / "0002_seed_content.sql"


def sql_quote(value: str) -> str:
    return "'" + value.replace("'", "''") + "'"


def main() -> None:
    payload = json.loads(CONTENT.read_text(encoding="utf-8"))
    serialized = json.dumps(payload, ensure_ascii=False, separators=(",", ":"))
    statement = """INSERT INTO content_documents (document_key, schema_version, content_json, updated_at)
VALUES ({key}, {version}, {content}, CURRENT_TIMESTAMP)
ON CONFLICT(document_key) DO UPDATE SET
    schema_version = excluded.schema_version,
    content_json = excluded.content_json,
    updated_at = CURRENT_TIMESTAMP;
""".format(
        key=sql_quote(payload["document_key"]),
        version=int(payload["schema_version"]),
        content=sql_quote(serialized),
    )
    OUTPUT.write_text(statement, encoding="utf-8")
    print(json.dumps({"output": str(OUTPUT), "bytes": len(statement.encode("utf-8"))}, ensure_ascii=False))


if __name__ == "__main__":
    main()
