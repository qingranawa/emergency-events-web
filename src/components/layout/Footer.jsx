export function Footer({ dlrc = false, mechanisms = false, factions = false }) {
  const href = dlrc || mechanisms || factions ? "index.html" : "dlrc.html";
  const label = dlrc || mechanisms || factions ? "返回 Emergency Events 首页" : "查看 D-LRC 页面";
  const title = dlrc ? "© 2026 Emergency Events" : mechanisms ? "Emergency Events · 插件机制" : factions ? "Emergency Events · 阵营档案" : "Emergency Events · 动态响应框架";
  return <footer><div className="container footer-row"><span>{title}</span><a href={href}>{label}</a></div></footer>;
}
