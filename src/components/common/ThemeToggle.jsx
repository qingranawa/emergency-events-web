export function ThemeToggle({ theme, onToggle }) {
  return <button className="icon-btn" type="button" aria-label={theme === "light" ? "切换到深色主题" : "切换到浅色主题"} onClick={onToggle}>{theme === "light" ? "☼" : "◐"}</button>;
}
