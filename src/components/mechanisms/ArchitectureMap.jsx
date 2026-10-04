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
      <span>回合开始</span>
      <span>局中运行</span>
      <span>玩家游戏内能力</span>
    </div>

    <div className="system-map-lane">
      <div className="system-map-lane-label mono">回合开始</div>
      <div className="system-map-flow">
        <MapNode id="m01" module="M01" title="Round Core" detail="回合编号 · 人数档位 · 开局名额" focusId={focusId} setFocusId={setFocusId} />
        <MapEdge from="m01" to="slots" label="确定开局名额" focusId={focusId} />
        <MapNode id="slots" title="开局角色槽位" detail="D 级人员 · 科学家 · 安保 · SCP" focusId={focusId} setFocusId={setFocusId} />
        <MapEdge from="slots" to="m07" label="分配开局身份" focusId={focusId} />
        <MapNode id="m07" module="M07" title="Opening Role & Ability" detail="具体的开局身份" focusId={focusId} setFocusId={setFocusId} />
      </div>
    </div>

    <div className="system-map-lane">
      <div className="system-map-lane-label mono">局中增援</div>
      <div className="system-map-flow">
        <MapNode id="m02" module="M02" title="Reinforcement" detail="原版主要增援波次事实" focusId={focusId} setFocusId={setFocusId} />
        <MapEdge from="m02" to="wave-facts" label="记录实际波次" focusId={focusId} />
        <MapNode id="wave-facts" title="主要增援事实" detail="阵营 · 玩家 · 人数 · 时间" focusId={focusId} setFocusId={setFocusId} />
        <MapEdge from="wave-facts" to="m03" label="评估输入" focusId={focusId} />
        <MapNode id="m03" module="M03" title="D-LRC" detail="响应等级 + D-LRC 代码" focusId={focusId} setFocusId={setFocusId} />
      </div>
    </div>

    <div className="system-map-lane">
      <div className="system-map-lane-label mono">局势判断 → 事件决策</div>
      <div className="system-map-state-inputs">
        <MapNode id="m03" module="M03" title="D-LRC" detail="有效的局势评估" focusId={focusId} setFocusId={setFocusId} />
        <MapNode id="m04" module="M04" title="Crisis" detail="危机标签 + 事件周期" focusId={focusId} setFocusId={setFocusId} />
        <MapNode id="fdi" module="M04.5" title="Facility Disorder" detail="设施混乱历史值 · 0–100" focusId={focusId} setFocusId={setFocusId} />
      </div>
      <div className="system-map-context-edge mono">同一回合事实 → DirectorContext</div>
      <div className="system-map-flow system-map-decision">
        <MapNode id="m05" module="M05" title="Event Director" detail="资格筛选 · 来源仲裁 · 再验证 · 提交" focusId={focusId} setFocusId={setFocusId} />
        <MapEdge from="m05" to="event-pack" label="提交的事件计划" focusId={focusId} />
        <MapNode id="event-pack" title="Event Pack" detail="事件玩法执行与清理" focusId={focusId} setFocusId={setFocusId} />
      </div>
      <div className="system-map-o4">
        <MapNode id="m06" module="M06" title="O4 选择边界" detail="M05 提供的有限基金会候选" focusId={focusId} setFocusId={setFocusId} />
        <span className="mono">M06 将选择结果返回给 M05</span>
      </div>
    </div>

    <div className="system-map-lane system-map-gameplay">
      <div className="system-map-lane-label mono">玩家游戏内能力</div>
      <div className="system-map-flow">
        <MapNode id="m07" module="M07" title="Gameplay Layer" detail="开局身份 + 局内技能" focusId={focusId} setFocusId={setFocusId} />
        <MapEdge from="m07" to="roles" label="场内能力服务" focusId={focusId} />
        <div className="system-map-output-group">
          {[
            ["roles", "角色变体"],
            ["abilities", "技能"],
            ["hud", "共享状态栏（HUD）"],
            ["badge", "徽章"],
            ["world-effects", "场景效果（WorldEffect）"],
          ].map(([id, label]) => <span className="system-map-output" data-map-node={id} key={id}>{label}</span>)}
        </div>
      </div>
      <div className="system-map-cleanse">
        <span className="system-map-cleanse-origin">M07 WorldEffect</span>
        <span aria-hidden="true">→</span>
        <span>未来的 BIO 危机 / 明确允许的事件</span>
        <span aria-hidden="true">→</span>
        <strong id="cleanse">IWorldEffectService.TryCleanse(...)</strong>
      </div>
    </div>
    <p className="system-map-note">M01 决定开局名额；M07 分配具体开局身份；M02 负责局中增援。</p>
  </div>;
}
