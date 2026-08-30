export function Footer({ dlrc = false, mechanisms = false, factions = false }) {
  const href = dlrc || mechanisms || factions ? "index.html" : "dlrc.html";
  const label = dlrc || mechanisms || factions ? "返回 Emergency Events 首页" : "查看 D-LRC 页面";
  const title = dlrc ? "© 2026 Emergency Events" : mechanisms ? "Emergency Events · 插件机制" : factions ? "Emergency Events · 阵营档案" : "Emergency Events · 动态响应框架";
  const legal = dlrc ? { text: "D-LRC 内容均归 Qingran 所有", tag: "QINGRAN / OWNER", tone: "owner" } : !mechanisms && !factions ? { text: "紧急事件插件 · Qingran 所有 · MIT 开源", tag: "MIT LICENSE", tone: "license" } : null;
  return <footer><div className="container footer-row"><span>{title}</span><a href={href}>{label}</a></div>{legal && <div className={`container footer-legal footer-legal-${legal.tone}`}><span className="footer-legal-beacon" aria-hidden="true" /><span className="footer-legal-label mono">LEGAL / NOTICE</span><span className="footer-legal-copy">{legal.text}</span><span className="footer-legal-tag mono">{legal.tag}</span></div>}</footer>;
}
