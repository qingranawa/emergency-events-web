import {
  dClassVariants,
  m07Allocation,
  scientistVariants,
  scp939Variants,
  scpRoster,
  securityOpening,
} from "../../data/m07";

export function OpeningRoleAllocation() {
  return <div className="opening-role-allocation">
    <div className="m07-boundary">
      <span className="mono">M01 → M07 → M02</span>
      <p>{m07Allocation.summary} 普通中途 MTF / CI 仍由 M02 接管。</p>
    </div>

    <div className="m07-allocation">
      <div className="m07-subhead">
        <span className="mono">HUMAN OPENING ALLOCATION</span>
        <p>{m07Allocation.quota}</p>
      </div>
      <div className="allocation-strip">
        {m07Allocation.examples.map(([role, slots, special, vanilla]) => <div className="allocation-row" key={role}>
          <strong>{role}</strong>
          <span className="mono">{slots}</span>
          <div className="allocation-bar" aria-label={role + ": " + special + ", " + vanilla}>
            <span className="allocation-special">{special}</span>
            <span className="allocation-vanilla">{vanilla}</span>
          </div>
          <span className="allocation-legend"><i className="allocation-special-key" />Variant <i className="allocation-vanilla-key" />Vanilla</span>
        </div>)}
      </div>
    </div>

    <details className="m07-disclosure">
      <summary><span className="mono">D-CLASS VARIANT POOL · 8</span><span>查看已定义身份与能力摘要</span></summary>
      <div className="dclass-variant-list">
        {dClassVariants.map((variant) => <article key={variant.id}>
          <strong>{variant.name}<small>{variant.hp}</small></strong>
          <span><b>Passive</b>{variant.passive}</span>
          <span><b>Active</b>{variant.active}</span>
        </article>)}
      </div>
      <p className="section-note">两个 D-11424 是源定义中不同的 VariantId；页面保留原编号。</p>
    </details>

    <div className="scientist-allocation">
      <div className="m07-subhead">
        <span className="mono">SCIENTIST OPENING POOL</span>
        <p>NamedDoctor 最多 1 人；Specialist 与 SpecialAlignment 单独分配。</p>
      </div>
      <div className="scientist-groups">
        <article><span className="mono">NAMED DOCTOR · MAX 1</span><strong>{scientistVariants.namedDoctors.join(" / ")}</strong></article>
        <article><span className="mono">SPECIALIST</span><strong>{scientistVariants.specialists.join(" / ")}</strong></article>
        <article><span className="mono">SPECIAL ALIGNMENT</span><strong>{scientistVariants.maynard.name}</strong><p>Eligibility: {scientistVariants.maynard.eligibility.join(" + ")}。</p><p>{scientistVariants.maynard.alignment}</p><small>{scientistVariants.maynard.limitation}</small></article>
      </div>
      <div className="scientist-profile-list">
        {scientistVariants.profiles.map((variant) => <article key={variant.name}>
          <div><span className="mono">{variant.kind}</span><strong>{variant.name}</strong><small>{variant.hp}</small></div>
          <p><b>Passive</b>{variant.passive}</p>
          <p><b>Active</b>{variant.active}</p>
        </article>)}
      </div>
    </div>

    <div className="security-opening">
      <div className="m07-subhead"><span className="mono">SECURITY OPENING SPLIT</span><p>{securityOpening.split}</p></div>
      <div className="security-split-line"><strong>Facility Guard</strong><span className="mono">1 : 1</span><strong>Chaos Infiltrator</strong></div>
      <div className="security-facts"><p>{securityOpening.odd}</p><p>{securityOpening.chaos}</p><p>{securityOpening.spawn}</p></div>
    </div>

    <div className="scp-opening-pool">
      <div className="m07-subhead">
        <span className="mono">SCP OPENING POOL</span>
        <p>{scpRoster.description} {scpRoster.note}</p>
      </div>
      <div className="scp939-profile-strip">
        {scp939Variants.map((variant) => <article key={variant.id}>
          <div className="scp939-profile-head"><span className="mono">{variant.name}</span><strong>{variant.hp}</strong></div>
          <p>{variant.passive}</p>
          {variant.secondary && <p>{variant.secondary}</p>}
          <p><b>Active</b> {variant.active}</p>
        </article>)}
      </div>
    </div>
  </div>;
}
