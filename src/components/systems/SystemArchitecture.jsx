const lanes = [
  {
    id: "round-start",
    label: "ROUND START",
    nodes: ["M01 Round Core", "Composition Slots", "M07 Opening Roles"],
    note: "M01 决定开局槽位数量；M07 决定具体身份。",
  },
  {
    id: "mid-round",
    label: "MID-ROUND",
    nodes: ["Vanilla Reinforcement", "M02 Wave Facts", "M03 D-LRC"],
    note: "M02 记录真实增援事实，不接管原版阵营选择与出生。",
  },
  {
    id: "decision",
    label: "DECISION & CONTENT",
    nodes: ["M05 Event Director", "Event Pack"],
    note: "M03、M04 与 M04.5 一起构成 DirectorContext 输入；三者之间不是线性流水线。",
  },
];

export function SystemArchitecture() {
  return <div className="home-system-map" aria-label="Emergency Events 系统架构关系图">
    {lanes.map((lane) => <div className={`home-system-lane ${lane.id}`} key={lane.id}>
      <div className="home-system-lane-label mono">{lane.label}</div>
      <div className="home-system-flow">
    {lane.id === "decision" && <div className="home-system-inputs" aria-label="M05 状态输入">
      {["M03 D-LRC", "M04 Crisis", "M04.5 FDI"].map((node) => <span key={node}>{node}</span>)}
    </div>}
    {lane.id === "decision" && <div className="home-system-merge mono" aria-hidden="true">DirectorContext ↓</div>}
    {lane.nodes.map((node, index) => <div className="home-system-step" key={node}>
          <span>{node}</span>
          {index < lane.nodes.length - 1 && <i aria-hidden="true">→</i>}
        </div>)}
      </div>
      <p>{lane.note}{lane.id === "decision" && " · Production EventDefinitions: 0"}</p>
    </div>)}
    <div className="home-system-lane gameplay">
      <div className="home-system-lane-label mono">GAMEPLAY LAYER</div>
      <div className="home-system-flow">
        <div className="home-system-step"><span>M07 Role Variant</span><i aria-hidden="true">→</i></div>
        <div className="home-system-step"><span>Ability · HUD · Badge</span><i aria-hidden="true">→</i></div>
        <div className="home-system-step"><span>WorldEffect</span></div>
      </div>
      <p>M07 横跨 Round Start 与玩家 Gameplay。M06 O4 只在 M05 已仲裁的有限候选中返回选择。</p>
    </div>
    <div className="home-system-o4 mono"><span>M06 O4 Panel</span><span>···</span><span>M05 Foundation normal SUPPORT shortlist</span><span>selection result → M05</span></div>
  </div>;
}
