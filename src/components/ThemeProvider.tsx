"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type Theme = "day" | "night";

type ThemeCtx = {
  theme: Theme;
  toggle: () => void;
  ready: boolean;
};

const Ctx = createContext<ThemeCtx>({
  theme: "day",
  toggle: () => {},
  ready: false,
});

const KEY = "me-theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("day");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(KEY);
    const next: Theme = stored === "night" ? "night" : "day";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    setReady(true);
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "day" ? "night" : "day";
      document.documentElement.dataset.theme = next;
      window.localStorage.setItem(KEY, next);
      return next;
    });
  }, []);

  return (
    <Ctx.Provider value={{ theme, toggle, ready }}>{children}</Ctx.Provider>
  );
}

export function useTheme() {
  return useContext(Ctx);
}
