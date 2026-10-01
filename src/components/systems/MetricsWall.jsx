const metrics = [
  ["人数档位", "E–A", "Population Tier", "五档人口范围 · 最低接管 16 人", "profile"],
  ["响应等级", "L0–L5", "D-LRC", "按当前层级与评分阈值计算", "response"],
  ["验证基线", "313", "M07 logic suite", "313 / 313 passed · live validation pending", "tests"],
  ["阵营索引", "5", "Faction entries", "F01 → F05", "factions"],
  ["生产事件", "0", "EventDefinition", "Event Pack production content 尚未注册", "events"],
];

export function MetricsWall() {
  return <div className="snapshot" aria-label="系统数据概览">{metrics.map(([kicker, value, label, description, kind]) => <div className={`snapshot-item ${kind}`} key={kicker}>
    <div className="snapshot-kicker mono">{kicker}</div>
    <div><strong>{value}</strong><span className="metric-label mono">{label}</span><p>{description}</p></div>
  </div>)}</div>;
}
