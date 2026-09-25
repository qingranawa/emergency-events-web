import * as Dialog from "@radix-ui/react-dialog";
import { ThemeToggle } from "../common/ThemeToggle";

export const navigation = [
  { label: "首页", id: "home", href: "index.html" },
  { label: "D-LRC", id: "dlrc", href: "dlrc.html" },
  { label: "阵营", id: "factions", pending: true },
  { label: "事件", id: "events", pending: true },
  { label: "机制", id: "mechanisms", href: "mechanisms.html" },
];

export function SiteNav({ page = "home", theme, onToggleTheme }) {
  const pageLabel = { home: "首页", dlrc: "D-LRC", factions: "阵营", mechanisms: "机制" }[page] || "当前页面";
  const renderLink = ({ label, href, id, pending }, mobile = false) => {
    if (pending) {
      return <span className="nav-link nav-link-disabled" aria-disabled="true" key={`${mobile ? "mobile-" : ""}${id}`}><span>{label}</span><small>暂未开放</small></span>;
    }

    const link = <a className={`nav-link ${page === id ? "is-current" : ""}`} href={href} aria-current={page === id ? "page" : undefined} key={`${mobile ? "mobile-" : ""}${id}`}>{label}</a>;
    return mobile ? <Dialog.Close asChild key={`mobile-${id}`}>{link}</Dialog.Close> : link;
  };

  return <header className="nav-wrap"><div className="container"><nav aria-label="主导航">
    <a className="brand" href="index.html" aria-label="Emergency Events 首页"><div className="logo"><img src="assets/emergency-events-mark.png" alt="" /></div><div><div className="brand-name">Emergency Events</div><div className="brand-sub">回合响应框架</div></div></a>
    <div className="nav-links desktop-nav">{navigation.map((item) => renderLink(item))}</div>
    <div className="nav-right"><a className="github-action" href="https://github.com/qingranawa/Emergency-events" target="_blank" rel="noreferrer"><img src="assets/github.svg" alt="" /><span>GitHub</span></a><div className="nav-status"><span className="status-dot" />运行中</div><ThemeToggle theme={theme} onToggle={onToggleTheme} /><Dialog.Root><Dialog.Trigger asChild><button className="menu-btn" type="button" aria-label="打开主导航">菜单</button></Dialog.Trigger><Dialog.Portal><Dialog.Overlay className="nav-dialog-overlay" /><Dialog.Content className="nav-dialog-content"><Dialog.Title className="sr-only">Emergency Events 主导航</Dialog.Title><Dialog.Description className="sr-only">选择页面或本页章节</Dialog.Description><div className="nav-dialog-head"><span className="mono">当前页面：{pageLabel}</span><Dialog.Close asChild><button className="icon-btn" type="button" aria-label="关闭主导航">×</button></Dialog.Close></div><div className="nav-dialog-links">{navigation.map((item) => renderLink(item, true))}<Dialog.Close asChild><a className="nav-link nav-dialog-github" href="https://github.com/qingranawa/Emergency-events" target="_blank" rel="noreferrer"><img src="assets/github.svg" alt="" /><span>GitHub</span></a></Dialog.Close></div></Dialog.Content></Dialog.Portal></Dialog.Root></div>
  </nav></div></header>;
}
