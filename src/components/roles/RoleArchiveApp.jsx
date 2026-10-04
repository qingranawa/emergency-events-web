import { Background } from "../layout/Background";
import { Footer } from "../layout/Footer";
import { SectionHeader } from "../layout/SectionHeader";
import { SiteNav } from "../layout/SiteNav";
import { useTheme } from "../../hooks/useTheme";
import { useSectionSpy } from "../../hooks/useSectionSpy";
import { roleArchiveFacts, roleArchiveGroups, roleDossiers, roleImplementationStatus } from "../../data/roles";
import { RoleDossier } from "./RoleDossier";
import { RoleIndex } from "./RoleIndex";

function OpeningAllocation() {
  const examples = [
    ["D-Class", "8 slots", "6 Variant", "2 Vanilla"],
    ["Scientist", "3 slots", "2 Variant", "1 Vanilla"],
    ["Security", "4 slots", "2 Guard", "2 Chaos"],
  ];
  return <section className="roles-section" id="allocation" aria-labelledby="allocation-title">
    <div className="container">
      <SectionHeader id="allocation-title" kicker="ROUND START · M01 → M07" title="先定槽位，再分配身份" description={roleArchiveFacts.allocation.explanation} />
      <div className="role-allocation">
        <div className="role-allocation-heading"><span className="mono">M01 / COMPOSITION</span><b aria-hidden="true">→</b><span className="mono">M07 / IDENTITY</span></div>
        {examples.map(([name, slots, first, second]) => <div className="role-allocation-row" key={name}>
          <strong>{name}</strong><span className="role-slot-count mono">{slots}</span>
          <div className="role-allocation-bar" aria-label={`${name}: ${first}, ${second}`}><span className={name === "Security" ? "role-bar-guard" : "role-bar-special"}>{first}</span><span className={name === "Security" ? "role-bar-chaos" : "role-bar-vanilla"}>{second}</span></div>
        </div>)}
        <p>M07 不增加开局总人数。Round Start 之后的 MTF / CI 增援仍由 M02 Reinforcement Integration 处理。</p>
      </div>
    </div>
  </section>;
}

function ArchiveRail({ activeId }) {
  return <nav className="roles-rail" aria-label="角色档案章节">
    <div className="container roles-rail-inner">
      <span className="roles-rail-label mono">ROLE ARCHIVE</span>
      {roleArchiveGroups.map((group) => <a href={`#${group.id}`} className={activeId === group.id ? "is-current" : ""} aria-current={activeId === group.id ? "location" : undefined} key={group.id}>{group.title}</a>)}
      <a href="#shared-systems" className={activeId === "shared-systems" ? "is-current" : ""} aria-current={activeId === "shared-systems" ? "location" : undefined}>共用运行层</a>
      <a href="#implementation-status" className={activeId === "implementation-status" ? "is-current" : ""} aria-current={activeId === "implementation-status" ? "location" : undefined}>实现状态</a>
    </div>
  </nav>;
}

function RoleGroup({ group }) {
  const dossiers = roleDossiers.filter((item) => item.category === group.category);
  const note = group.category === "scientist"
    ? roleArchiveFacts.namedDoctor
    : group.category === "scp-939"
      ? roleArchiveFacts.scp939Policy
      : group.category === "d-class"
        ? "小 roster 使用冻结配额；8 个 D-Class 槽位示例为 6 个 Variant 与 2 个 Vanilla。原稿中两个 D-11424 编号保留，内部 VariantId 不同。"
        : null;
  return <section className="roles-section role-group-section" id={group.id} aria-labelledby={`${group.id}-title`}>
    <div className="container">
      <SectionHeader id={`${group.id}-title`} kicker={group.kicker} title={group.title} description={group.description} />
      {note && <p className="role-group-note">{note}</p>}
      <RoleIndex dossiers={dossiers} label={`${group.title}索引`} />
      <div className="role-dossier-list">
        {roleDossiers.map((dossier) => dossier.category === group.category
          ? <RoleDossier key={dossier.id} id={dossier.id} dossier={dossier} />
          : null)}
      </div>
    </div>
  </section>;
}

function SharedSystems() {
  const abilities = roleArchiveFacts.activeAbility;
  return <section className="roles-section" id="shared-systems" aria-labelledby="shared-systems-title">
    <div className="container">
      <SectionHeader id="shared-systems-title" kicker="M07 · SHARED PLAYER RUNTIME" title="身份进入游戏后的共用层" description="角色身份由 M07 分配；技能按逻辑槽位运行，HUD 和 WorldEffect 由共享服务承接。" />
      <div className="role-runtime-grid">
        <article className="role-runtime-panel">
          <span className="mono">ACTIVE ABILITY / SSS</span>
          <h3>三个位槽，不绑定实体按键</h3>
          <div className="role-slot-strip">{abilities.slots.map((slot) => <b key={slot}>{slot}</b>)}</div>
          <p>{abilities.binding}</p>
        </article>
        <article className="role-runtime-panel">
          <span className="mono">SHARED HUD</span>
          <h3>模块提交片段，由服务统一组合</h3>
          <p>{roleArchiveFacts.hud}</p>
        </article>
        <article className="role-runtime-panel">
          <span className="mono">GAMEPLAY BADGE</span>
          <h3>可见范围按阵营与身份区分</h3>
          <p>{roleArchiveFacts.badge}</p>
        </article>
      </div>
      <div className="role-world-effect">
        <div className="role-world-effect-title"><span className="mono">WORLD EFFECT CONTRACT</span><strong>SCP-049 room contamination</strong></div>
        <p>{roleArchiveFacts.worldEffect}</p>
        <div className="role-world-effect-flow"><span>SCP-049 ability</span><b aria-hidden="true">→</b><span>Room WorldEffect</span><b aria-hidden="true">→</b><span>Biohazard tags</span><b aria-hidden="true">→</b><span>AllowedTags · Cleanse API</span></div>
      </div>
      <div className="role-boundary-flow" aria-label="开局分配与中途增援的模块边界">
        <span>M01 · 槽位数量</span><b aria-hidden="true">→</b><span>M07 · 开局具体身份</span><b aria-hidden="true">→</b><span>M07 · Gameplay Runtime</span><i>Round Start</i>
        <span className="role-flow-separator" aria-hidden="true">//</span>
        <span>M02 · Vanilla mid-round reinforcement</span><i>Mid-round</i>
      </div>
    </div>
  </section>;
}

function ImplementationStatus() {
  return <section className="roles-section" id="implementation-status" aria-labelledby="implementation-status-title">
    <div className="container">
      <SectionHeader id="implementation-status-title" kicker="IMPLEMENTATION NOTES" title="能力边界与验证状态" description="已实现的逻辑、当前 API 阻塞和仍待实服验证的内容分开标注。" />
      <div className="role-status-table" role="table" aria-label="M07 能力实现状态">
        <div className="role-status-row role-status-head" role="row"><span role="columnheader">CAPABILITY</span><span role="columnheader">STATUS</span><span role="columnheader">DETAIL</span></div>
        {roleImplementationStatus.map((item) => <div className="role-status-row" role="row" key={item.subject}><strong role="cell">{item.subject}</strong><span className={`role-status mono role-status-${item.status.toLowerCase().replaceAll(" ", "-")}`} role="cell">{item.status}</span><p role="cell">{item.detail}</p></div>)}
      </div>
      <div className="role-validation-note">
        <div><span className="mono">M07 PHASE 3 BASELINE</span><strong>{roleArchiveFacts.validation.phase3}</strong></div>
        <div><span className="mono">LOGIC TESTS</span><strong>{roleArchiveFacts.validation.logicTests} passed</strong></div>
        <div><span className="mono">PLUGIN BUILD</span><strong>{roleArchiveFacts.validation.pluginBuild}</strong></div>
        <div><span className="mono">LIVE SERVER</span><strong>{roleArchiveFacts.validation.liveServer}</strong></div>
      </div>
      <p className="role-source-note">资料以插件快照 <code>6199c40</code> 与该快照中的测试文档为依据。插件逻辑测试文档记录 313 / 313；实服验证仍待完成。</p>
    </div>
  </section>;
}

export function RoleArchiveApp() {
  const { theme, toggleTheme } = useTheme();
  const sectionIds = [...roleArchiveGroups.map(({ id }) => id), "shared-systems", "implementation-status"];
  const activeId = useSectionSpy(sectionIds);

  return <>
    <Background />
    <SiteNav page="roles" theme={theme} onToggleTheme={toggleTheme} />
    <main className="roles-page" id="top">
      <section className="roles-hero">
        <div className="container roles-hero-grid">
          <div>
            <span className="eyebrow mono">M07 · GAMEPLAY LAYER</span>
            <h1>角色档案<br /><span>Roles & Abilities</span></h1>
            <p className="hero-desc">查看 Emergency Events 如何把 M01 的开局槽位分配成具体身份，以及每个 Role Variant、SCP 强化、技能与显示边界。中途 MTF / CI 增援由 M02 处理。</p>
            <div className="roles-hero-links"><a className="btn primary" href="#allocation">查看开局分配</a><a className="btn" href="#d-class">浏览角色档案</a><a className="roles-mechanisms-link" href="mechanisms.html#m07">阅读完整 M07 架构 <span aria-hidden="true">↗</span></a></div>
            <div className="roles-hero-meta mono">IMPLEMENTED · LOGIC TESTED · LIVE VALIDATION PENDING</div>
          </div>
          <aside className="roles-hero-panel" aria-label="角色档案分类概览">
            <div className="roles-panel-head"><span className="mono">OPENING ROLE INDEX</span><span className="mono">M07 / 01</span></div>
            <a href="#d-class"><span>01</span><strong>D-Class Role Variants</strong><b>08</b></a>
            <a href="#scientists"><span>02</span><strong>Scientist 特殊身份</strong><b>07</b></a>
            <a href="#security"><span>03</span><strong>Security Opening Split</strong><b>01</b></a>
            <a href="#scp-939"><span>04</span><strong>SCP-939 Role Variants</strong><b>03</b></a>
            <a href="#scp-augmentation"><span>05</span><strong>Standard SCP Augmentation</strong><b>06</b></a>
            <div className="roles-panel-foot mono">M01 QUANTITY → M07 IDENTITY</div>
          </aside>
        </div>
      </section>
      <ArchiveRail activeId={activeId} />
      <OpeningAllocation />
      {roleArchiveGroups.map((group) => <RoleGroup key={group.id} group={group} />)}
      <SharedSystems />
      <ImplementationStatus />
    </main>
    <Footer roles />
  </>;
}
