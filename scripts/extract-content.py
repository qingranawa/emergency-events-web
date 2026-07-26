"""Extract the current static page into the D1 seed document."""

from __future__ import annotations

import html
import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "index.html"
POEM = ROOT / "poem.js"
OUTPUT = ROOT / "data" / "content.json"

SECTION_IDS = ["goi-events", "foundation-events", "emergency-events", "containment-breaches"]


def clean_markup(value: str) -> str:
    value = re.sub(r"<button\b[^>]*>.*?</button>", "", value, flags=re.S | re.I)
    value = html.unescape(value)
    value = re.sub(r"<svg\b[^>]*>.*?</svg>", "", value, flags=re.S | re.I)
    return re.sub(r"\s+", " ", value).strip()


def text_from_tag(block: str, tag: str, class_name: str | None = None) -> str:
    class_part = rf"\s+[^>]*class=[\"'][^\"']*\b{re.escape(class_name)}\b[^\"']*[\"']" if class_name else r"(?:\s+[^>]*)?"
    match = re.search(rf"<{tag}{class_part}[^>]*>(.*?)</{tag}>", block, re.S | re.I)
    return clean_markup(match.group(1)) if match else ""


def extract_event_sections(source: str) -> list[dict]:
    sections: list[dict] = []
    for index, section_id in enumerate(SECTION_IDS):
        start_match = re.search(rf'<div id="{re.escape(section_id)}"[^>]*>', source, re.I)
        if not start_match:
            raise ValueError(f"missing section: {section_id}")
        next_start = len(source)
        for next_id in SECTION_IDS[index + 1 :]:
            candidate = re.search(rf'<div id="{re.escape(next_id)}"[^>]*>', source, re.I)
            if candidate:
                next_start = min(next_start, candidate.start())
        block = source[start_match.end() : next_start]
        section = {
            "id": section_id,
            "heading": text_from_tag(block, "h2"),
            "events": [],
        }
        starts = list(re.finditer(r'<div class="event">', block, re.I))
        for event_index, event_start in enumerate(starts):
            event_end = starts[event_index + 1].start() if event_index + 1 < len(starts) else block.rfind("</div>")
            event_block = block[event_start.start() : event_end]
            broadcasts = []
            for broadcast_match in re.finditer(r'<div class="broadcast">(.*?)</div>', event_block, re.S | re.I):
                broadcasts.append(clean_markup(broadcast_match.group(1)))
            section["events"].append(
                {
                    "id": f"{section_id}-{event_index + 1:03d}",
                    "title": text_from_tag(event_block, "h3"),
                    "broadcasts": broadcasts,
                    "task": text_from_tag(event_block, "p", "task"),
                    "summary": text_from_tag(event_block, "p", "summary"),
                }
            )
        sections.append(section)
    return sections


def extract_changelog(source: str) -> dict:
    start = source.index('<div id="changelog"')
    block = source[start : source.index('<div class="poem-container"', start)]
    entries = []
    for item in re.finditer(r'<li\s+class="([^"]+)"[^>]*>(.*?)</li>', block, re.S | re.I):
        classes, item_block = item.groups()
        entries.append(
            {
                "classes": classes.split(),
                "version": text_from_tag(item_block, "span", "version-badge"),
                "text": text_from_tag(item_block, "span", "update-text"),
            }
        )
    return {
        "heading": text_from_tag(block, "h2", "changelog-title"),
        "summary": text_from_tag(block, "span"),
        "entries": entries,
    }


def extract_quotes() -> list[str]:
    source = POEM.read_text(encoding="utf-8")
    block = source.split("const quotes = [", 1)[1].split("];", 1)[0]
    values = []
    for raw in re.findall(r'"((?:\\.|[^"\\])*)"', block):
        values.append(json.loads('"' + raw + '"'))
    return values


def extract_footer(source: str) -> dict:
    footer_start = source.index('<footer>')
    footer = source[footer_start:]
    authors = []
    for card in re.findall(r'<div class="author-card">(.*?)</div>\s*</div>', footer, re.S | re.I):
        image = re.search(r'<img\s+src="([^"]+)"\s+alt="([^"]+)"', card, re.I)
        contact = re.search(r'<a href="mailto:([^"]+)"[^>]*>.*?</a>', card, re.S | re.I)
        authors.append(
            {
                "name": text_from_tag(card, "h4", "author-name"),
                "role": text_from_tag(card, "p", "author-role"),
                "avatar": image.group(1) if image else "",
                "email": contact.group(1) if contact else "",
            }
        )
    thanks_block = re.search(r'<div class="thanks-section">(.*?)</div>\s*</div>\s*</div>', footer, re.S | re.I)
    thanks = thanks_block.group(1) if thanks_block else ""
    copyright_block = re.search(r'<h3 class="section-title">版权信息</h3>(.*?)</div>\s*</div>\s*</div>\s*</footer>', footer, re.S | re.I)
    copyright = copyright_block.group(1) if copyright_block else ""
    return {
        "authors": authors,
        "thanks": [clean_markup(value) for value in re.findall(r'<p>(.*?)</p>', thanks, re.S | re.I)],
        "contributors": [clean_markup(value) for value in re.findall(r'<li>(.*?)</li>', thanks, re.S | re.I)],
        "copyright_paragraphs": [clean_markup(value) for value in re.findall(r'<p class="section-text">(.*?)</p>', copyright, re.S | re.I)],
        "license_text": [clean_markup(value) for value in re.findall(r'<p class="license-text">(.*?)</p>', copyright, re.S | re.I)],
        "wiki_text": clean_markup((re.search(r'<p class="wiki-link">(.*?)</p>', copyright, re.S | re.I) or ["", ""])[1]),
        "links": {
            "cc": "https://creativecommons.org/licenses/by-sa/3.0/",
            "scp_wiki": "https://scp-wiki-cn.wikidot.com/",
            "emblem": "https://commons.wikimedia.org/wiki/File:SCP_Foundation_(emblem).svg",
        },
        "license_icons": [
            {"src": "https://mirrors.creativecommons.org/presskit/icons/cc.svg", "alt": "CC"},
            {"src": "https://mirrors.creativecommons.org/presskit/icons/by.svg", "alt": "BY"},
            {"src": "https://mirrors.creativecommons.org/presskit/icons/sa.svg", "alt": "SA"},
            {"src": "https://scp-wiki-cn.wdfiles.com/local--files/main/scp-logo-en.png", "alt": "SCP"},
        ],
    }


def main() -> None:
    source = INDEX.read_text(encoding="utf-8")
    if '<div id="goi-events"' not in source:
        if not OUTPUT.exists():
            raise ValueError("index.html no longer contains legacy content and data/content.json is missing")
        document = json.loads(OUTPUT.read_text(encoding="utf-8"))
        for section in document["event_sections"]:
            for event_index, event in enumerate(section["events"]):
                event.setdefault("id", f"{section['id']}-{event_index + 1:03d}")
        OUTPUT.write_text(json.dumps(document, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        if len(document["event_sections"]) != 4 or sum(len(section["events"]) for section in document["event_sections"]) != 29:
            raise ValueError("existing content document event count mismatch")
        if len(document["changelog"]["entries"]) != 60 or len(document["quotes"]) != 190:
            raise ValueError("existing content document count mismatch")
        print(json.dumps({"output": str(OUTPUT), "source": "existing-data", "sections": 4, "events": 29, "changelog": 60, "quotes": 190}, ensure_ascii=False))
        return
    event_sections = extract_event_sections(source)
    changelog = extract_changelog(source)
    document = {
        "schema_version": 1,
        "document_key": "emergency-events",
        "metadata": {
            "title": "紧急事件",
            "description": "紧急事件娱乐模式 - SCP: Secret Laboratory 事件列表",
            "author": "清然",
        },
        "navigation": {
            "brand": "Emergencies",
            "subbrand": "EVENT ARCHIVE",
            "items": [
                {"id": "hero", "label": "首页"},
                *[{"id": section["id"], "label": section["heading"]} for section in event_sections],
                {"id": "changelog", "label": changelog["heading"]},
            ],
        },
        "hero": {
            "title": re.search(r'<h1 class="main-title">(.*?)</h1>', source, re.S).group(1).strip(),
            "subtitle": re.search(r'<p class="hero-subtitle">(.*?)</p>', source, re.S).group(1).strip(),
        },
        "intro": [
            {
                "id": "notice",
                "heading": "注意事项 Attention",
                "paragraphs": [],
                "items": ["游戏开始时需公布娱乐模式规则。", "关闭轻收容净化程序。"],
            },
            {
                "id": "evacuation",
                "heading": "撤离协议 Evacuation protocols",
                "paragraphs": ["开启撤离协议时，以下阵营可在逃生点撤离：", "注意：GOC无法撤离，开启核弹爆炸时将变为观察者。"],
                "items": ["基金会阵营", "混沌分裂者阵营", "SCP阵营", "蛇之手阵营", "格鲁乌P阵营"],
            },
        ],
        "event_sections": event_sections,
        "changelog": changelog,
        "quotes": extract_quotes(),
        "footer": extract_footer(source),
    }
    if len(event_sections) != 4 or sum(len(section["events"]) for section in event_sections) != 29:
        raise ValueError("event extraction count mismatch")
    if len(changelog["entries"]) != 60:
        raise ValueError("changelog extraction count mismatch")
    if len(document["quotes"]) != 190:
        raise ValueError(f"quote extraction count mismatch: {len(document['quotes'])}")
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(document, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"output": str(OUTPUT), "sections": 4, "events": 29, "changelog": 60, "quotes": 190}, ensure_ascii=False))


if __name__ == "__main__":
    main()
