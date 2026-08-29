import { EventStory } from "./EventStory";

export function EventStories({ events }) { return <div className="story-stack">{events.map((event, index) => <EventStory key={event.id} event={event} reverse={index % 2 === 1} />)}</div>; }

