import { crisisEpisodeLifecycle, crisisFacts } from "../../data/mechanisms";

const labels = {
  BIO: "生物污染",
  SYS: "系统控制",
  CON: "Containment Failure",
  SEC: "设施安全",
  GOI: "第三方组织",
  WAR: "Alpha Warhead",
  END: "终局态",
};

export function CrisisSection() {
  return <div className="crisis-system">
    <div className="crisis-detector-array">
      <div className="crisis-array-header mono"><span>TAG</span><span>SIGNAL</span><span>CURRENT RULE</span><span>EPISODE STATE</span></div>
      {crisisFacts.map((fact) => <article className="crisis-detector-row" key={fact.tag}>
        <div className="crisis-tag-cell"><strong className="mono">{fact.tag}</strong><span>{labels[fact.tag]}</span></div>
        <p>{fact.signal}</p>
        <div><strong>{fact.rule}</strong><small>{fact.note}</small></div>
        <span className="crisis-episode-state mono">same Episode while active</span>
      </article>)}
    </div>
    <div className="crisis-episode-lifecycle">
      <div className="module-panel-heading"><span className="mono">CRISIS EPISODE LIFECYCLE</span><strong>每个有效 evaluation 更新 detector；Episode 按状态迁移创建和结束</strong></div>
      <div>{crisisEpisodeLifecycle.map(([transition, state]) => <article key={transition}>
        <span className="mono">{transition}</span><strong>{state}</strong>
      </article>)}</div>
    </div>
    <p className="crisis-separation-note"><b>Crisis 输出 Tags + Episodes。</b> D-LRC 输出 L0–L5 response level；Crisis 不含独立 Severity 等级。</p>
  </div>;
}
