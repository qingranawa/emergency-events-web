export function Footer({ dlrc = false }) {
  return <footer><div className="container footer-row"><span>{dlrc ? "© 2026 Emergency Events" : "EMERGENCY EVENTS · DYNAMIC RESPONSE FRAMEWORK"}</span><a href={dlrc ? "index.html" : "dlrc.html"}>{dlrc ? "返回 Emergency Events 首页" : "查看 D-LRC 页面"}</a></div></footer>;
}

