import { useState } from "react";
import { populationProfiles, roundCoreFacts } from "../../data/mechanisms";

export function RoundCoreSection() {
  const [selectedTier, setSelectedTier] = useState("C");
  const selectedProfile = populationProfiles.find((profile) => profile.tier === selectedTier) || populationProfiles[0];

  return <div className="round-core-layout">
    <div className="round-core-primary-grid">
      <section className="population-ruler-panel" aria-label="人口档位刻度">
        <div className="module-panel-heading">
          <span className="mono">OPENING POPULATION</span>
          <strong>16–45 人</strong>
          <p>16 人是本局接管最低人数。档位在 Round Start 锁定。</p>
        </div>
        <div className="population-ruler-endpoints mono"><span>16</span><span>45</span></div>
        <div className="population-ruler-grid">
          {populationProfiles.map((profile) => <button
            type="button"
            className={"population-ruler-row " + (selectedTier === profile.tier ? "is-selected" : "")}
            key={profile.tier}
            onClick={() => setSelectedTier(profile.tier)}
            onFocus={() => setSelectedTier(profile.tier)}
            aria-pressed={selectedTier === profile.tier}
          >
            <b className="mono">{profile.tier}</b>
            <span>{profile.range}</span>
            <i className="population-range-bar" aria-hidden="true" />
            <small>Primary cap {profile.cap}</small>
          </button>)}
        </div>
        <div className="population-selected-detail">
          <span className="mono">SELECTED PROFILE</span>
          <strong>{selectedProfile.tier} · {selectedProfile.range}</strong>
          <p>本档 Composition slots 由 M01 提供；具体角色身份由 M07 分配。</p>
        </div>
      </section>

      <section className="runtime-state-panel" aria-label="M01 Runtime State 状态机">
        <div className="module-panel-heading">
          <span className="mono">RUNTIME STATE MACHINE</span>
          <strong>是否接管 → 当前状态</strong>
        </div>
        <div className="state-transition-list">
          {roundCoreFacts.transitions.map(([condition, state, result]) => <article key={condition}>
            <span className="mono">{condition}</span>
            <strong>{state}</strong>
            <small>{result}</small>
          </article>)}
        </div>
        <div className="runtime-state-inventory">
          {roundCoreFacts.states.map(([state, detail]) => <article key={state}>
            <strong className="mono">{state}</strong>
            <span>{detail}</span>
          </article>)}
        </div>
      </section>
    </div>

    <div className="m01-ownership-note">
      <span className="mono">M01 OWNS COMPOSITION QUANTITIES</span>
      <div className="m01-slot-example">{roundCoreFacts.slots.map(([role, count]) => <span key={role}><b>{count}</b>{role}</span>)}</div>
      <p>M01 记录 slot 数量。D-9341、SCP-939-53 或具体 opening SCP roster 等身份由 M07 决定。</p>
    </div>
    <p className="source-line mono">{roundCoreFacts.source}</p>
  </div>;
}
