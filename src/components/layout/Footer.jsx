export function Footer({ dlrc = false, mechanisms = false }) {
  const href = dlrc || mechanisms ? "index.html" : "dlrc.html";
  const label = dlrc || mechanisms ? "返回 Emergency Events 首页" : "查看 D-LRC 页面";
  const title = dlrc ? "© 2026 Emergency Events" : mechanisms ? "Emergency Events · 插件机制" : "Emergency Events · 动态响应框架";
  return <footer><div className="container footer-row"><span>{title}</span><a href={href}>{label}</a></div></footer>;
}
