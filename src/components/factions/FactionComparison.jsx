import { factionComparison } from "../../data/factionsArchive";

export function FactionComparison() {
  return <section id="comparison" className="faction-section" data-scroll-reveal><div className="container"><div className="section-head"><div><div className="section-kicker mono">07 / COMPARISON MATRIX</div><h2 className="section-title">同一张桌面，不同职责</h2></div><p className="section-desc">用组织类型、职责范围和设定稳定度比较，不评价谁更强，也不把叙事差异压成一个数值。</p></div><div className="faction-table-wrap"><table className="faction-table"><thead><tr><th>对象</th><th>组织类型</th><th>主要职责</th><th>政府关联</th><th>异常使用方式</th><th>设定备注</th></tr></thead><tbody>{factionComparison.map((row) => <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <th key={cell}>{cell}</th> : <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div></div></section>;
}
