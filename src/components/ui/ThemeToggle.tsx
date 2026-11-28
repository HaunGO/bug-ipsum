'use client';

import { Moon, Sun } from 'lucide-react';

import { useTheme } from '../../lib/theme';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme, mounted } = useTheme();

  const isDark = theme === 'dark' || (theme === 'system' && resolvedTheme === 'dark');

  // Placeholder keeps layout stable until the saved theme is known.
  if (!mounted) {
    return <div className="h-8 w-16" aria-hidden="true" />;
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="inline-flex h-8 items-center gap-1.5 text-foreground"
    >
      <Sun aria-hidden className={`size-3.5 ${isDark ? 'opacity-40' : 'opacity-100'}`} strokeWidth={1.75} />
      <span aria-hidden="true" className="relative inline-flex h-5 w-9 items-center rounded-plate border border-border bg-muted">
        <span
          className={`h-3.5 w-3.5 rounded-plate bg-primary transition-transform duration-200 motion-reduce:transition-none ${
            isDark ? 'translate-x-[1.15rem]' : 'translate-x-0.5'
          }`}
        />
      </span>
      <Moon aria-hidden className={`size-3.5 ${isDark ? 'opacity-100' : 'opacity-40'}`} strokeWidth={1.75} />
    </button>
  );
}
