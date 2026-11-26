'use client';

import { useTheme } from '../../lib/theme';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme, mounted } = useTheme();

  const isDark = theme === 'dark' || (theme === 'system' && resolvedTheme === 'dark');

  // Placeholder keeps layout stable until the saved theme is known.
  if (!mounted) {
    return <div className="h-11 w-[5.5rem]" aria-hidden="true" />;
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="inline-flex min-h-11 items-center gap-3 font-mono text-xs uppercase tracking-[0.14em] text-muted hover:text-ink"
    >
      <span>Dark</span>
      <span aria-hidden="true" className="relative inline-flex h-6 w-11 items-center rounded-plate border border-line bg-sunken">
        <span
          className={`h-4 w-4 rounded-plate bg-accent transition-transform duration-200 motion-reduce:transition-none ${
            isDark ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </span>
    </button>
  );
}
