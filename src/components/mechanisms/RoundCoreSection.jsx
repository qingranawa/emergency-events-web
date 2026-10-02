import { useState } from "react";
import { populationProfiles, roundCoreFacts } from "../../data/mechanisms";

const stateNames = {
  DISABLED: "插件已关闭",
  STANDBY: "人数不足，沿用原版",
  ACTIVE: "本局由 Emergency Events 接管",
  LOW_POPULATION_SUSPENDED: "人数下降，本局接管暂停",
  ROUND_ENDED: "回合结束，清理本局状态",
  ERROR: "运行异常",
};

export function RoundCoreSection() {
  const [selectedTier, setSelectedTier] = useState("C");
  const selectedProfile = populationProfiles.find((profile) => profile.tier === selectedTier) || populationProfiles[0];

  return <div className="round-core-layout">
    <section className="population-ruler-panel" aria-label="开局人数档位">
      <div className="module-panel-heading">
        <span className="mono">开局人数</span>
        <strong>16–45 人</strong>
        <p>16 人是接管门槛。档位在回合开始时锁定。</p>
      </div>
      <div className="population-ruler-grid">
        {populationProfiles.map((profile) => <button
          type="button"
          className={"population-ruler-row " + (selectedTier === profile.tier ? "is-selected" : "")}
          key={profile.tier}
          onClick={() => setSelectedTier(profile.tier)}
          onFocus={() => setSelectedTier(profile.tier)}
          aria-pressed={selectedTier === profile.tier}
        >
          <b className="mono">{profile.tier} 档</b>
          <span>{profile.range} 人</span>
          <i className="population-range-bar" aria-hidden="true" />
        </button>)}
      </div>
      <div className="population-selected-detail">
        <strong>{selectedProfile.tier} 档 · {selectedProfile.range} 人</strong>
        <p>档位确定后，M01 按对应人数安排开局槽位。M07 再决定每个槽位的具体身份。</p>
      </div>
    </section>

    <section className="runtime-state-panel" aria-label="接管状态变化">
      <div className="module-panel-heading">
        <span className="mono">接管状态</span>
        <strong>人数决定本局是否接管</strong>
      </div>
      <div className="state-transition-list">
        {roundCoreFacts.transitions.map(([condition, state, result]) => <article key={condition}>
          <span>{condition}</span>
          <strong>{stateNames[state]}</strong>
          <small>{result}</small>
        </article>)}
      </div>
      <div className="runtime-state-inventory" aria-label="其他回合状态">
        {roundCoreFacts.states.filter(([state]) => ["DISABLED", "ROUND_ENDED", "ERROR"].includes(state)).map(([state]) => <span key={state}>{stateNames[state]}</span>)}
      </div>
    </section>

      <div className="m01-ownership-note">
        <span className="mono">M01 决定人数，不决定具体身份</span>
      <div className="m01-slot-example-label">{roundCoreFacts.slotExample.tier} 档示例 · {roundCoreFacts.slotExample.population} 人开局</div>
      <div className="m01-slot-example">{roundCoreFacts.slotExample.slots.map(([role, count]) => <span key={role}><b>{count}</b>{role}</span>)}</div>
      <p>不同人数对应不同槽位数量。M07 再为这些槽位分配具体身份，不会增加开局人数。</p>
    </div>
  </div>;
}
