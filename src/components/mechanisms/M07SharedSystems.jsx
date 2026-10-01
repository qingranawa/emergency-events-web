import { abilityRuntime, badgeRules, sharedHud } from "../../data/m07";

export function M07SharedSystems() {
  return <div className="m07-shared-systems">
    <div className="m07-shared-grid">
      <article>
        <span className="mono">ACTIVE ABILITY RUNTIME</span>
        <strong>最多 3 个 Active Slot</strong>
        <div className="m07-slot-list">{abilityRuntime.slots.map((slot) => <span className="mono" key={slot}>{slot}</span>)}</div>
        <p>{abilityRuntime.binding}</p>
        <small>{abilityRuntime.limit} {abilityRuntime.physicalKey}</small>
      </article>
      <article>
        <span className="mono">SHARED PLAYER HUD</span>
        <strong>一个组合后的 Hint</strong>
        <div className="m07-runtime-flow mono">{sharedHud.flow}</div>
        <p>{sharedHud.fields.join(" · ")}</p>
        <small>{sharedHud.timing}</small>
      </article>
      <article>
        <span className="mono">GAMEPLAY BADGE</span>
        <strong>按可见范围投影身份</strong>
        <p>{badgeRules.ordinary}</p>
        <p>例如：{badgeRules.ordinaryExamples.join(" · ")}</p>
        <p>Global Overhead: {badgeRules.global.join(" / ")}。</p>
        <small>{badgeRules.globalStatus}</small>
      </article>
    </div>
  </div>;
}
