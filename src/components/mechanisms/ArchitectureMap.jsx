import { useState } from "react";

const relations = {
  m01: ["round-start", "m01", "slots", "m07", "roles", "abilities", "hud", "badge", "world-effects"],
  m02: ["m02", "wave-facts", "m03", "m04", "fdi", "m05", "event-pack"],
  m03: ["wave-facts", "m03", "m04", "fdi", "m05", "event-pack"],
  m04: ["m03", "m04", "m05"],
  fdi: ["m03", "fdi", "m05"],
  m05: ["m03", "m04", "fdi", "m05", "m06", "event-pack"],
  m06: ["m05", "m06"],
  m07: ["m01", "slots", "m07", "roles", "abilities", "hud", "badge", "world-effects", "cleanse"],
  "event-pack": ["m03", "m04", "fdi", "m05", "event-pack"],
};

function MapNode({ id, module, title, detail, focusId, setFocusId }) {
  const related = focusId ? relations[focusId] || [] : [];
  const dimmed = Boolean(focusId && !related.includes(id));
  const className = "system-map-node " + (module ? "is-module " : "") + (dimmed ? "is-dimmed" : "");
  const content = <>
    {module && <span className="system-map-code mono">{module}</span>}
    <strong>{title}</strong>
    {detail && <small>{detail}</small>}
  </>;

  if (!module) {
    return <div className={className} data-map-node={id}>{content}</div>;
  }

  const target = {
    M01: "#round-core",
    M02: "#reinforcement",
    M03: "#dlrc",
    M04: "#crisis",
    "M04.5": "#fdi",
    M05: "#director",
    M06: "#o4",
    M07: "#m07",
  }[module];

  return <a
    className={className}
    data-map-node={id}
    href={target}
    onMouseEnter={() => setFocusId(id)}
    onMouseLeave={() => setFocusId(null)}
    onFocus={() => setFocusId(id)}
    onBlur={() => setFocusId(null)}
  >{content}</a>;
}

function MapEdge({ from, to, label, focusId }) {
  const related = focusId ? relations[focusId] || [] : [];
  const highlighted = !focusId || (related.includes(from) && related.includes(to));
  const className = "system-map-edge " + (highlighted ? "is-related" : "is-dimmed");
  return <div className={className} aria-label={label}>
    <span aria-hidden="true">→</span>
    <small>{label}</small>
  </div>;
}

export function ArchitectureMap() {
  const [focusId, setFocusId] = useState(null);
  return <div className="system-map" aria-label="Emergency Events 系统数据流">
    <div className="system-map-legend mono">
      <span>ROUND START</span>
      <span>MID-ROUND</span>
      <span>PLAYER GAMEPLAY</span>
    </div>

    <div className="system-map-lane">
      <div className="system-map-lane-label mono">ROUND START</div>
      <div className="system-map-flow">
        <MapNode id="m01" module="M01" title="Round Core" detail="RoundId · tier · slot quantities" focusId={focusId} setFocusId={setFocusId} />
        <MapEdge from="m01" to="slots" label="defines quantities" focusId={focusId} />
        <MapNode id="slots" title="Composition Slots" detail="D-Class · Scientist · Security · SCP" focusId={focusId} setFocusId={setFocusId} />
        <MapEdge from="slots" to="m07" label="opening assignments" focusId={focusId} />
        <MapNode id="m07" module="M07" title="Opening Role & Ability" detail="Concrete opening identities" focusId={focusId} setFocusId={setFocusId} />
      </div>
    </div>

    <div className="system-map-lane">
      <div className="system-map-lane-label mono">MID-ROUND</div>
      <div className="system-map-flow">
        <MapNode id="m02" module="M02" title="Reinforcement" detail="Vanilla Primary Wave facts" focusId={focusId} setFocusId={setFocusId} />
        <MapEdge from="m02" to="wave-facts" label="records actual wave" focusId={focusId} />
        <MapNode id="wave-facts" title="Major Wave Facts" detail="Faction · players · count · time" focusId={focusId} setFocusId={setFocusId} />
        <MapEdge from="wave-facts" to="m03" label="evaluation input" focusId={focusId} />
        <MapNode id="m03" module="M03" title="D-LRC" detail="Response level + DLRC Code" focusId={focusId} setFocusId={setFocusId} />
      </div>
    </div>

    <div className="system-map-lane">
      <div className="system-map-lane-label mono">STATE → DECISION</div>
      <div className="system-map-state-inputs">
        <MapNode id="m03" module="M03" title="D-LRC" detail="Valid evaluation" focusId={focusId} setFocusId={setFocusId} />
        <MapNode id="m04" module="M04" title="Crisis" detail="Tags + Episodes" focusId={focusId} setFocusId={setFocusId} />
        <MapNode id="fdi" module="M04.5" title="Facility Disorder" detail="Historical state · 0–100" focusId={focusId} setFocusId={setFocusId} />
      </div>
      <div className="system-map-context-edge mono">same-round facts → DirectorContext</div>
      <div className="system-map-flow system-map-decision">
        <MapNode id="m05" module="M05" title="Event Director" detail="Eligibility · arbitration · revalidate · commit" focusId={focusId} setFocusId={setFocusId} />
        <MapEdge from="m05" to="event-pack" label="committed plan" focusId={focusId} />
        <MapNode id="event-pack" title="Event Pack" detail="Gameplay execution and cleanup" focusId={focusId} setFocusId={setFocusId} />
      </div>
      <div className="system-map-o4">
        <MapNode id="m06" module="M06" title="O4 selection boundary" detail="Finite Foundation shortlist from M05" focusId={focusId} setFocusId={setFocusId} />
        <span className="mono">M06 returns a selection result to M05</span>
      </div>
    </div>

    <div className="system-map-lane system-map-gameplay">
      <div className="system-map-lane-label mono">PLAYER GAMEPLAY</div>
      <div className="system-map-flow">
        <MapNode id="m07" module="M07" title="Gameplay Layer" detail="Opening identity + in-round abilities" focusId={focusId} setFocusId={setFocusId} />
        <MapEdge from="m07" to="roles" label="runtime services" focusId={focusId} />
        <div className="system-map-output-group">
          {[
            ["roles", "Role Variant"],
            ["abilities", "Ability"],
            ["hud", "Shared HUD"],
            ["badge", "Badge"],
            ["world-effects", "WorldEffect"],
          ].map(([id, label]) => <span className="system-map-output" data-map-node={id} key={id}>{label}</span>)}
        </div>
      </div>
      <div className="system-map-cleanse">
        <span className="system-map-cleanse-origin">M07 WorldEffect</span>
        <span aria-hidden="true">→</span>
        <span>future BIO / explicitly allowed Event</span>
        <span aria-hidden="true">→</span>
        <strong id="cleanse">IWorldEffectService.TryCleanse(...)</strong>
      </div>
    </div>
    <p className="system-map-note">M01 owns opening slot quantities. M07 assigns concrete Round Start identities. M02 handles mid-round reinforcement.</p>
  </div>;
}
