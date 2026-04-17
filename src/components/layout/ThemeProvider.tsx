'use client';
import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeCtx {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (t: Theme) => void;
}

const Ctx = createContext<ThemeCtx>({
  theme: 'system',
  resolvedTheme: 'dark',
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system');
  const [resolved, setResolved] = useState<'light' | 'dark'>('dark');

  const applyTheme = (t: Theme) => {
    const doc = document.documentElement;
    let r: 'light' | 'dark' = 'dark';
    if (t === 'system') {
      r = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
      r = t;
    }
    doc.setAttribute('data-theme', r);
    doc.classList.toggle('dark', r === 'dark');
    setResolved(r);
  };

  useEffect(() => {
    const stored = (localStorage.getItem('jdn_theme') as Theme) || 'system';
    setThemeState(stored);
    applyTheme(stored);

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if (stored === 'system') applyTheme('system');
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem('jdn_theme', t);
    applyTheme(t);
  };

  return <Ctx.Provider value={{ theme, resolvedTheme: resolved, setTheme }}>{children}</Ctx.Provider>;
}

export const useTheme = () => useContext(Ctx);
