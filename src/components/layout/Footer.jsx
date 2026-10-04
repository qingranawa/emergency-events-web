export function Footer({ dlrc = false, mechanisms = false, factions = false, roles = false }) {
  const href = dlrc || mechanisms || factions || roles ? "index.html" : "dlrc.html";
  const label = dlrc || mechanisms || factions || roles ? "回到 Emergency Events 首页" : "查看这一局的状态";
  const title = dlrc ? "© 2026 Emergency Events" : mechanisms ? "Emergency Events · 运行方式" : factions ? "Emergency Events · 阵营参考" : roles ? "Emergency Events · 角色档案" : "Emergency Events · 回合响应框架";
  const legal = dlrc ? { text: "D-LRC 内容归 Qingran 所有", tag: "QINGRAN / OWNER", tone: "owner" } : !mechanisms && !factions && !roles ? { text: "Emergency Events 插件 · Qingran 所有 · MIT 开源", tag: "MIT LICENSE", tone: "license" } : null;
  return <footer><div className="container footer-row"><span>{title}</span><a href={href}>{label}</a></div>{legal && <div className={`container footer-legal footer-legal-${legal.tone}`}><span className="footer-legal-beacon" aria-hidden="true" /><span className="footer-legal-label mono">LEGAL / NOTICE</span><span className="footer-legal-copy">{legal.text}</span><span className="footer-legal-tag mono">{legal.tag}</span></div>}</footer>;
}
