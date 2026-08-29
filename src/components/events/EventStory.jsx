export function EventStory({ event, reverse }) {
  return <article className={`story-row ${reverse ? "reverse" : ""}`}><div className="story-copy"><div className="system-mark mono">{event.id} / {event.code}</div><h3>{event.title}</h3><p>{event.description}</p><div className="story-status mono">{event.status}</div></div><div className="story-visual" aria-label={`${event.title} 状态示意`}><div className="ghost" /><div className="story-mini">{event.visual.map((line) => <div key={line}>{line}</div>)}</div><div className="bigcode mono">{event.mark}</div></div></article>;
}

