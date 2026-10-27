"use client";

import { useTheme } from "@/components/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggle, ready } = useTheme();
  const night = theme === "night";

  return (
    <label
      className="theme-toggle"
      title={night ? "Gündüz moda geç" : "Gece moda geç"}
    >
      <span className="theme-toggle__label" aria-hidden>
        {night ? "Gece" : "Gündüz"}
      </span>
      <input
        type="checkbox"
        className="theme-toggle__input"
        checked={night}
        onChange={toggle}
        disabled={!ready}
        aria-label="Gece / gündüz teması"
      />
      <span className="theme-toggle__track" aria-hidden>
        <span className="theme-toggle__thumb" />
      </span>
    </label>
  );
}
