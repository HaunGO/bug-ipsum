'use client';

import { Moon, Sun } from 'lucide-react';

import { useTheme } from '../../lib/theme';

const corner =
  'fixed top-2 right-2 z-30 m-0 p-0';

export function ThemeToggle() {
  const { theme, setTheme, mounted } = useTheme();

  const isDark = theme === 'dark';

  if (!mounted) {
    return <div className={`${corner} size-3.5`} aria-hidden="true" />;
  }

  return (
    <button
      type="button"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`${corner} inline-flex items-center gap-1 rounded-none text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring`}
    >
      <Sun
        aria-hidden
        strokeWidth={isDark ? 1.5 : 2.25}
        className={`size-3.5 ${isDark ? 'text-muted-foreground' : 'text-foreground'}`}
      />
      <Moon
        aria-hidden
        strokeWidth={isDark ? 2.25 : 1.5}
        className={`size-3.5 ${isDark ? 'text-foreground' : 'text-muted-foreground'}`}
      />
    </button>
  );
}
