import { useCallback, useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem("ee-theme") || "dark");
  useEffect(() => {
    document.body.classList.toggle("light", theme === "light");
    localStorage.setItem("ee-theme", theme);
  }, [theme]);
  const toggleTheme = useCallback(() => setTheme((current) => current === "light" ? "dark" : "light"), []);
  return { theme, toggleTheme };
}
