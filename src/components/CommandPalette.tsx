"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type Item = { title: string; href: string; group: string };

type PaletteCtx = {
  openPalette: () => void;
};

const CommandPaletteContext = createContext<PaletteCtx | null>(null);

export function useCommandPalette() {
  const ctx = useContext(CommandPaletteContext);
  if (!ctx) {
    throw new Error("useCommandPalette: CommandPaletteProvider gerekli");
  }
  return ctx;
}

/** Klavye + dialog; tetikleyici ayrı (hero). */
export function CommandPaletteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/search")
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled && Array.isArray(data.items)) setItems(data.items);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const openPalette = useCallback(() => setOpen(true), []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      // Laptop: Ctrl+K (Mac’te de Ctrl; Cmd de açar)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("tr");
    if (!q) return items;
    return items.filter(
      (it) =>
        it.title.toLocaleLowerCase("tr").includes(q) ||
        it.group.toLocaleLowerCase("tr").includes(q)
    );
  }, [items, query]);

  useEffect(() => {
    setActive(0);
  }, [query, open]);

  function go(href: string) {
    close();
    router.push(href);
  }

  function onInputKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, Math.max(filtered.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && filtered[active]) {
      e.preventDefault();
      go(filtered[active].href);
    }
  }

  let lastGroup = "";

  return (
    <CommandPaletteContext.Provider value={{ openPalette }}>
      {children}
      {open ? (
        <div
          className="cmdk"
          role="dialog"
          aria-modal="true"
          aria-label="Hızlı arama"
        >
          <button
            type="button"
            className="cmdk__backdrop"
            aria-label="Kapat"
            onClick={close}
          />
          <div className="cmdk__panel">
            <input
              ref={inputRef}
              className="cmdk__input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onInputKey}
              placeholder="Sayfa, yazı veya proje ara…"
              aria-autocomplete="list"
            />
            <ul className="cmdk__list" role="listbox">
              {filtered.length === 0 && (
                <li className="cmdk__empty">Sonuç yok.</li>
              )}
              {filtered.map((it, i) => {
                const showGroup = it.group !== lastGroup;
                lastGroup = it.group;
                return (
                  <li key={`${it.group}-${it.href}`}>
                    {showGroup && <p className="cmdk__group">{it.group}</p>}
                    <button
                      type="button"
                      role="option"
                      aria-selected={i === active}
                      className={`cmdk__item${i === active ? " is-active" : ""}`}
                      onMouseEnter={() => setActive(i)}
                      onClick={() => go(it.href)}
                    >
                      <span>{it.title}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="cmdk__hint">↑↓ gezin · Enter aç · Esc kapat</p>
          </div>
        </div>
      ) : null}
    </CommandPaletteContext.Provider>
  );
}

export function CommandPaletteTrigger({
  className = "",
}: {
  className?: string;
}) {
  const { openPalette } = useCommandPalette();
  return (
    <button
      type="button"
      className={`cmdk-trigger ${className}`.trim()}
      onClick={openPalette}
      aria-label="Ara"
      title="Ara (Ctrl+K)"
    >
      <span className="cmdk-trigger__label">Ara</span>
      <kbd className="cmdk-trigger__kbd">Ctrl+K</kbd>
    </button>
  );
}
