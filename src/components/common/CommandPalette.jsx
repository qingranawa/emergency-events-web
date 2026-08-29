import { useEffect, useState } from "react";

export function CommandPalette({ open, onClose, items = [] }) {
  const [query, setQuery] = useState("");
  useEffect(() => { if (!open) return undefined; const onKeyDown = (event) => { if (event.key === "Escape") onClose(); }; window.addEventListener("keydown", onKeyDown); return () => window.removeEventListener("keydown", onKeyDown); }, [open, onClose]);
  if (!open) return null;
  const filtered = items.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));
  return <div className="overlay" role="dialog" aria-modal="true" aria-label="搜索系统内容" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><div className="palette"><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索系统内容…" aria-label="搜索" />{filtered.map((item) => <a key={item.label} href={item.href} onClick={onClose}>{item.label}<span className="mono">{item.meta}</span></a>)}</div></div>;
}

