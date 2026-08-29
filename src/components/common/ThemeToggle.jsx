export function ThemeToggle({ theme, onToggle }) {
  return <button className="icon-btn" type="button" aria-label="切换明暗主题" onClick={onToggle}>{theme === "light" ? "☼" : "◐"}</button>;
}

