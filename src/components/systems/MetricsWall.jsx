export function MetricsWall() {
  const metrics = [["POPULATION MODEL", "E–A", "POPULATION PROFILES", "五档人口规模自适应", "profile"], ["D-LRC", "0–5", "RESPONSE LEVELS", "D-LRC 响应等级范围", "response"], ["VALIDATION BASELINE", "182", "AUTOMATED TESTS", "当前自动化验证基线", "tests"], ["FACTION INDEX", "6", "FACTION ENTRIES", "F01 → F06", "factions"], ["EVENT INDEX", "6", "EVENT CATEGORIES", "E01 → E06", "events"]];
  return <div className="snapshot" aria-label="系统数据概览">{metrics.map(([kicker, value, label, description, kind]) => <div className={`snapshot-item ${kind}`} key={kicker}><div className="snapshot-kicker mono">{kicker}</div><div><strong>{value}</strong><span className="metric-label mono">{label}</span><p>{description}</p></div></div>)}</div>;
}

