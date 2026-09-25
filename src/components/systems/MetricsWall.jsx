export function MetricsWall() {
  const metrics = [["人数档位", "E–A", "人数范围", "共五档人数范围", "profile"], ["响应判断", "0–5", "响应等级", "当前响应等级范围", "response"], ["验证基线", "182", "自动化测试", "当前自动化测试数量", "tests"], ["阵营索引", "6", "阵营条目", "F01 → F06", "factions"], ["事件索引", "6", "事件类别", "E01 → E06", "events"]];
  return <div className="snapshot" aria-label="系统数据概览">{metrics.map(([kicker, value, label, description, kind]) => <div className={`snapshot-item ${kind}`} key={kicker}><div className="snapshot-kicker mono">{kicker}</div><div><strong>{value}</strong><span className="metric-label mono">{label}</span><p>{description}</p></div></div>)}</div>;
}
