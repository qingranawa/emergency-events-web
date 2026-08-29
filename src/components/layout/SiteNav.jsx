import * as Dialog from "@radix-ui/react-dialog";
import { ThemeToggle } from "../common/ThemeToggle";

const navigation = [
  { label: "首页", id: "home", href: "index.html" },
  { label: "D-LRC", id: "dlrc", href: "dlrc.html" },
  { label: "阵营", id: "factions", href: { home: "#factions", dlrc: "#crisis" } },
  { label: "事件", id: "events", href: { home: "#events", dlrc: "#architecture" } },
  { label: "机制", id: "systems", href: { home: "#systems", dlrc: "#architecture" } },
];

export function SiteNav({ page = "home", theme, onToggleTheme }) {
  const pageLinks = navigation.map((item) => ({ ...item, href: typeof item.href === "string" ? item.href : item.href[page] }));
  return <header className="nav-wrap"><div className="container"><nav aria-label="主导航">
    <a className="brand" href="index.html" aria-label="Emergency Events 首页"><div className="logo mono">EE</div><div><div className="brand-name">Emergency Events</div><div className="brand-sub">DYNAMIC EVENT FRAMEWORK</div></div></a>
    <div className="nav-links desktop-nav">{pageLinks.map(({ label, href, id }) => <a key={href + label} className={`nav-link ${page === id ? "is-current" : ""}`} href={href} aria-current={page === id ? "page" : undefined}>{label}</a>)}<a className="nav-link nav-github" href="https://github.com/qingranawa/Emergency-events" target="_blank" rel="noreferrer">GitHub</a></div>
    <div className="nav-right"><div className="nav-status"><span className="status-dot" />CORE ONLINE</div><ThemeToggle theme={theme} onToggleTheme={onToggleTheme} /><Dialog.Root><Dialog.Trigger asChild><button className="menu-btn" type="button" aria-label="打开导航菜单">菜单</button></Dialog.Trigger><Dialog.Portal><Dialog.Overlay className="nav-dialog-overlay" /><Dialog.Content className="nav-dialog-content"><Dialog.Title className="sr-only">Emergency Events 导航菜单</Dialog.Title><Dialog.Description className="sr-only">选择页面或页面内模块</Dialog.Description><div className="nav-dialog-head"><span className="mono">NAVIGATION / {page.toUpperCase()}</span><Dialog.Close asChild><button className="icon-btn" type="button" aria-label="关闭导航">×</button></Dialog.Close></div><div className="nav-dialog-links">{pageLinks.map(({ label, href, id }) => <Dialog.Close asChild key={`mobile-${href + label}`}><a className={`nav-link ${page === id ? "is-current" : ""}`} href={href}>{label}</a></Dialog.Close>)}<a className="nav-link" href="https://github.com/qingranawa/Emergency-events" target="_blank" rel="noreferrer">GitHub</a></div></Dialog.Content></Dialog.Portal></Dialog.Root></div>
  </nav></div></header>;
}
